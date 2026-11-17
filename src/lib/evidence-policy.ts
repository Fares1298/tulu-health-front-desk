export type PerspectiveApproval = { wordingApproved: boolean; reusePermission: boolean; speaker: string; role: string; organisation: string };

export function mayFeaturePerspective(approval: PerspectiveApproval) {
  return approval.wordingApproved && approval.reusePermission && [approval.speaker, approval.role, approval.organisation].every(value => value.trim().length > 0);
}

export function mayPublishCoverage(entry: { destinationVerified: boolean; mentionsTulu: boolean; completed: boolean; duplicate: boolean }) {
  return entry.destinationVerified && entry.mentionsTulu && entry.completed && !entry.duplicate;
}