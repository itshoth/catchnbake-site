# Catch 'N Bake Site — Launch Report

**Date:** 2026-07-03 · Everything below is committed locally on `main`. **Nothing has been pushed or deployed.**

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
