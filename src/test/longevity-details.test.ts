import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

const html = readFileSync('public/preserved/longevity-explorer.html', 'utf8');
const script = readFileSync('public/preserved/longevity-explorer.js', 'utf8');

describe('Longevity OS feature navigation', () => {
  it('routes AI Benchmarks inquiries to contact', () => {
    const dom = new JSDOM(html);
    const service = dom.window.document.getElementById('benchmarks');
    if (!service) throw new Error('Missing AI Benchmarks');
    const action = service.querySelector('a');
    expect(action?.getAttribute('href')).toBe('/contact');
    dom.window.close();
  });

  it('scrolls directly to the requested feature without changing other content', async () => {
    const dom = new JSDOM(html, { url: 'http://localhost/longevity-os#outcomes', runScripts: 'outside-only' });
    dom.window['ResizeObserver'] = class { observe() {} disconnect() {} unobserve() {} };
    const scrolls: number[] = [];
    dom.window.scrollBy = (options?: ScrollToOptions | number) => {
      if (typeof options === 'object') scrolls.push(options.top ?? 0);
    };
    const outcomes = dom.window.document.getElementById('outcomes');
    if (!outcomes) throw new Error('Missing outcomes destination');
    outcomes.getBoundingClientRect = () => ({ top: 640, bottom: 800, left: 0, right: 500, width: 500, height: 160, x: 0, y: 640, toJSON: () => ({}) });
    dom.window.eval(script);
    dom.window.dispatchEvent(new dom.window.Event('hashchange'));
    await new Promise(resolve => dom.window.setTimeout(resolve, 150));
    expect(scrolls).toContain(624);
    expect(dom.window.location.hash).toBe('#outcomes');
    dom.window.close();
  });
});
