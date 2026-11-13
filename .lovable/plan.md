# Restructure the Tulu Health "Twin" page

Rebuild the Twin page as the home page of this project, keeping all existing copy but reorganizing it into a clearer story that leads to "Book a Demo".

## New page flow
1. **Top section** - Headline "A single profile three parties read and write to." with short intro, primary "Book a Demo" button and secondary "Watch 60s walkthrough".
2. **Who uses it** - Three cards: Clinician updates, Patient adds, AI acts and writes back.
3. **Walkthrough video** - "The same Twin, walked through in 60 seconds" with a play placeholder (biological age, longevity score, daily plan).
4. **Pillar 1: Unified Data** - Copy plus a visual hub showing EHR/EMR, Labs, Wearables, Apple Health, Google Health, Intake Forms flowing into The Twin.
5. **Pillar 2: Contextual Memory** - Copy plus a mock AI copilot chat panel ("Hi Sarah...") with a few sample replies.
6. **Trust strip** - SOC-2, HIPAA, live in weeks, no lock-in.
7. **Closing call to action** - "Bring us your messiest patient" with Book a Demo (links to tuluhealth.com/contact).
8. Simple top navigation and footer.

## Design
Fresh clinical-premium look: warm off-white background, deep teal primary, serif display headings with clean sans body, subtle italics echoing the current "_Seconds._" styling. Mobile friendly.

## Technical details
- Rewrite `src/routes/index.tsx`, split sections into components under `src/components/twin/`.
- Tokens and fonts in `src/styles.css` and root head links; page-specific head() metadata.
- Video and copilot chat are static mockups (no backend).
