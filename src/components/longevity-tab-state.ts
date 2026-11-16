export type LongevityTab = 'clinic-operations' | 'ai-services';

export const longevityTabStorageKey = 'tulu-longevity-view';

export function resolveLongevityTab(hash: string, saved: string | null): LongevityTab {
  const explicit = hash.replace(/^#/, '');
  if (explicit === 'clinic-operations' || explicit === 'ai-services') return explicit;
  return saved === 'ai-services' ? 'ai-services' : 'clinic-operations';
}