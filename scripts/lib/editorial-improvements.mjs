const priceSource = ['A Royal Flush — Northeast price guide, September 4, 2026', 'https://www.aroyalflush.com/2026/09/04/how-much-does-a-porta-potty-rental-cost/'];
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
  ratio.takeaways[2] = 'Alcohol, weather, and peak demand may require a revised vendor plan.';
  ratio.faqs[2][1] = 'Ask the provider to account for beverage service, event length, and peak demand when sizing the equipment and service plan.';
  find('porta-potty-options-comparison').metaTitle = 'Porta Potty vs Restroom Trailer | Star Portable Restrooms';
  const day = find('porta-potty-cost-per-day');
  day.dek = 'Start with a published regional price example, then compare the itemized vendor quote for your address and dates.';
  day.description = 'One-day porta potty budgeting with published regional price examples, delivery and pickup charges, service inclusions, and a vendor quote checklist.';
  day.sections.unshift({h2: 'Published daily prices: a regional example', body: ['A Royal Flush’s September 2026 guide provides these daily examples for Connecticut, New York, and New Jersey. They are third-party regional estimates, not Star rates or a guarantee of local availability.', 'Check transport, taxes, and servicing in the vendor’s quote. Other markets and individual bookings may differ.'], table: {caption: 'Northeast daily estimates — A Royal Flush, September 2026', head: ['Equipment', 'Published daily estimate'], rows: [['Standard unit', '$75–$200'], ['Deluxe flushing unit', '$125–$300'], ['Restroom trailer', '$300–$2,500+']]}});
  day.sections.push({h2: 'Compare the full event package', body: ['Ask for a written total covering the unit count, type, delivery address, setup deadline, and pickup window. A one-day event package is not one thirtieth of a monthly rental.', 'Ask how delayed access, extra attendance, or a later pickup changes the quote. Star passes rental inquiries to providers; your vendor confirms the price and booking.'], table: {caption: 'Before accepting a quote', head: ['Line item', 'What to confirm'], rows: [['Rental window', 'Dates, setup deadline, collection window, and extra-day terms'], ['Transport', 'Delivery, setup, collection, and any access charge'], ['Service and supplies', 'Initial stock and any on-site pumping or cleaning visit'], ['Other charges', 'Taxes, cancellation, damage, and missed-access terms']]}});
  day.sources.push(priceSource);
  day.takeaways = ['Published examples are regional estimates, not Star rates.', 'Compare the complete event invoice, not just a unit charge.', 'Confirm delivery, pickup, taxes, service, and extension terms.', 'The selected local vendor confirms availability and the final quote.'];
  day.faqs[0][1] = 'See the published regional example above, then ask a vendor for an itemized quote for your address and dates. These examples are not rates offered by Star.';
  day.faqs[3][1] = 'Have the vendor state whether delivery and pickup are included, which collection window applies, and whether extra trips or delayed access cost more.';
  const month = find('porta-potty-cost-per-month');
  month.dek = 'Compare a regional monthly price example with the service schedule, billing cycle, and extras in your provider’s quote.';
  month.description = 'Monthly porta potty budgeting with published regional estimates, service visits, billing cycles, extension terms, and questions for your local provider.';
  month.sections.unshift({h2: 'Published monthly prices: a regional example', body: ['A Royal Flush’s September 2026 Northeast guide lists these monthly examples with weekly servicing. They are third-party estimates, not Star prices or guaranteed local quotes. Confirm transport, taxes, and the billing cycle separately.'], table: {caption: 'Northeast monthly estimates — A Royal Flush, September 2026', head: ['Equipment', 'Published monthly estimate'], rows: [['Standard unit', '$100–$300'], ['Deluxe flushing unit', '$175–$550']]}});
  month.sections.push({h2: 'Check billing cycles and extensions', body: ['Ask whether “monthly” means a calendar month or 28 days, how partial periods are billed, and how much notice is needed for pickup. Confirm the rate for extra service visits and which supplies are replenished.', 'Budget the equipment charges for the agreed cycles, plus transport, extra visits, taxes, and agreed access charges. If your crew, shifts, or duration changes, request a revised plan and quote.'], table: {caption: 'Compare monthly quotes on the same basis', head: ['Detail', 'What to confirm'], rows: [['Billing period', 'Calendar month or four-week cycle; partial periods'], ['Included service', 'Visit frequency, tasks, supplies, and missed-access policy'], ['Extensions', 'Renewal rate, notice, and collection arrangements'], ['Extras', 'Delivery, pickup, additional visits, taxes, and damage terms']]}});
  month.sources.push(priceSource);
  month.takeaways = ['Regional price examples are a starting point, not a Star offer.', 'Compare included service visits and the work performed.', 'Confirm billing cycle, extensions, pickup, and extra charges.', 'Your vendor sets the actual price and confirms the booking.'];
  month.faqs[0][1] = 'Use the published regional example above for context, then request an itemized quote. Equipment, service visits, billing cycle, transport, and site access affect the actual vendor rate.';

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
  return posts;
}
