<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Keep shared site navigation and footer in the root layout so all product destinations remain one website.
- Preserve imported original pages as same-origin documents with their original scripts and assets; wrap them in a height-synchronised frame to avoid rewriting existing product and demo functionality.
- Keep newly authored homepage content in native React routes, using shared semantic CSS tokens and the Button component; render the user-supplied AI Front Desk HTML through the preserved-document wrapper so its design and interactive demos remain intact.
- Present Longevity OS as one preserved document with an always-visible 2 / 3 / 2 Clinic Operations editorial matrix and four-service grid; retain feature hash anchors and original-image enlarge links so all information remains accessible without disclosure controls.
- Use shared subgrid tracks for neighbouring Longevity feature text, full-image frames, captions and service previews; reset to natural stacked flow at narrower widths to preserve complete images and avoid mobile height reservations.
- Carry contextual review inquiries through the contact route to the existing scheduler; explicit request context avoids implying a marketing action launches patient outreach.
- Isolate homepage motion and illustrative sequences in homepage-only components; viewport-aware playback and static base styles preserve other pages and no-script readability.
- Adapt the live patient-home interface into a labelled native sample for the homepage longevity showcase; legible layouts and finite emphasis sequences avoid shrinking or altering the preserved product pages.
- Keep partner/media data in a shared browser-safe evidence catalogue and render native Partners and News & Media routes; explicit publication guards prevent pending statements or duplicate/unverified coverage from appearing.
