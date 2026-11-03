/**
 * Dinq Tour, Travel & Events — Why Ethiopia
 * 12 Reasons, Stopovers, 5 Action Areas for Destination Development, What Dinq Brings, and Our Big Idea
 * Master Content Aligned Verbatim with Zerihun Alemayehu's Official Specifications
 */

export interface ReasonItem {
  id: string;
  numeral: string;
  title: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  keyFacts: string[];
  image: string;
}

export const WHY_LEAD_STATEMENT = 'A land of thousands of years of history, living culture & extraordinary experiences.';

export const FIVE_VERBS = [
  {
    verb: 'DISCOVER',
    label: 'Ancient history, archaeology, architecture, UNESCO World Heritage, religious heritage, royal history, and living traditions.',
    icon: 'Compass',
  },
  {
    verb: 'EXPLORE',
    label: 'Mountains, forests, deserts, volcanoes, lakes, rivers, wetlands, national parks, and extraordinary landscapes.',
    icon: 'Mountain',
  },
  {
    verb: 'MEET',
    label: 'Local communities, farmers, artisans, guides, cultural practitioners, conservationists, and families who make Ethiopia what it is.',
    icon: 'Users',
  },
  {
    verb: 'TASTE',
    label: 'Ethiopian coffee, traditional cuisine, spices, local produce, regional specialties, and one of the world\'s most distinctive culinary cultures.',
    icon: 'Coffee',
  },
  {
    verb: 'EXPERIENCE',
    label: 'Festivals, music, dance, ceremonies, markets, village life, hiking, wildlife, photography, camping, and adventure.',
    icon: 'Flame',
  },
];

export const TWELVE_REASONS: ReasonItem[] = [
  {
    id: 'ancient-history-civilization',
    numeral: '01',
    title: 'ANCIENT HISTORY & CIVILIZATION',
    subtitle: 'Come for the history. Stay for the living heritage.',
    summary: 'Ethiopia offers thousands of years of history and some of Africa\'s most important archaeological, cultural, and architectural heritage. Explore ancient kingdoms, rock-hewn monoliths, royal palaces, manuscripts, and living antiquity.',
    highlights: [
      'Aksum and its ancient civilization',
      'Rock-hewn churches of Lalibela',
      'Fasil Ghebbi and Gondar\'s royal heritage',
      'Harar Jugol walled city',
      'Ancient archaeological landscapes',
      'Historic monasteries and churches',
      'Indigenous knowledge and living traditions',
      'Museums, monuments, manuscripts, and cultural landscapes',
    ],
    keyFacts: [
      'Aksum and its ancient civilization',
      'Rock-hewn churches of Lalibela',
      'Fasil Ghebbi and Gondar\'s royal heritage',
      'Harar Jugol walled city',
      'Ancient archaeological landscapes',
      'Historic monasteries and churches',
    ],
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'living-cultures',
    numeral: '02',
    title: 'LIVING CULTURES',
    subtitle: 'Meet the people. Hear their stories. Share their food. Experience their traditions.',
    summary: 'Ethiopia is home to remarkable cultural diversity. Across the country, travelers can encounter different languages, traditions, foods, clothing, music, architecture, crafts, ceremonies, and ways of life through respectful cultural interaction.',
    highlights: [
      'Over 80 distinct ethnolinguistic groups and living heritage',
      'Ancestral architectural styles from bamboo huts to stone houses',
      'Living crafts: pottery, weaving, iron-working, and basketry',
      'Respectful, community-led encounters that support local families',
    ],
    keyFacts: [
      'Over 80 distinct ethnolinguistic groups and living heritage',
      'Ancestral architectural styles from bamboo huts to stone houses',
      'Living crafts: pottery, weaving, iron-working, and basketry',
      'Respectful, community-led encounters that support local families',
    ],
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'extraordinary-landscapes',
    numeral: '03',
    title: 'EXTRAORDINARY LANDSCAPES',
    subtitle: 'Highlands • Mountains • Escarpments • Volcanoes • Deserts • Lakes • Forests • Rivers • Wetlands • Rift Valley • Savannah',
    summary: 'Few destinations offer such a dramatic range of landscapes within one country. From the dramatic cliffs of the Simien Mountains to the volcanic landscapes of Afar, Ethiopia offers extraordinary opportunities for adventure, nature, photography, and exploration.',
    highlights: [
      'Afro-alpine summits and 1,500m precipice drops',
      'Danakil Depression and active geothermal formations',
      'Great Rift Valley freshwater and soda lakes',
      'Western wetland floodplains and tropical rainforests',
    ],
    keyFacts: [
      'Afro-alpine summits and 1,500m precipice drops',
      'Danakil Depression and active geothermal formations',
      'Great Rift Valley freshwater and soda lakes',
      'Western wetland floodplains and tropical rainforests',
    ],
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'birthplace-of-coffee',
    numeral: '04',
    title: 'THE BIRTHPLACE OF COFFEE',
    subtitle: 'FROM FOREST TO CUP. EXPERIENCE THE STORY OF ETHIOPIAN COFFEE.',
    summary: 'Coffee is one of Ethiopia\'s most powerful cultural experiences. Travel through coffee landscapes in Kaffa, Jimma, Oromia, Sidama, Yirgacheffe, Guji, and Southwest Ethiopia.',
    highlights: [
      'Wild Arabica coffee forests of Kaffa and Yayu',
      'Artisan coffee farms and washing stations',
      'Harvesting, traditional roasting, and grinding',
      'Sacred three-round Ethiopian coffee ceremony (Abol, Tona, Baraka)',
      'Local food pairing and coffee farmer experiences',
      'Forest and community ecotourism',
    ],
    keyFacts: [
      'Wild Arabica coffee forests of Kaffa and Yayu',
      'Artisan coffee farms and washing stations',
      'Sacred three-round Ethiopian coffee ceremony (Abol, Tona, Baraka)',
      'Forest and community ecotourism',
    ],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'wildlife-birding',
    numeral: '05',
    title: 'WILDLIFE & BIRDING',
    subtitle: 'Diverse ecosystems and extraordinary endemic biodiversity',
    summary: 'Ethiopia offers diverse ecosystems and opportunities for wildlife observation, birding, nature walks, photography, and conservation-focused travel across Simien, Bale, Awash, Omo, Mago, Gambella, Chebera-Churchura, and Rift Valley lakes.',
    highlights: [
      'Endemic species: Ethiopian wolf, Walia ibex, Gelada baboon, Mountain nyala',
      'Massive seasonal white-eared kob and antelope migration in Gambella',
      'Forest elephant tracking in Chebera-Churchura and Babile',
      'Over 850 bird species including 30+ Horn of Africa endemics',
    ],
    keyFacts: [
      'Endemic species: Ethiopian wolf, Walia ibex, Gelada baboon, Mountain nyala',
      'Massive seasonal white-eared kob and antelope migration in Gambella',
      'Forest elephant tracking in Chebera-Churchura and Babile',
      'Over 850 bird species including 30+ Horn of Africa endemics',
    ],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'adventure-mountain-experiences',
    numeral: '06',
    title: 'ADVENTURE & MOUNTAIN EXPERIENCES',
    subtitle: 'WALK THE MOUNTAINS. FOLLOW THE TRAILS. DISCOVER ETHIOPIA ABOVE THE CLOUDS.',
    summary: 'For travelers who love the outdoors, Ethiopia offers hiking, trekking, camping, mountain exploration, nature walks, photography, and adventure across Simien, Bale, Menz, Ankober, Entoto, Guji, Gughe, Choke, Gurage Highlands, and Rift Valley.',
    highlights: [
      'Trek summits over 4,500m including Ras Dashen and Tulu Dimtu',
      'Highland escarpment walks along Ankober and Menz',
      'Urban Camping Ethiopia and Blue Nile Hiking signature adventures',
      'Expedition camping, mountain huts, and scenic eco-lodges',
    ],
    keyFacts: [
      'Trek summits over 4,500m including Ras Dashen and Tulu Dimtu',
      'Highland escarpment walks along Ankober and Menz',
      'Urban Camping Ethiopia and Blue Nile Hiking signature adventures',
      'Expedition camping, mountain huts, and scenic eco-lodges',
    ],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'festivals-celebrations',
    numeral: '07',
    title: 'FESTIVALS & CELEBRATIONS',
    subtitle: 'Faith • Culture • Music • Food • Community • Tradition',
    summary: 'Ethiopia\'s calendar is filled with celebrations that bring together faith, culture, music, food, community, and tradition. A festival journey with Dinq is designed to connect visitors with the story and culture behind the celebration, not simply the event itself.',
    highlights: [
      'Timket (Epiphany) with white-robed vigils in Gondar and Lalibela',
      'Meskel (Finding of the True Cross) with the grand Demera bonfire',
      'Enkutatash (Ethiopian New Year) with Adey Abeba blooms and songs',
      'Irreechaa Oromo Thanksgiving by sacred volcanic lakes',
      'Fichee-Chambalaalla Sidama New Year and communal harmony rites',
    ],
    keyFacts: [
      'Timket (Epiphany) with white-robed vigils in Gondar and Lalibela',
      'Meskel (Finding of the True Cross) with the grand Demera bonfire',
      'Enkutatash (Ethiopian New Year) with Adey Abeba blooms and songs',
      'Irreechaa Oromo Thanksgiving by sacred volcanic lakes',
    ],
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'food-culinary-culture',
    numeral: '08',
    title: 'FOOD & CULINARY CULTURE',
    subtitle: 'TASTE THE LAND. SHARE THE TABLE. DISCOVER ETHIOPIA THROUGH FOOD.',
    summary: 'Ethiopian food is an experience in itself: sourdough teff injera, rich aromatic wats, fresh highland vegetables, spiced clarified butter (Niter Kibbeh), and unhurried communal dining that brings people together.',
    highlights: [
      'Traditional sourdough injera baked over open clay mitad',
      'Regional dishes, rich Berberé spices, and fragrant herbs',
      'Vibrant weekly local spice and agricultural markets',
      'Hands-on farm-to-table cooking classes and coffee ceremonies',
    ],
    keyFacts: [
      'Traditional sourdough injera baked over open clay mitad',
      'Regional dishes, rich Berberé spices, and fragrant herbs',
      'Vibrant weekly local spice and agricultural markets',
      'Hands-on farm-to-table cooking classes and coffee ceremonies',
    ],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'community-ecotourism',
    numeral: '09',
    title: 'COMMUNITY & ECOTOURISM',
    subtitle: 'Tourism as a bridge between travelers and local communities',
    summary: 'Dinq develops experiences inspired by UN Tourism destination-management principles that emphasize quality experiences, sustainability, innovation, community benefit, and cooperation among tourism stakeholders.',
    highlights: [
      'Direct fair-wage compensation to local guides, scouts, and families',
      'Partnerships with farmers, artisans, and community accommodations',
      'Support for local conservation initiatives and habitat protection',
      'Zero-spectacle, dignity-first intercultural exchanges',
    ],
    keyFacts: [
      'Direct fair-wage compensation to local guides, scouts, and families',
      'Partnerships with farmers, artisans, and community accommodations',
      'Support for local conservation initiatives and habitat protection',
      'Zero-spectacle, dignity-first intercultural exchanges',
    ],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'photography-storytelling',
    numeral: '10',
    title: 'A DESTINATION FOR PHOTOGRAPHY & STORYTELLING',
    subtitle: 'One Country. Thousands of Stories.',
    summary: 'Ethiopia is a photographer\'s destination: capturing people, landscapes, wildlife, mountains, architecture, markets, festivals, food, coffee, traditional life, and dramatic sunrise and sunset lighting.',
    highlights: [
      'High-contrast chiaroscuro light in subterranean rock churches',
      'Golden-hour sunrise over Simien and Shewa escarpments',
      'Dignified, fully consensual cultural and portrait photography',
      'Astrophotography under pristine desert and alpine skies',
    ],
    keyFacts: [
      'High-contrast chiaroscuro light in subterranean rock churches',
      'Golden-hour sunrise over Simien and Shewa escarpments',
      'Dignified, fully consensual cultural and portrait photography',
      'Astrophotography under pristine desert and alpine skies',
    ],
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'addis-ababa-gateway',
    numeral: '11',
    title: 'ADDIS ABABA: YOUR GATEWAY TO ETHIOPIA',
    subtitle: 'The diplomatic and aviation capital of Africa',
    summary: 'As the country\'s capital and an important aviation hub, Addis Ababa is the ideal starting point for discovering Ethiopia. A traveler can combine a city experience with a wider Ethiopian journey into the highlands, Rift Valley, coffee country, or southern regions.',
    highlights: [
      'National Museum housing Lucy and ancient archaeological treasures',
      'Entoto Mountain panoramic viewpoints and fresh eucalyptus forest trails',
      'Historic Merkato, vibrant coffee houses, and contemporary cultural spaces',
      'Ethiopian Airlines 8–24 hour stopover program connecting global flights',
    ],
    keyFacts: [
      'National Museum housing Lucy and ancient archaeological treasures',
      'Entoto Mountain panoramic viewpoints and fresh eucalyptus forest trails',
      'Historic Merkato, vibrant coffee houses, and contemporary cultural spaces',
      'Ethiopian Airlines 8–24 hour stopover program connecting global flights',
    ],
    image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'longer-stopovers-opportunity',
    numeral: '12',
    title: 'THE NEW OPPORTUNITY: LONGER STOPOVERS',
    subtitle: 'TURN TRANSIT INTO TRAVEL.',
    summary: 'A traveler connecting through Addis Ababa should have a reason to leave the airport, discover the city, experience Ethiopian culture, and extend the journey into the country. The proposed 24-hour to 7-day visa-free stopover framework could transform transit passengers into genuine visitors once fully implemented.',
    highlights: [
      'ARRIVE → DISCOVER ADDIS → EXPERIENCE ETHIOPIA → EXTEND YOUR JOURNEY',
      'Bespoke layover experiences from 6 hours to 48 hours',
      'Day trips to Wonchi crater lake, Debre Libanos, or Menagesha Suba forest',
      'Seamless luggage handling, private 4x4 transport, and airport transfers',
    ],
    keyFacts: [
      'ARRIVE → DISCOVER ADDIS → EXPERIENCE ETHIOPIA → EXTEND YOUR JOURNEY',
      'Bespoke layover experiences from 6 hours to 48 hours',
      'Day trips to Wonchi crater lake, Debre Libanos, or Menagesha Suba forest',
      'Seamless luggage handling, private 4x4 transport, and airport transfers',
    ],
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
  },
];

// Stopover Section Specs
export const STOPOVER_CONTENT = {
  routeFlow: ['ARRIVE BOLE HUB', 'DISCOVER ADDIS', 'EXPERIENCE ETHIOPIA', 'EXTEND YOUR JOURNEY'],
  policyNotice: 'Important Notice on Stopovers & Visa Policies: Ethiopian Airlines currently offers an 8–24 hour Addis stopover program with hotel and transfer arrangements for eligible passengers, while the broader proposed 24-hour-to-7-day visa-free stopover policy had not yet entered into force as of the latest official information available. Dinq advises all international guests to check current e-Visa regulations before travel.',
  packages: [
    {
      hours: '6-Hour Stopover',
      title: 'Addis Express Heritage & Coffee',
      summary: 'National Museum (meet Lucy), panoramic skyline view from Entoto Mountain, and an authentic Ethiopian coffee ceremony at a historic café or artisan center.',
    },
    {
      hours: '12-Hour Stopover',
      title: 'Capital Culture, Merkato & Cuisine',
      summary: 'National Museum, Holy Trinity Cathedral, guided visit through the artisan quarters of Merkato, and a traditional Ethiopian culinary feast with acoustic folk music.',
    },
    {
      hours: '24-Hour Stopover',
      title: 'Addis & Menagesha Ancient Forest Escape',
      summary: 'Full city heritage tour, boutique hotel overnight stay, early morning excursion to Africa’s oldest state forest (Menagesha Suba) for colobus monkeys and century-old junipers.',
    },
    {
      hours: '48-Hour Stopover',
      title: 'Shewa Escarpment or Wonchi Crater Lake',
      summary: 'Venture beyond the city into Shewa: horseback descent into Wonchi emerald crater lake or Gelada baboon viewing at the Portuguese Bridge and Jemma River Gorge.',
    },
  ],
};

// 5 Action Areas Ethiopia Should Make Easier for International Travelers
export const WHAT_ETHIOPIA_SHOULD_EASE = [
  {
    numeral: '01',
    title: 'SIMPLE TRAVEL INFORMATION',
    desc: 'Travelers should be able to find clear, updated information about visa requirements, entry procedures, destinations, transportation, accommodation, safety, weather and seasons, local experiences, cultural etiquette, and emergency contacts.',
  },
  {
    numeral: '02',
    title: 'DIGITAL-FIRST TRAVEL SERVICES',
    desc: 'A modern tourism destination should allow travelers to plan as much as possible online through one cohesive digital journey: Discover → Plan → Book → Pay → Travel → Experience → Share. Aligned with UN Tourism digital transformation principles.',
  },
  {
    numeral: '03',
    title: 'EASY VISA & TRAVEL FACILITATION',
    desc: 'Visa procedures should be simple, transparent, digital, fast, and traveler-friendly. UN Tourism has identified travel facilitation and electronic visa processes as vital for making international travel accessible while maintaining security.',
  },
  {
    numeral: '04',
    title: 'BETTER AIR CONNECTIVITY',
    desc: 'International visitors need convenient connections between Ethiopia and major source markets, working collaboratively across airlines, airports, tour operators, hotels, DMCs, travel agencies, and international tourism organizations.',
  },
  {
    numeral: '05',
    title: 'QUALITY THROUGHOUT THE JOURNEY',
    desc: 'A destination is not judged only by its attractions. Travelers experience: Airport → Immigration → Transportation → Hotel → Guide → Restaurant → Attraction → Community → Shopping → Departure. Every step matters across accessibility, infrastructure, and sustainability.',
  },
];

// What Dinq Brings to the Journey
export const WHAT_DINQ_BRINGS = [
  'Tour Operations & Bespoke Itineraries',
  'Travel Services & Airport Transfers',
  'Professional Tour Guiding & Field Leaders',
  'Transportation & Land Cruiser 4x4 Fleet',
  'Adventure & Mountain Hiking (Blue Nile Hiking)',
  'Camping & Outdoor Experiences (Urban Camping Ethiopia)',
  'Heritage & Cultural Immersion',
  'Wildlife & Birding Expeditions',
  'Coffee & Culinary Tourism',
  'Community & Ecotourism Initiatives',
  'Photography & Documentary Field Logistics',
  'Festivals & Cultural Events',
  'Corporate Travel & Destination Management',
  'Custom Private Journeys Tailored to You',
];

export const OUR_BIG_IDEA = {
  header: 'OUR BIG IDEA',
  main: 'DON\'T JUST VISIT ETHIOPIA. EXPERIENCE IT.',
  lines: [
    'Walk through its history.',
    'Meet its people.',
    'Taste its food.',
    'Drink its coffee.',
    'Climb its mountains.',
    'Explore its forests.',
    'Watch its wildlife.',
    'Celebrate its festivals.',
    'Listen to its stories.',
    'And leave with something more valuable than photographs:',
    'A CONNECTION TO ETHIOPIA.',
  ],
  motto: 'DINQ TOUR, TRAVEL & EVENTS — DISCOVER THE PLACES · MEET THE PEOPLE · LIVE THE STORY.',
  footer: 'Ethiopia is waiting.',
};

export const WHY_PROMISE = 'Don’t just visit Ethiopia. Experience it.';
