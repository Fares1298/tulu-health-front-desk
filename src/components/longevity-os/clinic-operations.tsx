import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useViewportSequence } from '@/components/home-motion';
import { useOperationCarousel } from './use-operation-carousel';
import showcases from './clinic-operations-data.json';

type Showcase = (typeof showcases)[number];

function OperationsWalkthrough({ showcase, reversed }: { showcase: Showcase; reversed: boolean }) {
  const seq = useViewportSequence<HTMLElement>();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const paused = !seq.visible || seq.reduced || hovered || focused || hidden;
  const { selected, select } = useOperationCarousel(showcase.steps.length, paused, showcase.interval);
  const step = showcase.steps[selected];

  useEffect(() => {
    const sync = () => setHidden(document.hidden);
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);
  useEffect(() => {
    const sync = () => {
      const index = showcase.steps.findIndex(item => `#${item.id}` === window.location.hash);
      if (index >= 0) {
        select(index);
        const destination = showcase.steps[index];
        if (destination) window.requestAnimationFrame(() => document.getElementById(destination.id)?.scrollIntoView({ block: 'start', behavior: 'instant' }));
      }
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
    // The catalogue is stable; selection restarts playback without reinstalling hash listeners.
  }, [showcase]);

  if (!step) return null;
  const copy = <div className="copy">
    <div className="num">{showcase.category}</div>
    <h2>{showcase.headline}</h2>
    <p>{showcase.description}</p>
    <div className="growth-stepper" aria-label={`${showcase.category} workflow`} style={{ ['--clinic-step-count' as string]: showcase.steps.length }}>
      <div className="step-track" aria-hidden="true"><span key={`${selected}-${paused}`} className="step-track-fill" style={{ width: `${selected / showcase.steps.length * 100}%`, ['--clinic-progress-from' as string]: `${selected / showcase.steps.length * 100}%`, ['--clinic-progress-to' as string]: `${(selected + 1) / showcase.steps.length * 100}%`, ['--clinic-progress-duration' as string]: `${showcase.interval}ms`, animationPlayState: paused ? 'paused' : 'running' }} /></div>
      {showcase.steps.map((item, index) => <Button key={item.id} variant="ghost" className={`growth-step ${index === selected ? 'active' : ''} ${index < selected ? 'complete' : ''}`} aria-label={item.label} aria-pressed={index === selected} aria-controls={item.id} onClick={() => select(index)}>
        <span className="step-node"><span className="step-number">{String(index + 1).padStart(2, '0')}</span><span className="step-check" aria-hidden="true">✓</span></span><span className="step-label">{item.label}</span>
      </Button>)}
    </div>
    <div className="step-description" aria-live={focused ? 'polite' : 'off'}><span className="step-kicker">{step.kicker}</span><strong>{step.headline}</strong><span>{step.description}</span></div>
  </div>;
  const preview = <div className="preview-wrap"><div className="preview" id={`${showcase.id}AnimatedPreview`}>
    <div dangerouslySetInnerHTML={{ __html: showcase.previewHeading }} />
    <div className="growth-screen-stage">{showcase.steps.map((item, index) => <div key={`${item.id}-${index === selected}`} id={item.id} aria-hidden={index !== selected} inert={index !== selected} dangerouslySetInnerHTML={{ __html: item.html.replace('class="growth-screen active"', 'class="growth-screen"').replace('class="growth-screen"', `class="growth-screen ${index === selected ? 'active' : ''}"`) }} />)}</div>
  </div></div>;
  return <section ref={seq.ref} className="showcase clinic-walkthrough" data-paused={paused} aria-label={showcase.category} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className={`grid ${reversed ? 'reverse' : ''}`}>{reversed ? <>{preview}{copy}</> : <>{copy}{preview}</>}</div>
  </section>;
}

export function ClinicOperationsWalkthroughs() {
  return <div>{showcases.map((showcase, index) => <OperationsWalkthrough key={showcase.id} showcase={showcase} reversed={index === 1} />)}</div>;
}