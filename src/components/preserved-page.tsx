import { useEffect, useRef, useState } from 'react';
import metadata from '@/content/preserved.json';

export function preservedHead(name: keyof typeof metadata) {
  const { title, description } = metadata[name];
  return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}

export function PreservedDocument({ name, embedded = false, hideClosing = false, closingOnly = false }: { name: keyof typeof metadata; embedded?: boolean; hideClosing?: boolean; closingOnly?: boolean }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1800);
  useEffect(() => {
    const handle = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (typeof event.data?.tuluHeight === 'number') setHeight(Math.max(700, event.data.tuluHeight));
    };
    if (!embedded) window.addEventListener('message', handle);
    let observer: ResizeObserver | undefined;
    const timer = window.setInterval(() => {
      const document = frame.current?.contentDocument;
      const main = document?.querySelector('main');
      if (!document || !main || document.readyState === 'loading') return;
      window.clearInterval(timer);
      if (embedded) {
        const style = document.createElement('style');
        style.textContent = `main > header { padding-top: 48px !important; } ${hideClosing ? '#cta { display: none !important; }' : ''} ${closingOnly ? 'main { min-height: 0 !important; } main > :not(:has(#cta)), main > div:has(#cta) > :not(#cta) { display: none !important; }' : ''}`;
        document.head.appendChild(style);
      }
      const measure = () => {
        const last = main.lastElementChild;
        if (!last) return;
        setHeight(Math.max(closingOnly ? 0 : 700, Math.ceil(last.getBoundingClientRect().bottom + (document.defaultView?.scrollY ?? 0))));
      };
      observer = new ResizeObserver(measure);
      observer.observe(document.body);
      for (const child of main.children) observer.observe(child);
      measure();
    }, 100);
    return () => {
      window.clearInterval(timer);
      observer?.disconnect();
      window.removeEventListener('message', handle);
    };
  }, [name, embedded, hideClosing, closingOnly]);
  return <iframe ref={frame} src={`/preserved/${name}.html`} title={closingOnly ? 'Longevity OS — Book a Demo' : metadata[name].title} height={height} className="preserved-frame" />;
}

export function PreservedPage({ name }: { name: keyof typeof metadata }) {
  return <main className="preserved-page"><PreservedDocument name={name} /></main>;
}