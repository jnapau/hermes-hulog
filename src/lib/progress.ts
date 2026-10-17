/**
 * Player progress synchronized to the authenticated Supabase profile.
 * Database functions validate rewards before persisting changes.
 */
import { supabase, reportError } from "./supabase";
import { getCurrentUser, refreshAccount } from "./users";
import { useSyncExternalStore } from "react";
import { COLLECTIBLES } from "../data/collectibles";
import { addDays, dayOfWeek, diffDays, weekStart, type ISODate } from "./date";

export interface PlayRecord {
  results: boolean[];
  barya: number;
  hakbang: boolean;
  at: string;
}

export interface Progress {
  alkansyaCoins: number;
  targetGoal: string | null;
  cashouts: Record<ISODate, { saved: number; passive: number; total: number }>;
  plays: Record<ISODate, PlayRecord>;
  ginto: number;
  restTokens: number;
  restDays: ISODate[];
  /** Legacy ownership receipts; new Sunday payouts use cashouts. */
  basag: Record<ISODate, string>;
  checkinTime: string;
  ritual: string;
  bestStreak: number;
  sound: boolean;
}

const MAX_REST_TOKENS = 3;

const DEFAULT: Progress = {
  alkansyaCoins: 0,
  targetGoal: null,
  cashouts: {},
  plays: {},
  ginto: 0,
  restTokens: 0,
  restDays: [],
  basag: {},
  checkinTime: "07:15",
  ritual: "magtimpla ng kape",
  bestStreak: 0,
  sound: true,
};

let state: Progress = { ...DEFAULT };
const listeners = new Set<() => void>();

window.addEventListener("hulog:hydrate", (event) => {
  state = { ...DEFAULT, ...(event as CustomEvent).detail };
  listeners.forEach((l) => l());
});
let queue: Promise<unknown> = Promise.resolve();
function save(next: Progress): Promise<void> {
  try {
    if (getCurrentUser()) {
      const owner = getCurrentUser()!.id;
      queue = queue
        .catch(() => {})
        .then(async () => {
          if (getCurrentUser()?.id !== owner) return;
          const { data, error } = await supabase.rpc("save_progress", {
            p_progress: next,
          });
          if (error) {
            reportError(error.message);
            await refreshAccount();
            throw error;
          }
          if (getCurrentUser()?.id === owner) {
            state = { ...DEFAULT, ...data };
            listeners.forEach((l) => l());
          }
        });
      void queue.catch(() => {});
    }
  } catch {
    /* storage full / private mode — keep in memory */
  }
  listeners.forEach((l) => l());
  return queue.then(() => {});
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

export function updateSettings(
  patch: Partial<Pick<Progress, "checkinTime" | "ritual" | "sound">>,
) {
  void save({ ...state, ...patch }).catch(() => {});
}

export function resetProgress() {
  void save({ ...DEFAULT }).catch(() => {});
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
  return Array.from({ length: 7 }, (_, i) => addDays(start, i)).filter(
    (d) => p.plays[d],
  );
}

export function weekBarya(p: Progress, today: ISODate): number {
  return weekPlays(p, today).reduce((s, d) => s + p.plays[d].barya, 0);
}

/** Weeks (Mon–Sun) with 5 or more drops — the forgiving habit metric. */
export function strongWeeks(p: Progress): number {
  const counts = new Map<ISODate, number>();
  playedDates(p).forEach((d) =>
    counts.set(weekStart(d), (counts.get(weekStart(d)) ?? 0) + 1),
  );
  return Array.from(counts.values()).filter((n) => n >= 5).length;
}

export function completedWeeks(p: Progress): ISODate[] {
  const weeks = new Set(playedDates(p).map(weekStart));
  return Array.from(weeks).sort();
}

const covered = (p: Progress, d: ISODate) =>
  Boolean(p.plays[d]) || p.restDays.includes(d);

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

export type FlameState =
  | "apoy"
  | "apoy-dim"
  | "baga"
  | "pahinga"
  | "bagong-simula"
  | "unang-hulog";

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
      state: "unang-hulog",
      streak: 0,
      title: "First Drop",
      message:
        "Welcome! Ready for your first daily drop? Takes about three minutes.",
    };
  }
  if (p.plays[today]) {
    return {
      state: "apoy",
      streak,
      title: "Hearth Flame Lit",
      message: `Your flame is burning bright! ${streak} days in a row.`,
    };
  }
  const yesterday = addDays(today, -1);
  if (p.plays[yesterday]) {
    return {
      state: "apoy-dim",
      streak,
      title: "Awaiting Today’s Drop",
      message:
        "Fresh coffee ready? Take three minutes for your daily money habit. ☕",
    };
  }
  if (p.restDays.includes(yesterday)) {
    return {
      state: "pahinga",
      streak,
      title: "Rest Day Protected",
      message:
        "Rest day protected by your token. Well-deserved—let’s keep going!",
    };
  }
  const last = dates[dates.length - 1];
  const missed = diffDays(last, today) - 1;
  if (missed === 1) {
    return {
      state: "baga",
      streak,
      title: "Glowing Embers",
      message:
        "Your embers are still warm! One quick drop today reignites the flame.",
    };
  }
  if (missed >= 2 && p.restTokens >= missed - 1) {
    return {
      state: "pahinga",
      streak: currentStreakWithTokens(p, today, missed),
      title: "Pahinga Rest Shield",
      message: `Shielded by ${missed - 1} Pahinga rest token(s). Streak preserved!`,
    };
  }
  return {
    state: "bagong-simula",
    streak: 0,
    title: "Fresh Start",
    message:
      "Welcome back! Every day is an opportunity to rebuild your streak.",
  };
}

function currentStreakWithTokens(
  p: Progress,
  today: ISODate,
  missed: number,
): number {
  const fake: Progress = { ...p, restDays: [...p.restDays] };
  for (let i = 2; i <= missed; i++) fake.restDays.push(addDays(today, -i));
  return currentStreak(fake, today);
}

// ── Actions ─────────────────────────────────────────────────────────────────

/** Save today's completed Hulog. Applies Pahinga tokens and awards new ones. */
export async function recordPlay(
  today: ISODate,
  results: boolean[],
): Promise<void> {
  if (getCurrentUser()?.is_admin) return;
  if (state.plays[today]) return;
  const next: Progress = {
    ...state,
    plays: { ...state.plays },
    restDays: [...state.restDays],
  };

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
  await save(next);
  await refreshAccount();
}

export async function completeHakbang(today: ISODate): Promise<void> {
  if (getCurrentUser()?.is_admin) return;
  const rec = state.plays[today];
  if (!rec || rec.hakbang) return;
  await save({
    ...state,
    ginto: state.ginto + 5,
    plays: { ...state.plays, [today]: { ...rec, hakbang: true } },
  });
}

export function canBasag(p: Progress, today: ISODate): boolean {
  return (
    dayOfWeek(today) === 0 &&
    Boolean(p.plays[today]) &&
    !p.cashouts[weekStart(today)]
  );
}

/** Atomically collect the bank and capped productive-asset bonus. */
export async function doBasag(
  today: ISODate,
): Promise<{ saved: number; passive: number; total: number } | null> {
  if (!canBasag(state, today)) return null;
  await queue;
  const { data, error } = await supabase.rpc("open_alkansya");
  if (error) throw new Error(error.message);
  await refreshAccount();
  return data;
}

export async function pinGoal(id: string | null) {
  await save({ ...state, targetGoal: id });
}

export async function purchaseCollectible(id: string) {
  await queue;
  const { error } = await supabase.rpc("purchase_item", { p_item: id });
  if (error) throw new Error(error.message);
  await refreshAccount();
}

export function heritageRank(ownedIds: string[]) {
  const worth = COLLECTIBLES.filter(
    (c) => c.financialRole === "Reserve" && ownedIds.includes(c.id),
  ).reduce((sum, c) => sum + c.price, 0);
  return {
    worth,
    name:
      worth >= 600
        ? "Heritage Guardian"
        : worth >= 300
          ? "Heritage Keeper"
          : worth >= 100
            ? "Heritage Steward"
            : "Heritage Explorer",
  };
}

// ── Ranks ───────────────────────────────────────────────────────────────────

export const RANKS = [
  {
    name: "Baguhan",
    en: "Beginner",
    days: 7,
    milestone: "Set up first personal monthly budget envelope",
  },
  {
    name: "Masinop",
    en: "Prudent",
    days: 30,
    milestone: "Established first dedicated emergency fund deposit",
  },
  {
    name: "Matatag",
    en: "Resilient",
    days: 90,
    milestone: "1 month of essential expenses secured + protection review",
  },
  {
    name: "Maunlad",
    en: "Thriving",
    days: 180,
    milestone: "First long-term life goal funded",
  },
];

export function rankFor(days: number) {
  let current: (typeof RANKS)[number] | null = null;
  for (const r of RANKS) if (days >= r.days) current = r;
  const next = RANKS.find((r) => days < r.days) ?? null;
  return { current, next };
}
