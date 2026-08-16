import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = 'https://starportablerestrooms.com';
const phoneDisplay = '+1 (833) 920-1299';
const phoneHref = '+18339201299';
const sitemapLastModified = new Date().toISOString().slice(0, 10);
const clarityTrackingScript = `<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "y3adfg123t");
</script>`;
const organizationSchema = {
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'Star Portable Restrooms',
  url: `${siteUrl}/`,
  logo: `${siteUrl}/assets/logo-mark.png`,
  telephone: phoneHref,
  email: 'hello@starportablerestrooms.com',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: phoneHref,
    contactType: 'rentals and customer service',
    areaServed: 'US',
    availableLanguage: 'English',
  },
};

const states = [
  { name: 'Alabama', code: 'AL', region: 'South', capital: 'Montgomery', cities: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa'], focus: 'construction, college events, festivals, and industrial projects', note: 'Hot, humid summers, heavy rain, and changing site conditions make placement, ventilation, service frequency, and truck access important planning details.' },
  { name: 'Alaska', code: 'AK', region: 'West', capital: 'Juneau', cities: ['Anchorage', 'Fairbanks', 'Juneau', 'Wasilla', 'Kenai'], focus: 'remote job sites, seasonal tourism, community events, and infrastructure work', note: 'Long travel distances, cold weather, remote access, and seasonal road conditions can affect equipment availability, delivery windows, and servicing routes.' },
  { name: 'Arizona', code: 'AZ', region: 'West', capital: 'Phoenix', cities: ['Phoenix', 'Tucson', 'Mesa', 'Scottsdale', 'Flagstaff'], focus: 'construction, outdoor events, sporting events, and long-term commercial sites', note: 'Extreme heat, sun exposure, dust, and monsoon-season access make shaded placement, ventilation, hydration support, and service frequency especially important.' },
  { name: 'Arkansas', code: 'AR', region: 'South', capital: 'Little Rock', cities: ['Little Rock', 'Fayetteville', 'Fort Smith', 'Springdale', 'Jonesboro'], focus: 'construction, fairs, outdoor recreation, and agricultural projects', note: 'Warm summers, heavy rain, rural delivery distances, and uneven terrain should be considered when planning unit placement and service access.' },
  { name: 'California', code: 'CA', region: 'West', capital: 'Sacramento', cities: ['Los Angeles', 'San Diego', 'San Jose', 'Sacramento', 'Fresno'], focus: 'construction, entertainment events, agriculture, weddings, and large public gatherings', note: 'Large service areas, dense urban sites, coastal and inland climates, traffic, and site-specific access rules can all influence delivery timing and placement.' },
  { name: 'Colorado', code: 'CO', region: 'West', capital: 'Denver', cities: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Boulder'], focus: 'construction, mountain events, outdoor recreation, and seasonal festivals', note: 'Elevation, winter weather, freeze-thaw conditions, mountain roads, and fast-changing forecasts can affect access, servicing, and placement.' },
  { name: 'Connecticut', code: 'CT', region: 'Northeast', capital: 'Hartford', cities: ['Bridgeport', 'New Haven', 'Stamford', 'Hartford', 'Waterbury'], focus: 'construction, waterfront events, private gatherings, and municipal projects', note: 'Dense towns, limited staging areas, seasonal weather, and historic or waterfront venues often require careful delivery and pickup coordination.' },
  { name: 'Delaware', code: 'DE', region: 'South', capital: 'Dover', cities: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Rehoboth Beach'], focus: 'coastal events, construction, festivals, and seasonal hospitality', note: 'Coastal demand, summer tourism, compact sites, and weather exposure can change delivery schedules and the number of units required.' },
  { name: 'Florida', code: 'FL', region: 'South', capital: 'Tallahassee', cities: ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'Tallahassee'], focus: 'construction, festivals, tourism, weddings, and emergency projects', note: 'Heat, humidity, heavy rain, storm planning, and year-round event demand make ventilation, anchoring, drainage, and frequent service key considerations.' },
  { name: 'Georgia', code: 'GA', region: 'South', capital: 'Atlanta', cities: ['Atlanta', 'Augusta', 'Columbus', 'Savannah', 'Macon'], focus: 'construction, film production, festivals, weddings, and industrial work', note: 'Hot summers, humidity, urban traffic, rural routes, and storm-season access should be factored into delivery and maintenance plans.' },
  { name: 'Hawaii', code: 'HI', region: 'West', capital: 'Honolulu', cities: ['Honolulu', 'Hilo', 'Kailua', 'Kahului', 'Kapolei'], focus: 'tourism, outdoor events, construction, weddings, and community gatherings', note: 'Island-by-island inventory, inter-island logistics, salt air, wind, and limited site access mean availability must be confirmed for the exact island and ZIP code.' },
  { name: 'Idaho', code: 'ID', region: 'West', capital: 'Boise', cities: ['Boise', 'Meridian', 'Nampa', 'Idaho Falls', 'Coeur d’Alene'], focus: 'construction, agriculture, outdoor recreation, and seasonal events', note: 'Rural distances, mountain access, winter conditions, and seasonal construction demand can affect route scheduling and service frequency.' },
  { name: 'Illinois', code: 'IL', region: 'Midwest', capital: 'Springfield', cities: ['Chicago', 'Aurora', 'Rockford', 'Springfield', 'Peoria'], focus: 'urban construction, festivals, industrial sites, and agricultural events', note: 'Dense city sites, highway traffic, winter weather, and long rural routes require clear staging instructions and realistic delivery windows.' },
  { name: 'Indiana', code: 'IN', region: 'Midwest', capital: 'Indianapolis', cities: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel'], focus: 'construction, motorsports, fairs, manufacturing, and community events', note: 'Seasonal storms, winter freezes, large event traffic, and mixed urban-rural routes can influence access and servicing plans.' },
  { name: 'Iowa', code: 'IA', region: 'Midwest', capital: 'Des Moines', cities: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City'], focus: 'construction, agriculture, fairs, college events, and industrial projects', note: 'Rural delivery distances, severe weather, freeze-thaw cycles, and high-demand fair seasons call for early scheduling and accessible placement.' },
  { name: 'Kansas', code: 'KS', region: 'Midwest', capital: 'Topeka', cities: ['Wichita', 'Overland Park', 'Kansas City', 'Topeka', 'Olathe'], focus: 'construction, agriculture, festivals, energy projects, and outdoor events', note: 'Wind, severe storms, temperature swings, and long rural routes make anchoring, level placement, and service access important.' },
  { name: 'Kentucky', code: 'KY', region: 'South', capital: 'Frankfort', cities: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington'], focus: 'construction, horse events, festivals, bourbon tourism, and manufacturing', note: 'Rolling terrain, seasonal rain, large event crowds, and rural access should be considered when planning unit counts and truck routes.' },
  { name: 'Louisiana', code: 'LA', region: 'South', capital: 'Baton Rouge', cities: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles'], focus: 'festivals, construction, industrial sites, tourism, and emergency response', note: 'Heat, humidity, heavy rain, flood-prone ground, and major festival demand can require careful placement and more frequent servicing.' },
  { name: 'Maine', code: 'ME', region: 'Northeast', capital: 'Augusta', cities: ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Augusta'], focus: 'seasonal tourism, construction, outdoor recreation, weddings, and community events', note: 'Cold winters, coastal weather, rural distances, and seasonal tourism peaks can affect access, availability, and delivery timing.' },
  { name: 'Maryland', code: 'MD', region: 'South', capital: 'Annapolis', cities: ['Baltimore', 'Frederick', 'Rockville', 'Gaithersburg', 'Annapolis'], focus: 'construction, waterfront events, government projects, festivals, and private gatherings', note: 'Urban traffic, waterfront sites, limited staging space, and humid summers require clear placement and delivery instructions.' },
  { name: 'Massachusetts', code: 'MA', region: 'Northeast', capital: 'Boston', cities: ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell'], focus: 'construction, university events, waterfront gatherings, festivals, and municipal work', note: 'Dense streets, historic sites, winter conditions, and permitting or access constraints can affect delivery windows and placement.' },
  { name: 'Michigan', code: 'MI', region: 'Midwest', capital: 'Lansing', cities: ['Detroit', 'Grand Rapids', 'Warren', 'Ann Arbor', 'Lansing'], focus: 'construction, manufacturing, lakefront events, festivals, and seasonal recreation', note: 'Winter weather, lake-effect conditions, large industrial sites, and seasonal event demand can change access and servicing needs.' },
  { name: 'Minnesota', code: 'MN', region: 'Midwest', capital: 'Saint Paul', cities: ['Minneapolis', 'Saint Paul', 'Rochester', 'Duluth', 'Bloomington'], focus: 'construction, fairs, winter projects, lake events, and outdoor recreation', note: 'Extreme cold, snow, freeze-thaw conditions, and summer event peaks make seasonal planning and reliable truck access essential.' },
  { name: 'Mississippi', code: 'MS', region: 'South', capital: 'Jackson', cities: ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi'], focus: 'construction, coastal events, agriculture, festivals, and industrial work', note: 'Heat, humidity, storms, soft ground, and rural routes can influence placement, anchoring, and service schedules.' },
  { name: 'Missouri', code: 'MO', region: 'Midwest', capital: 'Jefferson City', cities: ['Kansas City', 'Saint Louis', 'Springfield', 'Columbia', 'Independence'], focus: 'construction, fairs, sports, festivals, and commercial projects', note: 'Temperature swings, severe weather, urban traffic, and rolling terrain should be considered when planning delivery and pickup.' },
  { name: 'Montana', code: 'MT', region: 'West', capital: 'Helena', cities: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Helena'], focus: 'construction, energy projects, ranching, outdoor recreation, and seasonal events', note: 'Long distances, mountain roads, winter weather, and remote sites can affect inventory, route timing, and service frequency.' },
  { name: 'Nebraska', code: 'NE', region: 'Midwest', capital: 'Lincoln', cities: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney'], focus: 'construction, agriculture, fairs, industrial sites, and community events', note: 'Wind, severe storms, rural distances, and freeze-thaw cycles make stable placement and advance route planning important.' },
  { name: 'Nevada', code: 'NV', region: 'West', capital: 'Carson City', cities: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Carson City'], focus: 'construction, entertainment, conventions, outdoor events, and remote projects', note: 'Extreme heat, desert dust, high event demand, and remote travel routes can affect servicing intervals and delivery timing.' },
  { name: 'New Hampshire', code: 'NH', region: 'Northeast', capital: 'Concord', cities: ['Manchester', 'Nashua', 'Concord', 'Derry', 'Dover'], focus: 'construction, outdoor recreation, fairs, weddings, and seasonal tourism', note: 'Winter conditions, mountain access, rural routes, and seasonal visitor demand require careful scheduling and accessible placement.' },
  { name: 'New Jersey', code: 'NJ', region: 'Northeast', capital: 'Trenton', cities: ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Trenton'], focus: 'construction, shore events, festivals, industrial sites, and private gatherings', note: 'Dense traffic, compact job sites, shore-season demand, and limited staging space can affect delivery windows and unit placement.' },
  { name: 'New Mexico', code: 'NM', region: 'West', capital: 'Santa Fe', cities: ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell'], focus: 'construction, film production, festivals, energy projects, and remote sites', note: 'Heat, elevation, dust, large rural distances, and limited site access make route planning and ventilation important.' },
  { name: 'New York', code: 'NY', region: 'Northeast', capital: 'Albany', cities: ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Albany'], focus: 'urban construction, festivals, waterfront events, agriculture, and municipal projects', note: 'Dense urban access, rural upstate distances, winter weather, and varied site rules require location-specific delivery planning.' },
  { name: 'North Carolina', code: 'NC', region: 'South', capital: 'Raleigh', cities: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Wilmington'], focus: 'construction, coastal events, university gatherings, festivals, and commercial projects', note: 'Humidity, coastal storms, mountain routes, urban growth, and soft ground after rain can affect placement and service access.' },
  { name: 'North Dakota', code: 'ND', region: 'Midwest', capital: 'Bismarck', cities: ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo'], focus: 'energy projects, construction, agriculture, fairs, and remote work sites', note: 'Extreme cold, wind, long distances, and remote industrial sites require advance scheduling and dependable access routes.' },
  { name: 'Ohio', code: 'OH', region: 'Midwest', capital: 'Columbus', cities: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron'], focus: 'construction, manufacturing, festivals, sports, and community events', note: 'Winter weather, dense metro traffic, large industrial sites, and seasonal storms can influence route timing and servicing.' },
  { name: 'Oklahoma', code: 'OK', region: 'South', capital: 'Oklahoma City', cities: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Edmond'], focus: 'construction, energy, agriculture, festivals, and outdoor events', note: 'Wind, heat, severe storms, red-clay ground, and rural delivery distances make stable placement and route planning important.' },
  { name: 'Oregon', code: 'OR', region: 'West', capital: 'Salem', cities: ['Portland', 'Eugene', 'Salem', 'Gresham', 'Bend'], focus: 'construction, outdoor recreation, festivals, agriculture, and seasonal events', note: 'Rain, mountain routes, coastal weather, wildfire-season disruptions, and remote sites can affect access and scheduling.' },
  { name: 'Pennsylvania', code: 'PA', region: 'Northeast', capital: 'Harrisburg', cities: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Harrisburg'], focus: 'construction, industrial sites, fairs, festivals, and agricultural events', note: 'Dense metros, rural distances, winter weather, hills, and older sites with tight access require precise delivery instructions.' },
  { name: 'Rhode Island', code: 'RI', region: 'Northeast', capital: 'Providence', cities: ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'Newport'], focus: 'coastal events, construction, weddings, festivals, and seasonal tourism', note: 'Compact sites, coastal weather, dense traffic, and busy summer events can affect staging, placement, and pickup timing.' },
  { name: 'South Carolina', code: 'SC', region: 'South', capital: 'Columbia', cities: ['Charleston', 'Columbia', 'North Charleston', 'Mount Pleasant', 'Greenville'], focus: 'construction, coastal events, tourism, weddings, and industrial projects', note: 'Heat, humidity, coastal storms, soft ground, and seasonal visitor demand should guide placement and service frequency.' },
  { name: 'South Dakota', code: 'SD', region: 'Midwest', capital: 'Pierre', cities: ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Pierre'], focus: 'construction, agriculture, tourism, fairs, and remote projects', note: 'Long rural routes, wind, winter weather, and large seasonal events make advance booking and truck access especially important.' },
  { name: 'Tennessee', code: 'TN', region: 'South', capital: 'Nashville', cities: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville'], focus: 'construction, music festivals, weddings, sports, and industrial projects', note: 'Heavy event demand, humid summers, rolling terrain, storms, and metro traffic can affect inventory and delivery schedules.' },
  { name: 'Texas', code: 'TX', region: 'South', capital: 'Austin', cities: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth'], focus: 'construction, energy, festivals, agriculture, weddings, and large commercial projects', note: 'Large travel distances, extreme heat, storms, fast-growing metros, and varied site conditions require ZIP-specific availability and route planning.' },
  { name: 'Utah', code: 'UT', region: 'West', capital: 'Salt Lake City', cities: ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'St. George'], focus: 'construction, outdoor recreation, festivals, weddings, and remote projects', note: 'Heat, elevation, winter weather, canyon routes, and fast-growing job sites can influence access and service schedules.' },
  { name: 'Vermont', code: 'VT', region: 'Northeast', capital: 'Montpelier', cities: ['Burlington', 'South Burlington', 'Rutland', 'Essex', 'Montpelier'], focus: 'construction, fairs, outdoor recreation, weddings, and seasonal tourism', note: 'Rural routes, winter conditions, mountain access, mud season, and tourism peaks can affect delivery and pickup.' },
  { name: 'Virginia', code: 'VA', region: 'South', capital: 'Richmond', cities: ['Virginia Beach', 'Chesapeake', 'Norfolk', 'Richmond', 'Arlington'], focus: 'construction, government projects, festivals, military-area work, and private events', note: 'Coastal weather, mountain routes, urban traffic, historic sites, and humid summers require site-specific access planning.' },
  { name: 'Washington', code: 'WA', region: 'West', capital: 'Olympia', cities: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue'], focus: 'construction, outdoor events, agriculture, technology campuses, and seasonal recreation', note: 'Rain, mountain passes, ferry or island access, dense metro traffic, and remote eastern routes can affect availability and timing.' },
  { name: 'West Virginia', code: 'WV', region: 'South', capital: 'Charleston', cities: ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg', 'Wheeling'], focus: 'construction, energy projects, fairs, outdoor recreation, and remote job sites', note: 'Mountain roads, steep or uneven sites, winter weather, and remote routes make truck clearance and level placement important.' },
  { name: 'Wisconsin', code: 'WI', region: 'Midwest', capital: 'Madison', cities: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine'], focus: 'construction, fairs, festivals, lake events, agriculture, and manufacturing', note: 'Cold winters, summer festival demand, lakefront weather, and rural routes can affect availability and service frequency.' },
  { name: 'Wyoming', code: 'WY', region: 'West', capital: 'Cheyenne', cities: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs'], focus: 'energy projects, construction, ranching, outdoor recreation, and remote sites', note: 'Long distances, high winds, winter conditions, elevation, and remote access require early coordination and stable placement.' },
].map((state) => ({ ...state, slug: state.name.toLowerCase().replaceAll(' ', '-') }));

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const serializeSchema = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');

const listSentence = (items) => `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`;

const header = (active = '') => `
  <div class="topbar">
    <div class="container topbar-inner">
      <div class="topbar-items"><span>Mon–Sat · 7:00 AM–7:00 PM</span><span>Availability confirmed by delivery ZIP</span><a href="tel:${phoneHref}">Call ${phoneDisplay}</a></div>
      <span>Clean units. Clear pricing. Reliable coordination.</span>
    </div>
  </div>
  <header class="site-header">
    <div class="container nav-inner">
      <a class="brand" href="/" aria-label="Star Portable Restrooms home"><img src="/assets/logo-mark.png" alt="" /><span class="brand-name">Star Portable <small>Restrooms</small></span></a>
      <nav class="desktop-nav" aria-label="Primary navigation"><a href="/">Home</a><a href="/about.html">About</a><a href="/blog.html">Blog</a><a href="/#rentals">Services</a><a${active === 'locations' ? ' class="active"' : ''} href="/location/">Locations</a><a href="/contact.html">Contact</a></nav>
      <div class="nav-actions"><a class="header-phone" href="tel:${phoneHref}"><span class="header-phone-icon" aria-hidden="true">☎</span><span><small>Call Us Now</small>${phoneDisplay}</span></a><button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-menu-toggle><span></span></button></div>
    </div>
  </header>
  <nav class="mobile-menu" aria-label="Mobile navigation" data-mobile-menu><a href="/">Home</a><a href="/about.html">About</a><a href="/blog.html">Blog</a><a href="/#rentals">Services</a><a href="/location/">Locations</a><a href="/contact.html">Contact</a><a class="btn btn-call mobile-menu-call" href="tel:${phoneHref}">☎ Call Us Now · ${phoneDisplay}</a></nav>`;

const footer = () => `
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-about"><a class="brand" href="/"><img src="/assets/logo-mark.png" alt="" /><span class="brand-name">Star Portable <small>Restrooms</small></span></a><p>Porta potty, portable toilet, restroom trailer, and handwashing station rentals for events, job sites, and long-term projects. Availability is confirmed by ZIP code.</p></div>
      <div><h4>Company</h4><nav class="footer-links"><a href="/">Home</a><a href="/about.html">About us</a><a href="/blog.html">Blog</a><a href="/location/">Locations</a><a href="/contact.html">Contact</a></nav></div>
      <div><h4>Rental Solutions</h4><nav class="footer-links"><a href="/service/standard-porta-potty-rental/">Standard restrooms</a><a href="/service/ada-portable-toilet-rental/">ADA-accessible units</a><a href="/service/restroom-trailer-rental/">Restroom trailers</a><a href="/service/portable-handwashing-station-rental/">Handwashing stations</a></nav></div>
      <div><h4>Talk to Us</h4><div class="footer-contact"><a href="tel:${phoneHref}"><strong>Phone</strong>${phoneDisplay}</a><a href="mailto:hello@starportablerestrooms.com"><strong>Email</strong>hello@starportablerestrooms.com</a><span><strong>Hours</strong>Mon–Sat · 7:00 AM–7:00 PM</span></div></div>
    </div>
    <div class="container footer-bottom"><span>© <span data-current-year></span> starportablerestrooms.com. All rights reserved.</span><span>Availability confirmed by delivery ZIP.</span></div>
  </footer>
  <a class="mobile-call" href="tel:${phoneHref}" aria-label="Call Star Portable Restrooms at ${phoneDisplay}"><span class="mobile-call-icon" aria-hidden="true">☎</span><span class="mobile-call-copy"><small>Call for availability</small><strong>${phoneDisplay}</strong></span><span class="mobile-call-action" aria-hidden="true">Call now</span></a>`;

const offerCatalog = {
  '@type': 'OfferCatalog',
  name: 'Portable sanitation rental options',
  itemListElement: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Standard porta potty rental' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ADA-accessible portable toilet rental' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Portable restroom trailer rental' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Portable handwashing station rental' } },
  ],
};

const stateFaqs = (state) => [
  { q: `How much does porta potty rental cost in ${state.name}?`, a: `Pricing in ${state.name} depends on the delivery ZIP code, unit type, quantity, rental period, service frequency, site access, and travel requirements. Call with your dates and address for current availability and a project-specific price.` },
  { q: `How do I find a porta potty rental near me in ${state.name}?`, a: `Share your ${state.name} delivery ZIP code, preferred dates, project type, and expected attendance or crew size. We will confirm whether service is available for that address and discuss delivery, pickup, and servicing options.` },
  { q: `Can I rent portable toilets for construction sites in ${state.name}?`, a: `Construction rentals can include standard units, accessible portable restrooms, handwashing stations, scheduled pumping and cleaning, supply restocking, and pickup. Service frequency is planned around crew size and usage.` },
  { q: `Do you offer restroom trailer rental in ${state.name}?`, a: `Restroom trailer availability varies by ZIP code, date, trailer size, and site requirements. Power, water, level placement, and truck access should be reviewed before delivery.` },
  { q: `How many portable toilets do I need for an event in ${state.name}?`, a: `The right quantity depends on attendance, event length, alcohol service, food service, accessibility needs, and whether units will be serviced during the event. Call with the event details for a practical recommendation.` },
  { q: `What delivery conditions should I plan for in ${state.name}?`, a: `${state.note} Share the exact address, surface, gate, clearance, and placement details so route and service access can be reviewed before delivery.` },
  { q: `What information should I have ready when I call?`, a: `Have the delivery ZIP code, dates, event attendance or crew size, preferred unit types, rental duration, and any gate, surface, clearance, or access details ready. This helps the rental desk confirm options faster.` },
];

const stateSchema = (state, title, description, faqs) => ({
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: 'Star Portable Restrooms', publisher: { '@id': `${siteUrl}/#organization` }, inLanguage: 'en-US' },
    { '@type': 'WebPage', '@id': `${siteUrl}/location/${state.slug}/#webpage`, url: `${siteUrl}/location/${state.slug}/`, name: title, description, isPartOf: { '@id': `${siteUrl}/#website` }, about: { '@id': `${siteUrl}/location/${state.slug}/#service` }, mainEntity: [{ '@id': `${siteUrl}/location/${state.slug}/#service` }, { '@id': `${siteUrl}/location/${state.slug}/#faq` }], breadcrumb: { '@id': `${siteUrl}/location/${state.slug}/#breadcrumb` }, inLanguage: 'en-US' },
    { '@type': 'Service', '@id': `${siteUrl}/location/${state.slug}/#service`, name: `Porta Potty Rental in ${state.name}`, serviceType: 'Porta potty and portable toilet rental', description, provider: { '@id': `${siteUrl}/#organization` }, areaServed: { '@type': 'AdministrativeArea', name: state.name }, hasOfferCatalog: offerCatalog },
    { '@type': 'BreadcrumbList', '@id': `${siteUrl}/location/${state.slug}/#breadcrumb`, itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: `${siteUrl}/location/` },
      { '@type': 'ListItem', position: 3, name: state.name, item: `${siteUrl}/location/${state.slug}/` },
    ] },
    { '@type': 'FAQPage', '@id': `${siteUrl}/location/${state.slug}/#faq`, mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ],
});

const statePage = (state) => {
  const title = `Porta Potty Rental in ${state.name} | Star`;
  const description = `Call Star for porta potty rental in ${state.name}. Check portable toilets, accessible units, restroom trailers, handwashing, delivery, and service by ZIP.`;
  const faqs = stateFaqs(state);
  const regionalStates = states.filter((item) => item.region === state.region);
  const currentRegionIndex = regionalStates.findIndex((item) => item.slug === state.slug);
  const related = Array.from(
    { length: Math.min(4, regionalStates.length - 1) },
    (_, index) => regionalStates[(currentRegionIndex + index + 1) % regionalStates.length],
  );
  const marketLabels = [
    ...state.cities,
    ...(state.cities.includes(state.capital) ? [] : [`${state.capital} area`]),
    'Surrounding communities',
  ];
  const schema = stateSchema(state, title, description, faqs);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${siteUrl}/location/${state.slug}/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Star Portable Restrooms" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${siteUrl}/location/${state.slug}/" />
  <meta property="og:image" content="${siteUrl}/assets/homepage/cover.webp" />
  <meta name="twitter:card" content="summary_large_image" />
  <title>${escapeHtml(title)}</title>
  <link rel="icon" href="/assets/logo-mark.png" type="image/png" />
  <link rel="preload" as="image" href="/assets/homepage/cover.webp" fetchpriority="high" />
  <link rel="stylesheet" href="/styles.css" />
  ${clarityTrackingScript}
  <script type="application/ld+json">${serializeSchema(schema)}</script>
</head>
<body class="location-page state-location-page" data-location-state="${escapeHtml(state.name)}">
${header('locations')}
<main>
  <section class="location-hero state-location-hero">
    <div class="container location-hero-grid">
      <div class="location-hero-copy">
        <div class="breadcrumb location-breadcrumb"><a href="/">Home</a><span>/</span><a href="/location/">Locations</a><span>/</span><span>${escapeHtml(state.name)}</span></div>
        <span class="eyebrow eyebrow-light">${state.code} rental availability</span>
        <h1>Porta Potty Rental in ${escapeHtml(state.name)}</h1>
        <p>Call to check portable toilet rental availability for a delivery address in ${escapeHtml(state.name)}. Planning requests may involve ${escapeHtml(listSentence(state.cities))}; exact inventory, delivery, servicing, and pickup are confirmed by ZIP code.</p>
        <div class="location-hero-actions"><a class="btn btn-call" href="tel:${phoneHref}">☎ Call ${phoneDisplay}</a><a class="btn btn-location-secondary" href="#rental-options">Explore rental options</a></div>
        <div class="location-hero-proof"><span>✓ Availability by ZIP</span><span>✓ Event & job-site rentals</span><span>✓ Flexible service plans</span></div>
      </div>
      <aside class="location-call-card">
        <span class="location-call-label">Call for ${state.name} availability</span>
        <h2>Get rental answers in one call.</h2>
        <p>Have your delivery ZIP, dates, unit count, attendance or crew size, and site-access notes ready.</p>
        <a href="tel:${phoneHref}" class="location-card-phone"><span aria-hidden="true">☎</span><span><small>Talk to the rental desk</small>${phoneDisplay}</span></a>
        <small class="coverage-disclosure">Service and inventory are confirmed for the exact delivery address. This page does not represent a staffed office in ${state.name}.</small>
      </aside>
    </div>
  </section>

  <section class="location-call-strip" aria-label="Rental information to have ready">
    <div class="container location-call-strip-grid">
      <div><span>01</span><strong>Delivery ZIP code</strong><small>Confirms route availability</small></div>
      <div><span>02</span><strong>Rental dates</strong><small>Checks equipment scheduling</small></div>
      <div><span>03</span><strong>Attendance or crew</strong><small>Helps estimate quantity</small></div>
      <div><span>04</span><strong>Site access</strong><small>Plans placement and service</small></div>
    </div>
  </section>

  <section class="section state-intro-section">
    <div class="container state-intro-grid">
      <figure class="state-intro-photo"><img src="/assets/homepage/delivery-setup.webp" alt="Portable restroom delivery and setup planning" loading="lazy" /><figcaption><strong>Delivery planned around your site</strong><span>Address, access, surface, placement, and service clearances are reviewed before arrival.</span></figcaption></figure>
      <div class="state-intro-copy">
        <span class="eyebrow">Statewide rental planning</span>
        <h2>Porta Potty Rental in ${escapeHtml(state.name)} for Events and Job Sites</h2>
        <p>Portable restroom needs vary across ${escapeHtml(state.name)}. Projects in ${escapeHtml(state.cities.slice(0, 3).join(', '))}, and surrounding communities may need different quantities, delivery windows, and service schedules based on attendance, crew size, rental length, and site access.</p>
        <p>${escapeHtml(state.note)}</p>
        <p>Common requests include ${escapeHtml(state.focus)}. Call with the exact address so the rental desk can confirm what is currently available for your part of ${escapeHtml(state.name)}.</p>
        <a class="text-link location-text-link" href="tel:${phoneHref}">Call ${phoneDisplay} for ${escapeHtml(state.name)} availability <span class="arrow">→</span></a>
      </div>
    </div>
  </section>

  <section class="section surface" id="rental-options">
    <div class="container">
      <div class="section-heading center"><span class="eyebrow">Rental options</span><h2>Porta Potty Rental Options in ${escapeHtml(state.name)}</h2><p>Match the unit type to your guests, crew, site conditions, comfort expectations, accessibility needs, utilities, and budget.</p></div>
      <div class="location-options-grid">
        <article class="location-option-card"><img src="/assets/homepage/standard-restroom.webp" alt="Standard portable restroom rental unit" loading="lazy" /><div><span>Most requested</span><h3>Standard Porta Potty</h3><p>Durable, ventilated portable toilets for construction sites, festivals, parks, home projects, and general use.</p></div></article>
        <article class="location-option-card"><img src="/assets/homepage/ada-restroom.webp" alt="Accessible portable restroom rental unit" loading="lazy" /><div><span>Accessible option</span><h3>Accessible Portable Restroom</h3><p>Ground-level entry and additional interior space for events, public sites, and inclusive sanitation plans.</p></div></article>
        <article class="location-option-card"><img src="/assets/homepage/restroom-trailer.webp" alt="Portable restroom trailer rental" loading="lazy" /><div><span>Upgraded comfort</span><h3>Portable Restroom Trailer</h3><p>Restroom trailers for weddings, corporate events, VIP areas, and projects with suitable power, water, and access.</p></div></article>
        <article class="location-option-card"><img src="/assets/homepage/handwash-station.webp" alt="Portable handwashing station rental" loading="lazy" /><div><span>Hygiene add-on</span><h3>Handwashing Station</h3><p>Standalone sinks with fresh water, soap dispensers, and hands-free operation for events and job sites.</p></div></article>
      </div>
      <div class="call-cta">
        <span class="call-cta-mark" aria-hidden="true">☎</span>
        <div class="call-cta-copy"><small>Which rental fits your ${escapeHtml(state.name)} site?</small><strong>Get availability, recommendations, and pricing by phone.</strong><span>Share the delivery ZIP code, dates, and expected guest or crew count.</span></div>
        <a class="call-cta-phone" href="tel:${phoneHref}" aria-label="Call Star Portable Restrooms at ${phoneDisplay}"><span class="call-cta-phone-icon" aria-hidden="true">☎</span><span><small>Call the rental desk</small><strong>${phoneDisplay}</strong></span></a>
      </div>
    </div>
  </section>

  <section class="section state-markets-section">
    <div class="container state-markets-grid">
      <div>
        <span class="eyebrow">Coverage by address</span>
        <h2>Portable Toilet Rental Planning Across ${escapeHtml(state.name)}</h2>
        <p>Requests may come from major metros, smaller communities, rural properties, event venues, and active job sites. Because route capacity and equipment inventory change, every order begins with the delivery address.</p>
        <div class="market-chips">${marketLabels.map((label) => `<span>${escapeHtml(label)}</span>`).join('')}</div>
      </div>
      <aside class="state-planning-card">
        <span class="state-planning-icon">◎</span>
        <h3>What affects delivery and pricing?</h3>
        <ul><li>Distance and current route availability</li><li>Unit type, quantity, and rental duration</li><li>Delivery surface, gate, and truck clearance</li><li>Cleaning, pumping, and restocking frequency</li><li>Event timing, pickup window, and special access</li></ul>
        <a class="btn btn-call" href="tel:${phoneHref}">☎ Call ${phoneDisplay}</a>
      </aside>
    </div>
  </section>

  <section class="section dark-section location-use-section">
    <div class="container">
      <div class="section-heading"><span class="eyebrow eyebrow-light">Common rental needs</span><h2>Portable Restrooms for ${escapeHtml(state.name)} Projects and Events</h2><p>Choose a sanitation plan around the people using the site, how long units will remain, and how service trucks can safely reach them.</p></div>
      <div class="location-use-grid">
        <article><span>01</span><h3>Construction & Long-Term Work</h3><p>Job-site porta potties, handwashing stations, recurring pumping, cleaning, deodorizing, and supply restocking.</p></article>
        <article><span>02</span><h3>Weddings & Private Events</h3><p>Clean standard units, accessible restrooms, or upgraded trailers planned around venue access and guest count.</p></article>
        <article><span>03</span><h3>Festivals & Public Gatherings</h3><p>Quantity planning for attendance, duration, food and alcohol service, accessible use, and high-traffic placement.</p></article>
        <article><span>04</span><h3>Commercial & Temporary Facilities</h3><p>Portable sanitation for warehouses, outages, renovations, seasonal operations, and remote or temporary work areas.</p></article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container location-process-layout">
      <div><span class="eyebrow">Simple call-first process</span><h2>How to Arrange Porta Potty Rental in ${escapeHtml(state.name)}</h2><p>One call starts the availability check and gives the rental team the details needed to recommend equipment and servicing.</p></div>
      <div class="location-process-steps">
        <article><span>01</span><div><h3>Share the address and dates</h3><p>Provide the ZIP code, delivery and pickup dates, site type, and access notes.</p></div></article>
        <article><span>02</span><div><h3>Review units and pricing</h3><p>Discuss quantities, accessible options, trailers, handwashing, and service frequency.</p></div></article>
        <article><span>03</span><div><h3>Coordinate delivery and service</h3><p>Confirm placement, arrival timing, recurring maintenance when needed, and pickup.</p></div></article>
      </div>
    </div>
  </section>

  <section class="section surface" id="state-faqs">
    <div class="container location-faq-layout">
      <div><span class="eyebrow">${state.name} rental questions</span><h2>Porta Potty Rental FAQs for ${escapeHtml(state.name)}</h2><p>Answers about pricing, local availability, event quantities, construction rentals, restroom trailers, and call preparation.</p><a class="btn btn-call" href="tel:${phoneHref}">☎ Call ${phoneDisplay}</a></div>
      <div class="faq-list">${faqs.map(({ q, a }, index) => `<article class="faq-item${index === 0 ? ' open' : ''}" data-faq-item><button class="faq-question" type="button" aria-expanded="${index === 0}" data-faq-button>${escapeHtml(q)}<span class="faq-plus">+</span></button><div class="faq-answer"><div><p>${escapeHtml(a)}</p></div></div></article>`).join('')}</div>
    </div>
  </section>

  <section class="section-sm related-locations-section">
    <div class="container"><div class="related-locations-head"><div><span class="eyebrow">More ${escapeHtml(state.region)} guides</span><h2>Related Porta Potty Rental Locations</h2></div><a class="text-link" href="/location/">View all states <span class="arrow">→</span></a></div><div class="related-location-links">${related.map((item) => `<a href="/location/${item.slug}/"><span>${item.code}</span><strong>Porta Potty Rental in ${escapeHtml(item.name)}</strong><small>View location →</small></a>`).join('')}</div></div>
  </section>

  <section class="section-sm"><div class="container cta-panel location-final-cta" style="--cta-image: url('/assets/homepage/final-cta.webp');"><div class="cta-panel-inner"><div><h2>Call for Porta Potty Rental in ${escapeHtml(state.name)}</h2><p>Have your ZIP code, dates, estimated attendance or crew size, and site-access details ready for a faster availability check.</p></div><a class="btn btn-white cta-phone" href="tel:${phoneHref}"><span>Call the rental desk</span><strong>${phoneDisplay}</strong></a></div></div></section>
</main>
${footer()}
<script type="module" src="/script.js"></script>
</body>
</html>`;
};

const regionOrder = ['Northeast', 'Midwest', 'South', 'West'];
const groupedStates = regionOrder.map((region) => ({ region, states: states.filter((state) => state.region === region) }));

const hubTitle = 'Porta Potty Rental Locations Across the USA | Star';
const hubDescription = 'Find porta potty rental locations by state. Call Star for portable toilet availability, delivery, servicing, restroom trailers, and pricing near you.';
const hubSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: 'Star Portable Restrooms', publisher: { '@id': `${siteUrl}/#organization` }, inLanguage: 'en-US' },
    { '@type': 'CollectionPage', '@id': `${siteUrl}/location/#webpage`, url: `${siteUrl}/location/`, name: hubTitle, description: hubDescription, isPartOf: { '@id': `${siteUrl}/#website` }, breadcrumb: { '@id': `${siteUrl}/location/#breadcrumb` }, mainEntity: { '@id': `${siteUrl}/location/#states` }, inLanguage: 'en-US' },
    { '@type': 'ItemList', '@id': `${siteUrl}/location/#states`, name: 'Porta potty rental locations by state', numberOfItems: states.length, itemListElement: states.map((state, index) => ({ '@type': 'ListItem', position: index + 1, name: `Porta Potty Rental in ${state.name}`, url: `${siteUrl}/location/${state.slug}/` })) },
    { '@type': 'BreadcrumbList', '@id': `${siteUrl}/location/#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Locations', item: `${siteUrl}/location/` }] },
  ],
};

const hubPage = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${escapeHtml(hubDescription)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${siteUrl}/location/" />
  <meta property="og:type" content="website" /><meta property="og:site_name" content="Star Portable Restrooms" /><meta property="og:title" content="${escapeHtml(hubTitle)}" /><meta property="og:description" content="${escapeHtml(hubDescription)}" /><meta property="og:url" content="${siteUrl}/location/" /><meta property="og:image" content="${siteUrl}/assets/homepage/cover.webp" />
  <meta name="twitter:card" content="summary_large_image" />
  <title>${escapeHtml(hubTitle)}</title>
  <link rel="icon" href="/assets/logo-mark.png" type="image/png" />
  <link rel="preload" as="image" href="/assets/homepage/cover.webp" fetchpriority="high" />
  <link rel="stylesheet" href="/styles.css" />
  ${clarityTrackingScript}
  <script type="application/ld+json">${serializeSchema(hubSchema)}</script>
</head>
<body class="location-page location-hub-page">
${header('locations')}
<main>
  <section class="location-hero location-hub-hero">
    <div class="container location-hero-grid">
      <div class="location-hero-copy"><div class="breadcrumb location-breadcrumb"><a href="/">Home</a><span>/</span><span>Locations</span></div><span class="eyebrow eyebrow-light">Nationwide location directory</span><h1>Porta Potty Rental Locations Across the USA</h1><p>Explore portable toilet and portable restroom rental planning by state. Select a location, then call with the exact delivery ZIP code to confirm current inventory, route availability, service options, and pricing.</p><div class="location-hero-actions"><a class="btn btn-call" href="tel:${phoneHref}">☎ Call ${phoneDisplay}</a><a class="btn btn-location-secondary" href="#state-directory">Browse all states</a></div><div class="location-hero-proof"><span>✓ 50 state guides</span><span>✓ Availability confirmed by ZIP</span><span>✓ Call-first rental help</span></div></div>
      <aside class="location-call-card hub-call-card"><span class="location-call-label">Need a rental near you?</span><h2>Tell us where and when.</h2><p>Call with the delivery ZIP code, dates, project type, attendance or crew size, and site-access information.</p><a href="tel:${phoneHref}" class="location-card-phone"><span aria-hidden="true">☎</span><span><small>Call for availability</small>${phoneDisplay}</span></a><small class="coverage-disclosure">The directory provides state-level planning information. Service is confirmed for each delivery address.</small></aside>
    </div>
  </section>

  <section class="location-call-strip" aria-label="How state availability checks work"><div class="container location-call-strip-grid"><div><span>01</span><strong>Choose a state</strong><small>Review local planning guidance</small></div><div><span>02</span><strong>Share the ZIP code</strong><small>Confirm route availability</small></div><div><span>03</span><strong>Describe the project</strong><small>Estimate unit types and quantity</small></div><div><span>04</span><strong>Review service</strong><small>Discuss delivery and pricing</small></div></div></section>

  <section class="section state-directory-section" id="state-directory">
    <div class="container"><div class="state-directory-head"><div><span class="eyebrow">Browse the service directory</span><h2>Find a Porta Potty Rental Location by State</h2><p>Each state page covers portable toilet options, common event and construction needs, delivery considerations, major markets, FAQs, and a direct call path.</p></div><label class="state-search"><span>Search states</span><input type="search" placeholder="Enter a state name" autocomplete="off" data-state-search /></label></div><p class="state-search-empty" data-state-empty hidden>No states match that search.</p><div class="state-region-groups">${groupedStates.map(({ region, states: regionStates }) => `<section class="state-region-group" data-state-region><div class="state-region-title"><span>${String(regionOrder.indexOf(region) + 1).padStart(2, '0')}</span><h3>${region}</h3><small>${regionStates.length} states</small></div><div class="state-card-grid">${regionStates.map((state) => `<a class="state-link-card" href="/location/${state.slug}/" data-state-card data-state-name="${state.name.toLowerCase()}"><span>${state.code}</span><div><strong>${escapeHtml(state.name)}</strong><small>Porta potty rental →</small></div></a>`).join('')}</div></section>`).join('')}</div><div class="call-cta"><span class="call-cta-mark" aria-hidden="true">☎</span><div class="call-cta-copy"><small>Not sure which page to choose?</small><strong>Call with the delivery ZIP code for a direct availability check.</strong><span>We’ll help with unit options, quantities, service frequency, and pricing.</span></div><a class="call-cta-phone" href="tel:${phoneHref}" aria-label="Call Star Portable Restrooms at ${phoneDisplay}"><span class="call-cta-phone-icon" aria-hidden="true">☎</span><span><small>Call the rental desk</small><strong>${phoneDisplay}</strong></span></a></div></div>
  </section>

  <section class="section surface"><div class="container location-hub-content"><div><span class="eyebrow">Search intent, answered</span><h2>Portable Toilet Rental Help for Events and Job Sites</h2><p>Customers searching for a “porta potty rental near me” usually need fast answers about nearby inventory, delivery timing, rental cost, unit quantity, and servicing. State pages help organize that information, but the exact address is what determines real availability.</p><p>Rental options may include standard portable toilets, accessible portable restrooms, restroom trailers, and handwashing stations for construction, festivals, weddings, commercial sites, private gatherings, and temporary facilities.</p></div><div class="hub-content-points"><article><span>01</span><h3>Event rentals</h3><p>Plan around attendance, duration, food and alcohol service, accessibility, and venue access.</p></article><article><span>02</span><h3>Construction rentals</h3><p>Coordinate job-site placement, recurring cleaning, pumping, restocking, and pickup.</p></article><article><span>03</span><h3>Trailer rentals</h3><p>Review power, water, level ground, truck access, guest expectations, and utilities.</p></article></div></div></section>

  <section class="section-sm"><div class="container cta-panel location-final-cta" style="--cta-image: url('/assets/homepage/final-cta.webp');"><div class="cta-panel-inner"><div><h2>Find Porta Potty Rental Availability Near You</h2><p>Call with your delivery ZIP code, dates, project details, and estimated attendance or crew size.</p></div><a class="btn btn-white cta-phone" href="tel:${phoneHref}"><span>Call the rental desk</span><strong>${phoneDisplay}</strong></a></div></div></section>
</main>
${footer()}
<script type="module" src="/script.js"></script><script type="module" src="/location.js"></script>
</body>
</html>`;

mkdirSync(resolve(root, 'location'), { recursive: true });
writeFileSync(resolve(root, 'location', 'index.html'), hubPage);
for (const state of states) {
  const directory = resolve(root, 'location', state.slug);
  mkdirSync(directory, { recursive: true });
  writeFileSync(resolve(directory, 'index.html'), statePage(state));
}

const staticUrls = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about.html', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog.html', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact.html', changefreq: 'monthly', priority: '0.9' },
  { path: '/location/', changefreq: 'weekly', priority: '0.9' },
  { path: '/service/standard-porta-potty-rental/', changefreq: 'monthly', priority: '0.9' },
  { path: '/service/ada-portable-toilet-rental/', changefreq: 'monthly', priority: '0.9' },
  { path: '/service/restroom-trailer-rental/', changefreq: 'monthly', priority: '0.9' },
  { path: '/service/portable-handwashing-station-rental/', changefreq: 'monthly', priority: '0.9' },
];
const locationUrls = states.map((state) => ({ path: `/location/${state.slug}/`, changefreq: 'monthly', priority: '0.8' }));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...locationUrls].map((item) => `  <url><loc>${siteUrl}${item.path}</loc><lastmod>${sitemapLastModified}</lastmod><changefreq>${item.changefreq}</changefreq><priority>${item.priority}</priority></url>`).join('\n')}
</urlset>\n`;
writeFileSync(resolve(root, 'sitemap.xml'), sitemap);
writeFileSync(resolve(root, 'public', 'sitemap.xml'), sitemap);

console.log(`Generated location hub, ${states.length} state pages, and ${staticUrls.length + locationUrls.length} sitemap URLs.`);
