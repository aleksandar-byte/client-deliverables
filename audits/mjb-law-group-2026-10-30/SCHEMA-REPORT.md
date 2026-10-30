# Structured-data audit — MJB Law Group, APC

Evidence date: October 30, 2026. Domain: https://mjbfirm.com/. Initial response HTML, not a remote rich-results validation.

## Coverage

- 147 successful HTML response records; 135 distinct final HTML URLs. All JSON-LD scripts were parsed; 0 syntax errors found.
- Detected typed nodes (including embedded/nested nodes, not unique businesses): {"WebSite": 10, "Organization": 86, "ContactPoint": 1, "Article": 85, "WebPage": 353, "Person": 85, "ImageObject": 170, "BreadcrumbList": 134, "ListItem": 268}.
- Microdata detected on 0 pages; RDFa typeof on 0 pages. This does not treat ordinary OpenGraph property attributes as schema RDFa.

## One consolidated schema finding

### Article → author → Person: firm brand is represented as a person

85 Article objects name their author `MJB Firm` while typing the author `Person`. This is an entity-type mismatch, not a JSON syntax failure. The author URL varies among WordPress author archives; see every affected URL/script in [schema-corrections.json](evidence/schema-corrections.json).

Example: https://mjbfirm.com/administrative-exemption-california/ has `author: {"@type":"Person","name":"MJB Firm","url":"https://mjbfirm.com/author/seo-serp/"}`.

Fresh rendered evidence from the performance specialist shows a genuine visible `Reviewed by: Michael J. Berry` section linking https://mjbfirm.com/michael-j-berry/. Do not claim the article lacks a reviewer. Do not convert the reviewer into the sole author without confirming actual authorship.

Recommended narrow correction: if these are genuinely firm-authored articles, replace the author node with `{"@type":"Organization","@id":"https://mjbfirm.com/#organization","name":"MJB Law Group, APC","url":"https://mjbfirm.com/"}`. Keep the genuine reviewer association separate where supported by the publishing system. If an individual really authored an article, use that confirmed individual's accurate Person instead.

Where to find it: the shared article JSON-LD generating source, specifically `Article.author`. The exact WordPress plugin, schema record, Code Snippets entry or GTM emitter has not been authenticated; none is invented here. Match type/fields, not script number alone.

### Keep existing valid schema

- Homepage `WebSite` has stable `#website` and publisher `#organization`; the homepage Organization defines that exact ID, correct firm name, phone +19492660880, and absolute logo/social URLs.
- BreadcrumbList is present on the checked pages and should remain.
- Preserve correct Article headlines, dates, image objects and publishing context.
- No Product, Offer, Dentist, self-serving AggregateRating or malformed price block was detected. There is no basis to copy a dental Product-removal task into this audit.

### Optional enrichment, not a broken-data claim

No LegalService/Attorney business node or standalone attorney Person/ProfilePage was detected. An accurate LegalService entity at the verified Tustin address and a Michael J. Berry Person on his biography would improve specificity. Keep the stable firm identity and verify GBP details before generating a replacement; do not delete the working Organization simply because a more specific type is possible. This is an opportunity, not proof of a ranking problem or rich-result entitlement.

## Evidence and limitations

- All schema nodes (supporting evidence retained privately), detection and article authors (supporting evidence retained privately), [correction map](evidence/schema-corrections.json).
- Raw HTML for every requested response is retained under evidence/html; filenames map through crawl-pages.json.
- Initial HTML detection can miss tags added only after JavaScript. Browser evidence is supplementary; no admin access or CMS changes were performed.
- No unsupported 2.5x AI-citation claims, penalty claims or fabricated validation score is used.
