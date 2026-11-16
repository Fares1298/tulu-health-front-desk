import { useEffect, useState } from 'react';
import { Activity, CalendarCheck, Check, Heart, MessageCircle, Pause, Play, RotateCcw, Stethoscope, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { homepageExamples, isExampleBooked, type DemoMode } from './home-demo-state';
import { useViewportSequence } from './home-motion';

export function FrontDeskPreview() {
  const { ref, visible, entered, reduced } = useViewportSequence<HTMLDivElement>();
  const [mode, setMode] = useState<DemoMode>('convert');
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const example = homepageExamples[mode];
  const finalStep = reduced ? 3 : step;
  const playing = visible && !paused && !reduced && step < 3;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setStep(current => Math.min(current + 1, 3)), 1900);
    return () => window.clearTimeout(timer);
  }, [playing, step, mode]);
  const select = (next: DemoMode) => { setMode(next); setStep(0); setPaused(false); };
  const replay = () => { setStep(0); setPaused(false); };
  const activeStage = mode === 'convert' ? (finalStep === 0 ? 0 : finalStep < 3 ? 1 : 2) : finalStep;

  return <div ref={ref} className="home-front-tool" data-playing={playing} data-entered={entered} aria-label="AI Front Desk illustrative preview">
    <div className="home-tool-header">
      <div className="home-demo-tabs" role="tablist" aria-label="AI Front Desk product preview">
        <Button id="convert-preview-tab" role="tab" aria-selected={mode === 'convert'} aria-controls="home-example-panel" variant="ghost" onClick={() => select('convert')}>Convert IQ</Button>
        <Button id="revive-preview-tab" role="tab" aria-selected={mode === 'revive'} aria-controls="home-example-panel" variant="ghost" onClick={() => select('revive')}>Revive</Button>
      </div>
      <div className="home-playback">
        <span>Illustrative example</span>
        <Button variant="ghost" size="icon" aria-label={paused ? 'Resume example' : 'Pause example'} title={paused ? 'Resume example' : 'Pause example'} disabled={reduced || finalStep === 3} onClick={() => setPaused(current => !current)}>{paused ? <Play size={16} /> : <Pause size={16} />}</Button>
        <Button variant="ghost" size="icon" aria-label="Replay example" title="Replay example" disabled={reduced} onClick={replay}><RotateCcw size={16} /></Button>
      </div>
    </div>
    <div id="home-example-panel" role="tabpanel" aria-labelledby={`${mode}-preview-tab`} className="home-example-panel">
      <ol className="home-demo-stages">{example.steps.map((label, index) => <li key={label} data-active={index <= activeStage}><span>{index < activeStage ? <Check size={12} /> : index + 1}</span>{label}</li>)}</ol>
      <div className="home-chat" aria-live="polite" aria-atomic="false">
        {example.messages.slice(0, finalStep + 1).map((message, index) => <div key={`${mode}-${index}`} className={`home-message ${message.speaker === 'Patient' ? 'from-patient' : 'from-tulu'}`}><span>{message.speaker}</span><p>{message.text}</p></div>)}
        {finalStep < 3 && <div className="home-typing" aria-label={paused ? 'Example paused' : 'Response pending'}><i /><i /><i /></div>}
      </div>
      <div className="home-outcome" role="status">{isExampleBooked(finalStep) ? <><CalendarCheck size={17} /><span>{mode === 'convert' ? 'Consultation booked' : 'Return visit booked'}<small>{mode === 'convert' ? 'Thursday · 10 am' : 'Tuesday · 2 pm'}</small></span><Check size={16} /></> : <><MessageCircle size={17} /><span>{paused ? 'Example paused' : mode === 'convert' ? 'From inquiry to appointment' : 'From follow-up to return visit'}<small>{mode === 'convert' ? 'Voice AI & WhatsApp' : 'WhatsApp · Voice AI · Email'}</small></span></>}</div>
    </div>
  </div>;
}

export function PatientTwinPreview() {
  const { ref, visible, entered, reduced } = useViewportSequence<HTMLDivElement>();
  const [replay, setReplay] = useState(0);
  return <div ref={ref} className="twin-visual home-twin" data-entered={entered} data-sequence={entered && !reduced} data-running={visible} aria-label="Clinical data, conversations, wearable data and EHR connected to the Patient Twin">
    <div className="home-twin-diagram" key={replay}>
      <svg className="home-twin-lines" viewBox="0 0 500 260" preserveAspectRatio="none" aria-hidden="true">{['M110 35 L250 130', 'M390 35 L250 130', 'M110 225 L250 130', 'M390 225 L250 130'].map((path, index) => <g key={path}><path d={path} /><circle r="3" className={`home-signal home-signal-${index}`}><animateMotion dur="0.8s" begin={`${index * 0.8}s`} path={path} fill="freeze" /></circle></g>)}</svg>
      <span className="home-twin-source source-clinical"><Stethoscope />Clinical data</span>
      <span className="home-twin-source source-conversations"><MessageCircle />Conversations</span>
      <div className="twin-core"><Activity /><span>Patient Twin</span></div>
      <span className="home-twin-source source-wearables"><Heart />Wearables & devices</span>
      <span className="home-twin-source source-ehr"><Workflow />EHR & CRM</span>
    </div>
    <div className="home-twin-status"><span className="status-dot" /><span>One continuously updating profile.<strong className="home-profile-updated">Profile updated</strong></span><Button variant="ghost" size="icon" aria-label="Replay patient profile update" title="Replay patient profile update" disabled={reduced} onClick={() => setReplay(value => value + 1)}><RotateCcw size={14} /></Button></div>
  </div>;
}