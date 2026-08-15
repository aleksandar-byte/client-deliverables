# Dental Homepage Content Intake

Use this checklist to collect information before writing or rebuilding a dental
homepage. It is the human-facing intake; the structured files are the working
records used by the agent and web team.

## How The Intake Is Organized

Collect information in three layers:

1. **Entities:** reusable facts about the practice, locations, dentists,
   services, website, and media.
2. **Evidence:** sources, verification status, approvals, conflicts, and allowed
   public wording for important claims.
3. **Homepage brief:** page-specific choices such as the hero benefit, featured
   services, section order, FAQs, routes, articles, and internal links.

Structured data is generated output. Do not use deployed JSON-LD as the master
record. See `homepage-intake-architecture.md` for the complete model.

Leave unknown values blank or mark them for confirmation. Do not replace missing
information with generic marketing copy.

## Minimum Information Required To Start

### 1. Practice entity

- [ ] Stable internal ID, for example `practice:main`
- [ ] Exact public practice name
- [ ] Legal business name, when different
- [ ] Primary dental category or practice type
- [ ] Short, verified description of the care scope
- [ ] Primary patient audience
- [ ] Current homepage URL and preferred canonical URL
- [ ] Official logo and approved image source
- [ ] Authoritative profiles that clearly represent the same practice

### 2. Location entity

For every real patient-facing office:

- [ ] Stable internal ID, for example `location:springfield`
- [ ] Practice ID it belongs to
- [ ] Exact street address, suite, city, state, and ZIP code
- [ ] Local phone number and public email, when used
- [ ] Current customer-facing hours
- [ ] Appointment-request URL or confirmed booking method
- [ ] Verified map destination
- [ ] Parking, accessibility, entrance, and landmark details
- [ ] Confirmation that it is a real office, not a nearby community

### 3. Dentist entities

For every dentist appearing on the homepage:

- [ ] Stable internal ID, for example `person:dr-smith`
- [ ] Full professional name and credentials
- [ ] Professional title and role
- [ ] Practice and location relationships
- [ ] Treatments or service areas they personally provide or plan
- [ ] Relevant education, residency, postgraduate training, or experience
- [ ] Plain-language patient benefit of each highlighted credential
- [ ] Internal dentist biography URL
- [ ] Authoritative credential, license, institution, or association URL
- [ ] Approved first-party portrait and source location
- [ ] Confirmation that the portrait may be used

A credential is not automatically a benefit. State what it helps the dentist do
for patients without promising quality, safety, eligibility, or outcomes.

### 4. Service entities and internal destinations

- [ ] Stable ID for every important service or hub
- [ ] Verified service name and care scope
- [ ] Confirmation that the practice actually offers it
- [ ] Responsible dentist or team, when known
- [ ] Live canonical service or hub URL
- [ ] Parent hub and related services
- [ ] Services or URLs that must not be promoted

### 5. Contact and new-patient facts

- [ ] How online and telephone appointment requests are confirmed
- [ ] When a patient should call instead of using the online form
- [ ] Urgent dental instructions
- [ ] New-patient forms or resource URLs
- [ ] Confirmed insurance participation wording
- [ ] Estimate, financing, and payment information
- [ ] What patients should bring or prepare, when confirmed

## Evidence And Approval Required For Claims

Create an evidence record for every important, non-obvious claim:

- [ ] Stable claim ID
- [ ] Entity the claim is about
- [ ] Factual statement
- [ ] Proposed public wording
- [ ] Source URL or file
- [ ] Source type and authority
- [ ] Verification status: confirmed, probable, conflicting, or unverified
- [ ] Date last verified
- [ ] Owner or approver
- [ ] Approved for public copy
- [ ] Approved for structured data
- [ ] Approved for identity linking with `sameAs`
- [ ] Whether the claim will be visible on the page
- [ ] Allowed public wording and limitations

Do not use `sameAs` for a merely related page. It should identify the same
practice or person. Do not publish a credential, award, experience number,
membership, review excerpt, or technology claim until its evidence and use are
approved.

## Homepage Decisions

These choices belong in the homepage brief, not in the reusable entity record.

### 1. Search and audience focus

- [ ] Primary homepage topic
- [ ] Primary city or location focus
- [ ] Main patient audience and intent
- [ ] Proposed title and meta description
- [ ] Pages or topics the homepage should not compete with

### 2. Hero

- [ ] One patient-relevant practical benefit
- [ ] One supported practice distinction, when useful
- [ ] Primary action label and destination
- [ ] Secondary phone or appointment action
- [ ] Approved hero media or a clearly labeled placeholder request

### 3. Concern-to-service navigation

- [ ] Three to six real patient situations
- [ ] One primary hub or service for each situation
- [ ] At most one additional specific treatment link when directly useful
- [ ] Enough explanatory context to make each link meaningful

### 4. Trust and provider introduction

- [ ] Three to five concise trust facts
- [ ] Claim ID supporting each fact
- [ ] Featured dentist IDs
- [ ] Approved dentist portraits
- [ ] Credential-to-patient-benefit wording

### 5. Location and routes

- [ ] Primary location ID
- [ ] Top three relevant secondary locations for direction links
- [ ] Reason and source used to select each origin
- [ ] Valid route URL from each origin to the practice

Nearby communities are direction origins, not additional office locations.

## Optional Sections

### Practice evidence

- [ ] Original office, team, technology, or case media
- [ ] Asset source, owner, consent, and permitted use
- [ ] Exact attributable review excerpt and source URL
- [ ] Specific claim supported by each item

Remove the section when useful, publishable evidence is unavailable.

### Priority treatment

- [ ] Verified demand or business reason for featuring it
- [ ] Service ID and responsible provider ID
- [ ] Relevant credential, technology, case, or original media
- [ ] Complete service page for detailed treatment information

### FAQs

- [ ] Real pre-appointment questions not already answered elsewhere
- [ ] Verified direct answer for every question
- [ ] Useful supporting destination when more detail helps

Do not create FAQs from keyword variations or repeat information already on the
page.

### Recent articles

- [ ] Active blog or patient-resource hub URL
- [ ] Three recent, relevant, indexable posts
- [ ] Accurate title, URL, date, excerpt, and featured image
- [ ] Dynamic query rules and exclusions

## Generated Outputs And Final Checks

Generate these only after entities, evidence, and page decisions are settled:

- [ ] Visible homepage copy
- [ ] Contextual internal-link map
- [ ] Image filenames and alt text
- [ ] Title and meta description
- [ ] Page-specific JSON-LD graph
- [ ] Practice, location, provider, and service relationships
- [ ] Rich Results Test and Schema.org validator results
- [ ] Exact NAP comparison with official business profiles
- [ ] Facts still requiring confirmation
- [ ] Final content, media, metadata, and schema approvals

