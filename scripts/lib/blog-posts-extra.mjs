// Additional guides answering high-intent informational queries.
// `order` values interleave with scripts/lib/blog-posts.mjs — the combined array
// must stay a valid topological order so in-body article links only point forward.

export const extraPosts = [
  {
    slug: 'how-do-porta-potties-work',
    order: 1,
    category: 'How it works',
    title: 'How Do Porta Potties Work?',
    metaTitle: 'How Do Porta Potties Work? | Star Portable Restrooms',
    description: 'How a portable toilet actually works — the holding tank, the deodoriser, the vent stack, and what happens to the waste when the service truck arrives.',
    dek: 'There is no plumbing, no water supply, and nowhere for anything to go. Once you understand that, every rule about portable toilets makes sense.',
    image: '/assets/blog/usage-guide.webp',
    alt: 'Interior of a portable restroom showing the seat, tank and vent',
    readTime: 7,
    published: '2026-08-22',
    updated: '2026-08-22',
    takeaways: [
      'A portable toilet is a sealed holding tank, not a connection to a sewer.',
      'Chemical treatment controls odour and breaks down waste and toilet paper; it does not remove anything.',
      'A vent stack uses airflow to pull odour up and out rather than into the cabin.',
      'A vacuum truck pumps the tank and the waste goes to a licensed treatment facility.',
    ],
    sections: [
      {
        h2: 'The short version',
        body: [
          'A portable toilet is a self-contained cabin sitting on top of a sealed holding tank. Nothing is plumbed in and nothing drains away. Waste falls into the tank, a chemical treatment controls odour and begins breaking down solids and paper, and everything stays there until a service truck pumps it out and hauls it to a licensed treatment facility.',
          'That single fact — it is a container, not a connection — explains almost every rule you will ever be given about portable restrooms. Why wipes cause problems, why you should not pour chemicals in, why placement has to allow a truck to reach the unit, why service frequency matters more than unit count on a long rental. All of it follows from the tank.',
        ],
      },
      {
        h2: 'The parts that do the work',
        body: [
          'A standard unit looks simple from outside, and mechanically it nearly is. There are only a handful of components, and each one exists to solve a specific problem.',
        ],
        subs: [
          {
            h3: 'The holding tank',
            body: ['The base of the unit is a moulded tank, typically holding somewhere around 60 gallons on a standard model. It is sealed apart from the toilet opening and the service port, and it is sized so a normal unit can absorb a full day of heavy event use, or roughly a week of light job-site use, before it needs attention.'],
          },
          {
            h3: 'The chemical charge',
            body: ['After every pump-out the tank is recharged with a measured dose of deodorising treatment and a few gallons of water. This is the blue liquid people notice. It suppresses odour-causing bacteria, masks what is in the tank visually and by smell, and helps break down solids and toilet paper so the tank pumps out cleanly.'],
          },
          {
            h3: 'The vent stack',
            body: ['Run your eye up the corner of most units and you will see a pipe from the tank to a vent at roof level. Air warmed inside the tank rises up the stack and escapes above head height, which pulls fresh air down through the cabin rather than letting tank air sit in it. It is passive, it has no moving parts, and it is the main reason a well-placed unit smells far better than people expect.'],
          },
          {
            h3: 'The cabin',
            body: ['Everything above the tank exists for the user: a self-closing door with an occupancy indicator, a ventilated but private enclosure, a non-slip floor, a paper dispenser, and on many models a urinal to keep liquid volume out of the main bowl area. Translucent roof panels light the interior in daylight without needing power.'],
          },
        ],
      },
      {
        h2: 'What actually happens to the waste',
        body: [
          'This is the part most people have never thought about, and it is the reason the whole service exists.',
          'A service technician arrives with a vacuum truck carrying a waste tank and a fresh-water tank. A suction hose goes into the service port and the tank contents are drawn out under vacuum. The empty tank is then rinsed, the interior surfaces are cleaned and disinfected, a fresh chemical charge and water go in, and consumables are restocked. On a well-run route the whole visit takes only a few minutes per unit.',
          'The truck does not dispose of anything on site. Collected waste is hauled to an approved receiving point — usually a municipal wastewater treatment plant, sometimes a licensed septage facility — where it enters the normal treatment process. Disposal is regulated, records are kept, and this is precisely why you must never treat a rental unit as a dumping point for anything else.',
        ],
      },
      {
        h2: 'Why the tank explains the rules',
        body: [
          'Once the mechanism is clear, the guidance stops feeling arbitrary.',
          'Wipes do not break down because the treatment is designed for waste and standard toilet paper, and there is no sewer flow to carry anything away. Trash takes up tank capacity you paid for and can block the suction hose. Solvents, fuel, bleach and paint kill the treatment chemistry, can react inside a sealed space, and contaminate a load that has to be lawfully disposed of. Foreign objects damage pumping equipment and often cannot be retrieved.',
          'Placement rules come from the same place. The unit has to sit level so the tank sits level and the vent works. It has to be reachable by a truck with a hose of finite length. And on a long rental, the service interval — not the number of units — is what determines whether capacity ever runs out.',
        ],
      },
      {
        h2: 'How the other unit types differ',
        body: [
          'Accessible units use exactly the same principle in a larger shell: ground-level entry, a wider door, room to turn a wheelchair, and support rails, over the same style of holding tank.',
          'Restroom trailers are genuinely different machines. They have flushing toilets, running-water sinks, interior lighting and often climate control, which means they need a power connection and either a water supply or a filled onboard tank. They hold fresh water and waste in separate tanks and need a level pad plus towing access. The comfort is much closer to an indoor bathroom, and so are the site requirements.',
          'Handwashing stations are simpler than either: a fresh-water tank, a foot or hand pump, soap and towels, and a greywater tank underneath. No power, no plumbing, and they are usually planned alongside toilets rather than instead of them.',
        ],
      },
      {
        h2: 'What this means when you rent one',
        body: [
          'Three practical consequences are worth carrying into a rental conversation.',
          'First, capacity is finite and refills on a schedule, so the honest answer about crew size and event length matters more than getting the lowest quote. Second, the placement you choose is also the placement a truck has to reach every service visit, not just on delivery day. Third, how people use the unit has a direct effect on how well the service schedule holds — a single bag of site rubbish in the tank can cost a working unit for days.',
          'None of this is complicated. It is a tank, a treatment, a vent, and a truck. Plan around those four things and portable sanitation is one of the more predictable parts of running a site or an event.',
        ],
      },
    ],
    links: [
      { href: '/blog/what-is-the-blue-liquid-in-porta-potties/', anchor: 'blue liquid' },
      { href: '/service/standard-porta-potty-rental/', anchor: 'standard unit' },
      { href: '/service/restroom-trailer-rental/', anchor: 'Restroom trailers' },
    ],
    sources: [
      ['EPA — Septage and domestic wastewater management', 'https://www.epa.gov/npdes/septage-management'],
      ['OSHA 29 CFR 1926.51 — Sanitation (construction)', 'https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.51'],
    ],
    faqs: [
      ['Where does the waste go in a porta potty?', 'It stays in a sealed holding tank underneath the unit until a vacuum truck pumps it out. The truck then hauls it to an approved receiving point, usually a municipal wastewater treatment plant or a licensed septage facility, where it enters the normal treatment process.'],
      ['Do porta potties need water or electricity?', 'Standard units need neither. They are self-contained, with a holding tank and a passive vent stack. Restroom trailers are different — most need a power connection and either a water supply or a filled onboard tank.'],
      ['How does a porta potty stay from smelling?', 'Two things work together: a chemical treatment in the tank that suppresses odour-causing bacteria, and a vent stack that carries tank air up above head height so fresh air is drawn down through the cabin instead.'],
      ['How often does the tank need emptying?', 'It depends entirely on usage. A standard tank absorbs roughly a day of heavy event use or about a week of light job-site use. Service frequency is set from crew size, attendance, and rental length rather than a default.'],
      ['Can a porta potty overflow?', 'A tank can fill if usage runs well beyond what the service schedule assumed. That is why being accurate about crew size and event length matters — it is the input that sets the service interval.'],
    ],
  },

  {
    slug: 'what-is-the-blue-liquid-in-porta-potties',
    order: 2,
    category: 'How it works',
    title: 'What Is the Blue Stuff in Porta Potties?',
    metaTitle: 'What Is the Blue Liquid in Porta Potties? | Star Portable Restrooms',
    description: 'What the blue liquid in a portable toilet actually is, what it does, why it is blue, why it turns green, and why modern formulas moved away from formaldehyde.',
    dek: 'It is not water dye for decoration. The blue liquid is doing four separate jobs at once, and its colour is a deliberate signal.',
    image: '/assets/blog/usage-guide.webp',
    alt: 'Portable restroom interior with treated tank fluid visible',
    readTime: 7,
    published: '2026-08-22',
    updated: '2026-08-22',
    takeaways: [
      'The blue liquid is a deodorising tank treatment, not cleaning fluid or plain dyed water.',
      'It suppresses odour bacteria, masks contents, adds fragrance, and helps break down waste and paper.',
      'Blue turning green then brown is a rough visual signal that the charge is spent.',
      'Most of the industry has moved away from formaldehyde-based formulas.',
    ],
    sections: [
      {
        h2: 'What it actually is',
        body: [
          'The blue liquid — the trade calls it blue juice, tank charge or deodoriser — is a purpose-made chemical treatment added to the holding tank after every pump-out, along with a few gallons of water. It is not there to clean the unit and it is not simply dyed water. It is a working formulation doing several jobs at once.',
          'Most products combine four kinds of ingredient. A biocide or bacteriostat slows the bacteria that generate odour. Surfactants and detergents break surface tension so solids and toilet paper disperse rather than sitting in a mass. Fragrance masks whatever the first two do not eliminate. And dye — almost always blue — hides the contents from view.',
        ],
      },
      {
        h2: 'Why blue, specifically',
        body: [
          'The colour choice is practical rather than aesthetic, and it does two useful things.',
        ],
        subs: [
          {
            h3: 'It hides the tank contents',
            body: ['A deep blue is opaque enough at working concentration that a user looking into the bowl sees colour rather than what is underneath. That is a meaningful part of why a serviced unit feels acceptable to use. Blue also reads as clean and clinical in a way that brown, green or red does not.'],
          },
          {
            h3: 'It shows when the charge is spent',
            body: ['This is the part most people never notice. Fresh treatment is vividly blue. As the tank fills and waste dilutes and reacts with it, the colour shifts through blue-green to green, and eventually to a murky brown. Service technicians read that shift as a rough indicator that the chemical charge is exhausted and the tank is overdue. If you look into a unit and see green or brown rather than blue, it needs servicing sooner rather than later.'],
          },
        ],
      },
      {
        h2: 'The formaldehyde question',
        body: [
          'For decades the standard formulations were formaldehyde-based. Formaldehyde is extremely effective at stopping bacterial activity, which is exactly what you want for odour control, and it was cheap.',
          'The problem appears at the other end of the process. Portable toilet waste is hauled to wastewater treatment plants, and those plants rely on living bacterial colonies to break sewage down. A strong biocide arriving in a tanker load can suppress that biology. Many treatment facilities responded by restricting or refusing formaldehyde-treated loads, and some jurisdictions regulate it directly. Formaldehyde also carries its own worker-exposure concerns.',
          'The result is that much of the industry has moved to formaldehyde-free products, typically built on quaternary ammonium compounds, biological or enzyme-based actives, or nitrate-based chemistry that works with treatment plants rather than against them. If it matters for your site or your local disposal rules, ask a supplier what they actually use — it varies by market and by operator.',
        ],
      },
      {
        h2: 'Is it dangerous?',
        body: [
          'Treat it as an industrial cleaning chemical, because that is what it is. In the tank, at working dilution, inside a unit being used normally, it presents no meaningful risk — you are not in contact with it.',
          'Concentrate is a different matter. It can irritate skin and eyes and should never be handled without gloves and eye protection. It should never be swallowed, and it is not something children should be able to reach. Suppliers publish a safety data sheet for whatever product they use, and on a job site that SDS belongs in the same file as everything else you keep.',
          'The practical rules for a renter are simple. Do not add anything to the tank yourself. Do not tip other chemicals in — bleach in particular can react badly with tank chemistry in an enclosed space. And do not attempt to drain or dispose of tank contents; that is regulated waste and it has to go to an approved facility.',
        ],
      },
      {
        h2: 'Why you should not top it up yourself',
        body: [
          'It is a reasonable-sounding idea: the blue has gone green, buy some deodoriser and add it. In practice it rarely helps and often hurts.',
          'Colour change is a symptom of a full or overloaded tank, not of a chemical shortage. Adding more treatment to a tank that needs pumping addresses the smell for a short time while the actual problem — capacity — keeps getting worse. Dosing also matters: these products are formulated for a specific volume of water in a specific tank size, and guessing produces either an ineffective mixture or an unnecessarily aggressive one.',
          'If a unit is turning colour faster than the service schedule anticipated, the honest fix is more frequent servicing. That is a phone call, and on a long rental it is a schedule adjustment rather than a fault.',
        ],
      },
      {
        h2: 'What the colour tells you as a customer',
        body: [
          'It is a genuinely useful field check, and it takes two seconds. Walk past a cluster and glance into a unit. Deep blue means it has been serviced recently and has capacity in hand. Green means the charge is working but the tank is getting there. Brown, or a strong smell despite a functioning vent, means it is overdue.',
          'On a multi-week job site that check is worth doing weekly across your standard units. If units are consistently green by mid-week on a schedule built for weekly service, the schedule was built for a smaller crew than you actually have, and it is cheaper to correct that than to live with it.',
        ],
      },
    ],
    links: [
      { href: '/blog/how-to-clean-a-porta-potty/', anchor: 'servicing' },
      { href: '/service/standard-porta-potty-rental/', anchor: 'standard units' },
    ],
    sources: [
      ['EPA — Septage and domestic wastewater management', 'https://www.epa.gov/npdes/septage-management'],
      ['OSHA — Formaldehyde standard 29 CFR 1910.1048', 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1048'],
    ],
    faqs: [
      ['What is the blue liquid in a porta potty?', 'It is a deodorising tank treatment added after every pump-out. It typically combines a biocide to slow odour-causing bacteria, surfactants to disperse waste and paper, fragrance, and blue dye to conceal the tank contents.'],
      ['Why does the blue liquid turn green?', 'The colour shifts from blue through green to brown as waste dilutes and reacts with the treatment. It is a rough visual signal that the chemical charge is spent and the tank is due for servicing.'],
      ['Is the blue liquid in porta potties toxic?', 'Treat it as an industrial cleaning chemical. At working dilution inside a tank it poses no meaningful risk to users, but the concentrate can irritate skin and eyes, should never be swallowed, and should be handled with gloves and eye protection. Suppliers publish a safety data sheet for the product they use.'],
      ['Does porta potty chemical still contain formaldehyde?', 'Much of the industry has moved away from it, because formaldehyde can suppress the bacteria that wastewater treatment plants rely on, and many facilities restrict treated loads. Formaldehyde-free formulations are common now, but it varies by operator, so ask if it matters for your site.'],
      ['Can I add more blue liquid myself?', 'It is not advisable. A colour change usually means the tank is full rather than short of chemical, so topping up masks a capacity problem while it gets worse. Dosing is also matched to tank size and water volume. Ask for more frequent servicing instead.'],
    ],
  },
  {
    slug: 'porta-potty-cleaner-salary',
    order: 3,
    category: 'Industry',
    title: 'How Much Do Porta Potty Cleaners Make?',
    metaTitle: 'How Much Do Porta Potty Cleaners Make? | Star Portable Restrooms',
    description: 'What portable sanitation service technicians earn, how the pay is structured, which credentials raise it, and where to find current wage data for your state.',
    dek: 'It is a licensed, route-based trade with a commercial driving component — and the pay structure reflects that more than the job title suggests.',
    image: '/assets/blog/usa-planning.webp',
    alt: 'Service technician working a portable restroom route',
    readTime: 7,
    published: '2026-08-22',
    updated: '2026-08-22',
    takeaways: [
      'The closest federal occupation code is 47-4071, septic tank servicers and sewer pipe cleaners.',
      'Pay is usually hourly with route, overtime and on-call components layered on top.',
      'A commercial driver licence is the single biggest lever on earnings.',
      'Look up current figures on the BLS wage data rather than trusting any article, including this one.',
    ],
    sections: [
      {
        h2: 'Where to get a real number',
        body: [
          'We are going to be straight about this: any article quoting a single national salary figure for portable sanitation work is giving you a number that is out of date, regionally meaningless, or both. Wages in this trade vary enormously by state, by metro density, by whether the role requires a commercial licence, and by season.',
          'The authoritative source is the Bureau of Labor Statistics Occupational Employment and Wage Statistics programme. The occupation that most closely matches this work is SOC 47-4071, Septic Tank Servicers and Sewer Pipe Cleaners. BLS publishes national and state-level medians and percentile bands, updated annually and free to search. That is where to look, and it takes about a minute.',
          'What we can usefully explain is how the pay is actually put together, because the structure is not obvious from the job title and it is what determines whether a given posting is a good offer.',
        ],
      },
      {
        h2: 'How the pay is structured',
        body: [
          'Most service technician roles are hourly rather than salaried, with several components stacked on the base rate.',
        ],
        subs: [
          {
            h3: 'Base hourly rate',
            body: ['The foundation, and the figure most job postings advertise. It varies with local cost of living and with how tight the driver market is in that metro. Dense urban routes and high-cost regions pay more, but so do remote areas where operators struggle to recruit at all.'],
          },
          {
            h3: 'Route or production pay',
            body: ['Many operators pay per unit serviced or per completed route rather than purely by the clock, or blend the two. An experienced technician who knows the route and works efficiently can earn meaningfully more than the base rate implies. It also means a well-planned route is worth money to the technician, not just the employer.'],
          },
          {
            h3: 'Overtime and seasonality',
            body: ['This trade has a pronounced season. Event work concentrates into spring through autumn, and in northern states construction demand collapses in winter and surges when the ground thaws. Overtime during peak season is common and is a real part of annual earnings, which is why an hourly rate alone understates the picture.'],
          },
          {
            h3: 'On-call and emergency work',
            body: ['Weekend event servicing, storm response, and emergency call-outs typically carry premium rates. Willingness to take on-call rotations is one of the more reliable ways to raise annual pay in the role.'],
          },
        ],
      },
      {
        h2: 'What raises earnings',
        body: [
          'A commercial driver licence is the single largest factor. Service trucks carrying substantial liquid loads frequently fall above the weight thresholds requiring a CDL, and the tanker endorsement matters too — liquid loads shift in transit and are treated as a distinct competency. A CDL holder is a materially different hire from a non-CDL one, and the pay gap reflects that.',
          'Beyond the licence, the things that move pay are mechanical aptitude for maintaining pumps and vacuum systems, a clean driving record, customer-facing competence for event and commercial sites, and route knowledge. Someone who can be trusted alone on a route, resolve a problem at a customer site, and keep the truck running is worth considerably more than the base rate.',
          'Career progression usually runs toward route supervision, dispatch and scheduling, fleet maintenance, or operations management. Some technicians move into sales or account management, since they already understand what a site actually needs better than most people who have never worked a route.',
        ],
      },
      {
        h2: 'What the job actually involves',
        body: [
          'Servicing work is a driving job with a service component, done largely alone and outdoors. A typical day means loading a vacuum truck, working a planned route of stops, and at each one pumping the tank, rinsing it, cleaning and disinfecting the interior surfaces, recharging the deodoriser, restocking consumables, and noting anything that needs repair.',
          'The unglamorous parts are real and worth naming. It is physical, it is outdoors in whatever weather the season provides, the early starts are genuine, and it involves human waste. Personal protective equipment — gloves, eye protection, appropriate clothing — is not optional, and neither is the handwashing discipline that goes with it.',
          'The parts people underrate are also real. The autonomy is high, the work is genuinely essential rather than performative, demand is stable because construction and events do not stop, and the barrier to entry is low relative to the earning ceiling once a CDL is in hand. Several operators will fund the licence for a promising hire.',
        ],
      },
      {
        h2: 'How to read a job posting',
        body: [
          'When you are comparing offers, the advertised hourly rate is the least informative number on the page. Ask four questions instead.',
          'Is a CDL required, and if you do not hold one, will they train and fund it? How is route or production pay calculated, and what does a competent technician actually clear in a typical week? What does the seasonal pattern look like here — are winter hours reduced, and is there off-season work? And what is the on-call rotation, at what premium?',
          'Answers to those tell you far more about annual earnings than a headline rate, and an employer who cannot answer them clearly has told you something too. Pair that with the BLS figures for your own state and you will have a realistic picture rather than a national average that describes nobody.',
        ],
      },
    ],
    links: [
      { href: '/blog/how-to-clean-a-porta-potty/', anchor: 'Servicing work' },
    ],
    sources: [
      ['BLS — Occupational Employment and Wage Statistics', 'https://www.bls.gov/oes/'],
      ['BLS — Septic tank servicers and sewer pipe cleaners (47-4071)', 'https://www.bls.gov/oes/current/oes474071.htm'],
      ['FMCSA — Commercial Driver Licence requirements', 'https://www.fmcsa.dot.gov/registration/commercial-drivers-license'],
    ],
    faqs: [
      ['How much do porta potty cleaners make?', 'Pay varies widely by state, metro, licence class and season, so a single national figure is misleading. The occupation maps most closely to BLS code 47-4071, septic tank servicers and sewer pipe cleaners, which publishes current national and state medians. Check that source for figures that apply to your area.'],
      ['Do you need a CDL to service portable toilets?', 'Often yes. Service trucks carrying large liquid loads frequently exceed the weight thresholds that require a commercial driver licence, and a tanker endorsement may also apply. It is the single biggest factor in what the role pays.'],
      ['Is porta potty servicing a good job?', 'It offers high autonomy, stable demand, and a low barrier to entry relative to the earning ceiling once a CDL is held. The trade-offs are genuine: physical outdoor work, early starts, and handling human waste with proper protective equipment.'],
      ['Is the work seasonal?', 'Substantially. Event work concentrates in spring through autumn, and northern construction demand drops sharply in winter and surges after the thaw. Overtime in peak season is a real component of annual earnings.'],
      ['What are the career paths from service technician?', 'Common routes are route supervision, dispatch and scheduling, fleet maintenance, and operations management. Some move into sales or account management, where route experience is a genuine advantage.'],
    ],
  },

];
