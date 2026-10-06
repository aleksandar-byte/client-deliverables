# Michigan Glass Coatings — technical audit

Read-only audit completed October 3, 2026. No website, hosting, Google profile or Search Console changes were made. No overall score is invented from incomplete rubric evidence.

## Coverage and limitations

The crawl followed normal browser access, respected the permissive robots file, used at most three parallel requests with a one-second batch pause, and stopped at **500 requested URLs**. It includes homepage/navigation discovery plus the full Yoast XML inventory.

- **471 responses ended HTTP 200**, including **465 HTML responses / 464 distinct final HTML URLs**. These include 18 directory-listing/sorting variants; do not describe them all as substantive pages.
- **Two HTTP 404 destinations are confirmed**, with exact referring links and verified replacements below.
- **27 HTTP-scheme URLs failed in the HTTPS browser-fetch context.** These are fetch/mixed-content limitations, not proven 404s or evidence the HTTP redirect is broken. Browser errors are preserved in raw evidence.
- **436 of 498 unique sitemap URLs were fetched; 62 were not.** The cap left 103 unique discovered queue URLs overall. No statement of complete site-wide coverage or absence of further broken links is supported.

Evidence: `evidence/crawl-pages.json`, `crawl-summary.json`, `technical-final-summary.json`, `browser-crawl-sources.json`, `inlinks.json` and saved `html/`. The full-response collector follows redirects; individual redirect status codes/hop counts were not preserved.

## High-priority actions

### Correct the two broken customer links

| Source | Current bad link | Verified replacement |
|---|---|---|
| [Decorative Window Film](https://michgc.com/services/decorative-window-film/), “Contact Us” | `/services/decorative-window-film/contact-us/` → 404 | [Contact Us](https://michgc.com/contact-us/) → 200 |
| [Commercial](https://michgc.com/commercial/), “Di-Noc Architectural Finishes” | `/commercial/com/services/di-noc-resourfacing/` → 404 | [DI-NOC](https://michgc.com/services/di-noc-resourfacing/) → 200 |

Change the referring hrefs to those exact absolute URLs. The live DI-NOC slug deliberately shown here is the site's existing **`resourfacing`** spelling; do not guess a new path. Consider an exact redirect from a malformed URL only after checking whether it has meaningful external links/traffic. A redirect alone does not correct the bad source link. Machine-readable handoff: `evidence/broken-link-map.csv`.

### Repair the desktop footer's legacy destinations

The desktop homepage footer visibly links **About → `/us-old/`** and **Sitemap → `/html-sitemap/`**. Both return a directory listing, not a customer page. Browser geometry confirms these footer links are visible on desktop; their corresponding elements are hidden on the tested mobile layout.

Use [About Us](https://michgc.com/about-us/) for About, and a real approved HTML sitemap or the functioning [XML index](https://michgc.com/sitemap_index.xml) for Sitemap. Remove the customer path to directory listings and disable unnecessary public directory browsing after checking hosting requirements; no sensitive-file exposure or compromise is claimed.

Footer Contact points to [contact-us-old](https://michgc.com/contact-us-old/), while the main navigation uses [contact-us](https://michgc.com/contact-us/). Both are 200, index/follow and self-canonical with identical title/description. Confirm the current page preserves the needed contact details/forms, then align footer links; decide a redirect or retirement for the legacy page separately. Do not delete it before preserving required content.

### Replace the incomplete declared/submitted sitemap

Robots advertises `/sitemap.xml`, whose XML lists only the homepage. A working `/sitemap_index.xml` exists with eight child sitemaps and 498 unique URLs. Correct the robots declaration and the Search Console submission to the reviewed full index. See `SITEMAP-AUDIT.md`. The one-URL submission is incomplete; it does not mean Google cannot find other pages through links.

### Fix the specific homepage performance problems

The mobile hero is a 970 KB PNG; a desktop-only Vimeo background also downloads media on mobile. The desktop video layer contributes almost all of the main CLS cluster. Exact asset, video ID, request timing, bytes and selectors are documented in `PERFORMANCE-REPORT.md` and `IMAGES-REPORT.md`. Two independent mobile runs and a desktop run support these findings; field CWV data was unavailable.

## Indexing and metadata context

No noindex directive was found in the fetched successful HTML. The 18 canonical omissions belong to the two directory listings and their sorting variants. The other 446 distinct WordPress HTML pages have self-canonicals and index/follow source directives; this is **source eligibility**, not confirmation that Google indexes all of them.

There are 231 distinct fetched HTML URLs without a meta description, mostly archive/utility content. Prioritize useful service and customer-support pages; do not turn this into 231 equal-priority tasks. Duplicate titles across blog pagination and corresponding post/portfolio tag archives do not alone prove duplicated body content or cannibalization. Review the actual value and traffic of overlapping archives before noindexing or consolidating them. The legacy Contact pair is the clearest current customer-facing overlap.

## Other technical categories

| Area | Evidence-backed status |
|---|---|
| Crawlability | Normal browser access worked; robots permits crawling. Plain non-browser requests hit ModSecurity 406, which was not treated as a website outage. |
| URL structure | Two malformed internal hrefs confirmed; older HTTP links need protocol/redirect verification outside browser-fetch limitations. |
| Mobile | Genuine mobile rendering captured by the main audit; performance causes separated from desktop video layout. |
| JavaScript | Main copy, links, canonicals and Yoast schema are present in server HTML. Video/chat interactions require JavaScript. |
| Schema | Existing Organization graph parses; no Product or LocalBusiness detected in the checked set. Grouped lower-priority identity/attribution enhancement only. |
| Security headers | Homepage response did not show HSTS, CSP, X-Frame-Options, X-Content-Type-Options or Referrer-Policy. Hosting hardening review is appropriate, not a proven SEO penalty or compromise. Test embed/forms/tracking compatibility before changing policy. |
| IndexNow | Implementation was not verified; no unsupported “missing” defect is asserted. |

No authenticated WordPress configuration, hosting logs, redirect rules or plugin emitters were inspected.
