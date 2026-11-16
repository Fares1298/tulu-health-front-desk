import { describe, expect, it } from 'vitest';
import { resolveLongevityTab } from '@/components/longevity-tab-state';

describe('Longevity OS view selection', () => {
  it('opens Clinic Operations by default', () => {
    expect(resolveLongevityTab('', null)).toBe('clinic-operations');
  });
  it('opens the shared AI Services link ahead of a previous selection', () => {
    expect(resolveLongevityTab('#ai-services', 'clinic-operations')).toBe('ai-services');
  });
  it('opens the shared Clinic Operations link ahead of a previous selection', () => {
    expect(resolveLongevityTab('#clinic-operations', 'ai-services')).toBe('clinic-operations');
  });
  it('restores AI Services when returning without a direct link', () => {
    expect(resolveLongevityTab('', 'ai-services')).toBe('ai-services');
  });
});