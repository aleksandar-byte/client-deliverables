# EDH Film Group — content and publishing audit

Reviewed October 3, 2026 Europe/Skopje. Read-only review of current public pages, normal-browser HTML and the existing Google performance exports. This is a representative content review, not a claim every paragraph was manually checked. Exact DOM findings are preserved in `evidence/content-dom-evidence.json`; the full audit's technical inventory supplies sitewide crawl coverage.

## Context for Nick

EDH already has a substantial product, residential/commercial and regional service architecture, plus an active educational blog. The main content opportunity is **publishing quality and coherent routing**, not another broad batch of pages. Current GSC reports 126 clicks; the homepage and Low-E guide contribute 80 of them. The guide deserves a careful refresh rather than removal or conversion into a duplicate local sales page. The regional directory also has real search use: seven clicks and 243 impressions. Metrics cover August 31–September 29, 2026; see `GOOGLE-AUDIT.md` for comparison and limitations.

## Verified priority findings

### 1. Replace unfinished team content

[About EDH](https://edhfilmgroup.com/about-edh/) publishes an Our Team introduction and six biographies containing Lorem ipsum. The names are Matt, Mark, Luke, John, Ruth and Seth; each uses the same remote avatar asset. Seven placeholder text blocks were confirmed in fresh `about-team-rendered.html`. The team cards are `.x-promo-content`; the intro is `.p-about`.

- Replace this entire unfinished section with client-approved real people, roles and relevant experience; if that material is not ready, remove the unfinished section temporarily.
- Verify the people with EDH before publishing new bios. The public [company LinkedIn profile](https://www.linkedin.com/company/edh-film-group) is a research lead, not automatic authorization to copy employee details. Do not describe the placeholder names as proven fake identities.

### 2. Finish the existing high-traffic Low-E guide

The [double-pane/Low-E guide](https://edhfilmgroup.com/blog/window-film-for-double-pane-low-e-windows/) ends with an editorial instruction: “Let me know if you’d like meta tags or internal linking suggestions next.” It also has a cut-off sentence in the Voided Warranty subsection. Both were confirmed again in the fresh recovered browser crawl, inside `[data-id="30e960f2"]`; this finding does not rely on an invented screenshot.

- Remove the editorial instruction, complete the truncated sentence and merge overlapping FAQ blocks if their answers repeat. Keep the article's useful compatibility, selection and assessment purpose.
- Preserve the URL and existing relevant links; add a clear professional assessment route only where helpful. This page recorded **35 clicks / 4,585 impressions**, versus 64 clicks in the previous 30 days. The residue does not prove why traffic declined or prove how the article was written.

### 3. Repair residential copy that describes the wrong audience

The [Residential hub](https://edhfilmgroup.com/residential-market/) includes the same paragraph about St. Louis commercial buildings twice under an identical energy-efficiency heading. Its early solar-film paragraph also talks about commercial spaces. This is a specific audience/city mismatch, not a low-word-count issue.

- Rewrite the affected blocks for homeowners and remove the repeated block; retain useful residential coverage elsewhere on the page.
- Check desktop/mobile variants and the reuse source before publishing, so correcting one visible section does not leave the other template variant unchanged.

### 4. Route security choices to security information

On the [Commercial hub](https://edhfilmgroup.com/commercial-market/), S800, S1400, S2400 and Riot Glass all link to the solar-film page. Fresh rendered source confirms this. Proposed mapping:

| Existing card | Source selector | Correct existing destination |
|---|---|---|
| S800 | `.e8460-e35` | [Security Window Film](https://edhfilmgroup.com/products/security-window-film/) |
| S1400 | `.e8460-e41` | [Security Window Film](https://edhfilmgroup.com/products/security-window-film/) |
| S2400 | `.e8460-e47` | [Security Window Film](https://edhfilmgroup.com/products/security-window-film/) |
| Riot Glass | `.e8460-e53` | [Security Glass](https://edhfilmgroup.com/products/security-glass/) |

These changes concern link destinations, not URL redirects. Retain product-specific labels only if the linked security page adequately explains those options.

### 5. Correct regional identity at the directory

The [Locations directory](https://edhfilmgroup.com/locations/) labels a card Tulsa but uses Oklahoma City's address and map. Confirm the actual Tulsa destination or service-area status before replacing both fields. See `LOCAL-AUDIT.md`; do not invent a Tulsa street address. The confirmed Summit GBP and Chicago service route also need a clear operating-location decision from Nick.

## Wider editorial review queue

- The [Dallas location](https://edhfilmgroup.com/locations/texas/window-tinting-dallas/) public source includes Des Moines in a second hero description. Treat this as a responsive-template QA candidate until the relevant visible viewport is checked. Its six service Learn More cards point to Contact, so verify whether the intended action is service education or an enquiry; align labels and destinations.
- The [Solar product page](https://edhfilmgroup.com/products/solar-window-film/) has an older-building FAQ answer that repeats its UV/fading answer rather than answering the question. Its Related Services links appear to use placeholder `#` destinations in the public extraction. Verify fresh DOM and fix links to existing product pages rather than adding new pages.
- The [Tulsa healthcare guide](https://edhfilmgroup.com/blog/architectural-window-film-tulsa-healthcare/) repeats much of its solar-control paragraph. It already has contextual product and related-article links, so do not claim all educational posts lack service links.
- Minor shared-template text: Commercial hub's last process step says Enjoy Your Home; footer Architectural is misspelled; residential visualizer labels include 33M. Group these into publishing QA rather than separate high-priority SEO projects.

## What to preserve and improve

The site already separates solar, security film, security glass, privacy/decorative, bird safety, switchable film and resurfacing; these are meaningful different solutions. Product pages function as installation leads, not ecommerce items. The blog contains compatibility, privacy and care questions that belong to informational intent. Publication dates and an EDH organization byline are visible on sampled posts. Do not replace a legitimate corporate byline with an invented expert or claim all posts are anonymous.

The homepage's logo strip and project imagery provide visible proof elements, but a logo alone is not a detailed case study. Ask EDH for a small number of approved installation examples with real location, problem, selected system, photos and outcome. Link each from the relevant solution and city page. Confirm product specifications/compatibility with primary manufacturer documentation during editorial review; no new performance or safety claims are supplied by this audit.

## Prioritized implementation sequence

1. Remove placeholders/editorial residue and correct the wrong security routes.
2. Fix the Tulsa directory pairing and residential audience mismatch; check responsive variants.
3. Reconcile older/newer hub and city URL roles with canonicals, internal links and Google data before consolidation.
4. Refresh existing traffic-bearing guides, then add specific approved project proof. Review outcomes by page/intent and qualified enquiries, not raw word counts or total blog traffic.

No website content, links, schema, tickets or skills were changed.
