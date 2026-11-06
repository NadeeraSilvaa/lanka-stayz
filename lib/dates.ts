const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** True for a real calendar day written as YYYY-MM-DD. */
export function isISODate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1) return false;
  const daysInMonth = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return day <= daysInMonth[month - 1];
}

/**
 * Whole nights between two ISO dates.
 * Uses a day count rather than `Date`, so time zones cannot shift the result.
 */
export function nightsBetween(checkIn: string, checkOut: string): number | null {
  if (!isISODate(checkIn) || !isISODate(checkOut) || checkOut <= checkIn) return null;
  const [y1, m1, d1] = checkIn.split("-").map(Number);
  const [y2, m2, d2] = checkOut.split("-").map(Number);
  const start = julianDay(y1, m1, d1);
  const end = julianDay(y2, m2, d2);
  const nights = end - start;
  return nights > 0 ? nights : null;
}

/** Julian day number for a Gregorian date. Enough to subtract two dates. */
function julianDay(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

export function formatDisplayDate(iso: string): string {
  if (!isISODate(iso)) return iso;
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

/**
 * Local calendar day as YYYY-MM-DD.
 * On the server, call `await connection()` from `next/server` first so Cache
 * Components do not treat the clock as prerender output. On the client, call
 * from a click handler, focus handler, or effect.
 */
export function todayISO(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
