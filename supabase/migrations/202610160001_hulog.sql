-- Passwords live exclusively in Supabase Auth (auth.users.encrypted_password).
-- Never expose or duplicate password hashes in public.profiles.
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 username text not null unique check (username ~ '^[a-z0-9_]{3,24}$'),
 is_admin boolean not null default false, coins integer not null default 0,
 streak integer not null default 0, equipped_outfit text,
 progress jsonb not null default '{}', created_at timestamptz not null default now()
);
create table public.questions (
 id text primary key, text text not null, choices jsonb not null,
 correct_answer text not null, explanation text not null, category text not null,
 scheduled_date date, recurring_day integer check(recurring_day between 0 and 6),
 slot integer not null check(slot between 1 and 3), payload jsonb not null,
 check(scheduled_date is null or recurring_day is null)
);
create unique index one_question_per_date_slot on public.questions(scheduled_date,slot) where scheduled_date is not null;
create unique index one_question_per_weekday_slot on public.questions(recurring_day,slot) where recurring_day is not null;
create table public.collection_items (id text primary key, category text not null, wearable boolean not null default false, reward_order integer not null unique);
create table public.user_collections (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles on delete cascade,
 item_id text not null references public.collection_items, category text not null,
 unlocked_at timestamptz not null default now(), unique(user_id,item_id)
);
create table public.user_answers (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles on delete cascade,
 question_id text not null, user_choice text not null, is_correct boolean not null,
 play_date date not null, answered_at timestamptz not null default now(), unique(user_id,question_id,play_date)
);
create index answers_by_date on public.user_answers(play_date,user_id);
create index collections_by_user on public.user_collections(user_id);
create function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
 select coalesce((select is_admin from public.profiles where id=auth.uid()),false);
$$;
alter table public.profiles enable row level security;
alter table public.questions enable row level security;
alter table public.collection_items enable row level security;
alter table public.user_collections enable row level security;
alter table public.user_answers enable row level security;
create policy profile_read on public.profiles for select to authenticated using(id=auth.uid() or public.is_admin());
create policy question_read on public.questions for select to anon, authenticated using(true);
create policy question_admin on public.questions for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy item_read on public.collection_items for select to anon, authenticated using(true);
create policy collection_read on public.user_collections for select to authenticated using(user_id=auth.uid() or public.is_admin());
create policy answer_read on public.user_answers for select to authenticated using(user_id=auth.uid() or public.is_admin());
-- No direct write policy for profiles, collections, or answers: only validated RPCs.
create function public.create_profile() returns trigger language plpgsql security definer set search_path = public as $$
begin
 if lower(new.raw_user_meta_data->>'username')='hermeshulog' and coalesce(new.raw_app_meta_data->>'hulog_seed','false')<>'true' then
  raise exception 'This username is reserved';
 end if;
 insert into public.profiles(id,username) values(new.id, lower(new.raw_user_meta_data->>'username'));
 return new;
end; $$;
create trigger hulog_profile after insert on auth.users for each row execute function public.create_profile();

create function public.daily_question_ids(p_date date) returns table(id text, slot integer) language sql stable set search_path = public as $$
 select chosen.id, s.n from generate_series(1,3) s(n) cross join lateral (
   select q.id from public.questions q where q.slot=s.n and (
    q.scheduled_date=p_date or (q.scheduled_date is null and q.recurring_day=extract(dow from p_date)::integer)
    or (q.scheduled_date is null and q.recurring_day is null))
   order by case when q.scheduled_date=p_date then 0 when q.recurring_day is not null then 1 else 2 end,
   case when q.scheduled_date is null and q.recurring_day is null then
    mod((select count(*) from public.questions q2 where q2.slot=s.n and q2.scheduled_date is null and q2.recurring_day is null and q2.id<q.id) - mod(p_date-date '1970-01-01', greatest((select count(*) from public.questions q3 where q3.slot=s.n and q3.scheduled_date is null and q3.recurring_day is null),1)) + (select count(*) from public.questions q4 where q4.slot=s.n and q4.scheduled_date is null and q4.recurring_day is null), greatest((select count(*) from public.questions q5 where q5.slot=s.n and q5.scheduled_date is null and q5.recurring_day is null),1)) else 0 end, q.id limit 1
 ) chosen;
$$;

create function public.submit_answer(p_question text,p_choice text) returns boolean language plpgsql security definer set search_path = public as $$
declare d date := (now() at time zone 'Asia/Manila')::date; q public.questions; correct boolean; existing boolean; mapping jsonb;
begin
 if auth.uid() is null then raise exception 'Sign in to play'; end if;
 perform 1 from public.profiles where id=auth.uid() for update;
 select is_correct into existing from public.user_answers where user_id=auth.uid() and question_id=p_question and play_date=d;
 if found then return existing; end if;
 if not exists(select 1 from public.daily_question_ids(d) x where x.id=p_question) then raise exception 'This card is not scheduled for today'; end if;
 if exists(select 1 from public.profiles where id=auth.uid() and progress->'plays' ? d::text) then raise exception 'Daily drop already completed'; end if;
 select * into strict q from public.questions where id=p_question;
 if q.payload->>'kind'='sort' then
   mapping := p_choice::jsonb;
   correct := jsonb_typeof(mapping)='object' and not exists(select 1 from jsonb_array_elements(q.payload->'items') i where mapping->>(i->>'key') is distinct from i->>'answer');
 else
   if q.payload->'options' is not null and not exists(select 1 from jsonb_array_elements(q.payload->'options') o where o->>'key'=p_choice) then raise exception 'Invalid choice'; end if;
   correct := p_choice=q.correct_answer;
 end if;
 insert into public.user_answers(user_id,question_id,user_choice,is_correct,play_date) values(auth.uid(),p_question,p_choice,coalesce(correct,false),d);
 update public.profiles set coins=coins+case when correct then 1 else 0 end where id=auth.uid();
 return coalesce(correct,false);
end; $$;

create function public.save_progress(p_progress jsonb) returns jsonb language plpgsql security definer set search_path = public as $$
declare p public.profiles; d date := (now() at time zone 'Asia/Manila')::date; k text; r jsonb; result jsonb; correct_results jsonb; n integer; wk text; reward public.collection_items; chain integer:=0; cursor_day date; gaps integer:=0;
begin
 if auth.uid() is null then raise exception 'Sign in to save'; end if;
 select * into strict p from public.profiles where id=auth.uid() for update;
 result := p.progress;
 if not (result ? 'plays') then result := result || '{"plays":{},"basag":{},"ginto":0,"restTokens":0,"restDays":[],"bestStreak":0}'::jsonb; end if;
 -- Only the current day may be completed; results come from recorded answers.
 if (p_progress->'plays' ? d::text) and not (result->'plays' ? d::text) then
   select count(*), jsonb_agg(a.is_correct order by x.slot) into n, correct_results from public.daily_question_ids(d) x join public.user_answers a on a.question_id=x.id and a.user_id=auth.uid() and a.play_date=d;
   if n<>3 then raise exception 'Complete all three scheduled cards before saving'; end if;
   r:=jsonb_build_object('results',correct_results,'barya',(select count(*) from jsonb_array_elements(correct_results) v where v='true'::jsonb),'hakbang',false,'at',now());
   result:=jsonb_set(result,array['plays',d::text],r);
 end if;
 if coalesce((p_progress->'plays'->d::text->>'hakbang')::boolean,false) and result->'plays' ? d::text and not coalesce((result->'plays'->d::text->>'hakbang')::boolean,false) then
   result:=jsonb_set(result,array['plays',d::text,'hakbang'],'true');
   result:=jsonb_set(result,'{ginto}',to_jsonb(coalesce((result->>'ginto')::integer,0)+5));
 end if;
 wk:=(d - ((extract(dow from d)::integer+6)%7))::text;
 if extract(dow from d)=0 and result->'plays' ? d::text and p_progress->'basag' ? wk and not (result->'basag' ? wk) then
   select * into reward from public.collection_items i where not exists(select 1 from public.user_collections c where c.user_id=auth.uid() and c.item_id=i.id) order by reward_order limit 1;
   if found then
    insert into public.user_collections(user_id,item_id,category) values(auth.uid(),reward.id,reward.category) on conflict do nothing;
    result:=jsonb_set(result,array['basag',wk],to_jsonb(reward.id));
   end if;
 end if;
 -- Settings are the only arbitrary client data accepted.
 result:=result || jsonb_build_object('sound',coalesce((p_progress->>'sound')::boolean,true),'checkinTime',left(coalesce(p_progress->>'checkinTime','07:15'),5),'ritual',left(coalesce(p_progress->>'ritual','make coffee'),120));
 cursor_day:=d;
 if not(result->'plays' ? cursor_day::text) then cursor_day:=cursor_day-1; end if;
 for n in 1..1100 loop
  if result->'plays' ? cursor_day::text then chain:=chain+1;gaps:=0;else gaps:=gaps+1;exit when gaps>=2;end if;
  cursor_day:=cursor_day-1;
 end loop;
 result:=jsonb_set(result,'{bestStreak}',to_jsonb(greatest(chain,coalesce((result->>'bestStreak')::integer,0))));
 update public.profiles set progress=result,streak=chain where id=auth.uid();
 return result;
end; $$;
create function public.equip_item(p_item text) returns void language plpgsql security definer set search_path = public as $$
begin
 if auth.uid() is null then raise exception 'Sign in first';end if;
 if p_item is not null and not exists(select 1 from public.user_collections c join public.collection_items i on i.id=c.item_id where c.user_id=auth.uid() and i.id=p_item and i.wearable) then raise exception 'Unlock this wearable first';end if;
 update public.profiles set equipped_outfit=p_item where id=auth.uid();
end; $$;
create function public.set_admin(p_user uuid,p_admin boolean) returns void language plpgsql security definer set search_path = public as $$
begin
 -- Serialize role changes and prevent self-demotion.
 perform pg_advisory_xact_lock(71026);
 if not public.is_admin() then raise exception 'Administrator access required';end if;
 if p_user=auth.uid() then raise exception 'Ask another administrator to change your own role';end if;
 update public.profiles set is_admin=p_admin where id=p_user;
 if not found then raise exception 'User not found';end if;
end; $$;
revoke all on function public.create_profile() from public;
revoke all on function public.submit_answer(text,text),public.save_progress(jsonb),public.equip_item(text),public.set_admin(uuid,boolean) from public,anon;
grant execute on function public.submit_answer(text,text),public.save_progress(jsonb),public.equip_item(text),public.set_admin(uuid,boolean) to authenticated;
grant select on public.questions,public.collection_items to anon,authenticated;
grant select on public.profiles,public.user_answers,public.user_collections to authenticated;
grant insert,update,delete on public.questions to authenticated;
grant all on public.profiles,public.questions,public.collection_items,public.user_collections,public.user_answers to service_role;
