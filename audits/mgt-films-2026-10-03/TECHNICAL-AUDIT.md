# MGT Films — technical audit

Read-only public crawl completed 3 October 2026: **414 requested URLs; 408 final200 responses; 6 final404s; 346 distinct successful HTML destinations.** All298 XML URLs and every eligible internal HTML target discovered in this crawl were checked; remaining queue0. There were62 requested redirect aliases. Robots was respected, with3 concurrent fetches and a1-second batch pause. No production changes or authenticated settings inspection.

## Priority1: fix two broken links used by current articles

| Broken URL | Verified replacement200 | Current referring pages |
|---|---|---|
| [/commercial-window-tinting-in-milwaukee/](https://mgtfilms.com/commercial-window-tinting-in-milwaukee/) | [/blog/commercial-window-tinting-in-milwaukee/](https://mgtfilms.com/blog/commercial-window-tinting-in-milwaukee/) | [Hotels](https://mgtfilms.com/blog/best-window-film-for-hotels/) — “commercial window film”; [Milwaukee guide](https://mgtfilms.com/blog/milwaukee-commercial-window-tinting-glare-uv-privacy/) — “commercial window tinting” |
| [/services/window-film-installation/](https://mgtfilms.com/services/window-film-installation/) | [/services/](https://mgtfilms.com/services/) — general installation/service hub | [Residential vs commercial](https://mgtfilms.com/blog/residential-vs-commercial-window-tinting/) and [Architectural resurfacing](https://mgtfilms.com/blog/architectural-resurfacing-chicago/) — “window film installation” |

Update the referring links to the direct live destinations and add exact301s from the two broken URLs after final intent approval. This is both source-link correction and redirect work; do not merely redirect without fixing the links.

Four additional404s occur only on the noindex legacy [new-home-page](https://mgtfilms.com/new-home-page/): `/services/about/`, `/services/central-states/`, `/services/indiana-locations/`, `/services/southern-region/`. These are lower-priority legacy cleanup, not four broken live-menu destinations. The verified Locations hub is a candidate for regional links, subject to current coverage confirmation. No verified About destination was found; retain that decision as unresolved rather than inventing a homepage redirect. Full8 source/anchor rows and decisions: `evidence/broken-link-map.csv`.

## Priority2: correct grouped schema and rendering problems

- **Schema:**7 malformed FAQ JSON-LD blocks on7 current pages;2 additional malformed business/organization blocks on a noindex legacy homepage; plus an unverified author `sameAs` placeholder on84 pages. See SCHEMA-REPORT.md for exact URLs and changes. No Product deletion is warranted.
- **Performance:** two independent mobile tests40/100 with4.80-second heading LCP and1.72–2.00-second TBT; criticalCSS/legacyplugin scripts and repeated reCAPTCHA initialization are the specific investigation routes. See PERFORMANCE-REPORT.md, not a generic image-compression recommendation.
- **Conversion paths:** content/browser reports document specific hash-only calls to action. Dropdown toggles are excluded; do not equate every `#` link with a broken destination.

## Sitemap and redirect hygiene

All298 sitemap requests finished200, but11 do so after301 redirects. Keep the legitimate redirects and remove their old entries from XML. The declared RankMath sitemap index is complete and accessible, not a single-homepage sitemap. See SITEMAP-AUDIT.md and actual chains in `technical-final-summary.json`.

## Indexing and metadata context

- Current [Contact](https://mgtfilms.com/contact-mgt-films/) is200, index/follow and self-canonical. `/contact/`301s there. An older GSC noindex snapshot must not be presented as its current source setting.
-59 distinct destinations are noindex:56 category/archive pages plus the legacy map, old sun-control page and old homepage. None is in XML. These deliberate/legacy exclusions are not blanket errors to reverse. No noindex HTTP headers were observed.
-26 distinct HTML destinations have no meta description; review useful indexable pages first. No emptyH1 pages were found. MultipleH1s in some guides are lower-priority editorial/template cleanup, not proof of a ranking penalty.
- One duplicate description spans the bird-deterrent Chicago guide/campus guide; content review determines intent overlap. Do not delete solely because metadata matches.

## Limits and evidence

This covers crawl-discovered public URLs, not undiscovered orphan URLs, authenticated admin configuration, all external destinations or all binary assets. No field CWV verdict is available. No synthetic SEO score is assigned.

Evidence: `crawl-pages.json`, `crawl-summary.json`, `inlinks.json`, `technical-final-summary.json`, `final-audit-statistics.json`, full hashed HTML under `evidence/html/`, and `broken-link-map.csv`. Redirect statuses are observed responses, not assumptions.
