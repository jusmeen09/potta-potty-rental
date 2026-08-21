// Blog post content. Ordering matters: in-body blog->blog links may only point
// FORWARD in this array, which keeps the internal link graph acyclic.
// Every `links` entry is a distinct URL within its own post.

export const posts = [
  {
    slug: 'porta-potty-ratio-guide',
    order: 1,
    category: 'Planning',
    featured: true,
    title: 'Porta Potty Ratio Guide: How Many Units Do You Really Need?',
    metaTitle: 'Porta Potty Ratio Guide | Star Portable Restrooms',
    description: 'How many porta potties you need by crew size, attendance, event length, and alcohol service — including the OSHA table for construction sites.',
    dek: 'Unit count is the single decision that determines whether your restrooms feel adequate or overwhelmed. Here is how to size a rental properly.',
    image: '/assets/blog/ratio-guide.webp',
    alt: 'Row of portable restrooms arranged for an outdoor event',
    readTime: 8,
    published: '2026-02-11',
    updated: '2026-08-21',
    takeaways: [
      'Construction sites in the USA follow an OSHA minimum table — it is a floor, not a comfort target.',
      'Events have no federal standard, so planning uses attendance, hours, and alcohol service.',
      'Alcohol raises usage substantially; most planners add roughly 15–20% more units.',
      'At least one accessible unit belongs in every cluster you place.',
    ],
    sections: [
      {
        h2: 'Start with the type of site, not a number',
        body: [
          'The first question is not "how many" but "what kind of site is this." A construction project with a fixed crew and an eight-hour shift behaves very differently from a music festival where thousands of people arrive at once, drink steadily, and queue during set changes. The same unit count can be generous on one and badly short on the other.',
          'Construction work in the United States is governed by a written OSHA minimum. Events are not — event planning relies on industry guidance and practical experience with attendance curves. Sizing each one correctly means using the right method for the right site, so it is worth separating them before you count anything.',
        ],
      },
      {
        h2: 'Construction sites: the OSHA minimum table',
        body: [
          'OSHA\'s construction sanitation standard, 29 CFR 1926.51(c)(1), sets the minimum number of facilities by crew size. This is the number an inspector measures against, and it is a legal floor rather than a recommendation for comfort:',
        ],
        table: {
          caption: 'OSHA 29 CFR 1926.51(c)(1), Table D-1 — construction sites',
          head: ['Number of employees', 'Minimum facilities'],
          rows: [
            ['20 or fewer', '1 toilet facility'],
            ['20 or more', '1 toilet seat and 1 urinal per 40 workers'],
            ['200 or more', '1 toilet seat and 1 urinal per 50 workers'],
          ],
        },
        after: [
          'Two things are worth emphasising. First, this is a minimum — meeting it keeps you compliant, but a crew that loses fifteen minutes per person queuing is paying for that compliance in labour hours. Second, general industry work falls under a different rule, 29 CFR 1910.141, so confirm which standard applies to your project before you plan around a table.',
          'For most job sites, the practical approach is to meet the OSHA figure and then add capacity where the crew is spread out, where the shift runs long, or where the walk to a unit would otherwise cost real time. Most contractors settle on standard units for this and adjust the service frequency rather than the count.',
        ],
      },
      {
        h2: 'Events: attendance, hours, and alcohol',
        body: [
          'No federal standard sets restroom counts for public events. Planning instead follows guidance published by bodies such as the Portable Sanitation Association International, along with whatever the venue or local permitting office requires. Always check the permit conditions first — a local requirement overrides any general rule of thumb.',
          'Three variables drive the number. Attendance sets the baseline. Event duration multiplies it, because a four-hour event and a ten-hour event with identical attendance produce very different total usage. Alcohol service raises per-person frequency sharply, and it is the factor most often underestimated; planners commonly add somewhere around 15–20% more units when drinks are served.',
          'A few practical adjustments matter as much as the raw count. Events with a strong arrival peak — a ceremony, a gate opening, a headline set — need capacity sized for the peak rather than the average. Multi-day events need a service schedule, not just more units. And if the site is large, splitting units into several clusters usually beats one big bank of them.',
          'When the estimate sits between two numbers, round up. Once a delivery is already scheduled, the daily cost of one additional unit is modest compared with the queue it prevents, and an unused unit is a far smaller problem at an event than a queue at the wrong moment.',
        ],
      },
      {
        h2: 'Accessibility is part of the count',
        body: [
          'Accessible units are not an optional extra to be added if budget allows. Under the 2010 ADA Standards for Accessible Design, where single-user portable toilets are clustered at a site, at least 5% — and never fewer than one unit per cluster — must be accessible. The word "cluster" matters: if you place four separate groups of units around a venue, the requirement applies to each group, not to the site total.',
          'Accessible units also need a genuinely accessible route: firm, level ground and an approach someone using a wheelchair can actually take. A compliant unit at the end of a gravel path across a slope does not meet the intent of the standard. Plan the placement and the route at the same time you plan the count, and budget the accessible units into your total from the start.',
        ],
      },
      {
        h2: 'Common sizing mistakes',
        body: [
          'Three errors account for most of the restroom complaints we hear about after an event. All of them are cheap to avoid at the planning stage and expensive to fix once units are on the ground.',
        ],
        subs: [
          {
            h3: 'Planning for average usage instead of peak',
            body: ['Restroom demand is not evenly distributed across an event; it clusters around breaks, intermissions, and the period after food and drink service begins. Sizing for the average guarantees queues at exactly the moments guests notice them.'],
          },
          {
            h3: 'Forgetting service access',
            body: ['Units must be reachable by a service truck for pumping and restocking. A cluster placed behind a fence line that gets closed during the event cannot be serviced, which turns a multi-day rental into a problem by day two.'],
          },
          {
            h3: 'Treating handwashing as a separate plan',
            body: ['Where food is served, handwashing capacity should scale with the unit count rather than being bolted on at the end. In many jurisdictions it is a permit condition rather than a nicety, so it belongs in the count from the start.'],
          },
        ],
      },
    ],
    // In-body contextual links. Each URL appears once in this post.
    links: [
      { after: 'Most contractors settle on standard units', href: '/service/standard-porta-potty-rental/', anchor: 'standard units' },
      { href: '/service/ada-portable-toilet-rental/', anchor: 'accessible units' },
      { href: '/blog/porta-potty-cost-per-day/', anchor: 'daily cost' },
    ],
    sources: [
      ['OSHA 29 CFR 1926.51 — Sanitation (construction)', 'https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.51'],
      ['OSHA 29 CFR 1910.141 — Sanitation (general industry)', 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.141'],
      ['2010 ADA Standards for Accessible Design', 'https://www.ada.gov/law-and-regs/design-standards/2010-stds/'],
    ],
    faqs: [
      ['How many porta potties do I need for 100 guests?', 'It depends on how long the event runs and whether alcohol is served. A short daytime event without alcohol needs far less capacity than an all-day event with a bar. Call with attendance, hours, and whether drinks are served, and the rental desk can suggest a count for your specific event.'],
      ['How many porta potties does OSHA require on a job site?', 'OSHA 29 CFR 1926.51(c)(1) requires one toilet facility for 20 or fewer employees, then one toilet seat and one urinal per 40 workers at 20 or more, and per 50 workers at 200 or more. Confirm whether your project falls under the construction standard or the general industry standard.'],
      ['Does alcohol change how many units I need?', 'Yes, noticeably. Alcohol increases how often guests use a restroom, and planners commonly add roughly 15–20% more units for events with bar service. Longer bar hours push the figure higher.'],
      ['How many accessible units do I need?', 'Where portable toilets are clustered, the 2010 ADA Standards require at least 5% and no fewer than one accessible unit per cluster. If you place several separate groups around a venue, each group needs its own accessible unit.'],
      ['Is it better to add units or add servicing?', 'For short events, add units — there is no opportunity to service mid-event. For multi-week projects, a sensible service frequency often matters more than extra units, because capacity resets at each visit.'],
    ],
  },

  {
    slug: 'portable-toilet-rental-checklist',
    order: 2,
    category: 'Planning',
    title: 'Portable Toilet Rental in the USA: A Planning Checklist',
    metaTitle: 'Portable Toilet Rental Checklist | Star Portable Restrooms',
    description: 'A practical checklist for portable toilet rental: unit counts, accessibility, handwashing, placement, delivery access, service schedule, and pickup.',
    dek: 'Most rental problems trace back to a detail nobody confirmed before delivery day. This checklist covers the ones that actually cause trouble.',
    image: '/assets/blog/usa-planning.webp',
    alt: 'Portable restroom units being positioned at a planned delivery location',
    readTime: 7,
    published: '2026-03-04',
    updated: '2026-08-21',
    takeaways: [
      'Confirm the delivery ZIP first — it determines availability, routing, and cost.',
      'Walk the placement area for surface, slope, and overhead clearance before booking.',
      'Agree the service schedule up front on any rental longer than a few days.',
      'Book the pickup at the same time as the delivery.',
    ],
    sections: [
      {
        h2: 'Before you call',
        body: [
          'A rental conversation goes faster when you already have five things: the delivery address with ZIP code, the rental start and end dates, the expected crew size or attendance, the type of site, and a rough idea of where the units will sit. With those, most availability questions can be answered on the first call rather than the third.',
          'The ZIP code matters more than people expect. It determines which route covers the site, what inventory is realistically available for your dates, and how delivery and servicing are priced. An estimate given without an address is a guess; browse the current rental options before calling so you already know roughly what you are asking about.',
        ],
      },
      {
        h2: 'Sizing and unit mix',
        body: [
          'Decide the total count first, then the mix. Most sites need a base of standard units, at least one accessible unit per cluster, and handwashing capacity where food is served or where the crew handles materials. Weddings, corporate events, and productions frequently justify an upgraded option for guest-facing areas while keeping standard units back of house — comparing the unit types side by side makes that split easier to settle.',
          'Write the mix down before you call. "Twelve units" is ambiguous; "ten standard, one accessible, two handwashing stations, split across two locations" is a plan that can be quoted, delivered, and serviced without a follow-up conversation.',
        ],
      },
      {
        h2: 'Placement and site access',
        body: [
          'Walk the placement area before booking rather than describing it from memory. Photographs of the spot and the approach route are genuinely useful, and most rental desks welcome them.',
        ],
        subs: [
          {
            h3: 'Ground and clearance',
            body: ['The ground must be firm and level enough to set a unit safely, with overhead clearance for delivery. Soft ground after rain, a low branch over the only approach, or a slope steep enough to make a unit unstable are all worth catching before the truck is dispatched.'],
          },
          {
            h3: 'Service truck route',
            body: ['A truck has to reach the spot on delivery day and on every service visit after it. A gate that gets locked at night, a barrier that goes up during the event, or a route that only exists while the site is empty are the details that turn into delivery-day phone calls.'],
          },
          {
            h3: 'Distance from the people using it',
            body: ['Units placed too far away go unused and people improvise; units placed too close to food service create a different problem. Somewhere visible, reachable in under a minute, and slightly downwind of dining is usually the right compromise.'],
          },
        ],
      },
      {
        h2: 'Service schedule and duration',
        body: [
          'For anything beyond a short event, the service schedule is as important as the unit count. Servicing typically covers pumping, cleaning, deodorising, and restocking supplies. Frequency should follow actual usage: a heavily used cluster on a large crew site needs more frequent attention than a low-traffic unit on a small residential project.',
          'Agree the schedule when you book rather than adjusting it after complaints start. If the site conditions change — the crew doubles, the project extends, a second shift is added — call and revise it. Changing frequency mid-rental is routine; discovering the frequency was wrong from a complaint is not.',
        ],
      },
      {
        h2: 'Delivery day and pickup',
        body: [
          'Keep the placement area clear and accessible on delivery day, and make sure someone on site can direct the driver if the location is not obvious. If access requires a gate code, a security check-in, or a specific entrance, pass that information along before the truck is dispatched.',
          'Book the pickup at the same time as the delivery. Units left after a project ends usually continue to be billed, and pickup is subject to the same routing constraints across our service areas as the original delivery. If your end date is uncertain, say so when booking — an approximate end date with a confirmation call is easier to manage than a surprise.',
        ],
      },
    ],
    links: [
      { href: '/service/', anchor: 'rental options' },
      { href: '/location/', anchor: 'service areas' },
      { href: '/blog/porta-potty-options-comparison/', anchor: 'unit types' },
    ],
    sources: [
      ['OSHA 29 CFR 1926.51 — Sanitation (construction)', 'https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.51'],
      ['2010 ADA Standards for Accessible Design', 'https://www.ada.gov/law-and-regs/design-standards/2010-stds/'],
    ],
    faqs: [
      ['What information do I need before renting a porta potty?', 'The delivery address with ZIP code, rental dates, expected crew size or attendance, the type of site, and a rough placement location. Those five details are enough to check availability and discuss pricing on a single call.'],
      ['How far in advance should I book?', 'Popular event dates, large quantities, and restroom trailers can book out well ahead. Call as soon as the venue, date, and approximate attendance are known. Job-site rentals are usually more flexible but still depend on local route capacity.'],
      ['What kind of ground do portable toilets need?', 'Firm, level ground that will support the unit safely, with a clear approach for the delivery and service truck. Avoid soft ground, steep slopes, and areas prone to standing water.'],
      ['Who is responsible for cleaning during the rental?', 'Scheduled servicing is arranged as part of the rental and typically includes pumping, cleaning, deodorising, and restocking. Frequency is agreed when you book and can be revised if site usage changes.'],
      ['What happens if my project runs longer than planned?', 'Call before the scheduled pickup date. Extending is normally straightforward, but it depends on inventory and route availability, so earlier notice gives more options.'],
    ],
  },

  {
    slug: 'porta-potty-options-comparison',
    order: 3,
    category: 'Options',
    title: 'Standard Portable Toilet, ADA Unit, or Restroom Trailer?',
    metaTitle: 'Standard vs ADA vs Trailer | Star Portable Restrooms',
    description: 'Compare standard porta potties, ADA-accessible units, and restroom trailers by comfort, accessibility, utilities, site requirements, and best use.',
    dek: 'The three main rental categories solve different problems. Picking well is mostly about matching the unit to the guest and the site.',
    image: '/assets/blog/options-comparison.webp',
    alt: 'Comparison of standard, accessible, and trailer-style portable restrooms',
    readTime: 6,
    published: '2026-04-08',
    updated: '2026-08-21',
    takeaways: [
      'Standard units are the workhorse: no utilities, flexible quantities, lowest planning overhead.',
      'Accessible units are required in every cluster, not optional based on expected guests.',
      'Trailers need power, water, level ground, and towing access — confirm all four early.',
      'Most sites end up with a mix rather than one category.',
    ],
    sections: [
      {
        h2: 'Standard portable toilets',
        body: [
          'The standard unit is the default for good reason. It needs no power, no water connection, and no special setup beyond firm level ground. It can be delivered in quantity, repositioned reasonably easily, and serviced on a route. For construction sites, festivals, parks, sports fields, and residential projects, it handles the large majority of demand.',
          'Typical features include a ventilated interior, a self-closing lockable door, a toilet paper dispenser, a non-slip floor, and in many models a urinal. What you give up relative to a trailer is the finished interior, running water, climate control, and the general sense of a permanent restroom. For most job sites and general-admission event areas, that trade is entirely reasonable.',
        ],
      },
      {
        h2: 'ADA-accessible units',
        body: [
          'Accessible units are larger, with ground-level entry, a wider doorway, interior room to manoeuvre a wheelchair, and support rails. They are not a premium comfort upgrade — they are a compliance and inclusion requirement. Under the 2010 ADA Standards, clustered portable toilets require at least 5%, and never fewer than one per cluster, to be accessible.',
          'The practical planning consequence is placement. An accessible unit needs firm, level ground and an approach route that is genuinely usable, which often constrains where a cluster can go. Decide the accessible placement first and arrange the standard units around it, rather than the other way round.',
        ],
      },
      {
        h2: 'Restroom trailers',
        body: [
          'By contrast, restroom trailers are a different category of experience altogether: finished interior surfaces, flushing toilets, running-water sinks, mirrors, interior lighting, separate stalls, and climate control on many models. For weddings, corporate events, VIP and hospitality areas, and film production, the difference is immediately obvious to guests.',
          'The trade-off is site requirements. Many trailers need a dedicated electrical connection and either a water supply or a filled onboard tank. They need a firm, level pad, and they need towing, turning, and setup clearance that a standard unit does not. Confirm power, water, ground, and access early — these are the four things that most often rule a trailer out late in planning.',
        ],
      },
      {
        h2: 'Handwashing as a separate decision',
        body: [
          'Handwashing capacity is usually planned separately from toilet capacity, and it is frequently the piece that gets forgotten. Where food is served, where crews handle materials, or where local permit conditions require it, standalone handwashing stations scale with the unit count rather than being a single token addition.',
          'Trailers generally include sinks, which reduces the need for standalone stations in the areas they serve — but only for the guests actually using the trailer. A site with a trailer in the VIP area and standard units elsewhere still needs handwashing provision for the second group.',
        ],
      },
      {
        h2: 'Most sites use a mix',
        body: [
          'In practice the question is rarely "which one" but "what proportions." A wedding might use a trailer near the reception and standard units near parking and vendor areas. A large construction project might use standard units throughout with accessible units at each cluster and handwashing stations near the break area. A festival might use all three in different zones.',
          'Plan zone by zone. Ask who uses each area, how long they are there, and what the expectation is, then choose per zone. That approach almost always produces a better result than picking one category for the whole site.',
          'One caveat for long projects: the mix you choose affects the monthly cost more than the headline unit price suggests, because different unit types carry different servicing needs. Settle the mix before you build the budget rather than after.',
        ],
      },
    ],
    links: [
      { href: '/service/restroom-trailer-rental/', anchor: 'restroom trailers' },
      { href: '/service/portable-handwashing-station-rental/', anchor: 'handwashing stations' },
      { href: '/blog/porta-potty-cost-per-month/', anchor: 'monthly cost' },
    ],
    sources: [
      ['2010 ADA Standards for Accessible Design', 'https://www.ada.gov/law-and-regs/design-standards/2010-stds/'],
      ['ADA.gov — Accessibility requirements overview', 'https://www.ada.gov/'],
    ],
    faqs: [
      ['What is the difference between a porta potty and a restroom trailer?', 'A standard porta potty is a self-contained single unit needing no utilities. A restroom trailer has a finished interior with flushing toilets, running-water sinks, lighting, and often climate control, but requires power, water, level ground, and towing access.'],
      ['Do restroom trailers need power and water?', 'Most do. Many models need a dedicated electrical connection and either a water supply or a filled onboard tank. Requirements vary by model, so confirm utilities before booking.'],
      ['Is an ADA unit required at every event?', 'Where portable toilets are clustered, the 2010 ADA Standards require at least 5% and no fewer than one accessible unit per cluster. Treat it as part of the base plan rather than an add-on.'],
      ['Can I mix unit types at one site?', 'Yes, and most sites do. Planning zone by zone — trailers for guest-facing areas, standard units elsewhere, accessible units in every cluster — usually produces a better result than a single choice for the whole site.'],
      ['Which option is best for a wedding?', 'Many weddings use a trailer for the main guest area and standard units for parking, vendor, and back-of-house areas, with at least one accessible unit. The right mix depends on guest count, venue utilities, and ground conditions.'],
    ],
  },

  {
    slug: 'porta-potty-cost-per-day',
    order: 4,
    category: 'Pricing',
    title: 'How Much Does a Porta Potty Cost for One Day?',
    metaTitle: 'Porta Potty Cost for One Day | Star Portable Restrooms',
    description: 'What actually drives one-day porta potty rental cost: unit type, delivery distance, quantity, event timing, servicing, and pickup requirements.',
    dek: 'Single-day pricing is quoted per site rather than from a national price list. These are the factors that move the number.',
    image: '/assets/blog/one-day-cost.webp',
    alt: 'Portable restroom delivered for a single-day event rental',
    readTime: 6,
    published: '2026-05-13',
    updated: '2026-08-21',
    takeaways: [
      'Delivery distance and ZIP code are usually the largest single variable.',
      'Quantity lowers the per-unit cost because delivery is shared across the order.',
      'Weekend and peak-season dates carry different availability and pricing.',
      'Same-day or tightly timed delivery windows cost more than flexible ones.',
    ],
    sections: [
      {
        h2: 'Why there is no single national price',
        body: [
          'Portable toilet rental is a logistics business more than a product business. The unit itself is a small part of what you are paying for; the rest is a truck, a driver, a route, and a waste disposal step at the end. All of those vary by location, which is why a credible quote needs a delivery address rather than a state.',
            'That is also why published "average" prices tend to mislead. A single unit delivered forty miles outside a service route on a summer Saturday and a single unit dropped on an existing weekday route in a dense metro are genuinely different jobs, and no average describes both.',
        ],
      },
      {
        h2: 'What moves the number',
        body: [
          'Four variables account for most of the spread between one quote and another. Knowing which ones apply to your site tells you where there is room to move and where there is not.',
        ],
        subs: [
          {
            h3: 'Unit type',
            body: ['A standard unit is the baseline. An accessible unit costs more to transport and occupies more space on the truck. A restroom trailer is a different category entirely, with utilities, setup, and towing involved.'],
          },
          {
            h3: 'Delivery distance and site access',
            body: ['For one-day rentals this often dominates. A site on an existing route costs less to serve than one requiring a dedicated trip. Difficult access — a long walk from where the truck can park, a tight gate, a soft surface — adds time, and time is the real cost.'],
          },
          {
            h3: 'Quantity',
            body: ['This one works in your favour. Because the delivery trip is shared across the whole order, the per-unit cost typically falls as the count rises. Two units are rarely twice the price of one, so rounding up is cheaper than most people expect.'],
          },
          {
            h3: 'Date and delivery window',
            body: ['Weekend dates and peak season carry higher demand and tighter inventory. Separately, a narrow delivery window — units in place by a specific hour for a ceremony — is more expensive to guarantee than a flexible morning drop.'],
          },
        ],
      },
      {
        h2: 'What is usually included',
        body: [
          'A typical single-day rental covers delivery, placement, the rental period itself, and pickup, with the unit stocked and clean on arrival. For a one-day event there is normally no mid-rental servicing, because the rental ends before servicing would be due.',
          'Worth confirming explicitly when you book: whether pickup is included or billed separately, what the delivery window actually is, whether hand sanitiser and paper are stocked to the level you expect, and what happens if the event overruns. These are routine questions and the answers should be clear before you commit.',
        ],
      },
      {
        h2: 'Getting an accurate quote quickly',
        body: [
          'Have four things ready: the delivery ZIP code, the date, the number and type of units, and the placement location with any access constraints. With those in hand, the rental desk can usually price the job on the first call rather than calling back.',
          'If the details are still moving, say so. A quote built on an approximate attendance figure that later doubles is not useful to anyone. It is faster to describe the uncertainty and let the rental desk quote a range or a revisable plan than to lock in a number that will change. For projects running past a single day, monthly rentals are priced on a different basis and are worth asking about separately.',
        ],
      },
    ],
    links: [
      { href: '/service/standard-porta-potty-rental/', anchor: 'standard unit' },
      { href: '/blog/porta-potty-cost-per-month/', anchor: 'monthly rentals' },
      { href: '/contact/', anchor: 'rental desk' },
    ],
    sources: [],
    faqs: [
      ['How much does a porta potty cost for one day?', 'One-day pricing depends on unit type, delivery ZIP code, quantity, date, site access, and pickup timing. Because delivery is the largest variable, pricing is quoted per site rather than from a national list. Call with the address and date for an accurate figure.'],
      ['Is it cheaper to rent more than one unit?', 'Usually the per-unit cost falls as quantity rises, because the delivery trip is shared across the order. Two units are rarely twice the price of one.'],
      ['Does a weekend rental cost more?', 'Weekend and peak-season dates carry higher demand and tighter inventory, which can affect both availability and price. Booking earlier gives more options.'],
      ['Is pickup included in the price?', 'It usually is, but confirm it explicitly when booking, along with the delivery window and what happens if the event runs long.'],
      ['Do I need servicing for a one-day rental?', 'Normally not. The rental typically ends before servicing would be due, so a single-day unit is delivered clean and stocked and collected afterwards.'],
    ],
  },

  {
    slug: 'porta-potty-cost-per-month',
    order: 5,
    category: 'Pricing',
    title: 'How Much Is a Porta Potty per Month?',
    metaTitle: 'Porta Potty Cost per Month | Star Portable Restrooms',
    description: 'How service frequency, crew size, unit quantity, site access, and rental duration shape monthly portable toilet rental cost.',
    dek: 'Monthly rentals are priced around servicing rather than delivery. That single difference changes how you should plan the budget.',
    image: '/assets/blog/monthly-cost.webp',
    alt: 'Portable restroom units on a long-term construction project',
    readTime: 6,
    published: '2026-06-17',
    updated: '2026-08-21',
    takeaways: [
      'Service frequency is the main cost driver on a monthly rental, not delivery.',
      'Crew size and usage determine how often servicing is actually needed.',
      'Longer commitments generally price better per month than repeated short rentals.',
      'Difficult site access raises cost on every single service visit, not once.',
    ],
    sections: [
      {
        h2: 'Monthly pricing works differently',
        body: [
          'On a one-day rental you are essentially paying for a delivery and a collection. On a monthly rental the delivery is amortised across the whole period and the recurring cost of servicing becomes the dominant factor. That is the key mental shift: for long-term rentals, the question is not "what does the unit cost" but "how often does it need attention."',
          'This is why two identical units on two identical projects can be priced differently. A unit used by six people on a quiet residential build and a unit used by forty on an active commercial site need very different service schedules, and the schedule is what you are buying.',
        ],
      },
      {
        h2: 'What drives the monthly figure',
        body: [
          'Four inputs set the monthly figure. The first is worth more attention than the other three combined, because it repeats every week for the length of the project.',
        ],
        subs: [
          {
            h3: 'Service frequency',
            body: ['Weekly service is a common baseline; heavy usage may justify more than once a week, and a lightly used unit may need less. Each visit involves pumping, cleaning, deodorising, and restocking, and each visit carries a cost.'],
          },
          {
            h3: 'Crew size and usage',
            body: ['Usage determines what frequency is actually appropriate, so it is worth being honest about it at booking. Under-specifying servicing to lower the monthly figure reliably produces complaints, and revising upward mid-project is more disruptive than starting at the right level.'],
          },
          {
            h3: 'Quantity and site access',
            body: ['Several units on one site share a service visit, so quantity helps here as it does on short rentals. Access matters more than on a single-day rental, because a difficult approach adds time to every visit for the whole rental period rather than once. Where crews handle materials or food is present, handwashing capacity should be planned into the same schedule.'],
          },
          {
            h3: 'Committed duration',
            body: ['A three-month commitment generally prices better per month than three consecutive one-month rentals, and it makes route planning easier at the supplier end. If you already know the project runs long, say so at the first call.'],
          },
        ],
      },
      {
        h2: 'Budgeting for a long project',
        body: [
          'Build the budget from four inputs: the unit count, the unit mix, the service frequency, and the duration. Then add a contingency for change — projects extend, crews grow, and second shifts appear. Extending is usually straightforward where the site sits inside an established delivery area, but it is easier when the budget anticipated it.',
          'Review the arrangement periodically rather than setting it and forgetting it. If the crew has halved since the units arrived, the service frequency probably should too. If the project added a night shift, it probably needs revisiting in the other direction. A short call every few weeks on a long project is worth the effort.',
        ],
      },
      {
        h2: 'Compliance is part of the plan',
        body: [
          'For construction projects, the unit count is not purely a budget decision — OSHA 29 CFR 1926.51(c)(1) sets minimum facilities by crew size, and that minimum applies for the duration of the project rather than at the moment the units were ordered. A crew that grows past a threshold changes the requirement.',
          'The practical habit is to re-check the count whenever the crew size changes materially. It is a two-minute check that avoids a compliance problem, and it usually coincides with the moment you would want to revisit servicing anyway. Users also need to know what belongs in a unit — proper use has a direct effect on how well a service schedule holds up.',
        ],
      },
    ],
    links: [
      { href: '/service/portable-handwashing-station-rental/', anchor: 'handwashing capacity' },
      { href: '/location/', anchor: 'delivery area' },
      { href: '/blog/porta-potty-usage-guide/', anchor: 'proper use' },
    ],
    sources: [
      ['OSHA 29 CFR 1926.51 — Sanitation (construction)', 'https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.51'],
    ],
    faqs: [
      ['How much is a porta potty per month?', 'Monthly cost depends primarily on service frequency, plus unit type, quantity, site access, and rental duration. Because servicing rather than delivery dominates the price, the schedule you choose is the biggest lever. Call with crew size and project length for a specific figure.'],
      ['How often should a portable toilet be serviced?', 'Weekly service is a common baseline. Heavier usage may justify more frequent visits and lightly used units may need fewer. Frequency should follow actual usage rather than a default.'],
      ['Is a longer rental cheaper per month?', 'Generally yes. A longer commitment usually prices better per month than repeated short rentals and makes service routing more predictable.'],
      ['What happens if my crew size changes?', 'Call and revise the plan. Crew changes affect both the appropriate service frequency and, on construction sites, the minimum number of facilities required under OSHA 29 CFR 1926.51.'],
      ['Does servicing include restocking supplies?', 'Scheduled servicing typically includes pumping, cleaning, deodorising, and restocking supplies. Confirm what is included when you agree the schedule.'],
    ],
  },

  {
    slug: 'porta-potty-usage-guide',
    order: 6,
    category: 'Usage',
    title: 'Porta Potty Usage: What Belongs Inside?',
    metaTitle: 'Porta Potty Usage Guide | Star Portable Restrooms',
    description: 'Why standard toilet paper is fine and wipes, trash, chemicals, and foreign objects are not — plus how misuse affects servicing and cost.',
    dek: 'Almost every servicing problem on a long rental traces back to something that should never have gone into the tank.',
    image: '/assets/blog/usage-guide.webp',
    alt: 'Interior of a clean, well-stocked portable restroom',
    readTime: 5,
    published: '2026-07-15',
    updated: '2026-08-21',
    takeaways: [
      'Standard toilet paper and human waste only — that is the whole list.',
      '"Flushable" wipes do not break down in a holding tank.',
      'Trash, chemicals, and foreign objects can disable a unit between service visits.',
      'A short note to guests or crew prevents most problems.',
    ],
    sections: [
      {
        h2: 'How a portable toilet actually works',
        body: [
          'A portable toilet is a holding tank, not a plumbing connection. Waste collects in a sealed reservoir with a deodorising treatment and stays there until a service truck pumps it out. Nothing is carried away between visits and nothing is broken down by a sewer system, which is why the contents of the tank matter so much more than they do in a building.',
          'That single fact explains every rule that follows. Anything that does not dissolve or pump cleanly stays in the tank, interferes with the treatment, or blocks the pump-out equipment — and it stays there until the next scheduled visit.',
        ],
      },
      {
        h2: 'What belongs inside',
        body: [
          'Human waste and standard toilet paper. That is the complete list. Standard toilet paper is designed to break down quickly and is fully compatible with holding tanks and pump-out equipment, which is why units are stocked with it.',
          'Hand sanitiser, where provided, is for use inside the unit but should not be poured into the tank. If a handwashing station is present, use it for washing rather than the unit itself.',
        ],
      },
      {
        h2: 'What does not — and why',
        body: [
          'Four categories cause nearly every service problem. The reasoning is the same in each case: if it does not dissolve or pump cleanly, it stays in the tank until someone deals with it.',
        ],
        subs: [
          {
            h3: 'Wipes, including "flushable" ones',
            body: ['Wipes are built to hold together when wet, which is the opposite of what a holding tank needs. They do not disperse, they tangle during pump-out, and they are the leading cause of service call-outs on long rentals. The flushable label refers to clearing a household toilet bowl, not to breaking down afterwards.'],
          },
          {
            h3: 'Trash and hygiene products',
            body: ['Bottles, cans, food packaging, and paper towels take up tank capacity and can jam pump equipment. Feminine hygiene products and diapers behave the same way. Where they are expected, a separate lined disposal bin beside the unit is the right solution.'],
          },
          {
            h3: 'Chemicals and job-site liquids',
            body: ['Bleach, solvents, fuel, and paint interfere with the deodorising treatment, can create hazardous reactions in an enclosed tank, and complicate lawful waste disposal. Never use a rental unit as a disposal point for liquid waste.'],
          },
          {
            h3: 'Foreign objects',
            body: ['Tools, phones, PPE, and construction debris can damage pump-out equipment and often cannot be recovered. If something is dropped in, report it rather than leaving it for the service crew to discover.'],
          },
        ],
      },
      {
        h2: 'Preventing problems on site',
        body: [
          'A short, clearly worded notice inside each unit prevents most misuse. On construction sites, adding it to the toolbox talk when units arrive works better than a sign alone. For events, a small sign plus a visible trash bin beside the cluster removes the reason people improvise in the first place.',
          'Provide the alternative rather than only the prohibition. A lined bin next to the units, sanitiser or a handwashing station within sight, and adequate lighting after dark solve the practical problems that lead to misuse. Well-maintained standard units handle heavy use perfectly well when they are used as intended.',
          'Placement plays a part too. Units in poorly ventilated or awkward spots attract more misuse and show problems faster, which is one of several reasons indoor placement is generally discouraged. Somewhere open, visible, and easy to reach tends to stay in better condition.',
          'If a problem does occur, report it promptly rather than waiting for the next visit on the service schedule. A blocked or damaged unit discovered on a routine visit has been out of action for days; the same problem reported the day it happens is usually a quick fix.',
        ],
      },
    ],
    links: [
      { href: '/service/standard-porta-potty-rental/', anchor: 'standard units' },
      { href: '/blog/porta-potty-indoor-placement/', anchor: 'indoor placement' },
      { href: '/contact/', anchor: 'service schedule' },
    ],
    sources: [],
    faqs: [
      ['Can you put wipes in a porta potty?', 'No, including wipes labelled flushable. They are designed to stay intact when wet, so they do not break down in a holding tank and are a leading cause of service problems. Use the trash bin instead.'],
      ['What toilet paper is safe to use in a portable toilet?', 'Standard toilet paper is fine and is what units are stocked with. It breaks down quickly and is compatible with holding tanks and pump-out equipment.'],
      ['Can I pour chemicals or job-site liquids into a portable toilet?', 'No. Bleach, solvents, fuel, and paint interfere with the deodorising treatment, can create hazardous reactions in an enclosed tank, and complicate lawful disposal. Never use a rental unit for liquid waste disposal.'],
      ['What should I do if something is dropped into the tank?', 'Report it as soon as it happens. Foreign objects can damage pump-out equipment, and a prompt report is usually a quick fix rather than a longer repair.'],
      ['How do I stop misuse at an event?', 'Put a clear notice inside each unit, place a visible lined trash bin beside the cluster, and make sure there is adequate lighting after dark. Providing the alternative works better than a prohibition alone.'],
    ],
  },

  {
    slug: 'porta-potty-indoor-placement',
    order: 7,
    category: 'Placement',
    title: 'Can You Put a Porta Potty Indoors?',
    metaTitle: 'Can You Put a Porta Potty Indoors? | Star Portable Restrooms',
    description: 'Ventilation, floor protection, service access, venue approval, and fire code — what to consider before placing a portable toilet inside a building.',
    dek: 'It is occasionally done, but indoors introduces problems that outdoor placement simply does not have.',
    image: '/assets/blog/indoor-placement.webp',
    alt: 'Portable restroom positioned near a building entrance',
    readTime: 5,
    published: '2026-08-05',
    updated: '2026-08-21',
    takeaways: [
      'Portable toilets are designed for ventilated outdoor placement.',
      'Indoor use raises ventilation, odour, floor protection, and fire code questions.',
      'Service access is the constraint that usually rules it out.',
      'A trailer or a sheltered outdoor placement is normally the better answer.',
    ],
    sections: [
      {
        h2: 'The short answer',
        body: [
          'Sometimes, but it is rarely the right solution. Standard portable toilets are designed for outdoor placement where natural airflow handles ventilation and a service truck can reach the unit directly. Move one inside and both of those assumptions break, which is why most venues either prohibit it outright or attach conditions that make it impractical.',
          'There are genuine exceptions — large open industrial spaces, partially enclosed structures, warehouses with roller access and good airflow. But "indoors" in the sense of a finished interior room is usually the wrong tool for the job.',
        ],
      },
      {
        h2: 'Ventilation and odour',
        body: [
          'Portable toilets rely on vent pipes and ambient airflow to manage odour. In an enclosed space with limited air exchange, odour concentrates rather than dispersing, and the deodorising treatment in the tank is not designed to compensate for that. The problem also compounds with usage, so a placement that seems acceptable in the first hour may not be by the end of the day.',
          'Any indoor placement needs a serious ventilation assessment — not an assumption that a nearby door will be propped open.',
        ],
      },
      {
        h2: 'Floor protection and stability',
        body: [
          'Units must sit on a firm, level surface. Indoors that raises questions outdoor placement does not: whether the floor finish will be damaged, whether the loaded weight is acceptable for the structure — particularly above ground level — and what happens in the event of a spill during use or servicing.',
          'Protective matting under and around the unit is a normal condition, and many venues require it in writing. Confirm floor loading with the venue before committing to any placement above ground level.',
        ],
      },
      {
        h2: 'Service access is usually the deciding factor',
        body: [
          'This is where most indoor plans fail. Servicing requires a truck with a pump hose to reach the unit. Hose runs have practical length limits, and routing one through a building interior means through doorways, across finished floors, and past whatever else is happening in that space.',
          'For a single-day rental with no servicing required, this may not arise. For anything longer, work out the servicing route before the placement is agreed. A unit that cannot be serviced is a unit that stops working, and indoors that becomes a much bigger problem than it would outside.',
        ],
      },
      {
        h2: 'Better alternatives',
        body: [
          'Where the goal is an indoor-quality restroom experience, a restroom trailer is normally the right answer. It provides flushing toilets, running-water sinks, lighting, and climate control in a self-contained unit that parks outside and connects to utilities, which sidesteps the ventilation and servicing problems entirely.',
          'Where the goal is weather protection, a sheltered outdoor placement — under a canopy, against a building on the lee side, in a covered loading area — usually achieves it without the complications. A quick site review will often find a spot that is close, sheltered, serviceable, and acceptable to the venue.',
          'Either way, check early. Trailer models and unit types available for your dates depend on local inventory, and the alternatives narrow considerably once a date is close.',
          'Whatever you choose, get venue approval in writing and confirm fire code compliance with the local authority. Portable units must never block an exit route, an exit door, or a fire lane — that is a life-safety matter, and it is the one condition with no flexibility in it at all.',
        ],
      },
    ],
    links: [
      { href: '/service/restroom-trailer-rental/', anchor: 'restroom trailer' },
      { href: '/contact/', anchor: 'site review' },
      { href: '/location/', anchor: 'local inventory' },
    ],
    sources: [],
    faqs: [
      ['Can a porta potty be placed inside a building?', 'Occasionally, in large open spaces with good airflow, but it is rarely ideal. Ventilation, floor protection, fire code, and service access all become harder indoors. Most venues either prohibit it or attach conditions that make it impractical.'],
      ['What are the ventilation requirements for an indoor portable toilet?', 'Portable toilets rely on vent pipes and ambient airflow. An enclosed space with limited air exchange concentrates odour instead of dispersing it, so any indoor placement needs a genuine ventilation assessment rather than an assumption that a door will stay open.'],
      ['Can a service truck reach an indoor unit?', 'That is usually the deciding constraint. Servicing needs a pump hose run from the truck to the unit, and hose length and routing through a building are real limits. Work the service route out before agreeing the placement.'],
      ['What is the best alternative to indoor placement?', 'A restroom trailer parked outside gives an indoor-quality experience without the ventilation and servicing problems. For weather protection alone, a sheltered outdoor placement is usually simpler.'],
      ['Do I need venue permission for indoor placement?', 'Yes, and get it in writing. Confirm fire code compliance with the local authority as well. Units must never block an exit route, exit door, or fire lane.'],
    ],
  },
];
