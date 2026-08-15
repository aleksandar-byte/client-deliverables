# Dental Homepage Intake Architecture

## Purpose

This document explains how to collect, verify, reuse, and publish the factual
information needed for a dental homepage. It is designed to keep content,
structured data, local-business information, and future page work consistent
without making deployed schema the client database.

## Core Principle

Maintain facts once, document the evidence for important claims, and keep
homepage editorial decisions separate. Generate visible copy, metadata, internal
links, and JSON-LD from those approved records.

```text
Entity registry
      +
Evidence register
      +
Homepage brief
      |
      v
Visible content + metadata + links + page-specific JSON-LD
      |
      v
Validation and approval
```

Schema is an output of the system. It describes the approved content and entity
relationships on a page; it does not decide what the homepage should emphasize.

## Why The Model Is Split

### Entity registry

Stores durable, reusable facts:

- Practice identity and legal/public names
- Physical locations, NAP, hours, map data, and access details
- Dentists, roles, training, affiliations, and provider relationships
- Services, hubs, canonical URLs, and responsible providers
- Website identity
- Approved media assets and the entities they depict

These facts can support homepages, About pages, dentist pages, service pages,
location pages, metadata, and structured data.

### Evidence register

Stores the support and governance around claims:

- Source URLs and files
- Which entity a claim describes
- Verification status and confidence
- Conflicting values and their resolution
- Date last verified
- Allowed public wording
- Approval for copy, schema, identity linking, and media use
- Whether the equivalent claim is visible on the page

This layer prevents a plausible but unsupported statement from becoming a public
claim simply because it fits the design.

### Homepage brief

Stores editorial and page-specific choices:

- Primary topic, location, audience, and search intent
- Hero message and actions
- Featured providers and services
- Concern-to-service navigation
- Trust-item selection
- Section order
- Priority treatment decision
- Route origins
- FAQs and recent-article rules
- Contextual internal links
- Metadata and social fields

The brief references entity and claim IDs. It should not duplicate provider
credentials, addresses, service definitions, or source records.

## Canonical IDs

Give each reusable object a stable internal ID:

```text
practice:main
location:springfield
person:dr-jane-smith
service:cosmetic-dentistry
service:dental-implants
asset:dr-jane-smith-headshot
source:state-license-jane-smith
claim:jane-smith-hospital-residency
page:homepage
```

Internal IDs do not have to be public URLs. When generating JSON-LD, map them to
stable public `@id` values, normally canonical URLs with fragments:

```text
https://example.com/#practice
https://example.com/contact/#location
https://example.com/meet-dr-jane-smith/#person
https://example.com/dental-implants/#service
```

Reuse the same public `@id` whenever the same entity appears in page markup.
Do not create a new identity for the same dentist or practice on every page.

## Dental Entity Model

Use the most specific accurate types available, but do not force a type merely
because it contains a useful property.

### Practice and locations

- Use a practice or parent `Organization` when a separate parent brand or legal
  organization needs to be represented.
- Use `Dentist` for a physical dental practice or branch because Schema.org
  defines it as a medical/local-business type.
- Give each genuine location its own entity when it has a distinct address,
  local phone, hours, or location page.
- Connect branches to the parent organization where that relationship is real.

### Dentists

- Model each clinician as `Person`, not as a `Dentist` local-business node.
- Connect the person to the practice and locations where they actually work.
- Record education, credentials, memberships, and treatment responsibilities as
  facts, but publish only supported and relevant details.
- Pair a highlighted credential with a careful patient-relevant meaning. Do not
  turn training into an outcome or superiority claim.

### Services

- Give important services stable entities and canonical landing pages.
- Connect each service to the practice and providers that actually offer it.
- Preserve the distinction between a service hub and a specific treatment.
- Keep detailed candidacy, process, risk, recovery, and aftercare content on the
  appropriate service page rather than overloading the homepage.

## Evidence Rules

### Verification statuses

- `confirmed`: supported by an authoritative or first-party source and safe to use
- `probable`: credible but needs client or authoritative confirmation
- `conflicting`: sources disagree; do not publish until resolved
- `unverified`: no adequate evidence; do not publish as fact

### Approval scopes

A claim may be approved for one use but not another:

- `approved_for_public_copy`
- `approved_for_schema`
- `approved_for_same_as`
- `visible_on_page`

For example, an institution page may verify residency training and be suitable as
an external credential link, but it is not necessarily a `sameAs` identity URL.

### Source priority

Prefer sources in roughly this order, while accounting for the type of fact:

1. Official licensing board, university, residency, association, or government source
2. Client-approved internal records or signed practice documentation
3. Official practice or provider profile controlled by the client
4. Official business profile and major platform records
5. Reliable third-party professional directories
6. Other secondary sources requiring confirmation

Resolve contradictions before linking to them. Record the resolution instead of
silently choosing the most convenient value.

## `sameAs` Rules

Use `sameAs` only for URLs that identify the same entity. Suitable examples may
include an official professional profile, an authoritative provider record, or a
social profile controlled by that exact practice or person.

Do not use `sameAs` for:

- A university homepage related to a dentist's education
- An association homepage when membership is the relationship
- A service page related to the practice
- A news article mentioning the dentist
- A directory page for another location or similarly named provider

Represent those relationships with appropriate content, links, or other schema
properties instead.

## Visible Content And Schema

Structured data must represent the page's main visible content accurately. Do
not use JSON-LD as a hidden container for claims the page does not communicate.

Use page-specific graphs:

- Homepage: `WebSite`, homepage `WebPage`, primary practice/location, and selected
  featured relationships
- Dentist page: page entity plus the dentist `Person`, practice relationship,
  and supported credentials
- Location page: location `Dentist` entity, address, hours, map, and parent brand
- Service page: page entity, service entity, provider/practice relationships,
  and supported page-specific facts
- Article: `Article` or `BlogPosting`, author, publisher, and topics actually covered

Not every Schema.org property produces a Google rich result. Rich-result
eligibility is a separate consideration from entity clarity.

## Workflow

### 1. Initialize

Copy the three templates into the client workspace:

```text
content/research/entities.json
content/research/evidence.json
content/homepage-brief.json
```

Use the portable `homepage-content-intake.json` only when one file is easier for
collection or handoff. Split it before ongoing implementation work.

### 2. Inventory existing information

Extract existing website content, WordPress fields, metadata, schema, media,
menus, service URLs, provider pages, and location information. Existing content
is evidence, not automatically truth.

### 3. Research and reconcile

Check authoritative external records and official business information. Create
source and claim records. Mark conflicts explicitly and request confirmation when
they cannot be resolved safely.

### 4. Approve entities and claims

Confirm identities, NAP, provider relationships, offered services, credentials,
hours, media rights, and allowed wording. Keep unsupported values null.

### 5. Build the homepage brief

Choose the hero benefit, featured entities, patient situations, section order,
internal links, route origins, optional sections, and metadata. Reference IDs
from the entity and evidence files.

### 6. Generate public outputs

Create natural visible copy first. Then generate metadata and page-specific
JSON-LD that agree with the final visible page. Do not hand-edit generated schema
without updating the source records.

### 7. Validate

Check:

- JSON syntax and reference integrity
- Duplicate or orphaned entity IDs
- Visible-content and schema agreement
- NAP and hours consistency
- Canonical URLs
- Internal and external destination status
- Schema.org validation
- Google-supported rich-result validation where applicable
- Mobile and desktop visibility of SEO-important content

### 8. Maintain

Set `last_verified` dates and recheck facts likely to change, including hours,
providers, services, appointment methods, memberships, and authoritative profile
URLs. Update source records first, then regenerate affected outputs.

## What Belongs Where

| Information | Entity registry | Evidence register | Homepage brief | Generated output |
|---|---:|---:|---:|---:|
| Practice name and address | Yes | Source if disputed | Reference only | Visible copy and JSON-LD |
| Dentist identity | Yes | Supporting sources | Featured dentist IDs | Bio copy and JSON-LD |
| Residency credential | Fact reference | Claim, source, approval | Selected claim ID | Visible proof and JSON-LD |
| Hero benefit | No | Claim if factual | Yes | Visible copy |
| Featured services | Service facts | Evidence if needed | Service IDs | Cards, links, JSON-LD |
| Top three route origins | No | Selection source | Yes | Directions module |
| FAQ wording | No | Supporting claim IDs | Yes | Visible FAQ |
| Social image | Media fact | Usage approval | Asset ID | Social metadata |
| `sameAs` URL | Candidate profile | Identity approval | Usually no | JSON-LD |
| JSON-LD | No | No | No | Generated only |

## Extension Rules

When adding future fields:

1. Ask whether the value describes an enduring entity, supports a claim, or is a
   page decision.
2. Store it in only one canonical layer.
3. Reference it by ID elsewhere.
4. Add source and approval controls when the value could affect trust, identity,
   medical expectations, or public claims.
5. Do not add a field merely because Schema.org provides a property.
6. Keep optional sections optional; missing evidence should disable a section,
   not trigger generic copy.
7. Version structural changes with `schema_version` and document migration notes
   in this file rather than silently changing meanings.

## Reference Guidance

- Google Organization structured data:
  https://developers.google.com/search/docs/appearance/structured-data/organization
- Google LocalBusiness structured data:
  https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google general structured data guidelines:
  https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google Business Profile representation guidelines:
  https://support.google.com/business/answer/3038177
- Schema.org Dentist:
  https://schema.org/Dentist
- Schema.org Person:
  https://schema.org/Person
- Schema App guidance on stable `@id` values:
  https://www.schemaapp.com/schema-markup/what-is-an-id-in-structured-data/
- Kalicube's practitioner model for entity homes and corroboration:
  https://kalicube.com/entity/entity-corroboration/

Google documentation is normative for Google Search and Business Profile
eligibility. Schema.org defines the vocabulary. Schema App and Kalicube are
industry methodologies and should be treated as implementation guidance rather
than Google requirements.

