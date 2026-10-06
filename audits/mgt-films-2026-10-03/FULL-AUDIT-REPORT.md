# MGT Films — full SEO audit

October 3, 2026 · https://mgtfilms.com/ · prepared for Alex / Nick · read-only.

## Executive context

MGT has a substantial existing installation-service site and educational library. The priority is repairing specific visitor paths, inherited template output and enquiry measurement—not deleting useful articles or rebuilding everything. Search traffic fell in the adjacent 30-day comparison, but this audit does not prove which change caused that decline. No website, GBP, tracking or ticket changes were made. The [minimal HTML presentation](presentation/MGT-FILMS-SEO-AUDIT-PRESENTATION.html) highlights seven findings; this file preserves the wider evidence and decisions for Nick. See the [implementation plan](ACTION-PLAN.md).

## Coverage and evidence

Fresh crawl: 414 requested routes, 408 final HTTP 200 responses and six final HTTP 404s; 346 distinct successful HTML destinations after redirects. All 298 XML sitemap entries were checked. The discovered queue finished, with no remaining queued URLs. This is a bounded public-link crawl, not authenticated WordPress inventory. Requested aliases must not be counted as distinct pages. Technical reports reconcile response chains and sitemap aliases. Two genuine mobile Google lab runs and one desktop run were collected. Initial normal-browser homepage screenshots succeeded; later section captures encountered a site challenge, which was not bypassed. Source findings are not disguised as website screenshots.

Google identity was resolved from Client Records and verified live: GA4 property 497326494, exact hostname mgtfilms.com, GSC property https://mgtfilms.com/. No second-client hostname was observed. Periods are August 31–September 29 versus August 1–30, 2026, adjacent 30-day periods—not weekday-matched reporting. GSC/GA4 dates, scope and limitations are detailed in [GOOGLE-AUDIT.md](GOOGLE-AUDIT.md).

## Search and enquiry context

GSC clicks fell 488 → 393 (-19.5%); impressions 151,828 → 96,105 (-36.7%). CTR rose 0.321% → 0.409%; average position improved 16.50 → 14.54, which may reflect query mix rather than universal rank gains. GA4 organic sessions fell 769 → 618 (-19.6%), with 491 users and 1,018 pageviews in the current period. These are not qualified leads. All-channel events include 37 form_start events, but no returned form-submit or phone-click events; organic form starts were 10. Configured key events include purchase and phone_number_link_click. Check event naming, consent, actual success callbacks and lead records before claiming tracking failure or zero enquiries. No form was submitted and no call was made.

Important educational landing pages remain useful: adhesion guide 47 clicks, Prestige comparison 44, existing-window Low-E guide 21, reflective/non-reflective comparison 14. Homepage had 63 clicks. Preserve informational intent and useful natural service paths; do not redirect research pages to service pages merely because they are non-transactional. Existing project articles and manufacturer context can support future service improvements without inventing evidence.

## Specific findings and implementation boundaries

### 1. Homepage loading: text paint and script execution

Both genuine mobile lab runs scored 40/100 with 4.80-second LCP; TBT was 1,996 ms and 1,722 ms, and CLS 0.038 and 0. The actual LCP element was the heading “Professional Window Film Installation for Homes & Businesses,” not a hero image. The trace recorded 110 ms TTFB and 2,261 ms element render delay; trace timings must not be summed as the simulated 4.80-second score.

Largest blocking resources: [combined SiteGround CSS](https://mgtfilms.com/wp-content/uploads/siteground-optimizer-assets/siteground-optimizer-combined-css-635e156ce498b687afe3e1584c75d1b1.css), 113,851 transferred bytes / 3,673 ms; [jQuery](https://mgtfilms.com/wp-includes/js/jquery/jquery.min.js?ver=3.7.1), 30,034 bytes / 1,837 ms; [Revolution tools](https://mgtfilms.com/wp-content/plugins/revslider/public/assets/js/jquery.themepunch.tools.min.js?ver=5.4.8.1), 37,187 bytes / 2,143 ms. Preserve critical CSS and dependent script order; unload/defer only proven non-critical components. Do not blindly add async. Repeated reCAPTCHA release scripts contributed about 1,551 ms CPU; inspect widget instances without disabling spam protection. HubSpot used about 471 ms CPU.

Desktop scored 43 with 1.22-second LCP, 3,342 ms TBT and 0.265 CLS. Vimeo's internal vp-placeholder accounted for 0.252 and the outer hero iframe for 0.0127. Reserve stable geometry and inspect the player/poster transition. Both desktop videos are actual visible placements. Fresh mobile had no Vimeo iframe requests; do not prescribe removing a hidden mobile video that was not present. Image savings (~784 KiB lab estimate) were mostly below-fold and do not establish a heading-LCP fix. No field CWV verdict: PSI field data unavailable and direct CrUX returned an access error. [Performance](PERFORMANCE-REPORT.md) · [exact image map](evidence/image-optimization-map.json).

### 2. Rosemont business hours

Website shared footer: Monday–Friday 8 AM–5 PM. Exact Rosemont GBP: Monday–Thursday 7 AM–7 PM, Friday 7 AM–5 PM, weekends closed. Address and main phone match: 5600 N River Rd, Suite 800, Rosemont IL 60018; 847-487-8777. Confirm operations with the client, using GBP as the reference, then align the Rosemont footer and relevant markup. Do not copy these hours to other branches. [Local evidence](LOCAL-AUDIT.md).

Nine brand-linked profiles were found; this is not proof of nine eligible physical offices. Milwaukee and Window Treatments have different hours. New Orleans' returned address needs confirmation before reuse. Retain service-area/physical-office distinctions and verify ownership before any GBP edits. Citation discovery was incomplete; absence was not established. GBP Insights and local rank grids were unavailable.

### 3. Page actions and links

All seven regional hero Find a location anchors point to /#, resolving to the homepage; proposed destination is /locations/. Solar Control's Get a Free Estimate under Performance You Can Measure is a plain # source anchor; confirm no intentional modal, then use /contact-mgt-films/. Footer About Us points to the homepage #; link an approved real About page or remove this standalone link until ready. Do not change legitimate header dropdown parents. Exact pages/selectors are in the [route map](evidence/content-route-map.json). Source checks are not interactive tap recordings; test final desktop/mobile behavior before completion.

Six actual 404 paths and all discovered referring anchors are in the [broken-link map](evidence/broken-link-map.csv). /commercial-window-tinting-in-milwaukee/ has a verified live article match at /blog/commercial-window-tinting-in-milwaukee/: propose an exact 301, update the Milwaukee guide's link directly to that article, and use /commercial-window-tinting/ for the broad hotel article's commercial-film link. /services/window-film-installation/ has a verified HTTP 200 service-hub candidate at /services/; approve its intent match before an exact 301 and two direct source-link edits. Four remaining broken paths are linked only from noindex /new-home-page/; retire those legacy links or confirm regional coverage before proposed Locations rules. About remains unresolved. Placeholder anchors are not HTTP 404s and need no redirect.

### 4. Copied audience and location text

[Commercial](https://mgtfilms.com/commercial-window-tinting/): `[data-id="f168fc2"] h2` says Designed for Real Homes and Everyday Living; replace with commercial-building wording. [Baton Rouge](https://mgtfilms.com/locations/baton-rouge/): `#e-n-accordion-item-6480 summary` asks about Chicago; correct to Baton Rouge and remove the duplicated cost-answer phrase. This exact wrong-city question was not found on the other six regional pages. [Switchable Film](https://mgtfilms.com/services/switchable-film/) has solar-control installation wording in `[data-id="fe031e7"]`; replace with confirmed switchable-film wording. Both switchable routes are currently indexable and self-canonical; the old route receives 7 clicks/739 impressions. Review ownership before consolidation; this is not proven cannibalization.

### 5. Legacy article output

At least six fresh checked articles contain raw closing Visual Composer tokens: [Prestige](https://mgtfilms.com/blog/3m-prestige-window-film/), [back-to-school](https://mgtfilms.com/blog/security-window-film-increases-safety-for-back-to-school/), [St Louis project](https://mgtfilms.com/blog/st-louis-home-decorative-glass-film/), [Madison skylights](https://mgtfilms.com/blog/skylight-window-film-madison-wisconsin/), [local school safety](https://mgtfilms.com/blog/increase-school-safety-security/), [student safety](https://mgtfilms.com/blog/school-security-student-safety/). Match actual tokens in post output, sampled wrapper `[data-id="2fb3092"]`; preserve text, images and forms. Six is a verified minimum, not an exhaustive sitewide count. [Content audit](CONTENT-AUDIT.md).

### 6. Consolidated schema correction

Seven current pages have malformed FAQ JSON-LD with literal unescaped newlines; repair serialization at its emitter rather than deleting valid unrelated graphs. Two additional malformed LocalBusiness/Organization blocks are confined to the noindex legacy homepage: decide whether to retire that page first. Exact pages and script fingerprints are in [SCHEMA-REPORT.md](SCHEMA-REPORT.md). Rank Math Person nodes on 84 distinct pages contain sameAs https://ere for Jasper Cereno; remove that placeholder or replace with a verified public identity reference. The name alone is not evidence of a fake person. Verify intended author/page type before broader homepage Article changes. No Product or parseable LocalBusiness node was found; blanket Product removal is not an MGT task.

## Technical and strategic context not all shown in the short presentation

The declared sitemap index has three children; 11 XML entries redirect. Remove aliases from generated sitemaps in favor of final canonical routes, without deleting useful live pages. Most noindex category pagination is not automatically a defect. Current /contact-mgt-films/ is HTTP 200, index/follow and self-canonical; the September 1 Google inspection's old noindex snapshot is not a current source defect. Old /services/milwaukee-wisconsin/ is noindex and linked from a GBP: evaluate replacing the GBP website route with the confirmed current Milwaukee page after owner approval. The old /jackson-mississippi-window-film/ URL receives 16 clicks/2,957 impressions but redirects to the homepage; review a direct intent-matching route to /locations/jackson-ms/ rather than discarding that traffic.

Historical Ahrefs September 29 health score 91, 1,818 URLs, 161 error-affected URLs, six 404s and 18 orphans are historical—not substitute fresh findings. 473 API units were used for bounded research. DR/backlinks remain wider context, not an implementation/presentation task. Current public Chicago commercial results support service/local page intent; unrelated automotive results are excluded from ranking conclusions. No invented composite SEO score is assigned.

Further detail: [Technical](TECHNICAL-AUDIT.md), [Sitemap](SITEMAP-AUDIT.md), [Schema](SCHEMA-REPORT.md), [Google](GOOGLE-AUDIT.md), [Local](LOCAL-AUDIT.md), [Keywords](KEYWORD-OPPORTUNITIES.md), [Content](CONTENT-AUDIT.md), [SXO](SXO-AUDIT.md), [GEO](GEO-AUDIT.md), [Clusters](CLUSTER-AUDIT.md), [Visual](VISUAL-REPORT.md).

## Delivery status

Local HTML, full Markdown and plan prepared for review. Not published or sent to Nick. No tickets created and no shared skills changed. Remaining decisions are explicit in the implementation plan, especially unresolved redirect destinations, operating-hours approval, About destination, and measurement validation.
