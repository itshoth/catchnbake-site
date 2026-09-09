// Editorial changes to established URLs. Keep those URLs and original publication dates.
module.exports = species => {
  const descriptions = {
    sheepshead: 'Sheepshead has mild, sweet white meat. Learn what it tastes like, how to clean around the ribs, cooking ideas, and where to check Florida harvest rules.',
    snook: 'Yes, you can eat legally harvested snook. Learn its mild, sweet taste, how to prepare skinless fillets, cooking ideas, and where to check Florida rules.',
    redfish: 'Redfish has mild, firm meat. Learn how it tastes, how to prepare fillets or cook on the half shell, and where to check Florida harvest rules.',
    'gag-grouper': 'Gag grouper has thick, mild white fillets. Learn about taste, cleaning, sandwich and cooking ideas, and where to check current Florida grouper rules.',
    'red-grouper': 'Red grouper has mild, sweet meat with a firm flake. Compare it with gag grouper, prepare the fillets, and choose a way to cook your catch.',
    'black-drum': 'Can you eat black drum? Learn about flavor, preparing the fillets, parasites to check for, cooking methods, and current Florida harvest rules.',
    'spanish-mackerel': 'Spanish mackerel has a rich flavor. Learn how to keep it cold, prepare the fillets, choose a cooking method, and check current Florida harvest rules.'
  };
  const FDA = {label: 'FDA seafood handling and cooking', url: 'https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely'};
  for (const sp of species) {
    if (!descriptions[sp.slug]) continue;
    sp.description = descriptions[sp.slug];
    sp.title = `Can You Eat ${sp.name}? Taste & Cooking Guide`;
    sp.modified = '2026-09-09';
    sp.sources = [FDA];
    sp.methods.safety = 'Cook fish to 145°F in the thickest part and keep it cold before cooking. Cooking does not make spoiled fish safe. Follow local consumption advisories as well as harvest rules.';
  }
  const snook = species.find(s => s.slug === 'snook');
  snook.title = 'Can You Eat Snook? Taste, Cooking & Florida Rules';
  snook.intro = 'Yes, you can eat legally harvested snook. The flesh is mild and slightly sweet, with firm white flakes. In Florida, check the rules for your specific management region before keeping one. This guide covers the taste, skinless preparation, and cooking options once you have a legal catch.';
  snook.verdict = {short: 'Yes, if your catch is legal to keep.', tone: 'careful', text: 'Start with the FWC page for your management region and trip date. Check the open season, size and bag limits, and license or permit requirements that apply to you. A coast name alone is not enough to choose the right rules.'};
  snook.taste.body = ['Snook has a mild flavor and firm flesh that flakes after cooking. Use light seasoning for your first meal so you can taste the fish. Lemon, butter, and parsley are a simple place to start.', 'Anglers often call snook soapfish and recommend removing the skin. This guide uses skinless fillets. Trim them before portioning, then separate thin pieces from thick ones so you can cook each to the right temperature.'];
  snook.clean.body = ['Check landing and possession requirements before filleting your catch. Keep it cold and use a clean, stable board.'];
  snook.clean.steps = ['Confirm that the catch meets the current rules for your management region and that you meet applicable license and permit requirements.', 'Keep the fish on ice while you prepare your knife and board.', 'Cut behind the gill plate toward the backbone. Follow the bones toward the tail, then lift the fillet over the ribs.', 'Place the skin against the board. Hold the tail end and slide the blade between the flesh and skin.', 'Trim the rib section and feel for remaining bones. Divide the fillets into portions of similar thickness.'];
  snook.methods.items = [
    {name: 'Baked with lemon', body: 'Place skinless portions in an oiled baking dish. Add butter, lemon slices, salt, and pepper. Bake at 400°F, checking the thickest part with a thermometer. Take each piece out when it reaches 145°F.'},
    {name: 'Seared in a pan', body: 'Dry and season the fillets. Place them in a pan with hot oil and let the first side brown before turning. Lower the heat and add butter and garlic. Finish cooking to 145°F in the center.'},
    {name: 'Snook tacos', body: 'Cut the fillets into similar pieces, season with cumin and chili powder, and cook them through in a pan. Serve in warm tortillas with cabbage and lime. Check a thick piece for 145°F before serving.'}
  ];
  snook.regs.body = 'FWC manages snook by region. Open seasons and harvest limits can differ between regions, with separate license and permit requirements. Use the current FWC page to locate your waters and review the rules before a trip. Florida prohibits buying or selling snook.';
  snook.meal.caption = 'Cooking idea: grilled fish finished with lime. Illustrative meal photo.';
  snook.faq = [
    {q: 'Can you eat snook in Florida?', a: 'Yes, if you legally harvest it and follow applicable consumption advisories. Check the current FWC rules for the management region where you fish.'},
    {q: 'What does snook taste like?', a: 'Snook has a mild, slightly sweet flavor and firm white flesh. This guide uses skinless fillets with simple seasoning.'},
    {q: 'Why is snook illegal to sell?', a: 'Florida prohibits buying and selling snook as part of its gamefish management. That is separate from whether you can keep a recreational catch under current regional rules.'},
    {q: 'When can you keep snook?', a: 'Check the open season and harvest limits for your FWC management region, plus applicable license and permit requirements. Do not use a rule from a different region.'}
  ];
  snook.related = ['redfish', 'sheepshead', 'red-snapper'];
  species.find(s => s.slug === 'red-grouper').related = ['gag-grouper', 'red-snapper', 'halibut'];
  const drum = species.find(s => s.slug === 'black-drum');
  drum.verdict.text = 'Smaller black drum are a common choice for the table, with mild, firm meat. Check the current harvest limits before keeping one. Inspect fillets during cleaning and follow safe handling guidance.';
  drum.taste.body[1] = 'Larger drum can have coarser flesh and visible parasites. Inspect the meat as you prepare it. If you cannot assess its condition, discard it rather than assuming that cooking will solve the problem.';
  drum.clean.steps[4] = 'Inspect the fillets as you trim. Do not assume every visible worm is harmless or that cooking makes spoiled fish safe.';
  drum.faq = drum.faq.map(f => /worms|Can you eat/.test(f.q) ? {q: f.q, a: /worms/.test(f.q) ? 'Black drum can contain visible parasites. Inspect fillets, keep them cold, and cook to 145°F. Do not rely on cooking to make spoiled or questionable fish safe.' : 'Yes. Smaller black drum have mild, firm meat. Check current harvest rules and consumption advisories before keeping fish for a meal.'} : f);
  const sheep = species.find(s => s.slug === 'sheepshead');
  sheep.faq = sheep.faq.map(f => /worms/.test(f.q) ? {q: f.q, a: 'Fish can carry parasites. Inspect the fillets, follow safe handling guidance, and cook to 145°F. Discard spoiled fish and do not assume an unidentified parasite is harmless.'} : f);
};
