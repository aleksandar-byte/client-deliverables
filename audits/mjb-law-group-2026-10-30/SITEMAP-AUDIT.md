# Sitemap audit — MJB Law Group, APC

Checked October 30, 2026. Domain: https://mjbfirm.com/.

## Discovery and validation

Robots points to https://mjbfirm.com/sitemaps.xml. The index and both child XML files are accessible. Common alternative sitemap routes were checked and may redirect to that index; these are aliases, not extra unique sitemap datasets.

- https://mjbfirm.com/sitemaps.xml → https://mjbfirm.com/sitemaps.xml: HTTP 200; XML parse successful.
- https://mjbfirm.com/sitemap_index.xml → https://mjbfirm.com/sitemaps.xml: HTTP 200; XML parse successful.
- https://mjbfirm.com/wp-sitemap.xml → https://mjbfirm.com/sitemaps.xml: HTTP 200; XML parse successful.
- https://mjbfirm.com/post-sitemap1.xml → https://mjbfirm.com/post-sitemap1.xml: HTTP 200; XML parse successful.
- https://mjbfirm.com/page-sitemap1.xml → https://mjbfirm.com/page-sitemap1.xml: HTTP 200; XML parse successful.

There are **127 unique same-domain page URLs** extracted from direct sitemap URL entries (not image locs). Child sitemap raw .//loc counts also include image URLs, so those diagnostic counts must not be called page counts. URLs are HTTPS and the files are comfortably below protocol limits. Lastmod values vary; variation alone does not prove editorial accuracy, and content-change histories were not authenticated.

- Sitemap URLs fetched: 127/127.
- Non-200 final responses: 0.
- Noindex sitemap pages: 0.
- Sitemap entries with redirect chains: 0.
- Sitemap orphan candidates after this scoped crawl: 0. Do not assume sitemap inclusion alone gives an ordinary user a navigable path.

## HTML discoveries outside sitemap

- https://mjbfirm.com/blog/page/2/
- https://mjbfirm.com/blog/page/3/
- https://mjbfirm.com/blog/page/9/
- https://mjbfirm.com/blog/page/4/
- https://mjbfirm.com/blog/page/5/
- https://mjbfirm.com/blog/page/8/
- https://mjbfirm.com/blog/page/7/
- https://mjbfirm.com/blog/page/6/

Many omitted HTML URLs can be pagination/author/utility paths; do not add each automatically. Confirm intended canonical/indexing role first. Related broken historical article routes belong in the grouped link/redirect task, not the XML sitemap if they were not listed there.

## Decisions

No XML replacement sitemap or page rebuild is warranted solely from this crawl. Keep the working XML index. Review any canonical archive findings independently. Search Console sitemap submission state is covered by the Google specialist; public XML availability does not establish submission status or indexed counts.

## Sources and limitations

evidence/sitemap.json and saved sitemap-*.xml; evidence/crawl-pages.json; evidence/technical-analysis.json; evidence/crawl-url-inventory.csv. Full inlinks and depths are provided for scope, not as proof of organic demand. No external write or sitemap regeneration was performed.
