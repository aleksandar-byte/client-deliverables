# MJB Law Group APC — performance audit

Read-only evidence collected October 30, 2026. URL: https://mjbfirm.com/. No live changes.

## Measurements and limits

| Source | Performance | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|
| Google PSI mobile, 18:21:39 UTC | 54/100 | 1.93 s | 6.38 s | 924.5 ms | 0.000088 |
| Google PSI desktop, 18:21:38 UTC | 83/100 | 0.47 s | 1.49 s | 286.5 ms | 0.00456 |

A repeat mobile API request returned the identical analysis timestamp and values, so it is cached evidence, not a second independent run. These are simulated lab measurements, not every visitor's experience. TBT is not INP.

PSI's mobile URL loadingExperience explicitly reports origin_fallback=true: origin-level field LCP p75 is 2,043 ms, CLS p75 is 0, FCP p75 is 1,922 ms, TTFB p75 is 1,109 ms. INP is absent. Do not claim a full Core Web Vitals pass or failure without INP, and do not present origin data as this homepage's URL-specific field data. PSI did not expose a collection-period range in this response.

## Largest verified delivery problem: animated hero background

- Exact asset: https://mjbfirm.com/wp-content/uploads/2026/02/mjb-hero-bg.webp
- Direct GET: HTTP 200, image/webp, **76,435,620 bytes (76.44 MB decimal / 72.89 MiB)**.
- Independent Range GET: HTTP 206, Content-Range bytes 0-65535/76435620. RIFF WEBP header contains ANIM at byte 30 and ANMF at byte 44: this is an animated WebP, not a small static photograph.
- Live mobile 390px computed CSS on `#section-51-1642` uses that same asset. No video element and no static mobile background override were observed. Browser screenshot genuinely displayed the animation.
- Existing client task context supplied by parent: Mobile Version Hero 11562460282 requested static image on mobile, staging first; Lag Video 11465145428 also concerns prior hero lag. Reconcile these before proposing a duplicate. Do not remove the approved desktop motion/design automatically.

**Recommended handoff:** restore the approved static mobile treatment in staging; replace the mobile CSS background URL with a quality-preserving static export and ensure the animated asset is not requested on mobile. Keep desktop behavior until approved otherwise; check that the layout and CTA remain intact and retest. If desktop animation remains, evaluate an efficiently encoded, suitably sized motion format rather than treating WebP as inherently light.

### Important attribution boundary

The mobile Lighthouse network entry for this animated asset has statusCode -1 and zero recorded transfer/resource bytes, so this lab run did not record a successful full transfer. Its reported 1,540,959-byte completed-transfer total is **not** a complete eventual page payload including the 76 MB image. A direct asset byte count proves a delivery problem but does not prove it caused the measured 6.38-second LCP.

## Exact LCP element and render gating

Mobile LCP is `#div_block-53-1642`, the hero benefits text beginning "Representing Employees & Injury Victims", with the small white-logo background; it is **not** the large animated hero background. The live node has `data-aos="flip-up"`, `data-aos-delay="900"`; computed transition-delay is 0.9s and duration 0.4s. Removing the first-screen entrance delay is a concrete improvement route, but the measured end-to-end LCP gain must be retested rather than equated to the configured delay.

Lighthouse insight subparts (observed trace timing, not additive to simulated LCP): TTFB 4 ms, resource-load delay 711 ms, resource-load duration 443 ms, element-render delay 841 ms. These sum to approximately 2.0s, not 6.38s; do not force them into a fabricated simulated breakdown.

Desktop LCP is `#section-7-5`, the Employment/Personal Injury section with `mjb-background.webp`; lab LCP remains 1.49s. Desktop insight subparts: 3 ms TTFB, 937 ms resource delay, 222 ms load, 144 ms render delay.

## Existing mobile preview, not a live-publish approval

The prior https://mjbfirm.com/new-home-2/ preview remains reachable with `noindex,nofollow,noimageindex,nosnippet`. At390px it shows a static `https://mjbfirm.com/wp-content/uploads/2026/04/mjb-firm-768x432.png` image at375×211px. Its desktop `v-roll.webm` video is inside a mobile-hidden parent, with a zero-sized box. This confirms an existing mobile-still approach is available for review while the live homepage continues to use the animated WebP. The preview contains only the hero and global footer, not the full homepage: **do not promote the entire preview over the live homepage**. Reuse/adapt its hero only, preserving current body/content and obtaining approval through the existing staging workflow. Screenshot: `screenshots/preview-mobile.jpg`.

## Other measured contributors, not permission to remove tracking

- Mobile render-blocking insight estimates 596ms savings: Oxygen `1051.css`, `5.css`, `universal.css`, `1647.css`, `oxygen.css`, jQuery 3.7.1 and `https://s.ksrndkehqnwntyxlhgto.com/135874.js` (WhatConverts). Keep first-screen CSS immediate, preserve tracking/phone replacement and dependency order; do not indiscriminately async jQuery or remove tracking.
- JS bootup attribution: first-party `/ef99/RRrdmuFf0dxLEmKMyeC_TtMgo-L5grWliKAkBDFSr7uv8Zna` 977ms CPU, `/ef99/` 408ms, WhatConverts 203ms, jQuery 177ms, GTM 175ms, UserWay 167ms. The two `/ef99/` scripts' administrative emitter/vendor was not verified. Record them for source ownership review, not a removal instruction.
- Two Merriweather font resources account for approximately 370KB transfer combined. Font-display check passed; no font-blocking ticket warranted from this alone.
- Preloads include the below-fold team image, footer white logo, and `mjb-michael-lizeth-lawyers-1.webp`. Scope preload use to genuinely critical first-screen assets after verifying actual use; do not call a resource unused solely because it is below the fold.
- Mobile image-delivery estimate only 57,157B savings for the team photo. That is secondary to the animated asset and not evidence it fixes LCP.

## Evidence

- `evidence/performance-psi-mobile.json`, `performance-psi-desktop.json`: full Google responses.
- `evidence/performance-psi-mobile-repeat.json`: cached duplicate, not independent test.
- `evidence/performance-summary.json`: metrics, LCP, script attribution, preloads and 20 downloaded homepage image file weights.
- `evidence/performance-hero-rendered.json`: live mobile background and exact AOS delay/duration.
- `evidence/performance-preview-mobile.json` and `performance-preview-mobile-video.json`: static preview image and mobile-hidden video parent.
- `screenshots/homepage-mobile.jpg`, `screenshots/homepage-desktop.jpg`: genuine captured browser views, not PageSpeed filmstrips or visual proof of byte size.

No heuristic or invented performance scores were substituted.
