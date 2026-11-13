import { useEffect, useRef, useState } from 'react';
import metadata from '@/content/preserved.json';

export function preservedHead(name: keyof typeof metadata) {
  const { title, description } = metadata[name];
  return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}

export function PreservedPage({ name }: { name: keyof typeof metadata }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1800);
  useEffect(() => {
    const handle = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (typeof event.data?.tuluHeight === 'number') setHeight(Math.max(700, event.data.tuluHeight));
    };
    window.addEventListener('message', handle);
    return () => window.removeEventListener('message', handle);
  }, []);
  return <main className="preserved-page"><iframe ref={frame} src={`/preserved/${name}.html`} title={metadata[name].title} height={height} className="preserved-frame" /></main>;
}