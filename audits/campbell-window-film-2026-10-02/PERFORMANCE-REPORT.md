# Campbell Window Film — performance evidence

Read-only homepage measurements, October 2, 2026. Source: Google PageSpeed Insights API, Lighthouse mobile and desktop, saved in `evidence/psi-*-raw.json`; exact nodes, requests and diagnostic tables in `evidence/performance-attribution.json`.

## Measurements and scope

| Measure | Mobile lab | Desktop lab |
|---|---:|---:|
| Performance score | 25/100 | 62/100 |
| LCP | 3.96 seconds | 0.98 seconds |
| CLS | 0.585 | 0.059 |
| TBT | 1,419 ms | 713 ms |
| Total transfer | 17,855,855 bytes | See raw desktop result |

Mobile test timestamp: `2026-10-02T21:37:15.825Z`. The repeat request returned this same timestamp and values, so there is **one independent mobile lab test**, not two confirmations. These are simulated lab measurements, not every visitor's experience.

PSI also returned **phone origin-level field data**, with page data explicitly `origin_fallback: true`: p75 LCP **2.659 seconds**, CLS **0.17**, INP **128 ms**, TTFB **1.643 seconds**. LCP and CLS need improvement; INP is good. This represents the origin rather than this homepage alone. Direct CrUX requests returned HTTP 403, but that does not invalidate the field data delivered by PSI. A local desktop browser capture measured heading LCP at 864 ms without standard throttling; do not substitute that for Google lab or field data.

## 1. Stabilize and reduce the homepage background video

On [the homepage](https://campbellwindowfilm.com/), the Elementor background Vimeo video is the largest confirmed mobile layout-shift contributor and dominates transfer size.

- Exact element: `.elementor-background-video-container > iframe.elementor-background-video-embed`, Vimeo video **1192344235**. The lab attributed **0.429** shift to this element within total CLS 0.585. Its final mobile box is about **1243 × 700**, positioned at x=-415, y=88; it is a cover background rather than a normal inline video.
- Two Vimeo MP4 responses in the test transferred **8,498,608** and **2,138,339** bytes (10.64 MB total). Their expiring CDN URLs are retained in raw evidence; implementation should target the stable Elementor video setting / Vimeo video ID.
- Fix: reserve the final background container geometry in initial CSS. Prefer a quality-preserving static mobile background or load the decorative video after the initial view when appropriate. If video remains, reduce its bitrate/dimensions to the rendered need and test that the iframe does not resize/shift while initializing. Retest with the same mobile conditions.

The LCP element is the **“Welcome To Campbell Window Film” H1**, not this video or the before/after pictures. The LCP insight reports a 2,580 ms element-render delay and 210 ms TTFB from the observed trace; those trace parts do **not** add directly to the simulated 3.96-second metric. The first-screen rendering path and background initialization need testing together; do not claim that video byte savings alone equal an LCP improvement.

## 2. Stop the chat widget from moving on load

The HubSpot conversation widget contributes a further **0.116** from its internal wrapper and **0.0375** from `#hubspot-conversations-iframe` in the mobile layout-shift diagnostic. Combined, these are roughly 0.154 of the 0.585 test CLS.

- Keep the launcher dimensions/position stable and avoid auto-expanding the greeting on initial mobile load. Review the actual HubSpot widget configuration first; preserve the ability to contact the business.
- `https://static.hsappstatic.net/conversations-visitor-ui/static-1.31017/bundles/visitor.js` transferred **456,123 bytes** and used about **437 ms** total main-thread time in the lab. Consider initiating the full conversation UI on deliberate interaction where supported, then retest. Do not remove forms, lead tracking or attribution scripts as an optimization shortcut.

## 3. Optimize the below-fold before/after comparison

Two eager PNGs total **2,830,685 encoded body bytes**, despite being displayed around 648 × 415 on the local desktop capture and 376 × 241 in the mobile screenshot.

- [new-before.png](https://campbellwindowfilm.com/wp-content/uploads/2026/06/new-before.png): **1,416,116 bytes**, source1120 × 718, `#ba-slider > img#ba-after`.
- [new-after-1.png](https://campbellwindowfilm.com/wp-content/uploads/2026/06/new-after-1.png): **1,414,569 bytes**, source1120 × 718, `#ba-slider > img.ba-img`.
- Both lack `loading="lazy"`, explicit HTML dimensions and responsive candidates. Serve compressed WebP/AVIF with matched responsive sizes and equal aspect ratios, lazy-load the comparison below the first screen, and check the before/after drag interaction and image quality. Lighthouse estimates **2,738,169 bytes** potential combined savings; this is an estimate, not a tested output size.

## Secondary rendering checks

PSI estimates **2,760 ms** potential blocking-request savings. Exact candidates include jQuery3.7.1, Elementor frontend / widget styles, Hello Elementor reset/theme/header CSS, GS Envato portfolio styles, and four Google Font families (Roboto, Montserrat, Open Sans, Roboto Slab). Do not blindly defer jQuery or all CSS. First determine which widgets depend on it; preserve dependency order and keep first-screen styles available. Unused portfolio styles are candidates to conditionally enqueue only where used. A tracking script at `s.ksrndkehqnwntyxlhgto.com/173511.js` appears in the blocking list; identify its owner/function before changing it. No claim of malware is supported by this evidence.

The small initial 0.0056 shift group mentions the logo and Montserrat font; it is secondary to Vimeo/HubSpot and should not be presented as the main issue. Reserving space for late-loaded embeds follows [Google's CLS guidance](https://web.dev/articles/optimize-cls).

## Verification after implementation

Run at least two genuinely new mobile Lighthouse tests, compare timestamp and environment, inspect the same Vimeo/HubSpot nodes, validate consultation forms and call tracking, and keep a quality check on the comparison tool. Recheck origin field values after sufficient real-user collection time rather than expecting them to change immediately.
