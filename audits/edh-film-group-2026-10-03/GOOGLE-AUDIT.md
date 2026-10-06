# EDH Film Group — Google performance and measurement

Collected October 3, 2026 Europe/Skopje (October 2 UTC). Exact GSC property `https://edhfilmgroup.com/` and GA4 property `460123593` verified live; stream `G-N9DHCZQSV1` defaults to the EDH domain. Current hostname report only shows `edhfilmgroup.com`. GA4 reports below filter EDH hostnames and Organic Search; they do not mix the other film clients.

Current period August 31–September 29, 2026 versus August 1–30: adjacent 30-day periods, not weekday-matched. September 29 was the latest returned final GSC date. GA4 uses the same dates for comparability, with property timezone America/Chicago.

## Business context for Nick

EDH has working organic visibility but a relatively small organic audience beside paid search. The largest observed page-level decline is one educational guide; it does not establish a sitewide technical or algorithm cause. Conversion reporting also misses the observed phone-click event under the configured key-event name, so the audit should improve measurement before treating event totals as sales results.

| Metric | Current | Previous | Change |
|---|---:|---:|---:|
| GSC clicks | 126 | 157 | -19.7% |
| GSC impressions | 37,348 | 58,632 | -36.3% |
| GSC CTR | 0.337% | 0.268% | +0.070 percentage points |
| GSC average position | 20.05 | 24.20 | Improved 4.15 positions |
| GA4 organic sessions | 260 | 347 | -25.1% |
| GA4 organic users | 171 | 211 | -19.0% |
| GA4 organic page views | 648 | 653 | -0.8% |
| GA4 organic engagement rate | 64.62% | 49.86% | +14.76 percentage points |
| GA4 organic key events | 0 | 8 | Eight prior form_submit events; not qualified leads |

GSC search clicks and GA4 sessions measure different things and cannot be reconciled one-to-one. GSC US clicks are 117/126 (92.9%), but this is not evidence all visitors fall inside served markets. GA4 current all-host check has 6,714 EDH sessions; Paid Search reports 5,760, compared with 260 Organic Search. Review SEO performance separately from the paid-led site total.

## Specific measurement issue

GA4 Admin marks `phone_click` as a key event, while the report records `phone_number_link_click`: **104 events across channels and five from Organic Search**, all with zero key events. The observed event name and configured conversion name do not match. `form_submit` is configured and records **56 current all-channel events/key events**, so form measurement is not universally absent; zero organic form events is a channel-specific observation.

Proposed action: inspect the existing GTM/GA4 phone-event mapping, choose the one intended phone-click event and align it with the key-event configuration, then verify an authorized test and ensure there is no duplicate count. Retain call-tracking numbers. A click is not a connected call, unique enquiry or qualified lead; compare with the CRM/call records before judging leads. No configuration or live form submission was performed. This is a measured reporting gap, not a claim that changing the key-event name creates more leads.

## Pages and intent

| Page | Current GSC clicks | Context |
|---|---:|---|
| [Homepage](https://edhfilmgroup.com/) | 45 | 3,758 impressions; branded discovery and onward routing |
| [Double-pane Low-E guide](https://edhfilmgroup.com/blog/window-film-for-double-pane-low-e-windows/) | 35 | Down from 64 (-29); 4,585 impressions; avg position 8.80 |
| [Locations](https://edhfilmgroup.com/locations/) | 7 | 243 impressions; useful regional gateway |
| [One-way film guide](https://edhfilmgroup.com/blog/how-one-way-window-film-work/) | 5 | 1,829 impressions; educational/product research intent |
| [Decorative privacy guide](https://edhfilmgroup.com/blog/which-decorative-window-film-adds-the-most-privacy/) | 3 | 1,585 impressions; avg position 21.18 |
| [Oklahoma City](https://edhfilmgroup.com/window-tinting-oklahoma-city-oklahoma/) | 3 | Current location URL; check older paths in redirect cleanup |

Homepage and Low-E guide together account for 80/126 clicks (63.5%). The Low-E guide decline (-29) is close to the site's net -31, but other pages offset one another; it is not proof the guide caused the whole decline. Keep its helpful educational purpose, review query changes and visible body content, and add a natural route to relevant installation help. Do not remove it simply because it is informational.

The exact branded query `edh film group` contributes 33 reported clicks at average position 1.14. Small nonbrand samples include DIY/automotive intent, so broad tinting impressions should not be sold as qualified architectural-film demand. Query rows are capped at 300; anonymized or omitted queries mean their sum need not equal property totals. Page rows capped at 200.

GA4 organic landing rows: homepage 68 sessions, Low-E guide 54, `(not set)` 24, one-way guide 17, contact eight, locations eight. The `(not set)` row is a measurement limitation worth checking during tracking QA, not a page to optimize.

## Google indexation and sitemaps

Homepage, Locations and the Low-E guide returned PASS / Submitted and indexed, successful fetches and matching user/Google canonicals. Last Google crawl dates: September 24, 29 and 27 respectively. These are samples, not complete coverage.

The Contact inspection returned an old noindex observation last crawled November 24, 2025. The actual [Commercial hub](https://edhfilmgroup.com/commercial-market/) also returned Excluded by noindex, last crawled June 20, 2026. Verify the live robots settings before calling these current defects; if the commercial hub remains noindex, review its intended search role and remove the block only after that decision. These older Google observations are not fresh robots measurements. A preliminary `/commercial/` inspection was an incorrect guessed path and is excluded from findings.

GSC's submitted `https://edhfilmgroup.com/sitemap_index.xml` was downloaded October 2, 2026, with zero errors and warnings and 255 submitted web URLs. The API's legacy `indexed:0` field is not interpreted as zero indexed pages.

## Historical crawl and backlinks

Ahrefs project `8752130` last completed September 29, 2026, Health Score 91; 1,486 total URLs, 136 with errors. A bounded 400-row page export and complete issue summary are saved. Reported errors: 126 oversized images, four canonicals pointing to redirects, six redirects in sitemap. Main technical findings must use freshly verified examples rather than presenting every historical count as current.

Ahrefs October 2 snapshot: DR 12, 1,825 live backlinks, 1,161 live referring domains (all-time 2,912 / 1,490). These counts do not prove link quality, penalty or toxicity. No backlink work is proposed in the minimal HTML presentation.

## Evidence and limitations

`evidence/google-summary.json`, `google-gsc-*`, `google-ga4-*`, `ahrefs-existing-audit.json`, `ahrefs-backlinks-*.json`. No private CRM qualified-lead reconciliation, GBP Insights, map grid or Search Console exhaustive URL coverage was performed. GSC/GA4 are read-only; no website, tag, GBP or Search Console settings were changed.
