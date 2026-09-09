// Original editorial drafts. Add verified owner photos with hero/ogImage fields.
const FDA = 'https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely';
const safety = 'Use a food thermometer and cook fish to 145°F at its thickest point. Keep raw fish cold and separate from food you will serve without cooking.';
module.exports = [
  {
    slug: 'halibut', name: 'Pacific Halibut', scientific: 'Hippoglossus stenolepis',
    region: 'Pacific Coast · British Columbia', published: '2026-09-09', modified: '2026-09-09', hero: false,
    title: 'What Does Halibut Taste Like? Cooking & Species Guide', h1: 'What Does Halibut Taste Like?',
    description: 'Halibut has mild, sweet meat and a firm flake. Compare Pacific and California halibut, learn how to portion fillets, and choose a cooking method.',
    intro: 'Halibut has a mild, sweet flavor and white flesh that flakes when cooked. Pacific halibut is firm enough for a pan or grill, but a thick fillet can dry out if you leave it on the heat too long. Start with the species, then choose your cooking method around the thickness of the cut.',
    verdict: {short: 'Mild flavor. Watch the thickness.', tone: 'yes', text: 'For thick portions, try baking or gentle poaching. For thinner pieces, a quick pan cook gives you more control. Keep the fish cold until you start, and check the center with a thermometer instead of relying on a fixed number of minutes.'},
    extra: [{heading: 'Pacific halibut vs California halibut', body: [
      'Pacific halibut and California halibut are different species. The name on a catch photo matters because their fishing rules differ. California anglers can encounter both, so location alone does not settle the identification.',
      'CDFW describes adult Pacific halibut as having eyes on the right side. California halibut can have eyes on either side. The upper jaw extends beyond the eye in California halibut, while it reaches only the front edge of the eye in Pacific halibut. Use several features together and consult the official identification guide before keeping a fish.',
      'This guide focuses on Pacific and California halibut. If you bought Atlantic halibut, check the label for its origin and species rather than applying Pacific fishing information to it.'
    ]}],
    taste: {heading: 'Is halibut fishy?', body: [
      'NOAA describes Pacific halibut as mild and sweet, with a firm, tender texture after cooking. It suits simple seasoning: lemon, parsley, butter, or a little olive oil. A heavy sauce can cover the flavor you bought the fish for.',
      'Fresh fish should smell mild. A sour or ammonia smell is a reason to discard it, not a reason to add more seasoning. Freezing and cooking do not turn spoiled seafood into a good meal.',
      'For a first halibut dinner, cook portions of similar thickness together. Save the thin edges for another batch so they do not overcook while you wait for the center of a thick piece.'
    ]},
    clean: {heading: 'How to portion halibut for cooking', body: ['If you landed the fish yourself, check the landing and filleting rules before cutting it up. Some fisheries require you to preserve evidence of species or size. Once you can process it, set up a clean, stable cutting surface.'], steps: [
      'Keep the fish on ice while you prepare your tools. Work in manageable batches and return unused portions to the cooler.',
      'A flatfish has two fillets on each side. Follow the backbone down the center, then work the knife outward along the bones to lift each section.',
      'Remove the skin if your preparation calls for skinless fish. Put the skin against the board, hold the end, and keep the blade angled toward the skin.',
      'Feel each fillet for bones and remove them. Cut portions of similar thickness, separating the thin tail pieces.',
      'Label freezer portions with the species and date. Thaw them in the refrigerator when you are ready to cook.'
    ]},
    methods: {heading: 'Three ways to cook halibut', items: [
      {name: 'Baked with lemon and butter', body: 'Place portions in a lightly oiled baking dish. Add butter, sliced lemon, salt, and pepper. Bake at 400°F and start checking early with a thermometer. Pull each piece when its center reaches 145°F. Spoon the cooking juices over the fish before serving.'},
      {name: 'Gently poached', body: 'Warm a shallow layer of broth with sliced leek and a little lemon zest. Add the fish and keep the liquid below a rolling boil. Cover and cook until the center reaches 145°F. Lift the portions with a wide spatula and serve with rice or potatoes.'},
      {name: 'Seared in a pan', body: 'Pat the portions dry, season, and place them in a pan with hot oil. Let the first side form a crust before turning. Lower the heat after the turn, add a little butter, and finish cooking to 145°F. Use thinner portions for this method so the outside does not overcook before the center is ready.'}
    ], safety},
    regs: {body: 'For a trip from Port Renfrew, start with the DFO area map. Area 20 covers Port Renfrew and Sooke, while nearby offshore waters may fall in Area 121. Check the actual fishing location, current notices, licence conditions, catch recording, and packaging requirements before keeping or cutting a fish. A Catch N Bake journal entry does not replace a mandatory DFO catch record. For US trips, consult NOAA and the relevant state agency.', url: 'https://www.pac.dfo-mpo.gc.ca/fm-gp/rec/tidal-maree/a-s20-eng.html', label: 'DFO Area 20: Port Renfrew and Sooke'},
    faq: [
      {q: 'Is halibut good to eat?', a: 'Yes. Pacific halibut has mild, sweet flesh with a firm flake. Keep it cold and avoid cooking it longer than needed to reach 145°F in the center.'},
      {q: 'Can you use halibut for fish tacos?', a: 'Yes. Cut the fish into similar pieces, cook them through, and add cabbage, lime, and a sauce you like. Cook thinner pieces in a separate batch.'},
      {q: 'Can you eat halibut skin?', a: 'You can cook properly cleaned halibut with the skin attached, but some diners prefer to remove it. For skinless portions, remove it before cooking or lift the cooked flesh away from it.'},
      {q: 'Are Pacific and California halibut the same fish?', a: 'No. They are separate species with different identification features and fishing rules. Check more than eye position when identifying your catch.'}
    ],
    sources: [
      {label: 'NOAA: Pacific halibut flavor and texture', url: 'https://www.fisheries.noaa.gov/species/pacific-halibut/seafood'},
      {label: 'DFO: find your British Columbia fishing area', url: 'https://www.pac.dfo-mpo.gc.ca/fm-gp/rec/bc-zones-cb-eng.html'},
      {label: 'DFO: halibut handling and fishing information', url: 'https://www.pac.dfo-mpo.gc.ca/fm-gp/rec/finfish-peche-eng.html'},
      {label: 'CDFW: California and Pacific halibut identification', url: 'https://wildlife.ca.gov/Conservation/Marine/Nearshore/1000'},
      {label: 'CDFW: current Pacific halibut information', url: 'https://wildlife.ca.gov/Conservation/Marine/Pacific-Halibut'},
      {label: 'FDA: seafood handling and cooking', url: FDA}
    ], related: ['red-snapper', 'red-grouper']
  },
  {
    slug: 'red-snapper', name: 'American Red Snapper', scientific: 'Lutjanus campechanus', region: 'Gulf & Atlantic',
    published: '2026-09-09', modified: '2026-09-09', hero: false,
    title: 'Red Snapper Taste, Identification & Cooking Guide', h1: 'American Red Snapper: Taste and Cooking Guide',
    description: 'American red snapper has mild, sweet flesh. Learn identification clues, how it differs from vermilion snapper, and ways to cook fillets or a whole fish.',
    intro: 'American red snapper has a mild, sweet flavor and lean flesh that stays moist with careful cooking. You may also hear it called northern red snapper. Both names refer to Lutjanus campechanus. If you caught one, confirm the species and current harvest rules before planning dinner.',
    verdict: {short: 'Sweet, mild meat for fillets or a whole fish.', tone: 'yes', text: 'Red snapper works with light seasoning and with stronger flavors such as tomato, garlic, and chili. Choose whole roasting if you want to serve the fish intact. Choose fillets if you want easier portions or a crisp skin in the pan.'},
    extra: [{heading: 'Red snapper vs vermilion snapper', body: [
      'A red fish is not enough to make an identification. FWC describes red snapper as having a pointed anal fin. Vermilion snapper has a rounded anal fin and a much smaller mouth. Silk snapper is another similar species and has a yellow eye.',
      'Take a clear side photo showing the head, eye, and fins if you need help checking your catch. Compare several features with FWC illustrations. Do not apply red snapper rules to a vermilion or silk snapper just because the colors look similar.'
    ]}],
    taste: {heading: 'What does red snapper taste like?', body: [
      'NOAA describes red snapper as mildly sweet, lean, and moist, with a texture between soft and firm. Lemon and herbs suit a simple fillet. Tomato and olive sauces work well when you want a fuller meal.',
      'For a choice between snapper and grouper, think about the cut you have. A thick grouper portion takes different handling from a thin snapper fillet. Our red grouper guide covers that fish in more detail. Do not transfer a cooking time from one cut to the other without checking the center.',
      'If you buy your fish, ask for the species name and origin. A whole fish gives you more features to compare than an unmarked fillet. Keep it chilled on the trip home.'
    ]},
    clean: {heading: 'How to prepare red snapper', body: ['Decide whether you want a whole fish or fillets before you begin. Check landing requirements before cleaning a fish at sea, and use a stable board with room for the full fish.'], steps: [
      'Keep the catch on ice while you set up. Handle the dorsal spines with care.',
      'For whole roasting or fillets with skin, remove the scales first. Work from the tail toward the head and check around the fins for scales you missed.',
      'For a whole fish, remove the guts and gills. Clean the cavity, pat the fish dry, and return it to refrigeration until cooking.',
      'For fillets, cut behind the gill plate toward the backbone, then follow the bones toward the tail. Lift the fillet over the rib cage.',
      'Trim the rib section and feel for remaining bones. Leave the scaled skin attached for a crisp pan finish, or remove it for skinless portions.'
    ]},
    methods: {heading: 'Three ways to cook red snapper', items: [
      {name: 'Roasted whole with herbs', body: 'Place a cleaned, scaled fish in an oiled roasting dish. Season the cavity and add lemon slices and herbs. Brush the outside with oil and roast at 400°F. Check the thickest flesh with a thermometer without touching bone, and cook to 145°F. Serve with a separate plate for bones.'},
      {name: 'Crisp skin in a pan', body: 'Dry the scaled skin well. Season the fillet and place it skin down in a pan with hot oil. Press it flat for the first few seconds with a spatula. Let the skin crisp before turning, then finish on the flesh side until the center reaches 145°F.'},
      {name: 'Baked with tomato and garlic', body: 'Spread chopped tomatoes, garlic, and a little olive oil in a baking dish. Place the fillets on top and season. Bake at 400°F until the fish reaches 145°F in its thickest part. Serve the fish and pan juices over rice with chopped parsley.'}
    ], safety},
    regs: {body: 'Florida red snapper rules depend on the coast, waters, date, and vessel category. A private boat and a federally permitted charter may have different openings. Check FWC and the linked federal information before your trip, including gear and release requirements. Do not use a seafood market availability calendar as a recreational fishing season.', url: 'https://myfwc.com/fishing/saltwater/recreational/snappers/', label: 'FWC current snapper regulations'},
    faq: [
      {q: 'Is American red snapper the same as northern red snapper?', a: 'Yes. These common names refer to Lutjanus campechanus. Other fish also carry snapper names, so use the scientific name when you need to be specific.'},
      {q: 'Does red snapper taste fishy?', a: 'Fresh, properly handled red snapper has a mild, sweet flavor. A sour or ammonia smell is a reason to discard seafood, not cover it with seasoning.'},
      {q: 'Can you eat red snapper skin?', a: 'Yes. Remove the scales and clean it before cooking. Dry skin crisps better in a pan. Remove any scales you missed before serving.'},
      {q: 'Is red snapper season the same across Florida?', a: 'No. Check the coast, state or federal waters, trip date, and vessel category against current FWC and federal information.'}
    ],
    sources: [
      {label: 'NOAA: red snapper flavor and texture', url: 'https://www.fisheries.noaa.gov/species/red-snapper/seafood'},
      {label: 'FWC: red snapper identification', url: 'https://myfwc.com/wildlifehabitats/profiles/saltwater/snapper/red-snapper/'},
      {label: 'FWC: vermilion snapper identification', url: 'https://myfwc.com/wildlifehabitats/profiles/saltwater/snapper/vermilion-snapper/'},
      {label: 'FDA: seafood handling and cooking', url: FDA}
    ], related: ['red-grouper', 'gag-grouper', 'halibut']
  }
];
