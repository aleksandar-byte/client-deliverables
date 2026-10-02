# Campbell Window Film — implementation plan for Nick
October 2, 2026 · Proposed work, not implemented or ticketed.

## The handoff includes both levels of detail

- [HTML audit presentation](./presentation/CAMPBELL-WINDOW-FILM-SEO-AUDIT-PRESENTATION.html): six concise findings with screenshots/evidence.
- [Full Markdown audit](./FULL-AUDIT-REPORT.md): traffic context, strengths, exact findings, local issues, limitations and decisions.
- [Shared handoff folder](https://drive.google.com/drive/folders/1DZNVTxzzUyDGAF8tzQHrmNmf69vxp8Qo): downloadable copies; HTML opens in a browser after download.
- This plan connects the visual summary to implementation. Do not forward only the presentation and lose the wider context.

## Why this order

860 Google clicks in the last available 30 days, with 46.6% coming from two useful privacy/home-tint pages. Fix verified customer journeys and mobile delivery, then improve those existing traffic assets. Lead quality remains unknown until Campbell's own analytics and enquiry records are mapped.

| Order | Work | Suggested team | Priority | Completion check |
|---|---|---|---|---|
| 1 | Correct commercial introduction and Call Now href | Website + content | High | Campbell brand, clean paragraph, correct mobile phone target |
| 2 | Correct both homepage Security Film card links | Website | Medium | Heading and Learn More open the film hub; glass card unchanged |
| 3 | Stabilize/reduce video and chat on mobile | Website | High | New comparable lab runs; lower shifts/transfer; contact/tracking intact |
| 4 | Optimize two comparison PNGs | Website | Medium | Responsive/lazy files, preserved quality, working slider |
| 5 | Rewrite repeated privacy definition and add useful body links | Content/SEO | Medium | Unique definition; relevant links; same indexed URL |
| 6 | Consolidate business-schema field corrections | Website/SEO | Medium | Valid output, correct entity/hours, no blank Service offer |
| 7 | Resolve measurement, local-office and sitemap questions | Nick + SEO | Before expansion | Confirmed sources and explicit next actions |

These are suggested roles, not assignments to named people or Monday tickets. No deadlines were imposed.

## Implementation details

**Commercial page:** https://campbellwindowfilm.com/services/commercial-building-window-tinting/ — Elementor page23019. Rewrite paragraph `.elementor-element-355384a4` to remove Dalo and repair the merged sentence. Change `.elementor-element-121ff2b a` from `tel:(800)20580-9997` to `tel:+18005809997`, subject to preserving legitimate tracking.

**Product card:** homepage `.elementor-element-ffb863f a` and `.elementor-element-64ceed9 a`: replace `/products/security-glass/` with `/products/security-window-film/`. Do not redirect the valid Security Glass URL.

**Mobile:** Vimeo background1192344235 transfers10.64MB and contributes0.429CLS; reserve geometry and consider static/deferred mobile video. Stabilize HubSpot launcher/greeting (~0.154CLS). LCP is the welcome H1, so retest first-screen render delay rather than promising video savings equal LCP savings. Preserve forms, attribution and dependent scripts.

**Comparison:** optimize `/wp-content/uploads/2026/06/new-before.png` and `/wp-content/uploads/2026/06/new-after-1.png` (1.416MB/1.415MB) within `#ba-slider`; use responsive modern formats, dimensions and lazy loading. Preserve appearance and slider behavior.

**Privacy:** https://campbellwindowfilm.com/services/one-way-window-film-privacy/ — replace the repeated definition block `.elementor-element-b82b34a`. Link naturally to `/services/daytime-privacy-film/`, `/services/frosted-window-film/` and `/contact-us/`. Keep educational intent and existing URL.

**Schema:** locate the emitting source, then fix `openingHours:[""]`, blank Service name/url and relative `@id:"LocalBusiness"`; remove irrelevant empty fields. Use HB Mon–Fri08:00–17:00, weekends closed. Keep accurate ProfessionalService identity and valid `priceRange:"$$"`. Review LA separately.

## Decisions and access Nick should provide

- Confirm Campbell's GA4 property/stream and qualified-lead source; EDH analytics is not Campbell's.
- Confirm whether the LA Century Park office accepts visitors, then approve separate local contact details if appropriate.
- Confirm the old BBB address and any legitimate legacy locations before citation edits.
- Confirm whether residential Dalo-hosted images are intentional shared assets; do not assume an ownership problem.
- SEO should inspect GSC's old sitemap errors and verify the active sitemap before submission changes.
- Select relevant existing CBRE/Union Bank project proof; confirm attribution rather than requesting new case studies unnecessarily.

## Lower-priority follow-up

Review the four missing descriptions and the duplicated burglar-proof/dichroic descriptions listed in the full report, then tidy secondary H1 headings. Name the homepage logo links accessibly and give Skip to content a working main-content target. The 59 non-sitemap internal URL candidates remain unverified because the follow-up browser session was challenged; check them through normal authorized access before creating a broken-link/redirect task. Do not mistake a successful sitemap crawl for complete historical URL coverage.

## Verification and rollout

Work on a review/staging version where available. Check desktop/mobile links, phone destinations, forms, tracking, image quality and slider behavior. Run genuinely new mobile tests with distinct timestamps; compare exact shifted nodes and requests. Validate representative schema source after template changes. Track clicks, locally relevant enquiries and qualified leads separately. Preserve existing informative pages unless a separate evidence-backed content decision is approved.

No website/GBP changes or tickets were made by this audit. Nick's Slack delivery remains a separate tracked action.
