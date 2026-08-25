import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { siteUrl, escapeLd } from './lib/site.mjs';
import { posts } from './lib/blog-posts.mjs';

const root = resolve(import.meta.dirname, '..');
const hubPath = resolve(root, 'blog', 'index.html');

/**
 * Rebuilds the hub's card grid, filter chips and ItemList schema from the post
 * data. The hub is otherwise hand-maintained, but the card list drifted out of
 * sync the moment new guides were added, so this part is generated.
 */

// Filter chips map several article categories onto the four user-facing groups.
const filterGroup = (category) => {
  const map = {
    Pricing: 'pricing',
    Usage: 'usage',
    Maintenance: 'usage',
    'How it works': 'usage',
    Placement: 'planning',
    Planning: 'planning',
    Events: 'planning',
    Options: 'planning',
    Regulations: 'rules',
    Industry: 'rules',
    Logistics: 'rules',
  };
  return map[category] || 'planning';
};

const featured = posts.find((post) => post.featured) || posts[0];
const rest = posts.filter((post) => post.slug !== featured.slug).sort((a, b) => a.order - b.order);

const cards = rest.map((post) => `
            <article class="blog-card" data-blog-card data-category="${filterGroup(post.category)}">
              <div class="blog-card-visual"><img src="${post.image}" alt="${post.alt}" loading="lazy" /></div>
              <div class="blog-card-content"><div class="blog-meta"><span class="tag">${post.category}</span><span>${post.readTime} min read</span></div><h3><a href="/blog/${post.slug}/">${post.title}</a></h3><p>${post.description}</p><a class="text-link" href="/blog/${post.slug}/">Read the guide <span class="arrow">→</span></a></div>
            </article>`).join('');

const filters = `
            <button class="filter-btn active" type="button" data-blog-filter="all">All articles</button>
            <button class="filter-btn" type="button" data-blog-filter="planning">Planning</button>
            <button class="filter-btn" type="button" data-blog-filter="pricing">Pricing</button>
            <button class="filter-btn" type="button" data-blog-filter="usage">Usage &amp; care</button>
            <button class="filter-btn" type="button" data-blog-filter="rules">Rules &amp; logistics</button>
          `;

let html = readFileSync(hubPath, 'utf8');

const replaceBlock = (source, openTag, closeMarker, replacement, label) => {
  const start = source.indexOf(openTag);
  if (start === -1) throw new Error(`sync-blog-hub: could not find ${label}`);
  const from = start + openTag.length;
  const end = source.indexOf(closeMarker, from);
  if (end === -1) throw new Error(`sync-blog-hub: could not find end of ${label}`);
  return source.slice(0, from) + replacement + source.slice(end);
};

html = replaceBlock(html, '<div class="blog-grid">', '\n          </div>', `${cards}`, 'blog grid');
html = replaceBlock(html, '<div class="blog-filters" aria-label="Filter blog posts">', '\n          </div>', filters, 'blog filters');

// ItemList schema follows the same list, in publication order.
const ordered = [featured, ...rest];
const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
for (const match of blocks) {
  const json = JSON.parse(match[1]);
  const nodes = json['@graph'] || (Array.isArray(json) ? json : [json]);
  const list = nodes.find((node) => node['@type'] === 'ItemList');
  if (!list) continue;
  list.numberOfItems = ordered.length;
  list.itemListElement = ordered.map((post, index) => ({
    '@type': 'ListItem', position: index + 1, url: `${siteUrl}/blog/${post.slug}/`, name: post.title,
  }));
  const blog = nodes.find((node) => node['@type'] === 'Blog');
  if (blog) blog.blogPost = ordered.map((post) => ({ '@id': `${siteUrl}/blog/${post.slug}/#article` }));
  const out = json['@graph'] ? { ...json, '@graph': nodes } : (Array.isArray(json) ? nodes : nodes[0]);
  html = html.replace(match[0], `<script type="application/ld+json">${escapeLd(out)}</script>`);
}

writeFileSync(hubPath, html);
console.log(`Synced blog hub: 1 featured + ${rest.length} cards.`);
