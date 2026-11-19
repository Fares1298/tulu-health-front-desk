import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useViewportSequence } from '@/components/home-motion';
import { OPERATIONS_FADE_MS, operationShowcases, type OperationSlide } from './operations-data';
import { useOperationCarousel } from './use-operation-carousel';

function OperationsCarousel({ slides, label }: { slides: OperationSlide[]; label: string }) {
  const seq = useViewportSequence<HTMLDivElement>();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const { selected, select } = useOperationCarousel(slides.length, !seq.visible || seq.reduced || hovered || focused || documentHidden);
  useEffect(() => {
    const sync = () => setDocumentHidden(document.hidden);
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);
  useEffect(() => {
    const sync = () => {
      const index = slides.findIndex(slide => `#${slide.id}` === window.location.hash);
      if (index >= 0) select(index);
    };
    sync(); window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
    // Slide collection is stable; select resets the playback clock.
  }, [slides]);
  return <div ref={seq.ref} className="los-carousel" role="region" aria-roledescription="carousel" aria-label={label} data-selected={selected} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="los-carousel-stack" aria-live="off">{slides.map((slide, index) => <figure id={slide.id} key={slide.id} className="los-carousel-slide" data-active={selected === index} aria-hidden={selected !== index} inert={selected !== index}>
      <a href={slide.image} target="_blank" rel="noopener noreferrer" aria-label={`Enlarge ${slide.label} screenshot (opens in a new tab)`}><img src={slide.image} alt={`Tulu Health ${slide.label} dashboard`} width={1600} height={1000} loading="lazy" /></a>
      <figcaption><span>{slide.label}</span><h4>{slide.headline}</h4><p>{slide.description}</p>{slide.id === 'compliance' && <p className="los-links"><Link to="/security">Review security details</Link> · <Link to="/governance">AI governance</Link></p>}</figcaption>
    </figure>)}</div>
    <div className="los-carousel-dots" aria-label="Choose screenshot">{slides.map((slide, index) => <Button key={slide.id} variant="ghost" size="icon" className="los-carousel-dot" aria-label={`Show ${slide.label}`} aria-pressed={selected === index} title={slide.label} onClick={() => select(index)}><span /></Button>)}</div>
  </div>;
}

export function OperationsShowcases() {
  return <div className="los-showcases" style={{ ['--operations-fade-duration' as string]: `${OPERATIONS_FADE_MS}ms` }}>{operationShowcases.map((showcase, index) => <article key={showcase.category} className={`los-showcase ${index === 1 ? 'los-showcase-reversed' : ''}`}>
    <div className="los-showcase-copy" data-los-reveal><span className="eyebrow">{showcase.category}</span><h3>{showcase.headline}</h3><p>{showcase.description}</p><ul className="los-capability-chips">{showcase.chips.map(chip => <li key={chip}>{chip}</li>)}</ul></div>
    <OperationsCarousel slides={showcase.slides} label={showcase.category} />
  </article>)}</div>;
}
