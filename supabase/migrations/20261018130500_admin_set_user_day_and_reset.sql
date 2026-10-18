-- 1. Support admin-configured sequenceOffset in daily_question_ids and save_progress
create or replace function public.daily_question_ids(p_date date)
returns table(id text, slot integer)
language plpgsql stable security invoker set search_path = public as $$
declare
  completed_before integer;
  seq_offset integer;
  active_day integer;
  prog jsonb;
  plays jsonb;
begin
  if auth.uid() is null then raise exception 'Sign in to play'; end if;
  select coalesce(p.progress, '{}'::jsonb) into strict prog
    from public.profiles p where p.id = auth.uid();
  plays := coalesce(prog->'plays', '{}'::jsonb);
  seq_offset := coalesce((prog->>'sequenceOffset')::integer, 0);
  -- Match the client: exclude p_date so saving today's drop never shifts its cards.
  select count(*) into completed_before from jsonb_object_keys(plays) k
    where k <> p_date::text;
  active_day := ((((completed_before + seq_offset) % 365) + 365) % 365) + 1;
  return query
    select chosen.id, s.n
    from generate_series(1,3) s(n)
    cross join lateral (
      select q.id from public.questions q
      where q.slot = s.n and (
        q.scheduled_date = p_date
        or (q.scheduled_date is null and q.recurring_day = extract(dow from p_date)::integer)
        or (q.scheduled_date is null and q.recurring_day is null and q.sequence_day = active_day)
      )
      order by case when q.scheduled_date = p_date then 0
                    when q.recurring_day is not null then 1 else 2 end, q.id
      limit 1
    ) chosen;
end;
$$;

-- 2. Allow administrators to reset a player's current day answers/completion and optionally set their Question Day (1..365)
create or replace function public.admin_set_user_day(p_user uuid, p_day integer default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  p public.profiles;
  d date := (now() at time zone 'Asia/Manila')::date;
  result jsonb;
  plays jsonb;
  today_play jsonb;
  answered_coins integer := 0;
  bonus_coins integer := 0;
  hakbang_coins integer := 0;
  completed_before integer := 0;
  seq_offset integer := 0;
  chain integer := 0;
  cursor_day date;
  gaps integer := 0;
  n integer;
begin
  perform pg_advisory_xact_lock(71027);
  if not public.is_admin() then
    raise exception 'Administrator access required';
  end if;
  if p_day is not null and (p_day < 1 or p_day > 365) then
    raise exception 'Question day must be between 1 and 365';
  end if;
  select * into strict p from public.profiles where id = p_user for update;
  if p.is_admin then
    raise exception 'Use the practice day selector for administrator accounts';
  end if;

  result := '{"plays":{},"basag":{},"cashouts":{},"alkansyaCoins":0,"ginto":0,"restTokens":0,"restDays":[],"bestStreak":0,"sequenceOffset":0}'::jsonb || coalesce(p.progress, '{}'::jsonb);
  plays := coalesce(result->'plays', '{}'::jsonb);

  -- Calculate coins earned today so resetting today does not inflate alkansyaCoins or ginto
  select count(*) filter (where a.is_correct)
  into answered_coins
  from public.user_answers a
  where a.user_id = p_user and a.play_date = d;

  if plays ? d::text then
    today_play := plays->d::text;
    bonus_coins := coalesce((today_play->>'perfectBonus')::integer, 0);
    if coalesce((today_play->>'hakbang')::boolean, false) then
      hakbang_coins := 2;
    end if;
    plays := plays - d::text;
  end if;

  delete from public.user_answers
  where user_id = p_user and play_date = d;

  result := jsonb_set(result, '{plays}', plays);
  result := jsonb_set(
    result,
    '{alkansyaCoins}',
    to_jsonb(greatest(0, coalesce((result->>'alkansyaCoins')::integer, 0) - answered_coins - bonus_coins - hakbang_coins))
  );
  result := jsonb_set(
    result,
    '{ginto}',
    to_jsonb(greatest(0, coalesce((result->>'ginto')::integer, 0) - hakbang_coins))
  );

  if p_day is not null then
    select count(*) into completed_before from jsonb_object_keys(plays) k where k <> d::text;
    seq_offset := (((p_day - 1 - (completed_before % 365)) % 365) + 365) % 365;
    result := jsonb_set(result, '{sequenceOffset}', to_jsonb(seq_offset));
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

  update public.profiles set progress = result, streak = chain where id = p_user;
  return result;
end;
$$;

revoke all on function public.daily_question_ids(date), public.admin_set_user_day(uuid, integer) from public, anon;
grant execute on function public.daily_question_ids(date), public.admin_set_user_day(uuid, integer) to authenticated;
