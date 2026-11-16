import { describe, expect, it } from 'vitest';
import { isReviewInquiry, reviewBookingUrl } from '@/lib/review-request';
describe('Reactivation review inquiry', () => {
  it('retains the approved inquiry in the existing booking destination', () => {
    const url = new URL(reviewBookingUrl());
    expect(url.origin + url.pathname).toBe('https://calendly.com/adil-tuluhealth/30min');
    expect(url.searchParams.get('a1')).toBe('Revive reactivation review');
  });
  it('recognises only the review request, not unrelated inquiries', () => {
    expect(isReviewInquiry('revive-review')).toBe(true);
    expect(isReviewInquiry('launch-campaign')).toBe(false);
  });
});