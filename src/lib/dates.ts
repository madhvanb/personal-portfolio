/**
 * Date formatting. All dates on the site go through these so the format stays
 * consistent. Dates are formatted in UTC so a build server's timezone can't
 * shift "2026-01-01" to Dec 31.
 */

// Three-letter English month names. Hand-written so every month is exactly
// three letters (Intl's en-GB gives "Sept"; en-US puts the month first).
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const month = (d: Date): string => MONTHS[d.getUTCMonth()] ?? '';

/** "Mar 2026" */
export const formatMonthYear = (d: Date): string => `${month(d)} ${d.getUTCFullYear()}`;

/** "04 Mar 2026" */
export const formatDate = (d: Date): string =>
  `${String(d.getUTCDate()).padStart(2, '0')} ${month(d)} ${d.getUTCFullYear()}`;

/** "2026" */
export const formatYear = (d: Date): string => String(d.getUTCFullYear());

/** "Mar 2024 — Present" / "Mar 2024 — Jun 2025" */
export function formatRange(start: Date, end?: Date | null): string {
  return `${formatMonthYear(start)} — ${end ? formatMonthYear(end) : 'Present'}`;
}

/** Machine-readable value for <time datetime="...">. */
export const isoDate = (d: Date): string => d.toISOString().slice(0, 10);
