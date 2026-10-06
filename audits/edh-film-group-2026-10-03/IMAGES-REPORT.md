# EDH Film Group — measured homepage images

Images were measured from genuine rendered homepage requests and Google Lighthouse. This is an asset sample, not a download inventory of every site image. Exact optimization rows/snippets are in `evidence/image-optimization-map.json`.

| Exact image | Encoded bytes | Specific action |
|---|---:|---|
| [slider-1.jpg](https://edhfilmgroup.com/wp-content/uploads/2026/03/slider-1.jpg) |190,163|First hero/LCP: remove lazy discovery and prioritize only this initial image |
| [slider-2.jpg](https://edhfilmgroup.com/wp-content/uploads/2026/03/slider-2.jpg) |271,439|Defer inactive hero frame until needed; quality-preserving modern format |
| [slider-3v2-scaled.jpg](https://edhfilmgroup.com/wp-content/uploads/2026/03/slider-3v2-scaled.jpg) |503,145|Resize/compress and defer inactive frame |
| [slider-4-scaled.jpg](https://edhfilmgroup.com/wp-content/uploads/2026/03/slider-4-scaled.jpg) |399,997|Resize/compress and defer inactive frame |
| [slider-5.jpg](https://edhfilmgroup.com/wp-content/uploads/2026/03/slider-5.jpg) |127,886|Defer inactive frame; avoid forcing unnecessary recompression |
| [Group-80.jpg](https://edhfilmgroup.com/wp-content/uploads/2025/07/Group-80.jpg) |941,112|Lower-page parallax background, not hero: resize/compress, defer below fold |
| [before-scaled.jpg](https://edhfilmgroup.com/wp-content/uploads/2025/12/before-scaled.jpg) |394,613|Comparison image2560×1707 shown~770×513desktop/~372×248mobile; responsive variants and lazy loading compatible with slider |
| [Custom-Plotted-scaled.jpg](https://edhfilmgroup.com/wp-content/uploads/2025/12/Custom-Plotted-scaled.jpg) |367,949|Same before/after tool; keep identical aspect ratio and aligned pair |
| [Rectangle-66-1.jpg](https://edhfilmgroup.com/wp-content/uploads/2026/04/Rectangle-66-1.jpg) |230,313|Use correctly sized menu thumbnail; replace generic “Menu Item” alt with meaningful name where it conveys the link |
| [Rectangle-67-1.jpg](https://edhfilmgroup.com/wp-content/uploads/2026/04/Rectangle-67-1.jpg) |450,221|Large menu image observed on desktop; size to rendered thumbnail |

The comparison pair totals762,562bytes; Lighthouse estimates713,250bytes avoidable, not a tested output guarantee. Both carry `skip-lazy`/`data-skip-lazy`, no srcset or HTML dimensions, and empty alt text. Their actual parent can reserve geometry, so do not claim they caused CLS; this test's CLS is already low.

The embedded film visualizer also serves full-size Blogger images for its small thumbnail/viewer. The exact external URLs are in the image map; Lighthouse estimated161,467bytes and130,589bytes savings respectively. Change the source dimensions only after checking visualizer day/night/film-selection behavior.

Several content images use generic “Placeholder Image”/“Image” labels. Check which convey useful meaning, add specific alt descriptions where appropriate, and leave genuinely decorative images empty. Do not infer visual placeholders merely from those alt strings: the captured images themselves may be real.

No images or live website settings were changed. See `PERFORMANCE-REPORT.md` for hero request timing, below-fold Vimeo and script cost rather than treating all asset bytes as LCP delay.
