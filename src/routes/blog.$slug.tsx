import { createFileRoute, notFound } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';

const articles: Record<string, string> = {
  'us-launch': 'Tulu Health US Launch',
  'ai-resilience': 'AI Resilience',
  'ai-where-growth-is': 'AI: Where Growth Is',
  'trust-not-ai': 'Trust, Not AI',
  'autonomous-rcm': 'Autonomous Revenue Cycle Management',
  'ai-pilot-survival': 'AI Pilot Survival',
};
export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => { const title = articles[params.slug]; if (!title) throw notFound(); return { title }; },
  head: ({ loaderData }) => { const title = `${loaderData?.title ?? 'Article unavailable'} | Tulu Health Blog`; const description = 'Insights from Tulu Health on healthcare, patient intelligence and AI.'; return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'article' }, { name: 'twitter:card', content: 'summary_large_image' }] }; },
  component: Article,
});
function Article() {
  const { slug } = Route.useParams();
  const { title } = Route.useLoaderData();
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1800);
  useEffect(() => { const handle = (event: MessageEvent) => { if (event.origin === window.location.origin && event.source === frame.current?.contentWindow && typeof event.data?.tuluHeight === 'number') setHeight(Math.max(700, event.data.tuluHeight)); }; window.addEventListener('message', handle); return () => window.removeEventListener('message', handle); }, []);
  return <main><iframe ref={frame} className="preserved-frame" src={`/preserved/blog-${slug}.html`} title={title} height={height} /></main>;
}