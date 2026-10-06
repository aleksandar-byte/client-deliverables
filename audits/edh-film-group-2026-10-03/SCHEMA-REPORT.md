# EDH Film Group — structured data review

Read-only review of the JSON-LD saved in `evidence/crawl-pages.json`; final inventory and parser results are recorded in `evidence/schema-and-duplicates.json`. Syntax parsing is not a Google rich-result eligibility test.

All 259 saved responses include JSON-LD, with no syntax parse errors. They cover 254 distinct final URLs. There are 141 Article responses, 61 FAQPage responses, and 14 LocalBusiness/Service responses. **No Product nodes were found.** Counts are response-based and the inventory includes six redirecting aliases; do not treat every response as a unique page.

## One grouped schema improvement, below the content and speed fixes

The homepage has an existing Yoast graph linking WebPage, WebSite, Organization, logo and breadcrumbs. Preserve that graph; there is no reason to replace valid site-wide markup wholesale.

- **Correct the specific LocalBusiness address used on 14 pages.** The blocks identify EDH Film Group, homepage URL and phone `+1-708-485-8468`, but hardcode `addressLocality: Chicago`, `postalCode: 60601` with no street address. The verified matching Google profile lists **7408 W Archer Ave, Summit, IL 60501**, with the same phone. Confirm this is the intended main business entity, then use its accurate address and a stable shared ID; keep wider service areas separate from physical addresses. Raw exact nodes and every affected URL are in `evidence/technical-final-summary.json` under `localbusiness_nodes`; GBP evidence is `evidence/local-maps-summit.json`.

- **Correct the author entity type where the credited author is the business.** Sample article graphs name “EDH Film Group” but reference a `Person` node at `https://edhfilmgroup.com/#/schema/person/d7d767500b92556dccdc01d316213a62`. If EDH is the true credited author, use the existing Organization entity for the author, not a fictitious person. If an actual person wrote it, use that person's verified name/profile instead. Align the visible attribution with the graph. Example: [architectural window film article](https://edhfilmgroup.com/blog/architectural-window-films-chicago-il/). Google explicitly accepts either [Person or Organization as Article author](https://developers.google.com/search/docs/appearance/structured-data/article).
- **Review the old WebSite description with the location-copy cleanup.** The graph description refers only to “the Chicagoland area,” while the current site describes multiple markets. This is not invalid JSON or proof that the Chicago service area is false; align the saved site tagline with the approved actual footprint. Add location business entities only after confirming real offices/service areas, addresses, phone numbers and hours. Do not turn every service city into a physical branch.

No changes were made to WordPress, Yoast, Google Tag Manager or other emitters. The public source identifies the Yoast schema graph, but administrative field IDs/settings were not inspected. Check the generating configuration before implementation and validate the final graph after publication.

## Limits

FAQ markup does not establish general-business FAQ rich-result eligibility; do not promise enhanced search display. Parser success also does not validate visible FAQ/content parity on every page. No recommendation here removes a legitimate Product merely because the business sells services; any Product action would require specific inaccurate fields and page context.

## Pages with the Chicago 60601 LocalBusiness block

1. https://edhfilmgroup.com/home-solar-film/
2. https://edhfilmgroup.com/commercial-window-tinting/
3. https://edhfilmgroup.com/commercial-decorative-window-film/
4. https://edhfilmgroup.com/school-security-window-film/
5. https://edhfilmgroup.com/stained-glass-window-film/
6. https://edhfilmgroup.com/commercial-di-noc-film/
7. https://edhfilmgroup.com/decorative-home-window-film/
8. https://edhfilmgroup.com/st-louis-window-security-film-for-retail-stores/
9. https://edhfilmgroup.com/home-security-window-film/
10. https://edhfilmgroup.com/home-security-film-st-louis-mo/
11. https://edhfilmgroup.com/commercial-decorative-film-st-louis/
12. https://edhfilmgroup.com/security-window-film/
13. https://edhfilmgroup.com/commercial-window-tinting-tulsa-ok/
14. https://edhfilmgroup.com/decorative-window-film/
