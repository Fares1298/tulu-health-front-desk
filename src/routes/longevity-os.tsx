import { createFileRoute } from '@tanstack/react-router';
import { PreservedPage } from '@/components/preserved-page';

export const Route = createFileRoute('/longevity-os')({
  head: () => ({ meta: [
    { title: 'Longevity OS | Clinic Operations & AI Services | Tulu Health' },
    { name: 'description', content: 'Longevity OS connects your practice around the Patient Twin. Explore the Clinic Operations command center and four AI services sharing one living patient memory.' },
    { property: 'og:title', content: 'Longevity OS | Tulu Health' },
    { property: 'og:description', content: 'One longevity practice, all the pieces connected. Clinic Operations and AI Services, grounded in the same Patient Twin.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: () => <PreservedPage name="longevity-explorer" />,
});
