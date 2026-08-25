// Second batch of query-led guides. See blog-posts-extra.mjs for the ordering rule.

export const extraPosts2 = [
  {
    slug: 'how-to-clean-a-porta-potty',
    order: 4,
    category: 'Maintenance',
    title: 'How to Clean a Porta Potty',
    metaTitle: 'How to Clean a Porta Potty | Star Portable Restrooms',
    description: 'How professional portable toilet servicing works, what a renter can safely clean between visits, and why tank emptying is not a DIY job.',
    dek: 'There are two different questions here. One has a straightforward answer, and the other has a regulatory one.',
    image: '/assets/blog/usage-guide.webp',
    alt: 'Clean, freshly serviced portable restroom interior',
    readTime: 7,
    published: '2026-08-22',
    updated: '2026-08-22',
    takeaways: [
      'Emptying the tank is regulated waste handling, not cleaning — leave it to the service.',
      'Surface cleaning between visits is fine and makes a visible difference.',
      'Use a mild disinfectant; never pour bleach or solvents into the tank.',
      'On a rental, poor tank condition is a scheduling problem, not a cleaning problem.',
    ],
    sections: [
      {
        h2: 'Two different jobs',
        body: [
          'When people search for how to clean a portable toilet they usually mean one of two quite different things: how the professional service actually works, or what they can do themselves to keep a rented unit pleasant between visits.',
          'The distinction matters because only one of them is something you should be doing. Emptying and treating the tank is regulated waste handling requiring a vacuum truck and a licensed disposal point. Wiping down the interior surfaces is ordinary cleaning that anyone can do. This covers both, starting with what the service involves so the second part makes sense.',
        ],
      },
      {
        h2: 'What professional servicing involves',
        body: [
          'A service visit is a defined sequence, and on a well-run route it takes only a few minutes per unit.',
        ],
        subs: [
          {
            h3: 'Pump the tank',
            body: ['A suction hose from the vacuum truck goes into the service port and draws the tank contents out under vacuum. Nothing is emptied on site and nothing is drained to ground — the waste stays in the truck until it reaches an approved receiving point.'],
          },
          {
            h3: 'Rinse and agitate',
            body: ['Fresh water is introduced and the tank is rinsed, often with a wand, to lift residue off the tank walls that the initial suction left behind. On a heavily used unit this step is the difference between a tank that stays serviceable and one that builds up.'],
          },
          {
            h3: 'Clean and disinfect surfaces',
            body: ['The seat, lid, urinal, walls, door handle, latch and floor are washed with a disinfectant cleaner. These are the surfaces users actually touch, and they matter more for perceived cleanliness than anything happening in the tank.'],
          },
          {
            h3: 'Recharge and restock',
            body: ['A measured dose of deodorising treatment plus a few gallons of water go into the empty tank, and consumables are replaced — toilet paper, hand sanitiser, seat covers where provided. The technician also checks the vent, door hardware and unit condition and flags anything needing repair.'],
          },
        ],
        after: [
          'The waste then goes to a municipal wastewater treatment plant or a licensed septage facility. Disposal is tracked, and it is the reason a rental unit must never be used as a dumping point for anything else — a contaminated load is a genuine problem at the receiving end.',
        ],
      },
      {
        h2: 'What you can safely do yourself',
        body: [
          'On a long rental, particularly on a job site or at a multi-day event, a small amount of attention between service visits noticeably improves things. All of this is surface work.',
          'Wipe down high-touch surfaces with a mild disinfectant cleaner and disposable cloths or wipes — the door handle and latch first, then the seat and lid. Sweep or mop out the floor if the site is muddy, because tracked-in dirt is the most common reason a unit looks neglected when the tank is actually fine. Keep the paper dispenser stocked and the sanitiser topped up if you hold supplies on site. Empty and reline the rubbish bin beside the unit, which is what stops people improvising into the tank.',
          'Wear gloves, wash your hands properly afterwards, and dispose of used cloths and wipes in the bin rather than the toilet. That is genuinely the whole list.',
        ],
      },
      {
        h2: 'What not to do',
        body: [
          'Do not pour bleach into the tank. It is the most common mistake and it is counterproductive: bleach can react with tank chemistry inside a sealed space, it can suppress the treatment that is actually controlling odour, and it complicates lawful disposal. The same applies to solvents, drain cleaners, fuel and paint.',
          'Do not attempt to empty the tank. Beyond needing equipment you do not have, discharging that waste to ground, to a storm drain, or into a domestic toilet is an environmental offence in essentially every jurisdiction, and the volumes involved are far beyond what a household system can take.',
          'Do not pressure-wash the interior. It aerosolises exactly what you do not want aerosolised, and it can force water past seals.',
          'Do not add your own deodorising chemical. Dosing is matched to tank size and water volume, and a colour change usually indicates a full tank rather than a chemical shortage.',
        ],
      },
      {
        h2: 'When cleaning is not the answer',
        body: [
          'If a unit smells strongly despite a working vent, if the tank fluid has gone from blue through green to brown, or if the unit is visibly at capacity, no amount of surface cleaning will fix it. Those are all signals that the service interval is wrong for the actual usage.',
          'That is a scheduling conversation rather than a cleaning task, and it is a routine one. If a crew doubled, a second shift was added, or an event drew more people than planned, the frequency should be revised. Under-specifying servicing to save money reliably produces complaints, and correcting it mid-rental is easier than living with it.',
          'The same logic applies in reverse. If units are consistently barely used by the time the truck arrives, the frequency can come down and so can the cost.',
        ],
      },
      {
        h2: 'Keeping units clean by design',
        body: [
          'The most effective cleaning happens before anything gets dirty. A lined rubbish bin beside each cluster removes the reason people put things in the tank. Adequate lighting after dark reduces mess considerably. Placement on firm ground rather than mud cuts tracked-in dirt at source. Handwashing capacity within sight of the units improves behaviour more than any sign.',
          'A short, clearly worded notice inside each unit about proper use prevents most misuse, and on a construction site raising it once in a toolbox talk when units arrive works better than a sign alone.',
        ],
      },
    ],
    links: [
      { href: '/blog/porta-potty-usage-guide/', anchor: 'proper use' },
      { href: '/service/portable-handwashing-station-rental/', anchor: 'Handwashing capacity' },
      { href: '/contact/', anchor: 'service interval' },
    ],
    sources: [
      ['EPA — Septage and domestic wastewater management', 'https://www.epa.gov/npdes/septage-management'],
      ['OSHA 29 CFR 1926.51 — Sanitation (construction)', 'https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.51'],
    ],
    faqs: [
      ['How do you clean a porta potty?', 'Professional servicing pumps the tank with a vacuum truck, rinses it, cleans and disinfects the touch surfaces, then recharges the deodorising treatment and restocks supplies. Between visits, a renter can safely wipe down high-touch surfaces with a mild disinfectant and keep the floor and bin clear.'],
      ['Can I empty a porta potty myself?', 'No. It requires a vacuum truck, and the waste must go to an approved receiving point. Discharging it to ground, a storm drain, or a domestic toilet is an environmental offence in essentially every jurisdiction.'],
      ['Can I put bleach in a porta potty?', 'No. Bleach can react with the tank chemistry in a sealed space, suppress the treatment controlling odour, and complicate lawful disposal. The same applies to solvents, drain cleaner, fuel and paint.'],
      ['What should I use to clean the inside of a portable toilet?', 'A mild disinfectant cleaner and disposable cloths or wipes are sufficient for the seat, lid, door handle, latch and floor. Wear gloves and put used cloths in the bin, not the toilet.'],
      ['My rented unit smells even after cleaning. What now?', 'That usually means the service interval is wrong for actual usage rather than that the unit needs cleaning. Call and revise the frequency — it is a routine adjustment.'],
    ],
  },

  {
    slug: 'can-you-put-tampons-in-a-porta-potty',
    order: 5,
    category: 'Usage',
    title: 'Can You Put Tampons in a Porta Potty?',
    metaTitle: 'Can You Put Tampons in a Porta Potty? | Star Portable Restrooms',
    description: 'Why tampons and pads should not go in a portable toilet tank, and how event and site planners should provide disposal so nobody has to improvise.',
    dek: 'The short answer is no — and if that leaves someone with nowhere to put it, that is a planning failure, not a user failure.',
    image: '/assets/blog/usage-guide.webp',
    alt: 'Portable restroom interior with a lidded disposal bin',
    readTime: 6,
    published: '2026-08-22',
    updated: '2026-08-22',
    takeaways: [
      'Tampons and pads do not break down in a holding tank and can block pump-out equipment.',
      'A lidded, lined disposal bin inside the unit is the correct provision.',
      'Planning this is the organiser\'s job, not something to leave to chance.',
      'Provide it in every unit, not only in the accessible one.',
    ],
    sections: [
      {
        h2: 'The direct answer',
        body: [
          'No — tampons, pads, liners and applicators should not go into a portable toilet. They belong in a lidded waste bin, and if a unit does not have one, that is a gap the organiser should close rather than a problem the user should have to solve.',
          'This is not a squeamishness rule or an arbitrary restriction. It comes from how the tank physically works, and the same rule applies to wipes, nappies and any other absorbent product.',
        ],
      },
      {
        h2: 'Why the tank cannot handle them',
        body: [
          'A portable toilet is a sealed holding tank, not a connection to a sewer. Nothing flows away. The chemical treatment in the tank is formulated to break down human waste and standard toilet paper — paper that is specifically designed to disperse quickly in water.',
          'Menstrual products are engineered to do the exact opposite. Their entire function is to absorb liquid and hold together while wet. Dropped into a tank they stay intact, they swell, and they remain there until the tank is pumped.',
          'At pump-out they cause the actual problem. Intact fibrous material is drawn toward a suction hose and tangles, and a blockage in the hose or pump means a technician stops mid-route to clear it. On a busy event weekend that delay propagates across every remaining stop. Applicators, being rigid plastic, can damage equipment outright.',
        ],
      },
      {
        h2: 'What to provide instead',
        body: [
          'The fix is inexpensive and takes almost no planning effort. It just has to actually be there.',
        ],
        subs: [
          {
            h3: 'A lidded, lined bin in the unit',
            body: ['A small waste bin with a lid and a liner, mounted or placed inside the cabin, is the standard provision. The lid matters for odour and for dignity. The liner matters because it is what makes emptying quick and hygienic. Many operators can supply units already fitted with one — ask when you book rather than assuming.'],
          },
          {
            h3: 'In every unit, not just one',
            body: ['Providing disposal only in the accessible unit, or only in a single designated unit, forces people to seek out a specific cabin, which defeats the purpose. Put it in every unit. The cost difference across a cluster is negligible and the difference in experience is not.'],
          },
          {
            h3: 'Emptying on a schedule',
            body: ['A bin that is full by mid-afternoon is no better than no bin. On a multi-day event or a long site rental, bin emptying should be part of the agreed service scope. Confirm whether your operator handles it or whether it falls to your own staff.'],
          },
          {
            h3: 'Supplies, where it makes sense',
            body: ['At larger events, weddings, festivals and workplaces with long shifts, stocking basic supplies alongside the disposal bin is increasingly common and costs very little. It is a small gesture that people notice.'],
          },
        ],
      },
      {
        h2: 'Why this is a planning issue',
        body: [
          'Roughly half of any crowd menstruates at some point, and a meaningful fraction of them on any given day. Treating disposal as an edge case rather than a baseline requirement is simply an oversight.',
          'When there is no bin, people do one of three things: they use the tank, which causes the problems above; they wrap it and carry it out, which is unpleasant; or they leave the unit, which is worse for everyone. None of those outcomes is the user being inconsiderate — all three are what happens when the provision was not made.',
          'Some jurisdictions include sanitary disposal in event permit conditions, particularly for larger gatherings, so it may not even be optional where you are. Check the permit requirements alongside your unit count.',
        ],
      },
      {
        h2: 'What to do if there is no bin',
        body: [
          'If you are a user and there is genuinely no disposal provided, wrapping the item in toilet paper and putting it in the nearest external rubbish bin is the least bad option. It is not ideal and you should not have to, but it is better than the tank.',
          'If you are running the site or event, and someone raises it, treat it as feedback worth acting on immediately. Bins can usually be added the same day, and it is one of the cheapest improvements available to you.',
        ],
      },
      {
        h2: 'The wider rule',
        body: [
          'The same reasoning covers everything absorbent or non-dispersing: wet wipes including those sold as flushable, nappies, paper towels, cotton pads and dressings. If it is built to stay intact when wet, the tank cannot process it.',
          'The usage rules are worth stating plainly, because they cover every case people ask about: human waste and standard toilet paper go in the toilet, and everything else goes in a bin. Provide the bin, and almost every usage problem on a rental disappears.',
        ],
      },
    ],
    links: [
      { href: '/blog/porta-potty-usage-guide/', anchor: 'usage rules' },
      { href: '/service/ada-portable-toilet-rental/', anchor: 'accessible unit' },
      { href: '/contact/', anchor: 'service scope' },
    ],
    sources: [
      ['2010 ADA Standards for Accessible Design', 'https://www.ada.gov/law-and-regs/design-standards/2010-stds/'],
    ],
    faqs: [
      ['Can you put tampons in a porta potty?', 'No. Menstrual products are designed to absorb liquid and hold together when wet, so they do not break down in a holding tank and can tangle in pump-out equipment. They belong in a lidded, lined waste bin inside the unit.'],
      ['What happens if a tampon goes in the tank?', 'It stays intact until the tank is pumped, then risks tangling in the suction hose or pump. A blockage stops a technician mid-route, which delays every remaining stop on that run. Applicators can damage equipment outright.'],
      ['Should every porta potty have a sanitary bin?', 'Yes. Providing disposal in only one designated unit forces people to seek out a specific cabin, which defeats the purpose. The cost across a cluster is negligible.'],
      ['Who empties the sanitary bins?', 'Confirm it when you book. Some operators include bin emptying in the service scope; on other arrangements it falls to your own staff. On multi-day events it needs to be scheduled either way.'],
      ['What if there is no bin provided?', 'Wrapping the item and using the nearest external rubbish bin is the least bad option. If you are running the site, treat it as feedback to act on the same day — bins can usually be added quickly.'],
    ],
  },

  {
    slug: 'is-it-illegal-to-use-a-porta-potty',
    order: 6,
    category: 'Regulations',
    title: 'Is It Illegal to Use a Porta Potty?',
    metaTitle: 'Is It Illegal to Use a Porta Potty? | Star Portable Restrooms',
    description: 'Using a portable toilet is legal. Using one that belongs to someone else may not be. What actually determines it, and where the real legal questions sit.',
    dek: 'The question usually means one of four different things, and they have four different answers.',
    image: '/assets/blog/usa-planning.webp',
    alt: 'Portable restroom on a fenced construction site',
    readTime: 6,
    published: '2026-08-22',
    updated: '2026-08-22',
    takeaways: [
      'Using a portable toilet is not itself illegal anywhere in the US.',
      'Using one on private property without permission can be trespass.',
      'The real legal questions are about placement and permits, not use.',
      'This is general information, not legal advice — local rules vary.',
    ],
    sections: [
      {
        h2: 'The straightforward answer',
        body: [
          'Using a portable toilet is not illegal. There is no law anywhere in the United States prohibiting the use of a portable restroom as a restroom. Quite the opposite: OSHA requires employers to provide sanitation facilities on construction sites, and many event permits require them as a condition of approval.',
          'The question is almost always really asking something narrower, though, and it is usually one of four things.',
        ],
      },
      {
        h2: 'Using one that belongs to someone else',
        body: [
          'This is the most common version of the question. A unit is sitting on a construction site, outside a closed venue, or at a ticketed event, and someone wonders whether they can use it.',
          'There is generally no specific "porta potty law" here. What applies instead is ordinary property law. A unit on a fenced or posted private site is on private property, and entering to use it can be trespass regardless of what you are entering for. At a ticketed event, facilities are part of what admission pays for, so using them without entry can fall under theft of services in some jurisdictions.',
          'In practice, the response is far more often being asked to leave than anything formal. But it is genuinely someone else\'s rented equipment, being serviced at their cost, and a unit at capacity because of unplanned use is a real problem for the people who paid for it.',
          'The reasonable rule of thumb: if it is behind a fence, on a posted site, or inside a ticketed area, it is not available to the public. A unit placed on a public sidewalk for a public event generally is.',
        ],
      },
      {
        h2: 'Public urination when nothing is provided',
        body: [
          'The mirror image of the question, and worth stating plainly: public urination is an offence in most municipalities, typically a citable one, and in some jurisdictions carries consequences well beyond a fine.',
          'This is exactly why event permits so often require restroom provision, and why under-providing at an event is not merely an inconvenience. If a crowd cannot access facilities, the predictable result is a public order problem in the surrounding area, and that lands on the organiser through permit conditions, complaints, and future approvals.',
          'For organisers the practical implication is that unit count is a compliance matter, not only a comfort one.',
        ],
      },
      {
        h2: 'Where the real legal questions are',
        body: [
          'The genuine regulatory questions in portable sanitation are about placement and provision, not use.',
        ],
        subs: [
          {
            h3: 'Placement and permits',
            body: ['Putting a unit on public property, in a right-of-way, or on a street generally needs permission. Events frequently require a permit that specifies restroom provision. Long-term placement on residential property can engage local ordinances or HOA rules. This is where the actual paperwork lives.'],
          },
          {
            h3: 'Employer obligations',
            body: ['OSHA 29 CFR 1926.51 sets minimum sanitation facilities on construction sites by crew size, and 29 CFR 1910.141 covers general industry. Failing to provide them is the violation — using them obviously is not.'],
          },
          {
            h3: 'Accessibility',
            body: ['Under the 2010 ADA Standards, where portable toilets are clustered, at least 5% and never fewer than one unit per cluster must be accessible. Providing none is a compliance problem.'],
          },
          {
            h3: 'Waste disposal',
            body: ['Tank contents are regulated waste that must go to an approved receiving facility. Discharging them to ground or into a storm drain is an environmental offence, and this is the area where penalties are genuinely serious.'],
          },
        ],
      },
      {
        h2: 'Blocking exits and fire routes',
        body: [
          'One placement rule has no flexibility in it at all: a portable unit must never block an exit route, an exit door, a fire lane, or emergency vehicle access. That is a life-safety matter and fire officials enforce it directly.',
          'It is worth checking explicitly at events, because units are often positioned late, by people who were not part of the site plan, in whatever gap looks convenient. A cluster that drifted two metres over the course of a setup can end up across an egress route.',
        ],
      },
      {
        h2: 'If you are unsure',
        body: [
          'This article is general information rather than legal advice, and rules differ by state, county and city. For anything specific — whether your event needs a permit, whether a unit can sit on your verge, what your jurisdiction requires for accessibility — the answer comes from the authority having jurisdiction, usually the local building department, health department, or the office issuing your event permit.',
          'One phone call to them answers the question definitively for your address, which no general article can.',
        ],
      },
    ],
    links: [
      { href: '/blog/do-you-need-a-permit-for-a-porta-potty/', anchor: 'permit' },
      { href: '/service/ada-portable-toilet-rental/', anchor: 'accessible' },
    ],
    sources: [
      ['OSHA 29 CFR 1926.51 — Sanitation (construction)', 'https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.51'],
      ['OSHA 29 CFR 1910.141 — Sanitation (general industry)', 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.141'],
      ['2010 ADA Standards for Accessible Design', 'https://www.ada.gov/law-and-regs/design-standards/2010-stds/'],
    ],
    faqs: [
      ['Is it illegal to use a porta potty?', 'No. Using a portable toilet is not illegal anywhere in the US, and OSHA requires employers to provide sanitation on construction sites. The question usually concerns using one that belongs to someone else, which is a property-law matter rather than a specific porta potty law.'],
      ['Can I use a porta potty on a construction site?', 'Not without permission. A unit on a fenced or posted private site sits on private property, and entering to use it can be trespass. It is also rented equipment serviced at the site owner\'s cost.'],
      ['Is it illegal to use an event porta potty without a ticket?', 'Facilities inside a ticketed area are part of what admission pays for, so using them without entry can fall under theft of services in some jurisdictions. Units placed on public ground for a public event are generally available.'],
      ['What are the actual legal requirements around porta potties?', 'They concern placement and provision rather than use: permits for public property and events, OSHA minimums on job sites, ADA accessibility within clusters, and regulated disposal of tank waste.'],
      ['Can a porta potty block a fire exit?', 'Never. Units must not block exit routes, exit doors, fire lanes or emergency vehicle access. Fire officials enforce this directly and there is no flexibility in it.'],
    ],
  },
];
