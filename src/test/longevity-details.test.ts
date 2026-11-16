import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

const html = readFileSync('public/preserved/longevity-explorer.html', 'utf8');
const script = readFileSync('public/preserved/longevity-explorer.js', 'utf8');

function page(hash = '') {
  const dom = new JSDOM(html, { url: `http://localhost/longevity-os${hash}`, runScripts: 'outside-only' });
  dom.window['ResizeObserver'] = class { observe() {} disconnect() {} unobserve() {} };
  dom.window.scrollBy = () => {};
  dom.window.eval(script);
  return dom;
}

describe('Longevity OS detail rules', () => {
  it('allows only one operations capability open at a time', async () => {
    const dom = page();
    const doc = dom.window.document;
    doc.querySelector<HTMLDetailsElement>('[data-feature="worklist"] > summary')?.click();
    doc.querySelector<HTMLDetailsElement>('[data-feature="capacity"] > summary')?.click();
    expect(doc.querySelector<HTMLDetailsElement>('[data-feature="worklist"]')?.open).toBe(false);
    expect(doc.querySelector<HTMLDetailsElement>('[data-feature="capacity"]')?.open).toBe(true);
    await new Promise(resolve => dom.window.setTimeout(resolve, 30));
    dom.window.close();
  });

  it('allows only one service open, independently of operations', async () => {
    const dom = page();
    const doc = dom.window.document;
    for (const id of ['capacity', 'recall', 'front-desk']) {
      doc.querySelector<HTMLElement>(`[data-feature="${id}"] > summary`)?.click();
    }
    expect(doc.querySelector<HTMLDetailsElement>('[data-feature="capacity"]')?.open).toBe(true);
    expect(doc.querySelector<HTMLDetailsElement>('[data-feature="recall"]')?.open).toBe(false);
    expect(doc.querySelector<HTMLDetailsElement>('[data-feature="front-desk"]')?.open).toBe(true);
    await new Promise(resolve => dom.window.setTimeout(resolve, 30));
    dom.window.close();
  });

  it('opens the linked feature automatically', async () => {
    const dom = page('#outcomes');
    dom.window.dispatchEvent(new dom.window.Event('hashchange'));
    expect(dom.window.document.querySelector<HTMLDetailsElement>('[data-feature="outcomes"]')?.open).toBe(true);
    expect(dom.window.document.querySelector<HTMLDetailsElement>('[data-feature="worklist"]')?.open).toBe(false);
    await new Promise(resolve => dom.window.setTimeout(resolve, 30));
    dom.window.close();
  });
});