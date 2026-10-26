// Published third-party price examples, checked October 26, 2026. They are not
// Star rates. Quote each figure exactly as its source labels it, and recheck the
// pages before changing a number or the "checked" date.

export const pricesChecked = 'October 26, 2026';

export const priceSources = {
  fixr: { name: 'Fixr', scope: 'national, updated January 31, 2025', label: 'Fixr — Portable toilet rental cost guide (updated January 31, 2025)', href: 'https://www.fixr.com/costs/portable-toilets' },
  royalFlush: { name: 'A Royal Flush', scope: 'CT, NY, and NJ, September 4, 2026', label: 'A Royal Flush — Northeast price guide (September 4, 2026)', href: 'https://www.aroyalflush.com/2026/09/04/how-much-does-a-porta-potty-rental-cost/' },
  premier: { name: 'Premier Portable Solutions', scope: 'Albuquerque, NM, January 15, 2026', label: 'Premier Portable Solutions — Albuquerque one-day rental guide (January 15, 2026)', href: 'https://premierportablesolutions.com/can-you-rent-a-porta-potty-for-a-day-near-albuquerque/' },
};

export const sourceList = (...keys) => keys.map((key) => [priceSources[key].label, priceSources[key].href]);

const notPublished = 'Not published';
const column = (key) => `${priceSources[key].name} (${priceSources[key].scope})`;

// One-day prices per unit. Royal Flush's deluxe row is a flushing unit; Premier's
// deluxe row is a non-flushing upgraded unit, so the row label stays general.
export const dailyTable = {
  caption: `Published one-day prices per unit, checked ${pricesChecked}`,
  head: ['Equipment', column('fixr'), column('royalFlush'), column('premier')],
  rows: [
    ['Standard unit', '$80–$125', '$75–$200', '$75–$95'],
    ['ADA-accessible unit', '$150–$225', notPublished, '$110–$125'],
    ['Deluxe unit (features vary)', '$200–$350', '$125–$300 (flushing)', '$95–$115'],
    ['Handwashing station', 'About $155 per week', notPublished, '$25–$40 per day'],
  ],
};

export const longerTable = {
  caption: `Published weekend, weekly, and monthly prices, checked ${pricesChecked}`,
  head: ['Rental period', column('fixr'), column('royalFlush')],
  rows: [
    ['Weekend, standard unit', '$125–$175', notPublished],
    ['One week, standard unit', '$150–$300', '$100–$350'],
    ['One month, standard unit', '$100–$500 (unit type not specified)', '$100–$300, service included'],
    ['One month, deluxe flushing unit', notPublished, '$175–$550, service included'],
  ],
};

export const trailerTable = {
  caption: `Published restroom trailer prices, checked ${pricesChecked}`,
  head: ['Rental period', column('fixr'), column('royalFlush')],
  rows: [
    ['Per day', notPublished, '$300–$2,500+'],
    ['Per weekend', 'About $900–$3,000', notPublished],
    ['Per week', notPublished, '$500–$5,000+'],
    ['Per month', notPublished, 'Quote-based'],
  ],
};

// Short summaries used in snippets, FAQs, and state pages. They must stay within
// the ranges in the tables above.
export const priceSummary = {
  standardDay: '$75–$200',
  adaDay: '$110–$225',
  standardMonth: '$100–$500',
  trailerDay: '$300–$2,500+',
  trailerWeekend: '$900–$3,000',
};
