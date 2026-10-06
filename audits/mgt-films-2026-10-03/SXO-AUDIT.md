# MGT Films — search experience audit

Date: 3 October 2026. Read-only. Focus: useful search landing pages and accurate next actions, not speculative conversion uplift.

## Page-type alignment

The current homepage, Commercial, Residential and film-category pages are installation-service pages. They do not show an ecommerce purchase journey, so adding product prices, carts or merchant markup is not an assumed requirement. Regional pages serve local installer intent. The existing educational articles have a different job and should retain their question/comparison structure.

A public-search sample for Chicago commercial/residential film returned relevant first-party service/local pages from [AAA Glass Tint](https://aaaglass.com/commercial-window-film-chicago/), [Window Film Depot](https://www.windowfilmdepot.com/locations/illinois/chicago/), [MySignGuy](https://my-signguy.com/window-films/), [Glass Enhancements](https://www.glassenhancements.com/chicago-window-film/) and [Tintegrity](https://tintegrityusa.com/about), alongside MGT's Chicago page. This supports a service/local page type direction, not a numerical top-ten consensus or fixed rank claim. Exact ad/PAA/AI Overview prevalence was not measured in that sample.

## User tasks grounded in current evidence

| User task | Evidence | Appropriate route |
|---|---|---|
| Find a building-film installer nearby | Relevant local/service search results; seven current location links | Location page → quote / actual location information |
| Choose a solution for a home | Homepage Residential option and residential installation hub | Residential → relevant service → consultation |
| Plan a commercial job | Commercial service results; current Commercial and Contractor pages | Commercial/Contractor → useful specifications/process → quote |
| Understand suitability or compare films | GSC traffic to adhesion, Low-E and Prestige articles | Answer/comparison first; optional relevant installation link |

These are evidence-based tasks, not invented persona emotions. A numeric persona or SXO gap score would imply unsupported weighting and is not assigned.

## Confirmed/targeted action defects

### Footer About Us has no business-page destination

The main fresh homepage browser evidence shows **About Us** linking to `https://mgtfilms.com/#`, visible on desktop and mobile. Fresh source selector: `[data-id="060c6ca"] a`. This is different from header **About**, **Services** and **Industries We Serve** dropdown parent controls; those should not be counted as broken merely because their parent href is `#`.

Find the intended existing About page in WordPress/current inventory and publish/link it if approved. If no page is ready, remove the misleading standalone footer link until the real destination exists. Do not redirect About Us to Contact just to fill the field.

### Quote/location buttons need real destinations

Fresh source-verified actions:

- [Solar Control Film](https://mgtfilms.com/services/solar-control-film/), **Get a Free Estimate** under **Performance You Can Measure**, selector `[data-id="3b302d2"] a.btn`, is a plain `href="#"` anchor in the fresh source. Use `https://mgtfilms.com/contact-mgt-films/` (verified HTTP 200) instead; first confirm no intentional modal action exists. A normal rendered screenshot was unavailable after a later capture context encountered a challenge, so label any diagnostic card as source evidence.
- [Chicago](https://mgtfilms.com/locations/chicago/), hero **Find a location**, `[data-id="80b01ce"] a`, uses `/#`, which resolves to the homepage rather than the locations page. Use `https://mgtfilms.com/locations/`. The fresh 300-response checkpoint confirms the same destination on all seven regional hero links: Madison, Baton Rouge, Jackson, Central IL, Chicago, New Orleans and Milwaukee. The saved route map contains all seven selectors. Fresh source is confirmed; a later normal-browser capture was challenged, so the report does not claim a new rendered screenshot/tap test for all seven.

Keep the functioning Request a Quote buttons and existing phone tracking unchanged. Plain source href checks establish navigable destinations, not a recording of JavaScript interactions; validate final taps at desktop/mobile breakpoints before implementation is marked done.

### Match copy to the visitor's audience

Commercial's **Designed for Real Homes and Everyday Living** heading is an audience mismatch. Baton Rouge's Chicago FAQ is a locality mismatch. Switchable Film's installation paragraph describes solar-control film rather than the page's actual category. Correct those source blocks; do not expand copy merely to lengthen pages.

## Additional checks and boundaries

- Main homepage normal-browser desktop/mobile evidence is available. Images whose alt text says New Home Page Revamp are not automatically broken or placeholder visuals.
- The visualizer is an interactive product-selection aid, not a reason to classify every service page as a standalone tool.
- Existing Contact/quote routes were inspected read-only; no enquiry, test lead or phone call was submitted.
- Shared footer headquarters details are not automatically an error on a regional service-area page. The Local module should establish office identity and intended visitor destinations.
- A generic blog list is not a suitable destination when a button promises a specific service or project; verify actual route maps rather than assuming every card is linked.
- Performance fixes must use the dedicated audit's specific files, loading cause and actual lab/field distinctions, not a generic compress-images instruction.

## Order of work

Repair missing destinations and wrong template copy, preserve the working audience/service navigation, then improve relevant real project proof. Use Google query/landing data to choose subsequent improvements; the highest-traffic articles should not be sacrificed to force every session directly to a quote form.
