import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { siteUrl, phoneDisplay, phoneHref, organization, website, icons, clarity, header, footer, escapeLd } from './lib/site.mjs';
import { unitBySlug, units, pageHead, unitFigure, unitLabel, unitStrip, callSheet, callButton, sheetLink, ctaNote } from './lib/catalogue.mjs';

import { serviceGuidance } from './lib/rental-guidance.mjs';
import { posts } from './lib/blog-posts.mjs';
import { trailerTable, priceSummary, sourceList, pricesChecked } from './lib/price-data.mjs';

const root = resolve(import.meta.dirname, '..');

const services = [
  {
    slug: 'standard-porta-potty-rental',
    name: 'Standard Porta Potty Rental',
    shortName: 'Standard Porta Potty',
    kicker: 'Most requested rental',
    image: '/assets/homepage/standard-restroom.webp',
    alt: 'Standard portable restroom ready for rental delivery',
    title: 'Standard Porta Potty Rental | Star Portable Restrooms',
    description: 'Call for standard porta potty rental availability, delivery, servicing, and pricing for construction sites, events, parks, and temporary projects.',
    lead: 'A practical, durable portable toilet for construction crews, outdoor events, public spaces, home projects, and temporary facilities.',
    ideal: 'Standard units are the dependable choice when you need straightforward sanitation, flexible quantities, and a service schedule matched to real usage.',
    features: ['Ventilated interior', 'Secure self-closing door', 'Toilet paper dispenser', 'Non-slip floor surface', 'Urinal where available', 'Scheduled cleaning options'],
    uses: ['Construction sites', 'Festivals and fairs', 'Parks and sports fields', 'Residential projects'],
    planning: ['Delivery ZIP code', 'Rental dates', 'Expected crew or attendance', 'Placement and truck access'],
    faqs: [
      ['How much does a standard porta potty rental cost?', 'Pricing depends on delivery ZIP code, quantity, rental length, service frequency, site access, and current inventory. Compare <a href="/blog/porta-potty-cost-per-day/">published one-day prices</a>, then call with the site details for accurate availability and pricing.'],
      ['How often is a standard portable toilet serviced?', 'Service frequency is planned around the number of users, rental duration, and site conditions. Recurring rentals may include pumping, cleaning, deodorizing, and supply restocking.'],
      ['How many standard porta potties do I need?', 'The right quantity depends on attendance or crew size, hours of use, food and alcohol service, rental duration, and whether units can be serviced during the rental. Use the <a href="/blog/porta-potty-ratio-guide/">porta potty calculator</a> for a starting count.'],
      ['Where should portable toilets be placed?', 'Choose level, stable ground with safe guest access and a clear route for the delivery and service truck. Avoid blocked gates, soft ground, steep slopes, and areas prone to standing water.'],
      ['Can I rent a porta potty for one day?', 'Short-term and event rentals may be available by location and date. Call with the delivery ZIP code and schedule to confirm inventory and delivery timing.'],
    ],
  },
  {
    slug: 'ada-portable-toilet-rental',
    name: 'ADA Portable Toilet Rental',
    shortName: 'ADA Portable Toilet',
    kicker: 'Accessible rental option',
    image: '/assets/homepage/ada-restroom.webp',
    // The stock photo doesn't visibly show accessibility-specific features (wide
    // door, ramp), so the alt text describes what's actually in frame rather than
    // asserting compliance the image can't support.
    alt: 'Portable restroom unit staged for delivery at a service yard',
    title: 'ADA Portable Toilet Rental | Star Portable Restrooms',
    description: 'Call for ADA portable toilet rental availability, accessible unit planning, delivery, and pricing for events, public sites, and job locations.',
    lead: 'A spacious accessible portable restroom with ground-level entry, maneuvering room, and support features for a more inclusive sanitation plan.',
    ideal: 'Accessible units help event organizers, contractors, and public-site managers provide a practical restroom option for guests and workers with mobility needs.',
    features: ['Ground-level entry', 'Wider doorway', 'Spacious interior clearance', 'Interior handrails', 'Accessible door hardware', 'Stable, level placement planning'],
    uses: ['Public events', 'Construction projects', 'Community gatherings', 'Accessible venue plans'],
    planning: ['Accessible route', 'Level placement area', 'Delivery clearance', 'Required unit quantity'],
    faqs: [
      ['What makes an ADA portable toilet accessible?', 'Accessible portable restrooms typically provide ground-level entry, a wider doorway, more interior maneuvering space, support rails, and accessible door hardware. Available models can vary.'],
      ['How many ADA portable toilets should an event have?', 'Where portable toilets are clustered, the 2010 ADA Standards require at least 5%, and no fewer than one, to be accessible in each cluster. The calculator counts <a href="/blog/porta-potty-ratio-guide/">accessible units per restroom location</a>. Venue and local rules can add requirements, so confirm the plan with the authority having jurisdiction.'],
      ['Does an accessible unit need level ground?', 'Yes. A stable, level placement area and an accessible approach are important for safe entry and maneuvering. Share surface, slope, and route details before delivery.'],
      ['Can ADA portable restrooms be serviced during a long rental?', 'Recurring service may include pumping, cleaning, deodorizing, and restocking. Frequency depends on usage, rental duration, and local route availability.'],
      ['How do I check ADA unit availability near me?', 'Call with the delivery ZIP code, rental dates, event or project details, and required quantity. Inventory is confirmed for the exact address.'],
    ],
  },
  {
    slug: 'restroom-trailer-rental',
    name: 'Restroom Trailer Rental',
    shortName: 'Restroom Trailer',
    kicker: 'Upgraded guest comfort',
    image: '/assets/homepage/restroom-trailer.webp',
    alt: 'Portable restroom trailer prepared for an outdoor event',
    title: 'Restroom Trailer Rental Cost & Options | Star Portable Restrooms',
    description: `Restroom trailer rental cost: published prices run about ${priceSummary.trailerDay} per day and ${priceSummary.trailerWeekend} per weekend. Compare sources, utilities, and site needs.`,
    lead: 'An upgraded portable bathroom experience for weddings, corporate gatherings, VIP areas, productions, and sites where added comfort matters.',
    ideal: 'Restroom trailers provide a more finished interior and may include climate control, lighting, sinks, mirrors, and separate restroom stalls depending on the model. <a href="/blog/porta-potty-options-comparison/">Compare trailers with standard and ADA units</a> before choosing.',
    features: ['Finished interior surfaces', 'Flushing toilets', 'Running-water sinks', 'Interior lighting', 'Climate control where equipped', 'Multiple station layouts'],
    uses: ['Weddings', 'Corporate events', 'Film and production sites', 'VIP and hospitality areas'],
    planning: ['Level trailer pad', 'Power requirements', 'Water and waste setup', 'Truck and towing access'],
    price: {
      heading: 'Restroom trailer rental cost',
      intro: [`Published restroom trailer prices run from about ${priceSummary.trailerDay} per day and about ${priceSummary.trailerWeekend} for a weekend. The spread is wide because trailers range from compact units to large multi-stall models.`, 'Stall count, climate control, the number of days, delivery distance, and whether the vendor supplies water and power move the price most. These are third-party figures, not Star rates.'],
      table: trailerTable,
      sources: sourceList('fixr', 'royalFlush'),
    },
    faqs: [
      ['How much does a restroom trailer rental cost?', `Published prices run about ${priceSummary.trailerDay} per day in a Northeast vendor’s guide and about ${priceSummary.trailerWeekend} per weekend in Fixr’s national guide. Trailer size, dates, delivery distance, utilities, and service set the actual quote, which the vendor confirms.`],
      ['Do restroom trailers need power and water?', 'Many trailers require a dedicated electrical connection and water source or supplied water option. Requirements vary by model, so utilities must be confirmed before delivery.'],
      ['What ground conditions are needed for a restroom trailer?', 'A firm, level placement area with adequate towing, turning, setup, and service clearance is typically required. Share photos and access details when available.'],
      ['Are restroom trailers climate controlled?', 'Many models offer heating or air conditioning, but features vary. Ask which trailer layouts and comfort features are available for your ZIP code and date.'],
      ['How early should I reserve a restroom trailer?', 'Popular event dates and larger trailer sizes can book early. Call as soon as the venue, date, and approximate attendance are known.'],
    ],
  },
  {
    slug: 'portable-handwashing-station-rental',
    name: 'Portable Handwashing Station Rental',
    shortName: 'Handwashing Station',
    kicker: 'Hygiene-focused add-on',
    image: '/assets/homepage/handwash-station.webp',
    alt: 'Portable handwashing station ready for outdoor use',
    title: 'Handwashing Station Rental | Star Portable Restrooms',
    description: 'Call for portable handwashing station rental availability and pricing for construction sites, food service areas, festivals, and outdoor events.',
    lead: 'A self-contained handwashing solution for job sites, food areas, events, temporary facilities, and locations without convenient sink access.',
    ideal: 'Portable sinks support better hygiene by placing fresh water, soap, and hands-free washing closer to portable toilets and high-use activity areas.',
    features: ['Fresh-water reservoir', 'Wastewater containment', 'Soap dispensers', 'Hands-free foot pumps', 'Multiple wash basins', 'Restocking and service options'],
    uses: ['Food service areas', 'Construction sites', 'Festivals and markets', 'Schools and community events'],
    planning: ['User volume', 'Placement near activity', 'Service frequency', 'Paired restroom quantity'],
    faqs: [
      ['How does a portable handwashing station work?', 'Most self-contained stations use foot pumps to move fresh water from an onboard tank to the basins, while used water drains into a separate wastewater tank.'],
      ['Do portable handwashing stations require plumbing?', 'Self-contained models generally do not require a direct plumbing connection. Available equipment and setup requirements may vary by market.'],
      ['How many handwashing stations do I need?', 'Quantity depends on attendance or crew size, food service, event duration, restroom count, and expected usage. Call for a practical recommendation.'],
      ['Are soap and paper towels included?', 'Stations may be delivered with soap and paper-towel supplies, with restocking available for recurring service. Confirm included supplies when ordering.'],
      ['Can handwashing stations be rented without portable toilets?', 'Standalone rentals may be available depending on the location, date, quantity, and route. Call with the delivery ZIP code to confirm.'],
    ],
  },
];

const renderPage = (service) => {
  const canonical = `${siteUrl}/service/${service.slug}/`;
  const unit = unitBySlug(service.slug);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      website,
      { '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: service.title, description: service.description, isPartOf: { '@id': `${siteUrl}/#website` }, about: { '@id': `${canonical}#service` }, breadcrumb: { '@id': `${canonical}#breadcrumb` }, mainEntity: [{ '@id': `${canonical}#service` }, { '@id': `${canonical}#faq` }], inLanguage: 'en-US' },
      { '@type': 'Service', '@id': `${canonical}#service`, name: service.name, serviceType: service.name, description: service.description, provider: { '@id': `${siteUrl}/#organization` }, areaServed: { '@type': 'Country', name: 'United States' } },
      { '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`, itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Rental Services', item: `${siteUrl}/service/` },
        { '@type': 'ListItem', position: 3, name: service.name, item: canonical },
      ] },
      { '@type': 'FAQPage', '@id': `${canonical}#faq`, mainEntity: service.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer.replace(/<[^>]+>/g, '') } })) },
    ],
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${service.description}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="website" /><meta property="og:site_name" content="Star Portable Restrooms" /><meta property="og:title" content="${service.title}" /><meta property="og:description" content="${service.description}" /><meta property="og:url" content="${canonical}" /><meta property="og:image" content="${siteUrl}${service.image}" />
  <meta name="twitter:card" content="summary_large_image" />
  <title>${service.title}</title>
  ${icons}
  ${unit.image ? `<link rel="preload" as="image" href="${unit.image.src}" imagesrcset="${unit.image.srcset}" imagesizes="${unit.wide ? '(max-width: 860px) 90vw, 40vw' : '(max-width: 860px) 52vw, 22vw'}" fetchpriority="high" />` : ''}
  <link rel="stylesheet" href="/styles.css" />
  ${clarity}
  <script type="application/ld+json">${escapeLd(schema)}</script>
</head>
<body class="service-page" data-service="${service.slug}">
${header('/service/')}
<main id="main" class="catalogue cat-page">
  ${pageHead({
    crumbs: [['/', 'Home'], ['/service/', 'Rental services'], ['', service.shortName]],
    title: service.name,
    lede: service.lead,
    actions: `${callButton(`Call for ${service.shortName.toLowerCase()} prices`, 'service_head', `Toll-free ${phoneDisplay}`)}${sheetLink()}${ctaNote()}`,
    aside: `${unitFigure(unit, unit.wide ? '(max-width: 860px) 90vw, 40vw' : '(max-width: 860px) 52vw, 22vw', true)}${unitLabel(unit, { level: 'h2', link: false })}`,
    extraClass: `cat-head--object${unit.wide ? ' is-wide' : ''}`,
  })}

  <section class="cat-section" aria-labelledby="before-title"><div class="cat-wrap"><h2 id="before-title">Before delivery</h2><dl class="cat-facts">${service.planning.map((item, index) => `<div><dt>${item}</dt><dd>${serviceGuidance[service.slug].planning[index]}.</dd></div>`).join('')}</dl></div></section>

  <section class="cat-section cat-section--surface" id="details"><div class="cat-wrap cat-split"><div><h2>When ${service.shortName} makes sense</h2><p>${service.ideal}</p><p>Star helps you make a rental inquiry to a local provider. The provider confirms the model, inventory, delivery, servicing, and final quote for your address.</p></div><div><h3 class="cat-subhead">Features to confirm</h3><ul class="cat-list cat-list--one">${service.features.map((item) => `<li>${item}</li>`).join('')}</ul><p class="cat-fine">Representative equipment only. Exact models, features, and inventory are confirmed by the vendor.</p></div></div></section>

  <section class="cat-section"><div class="cat-wrap"><h2>Rental support for sites, events, and temporary facilities</h2><p>Choose equipment around the people using it, the length of the rental, site conditions, and the service access available.</p><ul class="cat-list">${service.uses.map((item, index) => `<li><h3>${item}</h3><p>${serviceGuidance[service.slug].uses[index]}</p></li>`).join('')}</ul></div></section>

  ${service.price ? `<section class="cat-section" id="cost"><div class="cat-wrap"><div class="section-heading"><h2>${service.price.heading}</h2>${service.price.intro.map((p) => `<p>${p}</p>`).join('')}</div><div class="post-table-wrap"><table class="post-table"><caption>${service.price.table.caption}</caption><thead><tr>${service.price.table.head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${service.price.table.rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`)).join('')}</tr>`).join('')}</tbody></table></div><p class="service-price-sources">Sources, checked ${pricesChecked}: ${service.price.sources.map(([label, href]) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`).join(' · ')}. Your vendor confirms the actual price.</p></div></section>` : ''}

  <section class="cat-section cat-section--surface"><div class="cat-wrap"><div class="section-heading"><h2>Compare specifications and quote inclusions</h2><p>Request the specification sheet and written terms for the actual equipment proposed. Star does not own equipment or set vendor rental rates.</p></div><div class="post-table-wrap"><table class="post-table"><caption>Questions for your ${service.shortName} provider</caption><thead><tr><th scope="col">Detail</th><th scope="col">What to confirm</th></tr></thead><tbody>${serviceGuidance[service.slug].rows.map(([label, answer]) => `<tr><th scope="row">${label}</th><td>${answer}</td></tr>`).join('')}</tbody></table></div></div></section>

  <section class="cat-section"><div class="cat-wrap cat-split"><div><h2>Useful guides before requesting a quote</h2><p>Plan the count, the budget and the site before you call.</p></div><ul class="cat-links">${serviceGuidance[service.slug].guides.map(slug => { const post = posts.find(p => p.slug === slug); return `<li><a href="/blog/${slug}/"><span>${post.category}</span><strong>${post.title}</strong></a></li>`; }).join('')}</ul></div></section>

  <section class="cat-section cat-section--surface"><div class="cat-wrap cat-split"><div><h2>From availability check to final pickup</h2><p>Share the request with Star, then confirm the equipment, written quote, and service arrangements with the selected provider.</p></div><ol class="cat-steps"><li><h3>Share the site details</h3><p>Provide the ZIP code, dates, expected usage, surface, gate, and truck-access information.</p></li><li><h3>Confirm equipment and service</h3><p>Review availability, quantity, delivery timing, servicing frequency, and project-specific pricing.</p></li><li><h3>Coordinate delivery and pickup</h3><p>Keep the placement area accessible and notify the team if site conditions or timing change.</p></li></ol></div></section>

  <section class="cat-section" id="faq"><div class="cat-wrap cat-split"><div><h2>${service.name} FAQs</h2><p>Clear answers for planning quantities, placement, service, delivery, and pricing.</p></div><div class="faq-list">${service.faqs.map(([question, answer], index) => `<article class="faq-item${index === 0 ? ' open' : ''}" data-faq-item><button class="faq-question" type="button" aria-expanded="${index === 0}" data-faq-button>${question}<span class="faq-plus">+</span></button><div class="faq-answer"><div><p>${answer}</p></div></div></article>`).join('')}</div></div></section>

  ${unitStrip({ heading: 'Related portable sanitation rentals', intro: 'Build a complete setup with the unit types, accessibility, comfort, and hygiene support your site needs.', exclude: service.slug })}

  ${callSheet()}
</main>
${footer}
<script type="module" src="/script.js"></script>
</body></html>`;
};

// Hub page for /service/. Without this the host's catch-all served the homepage
// at this URL — an unstyled soft 404 that the Services nav item pointed past.
const renderHub = () => {
  const canonical = `${siteUrl}/service/`;
  const title = 'Portable Toilet Rental Services | Star Portable Restrooms';
  const description = 'Compare portable restroom rental services: standard porta potties, ADA-accessible units, restroom trailers, and handwashing stations. Call for availability.';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      website,
      { '@type': 'CollectionPage', '@id': `${canonical}#webpage`, url: canonical, name: title, description, isPartOf: { '@id': `${siteUrl}/#website` }, breadcrumb: { '@id': `${canonical}#breadcrumb` }, mainEntity: { '@id': `${canonical}#services` }, inLanguage: 'en-US' },
      { '@type': 'ItemList', '@id': `${canonical}#services`, name: 'Portable restroom rental services', numberOfItems: services.length, itemListElement: services.map((item, index) => ({ '@type': 'ListItem', position: index + 1, url: `${siteUrl}/service/${item.slug}/`, name: item.name })) },
      { '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`, itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Rental Services', item: canonical },
      ] },
    ],
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${description}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="website" /><meta property="og:site_name" content="Star Portable Restrooms" /><meta property="og:title" content="${title}" /><meta property="og:description" content="${description}" /><meta property="og:url" content="${canonical}" /><meta property="og:image" content="${siteUrl}/assets/homepage/cover.webp" />
  <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${title}" /><meta name="twitter:description" content="${description}" /><meta name="twitter:image" content="${siteUrl}/assets/homepage/cover.webp" />
  <title>${title}</title>
  ${icons}
  <link rel="stylesheet" href="/styles.css" />
  ${clarity}
  <script type="application/ld+json">${escapeLd(schema)}</script>
</head>
<body class="service-hub-page">
${header('/service/')}
<main id="main" class="catalogue cat-page">
  ${pageHead({
    crumbs: [['/', 'Home'], ['', 'Rental services']],
    title: 'Portable restroom rental services',
    lede: 'Four rental categories covering job sites, events, accessibility requirements, and hygiene support. Availability and pricing are confirmed by delivery ZIP code.',
    actions: `${callButton('Call the rental desk', 'hub_head', `Toll-free ${phoneDisplay}`)}${sheetLink()}${ctaNote()}`,
    extraClass: 'cat-head--text',
  })}

  <section class="cat-section" id="all-services" aria-labelledby="compare-title"><div class="cat-wrap"><h2 id="compare-title">Compare rental options</h2><p>Most sites use a mix. Pick per zone based on who uses the area, how long they are there, and what the site can support.</p><ul class="cat-hub">${units.map((unit) => `<li class="cat-hub__item${unit.wide ? ' is-wide' : ''}">${unitFigure(unit, '(max-width: 860px) 60vw, 22vw')}${unitLabel(unit, { level: 'h3' })}</li>`).join('')}</ul></div></section>

  <section class="cat-section cat-section--surface"><div class="cat-wrap cat-split"><div><h2>Guides that help you size a rental</h2><p>Work out unit counts, budget, and placement before booking.</p></div><ul class="cat-links"><li><a href="/blog/porta-potty-ratio-guide/"><span>Planning</span><strong>How many units do you need?</strong></a></li><li><a href="/blog/portable-toilet-rental-checklist/"><span>Planning</span><strong>Rental planning checklist</strong></a></li><li><a href="/location/"><span>Coverage</span><strong>Rental availability by state</strong></a></li></ul></div></section>

  ${callSheet()}
</main>
${footer}
<script type="module" src="/script.js"></script>
</body></html>`;
};

mkdirSync(resolve(root, 'service'), { recursive: true });
writeFileSync(resolve(root, 'service', 'index.html'), renderHub());
for (const service of services) {
  const directory = resolve(root, 'service', service.slug);
  mkdirSync(directory, { recursive: true });
  writeFileSync(resolve(directory, 'index.html'), renderPage(service));
}

console.log(`Generated service hub and ${services.length} service pages.`);
