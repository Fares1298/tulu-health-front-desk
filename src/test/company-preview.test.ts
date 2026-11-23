import { describe, expect, it } from 'vitest';
import { companyLeaders } from '@/lib/company-preview';

describe('Company leadership', () => {
  it('keeps leadership in the supplied order and roles', () => {
    expect(companyLeaders).toEqual([{name:'Adil Khan',role:'CEO & Founder'},{name:'Akif Khan',role:'CTO'}]);
  });
});
