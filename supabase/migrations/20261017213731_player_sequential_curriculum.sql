-- Calendar dates still govern daily completion and rewards; curriculum order is personal.
alter table public.questions add column sequence_day integer
  check (sequence_day between 1 and 365);
alter table public.questions add constraint question_sequence_without_calendar
  check (sequence_day is null or (scheduled_date is null and recurring_day is null));
create unique index one_question_per_sequence_slot
  on public.questions(sequence_day, slot) where sequence_day is not null;

-- Reuse the existing generated rows rather than deleting/reinserting the curriculum.
-- The regenerated seed replaces their content immediately after this migration.
update public.questions q set
  id = 'H-D' || lpad((q.scheduled_date - date '2026-10-16' + 1)::text, 3, '0') || '-' || q.slot,
  sequence_day = q.scheduled_date - date '2026-10-16' + 1,
  payload = (q.payload - 'scheduledDate') || jsonb_build_object(
    'id', 'H-D' || lpad((q.scheduled_date - date '2026-10-16' + 1)::text, 3, '0') || '-' || q.slot,
    'sequenceDay', q.scheduled_date - date '2026-10-16' + 1),
  scheduled_date = null
where q.id ~ '^H202[67]-[0-9]{2}-[0-9]{2}-[123]$'
  and q.scheduled_date between date '2026-10-16' and date '2027-10-15'
  and not exists (
    select 1 from public.questions target
    where target.id = 'H-D' || lpad((q.scheduled_date - date '2026-10-16' + 1)::text, 3, '0') || '-' || q.slot
  );

create or replace function public.daily_question_ids(p_date date)
returns table(id text, slot integer)
language plpgsql stable security invoker set search_path = public as $$
declare
  completed_before integer;
  active_day integer;
  plays jsonb;
begin
  if auth.uid() is null then raise exception 'Sign in to play'; end if;
  select coalesce(p.progress->'plays', '{}'::jsonb) into strict plays
    from public.profiles p where p.id = auth.uid();
  -- Match the client: exclude p_date so saving today's drop never shifts its cards.
  select count(*) into completed_before from jsonb_object_keys(plays) k
    where k <> p_date::text;
  active_day := (completed_before % 365) + 1;
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
revoke all on function public.daily_question_ids(date) from public, anon;
grant execute on function public.daily_question_ids(date) to authenticated;
