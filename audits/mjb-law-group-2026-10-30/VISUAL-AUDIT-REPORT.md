# MJB rendered/mobile audit

Genuine browser captures October30,2026. Desktop1280×720; mobile390×844; contact additionally320×844. Read-only—no forms, calls, CAPTCHA or booking submissions.

## Observed layout

- Homepage has clear MJB branding, employment/injury positioning and contingency-fee message. At390px the H1 is visible at y378–442, font16px; benefit text follows. Mobile fixed Call Us and Book Now buttons are48px high; top call/email/map controls are48pxhigh. Call actions use `tel:+19493345025`; Book Now opens `/contact-us/`, a contact form, not a promised scheduling calendar. Do not classify this as broken without a booking requirement.
- Homepage mobile scrollWidth375 is within390pxviewport. Contact390 also has scrollWidth375. At320, contact document/body318px, form277px fromx14tox291. The previous contact-overflow ticket should not be reopened based on these checks.
- Mobile hero continues to animate using the76MBWebP; no video element or static fallback observed. Screenshot shows actual live frame but cannot prove transferweight or animation independently; direct source/range evidence supplies that proof.
- Contact form is visible with name,phone,email,message,consent andCAPTCHA; the audit did not test submission success, deliverability or conversions.
- Article `/administrative-exemption-california/` visibly displays **Reviewed by: Michael J. Berry — Employment And Personal Injury Attorney**, linking to his profile. Do not claim missing legal reviewer from an inaccurate hidden Article author alone; schema and visible reviewer are separate fields.
- Dynamic phone replacement appeared in PSI (e.g.949-676-6532 mobile,949-881-5180desktop). Do not call these wrong numbers without the existing tracking-pool verification.

## Screenshot files

| File | Genuine captured context |
|---|---|
| `screenshots/homepage-desktop.jpg` | Desktop first screen,1280×720 |
| `screenshots/homepage-mobile.jpg` | Mobile first screen,390×844 |
| `screenshots/contact-mobile.jpg` | Contact first screen,390×844 |
| `screenshots/contact-320.jpg` | Contact at320px showing existing layout fix remains within viewport |
| `screenshots/article-mobile.jpg` | Article opening and reviewer context at390px |

Images are JPEG browser captures, not generated mockups or reconstructed page content. No arrows/annotations were added. Keep original evidence intact. The browser viewport override is reset after inspection.
