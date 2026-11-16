import { describe, expect, it } from 'vitest';
import { homepageExamples, isExampleBooked } from '@/components/home-demo-state';

describe('Homepage illustrative bookings', () => {
  it('does not show booked before an appointment is confirmed', () => {
    expect([0, 1, 2].map(isExampleBooked)).toEqual([false, false, false]);
    expect(isExampleBooked(3)).toBe(true);
    expect(homepageExamples.convert.messages[3].text).toContain('confirmed for Thursday at 10 am');
    expect(homepageExamples.revive.messages[3].text).toContain('confirmed for Tuesday at 2 pm');
  });
});