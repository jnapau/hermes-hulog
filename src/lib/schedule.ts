/** Per-player learning sequence; calendar dates only enforce daily limits and rewards. */
import type { Question } from '../data/types';
import { dayOfWeek, type ISODate } from './date';
import { dailyQuestions } from './customQuestions';
import { activeSequenceDay } from './dailyQuestions';
import { getProgress, type Progress } from './progress';

export type CardRole = 'new' | 'review' | 'personal' | 'boss';

export const ROLE_LABEL: Record<CardRole, string> = {
  new: 'Daily Insight',
  review: 'Spaced Review',
  personal: 'Recommended for You',
  boss: 'Sunday Boss: Crisis Simulator',
};

export const ROLE_STYLE: Record<CardRole, string> = {
  new: 'bg-amber-100 text-amber-800 border-amber-200',
  review: 'bg-sky-100 text-sky-800 border-sky-200',
  personal: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  boss: 'bg-rose-100 text-rose-800 border-rose-200',
};

export interface ScheduledCard {
  question: Question;
  role: CardRole;
}

export interface DaySchedule {
  date: ISODate;
  hulogNumber: number;
  isSunday: boolean;
  cards: ScheduledCard[];
  tags: string[];
}

/** Calendar dates enforce the daily limit; completed drops choose the curriculum day. */
export function getDaySchedule(date: ISODate, progress: Pick<Progress, 'plays'> = getProgress()): DaySchedule | null {
  const sequenceDay = activeSequenceDay(date, progress.plays);
  const assigned = dailyQuestions(date, progress.plays);
  if (assigned.length !== 3) return null;
  return { date, hulogNumber: sequenceDay, isSunday: dayOfWeek(date) === 0, cards: assigned.map(question => ({ question, role: 'new' as CardRole })), tags: assigned.some(q => q.paydaySpecial) ? ['Sweldo Hulog Special'] : [] };

}
