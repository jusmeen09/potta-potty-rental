import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { header, footer, organization, website, escapeLd } from './lib/site.mjs';
const root = resolve(import.meta.dirname, '..');
const staticPages = ['index.html', 'about/index.html', 'contact/index.html', 'blog/index.html', 'privacy/index.html', 'terms/index.html'];
for (const file of staticPages) {
  const path = resolve(root, file);
  let html = readFileSync(path, 'utf8');
  const active = file === 'index.html' ? '/' : '/' + file.split('/')[0] + '/';
  html = html.replace(/<a class="skip-link"[\s\S]*?(?=<main\b)/, header(active).trimStart() + '\n');
  html = html.replace(/<footer class="footer">[\s\S]*?<\/footer>/, footer.slice(0, footer.indexOf('<a class="mobile-call"')).trim());
  // Manual pages retain their content, with the same mobile CTA as generators.
  html = html.replace(/<a class="mobile-call"[\s\S]*?<\/a>/, footer.slice(footer.indexOf('<a class="mobile-call"')).trim());
  html = html.replace(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/, (_, block) => {
    const parsed = JSON.parse(block), graph = parsed['@graph'];
    const orgIndex = graph.findIndex(n => n['@type'] === 'Organization');
    if (orgIndex >= 0) graph[orgIndex] = organization;
    if (!graph.some(n => n['@type'] === 'WebSite')) graph.push(website);
    const page = graph.find(n => ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage'].includes(n['@type']));
    if (page) {
      page.name = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      page.description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1] || page.description;
    }
    const faq = graph.find(n => n['@type'] === 'FAQPage');
    if (faq) {
      const visible = [...html.matchAll(/<button[^>]*data-faq-button[^>]*>([\s\S]*?)<span class="faq-plus">[\s\S]*?<\/button>\s*<div class="faq-answer"><div><p>([\s\S]*?)<\/p>/g)];
      if (visible.length !== faq.mainEntity.length) throw new Error(`${file}: could not sync every visible FAQ`);
      const plain = text => text.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
      faq.mainEntity = visible.map(([, q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } }));
    }
    return `<script type="application/ld+json">${escapeLd(parsed)}</script>`;
  });
  writeFileSync(path, html);
}
// Keep structured descriptions consistent with the disclosed referral service.
function walk(folder) {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || ['node_modules', 'dist', 'public', 'output', 'scripts', 'assets'].includes(entry.name)) continue;
    const path = resolve(folder, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith('.html')) {
      let html = readFileSync(path, 'utf8');
      html = html.replace(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/, (_, block) => {
        const json = JSON.parse(block);
        for (const node of json['@graph'] || [json]) if (node['@type'] === 'Service') {
          node.serviceType = 'Portable restroom rental inquiry referral';
          node.description = 'Star receives rental inquiries and may pass or sell them to local providers. The provider confirms coverage, equipment, prices, booking terms, delivery, servicing, and pickup.';
          if (!node.name.endsWith(' Inquiries')) node.name += ' Inquiries';
          delete node.hasOfferCatalog;
        }
        return `<script type="application/ld+json">${escapeLd(json)}</script>`;
      });
      writeFileSync(path, html);
    }
  }
}
walk(root);
console.log('Synced shared navigation, business disclosures, and referral schema.');
