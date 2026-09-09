# September photo update

The website now uses six new owner supplied photos:

| Source | Destination |
| --- | --- |
| `IMG_0218.HEIC` | American red snapper guide and homepage lead |
| `IMG_3151.HEIC` | Pacific halibut guide and homepage journal section |
| `IMG_3164.HEIC` | Halibut guide supporting dock photo |
| `IMG_3523.HEIC` | Gag grouper guide |
| `1A5E1B42-C8AB-48A0-80B1-6CF66647BC90.JPG` | Red grouper guide |
| `IMG_0228.HEIC` | Red grouper guide supporting mixed catch photo |

The tuna and salmon photos have neutral species names and remain reserved for future articles. The salmon species is uncertain from the available view. Do not relabel it as coho without confirmation.

Owner supplied photographs are proprietary. This update grants no reuse licence to third parties. Captions describe visible content without asserting measured sizes, catch dates, or current harvest legality.

Run `scripts/prepare-photos.ps1` with the source photo directory to reproduce the files. The script preserves the originals and strips metadata from output images. `scripts/photo-content.js` supplies article image paths, dimensions, captions, and share image paths. Run `node scripts/build-species.js` after changing the photo configuration.

This photo pass completes the image work described as pending in the initial September SEO notes. Production publication and the Cloudflare domain redirect remain separate tasks.
