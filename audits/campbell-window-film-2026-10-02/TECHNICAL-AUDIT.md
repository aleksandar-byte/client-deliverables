# Campbell Window Film — technical audit

Read-only inspection on October 2, 2026. **292 XML-sitemap URLs checked; 292 genuine HTML responses.** 0 sitemap URLs remain unchecked. Status distribution: {"200": 292}. Sources are preserved in `evidence/browser-crawl-sources.json`, `crawl-pages.json`, `html/` and `inlinks.json`.

## Scope and crawl access

The first plain HTTP attempt encountered SiteGround's HTTP202 challenge, including an X-Robots-Tag:noindex **on the challenge response**. An ordinary browser subsequently completed normal page loading without challenge interaction, token manipulation or stealth changes. Its normal request context could read robots, XML sitemaps and real HTML. The challenge is an audit-access caveat, not evidence the real site is noindexed or Google is blocked. Google PSI independently passed robots, indexability and canonical checks on the real homepage.

The crawl used one request at a time with a 1-second pause, respected wildcard robots exclusions, and capped at 500 URLs. Seed scope was the XML sitemap inventory. It discovered 59 further same-site link targets outside the checked inventory. A follow-up session was challenged on its first llms.txt probe and halted before those link targets could be checked. Their current status is unverified, not confirmed healthy or broken. This is not an exhaustive crawl of every parameter or historic URL.

## Highest-value technical actions

1. **Homepage video/chat loading:** mobile lab 25/100, LCP 3.96 seconds, CLS 0.585 and TBT 1,419 ms. Stabilize the Elementor background Vimeo iframe (video 1192344235; 0.429 CLS contribution) and HubSpot greeting/iframe (about 0.154 combined CLS). Prefer a static mobile background or defer decorative media appropriately. Full exact nodes and byte/timing evidence: `PERFORMANCE-REPORT.md`.
2. **Before/after image delivery:** compress and responsive-size `new-before.png` and `new-after-1.png`, 2.83 MB combined, with below-fold lazy loading and aligned geometry. These pictures are not the measured LCP element. See `IMAGES-REPORT.md`.
3. **Business schema cleanup:** retain the verified Huntington Beach business; populate empty hours, remove/populate empty Service offer, use a stable absolute business ID and distinct IDs for distinct locations. See `SCHEMA-REPORT.md`. No generic instruction to delete Product pricing applies: the inspected `priceRange: "$$"` is a business range, not a numeric Offer price.
4. **Accessible homepage navigation:** name the header/footer logo links and provide a valid target for the “Skip to content” link. PSI points to `body.home > a.skip-link[href="#content"]` with no target. This is a usability fix; do not present the 88 accessibility score as a full manual accessibility audit.

## Indexability and metadata results

- XML URLs returning non200: 0.
- Noindex pages found in checked XML inventory: 0.
- Canonical mismatches/missing/multiple canonical tags: 0.
- Missing title tags: 0; missing meta descriptions: 4.
- Duplicate exact title groups: 0; duplicate exact description groups: 1.
- Pages without exactly one H1: 16. Multiple H1s alone are not a penalty; review only where headings obscure the page's purpose.

### Canonical exceptions
- None detected in the checked scope.

### Noindex XML exceptions
- None detected in the checked scope.

### Extra-link verification gap
The 59 discovered candidates need a later normal-access check. `evidence/unverified-extra-links.json` records their referring pages and anchors. No redirect map should treat these candidates as404s without response verification. The unrelated homepage Security Window Film card points to a valid Security Glass page: correct that link directly; do not redirect or retire the legitimate Security Glass page.

## Security, rendering and mobile

Homepage HTTPS succeeds and main content, metadata and schema are present in server-delivered real HTML; the site is WordPress/Elementor with Hello Elementor, not an empty client-rendered shell. Sampled homepage headers include X-Content-Type-Options:nosniff. Missing optional security headers are not a primary SEO finding; no penetration testing, HSTS preload audit or admin/plugin security audit was performed. Header presence is not a security certification.

Real homepage mobile rendering is available from Google PSI; the initial local mobile screenshot was a challenge and was excluded from presentation evidence. Desktop browser capture showed no horizontal overflow. Field PHONE origin p75 LCP2.659s and CLS0.17 need improvement; INP128ms is good. The origin figures cover the site and should not be claimed as page-specific. IndexNow support was not confirmed; no failure inferred.

## Structured-data inventory

173 checked pages contain parsed JSON-LD; 119 have none. Page counts by recursively detected type: {"PostalAddress": 116, "Service": 116, "ImageObject": 55, "Offer": 116, "GeoCoordinates": 116, "AggregateRating": 116, "Organization": 1, "Place": 116, "ProfessionalService": 116, "Person": 54, "VideoObject": 54, "InteractionCounter": 7, "WatchAction": 7, "ItemList": 7, "Answer": 36, "Question": 36, "FAQPage": 36}. JSON parse errors: 0. Product nodes: 0. This measures source presence, not Google rich-result eligibility or indexing.

Full metadata exceptions, per-page schema and exact duplicate groups are in `evidence/schema-and-duplicates.json` and `crawl-summary.json`. The report intentionally avoids a made-up composite SEO score.
