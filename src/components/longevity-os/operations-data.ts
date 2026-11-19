import worklist from '@/assets/operations/worklist.png.asset.json';
import campaigns from '@/assets/operations/campaigns.png.asset.json';
import pulse from '@/assets/operations/pulse.png.asset.json';
import capacity from '@/assets/operations/capacity.png.asset.json';
import membership from '@/assets/operations/membership.png.asset.json';
import compliance from '@/assets/operations/compliance.png.asset.json';
import outcomes from '@/assets/operations/outcomes.png.asset.json';

export const OPERATIONS_INTERVAL_MS = 6000;
export const OPERATIONS_FADE_MS = 650;
export interface OperationSlide { id: string; image: string; label: string; headline: string; description: string }
export const operationShowcases = [
  { category: '01 — GROWTH & RETENTION', headline: 'Know which patients need attention.', description: 'Turn patient data into clear next actions with prioritized worklists, targeted campaigns and coordinated follow-ups.', chips: ['Patient Worklists', 'Prioritization', 'Campaigns', 'Recall'], slides: [
    { id: 'worklist', image: worklist.url, label: 'Patient worklists', headline: '$1.8M in identified revenue at risk · 378 actions queued', description: "426 patients ranked by what they're worth to save, with each patient scored and a next-best action attached." },
    { id: 'campaigns', image: campaigns.url, label: 'Campaigns & follow-up', headline: '42 of 412 patients renewing in the next 30 days', description: 'Build cohorts against the patient panel and coordinate SMS, email or voice follow-ups. Demo sends are simulated.' },
  ] },
  { category: '02 — BUSINESS PERFORMANCE', headline: 'Understand how your practice is performing.', description: 'See the financial and operational health of your clinic in one place. Understand recurring revenue, provider utilization, memberships and performance trends.', chips: ['Clinic Pulse', 'Provider Capacity', 'Memberships', 'Revenue & MRR', 'Financial Performance'], slides: [
    { id: 'pulse', image: pulse.url, label: 'Clinic Pulse', headline: "One reconciled view of your clinic's performance.", description: 'Bring revenue, lab spend, margins, memberships and operational performance into one read-only business view.' },
    { id: 'capacity', image: capacity.url, label: 'Provider capacity', headline: "Understand how your team's capacity is being used.", description: 'Monitor provider utilization, appointment capacity and rebooking to identify operational opportunities.' },
    { id: 'membership', image: membership.url, label: 'Memberships & renewals', headline: 'Know where every membership stands.', description: 'Track recurring revenue, entitlement usage, payment visibility and upcoming renewals to support proactive retention.' },
  ] },
  { category: '03 — OVERSIGHT & OUTCOMES', headline: 'Stay ahead of risks. Prove the results.', description: 'Maintain visibility into clinical oversight, compliance, patient outcomes and program performance as your practice grows.', chips: ['Compliance', 'Risk Visibility', 'Patient Outcomes', 'Program Performance', 'Clinical Oversight'], slides: [
    { id: 'compliance', image: compliance.url, label: 'Compliance & documentation', headline: 'Keep patient communication connected to the record.', description: 'Improve visibility into patient communications, outstanding documentation and operational follow-through.' },
    { id: 'outcomes', image: outcomes.url, label: 'Patient outcomes', headline: 'Understand how patient programs are progressing.', description: 'Maintain visibility into longitudinal outcomes, cohort progress and program performance.' },
  ] },
] satisfies {category: string; headline: string; description: string; chips: string[]; slides: OperationSlide[]}[];
