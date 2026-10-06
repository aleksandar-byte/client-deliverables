# EDH Film Group — sitemap and redirect inventory

The live [robots file](https://edhfilmgroup.com/robots.txt) allows crawling and declares [sitemap_index.xml](https://edhfilmgroup.com/sitemap_index.xml). The index and both children returned 200: post sitemap **142 URLs**, page sitemap **117 URLs**, total **259 unique seeds**. All 259 requests were checked and ended in 200 HTML; they resolve to **254 distinct final URLs**.

The public sitemap is parseable, but **six entries redirect**. Replace these old XML entries and internal links with approved canonical destinations. Keep useful existing redirects; this is not an instruction to delete working destination pages.

| Current XML entry | Observed final destination | Decision |
|---|---|---|
| [/locations/window-tinting-dallas-tx/](https://edhfilmgroup.com/locations/window-tinting-dallas-tx/) | [/locations/texas/window-tinting-dallas/](https://edhfilmgroup.com/locations/texas/window-tinting-dallas/) | Use final indexable URL |
| [/locations/window-tinting-fort-worth-tx/](https://edhfilmgroup.com/locations/window-tinting-fort-worth-tx/) | [/locations/texas/window-tinting-fort-worth/](https://edhfilmgroup.com/locations/texas/window-tinting-fort-worth/) | Use final indexable URL |
| [/locations/window-tinting-tulsa-ok/](https://edhfilmgroup.com/locations/window-tinting-tulsa-ok/) | [/locations/oklahoma/window-tinting-tulsa/](https://edhfilmgroup.com/locations/oklahoma/window-tinting-tulsa/) | Use final indexable URL |
| [/locations/window-tinting-st-louis-mo/](https://edhfilmgroup.com/locations/window-tinting-st-louis-mo/) | [/locations/missouri/window-tinting-st-louis/](https://edhfilmgroup.com/locations/missouri/window-tinting-st-louis/) | Final page is noindex/nofollow; decide intent owner before replacing XML entry |
| [/locations/oklahoma/](https://edhfilmgroup.com/locations/oklahoma/) | [/locations/oklahoma/window-tinting-oklahoma-city/](https://edhfilmgroup.com/locations/oklahoma/window-tinting-oklahoma-city/) | Check state-to-city intent, then use approved final destination |
| [/locations/window-tinting-des-moines/](https://edhfilmgroup.com/locations/window-tinting-des-moines/) | [/window-film-in-des-moines-home/](https://edhfilmgroup.com/window-film-in-des-moines-home/) | Confirm home/commercial intent, then use approved final destination |

The St. Louis noindex is genuine HTML, not a crawler challenge. See the technical report for exact evidence and the alternative commercial page. Do not add that noindexed final URL to XML before resolving its intended role.

GSC reports the sitemap was downloaded October 2, 2026 with zero errors/warnings and 255 submitted web URLs. That fetched snapshot differs from the live 259-URL inventory; it is not evidence of four failed pages. Its legacy `indexed: 0` summary is not a reliable assertion that nothing is indexed; use URL-level inspection and performance data instead.

## Remaining coverage

The crawler followed redirects automatically, so intermediate redirect status codes/hop chains were not preserved. Verify exact one-hop permanent redirect configuration before implementing a change. No final 404 was found among these seeds, but 159 additional internal targets remain unchecked. `evidence/unverified-extra-links.json` is the follow-up source list, not a list of confirmed errors. No new redirects or sitemap submissions were made.
