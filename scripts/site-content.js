// Public content uses verified features. Change preview status only after release confirmation.
const questions = [
  ['Can I identify a fish from a photo?', "Yes. Take or upload a clear photo in Catch 'N Bake to get a suggested species identification. Review the result against your fish and correct it if needed. Keep the fins, tail, and body markings visible in the photo."],
  ["Is Catch 'N Bake free?", 'The free app includes 10 photo identifications per calendar month, up to 25 catch journal entries, and 10 saved recipes. Optional Premium subscriptions remove those limits. Check current prices in the app before subscribing.'],
  ['How do I find a recipe for the fish I caught?', 'Identify your catch in the app, then explore recipes for that species. You can also start with our <a href="/fish/">free fish taste and cooking guides</a>, including <a href="/fish/snook">snook</a>, <a href="/fish/red-snapper">red snapper</a>, and <a href="/fish/halibut">Pacific halibut</a>.'],
  ['Can the app tell me whether I can keep a fish?', 'Use the identification and regulation links as a starting point. Confirm the species, location, season, and applicable harvest requirements with the official fisheries agency before keeping a catch. A photo identification does not establish that a fish is legal to keep.'],
  ['Do you have a guide for Pacific halibut in Canada?', 'Yes. Our <a href="/fish/halibut">Pacific halibut guide</a> includes original catch photos from off Port Renfrew, British Columbia, preparation ideas, and links to Fisheries and Oceans Canada. Check the official rules for the waters where you plan to fish.'],
  ['What can I save in my fishing journal?', 'Keep catch photos, species, length, weight, bait, location, and trip notes together. Use those details to remember what worked and revisit earlier catches.'],
  ['Can I log a catch without cell service?', 'Catch logging works offline and syncs when your connection returns. Photo identification and new recipe requests need an internet connection.'],
  ['What is changing in version 1.1.0?', 'The planned update brings a feed of shared catches, recipes, and food photos, along with Following, angler profiles, and filters for species, area, and time. Read the <a href="/updates">version 1.1.0 preview</a> for the full feature list and release status.']
];

exports.homeFaq = () => `<section id="faq" aria-labelledby="faq-title"><div class="wrap">
  <div class="sechead"><span class="meta">Before you download</span></div>
  <h2 id="faq-title">Fishing app questions, answered.</h2>
  <div class="app-faq">${questions.map(([q, a]) => `<details><summary>${q}</summary><div class="answer"><p>${a}</p></div></details>`).join('\n')}</div>
  <p class="prose">Need help with your account or subscription? <a href="/support">Visit support</a>.</p>
</div></section>`;

exports.updates = {
  title: "Catch 'N Bake 1.1.0 Preview | Feed & Cooking Tools",
  description: "Preview Catch 'N Bake 1.1.0: a fishing community feed, angler profiles, shared catch rankings, shopping lists, and cooking mode. See the planned changes.",
  url: '/updates',
  schema: {'@context': 'https://schema.org', '@type': 'WebPage', name: "Catch 'N Bake version 1.1.0 preview", url: 'https://catchnbake.com/updates', description: 'Preview of the planned version 1.1.0 update. Public release is not yet confirmed.'},
  content: `<nav aria-label="Breadcrumb"><a href="/">Home</a> / What's new</nav>
  <h1>What's new in Catch 'N Bake</h1>
  <p class="intro">Follow the anglers you fish like, find a dinner idea, and keep your own catches close.</p>
  <h2>Version 1.1.0 preview</h2>
  <p><strong>Coming soon.</strong> These changes are prepared for version 1.1.0. We will update this page when the release is available in the App Store.</p>
  <h2>A feed for fish and food</h2>
  <p>Browse shared catches, recipes, and food photos together. Switch to Following to see posts from anglers you follow. Discover other anglers through shared species interests and a general area you choose.</p>
  <p>Tap an angler to open their public profile and explore their posts. Narrow the feed by content type, species, area, or time when you want something specific.</p>
  <h2>Compare your shared catches</h2>
  <p>Explore rankings by catch count, length, or weight, with species, area, and time filters. Open an angler's profile from the rankings to see more of their posts.</p>
  <p>Rankings use eligible shared catches and measurements that anglers enter. Private catch coordinates and private notes stay out of public profiles and rankings.</p>
  <h2>Take your recipe to the kitchen</h2>
  <p>Save recipes in your cookbook and turn ingredients into a shopping list. Check items off as you shop. In cooking mode, follow large directions, check ingredients, and use the timer while you cook.</p>
  <h2>Easier sharing</h2>
  <p>Updated photo and recipe forms keep Cancel and Post or Share within reach while you type. The update also includes improvements to photo privacy, subscription restores, and account recovery.</p>
  <h2>Start with a fish guide</h2>
  <p>The website guides are available now. Read about <a href="/fish/snook">snook taste and cooking</a>, <a href="/fish/red-snapper">American red snapper</a>, or <a href="/fish/halibut">Pacific halibut caught off Port Renfrew</a>.</p>
  <p><a href="/#faq">Read the app FAQ</a> or <a href="/support">get help with the app</a>.</p>`
};
