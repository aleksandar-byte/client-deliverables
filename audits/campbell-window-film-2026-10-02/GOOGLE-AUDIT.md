# Campbell Window Film — Google performance and indexation

Read-only audit collected October 2, 2026. Source property: `https://campbellwindowfilm.com/`, verified accessible with OAuth. Latest returned final daily data was September 29; comparison is August 31–September 29 versus August 1–30 (adjacent 30-day periods, not weekday-matched). PSI is covered separately by the technical audit.

## What Nick should know

Search traffic is established and is concentrated on a few educational/product-intent pages. The immediate opportunity is to protect that traffic and connect it to relevant installation services and geographic qualification. Traffic alone cannot establish lead quality: a verified Campbell GA4 property and in-house lead results were unavailable.

| Metric | Current 30 days | Previous 30 days | Change |
|---|---:|---:|---:|
| Google web clicks | 860 | 914 | -5.9% |
| Impressions | 301,832 | 340,475 | -11.4% |
| CTR | 0.285% | 0.268% | +0.017 percentage points |
| Average position | 14.72 | 16.54 | Improved 1.82 positions |

The mixed movement does not establish a technical penalty or an algorithm cause. Position is impression-weighted across changing query mix. The period contains 30 reported days. Queries are limited to 300 returned rows and pages to 200; totals are separate property-level requests, not summed sampled query rows.

## Pages to preserve and improve

| Page | Clicks | Impressions | Average position | Context |
|---|---:|---:|---:|---|
| [One-way privacy film](https://campbellwindowfilm.com/services/one-way-window-film-privacy/) | 202 | 77,619 | 11.09 | Previously 217 clicks; high-volume product/research intent |
| [Tinted house windows pros and cons](https://campbellwindowfilm.com/the-pros-and-cons-of-tinted-house-windows/) | 199 | 79,519 | 10.96 | Educational intent; preserve helpful comparison content |
| [Safety versus tempered glass](https://campbellwindowfilm.com/safety-glass-vs-tempered-glass/) | 54 | 15,445 | 20.33 | Informational audience; relevant service connection needed |
| [Homepage](https://campbellwindowfilm.com/) | 45 | 1,484 | 22.78 | Previously 66 clicks; largest matched-page decline (-21) |
| [Noise-blocking window film](https://campbellwindowfilm.com/does-noise-blocking-window-film-exist-try-this-solution-for-mitigating-noise-pollution/) | 31 | 2,809 | 11.56 | Research intent; do not confuse with ready-to-buy local demand |
| [Privacy film](https://campbellwindowfilm.com/privacy-window-film/) | 30 | 4,435 | 16.42 | Compare intent with one-way page before consolidation |
| [Bulletproof film for glass](https://campbellwindowfilm.com/bulletproof-film-for-glass/) | 28 | 6,472 | 10.67 | Previously 35 clicks; review relevant onward journey |
| [Los Angeles location](https://campbellwindowfilm.com/locations-served/los-angeles/) | 8 | 3,862 | 20.40 | Previously 14 clicks; service/location opportunity |

The top two pages account for 401/860 clicks (46.6%). A separate homepage URL containing GBP UTM parameters records 25 clicks/14,415 impressions; keep this row distinct rather than mislabeling it as verified GBP calls or leads. The US contributes 657 clicks (76.4%); Canada 66 and Australia 35. US clicks are not necessarily Southern California prospects. GSC does not provide city-level lead qualification here.

Recommended content direction: preserve useful educational answers, provide one relevant installation-service link and clear coverage/quote path where the body supports it, and evaluate conversion quality before expanding similar articles. Do not turn every article into a service landing page or redirect a working traffic-bearing page solely because another page has similar wording.

## Indexation and sitemap evidence

Three URL Inspection samples all returned PASS / Submitted and indexed, successful fetch and matching Google/user canonical:

- [Homepage](https://campbellwindowfilm.com/): last crawl September 27, 2026.
- [One-way privacy film](https://campbellwindowfilm.com/services/one-way-window-film-privacy/): September 28.
- [Tinted house windows guide](https://campbellwindowfilm.com/the-pros-and-cons-of-tinted-house-windows/): September 25.

These samples do not establish whole-site coverage, but they do mean the audit browser's SiteGround challenge is not proof that Google cannot crawl the site.

GSC lists nine submitted sitemap records. Seven contain errors: `/sitemaps.xml`, `/services-services-sitemap1.xml`, `/services-categories-sitemap1.xml`, `/local-lander-sitemap1.xml`, `/campbell-services-sitemap1.xml`, `/tint-sitemap1.xml`, and `/portfolio-sitemap1.xml`. Most were last downloaded May/June 2026, so the errors are historical observations requiring verification. `/page-sitemap1.xml` was downloaded September 30 with no errors; `/post-sitemap1.xml` was downloaded September 23 with 218 warnings and no errors. The homepage inspection references `/sitemap_index.xml`, absent from the submitted list.

Next step: identify and verify the active sitemap, inspect the actual GSC error/warning descriptions, and remove or replace obsolete submissions only after the destination is confirmed. No Search Console settings were changed. The API's legacy `indexed: 0` values must not be interpreted as zero indexed pages.

## Analytics and lead gap

Fresh GA4 discovery checked 222 accessible properties; no Campbell-named property was found. Client Records also has no GA4 property configured. A related EDH Film Group candidate (`460123593`) was explicitly ruled out: its stream uses `edhfilmgroup.com`, and its latest hostname report only contains that hostname. It must not be used for Campbell metrics. This is an access/mapping gap, not proof the website lacks analytics. Ask Nick/client for the Campbell property or stream and the in-house lead report so actual qualified enquiries can be compared with SEO traffic.

## Historical Ahrefs crawl and links context

The accessible Campbell Site Audit project `10058586` completed August 3, 2026: Health Score 95, 1,696 total URLs, 87 with errors. A bounded export saved 500 page rows and the issue summary. Historical counts include eight 404 pages, five pages linking to broken pages, seven with multiple title tags, two with multiple meta descriptions, and 63 oversized images. These are investigation leads, not freshly confirmed current defects. No new crawl was started.

Ahrefs October 1 domain snapshot: DR 27, 2,326 live backlinks and 1,506 live referring domains; all-time totals 28,469 links/4,725 domains. These vendor estimates do not establish relevance, quality, toxicity or a penalty. No disavow or link-building task is justified from these totals, and backlinks are excluded from the minimal presentation per Alex's established preference.

## Evidence

`evidence/google-summary.json`, `google-periods.json`, `google-gsc-current-*`, `google-gsc-previous-*`, `google-gsc-inspect-*`, `google-gsc-sitemaps.json`, `google-ga4-discovery.json`, `google-ga4-edh-streams.json`, `google-ga4-edh-hostnames.json`, `ahrefs-existing-audit.json`, `ahrefs-backlinks-rating.json`, `ahrefs-backlinks-stats.json`. Data collected October 2; historical crawl and Ahrefs snapshot dates are stated above. No rank, traffic or lead improvement is guaranteed.
