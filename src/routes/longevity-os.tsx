import { createFileRoute, useLocation, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { PreservedDocument } from '@/components/preserved-page';
import { Button } from '@/components/ui/button';
import { Layers3, Workflow } from 'lucide-react';
import { longevityTabStorageKey, resolveLongevityTab, type LongevityTab } from '@/components/longevity-tab-state';

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
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<LongevityTab>('clinic-operations');
  const tabs = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);

  function scrollToContent() {
    const content = panel.current;
    if (!content) return;
    const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 82;
    const tabHeight = tabs.current?.getBoundingClientRect().height ?? 68;
    window.scrollTo({ top: window.scrollY + content.getBoundingClientRect().top - headerHeight - tabHeight, behavior: 'instant' });
  }

  useEffect(() => {
    let saved: string | null = null;
    try { saved = window.sessionStorage.getItem(longevityTabStorageKey); } catch { /* The direct links still work if storage is unavailable. */ }
    const next = resolveLongevityTab(hash, saved);
    setSelected(next);
    try { window.sessionStorage.setItem(longevityTabStorageKey, next); } catch { /* Selection remains usable for this visit. */ }
    if (!hash && next === 'ai-services') {
      void navigate({ to: '/longevity-os', hash: next, replace: true, resetScroll: false, hashScrollIntoView: false });
    }
    if (hash || next === 'ai-services') {
      const frame = window.requestAnimationFrame(scrollToContent);
      return () => window.cancelAnimationFrame(frame);
    }
  }, [hash, navigate]);

  function selectTab(tab: LongevityTab) {
    setSelected(tab);
    try { window.sessionStorage.setItem(longevityTabStorageKey, tab); } catch { /* Optional visit preference. */ }
    void navigate({ to: '/longevity-os', hash: tab, replace: true, resetScroll: false, hashScrollIntoView: false });
    window.requestAnimationFrame(scrollToContent);
  }

  return <main>
    <section className="longevity-opening grid-background">
      <div className="wrap">
        <span className="eyebrow">ONE PRACTICE. ONE SHARED PATIENT MEMORY.</span>
        <h1>Longevity OS</h1>
        <p className="longevity-intro">Your practice’s data, clinical picture and operational work — connected around every patient.</p>
        <p className="opening-copy">Built on the Patient Twin, Longevity OS brings your clinic’s command center and AI services together.<br className="desktop-break" /> Run the practice. Keep patients connected to their next step.</p>
      </div>
    </section>
    <div ref={tabs} className="longevity-tabs-bar">
      <div className="wrap longevity-tabs" role="tablist" aria-label="Longevity OS">
        {(['clinic-operations', 'ai-services'] as const).map(tab => <Button
          key={tab} id={`${tab}-tab`} role="tab" variant="ghost"
          aria-selected={selected === tab} aria-controls={tab} tabIndex={selected === tab ? 0 : -1}
          onClick={() => selectTab(tab)}
          onKeyDown={event => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            const next = event.key === 'Home' ? 'clinic-operations' : event.key === 'End' ? 'ai-services' : tab === 'clinic-operations' ? 'ai-services' : 'clinic-operations';
            selectTab(next);
            document.getElementById(`${next}-tab`)?.focus({ preventScroll: true });
          }}
        >{tab === 'clinic-operations' ? <Workflow size={17} /> : <Layers3 size={17} />}{tab === 'clinic-operations' ? 'Clinic Operations' : 'AI Services'}</Button>)}
      </div>
    </div>
    <section ref={panel} id={selected} role="tabpanel" aria-labelledby={`${selected}-tab`} tabIndex={0} className="longevity-product-section">
      <PreservedDocument key={selected} name={selected === 'clinic-operations' ? 'operations' : 'services'} embedded hideClosing />
    </section>
    <PreservedDocument name="services" embedded closingOnly />
  </main>;
}
