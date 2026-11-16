export const reviewInquiry = 'Revive reactivation review';
export function reviewBookingUrl() {
  const url = new URL('https://calendly.com/adil-tuluhealth/30min');
  url.searchParams.set('a1', reviewInquiry);
  url.searchParams.set('utm_content', 'revive-reactivation-review');
  return url.toString();
}
export function isReviewInquiry(value: unknown) { return value === 'revive-review'; }