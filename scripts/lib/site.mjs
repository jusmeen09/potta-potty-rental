export const siteUrl = 'https://starportablerestrooms.com';
export const phoneDisplay = '+1 (833) 920-1299';
export const phoneHref = '+18339201299';
export const email = 'hello@starportablerestrooms.com';

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
  url: `${siteUrl}/`,
  logo: `${siteUrl}/assets/logo-mark.png`,
  telephone: phoneHref,
  email,
  contactPoint: {
    '@type': 'ContactPoint', telephone: phoneHref, contactType: 'rentals and customer service',
    areaServed: 'US', availableLanguage: 'English',
  },
};

export const website = {
  '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: 'Star Portable Restrooms',
  publisher: { '@id': `${siteUrl}/#organization` }, inLanguage: 'en-US',
};

export const icons = `<link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" />
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#091426" />`;

export const clarity = `<script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","y3adfg123t");</script>`;

const navItems = [
  ['/', 'Home'],
  ['/about/', 'About'],
  ['/blog/', 'Blog'],
  ['/service/', 'Services'],
  ['/location/', 'Locations'],
  ['/contact/', 'Contact'],
];

/** @param active one of the nav hrefs, marks that link as current */
export const header = (active = '') => `
  <div class="topbar"><div class="container topbar-inner"><div class="topbar-items"><span>Mon–Sat · 7:00 AM–7:00 PM</span><span>Availability confirmed by delivery ZIP</span><a href="tel:${phoneHref}">Call ${phoneDisplay}</a></div><span>Clean units. Clear pricing. Reliable coordination.</span></div></div>
  <header class="site-header"><div class="container nav-inner"><a class="brand" href="/" aria-label="Star Portable Restrooms home"><img src="/assets/logo-mark.png" alt="" width="44" height="44" /><span class="brand-name">Star Portable <small>Restrooms</small></span></a><nav class="desktop-nav" aria-label="Primary navigation">${navItems.map(([href, label]) => `<a${href === active ? ' class="active" aria-current="page"' : ''} href="${href}">${label}</a>`).join('')}</nav><div class="nav-actions"><a class="header-phone" href="tel:${phoneHref}"><span class="header-phone-icon" aria-hidden="true">☎</span><span><small>Call Us Now</small>${phoneDisplay}</span></a><button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-menu-toggle><span></span></button></div></div></header>
  <nav class="mobile-menu" aria-label="Mobile navigation" data-mobile-menu>${navItems.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}<a class="btn btn-call mobile-menu-call" href="tel:${phoneHref}">☎ Call Us Now · ${phoneDisplay}</a></nav>`;

export const footer = `
  <footer class="footer"><div class="container footer-grid"><div class="footer-about"><a class="brand" href="/"><img src="/assets/logo-mark.png" alt="" width="44" height="44" /><span class="brand-name">Star Portable <small>Restrooms</small></span></a><p>Portable toilet, restroom trailer, and handwashing station rentals for events, job sites, and long-term projects. Availability is confirmed by ZIP code.</p></div><div><h2 class="footer-heading">Company</h2><nav class="footer-links"><a href="/">Home</a><a href="/about/">About us</a><a href="/blog/">Blog</a><a href="/location/">Locations</a><a href="/contact/">Contact</a></nav></div><div><h2 class="footer-heading">Rental Solutions</h2><nav class="footer-links"><a href="/service/">All services</a>${services.map((item) => `<a href="/service/${item.slug}/">${item.shortName}</a>`).join('')}</nav></div><div><h2 class="footer-heading">Talk to Us</h2><div class="footer-contact"><a href="tel:${phoneHref}"><strong>Phone</strong>${phoneDisplay}</a><a href="mailto:${email}"><strong>Email</strong>${email}</a><span><strong>Hours</strong>Mon–Sat · 7:00 AM–7:00 PM</span></div></div></div><div class="container footer-bottom"><span>© <span data-current-year></span> starportablerestrooms.com. All rights reserved.</span><span>Availability confirmed by delivery ZIP.</span></div></footer>
  <a class="mobile-call" href="tel:${phoneHref}" aria-label="Call Star Portable Restrooms at ${phoneDisplay}"><span class="mobile-call-icon" aria-hidden="true">☎</span><span class="mobile-call-copy"><small>Call for availability</small><strong>${phoneDisplay}</strong></span><span class="mobile-call-action" aria-hidden="true">Call now</span></a>`;

export const escapeLd = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');
