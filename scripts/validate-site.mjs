import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const origin = 'https://starportablerestrooms.com';
const sitemap = readFileSync(resolve(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const errors = [], titles = new Set(), descriptions = new Set();
const parsed = new Map();
const fail = (file, message) => errors.push(`${file}: ${message}`);
const read = file => {
  if (!parsed.has(file)) parsed.set(file, readFileSync(file, 'utf8'));
  return parsed.get(file);
};
function checkRef(file, ref, asset = false) {
  if (/^(data:|tel:|mailto:|https?:\/\/)/.test(ref) && !ref.startsWith(origin + '/')) return;
  const pagePath = '/' + relative(root, file).replace(/index\.html$/, '');
  const url = new URL(ref.replaceAll('&amp;', '&'), origin + pagePath);
  if (url.origin !== origin) return;
  let target = resolve(root, decodeURIComponent(url.pathname).slice(1));
  if (url.pathname.endsWith('/')) target = resolve(target, 'index.html');
  if (!existsSync(target)) { fail(relative(root, file), `missing ${asset ? 'asset' : 'link'} ${ref}`); return; }
  if (url.hash && target.endsWith('.html')) {
    const id = decodeURIComponent(url.hash.slice(1));
    if (![...read(target).matchAll(/\bid="([^"]+)"/g)].some(m => m[1] === id)) fail(relative(root, file), `missing fragment ${ref}`);
  }
}
for (const url of urls) {
  const file = resolve(root, new URL(url).pathname.slice(1), 'index.html');
  if (!existsSync(file)) { fail(url, 'sitemap page missing'); continue; }
  const html = read(file), label = relative(root, file);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/)?.[1];
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/)?.[1];
  if (!title?.endsWith('| Star Portable Restrooms')) fail(label, 'missing title or full brand');
  if (!description) fail(label, 'missing description');
  if (titles.has(title)) fail(label, 'duplicate title');
  if (descriptions.has(description)) fail(label, 'duplicate description');
  titles.add(title); descriptions.add(description);
  if (canonical !== url) fail(label, 'canonical does not match sitemap');
  if ([...html.matchAll(/<h1\b/g)].length !== 1) fail(label, 'expected one H1');
  if (!html.includes('tel:+18339201299')) fail(label, 'missing call path');
  if (!html.includes('rental inquiry service')) fail(label, 'missing referral disclosure');
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) checkRef(file, href);
  for (const [, tag] of html.matchAll(/(<img\b[^>]*>)/g)) {
    for (const attribute of ['alt', 'width', 'height', 'src']) if (!new RegExp(`\\b${attribute}="`).test(tag)) fail(label, `image missing ${attribute}`);
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
    if (src) checkRef(file, src, true);
    for (const variant of (tag.match(/\bsrcset="([^"]+)"/)?.[1] || '').split(',').filter(Boolean)) checkRef(file, variant.trim().split(/\s+/)[0], true);
  }
  for (const [, ref] of html.matchAll(/<(?:script|link)\b[^>]*\b(?:src|href)="([^"]+)"/g)) checkRef(file, ref, true);
  for (const [, ref] of html.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) checkRef(file, ref, true);
  if (/href="https:\/\/fonts\.googleapis/.test(html)) fail(label, 'blocking external font stylesheet');
  const cssPath = html.match(/href="(\/assets\/site-[a-f0-9]+\.css)"/)?.[1];
  if (!cssPath) fail(label, 'missing versioned stylesheet');
  else for (const [, ref] of read(resolve(root, cssPath.slice(1))).matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) checkRef(file, ref, true);
}
if (new Set(urls).size !== urls.length) errors.push('Duplicate sitemap URLs');
if (sitemap.includes('<lastmod>')) errors.push('Unexpected build-date lastmod; only add a verified content date');
if (errors.length) { errors.forEach(e => console.error(`ERROR: ${e}`)); process.exit(1); }
console.log(`Validated metadata, links, fragments, assets, responsive images, and business disclosures on ${urls.length} sitemap pages.`);
