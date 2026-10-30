# MJB — SXO, user intent and AI-readiness review

October30,2026. Uses this run's six saved Google/SerpAPI snapshots and initial-HTML crawl only; no new paid queries, no AI-answer simulation and no external writes. **All alignment judgments below are qualitative auditor assessments, not Google scores, ranking factors or guaranteed outcomes.**

## Commercial search landscape

The three commercial snapshots are US-English desktop results localized to Tustin: employment lawyer Tustin CA; personal injury lawyer Tustin CA; wrongful termination lawyer Orange County. Each contains organic listings and a local pack. Only these three are used for hiring-intent conclusions. The other three broad brand/address/attorney searches are discovery checks, not a commercial consensus sample.

### Organic page-type classification

The taxonomy is applied to primary intent, not to a shared footer address. Directory listings are closest to comparison/local-discovery pages; firm service-area pages are local service pages. Classifications rely on saved titles/snippets/displayed URLs; competitor full pages were not fetched, so schema, actual word counts and layouts remain unverified. `/goto` obfuscated URLs are retained in the evidence; no guessed exact paths are represented as verified.

| Query / organic position | Observed result | Page type / confidence |
|---|---|---|
| Employment #1 | Justia, Best Employment Lawyers in Irvine | Directory/comparison; clear |
| Employment #2 | PLBH, Employment Attorney in Tustin CA | Local service; clear from title/location path |
| Employment #3 | OC Employment Law Firm, Contact | Local/contact; clear |
| Employment #4 | Hogie & Campbell, About Us | Firm identity/about, nearest service/local family; provisional |
| Employment #5 | Stevens & McMillan, Tustin service area | Local service; clear |
| Injury #1 | Best Lawyers, Tustin listing | Directory/comparison; clear |
| Injury #2 | Hicks, Tustin Personal Injury Lawyer | Local service; clear; observed URL `https://www.hickslawfirm.com/tustin-personal-injury/` |
| Injury #3 | Niven & Niven, Personal Injury Attorneys North Tustin | Local service; clear |
| Injury #4 | Best Personal Injury Lawyers Orange County | Directory/comparison; provisional from listing/title |
| Injury #5 | Bisnar Chase, Tustin Personal Injury Lawyer | Local service; clear from title/snippet |
| Wrongful termination #1 | Work Lawyer OC, Wrongful Termination Santa Ana | Local service; clear; observed URL `https://worklawyeroc.com/wrongful-termination-lawyer-santa-ana/` |
| Wrongful termination #2 | OC Employment Law Firm, FAQs | Hybrid service/information; provisional |
| Wrongful termination #3 | Orange County Employment Lawyer | Service/local; clear from snippet |
| Wrongful termination #4 | Best Employment Lawyers Orange County | Directory/comparison; provisional |
| Wrongful termination #5 | Wrongful Termination, California Employment Lawyer | Service/local; clear |

The repeated hiring/local-service pattern supports keeping dedicated employment, injury and wrongful-termination destinations. Directories also compete for comparison/discovery; this does **not** mean a law firm should turn its service page into a "best lawyers" listicle. No clear blog-versus-service page-type mismatch is demonstrated. The Tustin page is a sensible local employment destination; the Orange County hub supports wider coverage.

## Four evidence-grounded user needs

| User / story | Observed signal | Current response and direction |
|---|---|---|
| Employee deciding whether to call: I want to know whether my workplace issue fits and what a consultation costs, but case eligibility and fees are unclear | Employment PAA asks how much employment lawyers charge; local ads say "$0 upfront" and "Free consultation"; wrongful-termination PAA asks whether you must pay a lawyer | Existing service categories, free case evaluation and contingency statements serve this need. Keep case-fit wording specific. Correct the FMLA card because the heading currently leads to a discrimination explanation. |
| Nearby client choosing a real office: I want an accessible local lawyer, but must know whether this is an actual office or a nearby service area | Local packs and Tustin/NorthTustin service-page results; contact result publishes address | Tustin address, map/contact and Irvine page's explicit "nearby in Tustin" statement support clarity. Do not invent an Irvine office or merge service areas simply for similar templates. |
| Injury claimant researching next steps: I want to understand the process and speak to the right accident lawyer, but I am unsure what happens next | Injury PAA includes how long after an accident you can sue and how to find a motorcycle lawyer; injury ads emphasize no fees unless winning | Injury hub, service list, process article and contact path already serve research and hiring stages. Keep education→service links; repair redirecting motorcycle anchor under the existing technical cleanup rather than remove the guide. |
| Worker still learning: I want a clear explanation before choosing representation, but rules/definitions are confusing | Employment/wrongful-termination PAA asks about termination laws and HR decisions; actual GSC queries include job abandonment, waiting-time penalties and holiday pay | Existing educational library plus reviewer identification and relevant service links match this stage. Retain informational intent; do not force every guide into a sales page. |

These are inferred journey needs grounded in the listed signals, not measured visitor psychology, conversion rates or a claim that every PAA answer belongs on every service page. Do not add a universal deadline answer without qualified legal review.

## Limited topic map — existing pages, not a new30-keyword plan

- **Employment commercial hub** `/employment-law/` → specific misclassification, wage-theft, retaliation, leave and wrongful-termination services.
  - Misclassification education: `/administrative-exemption-california/`, `/exempt-vs-non-exempt-california/`, `/independent-contractor-vs-employee/` → existing misclassification-service path.
  - Pay education: `/on-call-pay-california/`, `/california-overtime-laws/`, `/waiting-time-penalties-california/` → wage/service/contact paths where contextually relevant. Do not add links mechanically to every paragraph.
  - Retaliation/termination education: `/workplace-retaliation-california/`, `/california-termination-laws/`, `/at-will-employment-california/` → matching hiring-service pages, with the retaliation example already linked.
- **Injury commercial hub** `/personal-injury-law/` → car, motorcycle, truck, pedestrian, premises, dog-bite and wrongful-death services.
  - `/can-i-claim-whiplash-as-a-passenger/` → existing car-accident-service link.
  - `/what-you-need-to-know-about-the-personal-injury-process/` → existing injury-hub link.

Commercial and informational pages may cover related topics without duplicate intent. No query-by-page SERP-overlap or cannibalization study was performed; do not propose merging these pairs from common keywords alone. Current Search Console already shows useful education traffic.

## GEO / machine-readable readiness

- **Initial HTML:** core content, headings, sources and reviewer text appear in the saved HTML; this is not a JavaScript-only content shell. This improves accessibility to non-rendering fetchers but does not prove any AI engine cites it.
- **Robots:** the default `User-agent:*` rules allow ordinary public pages; explicit exclusions concern admin/feed paths. There is no general AI-bot block in the inspected file. Respect existing policy; no crawler-permission change is needed merely for this audit. Search access and model-training permissions are not interchangeable.
- **Identity:** visible Michael Berry reviewer links and specific bios are strengths. Correct Article author typed as Person "MJB Firm" through the consolidated schema task; preserve true reviewer/author distinctions. Do not invent personal authorship or certifications.
- **Extractable answers:** administrative-exemption headings, FAQs, specific definitions, DIR/Cornell links and short answer paragraphs provide independently understandable passages. Useful legal explanations need accurate scope and qualified review; do not inject fabricated statistics or pad passages to a numerical "citation optimum".
- **Freshness:** no visible `<time>` labels in the sample, but JSON-LD includes dates. If a real review date is maintained it can be displayed; never convert audit day to a false article update date.
- **llms/RSL:** technical probe results must be read as availability, not ranking requirements. A missing optional guidance file is not an indexing or AI-visibility failure. No licensing-policy change is proposed.
- **Platform visibility:** ChatGPT, Perplexity, AIOverviews, Copilot citation/share-of-voice was not measured. No numeric platform-readiness/visibility score, external brand-mention census, Wikipedia eligibility, Reddit presence or YouTube authority claim is supplied. Existing social links alone do not prove platform authority.

## Action direction

1. Keep true entity/schema consistency work in one ticket, without adding a duplicate reviewer task.
2. Correct the12FMLAcards if approved; this is a specific reading/intent mismatch rather than a generic copy rewrite.
3. Preserve healthy service and education architecture; focus internal-link effort on observed wrong/redirecting targets and genuine missing contextual paths, not extra menu entries for every article.
4. Address the confirmed mobile media issue separately using the existing staged preview; a strong content match does not remove the need for usable delivery.

Sources: `evidence/content-analysis.json`, `serp-summary-0.json` through `serp-summary-5.json`, `gsc-current-pages.json`, `gsc-current-queries.json`, `crawl-pages.json`, `robots.txt`, `technical-probes.json`, and the CONTENT/TECHNICAL/SCHEMA/PERFORMANCE reports. These are one-date observations, not a comprehensive competitor crawl, legal review, conversion test or AI-citation experiment.
