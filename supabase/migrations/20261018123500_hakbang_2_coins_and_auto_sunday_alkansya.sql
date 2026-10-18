-- 1. Update Isang Hakbang reward to +2 coins in save_progress
create or replace function public.save_progress(p_progress jsonb)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  p public.profiles;
  d date := (now() at time zone 'Asia/Manila')::date;
  result jsonb;
  scores jsonb;
  n integer;
  score integer;
  wk date;
  chain integer := 0;
  cursor_day date;
  gaps integer := 0;
  missed integer;
  last_day date;
  tokens integer;
begin
  if auth.uid() is null then raise exception 'Sign in to save'; end if;
  select * into strict p from public.profiles where id = auth.uid() for update;
  result := '{"plays":{},"basag":{},"cashouts":{},"alkansyaCoins":0,"ginto":0,"restTokens":0,"restDays":[],"bestStreak":0}'::jsonb || p.progress;
  wk := d - ((extract(dow from d)::integer + 6) % 7);

  -- Only non-admin players record daily play completion and hakbang lockouts
  if not p.is_admin then
    if (p_progress->'plays' ? d::text) and not (result->'plays' ? d::text) then
      select count(*), jsonb_agg(a.is_correct order by x.slot), count(*) filter(where a.is_correct)
      into n, scores, score
      from public.daily_question_ids(d) x
      join public.user_answers a on a.question_id = x.id and a.user_id = auth.uid() and a.play_date = d;
      if n <> 3 then raise exception 'Complete all three scheduled cards before saving'; end if;
      select max(k::date) into last_day from jsonb_object_keys(result->'plays') k;
      missed := d - last_day - 1;
      tokens := coalesce((result->>'restTokens')::integer, 0);
      if missed >= 2 and tokens >= missed - 1 then
        for n in 2..missed loop
          result := jsonb_set(result, '{restDays}', (result->'restDays') || to_jsonb((d - n)::text));
        end loop;
        result := jsonb_set(result, '{restTokens}', to_jsonb(tokens - missed + 1));
      end if;
      result := jsonb_set(
        result,
        array['plays', d::text],
        jsonb_build_object(
          'results', scores,
          'barya', score,
          'perfectBonus', case when score = 3 then 1 else 0 end,
          'hakbang', false,
          'at', now()
        )
      );
      if score = 3 then
        result := jsonb_set(result, '{alkansyaCoins}', to_jsonb((result->>'alkansyaCoins')::integer + 1));
      end if;
      select count(*) into n from jsonb_object_keys(result->'plays') k where k::date between wk and wk + 6;
      if n = 5 then
        result := jsonb_set(result, '{restTokens}', to_jsonb(least(3, (result->>'restTokens')::integer + 1)));
      end if;
    end if;

    if coalesce((p_progress->'plays'->d::text->>'hakbang')::boolean, false)
       and result->'plays' ? d::text
       and not coalesce((result->'plays'->d::text->>'hakbang')::boolean, false) then
      result := jsonb_set(result, array['plays', d::text, 'hakbang'], 'true');
      result := jsonb_set(result, '{alkansyaCoins}', to_jsonb((result->>'alkansyaCoins')::integer + 2));
      result := jsonb_set(result, '{ginto}', to_jsonb((result->>'ginto')::integer + 2));
    end if;
  end if;

  -- Settings and a valid, still-locked catalog goal are the only client-owned fields.
  result := result || jsonb_build_object(
    'sound', coalesce((p_progress->>'sound')::boolean, true),
    'checkinTime', left(coalesce(p_progress->>'checkinTime', '07:15'), 5),
    'ritual', left(coalesce(p_progress->>'ritual', 'make coffee'), 120)
  );
  if p_progress ? 'targetGoal' then
    if p_progress->>'targetGoal' is null then
      result := result || '{"targetGoal":null}'::jsonb;
    elsif exists(
      select 1 from public.collection_items i
      where i.id = p_progress->>'targetGoal' and i.active
        and not exists(select 1 from public.user_collections c where c.user_id = auth.uid() and c.item_id = i.id)
    ) then
      result := result || jsonb_build_object('targetGoal', p_progress->>'targetGoal');
    end if;
  end if;

  cursor_day := d;
  if not (result->'plays' ? cursor_day::text) then cursor_day := cursor_day - 1; end if;
  if not (result->'plays' ? cursor_day::text) and not (result->'restDays' ? cursor_day::text) then cursor_day := cursor_day - 1; end if;
  for n in 1..1100 loop
    if result->'plays' ? cursor_day::text or result->'restDays' ? cursor_day::text then
      if result->'plays' ? cursor_day::text then chain := chain + 1; end if;
      gaps := 0;
    else
      gaps := gaps + 1;
      exit when gaps >= 2;
    end if;
    cursor_day := cursor_day - 1;
  end loop;
  result := jsonb_set(result, '{bestStreak}', to_jsonb(greatest(chain, (result->>'bestStreak')::integer)));
  update public.profiles set progress = result, streak = chain where id = auth.uid();
  return result;
end; $$;

-- 2. Allow Sunday-only automatic Alkansya claiming on app open whenever coins are saved
create or replace function public.open_alkansya()
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  p public.profiles;
  d date := (now() at time zone 'Asia/Manila')::date;
  wk text;
  receipt jsonb;
  saved integer;
  passive integer;
begin
  if auth.uid() is null then raise exception 'Sign in to collect'; end if;
  select * into strict p from public.profiles where id = auth.uid() for update;
  if p.is_admin then raise exception 'Administrator practice does not earn payouts'; end if;
  if extract(dow from d) <> 0 then
    raise exception 'Alkansya coins can only be claimed on Sunday';
  end if;
  wk := (d - 6)::text;
  if coalesce(p.progress->'cashouts', '{}'::jsonb) ? wk then
    return p.progress->'cashouts'->wk;
  end if;
  saved := coalesce((p.progress->>'alkansyaCoins')::integer, 0);
  if saved <= 0 then
    raise exception 'Save coins in your Alkansya before Sunday payout';
  end if;
  select least(6, count(*)) into passive
  from public.user_collections c
  join public.collection_items i on i.id = c.item_id
  where c.user_id = auth.uid() and i.active and i.financial_role = 'Asset';
  receipt := jsonb_build_object('saved', saved, 'passive', passive, 'total', saved + passive);
  update public.profiles
  set
    coins = coins + saved + passive,
    progress = jsonb_set(
      jsonb_set(p.progress, '{alkansyaCoins}', '0'),
      '{cashouts}',
      coalesce(p.progress->'cashouts', '{}'::jsonb) || jsonb_build_object(wk, receipt)
    )
  where id = auth.uid();
  return receipt;
end; $$;

revoke all on function public.save_progress(jsonb), public.open_alkansya() from public, anon;
grant execute on function public.save_progress(jsonb), public.open_alkansya() to authenticated;
