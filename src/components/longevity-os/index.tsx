import { Link } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { Activity, ArrowRight, Bot, CalendarDays, FileText, FlaskConical, Heart, MessageCircle, Route as RouteIcon, Stethoscope, Target, User, Watch } from 'lucide-react';
import { DemoButton } from '@/components/tulu-shell';
import { useViewportSequence } from '@/components/home-motion';
import { OperationsShowcases } from './operations-showcases';
import { AIWorkforceSection } from './ai-workforce';
export { AIWorkforceSection } from './ai-workforce';

const IMG = 'https://www.tuluhealth.com/images/operations/';
const DEMO_NOTE = 'Seeded-demo data and product examples — not verified customer results.';

/** Once-only scroll reveals; content stays visible without JavaScript. */
function useReveals() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.dataset['motion'] = 'ready';
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.setAttribute('data-in', ''); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    root.querySelectorAll('[data-los-reveal]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

export function HeroSection() {
  return <section className="los-hero grid-background" aria-labelledby="los-hero-title"><div className="wrap los-hero-grid">
    <div className="los-hero-copy">
      <span className="eyebrow los-in los-d0">LONGEVITY OS</span>
      <h1 id="los-hero-title" className="los-in los-d1">Your entire longevity practice. <em>One connected operating system.</em></h1>
      <p className="los-in los-d2">Clinic operations, patient intelligence and an AI workforce — working from one shared Patient Twin.</p>
      <div className="los-ctas los-in los-d3"><DemoButton /><a href="#platform" className="los-secondary">Explore the Platform <ArrowRight size={15} /></a></div>
    </div>
    <div className="los-hero-media los-slide">
      <div className="los-float"><img src={`${IMG}pulse.png`} alt="Tulu Health Clinic Pulse dashboard" width={1600} height={1000} /></div>
      <div className="los-twin-chip"><span className="los-dot" /> Patient Twin · context shared across clinic, patient and AI</div>
    </div>
  </div>
  <div className="wrap los-metrics"><div><strong>$1.8M</strong><span>revenue at risk surfaced automatically</span></div><div><strong>74%</strong><span>provider utilization, inside target</span></div><div><strong>29%</strong><span>revenue concentration made visible</span></div><div><strong>−14 mg/dL</strong><span>median ApoB change across a reset cohort</span></div></div>
  <p className="wrap los-note">From a seeded demo panel, illustrating what the product surfaces, not a benchmark across Tulu’s customer base.</p>
  </section>;
}

const groups = [
  { title: 'Growth', items: 'Worklist prioritization · Campaigns & recall · Referral and acquisition tracking' },
  { title: 'Operations', items: 'Capacity & provider utilization · Protocol adherence · Overdue diagnostics' },
  { title: 'Revenue', items: 'Clinic Pulse financial intelligence · Memberships, MRR & renewals · Entitlements & payments' },
  { title: 'Oversight', items: 'Compliance risk register · Outcomes across cohorts · Clinical intelligence' },
];

export function PlatformSection() {
  return <section id="platform" className="los-section" aria-labelledby="los-platform-title"><div className="wrap">
    <div className="los-head" data-los-reveal><span className="eyebrow">THE PLATFORM</span><h2 id="los-platform-title">Everything your practice needs. <em>Nothing working in isolation.</em></h2></div>
    <div className="los-pillars">
      <Link to="/longevity-os" hash="clinic-operations" className="los-pillar" data-los-reveal><span className="eyebrow">CLINIC OPERATIONS</span><h3>Run the practice.</h3><p>Your EHR tells you what happened at the last visit. This tells you what to do before the next one, and what it’s worth.</p><img src={`${IMG}worklist.png`} alt="Tulu Health Worklist screen" width={1600} height={1000} loading="lazy" /></Link>
      <Link to="/longevity-os" hash="ai-workforce" className="los-pillar los-pillar-dark" data-los-reveal style={{ ['--d' as string]: '90ms' }}><span className="eyebrow">AI WORKFORCE</span><h3>Scale every interaction.</h3><p>AI Recall, AI Front Desk, AI Care Navigator and AI Benchmarks — reading from and writing back to the same Patient Twin.</p><ul className="los-service-list">{['AI Recall', 'AI Front Desk', 'AI Care Navigator', 'AI Benchmarks'].map(s => <li key={s}><Bot size={15} />{s}</li>)}</ul></Link>
    </div>
    <div className="los-groups">{groups.map((g, i) => <div key={g.title} data-los-reveal style={{ ['--d' as string]: `${i * 80}ms` }}><h3>{g.title}</h3><p>{g.items}</p></div>)}</div>
  </div></section>;
}

const sources = [
  { label: 'Clinical records', icon: FileText }, { label: 'Labs & biomarkers', icon: FlaskConical }, { label: 'Wearables', icon: Watch },
  { label: 'Goals & preferences', icon: Target }, { label: 'Conversations', icon: MessageCircle }, { label: 'Longitudinal history', icon: CalendarDays }, { label: 'Care plans', icon: RouteIcon },
];
const actors = [{ label: 'Clinician', icon: Stethoscope }, { label: 'Patient', icon: User }, { label: 'AI Workforce', icon: Bot }];

export function PatientTwinSection() {
  const seq = useViewportSequence<HTMLDivElement>();
  return <section className="los-section los-twin-section" aria-labelledby="los-twin-title"><div className="wrap los-twin-layout">
    <div className="los-head" data-los-reveal><span className="eyebrow">THE PATIENT TWIN</span><h2 id="los-twin-title">One patient. One memory. <em>Every service connected.</em></h2><p>The Patient Twin unifies clinical data and longitudinal context so the clinic, patient and AI workforce can act with continuity.</p><p>Not a database. Not a dashboard. A persistent patient identity and contextual memory that every service reads from and writes back to.</p><Link to="/twin" className="text-link">Discover the Patient Twin <ArrowRight /></Link></div>
    <div ref={seq.ref} className="los-twin-diagram" data-seq={seq.entered ? 'in' : undefined} role="img" aria-label="The Patient Twin at the centre, connected to clinical records, labs and biomarkers, wearables, goals and preferences, conversations, longitudinal history and care plans, and shared by the clinician, patient and AI workforce.">
      <svg className="los-twin-lines" viewBox="0 0 400 400" aria-hidden="true">{sources.map((_, i) => { const a = (i / sources.length) * Math.PI * 2 - Math.PI / 2; return <line key={i} x1="200" y1="200" x2={200 + Math.cos(a) * 150} y2={200 + Math.sin(a) * 150} pathLength={1} style={{ ['--i' as string]: i }} />; })}<circle className="los-pulse-ring" cx="200" cy="200" r="60" /></svg>
      <div className="los-twin-core"><Activity size={22} /><strong>Patient Twin</strong><small>Sarah J. · sample</small></div>
      {sources.map((s, i) => { const a = (i / sources.length) * Math.PI * 2 - Math.PI / 2; const Icon = s.icon; return <span key={s.label} className="los-source" style={{ left: `${50 + Math.cos(a) * 40}%`, top: `${50 + Math.sin(a) * 40}%`, ['--i' as string]: i }}><Icon size={14} />{s.label}</span>; })}
      <div className="los-actors">{actors.map((a, i) => { const Icon = a.icon; return <span key={a.label} style={{ ['--i' as string]: i }}><Icon size={15} />{a.label}<small>reads & writes</small></span>; })}</div>
    </div>
  </div></section>;
}

export function ClinicOperationsSection() {
  return <section id="clinic-operations" className="los-section" aria-labelledby="los-operations-title"><div className="wrap">
    <div className="los-head" data-los-reveal><span className="eyebrow">CLINIC OPERATIONS</span><h2 id="los-operations-title">Run a better practice. <em>See the whole picture.</em></h2><p className="los-note-left">{DEMO_NOTE}</p></div>
    <OperationsShowcases />
  </div></section>;
}

const stages = [['Acquire', 'AI Front Desk'], ['Onboard', 'Clinic Operations'], ['Understand', 'Patient Twin'], ['Guide', 'AI Care Navigator'], ['Engage', 'AI Workforce'], ['Retain', 'AI Recall + Clinic Operations']];

export function PatientJourneySection() {
  const seq = useViewportSequence<HTMLOListElement>();
  const [active, setActive] = useState(-1);
  useEffect(() => {
    if (!seq.entered) return;
    if (seq.reduced) { setActive(stages.length - 1); return; }
    const timers = stages.map((_, i) => window.setTimeout(() => setActive(i), 250 + i * 230));
    return () => timers.forEach(clearTimeout);
  }, [seq.entered, seq.reduced]);
  return <section className="los-section" aria-labelledby="los-journey-title"><div className="wrap">
    <div className="los-head" data-los-reveal><span className="eyebrow">CONNECTED PATIENT JOURNEY</span><h2 id="los-journey-title">One continuous experience <em>for every patient.</em></h2></div>
    <div className="los-portal" data-los-reveal aria-label="Sample patient home screen">
      <div className="los-portal-bar"><span><Activity size={15} /> tuluhealth · Patient home</span><small>Sample preview · Sarah Johnson</small></div>
      <div className="los-portal-body">
        <div><span className="eyebrow">BIOLOGICAL AGE</span><strong>46.2</strong><p>6.8 years younger than calendar age of 53</p></div>
        <div><span className="eyebrow">LONGEVITY SCORE</span><strong>78<small>/100</small></strong><p>Biology · Capability · Meaning · Experience</p></div>
        <div><span className="eyebrow">360 RESET · ADHERENCE</span><strong>92%</strong><p>Program progress · review 14 Jul</p></div>
        <div className="los-portal-plan"><span className="eyebrow">CLINICIAN-REVIEWED NEXT STEPS</span><p><CalendarDays size={14} /> Fasting blood draw · in 2 days</p><p><Heart size={14} /> DEXA + RMR retest · in 10 days</p></div>
      </div>
      <ul className="los-portal-features">{['Unified health records', 'Labs & biomarker insights', 'Health scores', 'Clinician-reviewed action plans', 'Personalized next steps', 'Adherence & progress', 'Wearables & lifestyle trends'].map(f => <li key={f}>{f}</li>)}</ul>
    </div>
    <ol ref={seq.ref} className="los-journey" data-seq={seq.entered ? 'in' : undefined}>{stages.map(([s, by], i) => <li key={s} data-on={active >= i ? '' : undefined} data-current={active === i ? '' : undefined}><span className="los-step">{String(i + 1).padStart(2, '0')}</span><strong>{s}</strong><small>{by}</small></li>)}</ol>
    <p className="los-journey-close" data-on={active === stages.length - 1 ? '' : undefined}><RouteIcon size={16} /> Every interaction strengthens the Patient Twin.</p>
  </div></section>;
}

export function FinalCTA() {
  return <section className="closing-section wrap"><div className="closing-content"><span className="eyebrow">SERVICES-AS-SOFTWARE</span><h2>Bring us your <em>messiest</em> patient.</h2><p>See what your patient's record looks like when Tulu puts the pieces together.</p><DemoButton /></div></section>;
}

export function LongevityOSPage() {
  const ref = useReveals();
  return <main ref={ref} className="los"><HeroSection /><AIWorkforceSection /><ClinicOperationsSection /><PlatformSection /><PatientTwinSection /><PatientJourneySection /><FinalCTA /></main>;
}
