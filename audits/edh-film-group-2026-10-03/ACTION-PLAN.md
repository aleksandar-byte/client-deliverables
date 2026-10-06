# EDH Film Group — implementation plan for Nick

October 3, 2026 · Draft handoff, not Monday tickets · No site changes made.

Deliverables: [minimal HTML audit](presentation/EDH-FILM-GROUP-SEO-AUDIT-PRESENTATION.html) and [wider audit](FULL-AUDIT-REPORT.md). Keep both: HTML helps present the issues; Markdown explains evidence, decisions, business context and limitations.

| Order | Work | Exact scope | Verification / dependency |
|---|---|---|---|
| 1 | Correct security routes | Commercial S800/S1400/S2400 → Security Window Film; Riot Glass → Security Glass | Test four links, desktop/mobile; no redirects between valid products |
| 1 | Remove unfinished About content | Our Team intro and six Lorem ipsum profiles | Client supplies real people/photos/bios, or temporarily remove section |
| 1 | Finish Low-E guide | Remove final editing note and complete cut-off warranty sentence | Confirm warranty wording; preserve URL and educational intent |
| 1 | Correct Tulsa directory | Tulsa card currently has OKC address and map | Nick/client confirms Tulsa address or service-area status first |
| 2 | Improve initial hero loading | First slide early discovery/priority; defer four inactive slides | New mobile/desktop tests; inspect first-image start time, slider/contact functions |
| 2 | Delay below-fold media | Vimeo player and 941 KB Group-80.jpg background | Preserve quality/video access; verify startup transfer reduction |
| 2 | Repair phone-event reporting | Actual phone_number_link_click vs configured phone_click | Inspect mapping; authorize test; avoid duplicate key events and preserve call tracking |
| 2 | Fix residential audience copy | Repeated commercial energy paragraph and commercial solar wording | Rewrite for homeowners; verify both responsive versions |
| 2 | Grouped schema correction | Fourteen LocalBusiness blocks: Chicago 60601 → verified Summit office entity; business Article author should use Organization | Use SCHEMA-REPORT affected URLs; locate emitters; preserve accurate graph; no Product-removal task |
| 3 | Decide St. Louis hub indexation | Old city URL redirects to /locations/missouri/window-tinting-st-louis/, which is noindex/nofollow with no canonical | Confirm intent owner; if retained for search, index/self-canonical and update sitemap/inlinks; otherwise exclude old sitemap URL |
| 3 | Review technical queue | Other current sitemap redirects and metadata; old Google noindex snapshots | Commercial/Contact now index/follow; verify Google's next crawl; use exact URL map before changes |
| 2 | Correct wrong-city metadata | Round Rock page title/description currently name Broken Arrow, OK | Change to actual Round Rock market; verify rendered metadata and preserved URL |

## Decisions Nick needs to resolve

- Who supplies verified team content and the correct Tulsa operating details?
- Is Summit a visiting office, and how should Chicago appear in navigation/directory?
- Does the below-fold video need autoplay, or can a poster/click-to-play serve its purpose?
- Who owns GTM/GA4 and call/CRM reconciliation? Recorded clicks must not be sold as qualified leads.
- Do not change Commercial/Contact robots based on old Google snapshots; current settings allow indexing.

## Wider context to communicate

GSC clicks 157→126; organic GA4 sessions 347→260, while organic engagement improves. The Low-E guide loses 29 clicks against a net site loss of 31, but causes are unproven. Fix unfinished content and routing while preserving successful educational pages. Current Summit hours match Contact; central/regional numbers may be intentional. Historical Ahrefs Health 91 is not today's full-crawl result. No blanket Product/business schema deletion or backlink task is supported here.

Before publishing changes: verify the emitter/template, back up the touched source, implement exact scoped edits, retest responsive pages and lead paths, then compare genuinely new lab timestamps. Keep unresolved crawl/indexation items marked pending. Do not create tickets until Alex reviews scope and owners.
