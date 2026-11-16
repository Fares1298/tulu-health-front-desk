import { Link } from '@tanstack/react-router';
import { Activity, ArrowRight, CalendarDays, Check, ClipboardList, FileCheck2, Heart, MessageCircle, Stethoscope } from 'lucide-react';
import { useViewportSequence } from './home-motion';

const workflows = [
  { title: 'Before the visit', copy: 'Bring records and results together for clinical preparation.', icon: FileCheck2 },
  { title: 'Between visits', copy: 'Surface missing information and follow-up work.', icon: ClipboardList },
  { title: 'Every day', copy: 'Give patients a connected view of their results, progress and plan.', icon: Heart },
];

export function HomeLongevity() {
  const practice = useViewportSequence<HTMLDivElement>();
  const patient = useViewportSequence<HTMLDivElement>();
  return <section className="home-longevity" aria-labelledby="home-longevity-heading">
    <div className="wrap">
      <div ref={practice.ref} className="home-longevity-overview" data-entered={practice.entered} data-running={practice.visible}>
        <div className="home-longevity-copy" data-reveal>
          <span className="eyebrow">LONGEVITY OS</span>
          <h2 id="home-longevity-heading">One longevity practice.<br /><em>All the pieces, connected.</em></h2>
          <p>Connect labs, wearables, genetics, your EHR, CRM and patient conversations into one continuously updated picture. Prepare for visits, track missing information and coordinate the work that happens between appointments.</p>
          <ol className="home-longevity-workflows">{workflows.map(({ title, copy, icon: Icon }, index) => <li key={title} className={`longevity-stage longevity-stage-${index}`}><span><Icon size={18} /></span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
        </div>
        <div className="home-practice-interface" data-reveal aria-label="Sample connected practice preview">
          <div className="longevity-interface-bar"><span><Activity size={16} /> tuluhealth</span><small>Sample practice preview</small></div>
          <div className="home-practice-title"><span className="eyebrow">CLINICAL PREPARATION</span><h3>One patient story.<br />Ready for the next visit.</h3></div>
          <div className="home-practice-patient"><span className="patient-initials">SJ</span><div><strong>Sarah Johnson</strong><span>Records, results and follow-up</span></div></div>
          <div className="home-practice-records"><div><Stethoscope size={16} /><span>Clinical records<small>Labs · genetics · EHR</small></span><Check size={15} /></div><div><Heart size={16} /><span>Wearables & devices<small>Connected to the patient story</small></span><Check size={15} /></div><div><MessageCircle size={16} /><span>Patient conversations<small>Context for the next appointment</small></span><Check size={15} /></div></div>
          <div className="home-practice-followup"><ClipboardList size={17} /><div><strong>Keep the next steps in view</strong><p>Ordered → Pending → Received → Reviewed</p><span>Missing results and follow-up, in one picture.</span></div></div>
        </div>
      </div>
      <div ref={patient.ref} className="home-longevity-patient" data-entered={patient.entered} data-running={patient.visible}>
        <div className="home-longevity-patient-heading" data-reveal><div><span className="eyebrow">WHAT YOUR PATIENTS SEE EVERY DAY</span><h2>Your practice connected.<br /><em>Your patients kept in the picture.</em></h2></div><p>A daily view of results, progress and planned actions, connected to the information your team works with.</p></div>
        <div className="home-patient-interface" data-reveal aria-label="Sample patient home screen based on the Tulu product">
          <div className="longevity-interface-bar"><span><Activity size={16} /> tuluhealth <small>Patient home</small></span><small>Sample preview · Sarah Johnson</small></div>
          <div className="home-patient-greeting"><div><span className="eyebrow">YOUR HEALTH, CONNECTED</span><h3>Good afternoon, Sarah.</h3></div><div className="home-patient-program patient-emphasis-progress"><span>360 RESET</span><strong>92% complete</strong><small>Review 14 Jul</small><div className="home-program-track"><span /></div></div></div>
          <div className="home-patient-body">
            <div className="home-patient-main">
              <div className="home-patient-results patient-emphasis-results"><div><span className="eyebrow">BIOLOGICAL AGE</span><strong>46.2</strong><p>6.8 years younger than your calendar age of 53</p></div><div><span className="eyebrow">LONGEVITY SCORE</span><strong>78<span>/100</span></strong><p>Biology · Capability<br />Meaning · Experience</p></div></div>
              <div className="home-patient-plan patient-emphasis-plan"><div className="home-interface-heading"><CalendarDays size={17} /><h4>What to do today</h4><span>Upcoming</span></div><div className="home-patient-action"><span className="home-action-dot" /><div><strong>Fasting blood draw</strong><p>In 2 days · Fast 10 hours beforehand — water only.</p></div></div><div className="home-patient-action"><span className="home-action-dot" /><div><strong>DEXA + RMR retest</strong><p>In 10 days · Body composition and resting metabolic rate.</p></div></div></div>
            </div>
            <div className="home-patient-copilot"><div className="home-interface-heading"><MessageCircle size={17} /><h4>Your health copilot</h4></div><p>Answers built from your own panel, wearables and clinic records.</p><div className="home-copilot-question">What should I focus on?</div><div className="home-copilot-answer"><span><Activity size={14} /> Connected patient context</span><p>Your daily plan includes a fasting blood draw in 2 days and your DEXA + RMR retest in 10 days. Your six-month review is in 14 days.</p></div><small>Illustrative question and response</small></div>
          </div>
        </div>
        <div className="home-longevity-annotations"><span><FileCheck2 size={16} /> Results & progress</span><span><CalendarDays size={16} /> Daily plan & upcoming actions</span><span><MessageCircle size={16} /> Questions with patient context</span></div>
        <div className="home-longevity-links"><Link to="/longevity-os" className="text-link">Explore Longevity OS <ArrowRight /></Link><Link to="/twin" className="home-twin-connection">Connected by the Patient Twin.<ArrowRight size={14} /></Link></div>
      </div>
    </div>
  </section>;
}