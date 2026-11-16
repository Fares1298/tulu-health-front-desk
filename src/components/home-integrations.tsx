import apple from '@/assets/logos/apple.svg.asset.json';
import whoop from '@/assets/logos/whoop.svg.asset.json';
import dexcom from '@/assets/logos/dexcom.svg.asset.json';
import hologic from '@/assets/logos/hologic.svg.asset.json';
import inbody from '@/assets/logos/inbody.png.asset.json';
import invitae from '@/assets/logos/invitae.png.asset.json';
import stripe from '@/assets/logos/stripe.svg.asset.json';
import { EvidencePlaceholder } from '@/components/evidence-and-security';

type Item = { name: string; logo?: string; category?: string };
const wearables: Item[] = [{ name: 'Oura' }, { name: 'Whoop', logo: whoop.url }, { name: 'Apple Health', logo: apple.url }, { name: 'Dexcom', logo: dexcom.url }];
const clinical: Item[] = [{ name: 'Quest Diagnostics', category: 'Labs' }, { name: 'Invitae', logo: invitae.url, category: 'Genetics' }, { name: 'Hologic', logo: hologic.url, category: 'Imaging' }, { name: 'InBody', logo: inbody.url, category: 'Biometrics' }];
const systems: Item[] = [{ name: 'Pabau', category: 'EHR' }, { name: 'Boulevard', category: 'CRM' }, { name: 'Stripe', logo: stripe.url, category: 'Billing' }];

// Logos come from the Tulu website; brands without a sourced logo keep a readable name.
function Logo({ item }: { item: Item }) {
  return <span className="int-logo">{item.logo ? <img src={item.logo} alt="" aria-hidden="true" loading="lazy" /> : <span className="int-wordmark" aria-hidden="true">{item.name}</span>}</span>;
}

function Panel({ title, items }: { title: string; items: Item[] }) {
  return <div className="int-panel"><h3>{title}</h3><ul>{items.map(i => <li key={i.name} className="int-row"><Logo item={i} /><span><strong>{i.name}</strong><small>{i.category}</small></span></li>)}</ul></div>;
}

export function HomeIntegrations() {
  return <div className="int-groups" data-reveal>
    <div className="int-wearables"><h3>Wearables & Devices</h3><ul>{wearables.map(i => <li key={i.name} className="int-tile"><Logo item={i} /><span>{i.name}</span></li>)}</ul></div>
    <div className="int-panels"><Panel title="Clinical Data" items={clinical} /><Panel title="Systems" items={systems} /></div>
    <EvidencePlaceholder title="Integration workflow example">Awaiting a verified platform, information exchanged, available Tulu action and an approved screenshot or connection diagram. Logos alone do not confirm a particular workflow.</EvidencePlaceholder>
  </div>;
}
