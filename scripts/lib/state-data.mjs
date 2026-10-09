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

// Practical weather considerations; not claims about actual demand or routes.
export const seasonProfiles = {
  'deep-freeze': { states: ['Minnesota','North Dakota','South Dakota','Montana','Wisconsin','Maine','Vermont','New Hampshire','Wyoming','Idaho'], label: 'cold-weather access and freeze protection', body: 'For cold-weather rentals, ask the provider about freeze protection, stable placement, snow clearance, and how weather affects servicing. Keep the access route usable throughout the rental.' },
  'cold-winter': { states: ['Michigan','New York','Pennsylvania','Ohio','Iowa','Nebraska','Massachusetts','Connecticut','Rhode Island','New Jersey','Illinois','Indiana','Colorado','Utah','Washington','Oregon'], label: 'seasonal changes in ground and access conditions', body: 'Freeze-thaw cycles matter more than absolute cold here. Ground that is firm in the morning can turn soft by afternoon, which affects both placement stability and whether a service truck can reach a unit without leaving ruts.' },
  'humid-south': { states: ['Alabama','Mississippi','Louisiana','Georgia','South Carolina','North Carolina','Tennessee','Arkansas','Kentucky','Missouri','Virginia','West Virginia','Maryland','Delaware'], label: 'heat, humidity, and wet-ground conditions', body: 'Plan ventilation and servicing around actual use and temperature. After heavy rain, check the placement surface and truck approach before delivery or a scheduled service visit.' },
  'storm-coast': { states: ['Florida','Texas','Oklahoma','Kansas'], label: 'storm exposure and changing access conditions', body: 'Check the forecast for the specific site and rental dates. Anchoring, placement away from standing water, and a plan for securing or relocating units ahead of a storm are worth agreeing before delivery rather than during a warning.' },
  'arid-heat': { states: ['Arizona','Nevada','New Mexico'], label: 'heat, sun exposure, and site-specific storm risk', body: 'Review safe placement, ventilation, and servicing during hot weather. Ask the vendor how storm runoff or flash-flood exposure at your exact site affects access; conditions differ across desert, urban, and higher-elevation locations.' },
};

export const seasonFor = (name) => {
  if (name === 'California') return { label: 'different coastal, inland, desert, and mountain conditions', body: 'Do not use one weather assumption for the entire state. For coastal locations, consider wind and rain exposure; for inland or desert sites, plan around heat and shade; for mountain access, check snow and road conditions for the actual dates.', source: 'https://www.weather.gov/media/sgx/documents/The_Weather_Guide.pdf' };

  for (const [key, profile] of Object.entries(seasonProfiles)) if (profile.states.includes(name)) return profile;
  return seasonProfiles['humid-south'];
};

export const oshaFor = (name) => {
  if (statePlanAgency[name]) return { kind: 'state-plan', agency: statePlanAgency[name] };
  if (publicSectorOnly.has(name)) return { kind: 'public-only' };
  return { kind: 'federal' };
};
