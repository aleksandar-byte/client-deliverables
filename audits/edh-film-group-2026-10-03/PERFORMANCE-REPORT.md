# EDH Film Group — performance evidence

Read-only homepage tests begun October 3, 2026 local time (Google API timestamp October 2 UTC). Raw Google results: `evidence/psi-mobile-raw.json`, `psi-desktop-raw.json`; extracted exact nodes/resources: `performance-attribution.json`.

| Measure | Mobile lab | Desktop lab |
|---|---:|---:|
| Performance score | 31/100 | 34/100 |
| Simulated LCP | 39.14 seconds | 7.18 seconds |
| CLS | 0.0003 | 0.0008 |
| TBT | 1,987 ms | 3,245 ms |
| Total transfer | 13.01 MB | 9.52 MB |

These are Google Lighthouse lab runs, not real-user results. The immediate repeat returned the identical mobile timestamp `2026-10-02T22:27:54.536Z`, so that response is not an independent repeat. A later independent mobile run at `2026-10-02T22:36:03.691Z` again scored **31/100**, with **35.63-second simulated LCP**, **1,851 ms TBT**, **12.84 MB** transfer and the same very low CLS; raw evidence is `evidence/psi-mobile-late-repeat-raw.json`. Its LCP discovery again flags the hero as initially undiscoverable, with **3.423 seconds of observed resource-load delay**. The two independent mobile runs therefore show 35.6–39.1 seconds simulated LCP, not a stable prediction of every visitor's loading time. PSI did not supply page/origin field data; direct CrUX access returned 403. Do not report an INP or field Core Web Vitals pass/fail. Local unthrottled browser first-image LCP was 1.66 seconds desktop / 2.56 seconds mobile, a different test environment.

## First fix: make the initial hero image available immediately

The actual homepage LCP element is `div#cs-content > div.x-section > div.hero-slider > div.hero-slide`. The normal browser observed the first active slide using [slider-1.jpg](https://edhfilmgroup.com/wp-content/uploads/2026/03/slider-1.jpg), a **190,163-byte** image. The source carries Rocket lazy-background classes/data rather than prioritizing the first screen.

Google's discovery audit reports that the LCP request is **not discoverable in the initial document** and has **no explicit high-priority hint**. In the observed network trace, slider-1 begins at3.485s and ends at4.429s; the LCP breakdown attributes3.366s to resource-load delay,0.945s to download and0.264s to rendering after download. These trace parts explain the delayed request and **do not sum to the simulated39.14-second metric**.

- Exclude the first active hero background from lazy initialization. Make it available in initial HTML/CSS and preload that exact first responsive image, or use an eager picture/img with `fetchpriority="high"` and suitable cover positioning. Verify the preload matches the actually used image.
- The five slide images all begin requests at roughly3.49s and total **1,492,630 encoded bytes**. Prioritize the first slide and defer non-active slide images until needed; keep the first frame visible while the slider script starts. Do not preload all five images.

This is a stronger specific action than compressing the first image alone: the190KB first slide is not the largest resource; discovery and competing requests are the confirmed problems.

## Reduce below-fold work competing with the hero

The MediaElement Vimeo video **1160286309** is below the first screen and auto-plays. The native video element has a hidden0×0 box because MediaElement replaces it with a visible Vimeo iframe; **it is not proof of an unused hidden video**. The rendered iframe is visible at desktop y3137 and mobile y4594.

- Three large Vimeo media responses total **4,480,807 transferred bytes** in the mobile run, plus player scripts. Use a poster/click-to-play or defer initialization until the video approaches view, where that fits the intended experience. Preserve the video itself and accessibility.
- The lower-page parallax background [Group-80.jpg](https://edhfilmgroup.com/wp-content/uploads/2025/07/Group-80.jpg) is **941,112 encoded bytes**, at desktop y9797. It is downloaded before the hero image in the trace. Compress and use appropriate dimensions/format, then delay this below-fold background; do not call it the hero/LCP image.

## Reduce main-thread work carefully

The highest measured script costs are reCAPTCHA (~1,603ms total main-thread time), the SiteGround combined JS bundle (~981ms), Vimeo player (~779ms), and HubSpot analytics (~599ms). Lighthouse estimates3,120ms blocking-request savings, including the113.7KB combined CSS, jQuery, several font stylesheets and tracking scripts.

The captured homepage contains no form elements, but reCAPTCHA may support later injected forms/widgets. Determine its integration owner and required pages before changing it. Where safe, scope form protection to pages/components that need it; keep protection active when a form is used. Split or defer noncritical bundled code while preserving jQuery dependency order. Do not add async blindly or delete lead-tracking scripts. Check forms, menus, the visualizer and attribution after changes.

CLS is already low in these tests. Layout-shift cleanup is not the main speed task for EDH.

## Verification

After approved changes, run genuinely new mobile and desktop tests, confirm timestamps differ, inspect whether the first hero starts early, verify inactive slides and below-fold media stop competing at startup, and test interactive elements. Use lab comparisons until real-user data becomes available.
