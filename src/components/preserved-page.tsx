import { useEffect, useRef, useState } from 'react';
import metadata from '@/content/preserved.json';

export function preservedHead(name: keyof typeof metadata) {
  const { title, description } = metadata[name];
  return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}

export function PreservedDocument({ name, embedded = false, hideClosing = false, closingOnly = false, compact = false, onReady }: { name: keyof typeof metadata; embedded?: boolean; hideClosing?: boolean; closingOnly?: boolean; compact?: boolean; onReady?: () => void }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const readyCallback = useRef(onReady);
  readyCallback.current = onReady;
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
        style.textContent = `main > header { padding-top: ${compact ? 28 : 48}px !important; } ${hideClosing ? '#cta { display: none !important; }' : ''} ${closingOnly ? 'main { min-height: 0 !important; } main > :not(:has(#cta)), main > div:has(#cta) > :not(#cta) { display: none !important; }' : ''} ${compact ? `
          main > header { max-width: 808px !important; padding-bottom: 28px !important; }
          main > div.relative > section { max-width: 1168px !important; }
          main > div.relative > section:not(#cta) { padding-top: 44px !important; padding-bottom: 44px !important; }
          main .sticky { position: static !important; margin-bottom: 16px !important; box-shadow: none !important; }
          @media(max-width: 540px) { main > header { padding-top: 24px !important; padding-bottom: 24px !important; } main > div.relative > section:not(#cta) { padding-block: 32px !important; } }
        ` : ''}`;
        document.head.appendChild(style);
      }
      const handleAnchor = (event: MouseEvent) => {
        if (!compact || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = event.target instanceof document.defaultView!.Element ? event.target.closest('a[href^="#"]') : null;
        const href = target?.getAttribute('href');
        const destination = href ? document.getElementById(href.slice(1)) : null;
        const iframe = frame.current;
        if (!destination || !iframe) return;
        event.preventDefault();
        const header = window.document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
        const tabs = window.document.querySelector('.longevity-tabs-bar')?.getBoundingClientRect().height ?? 0;
        window.scrollTo({ top: window.scrollY + iframe.getBoundingClientRect().top + destination.getBoundingClientRect().top - header - tabs - 12, behavior: 'instant' });
      };
      document.addEventListener('click', handleAnchor);
      removeAnchorListener = () => document.removeEventListener('click', handleAnchor);
      const measure = () => {
        const last = main.lastElementChild;
        if (!last) return;
        setHeight(Math.max(closingOnly ? 0 : 700, Math.ceil(last.getBoundingClientRect().bottom + (document.defaultView?.scrollY ?? 0))));
      };
      observer = new ResizeObserver(measure);
      observer.observe(document.body);
      for (const child of main.children) observer.observe(child);
      measure();
      readyCallback.current?.();
    }, 100);
    return () => {
      window.clearInterval(timer);
      observer?.disconnect();
      removeAnchorListener?.();
      window.removeEventListener('message', handle);
    };
  }, [name, embedded, hideClosing, closingOnly, compact]);
  return <iframe ref={frame} src={`/preserved/${name}.html`} title={closingOnly ? 'Longevity OS — Book a Demo' : metadata[name].title} height={height} className="preserved-frame" />;
}

export function PreservedPage({ name }: { name: keyof typeof metadata }) {
  return <main className="preserved-page"><PreservedDocument name={name} /></main>;
}