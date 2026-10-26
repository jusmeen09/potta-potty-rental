import { mkdirSync, writeFileSync } from 'node:fs';
import { seasonFor, oshaFor } from './lib/state-data.mjs';
import { priceSummary, priceSources, pricesChecked } from './lib/price-data.mjs';
import { pageHead, unitStrip, callSheet, callButton, sheetLink, ctaNote } from './lib/catalogue.mjs';
import { phoneIcon } from './lib/site.mjs';
import { header, footer, organization } from './lib/site.mjs';
import { posts as blogPosts } from './lib/blog-posts.mjs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = 'https://starportablerestrooms.com';
const phoneDisplay = '+1 (833) 920-1299';
const phoneHref = '+18339201299';
const clarityTrackingScript = `<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "y3adfg123t");
</script>`;
const states = [
  { name: 'Alabama', code: 'AL', region: 'South', capital: 'Montgomery', cities: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa'], focus: 'construction, college events, festivals, and industrial projects', note: 'Hot, humid summers, heavy rain, and changing site conditions make placement, ventilation, service frequency, and truck access important planning details.' },
  { name: 'Arizona', code: 'AZ', region: 'West', capital: 'Phoenix', cities: ['Phoenix', 'Tucson', 'Mesa', 'Scottsdale', 'Flagstaff'], focus: 'construction, outdoor events, sporting events, and long-term commercial sites', note: 'Extreme heat, sun exposure, dust, and monsoon-season access make shaded placement, ventilation, hydration support, and service frequency especially important.' },
  { name: 'Arkansas', code: 'AR', region: 'South', capital: 'Little Rock', cities: ['Little Rock', 'Fayetteville', 'Fort Smith', 'Springdale', 'Jonesboro'], focus: 'construction, fairs, outdoor recreation, and agricultural projects', note: 'Warm summers, heavy rain, rural delivery distances, and uneven terrain should be considered when planning unit placement and service access.' },
  { name: 'California', code: 'CA', region: 'West', capital: 'Sacramento', cities: ['Los Angeles', 'San Diego', 'San Jose', 'Sacramento', 'Fresno'], focus: 'construction, entertainment events, agriculture, weddings, and large public gatherings', note: 'Large service areas, dense urban sites, coastal and inland climates, traffic, and site-specific access rules can all influence delivery timing and placement.' },
  { name: 'Colorado', code: 'CO', region: 'West', capital: 'Denver', cities: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Boulder'], focus: 'construction, mountain events, outdoor recreation, and seasonal festivals', note: 'Elevation, winter weather, freeze-thaw conditions, mountain roads, and fast-changing forecasts can affect access, servicing, and placement.' },
  { name: 'Connecticut', code: 'CT', region: 'Northeast', capital: 'Hartford', cities: ['Bridgeport', 'New Haven', 'Stamford', 'Hartford', 'Waterbury'], focus: 'construction, waterfront events, private gatherings, and municipal projects', note: 'Dense towns, limited staging areas, seasonal weather, and historic or waterfront venues often require careful delivery and pickup coordination.' },
  { name: 'Delaware', code: 'DE', region: 'South', capital: 'Dover', cities: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Rehoboth Beach'], focus: 'coastal events, construction, festivals, and seasonal hospitality', note: 'Coastal demand, summer tourism, compact sites, and weather exposure can change delivery schedules and the number of units required.' },
  { name: 'Florida', code: 'FL', region: 'South', capital: 'Tallahassee', cities: ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'Tallahassee'], focus: 'construction, festivals, tourism, weddings, and emergency projects', note: 'Heat, humidity, heavy rain, storm planning, and year-round event demand make ventilation, anchoring, drainage, and frequent service key considerations.' },
  { name: 'Georgia', code: 'GA', region: 'South', capital: 'Atlanta', cities: ['Atlanta', 'Augusta', 'Columbus', 'Savannah', 'Macon'], focus: 'construction, film production, festivals, weddings, and industrial work', note: 'Hot summers, humidity, urban traffic, rural routes, and storm-season access should be factored into delivery and maintenance plans.' },
  { name: 'Idaho', code: 'ID', region: 'West', capital: 'Boise', cities: ['Boise', 'Meridian', 'Nampa', 'Idaho Falls', 'Coeur d’Alene'], focus: 'construction, agriculture, outdoor recreation, and seasonal events', note: 'Rural distances, mountain access, winter conditions, and seasonal construction demand can affect route scheduling and service frequency.' },
  { name: 'Illinois', code: 'IL', region: 'Midwest', capital: 'Springfield', cities: ['Chicago', 'Aurora', 'Rockford', 'Springfield', 'Peoria'], focus: 'urban construction, festivals, industrial sites, and agricultural events', note: 'Dense city sites, highway traffic, winter weather, and long rural routes require clear staging instructions and realistic delivery windows.' },
  { name: 'Indiana', code: 'IN', region: 'Midwest', capital: 'Indianapolis', cities: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel'], focus: 'construction, motorsports, fairs, manufacturing, and community events', note: 'Seasonal storms, winter freezes, large event traffic, and mixed urban-rural routes can influence access and servicing plans.' },
  { name: 'Iowa', code: 'IA', region: 'Midwest', capital: 'Des Moines', cities: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City'], focus: 'construction, agriculture, fairs, college events, and industrial projects', note: 'Rural delivery distances, severe weather, freeze-thaw cycles, and high-demand fair seasons call for early scheduling and accessible placement.' },
  { name: 'Kansas', code: 'KS', region: 'Midwest', capital: 'Topeka', cities: ['Wichita', 'Kansas City', 'Topeka', 'Overland Park', 'Olathe'], focus: 'construction, agriculture, festivals, energy projects, and outdoor events', note: 'Wind, severe storms, temperature swings, and long rural routes make anchoring, level placement, and service access important.' },
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

// Name the state's own metros so no two descriptions are a state-name swap.
// Uses as many cities as fit in 160 characters, most populous first.
const stateDescription = (state) => {
  const describe = (cities) => {
    const cityList = cities.length > 1 ? `${cities.slice(0, -1).join(', ')} & ${cities.at(-1)}` : cities[0];
    return `Porta potty rental in ${state.name}: ${cityList}. Published prices from ${priceSummary.standardDay}/day, permit checks, and OSHA rules; vendors confirm quotes.`;
  };
  const candidates = [3, 2, 1].map((count) => describe(state.cities.slice(0, count)));
  return candidates.find((text) => text.length <= 160) ?? candidates.at(-1);
};



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

const stateFaqs = (state, season, osha) => [
  { q: `How much does porta potty rental cost in ${state.name}?`, a: `Published guides put a standard unit at about ${priceSummary.standardDay} for one day and ${priceSummary.standardMonth} a month; these are national and regional figures, not ${state.name} quotes or Star rates. The delivery ZIP code, unit type, quantity, service frequency, and site access set the actual price. Call with your dates and address for a vendor quote.` },
  { q: `How do I find a porta potty rental near me in ${state.name}?`, a: `Share your ${state.name} delivery ZIP code, preferred dates, project type, and expected attendance or crew size. Star passes inquiries to providers. The vendor confirms coverage, price, delivery, pickup, and servicing for the address.` },
  { q: `Can I rent portable toilets for construction sites in ${state.name}?`, a: `Construction rentals can include standard units, accessible portable restrooms, handwashing stations, scheduled pumping and cleaning, supply restocking, and pickup. Service frequency is planned around crew size and usage.` },
  { q: `Do you offer restroom trailer rental in ${state.name}?`, a: `Restroom trailer availability varies by ZIP code, date, trailer size, and site requirements. Power, water, level placement, and truck access should be reviewed before delivery.` },
  { q: `How many portable toilets do I need for an event in ${state.name}?`, a: `The right quantity depends on attendance, event length, alcohol service, food service, accessibility needs, and whether units will be serviced during the event. Call with the event details for a practical recommendation.` },
  { q: `What delivery conditions should I plan for in ${state.name}?`, a: `${state.note} Share the exact address, surface, gate, clearance, and placement details so route and service access can be reviewed before delivery.` },
  { q: `Which OSHA rules apply to job sites in ${state.name}?`, a: osha.kind === 'state-plan' ? `${state.name} runs its own OSHA-approved State Plan, so construction sanitation is enforced by ${osha.agency} rather than federal OSHA. A State Plan must be at least as effective as the federal standard and may be stricter, so check the ${osha.agency} rule rather than relying on the federal table alone.` : osha.kind === 'public-only' ? `${state.name} has a State Plan covering state and local government employees only. Private-sector construction sites in ${state.name} fall under federal OSHA, so 29 CFR 1926.51(c)(1) applies directly.` : `Private-sector construction in ${state.name} is under federal OSHA jurisdiction, so 29 CFR 1926.51(c)(1) applies: one toilet facility for 20 or fewer workers, then one toilet seat and one urinal per 40 workers, and per 50 once a crew passes 200.` },
  { q: `When is the busiest rental season in ${state.name}?`, a: `${state.name} works around ${season.label}. ${season.body} Booking earlier in that window gives more choice of unit type and delivery timing.` },
  { q: `What information should I have ready when I call?`, a: `Have the delivery ZIP code, dates, event attendance or crew size, preferred unit types, rental duration, and any gate, surface, clearance, or access details ready. This helps the rental desk confirm options faster.` },
];

const stateSchema = (state, title, description, faqs) => ({
  '@context': 'https://schema.org',
  '@graph': [
    organization,
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

// Rotate the wording of repeated template links so 48 pages do not share one anchor.
const anchorVariants = {
  day: ['one-day porta potty prices', 'porta potty cost per day', 'daily rental price ranges', 'what a one-day rental costs'],
  month: ['monthly porta potty prices', 'porta potty cost per month', 'monthly rental price ranges', 'long-term rental pricing'],
  units: ['Work out your unit count', 'Estimate how many units you need', 'Use the porta potty calculator', 'Size your order by crew or crowd'],
  standard: ['Standard Porta Potty', 'Standard Portable Toilet', 'Standard Porta Potty Rental', 'Standard Portable Restroom'],
  ada: ['Accessible Portable Restroom', 'ADA Portable Toilet', 'ADA Porta Potty Rental', 'Wheelchair-Accessible Unit'],
  trailer: ['Portable Restroom Trailer', 'Restroom Trailer Rental', 'Restroom Trailer', 'Bathroom Trailer Rental'],
  handwash: ['Handwashing Station', 'Portable Handwashing Station', 'Hand Wash Station Rental', 'Portable Sink Station'],
};

const statePage = (state) => {
  const variant = (key) => anchorVariants[key][states.indexOf(state) % anchorVariants[key].length];
  const title = `Porta Potty Rental in ${state.name}: Prices & Permits | Star Portable Restrooms`;
  const description = stateDescription(state);
  const season = seasonFor(state.name);
  const osha = oshaFor(state.name);
  const faqs = stateFaqs(state, season, osha);
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" />
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#c92536" />
  <link rel="stylesheet" href="/styles.css" />
  ${clarityTrackingScript}
  <script type="application/ld+json">${serializeSchema(schema)}</script>
</head>
<body class="location-page state-location-page" data-location-state="${escapeHtml(state.name)}">
${header('/location/')}
<main id="main" class="catalogue cat-page">
  ${pageHead({
    crumbs: [['/', 'Home'], ['/location/', 'Locations'], ['', escapeHtml(state.name)]],
    title: `Porta Potty Rental in ${escapeHtml(state.name)}`,
    lede: `Request information about portable toilet rental for an address in ${escapeHtml(state.name)}. Planning requests may involve ${escapeHtml(listSentence(state.cities))}; exact inventory, delivery, servicing, and pickup are confirmed by ZIP code.`,
    actions: `${callButton(`Call for ${escapeHtml(state.name)} availability`, 'state_head', `Toll-free ${phoneDisplay}`)}${sheetLink()}${ctaNote()}`,
    aside: `<div class="cat-label"><h2 class="cat-label__name">${escapeHtml(state.name)} at a glance</h2><dl class="cat-spec"><div><dt>Job sites</dt><dd>${osha.kind === 'state-plan' ? `${escapeHtml(osha.agency)} State Plan` : osha.kind === 'public-only' ? 'Federal OSHA (private sector)' : 'Federal OSHA'}</dd></div><div><dt>Region</dt><dd>${escapeHtml(state.region)}</dd></div><div><dt>Capital</dt><dd>${escapeHtml(state.capital)}</dd></div><div><dt>Season</dt><dd>${escapeHtml(season.label.charAt(0).toUpperCase() + season.label.slice(1))}</dd></div><div><dt>One day</dt><dd><strong>About ${priceSummary.standardDay.replace('–', ' to ')}</strong> per standard unit in published guides</dd></div></dl>${callButton(`Check ${escapeHtml(state.name)} availability`, 'state_plate', `Toll-free ${phoneDisplay}`)}<p class="cat-fine">This page does not represent a staffed office in ${escapeHtml(state.name)}. A vendor must confirm coverage and inventory for the exact address.</p></div>`,
  })}

  <section class="cat-section" aria-labelledby="ready-title"><div class="cat-wrap"><h2 id="ready-title">Have these ready when you call</h2><dl class="cat-facts"><div><dt>Delivery ZIP code</dt><dd>Confirms route availability.</dd></div><div><dt>Rental dates</dt><dd>Checks equipment scheduling.</dd></div><div><dt>Attendance or crew</dt><dd>Helps estimate quantity.</dd></div><div><dt>Site access</dt><dd>Plans placement and service.</dd></div></dl></div></section>

  ${unitStrip({ heading: 'Choose equipment for the site', intro: `Match the unit type to your guests, crew, site conditions, comfort expectations, accessibility needs, utilities, and budget. Add what you need to your call sheet for ${escapeHtml(state.name)}.`, names: { standard: variant('standard'), ada: variant('ada'), trailer: variant('trailer'), handwash: variant('handwash') } })}

  <section class="cat-section cat-section--surface" aria-labelledby="planning-title"><div class="cat-wrap cat-split"><div><h2 id="planning-title">Planning for events and job sites in ${escapeHtml(state.name)}</h2></div><div><p>Portable restroom needs vary across ${escapeHtml(state.name)}. Projects in ${escapeHtml(state.cities.slice(0, 3).join(', '))}, and surrounding communities may need different quantities, delivery windows, and service schedules based on attendance, crew size, rental length, and site access.</p>
        <p>${escapeHtml(state.note)}</p>
        <p>Planning here works around ${escapeHtml(season.label)}. ${escapeHtml(season.body)}</p>${season.source ? `<p><a href="${season.source}" target="_blank" rel="noopener">National Weather Service regional weather guide</a></p>` : ''}
        <p>Your inquiry may involve ${escapeHtml(state.focus)}. Share the exact address so a local provider can assess coverage and availability for your part of ${escapeHtml(state.name)}.</p><h3 class="cat-subhead">Requesting a quote in ${escapeHtml(state.name)}</h3><ul class="cat-list cat-cities">${marketLabels.map((label) => `<li>${escapeHtml(label)}</li>`).join('')}</ul><p class="cat-fine">This is a planning directory, not a promise of statewide delivery. Vendor coverage, equipment, and timing must be confirmed for each address, including ${escapeHtml(state.capital)} and rural areas.</p></div></div></section>

  <section class="cat-section cat-section--surface" id="prices-permits">
    <div class="cat-wrap">
      <div class="section-heading"><h2>Porta Potty Rental Prices and Permits in ${escapeHtml(state.name)}</h2><p>Star does not publish ${escapeHtml(state.name)} rates. The ranges below come from published national and regional guides, so use them to sanity-check a vendor quote for your address.</p></div>
      <div class="post-table-wrap"><table class="post-table"><caption>Published price ranges, checked ${pricesChecked}. Not ${escapeHtml(state.name)}-specific and not Star rates.</caption><thead><tr><th scope="col">Rental</th><th scope="col">Published range</th></tr></thead><tbody>
        <tr><th scope="row">Standard unit, one day</th><td>About ${priceSummary.standardDay}</td></tr>
        <tr><th scope="row">ADA-accessible unit, one day</th><td>About ${priceSummary.adaDay}</td></tr>
        <tr><th scope="row">Standard unit, one month</th><td>About ${priceSummary.standardMonth}</td></tr>
        <tr><th scope="row">Restroom trailer, one day</th><td>About ${priceSummary.trailerDay}</td></tr>
      </tbody></table></div>
      <p class="service-price-sources">Sources: <a href="${priceSources.fixr.href}" target="_blank" rel="noopener">${priceSources.fixr.label}</a> · <a href="${priceSources.royalFlush.href}" target="_blank" rel="noopener">${priceSources.royalFlush.label}</a> · <a href="${priceSources.premier.href}" target="_blank" rel="noopener">${priceSources.premier.label}</a>. Each source’s figures are in the guides to <a href="/blog/porta-potty-cost-per-day/">${variant('day')}</a> and <a href="/blog/porta-potty-cost-per-month/">${variant('month')}</a>.</p>
      <h3>Permits for portable toilets in ${escapeHtml(state.name)}</h3>
      <p>Ask the city or county office responsible for the delivery address whether the placement needs approval${state.cities[0] === state.capital ? `, in ${escapeHtml(state.capital)} or elsewhere in ${escapeHtml(state.name)}` : `, for example in ${escapeHtml(state.cities[0])}, ${escapeHtml(state.capital)}, or a smaller community`}. Placements on a street, sidewalk, park, or event site are the cases to check first, and private land is not automatically exempt. Read <a href="/blog/do-you-need-a-permit-for-a-porta-potty/">when a porta potty needs a permit</a>, or use <a href="https://www.usa.gov/local-governments" target="_blank" rel="noopener">USAGov’s local government finder</a> to reach the right office.</p>
    </div>
  </section>

  <section class="cat-section" id="job-site-rules">
    <div class="cat-wrap cat-rules">
      <div>
        <h2>Construction Sanitation Rules in ${escapeHtml(state.name)}</h2>
        ${osha.kind === 'state-plan' ? `
        <p>${escapeHtml(state.name)} runs its own OSHA-approved State Plan, so construction sanitation on private job sites is enforced by ${escapeHtml(osha.agency)} rather than federal OSHA. A State Plan must be at least as effective as the federal standard and is permitted to be stricter, so check the ${escapeHtml(osha.agency)} rule directly rather than assuming the federal table is the whole picture.</p>
        <p>The federal baseline it has to match is 29 CFR 1926.51(c)(1): one toilet facility for 20 or fewer workers, then one toilet seat and one urinal per 40 workers, and per 50 workers once a crew passes 200.</p>` : osha.kind === 'public-only' ? `
        <p>${escapeHtml(state.name)} operates a State Plan that covers state and local government employees only. Private-sector construction sites stay under federal OSHA, so 29 CFR 1926.51(c)(1) applies directly: one toilet facility for 20 or fewer workers, then one toilet seat and one urinal per 40 workers, and per 50 workers once a crew passes 200.</p>
        <p>If your project is a state or municipal job, confirm which set of rules the contract actually puts you under before you size the order — the two can differ.</p>` : `
        <p>Private-sector construction in ${escapeHtml(state.name)} falls under federal OSHA jurisdiction, so 29 CFR 1926.51(c)(1) Table D-1 applies directly: one toilet facility for 20 or fewer workers, then one toilet seat and one urinal per 40 workers, and per 50 workers once a crew passes 200.</p>
        <p>That table is a legal minimum rather than a comfort target. Crews spread across a large ${escapeHtml(state.name)} site often justify more units than the count alone suggests, simply because walking time is real money.</p>`}
        <p>Accessibility is federal everywhere: where portable toilets are clustered, the 2010 ADA Standards require at least 5% and never fewer than one accessible unit per cluster. Local permit conditions in ${escapeHtml(state.capital)} and other ${escapeHtml(state.name)} jurisdictions may add requirements on top.</p>
        <a class="text-link" href="/blog/porta-potty-ratio-guide/">${variant('units')}</a>
      </div>
    </div>
  </section>

  <section class="cat-section cat-section--surface"><div class="cat-wrap cat-split"><div><h2>Details to confirm with the vendor</h2><p>Requests may come from major metros, smaller communities, rural properties, event venues, and active job sites. Because route capacity and equipment inventory change, every order begins with the delivery address.</p></div><div><h3 class="cat-subhead">What affects delivery and pricing?</h3><ul class="cat-list cat-list--one"><li>Distance and current route availability</li><li>Unit type, quantity, and rental duration</li><li>Delivery surface, gate, and truck clearance</li><li>Cleaning, pumping, and restocking frequency</li><li>Event timing, pickup window, and special access</li></ul></div></div></section>

  <section class="cat-section"><div class="cat-wrap"><h2>Match the setup to your project</h2><p>Choose a sanitation plan around the people using the site, how long units will remain, and how service trucks can safely reach them.</p><ul class="cat-list"><li><h3>Construction & Long-Term Work</h3><p>Job-site porta potties, handwashing stations, recurring pumping, cleaning, deodorizing, and supply restocking.</p></li><li><h3>Weddings & Private Events</h3><p>Clean standard units, accessible restrooms, or upgraded trailers planned around venue access and guest count.</p></li><li><h3>Festivals & Public Gatherings</h3><p>Quantity planning for attendance, duration, food and alcohol service, accessible use, and high-traffic placement.</p></li><li><h3>Commercial & Temporary Facilities</h3><p>Portable sanitation for warehouses, outages, renovations, seasonal operations, and remote or temporary work areas.</p></li></ul></div></section>

  <section class="cat-section cat-section--surface"><div class="cat-wrap cat-split"><div><h2>From inquiry to a confirmed vendor booking</h2><p>Share the request with Star, then confirm coverage, equipment, price, and service arrangements with the selected vendor.</p></div><ol class="cat-steps"><li><h3>Share the address and dates</h3><p>Provide the ZIP code, delivery and pickup dates, site type, and access notes.</p></li><li><h3>Review units and pricing</h3><p>Discuss quantities, accessible options, trailers, handwashing, and service frequency.</p></li><li><h3>Coordinate delivery and service</h3><p>Confirm placement, arrival timing, recurring maintenance when needed, and pickup.</p></li></ol></div></section>

  <section class="cat-section" id="state-faqs"><div class="cat-wrap cat-split"><div><h2>Porta Potty Rental FAQs for ${escapeHtml(state.name)}</h2><p>Answers about pricing, local availability, event quantities, construction rentals, restroom trailers, and call preparation.</p></div><div class="faq-list">${faqs.map(({ q, a }, index) => `<article class="faq-item${index === 0 ? ' open' : ''}" data-faq-item><button class="faq-question" type="button" aria-expanded="${index === 0}" data-faq-button>${escapeHtml(q)}<span class="faq-plus">+</span></button><div class="faq-answer"><div><p>${escapeHtml(a)}</p></div></div></article>`).join('')}</div></div></section>

  <section class="cat-section cat-section--surface" aria-labelledby="related-title"><div class="cat-wrap cat-split"><div><h2 id="related-title">Related Porta Potty Rental Locations</h2><p>More ${escapeHtml(state.region)} planning pages, or <a href="/location/">view all states</a>.</p></div><ul class="cat-links">${related.map((item) => `<li><a href="/location/${item.slug}/"><span>${item.code}</span><strong>Porta Potty Rental in ${escapeHtml(item.name)}</strong></a></li>`).join('')}</ul></div></section>

  ${callSheet({ note: `The sheet adds ${escapeHtml(state.name)} to your request.` })}
</main>
${footer}
<script type="module" src="/script.js"></script>
</body>
</html>`;
};

const regionOrder = ['Northeast', 'Midwest', 'South', 'West'];
const groupedStates = regionOrder.map((region) => ({ region, states: states.filter((state) => state.region === region) }));

const hubTitle = 'Rental Locations by State | Star Portable Restrooms';
const hubDescription = 'Find porta potty rental locations by state. Call Star for portable toilet availability, delivery, servicing, restroom trailers, and pricing near you.';
const hubSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    organization,
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" />
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#c92536" />
  <link rel="stylesheet" href="/styles.css" />
  ${clarityTrackingScript}
  <script type="application/ld+json">${serializeSchema(hubSchema)}</script>
</head>
<body class="location-page location-hub-page">
${header('/location/')}
<main id="main" class="catalogue cat-page">
  ${pageHead({
    crumbs: [['/', 'Home'], ['', 'Locations']],
    title: 'Porta Potty Rental Locations Across the USA',
    lede: `Explore portable toilet and portable restroom rental planning by state. Select a location, then call with the exact delivery ZIP code to confirm current inventory, route availability, service options, and pricing.`,
    actions: `${callButton('Call the rental desk', 'hub_head', `Toll-free ${phoneDisplay}`)}${sheetLink()}${ctaNote()}`,
    aside: `<div class="cat-label"><h2 class="cat-label__name">How state pages work</h2><dl class="cat-spec"><div><dt>Pick a state</dt><dd>Review local planning guidance and the OSHA jurisdiction.</dd></div><div><dt>Share the ZIP</dt><dd>Coverage is confirmed for the exact delivery address.</dd></div><div><dt>Describe the job</dt><dd>Units, dates, crowd or crew, and site access.</dd></div><div><dt>Get the quote</dt><dd>A local vendor confirms price, delivery and service.</dd></div></dl>${callButton('Check coverage for your ZIP', 'hub_plate', `Toll-free ${phoneDisplay}`)}<p class="cat-fine">The directory provides state-level planning information. Service is confirmed for each delivery address.</p></div>`,
  })}

  <section class="cat-section state-directory-section" id="state-directory">
    <div class="cat-wrap"><div class="state-directory-head"><div><h2>Find a Porta Potty Rental Location by State</h2><p>Each state page covers portable toilet options, common event and construction needs, delivery considerations, major markets, FAQs, and a direct call path.</p></div><label class="state-search"><span>Search states</span><input type="search" placeholder="Enter a state name" autocomplete="off" data-state-search /></label></div><p class="state-search-empty" data-state-empty hidden>No states match that search.</p><div class="state-region-groups">${groupedStates.map(({ region, states: regionStates }) => `<section class="state-region-group" data-state-region><div class="state-region-title"><h3>${region}</h3><small>${regionStates.length} states</small></div><div class="state-card-grid">${regionStates.map((state) => `<a class="state-link-card" href="/location/${state.slug}/" data-state-card data-state-name="${state.name.toLowerCase()}"><span>${state.code}</span><div><strong>${escapeHtml(state.name)}</strong><small>Porta potty rental</small></div></a>`).join('')}</div></section>`).join('')}</div></div>
  </section>

  <section class="cat-section cat-section--surface"><div class="cat-wrap cat-split"><div><h2>Portable Toilet Rental Help for Events and Job Sites</h2><p>Customers searching for a “porta potty rental near me” usually need fast answers about nearby inventory, delivery timing, rental cost, unit quantity, and servicing. State pages help organize that information, but the exact address is what determines real availability.</p><p>Rental options may include standard portable toilets, accessible portable restrooms, restroom trailers, and handwashing stations for construction, festivals, weddings, commercial sites, private gatherings, and temporary facilities.</p></div><ul class="cat-list cat-list--one"><li><h3>Event rentals</h3><p>Plan around attendance, duration, food and alcohol service, accessibility, and venue access.</p></li><li><h3>Construction rentals</h3><p>Coordinate job-site placement, recurring cleaning, pumping, restocking, and pickup.</p></li><li><h3>Trailer rentals</h3><p>Review power, water, level ground, truck access, guest expectations, and utilities.</p></li></ul></div></section>

  ${callSheet()}
</main>
${footer}
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
  { path: '/about/', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog/', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact/', changefreq: 'monthly', priority: '0.9' },
  { path: '/privacy/', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms/', changefreq: 'yearly', priority: '0.3' },
  { path: '/location/', changefreq: 'weekly', priority: '0.9' },
  { path: '/service/', changefreq: 'monthly', priority: '0.9' },
  { path: '/service/standard-porta-potty-rental/', changefreq: 'monthly', priority: '0.9' },
  { path: '/service/ada-portable-toilet-rental/', changefreq: 'monthly', priority: '0.9' },
  { path: '/service/restroom-trailer-rental/', changefreq: 'monthly', priority: '0.9' },
  { path: '/service/portable-handwashing-station-rental/', changefreq: 'monthly', priority: '0.9' },
];
const locationUrls = states.map((state) => ({ path: `/location/${state.slug}/`, changefreq: 'monthly', priority: '0.8' }));
const blogUrls = blogPosts.map((post) => ({ path: `/blog/${post.slug}/`, changefreq: 'monthly', priority: '0.7' }));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...blogUrls, ...locationUrls].map((item) => `  <url><loc>${siteUrl}${item.path}</loc></url>`).join('\n')}
</urlset>\n`;
writeFileSync(resolve(root, 'sitemap.xml'), sitemap);
writeFileSync(resolve(root, 'public', 'sitemap.xml'), sitemap);

console.log(`Generated location hub, ${states.length} state pages, and ${staticUrls.length + blogUrls.length + locationUrls.length} sitemap URLs.`);
