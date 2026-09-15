const fs = require('fs');
const path = require('path');
const posts = require('./blog-posts');
const root = path.join(__dirname, '..');
const SITE = 'https://catchnbake.com';
const esc = s => s .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
module.exports = function buildBlog() {
  // Check prose only. JavaScript punctuation and HTML entities are not editorial copy.
  for (const p of posts) {
    const prose = [p.title,p.description,p.deck,p.caption,...p.sections.flatMap(s=>[s.title,s.html])].join(' ').replace(/<[^>]*>/g,' ').replace(/&(?:#\d+|#x[0-9a-f]+|[a-z]+);/gi,' ');
    if (/[;\u2014]/.test(prose)) throw new Error('Blog voice check: remove semicolons and em dashes from '+p.slug);
  }
  const base = fs.readFileSync(path.join(root,'about.html'),'utf8');
  const out = path.join(root,'blog'); fs.mkdirSync(out,{recursive:true});
  const photo = (p, lazy = false) => `<picture><source srcset="${p.webp}" type="image/webp"><img src="${p.image}" width="${p.width}" height="${p.height}" alt="${esc(p.alt)}" ${lazy?'loading="lazy"':'fetchpriority="high"'} decoding="async"></picture>`;
  function render(title,description,url,content,schema) {
    return base.replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(title)}</title>`)
      .replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${esc(description)}">`)
      .replace(/<link rel="canonical"[^>]*>/,`<link rel="canonical" href="${SITE}${url}">`)
      .replace(/<meta property="og:title"[^>]*>/,`<meta property="og:title" content="${esc(title)}">`)
      .replace(/<meta property="og:description"[^>]*>/,`<meta property="og:description" content="${esc(description)}">`)
      .replace(/<meta property="og:url"[^>]*>/,`<meta property="og:url" content="${SITE}${url}">`)
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,`<script type="application/ld+json">${JSON.stringify(schema,null,2)}</script>`)
      .replace('</head>','<link rel="stylesheet" href="/css/blog.css">\n</head>')
      .replace(/<main id="main">[\s\S]*?<\/main>/,`<main id="main" class="blog-main"><div class="blog-wrap">${content}</div></main>`);
  }
  const first=posts[0], second=posts[1];
  const home = `<div class="blog-top"><span class="blog-kicker">The Catch 'N Bake blog</span><p>Tampa Bay · St. Petersburg · Florida Gulf Coast</p></div>
    <h1>Tampa Bay fishing,<br>from water to table.</h1><p class="blog-intro">Snook along the shoreline. Gag on the reefs. Practical reading for the trip, the release, and the fish you bring back for dinner.</p>
    <nav class="blog-links" aria-label="Blog topics"><a href="#inshore">Inshore</a><a href="#gulf">Gulf &amp; reefs</a><a href="#kitchen">Catch to kitchen</a></nav>
    <section class="blog-feature" id="inshore"><a href="/blog/${first.slug}" aria-label="Read ${esc(first.title)}">${photo(first)}</a><div><span class="blog-kicker">September focus · Snook</span><h2>${first.title}</h2><p>${first.deck}</p><p class="blog-label">Trip planning · ${minutes(first)} minute read</p><a class="story-link" href="/blog/${first.slug}">Read the snook story →</a></div></section>
    <div class="blog-grid"><section class="blog-card" id="gulf"><a href="/blog/${second.slug}">${photo(second,true)}<span class="blog-kicker">Gulf &amp; reefs · Gag grouper</span><h3>${second.title}</h3></a><p>${second.deck}</p><a class="story-link" href="/blog/${second.slug}">Read the grouper story →</a></section>
    <section class="blog-card" id="kitchen"><span class="blog-kicker">Catch to kitchen</span><h2>A legal catch.<br>Now make dinner.</h2><p>Keep the trip plan and the cooking advice connected. Our species guides cover taste, cleaning, and preparation ideas.</p><div class="blog-guide-list"><a href="/fish/snook">Snook: taste, skinless fillets &amp; cooking →</a><a href="/fish/gag-grouper">Gag grouper: preparation &amp; dinner ideas →</a><a href="/fish/">Browse all fish guides →</a></div><div class="blog-note"><strong>Keep the details of your next trip.</strong><p>Save photos, bait, measurements, and notes in Catch 'N Bake. <a data-app-store href="https://apps.apple.com/us/app/catch-n-bake/id6762584046">Get the app on the App Store</a>.</p></div></section></div>
    <aside class="blog-note"><strong>Our approach</strong><p>We write practical guides and link to the agencies behind the rules. Catch photos come from our collection; they do not stand in for current fishing reports. <a href="/about#editorial">Read our editorial approach</a>.</p></aside>`;
  fs.writeFileSync(path.join(out,'index.html'),render("Tampa Bay Fishing Blog | Snook & Grouper | Catch 'N Bake",'Tampa Bay and St. Pete fishing stories, snook trip planning, Gulf gag grouper guides, and ideas for cooking your catch.','/blog/',home,{'@context':'https://schema.org','@type':'CollectionPage',name:"Catch 'N Bake fishing blog",url:SITE+'/blog/',mainEntity:{'@type':'ItemList',itemListElement:posts.map((p,i)=>({'@type':'ListItem',position:i+1,name:p.title,url:SITE+'/blog/'+p.slug}))}}));
  for(const p of posts){
    const other=posts.find(x=>x!==p);
    const content=`<nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/blog/">Blog</a> / ${p.species}</nav><header class="article-head"><span class="blog-kicker">${p.category} · Tampa Bay &amp; St. Pete</span><h1>${p.title}</h1><p class="blog-intro">${p.deck}</p><p class="blog-byline">By Catch 'N Bake · ${minutes(p)} minute read<br>Rules checked <time datetime="2026-09-14">September 14, 2026</time>. Check linked agencies for changes before fishing.</p></header>
      <figure class="blog-photo">${photo(p)}<figcaption>${p.caption}</figcaption></figure>
      <div class="article-layout"><nav class="article-toc" aria-label="In this article"><strong>In this article</strong>${p.sections.map(s=>`<a href="#${s.id}">${s.title}</a>`).join('')}</nav><article class="article-body">${p.sections.map(s=>`<section aria-labelledby="${s.id}"><h2 id="${s.id}">${s.title}</h2>${s.html}</section>`).join('')}
      <div class="blog-note"><strong>Remember what worked.</strong><p>Save your ${p.species.toLowerCase()} photo and a few notes in Catch 'N Bake while the trip is fresh. When you bring a fish home, look up a recipe for it in the app. <a data-app-store href="https://apps.apple.com/us/app/catch-n-bake/id6762584046">Get Catch 'N Bake on the App Store</a>.</p></div><div class="blog-note"><strong>Next read</strong><p><a href="/blog/${other.slug}">${other.title}</a></p></div><section class="article-sources"><h2>Sources and editorial notes</h2><p>We checked the agency sources below on September 14, 2026. Check them again before your trip for any changes.</p><ul>${p.sources.map(([n,u])=>`<li><a href="${u}">${n}</a></li>`).join('')}</ul></section></article></div>`;
    let html=render(p.title,p.description,'/blog/'+p.slug,content,{'@context':'https://schema.org','@graph':[{'@type':'BlogPosting',datePublished:'2026-09-14',dateModified:'2026-09-14',headline:p.title,description:p.description,url:SITE+'/blog/'+p.slug,mainEntityOfPage:SITE+'/blog/'+p.slug,image:SITE+p.image,author:{'@type':'Organization',name:"Catch 'N Bake",url:SITE+'/about'}},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE+'/'},{'@type':'ListItem',position:2,name:'Blog',item:SITE+'/blog/'},{'@type':'ListItem',position:3,name:p.species,item:SITE+'/blog/'+p.slug}]}]});
    html=html.replace(/<meta property="og:image"[^>]*>/,`<meta property="og:image" content="${SITE}${p.image}">`).replace(/<meta property="og:type"[^>]*>/,'<meta property="og:type" content="article">').replace(/<meta property="og:image:(?:width|height)"[^>]*>\s*/g,'');
    fs.writeFileSync(path.join(out,p.slug+'.html'),html);
  }
  // Add the blog to existing navigation while preserving other local edits.
  const files=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')).map(f=>path.join(root,f)),...['fish','blog'].flatMap(d=>fs.readdirSync(path.join(root,d)).filter(f=>f.endsWith('.html')).map(f=>path.join(root,d,f)))];
  for(const f of files){let h=fs.readFileSync(f,'utf8');h=h.replace(/(<a href="\/about">About<\/a>)(?!\s*<a href="\/blog\/">)/g,'$1\n<a href="/blog/">Blog</a>');fs.writeFileSync(f,h);}
  const homeFile=path.join(root,'index.html');
  let landing=fs.readFileSync(homeFile,'utf8');
  const teaser=`<!-- BLOG PREVIEW START -->
<section aria-labelledby="blog-preview-title"><div class="wrap">
<p class="eyebrow">From the blog</p><h2 id="blog-preview-title">Fishing around Tampa Bay this September</h2>
<p>Plan a St. Pete snook trip or prepare for the Gulf gag season. Start with the water you can reach, the current rules, and a plan for your catch.</p>
<p><a href="/blog/tampa-bay-snook-september">Read the snook trip plan →</a></p>
<p><a href="/blog/st-pete-gag-grouper-september">Read the gag grouper trip plan →</a></p>
<p><a href="/blog/">Explore the fishing blog →</a></p>
</div></section>
<!-- BLOG PREVIEW END -->`;
  landing=landing.includes('<!-- BLOG PREVIEW START -->')?landing.replace(/<!-- BLOG PREVIEW START -->[\s\S]*?<!-- BLOG PREVIEW END -->/,teaser):landing.replace('<!-- ============ FIELD GUIDES ============ -->',teaser+'\n<!-- ============ FIELD GUIDES ============ -->');
  fs.writeFileSync(homeFile,landing);
  const mapFile=path.join(root,'sitemap.xml');
  let map=fs.readFileSync(mapFile,'utf8').replace(/\s*<url><loc>https:\/\/catchnbake.com\/blog\/[\s\S]*?<\/url>/g,'');
  map=map.replace('</urlset>', ['/blog/',...posts.map(p=>'/blog/'+p.slug)].map(url=>'  <url><loc>'+SITE+url+'</loc><lastmod>2026-09-14</lastmod></url>').join('\n')+'\n</urlset>');
  fs.writeFileSync(mapFile,map);
  console.log('Blog published: 2 articles and /blog/.');
};
function minutes(p){return Math.ceil(p.sections.map(s=>s.html.replace(/<[^>]*>/g,' ')).join(' ').split(/\s+/).length/220);}
if(require.main===module)module.exports();
