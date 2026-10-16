import type { Question } from '../data/types';

/** Same priority and rotation as public.daily_question_ids; date is Philippine YYYY-MM-DD. */
export function selectDailyQuestions(questions: Question[], date: string): Question[] {
  const weekday = new Date(`${date}T00:00:00Z`).getUTCDay();
  return [1, 2, 3].map(slot => {
    const pool = questions.filter(q => q.slot === slot).sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
    const specific = pool.filter(q => q.scheduledDate === date);
    const recurring = pool.filter(q => !q.scheduledDate && q.recurringDay === weekday);
    const fallback = pool.filter(q => !q.scheduledDate && q.recurringDay == null);
    const list = specific.length ? specific : recurring.length ? recurring : fallback;
    const index = specific.length || recurring.length ? 0 : Math.floor(Date.parse(`${date}T00:00:00Z`) / 86400000) % list.length;
    return list[index];
  }).filter((q): q is Question => Boolean(q));
}
