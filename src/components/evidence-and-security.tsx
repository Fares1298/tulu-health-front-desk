import { Link } from '@tanstack/react-router';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EvidencePlaceholder({ title, children }: { title: string; children: React.ReactNode }) {
  return <aside className="evidence-placeholder"><span className="evidence-status">Placeholder · not partner evidence</span><h3>{title}</h3><p>{children}</p></aside>;
}

export function SecuritySummary() {
  return <section className="home-security wrap" aria-labelledby="home-security-title"><ShieldCheck aria-hidden="true" /><div><h2 id="home-security-title">Security &amp; AI governance</h2><p>Review Tulu’s security information and approach to AI governance. Deployment-specific requirements can be discussed with our team.</p><p className="evidence-status">Supporting security evidence: awaiting approved documentation.</p><div className="security-actions"><Button asChild variant="outline"><Link to="/security">Review security details</Link></Button><Button asChild variant="link"><Link to="/governance">AI governance</Link></Button><Button asChild variant="link"><Link to="/contact">Request security documentation</Link></Button></div></div></section>;
}