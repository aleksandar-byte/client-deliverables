# MGT Films — sitemap audit

On 3 October2026, robots.txt correctly declared [sitemap_index.xml](https://mgtfilms.com/sitemap_index.xml). The index and all3 children returned200 and parsed as valid XML: post-sitemap.xml, page-sitemap.xml and our_service-sitemap.xml.

**298 unique sitemap URLs checked. All finished200;11 were301 aliases; no sitemap URL had a current noindex directive.** Final200 is not the same as a direct200, and indexability is not proof Google has indexed a page.

## Remove these301 aliases from the generated XML

| Existing XML path | Observed301 destination |
|---|---|
| `/window-tinting-wisconsin/` | `/locations/milwaukee/` |
| `/contact/` | `/contact-mgt-films/` |
| `/window-tint-services-baton-rouge-louisiana/` | `/locations/baton-rouge/` |
| `/locations-mgtfilms/` | `/locations/` |
| `/residential-market/` | `/residential-window-films/` |
| `/landing-central-missouri/` | `/` |
| `/energy-savings-products/` | `/our-services/energy-savings-products/` |
| `/security-products/impact-protection/` | `/our-services/safety-and-security/` |
| `/security-products/ultra-res/` | `/our-services/ultra-res-2/` |
| `/security-products/ultra-com/` | `/our-services/ultra-com/` |
| `/security-products/solar-safety-security-window-film-for-residential/` | `/our-services/safety-and-security/` |

Keep the redirects; remove legacy aliases from the sitemap generator so it lists direct200 canonical pages. The central-Missouri-to-homepage mapping deserves separate relevance review before any redirect change; this sitemap cleanup does not authorize changing it.

The complete crawl checked414 URLs and ended with no remaining eligible internal HTML targets. Six404s were discovered outside XML; their full referring-page map is in `evidence/broken-link-map.csv`. Fifty-nine noindex archive/legacy destinations are excluded from XML; do not add them automatically.

No sitemap, robots file or Search Console submission was changed. Evidence: `sitemap.json`, `xml-validation.json`, `robots-verified.txt`, `final-audit-statistics.json`, actual response chains in `technical-final-summary.json`.
