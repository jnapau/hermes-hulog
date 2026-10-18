import type { Question } from '../data/types';

export const CURRICULUM_DAYS = 365;
export type CompletedPlays = Record<string, unknown>;

/** Excluding today's completion keeps today's cards stable after saving. */
export function activeSequenceDay(date: string, plays: CompletedPlays = {}, sequenceOffset = 0): number {
  const completedBefore = Object.keys(plays).filter(day => day !== date).length;
  return ((((completedBefore + sequenceOffset) % CURRICULUM_DAYS) + CURRICULUM_DAYS) % CURRICULUM_DAYS) + 1;
}

export function selectSequenceQuestions(questions: Question[], sequenceDay: number): Question[] {
  return questions.filter(q => q.sequenceDay === sequenceDay && !q.scheduledDate && q.recurringDay == null)
    .sort((a, b) => (a.slot ?? 0) - (b.slot ?? 0) || a.id.localeCompare(b.id));
}

/** Mirrors the RPC: date override, recurring weekday, then the player's sequence. */
export function selectDailyQuestions(questions: Question[], date: string, plays: CompletedPlays = {}, sequenceOffset = 0): Question[] {
  const weekday = new Date(`${date}T00:00:00Z`).getUTCDay();
  const sequenceDay = activeSequenceDay(date, plays, sequenceOffset);
  return [1, 2, 3].map(slot => {
    const pool = questions.filter(q => q.slot === slot).sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
    return pool.find(q => q.scheduledDate === date)
      ?? pool.find(q => !q.scheduledDate && q.recurringDay === weekday)
      ?? pool.find(q => !q.scheduledDate && q.recurringDay == null && q.sequenceDay === sequenceDay);
  }).filter((q): q is Question => Boolean(q));
}
