import { phoneDisplay, phoneHref, phoneIcon, deskHours } from './site.mjs';
import { priceSummary } from './price-data.mjs';

// The catalogue: the same four units, the same label facts, and the same call
// sheet on every page. Prices must match price-data.mjs; the homepage copy of
// these labels lives in index.html and has to be kept in step with this file.

const adaPlan = `<svg class="cat-plan" viewBox="0 0 300 360" role="img" aria-label="Plan drawing of an accessible portable toilet: a wide cabin with a ground-level doorway, grab bars and a 60-inch turning circle"><rect x="20" y="20" width="260" height="300" rx="6" fill="none" stroke="currentColor" stroke-width="3"/><line class="cat-plan__gap" x1="90" y1="320" x2="210" y2="320" stroke-width="6"/><path d="M90 320 A120 120 0 0 1 210 200" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/><line x1="210" y1="320" x2="210" y2="200" stroke="currentColor" stroke-width="2"/><rect x="196" y="40" width="64" height="78" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="228" cy="96" rx="22" ry="16" fill="none" stroke="currentColor" stroke-width="2"/><line x1="270" y1="70" x2="270" y2="190" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><line x1="150" y1="30" x2="250" y2="30" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle class="cat-plan__accent" cx="128" cy="178" r="96" fill="none" stroke-width="2" stroke-dasharray="6 5"/><line class="cat-plan__accent" x1="32" y1="178" x2="224" y2="178" stroke-width="1"/><text x="128" y="170" text-anchor="middle" class="cat-plan__dim">60 in. turning space</text><text x="150" y="346" text-anchor="middle" class="cat-plan__note">Ground-level doorway</text></svg>`;

export const units = [
  {
    key: 'standard', slug: 'standard-porta-potty-rental', name: 'Standard porta potty', one: 'standard unit', many: 'standard units',
    image: { src: '/assets/catalogue/standard-restroom-507.webp', srcset: '/assets/catalogue/standard-restroom-420.webp 420w, /assets/catalogue/standard-restroom-507.webp 507w', width: 507, height: 727, alt: 'Standard portable toilet with a blue cabin and white roof' },
    facts: [
      ['What it is', 'One cabin over a sealed holding tank, with a vent, a self-closing lockable door and a paper dispenser.'],
      ['Needs', 'Firm, level ground and a truck route. No power or water.'],
      ['One day', `<strong>About ${priceSummary.standardDay.replace('–', ' to ')}</strong> per unit in published guides`],
    ],
    short: `About ${priceSummary.standardDay.replace('–', ' to ')} a day`,
  },
  {
    key: 'ada', slug: 'ada-portable-toilet-rental', name: 'ADA portable toilet', one: 'ADA unit', many: 'ADA units',
    drawing: adaPlan,
    facts: [
      ['What it is', 'A larger cabin with ground-level entry, a wider door, grab rails and room to turn a wheelchair.'],
      ['Needs', 'Firm, level ground and an approach route a wheelchair can use.'],
      ['How many', 'At least 5% of clustered units, and never fewer than one per cluster (2010 ADA Standards).'],
      ['One day', `<strong>About ${priceSummary.adaDay.replace('–', ' to ')}</strong> per unit in published guides`],
    ],
    short: `About ${priceSummary.adaDay.replace('–', ' to ')} a day`,
  },
  {
    key: 'trailer', slug: 'restroom-trailer-rental', name: 'Restroom trailer', one: 'restroom trailer', many: 'restroom trailers', wide: true,
    image: { src: '/assets/catalogue/restroom-trailer-957.webp', srcset: '/assets/catalogue/restroom-trailer-560.webp 560w, /assets/catalogue/restroom-trailer-957.webp 957w', width: 957, height: 632, alt: 'Black two-door restroom trailer with fold-down steps and a tow hitch' },
    facts: [
      ['What it is', 'Flushing toilets, running-water sinks and interior lighting. Many models add climate control.'],
      ['Needs', 'A power connection, a water supply or filled tank, a level pad and room to tow and set up.'],
      ['One day', `<strong>About ${priceSummary.trailerDay.replace('–', ' to ')}</strong> in a Northeast vendor's guide; about ${priceSummary.trailerWeekend.replace('–', ' to ')} a weekend nationally`],
    ],
    short: `About ${priceSummary.trailerDay.replace('–', ' to ')} a day`,
  },
  {
    key: 'handwash', slug: 'portable-handwashing-station-rental', name: 'Handwashing station', one: 'handwashing station', many: 'handwashing stations',
    image: { src: '/assets/catalogue/handwash-station-515.webp', srcset: '/assets/catalogue/handwash-station-360.webp 360w, /assets/catalogue/handwash-station-515.webp 515w', width: 515, height: 606, alt: 'Green two-basin portable handwashing station with foot pumps and towel dispensers' },
    facts: [
      ['What it is', 'A fresh-water tank, foot pumps, basins and soap, with the used water held in a separate tank.'],
      ['Needs', 'No plumbing. A spot beside the toilets or the food area.'],
      ['Price', '<strong>About $25 to $40 a day</strong> from one vendor; about $155 a week nationally'],
    ],
    short: 'About $25 to $40 a day',
  },
];

export const unitBySlug = (slug) => units.find((unit) => unit.slug === slug);

export const pick = (unit) => `<div class="cat-pick" data-pick="${unit.key}"><span class="cat-pick__label" id="pick-${unit.key}">On your call sheet</span><div class="cat-pick__control" role="group" aria-labelledby="pick-${unit.key}"><button type="button" data-step="-1" aria-label="Remove a ${unit.one}">&minus;</button><output data-qty aria-live="polite">0</output><button type="button" data-step="1" aria-label="Add a ${unit.one}">+</button></div></div>`;

/** A call button. With `sub`, the label says why to call and the number sits under it. */
export const callButton = (label = `Call ${phoneDisplay}`, placement = '', sub = '') => sub
  ? `<a class="cat-call cat-call--stack" href="tel:${phoneHref}"${placement ? ` data-cta-location="${placement}"` : ''}>${phoneIcon}<span><strong>${label}</strong><small>${sub}</small></span></a>`
  : `<a class="cat-call" href="tel:${phoneHref}"${placement ? ` data-cta-location="${placement}"` : ''}>${phoneIcon}${label}</a>`;

/** The friction note under a primary call button. Every claim in it is literal: the number is toll-free and a call commits nobody. */
export const ctaNote = () => `<p class="cat-cta-note">Toll-free, no obligation. ${deskHours}.</p>`;

/** A primary call: a labelled button with the number, and the friction note. */
export const primaryCall = (label, placement) => `${callButton(label, placement, `Toll-free ${phoneDisplay}`)}${ctaNote()}`;

/** The call prompt placed inside a guide, after its first section. */
export const guideCall = ({ heading, line, label }) => `<aside class="post-call" aria-label="Call the rental desk"><div><p class="post-call__heading">${heading}</p><p>${line}</p></div><div class="post-call__action">${primaryCall(label, 'post_inline')}</div></aside>`;

export const unitFigure = (unit, sizes = '(max-width: 860px) 52vw, 30vw', eager = false) => unit.drawing
  ? `<figure class="cat-object__figure cat-object__figure--drawing">${unit.drawing}</figure>`
  : `<figure class="cat-object__figure"><img src="${unit.image.src}" srcset="${unit.image.srcset}" sizes="${sizes}" alt="${unit.image.alt}" width="${unit.image.width}" height="${unit.image.height}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} /></figure>`;

/** A spec label: name, facts in a fixed order, the picker, and optionally a call button. */
export const unitLabel = (unit, { level = 'h3', link = true, call = false, extraClass = '' } = {}) => `<div class="cat-label${extraClass ? ` ${extraClass}` : ''}"><${level} class="cat-label__name">${link ? `<a href="/service/${unit.slug}/">${unit.name}</a>` : unit.name}</${level}><dl class="cat-spec">${unit.facts.map(([dt, dd]) => `<div><dt>${dt}</dt><dd>${dd}</dd></div>`).join('')}</dl>${pick(unit)}${call ? callButton(`Call ${phoneDisplay}`, 'unit_label') : ''}</div>`;

/** The four units in a row, each with a picker. `names` lets a page vary the link text. */
export const unitStrip = ({ heading, intro, names = {}, exclude = '' }) => {
  const list = units.filter((unit) => unit.slug !== exclude);
  return `<section class="cat-strip" aria-labelledby="strip-title"><div class="cat-wrap"><div class="cat-strip__head"><h2 id="strip-title">${heading}</h2>${intro ? `<p>${intro}</p>` : ''}</div><ul class="cat-strip__list cat-strip__list--${list.length}">${list.map((unit) => `<li class="cat-strip__item">${unitFigure(unit, '(max-width: 860px) 40vw, 18vw')}<h3><a href="/service/${unit.slug}/">${names[unit.key] || unit.name}</a></h3><p>${unit.short}</p>${pick(unit)}</li>`).join('')}</ul></div></section>`;
};

/** The closing call sheet. The script writes the sentence from what the visitor picked. */
export const callSheet = ({ note = '' } = {}) => `<section class="cat-sheet" id="call-sheet" aria-labelledby="sheet-title"><div class="cat-wrap cat-sheet__plate"><div class="cat-sheet__head"><h2 id="sheet-title">Your call sheet</h2><p>Read this out when you call. It stays on this device; nothing is sent anywhere.</p></div><p class="cat-sheet__script" data-sheet-script>Hi, I'm looking for a porta potty rental. What's available near me, and what would it cost?</p><dl class="cat-spec cat-sheet__spec"><div><dt>Units</dt><dd data-sheet-units>None picked yet. You can add units on this page or ask on the call.</dd></div><div><dt>Crowd</dt><dd data-sheet-crowd>Not set</dd></div><div><dt><label for="sheet-zip">Delivery ZIP</label></dt><dd><input id="sheet-zip" type="text" inputmode="numeric" autocomplete="postal-code" placeholder="e.g. 67202" data-sheet-zip /></dd></div><div><dt><label for="sheet-date">Delivery date</label></dt><dd><input id="sheet-date" type="date" data-sheet-date /></dd></div></dl><div class="cat-sheet__actions"><a class="cat-sheet__call" href="tel:${phoneHref}" data-cta-location="call_sheet">${phoneIcon}<span>Call <strong>${phoneDisplay}</strong></span></a><button type="button" class="cat-sheet__copy" data-sheet-copy>Copy the sheet</button><button type="button" class="cat-sheet__clear" data-sheet-clear>Start over</button></div><p class="cat-fine">The desk is open ${deskHours}. Star passes rental inquiries to local providers, who confirm coverage, availability and the final price.${note ? ` ${note}` : ''}</p></div></section>`;

/** A light page head: breadcrumb, title, lede, actions, and a plate on the right. */
export const pageHead = ({ crumbs = [], title, lede = '', actions = '', aside = '', extraClass = '' }) => `<section class="cat-head${extraClass ? ` ${extraClass}` : ''}" data-page-head><div class="cat-wrap cat-head__grid"><div class="cat-head__copy">${crumbs.length ? `<nav class="cat-crumbs" aria-label="Breadcrumb">${crumbs.map(([href, label], index) => (index === crumbs.length - 1 ? `<span aria-current="page">${label}</span>` : `<a href="${href}">${label}</a>`)).join('<span aria-hidden="true">/</span>')}</nav>` : ''}<h1>${title}</h1>${lede ? `<p class="cat-head__lede">${lede}</p>` : ''}${actions ? `<div class="cat-head__actions">${actions}</div>` : ''}</div>${aside ? `<div class="cat-head__aside">${aside}</div>` : ''}</div></section>`;

export const sheetLink = () => `<a class="cat-head__sheet cat-index__sheet" href="#call-sheet">Your call sheet <span data-sheet-count>0</span></a>`;
