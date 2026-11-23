import { createFileRoute } from '@tanstack/react-router';
import { Image as ImageIcon } from 'lucide-react';
import { companyLeaders } from '@/lib/company-preview';

export const Route = createFileRoute('/company')({
  head: () => ({ meta: [
    { title: 'Company | Tulu Health' },
    { name: 'description', content: 'Tulu Health Leadership and Healthcare Specialists.' },
    { property: 'og:title', content: 'Company | Tulu Health' },
    { property: 'og:description', content: 'Tulu Health leadership and healthcare specialist profiles, in preparation.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
    { name: 'robots', content: 'noindex, nofollow' },
  ] }), component: CompanyPage,
});

function PortraitPlaceholder() {
  return <div className="company-portrait"><ImageIcon size={28} strokeWidth={1} aria-hidden="true" /><span>Photograph to be provided</span></div>;
}
function CompanyPage() {
  return <main className="company-page wrap"><header><span className="eyebrow">TULU HEALTH</span><h1>Company</h1></header>
    <section aria-labelledby="company-leadership"><div className="company-section-heading"><span className="eyebrow">01</span><h2 id="company-leadership">Leadership</h2></div>
      <div className="company-leadership-grid">{companyLeaders.map(person => <article className="company-profile" key={person.name}><PortraitPlaceholder /><div className="company-profile-content"><h3>{person.name}</h3><p className="company-role">{person.role}</p><div className="company-biography"><span className="eyebrow">ABOUT</span><p>Content to be provided later.</p></div></div></article>)}</div>
    </section>
    <section aria-labelledby="company-specialists"><div className="company-section-heading"><span className="eyebrow">02</span><h2 id="company-specialists">Healthcare Specialists</h2></div><div className="company-specialists-grid">{[0,1,2].map(index => <article className="company-profile company-specialist" key={index}><PortraitPlaceholder /><div className="company-profile-content"><h3>Name to be provided</h3><p className="company-role">Role to be provided</p><div className="company-biography"><span className="eyebrow">ABOUT</span><p>Biography to be provided.</p></div></div></article>)}</div></section>
  </main>;
}
