import { createFileRoute } from '@tanstack/react-router';
import { PreservedDocument } from '@/components/preserved-page';
import { Button } from '@/components/ui/button';
import { ArrowDown, Layers3, Workflow } from 'lucide-react';

export const Route = createFileRoute('/longevity-os')({
  head: () => ({ meta: [
    { title: 'Longevity OS | Clinic Operations & AI Services | Tulu Health' },
    { name: 'description', content: 'Longevity OS connects your practice around the Patient Twin. Explore the Clinic Operations command center and four AI services sharing one living patient memory.' },
    { property: 'og:title', content: 'Longevity OS | Tulu Health' },
    { property: 'og:description', content: 'One longevity practice, all the pieces connected. Clinic Operations and AI Services, grounded in the same Patient Twin.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Page,
});

function Page() {
  return <main>
    <section className="longevity-opening grid-background">
      <div className="wrap">
        <span className="eyebrow">ONE PRACTICE. ONE SHARED PATIENT MEMORY.</span>
        <h1>Longevity OS</h1>
        <p className="longevity-intro">Your practice’s data, clinical picture and operational work — connected around every patient.</p>
        <p className="opening-copy">Built on the Patient Twin, Longevity OS brings your clinic’s command center and AI services together.<br className="desktop-break" /> Run the practice. Keep patients connected to their next step.</p>
        <div className="longevity-section-links">
          <Button asChild variant="outline"><a href="#clinic-operations"><Workflow size={17} />Clinic Operations<ArrowDown size={15} /></a></Button>
          <Button asChild variant="outline"><a href="#ai-services"><Layers3 size={17} />AI Services<ArrowDown size={15} /></a></Button>
        </div>
      </div>
    </section>
    <section id="clinic-operations" aria-label="Clinic Operations" className="longevity-product-section">
      <PreservedDocument name="operations" embedded hideClosing />
    </section>
    <section id="ai-services" aria-label="AI Services" className="longevity-product-section">
      <PreservedDocument name="services" embedded />
    </section>
  </main>;
}
