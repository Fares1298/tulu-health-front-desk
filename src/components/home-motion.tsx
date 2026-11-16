import { useEffect, useRef, useState } from 'react';

export function useViewportSequence<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener('change', sync);
    const element = ref.current;
    if (!element) return () => media.removeEventListener('change', sync);
    const observer = new IntersectionObserver(([entry]) => {
      const inView = entry?.isIntersecting ?? false;
      setVisible(inView);
      if (inView) setEntered(true);
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => { observer.disconnect(); media.removeEventListener('change', sync); };
  }, []);
  return { ref, visible, entered, reduced };
}

export function useHomepageEntrances() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-entered', 'true');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    root.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return ref;
}