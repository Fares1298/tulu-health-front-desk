// Presentation-only draft gate, not an authorization boundary.
export function isCompanyPreviewHost(hostname: string) {
  const host = hostname.toLowerCase();
  if (host === 'localhost' || host === '127.0.0.1') return true;
  if (host.endsWith('.lovableproject.com') || host.endsWith('.lovableproject-dev.com')) return true;
  if (!['.lovable.app', '.gpt-eng.com', '.gptengineer.run'].some(suffix => host.endsWith(suffix))) return false;
  const first = host.split('.')[0] ?? '';
  return /^(?:id-preview|preview)(?:-[a-z0-9]+)?--.+$/.test(first) || /^project--[0-9a-f-]{36}-dev$/.test(first) || (/^live--[0-9a-f-]{36}(?:-thr_[a-z0-9]+)?$/.test(first) && host.split('.').length === 4);
}
export const companyLeaders = [{ name: 'Adil Khan', role: 'CEO & Founder' }, { name: 'Akif Khan', role: 'CTO' }];
