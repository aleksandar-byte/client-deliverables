# MGT Films — implementation plan for Nick

Review-only, October 3, 2026. [Presentation](presentation/MGT-FILMS-SEO-AUDIT-PRESENTATION.html) · [Wider audit](FULL-AUDIT-REPORT.md).

## Website team

1. Fix all seven regional Find a location links → /locations/. Check Solar's estimate action before linking /contact-mgt-films/. Resolve the footer About destination or remove the standalone link. [Exact route map](evidence/content-route-map.json).
2. Correct Commercial's residential heading, Baton Rouge's Chicago FAQ/repeated cost phrase, and Switchable's solar-control paragraph. Exact blocks are in the full report.
3. Clean the six verified legacy article shortcode outputs without deleting content/forms; render-test both viewports.
4. Repair malformed FAQ JSON serialization and the Person sameAs placeholder in one schema task; preserve valid unrelated nodes. Use [schema inventory](SCHEMA-REPORT.md).
5. Repair broken article hrefs and propose exact 301s separately. [Complete scoped map](evidence/broken-link-map.csv): Milwaukee article and general Services hub candidates verified; approve intent matching and old-template coverage before rules. About remains unresolved. Use the commercial hub for the broad hotel article's contextual link.
6. Improve text rendering: critical combined CSS, ordered jQuery/Revolution dependencies, repeated reCAPTCHA, desktop Vimeo geometry. Use [specific performance evidence](PERFORMANCE-REPORT.md), not a generic image-compression task. Retest forms, tracking, desktop/mobile speed and layout.

## SEO / tracking team

- Confirm Rosemont hours with client using GBP as reference; then website team aligns shared footer/markup. Do not overwrite all branch hours.
- Verify current GBP landing routes and office/service-area identity before edits; Milwaukee legacy route is noindex. Confirm unusual New Orleans address separately.
- Check form success and phone_number_link_click against lead records; authorize a controlled end-to-end test before changing tracking. Form starts are not completed leads.
- Review sitemap redirect aliases and switchable-route ownership without discarding existing search traffic; preserve informational articles.

## Decisions/access needed

- Approved real About URL, unresolved 404 targets, actual operating hours and authorized GBP owner.
- WordPress/plugin access to identify exact emitters and dependencies; public evidence does not reveal admin IDs.
- Tracking/GTM/form/lead-system access and permission to test. No test enquiry submitted during audit.

## Acceptance and handoff

Verify final link destinations, one-hop exact redirect rules, valid JSON-LD, accurate shared hours and no loss of forms/phone tracking. Recheck speed with repeat tests; do not promise estimated savings as outcomes. Include both the HTML and full Markdown context when sending Nick. Nothing implemented or sent yet; tickets require separate approval.
