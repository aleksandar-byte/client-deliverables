# Campbell Window Film — structured data

Read-only rendered-source analysis, October 2, 2026. Full parsed inventory: `evidence/schema-and-duplicates.json`; initial homepage/commercial snapshots: `evidence/rendered-schema.json`. This is source inspection, not a Google Rich Results Test verdict.

Final source inventory: 292 XML pages checked; 173 contain JSON-LD, 116 contain ProfessionalService (with nested Offer/Service, address, geo and aggregate rating), 54 contain VideoObject, and 36 contain FAQPage. No JSON parse errors, Product nodes, Article or BlogPosting nodes were found. The same blank hours / unnamed Service template is present on all 116 ProfessionalService pages. Lack of Article markup is an enhancement opportunity, not evidence that the 176 posts are unindexable. Existing FAQ markup does not imply Google FAQ rich-result eligibility for this commercial site.

## Grouped finding: clean up the business schema template

The [homepage](https://campbellwindowfilm.com/) and [Commercial Window Tinting](https://campbellwindowfilm.com/services/commercial-building-window-tinting/) contain `ProfessionalService` describing Campbell Window Film. The JSON parses; the address and telephone match the Huntington Beach GBP checked in this audit. Keep this real business identity.

- `openingHours: [""]` is blank. The verified Huntington Beach GBP reports Monday–Friday **8 AM–5 PM**, Saturday/Sunday closed. Populate truthful structured opening hours tied to that location.
- `makesOffer.itemOffered` is a `Service` whose `name` and `url` are both blank. Remove the empty offer/service block or replace it with the actual relevant service and URL. Do not invent a price.
- `@id: "LocalBusiness"` is relative, so the same template can identify a different relative entity on different pages. Use one stable absolute ID for Huntington Beach and reference it consistently. If Los Angeles receives its own local entity, use a distinct ID/address/phone; do not collapse both GBP locations into one address.
- Remove irrelevant empty `servesCuisine` / `hasMenu` fields and other unused blank properties. Retain useful verified fields and social links.

`priceRange: "$$"` is **not an invalid numeric Offer price**; it is a normal descriptive LocalBusiness price range. No recommendation to remove it is justified by the dental audits' earlier Product-price issue. No blanket removal of business schema is recommended. [Schema.org defines priceRange as text](https://schema.org/priceRange), and [Google's local business example uses a dollar-sign range](https://developers.google.com/search/docs/appearance/structured-data/local-business).

Schema aggregate rating is 4.9/129 while the fresh Huntington Beach Maps result was 4.9/128. A one-review difference may reflect timing/source variation; this is a low-priority source-maintenance note, not a headline error. Confirm the source of any displayed aggregate rating and keep markup consistent with what users can see. Do not promise review-star eligibility for self-serving LocalBusiness reviews.

## Implementation boundary

The public HTML identifies the emitted fields, not the WordPress admin record, plugin setting, ACF field or snippet responsible. Locate the generator before editing; do not guess the emitting plugin solely from output shape. Update the template once, then verify representative service, location and homepage source for consistent IDs and accurate location data.

No replacement production JSON-LD was generated: the site's location/entity structure and exact emitter need confirmation first. This prevents supplying a partial replacement that drops valid content. No website edits were made.
