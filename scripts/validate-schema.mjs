import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const siteUrl = 'https://starportablerestrooms.com';
const errors = [];

const locationDirectories = readdirSync(resolve(root, 'location'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(resolve(root, 'location', entry.name, 'index.html')))
  .map((entry) => entry.name)
  .sort();

const pages = [
  { label: 'home', file: 'index.html', canonical: `${siteUrl}/`, required: ['Organization', 'WebSite', 'WebPage', 'Service', 'FAQPage'] },
  { label: 'about', file: 'about.html', canonical: `${siteUrl}/about.html`, required: ['Organization', 'WebSite', 'AboutPage', 'BreadcrumbList'] },
  { label: 'blog', file: 'blog.html', canonical: `${siteUrl}/blog.html`, required: ['Organization', 'WebSite', 'CollectionPage', 'ItemList', 'BreadcrumbList'] },
  { label: 'contact', file: 'contact.html', canonical: `${siteUrl}/contact.html`, required: ['Organization', 'WebSite', 'ContactPage', 'Service', 'BreadcrumbList', 'FAQPage'] },
  { label: 'location hub', file: 'location/index.html', canonical: `${siteUrl}/location/`, required: ['Organization', 'WebSite', 'CollectionPage', 'ItemList', 'BreadcrumbList'] },
  ...locationDirectories.map((slug) => ({
    label: slug,
    file: `location/${slug}/index.html`,
    canonical: `${siteUrl}/location/${slug}/`,
    required: ['Organization', 'WebSite', 'WebPage', 'Service', 'BreadcrumbList', 'FAQPage'],
  })),
];

for (const page of pages) {
  const html = readFileSync(resolve(root, page.file), 'utf8');
  const blocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  if (blocks.length !== 1) {
    errors.push(`${page.label}: expected exactly one JSON-LD block; found ${blocks.length}.`);
    continue;
  }

  let parsed;
  try {
    parsed = JSON.parse(blocks[0][1]);
  } catch (error) {
    errors.push(`${page.label}: invalid JSON-LD (${error.message}).`);
    continue;
  }

  const graph = parsed['@graph'] || [parsed];
  const types = new Set(graph.flatMap((node) => Array.isArray(node['@type']) ? node['@type'] : [node['@type']]));
  page.required.forEach((type) => {
    if (!types.has(type)) errors.push(`${page.label}: missing relevant ${type} schema.`);
  });

  const organization = graph.find((node) => node['@type'] === 'Organization');
  if (organization?.telephone !== '+18339201299') errors.push(`${page.label}: Organization telephone is missing or incorrect.`);
  if (organization?.contactPoint?.telephone !== '+18339201299') errors.push(`${page.label}: Organization ContactPoint is missing or incorrect.`);

  const pageNode = graph.find((node) => ['WebPage', 'AboutPage', 'CollectionPage', 'ContactPage'].includes(node['@type']) && node.url === page.canonical);
  if (!pageNode) errors.push(`${page.label}: page-specific schema URL does not match its canonical URL.`);

  const faq = graph.find((node) => node['@type'] === 'FAQPage');
  if (faq) {
    const visibleFaqCount = (html.match(/data-faq-item/g) || []).length;
    if (faq.mainEntity?.length !== visibleFaqCount) errors.push(`${page.label}: FAQ schema count does not match the ${visibleFaqCount} visible FAQs.`);
  }

  if (page.label === 'blog') {
    const itemList = graph.find((node) => node['@type'] === 'ItemList');
    const visibleGuideCount = (html.match(/<article class="blog-(?:featured|card)"/g) || []).length;
    if (itemList?.itemListElement?.length !== visibleGuideCount) errors.push(`blog: ItemList count does not match the ${visibleGuideCount} visible guides.`);
  }
}

if (pages.length !== 55) errors.push(`Expected schema audit coverage for 55 pages; found ${pages.length}.`);

if (errors.length) {
  errors.forEach((error) => console.error(`ERROR: ${error}`));
  console.error(`\nSchema validation failed with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(`Validated relevant, parseable JSON-LD schema on all ${pages.length} pages.`);
console.log('Organization, WebSite, page type, Service, Breadcrumb, ItemList, and FAQ coverage match page content where applicable.');
