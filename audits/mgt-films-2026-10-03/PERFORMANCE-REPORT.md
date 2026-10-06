# MGT Films — performance audit

Read-only homepage tests, 3 October 2026. No field Core Web Vitals verdict is available: PSI returned no page/origin metrics; direct CrUX requests returned403 (access limitation, not proof of insufficient traffic).

| Independent Google lab run | Performance | LCP | TBT | CLS | Transfer |
|---|---:|---:|---:|---:|---:|
| Mobile20:12:29UTC |40|4.80s|1996ms|0.038|5.02MB|
| Mobile20:14:18UTC |40|4.80s|1722ms|0|5.01MB|
| Desktop20:12:30UTC |43|1.22s|3342ms|0.265|6.43MB|

The immediate repeat had an identical cached timestamp and is not counted as an independent test. TBT is a lab responsiveness diagnostic, not real-user INP.

## Main actionable issue: initial rendering is blocked and scripts consume the main thread

The measured mobile LCP element is the H1 **“Professional Window Film Installation for Homes & Businesses”**, not a hero image. Its observed trace breakdown was110ms TTFB and2261ms element render delay; those trace durations are not the same as the simulated4.80-second LCP.

- First address the31 render-blocking resources, especially [combined SiteGround CSS](https://mgtfilms.com/wp-content/uploads/siteground-optimizer-assets/siteground-optimizer-combined-css-635e156ce498b687afe3e1584c75d1b1.css) (113851 transferred bytes;3673ms duration), [jQuery](https://mgtfilms.com/wp-includes/js/jquery/jquery.min.js?ver=3.7.1) (30034B;1837ms), and [Revolution tools](https://mgtfilms.com/wp-content/plugins/revslider/public/assets/js/jquery.themepunch.tools.min.js?ver=5.4.8.1) (37187B;2143ms). Google estimates3750ms potential blocking savings, not a guaranteed gain. Inventory the homepage’s actual Elementor, legacy Revolution/Visual Composer, map, and form dependencies; retain critical styles and defer/unload only proven noncritical dependencies in order, never indiscriminately async jQuery.
- Investigate repeated reCAPTCHA initializations: the same release script appears three times at roughly359KB each and totals1551ms CPU in the mobile execution audit. HubSpot analytics adds471ms CPU. Preserve spam protection, consent and conversion tracking; verify why forms load multiple instances and defer eligible below-fold forms until needed. Tag IDs alone do not prove duplicate conversions or wrong ownership.

## Desktop video shifts require a targeted retest

Desktop CLS0.265 is dominated by a Vimeo player’s internal `div.vp-placeholder` contribution0.252, with the hero iframe contributing0.0127. The hero video is ID1168658923; another below-fold video is ID1160286309. Both are visible desktop iframe elements, not unused hidden videos. Reserve stable outer video dimensions and investigate the player transition; consider a stable poster/loading strategy and retest. An iframe-internal shift must not be mislabeled as the whole page moving by0.252.

Mobile’s fresh browser sample contained no video iframes, and mobile PSI contained no Vimeo requests. Do not recommend removing a nonexistent hidden mobile Vimeo download.

## Secondary image cleanup

Google estimates784KiB image delivery savings, mostly below the first screen. See IMAGES-REPORT.md and the exact URL/selector map. These savings do not independently explain the heading LCP delay.

## Responsive verification

One earlier captured image looked compressed, but an independent390px mobile check measured innerWidth/clientWidth/scrollWidth/bodyWidth all390, visualViewport390 and scale1, with no visible wide nodes. No reproducible overflow defect is established.

Evidence: `evidence/psi-mobile-raw.json`, `psi-mobile-late-repeat-raw.json`, `psi-desktop-raw.json`, `performance-attribution.json`, `browser-homepage.json`, `mobile-width-check.json`. No production changes were made.
