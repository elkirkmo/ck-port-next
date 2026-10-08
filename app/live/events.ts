import { google, type calendar_v3 } from 'googleapis';

type CalendarEvent = calendar_v3.Schema$Event;

/**
 * Keeps only the soonest instance of each recurring series, so a weekly event
 * shows once at its next date instead of filling the list. Expects events
 * already ordered by start time.
 */
export const nextOccurrences = (events: CalendarEvent[]) => {
  const seen = new Set<string>();

  return events.filter(({ recurringEventId }) => {
    if (!recurringEventId) return true;
    if (seen.has(recurringEventId)) return false;
    seen.add(recurringEventId);
    return true;
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
    return { events: nextOccurrences(result.data?.items || []) };
  } catch (error) {
    console.error('Failed to load calendar events:', error);
    return { events: [] as CalendarEvent[] };
  }
};
