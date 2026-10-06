# Michigan Glass Coatings — full SEO audit

October 3, 2026 · https://michgc.com/ · Read-only · Prepared for Alex and Nick

## Wider context for Nick

Michigan Glass Coatings has a working architectural-film site, verified Auburn Hills and Grand Rapids locations, clear residential/commercial service hubs and an established educational/project archive. Search visibility increased in the review period. The immediate work is to repair existing customer paths and copied sections, improve the responsive hero, and verify enquiry completion—not create another broad batch of pages or assume zero real leads.

Use the [minimal HTML presentation](presentation/MICHIGAN-GLASS-COATINGS-SEO-AUDIT-PRESENTATION.html) for a walkthrough, and [ACTION-PLAN.md](ACTION-PLAN.md) for scope, dependencies and acceptance checks. Specialist reports retain the wider evidence; the HTML is selective.

## Coverage and limits

- Fresh normal-browser desktop/mobile captures and a capped 500-request crawl: 471 final HTTP 200 responses, two verified 404s and 27 browser fetch failures, not proven 404s. There are 464 distinct HTML URLs. The fuller XML inventory has 498 unique URLs; 436 were fetched and 62 remain unverified; 103 discovered queued URLs remain at the cap. Final counts and remaining coverage are documented in [Technical](TECHNICAL-AUDIT.md) and [Sitemap](SITEMAP-AUDIT.md).
- Two independent mobile Lighthouse runs and one desktop run with exact resource/element attribution. No usable field CWV data; direct CrUX returned 403. No real-user pass/fail or INP claim.
- Live GSC property https://michgc.com/ and GA4 499105946 verified; comparison August 31–September 29 versus August 1–30. These are adjacent 30-day periods, not weekday matched. GA4 reports use exact michgc.com hostnames, excluding legacy aliases, and retain the property's America/Los_Angeles time zone context.
- Exact live GBP identity checks for both offices. Dated September 22 Client Records snapshot is context, not proof of current operational details.
- Ahrefs actual use 788 units. Its available August 3 audit (Health 46, 902 error-affected URLs) is historical, not today's score. No new vendor crawl started. Irrelevant SERP responses were excluded from ranking claims.
- No website, tracking, GBP, records, tickets or skills changed. No form submission, phone call, CRM-qualified-lead reconciliation or owner-side GBP Insights. Raw authenticated responses remain local, not a public publication bundle.

## Business performance

| Metric | Aug 31–Sep 29 | Aug 1–30 | Context |
|---|---:|---:|---|
| Google clicks | 108 | 100 | +8% |
| Google impressions | 7,630 | 7,011 | +8.8% |
| GA4 organic sessions | 184 | 149 | +23.5%, exact host |
| Organic engagement rate | 55.98% | 69.80% | Lower, cause unproven |
| Organic key events | 0 | 0 | Not a count of actual qualified leads |

Homepage receives 92 clicks (about 85%); Grand Rapids receives 10 clicks/1,665 impressions, Residential one click and Commercial zero in this period. Improve existing service discovery and enquiry paths while preserving the homepage/local pages that already work. GSC clicks and GA4 sessions are different measures. [Google details](GOOGLE-AUDIT.md).

## Confirmed priority findings

### 1. Improve the mobile hero and desktop video stability

Mobile scores vary 31/100 and 48/100, simulated LCP 15.38 and 21.38 seconds. Desktop scores 35/100, LCP 1.20 seconds but CLS 0.538. Do not promise that every visitor sees these timings.

The mobile LCP is the first-screen `.x-bg-layer-lower-image`, using [Screenshot-2026-01-07-at-5.13.26-AM-scaled.png](https://michgc.com/wp-content/uploads/2026/01/Screenshot-2026-01-07-at-5.13.26-AM-scaled.png), 970,024 bytes; Google estimates 858,007 bytes image-delivery savings. It is already discoverable/eager, so do not assign removal of lazy loading. Create a quality-preserving responsive WebP/AVIF and prioritize only the actually used first-screen asset.

Vimeo 1151081526 is a desktop hero: its actual iframe is 0×0 on mobile, yet mobile downloads 2.33–2.58 MB of video responses. Avoid initializing that desktop-only player on the static mobile layout. Preserve intended desktop video and reduced-motion behavior.

Desktop `.x-bg-layer-lower-video` accounts for 0.535 of the 0.538 lab CLS; stabilize its initial cover/parallax geometry. This is corroborated by a normal-browser shift around 0.494. A separate chat cluster must not be added to the overall CLS. Review chat/reCAPTCHA startup only with dependency and form protection checks. Lower-page Homepage-7-scaled.png (413,715 bytes) is secondary, not the LCP. Gallery images already use lazy loading. [Performance](PERFORMANCE-REPORT.md) · [Images](IMAGES-REPORT.md).

### 2. Correct the homeowner journey

Homepage Residential Window Film Solutions uses `.e5120-e89`, labeled Explore Commercial Services, linking to [/commercial/](https://michgc.com/commercial/). Change that one button to Explore Residential Services → [/residential/](https://michgc.com/residential/). Leave the separate commercial section/button intact.

The Residential page also says Request a Request, uses commercial labels for contact CTAs, mentions reducing glare in offices, and mismatches product descriptions (Solar Film/Safety Glass; Privacy and Decorative Film/3M Safety & Security Films). Correct those exact blocks for homeowners and match each description to its product. Contact actions can remain contact links if labeled Request a Quote rather than implying they open commercial details. Check responsive variants. [Content](CONTENT-AUDIT.md).

### 3. Correct Grand Rapids product copy

[Grand Rapids](https://michgc.com/locations/grand-rapids/) Custom Window Graphics & Branding Films lists Safety & Security Window Film, Ultra Prestige, Ultra Flex and Impact Protection systems instead of graphics options. Replace with approved graphics choices/use cases. The decorative heading says Explore Security Film Solutions; correct the heading to decorative/privacy intent. The Custom Graphics destination is already correct: keep it. This is copied-category content, not a new unsupported performance/clinical claim review.

### 4. Give Grand Rapids mobile buttons working destinations

| Source | Visible mobile element | Current | Direct replacement |
|---|---|---|---|
| Grand Rapids hero | `.e5741-e13` Request a Quote | `#` | https://michgc.com/contact-us/ |
| Grand Rapids hero | `.e5741-e14` Find Location | `#` | https://michgc.com/locations/ |

Desktop variants already work; edit only the mobile targets and test both. These are placeholder links, not HTTP 404s and not a redirect task. Source HTML and real mobile capture confirm visibility. Solar/security Learn More placeholders in hidden desktop template variants remain a QA queue, not a claimed visible-desktop failure without matching mobile checks. [Visitor experience](SXO-AUDIT.md).

### 5. Verify successful enquiry reporting

The exact-host all-channel event report returns 17 form_start and nine generic click events, but no form_submit, phone-specific, qualify_lead or close_convert_lead events. Configured key events are purchase, qualify_lead and close_convert_lead. The [Contact page](https://michgc.com/contact-us/) embeds TintPro on michiganglass.tintprogroup.com, a different origin. Parent form starts do not establish successful submission.

Ask the tracking owner to identify TintPro's supported completion callback/confirmation/integration and reconcile actual enquiries with GA4 and CRM. Keep enquiry submission separate from qualified/closed leads. Test only with authorization; do not label generic clicks or starts as leads or zero key events as zero real enquiries. Legacy michiganglasscoatings.com hostnames are excluded from our traffic comparison; review alias redirects/tag ownership separately.

### 6. Repair two malformed service links

| Referring page / anchor | Current measured 404 | Existing HTTP 200 replacement |
|---|---|---|
| [/services/decorative-window-film/](https://michgc.com/services/decorative-window-film/) · Contact Us | /services/decorative-window-film/contact-us/ | /contact-us/ |
| [/commercial/](https://michgc.com/commercial/) · Di-Noc Architectural Finishes | /commercial/com/services/di-noc-resourfacing/ | /services/di-noc-resourfacing/ |

Edit these two hrefs directly and add exact 301 rules for the malformed URLs, verifying one hop after approval. Retain the live destination's existing `resourfacing` spelling; do not guess a corrected-slug URL. These are the complete referring links returned for this two-URL scoped finding, not an inventory of every historical broken URL.

### 7. Repair the desktop footer's legacy destinations

Homepage desktop footer About opens [/us-old/](https://michgc.com/us-old/), a public HTTP 200 directory listing, not the About page; Sitemap opens [/html-sitemap/](https://michgc.com/html-sitemap/), another directory listing. Contact opens [/contact-us-old/](https://michgc.com/contact-us-old/), an indexable, self-canonical duplicate of the current Contact page. Those footer links are visible on desktop and hidden in the sampled mobile layout.

Fix the shared footer source: About → [/about-us/](https://michgc.com/about-us/), Contact → [/contact-us/](https://michgc.com/contact-us/), Sitemap → an approved maintained sitemap (the XML index is verified; use a real visitor HTML sitemap only if available). Verify across templates. Compare any differences before retiring/301ing old Contact to current Contact. Disable public directory indexing or retire the obsolete folders through the hosting owner; do not indiscriminately delete unknown files. See fresh footer screenshot and inlinks in the evidence; this is separate from the two malformed-URL redirect rules.

## Sitemap and technical decisions

The declared/submitted [/sitemap.xml](https://michgc.com/sitemap.xml) is valid but contains one URL, matching GSC's one submitted web URL. A fuller Yoast [/sitemap_index.xml](https://michgc.com/sitemap_index.xml) exists with post, page, portfolio, taxonomy and author children; /wp-sitemap.xml resolves to it. Validate the index's intended canonical/indexable entries, then update robots and GSC to the correct maintained index in an authorized implementation. Do not bulk-submit duplicate/noindex/archive URLs merely to raise a count. No submission occurred.

All five sampled Google inspections—homepage, Residential, Commercial, Contact and Grand Rapids—pass with matching canonicals; that is not a blanket sitewide indexing verdict. Fresh crawl findings take precedence over Ahrefs' old 404/orphan counts. Use the technical report's measured response codes and inlink maps before proposing any redirect. No fabricated composite score is assigned.

Homepage has valid Yoast Organization/WebSite/WebPage/Breadcrumb markup; no Product or LocalBusiness node was found among 447 schema-bearing responses. No Product-removal recommendation is supported. Group any verified schema accuracy fixes rather than deleting unrelated valid markup. Location-business markup is an accuracy opportunity using the two confirmed offices, not invented branches. [Schema report](SCHEMA-REPORT.md).

## Local identity and wider plan

| Office | Verified address | Local phone | GBP hours |
|---|---|---|---|
| Auburn Hills | 1000 N Opdyke Rd Ste G, MI 48326 | 248-364-6667 | Mon–Fri 8 AM–4:30 PM; weekends closed |
| Grand Rapids | 3940 Peninsular Dr SE #230, MI 49546 | 616-388-8468 | Mon–Fri 7 AM–7 PM; Sat 7 AM–5 PM; Sun closed |

Locations directory matches both. The central 800-999-8468 number is not automatically wrong; preserve legitimate routing. Ratings are 4.9/106 and 4.9/14 at collection, not one combined location claim. Grand Rapids should clearly show its local office contact; label retained Auburn Hills headquarters context instead of globally replacing the address.

The dated record's Auburn Hills 8:30 opening differs from live GBP 8:00, but Contact has no visible hours: this is not a confirmed wrong website-hours task. Confirm operational hours before adding them. A cached LinkedIn legacy domain/address is a stale-profile research candidate, not a verified current citation conflict. Keep client confirmation/ownership checks before changes. [Local report](LOCAL-AUDIT.md) · [Entity/AI-search review](GEO-AUDIT.md).

Preserve meaningful residential, commercial, solar, security, graphics and decorative intents. Assign existing pages as owners before expanding local content. Older 3M articles and current service pages need intent review, not automatic consolidation. Use approved local installations/case studies as first-hand proof and connect useful guides to relevant services; do not invent projects or people. Ahrefs architectural Detroit phrases show modest modeled volume, but mixed auto-tint terms inflate demand and were excluded. Invalid SERP responses cannot support rank-absence claims. [Keyword opportunities](KEYWORD-OPPORTUNITIES.md) · [Cluster plan](CLUSTER-AUDIT.md).

Backlink metrics stay in the broader context only; no disavow/buying recommendation or client-presentation backlink task is supported. No skill changes, ticket creation or external delivery is part of this audit.
