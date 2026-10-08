import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { render, screen, within } from '@testing-library/react';

// Registered before the page is imported (see the dynamic import below), so
// the page's googleapis import gets this mock. Items arrive as the API returns
// them with singleEvents: recurring series expanded into instances. Dates are
// in the past relative to the real clock, so all fall inside the 4-week window.
jest.mock('googleapis', () => ({
  google: {
    calendar: () => ({
      events: {
        list: async () => ({
          data: {
            items: [
              {
                id: 'trivia-1',
                recurringEventId: 'trivia',
                summary: 'Pub trivia',
                start: { dateTime: '2026-03-04T19:00:00-07:00', timeZone: 'America/Denver' },
              },
              {
                id: 'one-off',
                summary: 'Standup showcase',
                // Not the Denver fallback, so a dropped timeZone shows up.
                start: { dateTime: '2026-03-05T21:30:00-05:00', timeZone: 'America/New_York' },
              },
              {
                id: 'trivia-2',
                recurringEventId: 'trivia',
                summary: 'Pub trivia',
                start: { dateTime: '2026-03-11T19:00:00-06:00', timeZone: 'America/Denver' },
              },
            ],
          },
        }),
      },
    }),
  },
}));

describe('/live page', () => {
  beforeAll(() => {
    process.env.GCAL_CALENDAR_ID = 'test-calendar';
    process.env.GCAL_API_KEY = 'test-key';
  });

  it('lists every date, recurring and one-off, in order', async () => {
    const { default: Page } = await import('./page');
    render(await Page());

    const list = screen.getByRole('list');
    const headings = within(list)
      .getAllByRole('heading', { level: 2 })
      .map((h) => h.textContent);
    expect(headings).toEqual(['3/4/2026 @ 7:00 PM', '3/5/2026 @ 9:30 PM', '3/11/2026 @ 7:00 PM']);
    expect(screen.getAllByText('Pub trivia')).toHaveLength(2);
    expect(screen.getByText('Standup showcase')).toBeInTheDocument();
  });
});
