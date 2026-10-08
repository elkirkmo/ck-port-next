import { google, type calendar_v3 } from 'googleapis';

type CalendarEvent = calendar_v3.Schema$Event;

/** How far ahead to list each date of a recurring event. */
export const RECURRING_WINDOW_DAYS = 28;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Lists recurring events date by date, but only within the window, so a weekly
 * event doesn't fill the page. One-off events always show, however far ahead.
 */
export const withinRecurringWindow = (events: CalendarEvent[], now: Date) => {
  const cutoff = now.getTime() + RECURRING_WINDOW_DAYS * DAY_MS;

  return events.filter(({ recurringEventId, start }) => {
    if (!recurringEventId) return true;
    const begins = Date.parse(start?.dateTime || start?.date || '');
    return Number.isNaN(begins) || begins < cutoff;
  });
};

/** Present and future events, soonest first. */
export const getEvents = async (now: Date = new Date()) => {
  const calID = process.env.GCAL_CALENDAR_ID;
  const calApiKey = process.env.GCAL_API_KEY;

  // Without credentials the Calendar API returns 403. Bail out early so a
  // missing env var renders an empty schedule rather than failing the build.
  if (!calID || !calApiKey) {
    console.warn('GCAL_CALENDAR_ID or GCAL_API_KEY is unset; skipping fetch.');
    return { events: [] as CalendarEvent[] };
  }

  const calendar = google.calendar({ version: 'v3', auth: calApiKey });

  try {
    const result = await calendar.events.list({
      calendarId: calID,
      // timeMin filters on an event's *end*, so events in progress still show.
      timeMin: now.toISOString(),
      // Expand recurring series into real instances (skipping cancelled
      // dates); required for ordering by start time.
      singleEvents: true,
      orderBy: 'startTime',
    });
    return { events: withinRecurringWindow(result.data?.items || [], now) };
  } catch (error) {
    console.error('Failed to load calendar events:', error);
    return { events: [] as CalendarEvent[] };
  }
};
