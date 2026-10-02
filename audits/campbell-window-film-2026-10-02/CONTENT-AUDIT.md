# Campbell Window Film — content audit

Audit date: 2026-10-02. Read-only. Prepared as wider context for Nick, alongside the concise HTML presentation.

## Scope and evidence

Reviewed the homepage, commercial and residential tinting pages, Security Window Film and Security Glass hubs, Huntington Beach location page, About, Contact, three July 2026 articles, the two highest-click pages in the available GSC page report and three historical project examples. These are representative content checks; see the technical module for the final whole-crawl coverage. The ordinary HTTP crawl initially received SiteGround challenge responses; a normal browser session subsequently recovered access. Browser-rendered source verified the homepage and commercial page; other observations below use the web reader or saved crawl and are labeled accordingly. The unrelated CAP Dental shared cache was excluded.

## Findings ready for an implementation brief

### C1 — Commercial introduction names another company

[Commercial window tinting](https://campbellwindowfilm.com/services/commercial-building-window-tinting/) introduces Dalo Glass Tinting in the first paragraph. The same paragraph joins two introductions at `runs.Cut`. This is visible Campbell content, not merely an image filename or analytics label.

- Edit Elementor page 23019, `.elementor-element-355384a4`, to keep one coherent Campbell introduction and remove the other brand reference.
- Check the revised paragraph in desktop/mobile views; search the page/template for remaining Dalo text.

Evidence: `evidence/commercial-brand-rendered.html`, line 926; `evidence/screenshots/commercial-brand.png`. Proposed priority: High. Replacing a wrong brand is justified directly by the rendered page; no sitewide copied-content conclusion is inferred.

### C2 — Commercial Call Now has an incorrect telephone target

On the same page, `.elementor-element-121ff2b a` has `href="tel:(800)20580-9997"`. This contains extra literal digits `20`. The footer displays (800) 580-9997 and uses `%20` for its space instead. The contact page also lists (800) 580-9997.

- Correct the hero link to the approved business number, preferably `tel:+18005809997`, retaining any legitimate call-tracking behavior.
- Check the rendered destination on mobile and search equivalent reused CTA components for the same error. No phone call was placed during this audit.

Evidence: `evidence/commercial-brand-rendered.html`, lines 935–939 and 1955–1959; `evidence/content-dom-evidence.json`. Proposed priority: High. The scope is the observed hero button; other pages require their own verification.

### C3 — Homepage Security Film card opens the Security Glass hub

The [homepage](https://campbellwindowfilm.com/) Security Film heading and its Learn More button both point to `/products/security-glass/`. There is a separate [Security Window Film hub](https://campbellwindowfilm.com/products/security-window-film/), already used by navigation. The neighboring Security Glass card correctly has the glass destination.

- Set `.elementor-element-ffb863f a` and `.elementor-element-64ceed9 a` to `/products/security-window-film/`.
- Verify both links and keep the neighboring glass card unchanged.

Evidence: `evidence/homepage-cards-rendered.html`, lines 995 and 1001; `evidence/browser-homepage.json`, desktop run; `evidence/content-dom-evidence.json`. Proposed priority: Medium. These are mismatched destinations, not 404s.

### C4 — Refresh an existing traffic page rather than discard it

The [one-way privacy page](https://campbellwindowfilm.com/services/one-way-window-film-privacy/) repeats its three introductory paragraphs under “What Is One Way Window Film?” instead of giving a definition there. Fresh rendered source confirms the repeated text in `.elementor-element-b82b34a`. Its Elementor page body contains **zero anchors**, despite discussing day/night differences, installation and alternatives; header/footer links exist.

- Replace the repeated introduction with a direct definition; retain the useful day/night explanation and educational intent.
- Link the daytime discussion to [Daytime Privacy Film](https://campbellwindowfilm.com/services/daytime-privacy-film/), the obscured-privacy alternative to [Frosted Window Film](https://campbellwindowfilm.com/services/frosted-window-film/), and the closing consultation sentence to [Contact](https://campbellwindowfilm.com/contact-us/).

GSC, Aug 31–Sep 29: **202 clicks, 77,619 impressions, 0.26% CTR**, average position 11.09. These are page-report totals, not local qualified leads. Low CTR is an investigation opportunity, not proof that the duplicated introduction caused lost clicks. Proposed priority: Medium. Evidence: `evidence/privacy-repeat-rendered.html` and `evidence/content-dom-evidence.json`.

## Broader strengths and opportunities

The site already separates commercial/residential service journeys, specific film families, security screens, glazing and coverage areas. The sampled commercial/residential pages contain process and price-factor sections; adding length alone is not a recommendation. They are lead-generation installation pages, not checkout product pages.

The recovered crawl also contains substantive existing project evidence. [CBRE Global Investors](https://campbellwindowfilm.com/cbre-global-investors/) names Campbell staff and a client operations contact and describes a Los Angeles Night Vision installation, its area and access logistics. [Union Bank Square](https://campbellwindowfilm.com/union-bank-square/) has project specifications. These historical examples are suitable candidates for prominent service-page proof after confirming attribution, continued accuracy and relevance; there is no need to assume the business lacks case studies. The [Société Générale example](https://campbellwindowfilm.com/societe-generale/) concerns a Swiss 3M project, so do not recast it as a local Campbell installation without evidence.

[About](https://campbellwindowfilm.com/about-us/) identifies contractor classifications and links license number 1144123 to a licensing lookup. This is useful transparency; license validity was not independently adjudicated in this content work. The site also publishes images, a visualizer and customer reviews. The sample does not support calling the entire site generic or lacking expertise.

The [residential page](https://campbellwindowfilm.com/services/residential-window-tinting/) web extraction shows before/after images hosted on dalotint.com in the privacy section. Nick should establish ownership and whether these are intentional shared assets before requesting replacement or migration. Remote hosting alone is not a broken image, unauthorized use, or SEO penalty.

[Huntington Beach](https://campbellwindowfilm.com/locations-served/huntington-beach/) has contextual links to both service hubs and individual film solutions. The [Laguna Beach glass article](https://campbellwindowfilm.com/building-security-glass-laguna-beach-galleries/) and [Burbank security-film article](https://campbellwindowfilm.com/commercial-security-film-burbank-studios/) already link within copy to relevant service content. No blanket “blogs lack internal links” finding is warranted. Their opening extracts showed dates but no named byline; this is an attribution enhancement to review, not proof of AI authorship or a ranking penalty.

The [tinted-house-windows guide](https://campbellwindowfilm.com/the-pros-and-cons-of-tinted-house-windows/) has **199 clicks / 79,519 impressions** in the same period, with existing contextual film links. Preserve this educational entry point. Check query intent and conversions before expanding commercial CTAs or merging it with service content. The two top pages together produce 401 clicks in the page report; consult the Google module for the comparable sitewide total.

## Editorial assessment

Content quality: **75/100**, a qualitative sample-based audit judgment, not a Google score. E-E-A-T working breakdown: experience 21/25 (visual examples and substantial named historical projects); expertise 19/25 (installation/process coverage and stated qualifications); authority 17/25 (stated affiliations and review signals, external credentials only partly checked); trust 18/25 (contact/license transparency offset by the wrong brand and CTA target). Broader reputation, lead quality, and independently validated project outcomes remain outside this content sample.

## Before creating tickets

Nick should confirm the commercial CTA's approved tracked number and whether the Dalo-hosted images are intentional. Use the saved selectors for the three verified fixes. Preserve high-traffic educational pages. Do not treat low word counts, broad topic overlap, or audit-crawler challenges as a reason to delete content.
