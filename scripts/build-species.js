#!/usr/bin/env node
/**
 * Species-page generator — the site's SEO content system.
 *
 * Usage:  node scripts/build-species.js
 * Output: fish/<slug>.html for every entry in SPECIES below.
 *
 * To add a species: add an entry to SPECIES, add its images
 * (images/fish/<slug>.png 1600x1000, images/og/<slug>.png 1200x630),
 * add the route to sitemap.xml, then re-run this script.
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
    heroAlt: 'Sheepshead — a deep-bodied inshore fish with bold vertical black and silver bars',
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
    faq: [
      { q: 'Can you eat sheepshead?', a: "Yes — sheepshead is excellent eating, with sweet, mild white meat often compared to shellfish thanks to its diet of crabs, shrimp, and barnacles. It's a regulated species in Florida, so check current FWC size and bag limits before keeping one." },
      { q: 'What does sheepshead taste like?', a: "Sweet, clean, and slightly briny — closer to crab or lobster than to typical white fish. The fillets are white, lean, firm, and flaky with no oily or fishy edge when properly iced." },
      { q: 'Are sheepshead hard to clean?', a: "Yes — heavy scales, sharp dorsal spines, and a large rib cage make them the toughest-cleaning common inshore fish. Ice the fish well, use a sturdy or electric fillet knife, work over the rib cage rather than through it, and expect a yield of roughly a third of the fish's weight." },
      { q: 'Do sheepshead have worms?', a: "Like many inshore fish, sheepshead can occasionally carry harmless parasites — it's normal and not a reason to discard the fish. Inspect fillets as you trim and cook fish to an internal temperature of 145°F, which makes properly handled fillets safe to eat." }
    ],
    related: ['redfish', 'snook']
  },
  {
    slug: 'snook',
    name: 'Snook',
    scientific: 'Centropomus undecimalis',
    title: "Can You Eat Snook? Yes — When It's Legal. Taste & Recipes",
    description: "Snook is superb table fare — but it's one of Florida's most tightly protected gamefish. When you can (and can't) keep one, why the skin must come off, and how to cook it right.",
    verdict: { short: 'Yes — but only when it’s legal, and often it isn’t.', tone: 'careful',
      text: "Snook is genuinely superb eating — that's exactly why Florida protects it so tightly. Harvest is limited to open seasons, a narrow slot size, and a required snook permit, and the rules differ between the Atlantic and Gulf coasts. Many of the snook you'll catch must go back. Check the FWC rules first, every time — and when in doubt, release it." },
    heroAlt: 'Common snook — a sleek silver gamefish with a distinctive black lateral line',
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
    heroAlt: 'Redfish (red drum) — a copper-bronze inshore fish with a black spot near the tail',
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
        datePublished: PUBLISHED,
        dateModified: PUBLISHED,
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

function page(sp) {
  const relatedCards = sp.related.map((slug) => {
    const r = SPECIES.find((s) => s.slug === slug);
    return `    <a class="rel-card" href="/fish/${r.slug}">
      <p class="q">Can you eat…</p>
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
<meta name="theme-color" content="#f7f3ec" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="preload" href="/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin />
<script type="application/ld+json">
${jsonLd(sp)}
</script>
<style>
  /* self-hosted variable fonts (latin) */
  @font-face{font-family:'Fraunces';font-style:normal;font-weight:400 700;font-display:swap;src:url('/fonts/fraunces-latin.woff2') format('woff2')}
  @font-face{font-family:'Inter';font-style:normal;font-weight:400 600;font-display:swap;src:url('/fonts/inter-latin.woff2') format('woff2')}
  /* metric-matched fallbacks: no layout shift during font swap */
  @font-face{font-family:'Fraunces Fallback';src:local('Georgia');ascent-override:98%;descent-override:26%;line-gap-override:0%;size-adjust:101%}
  @font-face{font-family:'Inter Fallback';src:local('Arial');ascent-override:96.9%;descent-override:24.2%;line-gap-override:0%;size-adjust:107%}

  :root{
    --paper:#f7f3ec;--ink:#1e1b16;--ink-soft:#4c463c;--rule:#d9d2c4;
    --tide:#1f4e5f;--tide-deep:#173b48;--ember:#b3542e;--paper-on-dark:#f3ede1;--measure:64ch;
    --serif:'Fraunces','Fraunces Fallback',Georgia,serif;
    --sans:'Inter','Inter Fallback',system-ui,sans-serif;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  [hidden]{display:none!important}
  html{scroll-behavior:smooth}
  @media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}}
  body{background:var(--paper);color:var(--ink);font-family:var(--sans);font-size:1.0625rem;line-height:1.7;-webkit-font-smoothing:antialiased}
  body::before{
    content:"";position:fixed;inset:0;pointer-events:none;opacity:.35;z-index:0;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.55 0 0 0 0 0.52 0 0 0 0 0.46 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .skip{position:absolute;left:-9999px;top:0;background:var(--tide);color:#fff;padding:.6rem 1rem;z-index:50;font-weight:600}
  .skip:focus{left:1rem;top:1rem}
  .wrap{position:relative;z-index:1;max-width:46rem;margin:0 auto;padding:0 1.5rem 6rem}
  a{color:var(--tide)}
  :focus-visible{outline:2px solid var(--tide);outline-offset:3px}
  strong{font-weight:600}
  header.site{display:flex;justify-content:space-between;align-items:baseline;padding:2rem 0 1.5rem;border-bottom:1px solid var(--rule);margin-bottom:3.5rem}
  .brand{font-family:var(--serif);font-weight:700;font-size:1.15rem;letter-spacing:.01em;color:var(--ink);text-decoration:none}
  .brand span{color:var(--tide)}
  nav.site-nav{font-size:.85rem;font-weight:500}
  nav.site-nav a{color:var(--ink-soft);text-decoration:none;margin-left:1.25rem}
  nav.site-nav a:hover{color:var(--tide)}
  .eyebrow{font-size:.78rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--tide);margin-bottom:1rem}
  h1{font-family:var(--serif);font-weight:600;font-size:clamp(2.2rem,5.5vw,3.4rem);line-height:1.1;letter-spacing:-.01em;margin-bottom:1.25rem}
  .sci{font-style:italic;color:var(--ink-soft);font-size:1rem;margin-bottom:2rem}
  p{max-width:var(--measure);margin-bottom:1rem;color:var(--ink-soft)}
  .intro{font-size:1.15rem}
  .verdict{border:1px solid var(--rule);border-left:5px solid var(--tide);background:rgba(255,255,255,.5);padding:1.75rem 2rem;margin:2.5rem 0}
  .verdict.careful{border-left-color:var(--ember)}
  .verdict .v{font-family:var(--serif);font-weight:600;font-size:1.6rem;line-height:1.2;color:var(--ink);margin-bottom:.6rem}
  .verdict.careful .v{color:var(--ember)}
  .verdict p{margin:0}
  figure{margin:3rem 0}
  figure img{display:block;width:100%;height:auto;border-radius:4px;background:#e8e2d5}
  h2{font-family:var(--serif);font-weight:600;font-size:clamp(1.5rem,3vw,1.9rem);line-height:1.2;margin:3.25rem 0 1rem;color:var(--ink)}
  h3{font-family:var(--serif);font-size:1.2rem;font-weight:600;margin:1.75rem 0 .5rem;color:var(--ink)}
  ol.steps{max-width:var(--measure);margin:1.25rem 0 1rem;padding-left:0;list-style:none;counter-reset:step}
  ol.steps li{counter-increment:step;position:relative;padding:.5rem 0 .5rem 3rem;color:var(--ink-soft)}
  ol.steps li::before{content:counter(step,decimal-leading-zero);position:absolute;left:0;top:.55rem;font-family:var(--serif);font-weight:700;color:var(--tide)}
  .safety{border-left:3px solid var(--ember);background:rgba(179,84,46,.06);padding:1rem 1.25rem;margin:1.75rem 0;max-width:var(--measure);font-size:.98rem;color:var(--ink)}
  .regs{border:1px solid var(--rule);background:rgba(255,255,255,.45);padding:1.5rem 1.75rem;margin:1.25rem 0;max-width:var(--measure)}
  .regs p{margin-bottom:.75rem}
  .regs a{font-weight:600}
  .cta-band{background:var(--tide-deep);color:var(--paper-on-dark);border-radius:4px;padding:2.5rem 2rem;margin:3.5rem 0;text-align:center}
  .cta-band h2{color:#fff;margin:0 0 .5rem;font-size:1.6rem}
  .cta-band p{color:rgba(243,237,225,.8);margin:0 auto 1.5rem;max-width:36em}
  .store-badge{display:inline-flex;align-items:center;gap:.7rem;background:var(--paper);color:var(--ink);text-decoration:none;border-radius:12px;padding:.65rem 1.25rem .65rem 1.05rem;line-height:1.15;border:1px solid var(--paper)}
  .store-badge .small{display:block;font-size:.66rem;letter-spacing:.06em;text-transform:uppercase;opacity:.7}
  .store-badge .big{display:block;font-family:var(--serif);font-size:1.05rem;font-weight:600}
  .store-badge.is-soon{background:transparent;color:var(--paper-on-dark);border:1px solid rgba(243,237,225,.5);cursor:default}
  dl.faq{max-width:var(--measure)}
  dl.faq dt{font-weight:600;color:var(--ink);margin-top:1.5rem}
  dl.faq dd{margin:.4rem 0 0;color:var(--ink-soft)}
  .related{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-top:1.5rem}
  @media (max-width:560px){.related{grid-template-columns:1fr}}
  .rel-card{display:block;text-decoration:none;border:1px solid var(--rule);background:rgba(255,255,255,.45);padding:1.5rem;color:var(--ink)}
  .rel-card:hover{border-color:var(--tide)}
  .rel-card .q{font-size:.75rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--ember);margin-bottom:.4rem}
  .rel-card h3{margin:0 0 .3rem;font-size:1.3rem}
  .rel-card .go{font-size:.85rem;font-weight:600;color:var(--tide)}
  footer.site{margin-top:5rem;padding-top:2rem;border-top:1px solid var(--rule);font-size:.85rem;color:var(--ink-soft);display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem}
  footer.site a{color:var(--ink-soft)}
</style>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="wrap">

<header class="site">
  <a class="brand" href="/">Catch <span>'N</span> Bake</a>
  <nav class="site-nav" aria-label="Site">
    <a href="/">Home</a>
    <a href="/#guides">Fish Guides</a>
    <a href="/support">Support</a>
  </nav>
</header>

<main id="main">

<p class="eyebrow">Field Guide · Florida Inshore</p>
<h1>Can You Eat ${sp.name}?</h1>
<p class="sci">${sp.scientific}</p>

<p class="intro">${sp.intro}</p>

<div class="${verdictClass}">
  <p class="v">${sp.verdict.short}</p>
  <p>${sp.verdict.text}</p>
</div>

<figure>
  <img src="/images/fish/${sp.slug}.png" width="1600" height="1000" alt="${esc(sp.heroAlt)}" loading="lazy" />
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
<p class="safety"><strong>Food safety:</strong> ${sp.methods.safety}</p>

<h2>Regulations: check before you keep</h2>
<div class="regs">
  <p>${sp.regs.body}</p>
  <p><a href="${sp.regs.url}" rel="noopener">${sp.regs.label} →</a></p>
</div>

<div class="cta-band">
  <h2>Caught one? Make sure, then make dinner.</h2>
  <p>Snap a photo in Catch 'N Bake to confirm the species, see a regulations summary, and get recipes written for your exact fish.</p>
  <a class="store-badge" data-app-store hidden href="#">
    <span><span class="small">Download on the</span><span class="big">App Store</span></span>
  </a>
  <span class="store-badge is-soon" data-store-soon>
    <span><span class="small">Coming soon to the</span><span class="big">App Store</span></span>
  </span>
</div>

<h2>Frequently asked questions</h2>
<dl class="faq">
${sp.faq.map((f) => `  <dt>${f.q}</dt>\n  <dd>${f.a}</dd>`).join('\n')}
</dl>

<h2>More from the field guide</h2>
<div class="related">
${relatedCards}
</div>

</main>

<footer class="site">
  <span>© 2026 Catch 'N Bake LLC · Made in Florida</span>
  <span><a href="/">Home</a> · <a href="/support">Support</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/guidelines">Guidelines</a></span>
</footer>

</div>
<script src="/js/app-store.js" defer></script>
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
