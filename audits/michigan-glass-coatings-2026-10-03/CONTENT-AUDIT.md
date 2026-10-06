# Michigan Glass Coatings — content audit

Audit date: 3 October 2026. Domain: https://michgc.com/. Read-only. This wider report is for Nick; it is not a list of approved implementation tickets.

## Main conclusion

The site already has a useful architecture for architectural window-film installation: homeowner and commercial hubs, individual film services, two regional location pages, a gallery, product resources and educational articles. The strongest content problems are copied labels and paragraphs inside otherwise relevant pages, not a need to create dozens of new pages or meet an arbitrary word count.

Fix the homeowner route and Grand Rapids copy first. These are concrete defects on pages that already receive search exposure. In the saved GSC period, 31 August–29 September 2026, the homepage had 92 clicks/3,166 impressions, Grand Rapids 10/1,665, and Residential 1/268. Page-level figures are not additive to property totals. This traffic does not establish that the defects caused lost leads.

## Confirmed findings

### 1. Homeowners are sent to the commercial hub

Source: [homepage](https://michgc.com/), **Residential Window Film Solutions** block. Its button says **Explore Commercial Services** and links to `/commercial/`.

- Change only residential button `.e5120-e89` to **Explore Residential Services** → `https://michgc.com/residential/`.
- Keep the separate commercial button `.e5120-e34` unchanged. Test the residential button on desktop and mobile.

Evidence: `evidence/home-residential-rendered.html`; `browser-homepage.json`; `content-dom-evidence.json`. Fresh ordinary browser rendered source confirms the exact destination; screenshot is maintained by the main audit.

### 2. Residential content contains commercial/product copy leftovers

Source: [Residential](https://michgc.com/residential/).

| Where | Existing text | Required direction |
|---|---|---|
| Hero `.e5312-e6` | Request a Request | Request a Quote; keep `/contact-us/` |
| Solar Film card, heading `.e5312-e30` | Safety Glass | Describe solar-film heat/glare benefits; retain the solar service destination |
| Privacy and Decorative Film card, heading `.e5312-e36` | 3M Safety & Security Films | Describe privacy/decorative options; retain the decorative service destination |
| Lower benefit sections | Reduce glare in offices | Use homeowner-specific room/glare context, matching each section |
| Buttons `.e5312-e54`, `.e5312-e61`, `.e5312-e72` | Explore Commercial Services, actually linking `/contact-us/` | Use an honest quote label, e.g. Get a Home Window Film Quote, retaining contact destination |

Do not change the three card URLs merely because their descriptions are wrong. The current Solar, Decorative and Security routes already match the card headings. Review the Security card description against the actual film product rather than mixing film and physical glass-panel descriptions.

Evidence: fresh `residential-rendered.html`, `target-captures.json`, `content-dom-evidence.json`. This is one homeowner content/route repair, not several unrelated content-expansion tickets.

### 3. Grand Rapids graphics and decorative sections contain security copy

Source: [Grand Rapids](https://michgc.com/locations/grand-rapids/).

- Under **Custom Window Graphics & Branding Films** (`.e5741-e90`), the next list describes safety/security film, Ultra Prestige, Ultra Flex, IPS and anti-intrusion systems. Replace that list with the actual graphics applications available here, such as storefront branding, custom-printed glass graphics and wall graphics, after confirming the service scope with the existing Custom Graphics page/team.
- The decorative/FASARA paragraph is headed **Explore Security Film Solutions** (`.e5741-e72`). Rename the heading to match decorative/privacy film; keep its existing decorative-service link.

Evidence: `grand-rapids-desktop-rendered.html`, `grand-rapids-captures.json`, `content-dom-evidence.json`, and the main audit's graphics screenshot. Correct the source blocks, not just the screenshot text.

## Content assets worth preserving

- [About](https://michgc.com/about-us/) already explains company history, installation standards and the architectural home/business focus. Do not describe the site as lacking an About page or business experience.
- [Solar Film](https://michgc.com/services/solar-film/), [Security Film](https://michgc.com/services/security-window-film/) and [Decorative Film](https://michgc.com/services/decorative-window-film/) have distinct buying problems and existing FAQs. Keep their roles distinct.
- [Reflective film and heat](https://michgc.com/does-reflective-window-film-reduce-heat/) gives an answer-first educational explanation and already links to Solar Film and Residential in the body. It is not an orphan merely because its URL sits outside `/blog/`.
- [One-way privacy](https://michgc.com/window-film-see-out-not-in/) has a separate informational day/night privacy intent. Do not replace it with a sales landing page just to add conversion language.
- The homepage already displays project examples, named testimonials, brand logos and a Google-review link. The appropriate next step is stronger detail behind genuine proof, not a claim that no proof exists.

## Wider editorial and proof opportunities

1. Make selected project examples verifiable with a project summary: actual region, building type, problem, installed solution, approved photos and outcome that can be supported. Reuse existing projects/gallery first; do not invent results or create a page for every city.
2. [Detroit](https://michgc.com/locations/detroit/) and Grand Rapids public page extracts show project cards linking to the general [blog](https://michgc.com/blog/). Map a card to a relevant existing project/article if one exists; otherwise label it as a general resource rather than promising a project detail. The Detroit section describes Michigan-wide work, so Grand Rapids examples there are not proof of false local claims.
3. Review the legacy [3M Window Films](https://michgc.com/3m-window-films/) and [3M Residential Window Films](https://michgc.com/3m-residential-window-films-superior-homes/) pages before consolidation. They received 2 clicks/135 impressions and 1 click/196 impressions respectively in the saved GSC page report. Brand/product education can coexist with the residential conversion hub. Confirm query ownership and real body overlap before any redirect.
4. For technical educational articles, use a real author/reviewer or a truthful company attribution, plus supporting manufacturer material where helpful. A missing visible individual byline alone is not proof of low quality, an AI penalty or a ranking defect.

## Scope and evidence limits

Fresh rendered source was inspected for homepage, Residential, Solar Film, Security Film and Grand Rapids. Broader About, Contact, Detroit, Decorative Film, blog and legacy-product review also used the public web reader; some cached pages were last retrieved weeks earlier and should be refreshed before implementation. Later technical crawl inventory is the source of truth for all-site counts, indexability and exact duplication. No live content, navigation, schemas or tickets were changed. No automotive/ecommerce assumptions were applied. No claim-verification or backlink task is proposed for the minimal presentation.
