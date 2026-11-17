import { createFileRoute } from '@tanstack/react-router';
import { MediaEntry } from '@/components/partner-media';
import { coverage, coverageCategories } from '@/content/evidence';

export const Route = createFileRoute('/news-media')({
  head: () => ({ meta: [
    { title: 'News & Media | Tulu Health' },
    { name: 'description', content: 'Explore Tulu Health coverage and announcements, interviews and features, and founder-authored perspectives from verified publications.' },
    { property: 'og:title', content: 'News & Media | Tulu Health' },
    { property: 'og:description', content: 'Tulu in the news: publication coverage, company announcements, interviews and founder perspectives.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: NewsMediaPage,
});

function NewsMediaPage() {
  return <main className="evidence-page news-media-page wrap"><header><span className="eyebrow">TULU IN THE NEWS</span><h1>News &amp; Media</h1><p>Coverage, conversations and perspectives on connected healthcare.</p></header>{coverageCategories.map(category => <section key={category} className="coverage-category" aria-label={category}><h2>{category}</h2><div className="coverage-list">{coverage.filter(entry => entry.category === category).map(entry => <MediaEntry key={entry.url} entry={entry} />)}</div></section>)}</main>;
}