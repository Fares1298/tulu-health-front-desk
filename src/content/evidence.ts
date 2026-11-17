import medanta from '@/assets/partners/medanta-light.png.asset.json';
import moc from '@/assets/partners/moc-light.png.asset.json';
import ruban from '@/assets/partners/ruban.png.asset.json';
import ayushman from '@/assets/partners/ayushman.png.asset.json';
import upkar from '@/assets/partners/upkar.png.asset.json';
import caho from '@/assets/partners/caho.png.asset.json';
import nxt from '@/assets/partners/nxt.png.asset.json';
import alpha from '@/assets/partners/alpha.png.asset.json';
import gladden from '@/assets/partners/gladden.png.asset.json';
import weansa from '@/assets/partners/weansa.png.asset.json';
import reso from '@/assets/partners/reso.png.asset.json';
import mothers from '@/assets/partners/mothers.png.asset.json';
import love from '@/assets/partners/love.png.asset.json';
import edge from '@/assets/partners/edge.png.asset.json';
import mti from '@/assets/partners/mti.svg.asset.json';
import { mayPublishCoverage } from '@/lib/evidence-policy';

export type Partner = { name: string; logo?: string; website?: string; home?: boolean };
export const partners: Partner[] = [
  { name: 'Medanta', logo: medanta.url, website: 'https://www.medanta.org/', home: true },
  { name: 'MOC Cancer Care & Research Centre', logo: moc.url, website: 'https://www.mocindia.co.in/', home: true },
  { name: 'Ruban', logo: ruban.url },
  { name: 'Ayushman Hospital & Health Services', logo: ayushman.url, website: 'https://www.ayushmanhhs.in/' },
  { name: 'Upkar Hospital', logo: upkar.url, website: 'https://upkarhospital.com/' },
  { name: 'CAHO', logo: caho.url, website: 'https://www.caho.in/', home: true },
  { name: 'NXT Horizon', logo: nxt.url, website: 'https://nxthorizon.ai/' },
  { name: 'AlphaHealth', logo: alpha.url, website: 'https://alphahealth.ae/' },
  { name: 'Gladden Longevity', logo: gladden.url, website: 'https://www.gladdenlongevity.com/', home: true },
  { name: 'WeAnsa Vertigo & Balance Centre', logo: weansa.url, website: 'https://weansavbc.com/', home: true },
  { name: 'Resohealth', logo: reso.url },
  { name: 'Mother’s Care Children Hospital & Research Centre', logo: mothers.url, website: 'https://motherscarehospital.com/', home: true },
  { name: 'Love Bites Dental', logo: love.url, website: 'https://lovebitesdental.com/', home: true },
  { name: 'Sorrell MD', website: 'https://www.sorrell-md.com/' },
  { name: 'HealthEdge LLC', logo: edge.url, website: 'https://healthedgellc.com/' },
  { name: 'MTI Global Group', logo: mti.url, website: 'https://mtiglobalgroup.com/about', home: true },
];

export const coverageCategories = ['Coverage & announcements', 'Interviews & features', 'Founder perspectives'] as const;
export type CoverageCategory = typeof coverageCategories[number];
export type Coverage = { publication: string; title: string; date: string; url: string; category: CoverageCategory; type: string; note?: string };
const verifiedCoverage: Coverage[] = [
  { publication: 'Longevity.Technology', title: 'The overlooked leak draining longevity clinic revenue', date: '2026-09-15', url: 'https://longevity.technology/news/the-overlooked-leak-draining-longevity-clinic-revenue/', category: 'Interviews & features', type: 'Publication feature', note: 'Publisher account required to read the full article.' },
  { publication: 'Pharmabiz', title: 'Tulu Health expands its US presence with Longevity OS, AI-native operating system for the longevity economy', date: '2026-08-25', url: 'https://www.pharmabiz.com/NewsDetails.aspx?aid=188163&sid=2', category: 'Coverage & announcements', type: 'Announcement coverage', note: 'Based on a company communication note.' },
  { publication: 'YourStory', title: 'Startup news and updates: Daily roundup (August 27, 2026)', date: '2026-08-27', url: 'https://yourstory.com/2026/08/startup-news-and-updates-daily-roundup-august-27-2026', category: 'Coverage & announcements', type: 'Startup news roundup', note: 'Includes “Tulu Health launches Longevity OS”.' },
  { publication: 'Digital Health News', title: 'Tulu Health Launches AI-Native Longevity OS, Plans US Expansion', date: '2026-08-26', url: 'https://www.digitalhealthnews.com/tulu-health-launches-ai-native-longevity-os-plans-us-expansion', category: 'Coverage & announcements', type: 'Announcement coverage', note: 'Publisher displays this date as last updated.' },
  { publication: 'Indian Pharma Post', title: 'Tulu Health launches Longevity OS to turn patient data into actionable care', date: '2026-08-25', url: 'https://www.indianpharmapost.com/healthcare/lite/tulu-health-launches-longevity-os-to-turn-patient-data-into-actionable-care-21555', category: 'Coverage & announcements', type: 'Announcement coverage' },
  { publication: 'CEO Insights', title: 'Tulu Health Expands U.S. Reach with AI-Powered Longevity OS', date: '2026-08-27', url: 'https://www.ceoinsightsindia.com/news/tulu-health-expands-us-reach-with-aipowered-longevity-os-nwid-24755.html', category: 'Coverage & announcements', type: 'Press-release republication', note: 'Publisher explicitly credits “Source: Press Release”.' },
  { publication: 'UNI', title: 'Tulu Health launches Longevity OS, plans to expand U.S. presence', date: '2026-08-31', url: 'https://www.uniindia.com/business-economy/health-telanganatulu/164954', category: 'Coverage & announcements', type: 'News agency report', note: 'Full article access may require a subscription.' },
  { publication: 'The Big Plunge', title: 'Tulu Health Launches AI-Powered Longevity OS as It Targets U.S. Healthcare Expansion', date: '2026-08-31', url: 'https://mybigplunge.com/healthcare/tulu-health-launches-ai-powered-longevity-os-as-it-targets-u-s-healthcare-expansion/', category: 'Coverage & announcements', type: 'Announcement coverage' },
  { publication: 'US Tech Times', title: 'Tulu Health Launches Longevity OS to Power US Expansion of Longevity Clinics', date: '2026-09-18', url: 'https://ustechtimes.com/tulu-health-launches-longevity-os-to-power-us-expansion-of-longevity-clinics/', category: 'Interviews & features', type: 'Publication feature' },
  { publication: 'India Tech Desk', title: 'Is India’s Preventive-Health Industry Designed Around Men? One Founder Says Yes', date: '2026-09-18', url: 'https://indiatechdesk.com/is-indias-preventive-health-industry-designed-around-men-one-founder-says-yes/', category: 'Interviews & features', type: 'Founder interview', note: 'Interview with Dr Adil Khan, Founder and CEO of Tulu Health.' },
  { publication: 'Business Review Live', title: 'Tulu Health expands its U.S. presence with Longevity OS, AI-native operating system for the longevity economy', date: '2026-09-08', url: 'https://businessreviewlive.com/tulu-health-expands-its-u-s-presence-with-longevity-os-ai-native-operating-system-for-the-longevity-economy/', category: 'Coverage & announcements', type: 'Announcement coverage' },
  { publication: 'Express Healthcare', title: 'Care has gone continuous. Operating system hasn’t', date: '2026-08-27', url: 'https://www.expresshealthcare.in/news/care-has-gone-continuous-operating-system-hasnt/454939/', category: 'Founder perspectives', type: 'Founder-authored perspective', note: 'By Dr Adil Khan, Founder and CEO of Tulu Health.' },
];

export const coverage = verifiedCoverage.filter(() => mayPublishCoverage({ destinationVerified: true, mentionsTulu: true, completed: true, duplicate: false }));
export const featuredCoverage = coverage.slice(0, 3);
export function displayCoverageDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
}

// A published quotation is not permission to reuse it as a testimonial.
export const sorrellPerspective = {
  speaker: 'Dr Luke Sorrell', role: 'Founder', organisation: 'Sorrell MD',
  wordingApproved: false, reusePermission: false,
  quote: 'What makes it unique is that it operates rather than reports. Most tools tell you what happened last quarter; Tulu turns the same data into a daily work queue. For a practice like mine, that’s the difference between having data and actually acting on it.',
  source: 'https://www.pharmabiz.com/NewsDetails.aspx?aid=188163&sid=2',
};