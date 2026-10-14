/**
 * The daily schedule — which 3 cards everyone gets on a given date.
 *
 * Fully deterministic (no database needed): the same date always gives
 * the same cards for every player, mapped across the 365-day year.
 *
 * Rules (from the Hulog concept paper, "The Core Daily Loop"):
 *   Mon–Sat  → Card 1 "Daily Insight"     (new curriculum card)
 *              Card 2 "Spaced Review"     (spaced repetition of a card shown 1 / 3 / 7 days ago)
 *              Card 3 "Recommended"       (personalized slot / next curriculum card)
 *   Sunday   → Card 1 "Sunday Boss"       (Shock Simulator, FRP 108 — 52 unique weeks)
 *              Card 2 + 3 "Weekly Review" (spaced reinforcement of the week)
 */
import { QUESTIONS, isBossCard } from '../data/questions';
import type { CourseCode, Question } from '../data/types';
import { addDays, dayOfWeek, diffDays, type ISODate } from './date';

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

// ── Build the weekday rotation: round-robin across FRP courses for variety ──
const COURSE_ORDER: CourseCode[] = [101, 102, 103, 104, 105, 106, 107];

function buildPool(): Question[] {
  const byCourse = COURSE_ORDER.map((c) =>
    QUESTIONS.filter((q) => q.course === c && !isBossCard(q)),
  );
  const longest = Math.max(...byCourse.map((l) => l.length));
  const pool: Question[] = [];
  for (let i = 0; i < longest; i++) {
    for (const list of byCourse) {
      if (list[i]) pool.push(list[i]);
    }
  }
  return pool;
}

export const ROTATION: Question[] = buildPool();
export const BOSS_CARDS: Question[] = QUESTIONS.filter(isBossCard);

const REVIEW_OFFSETS = [2, 6, 14]; // ≈ 1, 3 and 7 weekdays back (2 new cards per weekday)

const mod = (n: number, m: number) => ((n % m) + m) % m;

/** Number of non-Sunday days in [SCHEDULE_START, date). */
function weekdaysBefore(date: ISODate): number {
  const days = diffDays(SCHEDULE_START, date);
  const fullWeeks = Math.floor(days / 7);
  let count = fullWeeks * 6;
  for (let i = fullWeeks * 7; i < days; i++) {
    if (dayOfWeek(addDays(SCHEDULE_START, i)) !== 0) count++;
  }
  return count;
}

function sundaysBefore(date: ISODate): number {
  const days = diffDays(SCHEDULE_START, date);
  return days - weekdaysBefore(date);
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
  const L = ROTATION.length || 1;
  const isSunday = dayOfWeek(date) === 0;
  const n = weekdaysBefore(date);
  let cards: ScheduledCard[];

  if (isSunday) {
    const boss = BOSS_CARDS[mod(sundaysBefore(date), BOSS_CARDS.length)];
    cards = [
      { question: boss, role: 'boss' },
      { question: ROTATION[mod(2 * n - 2, L)], role: 'review' },
      { question: ROTATION[mod(2 * n - 8, L)], role: 'review' },
    ];
  } else {
    const newA = ROTATION[mod(2 * n, L)];
    const newB = ROTATION[mod(2 * n + 1, L)];
    const offset = REVIEW_OFFSETS[n % REVIEW_OFFSETS.length];
    let reviewIdx = 2 * n - offset;
    if (reviewIdx < 0) reviewIdx = 2 * n - 2;
    const review: ScheduledCard =
      reviewIdx >= 0
        ? { question: ROTATION[mod(reviewIdx, L)], role: 'review' }
        : { question: ROTATION[L - 1], role: 'new' };
    cards = [
      { question: newA, role: 'new' },
      review,
      { question: newB, role: 'personal' },
    ];
  }

  return { date, hulogNumber: index + 1, isSunday, cards, tags: seasonalTags(date) };
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
  QUESTIONS.forEach((q) => map.set(q.id, []));
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
