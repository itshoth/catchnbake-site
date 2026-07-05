# Catch 'N Bake — SEO Strategy: Owning “I caught a fish, now what?”

**Date:** 2026-07-03

## 1. The lane

- **Fishbrain** owns *where/how to catch fish* (spots, forecasts, logging).
- **Fish Rules / FWC** own *regulations* (can I keep it).
- **Nobody owns the moment after the catch**: *“I have a fish in my cooler — can I eat it, and how do I cook it?”* Search demand in that moment is huge, long-tail, species-specific, and served today by scattered forum threads (Reddit, THT), decade-old blog posts, and generic recipe sites that don't know what a sheepshead is.

Every page we build answers that one moment for one species, then hands the searcher the app (“snap a photo → ID → recipe for *your* fish”). The landing page converts; the species pages rank.

## 2. Query taxonomy (the four intents we target per species)

| Intent | Query patterns | Page section that answers it |
|---|---|---|
| **Edibility** | “can you eat {species}”, “are {species} good to eat”, “{species} taste” | Verdict block + taste profile |
| **Preparation** | “how to clean {species}”, “how to fillet {species}”, “{species} skin on or off” | How-to-clean section |
| **Cooking** | “how to cook {species}”, “{species} recipe”, “best way to cook {species}”, “grilled/blackened/fried {species}” | Cooking methods (2–3 per page) |
| **Post-catch** | “what to do with {species} after catching”, “keeping {species} to eat”, “can you keep {species} in florida” | Verdict + regulations pointer |

FAQPage JSON-LD mirrors the question-form queries verbatim — these are the queries that produce featured snippets and are the easiest wins against forum-thread SERPs.

## 3. Species priority queue (Florida inshore first — the seed audience)

Priority scoring = search volume of “can you eat X” + “how to cook X” × (weakness of current SERP) × (likelihood a newer FL angler catches one accidentally).

### Wave 1 — shipped now (`/fish/…`)
1. **Sheepshead** — the archetype query. Newer anglers catch them constantly, they look bizarre, and “can you eat sheepshead” has weak SERP competition (forums + one 2014 blog post). Highest intent-to-app fit: hard to ID, great to eat.
2. **Snook** — massive FL search volume; the eat-it answer is genuinely nuanced (excellent table fare BUT tightly regulated: seasons, slot, snook stamp, no sale — our responsible handling is itself a differentiator and E-E-A-T signal).
3. **Redfish (red drum)** — iconic FL inshore species, big “blackened redfish” cooking volume, slot-limit nuance.

### Wave 2 — next 4 (template is ready, copy needed)
4. **Mangrove/gray snapper** — “are mangrove snapper good to eat” is high-volume, easy win.
5. **Spotted seatrout** — soft flesh, “can you eat trout from florida” confusion with freshwater trout.
6. **Flounder** — high cooking volume, seasonal FL closures add a regs hook.
7. **Mahi-mahi** — huge recipe volume; offshore crossover audience.

### Queued: comparison content (added 2026-07-05)

**“Sheepshead vs black drum”** is a high-value target: a classic misidentification pair (barbels + downturned mouth vs incisor teeth + crisp bars), matching our audience's exact confusion — photo drop #2 itself arrived labeled sheepshead and turned out to be juvenile black drum. Queue a dedicated comparison page (e.g. /fish/sheepshead-vs-black-drum) once the species-page waves are underway; both species pages already seed the answer in their FAQ/intro copy. Don't build it tonight.

### Wave 3 — accidental-catch goldmine (weakest SERPs, highest “now what?” confusion)
8. Ladyfish (“can you eat ladyfish” — classic newbie query), 9. Jack crevalle, 10. Hardhead vs gafftopsail catfish (“can you eat saltwater catfish” — genuinely underserved), 11. Bonnethead shark, 12. Pinfish, 13. Black drum, 14. Pompano, 15. Tripletail, 16. Spanish mackerel, 17. Bluefish, 18. Grouper (red/gag), 19. Whiting, 20. Mullet.

Cadence: 2 pages/week sustains freshness signals without sacrificing quality. Every page is generated from `scripts/build-species.js` — adding a species is one structured data entry (verdict, taste, cleaning steps, methods, FWC link, FAQ) plus two images, then `node scripts/build-species.js` and a sitemap entry. Incremental cost is copy only.

## 4. Page architecture

- **URL:** `/fish/{species-slug}` — short, descriptive, keyword-bearing (`/fish/sheepshead`).
- **Title pattern:** `Can You Eat {Species}? Taste, Cleaning & Best Recipes — Catch 'N Bake` (front-loads the highest-volume question-form query).
- **H1:** the edibility question itself. H2s follow the four intents in order.
- **Fixed template sections** (in order): verdict banner → taste profile → how to clean → 2–3 cooking methods → regulations pointer (link to FWC, never inline numbers that go stale) → app CTA (“ID it and get a recipe in the app”) → FAQ (3–5 question-form queries) → related species links.
- **Structured data per species page:** `Article` + `FAQPage` (mirrors visible FAQ; never invisible content).
- **Internal linking:** landing page → species index links; each species page → 2–3 related species + home; footer → all. This concentrates crawl and distributes the landing page's (eventual) authority.
- **Regulations discipline:** we state *that* a species is regulated and link to the FWC species page. We never state sizes, seasons, or bag limits — those go stale and create liability. This is a hard rule of the template.

## 5. Landing page's SEO job

The landing page will not outrank anyone for species queries — its job is:
- **Brand queries** (“catch n bake app”) — exact-match title and `SoftwareApplication` JSON-LD so the App Store listing and site co-occupy the brand SERP at launch.
- **Category head terms** as secondary (“fish identification app”, “fish recipe app”, “cook your catch”) — mentioned naturally in hero/feature copy, not stuffed.
- Passing authority to `/fish/*` via the species-index section.

## 6. Technical checklist (implemented in this repo)

- [x] Self-hosted variable fonts, preloaded, `font-display: swap` + metric-matched fallbacks (zero font CLS)
- [x] Per-page unique title + meta description + canonical
- [x] OG + Twitter cards on every page; per-page OG image slots (1200×630)
- [x] JSON-LD: `Organization` + `SoftwareApplication` (`/`), `Article` + `FAQPage` (`/fish/*`)
- [x] `sitemap.xml` from real routes only; `robots.txt` pointing at it
- [x] Explicit dimensions on every image slot; below-fold `loading="lazy"`
- [x] Single-file pages with inline critical CSS (no external CSS round-trip)
- [x] Clean URLs (`/fish/sheepshead`, no `.html`) via static-host convention

## 7. Measurement

- Google Search Console (verify domain property via DNS TXT once at Cloudflare — see `docs/DOMAIN_SETUP.md`), watch: impressions for “can you eat…” queries, snippet wins on FAQ questions.
- Success gate for Wave 2 investment: any Wave 1 page reaching page 1 for its “can you eat” query within 8 weeks.
- App-side loop: the species pages should be the app's share-target destination later (“shared from Catch 'N Bake” catches link back to `/fish/{species}`) — that's the durable backlink engine; note for the app roadmap.
