import { Link } from '@tanstack/react-router';
import { Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Brand() {
  return <Link to="/" className="brand"><span className="brand-mark"><Activity size={17} strokeWidth={1.5} /></span><span>tulu<span className="brand-health">health</span></span></Link>;
}

export function DemoButton({ className = '' }: { className?: string }) {
  return <Button asChild className={`demo-button ${className}`}><Link to="/contact">Book a Demo</Link></Button>;
}

const destinations = [
  { to: '/ai-front-desk', label: 'AI Front Desk' },
  { to: '/twin', label: 'Patient Twin' },
  { to: '/longevity-os', label: 'Longevity OS' },
  { to: '/demo', label: 'See It in Action' },
  { to: '/company', label: 'Company' },
  { to: '/blog', label: 'Blog' },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><nav className="header-inner" aria-label="Main navigation"><Brand /><div className="desktop-nav">{destinations.map(item => <Link key={item.to} to={item.to} activeProps={{ className: 'nav-active' }}>{item.label}</Link>)}</div><div className="header-actions"><DemoButton /><Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>{open && <div className="mobile-nav">{destinations.map(item => <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>{item.label}</Link>)}</div>}</nav></header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-grid wrap"><div><Brand /><p>Patient intelligence and AI-powered workflows for hospitals, clinics and longevity practices.</p><p>8 The Green, Suite B, Dover, DE 19901<br />Delaware, USA</p><a className="linkedin" href="https://www.linkedin.com/company/tuluhealth/" aria-label="Tulu Health on LinkedIn">in</a></div><div><h3>PLATFORM</h3><Link to="/ai-front-desk">AI Front Desk</Link><Link to="/twin">Patient Twin</Link><Link to="/longevity-os">Longevity OS</Link><Link to="/operations">Clinic Operations</Link><Link to="/services">AI Services</Link><Link to="/architecture">Architecture</Link></div><div><h3>COMPANY</h3><Link to="/team">Team</Link><Link to="/partners">Partners</Link><Link to="/news-media">News &amp; Media</Link><Link to="/blog">Blog</Link><Link to="/demo">See It in Action</Link><Link to="/contact">Contact</Link></div><div><h3>TRUST</h3><Link to="/governance">AI Governance</Link><Link to="/security">Security</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div><div className="footer-bottom wrap"><span>© 2026 Tulu Health, Inc. All rights reserved.</span><span>CONNECTED INTELLIGENCE. BETTER CARE.</span></div></footer>;
}

export function ClosingCTA({ frontDesk = false }: { frontDesk?: boolean }) {
  return <section className="closing-section wrap"><div className="closing-content"><span className="eyebrow">{frontDesk ? 'AI FRONT DESK' : 'LET’S CONNECT THE PIECES'}</span><h2>{frontDesk ? <>Turn inquiries and lapsed patients<br />into booked visits.</> : <>Grow your healthcare business.<br /><em>Keep care at the centre.</em></>}</h2><p>{frontDesk ? 'See how Convert IQ and Revive fit into your clinic’s workflow.' : 'Start with what your hospital or clinic needs. We’ll show you where Tulu fits.'}</p><DemoButton /></div></section>;
}