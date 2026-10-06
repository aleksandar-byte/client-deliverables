# MGT Films — content audit

Date: 3 October 2026. Domain: https://mgtfilms.com/. Read-only. Wider context for Nick; no ticket or website change has been made.

## Main conclusion

MGT's current site clearly sells professional architectural film installation for homes and buildings. Its educational library is a meaningful search asset, not expendable filler. Repair the remaining template copy and navigation defects while preserving the distinction between research articles, service pages, audience hubs and local landing pages.

GSC, 31 August–29 September 2026: 393 property clicks and 96,105 impressions. Individual page rows include homepage 63 clicks, adhesion guide 47, 3M Prestige comparison 44, and existing-window Low-E guide 21. These figures do not establish lead quality or causation and page rows should not be summed into property totals.

## Specific copy defects for confirmation/repair

### Commercial hub has a residential heading

[Commercial Window Tinting](https://mgtfilms.com/commercial-window-tinting/) uses **Designed for Real Homes and Everyday Living** above its product/service cards. Fresh crawl source confirms selector `[data-id="f168fc2"] h2`. Use a commercial heading, for example **Window Film Solutions for Commercial Buildings**. Preserve the correctly linked film cards; this does not require a new page.

### Baton Rouge FAQ names Chicago

[Baton Rouge](https://mgtfilms.com/locations/baton-rouge/) asks **What areas around Chicago do you serve?**, followed by a Baton Rouge answer. Change the question to Baton Rouge. Fresh source selector: `#e-n-accordion-item-6480 summary`, inside `[data-id="26adee0b"]`. Its cost answer also repeats its closing phrase. All seven regional pages were checked in the 300-response checkpoint; Baton Rouge is the only wrong-region use of this exact Chicago question (Chicago itself correctly uses it).

The [Chicago](https://mgtfilms.com/locations/chicago/) heat-reduction answer has an extra trailing `ce.` in the public reader. This is minor copy cleanup, not a separate strategic SEO finding.

The public reader supplied the initial copy observations; fresh saved crawl HTML confirmed Commercial and Baton Rouge. Later normal-browser capture attempts encountered a challenge, so diagnostic source cards must not be described as rendered screenshots. Do not conflate cached observations with an independently verified all-page count.

## Legacy shortcodes appear in article content

The final crawl's 346 distinct HTML destinations contained raw closing `vc_column_text`, `vc_column` or `vc_row` tokens in these six articles:

- [3M Prestige](https://mgtfilms.com/blog/3m-prestige-window-film/)
- [Back-to-school security](https://mgtfilms.com/blog/security-window-film-increases-safety-for-back-to-school/)
- [St Louis decorative-film project](https://mgtfilms.com/blog/st-louis-home-decorative-glass-film/)
- [Madison skylight film](https://mgtfilms.com/blog/skylight-window-film-madison-wisconsin/)
- [Local school safety](https://mgtfilms.com/blog/increase-school-safety-security/)
- [School security/student safety](https://mgtfilms.com/blog/school-security-student-safety/)

Clean the leftover builder output while preserving content, images and working forms. The sampled post-content wrapper is `[data-id="2fb3092"]`; match the actual tokens and source article rather than deleting the shared post template. Six is the checked-crawl count, not a guarantee about every unlinked historical URL. The normal-browser screenshot is preferred for proving visible placement; if fresh capture is blocked, label the evidence as HTML source extraction.

## Existing content that should be kept

| Page | Existing job | Current GSC clicks / impressions |
|---|---|---:|
| [Adhesion guide](https://mgtfilms.com/blog/window-film-adhere/) | Informational compatibility/surface question | 47 / 3,499 |
| [3M Prestige comparison](https://mgtfilms.com/blog/3m-prestige-vs-other-window-films-pros-cons/) | Product comparison and selection | 44 / 3,835 |
| [Low-E on existing windows](https://mgtfilms.com/blog/can-low-e-film-be-applied-to-existing-windows/) | Existing-glass suitability research | 21 / 815 |
| [Reflective vs non-reflective](https://mgtfilms.com/blog/reflective-vs-non-reflective-solar-film-which-is-best/) | Comparison | 14 / 3,459 |
| [Two-way mirror explanation](https://mgtfilms.com/blog/how-two-way-mirror-film-works-privacy-visibility/) | Privacy/visibility explanation | 12 / 5,250 |
| [Night visibility guide](https://mgtfilms.com/blog/can-you-see-through-windows-films-at-night/) | Specific informational follow-up | 9 / 3,309 |

The sampled adhesion page has a date, detailed headings, a table of contents, FAQs and a Contact action. The Prestige comparison contains a comparison table and an existing contextual Residential link. Do not call these pages orphaned merely because no additional service link has yet been proposed. Keep their non-transactional intent intact; add a natural service path only where useful.

## Trust and experience context

The homepage already includes named service categories, manufacturer/dealer context, brand logos, a visualizer, FAQs, contact details and seven regional routes. The contractor page contains an installation-focused offer and named testimonials. These are existing assets, not a blank trust profile.

A useful next content step is to connect selected real work to an approved project summary: building type, region, actual installed solution and permission-cleared photos. Do not invent customers, outcomes, installer credentials or staff biographies. If the About destination is currently unpublished or missing, confirm the intended existing business page before creating a replacement or pointing the link at a guessed URL.

## Wider editorial review, not a presentation claims task

High-traffic technical guides should have clear company/author responsibility and appropriate primary product sources when specifications or compatibility matter. The adhesion guide contains differing qualifications between its body and FAQ; it warrants a focused subject-matter review before future expansion. This is not a determination that every claim is wrong and is excluded from the minimal client presentation per the requested scope. No AI-detection penalty or fixed word-count requirement is inferred.

## Legacy URL caution

The final crawl confirms `/jackson-mississippi-window-film/` redirects to the homepage. That old local URL received 16 clicks/2,957 impressions; review whether the live `/locations/jackson-ms/` is the appropriate direct destination. Confirm the historical local intent and avoid replacing one broad redirect with another guessed mapping.

Both `/switchable-window-film/` and `/services/switchable-film/` return indexable, self-canonical HTTP 200 pages with installation intent. The older route received 7 clicks/739 impressions. Review which should own the installation query, preserve any useful unique material and approve a consolidation map before redirecting. Similar intent is not proof of ranking cannibalization.

### Switchable service copy describes solar-control film

[Switchable Film](https://mgtfilms.com/services/switchable-film/), under **Trusted Materials and Professional Installation**, says MGT installs **solar-control window films, including 3M products**. Fresh source selector: `[data-id="fe031e7"]`. Replace that category-specific copy with accurate switchable-film material/installation information approved by the business. This is a copied-category mismatch, not a conclusion about which manufacturers supply the product.

## Final coverage note

The technical crawl completed 414 requests, 346 distinct HTML destinations and all 298 XML seeds. This specialist's DOM evidence covers the earlier 300-response checkpoint; final response, robots and canonical checks above were verified directly against final `crawl-pages.json`. Final broken-link scope includes two broken targets linked from current articles and four additional targets found only on a noindex legacy homepage. See the technical map rather than treating all six as equally prominent visitor defects. No whole-web or Google-index completeness is claimed.

Evidence: Google page/totals files under `evidence/`, main normal-browser capture files, public page inspection and the technical crawl. Final all-site status/duplicate counts belong to `TECHNICAL-AUDIT.md`; this content review does not claim exhaustive orphan discovery.
