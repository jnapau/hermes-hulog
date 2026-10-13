/**
 * Player progress — stored only on this device (localStorage).
 * Hulog is a 100% private personal sanctuary: nothing here is ever sent anywhere.
 */
import { useSyncExternalStore } from 'react';
import { COLLECTIBLES } from '../data/collectibles';
import { addDays, dayOfWeek, diffDays, weekStart, type ISODate } from './date';

export interface PlayRecord {
  results: boolean[];
  barya: number;
  hakbang: boolean;
  at: string;
}

export interface Progress {
  plays: Record<ISODate, PlayRecord>;
  ginto: number;
  restTokens: number;
  restDays: ISODate[];
  /** weekStart (Monday) → collectible id */
  basag: Record<ISODate, string>;
  checkinTime: string;
  ritual: string;
  bestStreak: number;
  sound: boolean;
}

const KEY = 'hulog.progress.v1';
const MAX_REST_TOKENS = 3;

const DEFAULT: Progress = {
  plays: {},
  ginto: 0,
  restTokens: 0,
  restDays: [],
  basag: {},
  checkinTime: '07:15',
  ritual: 'magtimpla ng kape',
  bestStreak: 0,
  sound: true,
};

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT };
    return { ...DEFAULT, ...(JSON.parse(raw) as Partial<Progress>) };
  } catch {
    return { ...DEFAULT };
  }
}

let state: Progress = typeof window === 'undefined' ? { ...DEFAULT } : load();
const listeners = new Set<() => void>();

function save(next: Progress) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage full / private mode — keep in memory */
  }
  listeners.forEach((l) => l());
}

export function useProgress(): Progress {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => state,
  );
}

export function getProgress(): Progress {
  return state;
}

export function updateSettings(patch: Partial<Pick<Progress, 'checkinTime' | 'ritual' | 'sound'>>) {
  save({ ...state, ...patch });
}

export function resetProgress() {
  save({ ...DEFAULT });
}

// ── Derived stats ───────────────────────────────────────────────────────────

export function playedDates(p: Progress): ISODate[] {
  return Object.keys(p.plays).sort();
}

export function totalBarya(p: Progress): number {
  return Object.values(p.plays).reduce((s, r) => s + r.barya, 0);
}

export function weekPlays(p: Progress, today: ISODate): ISODate[] {
  const start = weekStart(today);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i)).filter((d) => p.plays[d]);
}

export function weekBarya(p: Progress, today: ISODate): number {
  return weekPlays(p, today).reduce((s, d) => s + p.plays[d].barya, 0);
}

/** Weeks (Mon–Sun) with 5 or more drops — the forgiving habit metric. */
export function strongWeeks(p: Progress): number {
  const counts = new Map<ISODate, number>();
  playedDates(p).forEach((d) => counts.set(weekStart(d), (counts.get(weekStart(d)) ?? 0) + 1));
  return Array.from(counts.values()).filter((n) => n >= 5).length;
}

export function completedWeeks(p: Progress): ISODate[] {
  const weeks = new Set(playedDates(p).map(weekStart));
  return Array.from(weeks).sort();
}

const covered = (p: Progress, d: ISODate) => Boolean(p.plays[d]) || p.restDays.includes(d);

/** Streak = played days in the current chain. One missed day ("Baga") never breaks it. */
export function currentStreak(p: Progress, today: ISODate): number {
  let cursor = today;
  // start from the most recent covered day (today or within the 1-day grace)
  if (!covered(p, cursor)) cursor = addDays(cursor, -1);
  if (!covered(p, cursor)) cursor = addDays(cursor, -1);
  if (!covered(p, cursor)) return 0;
  let streak = 0;
  let gap = 0;
  // walk back at most ~3 years
  for (let i = 0; i < 1100; i++) {
    if (covered(p, cursor)) {
      if (p.plays[cursor]) streak++;
      gap = 0;
    } else {
      gap++;
      if (gap >= 2) break;
    }
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export type FlameState = 'apoy' | 'apoy-dim' | 'baga' | 'pahinga' | 'bagong-simula' | 'unang-hulog';

export interface FlameInfo {
  state: FlameState;
  streak: number;
  title: string;
  message: string;
}

export function flameInfo(p: Progress, today: ISODate): FlameInfo {
  const dates = playedDates(p);
  const streak = currentStreak(p, today);
  if (dates.length === 0) {
    return {
      state: 'unang-hulog',
      streak: 0,
      title: 'Unang Hulog',
      message: 'Tara, simulan natin ang unang hulog mo. Isang minuto lang!',
    };
  }
  if (p.plays[today]) {
    return {
      state: 'apoy',
      streak,
      title: 'Apoy',
      message: `Maliwanag ang apoy! ${streak} araw ka nang tuloy-tuloy.`,
    };
  }
  const yesterday = addDays(today, -1);
  if (p.plays[yesterday]) {
    return {
      state: 'apoy-dim',
      streak,
      title: 'Naghihintay ang Apoy',
      message: 'Mainit pa ang kape? Isang hulog lang muna para sa sarili mo. ☕',
    };
  }
  if (p.restDays.includes(yesterday)) {
    return {
      state: 'pahinga',
      streak,
      title: 'Pahinga',
      message: 'Nagpahinga ka kahapon. Karapat-dapat \u2019yan. Tuloy ang laban.',
    };
  }
  const last = dates[dates.length - 1];
  const missed = diffDays(last, today) - 1;
  if (missed === 1) {
    return {
      state: 'baga',
      streak,
      title: 'Baga',
      message: 'Baga pa \u2019yan, hindi pa patay. Isang hulog lang ngayon, sisiklab ulit!',
    };
  }
  if (missed >= 2 && p.restTokens >= missed - 1) {
    return {
      state: 'pahinga',
      streak: currentStreakWithTokens(p, today, missed),
      title: 'Pahinga',
      message: `Protektado ng ${missed - 1} Pahinga token ang apoy mo. Tuloy ang laban!`,
    };
  }
  return {
    state: 'bagong-simula',
    streak: 0,
    title: 'Bagong Simula',
    message: 'Maligayang pagbabalik! Kahit kailan, puwedeng magsimula muli.',
  };
}

function currentStreakWithTokens(p: Progress, today: ISODate, missed: number): number {
  const fake: Progress = { ...p, restDays: [...p.restDays] };
  for (let i = 2; i <= missed; i++) fake.restDays.push(addDays(today, -i));
  return currentStreak(fake, today);
}

// ── Actions ─────────────────────────────────────────────────────────────────

/** Save today's completed Hulog. Applies Pahinga tokens and awards new ones. */
export function recordPlay(today: ISODate, results: boolean[]): void {
  if (state.plays[today]) return;
  const next: Progress = { ...state, plays: { ...state.plays }, restDays: [...state.restDays] };

  // Never miss twice: spend rest tokens to bridge a 2+ day gap, if available.
  const dates = playedDates(state);
  if (dates.length) {
    const missed = diffDays(dates[dates.length - 1], today) - 1;
    if (missed >= 2 && next.restTokens >= missed - 1) {
      for (let i = 2; i <= missed; i++) next.restDays.push(addDays(today, -i));
      next.restTokens -= missed - 1;
    }
  }

  next.plays[today] = {
    results,
    barya: results.filter(Boolean).length,
    hakbang: false,
    at: new Date().toISOString(),
  };

  // Earn 1 Pahinga token when a week reaches 5 drops (cap 3, never purchasable).
  if (weekPlays(next, today).length === 5) {
    next.restTokens = Math.min(MAX_REST_TOKENS, next.restTokens + 1);
  }

  next.bestStreak = Math.max(next.bestStreak, currentStreak(next, today));
  save(next);
}

export function completeHakbang(today: ISODate): void {
  const rec = state.plays[today];
  if (!rec || rec.hakbang) return;
  save({
    ...state,
    ginto: state.ginto + 5,
    plays: { ...state.plays, [today]: { ...rec, hakbang: true } },
  });
}

export function canBasag(p: Progress, today: ISODate): boolean {
  return dayOfWeek(today) === 0 && Boolean(p.plays[today]) && !p.basag[weekStart(today)];
}

/** Break the alkansya on Sunday — returns the collectible id that was revealed. */
export function doBasag(today: ISODate): string | null {
  if (!canBasag(state, today)) return null;
  const owned = new Set(Object.values(state.basag));
  const next = COLLECTIBLES.find((c) => !owned.has(c.id)) ?? COLLECTIBLES[Object.keys(state.basag).length % COLLECTIBLES.length];
  save({ ...state, basag: { ...state.basag, [weekStart(today)]: next.id } });
  return next.id;
}

// ── Ranks ───────────────────────────────────────────────────────────────────

export const RANKS = [
  { name: 'Baguhan', en: 'Beginner', days: 7, milestone: 'Set up first personal monthly budget envelope' },
  { name: 'Masinop', en: 'Prudent', days: 30, milestone: 'Established first dedicated emergency fund deposit' },
  { name: 'Matatag', en: 'Resilient', days: 90, milestone: '1 month of essential expenses secured + protection review' },
  { name: 'Maunlad', en: 'Thriving', days: 180, milestone: 'First long-term life goal funded' },
];

export function rankFor(days: number) {
  let current: (typeof RANKS)[number] | null = null;
  for (const r of RANKS) if (days >= r.days) current = r;
  const next = RANKS.find((r) => days < r.days) ?? null;
  return { current, next };
}
