# Image Manifest — every slot, current contents, exact specs

**Updated 2026-07-05 (drop #2 processed — see bottom).** Drop #1: Nine photos from `Website pics.zip` were processed (HEIC→WebP+JPG, resized, **all EXIF/GPS metadata stripped and verified zero**) and placed. Species IDs below are mine from the photos — correct me if any are wrong and I'll rename/re-place.

**Processing pipeline** (ImageMagick 7.1.2 + ExifTool 13.59, both installed via winget):
```
magick IN -auto-orient -profile "C:/Windows/System32/spool/drivers/color/sRGB Color Space Profile.icm" -strip [-crop ...] -resize ... -quality ~72-80 OUT.webp/jpg
exiftool -r -GPS:all -EXIF:all -XMP:all images/   # must return nothing
```
Format call: **WebP + JPG fallback** via `<picture>` for direct photo slots; app-preview screens are WebP-only `<img>` (universal support, and they're generated artwork).

## 1. App screens — `images/screens/*.webp` (590×1279 display copies)

These are **app-preview wireframes with the real catch photos composited in** — not real app screenshots yet. Generated from a design-system template; each carries an "app preview" caption in-frame.

| File | Where | Contains now | Real-screenshot drop |
|---|---|---|---|
| `01-identify.webp` | Landing hero | Identify screen with the **hogfish** boat photo loaded | Replace with real screenshot |
| `02-id-result.webp` | Fish ID feature | Gag Grouper result using the **gag (boat)** photo | Replace with real screenshot |
| `03-recipes.webp` | Recipes feature | "Cook Your Gag Grouper" recipe list (no photo) | Replace with real screenshot |
| `04-journal.webp` | Journal feature | Stats wireframe | Replace with real screenshot |
| `05-community.webp` | Community feature | Feed with **lane snapper table** + **black drum night** photos | Replace with real screenshot |

To drop real screenshots later: capture at 1179×2556 PNG, then per file:
`magick real.png -resize 590x -strip -quality 82 images/screens/01-identify.webp` — filenames fixed, no HTML edits.

## 2. Species page heroes — `images/fish/<slug>.{webp,jpg}` (1400×875)

| File | Status | Photo |
|---|---|---|
| `snook.*` | ✅ **Real** | Golden-hour dock snook (from IMG_0834) |
| `redfish.*` | ✅ **Real** | Flats-boat redfish, tail spot visible (IMG_3143) |
| `gag-grouper.*` | ✅ **Real** | Pier gag grouper (IMG_8324) |
| `sheepshead.*` | ⬜ **Still placeholder** | Drop #2's "sheepshead" turned out to be juvenile black drum — the slot is still waiting for a real sheepshead |
| `black-drum.*` | ✅ **Real** (drop #2) | Puppy-drum limit on the cleaning table at night (IMG_1196) |
| `spanish-mackerel.*` | ✅ **Real** (drop #2) | Spanish mackerel held on a bridge pier, spots visible (IMG_6748) |
| `red-grouper.*` | ✅ **Real** (drop #2) | Two red groupers on the dock (IMG_1126 — three yellowtail snapper also in the source frame) |

## 3. Processed photo library — `images/photos/` (not all placed yet)

| File | Species (verify me) | Currently used |
|---|---|---|
| `hogfish-catch-offshore-florida.*` | Hogfish | Inside hero screen mockup |
| `gag-grouper-catch-boat-florida.*` | Gag grouper | Inside ID-result mockup |
| `lane-snapper-catch-cleaning-table.*` | Lane snapper ×5 | Inside community mockup |
| `black-drum-catch-night-dock.*` | Black drum | Inside community mockup |
| `brown-trout-fly-fishing-mountain-stream.*` | Brown trout | Landing photo band (2.35:1 crop) |
| `black-grouper-catch-jetty-florida.*` | Black grouper (**least confident ID** — could be gag) | Unplaced — reserved for a future grouper/wave-2 page |

Low-res sources kept out of large slots: IMG_4652 (black drum, 576px) and IMG_0955 (gag boat, 1170px) only appear inside small mockup areas where their resolution is fine.

## 4. Meal imagery — `images/meals/` (1400×875, stock)

Mixed: Pexels stock AND one owner photo. `blackened-fillets-cast-iron.*` (drop #2, owner-shot, species-ambiguous fillets) now serves BOTH /fish/redfish and /fish/black-drum cooking sections — it replaced the flagged stock-salmon image, which was removed from the repo. Full source URLs, photographers, and licenses in `docs/IMAGE_CREDITS.md`. The gag-grouper page has no meal image (no genuine fried-fish-sandwich stock exists — shoot one).

## 5. Social/OG — `images/og-default.png`, `images/og/*.png` (1200×630)

Brand-design cards (final, amber brand): default + sheepshead, snook, redfish, gag-grouper. Optionally replace with photo-based versions at the same size later.

## 6. Still wanted (the next drop)

1. **Your own cooked-meal photos** — one arrived in drop #2 (blackened fillets, placed). Still wanted: a finished grouper sandwich (fills the gag AND red grouper pages' signature dish), smoked-fish-dip spread (Spanish mackerel page), a fried-fish spread. 1400px wide.
2. **Real sheepshead photo** (see §2 — drop #2 did not contain one; the labeled fish were black drum).
3. **Real app screenshots** once the app has demo data (see §1).
