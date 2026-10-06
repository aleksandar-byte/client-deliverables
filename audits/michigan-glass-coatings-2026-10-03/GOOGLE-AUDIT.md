# Michigan Glass Coatings — Google performance and measurement

Read-only audit: 3 October 2026. Domain: https://michgc.com/. GSC property: `https://michgc.com/`. GA4 property: `499105946`, verified against the property's web stream. No settings, tags, sitemaps or pages changed.

## Executive context for Nick

Search visibility is improving in the comparable period, not declining. However, most reported clicks still land on the homepage, and the audit cannot turn GA4 activity into a reliable count of enquiries or qualified leads. Prioritize fixing the verified website issues and establishing the form-completion measurement path before judging SEO by the zero key-event total.

## Comparable performance

Current: **31 August–29 September 2026**. Previous: **1–30 August 2026**. These are adjacent 30-day periods; 29 September was the latest returned final GSC date when queried through 2 October. GA4 uses the same dates, Organic Search channel, and exact hostname filter `(?:www\.)?michgc\.com`.

| Metric | Current | Previous | Change |
|---|---:|---:|---:|
| GSC clicks | 108 | 100 | +8.0% |
| GSC impressions | 7,630 | 7,011 | +8.8% |
| GSC CTR | 1.42% | 1.43% | Essentially flat |
| GSC average position | 15.79 | 22.56 | Improved 6.77 positions |
| GA4 organic sessions | 184 | 149 | +23.5% |
| GA4 organic users | 119 | 112 | +6.3% |
| GA4 organic page views | 415 | 425 | −2.4% |
| GA4 organic engagement rate | 55.98% | 69.80% | −13.82 percentage points |
| GA4 organic key events | 0 | 0 | Not a qualified-lead count |

GSC clicks and GA4 sessions measure different things and should not be reconciled one-for-one. Neither the movement in position nor the engagement change proves the cause of a traffic change. GA4 is configured to America/Los_Angeles, not the Michigan office's time zone; retain that reporting context when comparing figures.

Sources: [periods](evidence/google-periods.json), [GSC current](evidence/google-gsc-current-totals.json), [GSC previous](evidence/google-gsc-previous-totals.json), [GA4 current](evidence/google-ga4-current-organic-totals.json), [GA4 previous](evidence/google-ga4-previous-organic-totals.json).

## What receives search traffic

| Page | Current clicks | Previous clicks | Current impressions |
|---|---:|---:|---:|
| [Homepage](https://michgc.com/) | 92 | 76 | 3,166 |
| [Grand Rapids](https://michgc.com/locations/grand-rapids/) | 10 | 12 | 1,665 |
| [3M window films](https://michgc.com/3m-window-films/) | 2 | 0 | 135 |
| [Image gallery](https://michgc.com/image-gallery/) | 2 | 0 | 123 |
| [Residential](https://michgc.com/residential/) | 1 | 0 | 268 |
| [Commercial](https://michgc.com/commercial/) | 0 | 0 | 68 |

The homepage's 92 clicks equal approximately 85% of the property total; Grand Rapids contributes another 10. Page aggregation can differ slightly from property totals. The exact brand query `michigan glass coatings` supplies 38 reported clicks, with another two for the singular spelling. Query anonymization prevents a complete brand/nonbrand split.

The current country report returns 101 US clicks out of 108; this is not proof that those visitors are in the service area. Commercial/residential service-page visibility is much thinner than the brand homepage. Improve the existing service pathways and location proof before creating a large number of near-duplicate city pages.

Sources: [page comparison](evidence/google-summary.json), [current queries](evidence/google-gsc-current-queries.json), [countries](evidence/google-gsc-current-countries.json).

## Measurement investigation: completion is not demonstrated

The current exact-hostname, all-channel event report contains `form_start` 17 times and `click` nine times. Organic Search contains two `form_start` events and one `click`. No `form_submit`, phone-specific event, `qualify_lead` or `close_convert_lead` row was returned. The seven returned event names fit within the requested 50-row limit, so this is not a truncation inference.

Configured key events are `purchase`, `qualify_lead` and `close_convert_lead`. A zero key-event total therefore does **not** establish zero enquiries. The [Contact page](https://michgc.com/contact-us/) embeds a form from `michiganglass.tintprogroup.com`, a different origin. The parent page's form-start activity cannot establish that a successful iframe submission is recorded.

Recommended investigation, before implementation:

- Identify TintPro's supported successful-submission callback, confirmation page or integration, and check whether it sends an event to this exact GA4 property.
- Separate successful enquiry submission from CRM qualification; confirm how `qualify_lead` and `close_convert_lead` are populated and reconcile against real records.
- Test phone-click and form-success measurement only in an authorized validation workflow. Do not count a generic `click` or `form_start` as a lead.

No enquiry was submitted during this audit. CRM and qualified-lead totals were not supplied.

The unfiltered hostname report also returns `www.michiganglasscoatings.com` (32 sessions) and `michiganglasscoatings.com` (19), alongside `michgc.com` (1,305). These appear to be legacy aliases, not confirmed other-client contamination. They were excluded from the exact-hostname comparison. Review alias redirects and tag ownership separately if needed.

Sources: [all events](evidence/google-ga4-current-all-events.json), [organic events](evidence/google-ga4-current-organic-events.json), [key-event configuration](evidence/google-ga4-keyevents-configuration.json), [hostnames](evidence/google-ga4-current-hostnames.json), [stream identity](evidence/google-ga4-streams.json).

## Indexing and sitemap evidence

URL Inspection returned **PASS / Submitted and indexed** for all five sampled URLs, with successful fetches and matching Google/user canonicals:

- Homepage: last crawl 2 October 2026.
- Grand Rapids: 2 October 2026.
- Residential: 29 September 2026.
- Commercial: 3 October 2026.
- Contact: 15 September 2026.

This is a five-page sample, not a sitewide indexing verdict. Historical referring URLs in inspection results are discovery history, not proof of current broken links.

GSC's sitemap API lists only `https://michgc.com/sitemap.xml`, last downloaded 28 September 2026, with zero errors/warnings and **one submitted web URL**. It is reported as a regular sitemap, not a sitemap index. Compare this with the currently generated XML inventory before recommending a replacement or new submission. The legacy `indexed: 0` sitemap field is not evidence that none of the site is indexed; the inspections above directly contradict that interpretation. No sitemap submission was made.

Sources: `evidence/google-gsc-inspect-*.json`, [GSC sitemap response](evidence/google-gsc-sitemaps.json).

## Historical Ahrefs context — not a current crawl

The existing Ahrefs project is `9788031` (Michgc); its available crawl is dated **3 August 2026, 21:13 UTC**. It reports health score 46, 1,685 URLs and 902 error-affected URLs. Examples include 66 404 pages, 34 broken images, 33 broken redirects and 268 orphan pages. Overlapping issue counts must not be added together. The export is bounded to 400 page rows.

These are investigation leads only. Use the fresh technical crawl and current URL verification to decide what remains broken. Do not present the August health score as today's score or open 902 tasks. No new Ahrefs crawl was started.

The 2 October backlink snapshot reports DR 6, 16,892 live backlinks and 922 live referring domains. Counts alone do not establish relevance, quality, risk or a need for disavow. This is wider audit context, not a client-facing presentation action.

Sources: [existing audit](evidence/ahrefs-existing-audit.json), [DR](evidence/ahrefs-backlinks-rating.json), [backlinks](evidence/ahrefs-backlinks-stats.json).

## Limits and handoff

No owner-side GBP Insights, CRM lead qualification, full conversion-path test, GA4 configuration edit or manual-action/security report was available in this read-only scope. No composite Google score is assigned. Use the fresh technical/content findings with these performance figures; do not attribute their causes without a controlled comparison.
