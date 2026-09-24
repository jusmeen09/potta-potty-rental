import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { siteUrl, phoneDisplay, phoneHref, icons, header, footer } from './lib/site.mjs';

const root = resolve(import.meta.dirname, '..');

// Cloudflare Pages serves /404.html with a real 404 status for unmatched routes.
// Without it the catch-all returned 200 and the homepage markup at every bad URL.
const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="That page could not be found. Browse portable restroom rental services, planning guides, or call the rental desk for availability." />
  <meta name="robots" content="noindex, follow" />
  <title>Page Not Found | Star Portable Restrooms</title>
  ${icons}
  <link rel="stylesheet" href="/styles.css" />
</head>
<body class="error-page">
${header()}
<main id="main">
  <section class="page-hero">
    <div class="container page-hero-inner">
      <span class="eyebrow eyebrow-light">Error 404</span>
      <h1>We could not find that page.</h1>
      <p>The link may be out of date or mistyped. The rental desk is still one call away, and the pages below cover most of what people are looking for.</p>
      <div class="page-hero-actions"><a class="btn btn-call" href="tel:${phoneHref}">☎ Call ${phoneDisplay}</a><a class="btn btn-outline" href="/">Back to home</a></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-heading center"><span class="eyebrow">Popular pages</span><h2>Try one of these instead</h2></div>
      <div class="service-hub-guides">
        <a href="/service/"><span>Rentals</span><h3>All rental services</h3><strong>Compare options →</strong></a>
        <a href="/location/"><span>Coverage</span><h3>Availability by state</h3><strong>Browse locations →</strong></a>
        <a href="/blog/"><span>Guides</span><h3>Rental planning guides</h3><strong>Read the guides →</strong></a>
        <a href="/contact/"><span>Contact</span><h3>Talk to the rental desk</h3><strong>Get in touch →</strong></a>
      </div>
    </div>
  </section>
</main>
${footer}
<script type="module" src="/script.js"></script>
</body></html>`;

writeFileSync(resolve(root, '404.html'), page);
console.log('Generated 404 page.');
