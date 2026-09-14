const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const root = path.join(__dirname, '..');
const files = fs.readdirSync(root).filter(f => f.endsWith('.html')).concat(fs.readdirSync(path.join(root, 'fish')).filter(f => f.endsWith('.html')).map(f => 'fish/' + f));
if (fs.existsSync(path.join(root, 'blog'))) files.push(...fs.readdirSync(path.join(root, 'blog')).filter(f => f.endsWith('.html')).map(f => 'blog/' + f));
const sitemap = [...fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
const errors = [], titles = new Set();
function resolve(url) {
  const pathname = new URL(url, 'https://catchnbake.com').pathname;
  const candidates = pathname.endsWith('/') ? [pathname + 'index.html'] : [pathname, pathname + '.html', pathname + '/index.html'];
  return candidates.map(p => path.join(root, decodeURIComponent(p))).find(p => fs.existsSync(p) && fs.statSync(p).isFile());
}
for (const file of files) {
  try {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    // Verification has separate success/failure states, each with its own hidden H1.
    if (file !== 'verify.html') assert.equal([...html.matchAll(/<h1\b/g)].length, 1, 'one H1');
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert(title && !titles.has(title), 'unique nonempty title'); titles.add(title);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (!/^(404|verify)\.html$/.test(file)) {
      assert(canonical?.startsWith('https://catchnbake.com/'), 'apex canonical');
      assert.equal(resolve(canonical), path.join(root, file), 'canonical resolves to this file');
      const draft = file.startsWith('blog/') && html.includes('<meta name="cnb-editorial-status" content="draft">');
      if (draft) {
        assert(html.includes('<meta name="robots" content="noindex, follow">'), 'draft is noindex');
        assert(!sitemap.includes(canonical), 'draft excluded from sitemap');
      } else {
        assert(sitemap.includes(canonical), 'indexable page is in sitemap');
        assert(!/noindex/.test(html), 'indexable');
      }
    }
    for (const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
      const url = match[1];
      if (url.startsWith('/') || url.startsWith('https://catchnbake.com/')) assert(resolve(url), 'missing local target: ' + url);
    }
    for (const m of html.matchAll(/(?:href)="#([^"]+)"/g)) assert(html.includes(`id="${m[1]}"`), 'missing anchor: ' + m[1]);
    for (const m of html.matchAll(/(?:srcset|imagesrcset)="([^"]+)"/g)) for (const image of m[1].split(',')) assert(resolve(image.trim().split(/\s/)[0]), 'missing responsive image');
    for (const m of html.matchAll(/<img\b[^>]*>/g)) assert(/\balt="/.test(m[0]) && /\bwidth="/.test(m[0]) && /\bheight="/.test(m[0]), 'image alt/dimensions');
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      const data = JSON.parse(m[1]);
      for (const entity of data['@graph'] || [data]) {
        if (entity['@type'] === 'Article') {
          assert.equal(entity.mainEntityOfPage, canonical, 'article canonical');
          assert(html.includes(`<time datetime="${entity.dateModified}">`), 'visible modified date');
          if (entity.image) assert(resolve(entity.image), 'article image exists');
        }
      }
    }
  } catch (e) { errors.push(`${file}: ${e.message}`); }
}
for (const url of sitemap) if (!resolve(url)) errors.push('sitemap missing target: ' + url);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${files.length} pages; ${sitemap.length} sitemap URLs; canonicals, local links, image references, anchors, metadata and structured data.`);
