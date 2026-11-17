import { describe, expect, it } from 'vitest';
import { mayFeaturePerspective, mayPublishCoverage } from '../lib/evidence-policy';

describe('evidence publication safeguards', () => {
  const speaker = { wordingApproved: true, reusePermission: true, speaker: 'Dr Luke Sorrell', role: 'Founder', organisation: 'Sorrell MD' };
  it('requires approved wording before featuring a partner statement', () => {
    expect(mayFeaturePerspective({ ...speaker, wordingApproved: false })).toBe(false);
    expect(mayFeaturePerspective(speaker)).toBe(true);
  });
  it('requires reuse permission independently of wording approval', () => {
    expect(mayFeaturePerspective({ ...speaker, reusePermission: false })).toBe(false);
  });
  it('requires complete attribution', () => {
    expect(mayFeaturePerspective({ ...speaker, role: '' })).toBe(false);
  });
  const coverage = { destinationVerified: true, mentionsTulu: true, completed: true, duplicate: false };
  it('excludes in-process coverage', () => {
    expect(mayPublishCoverage({ ...coverage, completed: false })).toBe(false);
    expect(mayPublishCoverage(coverage)).toBe(true);
  });
  it('requires a verified destination and actual Tulu mention', () => {
    expect(mayPublishCoverage({ ...coverage, destinationVerified: false })).toBe(false);
    expect(mayPublishCoverage({ ...coverage, mentionsTulu: false })).toBe(false);
  });
  it('excludes duplicate promotional or syndicated entries', () => {
    expect(mayPublishCoverage({ ...coverage, duplicate: true })).toBe(false);
  });
});