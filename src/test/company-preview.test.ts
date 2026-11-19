import { describe, expect, it } from 'vitest';
import { companyLeaders, isCompanyPreviewHost } from '@/lib/company-preview';

describe('Company draft', () => {
  it('keeps leadership in the supplied order and roles', () => {
    expect(companyLeaders).toEqual([{name:'Adil Khan',role:'CEO & Founder'},{name:'Akif Khan',role:'CTO'}]);
  });
  it('does not expose Company content on the published site or custom domains', () => {
    expect(isCompanyPreviewHost('tulu-health-front-desk.lovable.app')).toBe(false);
    expect(isCompanyPreviewHost('www.tuluhealth.com')).toBe(false);
    expect(isCompanyPreviewHost('id-preview--fake.example.com')).toBe(false);
  });
  it('allows main, numbered draft and commit previews independently of production build mode', () => {
    expect(isCompanyPreviewHost('id-preview--7fb37114-f3b4-492b-ac07-2a2778793bd8.lovable.app')).toBe(true);
    expect(isCompanyPreviewHost('id-preview-6--7fb37114-f3b4-492b-ac07-2a2778793bd8.lovable.app')).toBe(true);
    expect(isCompanyPreviewHost('id-preview-abcd1234--7fb37114-f3b4-492b-ac07-2a2778793bd8.lovable.app')).toBe(true);
  });
});
