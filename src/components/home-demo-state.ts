export type DemoMode = 'convert' | 'revive';

export const homepageExamples = {
  convert: {
    steps: ['Incoming inquiry', 'AI response', 'Appointment confirmed'],
    messages: [
      { speaker: 'Patient', text: 'Hi, can I book a consultation this week?' },
      { speaker: 'Tulu', text: 'Of course. Thursday at 10 am is available. Shall I reserve it for you?' },
      { speaker: 'Patient', text: 'Yes, Thursday at 10 am works for me.' },
      { speaker: 'Tulu', text: 'Your consultation is confirmed for Thursday at 10 am.' },
    ],
  },
  revive: {
    steps: ['Patient cohort', 'Targeted campaign', 'Outreach', 'Return booking'],
    messages: [
      { speaker: 'Cohort', text: 'Patients due for a follow-up · routine care campaign' },
      { speaker: 'Campaign', text: 'A personalised follow-up invitation, prepared for WhatsApp.' },
      { speaker: 'Outreach', text: '“Hi Alex, ready for your follow-up on Tuesday at 2 pm?” Alex: “Yes please, that works.”' },
      { speaker: 'Tulu', text: 'Your follow-up is confirmed for Tuesday at 2 pm.' },
    ],
  },
} satisfies Record<DemoMode, { steps: string[]; messages: { speaker: string; text: string }[] }>;

export function isExampleBooked(step: number) {
  return step >= 3;
}