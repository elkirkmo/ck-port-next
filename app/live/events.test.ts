/**
 * @jest-environment node
 */
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

const list = jest.fn<(params: object) => Promise<{ data: { items: object[] } }>>();

// Registered before events.ts is imported (dynamic imports below).
jest.mock('googleapis', () => ({
  google: { calendar: () => ({ events: { list } }) },
}));

const load = () => import('./events');

describe('getEvents', () => {
  beforeEach(() => {
    process.env.GCAL_CALENDAR_ID = 'test-calendar';
    process.env.GCAL_API_KEY = 'test-key';
    list.mockReset();
    list.mockResolvedValue({ data: { items: [] } });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('asks only for present and future events, expanded and ordered by start', async () => {
    const { getEvents } = await load();
    const now = new Date('2026-03-05T12:00:00Z');

    await getEvents(now);

    expect(list).toHaveBeenCalledWith({
      calendarId: 'test-calendar',
      timeMin: '2026-03-05T12:00:00.000Z',
      singleEvents: true,
      orderBy: 'startTime',
    });
  });

  it('lists recurring dates for 4 weeks, and one-off events however far ahead', async () => {
    const at = (dateTime: string) => ({ start: { dateTime } });
    list.mockResolvedValue({
      data: {
        items: [
          { id: 'show', ...at('2026-10-08T19:00:00-06:00') },
          { id: 'trivia-1', recurringEventId: 'trivia', ...at('2026-10-12T18:30:00-06:00') },
          { id: 'trivia-2', recurringEventId: 'trivia', ...at('2026-10-19T18:30:00-06:00') },
          { id: 'trivia-4wk', recurringEventId: 'trivia', ...at('2026-11-02T18:30:00-07:00') },
          // Exactly 28 days after now: outside the window.
          { id: 'edge', recurringEventId: 'open-mic', ...at('2026-11-04T12:00:00Z') },
          { id: 'trivia-5wk', recurringEventId: 'trivia', ...at('2026-11-09T18:30:00-07:00') },
          { id: 'far-show', ...at('2026-12-20T20:00:00-07:00') },
        ],
      },
    });
    const { getEvents } = await load();

    const { events } = await getEvents(new Date('2026-10-07T12:00:00Z'));

    expect(events.map(({ id }) => id)).toEqual([
      'show',
      'trivia-1',
      'trivia-2',
      'trivia-4wk',
      'far-show',
    ]);
  });

  it('skips the request without credentials', async () => {
    delete process.env.GCAL_API_KEY;
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { getEvents } = await load();

    expect(await getEvents()).toEqual({ events: [] });
    expect(list).not.toHaveBeenCalled();
  });

  it('returns no events when the API fails', async () => {
    list.mockRejectedValue(new Error('quota'));
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const { getEvents } = await load();

    expect(await getEvents()).toEqual({ events: [] });
  });
});
