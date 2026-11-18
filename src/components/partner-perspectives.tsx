import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { homePerspectives, partnerPerspectives, PERSPECTIVE_INTERVAL_MS, type PartnerPerspective } from '@/content/partner-perspectives';

function PerspectiveCard({ entry }: { entry: PartnerPerspective }) {
  return <figure className="perspective-card"><span className="perspective-quote-mark" aria-hidden="true">“</span><blockquote><p>{entry.quote}</p></blockquote><figcaption><span className="perspective-initials" aria-hidden="true">{entry.initials}</span><div><strong>{entry.name}</strong><span className="perspective-role">{entry.role}</span><span className="perspective-organisation">{entry.organisation}</span></div></figcaption></figure>;
}

export function PartnerPerspectives({ home = false }: { home?: boolean }) {
  const [viewportRef, carousel] = useEmblaCarousel({ loop: true, align: 'center', startIndex: 1, watchDrag: home });
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(1);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync(); media.addEventListener('change', sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { threshold: 0.15 });
    const section = sectionRef.current;
    if (section) observer.observe(section);
    return () => { observer.disconnect(); media.removeEventListener('change', sync); };
  }, []);
  useEffect(() => {
    if (!carousel) return;
    const sync = () => setSelected(carousel.selectedScrollSnap());
    sync(); carousel.on('select', sync); carousel.on('reInit', sync);
    return () => { carousel.off('select', sync); carousel.off('reInit', sync); };
  }, [carousel]);
  useEffect(() => {
    if (!home || !carousel || paused || interacting || !visible || reduced) return;
    const timer = window.setInterval(() => { if (!document.hidden) carousel.scrollNext(); }, PERSPECTIVE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [home, carousel, paused, interacting, visible, reduced, selected]);
  const rotating = home && hydrated && !reduced;
  const entries = rotating ? [...homePerspectives, ...homePerspectives] : home ? homePerspectives : partnerPerspectives;
  return <section ref={sectionRef} id={home ? 'home-partner-perspectives' : 'partner-perspectives'} className={`partner-perspectives ${home ? 'home-perspectives' : ''}`} aria-labelledby={home ? 'home-perspectives-title' : 'perspectives-title'}>
    <div className="perspective-heading"><div><span className="eyebrow">PARTNER PERSPECTIVES</span><h2 id={home ? 'home-perspectives-title' : 'perspectives-title'}>Built together.<em>In their words.</em></h2></div><p>Perspectives from the people working with Tulu across healthcare.</p></div>
    <div className={rotating ? 'perspective-carousel' : 'perspective-grid'} ref={rotating ? viewportRef : undefined} role={rotating ? 'region' : undefined} aria-roledescription={rotating ? 'carousel' : undefined} aria-label={rotating ? 'Partner perspectives' : undefined} onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
      <div className={rotating ? 'perspective-track' : 'perspective-grid-inner'}>{entries.map((entry, index) => <div className={`perspective-slide ${index === selected ? 'is-centred' : ''}`} key={`${entry.name}-${index}`} aria-hidden={rotating && index >= homePerspectives.length ? true : undefined}><PerspectiveCard entry={entry} /></div>)}</div>
    </div>
    {rotating ? <div className="perspective-controls"><Button variant="outline" size="icon" aria-label="Previous testimonial" title="Previous testimonial" onClick={() => carousel?.scrollPrev()}><ArrowLeft /></Button><Button variant="outline" size="icon" aria-label={paused ? 'Play testimonials' : 'Pause testimonials'} title={paused ? 'Play testimonials' : 'Pause testimonials'} onClick={() => setPaused(value => !value)}>{paused ? <Play /> : <Pause />}</Button><Button variant="outline" size="icon" aria-label="Next testimonial" title="Next testimonial" onClick={() => carousel?.scrollNext()}><ArrowRight /></Button><span>{selected % homePerspectives.length + 1} / {homePerspectives.length}</span></div> : null}
    <p className="perspective-note">Statements reflect individual perspectives, not official institutional endorsements.</p>
    {home ? <Button asChild variant="link" className="evidence-link"><Link to="/partners" hash="partner-perspectives">All partner perspectives <ArrowRight aria-hidden="true" /></Link></Button> : null}
  </section>;
}