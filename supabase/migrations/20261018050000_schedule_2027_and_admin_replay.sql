-- 1. Shift questions previously scheduled for 2026-01-01..2026-10-15 forward to 2027-01-01..2027-10-15
update public.questions
set
  id = 'H2027' || substr(id, 6),
  scheduled_date = (scheduled_date + interval '1 year')::date,
  payload = jsonb_set(
    jsonb_set(payload, '{id}', to_jsonb('H2027' || substr(id, 6))),
    '{scheduledDate}',
    to_jsonb(((scheduled_date + interval '1 year')::date)::text)
  )
where scheduled_date between date '2026-01-01' and date '2026-10-15'
  and id like 'H2026-%'
  and not exists (
    select 1 from public.questions q2 where q2.id = 'H2027' || substr(public.questions.id, 6)
  );

-- Remove any leftover admin answer logs so analytics remain strictly player-only
delete from public.user_answers a
using public.profiles p
where a.user_id = p.id and p.is_admin = true;

-- 2. Administrators can answer questions endlessly in a day without recording answers or locking the day
create or replace function public.submit_answer(p_question text, p_choice text)
returns boolean language plpgsql security definer set search_path = public as $$
declare
  d date := (now() at time zone 'Asia/Manila')::date;
  q public.questions;
  correct boolean;
  existing boolean;
  mapping jsonb;
  admin_user boolean;
begin
  if auth.uid() is null then raise exception 'Sign in to play'; end if;
  select is_admin into strict admin_user from public.profiles where id = auth.uid() for update;
  if not admin_user then
    select is_correct into existing from public.user_answers where user_id = auth.uid() and question_id = p_question and play_date = d;
    if found then return existing; end if;
  end if;
  if not exists(select 1 from public.daily_question_ids(d) x where x.id = p_question) then
    raise exception 'This card is not scheduled for today';
  end if;
  if not admin_user and exists(select 1 from public.profiles where id = auth.uid() and progress->'plays' ? d::text) then
    raise exception 'Daily drop already completed';
  end if;
  select * into strict q from public.questions where id = p_question;
  if q.payload->>'kind' = 'sort' then
    mapping := p_choice::jsonb;
    correct := jsonb_typeof(mapping) = 'object' and not exists(
      select 1 from jsonb_array_elements(q.payload->'items') i
      where mapping->>(i->>'key') is distinct from i->>'answer'
    );
  else
    if q.payload->'options' is not null and not exists(
      select 1 from jsonb_array_elements(q.payload->'options') o
      where o->>'key' = p_choice
    ) then
      raise exception 'Invalid choice';
    end if;
    correct := p_choice = q.correct_answer;
  end if;
  if admin_user then
    return coalesce(correct, false);
  end if;
  insert into public.user_answers(user_id, question_id, user_choice, is_correct, play_date)
  values(auth.uid(), p_question, p_choice, coalesce(correct, false), d);
  update public.profiles
  set progress = jsonb_set(
    progress,
    '{alkansyaCoins}',
    to_jsonb(coalesce((progress->>'alkansyaCoins')::integer, 0) + case when correct then 1 else 0 end)
  )
  where id = auth.uid();
  return coalesce(correct, false);
end; $$;

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
      result := jsonb_set(result, '{alkansyaCoins}', to_jsonb((result->>'alkansyaCoins')::integer + 5));
      result := jsonb_set(result, '{ginto}', to_jsonb((result->>'ginto')::integer + 5));
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

revoke all on function public.submit_answer(text, text), public.save_progress(jsonb) from public, anon;
grant execute on function public.submit_answer(text, text), public.save_progress(jsonb) to authenticated;
