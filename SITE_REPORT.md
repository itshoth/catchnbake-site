# Catch 'N Bake Site — Launch Report

**Date:** 2026-07-03 · Everything below is committed locally on `main`. **Nothing has been pushed or deployed.**

---

## Update 2026-07-05 — Photo drop #2: three new species pages

**Species verification (the calls, evidence, and confidence):** the drop was labeled sheepshead, Spanish mackerel, and red grouper. Two labels confirmed; one overruled.

| Photo | Owner label | My call | Confidence | Anatomical evidence |
|---|---|---|---|---|
| IMG_1196 (8 striped fish, cleaning table) | Sheepshead | **BLACK DRUM (juvenile)** | **~90%** | Inferior/downturned mouths with overhanging snouts (sheepshead mouths are terminal); zero visible incisor teeth on any of 8 fish (sheepshead's are unmissable); whisker-like chin-barbel fringe visible on the center fish in tight zoom; dusky bars on brassy ground vs sheepshead's crisp black-on-silver |
| IMG_6748 (held on bridge pier) | Spanish mackerel | **SPANISH MACKEREL** ✓ | ~85–90% | Scattered golden-yellow oval spots with NO mid-flank yellow stripe (rules out cero); lateral line slopes gently with no abrupt mid-body drop (rules out king) |
| IMG_1126 (3 groupers + 3 small fish, dock) | Red grouper | **RED GROUPER ×3** ✓ | ~85% | Rusty red-brown body, scattered pale/white blotches, reddish dorsal fins (gag = gray + vermiculations; black grouper = dark rectangular blotches + brassy spots). Bonus: the 3 small fish are **yellowtail snapper** |
| IMG_1276 (skillet) | — | Blackened fillets (meal shot; species-ambiguous, no species claim made) | n/a | n/a |

**Photo → slot table:**

| Source | Repo file | Placement |
|---|---|---|
| IMG_1196 | `images/fish/black-drum.{webp,jpg}` | Hero of new **/fish/black-drum** |
| IMG_6748 | `images/fish/spanish-mackerel.{webp,jpg}` | Hero of new **/fish/spanish-mackerel** |
| IMG_1126 | `images/fish/red-grouper.{webp,jpg}` | Hero of new **/fish/red-grouper** |
| IMG_1276 | `images/meals/blackened-fillets-cast-iron.{webp,jpg}` | Cooking sections of **/fish/redfish** (replaces + deletes the flagged stock-salmon image) and **/fish/black-drum** |

Pipeline identical to drop #1 (sRGB, EXIF/GPS stripped — 3 of 4 sources had live coordinates, one in the lower Keys; verified zero location tags repo-wide; no .heic in repo; all files <200KB).

**Because the "sheepshead" were drum:** the sheepshead page still wears its placeholder, and per the brief a **"sheepshead vs black drum" comparison page is queued in docs/SEO_STRATEGY.md** (not built tonight). Both species pages seed the distinction in their intro/FAQ copy meanwhile.

**Site changes:** 3 new generator-built pages with full content, per-species publish dates, Article+FAQPage JSON-LD, and amber-brand OG images; landing field-guide grid grew to 7 cards + a "more every week" teaser tile (clean 2×4); sitemap now 12 routes; cross-links updated (gag ↔ red grouper, drum ↔ redfish/sheepshead).

**Lighthouse (all ≥95 target held):** home **96** · black-drum **97** · spanish-mackerel **98** · red-grouper **98** · redfish **97** — accessibility, best practices, and SEO **100 on every page tested**.

**Needs your confirmation before pushing:** (1) the black-drum call on IMG_1196 — if you're confident they were sheepshead after all, say so and I'll re-place (but check a chin photo first: barbels = drum); (2) red grouper vs other grouper on IMG_1126 if you remember the trip; (3) the blackened fillets are presented species-neutrally on both redfish and black-drum pages — fine, or prefer them on only one?

---

## Update 2026-07-05 (later) — Meal imagery + app-amber brand

| Commit | What it did |
|---|---|
| `4e3ee0c` | **Free-license meal imagery** (Pexels only, per policy): fried fish & chips on /fish/sheepshead, lime-over-the-grill on /fish/snook, blackened fillet on /fish/redfish (stock salmon — flagged), battered fish taco composited into the recipes mockup. Every source URL + photographer + license in `docs/IMAGE_CREDITS.md`. No genuine fried-fish-sandwich stock exists anywhere free — the gag page slot stays empty by design. |
| `adf346a` | **Teal → app amber.** Ground truth from `lib/ThemeContext.tsx`: #f59e0b / #d97706 / slate #0f172a. Raw amber fails WCAG on cream (1.9:1), so a same-hue dark derivative #8a5303 (5.7:1) carries text/links, #b45309 carries large text, and bright #f59e0b lives on dark backgrounds, button fills (with ink text), and decoration. Dark bands are now app-slate #0f172a. Favicon, OG images, and mockups regenerated. The earlier improvised warm-teal shift (787286b) is fully superseded; **warm paper #f8f2e7 was kept** — it flatters amber better than the original cooler cream. |

**Lighthouse after:** home 96 · snook 97 · privacy 98 · support 100 — accessibility/best-practices/SEO **100 on all four**.

---

## Update 2026-07-05 — Real photography + palette shift

| Commit | What it did |
|---|---|
| `e384475` | **Real photos processed + placed; gag grouper guide added.** All 9 photos from `Website pics.zip` unzipped outside the repo, converted (HEIC→WebP + JPG fallback), resized per slot, SEO-named with species IDs, and **EXIF/GPS-stripped — verified zero location tags on every file in the repo** (8 of 9 sources carried live GPS of your spots). Snook, redfish, and the new gag grouper pages got real hero photos; app-preview mockups now composite real photos (hogfish hero, gag ID result, lane snapper + black drum community); landing gained the brown-trout photo band and a 4th guide card; screen slots converted to WebP (hero LCP asset 47KB). |
| `787286b` | **Palette warmed toward the photography** — paper/tide/rule/ink-soft tokens shifted (sampled from the photos' golden-hour copper + slate-teal water), ember untouched, every contrast pair re-verified ≥5.1:1. |

**Tooling installed (logged per mission):** ImageMagick 7.1.2-Q16-HDRI and ExifTool 13.59, both via winget. Processing pipeline documented in `docs/IMAGE_MANIFEST.md`.

**Lighthouse after (all ≥95 target held):** home **96/100/100/100** (LCP 2.2s, CLS 0) · /fish/snook **98/100/100/100** · /fish/gag-grouper **98/100/100/100**.

**Species IDs to double-check (my calls from the photos):** hogfish, lane snapper (×5 on the table), snook, gag grouper (boat + pier shots), redfish, black drum, **black grouper (least confident — could be another gag)**, brown trout. Corrections → rename in `images/photos/` and I'll re-place.

**Still wanted (next drop, see manifest):** cooked-meal photos (none were in the zip — the "meal imagery" part of the brief couldn't be fulfilled from provided assets), a real sheepshead photo, and real app screenshots when demo data is ready.

## What changed, by commit

| Commit | What it did |
|---|---|
| `4ba7ffe` | **docs/SITE_AUDIT.md** — full audit of the starting state: the homepage was an outdated privacy policy in the old orange design; the three real legal drafts sat untracked in `legal/` at wrong routes with unfilled placeholders; there was no landing page, sitemap, robots, OG, favicon, or hosting config. Includes the app-accuracy table of claims the site must NOT make. |
| `043b4f9` | **Legal pages live at app-hardcoded routes** — `/privacy`, `/terms`, `/guidelines` (root `*.html` files; Cloudflare Pages serves them at the clean URLs the iOS app links to). Placeholders filled (effective date July 3 2026, contact email, © 2026). Accuracy fixes: Stripe purchases happen in-app not "on the web"; "fish ID packs" example removed from terms (no packs exist in the app). Self-hosted Fraunces + Inter variable fonts with preload + metric-matched fallbacks; canonical/OG/Twitter meta, SVG favicon, `<main>` landmarks. |
| `407ceb8` | **New landing page** — cinematic editorial design (Fraunces + Inter, paper/tide/ember). Hero, positioning ("the moment after the catch"), 4 verified feature sections (fish ID, recipes, journal, community), "also in the box" strip, fish-guide links, free-vs-premium band (no prices printed — payments are Stripe, an App Store review variable), Organization + SoftwareApplication JSON-LD, honest "Coming soon" App Store badge. |
| `422f0cd` | **/support** — FAQ (wrong ID, free limits, cancel subscription, delete account, reporting, offline) + contact email. This is the App Store Connect support URL. |
| `c4c90b2` | **Species-page content system + first 3 guides** — `scripts/build-species.js` generates `/fish/sheepshead`, `/fish/snook`, `/fish/redfish` from structured data: eat-it verdict, taste, cleaning steps, 3 cooking methods, FWC regulations pointer (links only, never numbers), app CTA, FAQ with matching FAQPage JSON-LD, related-species links. Snook's verdict leads with legality and defaults to release. |
| `369810f` | **SEO infrastructure + docs** — sitemap.xml (8 real routes), robots.txt, branded 404, docs/SEO_STRATEGY.md (keyword taxonomy + 20-species priority queue), docs/IMAGE_MANIFEST.md. |
| `c9fb5b9` | **Lighthouse fixes + deploy handoff** — WCAG contrast fixes, placeholder screenshots re-rendered at half res (LCP 3.8s → 2.2s), `_redirects` for www→apex, docs/DOMAIN_SETUP.md. |

## Lighthouse (local, mobile emulation, headless Chrome)

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| **Before** — old `/` (privacy-as-homepage) | 86 | 91 | 96 | 90 |
| **After** — `/` (new landing) | **96** | **100** | **100** | **100** |
| `/fish/sheepshead` | **98** | **100** | **100** | **100** |
| `/support` | **100** | **100** | **100** | **100** |
| `/privacy` | **98** | **100** | **100** | **100** |

Landing: LCP 2.2 s, CLS 0. All pages ≥ the 95+ target. (Local numbers; re-check on the live Cloudflare URL after deploy — they typically improve on a real CDN.)

## Verified-accuracy notes (things deliberately NOT on the site)

The app repo was read directly; these mission assumptions didn't match the shipping code and were kept off the marketing site: **fish-ID packs** (don't exist — subscription only), **following anglers** (feature-flagged off), **charter booking** (tab hidden from nav; "booking" is a request form), **AI regulations lookup** (screen is broken/stubbed), **skill-tailored recipes** (only region is wired in), **subscription prices** (Stripe-not-IAP is an App Store review risk that could force price changes). Full table: `docs/SITE_AUDIT.md` §2c.

⚠️ **Separately flagged for the app, not the site:** in-app subscriptions run through Stripe PaymentSheet, not Apple In-App Purchase. Apple Guideline 3.1.1 makes this a likely rejection for digital-content subscriptions — worth resolving before review.

## What only you can do (in order)

1. **DNS / hosting (~20 min):** follow `docs/DOMAIN_SETUP.md` — create the free Cloudflare zone, switch nameservers at Namecheap, connect the GitHub repo to Cloudflare Pages, attach `catchnbake.com` + `www`, then `git push origin main` to deploy. (Check that any existing MX/email records import correctly before switching.)
2. **Image drop:** shoot the 5 app screenshots and 3 species photos per `docs/IMAGE_MANIFEST.md`. Overwrite the same-named files — no HTML edits needed.
3. **Store-URL swap (at launch):** paste the App Store link into `APP_STORE_URL` in `js/app-store.js` — every CTA site-wide flips from "Coming soon" to a live badge.
4. **App Store Connect URLs:** support `https://catchnbake.com/support`, privacy `https://catchnbake.com/privacy`, marketing `https://catchnbake.com`.
5. **Legal loose ends:** the LLC's registered address was omitted from privacy/terms contact blocks (add it when ready); effective dates were set to July 3 2026; contact email is `jordan.hoth99@gmail.com` everywhere (swap to a support@ alias later if you create one). Attorney review of privacy/terms still recommended — the drafts' arbitration-clause question was removed from the published page but remains open.
6. **Post-launch:** Google Search Console domain property (DNS TXT at Cloudflare) + submit `sitemap.xml`; then wave-2 species pages via `scripts/build-species.js` (queue in `docs/SEO_STRATEGY.md` §3).
