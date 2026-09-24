import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { siteUrl, phoneDisplay, phoneHref, organization, website, icons, clarity, header, footer, escapeLd } from './lib/site.mjs';
import { posts } from './lib/blog-posts.mjs';

const root = resolve(import.meta.dirname, '..');

const authorName = 'Star Portable Restrooms Rental Desk';
const authorBio = 'Written by the rental coordinators who quote, schedule, and service portable restroom orders across the United States every day. Guidance here reflects routine delivery, placement, and servicing work rather than a single project.';

const formatDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

/**
 * Wraps the first occurrence of each planned anchor phrase in a contextual link.
 * Throws when an anchor is missing so a copy edit can never silently drop a link,
 * and refuses duplicate targets so no post links the same URL twice.
 */
const applyLinks = (post) => {
  const pending = post.links.map((link) => ({ ...link, done: false }));
  const seen = new Set();
  for (const link of pending) {
    if (seen.has(link.href)) throw new Error(`${post.slug}: duplicate link target ${link.href}`);
    seen.add(link.href);
    if (link.anchor.trim().split(/\s+/).length > 2) throw new Error(`${post.slug}: anchor "${link.anchor}" exceeds 2 words`);
  }
  const linkParagraph = (text) => {
    for (const link of pending) {
      if (link.done) continue;
      const index = text.indexOf(link.anchor);
      if (index === -1) continue;
      link.done = true;
      return `${text.slice(0, index)}<a href="${link.href}">${link.anchor}</a>${text.slice(index + link.anchor.length)}`;
    }
    return text;
  };
  const sections = post.sections.map((section) => ({
    ...section,
    body: section.body.map(linkParagraph),
    subs: section.subs ? section.subs.map((sub) => ({ ...sub, body: sub.body.map(linkParagraph) })) : undefined,
    after: section.after ? section.after.map(linkParagraph) : undefined,
  }));
  const missing = pending.filter((link) => !link.done);
  if (missing.length) throw new Error(`${post.slug}: anchor text not found in body -> ${missing.map((m) => `"${m.anchor}"`).join(', ')}`);
  return sections;
};

const renderSection = (section, id) => {
  const table = section.table ? `<figure class="post-table-wrap"><table class="post-table"><caption>${section.table.caption}</caption><thead><tr>${section.table.head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${section.table.rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`)).join('')}</tr>`).join('')}</tbody></table></figure>` : '';
  const after = section.after ? section.after.map((p) => `<p>${p}</p>`).join('') : '';
  const subs = section.subs
    ? section.subs.map((sub) => `<h3>${sub.h3}</h3>${sub.body.map((p) => `<p>${p}</p>`).join('')}`).join('')
    : '';
  return `<section class="post-section" id="${id}"><h2>${section.h2}</h2>${section.body.map((p) => `<p>${p}</p>`).join('')}${table}${subs}${after}</section>`;
};

const renderPost = (post, all) => {
  const canonical = `${siteUrl}/blog/${post.slug}/`;
  const sections = applyLinks(post);
  const slugId = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const ids = sections.map((s) => slugId(s.h2));
  // Related guides follow the same forward-only ordering used for in-body links.
  const related = all.filter((p) => p.order > post.order).slice(0, 2);
  const wordCount = sections.flatMap((s) => [...s.body, ...(s.after || [])]).join(' ').split(/\s+/).length;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      website,
      {
        '@type': 'BlogPosting',
        '@id': `${canonical}#article`,
        headline: post.title,
        description: post.description,
        image: `${siteUrl}${post.image}`,
        datePublished: post.published,
        dateModified: post.updated,
        author: { '@id': `${siteUrl}/#organization` },
        publisher: { '@id': `${siteUrl}/#organization` },
        mainEntityOfPage: { '@id': `${canonical}#webpage` },
        articleSection: post.category,
        wordCount,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${siteUrl}/blog/#blog` },
      },
      {
        '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: post.metaTitle,
        description: post.description, isPartOf: { '@id': `${siteUrl}/#website` },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
        primaryImageOfPage: `${siteUrl}${post.image}`,
        datePublished: post.published, dateModified: post.updated, inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`, itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog/` },
          { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
        ],
      },
      {
        '@type': 'FAQPage', '@id': `${canonical}#faq`,
        mainEntity: post.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
      },
    ],
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${post.description}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" /><meta property="og:site_name" content="Star Portable Restrooms" /><meta property="og:title" content="${post.metaTitle}" /><meta property="og:description" content="${post.description}" /><meta property="og:url" content="${canonical}" /><meta property="og:image" content="${siteUrl}${post.image}" />
  <meta property="article:published_time" content="${post.published}" /><meta property="article:modified_time" content="${post.updated}" /><meta property="article:section" content="${post.category}" />
  <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${post.metaTitle}" /><meta name="twitter:description" content="${post.description}" /><meta name="twitter:image" content="${siteUrl}${post.image}" />
  <title>${post.metaTitle}</title>
  ${icons}
  <link rel="preload" as="image" href="${post.image}" fetchpriority="high" />
  <link rel="stylesheet" href="/styles.css" />
  ${clarity}
  <script type="application/ld+json">${escapeLd(schema)}</script>
</head>
<body class="post-page">
${header('/blog/')}
<main id="main">
  <article class="post" itemscope itemtype="https://schema.org/BlogPosting">
    <header class="post-hero">
      <div class="container post-hero-inner">
        <div class="breadcrumb"><a href="/">Home</a><span>/</span><a href="/blog/">Blog</a><span>/</span><span>${post.category}</span></div>
        <span class="eyebrow">${post.category}</span>
        <h1 itemprop="headline">${post.title}</h1>
        <p class="post-dek">${post.dek}</p>
        <div class="post-byline">
          <img class="post-byline-mark" src="/assets/logo-mark.png" alt="" width="44" height="44" loading="lazy" />
          <div>
            <strong>${authorName}</strong>
            <small>Published <time datetime="${post.published}">${formatDate(post.published)}</time> · Updated <time datetime="${post.updated}">${formatDate(post.updated)}</time> · ${post.readTime} min read</small>
          </div>
        </div>
      </div>
    </header>

    <figure class="post-figure"><div class="container"><img src="${post.image}" alt="${post.alt}" fetchpriority="high" width="1200" height="675" /></div></figure>

    <div class="container post-layout">
      <div class="post-body">
        <aside class="post-takeaways" aria-label="Key takeaways">
          <h2>Key takeaways</h2>
          <ul>${post.takeaways.map((t) => `<li>${t}</li>`).join('')}</ul>
        </aside>

        <nav class="post-toc" aria-label="On this page">
          <h2>On this page</h2>
          <ol>${sections.map((s, i) => `<li><a href="#${ids[i]}">${s.h2}</a></li>`).join('')}</ol>
        </nav>

        ${sections.map((s, i) => renderSection(s, ids[i])).join('\n        ')}

        <section class="post-section" id="faqs">
          <h2>Frequently asked questions</h2>
          <div class="faq-list">${post.faqs.map(([q, a], i) => `<article class="faq-item${i === 0 ? ' open' : ''}" data-faq-item><button class="faq-question" type="button" aria-expanded="${i === 0}" data-faq-button>${q}<span class="faq-plus">+</span></button><div class="faq-answer"><div><p>${a}</p></div></div></article>`).join('')}</div>
        </section>

        ${post.sources.length ? `<section class="post-sources" aria-label="Sources and references">
          <h2>Sources</h2>
          <ul>${post.sources.map(([label, href]) => `<li><a href="${href}" target="_blank" rel="noopener">${label}</a></li>`).join('')}</ul>
          <small>Regulations change and local requirements vary. Confirm current requirements with the authority having jurisdiction for your site.</small>
        </section>` : ''}

        <section class="post-author" aria-label="About the author">
          <img src="/assets/logo-mark.png" alt="" width="64" height="64" loading="lazy" />
          <div>
            <span class="eyebrow">About the author</span>
            <h2>${authorName}</h2>
            <p>${authorBio}</p>
            <p class="post-author-meta">Reviewed for accuracy on <time datetime="${post.updated}">${formatDate(post.updated)}</time>. This guide is general planning information, not legal or compliance advice.</p>
            <a class="text-link" href="/about/">About Star <span class="arrow">→</span></a>
          </div>
        </section>
      </div>

      <aside class="post-aside">
        <div class="post-cta-card">
          <span class="eyebrow eyebrow-light">Rental desk · 7 days a week</span>
          <h2>Planning a rental?</h2>
          <p>Call with your delivery ZIP code, dates, and expected crew size or attendance.</p>
          <a class="btn btn-call" href="tel:${phoneHref}">☎ Call ${phoneDisplay}</a>
        </div>
      </aside>
    </div>

    ${related.length ? `<section class="section post-related"><div class="container"><div class="section-heading"><span class="eyebrow">Keep planning</span><h2>Related guides</h2></div><div class="post-related-grid">${related.map((r) => `<a href="/blog/${r.slug}/"><img src="${r.image}" alt="" loading="lazy" width="600" height="338" /><span>${r.category}</span><h3>${r.title}</h3><strong>Read the guide →</strong></a>`).join('')}</div></div></section>` : ''}

    <section class="section-sm"><div class="container cta-panel" style="--cta-image: url('${post.image}');"><div class="cta-panel-inner"><div><h2>Check availability for your site</h2><p>Call with your delivery ZIP code, dates, project type, and estimated attendance or crew size.</p></div><a class="btn btn-white cta-phone" href="tel:${phoneHref}"><span>Call the rental desk</span><strong>${phoneDisplay}</strong></a></div></div></section>
  </article>
</main>
${footer}
<script type="module" src="/script.js"></script>
</body></html>`;
};

mkdirSync(resolve(root, 'blog'), { recursive: true });
for (const post of posts) {
  const directory = resolve(root, 'blog', post.slug);
  mkdirSync(directory, { recursive: true });
  writeFileSync(resolve(directory, 'index.html'), renderPost(post, posts));
}

console.log(`Generated ${posts.length} blog post pages.`);
