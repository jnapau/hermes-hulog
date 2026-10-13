/**
 * Date helpers. Hulog is "one per calendar day, uniform nationwide", so every
 * date in the app is a plain 'YYYY-MM-DD' string in Philippine time (Asia/Manila).
 * Arithmetic is done in UTC on those strings so DST / device timezone never matter.
 */

export type ISODate = string; // 'YYYY-MM-DD'

const manilaFmt = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Manila',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** Today's date in the Philippines. */
export function todayPH(): ISODate {
  return manilaFmt.format(new Date());
}

export function toUTC(d: ISODate): Date {
  return new Date(`${d}T00:00:00Z`);
}

export function fromUTC(dt: Date): ISODate {
  return dt.toISOString().slice(0, 10);
}

export function addDays(d: ISODate, n: number): ISODate {
  const dt = toUTC(d);
  dt.setUTCDate(dt.getUTCDate() + n);
  return fromUTC(dt);
}

/** Whole days from a to b (b - a). */
export function diffDays(a: ISODate, b: ISODate): number {
  return Math.round((toUTC(b).getTime() - toUTC(a).getTime()) / 86_400_000);
}

/** 0 = Sunday … 6 = Saturday */
export function dayOfWeek(d: ISODate): number {
  return toUTC(d).getUTCDay();
}

/** Monday of the week that contains d (weeks run Mon → Sun, Basag on Sunday). */
export function weekStart(d: ISODate): ISODate {
  const dow = dayOfWeek(d);
  return addDays(d, dow === 0 ? -6 : 1 - dow);
}

export function isValidISO(d: string | null | undefined): d is ISODate {
  if (!d || !/^\d{4}-\d{2}-\d{2}$/.test(d)) return false;
  return !Number.isNaN(toUTC(d).getTime()) && fromUTC(toUTC(d)) === d;
}

export const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const DAY_FIL = ['Linggo', 'Lunes', 'Martes', 'Miyerkules', 'Huwebes', 'Biyernes', 'Sabado'];
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function formatLong(d: ISODate): string {
  const dt = toUTC(d);
  return `${DAY_SHORT[dt.getUTCDay()]}, ${MONTHS[dt.getUTCMonth()].slice(0, 3)} ${dt.getUTCDate()}, ${dt.getUTCFullYear()}`;
}

export function formatShort(d: ISODate): string {
  const dt = toUTC(d);
  return `${MONTHS[dt.getUTCMonth()].slice(0, 3)} ${dt.getUTCDate()}`;
}
