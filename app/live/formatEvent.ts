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

/**
 * "3/5/2026 @ 12:30 PM", or "3/5/2026" for all-day events. Returns null when
 * there's no usable start.
 */
export const formatEventWhen = (start: EventStart): string | null => {
  if (start.dateTime) {
    const date = new Date(start.dateTime);
    if (Number.isNaN(date.getTime())) return null;

    const timeZone = start.timeZone || DEFAULT_TIME_ZONE;
    return `${formatDate(date, timeZone)} @ ${formatTime(date, timeZone)}`;
  }

  if (start.date) {
    // All-day events are a calendar date with no time or zone; format as-is.
    const date = new Date(`${start.date}T00:00:00Z`);
    return Number.isNaN(date.getTime()) ? null : formatDate(date, 'UTC');
  }

  return null;
};
