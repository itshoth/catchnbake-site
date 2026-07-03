# Image Manifest — every slot, what to shoot, exact specs

**The rule that makes this painless:** every image slot on the site already points at a real file with a fixed name and fixed dimensions. Placeholder art ships in each slot today. To do the image drop, **overwrite the file with the same name and pixel dimensions** — no HTML changes, no layout shift, done.

Placeholders are design-system wireframes, so the site looks intentional even if it deploys before the drop.

## 1. App screenshots — `images/screens/` (1179 × 2556 px PNG)

Shoot on an iPhone with a 1179×2556 screen (iPhone 14 Pro / 15 / 15 Pro / 16 class). Use a seeded demo account with realistic, attractive data. Clean status bar (9:41, full battery — Xcode simulator does this automatically). Export PNG, then compress (e.g. squoosh.app / oxipng) to keep each under ~300 KB.

| File | Where it appears | What to capture |
|---|---|---|
| `01-identify.png` | Landing hero (above the fold — the money shot) | Identify tab with a great-looking fish photo loaded, "Identify this fish" button visible |
| `02-id-result.png` | "Fish identification" feature section | ID result screen: species + scientific name, High confidence, habitat + regulations summary visible. Sheepshead would rhyme with the fish-guide content |
| `03-recipes.png` | "Recipes" feature section | Recipe results for an identified fish — 4–5 recipe cards showing names + difficulty, region label visible if possible |
| `04-journal.png` | "Catch journal" feature section | Journal Stats sub-tab with a season of data (or the catch Map if it demos better) |
| `05-community.png` | "Community" feature section | Community feed with 2 attractive posts — ideally one catch photo + one cooked-dish photo |

## 2. Species photos — `images/fish/` (1600 × 1000 px PNG)

Real photos of the actual species — a held fish in good light, or on ice/dock. Landscape, subject centered (the frame is displayed full-width at up to ~700 px). If your source is JPEG, either export to PNG with the same filename, or change the extension in `scripts/build-species.js` and re-run it.

| File | Page |
|---|---|
| `sheepshead.png` | /fish/sheepshead |
| `snook.png` | /fish/snook |
| `redfish.png` | /fish/redfish |

Every new wave-2 species page needs its own `images/fish/<slug>.png` (and OG image below).

## 3. Social/OG images — `images/og/` + `images/og-default.png` (1200 × 630 px PNG)

**These are already final** — generated in the brand design (not wireframe placeholders). Link previews in Messages/X/Facebook/Slack will look right on day one. Optionally replace later with photo-based versions at the same size.

| File | Used by |
|---|---|
| `og-default.png` | Landing page, support, legal pages |
| `og/sheepshead.png`, `og/snook.png`, `og/redfish.png` | Each species page |

New species pages get an OG image via the generator workflow (see `scripts/build-species.js` header).

## 4. Icons

| File | Status |
|---|---|
| `favicon.svg` | ✅ Final — brand mark (tide square, paper fish, ember gill) |
| `apple-touch-icon.png` (180×180) | **Optional add** — nice-to-have for iOS bookmark/share sheet. If added, place at repo root and add `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` to each page head |

## 5. Checklist for the drop

1. Overwrite the 5 screenshot PNGs (compressed).
2. Overwrite the 3 species photos.
3. (Optional) photo-based OG images, same sizes.
4. `git add images && git commit` — dimensions are fixed in HTML, so nothing else changes.
