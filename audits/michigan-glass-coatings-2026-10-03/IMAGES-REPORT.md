# Michigan Glass Coatings — image audit

Homepage assets measured in Google Lighthouse and a genuine rendered browser. This is a measured homepage sample, not an assertion that every site image was downloaded. Exact snippets/dimensions are in `evidence/image-optimization-map.json`.

| Asset | Encoded bytes | Specific action |
|---|---:|---|
| [Mobile hero PNG](https://michgc.com/wp-content/uploads/2026/01/Screenshot-2026-01-07-at-5.13.26-AM-scaled.png) |970,024|First priority: responsive WebP/AVIF preserving the crop/quality; explicit high priority for the actual mobile LCP asset |
| [Lower-page background PNG](https://michgc.com/wp-content/uploads/2025/12/Homepage-7-scaled.png) |413,715|Modern format and below-fold loading; not the hero |
| [021A0292-scaled.jpg](https://michgc.com/wp-content/uploads/2026/01/021A0292-scaled.jpg) |267,628|Responsive gallery image; estimated 173,797 bytes saving |
| [021A9682-scaled.jpg](https://michgc.com/wp-content/uploads/2026/01/021A9682-scaled.jpg) |253,355|Serve a smaller responsive source; estimated 140,004 bytes saving |
| [021A0167-scaled.jpg](https://michgc.com/wp-content/uploads/2026/01/021A0167-scaled.jpg) |230,422|Quality-preserving modern format; estimated 136,591 bytes saving |
| [021A6913-scaled.jpg](https://michgc.com/wp-content/uploads/2026/01/021A6913-scaled.jpg) |216,273|Quality-preserving modern format; estimated 122,442 bytes saving |
| [021A7420-scaled.jpg](https://michgc.com/wp-content/uploads/2026/01/021A7420-scaled.jpg) |174,991|Secondary gallery optimization; estimated 107,159 bytes saving |
| [021A4789-scaled.jpg](https://michgc.com/wp-content/uploads/2026/01/021A4789-scaled.jpg) |160,665|Secondary gallery optimization; estimated 92,833 bytes saving |

The hero's estimated saving is 858,007 bytes, not a verified compressed output or an equal reduction in LCP. Generate variants, compare visual quality and remeasure.

Gallery images already have width/height and `loading="lazy"`. Keep these protections and improve source sizing/format. Several use the alt text “Placeholder Image”; replace with useful, truthful descriptions when the image conveys project/service information. This alt string does not prove the picture itself is a placeholder. Decorative images should keep empty alt rather than keyword stuffing.

The logo is only 7,503 bytes; its estimated 5,337-byte saving is low priority. Avoid diluting the main fix with tiny-icon recompression. Large Font Awesome fonts are covered by performance profiling, not counted as images.

No original image, markup or website setting was changed.
