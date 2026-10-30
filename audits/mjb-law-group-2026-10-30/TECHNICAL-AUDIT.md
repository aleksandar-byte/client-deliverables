# Technical audit — MJB Law Group, APC

Fresh read-only evidence: October 30, 2026. Canonical domain: https://mjbfirm.com/. Active legal client in Tustin, CA; not Michael Bleeker or a dental practice.

## Coverage and controls

- 148 page requests; 147 successful HTML records; 135 distinct final HTML URLs. Responses: {"200": 147, "404": 1}.
- 127 sitemap URLs discovered; 0 page requests remain queued. Crawl cap 500; up to 5 concurrent workers, globally paced request starts at least 1 second apart, 30-second request timeout and maximum 3 redirects. Robots respected; skipped: 0.
- Used inspected installed fetch_page.py and its public-URL guard; fresh evidence only. Personal shared cache was for mycapdental.com and excluded. No provider/AI call, private .env search or Kie transmission.
- All page HTML, including failures, is saved; normalized complete URLs, titles, directives, headings, links and schema are in evidence/crawl-pages.json. Link exclusions: query-bearing navigation, feeds/admin/REST, static asset and binary file crawling. Linked media is inventoried but not exhaustively downloaded/status-checked here. External outbound-link health is not a full external crawl.

## 404s and redirects — no new rules needed

0 internally discovered target URLs returned HTTP errors. Exact destinations are proposed only when the same-topic canonical page is verified live.

All old /blog/article routes and the misspelled motorcycle-acccidents route already permanently redirect to the correct live page. The only observed HTTP404 was /cdn-cgi/l/email-protection after removing its email fragment: a Cloudflare decoding endpoint, not a missing content page. Do not create a redirect for it. Browser-decoded email behavior is a separate check. See technical_endpoint_errors in technical-analysis.json.

No content redirect map is proposed: `evidence/broken-link-map.json` is empty. Eleven existing redirects are documented separately in `evidence/redirect-map.json`. Updating old hrefs directly to their already-working canonical destinations is optional housekeeping, not missing-page remediation.

## Indexability and metadata

- Sitemap non-200 URLs: 0; sitemap noindex URLs: 0.
- Noindex HTML URLs: 8. Utility thank-you/privacy pages are not inherently failures; inspect their intent before recommending noindex.
- Canonical differences or missing/multiple canonical tags: 0. Exact records in technical-analysis.json; cross-canonical archive records must be evaluated against their real content, not assumed duplicates.
- Missing title: 0; missing description: 9. Missing descriptions: https://mjbfirm.com/blog/, https://mjbfirm.com/blog/page/2/, https://mjbfirm.com/blog/page/3/, https://mjbfirm.com/blog/page/9/, https://mjbfirm.com/blog/page/4/, https://mjbfirm.com/blog/page/5/, https://mjbfirm.com/blog/page/8/, https://mjbfirm.com/blog/page/7/, https://mjbfirm.com/blog/page/6/. A search engine may create its own snippet; this is polish rather than an indexing block.
- Duplicate-title groups: 1; duplicate-description groups: 0. These include archives if applicable; source rows are preserved for context.
- All 8 blog-pagination URLs (pages2–9) are deliberately noindex,follow with no canonical. Their repeated archive title and missing descriptions do not warrant an indexing/canonical remediation ticket. The indexable /blog/ description is optional metadata polish only.
- Pages with a non-single H1 outline: 2. Change subsection headings to H2/H3, not their wording; multiple H1s are an outline/accessibility issue, not proof of a penalty.

- https://mjbfirm.com/california-supreme-court-holds-that-meal-and-rest-period-violations-warrant-imposition-of-statutory-penalties/ — ['California Meal and Rest Break Violations: Employee Rights and Employer Obligations', 'How the Court Resolved the Conflict', 'Attorney’s Fees for Meal and Rest Break Claims']
- https://mjbfirm.com/on-call-pay-california/ — ['On Call Pay in California', 'Examples of Compensable On-Call Situations', 'Need Legal Assistance? Contact MJB Law Group', 'Conclusion']

## Architecture and reachability

- Sitemap URLs with no discovered incoming HTML link: 0; see exact inventory. This is scoped crawl reachability, not a claim of zero backlinks or search traffic.
- URLs more than 3 homepage clicks deep: 45. Many are educational archive content; only prioritize relevant service/reader journeys after traffic/context review. No blanket menu expansion.
- Important service/location navigation and content are present in initial HTML. All checked HTML language values: {"en-US": 135}; mobile viewport recorded per page. Actual mobile layout and CWV are covered by the performance specialist.

## HTTPS, security, host behavior and rendering

- Public homepage security headers: `{"Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload", "referrer-policy": "strict-origin-when-cross-origin", "x-content-type-options": "nosniff", "x-frame-options": "SAMEORIGIN", "Content-Security-Policy": null}`. HSTS, SAMEORIGIN framing, nosniff and strict-origin-when-cross-origin referrer policy are present. No CSP was observed in this response; optional hardening needs a tested policy, not an untested blocking header. A `preload` directive does not independently verify membership in a browser preload list.
- Mixed insecure resource URLs in requested HTML: 0. Links to ordinary external HTTP pages are not falsely counted as active mixed-content requests.
- Host/HTTP variants and a synthetic nonexistent path were separately probed; exact statuses and hops are in evidence/technical-probes.json. Synthetic audit path is not an organic site link or redirect task.
- Titles, canonicals, headings, Article markup and article/service text are in initial HTML. This is not an empty client-rendered shell. Rendered tags may still differ; no site-wide two-user-agent rendering comparison was performed.
- IndexNow setup was not verified; this is optional non-Google discovery infrastructure, not an indexability defect. AI crawling is allowed under the default rules except explicitly disallowed paths; do not add a general AI-blocking task without business policy.

## Evidence

- evidence/technical-analysis.json, evidence/crawl-url-inventory.csv, evidence/all-inlinks.csv.
- evidence/robots.txt, evidence/sitemap.json, evidence/technical-probes.json.
- SCHEMA-REPORT.md and SITEMAP-AUDIT.md hold the full specialist detail.
- No fabricated health score, penalty diagnosis or traffic-loss attribution is supplied.
