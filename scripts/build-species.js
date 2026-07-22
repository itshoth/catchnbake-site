#!/usr/bin/env node
/**
 * Species-page generator — the site's SEO content system.
 *
 * Usage:  node scripts/build-species.js
 * Output: fish/<slug>.html for every entry in SPECIES below.
 *
 * To add a species: add an entry to SPECIES, add its images
 * (images/fish/<slug>.webp + .jpg at 1400x875, images/og/<slug>.png 1200x630),
 * add the route to sitemap.xml, then re-run this script.
 * Photo processing rule: every photo must be EXIF-stripped (GPS especially)
 * and converted to sRGB before it enters the repo. Pipeline used:
 *   magick IN -auto-orient -profile "C:/Windows/System32/spool/drivers/color/sRGB Color Space Profile.icm" -strip -resize/-crop ... OUT
 *
 * Content rules (see docs/SEO_STRATEGY.md):
 *  - The eat-it verdict must be responsible: where harvest is tightly
 *    regulated (e.g. snook), the verdict leads with legality.
 *  - NEVER state size/season/bag numbers — link to the official FWC page.
 *  - The visible FAQ and the FAQPage JSON-LD are generated from the same
 *    data, so they can never drift apart.
 */
const fs = require('fs');
const path = require('path');

const SITE = 'https://catchnbake.com';
const PUBLISHED = '2026-07-03';

const SPECIES = [
  {
    slug: 'sheepshead',
    name: 'Sheepshead',
    scientific: 'Archosargus probatocephalus',
    title: "Can You Eat Sheepshead? Taste, Cleaning & Best Recipes",
    description: "Yes — sheepshead is one of the best-eating fish inshore. What it tastes like, how to clean one (it's a chore, here's how), three ways to cook it, and the regulations to check.",
    verdict: { short: 'Yes — one of the best.', tone: 'yes',
      text: "Sheepshead live on crabs, shrimp, barnacles, and oysters, and it shows: sweet, almost shellfish-flavored white meat that regulars quietly rate above far more famous fish. The catch is the cleaning — more on that below." },
    heroAlt: 'A limit of sheepshead with bold vertical bars laid out on a boat cleaning table at night',
    intro: "The convict fish. The bait stealer with human-looking teeth. If you fish docks, bridges, or rock piles anywhere on the Florida coast, sooner or later a sheepshead ends up on your line — and the first question everyone asks is whether that strange-looking thing is actually food. It is. Emphatically.",
    taste: {
      heading: 'What does sheepshead taste like?',
      body: [
        "Sweet, clean, and mildly briny — closer to crab or lobster than to an average white fish, which makes sense given what they eat. The fillets are white, lean, and flaky with a fine grain, firm enough to hold together in a pan but tender on the fork.",
        "There's no oiliness and no \"fishy\" edge when the fish is bled and iced promptly, which makes sheepshead a great choice for people who claim they don't like fish. Fillets are on the thinner side for the fish's apparent size — a 4-pounder looks like dinner for four and fillets out closer to dinner for two."
      ]
    },
    clean: {
      heading: 'How to clean a sheepshead',
      body: [
        "Honesty first: sheepshead are the hardest-cleaning fish inshore, and it's not close. Heavy armor-plate scales, sharp dorsal spines, and a rib cage that seems to take up half the fish. Here's how to make it painless:"
      ],
      steps: [
        "Ice the fish well first — a cold, firm sheepshead cleans far easier than a soft warm one.",
        "Use a sturdy, sharp knife (an electric fillet knife earns its keep here). Cut down behind the head and pectoral fin to the backbone.",
        "Run the blade along the spine over the rib cage rather than through it — the ribs are thick enough to stop a knife. Lift the fillet as you go.",
        "Free the fillet, then skin it: the skin is thick and pulls off cleanly with a firm grip at the tail end.",
        "Trim away the rib section and any red bloodline. Expect a modest yield — roughly a third of the fish's weight — and don't feel bad about it. Everyone gets that yield."
      ]
    },
    methods: {
      heading: 'Three ways to cook sheepshead',
      items: [
        { name: 'Classic crispy fried', body: "The Florida default for a reason. Cut fillets into strips, dredge in seasoned cornmeal or a flour/cornstarch mix, and fry at 350°F until golden — about 3 minutes. The sweet meat against a salty crust is what fish fries were invented for." },
        { name: 'Lemon-butter baked', body: "Lay whole fillets in a baking dish with butter, lemon, garlic, and a little white wine. Bake at 400°F for 12–15 minutes until the flesh flakes. The gentlest way to taste how much this fish resembles the shellfish it eats." },
        { name: 'Pan-seared, shellfish-style', body: "Treat it like you'd treat a crab cake's ambitions: hot pan, butter, a simple sear 3–4 minutes a side, finished with lemon and parsley. Firm enough not to fall apart, sweet enough to need nothing else." }
      ],
      safety: "Whatever the method: fish is done at an internal temperature of 145°F, when the flesh is opaque and flakes easily."
    },
    regs: {
      body: "Sheepshead are a regulated species in Florida — size and bag limits apply and can change. Check the official FWC sheepshead page before you keep one, and confirm the rules for your specific waters.",
      url: 'https://myfwc.com/fishing/saltwater/recreational/sheepshead/',
      label: 'FWC sheepshead regulations'
    },
    meal: { file: 'fried-fish-and-chips', alt: 'Crispy fried fish pieces with a basket of chips, tartar sauce, and a squeezed lime on newspaper', caption: 'The classic: crispy fried, tartar on the side.' },
    faq: [
      { q: 'Can you eat sheepshead?', a: "Yes — sheepshead is excellent eating, with sweet, mild white meat often compared to shellfish thanks to its diet of crabs, shrimp, and barnacles. It's a regulated species in Florida, so check current FWC size and bag limits before keeping one." },
      { q: 'What does sheepshead taste like?', a: "Sweet, clean, and slightly briny — closer to crab or lobster than to typical white fish. The fillets are white, lean, firm, and flaky with no oily or fishy edge when properly iced." },
      { q: 'Are sheepshead hard to clean?', a: "Yes — heavy scales, sharp dorsal spines, and a large rib cage make them the toughest-cleaning common inshore fish. Ice the fish well, use a sturdy or electric fillet knife, work over the rib cage rather than through it, and expect a yield of roughly a third of the fish's weight." },
      { q: 'Do sheepshead have worms?', a: "Like many inshore fish, sheepshead can occasionally carry harmless parasites — it's normal and not a reason to discard the fish. Inspect fillets as you trim and cook fish to an internal temperature of 145°F, which makes properly handled fillets safe to eat." }
    ],
    related: ['redfish', 'gag-grouper']
  },
  {
    slug: 'snook',
    name: 'Snook',
    scientific: 'Centropomus undecimalis',
    title: "Can You Eat Snook? Yes — When It's Legal. Taste & Recipes",
    description: "Snook is superb table fare — but it's one of Florida's most tightly protected gamefish. When you can (and can't) keep one, why the skin must come off, and how to cook it right.",
    verdict: { short: 'Yes — but only when it’s legal, and often it isn’t.', tone: 'careful',
      text: "Snook is genuinely superb eating — that's exactly why Florida protects it so tightly. Harvest is limited to open seasons, a narrow slot size, and a required snook permit, and the rules differ between the Atlantic and Gulf coasts. Many of the snook you'll catch must go back. Check the FWC rules first, every time — and when in doubt, release it." },
    heroAlt: 'Angler at a Florida dock in golden-hour light holding a snook, its black lateral line running the length of the fish',
    intro: "Ask a Florida angler to name the best-eating fish they're rarely allowed to keep, and you'll hear one word. Snook sit in a strange spot: legendary on the plate, legendary on the line, and guarded by some of the strictest inshore regulations in the state. That combination is not a coincidence. Here's the honest picture.",
    taste: {
      heading: 'What does snook taste like?',
      body: [
        "Mild, sweet, and delicate, with firm white fillets that flake into large petals. It's routinely put in the top tier of inshore table fare, and old-timers will tell you it once supported a commercial fishery — which is precisely why selling snook has been illegal for decades. You cannot buy it; the only path to a snook dinner is catching a legal one yourself.",
        "One non-negotiable: the skin comes off. Snook skin carries a strong, soapy flavor that ruins the fillet — it's the reason for the old nickname \"soap fish.\" Skinned, the meat is immaculate."
      ]
    },
    clean: {
      heading: 'How to clean a snook',
      body: [
        "A legal, harvested snook cleans easily — the work is all in making sure it was legal first."
      ],
      steps: [
        "Confirm the fish is in season, in the slot, and that you hold a snook permit before it ever leaves the water for good. If any of those is a no, revive the fish and release it.",
        "Bleed and ice the fish immediately — snook flesh rewards good handling.",
        "Fillet as you would any round fish: cut behind the gill plate, run the blade along the spine, and lift the fillet over the ribs.",
        "Skin every fillet, without exception — the skin's soapy taint is the one way to waste this fish.",
        "Trim the bloodline and portion. The fillets are thick, white, and forgiving."
      ]
    },
    methods: {
      heading: 'Three ways to cook snook',
      items: [
        { name: 'Grilled with citrus', body: "Thick snook fillets hold a grill grate with confidence. Oil well, season simply — salt, pepper, a little paprika — and grill over medium-high heat 4–5 minutes a side, finishing with lime butter. The sweetness needs nothing more." },
        { name: 'Pan-seared, restaurant-style', body: "The preparation Florida restaurants would serve if they were allowed to. Hot pan, neutral oil, skinless fillet seasoned and seared 3–4 minutes a side until golden, basted with butter, garlic, and thyme at the end." },
        { name: 'Snook tacos', body: "Cube the fillets, toss with cumin, chili powder, and lime, and sear hard. Pile into warm tortillas with cabbage slaw and a squeeze of crema. A slot snook feeds a table this way." }
      ],
      safety: "Whatever the method: fish is done at an internal temperature of 145°F, when the flesh is opaque and flakes easily."
    },
    regs: {
      body: "Snook regulations are the strictest of any common Florida inshore fish: open seasons, a narrow slot limit, a required snook permit, and different rules on the Atlantic and Gulf coasts — all of which change. Never keep a snook without checking the current FWC rules for your coast that day. Snook may never be bought or sold.",
      url: 'https://myfwc.com/fishing/saltwater/recreational/snook/',
      label: 'FWC snook regulations'
    },
    meal: { file: 'grilled-fish-lime-squeeze', alt: 'A hand squeezing fresh lime over fish fillets sizzling on a grill', caption: 'Citrus over fire — exactly how snook wants to be treated.' },
    faq: [
      { q: 'Can you eat snook?', a: "Yes — snook is considered some of the best-eating fish in Florida, with mild, sweet, firm white fillets. But harvest is tightly regulated: you may only keep one during open season, within the slot size, with a snook permit, and rules differ by coast. Check current FWC regulations before keeping any snook." },
      { q: 'Why can’t you buy snook in a store or restaurant?', a: "Snook is a protected gamefish in Florida and its commercial sale has been banned for decades. The only legal way to eat snook is to catch a legal one yourself during an open season." },
      { q: 'What does snook taste like?', a: "Mild, sweet, and delicate with firm white fillets — routinely ranked among the top inshore table fare. The skin must always be removed before cooking; it carries a strong soapy flavor, which earned snook the nickname \"soap fish.\"" },
      { q: 'When can you keep snook in Florida?', a: "Only during open harvest seasons, within a narrow slot size, with a valid snook permit — and the seasons and slots differ between the Atlantic and Gulf coasts and change over time. Always check the current FWC snook rules for your coast before keeping one; otherwise, release it carefully." }
    ],
    related: ['redfish', 'sheepshead']
  },
  {
    slug: 'redfish',
    name: 'Redfish',
    scientific: 'Sciaenops ocellatus',
    title: "Can You Eat Redfish? Taste, Cleaning & 3 Classic Recipes",
    description: "Yes — redfish (red drum) is a Gulf Coast classic, the fish that made 'blackened' famous. What it tastes like, why slot fish eat best, how to cook it on the half shell, and the rules to check.",
    verdict: { short: 'Yes — a Gulf Coast classic.', tone: 'yes',
      text: "Redfish is the fish that made \"blackened\" a household word — so good that the 1980s craze nearly wiped them out and ended commercial harvest for good. Slot-sized fish are superb eating. The big bull reds are the breeding stock: coarser on the plate and far more valuable back in the water." },
    heroAlt: 'Angler on a flats boat holding a copper-colored redfish, the black spot near its tail clearly visible',
    intro: "The copper flash in skinny water. Redfish — red drum, reds, whatever your dock calls them — are the everyman's trophy of the Gulf and Atlantic coasts, and one of the best-eating fish a newer angler is likely to catch. They're also a conservation success story with rules that have shifted meaningfully in recent years, so the modern answer to \"can I keep it?\" deserves care.",
    taste: {
      heading: 'What does redfish taste like?',
      body: [
        "Mild and subtly sweet, with a medium-firm texture that stands up to aggressive cooking — which is exactly why Paul Prudhomme's blackened redfish worked. It isn't a delicate fish; it's a flavorful canvas that loves spice, smoke, and butter.",
        "Size matters more with redfish than with most species. Slot-sized fish have clean, tender fillets. Big bull reds run coarse and stringy — and since those big fish are the spawning population, the kitchen and conservation answer is the same one: eat the slots, release the bulls."
      ]
    },
    clean: {
      heading: 'How to clean a redfish',
      body: [
        "Redfish clean easily, and they offer a shortcut no other inshore fish does as well — the half shell."
      ],
      steps: [
        "Bleed and ice the fish promptly for the cleanest flavor.",
        "For standard fillets: cut behind the gill plate, run the knife along the backbone over the ribs, lift the fillet, then skin it and trim the bloodline.",
        "For the half shell: fillet as usual but leave the skin AND scales on. That armored side becomes a natural grill tray.",
        "The rib cage is stout — go over it, not through it, and you'll keep a smooth fillet.",
        "Portion by cook: skinless pieces for blackening, scale-on halves for the grill."
      ]
    },
    methods: {
      heading: 'Three ways to cook redfish',
      items: [
        { name: 'Blackened, the classic', body: "The dish that made this fish famous. Dredge skinless fillets in melted butter, coat generously with Cajun spice, and lay them in a screaming-hot cast-iron skillet — about 2–3 minutes a side. Do it outside or with the fan on high; the smoke is part of the ritual." },
        { name: 'On the half shell', body: "Florida's favorite shortcut. Scale-on, skin-on fillets go flesh-up on a medium-hot grill, brushed with garlic butter, lid closed, 10–12 minutes — no flipping, no sticking, no drama. The shell chars; the meat steams in butter. Squeeze a lemon over and serve straight off the armor." },
        { name: 'Seared with lemon butter', body: "The weeknight version: skinless fillets seasoned simply, seared in a hot pan 3–4 minutes a side, finished with butter, lemon, and capers. Firm enough to flip confidently, mild enough for the whole table." }
      ],
      safety: "Whatever the method: fish is done at an internal temperature of 145°F, when the flesh is opaque and flakes easily."
    },
    regs: {
      body: "Redfish in Florida are managed by region, with slot and bag rules that differ across the state and have changed meaningfully in recent years — some areas have been catch-and-release only. Don't rely on what the rules were last season: check the current FWC red drum page for your zone before keeping a fish.",
      url: 'https://myfwc.com/fishing/saltwater/recreational/red-drum/',
      label: 'FWC red drum regulations'
    },
    faq: [
      { q: 'Can you eat redfish?', a: "Yes — slot-sized redfish (red drum) are excellent eating: mild, subtly sweet, medium-firm fillets that made blackened redfish a Gulf Coast icon. Florida manages redfish by region with rules that have changed recently, so check the current FWC regulations for your zone before keeping one." },
      { q: 'What does redfish taste like?', a: "Mild and subtly sweet with a medium-firm texture that stands up to bold cooking — spice, smoke, and butter. Slot-sized fish are tender and clean; large bull reds are coarser and are the breeding stock, so they're best released." },
      { q: 'What is redfish on the half shell?', a: "A fillet with the skin and scales left on, grilled scale-side down so the \"shell\" acts as a natural grill tray. Brush the flesh with garlic butter, grill lid-closed for 10–12 minutes without flipping, and serve straight off the shell." },
      { q: 'Is it legal to keep redfish in Florida?', a: "It depends on your region. Florida manages red drum by management zones with differing slot and bag rules, and some areas have been catch-and-release only in recent years. Always check the current FWC red drum rules for your specific zone before keeping a fish." }
    ],
    related: ['sheepshead', 'snook']
  },
  {
    slug: 'gag-grouper',
    name: 'Gag Grouper',
    scientific: 'Mycteroperca microlepis',
    title: "Can You Eat Gag Grouper? Taste, Cleaning & Best Recipes",
    description: "Yes — gag grouper is the fish behind Florida's famous grouper sandwich: mild, sweet, thick white fillets. What it tastes like, how to clean one, three ways to cook it, and why you must check the season first.",
    verdict: { short: 'Yes — the grouper-sandwich fish.', tone: 'yes',
      text: "When a Florida menu says \"grouper sandwich,\" gag is the fish that made it famous: thick, snow-white fillets, mild and sweet, with a firm flake. One caveat before the fryer heats up — gag seasons are tightly managed and differ between state and Gulf federal waters, and they've changed in recent years. Check before you keep." },
    heroAlt: 'Angler kneeling on a Florida fishing pier holding a large gag grouper with mottled gray-brown markings',
    intro: "Half the fish sandwiches in Florida owe their reputation to this fish, and most people who order one have never seen it whole. If you pull a gag off a rock pile, a bridge piling, or a nearshore ledge, you're holding the state's favorite eating fish — with rules that deserve a look before it goes in the cooler.",
    taste: {
      heading: 'What does gag grouper taste like?',
      body: [
        "Mild, subtly sweet, and clean — no strong or oily notes at all. The fillets are thick and snow-white with a big, moist flake that holds together whether you fry, grill, or blacken it. It's the texture that makes grouper famous: closer to lobster-tender chunks than to a thin, delicate fillet.",
        "That thickness is the point. A gag fillet stands up to a sandwich bun, a hard sear, and an aggressive spice crust without falling apart — which is why it's the default fish sandwich of the entire Gulf coast."
      ]
    },
    clean: {
      heading: 'How to clean a gag grouper',
      body: [
        "Groupers clean generously — big fillets, forgiving structure — with two things to know: tough skin, and a bonus cut most people throw away."
      ],
      steps: [
        "Bleed and ice the fish promptly; a big grouper holds heat and the meat rewards fast cooling.",
        "Fillet as usual — cut behind the gill plate, run the blade along the backbone, and lift. The fillets are thick; keep the knife angled to the bone so you don't leave meat behind.",
        "Skin every fillet. Grouper skin is thick, tough, and strong-tasting — it doesn't crisp, it chews. Off it comes.",
        "Trim the bloodline and cut the fillet into portions by cook: sandwich-sized slabs, or chunks for frying.",
        "Don't toss the head section: grouper cheeks and throats are a dockside delicacy — two extra portions hiding above the collar."
      ]
    },
    methods: {
      heading: 'Three ways to cook gag grouper',
      items: [
        { name: 'The fried grouper sandwich', body: "The Florida icon. Dredge a thick fillet in seasoned flour, then egg, then cornmeal or panko, and fry at 350°F until deep golden — 4–5 minutes for a sandwich-cut slab. Serve on a soft bun with lettuce, tomato, and tartar. Do it right and you'll never order one at a restaurant again." },
        { name: 'Grilled with lemon butter', body: "Thick grouper fillets are one of the few white fish that grill confidently without a basket. Oil well, season simply, and grill over medium-high heat about 5 minutes a side, basting with lemon-garlic butter. The big flake stays moist inside the grill marks." },
        { name: 'Blackened, Gulf-style', body: "A Cajun spice crust in a screaming-hot cast-iron pan, 3–4 minutes a side. Gag's thick fillet is the ideal canvas — crusted and dark outside, snow-white and steaming inside. Squeeze a lime over the top." }
      ],
      safety: "Whatever the method: fish is done at an internal temperature of 145°F, when the flesh is opaque and flakes easily."
    },
    regs: {
      body: "Gag grouper is one of the most actively managed species in Florida: harvest seasons, size limits, and bag limits differ between state and federal waters and have changed meaningfully in recent years — some recent Gulf seasons have been short. Never assume last year's season; check the current FWC grouper rules for where you're fishing before you keep one.",
      url: 'https://myfwc.com/fishing/saltwater/recreational/groupers/',
      label: 'FWC grouper regulations'
    },
    faq: [
      { q: 'Can you eat gag grouper?', a: "Yes — gag grouper is one of the best-eating fish in Florida, the species behind the classic grouper sandwich: thick, mild, sweet white fillets with a firm flake. Harvest is tightly managed, so check the current FWC grouper seasons and limits for your waters before keeping one." },
      { q: 'What does gag grouper taste like?', a: "Mild and subtly sweet with thick, snow-white fillets and a big moist flake — no oily or fishy notes. The texture is the signature: firm enough for sandwiches, grilling, and blackening without falling apart." },
      { q: 'When can you keep gag grouper in Florida?', a: "Only during open season, and the seasons differ between Florida state waters and Gulf federal waters — they've also changed significantly in recent years, with some short Gulf seasons. Always check the current FWC recreational grouper regulations for your specific waters before keeping a gag." },
      { q: 'Do you eat grouper skin?', a: "No — grouper skin is thick, tough, and strong-tasting, so fillets are always skinned before cooking. Don't skip the cheeks and throats though: they're some of the best meat on the fish." }
    ],
    related: ['red-grouper', 'sheepshead']
  },
  {
    slug: 'black-drum',
    name: 'Black Drum',
    scientific: 'Pogonias cromis',
    published: '2026-07-05',
    title: "Can You Eat Black Drum? Taste, Cleaning & Best Recipes",
    description: "Yes — small 'puppy drum' eat nearly as well as their redfish cousins. Why size is everything with black drum, how to clean one (and what those worms are), and three ways to cook it.",
    verdict: { short: 'Yes — the small ones are superb.', tone: 'yes',
      text: "Black drum are redfish cousins, and a slot-sized \"puppy drum\" eats almost exactly like one: mild, sweet, and firm. The rule that matters is size. Small drum are excellent; big drum — the 20-pound-plus bruisers — run coarse, often carry harmless-but-unappetizing parasites, and are the breeding stock. Keep the little ones, release the giants." },
    heroAlt: 'Black drum — a deep-bodied inshore fish with dusky vertical bars and chin barbels',
    intro: "Every Florida angler eventually stares at a striped, bar-sided fish and asks: sheepshead or black drum? (Check the chin — drum wear little whisker-like barbels, and they don't have sheepshead's human-looking front teeth.) When the answer is a young black drum, you're holding one of the most underrated fish boxes on the coast.",
    taste: {
      heading: 'What does black drum taste like?',
      body: [
        "A small black drum tastes remarkably like its famous cousin the redfish: mild, subtly sweet, with firm white fillets of medium flake. Blindfolded, most people can't tell slot drum from slot redfish — same family, same water, nearly the same fish on a plate.",
        "Then size takes over. As drum grow past roughly ten pounds the meat coarsens into something stringy and dense, and the big ones frequently host spaghetti worms. Those worms are harmless to humans and cooked fish is perfectly safe — but nobody enjoys finding them. The kitchen answer and the conservation answer agree: eat the small ones."
      ]
    },
    clean: {
      heading: 'How to clean a black drum',
      body: [
        "Puppy drum clean like redfish with one extra habit — a quick worm check on bigger fish."
      ],
      steps: [
        "Bleed and ice promptly; drum firm up beautifully when handled cold.",
        "The scales are heavy armor — a stout knife or an electric fillet knife makes the first cut behind the gill plate much easier.",
        "Run the blade along the backbone and over the rib cage, lifting as you go — same cut as a redfish.",
        "Skin the fillets and trim the bloodline.",
        "On fish over a few pounds, scan the fillets for spaghetti worms — thin white strands, usually near the tail. Trim any out. They're harmless either way, and cooking makes everything safe."
      ]
    },
    methods: {
      heading: 'Three ways to cook black drum',
      items: [
        { name: 'Blackened in cast iron', body: "What puppy drum were born for. Butter-dredge the fillets, coat heavily in Cajun spice, and sear in a screaming-hot skillet 2–3 minutes a side. The firm flesh takes the crust like redfish and holds together beautifully." },
        { name: 'On the half shell', body: "Those armor scales earn their keep on the grill: fillet with skin and scales on, grill scale-side down with garlic butter, lid closed, 10–12 minutes, no flipping. Serve straight off the shell." },
        { name: 'Crispy fried bites', body: "Cube the fillets, dredge in seasoned cornmeal, and fry at 350°F for about 3 minutes. Drum's density makes perfect nuggets — the fish-fry answer when the box is full of school-size fish." }
      ],
      safety: "Whatever the method: fish is done at an internal temperature of 145°F, when the flesh is opaque and flakes easily."
    },
    regs: {
      body: "Black drum are a regulated species in Florida — slot and bag rules apply and can change. Check the current FWC black drum page before you keep one, and confirm the rules for your waters.",
      url: 'https://myfwc.com/fishing/saltwater/recreational/black-drum/',
      label: 'FWC black drum regulations'
    },
    faq: [
      { q: 'Can you eat black drum?', a: "Yes — smaller black drum (\"puppy drum\") are excellent eating, very close to redfish: mild, sweet, firm white fillets. Large drum over roughly ten pounds become coarse and often carry harmless spaghetti worms, and they're the breeding stock — release the big ones. Check current FWC rules before keeping any." },
      { q: 'What is the difference between black drum and sheepshead?', a: "Both wear dark vertical bars, but black drum have whisker-like barbels under the chin and a downturned mouth, while sheepshead have no barbels and unmistakable human-looking incisor teeth. Sheepshead bars are also crisper black-on-silver; drum lean brassy gray." },
      { q: 'Do black drum have worms?', a: "Larger black drum commonly carry spaghetti worms — thin, harmless parasites that pose no risk to humans, especially in fish cooked to 145°F. They're rare in small drum, which is one more reason slot-sized fish are the ones to keep. Trim out any you find while filleting." },
      { q: 'What size black drum is best to eat?', a: "Slot-sized fish up to roughly 24 inches. Under that size the meat is mild, sweet, and redfish-firm; above it the texture coarsens, worms get more common, and the fish are the spawners that keep the fishery healthy." }
    ],
    related: ['redfish', 'sheepshead']
  },
  {
    slug: 'spanish-mackerel',
    name: 'Spanish Mackerel',
    scientific: 'Scomberomorus maculatus',
    published: '2026-07-05',
    title: "Can You Eat Spanish Mackerel? Taste & How to Cook It",
    description: "Yes — Spanish mackerel is Florida's most underrated eating fish, if you treat it right from the first minute. Taste, the bleed-and-ice rule, and three ways to cook it (smoked fish dip included).",
    verdict: { short: 'Yes — wildly underrated.', tone: 'yes',
      text: "Spanish mackerel gets dismissed as \"too fishy\" by people who left one warm in a bucket for an afternoon. Handled right — bled at the rail, buried in ice, eaten fresh or smoked — it's rich, buttery, full-flavored fish that regulars quietly prefer to half the glamour species. The quality of a Spanish mackerel dinner is decided in the first five minutes after the catch." },
    heroAlt: 'Angler on a Florida bridge pier holding a Spanish mackerel, its golden-yellow oval spots catching the sun',
    intro: "The silver flash that smokes your spoon in a fall bait shower. Spanish mackerel are everywhere on the Florida coast, fight far above their weight, and carry a completely undeserved bad rap on the table. Here's the honest case for keeping a couple — and the handling rule that makes or breaks them.",
    taste: {
      heading: 'What does Spanish mackerel taste like?',
      body: [
        "Rich, savory, and full-flavored, with soft, moist flesh and a fine flake — this is an oily fish in the best sense, loaded with the same omega-3s that make salmon and sardines famous. It is not a mild white fish and doesn't pretend to be; it's closer to good mackerel-family fare the world over: satisfying, distinctive, and superb with smoke, citrus, and heat.",
        "Freshness is everything. The oils that make Spanish mackerel delicious turn on you if the fish is mishandled or frozen long — so this is a catch-it, cook-it species. Bled and iced, eaten within a day or two (or smoked), it will change minds."
      ]
    },
    clean: {
      heading: 'How to clean a Spanish mackerel',
      body: [
        "The work happens at the rail, not the cleaning table."
      ],
      steps: [
        "Bleed the fish the moment it's landed — a quick cut at the gills — and get it straight into an ice slurry. This single step is most of the flavor.",
        "Fillet as usual; the skeleton is simple and the fillets come off fast. There are no scales worth worrying about.",
        "Leave the skin on for grilling or smoking (it holds the soft fillet together); skin off for pan preparations.",
        "Trim the dark bloodline down the center of each fillet — it's the strongest-tasting part, and removing it mellows the fillet noticeably.",
        "Cook or smoke within a day or two. Spanish mackerel is a poor freezer — plan the menu, not the stockpile."
      ]
    },
    methods: {
      heading: 'Three ways to cook Spanish mackerel',
      items: [
        { name: 'Smoked, for fish dip', body: "The Florida institution. Brine the fillets, smoke them low over oak or hickory until bronzed, then flake into cream cheese, mayo, lemon, and a little hot sauce. Smoked fish dip with saltines is half the reason to keep Spanish mackerel at all." },
        { name: 'Hot-grilled, skin-on', body: "Skin-side down over high heat, brushed with citrus butter, 3–4 minutes until the skin crisps and the flesh just sets. The oil content keeps it moist where lean fish would dry out." },
        { name: 'Broiled with lemon and butter', body: "Fillets under a hot broiler with butter, lemon, salt, and paprika — 5–6 minutes, no flipping. Weeknight-fast, and the high heat plays perfectly against the rich flesh." }
      ],
      safety: "Whatever the method: fish is done at an internal temperature of 145°F, when the flesh is opaque and flakes easily."
    },
    regs: {
      body: "Spanish mackerel are a regulated species in Florida — size and bag limits apply and can change. Check the current FWC Spanish mackerel page before keeping fish, and confirm the rules for your waters.",
      url: 'https://myfwc.com/fishing/saltwater/recreational/spanish-mackerel/',
      label: 'FWC Spanish mackerel regulations'
    },
    faq: [
      { q: 'Can you eat Spanish mackerel?', a: "Yes — Spanish mackerel is excellent, underrated eating: rich, full-flavored, omega-3-loaded flesh that shines grilled, broiled, or smoked into Florida's classic fish dip. The catch is handling: bleed and ice the fish immediately and eat it fresh — its reputation for tasting 'fishy' comes almost entirely from poor handling." },
      { q: 'What does Spanish mackerel taste like?', a: "Rich, savory, and moderately oily with soft, moist flesh — closer to sardine/salmon richness than to a mild white fish. Properly bled, iced, and eaten fresh it's buttery and clean; the dark bloodline carries the strongest flavor and is easy to trim away." },
      { q: 'How do you tell Spanish mackerel from king mackerel or cero?', a: "Spanish mackerel have scattered golden-yellow oval spots and a lateral line that slopes gently toward the tail. King mackerel grow much larger, lose their spots as adults, and their lateral line takes an abrupt drop mid-body. Cero mackerel show yellow spots plus a distinct yellow stripe down the midline that Spanish lack." },
      { q: 'Can you freeze Spanish mackerel?', a: "It's not recommended for long — the oils that make the fish delicious degrade quickly in the freezer and turn strong. Eat Spanish mackerel within a day or two of the catch, or smoke it; smoked mackerel keeps well and makes Florida's best fish dip." }
    ],
    related: ['snook', 'black-drum']
  },
  {
    slug: 'red-grouper',
    name: 'Red Grouper',
    scientific: 'Epinephelus morio',
    published: '2026-07-05',
    title: "Can You Eat Red Grouper? Taste, Cleaning & Best Recipes",
    description: "Yes — red grouper is Gulf sandwich royalty, a touch sweeter than gag. What it tastes like, how to clean one (save the cheeks), three ways to cook it, and why you check the season first.",
    verdict: { short: 'Yes — sandwich royalty, the sweeter one.', tone: 'yes',
      text: "Red grouper is the other half of Florida's grouper-sandwich dynasty, and plenty of Gulf cooks quietly rate it above gag: the same thick, snow-white fillets with a slightly sweeter, almost shellfish note from a diet heavy in crab and shrimp. Like all Florida groupers, harvest is actively managed — seasons and limits differ by waters and change. Check first." },
    heroAlt: 'Two rust-red groupers with scattered white blotches laid on a dock, freshly caught',
    intro: "The brick-red fish that comes up from the rock ledges looking like it was carved out of Gulf limestone. Red grouper doesn't get gag's headlines, but ask around any fish house on the west coast of Florida and you'll find its quiet loyalists. On the plate, the case makes itself.",
    taste: {
      heading: 'What does red grouper taste like?',
      body: [
        "Everything grouper is loved for — thick, snow-white fillets, a big moist flake, no fishy edge — with a slightly sweeter finish than gag. Red grouper feed heavily on crabs, shrimp, and lobster, and that shellfish diet reads on the fork the same way it does with sheepshead: a faint sweetness that needs nothing but butter and lemon to shine.",
        "The texture runs a touch softer than gag — still firm enough to grill or fry into a sandwich, but especially suited to gentler treatments where that big flake can stay juicy."
      ]
    },
    clean: {
      heading: 'How to clean a red grouper',
      body: [
        "Same generous job as any grouper — thick fillets, simple structure, two bonus cuts."
      ],
      steps: [
        "Bleed and ice promptly; a thick-bodied grouper holds heat longer than you'd think.",
        "Cut behind the gill plate and run the blade along the backbone, angling to the bone — the fillets are deep, and a lazy angle leaves dinner behind.",
        "Skin every fillet: grouper skin is thick, tough, and strong-tasting. Off it comes.",
        "Trim the bloodline and portion into sandwich slabs or frying chunks.",
        "Take the cheeks and throats before the carcass goes over — on a red grouper they're two scallop-sweet portions most people throw away."
      ]
    },
    methods: {
      heading: 'Three ways to cook red grouper',
      items: [
        { name: 'The fried grouper sandwich', body: "Same throne, sweeter king. Thick fillet, seasoned flour, egg, cornmeal or panko, 350°F until deep golden. Soft bun, lettuce, tomato, tartar. Red grouper's extra sweetness against the salty crust is the version regulars order twice." },
        { name: 'Pan-seared with lemon butter', body: "The gentler texture rewards a simple sear: hot pan, neutral oil, 3–4 minutes a side, finished by basting with butter, garlic, and thyme. The big flake stays juicy and the shellfish sweetness comes through clean." },
        { name: 'Grilled with mojo', body: "A nod to the fish's southern range: marinate briefly in sour orange, garlic, and cumin, then grill over medium-high heat about 5 minutes a side. The citrus-garlic hit is made for sweet white grouper." }
      ],
      safety: "Whatever the method: fish is done at an internal temperature of 145°F, when the flesh is opaque and flakes easily."
    },
    regs: {
      body: "Red grouper is actively managed in Florida: seasons, size limits, and bag limits differ between state and federal waters — Atlantic and Gulf rules differ too — and they change. Never assume last season's rules; check the current FWC grouper page for where you're fishing before you keep one.",
      url: 'https://myfwc.com/fishing/saltwater/recreational/groupers/',
      label: 'FWC grouper regulations'
    },
    faq: [
      { q: 'Can you eat red grouper?', a: "Yes — red grouper is premier Gulf table fare: thick, snow-white fillets with a big moist flake and a slightly sweeter taste than gag, thanks to a shellfish-heavy diet. Harvest is actively managed, so check current FWC grouper seasons and limits for your waters before keeping one." },
      { q: 'Red grouper vs gag grouper — which tastes better?', a: "Both are excellent and close enough that preparation matters more than species. Red grouper runs slightly sweeter (a shellfish diet) with a marginally softer flake; gag is a touch firmer. Sandwich loyalists split roughly down the middle — the honest answer is: whichever one is in season." },
      { q: 'How do you tell a red grouper from a gag or black grouper?', a: "Red grouper are rusty reddish-brown with scattered pale blotches and reddish dorsal fins. Gag are gray with darker worm-like (vermiculated) markings, and black grouper are darker with brassy spots and rectangular blotches." },
      { q: 'Do you eat grouper skin?', a: "No — grouper skin is thick, tough, and strong-tasting, so fillets are always skinned before cooking. The cheeks and throats, though, are some of the best meat on the fish — don't waste them." }
    ],
    related: ['gag-grouper', 'redfish']
  }
];

/* ---------------------------------------------------------------- */

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function jsonLd(sp) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `Can You Eat ${sp.name}? Taste, Cleaning & Best Recipes`,
        description: sp.description,
        image: `${SITE}/images/og/${sp.slug}.png`,
        datePublished: sp.published || PUBLISHED,
        dateModified: sp.published || PUBLISHED,
        mainEntityOfPage: `${SITE}/fish/${sp.slug}`,
        author: { '@type': 'Organization', name: "Catch 'N Bake", url: SITE },
        publisher: { '@type': 'Organization', name: "Catch 'N Bake LLC", url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/favicon.svg` } }
      },
      {
        '@type': 'FAQPage',
        mainEntity: sp.faq.map((f) => ({
          '@type': 'Question', name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      }
    ]
  }, null, 2);
}
const NAV = `<header class="site">
  <a class="brand" href="/">Catch <span>'N</span> Bake</a>
  <nav class="primary" aria-label="Site">
    <a href="/">Home</a>
    <div class="drop">
      <button type="button" aria-haspopup="true" aria-expanded="false">Fish Guides</button>
      <div class="menu">
        <a href="/fish/sheepshead">Sheepshead</a>
        <a href="/fish/snook">Snook</a>
        <a href="/fish/redfish">Redfish</a>
        <a href="/fish/gag-grouper">Gag Grouper</a>
        <a href="/fish/red-grouper">Red Grouper</a>
        <a href="/fish/black-drum">Black Drum</a>
        <a href="/fish/spanish-mackerel">Spanish Mackerel</a>
        <a class="all" href="/#guides">All guides →</a>
      </div>
    </div>
    <a href="/support">Support</a>
  </nav>
  <button class="burger" data-nav-open aria-label="Open menu" aria-expanded="false">
    <svg width="20" height="14" viewBox="0 0 20 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M1 1h18M1 7h18M1 13h18"/></svg>
  </button>
</header>

<div class="mobilenav" id="mobilenav" hidden>
  <button class="close" data-nav-close aria-label="Close menu">
    <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="display:block;margin:auto"><path d="M2 2l12 12M14 2L2 14"/></svg>
  </button>
  <span class="meta">Catch 'N Bake</span>
  <a href="/">Home</a>
  <a href="/support">Support</a>
  <span class="meta">Fish Guides</span>
  <a href="/fish/sheepshead">Sheepshead</a>
  <a href="/fish/snook">Snook</a>
  <a href="/fish/redfish">Redfish</a>
  <a href="/fish/gag-grouper">Gag Grouper</a>
  <a href="/fish/red-grouper">Red Grouper</a>
  <a href="/fish/black-drum">Black Drum</a>
  <a href="/fish/spanish-mackerel">Spanish Mackerel</a>
  <span class="meta">Legal</span>
  <div class="small">
    <a href="/privacy">Privacy</a>
    <a href="/terms">Terms</a>
    <a href="/guidelines">Community Guidelines</a>
  </div>
</div>`;

const FOOTER = `<footer class="site">
  <div class="wrap cols">
    <div class="brandline">
      <span class="brand" style="color:var(--bone)">Catch <span style="color:var(--amber)">'N</span> Bake</span><br>
      © 2026 Catch 'N Bake LLC · Made in Florida
    </div>
    <div>
      <span class="meta">App</span>
      <a href="/">Home</a>
      <a href="/support">Support</a>
    </div>
    <div>
      <span class="meta">Fish Guides</span>
      <a href="/fish/sheepshead">Sheepshead</a>
      <a href="/fish/snook">Snook</a>
      <a href="/fish/redfish">Redfish</a>
      <a href="/fish/gag-grouper">Gag Grouper</a>
      <a href="/fish/red-grouper">Red Grouper</a>
      <a href="/fish/black-drum">Black Drum</a>
      <a href="/fish/spanish-mackerel">Spanish Mackerel</a>
    </div>
    <div>
      <span class="meta">Legal</span>
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
      <a href="/guidelines">Guidelines</a>
    </div>
  </div>
</footer>`;

const CLARITY = `<script type="text/javascript">
    /* Microsoft Clarity — deferred until after the load event so it never competes with page rendering */
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        function go(){t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);}
        function later(){setTimeout(go,3000)}
        if(l.readyState==="complete"){later()}else{c.addEventListener("load",later)}
    })(window, document, "clarity", "script", "xhwobxiz8q");
</script>`;

function page(sp) {
  const relatedCards = sp.related.map((slug) => {
    const r = SPECIES.find((s) => s.slug === slug);
    return `    <a class="guide-row" href="/fish/${r.slug}">
      <h3>${r.name}</h3>
      <span class="go">Read the guide →</span>
    </a>`;
  }).join('\n');

  const verdictClass = sp.verdict.tone === 'careful' ? 'verdict careful' : 'verdict';

  return `<!DOCTYPE html>
<!--
  GENERATED FILE — edit scripts/build-species.js, then run:  node scripts/build-species.js
  Species guide: ${sp.name}. Served at ${SITE}/fish/${sp.slug}
-->
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(sp.title)} — Catch 'N Bake</title>
<meta name="description" content="${esc(sp.description)}" />
<link rel="canonical" href="${SITE}/fish/${sp.slug}" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="Catch 'N Bake" />
<meta property="og:title" content="${esc(sp.title)}" />
<meta property="og:description" content="${esc(sp.description)}" />
<meta property="og:url" content="${SITE}/fish/${sp.slug}" />
<meta property="og:image" content="${SITE}/images/og/${sp.slug}.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="theme-color" content="#0b1220" />
<meta name="apple-itunes-app" content="app-id=6762584046" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="preload" href="/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin />
<script type="application/ld+json">
${jsonLd(sp)}
</script>
<style>
  @font-face{font-family:'Fraunces';font-style:normal;font-weight:400 700;font-display:swap;src:url('/fonts/fraunces-latin.woff2') format('woff2')}
  @font-face{font-family:'Inter';font-style:normal;font-weight:400 600;font-display:swap;src:url('/fonts/inter-latin.woff2') format('woff2')}
  @font-face{font-family:'Fraunces Fallback';src:local('Georgia');ascent-override:98%;descent-override:26%;line-gap-override:0%;size-adjust:101%}
  @font-face{font-family:'Inter Fallback';src:local('Arial');ascent-override:96.9%;descent-override:24.2%;line-gap-override:0%;size-adjust:107%}

  :root{
    --night:#0b1220;--night2:#0f172a;--card:#1e293b;--line:#26334a;
    --bone:#f5f1e6;--mist:#a3adbf;--amber:#f59e0b;--amber-deep:#d97706;--ink-on-amber:#171003;
    --serif:'Fraunces','Fraunces Fallback',Georgia,serif;
    --sans:'Inter','Inter Fallback',system-ui,sans-serif;
    --measure:64ch;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  [hidden]{display:none!important}
  html{scroll-behavior:smooth}
  @media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}}
  body{background:var(--night);color:var(--bone);font-family:var(--sans);font-size:1.0625rem;line-height:1.7;-webkit-font-smoothing:antialiased}
  a{color:var(--amber)}
  strong{font-weight:600;color:var(--bone)}
  :focus-visible{outline:2px solid var(--amber);outline-offset:3px}
  .skip{position:absolute;left:-9999px;top:0;background:var(--amber);color:var(--ink-on-amber);padding:.6rem 1rem;z-index:90;font-weight:600}
  .skip:focus{left:1rem;top:1rem}
  .meta{font-size:.72rem;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--mist)}
  .meta b{color:var(--amber);font-weight:600}

  header.site{display:flex;justify-content:space-between;align-items:center;gap:1.5rem;padding:1.6rem clamp(1.25rem,4vw,3rem);border-bottom:1px solid var(--line)}
  .brand{font-family:var(--serif);font-weight:700;font-size:1.25rem;color:var(--bone);text-decoration:none;letter-spacing:.01em}
  .brand span{color:var(--amber)}
  nav.primary{display:flex;align-items:center;gap:2rem;font-size:.92rem;font-weight:500}
  nav.primary > a{color:var(--bone);text-decoration:none;opacity:.9}
  nav.primary > a:hover{color:var(--amber);opacity:1}
  .drop{position:relative}
  .drop > button{background:none;border:0;color:var(--bone);font:inherit;font-weight:500;cursor:pointer;opacity:.9;display:flex;align-items:center;gap:.4rem;padding:.2rem 0}
  .drop > button::after{content:"";width:.45em;height:.45em;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:rotate(45deg) translateY(-.1em)}
  .drop > button:hover{color:var(--amber);opacity:1}
  .drop .menu{position:absolute;top:calc(100% + .9rem);left:50%;transform:translateX(-50%);background:var(--night2);border:1px solid var(--line);border-radius:12px;padding:.6rem;min-width:15rem;display:none;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);z-index:50}
  .drop:focus-within .menu,.drop.open .menu{display:block}
  .drop .menu::before{content:"";position:absolute;left:-1.2rem;right:-1.2rem;top:-1.2rem;height:1.3rem}
  .drop .menu a{display:block;color:var(--bone);text-decoration:none;padding:.55rem .9rem;border-radius:8px;font-size:.92rem}
  .drop .menu a:hover{background:var(--card);color:var(--amber)}
  .drop .menu .all{border-top:1px solid var(--line);margin-top:.4rem;padding-top:.7rem;color:var(--mist);font-size:.8rem}
  .burger{display:none;background:none;border:1px solid var(--line);border-radius:10px;color:var(--bone);width:44px;height:40px;cursor:pointer;align-items:center;justify-content:center}
  .mobilenav{position:fixed;inset:0;z-index:80;background:rgba(11,18,32,.98);padding:5.5rem clamp(1.5rem,6vw,3rem) 3rem;overflow:auto}
  .mobilenav .close{position:absolute;top:1.4rem;right:clamp(1.25rem,4vw,3rem);background:none;border:1px solid var(--line);border-radius:10px;color:var(--bone);width:44px;height:40px;cursor:pointer}
  .mobilenav .meta{display:block;margin:2rem 0 .8rem}
  .mobilenav a{display:block;color:var(--bone);text-decoration:none;font-family:var(--serif);font-size:1.7rem;font-weight:600;padding:.45rem 0}
  .mobilenav a:hover{color:var(--amber)}
  .mobilenav .small a{font-family:var(--sans);font-size:1rem;font-weight:500;color:var(--mist);padding:.3rem 0}
  @media (max-width:900px){nav.primary{display:none}.burger{display:flex}}

  .wrap{position:relative;max-width:48rem;margin:0 auto;padding:3.5rem clamp(1.25rem,4vw,2rem) 6rem}
  .eyebrow{display:block;margin-bottom:1.2rem}
  h1{font-family:var(--serif);font-weight:700;font-size:clamp(2.4rem,6vw,4rem);line-height:1.02;letter-spacing:-.018em;margin-bottom:1rem}
  .sci{font-style:italic;color:var(--mist);font-size:1rem;margin-bottom:2rem}
  p{max-width:var(--measure);margin-bottom:1rem;color:var(--mist)}
  .intro{font-size:1.15rem;color:#cfd6e2}
  .verdict{border:1px solid var(--line);border-left:5px solid var(--amber);background:var(--night2);border-radius:0 14px 14px 0;padding:1.6rem 1.9rem;margin:2.4rem 0}
  .verdict .v{font-family:var(--serif);font-weight:600;font-size:1.5rem;line-height:1.2;color:var(--bone);margin-bottom:.6rem}
  .verdict.careful .v{color:var(--amber)}
  .verdict p{margin:0}
  figure{margin:2.8rem 0}
  figure img{display:block;width:100%;height:auto;border-radius:14px;background:var(--night2)}
  figure.meal{margin:2.25rem 0 0}
  figure.meal figcaption{margin-top:.75rem;font-size:.85rem;color:var(--mist)}
  h2{font-family:var(--serif);font-weight:600;font-size:clamp(1.5rem,3vw,2rem);line-height:1.15;margin:3.2rem 0 1rem;color:var(--bone)}
  h3{font-family:var(--serif);font-size:1.2rem;font-weight:600;margin:1.75rem 0 .5rem;color:var(--bone)}
  ol.steps{max-width:var(--measure);margin:1.25rem 0 1rem;padding-left:0;list-style:none;counter-reset:step}
  ol.steps li{counter-increment:step;position:relative;padding:.5rem 0 .5rem 3rem;color:var(--mist)}
  ol.steps li::before{content:counter(step,decimal-leading-zero);position:absolute;left:0;top:.55rem;font-family:var(--serif);font-weight:700;color:var(--amber)}
  .safety{border-left:3px solid var(--amber);background:rgba(245,158,11,.08);border-radius:0 10px 10px 0;padding:1rem 1.25rem;margin:1.75rem 0;max-width:var(--measure);font-size:.98rem;color:var(--bone)}
  .regs{border:1px solid var(--line);background:var(--night2);border-radius:14px;padding:1.5rem 1.75rem;margin:1.25rem 0;max-width:var(--measure)}
  .regs p{margin-bottom:.75rem}
  .regs a{font-weight:600}
  .cta-band{background:var(--night2);border:1px solid var(--line);border-radius:16px;padding:2.5rem 2rem;margin:3.5rem 0;text-align:center;background-image:radial-gradient(70% 90% at 50% 0%,rgba(245,158,11,.09),transparent 65%)}
  .cta-band h2{color:var(--bone);margin:0 0 .5rem;font-size:1.6rem}
  .cta-band p{margin:0 auto 1.5rem;max-width:36em}
  .store-badge{display:inline-flex;align-items:center;gap:.7rem;background:transparent;color:var(--bone);text-decoration:none;border-radius:12px;padding:.65rem 1.25rem;line-height:1.15;border:1.5px solid var(--bone)}
  .store-badge .small{display:block;font-size:.66rem;letter-spacing:.06em;text-transform:uppercase;color:var(--mist)}
  .store-badge .big{display:block;font-family:var(--serif);font-size:1.05rem;font-weight:600}
  .store-badge.is-soon{cursor:default}
  a.store-badge:hover{background:var(--amber);border-color:var(--amber);color:var(--ink-on-amber)}
  a.store-badge:hover .small{color:var(--ink-on-amber)}
  dl.faq{max-width:var(--measure)}
  dl.faq dt{font-weight:600;color:var(--bone);margin-top:1.5rem}
  dl.faq dd{margin:.4rem 0 0;color:var(--mist)}
  .guides{margin-top:1.4rem;border-top:1px solid var(--line)}
  .guide-row{display:flex;justify-content:space-between;align-items:baseline;gap:1.5rem;padding:1.15rem 0;border-bottom:1px solid var(--line);text-decoration:none;color:var(--bone)}
  .guide-row h3{margin:0;font-size:1.4rem}
  .guide-row:hover h3{color:var(--amber)}
  .guide-row .go{color:var(--amber);font-weight:600;font-size:.9rem;white-space:nowrap}

  footer.site{border-top:1px solid var(--line);padding:3rem 0 3.5rem;font-size:.88rem;color:var(--mist)}
  footer.site .cols{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:2rem;max-width:76rem;margin:0 auto;padding:0 clamp(1.25rem,4vw,3rem)}
  @media (max-width:760px){footer.site .cols{grid-template-columns:1fr 1fr}}
  footer.site .meta{display:block;margin-bottom:.9rem}
  footer.site a{color:var(--mist);text-decoration:none;display:block;padding:.22rem 0}
  footer.site a:hover{color:var(--amber)}
  footer.site .brandline .brand{font-size:1.1rem;display:inline-block;margin-bottom:.8rem}
</style>
${CLARITY}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>

${NAV}

<main id="main">
<div class="wrap">

<span class="eyebrow meta">The Field Guide · <b>Florida Inshore</b></span>
<h1>Can You Eat ${sp.name}?</h1>
<p class="sci">${sp.scientific}</p>

<p class="intro">${sp.intro}</p>

<div class="${verdictClass}">
  <p class="v">${sp.verdict.short}</p>
  <p>${sp.verdict.text}</p>
</div>

<figure>
  <picture>
    <source srcset="/images/fish/${sp.slug}.webp" type="image/webp" />
    <img src="/images/fish/${sp.slug}.jpg" width="1400" height="875" alt="${esc(sp.heroAlt)}" loading="lazy" />
  </picture>
</figure>

<h2>${sp.taste.heading}</h2>
${sp.taste.body.map((p) => `<p>${p}</p>`).join('\n')}

<h2>${sp.clean.heading}</h2>
${sp.clean.body.map((p) => `<p>${p}</p>`).join('\n')}
<ol class="steps">
${sp.clean.steps.map((s) => `  <li>${s}</li>`).join('\n')}
</ol>

<h2>${sp.methods.heading}</h2>
${sp.methods.items.map((m) => `<h3>${m.name}</h3>\n<p>${m.body}</p>`).join('\n')}
${sp.meal ? `<figure class="meal">
  <picture>
    <source srcset="/images/meals/${sp.meal.file}.webp" type="image/webp" />
    <img src="/images/meals/${sp.meal.file}.jpg" width="1400" height="875" alt="${esc(sp.meal.alt)}" loading="lazy" />
  </picture>
  <figcaption>${sp.meal.caption}</figcaption>
</figure>` : ''}
<p class="safety"><strong>Food safety:</strong> ${sp.methods.safety}</p>

<h2>Regulations: check before you keep</h2>
<div class="regs">
  <p>${sp.regs.body}</p>
  <p><a href="${sp.regs.url}" rel="noopener">${sp.regs.label} →</a></p>
</div>

<div class="cta-band">
  <h2>Caught one? Make sure, then make dinner.</h2>
  <p>Snap a photo in Catch 'N Bake to confirm the species, see a regulations summary, and get recipes written for your exact fish.</p>
  <a class="store-badge" data-app-store href="https://apps.apple.com/us/app/catch-n-bake/id6762584046" target="_blank" rel="noopener" aria-label="Download Catch 'N Bake on the App Store">
    <span><span class="small">Download on the</span><span class="big">App Store</span></span>
  </a>
</div>

<h2>Frequently asked questions</h2>
<dl class="faq">
${sp.faq.map((f) => `  <dt>${f.q}</dt>\n  <dd>${f.a}</dd>`).join('\n')}
</dl>

<h2>More from the field guide</h2>
<div class="guides">
${relatedCards}
</div>

</div>
</main>

${FOOTER}

<script src="/js/app-store.js" defer></script>
<script src="/js/nav.js" defer></script>
</body>
</html>
`;
}
const outDir = path.join(__dirname, '..', 'fish');
fs.mkdirSync(outDir, { recursive: true });
for (const sp of SPECIES) {
  fs.writeFileSync(path.join(outDir, `${sp.slug}.html`), page(sp));
  console.log(`fish/${sp.slug}.html written`);
}
