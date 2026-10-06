# Michigan Glass Coatings — local search context

Read-only verification on 3 October 2026. Two distinct Google Business Profiles were resolved by exact Place ID. They must not be combined into one set of hours, phone numbers or review counts.

## Verified profiles

| Field | Auburn Hills | Grand Rapids |
|---|---|---|
| GBP name | Michigan Glass Coatings, Inc. | Michigan Glass Coatings - Grand Rapids |
| Address | 1000 N Opdyke Rd Ste G, Auburn Hills, MI 48326 | 3940 Peninsular Dr SE #230, Grand Rapids, MI 49546 |
| Local phone | (248) 364-6667 | (616) 388-8468 |
| Hours | Mon–Fri 8:00 AM–4:30 PM; Sat/Sun closed | Mon–Fri 7:00 AM–7:00 PM; Sat 7:00 AM–5:00 PM; Sun closed |
| Rating / reviews | 4.9 / 106 | 4.9 / 14 |
| Category returned | Window tinting service | Window tinting service |
| GBP website | https://michgc.com/ | https://michgc.com/locations/grand-rapids/ |
| Place ID | ChIJw_xOoAXAJIgRts1IqdRk0kg | ChIJgZYqeEBNGIgReS6C3rJ6DPw |

Profile links: [Auburn Hills](https://www.google.com/maps/search/?api=1&query=Michigan%20Glass%20Coatings&query_place_id=ChIJw_xOoAXAJIgRts1IqdRk0kg) · [Grand Rapids](https://www.google.com/maps/search/?api=1&query=Michigan%20Glass%20Coatings%20Grand%20Rapids&query_place_id=ChIJgZYqeEBNGIgReS6C3rJ6DPw).

Evidence: [Auburn Hills exact profile](evidence/local-maps-auburn-hills.json), [Grand Rapids exact profile](evidence/local-maps-grand-rapids.json). The Grand Rapids brand search was discovery only; the exact-profile follow-up is the identity source.

## Website agreement and clarity

The [Locations page](https://michgc.com/locations/) correctly displays both addresses and their respective local phone numbers. The [Contact page](https://michgc.com/contact-us/) correctly displays the Auburn Hills address. The central website number, **800-999-8468**, differs from the local GBP numbers but may be a valid central/tracking line; do not replace it merely because it differs.

The [Grand Rapids page](https://michgc.com/locations/grand-rapids/) contains Grand Rapids service copy but its retrieved footer contains the Auburn Hills address and Metro Detroit context. This can be legitimate headquarters information, but it should be labeled clearly rather than leaving the local visitor to infer which office is being contacted. Verify the rendered footer before implementation, then give the page a clear Grand Rapids contact block and label any retained headquarters details. Do not overwrite the global Auburn Hills address with Grand Rapids.

Opening hours were not visible in the retrieved Contact content. The older client-record export had an 8:30 AM Auburn Hills opening time; the live GBP now says 8:00 AM. That is a stale-record difference, not a confirmed website-hours conflict. Use the live location-specific profile as the audit reference and obtain client confirmation before changing operational hours.

The exported duplicate-looking Auburn Hills record has the same address and phone and no separate Place ID. It is **not** evidence of a third office or duplicate live GBP.

## Reviews: useful evidence, limited sample

Auburn Hills' newest five returned reviews are dated 20 July, 30 June, 25 June, 2 June and 10 April 2026. All five are five-star reviews; no owner-response object was returned for these five. Grand Rapids has a more recent sampled cadence: 30, 28, 23, 17 and 16 September reviews, followed by August/July reviews. Three of the older Grand Rapids reviews in the eight-review sample have owner-response objects.

This suggests an opportunity to maintain a location-specific review-response routine and a steady request process at Auburn Hills. It does not prove that all reviews are unanswered, and no ranking penalty is inferred. Do not combine 106 and 14 into a single location's rating claim. If the site displays ratings dynamically, resolve each widget to its exact profile and date.

Sources: [Auburn Hills newest sample](evidence/local-reviews-auburn-hills.json), [Grand Rapids newest sample](evidence/local-reviews-grand-rapids.json). No reviews were requested, answered or edited.

## Search and citation scope

The Grand Rapids page generated **10 GSC clicks and 1,665 impressions** in 31 August–29 September, compared with 12 clicks in the previous 30 days. This is a real existing local asset: strengthen it rather than replacing it with generic city copy. Organic clicks are not map-pack rank or GBP calls.

A bounded citation search found a [Nextdoor brand listing](https://nextdoor.com/pages/michigan-glass-coating-inc-auburn-hills-mi/). A similarly named listing at 1120 Doris Road appeared elsewhere, but ownership/identity was not confirmed. Do not create a cleanup task until that exact listing is verified as the same business and the current address source is confirmed. Yelp/BBB coverage was not exhaustively verified; not found in this sample does not mean absent.

No grid ranking, GBP owner-side performance, profile verification status, products/services completeness or full citation inventory was available. No overall local score or missing-directory claim is assigned.

## Practical handoff

- Keep the two location identities separate in visible contact details, maps and any location schema; compare fresh schema findings against the verified table above.
- Clarify the Grand Rapids page's local office contact versus headquarters context, using verified details rather than inventing a new branch.
- Review the enquiry measurement path and location selection before assigning local calls/forms to a branch.
- Treat review requests, responses and stale citation checks as separate operational opportunities, not an explanation for the measured traffic trend.

No GBP, citation, website or Client Records data was changed.
