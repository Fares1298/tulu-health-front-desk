import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useViewportSequence } from '@/components/home-motion';
import { partners, featuredCoverage, displayCoverageDate, sorrellPerspective, type Partner, type Coverage } from '@/content/evidence';
import { mayFeaturePerspective } from '@/lib/evidence-policy';

export function PartnerGrid({ complete = false }: { complete?: boolean }) {
  return <ul className={`partner-grid ${complete ? 'partner-grid-complete' : ''}`}>{partners.filter(partner => complete || partner.home).map(partner => <PartnerMark key={partner.name} partner={partner} />)}</ul>;
}

function PartnerMark({ partner }: { partner: Partner }) {
  const mark = <>{partner.logo ? <div className="partner-logo"><img src={partner.logo} alt="" loading="lazy" /></div> : null}<span>{partner.name}</span></>;
  return <li>{partner.website ? <a href={partner.website} target="_blank" rel="noopener noreferrer" className="partner-item">{mark}</a> : <div className="partner-item">{mark}</div>}</li>;
}

export function HomePartners() {
  const { ref, visible, reduced } = useViewportSequence<HTMLDivElement>();
  const [paused, setPaused] = useState(false);
  return <section className="home-partners" aria-labelledby="home-partners-title"><div className="wrap"><span className="eyebrow">PARTNERS</span><h2 id="home-partners-title">Building the future of healthcare, together.</h2><p>Hospitals, clinics and organisations working with Tulu to connect intelligence with action.</p><div ref={ref} className="partner-logo-carousel" data-running={visible && !paused && !reduced}><div className="partner-logo-track"><div className="partner-logo-group"><PartnerGrid /></div><div className="partner-logo-group partner-logo-copy" aria-hidden="true" inert><PartnerGrid /></div></div></div><div className="partner-logo-actions"><Button asChild variant="link" className="evidence-link"><Link to="/partners">Meet our partners <ArrowRight aria-hidden="true" /></Link></Button>{!reduced ? <Button variant="outline" size="icon" className="partner-logo-pause" aria-label={paused ? 'Play partner logos' : 'Pause partner logos'} title={paused ? 'Play partner logos' : 'Pause partner logos'} onClick={() => setPaused(value => !value)}>{paused ? <Play /> : <Pause />}</Button> : null}</div></div></section>;
}

export function PartnerPerspective() {
  if (!mayFeaturePerspective(sorrellPerspective)) return null;
  return <aside className="partner-perspective wrap"><span className="eyebrow">PARTNER PERSPECTIVE</span><blockquote><p>“{sorrellPerspective.quote}”</p><footer>{sorrellPerspective.speaker} · {sorrellPerspective.role}, {sorrellPerspective.organisation}</footer></blockquote></aside>;
}

export function MediaEntry({ entry }: { entry: Coverage }) {
  return <article className="media-entry"><div className="media-entry-meta"><span>{entry.publication}</span><time dateTime={entry.date}>{displayCoverageDate(entry.date)}</time></div><a href={entry.url} target="_blank" rel="noopener noreferrer"><h3>{entry.title}</h3><ArrowUpRight aria-hidden="true" /></a><span className="media-type">{entry.type}</span>{entry.note ? <p>{entry.note}</p> : null}</article>;
}

export function HomeMedia() {
  return <section className="home-media wrap" aria-labelledby="home-media-title"><div className="media-section-heading"><div><span className="eyebrow">NEWS &amp; MEDIA</span><h2 id="home-media-title">Tulu in the news</h2></div><Button asChild variant="link" className="evidence-link"><Link to="/news-media">View all coverage <ArrowRight aria-hidden="true" /></Link></Button></div><div className="media-preview-grid">{featuredCoverage.map(entry => <MediaEntry key={entry.url} entry={entry} />)}</div></section>;
}