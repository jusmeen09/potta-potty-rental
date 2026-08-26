import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { siteUrl, phoneDisplay, phoneHref, organization, website, icons, clarity, header, footer, escapeLd } from './lib/site.mjs';

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
      ['How much does a standard porta potty rental cost?', 'Pricing depends on delivery ZIP code, quantity, rental length, service frequency, site access, and current inventory. Call with the site details for accurate availability and pricing.'],
      ['How often is a standard portable toilet serviced?', 'Service frequency is planned around the number of users, rental duration, and site conditions. Recurring rentals may include pumping, cleaning, deodorizing, and supply restocking.'],
      ['How many standard porta potties do I need?', 'The right quantity depends on attendance or crew size, hours of use, food and alcohol service, rental duration, and whether units can be serviced during the rental.'],
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
      ['How many ADA portable toilets should an event have?', 'Requirements can vary by event, venue, attendance, and local rules. Discuss the complete restroom count and accessibility plan with the venue or authority having jurisdiction.'],
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
    title: 'Restroom Trailer Rental | Star Portable Restrooms',
    description: 'Call for portable restroom trailer rental availability and pricing for weddings, corporate events, VIP areas, and longer-term temporary facilities.',
    lead: 'An upgraded portable bathroom experience for weddings, corporate gatherings, VIP areas, productions, and sites where added comfort matters.',
    ideal: 'Restroom trailers provide a more finished interior and may include climate control, lighting, sinks, mirrors, and separate restroom stalls depending on the model.',
    features: ['Finished interior surfaces', 'Flushing toilets', 'Running-water sinks', 'Interior lighting', 'Climate control where equipped', 'Multiple station layouts'],
    uses: ['Weddings', 'Corporate events', 'Film and production sites', 'VIP and hospitality areas'],
    planning: ['Level trailer pad', 'Power requirements', 'Water and waste setup', 'Truck and towing access'],
    faqs: [
      ['How much does a restroom trailer rental cost?', 'Pricing depends on trailer size, rental dates, delivery distance, utilities, service requirements, site access, and current inventory. Call for a project-specific quote.'],
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
  const related = services.filter((item) => item.slug !== service.slug);
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
      { '@type': 'FAQPage', '@id': `${canonical}#faq`, mainEntity: service.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
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
  <link rel="preload" as="image" href="${service.image}" fetchpriority="high" />
  <link rel="stylesheet" href="/styles.css" />
  ${clarity}
  <script type="application/ld+json">${escapeLd(schema)}</script>
</head>
<body class="service-page" data-service="${service.slug}">
${header('/service/')}
<main>
  <section class="service-hero">
    <div class="container service-hero-grid">
      <div class="service-hero-copy">
        <div class="breadcrumb service-breadcrumb"><a href="/">Home</a><span>/</span><a href="/service/">Rental services</a><span>/</span><span>${service.shortName}</span></div>
        <span class="eyebrow eyebrow-light">${service.kicker}</span>
        <h1>${service.name}</h1>
        <p>${service.lead}</p>
        <div class="service-hero-actions"><a class="btn btn-call" href="tel:${phoneHref}">☎ Call ${phoneDisplay}</a><a class="btn btn-location-secondary" href="#details">See rental details</a></div>
        <div class="service-hero-proof"><span>✓ Availability by ZIP</span><span>✓ Flexible rental periods</span><span>✓ Delivery and pickup coordination</span></div>
      </div>
      <figure class="service-hero-visual"><img src="${service.image}" alt="${service.alt}" fetchpriority="high" /><figcaption><span>Call-first rental help</span><strong>Get availability and pricing for your delivery address.</strong><a href="tel:${phoneHref}">${phoneDisplay} →</a></figcaption></figure>
    </div>
  </section>

  <section class="service-facts" aria-label="Rental planning essentials"><div class="container service-facts-grid">${service.planning.map((item, index) => `<div><span>0${index + 1}</span><strong>${item}</strong><small>${['Confirms the service route', 'Checks current scheduling', 'Helps estimate quantity', 'Plans safe delivery and service'][index]}</small></div>`).join('')}</div></section>

  <section class="section service-intro" id="details"><div class="container service-intro-grid"><div><span class="eyebrow">Designed for practical rental needs</span><h2>When ${service.shortName.toLowerCase()} makes sense</h2><p>${service.ideal}</p><p>Share the delivery address, dates, expected usage, and site conditions. The rental desk can then discuss quantity, servicing, placement, and current pricing.</p><a class="text-link" href="tel:${phoneHref}">Discuss your rental by phone <span class="arrow">→</span></a></div><aside class="service-check-card"><span class="service-card-label">Common equipment features</span><h3>What to expect</h3><ul>${service.features.map((item) => `<li><span>✓</span>${item}</li>`).join('')}</ul><small>Exact models and features vary by market and inventory.</small></aside></div></section>

  <section class="section surface"><div class="container"><div class="section-heading center"><span class="eyebrow">Where it works</span><h2>Rental support for sites, events, and temporary facilities</h2><p>Choose equipment around the people using it, the length of the rental, site conditions, and the service access available.</p></div><div class="service-use-grid">${service.uses.map((item, index) => `<article><span>0${index + 1}</span><h3>${item}</h3><p>${['Plan quantities and servicing around daily use and project duration.', 'Coordinate delivery, placement, and pickup around the event schedule.', 'Keep units accessible without disrupting normal site circulation.', 'Match rental length and equipment to changing temporary needs.'][index]}</p></article>`).join('')}</div><div class="call-cta"><span class="call-cta-mark" aria-hidden="true">☎</span><div class="call-cta-copy"><small>Need a recommendation?</small><strong>Call with your ZIP code, dates, and expected usage.</strong><span>We’ll help you compare quantities, servicing, placement, and availability.</span></div><a class="call-cta-phone" href="tel:${phoneHref}"><span class="call-cta-phone-icon" aria-hidden="true">☎</span><span><small>Call the rental desk</small><strong>${phoneDisplay}</strong></span></a></div></div></section>

  <section class="section service-process"><div class="container service-process-grid"><div><span class="eyebrow">Simple call-first process</span><h2>From availability check to final pickup</h2><p>One focused phone call gives the rental team the information needed to build a practical service plan.</p></div><ol><li><span>01</span><div><h3>Share the site details</h3><p>Provide the ZIP code, dates, expected usage, surface, gate, and truck-access information.</p></div></li><li><span>02</span><div><h3>Confirm equipment and service</h3><p>Review availability, quantity, delivery timing, servicing frequency, and project-specific pricing.</p></div></li><li><span>03</span><div><h3>Coordinate delivery and pickup</h3><p>Keep the placement area accessible and notify the team if site conditions or timing change.</p></div></li></ol></div></section>

  <section class="section surface"><div class="container faq-wrap"><div><span class="eyebrow">Rental questions</span><h2>${service.name} FAQs</h2><p>Clear answers for planning quantities, placement, service, delivery, and pricing.</p><a class="btn btn-call" href="tel:${phoneHref}">☎ Call ${phoneDisplay}</a></div><div class="faq-list">${service.faqs.map(([question, answer], index) => `<article class="faq-item${index === 0 ? ' open' : ''}" data-faq-item><button class="faq-question" type="button" aria-expanded="${index === 0}" data-faq-button>${question}<span class="faq-plus">+</span></button><div class="faq-answer"><div><p>${answer}</p></div></div></article>`).join('')}</div></div></section>

  <section class="section service-related"><div class="container"><div class="section-heading"><span class="eyebrow">Compare rental options</span><h2>Related portable sanitation rentals</h2><p>Build a complete setup with the unit types, accessibility, comfort, and hygiene support your site needs.</p></div><div class="service-related-grid">${related.map((item) => `<a href="/service/${item.slug}/"><img src="${item.image}" alt="" loading="lazy" /><span>${item.kicker}</span><h3>${item.shortName}</h3><strong>View rental details →</strong></a>`).join('')}</div></div></section>

  <section class="section-sm"><div class="container cta-panel service-final-cta" style="--cta-image: url('${service.image}');"><div class="cta-panel-inner"><div><h2>Check ${service.shortName.toLowerCase()} availability</h2><p>Call with your delivery ZIP code, dates, project type, and estimated attendance or crew size.</p></div><a class="btn btn-white cta-phone" href="tel:${phoneHref}"><span>Call the rental desk</span><strong>${phoneDisplay}</strong></a></div></div></section>
</main>
${footer}
<script type="module" src="/script.js"></script>
</body></html>`;
};

// Hub page for /service/. Without this the host's catch-all served the homepage
// at this URL — an unstyled soft 404 that the Services nav item pointed past.
const renderHub = () => {
  const canonical = `${siteUrl}/service/`;
  const title = 'Rental Services | Star Portable Restrooms';
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
<main>
  <section class="page-hero service-hub-hero">
    <div class="container page-hero-inner">
      <div class="breadcrumb"><a href="/">Home</a><span>/</span><span>Rental services</span></div>
      <span class="eyebrow eyebrow-light">Rental services</span>
      <h1>Portable restroom rental services</h1>
      <p>Four rental categories covering job sites, events, accessibility requirements, and hygiene support. Availability and pricing are confirmed by delivery ZIP code.</p>
      <div class="page-hero-actions"><a class="btn btn-call" href="tel:${phoneHref}">☎ Call ${phoneDisplay}</a><a class="btn btn-outline" href="#all-services">Compare options</a></div>
      <div class="page-hero-proof"><span>✓ Availability by ZIP</span><span>✓ Flexible rental periods</span><span>✓ Delivery and pickup coordination</span></div>
    </div>
  </section>

  <section class="section" id="all-services">
    <div class="container">
      <div class="section-heading"><span class="eyebrow">Choose a rental</span><h2>Compare rental options</h2><p>Most sites use a mix. Pick per zone based on who uses the area, how long they are there, and what the site can support.</p></div>
      <div class="service-hub-grid">
        ${services.map((item) => `<article class="service-hub-card"><img src="${item.image}" alt="${item.alt}" loading="lazy" width="600" height="400" /><div><span class="eyebrow">${item.kicker}</span><h3><a href="/service/${item.slug}/">${item.name}</a></h3><p>${item.lead}</p><ul>${item.features.slice(0, 3).map((f) => `<li>${f}</li>`).join('')}</ul><a class="text-link" href="/service/${item.slug}/">View rental details <span class="arrow">→</span></a></div></article>`).join('')}
      </div>
    </div>
  </section>

  <section class="section surface">
    <div class="container">
      <div class="section-heading center"><span class="eyebrow">Plan before you call</span><h2>Guides that help you size a rental</h2><p>Work out unit counts, budget, and placement before booking.</p></div>
      <div class="service-hub-guides">
        <a href="/blog/porta-potty-ratio-guide/"><span>Planning</span><h3>How many units do you need?</h3><strong>Read the guide →</strong></a>
        <a href="/blog/portable-toilet-rental-checklist/"><span>Planning</span><h3>Rental planning checklist</h3><strong>Read the guide →</strong></a>
        <a href="/location/"><span>Coverage</span><h3>Rental availability by state</h3><strong>Browse locations →</strong></a>
      </div>
    </div>
  </section>

  <section class="section-sm"><div class="container cta-panel" style="--cta-image: url('/assets/homepage/final-cta.webp');"><div class="cta-panel-inner"><div><h2>Check availability for your site</h2><p>Call with your delivery ZIP code, dates, project type, and estimated attendance or crew size.</p></div><a class="btn btn-white cta-phone" href="tel:${phoneHref}"><span>Call the rental desk</span><strong>${phoneDisplay}</strong></a></div></div></section>
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
