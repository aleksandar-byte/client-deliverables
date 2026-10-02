# Campbell Window Film — XML sitemap audit

October 2, 2026, fresh ordinary-browser request evidence. [Robots](https://campbellwindowfilm.com/robots.txt) references [sitemap_index.xml](https://campbellwindowfilm.com/sitemap_index.xml). The index and both child documents returned200; the browser source preserves exact XML. [Post sitemap](https://campbellwindowfilm.com/post-sitemap.xml) contains176URLs; [page sitemap](https://campbellwindowfilm.com/page-sitemap.xml) contains116URLs, **292unique seed URLs** total.

| Test | Result |
|---|---|
| URL responses checked | 292 of292 |
| Successful HTML responses | 292 |
| Non200 XML URLs | 0 |
| Noindex XML URLs | 0 |
| Canonical exceptions | 0 |
| Pending XML URLs | 0 |

The files are well below the50,000URLlimit. Individual lastmod values were not reconciled against WordPress revision history; freshness accuracy is unverified. The server's initial anti-bot response was not sitemapXML and was not classified as broken XML once normal access succeeded.

Robots excludes WordPress admin/login, search and trackback patterns while allowing CSS/JS/uploads. It explicitly permits the listed AI crawlers. This describes directives, not actual access for every crawler. Captured robots: `evidence/robots-verified.txt`.

Exceptions requiring attention:
- None detected in the checked scope.

Do not regenerate or replace a healthy XML sitemap merely because the initial audit client was challenged. If a verified URL is retired during later implementation, remove it from XML and use a relevant redirect only where a real replacement exists.
