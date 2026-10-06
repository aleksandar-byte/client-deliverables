# EDH Film Group — technical audit

Read-only public-source audit completed October 3, 2026 local time. Ordinary browser access initially met a SiteGround challenge; passive normal loading later succeeded. No challenge was solved or bypassed, no credentials were used, and no website settings changed.

## Coverage

- **259 XML-seeded requests completed; all final responses were HTTP 200 HTML.** Six requested URLs redirected; the responses represent **254 distinct final URLs**, not 259 distinct indexable pages.
- **253 distinct final pages had index/follow and self-canonicals.** One genuine St. Louis destination had noindex/nofollow and no canonical. This was not a challenge response.
- Robots allows crawling and advertises the working sitemap index. Final crawl used three parallel requests with a one-second pause between batches, below the 500-page cap.
- **159 additional internal link targets** outside the fetched seed set remain unverified, including query variants/archives. They are listed with referring sources in `evidence/unverified-extra-links.json`; do not label them broken. No blanket assertion that the entire site has zero 404s is supported.

## Priority technical actions

### 1. Resolve the St. Louis destination and sitemap conflict

[Old St. Louis URL](https://edhfilmgroup.com/locations/window-tinting-st-louis-mo/) redirects to [the current location page](https://edhfilmgroup.com/locations/missouri/window-tinting-st-louis/). That genuine 1,534-word service page returns 200 but explicitly publishes `noindex, nofollow` and has no canonical. It is not SiteGround content; public source also identifies WordPress page 8307. The XML still lists the old redirecting URL.

Decide which St. Louis page should own this intent alongside [the newer commercial page](https://edhfilmgroup.com/st-louis-commercial-window-film/). If the location hub should rank, remove its accidental noindex and add its self-canonical; if intentionally retired, point old links/redirects to the approved indexable replacement instead. Update the sitemap after that decision. Do not blindly make all overlapping URLs indexable.

### 2. Fix specific mobile-loading causes

Two independent Google mobile lab tests scored 31/100, with simulated LCP 35.6–39.1 seconds. The initial hero is discovered late while inactive slides and below-fold media also load. Use `PERFORMANCE-REPORT.md` for the exact first-slide URL, request timing, Vimeo ID, bytes and safe implementation routes. CLS is already low; no real-user CWV verdict was available.

### 3. Update old internal destinations and XML entries

Six XML URLs redirect to live destinations. See `SITEMAP-AUDIT.md` for the exact map. Update internal hrefs and sitemap output to the approved final URLs; retain redirects that serve existing external links. Response collection followed redirects and did not preserve their individual status/hop chain, so the map does not claim every hop is a verified 301.

### 4. Correct the wrong-city metadata and prioritize meaningful metadata gaps

[Round Rock, Texas](https://edhfilmgroup.com/locations/texas/window-film-in-round-rock-texas/) has a Round Rock H1 but the title “Window Film Installation Broken Arrow, OK | EDH Film Group” and a Broken Arrow description. Correct the title/description to the page's real market; do not treat this as harmless exact duplicate metadata.

After de-duplicating redirect destinations, 29 distinct final pages have no meta description. Prioritize substantive product/service pages over legal/utility pages. Three distinct pages have no nonempty H1: the Missouri state page, Texas state page and St. Louis retail security article. Multiple H1s elsewhere warrant semantic cleanup, not an unsupported ranking-penalty claim. Full rows are in `crawl-summary.json` and `technical-final-summary.json`.

## Important corrections and limitations

- **Contact is currently index/follow and self-canonical**, HTTP 200 at [Contact](https://edhfilmgroup.com/contact/). GSC's excluded-noindex result is based on a November 24, 2025 crawl. Do not create a current “remove Contact noindex” task from that old snapshot; verify and request recrawl only through an authorized workflow.
- The current [commercial market page](https://edhfilmgroup.com/commercial-market/) is also index/follow/self-canonical. The unknown-to-Google report for `/commercial/` refers to a different URL.
- The parser's raw duplicate list includes redirected aliases. Distinct final URLs leave two title-duplicate pairs and three description-duplicate groups; not all are competing content. Fort Worth decorative/general-vs-home intent should be reviewed, not automatically merged.
- No authenticated WordPress/plugin/hosting settings or server logs were inspected. Saved public HTML can identify symptoms but not every emitting admin field. No overall score is fabricated from incomplete rubric evidence.

Evidence: `crawl-pages.json`, `crawl-summary.json`, `technical-final-summary.json`, `browser-crawl-sources.json`, `inlinks.json`, saved `html/`, genuine rendered samples and raw Google lab responses.
