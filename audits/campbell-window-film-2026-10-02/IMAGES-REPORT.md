# Campbell Window Film — image audit

Read-only homepage-specific measured image sample. All 292 XML pages were ultimately crawled through ordinary browser access; image file weights and rendered sizes below are homepage measurements, not a complete sitewide asset download inventory.

The strongest image issue is the [homepage](https://campbellwindowfilm.com/) before/after comparison loading **2.83 MB of PNGs** immediately. Both files are1120 ×718 but display considerably smaller; the local browser observed requests starting ~551 ms after navigation even though the comparison is ~3544 px below the top of the desktop page. Both use `loading="auto"`, no `srcset`, and no HTML width/height. Their parent may reserve geometry; this evidence does not attribute the major CLS to those pictures.

| Image / element | Actual encoded bytes | Fix | Google estimated savings |
|---|---:|---|---:|
| [Before PNG](https://campbellwindowfilm.com/wp-content/uploads/2026/06/new-before.png), `#ba-after` | 1,416,116 | Compress to WebP/AVIF, responsive sizes, matching aspect ratio, below-fold lazy loading | 1,369,858 bytes |
| [After PNG](https://campbellwindowfilm.com/wp-content/uploads/2026/06/new-after-1.png), `#ba-slider .ba-img` | 1,414,569 | Same; preserve comparison quality and alignment | 1,368,311 bytes |
| Visualizer `#thumbImage`, external Blogger image ending `3M-Prestige-90-exterior-day.jpg` | 208,967 | Serve thumbnail instead of1500 ×1000 original | 205,271 bytes |
| Visualizer `#mainImage`, external Blogger image ending `3M-Prestige-90-Interior-day.jpg` | 192,785 | Size to actual viewer and device ratio | 163,863 bytes |
| [Broken-Door-Glass.jpg](https://campbellwindowfilm.com/wp-content/uploads/2026/05/Broken-Door-Glass.jpg) | 76,902 | Lower priority quality-preserving compression | 47,689 bytes |
| [Mobile logo candidate](https://campbellwindowfilm.com/wp-content/uploads/2026/06/CWF-Logo-Light-Background-FINAL-1-768x159.png) | 16,966 | Correct sizes to actual mobile logo width; lower priority | 14,007 bytes |

The complete exact URLs and snippets are saved in `evidence/image-optimization-map.json`. Savings are Lighthouse estimates, not guarantees. Do not add format and resize savings twice; use each row's combined `wastedBytes`.

The header and footer logo links have empty image alt text and no accessible link name in the Google test. Give these homepage links a meaningful accessible name such as “Campbell Window Film home.” The visualizer main/thumbnail images also lacked alt attributes in the lab; add concise descriptions distinguishing interior/exterior views. Decorative press logos do not require keyword text.

Useful positives: many standard Elementor content images already include responsive `srcset`, dimensions and lazy loading. Do not apply lazy loading to the first-screen logo/LCP content. No image files were modified in this audit.
