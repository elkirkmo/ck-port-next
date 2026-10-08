import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';

// Registered before the page is imported (see the dynamic import below), so
// the page's googleapis import gets this mock.
jest.mock('googleapis', () => ({
  google: {
    calendar: () => ({
      events: {
        list: async () => ({
          data: {
            items: [
              {
                id: 'one-off',
                summary: 'Standup showcase',
                // Not the Denver fallback, so a dropped timeZone shows up.
                start: { dateTime: '2026-03-05T21:30:00-05:00', timeZone: 'America/New_York' },
              },
              {
                id: 'weekly',
                summary: 'Pub trivia',
                start: { dateTime: '2026-03-04T19:00:00-07:00', timeZone: 'America/Denver' },
                recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=WE'],
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

  it('passes each event start and recurrence through to the formatter', async () => {
    const { default: Page } = await import('./page');
    render(await Page());

    expect(screen.getByRole('heading', { level: 2, name: '3/5/2026 @ 9:30 PM' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Weekly on Wednesday @ 7:00 PM' })
    ).toBeInTheDocument();
    expect(screen.getByText('Standup showcase')).toBeInTheDocument();
    expect(screen.getByText('Pub trivia')).toBeInTheDocument();
  });
});
