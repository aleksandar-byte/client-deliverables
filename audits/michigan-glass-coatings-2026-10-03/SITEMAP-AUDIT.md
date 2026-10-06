# Michigan Glass Coatings — sitemap audit

Fresh public XML and robots retrieval, October 3, 2026. All listed XML files returned 200 through ordinary browser access.

## Main finding: the declared sitemap is incomplete

[robots.txt](https://michgc.com/robots.txt) advertises [sitemap.xml](https://michgc.com/sitemap.xml), a 415-byte XML sitemap containing **only the homepage**. The GSC snapshot also shows this one-URL submission. The functioning [Yoast sitemap index](https://michgc.com/sitemap_index.xml) contains eight children; `/wp-sitemap.xml` redirects to that index.

Update the robots sitemap declaration and submit the reviewed full Yoast index in Search Console. If retiring the static single-URL sitemap, preserve a sensible route from its old URL to the full index. Check generated sitemap settings rather than manually maintaining hundreds of URL entries. This is an implementation recommendation only; no submission or live change was made.

## Live index inventory

| Child sitemap | URL entries |
|---|---:|
| [Posts](https://michgc.com/post-sitemap.xml) |151|
| [Pages](https://michgc.com/page-sitemap.xml) |42|
| [Portfolio](https://michgc.com/x-portfolio-sitemap.xml) |17|
| [Categories](https://michgc.com/category-sitemap.xml) |23|
| [Post tags](https://michgc.com/post_tag-sitemap.xml) |215|
| [Portfolio tags](https://michgc.com/portfolio-tag-sitemap.xml) |44|
| [Portfolio categories](https://michgc.com/portfolio-category-sitemap.xml) |5|
| [Authors](https://michgc.com/author-sitemap.xml) |2|

The children contain **499 entries / 498 unique URLs**. The duplicate count is an inventory property, not proof of duplicate content. All files are well below the 50,000-URL limit. The declared homepage entry overlaps this fuller inventory.

## URL validation and boundaries

The combined crawl checked 500 internal requests. **436 of the 498 XML URLs were fetched**, all ending HTTP 200; **62 XML URLs remain unchecked** because of the cap. There are 103 discovered queue URLs left overall. Do not label the whole sitemap fully validated or every URL indexed.

No noindex was found in fetched successful HTML. Two confirmed 404s came from malformed internal links, not the fetched XML entries. They have a separate source/replacement map in the technical report. Most of the expanded index is taxonomy/archive content; review those archives for useful distinct landing-page value and GSC performance before pruning. Do not automatically remove every tag archive or duplicate-title pagination page.

The homepage footer's `/html-sitemap/` link opens a directory listing, not this XML index. Repair that user-facing link separately. Source records: `evidence/sitemap.json`, `browser-crawl-sources.json`, `sitemap-alternates.json`, `sitemap_index.xml.txt`, and `google-gsc-sitemaps.json`.

Lastmod dates were collected but not independently verified against editing history. Actual Google indexation and redirect hop status require their own evidence; this audit did not infer them from sitemap membership.
