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

  it('keeps only the next instance of each recurring series', async () => {
    list.mockResolvedValue({
      data: {
        items: [
          { id: 'a' },
          { id: 'trivia-1', recurringEventId: 'trivia' },
          { id: 'b' },
          { id: 'trivia-2', recurringEventId: 'trivia' },
          { id: 'open-mic-1', recurringEventId: 'open-mic' },
        ],
      },
    });
    const { getEvents } = await load();

    const { events } = await getEvents();

    expect(events.map(({ id }) => id)).toEqual(['a', 'trivia-1', 'b', 'open-mic-1']);
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
