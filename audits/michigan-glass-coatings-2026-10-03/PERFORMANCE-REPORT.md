# Michigan Glass Coatings — performance audit

Fresh read-only Google Lighthouse tests, October 3, 2026. These are lab tests, not real-user loading-time promises. PSI supplied no page/origin field metrics; direct CrUX access returned 403. No INP or real-user CWV pass/fail is claimed.

| Metric | Mobile run 1 | Mobile run 2 | Desktop |
|---|---:|---:|---:|
| Performance |31/100|48/100|35/100|
| Simulated LCP |15.38 s|21.38 s|1.20 s|
| TBT |1,730 ms|417 ms|1,637 ms|
| CLS |0.020|0.034|0.538|
| Transfer |10.72 MB|11.11 MB|9.02 MB|

Mobile timestamps differ: `2026-10-03T19:56:03.855Z` and `2026-10-03T19:56:44.568Z`. Variation is substantial; do not claim a single stable speed score or add observed trace durations to simulated LCP. Raw files: `evidence/psi-{mobile,mobile-repeat,desktop}-raw.json`; exact attribution: `performance-detail.json`, `performance-attribution.json` and `browser-homepage.json`.

## 1. Reduce and prioritize the actual mobile hero

The mobile LCP element is `div#cs-content > div.x-section > div.x-bg > div.x-bg-layer-lower-image`, covering the first screen (412×586 at y93 in Google). Its exact image is [Screenshot-2026-01-07-at-5.13.26-AM-scaled.png](https://michgc.com/wp-content/uploads/2026/01/Screenshot-2026-01-07-at-5.13.26-AM-scaled.png): **970,024 encoded bytes**, with **858,007 bytes estimated image-delivery savings**.

- Create a properly sized, quality-preserving WebP/AVIF version for the mobile crop; keep the existing image as a fallback if needed. Make this first-screen asset high priority; preload only the exact responsive asset actually used.
- It is already discoverable in the initial document and not lazy-loaded according to Google. Do not create an unsupported “remove hero lazy loading” task. It lacks an explicit fetch-priority hint, though Chrome eventually assigns High priority. Run 1 requests it around 2.03 seconds and completes around 2.59 seconds; the trace attributes 1.763 seconds to resource-load delay and 0.556 seconds to download. Those trace figures do not sum to the 15.38-second simulated metric.

## 2. Avoid loading the desktop video on the static mobile layout

Vimeo **1151081526** is the desktop hero background. The **actual replacement iframe**, not merely the hidden native video element, is 1440×1667 on desktop but **0×0 on mobile**, where the PNG is the visible hero. Yet Google mobile downloaded **2,332,581 bytes** of Vimeo MP4 responses in run 1 and **2,579,503 bytes** in run 2, plus player code.

Initialize the desktop-only video only at the breakpoint where it is shown, rather than loading it then hiding it. Preserve the intended desktop video and a stable mobile poster. Check breakpoint changes and reduced-motion behavior before publishing. The exact CDN chunk links expire, so use the stable video ID plus saved network evidence to identify the integration.

## 3. Stabilize the desktop video background

The dominant desktop shift is **0.5347** on `.x-bg-layer-lower-video`, against total CLS **0.5378**. Its source declares `parallaxSize:200%` and the final layer is 1667px tall. The independent normal-browser capture also saw this background move (~0.494 shift), making it the strongest specific desktop layout issue.

Set the hero wrapper/layer dimensions and cover/parallax positioning in initial CSS so Vimeo initialization does not resize or reposition the visible background. Check the initial and final box with the player disabled/enabled, then retest desktop. Lighthouse lists a nearby icon under possible unsized-image causes, but its captured markup already includes width/height; do not claim that simply adding dimensions to that icon explains the video shift. Font-related shifts were tiny compared with this layer.

The chat widget has a separate shift cluster around 0.2001, including its floating iframe and dialog. It is not additive to the reported 0.5378 session-window CLS. Keep its opening/position stable and avoid unsolicited expansion where configuration allows.

## 4. Reduce secondary startup work safely

Measured mobile main-thread costs include reCAPTCHA (~1,533 ms in run 1), Vimeo player (~964 ms) and webchat polyfills (~834 ms). Two chat bundles alone transfer about 1.076 MB. Multiple reCAPTCHA requests are visible; inspect which forms/widgets instantiate them before changing anything. Preserve working form protection, chat access, lead tracking and attribution. Scope noncritical integrations to the pages/interaction that need them, and keep script dependencies in order.

The lower-page background [Homepage-7-scaled.png](https://michgc.com/wp-content/uploads/2025/12/Homepage-7-scaled.png), **413,715 encoded bytes**, is at desktop y8008/mobile y12998. Optimize/defer it as a secondary task; it is not the LCP image. Gallery images already use native lazy loading—do not propose adding it again. Their detailed size fixes are in `IMAGES-REPORT.md`.

## Acceptance check

Retest fresh mobile and desktop runs with different timestamps. Confirm the mobile hero starts early, desktop-only Vimeo stops downloading on mobile, the video background stays geometrically stable, and menu, gallery, forms and chat still work. No live implementation was performed.
