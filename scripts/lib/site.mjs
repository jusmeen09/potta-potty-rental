export const siteUrl = 'https://starportablerestrooms.com';
export const phoneDisplay = '+1 (833) 920-1299';
export const phoneHref = '+18339201299';
export const email = 'hello@starportablerestrooms.com';
export const hoursShort = 'Mon–Sat 7am–7pm · Sun 7am–12pm CST';
export const hoursFull = 'Mon–Sat 7:00 AM–7:00 PM CST · Sun 7:00 AM–12:00 PM CST';
export const disclaimerText = 'Star Portable Restrooms is a rental inquiry service. Requests may be passed or sold to local rental providers. Providers confirm coverage, equipment, prices, and rental terms. Photos are representative; state listings are not staffed offices.';

export const services = [
  { slug: 'standard-porta-potty-rental', shortName: 'Standard Porta Potty', name: 'Standard Porta Potty Rental', image: '/assets/homepage/standard-restroom.webp' },
  { slug: 'ada-portable-toilet-rental', shortName: 'ADA Portable Toilet', name: 'ADA Portable Toilet Rental', image: '/assets/homepage/ada-restroom.webp' },
  { slug: 'restroom-trailer-rental', shortName: 'Restroom Trailer', name: 'Restroom Trailer Rental', image: '/assets/homepage/restroom-trailer.webp' },
  { slug: 'portable-handwashing-station-rental', shortName: 'Handwashing Station', name: 'Portable Handwashing Station Rental', image: '/assets/homepage/handwash-station.webp' },
];

export const organization = {
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'Star Portable Restrooms',
  description: 'Portable restroom rental inquiry and referral service. Local providers confirm equipment, availability, pricing, and rental terms.',
  url: `${siteUrl}/`,
  logo: `${siteUrl}/assets/logo-mark.png`,
  areaServed: { '@type': 'Country', name: 'United States' },
  knowsAbout: ['Portable toilet rental', 'Restroom trailer rental', 'Handwashing station rental', 'Construction site sanitation', 'Event restroom planning'],
  // No address or LocalBusiness type: the business has no public location. Add
  // sameAs here only once real profiles exist.
  telephone: phoneHref,
  email,
  contactPoint: {
    '@type': 'ContactPoint', telephone: phoneHref, contactType: 'rental inquiries',
    areaServed: 'US', availableLanguage: 'English',
    hoursAvailable: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '07:00', closes: '19:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '07:00', closes: '12:00' },
    ],
  },
};

export const website = {
  '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: 'Star Portable Restrooms',
  publisher: { '@id': `${siteUrl}/#organization` }, inLanguage: 'en-US',
};

export const icons = `  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#c92536" />`;

export const clarity = `<script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","y3adfg123t");</script>`;

const navItems = [
  ['/service/', 'Services'],
  ['/location/', 'Locations'],
  ['/blog/', 'Guides'],
  ['/about/', 'About'],
  ['/contact/', 'Contact'],
];

export const phoneIcon = '<svg class="icon-phone" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8z"/></svg>';

export const deskHours = 'Mon–Sat 7am–7pm, Sun 7am–12pm Central';

/** @param active one of the nav hrefs, marks that link as current */
export const header = (active = '') => `
  <a class="skip-link" href="#main">Skip to main content</a>
  <header class="site-header"><div class="hdr"><a class="hdr-brand" href="/"><img src="/assets/logo-mark.png" alt="" width="40" height="40" /><span>Star Portable Restrooms</span></a><nav class="hdr-nav" aria-label="Primary navigation">${navItems.map(([href, label]) => `<a${href === active ? ' aria-current="page"' : ''} href="${href}">${label}</a>`).join('')}</nav><a class="header-phone" href="tel:${phoneHref}">${phoneIcon}<span><small>Rental desk</small><strong>${phoneDisplay}</strong></span></a><button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle><span></span></button></div></header>
  <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation" data-mobile-menu>${navItems.map(([href, label]) => `<a${href === active ? ' aria-current="page"' : ''} href="${href}">${label}</a>`).join('')}<a class="mobile-menu-call" href="tel:${phoneHref}">${phoneIcon}<span>Call ${phoneDisplay}</span></a><p class="mobile-menu-hours">${deskHours}</p></nav>`;

export const footer = `
  <footer class="footer"><div class="ftr"><div class="ftr-desk"><a class="ftr-brand" href="/"><img src="/assets/logo-mark.png" alt="" width="40" height="40" /><span>Star Portable Restrooms</span></a><p class="ftr-desk__label">Rental desk</p><a class="ftr-desk__phone" href="tel:${phoneHref}">${phoneDisplay}</a><p class="ftr-desk__hours">${deskHours}</p><a class="ftr-desk__mail" href="mailto:${email}">${email}</a></div><nav class="ftr-col" aria-label="Rentals"><h2 class="footer-heading">Rentals</h2><a href="/service/">All services</a>${services.map((item) => `<a href="/service/${item.slug}/">${item.shortName}</a>`).join('')}</nav><nav class="ftr-col" aria-label="Planning tools"><h2 class="footer-heading">Planning tools</h2><a href="/blog/porta-potty-cost-per-day/">Cost per day</a><a href="/blog/porta-potty-cost-per-month/">Cost per month</a><a href="/blog/porta-potty-ratio-guide/">How many do I need?</a></nav><nav class="ftr-col" aria-label="Company"><h2 class="footer-heading">Company</h2><a href="/">Home</a><a href="/about/">About</a><a href="/blog/">Guides</a><a href="/location/">Locations</a><a href="/contact/">Contact</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></nav></div><div class="ftr-bottom"><span>© <span data-current-year></span> starportablerestrooms.com</span><span>Vendor coverage confirmed by ZIP code.</span></div><div class="footer-disclaimer"><p>${disclaimerText}</p></div><aside class="cat-mini" data-cat-mini aria-label="Call sheet summary" hidden><a class="cat-mini__sheet" href="/#call-sheet" data-mini-link><span data-mini-text>Call sheet</span></a><a class="cat-mini__call" href="tel:${phoneHref}" data-cta-location="mini_sheet">${phoneIcon}Call</a></aside></footer>
  <a class="mobile-call" href="tel:${phoneHref}">${phoneIcon}<span class="mobile-call-copy"><small>Rental desk</small><strong>${phoneDisplay}</strong></span><span class="mobile-call-action" aria-hidden="true">Call now</span></a>`;

export const escapeLd = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');
