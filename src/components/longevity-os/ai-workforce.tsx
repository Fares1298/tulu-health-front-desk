import { useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

/** Native adaptation of the approved compact workforce design. */
export function AIWorkforceSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    root.dataset['animated'] = 'true';
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const card = entry.target as HTMLElement;
        card.dataset['visible'] = String(entry.isIntersecting);
        if (entry.isIntersecting) card.dataset['entered'] = 'true';
      });
    }, { threshold: 0.16 });
    root.querySelectorAll('article').forEach(card => observer.observe(card));
    const reveal = () => { if (media.matches) root.querySelectorAll('article').forEach(card => card.setAttribute('data-entered', 'true')); };
    const visibility = () => root.setAttribute('data-hidden', String(document.hidden));
    media.addEventListener('change', reveal);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); media.removeEventListener('change', reveal); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  return (<section ref={ref} aria-labelledby="los-ai-title" className="twf-ai-section" id="ai-workforce">
<div className="twf-wrap">
<div className="twf-ai-head">
<div>
<div className="twf-eyebrow">AI WORKFORCE</div>
<h2 id="los-ai-title">Intelligence that works <i>alongside your team.</i></h2>
<p>Four focused AI services, connected to the same Patient Twin and designed to support the moments that matter across the patient journey.</p>
</div>
<div className="twf-ai-head-note"><span className="twf-ai-head-pulse"></span> ONE CONNECTED WORKFORCE</div>
</div>
<div className="twf-ai-workforce-grid">
<article className="twf-workforce-card twf-recall-card" id="recall">
<div className="twf-workforce-card-top"><span className="twf-workforce-icon">↗</span><span className="twf-workforce-index">01 / REACTIVATE</span></div>
<h3>AI Recall</h3>
<p>Reconnect with patients who have gone quiet through timely, relevant outreach grounded in their history.</p>
<div className="twf-workforce-demo">
<div className="twf-demo-top"><span className="twf-demo-live"></span> RECALL OPPORTUNITY <span className="twf-demo-time">JUST NOW</span></div>
<div className="twf-demo-row"><span className="twf-demo-avatar">ML</span><div><b>Maria L.</b><small>Last visit · 6 months ago</small></div><span className="twf-demo-pill">Ready to re-engage</span></div>
<div className="twf-demo-message">“Your next panel is coming due. Would you like us to help find a time?”</div>
</div>
<div className="twf-workforce-card-foot"><span>Patient reactivation</span><Button asChild variant="ghost" className="twf-card-link"><Link to="/contact" aria-label="Ask about AI Recall" title="Ask about AI Recall">↗</Link></Button></div>
</article>
<article className="twf-workforce-card twf-frontdesk-card" id="front-desk">
<div className="twf-workforce-card-top"><span className="twf-workforce-icon">◌</span><span className="twf-workforce-index">02 / RESPOND</span></div>
<h3>AI Front Desk</h3>
<p>Answer calls and chats 24/7, recognise new and returning patients, book appointments and escalate when needed.</p>
<div className="twf-workforce-demo">
<div className="twf-demo-top"><span className="twf-demo-live"></span> INBOUND CONVERSATION <span className="twf-demo-time">LIVE</span></div>
<div className="twf-demo-chat"><span className="twf-chat-label">PATIENT</span><span className="twf-chat-bubble twf-patient-bubble">Do you have any consults this week?</span></div>
<div className="twf-demo-chat twf-agent-chat"><span className="twf-chat-label">TULU FRONT DESK</span><span className="twf-chat-bubble twf-agent-bubble">I can help with that. Is this your first visit?</span></div>
</div>
<div className="twf-workforce-card-foot"><span>24/7 patient access</span><Button asChild variant="ghost" className="twf-card-link"><Link to="/ai-front-desk" aria-label="Explore AI Front Desk" title="Explore AI Front Desk">↗</Link></Button></div>
</article>
<article className="twf-workforce-card twf-navigator-card" id="navigator">
<div className="twf-workforce-card-top"><span className="twf-workforce-icon">✳</span><span className="twf-workforce-index">03 / GUIDE</span></div>
<h3>AI Care Navigator</h3>
<p>Reinforce physician-authored plans, help patients understand their next steps and escalate when clinical input is needed.</p>
<div className="twf-workforce-demo">
<div className="twf-demo-top"><span className="twf-demo-live"></span> PATIENT JOURNEY <span className="twf-demo-time">PLAN SUPPORT</span></div>
<div className="twf-journey-progress"><span className="twf-journey-done"></span><span></span><span></span><span></span></div>
<div className="twf-journey-steps"><span className="twf-done-step">Plan shared</span><span>Check-in due</span><span>Clinician review</span></div>
<div className="twf-navigator-note"><span>✳</span> Next step: complete your scheduled check-in</div>
</div>
<div className="twf-workforce-card-foot"><span>Plan adherence &amp; guidance</span><Button asChild variant="ghost" className="twf-card-link"><Link to="/contact" aria-label="Ask about AI Care Navigator" title="Ask about AI Care Navigator">↗</Link></Button></div>
</article>
<article className="twf-workforce-card twf-benchmark-card" id="benchmarks">
<div className="twf-workforce-card-top"><span className="twf-workforce-icon">⌁</span><span className="twf-workforce-index">04 / COMPARE</span><span className="twf-coming-tag">COMING SOON</span></div>
<h3>AI Benchmarks</h3>
<p>Understand how your practice compares through anonymised, aggregated network insights.</p>
<div className="twf-workforce-demo twf-benchmark-demo">
<div className="twf-demo-top"><span className="twf-demo-live"></span> PRACTICE VS. NETWORK <span className="twf-demo-time">ILLUSTRATIVE</span></div>
<div className="twf-benchmark-line"><span>Recall rate</span><div><i className="twf-rate-recall"></i></div><b>68%</b></div>
<div className="twf-benchmark-line"><span>Booking conversion</span><div><i className="twf-rate-booking"></i></div><b>54%</b></div>
<div className="twf-benchmark-line"><span>Care navigation</span><div><i className="twf-rate-care"></i></div><b>81%</b></div>
</div>
<div className="twf-workforce-card-foot"><span>Aggregated network insights</span><Button asChild variant="ghost" className="twf-card-link"><Link to="/contact" aria-label="Ask about AI Benchmarks" title="Ask about AI Benchmarks">↗</Link></Button></div>
</article>
</div>
<div className="twf-ai-workforce-bottom"><span className="twf-ai-bottom-orbit">✳</span> Every service works from the same Patient Twin — so context carries across every interaction.</div>
</div>
</section>);
}
