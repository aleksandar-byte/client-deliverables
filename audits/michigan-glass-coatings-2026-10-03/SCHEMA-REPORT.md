# Michigan Glass Coatings — structured data

Read-only inspection of fresh saved source. The homepage contains a validly parsed Yoast graph connecting Organization, WebSite, WebPage, ImageObject and BreadcrumbList. These should be preserved. The homepage has no Microdata or RDFa types. Final JSON-LD counts and exact author values are saved in `evidence/schema-and-duplicates.json`.

At the 500-request cap, 447 saved responses contain JSON-LD: 149 Article responses, 241 CollectionPage responses and 13 FAQPage responses. There are no JSON syntax parse errors and no Product or LocalBusiness nodes in this checked set. These are response counts, not unique indexed-page counts; one content alias redirects to another fetched page.

## One grouped, lower-priority schema improvement

- **Add a verified local business identity to the existing graph, not a second conflicting business.** No LocalBusiness was detected in the checked source inventory. Link the real business/location entity to the current Organization using a stable ID, verified address, phone and hours. Use the exact matching GBP records documented in the local audit; distinguish physical offices from service cities. Do not create a physical address for every location landing page.
- **Clean up article attribution where account labels are exposed.** Some Article authors use a WordPress account email instead of a reader-friendly verified name. Confirm the actual author or organization, update the public byline/profile and matching schema together, and preserve genuine authors already named correctly. Do not invent credentials or recast every writer as a company executive.

No Product markup was detected in the reviewed inventory, so there is no evidence-backed Product-removal task. No invalid JSON-LD syntax was found in the parsed set. FAQ markup is present on some pages but does not promise Google FAQ rich results for this commercial business. No hosted rich-result validation or authenticated plugin settings inspection was performed.

The higher-impact current tasks are the wrong customer routes, incomplete declared sitemap, homepage performance and confirmed broken internal links. Schema is a separate grouped enhancement, not an emergency replacement of all existing markup. No live changes or implementation-ready replacement code were published.
