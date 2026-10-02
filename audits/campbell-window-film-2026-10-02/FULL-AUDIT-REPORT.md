# Campbell Window Film — full SEO audit
October 2, 2026 · Read-only · Prepared for Alex and Nick

## Read this alongside the presentation

The [six-finding HTML presentation](./presentation/CAMPBELL-WINDOW-FILM-SEO-AUDIT-PRESENTATION.html) is the short visual walkthrough. This report preserves the broader business context, evidence, strengths, decisions and measurement limits. The [implementation plan](./ACTION-PLAN.md) turns those findings into ordered work. [Shared handoff folder](https://drive.google.com/drive/folders/1DZNVTxzzUyDGAF8tzQHrmNmf69vxp8Qo).

No website, GBP, Search Console settings, analytics configuration or Monday tickets were changed. Sharing the audit is not implementation.

## Executive summary

Campbell is an established architectural window-film and security-glazing installation business, not an automotive-tint shop or an ecommerce store. Its site already has service/product distinctions, local coverage pages, useful educational articles and substantial project evidence.

The clearest immediate problems are customer journeys and homepage delivery: a commercial page names another company and has an incorrect telephone link; a homepage product card leads to the wrong product; the mobile background video and chat widget shift during loading; and two below-fold comparison images download 2.83 MB. An existing high-traffic privacy page also repeats copy and has no contextual body links. Business schema needs one targeted template cleanup, not wholesale deletion.

No critical indexing outage, Google penalty or measured loss of qualified leads was established. A sitewide numeric health score is withheld: the crawl and measured findings are more defensible than blending sample-based editorial ratings with unavailable conversion data. The historical Ahrefs score of 95 is dated August 3 and is not this audit's score.

### First five actions

1. Correct the commercial introduction and malformed Call Now destination.
2. Point both homepage Security Film links to the film page.
3. Stabilize the mobile background video and HubSpot launcher, then reduce their initial cost.
4. Replace the two oversized comparison PNGs with responsive, quality-preserving assets.
5. Improve the existing privacy page's definition and relevant onward links without discarding its traffic.

Quick wins include the phone href, two product-card hrefs, brand paragraph, repeated privacy block and blank schema fields. Video/chat work needs controlled testing, not blanket script removal.

## What the Google data means

Exact Search Console property: https://campbellwindowfilm.com/. August 31–September 29 versus August 1–30, adjacent 30-day periods:

| Metric | Current | Previous | Change |
|---|---:|---:|---:|
| Clicks | 860 | 914 | -5.9% |
| Impressions | 301,832 | 340,475 | -11.4% |
| CTR | 0.285% | 0.268% | +0.017 percentage points |
| Average position | 14.72 | 16.54 | Improved 1.82 |

The mixed trend does not identify a cause. Query mix affects average position. Page/query extracts are bounded; totals come from separate property-level requests.

[One-way privacy film](https://campbellwindowfilm.com/services/one-way-window-film-privacy/) produced 202 clicks and 77,619 impressions. [Tinted house windows: pros and cons](https://campbellwindowfilm.com/the-pros-and-cons-of-tinted-house-windows/) produced 199 clicks and 79,519 impressions. Together they represent **46.6% of all clicks**. Preserve these useful educational entry points and connect them naturally to relevant installation services and coverage.

US clicks were 657/860, or 76.4%; this does not mean all were Southern California prospects. The homepage had 45 clicks versus 66 previously. A separate UTM homepage row is not a verified GBP call/lead total.

A fresh search of 222 accessible GA4 properties did not identify Campbell's property. The related EDH property was checked and excluded because its stream and hostname report belong to edhfilmgroup.com. This is an access/mapping gap, not proof that Campbell has no analytics. Nick should obtain the correct GA4 property/stream and a qualified-enquiry report before making lead or ROI claims.

## Current crawl and on-page checks

All **292 current XML-sitemap URLs** were checked: 176 posts and 116 pages, all HTTP 200, indexable in the checked source and self-canonical. Robots points to the healthy [sitemap index](https://campbellwindowfilm.com/sitemap_index.xml), whose /post-sitemap.xml and /page-sitemap.xml children also returned 200. No missing titles were found. This is current sitemap coverage, not the entire historical URL universe or proof that Google indexes every page.

Four pages lack meta descriptions: [Riot Glass](https://campbellwindowfilm.com/products/riot-glass/), [Sun Control Window Film](https://campbellwindowfilm.com/products/sun-control-window-film/), [Commercial Decorative Window Film](https://campbellwindowfilm.com/commercial/decorative-window-film/) and [Commercial](https://campbellwindowfilm.com/commercial/). Review whether the older commercial pages overlap with the newer service structure before writing distinct summaries; do not redirect based on URL shape alone.

Sixteen checked pages have multiple H1 headings, including CBRE and several local landing pages. Correct secondary section headings where appropriate as lower-priority semantic cleanup; multiple H1s alone are not a demonstrated ranking penalty. No exact duplicate title groups were found. One meta-description group is duplicated: [Burglar-proof windows/doors](https://campbellwindowfilm.com/services/burglar-proof-windows-and-doors/) and [Dichroic window film](https://campbellwindowfilm.com/services/dichroic-window-film/) both use a generic “expert help” description; write distinct page-specific summaries. These checks do not rule out semantic content overlap.

The mobile lab also flags homepage logo links without accessible names and a Skip to content link targeting a missing #content element. Provide meaningful logo-link names and point the skip link to the actual main-content region. These are practical accessibility fixes, not a complete accessibility assessment. HTTPS and server-delivered content were verified; no admin/plugin vulnerability or penetration test was performed.

## Verified implementation findings

### 1. Commercial brand and telephone target — High

Page: [Commercial building window tinting](https://campbellwindowfilm.com/services/commercial-building-window-tinting/).

The opening paragraph names “Dalo Glass Tinting” and joins sentences at “runs.Cut”. Its hero Call Now link is `tel:(800)20580-9997`, with extra literal digits 20. The visible business number and contact page support (800) 580-9997.

- Edit Elementor page 23019, paragraph `.elementor-element-355384a4`, into one coherent Campbell introduction.
- Correct `.elementor-element-121ff2b a` to `tel:+18005809997`, preserving any verified tracking configuration; inspect the rendered mobile href afterwards.

No call was placed. This is a verified link error, not an inferred lost-call count. Dalo-hosted residential images are a separate ownership question; do not assume they are unauthorized.

### 2. Homepage Security Film destination — Medium

Page: [Homepage](https://campbellwindowfilm.com/).

Both the Security Film heading and its Learn More button point to Security Glass. Change `.elementor-element-ffb863f a` and `.elementor-element-64ceed9 a` directly to [Security Window Film](https://campbellwindowfilm.com/products/security-window-film/).

Keep the neighboring Security Glass card and the valid [Security Glass page](https://campbellwindowfilm.com/products/security-glass/) unchanged. These are two direct link edits, **not 301 redirects**. Complete scoped map:

| Referring page | Element | Current destination | Correct destination |
|---|---|---|---|
| Homepage | Security Film heading | /products/security-glass/ | /products/security-window-film/ |
| Homepage | Security Film Learn More | /products/security-glass/ | /products/security-window-film/ |

### 3. Homepage video/chat delivery — High

One independent Google mobile lab run: **25/100, LCP 3.96 s, CLS 0.585, TBT 1,419 ms, total transfer 17.86 MB**. Desktop: 62/100, LCP 0.98 s, CLS 0.059. The repeat mobile request returned the same timestamp, so it is not another test.

The Elementor background Vimeo iframe, video **1192344235**, accounts for a 0.429 layout-shift contribution. Two MP4 responses transferred 10.64 MB. The HubSpot wrapper and iframe add about 0.154. Its visitor bundle transferred 456 KB and consumed about 437 ms of main-thread time.

Reserve the video's final container dimensions from initial CSS. Prefer a static mobile background or defer decorative playback; otherwise optimize the video for its actual display. Keep the chat launcher stable and review greeting auto-expansion or interaction-based loading without removing contact access.

**The measured LCP is the H1 “Welcome To Campbell Window Film”, not the video or comparison images.** The observed trace reports 2,580 ms element-render delay; this does not add directly to the simulated LCP. Video byte savings do not prove an equal LCP improvement. Review the first-screen rendering path and retest.

Phone **origin-level** field data: p75 LCP 2.659 s and CLS 0.17 need improvement; INP 128 ms is good. This is not a homepage-only field result. Direct CrUX API access failed, but PSI supplied these field values.

Secondary investigation: first-screen CSS, jQuery dependencies and font requests. Do not blindly defer everything. Identify the owner/function of the blocking tracking script before any change; the audit does not establish malware.

### 4. Homepage comparison images — Medium

Below-fold `#ba-slider` eagerly loads:

| File | Measured encoded body bytes |
|---|---:|
| [new-before.png](https://campbellwindowfilm.com/wp-content/uploads/2026/06/new-before.png) | 1,416,116 |
| [new-after-1.png](https://campbellwindowfilm.com/wp-content/uploads/2026/06/new-after-1.png) | 1,414,569 |

Both are 1120×718 and displayed around 648×415 on desktop. They lack responsive candidates, explicit dimensions and lazy loading. Produce matched, quality-preserving WebP/AVIF variants, set dimensions/srcset and lazy-load the below-fold comparison. Verify the drag control and visual quality. Google estimates 2.74 MB potential savings; actual output quality/size needs testing. These are not the LCP images.

### 5. Privacy content and onward journey — Medium

The [one-way privacy page](https://campbellwindowfilm.com/services/one-way-window-film-privacy/) repeats its three introductory paragraphs under “What Is One Way Window Film?”. Fresh rendered source shows **zero anchors in the Elementor page body**, although menu/footer links exist; it is not an orphan page.

Replace `.elementor-element-b82b34a` with a direct definition and useful day/night guidance. Link relevant passages to [Daytime Privacy Film](https://campbellwindowfilm.com/services/daytime-privacy-film/), [Frosted Window Film](https://campbellwindowfilm.com/services/frosted-window-film/) and [Contact](https://campbellwindowfilm.com/contact-us/). Retain its URL and educational purpose. Its 0.26% CTR is an investigation lead, not proof that the repeated text caused poor CTR.

### 6. One consolidated schema cleanup — Medium

The current crawl finds **116 pages with ProfessionalService markup** using blank hours and Service offer details; homepage/commercial samples also show a relative `@id:"LocalBusiness"` and irrelevant empty restaurant fields. Parsed JSON-LD has no syntax errors, and no Product type was found. These are template quality corrections, not a blanket invalid-schema verdict.

Use a stable absolute Huntington Beach entity ID, verified Monday–Friday 08:00–17:00 hours, and remove or complete the empty Service offer. Remove unused blank fields. **Keep accurate business identity and `priceRange:"$$"`; this is not the invalid numeric Product price found on earlier dental sites.**

The 4.9/129 schema review value versus 4.9/128 GBP sample may be timing/source variation, not a headline defect. Locate the actual WordPress generator before changing it; public HTML does not establish ACF, snippet or plugin ownership. Keep LA separate if its operating status is confirmed.

## Local business context for Nick

Two exact profiles were checked separately:

| | Huntington Beach | Los Angeles |
|---|---|---|
| Address | 15661 Producer Ln #D, CA 92649 | 1875 Century Pk E #600, CA 90067 |
| Phone | (800) 580-9997 | (855) 544-1903 |
| Hours | Mon–Fri 8 AM–5 PM; weekends closed | Same |
| Rating / reviews | 4.9 / 128 | 4.9 / 35 |

[Huntington Beach GBP](https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJK1NTh2Ym3YARm7mqzttx9e0) · [Los Angeles GBP](https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJqRrinfS7woARoPidT0bZ32w).

The contact page matches Huntington Beach. The [LA page](https://campbellwindowfilm.com/locations-served/los-angeles/) shows headquarters details: confirm whether the Century Park office accepts visitors before adding its own contact block and visitor instructions. Do not replace the sitewide headquarters footer.

[BBB](https://www.bbb.org/us/ca/huntington-beach/profile/window-coverings/campbell-window-film-1126-13195099) retains 16321 Gothard St #A, 92647. Confirm legacy locations, then correct the stale citation. Limited review samples suggest different collection/reply patterns by office; verify within Google before assigning a review campaign.

## Content, search demand and AI-search context

The site is not missing proof across the board. [CBRE Global Investors](https://campbellwindowfilm.com/cbre-global-investors/) includes named people, project scale and installation logistics; [Union Bank Square](https://campbellwindowfilm.com/union-bank-square/) has project details. Surface relevant existing work on commercial pages after confirming attribution and current accuracy. A Swiss manufacturer project must not be recast as a local Campbell installation.

Sampled articles already have contextual links, so avoid a blanket sitewide “missing internal links” task. Check overlap among privacy pages using intent and queries before consolidation. Stated licensing and affiliations are useful signals but were not independently adjudicated.

Ahrefs returned estimated US monthly demand of 90 each for “commercial window tinting los angeles” and “residential window tinting los angeles”, and 40 for “security window film los angeles”. These are overlapping phrase estimates, not guaranteed local leads. Three representative SERP queries returned nine organic results each without Campbell; this is not a full rank tracker or Maps grid. One additional query timed out.

Recovered robots rules allow named AI crawlers. Actual AI citations were not measured. Stronger direct answers, clear entity details and attributable project evidence are useful; an llms.txt file is not a proven ranking requirement.

Ahrefs backlink/DR estimates and its August 3 crawl are retained in the specialist report as historical context, not new verified defects or a disavow rationale. Backlinks are intentionally excluded from the presentation.

## Evidence, scope and limitations

The current technical inventory is documented in [Technical audit](./TECHNICAL-AUDIT.md) and [Sitemap audit](./SITEMAP-AUDIT.md). The 292 sitemap pages yielded 59 additional non-sitemap internal URL candidates; a subsequent normal-browser probe was challenged on its first llms.txt request and stopped before testing those candidates. Their status remains unverified: do not claim the entire site has no broken links. Browser access initially returned SiteGround challenge pages before a normal session recovered the sitemap crawl. Challenge-page noindex is not site-page noindex. Three sampled GSC URL Inspections show indexed pages, successful fetch and matching canonicals.

GSC contains seven older submitted sitemap records with errors; inspect the actual errors and reconcile with the current active sitemap before replacing submissions. Legacy API indexed:0 fields are not zero-indexing evidence.

Evidence includes rendered HTML, screenshots, crawl rows/inlinks, PSI JSON, exact GBP responses, GSC totals/page/query/inspection responses, and bounded Ahrefs research. No credentials are included in the handoff. Qualified leads, exact Campbell GA4, complete directory ownership, actual AI citations, WordPress emitter settings and a complete historical URL migration inventory remain unverified. Total Ahrefs use was 389 units.

The self-contained HTML has real page captures plus clearly labeled diagnostic cards, not fabricated screenshots. Its desktop/mobile, image enlargement, anchors, print styling, JavaScript and offline checks are recorded alongside the file. No booking or Vimeo access error seen only from the auditor's geography is presented as a customer-facing defect.

Specialist detail: [Content](./CONTENT-AUDIT.md), [SXO](./SXO-AUDIT.md), [Clusters](./CLUSTER-AUDIT.md), [Google](./GOOGLE-AUDIT.md), [Local](./LOCAL-AUDIT.md), [Keywords](./KEYWORD-OPPORTUNITIES.md), [Performance](./PERFORMANCE-REPORT.md), [Images](./IMAGES-REPORT.md), [Schema](./SCHEMA-REPORT.md), [AI search](./GEO-AUDIT.md). These working modules remain in the local evidence archive; the full report above is self-contained for Nick.
