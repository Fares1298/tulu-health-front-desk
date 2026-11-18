import { createFileRoute } from '@tanstack/react-router';
import { PartnerGrid } from '@/components/partner-media';
import { PartnerPerspectives } from '@/components/partner-perspectives';

export const Route = createFileRoute('/partners')({
  head: () => ({ meta: [
    { title: 'Partners | Tulu Health' },
    { name: 'description', content: 'Hospitals, clinics and organisations working with Tulu to connect intelligence with action and build the future of healthcare together.' },
    { property: 'og:title', content: 'Partners | Tulu Health' },
    { property: 'og:description', content: 'Building the future of healthcare, together. Meet Tulu Health’s partners.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: PartnersPage,
});

function PartnersPage() {
  return <main className="evidence-page wrap"><header><span className="eyebrow">TULU HEALTH</span><h1>Partners</h1><h2>Building the future of healthcare, together.</h2><p>Hospitals, clinics and organisations working with Tulu to connect intelligence with action.</p></header><PartnerGrid complete /><p className="partner-relationship-note">Each partnership is different. The roster does not indicate use of every Tulu product or a common deployment or commercial arrangement.</p><PartnerPerspectives /></main>;
}