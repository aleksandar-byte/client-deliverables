# MGT Films — Google performance and measurement

Read-only audit, 3 October 2026. GSC property `https://mgtfilms.com/`; GA4 property `497326494`, stream `11505734598`, measurement ID `G-X88EBNEG47`, default URI `https://mgtfilms.com`. Identity freshly verified. No account, tag, site or sitemap changes.

## Context for Nick

Search clicks and organic sessions declined in this comparison, while the homepage's clicks increased slightly. Several informational articles and regional pages account for visible losses. This is not evidence that a specific design or technical issue caused the decline. The first measurement priority is to establish successful enquiries: a configured phone-click key event did not appear in the current event report, and form starts are not completed or qualified leads.

## Latest comparable periods

Current **31 August–29 September 2026**, previous **1–30 August 2026**. These are adjacent 30-day windows. GSC was queried through 2 October, but 29 September was the latest returned final date. GA4 uses those same dates, Organic Search, exact hostname regex `(?:www\.)?mgtfilms\.com`.

| Metric | Current | Previous | Change |
|---|---:|---:|---:|
| GSC clicks | 393 | 488 | −19.5% |
| GSC impressions | 96,105 | 151,828 | −36.7% |
| CTR | 0.409% | 0.321% | +0.088 percentage points |
| Average position | 14.54 | 16.50 | Improved 1.96 positions |
| GA4 organic sessions | 618 | 769 | −19.6% |
| GA4 organic users | 491 | 595 | −17.5% |
| GA4 organic page views | 1,018 | 1,191 | −14.5% |
| Organic engagement rate | 62.62% | 59.82% | +2.80 percentage points |
| Organic key events | 0 | 0 | Not actual lead totals |

Average position can improve while impressions fall because the mix of queries changes. No seasonality, update or redesign cause is established here. GSC clicks and GA4 sessions are different measures, not totals expected to match.

Sources: [periods](evidence/google-periods.json), [compiled Google data](evidence/google-summary.json), `evidence/google-gsc-*-totals.json`, `evidence/google-ga4-*-organic-totals.json`.

## Page-level context

| Page | Current clicks | Previous clicks |
|---|---:|---:|
| [Homepage](https://mgtfilms.com/) | 63 | 60 |
| [How window film adheres](https://mgtfilms.com/blog/window-film-adhere/) | 47 | 49 |
| [3M Prestige comparison](https://mgtfilms.com/blog/3m-prestige-vs-other-window-films-pros-cons/) | 44 | 61 |
| [Low-E film on existing windows](https://mgtfilms.com/blog/can-low-e-film-be-applied-to-existing-windows/) | 21 | 32 |
| [Jackson regional page](https://mgtfilms.com/jackson-mississippi-window-film/) | 16 | 27 |
| [Reflective versus non-reflective film](https://mgtfilms.com/blog/reflective-vs-non-reflective-solar-film-which-is-best/) | 14 | 23 |
| [Baton Rouge](https://mgtfilms.com/locations/baton-rouge/) | 10 | 15 |
| [New Orleans](https://mgtfilms.com/locations/new-orleans/) | 6 | 11 |

Preserve the useful informational purpose of these articles. Review query/page changes, current facts, internal service links and regional enquiry paths before deciding on refreshes; do not redirect educational content simply because it is not transactional. The US accounts for **315 of 393 clicks (80.2%)**. The remaining traffic includes UK, Australia and Canada, so sitewide organic traffic cannot be treated as local sales opportunities. No full brand/nonbrand share is asserted because GSC query rows omit anonymized data.

## Measurement finding

The current exact-hostname all-channel report returns 12 event names, within the 50-row limit: **37 form_start**, two generic clicks, page/session/engagement events and video/download/search events. It returns no `form_submit` or `phone_number_link_click`. Organic Search has **10 form_start** events, not 10 verified enquiries.

GA4's configured key events are `purchase` and **`phone_number_link_click`**. Its absence warrants a tracking check, but alone does not prove a broken trigger or no calls. The property hostname report returns only `mgtfilms.com` in this period; no other-client hostname was observed.

Recommended investigation:

- Check the live `tel:` links against the exact configured event name, tag triggers and consent behavior; use an authorized debug/test process before changing configuration.
- Identify the real form-success confirmation/callback and distinguish it from form starts. Review all active contact/quote destinations, not only the main form.
- Reconcile submission and call records with the client's in-house lead system. No CRM-qualified counts were available, and no live form was submitted during this audit.

Sources: [event configuration](evidence/google-ga4-keyevents-configuration.json), [all-channel events](evidence/google-ga4-current-all-events.json), [organic events](evidence/google-ga4-current-organic-events.json), [hostnames](evidence/google-ga4-current-hostnames.json).

## Indexing sample and historical contact state

Homepage, Chicago, Residential and Commercial each returned **PASS / Submitted and indexed**, successful fetches and matching user/Google canonicals. Last crawl dates: 3 October, 27 September, 30 September and 25 September respectively.

The [Contact URL](https://mgtfilms.com/contact-mgt-films/) returned **Excluded by noindex**, with Google's canonical `https://mgtfilms.com/contact-mgt-films-1/`, but its inspection snapshot was crawled **1 September 2026**. This is historical evidence, not proof of current noindex. The separate web fetch timed out; current redirect, robots and canonical values must come from the fresh technical crawl before an implementation recommendation. A timeout in this audit tool is not proof of a broken public form.

Sources: `evidence/google-gsc-inspect-*.json`. Four passing samples are not a whole-site indexing verdict.

## Sitemaps and existing Ahrefs crawl

GSC lists three submitted XML files: `our_service-sitemap.xml` (12 web URLs, one warning, downloaded 1 October), `page-sitemap.xml` (96 web URLs, no warnings, downloaded 29 September) and `post-sitemap.xml` (190 web URLs, no warnings, downloaded 2 October). All report zero errors. The API does not explain the service warning; compare current XML and GSC details before changing it. Legacy `indexed: 0` sitemap fields must not be interpreted as zero indexed pages.

Ahrefs project **8752040**, “EDH - Mgtfilms,” is verified by exact target `mgtfilms.com/`. Its existing crawl is dated **29 September 2026, 17:16 UTC**: health score91, 1,818 URLs, 161 error-affected URLs. Examples: 111 oversized images, six404s, 11 multiple-title pages, 18 orphan pages and 11 redirects in sitemaps. These are historical leads, not current verified totals; overlapping issues must not be added. The page export is bounded to400 rows. No new crawl was started.

The 2 October backlink snapshot reports DR18, 4,020 live backlinks and1,844 live referring domains. This does not establish link quality, a penalty or a need to disavow. Retain as wider context, not an HTML task.

Sources: [GSC sitemaps](evidence/google-gsc-sitemaps.json), [Ahrefs audit](evidence/ahrefs-existing-audit.json), [DR](evidence/ahrefs-backlinks-rating.json), [links](evidence/ahrefs-backlinks-stats.json).

## Limits

No live submission, call, account mutation, CRM qualification, owner-side GBP Insights or manual-action/security report was performed. No composite Google score is assigned. Actual Ahrefs usage across this specialist audit: **473 units** (100 backlink summary,273 exact keywords,100 existing audit issues/pages), under the1,500-unit cap.
