import { createFileRoute } from '@tanstack/react-router';
import { PreservedPage, preservedHead } from '@/components/preserved-page';
import { Button } from '@/components/ui/button';
import { isReviewInquiry, reviewBookingUrl, reviewInquiry } from '@/lib/review-request';
export const Route = createFileRoute('/contact')({
  validateSearch: (search: Record<string, unknown>): { inquiry?: string } => isReviewInquiry(search['inquiry']) ? { inquiry: 'revive-review' } : {},
  head: () => preservedHead('contact'), component: Page,
});
function Page() {
  const { inquiry } = Route.useSearch();
  return <>{inquiry && <section className="review-request wrap"><span className="eyebrow">REVIVE</span><h1>{reviewInquiry}</h1><p>We’ll review your reactivation workflow and identify a practical starting cohort and campaign.</p><p>Book a conversation with our team. Please do not submit patient lists or identifiable patient information.</p><Button asChild><a href={reviewBookingUrl()}>Book your reactivation review</a></Button></section>}<PreservedPage name="contact" /></>;
}
