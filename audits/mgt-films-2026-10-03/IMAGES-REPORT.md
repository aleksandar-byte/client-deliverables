# MGT Films — image audit

Read-only homepage Google mobile lab evidence, 3 October2026. The mobile LCP is a text heading, not an image. Image optimization is a secondary payload task, not the established root cause of the4.8-second LCP.

| Exact image / selector | Measured image bytes | Estimated avoidable bytes | Action |
|---|---:|---:|---|
| Blogger-hosted `3M-Prestige-90-exterior-day.jpg`, `#thumbImage` |208967|205271|Generate an actual thumbnail rather than1500×1000 source; lab target200×133.|
| [slider-before-decorative-scaled.jpg](https://mgtfilms.com/wp-content/uploads/2026/03/slider-before-decorative-scaled.jpg), `#ba-after` |166586|159766|Responsive comparison image rather than2560×1707 source; lab target518×345.|
| Blogger-hosted `3M-Prestige-90-Interior-day.jpg`, `#mainImage` |192785|158400|Responsive visualizer image;1500×1000 source versus634×422 target.|
| [slider-after-decorative-scaled.jpg](https://mgtfilms.com/wp-content/uploads/2026/03/slider-after-decorative-scaled.jpg), `#ba-slider img.ba-img` |145950|139975|Responsive comparison image, preserve visual quality.|
| [Rectangle-81-1.jpg](https://mgtfilms.com/wp-content/uploads/2026/03/Rectangle-81-1.jpg) |97762|56337|Serve suitable dimensions and compress with visual QA.|

Full external URLs, all9 flagged resources, dimensions and DOM selectors are in `evidence/image-optimization-map.json`. These image bytes exclude some transfer overhead; network transfer numbers may be slightly larger. Google’s total estimated image saving is784KiB; per-image estimates are not LCP time savings.

- The visualizer and comparison images are thousands of pixels below the mobile fold. Defer their source loading until approaching the viewport, preserving slider interactions and usable fallback images. Avoid lazy-loading the first-screen brand/logo.
- Replace filename-style alt text such as “Rectangle81” with useful text only when images convey information; keep decorative images appropriately empty. Review the header logo’s empty alt if it is the sole accessible name of its link.

Responsive layout verification did not reproduce horizontal overflow:390px viewport/client/scroll/body, visualViewport scale1. Do not add an overflow fix on the strength of one anomalous screenshot.

Evidence: `image-optimization-map.json`, `psi-mobile-raw.json`, `browser-homepage.json`, `mobile-width-check.json`. No images were modified.
