import { createFileRoute } from '@tanstack/react-router';
import { LongevityOSPage } from '@/components/longevity-os';

export const Route = createFileRoute('/longevity-os')({
  head: () => ({ meta: [
    { title: 'Longevity OS | Clinic Operations & AI Workforce | Tulu Health' },
    { name: 'description', content: 'Your entire longevity practice in one connected operating system: Clinic Operations, an AI workforce and one shared Patient Twin.' },
    { property: 'og:title', content: 'Longevity OS | Tulu Health' },
    { property: 'og:description', content: 'Clinic operations, patient intelligence and an AI workforce — working from one shared Patient Twin.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:image', content: 'https://www.tuluhealth.com/images/operations/pulse.png' },
    { name: 'twitter:image', content: 'https://www.tuluhealth.com/images/operations/pulse.png' },
  ] }),
  component: LongevityOSPage,
});
