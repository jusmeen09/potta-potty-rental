import { dailyTable, longerTable, priceSummary, sourceList } from './price-data.mjs';
import { sizingCalculator } from './sizing-calculator.mjs';
import { phoneDisplay, phoneHref } from './site.mjs';

const modelSource = ['PolyJohn — PJN3 specifications and model instructions', 'https://www.polyjohn.com/pjn3-product'];
const localSource = ['USAGov — Find your local government', 'https://www.usa.gov/local-governments'];
const related = {
  'how-do-porta-potties-work': ['what-is-the-blue-liquid-in-porta-potties', 'how-to-clean-a-porta-potty'],
  'what-is-the-blue-liquid-in-porta-potties': ['how-do-porta-potties-work', 'porta-potty-usage-guide'],
  'porta-potty-cleaner-salary': ['how-to-clean-a-porta-potty', 'how-do-porta-potties-work'],
  'how-to-clean-a-porta-potty': ['porta-potty-usage-guide', 'porta-potty-cost-per-month'],
  'can-you-put-tampons-in-a-porta-potty': ['porta-potty-usage-guide', 'how-to-clean-a-porta-potty'],
  'is-it-illegal-to-use-a-porta-potty': ['do-you-need-a-permit-for-a-porta-potty', 'can-i-put-a-porta-potty-in-my-backyard'],
  'do-you-need-a-permit-for-a-porta-potty': ['can-i-put-a-porta-potty-in-my-backyard', 'porta-potty-ratio-guide'],
  'can-i-put-a-porta-potty-in-my-backyard': ['do-you-need-a-permit-for-a-porta-potty', 'portable-toilet-rental-checklist'],
  'how-to-make-a-porta-potty-look-nice': ['porta-potty-options-comparison', 'portable-toilet-rental-checklist'],
  'portable-toilet-rental-checklist': ['porta-potty-ratio-guide', 'porta-potty-options-comparison'],
  'porta-potty-ratio-guide': ['portable-toilet-rental-checklist', 'porta-potty-cost-per-day'],
  'porta-potty-options-comparison': ['porta-potty-cost-per-day', 'porta-potty-ratio-guide'],
  'porta-potty-cost-per-day': ['porta-potty-cost-per-month', 'porta-potty-options-comparison'],
  'porta-potty-cost-per-month': ['porta-potty-cost-per-day', 'porta-potty-ratio-guide'],
  'porta-potty-usage-guide': ['how-to-clean-a-porta-potty', 'can-you-put-tampons-in-a-porta-potty'],
  'how-much-does-a-porta-potty-weigh': ['porta-potty-indoor-placement', 'portable-toilet-rental-checklist'],
  'porta-potty-indoor-placement': ['how-much-does-a-porta-potty-weigh', 'do-you-need-a-permit-for-a-porta-potty'],
};

export function improvePosts(posts) {
  const find = slug => posts.find(p => p.slug === slug);
  for (const p of posts) { p.related = related[p.slug]; p.updated = '2026-10-09'; }
  find('porta-potty-ratio-guide').metaTitle = 'How Many Porta Potties Do I Need? | Star Portable Restrooms';
  const ratio = find('porta-potty-ratio-guide');
  ratio.sections.splice(3, 0, {h2: 'Event planning examples from the PSAI chart', body: ['The PSAI special-event chart uses average crowd size and hours, assumes a 50/50 mix of men and women, and no pumping during the event. These examples are a starting point, not a permit minimum or a promise of queue-free service.'], table: {caption: 'Selected PSAI special-event planning examples', head: ['Average crowd', '4 hours', '8 hours'], rows: [['500', '5 units', '9 units'], ['1,000', '8 units', '12 units'], ['2,000', '12 units', '20 units']]}, after: ['For example, an average crowd of 1,000 over four hours starts at eight units in this chart. An eight-hour event starts at twelve. Review peak arrivals, alcohol, weather, existing facilities, accessible units, handwashing, and local conditions with the vendor before booking.']});
  ratio.sources.push(['PSAI — Special event chart and assumptions', 'https://assets.noviams.com/novi-file-uploads/psai/PDFs_and_Documents/psai-extended-chart-2f39b55e.pdf']);
  ratio.title = 'How Many Porta Potties Do I Need? Calculator and Chart';
  ratio.metaTitle = 'How Many Porta Potties Do I Need? Calculator & Chart | Star Portable Restrooms';
  ratio.description = 'How many porta potties do you need? Use the calculator built on the PSAI event chart and the OSHA job-site table, with accessible units per restroom location.';
  ratio.dek = 'Enter your crowd and hours, or your crew size, for a starting count from the published charts. The guide below explains when to plan for more.';
  ratio.sections.unshift({h2: 'Porta potty calculator', body: ['For events, the calculator reads the PSAI special-event chart: the smallest chart row at or above your crowd, for the hours you select. For job sites, it applies the OSHA construction table. Accessible units are counted per restroom location under the 2010 ADA Standards.'], html: sizingCalculator(phoneHref, phoneDisplay), after: ['The PSAI chart starts at 500 people and assumes no pumping during the event, so smaller gatherings use the 500 row. For crowds above 20,000, ask the vendor for a site plan.']});
  ratio.updated = '2026-10-26';
  ratio.takeaways[2] = 'Alcohol, weather, and peak demand may require a revised vendor plan.';
  ratio.faqs[2][1] = 'Ask the provider to account for beverage service, event length, and peak demand when sizing the equipment and service plan.';
  find('porta-potty-options-comparison').metaTitle = 'Porta Potty vs Restroom Trailer | Star Portable Restrooms';
  const day = find('porta-potty-cost-per-day');
  day.title = 'How Much Does a Porta Potty Cost for One Day? (2026 Prices)';
  day.metaTitle = 'Porta Potty Rental Cost Per Day: 2026 Prices | Star Portable Restrooms';
  day.dek = `Published one-day prices for a standard porta potty run about ${priceSummary.standardDay} per unit, and ADA units about ${priceSummary.adaDay}. Here is what each source found and what the total quote should include.`;
  day.description = `Porta potty rental cost per day: published prices run about ${priceSummary.standardDay} for a standard unit and ${priceSummary.adaDay} for ADA. Compare three sources and what a quote includes.`;
  day.sections.unshift({h2: 'Published one-day prices from three sources', body: [`A standard porta potty costs about ${priceSummary.standardDay} per unit for one day across the three published guides below. ADA-accessible units run higher, at about ${priceSummary.adaDay}, and deluxe units with sinks or flushing cost more again.`, 'One source is a national cost guide; the other two are vendors publishing their own prices, one in the Northeast and one in Albuquerque, New Mexico. They are third-party figures, not Star rates, and your local quote can fall outside them.'], table: dailyTable, after: ['The Northeast vendor’s ranges, published for New York, New Jersey, and Connecticut, are the widest, which fits a dense, high-cost market with weekend demand. The Albuquerque vendor sits at the low end. Delivery distance and the date usually explain more of the difference than the unit itself.']});
  day.sections.splice(1, 0, {h2: 'Weekend and longer rentals', body: [`If the event runs past one day, compare weekend and weekly prices before booking extra single days. Fixr lists a weekend at $125–$175 per standard unit, close to its one-day range.`], table: longerTable, after: ['For rentals of a month or longer, servicing becomes the main cost. Monthly rentals are priced on a different basis, so ask about them separately.']});
  day.sections.push({h2: 'Compare the full event package', body: ['Ask for a written total covering the unit count, type, delivery address, setup deadline, and pickup window. A one-day event package is not one thirtieth of a monthly rental.', 'Ask how delayed access, extra attendance, or a later pickup changes the quote. Star passes rental inquiries to providers; your vendor confirms the price and booking.'], table: {caption: 'Before accepting a quote', head: ['Line item', 'What to confirm'], rows: [['Rental window', 'Dates, setup deadline, collection window, and extra-day terms'], ['Transport', 'Delivery, setup, collection, and any access charge'], ['Service and supplies', 'Initial stock and any on-site pumping or cleaning visit'], ['Other charges', 'Taxes, cancellation, damage, and missed-access terms']]}});
  day.sources.push(...sourceList('fixr', 'royalFlush', 'premier'));
  day.links.push({ href: '/location/new-mexico/', anchor: 'New Mexico' }, { href: '/location/new-york/', anchor: 'New York' });
  day.takeaways = [`Published one-day prices for a standard unit run about ${priceSummary.standardDay}.`, `ADA-accessible units run about ${priceSummary.adaDay} for one day.`, 'Delivery distance, date, and quantity move the price more than the unit.', 'These are third-party figures; your local vendor confirms the actual quote.'];
  day.faqs[0][1] = `Published one-day prices for a standard unit run about ${priceSummary.standardDay}, based on Fixr’s national guide and two vendors’ published prices. ADA units run about ${priceSummary.adaDay}. These are not Star rates; ask a vendor for an itemized quote for your address and date.`;
  day.faqs[3][1] = 'Have the vendor state whether delivery and pickup are included, which collection window applies, and whether extra trips or delayed access cost more.';
  day.faqs.splice(1, 0, ['How much does an ADA porta potty cost for a day?', `Published one-day prices for an ADA-accessible unit run about ${priceSummary.adaDay}: Fixr lists $150–$225 nationally and an Albuquerque vendor lists $110–$125. Confirm the model’s features with the vendor.`]);
  const month = find('porta-potty-cost-per-month');
  month.title = 'How Much Is a Porta Potty per Month? (2026 Prices)';
  month.metaTitle = 'Porta Potty Cost Per Month: 2026 Prices | Star Portable Restrooms';
  month.dek = `Published monthly prices for a standard porta potty run about ${priceSummary.standardMonth} per unit. Servicing, not delivery, decides where your quote lands in that range.`;
  month.description = `Porta potty cost per month: published prices run about ${priceSummary.standardMonth} per standard unit. Compare sources, weekly service, billing cycles, and quote questions.`;
  month.sections.unshift({h2: 'Published monthly prices', body: [`A standard porta potty costs about ${priceSummary.standardMonth} per unit per month in the published guides below. A Northeast vendor lists $100–$300 with weekly servicing included; Fixr’s national guide lists $100–$500 for one month without naming the unit type.`, 'Deluxe flushing units cost more, at $175–$550 a month in the Northeast guide. These are third-party figures, not Star prices or guaranteed local quotes. Confirm transport, taxes, and the billing cycle separately.'], table: longerTable});
  month.sections.push({h2: 'Check billing cycles and extensions', body: ['Ask whether “monthly” means a calendar month or 28 days, how partial periods are billed, and how much notice is needed for pickup. Confirm the rate for extra service visits and which supplies are replenished.', 'Budget the equipment charges for the agreed cycles, plus transport, extra visits, taxes, and agreed access charges. If your crew, shifts, or duration changes, request a revised plan and quote.'], table: {caption: 'Compare monthly quotes on the same basis', head: ['Detail', 'What to confirm'], rows: [['Billing period', 'Calendar month or four-week cycle; partial periods'], ['Included service', 'Visit frequency, tasks, supplies, and missed-access policy'], ['Extensions', 'Renewal rate, notice, and collection arrangements'], ['Extras', 'Delivery, pickup, additional visits, taxes, and damage terms']]}});
  month.sources.push(...sourceList('fixr', 'royalFlush'));
  month.takeaways = [`Published monthly prices for a standard unit run about ${priceSummary.standardMonth}.`, 'Check whether weekly servicing is included in the monthly figure.', 'Confirm billing cycle, extensions, pickup, and extra charges.', 'Your vendor sets the actual price and confirms the booking.'];
  month.faqs[0][1] = `Published monthly prices for a standard unit run about ${priceSummary.standardMonth}. A Northeast vendor lists $100–$300 with weekly service included. Service visits, billing cycle, transport, and site access set the actual vendor rate.`;
  day.updated = month.updated = '2026-10-26';

  const weight = find('how-much-does-a-porta-potty-weigh');
  weight.dek = 'Use the supplied model’s specifications and expected contents to assess weight. An empty figure is not an operating load.';
  weight.sections[0].body = ['Weight varies by model. As a documented example, PolyJohn lists the PJN3 with a plastic skid base at 165 pounds and a 60-gallon holding tank. Star does not guarantee that a vendor supplies this model.', 'Accessible units and other equipment have different weights and footprints. Ask for the exact model’s specification sheet, including accessories and liquids present at delivery.', 'A general article cannot approve a lift or a placement. Use the provider’s operating-load information for a site-specific assessment.'];
  weight.sections[1].body = ['For an illustration, 60 US gallons of water at about 8.34 pounds per gallon adds roughly 500 pounds. Added to a 165-pound shell, that is about 665 pounds.', 'This is a water-equivalent calculation, not a certified specification or a recommendation to fill the tank. Contents, safe fill limits, and accessories vary. Request the vendor’s expected operating load.'];
  weight.sections[1].table = {caption: 'Weight information to obtain for the actual model', head: ['Equipment', 'Empty weight', 'Operating load'], rows: [['PJN3 manufacturer example', '165 lb with plastic skid base', 'Depends on contents and accessories'], ['Accessible unit', 'Confirm specification', 'Include liquids and accessories'], ['Handwashing station', 'Confirm specification', 'Include fresh and wastewater'], ['Restroom trailer', 'Confirm specification', 'Check tank contents and rated limits']]};
  weight.sections[2].body[0] = 'Restroom trailers have model-specific dry weights and rated limits. Ask for the model sheet and how water, waste, and accessories affect towing and placement.';
  weight.sections[3].body[0] = 'Check weight and stability whenever the surface, structure, or access route imposes limits.';
  weight.sections[3].subs[0].body[0] = 'An elevated structure needs a site-specific assessment of load, footprint, access, and servicing. Obtain building-owner and qualified-professional approval; a general weight figure cannot establish suitability.';
  weight.sections[3].subs[3].body[0] = 'Ask the owner and provider about appropriate surface protection. Matting does not automatically establish load capacity or prevent damage.';
  weight.sections[4].body[0] = 'Ask the operator to relocate equipment according to the model instructions. Liquid contents change the load and balance.';
  weight.takeaways = ['PolyJohn lists the PJN3 with a plastic skid base at 165 lb empty.', 'The actual model and contents determine the operating load.', 'Obtain model-specific placement and handling information from the vendor.', 'Elevated or restricted surfaces need a site-specific assessment.'];
  weight.sources.push(modelSource);
  weight.faqs = [['How much does a porta potty weigh?', 'Weight varies by model. PolyJohn lists its PJN3 with a plastic skid base at 165 lb empty. Use the supplied model’s specification and include its contents.'], ['How much does a full tank weigh?', 'It depends on volume and contents. A water-equivalent illustration is about 500 lb for 60 US gallons; obtain the vendor’s operating-load estimate.'], ['Can I put a porta potty on a deck?', 'Only after the owner and a qualified professional confirm the actual load, footprint, access, and servicing arrangements.'], ['How much does a restroom trailer weigh?', 'Request the exact model’s dry weight, tank capacities, rated limits, and towing plan.'], ['Can I move a porta potty myself?', 'Have the supplier handle relocation according to the model instructions. Contents and balance complicate movement.']];

  const permit = find('do-you-need-a-permit-for-a-porta-potty');
  permit.dek = 'The address, property permission, placement, duration, and local authority determine which approvals apply.';
  permit.takeaways = ['Private land does not automatically remove approval requirements.', 'Ask the authority responsible for the exact address.', 'Public space, events, food service, and construction involve different checks.', 'Confirm permits and property permission before delivery.'];
  permit.sections[1] = {h2: 'Check private-property approvals too', body: ['Property permission and municipal approval are different questions. Ask the local office whether the placement, duration, or event needs approval, even on private land.', 'Check building permit conditions, lease or association restrictions, and venue rules. Do not assume a building permit authorizes every temporary facility.', 'Share a site plan and the proposed rental dates. The responsible authority can confirm the local requirements.']};
  permit.sections[2].h2 = 'Situations to discuss with the authority';
  permit.sections[2].body = ['Ask about the relevant circumstances rather than assuming one approval covers them all.'];
  permit.sections[3].body[2] = 'Workplace sanitation requirements and local placement approvals are separate checks. Ask the relevant authority which apply to your site.';
  permit.sources.push(localSource);
  permit.faqs = [['Do I need a permit for a porta potty?', 'Ask the authority for the exact address. Property type, placement, duration, and event conditions determine the local requirements.'], ['Does private land mean no permit is needed?', 'Do not assume an exemption. Check municipal requirements and property, venue, lease, or association permissions.'], ['Who approves sidewalk placement?', 'Ask the city or county office responsible for public space or the right-of-way about the precise proposed location.'], ['Does a building permit cover portable toilets?', 'Confirm the permit conditions and site plan with the building department. Workplace obligations are a separate matter.'], ['Can Star approve my placement?', 'No. Star passes rental inquiries to providers. Confirm property permission, official approvals, and equipment suitability with the responsible parties.']];
  const use = find('is-it-illegal-to-use-a-porta-potty');
  use.dek = 'Check who the facility is intended for and ask permission. Site access and placement are separate questions.';
  use.sections[0].body = ['Portable toilets provide temporary sanitation, including workplace facilities. That does not make every unit available to every passerby.', 'Check the owner’s or organizer’s permission, site signs, and access restrictions. A general guide cannot determine legal consequences for a particular property.'];
  use.sections[1].body = ['A toilet on a construction site, at a venue, or inside a ticketed area may be reserved for workers or admitted guests.', 'Ask before entering and follow signs. Do not cross fences, locked gates, or restricted areas to reach a unit.', 'Placement on public ground does not establish public access. Ask the organizer who can use it.'];
  use.sections[2].body = ['If facilities are unavailable, ask the organizer or local authority where public facilities are located. Local rules determine legal restrictions.'];
  use.takeaways = ['Ask the owner or organizer whether the unit is available to you.', 'Public-ground placement does not automatically mean public access.', 'Site access, placement, and sanitation have separate requirements.', 'Use local official information for specific legal questions.'];
  use.sources.push(localSource);
  use.faqs[0][1] = 'Ask permission to use the unit and enter the site, and follow local rules. This guide cannot determine the legal position for every location.';
  use.faqs[1][1] = 'Ask the site manager; facilities may be reserved for workers and access may be restricted.';
  use.faqs[2][1] = 'Check the organizer’s rules. Do not assume equipment on public ground or near a venue is available without admission.';
  const salary = find('porta-potty-cleaner-salary');
  salary.sections[0].body = ['BLS does not publish a separate portable-toilet-cleaner wage series. SOC 47-4071, Septic Tank Servicers and Sewer Pipe Cleaners, is related but includes other work.', 'As checked in October 2026, the OEWS tables list the May 2025 release. Select the occupation and state or metro, and note the year, hourly or annual measure, and mean or median.', 'Use the category as context for actual job offers, not a guaranteed salary. Ask about hours, overtime, route pay, benefits, and driving qualifications.'];
  salary.sources = salary.sources.map(([label, href]) => href.includes('oes474071') ? ['BLS — OEWS tables, May 2025 release available at last edit', 'https://www.bls.gov/oes/tables.htm'] : [label, href]);
  salary.takeaways[0] = 'SOC 47-4071 is a related category, not a portable-toilet-only wage series.';
  salary.takeaways[2] = 'Driving qualifications can affect eligibility; requirements depend on the role and vehicle.';
  salary.faqs[0][1] = 'Compare local job offers with BLS category 47-4071 as context. It includes septic and sewer work and is not a portable-toilet-only salary measure.';
  find('can-i-put-a-porta-potty-in-my-backyard').sources.push(localSource);
  find('porta-potty-usage-guide').sources.push(modelSource);
  const indoor = find('porta-potty-indoor-placement');
  indoor.sources.push(modelSource, localSource);
  indoor.sections.unshift({h2: 'Check model instructions and venue approval', body: ['Do not assume an outdoor unit is suitable indoors. Ask for model instructions and check ventilation, servicing access, accessible approaches, and fire/egress arrangements with the venue.', 'Star provides inquiry assistance, not approval of a building installation. The supplier and responsible venue authority must confirm the proposed setup.']});
  // Contextual links from high-impression guides into the money pages. Each adds
  // its own sentence so the one-link-per-paragraph rule holds.
  const addLinkedParagraph = (slug, h2, text, href, anchor, field = 'body') => {
    const section = find(slug).sections.find(s => s.h2 === h2);
    if (!section) throw new Error(`${slug}: no section "${h2}"`);
    (section[field] ||= []).push(text);
    find(slug).links.push({ href, anchor });
  };
  addLinkedParagraph('how-do-porta-potties-work', 'What actually happens to the waste', 'That pump-out visit is also what you pay for on a long rental, which is why servicing drives the monthly price.', '/blog/porta-potty-cost-per-month/', 'servicing drives the monthly price');
  addLinkedParagraph('how-do-porta-potties-work', 'What this means when you rent one', 'Each tank holds a fixed volume, so how many porta potties you need comes down to crowd size and hours.', '/blog/porta-potty-ratio-guide/', 'how many porta potties you need');
  addLinkedParagraph('what-is-the-blue-liquid-in-porta-potties', 'What the colour tells you as a customer', 'If units on a long rental turn green before the next visit, ask the vendor whether a more frequent service schedule fits the budget.', '/blog/porta-potty-cost-per-month/', 'a more frequent service schedule');
  addLinkedParagraph('can-you-put-tampons-in-a-porta-potty', 'Why this is a planning issue', 'Disposal bins belong in the same plan as the number of units for your crowd.', '/blog/porta-potty-ratio-guide/', 'number of units for your crowd');
  addLinkedParagraph('how-to-clean-a-porta-potty', 'When cleaning is not the answer', 'The fix is a service visit, which is often included in monthly rental prices.', '/blog/porta-potty-cost-per-month/', 'included in monthly rental prices');
  addLinkedParagraph('is-it-illegal-to-use-a-porta-potty', 'Where the real legal questions are', 'Rules differ by state, and each state planning page shows who enforces job-site sanitation.', '/location/', 'state planning page');
  addLinkedParagraph('porta-potty-ratio-guide', 'Construction sites: the OSHA minimum table', 'States that run their own OSHA State Plan, such as California, enforce their own version of this table, which must be at least as effective as the federal rule.', '/location/california/', 'California', 'after');
  return posts;
}
