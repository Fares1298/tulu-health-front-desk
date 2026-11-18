import { describe, expect, it } from 'vitest';
import { homePerspectives, partnerPerspectives, PERSPECTIVE_INTERVAL_MS } from '../content/partner-perspectives';

describe('partner perspectives publication', () => {
  it('includes all six supplied individuals', () => {
    expect(partnerPerspectives).toHaveLength(6);
    expect(new Set(partnerPerspectives.map(entry => entry.name)).size).toBe(6);
  });
  it('features the requested three individuals on the homepage', () => {
    expect(homePerspectives.map(entry => entry.name)).toEqual(['Ranjith B.R', 'A.S Pillai', 'Dr. Vijay Agarwal']);
  });
  it('limits Dr Arkadip’s attribution to the supplied role and AIIMS', () => {
    const entry = partnerPerspectives.find(item => item.name === 'Dr. Arkadip Chakraborty');
    expect(entry?.role).toBe('Resident MCh Spine Surgery');
    expect(entry?.organisation).toBe('AIIMS');
  });
  it('advances the homepage carousel every two seconds', () => {
    expect(PERSPECTIVE_INTERVAL_MS).toBe(2000);
  });
});