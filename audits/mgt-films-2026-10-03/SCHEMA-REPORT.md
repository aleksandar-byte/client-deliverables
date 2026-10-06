# MGT Films — grouped schema finding

Read-only saved HTML from3 October2026. Across346 distinct successful HTML destinations,332 have parseable Organization/WebSite graphs;190 have BlogPosting,86 Article,83 parseable FAQPage and56 CollectionPage. No Product or parseable LocalBusiness node was detected; a malformed LocalBusiness block exists on the noindex legacy homepage. Fourteen legacy destinations lack JSON-LD. Absence is not automatic invalidity and does not justify deleting valid markup.

## One grouped correction task

1. **Fix malformed FAQ JSON strings** on the7 current indexable pages below. Literal line breaks occur inside quoted answer strings, making those FAQ blocks invalid JSON. Serialize with a JSON encoder (escaped `\n`) or use a valid single-line answer string. Preserve the matching visible FAQ meaning. Correct the generating source, then parse every resulting script.
2. **Remove the unverified `sameAs: ["https://ere"]` from the Jasper Cereno Person node** on84 distinct pages. Example [homepage](https://mgtfilms.com/), Person ID `https://mgtfilms.com/author/jasperkamunlimited-com/`. Replace it only with a verified real profile. Do not delete the whole Organization/WebSite graph.
3. **Review Article markup on nonarticles:** the homepage and service/location pages are represented as Article. Use accurate WebPage/service/business entities for those page types, while retaining real BlogPosting markup and actual verified attribution. This is semantic cleanup, not a claim that all Article markup is a parser error or that a business result is guaranteed.

### Exact current pages with broken FAQ JSON-LD

- [Deerfield](https://mgtfilms.com/window-tinting-deerfield-il/) — second JSON-LD script, answer to “How much does window tinting cost?” contains unescaped multiline text.
- [Naperville](https://mgtfilms.com/window-tint-services-naperville-illinois/) — second JSON-LD script.
- [Decatur](https://mgtfilms.com/window-tinting-decatur-il/) — second JSON-LD script.
- [Cloaking film](https://mgtfilms.com/cloaking-window-film/) — second JSON-LD script.
- [Two-way mirror film](https://mgtfilms.com/two-way-mirror-film-installation/) — second JSON-LD script.
- [Contractors](https://mgtfilms.com/window-tinting-for-contractors/) — second JSON-LD script.
- [Roman shades](https://mgtfilms.com/custom-roman-window-shades/) — second JSON-LD script.

Two additional invalid scripts exist on the **noindex legacy** [new-home-page](https://mgtfilms.com/new-home-page/): script2 is LocalBusiness and script3 is Organization. Decide whether to retire that page before spending time repairing its legacy business data. Total:9 invalid blocks on8 distinct pages. Match entity/content as well as script positions, since positions can change.

## Optional enrichment, after facts are verified

Create consistent Organization/location IDs using each genuine office’s verified name, address, phone and hours. Do not copy one office’s data across all city/service-area pages. No office schema should claim a staffed address without verification. Avoid invented reviews, ratings, prices or author credentials. FAQ markup on this commercial site does not imply Google FAQ-rich-result eligibility.

Evidence: `schema-and-duplicates.json`, `final-audit-statistics.json` (all84 placeholder URLs and parse-error locations), full HTML under `evidence/html/`. Source-level parsing was performed; hosted Rich Results Test, schema validator and authenticated emitter settings were not inspected. No schema was changed.
