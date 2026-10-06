# Michigan Glass Coatings — implementation plan for Nick

October 3, 2026 · Review-only plan; no Monday tickets or site changes.

Deliver both: [minimal HTML](presentation/MICHIGAN-GLASS-COATINGS-SEO-AUDIT-PRESENTATION.html) for presentation and [wider Markdown audit](FULL-AUDIT-REPORT.md) for evidence, business context and decisions.

| Priority | Action | Exact scope | Acceptance / dependency |
|---|---|---|---|
| High | Repair homeowner path | Homepage `.e5120-e89`: Explore Residential Services → /residential/ | Separate commercial button unchanged; test desktop/mobile |
| High | Correct Residential labels/cards | Request a Request, commercial contact labels, office wording, mismatched product descriptions | Homeowner wording; each card matches product; correct CTA intent |
| High | Repair Grand Rapids mobile hero | `.e5741-e13` → /contact-us/; `.e5741-e14` → /locations/ | No # targets; working desktop variants untouched |
| High | Fix two measured 404 paths | Decorative Contact and Commercial Di-Noc links; exact map in full report/HTML | Direct href changes plus exact 301s; checked targets 200; preserve live resourfacing spelling |
| High | Repair desktop footer | About /us-old/ → /about-us/; Contact /contact-us-old/ → /contact-us/; directory-listing Sitemap → approved maintained sitemap | Update shared footer; compare old Contact before retiring; hosting owner handles directory indexing |
| High | Fix Grand Rapids copied sections | Graphics list currently security systems; decorative heading says security | Approved category-specific copy; preserve correct product links |
| High | Optimize actual mobile hero | 970 KB Screenshot-2026-01-07-at-5.13.26-AM-scaled.png | Quality-preserving responsive WebP/AVIF; actual first asset prioritized |
| High | Avoid desktop video loading on mobile | Vimeo 1151081526 hidden actual mobile iframe downloads 2.33–2.58 MB | No mobile initialization; keep intended desktop video/reduced-motion path |
| High | Stabilize desktop video geometry | `.x-bg-layer-lower-video` dominant 0.535 CLS | Initial cover/parallax dimensions stable; new desktop test improves shifts |
| High investigation | Verify enquiry completion | TintPro cross-domain completion plus phone/CRM mapping | Tracking owner confirms integration; authorized success test; no duplicate event count |
| Medium | Use maintained sitemap index | Current /sitemap.xml one URL; fuller /sitemap_index.xml exists | Validate intended entries, update robots/GSC after approval; don't blindly include noindex/archive pages |
| Medium | Clarify local contact | Grand Rapids local office versus Auburn Hills headquarters | Correct branch phone/address; don't change central number without routing verification |
| Medium review | Resolve current technical findings | See TECHNICAL-AUDIT and SITEMAP-AUDIT exact URLs | Measured current status/targets and referring pages; not historical Ahrefs counts |

## Decisions and inputs

- Tracking owner: supported TintPro successful-submission path and CRM qualification source. Missing reporting is not proof of no leads.
- Web owner: video breakpoint/parallax emitter, form/chat dependencies and safe quality-preserving image treatment.
- Nick/client: approved graphics descriptions, location-specific project examples, confirmed operating hours if added.
- SEO owner: current page/intent ownership and sitemap eligibility before consolidation or submission.

## Context to communicate

GSC clicks rose 100→108; exact-host organic GA4 sessions 149→184. Homepage contributes about 85% of Google clicks; Grand Rapids is the second traffic-bearing page. Preserve useful existing pages while fixing routes. Five Google samples are indexed. GBP identities/hours differ by office and must remain separate. Historical Ahrefs Health 46 is August 3, not a current full-site score. No generic schema deletion, blanket backlink task or mass new-city-page plan is supported.

After approved implementation: back up touched sources, verify both responsive variants, test menu/lead/gallery/chat functions, run new mobile/desktop lab timestamps, confirm video startup/hero bytes/shifts, and reconcile verified enquiry records. Alex reviews owners/scope before tickets are created.
