import { createFileRoute } from "@tanstack/react-router";
import { Link } from '@tanstack/react-router';
import { Activity, ArrowRight, AudioLines, Layers3, Phone, RotateCcw } from 'lucide-react';
import { ClosingCTA } from '@/components/tulu-shell';
import { FrontDeskPreview, PatientTwinPreview } from '@/components/home-product-previews';
import { useHomepageEntrances } from '@/components/home-motion';
import { HomeLongevity } from '@/components/home-longevity';
import { HomeIntegrations } from '@/components/home-integrations';
import { SecuritySummary } from '@/components/evidence-and-security';
import { HomePartners, HomeMedia, PartnerPerspective } from '@/components/partner-media';

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: 'Tulu Health | AI Front Desk, Patient Twin & Longevity OS' }, { name: 'description', content: 'Convert more inquiries, connect patient intelligence and grow your healthcare business. Explore Tulu’s AI Front Desk, Patient Twin and Longevity OS.' }, { property: 'og:title', content: 'Tulu Health | Connected intelligence. Better care.' }, { property: 'og:description', content: 'AI Front Desk, Patient Twin and Longevity OS for hospitals, clinics and longevity practices.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: Index,
});

function Index() {
  const homepage = useHomepageEntrances();
  return <main ref={homepage} className="home-enhanced">
    <section className="home-opening grid-background"><div className="wrap"><span className="eyebrow">TULU HEALTH</span><h1><span>Convert more inquiries.</span><span>Connect patient intelligence.</span><em>Grow your healthcare business.</em></h1><p className="opening-copy">AI-powered conversations. A living patient memory. Connected clinic operations.<br className="desktop-break" /> For hospitals, clinics and longevity practices — start with what you need.</p></div></section>
    <section className="product-entrances wrap" aria-label="Tulu products" data-reveal>
      <Link className="product-card" to="/ai-front-desk"><span className="product-icon"><AudioLines /></span><span className="eyebrow">CONVERSATIONS THAT CONVERT</span><h2>AI Front Desk</h2><p>Turn incoming inquiries into appointments and bring lapsed patients back with Convert IQ and Revive.</p><span className="text-link">Explore AI Front Desk <ArrowRight /></span></Link>
      <Link className="product-card" to="/twin"><span className="product-icon"><Activity /></span><span className="eyebrow">ONE LIVING PATIENT PROFILE</span><h2>Patient Twin</h2><p>One continuously updating profile that the clinician, the patient and the AI all read from and write back to.</p><span className="text-link">Explore Patient Twin <ArrowRight /></span></Link>
      <Link className="product-card" to="/longevity-os"><span className="product-icon"><Layers3 /></span><span className="eyebrow">CONNECTED LONGEVITY CARE</span><h2>Longevity OS</h2><p>Your longevity practice’s data, clinical picture and operational work — connected around every patient.</p><span className="text-link">Explore Longevity OS <ArrowRight /></span></Link>
    </section>
    <HomePartners />
    <section className="front-preview dark-band"><div className="wrap"><div className="section-heading" data-reveal><span className="eyebrow">AI FRONT DESK · CONVERT IQ + REVIVE</span><h2>Capture new demand.<br /><em>Recover missed opportunities.</em></h2><p>From the first inquiry to the next visit.<br />Keep the conversation moving — and your team in control.</p></div><div className="home-front-layout"><div className="front-preview-grid"><article><span className="line-icon"><Phone /></span><h3>Convert IQ</h3><p>Answer incoming Voice AI calls and WhatsApp inquiries. Give relevant answers, convert interest into appointments, and hand off to staff when needed.</p><div className="channel-row"><span>Voice AI</span><span>WhatsApp</span><span>Staff handoff</span></div></article><article><span className="line-icon"><RotateCcw /></span><h3>Revive</h3><p>Build patient cohorts and targeted campaigns. Reach lapsed patients, missed appointments and overdue follow-ups through WhatsApp, Voice AI and email.</p><div className="channel-row"><span>WhatsApp</span><span>Voice AI</span><span>Email</span></div></article></div><FrontDeskPreview /></div><Link to="/ai-front-desk" className="text-link">Meet your AI Front Desk <ArrowRight /></Link></div></section>
    <section className="feature-section wrap"><div className="feature-copy" data-reveal><span className="eyebrow">THE PATIENT TWIN</span><h2>Not a database.<br />Not a dashboard.<br /><em>A living memory.</em></h2><p>Every patient gets one continuously updating profile that the clinician, the patient, and the AI all share. It’s the reason every Tulu service knows your patient before it acts.</p><Link to="/twin" className="text-link">Discover the Patient Twin <ArrowRight /></Link></div><PatientTwinPreview /></section>
    <HomeLongevity />
    <PartnerPerspective />
    <section className="integrations-section wrap"><span className="eyebrow">WORKS WITH YOUR WORLD</span><h2>Keep your stack.<em> Tulu connects it.</em></h2><p>No rip-and-replace project. Tulu connects with the systems your practice already uses.</p><HomeIntegrations /><p className="home-integration-note">Connections are configured around your practice’s systems; availability varies by deployment.</p></section>
    <SecuritySummary />
    <HomeMedia />
    <div data-reveal className="home-closing"><ClosingCTA /></div>
  </main>;
}
