/**
 * The daily schedule — which 3 cards everyone gets on a given date.
 *
 * It is fully deterministic (no database needed): the same date always gives
 * the same cards, for every player, and the admin panel can list the exact
 * dates every question will be shown.
 *
 * Rules (from the Hulog concept paper, "The Core Daily Loop"):
 *   Mon–Sat  → Card 1 "Bagong Kaalaman" (new insight)
 *              Card 2 "Balik-Aral"      (spaced review of a card shown 1 / 3 / 7 days ago)
 *              Card 3 "Para sa Iyo"     (personalized slot — in this MVP, the next new card;
 *                                         Money DNA routing comes in Phase 2)
 *   Sunday   → Card 1 "Linggo Boss"     (Shock Simulator, FRP 108)
 *              Card 2 + 3 "Balik-Aral"  (review of the week)
 *
 * Change SCHEDULE_START to move the whole calendar.
 */
import { QUESTIONS, isBossCard } from '../data/questions';
import type { CourseCode, Question } from '../data/types';
import { addDays, dayOfWeek, diffDays, type ISODate } from './date';

/** Day #1 of Hulog. Keep it on a Monday so weeks line up with the Sunday Basag. */
export const SCHEDULE_START: ISODate = '2026-10-12';

export type CardRole = 'new' | 'review' | 'personal' | 'boss';

export const ROLE_LABEL: Record<CardRole, string> = {
  new: 'Bagong Kaalaman',
  review: 'Balik-Aral',
  personal: 'Para sa Iyo',
  boss: 'Linggo Boss',
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
const COURSE_ORDER: CourseCode[] = [101, 102, 103, 104, 105, 106, 107, 108];

function buildPool(): Question[] {
  const byCourse = COURSE_ORDER.map((c) => QUESTIONS.filter((q) => q.course === c && !isBossCard(q)));
  const longest = Math.max(...byCourse.map((l) => l.length));
  const pool: Question[] = [];
  for (let i = 0; i < longest; i++) {
    for (const list of byCourse) if (list[i]) pool.push(list[i]);
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
  if (d === 15 || d === 30 || (m === 2 && d === lastDay)) tags.push('Sweldo Hulog Special');
  if (m === 1) tags.push('Bagong Taon, Bagong Alkansya');
  if (m === 3 || m === 4) tags.push('Tax & Statutory Deadline Focus');
  if (m === 6) tags.push('Balik-Eskwela & Tag-Ulan');
  if (m === 10) tags.push('Anti-Scam Month');
  if (m === 11 || m === 12) tags.push('Paskong Masinop');
  if (dayOfWeek(date) === 0) tags.push('Basag Day');
  return tags;
}

/** The 3 cards for a date, or null if the date is before Hulog #1. */
export function getDaySchedule(date: ISODate): DaySchedule | null {
  const index = diffDays(SCHEDULE_START, date);
  if (index < 0) return null;
  const L = ROTATION.length;
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
    // Early days don't have a 3- or 7-day-old card yet → fall back to yesterday's.
    let reviewIdx = 2 * n - offset;
    if (reviewIdx < 0) reviewIdx = 2 * n - 2;
    // Day #1 has nothing to review at all → borrow the last card of the rotation.
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

/** CSV of the schedule, for Excel / Google Sheets. */
export function scheduleToCSV(days: DaySchedule[]): string {
  const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const rows = [['Date', 'Hulog #', 'Day', 'Slot', 'Role', 'Question ID', 'FRP', 'Format', 'Prompt', 'Answer', 'Tags'].join(',')];
  for (const d of days) {
    d.cards.forEach((c, i) => {
      rows.push(
        [
          d.date,
          String(d.hulogNumber),
          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek(d.date)],
          String(i + 1),
          ROLE_LABEL[c.role],
          c.question.id,
          `FRP ${c.question.course}`,
          esc(c.question.format),
          esc(c.question.prompt),
          esc(c.question.answerLabel),
          esc(d.tags.join(' | ')),
        ].join(','),
      );
    });
  }
  return '\uFEFF' + rows.join('\r\n');
}
