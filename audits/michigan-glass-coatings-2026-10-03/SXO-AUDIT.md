# Michigan Glass Coatings — search experience and conversion paths

Date: 3 October 2026. Read-only review. Sources: saved normal-browser desktop/mobile observations, rendered HTML, representative service/content pages and the Google evidence files.

## What the visitor is trying to do

| Visitor | Appropriate first destination | Next step |
|---|---|---|
| Homeowner with heat, glare or privacy concerns | [Residential](https://michgc.com/residential/) | Relevant film service, then quote/contact |
| Facility, school, store or office decision-maker | [Commercial](https://michgc.com/commercial/) | Relevant service/application and consultation |
| Visitor already selecting a film category | Individual [service](https://michgc.com/services/) page | Options/limitations, relevant project proof, quote |
| West Michigan visitor | [Grand Rapids](https://michgc.com/locations/grand-rapids/) | Local service information, quote and office location |
| Visitor researching a problem | Relevant educational article | Useful answer, optional contextual service link |

The main navigation already provides Services, Locations, Market/Residential/Commercial, Gallery, Resources, Blogs and Contact. The audit does not recommend adding those same pages again to the menu/footer.

## Priority path repairs

### Homepage residential choice goes to the wrong audience hub

At [homepage](https://michgc.com/), `.e5120-e89` in the Residential block is **Explore Commercial Services** → `/commercial/`. Rename it **Explore Residential Services** and use `/residential/`. The existing commercial block stays unchanged. This is a direct intent mismatch, not a hypothetical conversion-rate claim.

### Grand Rapids mobile hero does not navigate to the promised next steps

At [Grand Rapids](https://michgc.com/locations/grand-rapids/), the mobile hero has two plain anchors with `href="#"`. They are visible in the captured mobile layout and hidden in the desktop layout; the desktop hero already uses real destinations.

| Mobile selector | Button | Current | Proposed destination |
|---|---|---|---|
| `.e5741-e13` | Request a Quote | `#` | `https://michgc.com/contact-us/` |
| `.e5741-e14` | Find Location | `#` | `https://michgc.com/locations/` |

Match the working desktop route. Confirm the final mobile tap goes to the destination, not the top of the current page, and preserve the site's existing tracking. No form was submitted during the audit.

Evidence: `grand-rapids-captures.json` marks both links visible on mobile and false on desktop; matching rendered source contains normal anchor markup with no disclosed modal target. A tap-based event-handler test was not performed, so the finding is specifically the missing navigable destination, not a fabricated recording of a failed interaction.

### Residential labels promise the wrong journey

The Residential hero says **Request a Request**. Three benefit-section buttons say **Explore Commercial Services** but point to Contact. Replace these with accurate homeowner quote labels, retaining the working Contact route. See the exact selectors and card-copy corrections in `CONTENT-AUDIT.md`.

## Hidden template links — not a visible desktop defect

Saved source contains five Solar Film **Learn More** links to `#` (`.e5331-e113`, `e119`, `e125`, `e132`, `e138`) and three Security Film option links to `#` (`.e5278-e34`, `e44`, `e54`). The main agent's desktop screenshots did not show those buttons. Do not promote them as visible broken desktop controls or count them as eight user-blocking errors.

If a future breakpoint/state exposes them, use the existing Commercial hub for commercial Solar applications, Residential for homes, or an actual in-page option section. For Security options, use verified product information or an honestly labelled quote action. Do not send all Learn More labels to Contact without changing the promise, and do not invent new product pages merely to populate links.

## What is already working / what was not tested

- A consistent lead-generation route exists through contact/consultation forms; these are not shopping-cart product pages.
- Contact embeds the external TintPro form. Cross-domain embedding alone is not a defect. This audit did not submit a lead or establish the quality of a form completion.
- Two office routes and individual phones appear on Locations; preserve office-specific routing and deliberate call tracking unless the tracking audit proves a mismatch.
- No horizontal overflow was recorded in the main homepage desktop/mobile browser checks. Visible menus and responsive variants were distinguished from raw HTML duplication.
- The homepage already contains project and review proof; improve the next click where a detail link is promised rather than adding more generic trust copy.
- Performance causes belong to the dedicated performance report. Copy/route defects above are independently confirmed; image savings alone should not be presented as an LCP fix.

## Research and scoring boundaries

The initial four saved SerpAPI query snapshots require semantic QA: Detroit commercial and residential and Grand Rapids residential results were clearly unrelated to the full requested query; Grand Rapids commercial mixed automotive/directory results. They are excluded from competitor ranking, SERP-overlap and page-type scoring here. No Google ranking, AI-visibility or numeric conversion score is inferred. Existing user tasks and actual navigation evidence are sufficient for the specific path recommendations above.
