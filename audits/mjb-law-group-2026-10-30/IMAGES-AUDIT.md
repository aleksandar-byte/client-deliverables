# MJB image audit

October 30, 2026, read-only. Homepage source/rendered sampling plus the technical crawl image inventory. Background images are not included in `<img>` occurrence counts.

## Crawl inventory

Technical crawl supplied140HTTP200pages,2,007imageoccurrences and156uniqueimageURLs; allimgoccurrences had a nonemptyaltattribute,1,527 were markedlazy,and1,110 lackedHTMLwidth/height. These are occurrence counts with sharedlogos/icons repeated acrosspages,not2,007uniquefiles. MissingHTMLdimensions do not prove absentCSSdimensions or actualCLS; the measured homepageCLSwas low. Fileweights were checked for20homepageassets,notall156uniqueimages.

## Main finding

The homepage hero CSS loads a **76,435,620B animated WebP** on mobile: https://mjbfirm.com/wp-content/uploads/2026/02/mjb-hero-bg.webp. Animation is confirmed by ANIM/ANMF container chunks and visible rendering, not filename alone. Use the client-approved quality-preserving static mobile treatment, staged for review, rather than recompressing every image or removing desktop motion without approval. See PERFORMANCE-AUDIT-REPORT.md for LCP attribution boundaries.

## Homepage files measured directly

| Asset | Bytes | Current treatment / action |
|---|---:|---|
| `/wp-content/uploads/2026/02/mjb-hero-bg.webp` | 76,435,620 | Animated CSS hero; critical mobile delivery issue. Static mobile background and prevent animation request. |
| `/wp-content/uploads/2025/05/mjb-background.webp` | 155,490 | Practice-area CSS background; not oversized by itself. Desktop LCP background. |
| `/wp-content/uploads/2025/06/mjb-michael-lizeth.webp` | 136,412 | Lazy-loaded below-fold team photo; srcset exists but sizes declares full viewport up to1920px. PSI mobile potential57,157B savings. Match sizes to actual column and preserve quality. |
| `/wp-content/uploads/2025/06/team_bg.webp` | 85,268 | Team section CSS background; modest weight. |
| `/wp-content/uploads/2025/06/michael-berry.jpg` | 42,805 | Small JPEG; no priority conversion ticket. |
| `/wp-content/uploads/2025/05/mjb-logo.webp` | 5,508 | Header logo eager-loaded; keep eager. |
| `/wp-content/uploads/2025/05/white-logo.webp` | 5,250 | Small reused logo, including mobile LCP text background. Not the76MBasset. |

Twenty homepage first-party image files were downloaded for exact weights; all responded200. The rest are small icons/portraits/logo files. Full measured file list is in evidence/performance-summary.json. The huge animated file was measured but not retained as a76MBaudit attachment.

## Rendering / markup

Homepage sample has descriptive/short image alts, WebP images, srcsets on larger photography and native lazy loading below the first screen. CSS dimensions reserve visible space; missing HTML width/height alone is not proof of CLS. Mobile CLS0.000088 and desktop0.00456 were low in the lab sample. Do not create a blanket missing-dimensions task without observed shifts.

Rendered desktop team photo appeared603×600px with a larger responsive source and `(max-width:1920px)100vw,1920px`; the chosen source can exceed the actual half-width column. This is a secondary responsive-sizing opportunity, not a confirmed major bottleneck. Do not lower quality merely to hit a generic byte threshold.

Image SERP/DataForSEO analysis was not run: no relevant connected source was used. No image generation, conversion, metadata injection, media upload or live edit was performed.
