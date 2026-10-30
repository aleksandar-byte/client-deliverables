# MJB Law Group — Google and local audit

Collected October 30, 2026, read-only. Exact live Client Records identity: Michael Berry / MJB Law Group, APC, Active White Legal, https://mjbfirm.com/, Tustin CA. Michael J. Berry is the public attorney name; California State Bar identifies Michael Joseph Berry #303519. This is not Michael Bleeker or a Jacksonville office.

## Access and method

- Existing OAuth bridges verified accessible `sc-domain:mjbfirm.com` and the production GA4 property and stream, default URI `https://mjbfirm.com/`. This is Tier 2-equivalent authenticated access, not an anonymous estimate.
- GSC: Web search, `dataState=final`, October 1–27 versus September 4–30, 27 days each. A separate date query confirms all 27 current dates through October 27. GSC day boundaries are Pacific time. Query/page reads limited to 250; 127 current page rows, 169 prior, both query reads hit the 250 cap. Query filters exclude anonymized data; branded/nonbranded rows must not be treated as shares of all clicks.
- GA4: same dates, `America/Los_Angeles`, exact hostname regex `(www\.)?mjbfirm\.com`. Organic reports additionally use `sessionDefaultChannelGroup = Organic Search`. No country restriction. All metrics are on-site analytics, not qualified business leads.
- Exact place-ID SerpAPI Google Maps lookup; live WhatConverts phone inventory only, verified client profile, no lead/contact/call-content pull. Wider public-directory sample is explicitly bounded below.

## Performance

| Metric | Oct 1–27 | Sep 4–30 | Interpretation |
|---|---:|---:|---|
| GSC clicks | 941 | 899 | +4.7% |
| GSC impressions | 203,792 | 189,815 | +7.4% |
| GSC CTR | 0.462% | 0.474% | Small decline; educational mix means not a conversion verdict. |
| GSC average position | 11.97 | 12.22 | Aggregate, not a single-query rank. |
| GA4 production sessions, all channels | 2,091 | 2,112 | -1.0% |
| GA4 production users, all channels | 1,806 | 1,863 | -3.1% |
| GA4 production organic sessions | 1,248 | 1,204 | +3.7% |
| GA4 production organic key events | 18 | 5 | Not verified leads or revenue. |

The 18 organic key events consist of 14 `GA_phone_click` and 4 `generate_lead`. Six organic `form_submit` events were separately observed but were not key events; do not add them to key events or call all these events separate enquiries. Telephone clicks do not prove connected or qualified calls. Reported landing-page sessions include 106 `(not set)` rows; investigate only if needed for measurement quality, not a sitewide defect by itself.

Unfiltered current hostnames: mjbfirm.com 2,089 sessions, www.mjbfirm.com 2, staging `stg-mjbfirm-stg.kinsta.cloud` 2. The exact-host performance table excludes staging; this tiny staging residue is a wider tracking note, not a priority implementation finding.

## Indexation and sitemap evidence

Google URL Inspection reports PASS / Submitted and indexed for [homepage](https://mjbfirm.com/), [contact](https://mjbfirm.com/contact-us/) and [employment hub](https://mjbfirm.com/employment-law/), with matching user/Google canonical, successful fetch and allowed indexing. These are index records, not fresh live-index tests or proof every URL is indexed.

Current submitted [page sitemap](https://mjbfirm.com/page-sitemap.xml) and [post sitemap](https://mjbfirm.com/post-sitemap.xml) report zero errors/warnings, last downloaded October 25 and October 30 respectively. The API's old `indexed:0` sitemap field is not a zero-indexed-pages verdict; the inspections above demonstrate indexed pages.

Eight 2020 submitted URLs, `http://mjbfirm.com/pageamap.xml` through `http://mjbfirm.com/pagehmap.xml`, still carry one or two warnings apiece. Every one redirects to its HTTPS equivalent and returns 404 today. Recommended SEO cleanup: remove only those eight obsolete submissions after owner review, retain the current XML sitemaps. Do not redirect old sitemap files to unrelated pages or remove content because of these historical records.

The ninth old submission, `http://mjbfirm.com/sitemap.xml`, resolves successfully to [current sitemaps.xml](https://mjbfirm.com/sitemaps.xml); it is not a verified broken-file issue. Leave it outside a broken-sitemap removal list. No Search Console edits were made.

## Exact GBP snapshot

[Google Business Profile](https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJFfK8Ex3f3IARLR_eEVRMZ9g), place ID `ChIJFfK8Ex3f3IARLR_eEVRMZ9g`: MJB Law Group, APC; 1442 Irvine Blvd Ste 201, Tustin CA 92780; phone **(949) 832-6738**; Monday–Friday **8:30 AM–5:30 PM**, Saturday/Sunday closed; **5.0 / 45 reviews**. Coordinates 33.7444978, -117.8049938. Website points to canonical homepage with normal GBP UTM tags. Categories include Employment attorney, Law firm, Attorney, Personal injury attorney. These align with the firm's advertised scope.

Photos and recent posts are present (latest returned post two days before collection). The embedded most-relevant five-review sample is not chronological, so no review-velocity or no-recent-reviews conclusion is supported. Owner-response rate, authenticated profile completeness, insights, claim status and complete media/review inventory were not audited. Birdeye's search-indexed count was 51, versus the current exact-place response's 45; do not mix dates/providers or use the aggregator count to override the direct snapshot.

## NAP consistency — baseline and phone roles

Physical office / hybrid service coverage: one verified Tustin office serving broader California and Orange County areas. City service pages are not additional physical branches. Website contact phone **949-266-0880** is the confirmed destination. Contact fax **949-266-0890** is labelled fax, not a conflicting voice number.

Live WhatConverts numbers all forward to +19492660880: All Traffic +19495417964, +19493345025, +19496766532, +19498815180; older GBP +19498508646; **Google Business Profile - New +19498326738**. Thus the exact current GBP phone is an approved tracking number, not a wrong-number defect. No calls were placed. The older Client Records GBP phone field is a canonical/destination phone, not proof today's public listing should be changed.

| Source | Evidence level | Observed identity / address / phone | Result |
|---|---|---|---|
| [Homepage](https://mjbfirm.com/) and [contact](https://mjbfirm.com/contact-us/) | Live HTTP200 | MJB Law Group APC; 1442 Irvine Boulevard Suite201,Tustin92780;9492660880 | Matches normalized GBP office; valid destination phone. |
| Homepage Organization JSON-LD | Live extracted | MJB Law Group APC;phone+19492660880;no physical address in this Organization object | Phone consistent; absence is schema completeness, not a different address. Crawl specialist owns full template schema coverage. |
| [Exact GBP](https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJFfK8Ex3f3IARLR_eEVRMZ9g) | Live SerpAPI | MJB Law Group APC;1442IrvineBlvdSte201,Tustin92780;9498326738 | Address/name consistent; verified tracking phone. |
| [State Bar #303519](https://apps.calbar.ca.gov/attorney/Licensee/Detail/303519) | Live HTTP200 | Michael Joseph Berry / MJB;1442IrvineBlvdSuite201,Tustin;9492660880, fax9492660890 | Identity and office supported by first-party registry. |
| [Orange County Lawyers](https://www.orangecountylawyers.com/attorneys/mjb-law-group/) | Live HTTP200 | MJB Law Group;1442IrvineBlvdSuite201,Tustin92780;9492660880 | Consistent. Directory footer phone is not the firm's number. |
| [Halt](https://www.halt.org/lawyers/mjb-law-group) | Live HTTP200 | MJB Law Group;1442IrvineBlvdSuite201,Tustin92780;9492660880;Mon–Fri8:30–17:30 | Consistent. StPaul directory footer address/612 phone belongs to Halt, not MJB. |
| [Justia](https://lawyers.justia.com/lawyer/michael-berry-1672176) | Search-indexed; direct403 | Michael Berry/MJB;1442IrvineBlvdSuite201,Tustin92780;9492660880 | Indexed data consistent; current live page not independently accessible. |
| [Avvo](https://www.avvo.com/attorneys/92780-ca-michael-berry-4698028.html) | Search-indexed; direct403 | Michael Joseph Berry/MJB;Suite201,Tustin92780;9492660880 | Indexed identity consistent, not a live completeness check. |
| [Birdeye](https://reviews.birdeye.com/mjb-law-group-apc-169046773307506) | Search-indexed; direct403 | MJB;Suite201,Tustin92780;Mon–Fri8:30–17:30;51review aggregator count | Address/hours consistent; count differs from exact GBP snapshot, no false overwrite. |
| [Official-linked Facebook](https://www.facebook.com/people/MJB-Law-Group-APC/100063566403499/) | Live HTTP200 limited shell | Title MJB Law Group APC / Irvine CA;current street/phone not exposed | Unresolved older city label; verify profile About with an authorized session before any change. Do not call it a confirmed wrong office. |
| Yelp | Domain-targeted and name searches attempted | No exact listing reliably resolved; robots limits | Unverified, not absent. |
| Apple Maps | Domain-targeted and name searches attempted | No exact listing reliably resolved; robots limits | Unverified, not absent. |
| Bing Maps | Domain-targeted and name searches attempted | No exact listing reliably resolved | Unverified, not absent. |
| BBB | Domain-targeted and name searches attempted | No exact firm record reliably resolved | Unverified, not absent. |

No confirmed NAP correction is established within this sample. Carry this short coverage-limited all-clear into the presentation, not a manufactured ticket. A dedicated follow-up can resolve the four unverified platforms and Facebook location if Alex wants; this audit does not authorize listing edits or claims.

## Local on-page and schema handoff

[Tustin employment page](https://mjbfirm.com/employment-law/tustin/) has local title/H1, the correct physical Tustin address, supporting attorney/parking/nearby-city content and contact actions. Do not turn neighboring city pages into fictional offices. Homepage emits WebSite and Organization graphs with stable organization ID and correct destination phone. Full LegalService/Person/Service coverage and defects are documented separately by the crawl/schema specialist; do not infer every page's markup from this homepage sample.

## Priorities and limits

1. Low/medium SEO housekeeping: remove eight obsolete missing sitemap submissions, after confirming no existing matching task. Current sitemaps remain.
2. Evidence-aware content improvement: high-impression educational pages offer snippet/internal-link opportunities; keep intent and attorney review. See KEYWORD-OPPORTUNITIES.md.
3. Optional coverage follow-up: verify Facebook About and unresolved Yelp/Apple/Bing/BBB records; no confirmed correction or absence yet.
4. Preserve valid phone tracking, exact-host reporting and indexed core pages. No new generic phone, reporting or review-refresh task is warranted from this evidence alone.

No artificial all-platform local SEO score is assigned: core office/NAP/category signals are supported but several citation platforms and authenticated GBP dimensions remain unverified. No geo-grid, authenticated GBP Insights, comprehensive backlinks, authority score or full review-response audit. No account/site edits, indexing submissions, outbound messages or public publication.

Raw evidence: `evidence/gsc-*.json`, `ga4-*.json`, `gbp-live-place.json`, `wc-live-tracking-numbers.json`, `nap-public-checks.json`, `serp-*.json`, `ahrefs-keywords.json`. Credentials are not stored in these outputs.
