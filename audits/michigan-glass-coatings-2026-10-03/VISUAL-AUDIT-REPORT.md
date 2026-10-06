# Michigan Glass Coatings — visual review

Fresh ordinary browser desktop 1440×900 and mobile 390×844: homepage renders with visible H1 and primary estimate CTA; horizontal overflow is zero in both. Local unthrottled desktop H1 LCP was approximately 4.17 seconds; this is not the Google simulated/mobile lab metric. The hero video background generated a large observed shift, separately corroborated by Google desktop CLS diagnostics.

Evidence screenshots: homepage desktop/mobile viewport and full page; homeowner section; Residential; solar/security cards; Grand Rapids desktop/mobile hero and graphics block; desktop footer. The Grand Rapids mobile hero buttons are visible and point to #, whereas desktop variants work. Some placeholder card links are hidden on desktop and are not claimed as visible failures.

HTML presentation validated at desktop 1440×900 and mobile 390×844: six findings, six decoded embedded images, image enlargement/close, anchors, print rules, inline JavaScript and no external runtime requests; zero overflow and no page errors. Two redirect rows and five exact page-link edits included. Diagnostics are labeled as extracts, not website screenshots. Files and manifest remain editable beside the audit. No site changes.
