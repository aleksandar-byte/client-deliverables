# EDH Film Group — full SEO audit

October 3, 2026 · https://edhfilmgroup.com/ · Prepared for Alex and Nick · Read-only

## Summary for Nick

EDH has useful product, commercial/residential, location and educational coverage. The immediate opportunity is to finish and correctly connect what exists, improve first-screen loading, and make enquiry reporting trustworthy—not publish another broad batch of pages. Six specific issues appear in the [HTML presentation](presentation/EDH-FILM-GROUP-SEO-AUDIT-PRESENTATION.html); this report retains the wider context, decisions and access limits.

The site received 126 Google clicks versus 157 in the preceding 30 days. The Low-E guide alone fell from 64 to 35 clicks; that identifies where to investigate, not why the decline happened. Organic engagement improved while sessions fell. Neither traffic movement nor zero organic key events proves zero qualified enquiries.

## Scope and confidence

- 259 XML sitemap URLs inventoried and fetched in a recovered ordinary-browser crawl, resolving to 254 distinct final URLs. All returned final HTTP 200; one genuine St. Louis page is noindex/nofollow. Initial SiteGround challenges were resolved without bypassing them. Additional representative normal-browser pages were reviewed separately; external and non-sitemap targets are not exhaustively verified.
- Fresh desktop/mobile homepage rendering, Google mobile/desktop lab tests, GSC and GA4 reporting, sampled Google URL inspection, exact Summit GBP and bounded keyword/Ahrefs context.
- GSC/GA4: August 31–September 29 versus August 1–30, adjacent equal periods, not weekday matched. GA4 property 460123593, GSC https://edhfilmgroup.com/. Current records API rejected access; identity used the dated September 22 record snapshot and verified live Google properties.
- Ahrefs September 29 audit is historical context, not today's crawl: Health Score 91, 136 error URLs among 1,486 URLs. API use: 494 units. No synthetic overall SEO score assigned.
- No website, GBP, tracking, Search Console, tickets or skills changed. No live form submission. Qualified leads, GBP Insights and local grid results are unavailable.

## Priority findings and exact changes

### 1. Prioritize the first hero slide

Mobile lab: 31/100, simulated LCP 39.14 seconds, TBT 1,987 ms; a later independent mobile run again scored 31/100 with LCP 35.6 seconds. Desktop: 34/100, LCP 7.18 seconds, TBT 3,245 ms. CLS is low. An immediate repeat was cached and excluded; field data was unavailable. Do not tell a client every visitor waits 39 seconds.

Actual LCP is the `.hero-slide` background, [slider-1.jpg](https://edhfilmgroup.com/wp-content/uploads/2026/03/slider-1.jpg), 190,163 bytes. Its request begins at 3.485 seconds in the observed trace, with 3.366 seconds resource-load delay; all five slides start together and transfer 1.493 MB. The first slide is not discoverable in initial HTML. Exclude it from lazy initialization, expose/preload the actual responsive first image and defer inactive slides. Do not preload all five.

The below-fold Vimeo player loads about 4.48 MB in three media responses; defer it until near view or use a poster/click-to-play. The visible player replaces a hidden native video, so this is not an unused-hidden-video finding. Below-fold [Group-80.jpg](https://edhfilmgroup.com/wp-content/uploads/2025/07/Group-80.jpg) is 941,112 bytes and starts before the hero: optimize and delay it. Review reCAPTCHA/bundled JS only after locating dependencies; preserve forms, tracking, menus and visualizer. [Performance details](PERFORMANCE-REPORT.md) · [Image details](IMAGES-REPORT.md).

### 2. Finish the About team section

[About EDH](https://edhfilmgroup.com/about-edh/) contains seven Lorem ipsum blocks and six placeholder bios: Matt, Mark, Luke, John, Ruth and Seth, using repeated template imagery. Replace with client-confirmed people, roles, photos and experience; remove the unfinished section temporarily if unavailable. Do not invent staff credentials. Source: fresh rendered HTML; `.p-about` and `.x-promo-content`.

### 3. Correct four commercial security links

On [Commercial](https://edhfilmgroup.com/commercial-market/), four buttons currently open `/products/solar-window-film/`:

| Button | Selector | Correct existing destination |
|---|---|---|
| S800 | `.e8460-e35` | [/products/security-window-film/](https://edhfilmgroup.com/products/security-window-film/) |
| S1400 | `.e8460-e41` | [/products/security-window-film/](https://edhfilmgroup.com/products/security-window-film/) |
| S2400 | `.e8460-e47` | [/products/security-window-film/](https://edhfilmgroup.com/products/security-window-film/) |
| Riot Glass | `.e8460-e53` | [/products/security-glass/](https://edhfilmgroup.com/products/security-glass/) |

Edit the hrefs directly. No redirect is needed between these valid product pages. Ensure destination copy explains the named options.

### 4. Confirm and correct Tulsa directory information

The [Locations](https://edhfilmgroup.com/locations/) Tulsa card repeats Oklahoma City's 100 NE 5th St address; [its map](https://maps.app.goo.gl/ypi9zZxexMXg8HUr6) resolves to Oklahoma City. Confirm the real Tulsa address/map or service-area-only status, then correct the card. Do not guess a street address. Do not use earlier cached phone observations as a duplicate-phone finding.

The exact Summit GBP is 7408 W Archer Ave, Summit IL 60501, (708) 485-8468, Monday–Friday 9 AM–6 PM, weekends closed; rating 5.0/9 at collection. Contact hours match. The homepage's central 833 number is not automatically wrong; preserve legitimate routing/tracking. Confirm whether Summit/Chicago should appear as a visiting office or service region. [Local details](LOCAL-AUDIT.md).

### 5. Repair the traffic-bearing Low-E guide

[The guide](https://edhfilmgroup.com/blog/window-film-for-double-pane-low-e-windows/) earned 35 clicks and 4,585 impressions. Remove the closing editing instruction, “Let me know if you’d like meta tags or internal linking suggestions next,” and finish the cut-off warranty sentence ending “certified de.” Keep the useful educational intent and URL. Validate warranty wording before publication and consolidate repeated FAQs if confirmed. This residue is not evidence of authorship or the cause of traffic loss.

### 6. Align the phone key event

GA4's configured phone key event is `phone_click`; actual reporting records `phone_number_link_click`, with 104 clicks across channels, including five organic, but no corresponding key-event credit. Inspect the intended GTM/GA4 mapping, align one event and test without double counting. `form_submit` still reports 56 current all-channel events/key events, so forms are not universally unmeasured. Clicks are not connected calls or qualified leads. [Google evidence](GOOGLE-AUDIT.md).

## Additional actionable content work

The [Residential hub](https://edhfilmgroup.com/residential-market/) repeats the same energy-efficiency block about St. Louis commercial buildings twice and discusses commercial spaces in the solar section. Rewrite those exact blocks for homeowners; check both responsive variants. This is an audience mismatch, not a blanket objection to regional copy.

Review the Dallas responsive hero for Des Moines copy before making it a confirmed visible defect. Check Solar product FAQ repetition and placeholder Related Services links against fresh DOM. These remain review candidates, not ready-to-implement blanket redirects. [Content audit](CONTENT-AUDIT.md) · [Visitor experience](SXO-AUDIT.md).

## Search, architecture and wider strategy

**Current St. Louis indexing decision:** the sitemap's old [/locations/window-tinting-st-louis-mo/](https://edhfilmgroup.com/locations/window-tinting-st-louis-mo/) redirects to [/locations/missouri/window-tinting-st-louis/](https://edhfilmgroup.com/locations/missouri/window-tinting-st-louis/), which has genuine service content but explicit `noindex, nofollow` and no canonical. Confirm whether this should be the indexed city hub or whether another St. Louis page owns that intent. If retained for search, remove the block, add a self-canonical, update sitemap/inlinks to the final URL and verify Google recrawl. If intentionally excluded, remove the redirecting old URL from the XML sitemap and route visitors to the intended indexed hub. Do not simply index every overlapping city page.

**Current metadata and XML cleanup:** six sitemap entries redirect; use the complete map in SITEMAP-AUDIT.md rather than guessed replacements. The [Round Rock page](https://edhfilmgroup.com/locations/texas/window-film-in-round-rock-texas/) has a Round Rock heading but Broken Arrow, OK title/description: correct those fields to the actual page market. Twenty-nine distinct final pages lack descriptions; prioritize substantive product/service pages, not every utility URL. Two title-duplicate pairs and three description groups remain after redirect deduplication, and require intent review before merging. There are 159 additional internal targets not checked; they are not confirmed broken URLs.

Homepage and Low-E guide generate 80/126 clicks (63.5%). Preserve useful compatibility/privacy guides and connect them naturally to relevant installation help. Distinct solar, security film, security glass, privacy, bird safety and switchable film pages are meaningful—not automatically duplicate intent. Prioritize commercial/regional query opportunities using existing page ownership before expanding. [Keyword opportunities](KEYWORD-OPPORTUNITIES.md).

Google samples: homepage, Locations and Low-E guide indexed with matching canonicals. Commercial and Contact inspections reported historical noindex observations, last crawled June 2026 and November 2025 respectively. Both now render index/follow and self-canonical: those old observations are not current defects. Verify Google's next crawl through an authorized SEO workflow. Do not remove intentional noindex blindly. GSC sitemap reports zero errors/warnings; 255 submitted URLs versus fresh XML 259 is not alone evidence of a defect. See [current technical audit](TECHNICAL-AUDIT.md) and [sitemap audit](SITEMAP-AUDIT.md) for redirects and metadata scope.

Homepage uses a Yoast WebPage/Breadcrumb/WebSite/Organization graph. There are zero Product nodes across the 259 responses: no Product-removal task is supported. Fourteen LocalBusiness blocks hardcode Chicago IL 60601 without a street, using the same 708-485-8468 entity whose verified GBP is 7408 W Archer Ave, Summit IL 60501. Correct the emitting entity to the verified office data; do not invent branches for every city. Also review geographical wording and the Article author node typed Person despite crediting the EDH business. Use an Organization author where the brand is credited, not a fabricated person. Keep valid graph components. [Grouped schema review and affected URLs](SCHEMA-REPORT.md). Historical Ahrefs reports four redirect canonicals and six sitemap redirects: use current examples and targets before assigning implementation.

Backlink counts are retained in Google context only; they do not establish toxicity and are not a presentation task. Improve business/entity clarity with confirmed installation case studies—problem, city, selected system, approved photos and outcome—rather than invented expert attribution or unsupported safety/performance claims.

## Handoff

Use [ACTION-PLAN.md](ACTION-PLAN.md) for implementation and decisions. The HTML is intentionally minimal and contains real homepage capture plus clearly labeled diagnostic cards, not fabricated screenshots. Raw evidence remains local; do not publicly upload authenticated API responses or client-record snapshots.
