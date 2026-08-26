// Real, verifiable per-state facts used to differentiate the programmatic pages.

// The 21 states running their own OSHA-approved State Plan covering private-sector
// construction, with the agency that actually enforces 29 CFR 1926.51 equivalents.
export const statePlanAgency = {
  Arizona: 'ADOSH', California: 'Cal/OSHA',
  Indiana: 'IOSHA', Iowa: 'Iowa OSHA', Kentucky: 'Kentucky OSH', Maryland: 'MOSH',
  Michigan: 'MIOSHA', Minnesota: 'MNOSHA', Nevada: 'Nevada OSHA',
  'New Mexico': 'the New Mexico OHSB', 'North Carolina': 'NC OSH', Oregon: 'Oregon OSHA',
  'South Carolina': 'SC OSHA', Tennessee: 'TOSHA', Utah: 'UOSH', Vermont: 'VOSHA',
  Virginia: 'VOSH', Washington: 'Washington DOSH', Wyoming: 'Wyoming OSHA',
};

// State Plans that cover state and local government employees only — private
// construction in these states stays under federal OSHA.
export const publicSectorOnly = new Set([
  'Connecticut', 'Illinois', 'Maine', 'Massachusetts', 'New Jersey', 'New York',
]);

// Seasonal profile drives when demand peaks and what servicing has to cope with.
export const seasonProfiles = {
  'deep-freeze': { states: ['Minnesota','North Dakota','South Dakota','Montana','Wisconsin','Maine','Vermont','New Hampshire','Wyoming','Idaho'], label: 'a short, frost-limited outdoor season', body: 'Ground frost closes much of the outdoor construction season, so demand compresses hard into late spring through early autumn. Winter rentals are possible but need placement on ground that will not heave, and service routes can be weather-dependent for days at a time.' },
  'cold-winter': { states: ['Michigan','New York','Pennsylvania','Ohio','Iowa','Nebraska','Massachusetts','Connecticut','Rhode Island','New Jersey','Illinois','Indiana','Colorado','Utah','Washington','Oregon'], label: 'a distinct winter slowdown', body: 'Freeze-thaw cycles matter more than absolute cold here. Ground that is firm in the morning can turn soft by afternoon, which affects both placement stability and whether a service truck can reach a unit without leaving ruts.' },
  'humid-south': { states: ['Alabama','Mississippi','Louisiana','Georgia','South Carolina','North Carolina','Tennessee','Arkansas','Kentucky','Missouri','Virginia','West Virginia','Maryland','Delaware'], label: 'a year-round season with a humid summer peak', body: 'Work continues through winter, so rentals here tend to run longer than in northern states. Heat and humidity drive ventilation and service frequency in summer, and heavy thunderstorm rainfall can soften a placement area quickly.' },
  'storm-coast': { states: ['Florida','Texas','Oklahoma','Kansas'], label: 'a year-round season shaped by storm risk', body: 'Demand runs year-round, but severe weather is the planning constraint. Anchoring, placement away from standing water, and a plan for securing or relocating units ahead of a storm are worth agreeing before delivery rather than during a warning.' },
  'arid-heat': { states: ['Arizona','Nevada','New Mexico','California'], label: 'a heat-driven and monsoon-affected season', body: 'Extreme summer heat concentrates outdoor work into early mornings and makes shaded placement, ventilation, and nearby handwashing more important than they are in milder states. Monsoon and flash-flood season can also close low-lying access routes with little warning.' },
};

export const seasonFor = (name) => {
  for (const [key, profile] of Object.entries(seasonProfiles)) if (profile.states.includes(name)) return profile;
  return seasonProfiles['humid-south'];
};

export const oshaFor = (name) => {
  if (statePlanAgency[name]) return { kind: 'state-plan', agency: statePlanAgency[name] };
  if (publicSectorOnly.has(name)) return { kind: 'public-only' };
  return { kind: 'federal' };
};
