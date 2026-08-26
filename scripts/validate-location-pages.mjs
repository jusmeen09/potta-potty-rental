import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const siteUrl = 'https://starportablerestrooms.com';
const phoneHref = '+18339201299';
const phoneDisplay = '(833) 920-1299';
const locationRoot = resolve(root, 'location');
const errors = [];
const warnings = [];

const read = (file) => readFileSync(file, 'utf8');

// Root .html pages minus the noindex 404, plus every directory index under
// location/, service/, and blog/ (including each hub itself).
const countIndexablePages = () => {
  const rootPages = readdirSync(root).filter((name) => name.endsWith('.html') && !name.startsWith('._') && name !== '404.html');
  const countDir = (name) => {
    const directory = resolve(root, name);
    if (!existsSync(directory)) return 0;
    const children = readdirSync(directory, { withFileTypes: true });
    const hub = children.some((entry) => entry.isFile() && entry.name === 'index.html') ? 1 : 0;
    const leaves = children.filter((entry) => entry.isDirectory() && !entry.name.startsWith('._') && existsSync(resolve(directory, entry.name, 'index.html'))).length;
    return hub + leaves;
  };
  return rootPages.length + ['about', 'contact', 'location', 'service', 'blog'].reduce((total, name) => total + countDir(name), 0);
};
const match = (html, pattern) => html.match(pattern)?.[1]?.trim() || '';
const plainText = (value) => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

const stateDirectories = readdirSync(locationRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(resolve(locationRoot, entry.name, 'index.html')))
  .map((entry) => entry.name)
  .sort();

const pages = [
  { kind: 'hub', slug: '', file: resolve(locationRoot, 'index.html'), expectedCanonical: `${siteUrl}/location/` },
  ...stateDirectories.map((slug) => ({
    kind: 'state',
    slug,
    file: resolve(locationRoot, slug, 'index.html'),
    expectedCanonical: `${siteUrl}/location/${slug}/`,
  })),
];

// No hardcoded state count here: stateDirectories is read straight from disk, and
// pages.length is always stateDirectories.length + 1 by construction above, so a
// magic-number assertion would only encode a stale roster rather than catch a bug.

const seenTitles = new Map();
const seenDescriptions = new Map();
const seenCanonicals = new Map();

for (const page of pages) {
  const html = read(page.file);
  const title = plainText(match(html, /<title>([\s\S]*?)<\/title>/i));
  const description = match(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const canonical = match(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const h1 = plainText(match(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i));
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((item) => plainText(item[1]));
  const jsonLdBlocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];

  if (!title) fail(`${page.slug || 'hub'}: missing title.`);
  if (!description) fail(`${page.slug || 'hub'}: missing meta description.`);
  if (!h1) fail(`${page.slug || 'hub'}: missing H1.`);
  if (canonical !== page.expectedCanonical) fail(`${page.slug || 'hub'}: canonical is ${canonical || 'missing'}; expected ${page.expectedCanonical}.`);
  if (title.length > 60) warn(`${page.slug || 'hub'}: title is ${title.length} characters.`);
  if (description.length > 160) warn(`${page.slug || 'hub'}: description is ${description.length} characters.`);
  if (seenTitles.has(title)) fail(`${page.slug || 'hub'}: duplicate title also used by ${seenTitles.get(title)}.`);
  if (seenDescriptions.has(description)) fail(`${page.slug || 'hub'}: duplicate description also used by ${seenDescriptions.get(description)}.`);
  if (seenCanonicals.has(canonical)) fail(`${page.slug || 'hub'}: duplicate canonical also used by ${seenCanonicals.get(canonical)}.`);
  seenTitles.set(title, page.slug || 'hub');
  seenDescriptions.set(description, page.slug || 'hub');
  seenCanonicals.set(canonical, page.slug || 'hub');

  if (jsonLdBlocks.length !== 1) fail(`${page.slug || 'hub'}: expected one JSON-LD block; found ${jsonLdBlocks.length}.`);

  let graph = [];
  if (jsonLdBlocks.length) {
    try {
      const parsed = JSON.parse(jsonLdBlocks[0][1]);
      graph = parsed['@graph'] || [parsed];
    } catch (error) {
      fail(`${page.slug || 'hub'}: invalid JSON-LD (${error.message}).`);
    }
  }

  const types = new Set(graph.flatMap((item) => Array.isArray(item['@type']) ? item['@type'] : [item['@type']]));
  const requiredTypes = page.kind === 'hub'
    ? ['Organization', 'WebSite', 'CollectionPage', 'ItemList', 'BreadcrumbList']
    : ['Organization', 'WebSite', 'WebPage', 'Service', 'BreadcrumbList', 'FAQPage'];
  requiredTypes.forEach((type) => {
    if (!types.has(type)) fail(`${page.slug || 'hub'}: JSON-LD is missing ${type}.`);
  });

  if (page.kind === 'state') {
    if (!title.startsWith('Porta Potty Rental in ')) fail(`${page.slug}: title does not lead with the target query.`);
    if (!h1.startsWith('Porta Potty Rental in ')) fail(`${page.slug}: H1 does not lead with the target query.`);
    if (!h2s.some((heading) => heading.includes(h1))) fail(`${page.slug}: no H2 contains the primary H1 phrase.`);
    if (!html.includes('data-location-state=')) fail(`${page.slug}: missing state data attribute for call tracking.`);
    if ((html.match(/href=["']tel:/g) || []).length < 7) fail(`${page.slug}: fewer than seven visible call paths.`);
    if (!html.includes(`href="tel:${phoneHref}"`) || !html.includes(phoneDisplay)) fail(`${page.slug}: real phone number is missing from visible call paths.`);

    const service = graph.find((item) => item['@type'] === 'Service');
    if (!service?.areaServed?.name) fail(`${page.slug}: Service schema is missing state areaServed.`);
    const faq = graph.find((item) => item['@type'] === 'FAQPage');
    const visibleFaqCount = (html.match(/data-faq-item/g) || []).length;
    if (faq?.mainEntity?.length !== visibleFaqCount) fail(`${page.slug}: visible FAQ and FAQ schema counts do not match.`);
  }
}

const sitemap = read(resolve(root, 'public', 'sitemap.xml'));
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((item) => item[1]);
// Derived from what is actually on disk so adding a page cannot silently skip the sitemap.
const expectedSitemapUrls = countIndexablePages();
if (sitemapUrls.length !== expectedSitemapUrls) fail(`Expected ${expectedSitemapUrls} sitemap URLs; found ${sitemapUrls.length}.`);
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail('Sitemap contains duplicate URLs.');
pages.forEach((page) => {
  if (!sitemapUrls.includes(page.expectedCanonical)) fail(`Sitemap is missing ${page.expectedCanonical}.`);
});

const home = read(resolve(root, 'index.html'));
stateDirectories.forEach((slug) => {
  if (!new RegExp(`href=["']/?location/${slug}/["']`).test(home)) fail(`Homepage is missing a link to ${slug}.`);
});

warnings.forEach((message) => console.warn(`WARN: ${message}`));
if (errors.length) {
  errors.forEach((message) => console.error(`ERROR: ${message}`));
  console.error(`\nLocation validation failed with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(`Validated ${pages.length} location pages, ${stateDirectories.length} states, and ${sitemapUrls.length} unique sitemap URLs.`);
console.log('Titles, descriptions, canonicals, headings, JSON-LD, FAQ parity, call paths, and homepage links passed.');
