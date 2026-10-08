/**
 * Formats Google Calendar event start times for /live.
 *
 * The page is prerendered on the build server, so the server's own timezone is
 * meaningless here: every value is formatted in the event's timezone, falling
 * back to Utah time, where the events are.
 */

export const DEFAULT_TIME_ZONE = 'America/Denver';

/** The subset of calendar_v3.Schema$EventDateTime this module reads. */
export type EventStart = {
  dateTime?: string | null;
  date?: string | null;
  timeZone?: string | null;
};

const weekdays: Record<string, string> = {
  MO: 'Monday',
  TU: 'Tuesday',
  WE: 'Wednesday',
  TH: 'Thursday',
  FR: 'Friday',
  SA: 'Saturday',
  SU: 'Sunday',
};

// Some ICU versions put a narrow no-break space (U+202F) before AM/PM; keep
// output consistent across Node versions.
const clean = (value: string) => value.replace(/\u202f/g, ' ');

const formatDate = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat('en-US', {
    timeZone,
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

const formatTime = (date: Date, timeZone: string) =>
  clean(
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  );

const formatWeekday = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'long' }).format(date);

/** Reads "Weekly on …" days from an RRULE, or null if it isn't weekly. */
const weeklyDays = (recurrence: string[], start: Date, timeZone: string) => {
  const rule = recurrence.find((line) => line.startsWith('RRULE:'));
  if (!rule) return null;

  const parts = new Map(
    rule
      .slice('RRULE:'.length)
      .split(';')
      .map((part) => part.split('=') as [string, string])
  );
  if (parts.get('FREQ') !== 'WEEKLY') return null;

  const byDay = parts.get('BYDAY');
  if (!byDay) return [formatWeekday(start, timeZone)];

  const days = byDay.split(',').map((code) => weekdays[code]);
  return days.every(Boolean) ? days : null;
};

/**
 * "3/5/2026 @ 12:30 PM", "Weekly on Thursday @ 7:30 PM", or "3/5/2026" for
 * all-day events. Returns null when there's no usable start.
 */
export const formatEventWhen = (
  start: EventStart,
  recurrence: string[] = []
): string | null => {
  if (start.dateTime) {
    const date = new Date(start.dateTime);
    if (Number.isNaN(date.getTime())) return null;

    const timeZone = start.timeZone || DEFAULT_TIME_ZONE;
    const time = formatTime(date, timeZone);
    const days = weeklyDays(recurrence, date, timeZone);

    return days
      ? `Weekly on ${days.join(' and ')} @ ${time}`
      : `${formatDate(date, timeZone)} @ ${time}`;
  }

  if (start.date) {
    // All-day events are a calendar date with no time or zone; format as-is.
    const date = new Date(`${start.date}T00:00:00Z`);
    return Number.isNaN(date.getTime()) ? null : formatDate(date, 'UTC');
  }

  return null;
};
