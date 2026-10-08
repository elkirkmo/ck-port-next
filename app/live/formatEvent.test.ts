/**
 * @jest-environment node
 */
import { describe, expect, it } from '@jest/globals';
import { formatEventWhen } from './formatEvent';

// A server timezone far from Utah: output must not depend on it.
process.env.TZ = 'Asia/Tokyo';

const denver = (dateTime: string) => ({ dateTime, timeZone: 'America/Denver' });

describe('formatEventWhen: single events', () => {
  it('shows the right month, day and minutes (issue #11 repro)', () => {
    expect(formatEventWhen(denver('2026-03-05T12:30:00-07:00'))).toBe('3/5/2026 @ 12:30 PM');
  });

  it('keeps non-zero minutes', () => {
    expect(formatEventWhen(denver('2026-03-05T19:05:00-07:00'))).toBe('3/5/2026 @ 7:05 PM');
  });

  it('renders midnight as 12 AM and noon as 12 PM', () => {
    expect(formatEventWhen(denver('2026-03-06T00:00:00-07:00'))).toBe('3/6/2026 @ 12:00 AM');
    expect(formatEventWhen(denver('2026-03-06T12:00:00-07:00'))).toBe('3/6/2026 @ 12:00 PM');
  });

  it("uses the event's own timezone", () => {
    expect(
      formatEventWhen({ dateTime: '2026-07-04T20:00:00-04:00', timeZone: 'America/New_York' })
    ).toBe('7/4/2026 @ 8:00 PM');
  });

  it('falls back to Utah time, including across a date boundary', () => {
    // 02:30 UTC on the 6th is 7:30 PM on the 5th in Denver.
    expect(formatEventWhen({ dateTime: '2026-03-06T02:30:00Z' })).toBe('3/5/2026 @ 7:30 PM');
  });

  it('formats all-day events as a date', () => {
    expect(formatEventWhen({ date: '2026-03-05' })).toBe('3/5/2026');
  });

  it('returns null without a usable start', () => {
    expect(formatEventWhen({})).toBeNull();
    expect(formatEventWhen({ dateTime: 'not a date' })).toBeNull();
  });
});

describe('formatEventWhen: recurring events', () => {
  const start = denver('2026-03-05T19:30:00-07:00');

  it('reads BYDAY', () => {
    expect(formatEventWhen(start, ['RRULE:FREQ=WEEKLY;BYDAY=TH'])).toBe(
      'Weekly on Thursday @ 7:30 PM'
    );
  });

  it('reads BYDAY when it is not the last rule part', () => {
    expect(
      formatEventWhen(start, ['RRULE:FREQ=WEEKLY;BYDAY=TH;UNTIL=20261231T000000Z'])
    ).toBe('Weekly on Thursday @ 7:30 PM');
  });

  it('lists several days', () => {
    expect(formatEventWhen(start, ['RRULE:FREQ=WEEKLY;BYDAY=TU,TH'])).toBe(
      'Weekly on Tuesday and Thursday @ 7:30 PM'
    );
  });

  it('takes the weekday from the start in the event timezone when BYDAY is absent', () => {
    // Friday in UTC and Tokyo, Thursday in Denver.
    expect(formatEventWhen({ dateTime: '2026-03-06T02:30:00Z' }, ['RRULE:FREQ=WEEKLY'])).toBe(
      'Weekly on Thursday @ 7:30 PM'
    );
  });

  it('shows the date for rules that are not weekly', () => {
    expect(formatEventWhen(start, ['RRULE:FREQ=MONTHLY;BYMONTHDAY=5'])).toBe(
      '3/5/2026 @ 7:30 PM'
    );
  });
});
