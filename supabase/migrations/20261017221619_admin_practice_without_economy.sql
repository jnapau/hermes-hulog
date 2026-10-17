-- Admin accounts preview the curriculum without a personal reward economy.
-- Normalize every write, including promotion and legacy RPCs, in one place.
create function public.normalize_admin_economy() returns trigger
language plpgsql set search_path = public as $$
begin
 if new.is_admin then
  new.coins := 0;
  new.streak := 0;
  new.progress := coalesce(new.progress, '{}'::jsonb) ||
    '{"alkansyaCoins":0,"ginto":0,"restTokens":0,"bestStreak":0,"cashouts":{},"targetGoal":null}'::jsonb;
 end if;
 return new;
end; $$;
revoke all on function public.normalize_admin_economy() from public, anon, authenticated;
create trigger profiles_admin_economy before insert or update on public.profiles
for each row execute function public.normalize_admin_economy();
-- Existing admin equipment, preferences, and historical learning data stay intact.
update public.profiles set coins=0, streak=0 where is_admin;

create or replace function public.open_alkansya() returns jsonb language plpgsql security definer set search_path = public as $$
declare p public.profiles; d date:=(now() at time zone 'Asia/Manila')::date; wk text; receipt jsonb; saved integer; passive integer;
begin
 if auth.uid() is null then raise exception 'Sign in to collect'; end if;
 select * into strict p from public.profiles where id=auth.uid() for update;
 if p.is_admin then raise exception 'Administrator practice does not earn payouts'; end if;
 if extract(dow from d)<>0 or not(coalesce(p.progress->'plays','{}'::jsonb) ? d::text) then raise exception 'Complete Sunday’s drop before opening the Alkansya'; end if;
 wk:=(d-6)::text;
 if coalesce(p.progress->'cashouts','{}'::jsonb) ? wk then return p.progress->'cashouts'->wk; end if;
 select least(6,count(*)) into passive from public.user_collections c join public.collection_items i on i.id=c.item_id where c.user_id=auth.uid() and i.active and i.financial_role='Asset';
 saved:=coalesce((p.progress->>'alkansyaCoins')::integer,0);
 receipt:=jsonb_build_object('saved',saved,'passive',passive,'total',saved+passive);
 update public.profiles set coins=coins+saved+passive,progress=jsonb_set(jsonb_set(p.progress,'{alkansyaCoins}','0'),'{cashouts}',coalesce(p.progress->'cashouts','{}'::jsonb)||jsonb_build_object(wk,receipt)) where id=auth.uid();
 return receipt;
end; $$;

