# MGT Films — content architecture and intent map

Date: 3 October 2026. Read-only existing-site review. This is not approval for mass new pages or automatic redirects.

## Direction for Nick

The site already has a multi-region architectural-film architecture and an educational library with meaningful search traffic. Repair migration/template edges first, then improve links from relevant existing articles and project examples. Do not mistake automotive tint interest for building-film demand, or treat every article mentioning a city as an additional service landing page that must be created.

## Existing intent owners

| Intent | Existing destination | Recommended role |
|---|---|---|
| Brand / broad installation | [Homepage](https://mgtfilms.com/) | Direct to audience, solution or actual region |
| Building/facility installation | [Commercial](https://mgtfilms.com/commercial-window-tinting/) | Commercial buying process and film options |
| Homeowner installation | [Residential](https://mgtfilms.com/residential-window-films/) | Residential comfort/privacy and consultation |
| Contractor partnership | [Contractors](https://mgtfilms.com/window-tinting-for-contractors/) | Project coordination needs; distinct from end-user hub |
| Solar control | [Solar Control Film](https://mgtfilms.com/services/solar-control-film/) | Installation/service owner, not an ecommerce product |
| Security film | [Security Film](https://mgtfilms.com/services/security-film/) | Keep distinct from physical security glass |
| Decorative/privacy design | [Decorative Film](https://mgtfilms.com/services/decorative-window-film/) | Keep distinct from powered Switchable Film and custom branding |
| Regional provider | [Locations](https://mgtfilms.com/locations/) and existing seven regional pages | Route to relevant service and usable quote/location controls |
| Compatibility information | [Adhesion guide](https://mgtfilms.com/blog/window-film-adhere/) | Answer the surface question; optional contextual service/assessment path |
| Product evaluation | [Prestige comparison](https://mgtfilms.com/blog/3m-prestige-vs-other-window-films-pros-cons/) | Preserve comparison format and existing relevant links |
| Hospitality applications | [Hotel guide](https://mgtfilms.com/blog/best-window-film-for-hotels/) | Explain film selection by hotel area; link to broad commercial hub |

Other existing services include Architectural Resurfacing, Custom Graphics, Switchable Film and Feather Friendly. Use the live navigation inventory to select those exact destinations; do not create duplicate generic alternatives because their names vary.

## Specific internal-link work

### Fix current navigation promises

- Quote actions should lead to the existing `https://mgtfilms.com/contact-mgt-films/`, unless an intentional tested quote modal is implemented.
- Find a location actions should lead to `https://mgtfilms.com/locations/` or a verified specific location section. The seven regional heroes currently use `/#`, returning visitors to the homepage, not the location finder.
- Footer About Us should point to an approved genuine business page or be removed until available. Header dropdown parents are a different control and are not automatically defects.

### The new hotel article uses an unnecessarily local old route

The fresh crawled [hotel guide](https://mgtfilms.com/blog/best-window-film-for-hotels/) links the broad anchor **commercial window film** to `/commercial-window-tinting-in-milwaukee/`, although its discussion is not Milwaukee-specific. The technical follow-up confirmed that target returns HTTP 404. Use the verified current broad Commercial hub `/commercial-window-tinting/` for this article's anchor. A separate existing `/blog/commercial-window-tinting-in-milwaukee/` is a candidate destination for genuinely Milwaukee-specific links; source context should determine the map. The hotel article also links **Contact MGT** to `/contact/`, which currently 301-redirects to the working `/contact-mgt-films/`; update the body link directly to the final URL. The Contact alias is not a 404.

### Reuse real projects as supporting content

Existing stadium, Illinois-home and St Louis decorative project articles can support appropriate Commercial, Residential or Decorative service sections. First clean any visible legacy shortcodes and confirm current routes/images/permissions. Use contextual labels describing the project, not another broad keyword-stuffed navigation list.

## Legacy/current pairs to review before consolidation

| Existing/legacy URL | Related current route | Decision rule |
|---|---|---|
| `/jackson-mississippi-window-film/` | `/locations/jackson-ms/` | Final crawl confirms old URL redirects to homepage; review direct local match before updating. Legacy row has 16 clicks/2,957 impressions |
| `/switchable-window-film/` | `/services/switchable-film/` | Both verified indexable/self-canonical HTTP 200 installation pages. Choose ownership after query and unique-content review; legacy row has 7 clicks/739 impressions |
| `/commercial-window-tinting-in-milwaukee/` | `/locations/milwaukee/` and Commercial hub | Keep geographic and broad service purposes distinct; fix contextual link intent without guessing redirect target |
| Older decorative/privacy product articles | New Decorative/Custom Graphics service routes | Retain educational or project evidence when useful; merge only genuinely equivalent content |

GSC period: 31 August–29 September 2026. The live facts above come from final crawl checks, not the GSC legacy row alone. The technical module supplies exact redirects and canonicals; preserve working redirect history rather than creating unnecessary chains. Switchable is a verified intent-overlap candidate, not proven ranking cannibalization.

The final broken-target map also identifies `/services/window-film-installation/` linked from the Residential-versus-Commercial and Architectural Resurfacing Chicago articles. The verified current `/services/` is the general service hub; use it where the anchor really describes general film installation. Four additional broken targets appear only on noindex `/new-home-page/`; do not present those as current homepage navigation.

## SERP and clustering limitations

A public-search sample found relevant Chicago service/local competitors, supporting the broad service-page approach. It was not a complete consistent top-ten SERP for every keyword pair. No numeric overlap matrix, cannibalization diagnosis, fixed keyword volume or new-page count is fabricated from text similarity. The dedicated keyword report should supply validated demand and semantics before new briefs are prioritised.

Generic references to similar films are not enough to merge compatibility, night-privacy, Low-E and comparison articles. The top educational entry pages serve separate questions and already attract clicks. Improve them selectively without forcing all informational traffic into a transactional page.

## Priorities

1. Repair known action destinations and wrong locality/audience labels.
2. Clean visible old shortcode output while preserving useful article/project content.
3. Update verified legacy body links to current intent-matching destinations.
4. Reuse appropriate real project evidence from the existing library.
5. Consider new content only after query/intent and live duplicate checks identify a genuine gap.

No sitewide orphan conclusion is drawn from a sitemap-seeded or capped crawl. Full crawl scope and final URL coverage remain in the technical report.
