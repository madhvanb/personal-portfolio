/**
 * Date formatting. All dates on the site go through these so the format stays
 * consistent. Dates are formatted in UTC so a build server's timezone can't
 * shift "2026-01-01" to Dec 31.
 */

const monthYear = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const fullDate = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "Mar 2026" */
export const formatMonthYear = (d: Date): string => monthYear.format(d);

/** "04 Mar 2026" */
export const formatDate = (d: Date): string => fullDate.format(d);

/** "2026" */
export const formatYear = (d: Date): string => String(d.getUTCFullYear());

/** "Mar 2024 — Present" / "Mar 2024 — Jun 2025" */
export function formatRange(start: Date, end?: Date | null): string {
  return `${formatMonthYear(start)} — ${end ? formatMonthYear(end) : 'Present'}`;
}

/** Machine-readable value for <time datetime="...">. */
export const isoDate = (d: Date): string => d.toISOString().slice(0, 10);
