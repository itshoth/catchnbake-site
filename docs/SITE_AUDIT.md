# Catch 'N Bake — Site Audit

**Date:** 2026-07-03 · **Auditor:** Claude Code · **Repo state at audit:** commit `0f4eefb` (“add privacy policy”) + untracked `legal/` folder.

## 1. Page inventory

| Route / file | What it is | Verdict |
|---|---|---|
| `/` (`index.html`) | **The privacy policy — not a landing page.** Old visual identity (Playfair Display + DM Sans, orange `#F47B20`), dated “April 20, 2026”. | **Replace.** The homepage of catchnbake.com currently renders a privacy policy. There is no marketing page at all. |
| `legal/privacy.html` (untracked) | Privacy policy draft in the current design system (Fraunces + Inter, paper `#f7f3ec`, tide `#1f4e5f`, ember `#b3542e`). Header comments say “Publish at https://catchnbake.com/privacy”. | **Promote to `/privacy`** (root `privacy.html` for clean URLs). Placeholders must be filled first. |
| `legal/terms.html` (untracked) | Terms of Service draft, same design system. Includes the UGC/moderation language App Store Guideline 1.2 expects. | **Promote to `/terms`.** |
| `legal/guidelines.html` (untracked) | Community Guidelines (“Rules of the Water”), web mirror of in-app `app/guidelines.tsx`. | **Promote to `/guidelines`.** |
| `/support` | Does not exist. | **Must create** — App Store Connect requires a working support URL. |
| Landing page | Does not exist. | **Must create.** |
| `sitemap.xml`, `robots.txt`, favicon, OG image | Do not exist. | **Must create.** |

**No hosting/deploy configuration exists**: no `wrangler.toml`, no `CNAME`, no CI workflow, no deploy script. Git remote is `https://github.com/itshoth/catchnbake-site.git`. Recommendation: **Cloudflare Pages (free)** connected to that GitHub repo — see `docs/DOMAIN_SETUP.md`.

## 2. Content accuracy vs. the shipping app

Ground truth verified against the app repo (`C:\Users\Jhoth\catchnbake`).

### Old `index.html` privacy policy — stale and inaccurate
- Says sign-in is **“Sign in with Apple”** only and collects “name and email address when you sign in with Apple.” The app uses **email + password auth via Supabase** (`lib/AuthContext.tsx` — `signInWithPassword`; no Sign in with Apple implementation found).
- Discloses only Supabase, Anthropic, Apple Sign In. The app also ships **Amplitude** (analytics), **Stripe** (payments), and **Expo push notifications** — all correctly disclosed in the newer `legal/privacy.html` draft.
- Claims ID photos are “not stored long-term” — in fact ID submissions are archived to a private `fish-submissions` bucket for model feedback. The newer draft is more careful.
- Exposes the personal Gmail as the only contact.
- Conclusion: this page is superseded by `legal/privacy.html` and must not survive at any route.

### `legal/` drafts — accurate but unfinished
- Feature claims (fish ID, recipes, catch journal, community, groups, premium subscription, report/block moderation, account deletion in Settings) match the app code. ✔
- The EXIF-stripping claim (“we strip embedded GPS coordinates … before it is stored”) is backed by behavior, not explicit code: every upload path (`UploadPhotoModal.tsx`, `LogCatchModal.tsx`, fish ID, profile) re-encodes the image via `expo-image-manipulator`, which drops EXIF metadata including GPS. Defensible as written.
- Terms §7 mentions **“consumable purchases (such as fish ID packs)”** — **no ID-pack purchase exists in the app** (subscription only; free tier = 10 IDs/month). Harmless as a forward-looking terms clause, but nothing on the marketing site may claim ID packs.
- Unfilled placeholders: `[EFFECTIVE DATE]` ×3, `[SUPPORT EMAIL]` ×6 (broken `mailto:` links today), `[YEAR]` ×3, `[REGISTERED ADDRESS]` ×2, one inline attorney note in terms §11.
- Routes: the app hardcodes `https://catchnbake.com/privacy` and `/terms` (see §2b) — these files are currently at `legal/*.html`, which a static host would serve at `/legal/privacy` etc. **Wrong route; must move to root.**

### 2b. Routes the app depends on (do not change)
Verified in the app repo: `https://catchnbake.com/privacy` (`app/settings.tsx:23`) and `https://catchnbake.com/terms` (`app/settings.tsx:24`, `app/guidelines.tsx:23`). Guidelines render in-app (`app/guidelines.tsx`) and the hosted terms link to `/guidelines`, so it must exist on the web too. A support URL will be entered in App Store Connect → `/support`.

### 2c. Feature claims the marketing site must NOT make (verified against app code)
| Claim to avoid | Ground truth |
|---|---|
| “Fish ID packs” | No consumable purchase exists. Monetization is subscription only ($4.99/mo, $29.99/yr via Stripe). Free tier: 10 IDs/month. |
| “Follow other anglers” | `SOCIAL_FOLLOWS_ENABLED = false` (`lib/flags.ts`). No follow graph ships. |
| Charter booking / featured captain tier | Charters tab is **hidden from the bottom nav** (`href: null`); “booking” is a request form with no payment/confirmation; the $35/mo captain tier has no purchase flow. Keep charters off the landing page's core features. |
| AI regulations lookup | The standalone regulations screen is broken (stubbed `InvokeLLM` throws) and its tab is hidden. Only real: regulations *summary* inside the fish-ID result + static official-links directory for all 50 states. |
| “Tells you if a fish is safe to eat” | ID result has no edibility field (species, confidence, habitat, regulations summary). Species *pages on this site* answer edibility editorially — the app claim is “ID + regulations summary + recipes.” |
| Skill-tailored recipes | Onboarding collects experience level but generation only uses region (11 US culinary regions). Region-aware is the true claim. |
| Exact subscription prices on the site | Payments are Stripe, not Apple IAP — an App Store review risk that may force pricing changes. Site says “free to download, Premium unlocks unlimited” without printing prices. |
| “Species database of N fish” | Identification is live Claude vision inference; no species database exists. |

### 2d. True, verified claims available for marketing
- AI fish ID from a photo: species + scientific name, confidence (low-confidence gets alternatives instead of a guess), habitat, regulations summary. Free: 10/month.
- 4–6 AI recipes per identified fish, region-aware (11 US culinary regions), each with difficulty, full ingredients, and step-by-step instructions; plus a guaranteed classic fried-fish option with sides.
- Catch journal: photo, species, location/GPS, date/time, weather, temperature, bait, lure, weight, length, notes; one-tap log from an ID; offline logging that syncs later; stats dashboard, catch map, leaderboard.
- Community: feed, recipe sharing, cook-photo sharing, likes/saves/comments, groups (public, category-based), all photos AI-moderated before upload; report + block tooling.
- Seasonal fishing forecast (free): monthly, location-aware species activity + bait/lure recommendations.
- Official regulations links for all 50 states inside the app.
- In-app tagline material: “Catch to Kitchen,” “from pond to plate.”

## 3. Technical SEO audit

### `/` (old index.html)
| Check | Status |
|---|---|
| `<title>` | ❌ “Privacy Policy — Catch 'N Bake” as the homepage title |
| Meta description | ❌ none |
| Canonical | ❌ none |
| Open Graph / Twitter cards | ❌ none |
| Structured data (JSON-LD) | ❌ none |
| Favicon | ❌ none |
| Heading hierarchy | ❌ `<h1>` is the brand name in the header; document content starts at `<h2>`; sections at `<h3>` |
| Fonts | ❌ Render-blocking Google Fonts stylesheet with **no preconnect**; two families loaded for one page |
| Image alt text | n/a (only an emoji logo in a div) |
| Mobile | ✔ viewport meta present, layout is single-column |

### `legal/*.html` drafts
| Check | Status |
|---|---|
| `<title>` + meta description | ✔ present and descriptive |
| Canonical | ❌ none (needed once live at clean URLs) |
| OG / Twitter cards | ❌ none |
| Structured data | ❌ none (low priority for legal pages) |
| Favicon | ❌ none |
| Heading hierarchy | ✔ single `<h1>`, sections `<h2>`, sub `<h3>` |
| Fonts | ⚠ Google Fonts with preconnect — still render-blocking, third-party request chain (CSS → font). Self-hosting removes 2 origins and ~300 ms of critical path. |
| Landmarks | ✔ `<header>`, `<nav aria-label>`, `<footer>`; ⚠ **no `<main>` element** around content |
| Links | ❌ `mailto:[SUPPORT EMAIL]` placeholders are broken links |

### Site-wide
- ❌ No `sitemap.xml`, no `robots.txt`.
- ❌ No OG image (link previews in Messages/social will be blank — bad for an app whose growth loop is anglers sharing).
- ❌ No 404 page (Cloudflare Pages serves its own generic one otherwise).

## 4. Core Web Vitals risks
1. **Render-blocking third-party fonts** (both designs). Fix: self-host the two variable WOFF2 files (~115 KB total, already downloaded to `/fonts`), `preload` them, `font-display: swap`, and add fallback font metrics (`ascent-override` etc.) to kill font-swap CLS.
2. **Layout shift from imagery**: no images exist yet, but every screenshot slot added in Phase 2 must ship explicit `width`/`height` (iPhone portrait ≈ 1179×2556, ratio 0.4613) and `loading="lazy"` below the fold.
3. **Single-file pages with inline CSS** (current pattern) are actually ideal for a static site — no external stylesheet round-trip. Keep it.
4. Paper-grain SVG noise is an inline data URI — no request, negligible cost. Keep.

## 5. Accessibility audit

Measured WCAG contrast ratios:

| Element | Ratio | Verdict |
|---|---|---|
| Old index: `.effective` `#aaa` on `#F8F6F2` | **2.15:1** | ❌ fails AA |
| Old index: white hero text on orange `#F47B20` | **2.73:1** | ❌ fails AA |
| Old index: header sub-label `rgba(255,255,255,.45)` on `#1A1A1A` | 4.47:1 | ⚠ fails AA for its small size |
| Legal pages: body `#4c463c` on paper `#f7f3ec` | 8.44:1 | ✔ AAA |
| Legal pages: links `#1f4e5f` on paper | 8.21:1 | ✔ AAA |
| Legal pages: ember `#b3542e` on paper | 4.49:1 | ⚠ AA for large text only — keep ember for accents/large type, never small body text |

Other findings:
- Legal pages have `:focus-visible` styles ✔, `prefers-reduced-motion` handling ✔, `aria-current="page"` on nav ✔.
- Old index has **no focus styles** and no skip link.
- Missing on all pages: `<main>` landmark (legal pages), skip-to-content link (nice-to-have for these short pages).
- Emoji logo (🎣) in old index has no accessible name.

## 6. Remediation plan (executed in Phases 2–4)
1. Replace `/` with a real landing page in the Fraunces/Inter design system; single source of design tokens.
2. Move legal drafts to root routes `/privacy`, `/terms`, `/guidelines`; fill every placeholder that doesn't require the owner (support email, year, effective date); flag `[REGISTERED ADDRESS]` and attorney review for the owner.
3. Create `/support`.
4. Self-host fonts; preload; fallback metrics.
5. Add per-page title/description/canonical/OG/Twitter, JSON-LD (Organization + SoftwareApplication on `/`; Article + FAQPage on species pages), favicon, OG image slots.
6. Build `/fish/*` species pages (SEO engine), `sitemap.xml`, `robots.txt`, 404 page.
7. Document domain + deploy (`docs/DOMAIN_SETUP.md`).
