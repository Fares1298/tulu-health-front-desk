import { Link } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { Activity, ArrowRight, Bot, CalendarDays, FileText, FlaskConical, Heart, MessageCircle, Route as RouteIcon, Stethoscope, Target, User, Watch } from 'lucide-react';
import { DemoButton } from '@/components/tulu-shell';
import { useViewportSequence } from '@/components/home-motion';

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

function Shot({ name, label }: { name: string; label: string }) {
  const src = `${IMG}${name}.png`;
  return <figure className="los-shot"><a href={src} target="_blank" rel="noopener" aria-label={`Enlarge ${label} screen (opens in a new tab)`}><img src={src} alt={`Tulu Health ${label} screen`} width={1600} height={1000} loading="lazy" /></a><figcaption>{label} · Seeded-demo product screenshot</figcaption></figure>;
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

const operations = [
  { id: 'worklist', name: 'Worklist', value: "426 patients, ranked by what they're worth to save.", stat: '$1.8M in identified revenue at risk · 378 actions already queued', copy: 'Every patient scored on revenue at risk and lifetime value, with the next-best action attached.' },
  { id: 'campaigns', name: 'Campaigns', value: 'Build the list. Send the campaign. Watch it work.', stat: '42 of 412 patients renewing in the next 30 days', copy: 'Cohorts built live against the real patient panel. Compose once, send by SMS, email or voice agent. Sends in the demo are simulated.' },
  { id: 'pulse', name: 'Clinic Pulse', value: 'The number your board is asking for, on one screen.', stat: '29% of revenue driven by the top 10% of patients', copy: 'Revenue concentration, churn leakage and campaign ROI, computed from the same twin.' },
  { id: 'capacity', name: 'Capacity', value: 'See the empty slot before the month closes, not after.', stat: '74% provider utilization · $28,400 in unsold capacity this month', copy: 'Provider utilization inside a healthy target band, with unsold capacity visible while there is time to fill it.' },
  { id: 'membership', name: 'Membership', value: 'Know your MRR the way a subscription business should.', stat: '$193,922 MRR across 189 active members', copy: 'Active members, churn, renewals, entitlements and renewal value by tier.' },
  { id: 'compliance', name: 'Compliance', value: 'Two critical risks, ranked ahead of everything else.', stat: '2 critical risks flagged · 3 high · 7 states tracked', copy: "Credentialing, state-specific rules and audit readiness, ranked by severity. This tracks the clinic's own risk register, not a Tulu certification." },
  { id: 'outcomes', name: 'Outcomes', value: 'Proof the program works, not a testimonial.', stat: '−14 mg/dL median ApoB change · 82% of patients improved (n=34)', copy: 'Measured change across a reset cohort. Measured, not anecdotal.' },
];

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
    <div id="clinic-operations" className="los-ops">
      <div className="los-head" data-los-reveal><span className="eyebrow">CLINIC OPERATIONS IN DETAIL</span><p className="los-note-left">{DEMO_NOTE}</p></div>
      <div className="los-ops-grid">{operations.map((o, i) => <article key={o.id} id={o.id} className="los-op" data-los-reveal style={{ ['--d' as string]: `${(i % 2) * 90}ms` }}>
        <h3>{o.name}</h3><p className="los-value">{o.value}</p><p className="los-stat">{o.stat}</p><p>{o.copy}</p>
        {o.id === 'compliance' && <p className="los-links"><Link to="/security">Review security details</Link> · <Link to="/governance">AI governance</Link></p>}
        <Shot name={o.id} label={o.name} />
      </article>)}</div>
    </div>
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

export function AIWorkforceSection() {
  return <section id="ai-workforce" className="los-section dark-band" aria-labelledby="los-ai-title"><div className="wrap">
    <div className="los-head" data-los-reveal><span className="eyebrow">AI WORKFORCE</span><h2 id="los-ai-title">Four services. <em>One shared memory.</em></h2><p>{DEMO_NOTE}</p></div>
    <div className="los-ai-grid">
      <article id="recall" className="los-ai-card" data-los-reveal><span className="eyebrow">AI RECALL</span><h3>Your best revenue is sitting in your lapsed list.</h3><p>The Twin identifies who is due and why; AI Recall reaches out with a relevant reason to return, grounded in the patient’s real history, and rebooks.</p><div className="los-mock"><small>Voice agent · outbound · sample conversation</small><p>“Hi Maria, it’s been about six months since your last panel, you were mid-protocol. I’d love to help you pick it back up. Can I find you a time?”</p><span className="los-tag">Reactivation · writes back to twin</span></div><Link to="/contact" className="text-link">Ask about AI Recall <ArrowRight /></Link></article>
      <article id="front-desk" className="los-ai-card" data-los-reveal style={{ ['--d' as string]: '80ms' }}><span className="eyebrow">AI FRONT DESK</span><h3>Never send another inbound to voicemail.</h3><p>Answers calls and chats 24/7, recognises new leads and existing members, answers questions, books into your scheduler and hands off to a human when it should.</p><div className="los-mock"><small>Sample call · inbound · after-hours</small><p>“Thanks for calling, I can get you booked for a consult this week. Have you visited us before, or is this your first time?”</p><span className="los-tag">New caller · booking consult</span></div><Link to="/ai-front-desk" className="text-link">Explore AI Front Desk <ArrowRight /></Link></article>
      <article id="navigator" className="los-ai-card" data-los-reveal style={{ ['--d' as string]: '160ms' }}><span className="eyebrow">AI CARE NAVIGATOR</span><h3>Grow revenue per patient by guiding them to their right next step.</h3><p>Biomarkers, wearable signals and protocol cadence identify who is genuinely due; Navigator reaches out with the appropriate next step and escalates to a clinician when the data warrants.</p><div className="los-mock"><small>Patient context · David R. · due for quarterly panel</small><p>“Hi David, your quarterly panel is coming due and your sleep metrics have shifted, let's get you booked so your physician can review.”</p><span className="los-tag">Escalated to Dr. Lee for review</span></div><Link to="/contact" className="text-link">Ask about AI Care Navigator <ArrowRight /></Link></article>
      <article id="benchmarks" className="los-ai-card" data-los-reveal style={{ ['--d' as string]: '240ms' }}><span className="eyebrow">AI BENCHMARKS <span className="los-soon">COMING SOON</span></span><h3>Know how your practice really compares.</h3><p>Compares recall rates, front-desk conversion and care-navigation patterns across practices using anonymised, aggregated data.</p><div className="los-mock"><small>Practice vs. network · illustrative</small>{[['Recall rate', 68], ['Front-desk conversion', 74], ['Care navigation', 55]].map(([l, v]) => <div key={l} className="los-bar"><span>{l}</span><i style={{ ['--w' as string]: `${v}%` }} /><b>{v}%</b></div>)}<small>Sample percentages only — not verified network results.</small></div><Link to="/contact" className="text-link">Ask about AI Benchmarks <ArrowRight /></Link></article>
    </div>
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
  return <main ref={ref} className="los"><HeroSection /><PlatformSection /><PatientTwinSection /><AIWorkforceSection /><PatientJourneySection /><FinalCTA /></main>;
}
