/**
 * The daily schedule — which 3 cards everyone gets on a given date.
 *
 * Fully deterministic: the same date gives a uniform set of cards,
 * mapped across the Philippine calendar year with support for custom admin cards.
 *
 * Rules:
 *   Mon–Sat  → Card 1 "Daily Insight"     (new curriculum card)
 *              Card 2 "Spaced Review"     (spaced repetition card)
 *              Card 3 "Recommended"       (personalized slot / next card)
 *   Sunday   → Card 1 "Sunday Boss"       (Shock Simulator, FRP 108)
 *              Card 2 + 3 "Weekly Review" (spaced reinforcement of the week)
 */
import type { Question } from '../data/types';
import { addDays, dayOfWeek, diffDays, type ISODate } from './date';
import { dailyQuestions, getAllQuestions } from './customQuestions';

/** Day #1 of Hulog. Monday, October 12, 2026. */
export const SCHEDULE_START: ISODate = '2026-10-12';

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

function seasonalTags(date: ISODate): string[] {
  const [, m, d] = date.split('-').map(Number);
  const tags: string[] = [];
  const lastDay = new Date(Date.UTC(Number(date.slice(0, 4)), m, 0)).getUTCDate();
  if (d === 15 || d === 30 || (m === 2 && d === lastDay)) tags.push('Payday Hulog Special');
  if (m === 1) tags.push('New Year, Fresh Alkansya');
  if (m === 2) tags.push('Family Financial Alignment');
  if (m === 3 || m === 4) tags.push('Tax & Statutory Deadline Focus');
  if (m === 5) tags.push('Summer Household Energy Management');
  if (m === 6) tags.push('Balik-Eskwela & Tag-Ulan Readiness');
  if (m === 7 || m === 8) tags.push('Mid-Year Financial Audit');
  if (m === 9) tags.push('Pre-Holiday Sinking Funds');
  if (m === 10) tags.push('National Cybersecurity & Anti-Scam Month');
  if (m === 11 || m === 12) tags.push('Paskong Masinop & 13th Month Plan');
  if (dayOfWeek(date) === 0) tags.push('Sunday Basag Day');
  return tags;
}

/** The 3 cards for a date, or null if the date is before Hulog #1. */
export function getDaySchedule(date: ISODate): DaySchedule | null {
  const index = diffDays(SCHEDULE_START, date);
  if (index < 0) return null;
  const assigned = dailyQuestions(date);
  if (assigned.length !== 3) return null;
  return { date, hulogNumber: index + 1, isSunday: dayOfWeek(date) === 0, cards: assigned.map(question => ({ question, role: 'new' as CardRole })), tags: seasonalTags(date) };

}

export interface Appearance {
  date: ISODate;
  role: CardRole;
  slot: number;
  hulogNumber: number;
}

/** Every appearance of every question between two dates (inclusive). */
export function buildAppearanceIndex(from: ISODate, to: ISODate): Map<string, Appearance[]> {
  const map = new Map<string, Appearance[]>();
  const all = getAllQuestions();
  all.forEach((q) => map.set(q.id, []));
  const start = diffDays(SCHEDULE_START, from) < 0 ? SCHEDULE_START : from;
  const total = diffDays(start, to);
  for (let i = 0; i <= total; i++) {
    const date = addDays(start, i);
    const day = getDaySchedule(date);
    if (!day) continue;
    day.cards.forEach((c, slot) => {
      map.get(c.question.id)?.push({ date, role: c.role, slot: slot + 1, hulogNumber: day.hulogNumber });
    });
  }
  return map;
}

export function scheduleRange(from: ISODate, to: ISODate): DaySchedule[] {
  const out: DaySchedule[] = [];
  const total = diffDays(from, to);
  for (let i = 0; i <= total; i++) {
    const s = getDaySchedule(addDays(from, i));
    if (s) out.push(s);
  }
  return out;
}
