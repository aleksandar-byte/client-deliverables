# MJB Law Group, APC — full SEO audit

Audit: October 30, 2026 · Canonical website: https://mjbfirm.com/ · Read-only.

## Executive findings

The crawl found a healthy current URL inventory and useful educational content—not a widespread indexing or broken-link problem. The clearest implementation concern is the mobile homepage's **76.44 MB animated background**, despite an existing mobile-static-image task. Three bounded follow-ups are supported: correct firm-as-person Article author markup, fix copied FMLA card descriptions on 12 city pages, and remove eight obsolete Search Console sitemap submissions. No changes or tickets were posted.

| Finding | Confirmed evidence | Recommended direction | Decision before handoff |
|---|---|---|---|
| Mobile hero | `#section-51-1642` uses animated `mjb-hero-bg.webp`, 76,435,620 bytes; mobile lab 54/100 | Reuse existing mobile-hero ticket; adapt static mobile treatment in staging, preserving live body and desktop | Reopen existing Done ticket; reconfirm scheduling and client preview gate |
| Article author | 85 Article nodes type firm name “MJB Firm” as Person | Correct only Article.author to truthful firm Organization or confirmed real author | Confirm corporate authorship; exact CMS emitter is not authenticated |
| FMLA cards | All 12 employment city pages repeat discrimination copy under FMLA heading | Replace only that description with approved leave-related wording | Approve proposed sentence |
| Old sitemap submissions | Eight 2020 submissions now finish at HTTP 404; current sitemaps healthy | Remove only obsolete submissions in GSC | Confirm SEO executor; do not delete site pages or add redirects |

These are qualitative audit priorities, **not assigned Monday priority values**. New-ticket priority and due date are not specified.

## 1. Identity, sources and scope

The verified client is **Michael J. Berry / Michael Joseph Berry, MJB Law Group, APC**, based in Tustin, California. The canonical website is https://mjbfirm.com/.

- Office: **1442 Irvine Boulevard, Suite 201, Tustin, CA 92780**.
- Main/destination phone: **949-266-0880**.
- GBP phone: **949-832-6738**, verified WhatConverts tracking forwarding to the main number.
- Exact GBP: place ID `ChIJFfK8Ex3f3IARLR_eEVRMZ9g`.
- Search Console and Analytics were verified against the production mjbfirm.com property/domain.
- State Bar: Michael Joseph Berry **#303519**, Active, Tustin office verified on the [official record](https://apps.calbar.ca.gov/attorney/Licensee/Detail/303519).

The audit covers initial HTML, crawl/indexability, sitemap reachability, schema, content/intent, mobile/desktop delivery, visual conversion paths, Google analytics/search evidence, local NAP, bounded keyword/SERP research and machine-readable accessibility. It is not legal advice, a substantive legal-accuracy review, a penetration test, a full backlink study or an AI-citation measurement.

Raw evidence is retained in `evidence/`; selected original browser screenshots are in `screenshots/`. No Kie provider, package install, skill changes, website changes, paid expansion beyond the bounded research, Slack messages or tracker mutations were performed.

## 2. Technical crawl and indexability

Coverage: **148 requests**, 147 successful HTML records and **135 distinct successful final HTML URLs** after normalization; no pending queue or cap truncation. Robots rules were respected. Static assets, binary documents, admin/API/feed URLs and query-bearing navigation were not recursively crawled; external-link health was not exhaustively checked.

All **127 XML sitemap URLs** returned 200, were indexable and self-canonical. No sitemap orphan candidates were found. Important content and schema were present in initial HTML. The site is not an empty JavaScript-only content shell.

**No genuine missing internally linked content page was confirmed.** Eleven old article/service routes already permanently redirect to appropriate live pages. The misspelled motorcycle path is one of those working redirects. The only measured 404 was Cloudflare's `/cdn-cgi/l/email-protection` endpoint after removal of its email fragment—not a content page and not a redirect task. See [existing redirect inventory](evidence/redirect-map.json) and [empty broken-content map](evidence/broken-link-map.json).

Blog pagination pages 2–9 deliberately use `noindex,follow`; their shared archive titles/missing descriptions do not justify remediation. The indexable `/blog/` description and H1 subsection cleanup on two articles are optional polish, not priority failures. Forty-five pages sit more than three clicks deep, largely educational archives; this alone does not warrant menu expansion.

HTTPS/security response headers include HSTS, SAMEORIGIN, nosniff and a referrer policy. A CSP was not observed; any future CSP requires testing, not an untested blocking header. No insecure active-resource URLs were found in the saved HTML. See [technical report](TECHNICAL-AUDIT.md) and [sitemap report](SITEMAP-AUDIT.md).

## 3. Homepage performance — exact causes versus hypotheses

| Lab measurement | Mobile | Desktop |
|---|---:|---:|
| Performance score | 54/100 | 83/100 |
| LCP | 6.38 s | 1.49 s |
| TBT | 925 ms | 287 ms |
| CLS | 0.000088 | 0.00456 |

The repeat mobile response had the same timestamp; it is cached, not an independent run. Origin-fallback field LCP p75 was about 2.04 seconds with low CLS, but INP was unavailable: no complete Core Web Vitals pass/fail is asserted, and origin data is not a homepage-only verdict.

**Biggest verified resource problem:** [mjb-hero-bg.webp](https://mjbfirm.com/wp-content/uploads/2026/02/mjb-hero-bg.webp), **76,435,620 bytes**, animated WebP, used as the live mobile CSS background at `#section-51-1642`. A fresh full GET, ranged response total and ANIM/ANMF structure independently confirm size/animation. There is no homepage `<video>` element; the moving background is an image animation.

However, the giant request failed/aborted in the mobile lab and had zero completed transfer. Do not say the lab transferred the full 76 MB, add it to its reported 1.54 MB completed total, or claim it alone caused 6.38-second LCP. The observed LCP element was **`#div_block-53-1642`**, the benefits text “Representing Employees & Injury Victims.” It has AOS `flip-up`, **900 ms delay**, and a 400 ms animation duration. Removing that entrance delay from first-screen text is a specific staging improvement, not a guaranteed reduction equal to simulated LCP.

The lab also estimated about 596 ms render-blocking savings involving jQuery/Oxygen/WC resources. These estimates are not additive proof; do not simply remove tracking or set dependency-sensitive scripts to async. Minor team-photo savings do not justify a separate generic compression ticket.

Existing [Mobile Version Hero ticket](https://serpagency.monday.com/boards/7441724825/pulses/11562460282) already requested **mobile-only static imagery in staging for client review**. Joanne provided [new-home-2](https://mjbfirm.com/new-home-2/), which currently has static mobile imagery and is noindex. Crucially, it contains only a hero and global footer, **not the full live homepage body**. Reuse its treatment, not wholesale promotion of the incomplete page. Current ticket is Done/Critical/due March 24, 2026; no fields have been changed. See [performance report](PERFORMANCE-AUDIT-REPORT.md), [image report](IMAGES-AUDIT.md) and [visual report](VISUAL-AUDIT-REPORT.md).

## 4. Structured data — one narrow finding

All JSON-LD scripts parsed without syntax errors. The issue is semantic: **85 Article.author objects** identify `Person` named `MJB Firm`. Author archive URLs vary; match the fields, not a single `/author/` slug or script position. Full [85-page correction map](evidence/schema-corrections.json).

If the firm is genuinely the author, use this **replacement author subnode**, not a second standalone Article block:

```json
{
  "@type": "Organization",
  "@id": "https://mjbfirm.com/#organization",
  "name": "MJB Law Group, APC",
  "url": "https://mjbfirm.com/"
}
```

If an individual wrote a specific article, use that confirmed individual's accurate Person identity instead. Michael J. Berry is already visibly identified as reviewer; reviewing is not proof he authored every article. Keep that reviewer, valid Organization/WebSite/Breadcrumb markup and article headlines/dates/images. No Product, Offer, Dentist, rating or invalid-pricing removal is supported.

The location to inspect is the shared **Article JSON-LD generating source → Article.author**. No wp-admin/plugin/snippet/GTM emitter was authenticated; exact IDs are not invented. LegalService and biography Person/ProfilePage enrichment are optional, not broken-data claims. [Google's Article documentation](https://developers.google.com/search/docs/appearance/structured-data/article) allows author Person or Organization according to the actual entity. Full [schema report](SCHEMA-REPORT.md).

## 5. Content, services and search intent

Employment, personal injury, wrongful termination, local city pages and specific attorney bios have substantive distinct purposes. Educational articles already contain useful definitions, sources, reviewer attribution and service/contact paths. Three bounded commercial SERP snapshots show local service and directory/comparison results; they do not demonstrate a blog/service mismatch or justify merging useful education into hiring pages.

One concrete copy defect appears across **12 employment city pages**: the **FMLA Law Violations** card repeats the Employment Discrimination description. [Tustin example](https://mjbfirm.com/employment-law/tustin/). Proposed replacement for Alex's approval:

> We help employees with workplace disputes involving family and medical leave.

Replace only this paragraph; retain the FMLA link and the separate discrimination card. A shared component may be responsible, but its CMS source is not authenticated. All affected pages: [editable CSV map](evidence/fmla-page-map.csv), analysis JSON (supporting evidence retained privately). Genuine screenshot: [Tustin cards](screenshots/fmla-card-tustin.jpg).

There is no evidence-based blanket thin-content, missing-reviewer, orphan-page, duplicate-intent or legal-claim-review ticket. Query-by-page cannibalization and numerical SERP overlap were not measured. See [content review](CONTENT-AUDIT.md) and [SXO/GEO review](SXO-GEO-ANALYSIS.md).

## 6. Google performance and measurement limits

Equal 27-day windows: **October 1–27 versus September 4–30, 2026**. GSC Web final data covered all dates; property time boundaries and GA4 America/Los_Angeles were documented. GA4 is filtered to production host and Organic Search channel; no country restriction.

| Measure | Current | Prior | Change |
|---|---:|---:|---:|
| GSC clicks | 941 | 899 | +4.7% |
| GSC impressions | 203,792 | 189,815 | +7.4% |
| GSC CTR | 0.462% | 0.474% | -0.012 percentage points |
| GA4 organic sessions | 1,248 | 1,204 | +3.7% |
| GA4 all production sessions | 2,091 | 2,112 | -1.0% |

Organic key events were **18: 14 phone clicks and 4 generate_lead events**. They are not confirmed connected calls, unique prospects or qualified leads. Six form_submit events were not key events; do not add them as six extra leads. Two staging sessions were excluded, not treated as a large tracking-contamination issue. Lead-quality/CRM reconciliation was not part of this audit.

Education drives measured discovery: on-call pay 107 clicks; job abandonment 80; mileage reimbursement 77; part-time unemployment and PTO 75 each in this window. Preserve their informational role. Current homepage, contact and employment URL inspections passed with matching canonicals. [Google/local report](GOOGLE-LOCAL-AUDIT.md) includes exact filters, dimensions, source files and page-level totals. Query rows were capped; totals are not derived by summing the sampled queries.

## 7. Eight obsolete Search Console submissions

These submitted 2020 URLs currently redirect from HTTP to HTTPS and then return 404:

- http://mjbfirm.com/pageamap.xml
- http://mjbfirm.com/pagebmap.xml
- http://mjbfirm.com/pagecmap.xml
- http://mjbfirm.com/pagedmap.xml
- http://mjbfirm.com/pageemap.xml
- http://mjbfirm.com/pagefmap.xml
- http://mjbfirm.com/pagegmap.xml
- http://mjbfirm.com/pagehmap.xml

Proposed action is **removing only these obsolete submissions in GSC**. Do not delete content pages or invent redirect rules. Keep current `/page-sitemap.xml` and `/post-sitemap.xml`, both healthy, and the ninth legacy `http://mjbfirm.com/sitemap.xml`, which leads to working `/sitemaps.xml`. Old warnings do not prove current indexing loss. Nothing has been removed.

## 8. Local presence / NAP

Verified website, exact GBP, State Bar, Orange County Lawyers and Halt agree after ordinary address normalization. GBP hours: **Monday–Friday 8:30 AM–5:30 PM; Saturday/Sunday closed**. No supported hours/address correction is proposed. All six checked WC numbers forward to the main phone, including current GBP tracking. Preserve them. Contact fax is a fax, not a conflicting telephone.

Justia/Avvo/Birdeye were partially checked through indexed evidence because direct access failed; do not label these fully live-verified. Facebook's “Irvine CA” title is unresolved, not proof of a wrong street address. Yelp, Apple Maps, Bing Maps and BBB were not reliably resolved; unverified does not mean absent. Full [NAP comparison](evidence/NAP-COMPARISON.json) retains source URLs and limits. No NAP ticket is warranted from current evidence.

## 9. Keywords and AI-readiness context

One bounded Ahrefs US keyword pull covered six exact queries: employment lawyer Tustin 30, employment attorney Tustin 30, personal injury lawyer Tustin 100, wrongful termination lawyer Orange County 150, employment lawyer Orange County 250 and personal injury lawyer Orange County 1,000 estimated monthly searches. These overlap; **do not sum them as unique opportunity, forecast leads or guarantee rankings**. Only six keywords were requested, with 330 units documented; no bulk paid expansion/backlink study was run. See [keyword context](KEYWORD-OPPORTUNITIES.md).

Initial HTML provides accessible content/reviewer text, and `llms.txt` exists. Default robots permits ordinary public crawling, with specific path exclusions. None of this proves AI-engine citations or creates a need to change training/crawler policy. No ChatGPT/Perplexity/AI Overview visibility score, synthetic health score, fixed ROI or penalty claim is supplied. Useful education and intentional noindex pages are not failures merely because they are nontransactional.

## 10. Recommended next steps

1. Review the existing staged mobile-hero treatment before any live change; preserve the complete homepage body.
2. Confirm firm authorship and approve the narrow Article.author replacement.
3. Approve the FMLA card sentence for the 12 mapped city pages.
4. Assign the eight obsolete Search Console submissions for removal, preserving current sitemaps.

No website/account changes or new tickets were made during this audit. Internal ticket review and raw authenticated account exports are not part of this public bundle.

## Deliverables

- [Standalone HTML presentation](presentation/MJB-LAW-GROUP-SEO-AUDIT-PRESENTATION.html)
- Specialist reports, scoped public-source maps and original website screenshots linked above. Raw API responses and internal operational records remain private.
