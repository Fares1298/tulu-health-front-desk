# Rebuild the Tulu Health "Twin" page with its current design

Recreate the Twin page as this project's home page, matching the live site's look, with a clearer section order ending in "Book a Demo".

## Captured design
- Background: warm cream (#F5EEE2) with a faint grid pattern and soft glow at the top
- Accent: terracotta (#BE6B45) for buttons, logo badge and highlighted words (e.g. italic "60 Seconds.")
- Text: deep brown-black (#241B14), muted brown for body copy
- Font: Satoshi throughout; large medium-weight headlines, small spaced-out uppercase labels ("THE PATIENT TWIN", "WHAT IT IS")
- Cards: off-white, very rounded corners, soft shadow
- Top bar: logo "tuluhealth", links (The Patient Twin, Clinic Operations, AI Services, See it in Action, Blog), rounded "Book a Demo" button

## Page flow
1. Top bar
2. Opening: "Not a Database. Not a Dashboard. A Living Memory." + intro text
3. "What it is" card: a single profile three parties read and write to
4. "Watch it work" with 60-second walkthrough video placeholder
5. Pillar 1 Unified Data, with sources (EHR/EMR, Labs, Wearables, Apple Health, Google Health, Intake Forms) flowing into The Twin
6. Pillar 2 Contextual Memory, with a mock AI copilot chat ("Hi Sarah...")
7. Closing: "Bring us your messiest patient" + Book a Demo (links to tuluhealth.com/contact) + SOC-2 / HIPAA / live in weeks / no lock-in
8. Footer

## Technical details
- Rewrite src/routes/index.tsx; sections in src/components/twin/
- Color tokens in src/styles.css (oklch), Satoshi loaded via Fontshare link in root head
- Page head() metadata; video and chat are static mockups, no backend
