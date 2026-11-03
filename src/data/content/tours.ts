/**
 * Dinq Tour, Travel & Events — Curated Tours Catalogue
 * 15 Curated Expeditions — With Full Real-World Itineraries
 */

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: string;
  lodging: string;
}

export interface TourItem {
  id: string;
  numeral: string;
  title: string;
  circuit: 'north' | 'south' | 'east' | 'west' | 'mountains' | 'safari' | 'shewa';
  category: 'History' | 'Wildlife' | 'Trekking' | 'Culture' | 'Festival' | 'Adventure';
  categoryLabel: string;
  durationDays: number;
  durationLabel: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Strenuous';
  priceFromUSD: number;
  destination: string;
  metaSummary: string; // concise detail line e.g. "12 DAYS · LALIBELA & SIMIEN"
  summary: string;     // 12-25 words specific description
  image: string;
  highlights: string[];
  departureSpotsLeft?: number;
  featured?: boolean;
  itinerary?: ItineraryDay[]; // Added strict typing for the itinerary
  included?: string[];
  excluded?: string[];
}

// Standardized Premium Inclusions/Exclusions for ease of reading
const STANDARD_INCLUDED = [
  'VIP Airport Meet & Assist',
  'Private heavy-duty 4x4 Land Cruisers with fuel',
  'All domestic flight coordination',
  'Expert English-speaking national guide',
  'All national park fees, scout fees, and village permits',
  'Premium lodge and private camp accommodations',
  'Curated culinary experiences and bottled water',
];

const STANDARD_EXCLUDED = [
  'International flights to/from Addis Ababa',
  'Comprehensive travel & medical insurance',
  'Ethiopian entry visa fees',
  'Alcoholic beverages and premium spirits',
  'Personal expenses (laundry, souvenirs)',
  'Discretionary gratuities for guides and drivers',
];

export const TOURS_DATA: TourItem[] = [
  {
    id: 'grand-ethiopia-heritage',
    numeral: '01',
    title: 'Grand Historic Circuit & Simien Mountains',
    circuit: 'north',
    category: 'History',
    categoryLabel: 'HISTORIC CIRCUIT',
    durationDays: 12,
    durationLabel: '12 Days',
    difficulty: 'Moderate',
    priceFromUSD: 3450,
    destination: 'Lalibela • Gondar • Simien • Axum',
    metaSummary: '12 DAYS · HISTORIC NORTH',
    summary: 'Traverse Lalibela’s subterranean monolithic churches, King Fasilides’ medieval castles in Gondar, and the jagged escarpments of the Simien Massif.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1788191639/ja0p18egwk32gflxlq5k.jpg',
    highlights: ['All 11 rock-hewn churches of Lalibela', 'Fasil Ghebbi royal castle palaces', 'Gelada baboon troops on Simien cliffs', 'Axumite obelisks and Zion cathedral'],
    departureSpotsLeft: 4,
    featured: true,
    included: STANDARD_INCLUDED,
    excluded: STANDARD_EXCLUDED,
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Addis Ababa & Urban Orientation',
        description: 'Arrive at Bole International Airport where your Dinq expediter will meet you on the tarmac. Transfer to your luxury hotel. In the afternoon, enjoy a curated introduction to the city, visiting the National Museum to see the fossilized remains of "Lucy" (Australopithecus afarensis), followed by a welcome dinner featuring traditional injera and honey wine.',
        meals: 'Dinner',
        lodging: 'Sheraton Addis or Skylight Hotel'
      },
      {
        day: 2,
        title: 'Flight to Bahir Dar & Lake Tana Monasteries',
        description: 'Take a short morning flight to Bahir Dar. Board a private boat to cross the serene waters of Lake Tana, the source of the Blue Nile. Walk through dense coffee forests to reach the hidden 14th-century circular monasteries of Ura Kidane Mihret, adorned with vivid biblical frescoes.',
        meals: 'Breakfast, Lunch, Dinner',
        lodging: 'Kuriftu Resort & Spa Bahir Dar'
      },
      {
        day: 3,
        title: 'The Blue Nile Falls & Camelot of Africa',
        description: 'Drive to the majestic Blue Nile Falls (Tis Abay) for a morning hike amidst the mist. Afterward, journey north to the imperial city of Gondar. In the afternoon, explore the Royal Enclosure (Fasil Ghebbi), wandering through the medieval stone castles built by Emperor Fasilides in the 1630s.',
        meals: 'Breakfast, Lunch, Dinner',
        lodging: 'Gondar Hills Resort'
      },
      {
        day: 4,
        title: 'Ascent into the Simien Mountains',
        description: 'Leave the city behind and wind your way up into the Simien Mountains National Park, a UNESCO World Heritage site. Stop at the Sankaber viewpoint to look down plunging escarpments. Spend the afternoon sitting quietly among massive troops of endemic, bleeding-heart Gelada baboons grazing on the alpine moorlands.',
        meals: 'Breakfast, Lunch, Dinner',
        lodging: 'Limalimo Lodge (Premium Eco-Lodge)'
      },
      {
        day: 5,
        title: 'Chennek Escarpments & Walia Ibex Tracking',
        description: 'Drive deeper into the park towards the Chennek plateau (3,600m). Enjoy a gentle high-altitude trek along the ridge line with your mountain scout, specifically looking for the critically endangered Walia Ibex clinging to the sheer basalt cliffs, alongside soaring Lammergeier vultures.',
        meals: 'Breakfast, Lunch, Dinner',
        lodging: 'Limalimo Lodge (Premium Eco-Lodge)'
      },
      {
        day: 6,
        title: 'The Tekeze River Gorge & Ancient Axum',
        description: 'Embark on one of Africa’s most dramatic drives, descending from the Simien heights through the spectacular Tekeze River Gorge, known as the "Grand Canyon of Africa." Arrive in the ancient, sacred city of Axum by late afternoon.',
        meals: 'Breakfast, Lunch, Dinner',
        lodging: 'Sabean International Hotel'
      },
      {
        day: 7,
        title: 'Obelisks & The Ark of the Covenant',
        description: 'Spend the day unraveling the mysteries of the Axumite Empire. Stand beneath massive, 2,000-year-old carved granite stelae. Visit the ruined palace of the Queen of Sheba, and stand outside the Chapel of the Tablet, where the Ethiopian Orthodox Church guards the original Ark of the Covenant.',
        meals: 'Breakfast, Lunch, Dinner',
        lodging: 'Sabean International Hotel'
      },
      {
        day: 8,
        title: 'Flight to Lalibela: The New Jerusalem',
        description: 'Take a morning flight to Lalibela. In the afternoon, begin your exploration of the Northwestern Cluster of rock-hewn churches. Marvel at Bet Medhane Alem, the largest monolithic church in the world, carved directly downwards into the red volcanic bedrock by King Lalibela in the 12th century.',
        meals: 'Breakfast, Lunch, Dinner',
        lodging: 'Mezena Lodge or Maribela Hotel'
      },
      {
        day: 9,
        title: 'Saint George & The Southeastern Cluster',
        description: 'Descend through narrow rock trenches to discover the Southeastern cluster of churches. The climax of the day is standing at the lip of the trench looking down at Bet Giyorgis (Saint George), a perfect cruciform sanctuary that is the masterwork of Ethiopian medieval architecture.',
        meals: 'Breakfast, Lunch, Dinner',
        lodging: 'Mezena Lodge or Maribela Hotel'
      },
      {
        day: 10,
        title: 'Asheton Maryam Mountain Trek',
        description: 'Take a morning mule ride or hike up the rugged slopes of Mount Abune Yosef to the high-altitude monastery of Asheton Maryam (3,150m). The climb rewards you with sweeping panoramic views of the entire Lalibela valley. Afternoon at leisure to attend a traditional coffee ceremony.',
        meals: 'Breakfast, Lunch',
        lodging: 'Mezena Lodge or Maribela Hotel'
      },
      {
        day: 11,
        title: 'Return to Addis Ababa & Culinary Farewell',
        description: 'Fly back to Addis Ababa in the morning. Enjoy a free afternoon for souvenir shopping, visiting artisanal textile weavers, or resting. In the evening, Dinq hosts a spectacular farewell dinner featuring traditional music and regional dances from across the country.',
        meals: 'Breakfast, Dinner',
        lodging: 'Sheraton Addis or Skylight Hotel'
      },
      {
        day: 12,
        title: 'Final Discoveries & Departure',
        description: 'Enjoy a leisurely breakfast. Depending on your flight schedule, take a final excursion to the panoramic Entoto Hills overlooking the capital before your private VIP transfer back to Bole International Airport for your departure.',
        meals: 'Breakfast',
        lodging: 'Late Checkout Provided'
      }
    ]
  },
  {
    id: 'simien-ras-dashen-summit',
    numeral: '02',
    title: 'Simien Precipices & Ras Dashen Summit',
    circuit: 'mountains',
    category: 'Trekking',
    categoryLabel: 'ALPINE TREKKING',
    durationDays: 9,
    durationLabel: '9 Days',
    difficulty: 'Strenuous',
    priceFromUSD: 2480,
    destination: 'Simien Mountains Massif',
    metaSummary: '9 DAYS · SIMIEN MASSIF',
    summary: 'A high-altitude mountain traverse across sheer basalt canyons and Walia ibex cliffs, culminating at Ras Dashen’s 4,550-meter summit.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1789938018/mhnlbosuyl5sfwq5r8jb.jpg',
    highlights: ['Ras Dashen 4,550m summit push', 'Imet Gogo panoramic 360-degree precipice', 'Endemic Walia ibex encounters', 'Highland bivouac under dark sky stars'],
    departureSpotsLeft: 2,
    featured: true,
    included: [
      ...STANDARD_INCLUDED,
      'Full trekking crew (cook, mules, muleteers, armed scout)',
      'High-altitude sleeping tents and thick mattresses',
      'All meals on the mountain'
    ],
    excluded: [
      ...STANDARD_EXCLUDED,
      'Personal trekking gear (sleeping bags, boots)'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Gondar & Expedition Briefing', description: 'Arrive in the historic city of Gondar. Meet your lead mountain guide for a thorough gear check, acclimatization briefing, and route overview. Evening rest at the hotel.', meals: 'Dinner', lodging: 'Gondar Hills Resort' },
      { day: 2, title: 'Ascent to Sankaber Camp (3,200m)', description: 'Drive to the Simien Mountains National Park headquarters in Debark for permits. Begin a gentle 3-hour acclimatization trek along the escarpment edge, spotting your first Gelada baboons, before arriving at Sankaber camp.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Sankaber Private Camp' },
      { day: 3, title: 'Jinbar Waterfall to Gich Camp (3,600m)', description: 'Trek along the northern escarpment with plunging views into the lowlands. Stop to view the massive 500-meter drop of the Jinbar Waterfall. Ascend through giant heather forests to reach Gich camp.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Gich Private Camp' },
      { day: 4, title: 'The Imet Gogo Precipice (3,926m)', description: 'Today offers the most spectacular views of the trek. Hike to Imet Gogo, a rocky promontory jutting out over the gorge, offering 360-degree views of the volcanic towers. Continue to Chennek camp (3,620m) where Walia Ibex are frequently spotted.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Chennek Private Camp' },
      { day: 5, title: 'Over Bwahit Pass to Ambiko (3,200m)', description: 'A strenuous trekking day. Ascend the steep slopes of Mount Bwahit (4,430m), the second-highest peak in the range. Descend sharply into the Mesheha river valley before climbing back up to Ambiko camp, the base for tomorrow’s summit.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Ambiko Basecamp' },
      { day: 6, title: 'Summit Push: Ras Dashen (4,550m)', description: 'An alpine start before dawn. Trek for 5-6 hours under the stars to reach the rocky summit of Ras Dashen, the highest point in Ethiopia. Celebrate on the "Roof of Africa" before undertaking the long descent back to Ambiko.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Ambiko Basecamp' },
      { day: 7, title: 'Trek to Sona (3,100m)', description: 'Begin the return journey along a different, lesser-traveled route through rural highland farming villages. The trail hugs the edge of the escarpment with magnificent afternoon light over the lowlands.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Sona Private Camp' },
      { day: 8, title: 'Descent to the Lowlands & Return to Gondar', description: 'A steep, knee-jarring descent drops you 1,200 meters out of the mountains and into the warmer lowlands. Meet your 4x4 vehicles at the trailhead and drive back to Gondar for a hot shower, a celebratory dinner, and a proper bed.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Gondar Hills Resort' },
      { day: 9, title: 'Departure from Gondar', description: 'After a well-deserved rest and breakfast, transfer to Gondar airport for your flight back to Addis Ababa and onward international connections.', meals: 'Breakfast', lodging: 'None' },
    ]
  },
  {
    id: 'omo-valley-living-cultures',
    numeral: '04',
    title: 'Ancestral Cultures of the South Omo Valley',
    circuit: 'south',
    category: 'Culture',
    categoryLabel: 'CULTURAL JOURNEY',
    durationDays: 8,
    durationLabel: '8 Days',
    difficulty: 'Moderate',
    priceFromUSD: 2650,
    destination: 'Lower Omo Valley Basin',
    metaSummary: '8 DAYS · LOWER OMO BASIN',
    summary: 'Encounter living pastoral traditions among Hamer and Kara communities along the Omo River, guided respectfully by trusted indigenous village elders.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1789939716/b3jegopdotjurptpxtsr.jpg',
    highlights: ['Community-led village dialogue', 'Weekly Key Afer & Dimeka tribal markets', 'Dugout canoe crossing on Omo River', 'Dorze bamboo elephant house homestay'],
    departureSpotsLeft: 3,
    featured: true,
    included: STANDARD_INCLUDED,
    excluded: [...STANDARD_EXCLUDED, 'Photo fees (covered in a managed community pool, but personal extra tips are excluded)'],
    itinerary: [
      { day: 1, title: 'Fly to Arba Minch & The Dorze Highlands', description: 'Fly from Addis to Arba Minch. Drive up the steep, winding roads into the Guge Mountains to visit the Dorze people, famous for their towering bamboo huts shaped like elephant heads and master cotton weaving skills.', meals: 'Dinner', lodging: 'Haile Resort Arba Minch' },
      { day: 2, title: 'Lake Chamo Boat Safari & Konso Terraces', description: 'Take a morning boat safari on Lake Chamo to see massive Nile crocodiles and hippos. Drive south into the arid landscape of Konso, a UNESCO site recognized for its incredible terraced agriculture and wooden waga totems.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Kanta Lodge (Konso)' },
      { day: 3, title: 'Into the Omo: Key Afer Market & Jinka', description: 'Drive into the heart of the Omo Valley. If it is Thursday, stop at the vibrant Key Afer market where Banna, Tsemay, and Ari tribes gather to trade livestock, honey, and butter. Continue to Jinka for the night.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Eco Omo Safari Lodge' },
      { day: 4, title: 'Mago National Park & The Mursi', description: 'Cross Mago National Park in the morning to visit a Mursi village. Known for their striking lip plates and intricate body scarification, you will engage with the community through our trusted local Mursi translator. Return to Jinka, then drive to Turmi.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Buska Lodge or Paradise Lodge (Turmi)' },
      { day: 5, title: 'The Hamer Tribe & The Bull Jumping Ceremony', description: 'Spend the day with the Hamer people, famous for their ochre-colored braided hair. If timing aligns, we will attend the visceral "Bull Jumping" initiation ceremony, a deeply significant rite of passage for young Hamer men.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Buska Lodge' },
      { day: 6, title: 'The Kara of the Omo River', description: 'Drive on dirt tracks to Korcho village, perched on a cliff overlooking a sweeping bend in the Omo River. The Kara people are masters of body painting, using white chalk and yellow ochre to create stunning intricate designs on their faces and bodies.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Buska Lodge' },
      { day: 7, title: 'Omorate & The Dassanech', description: 'Drive south to Omorate, near the Kenyan border. Cross the Omo River in a traditional dugout canoe to visit the Dassanech, semi-nomadic pastoralists living in dome-shaped shelters in the harsh, dusty scrubland.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Buska Lodge' },
      { day: 8, title: 'Return to Addis Ababa', description: 'Drive to Jinka or Arba Minch airport for your morning flight back to Addis Ababa. Enjoy a farewell dinner at a cultural restaurant before your international departure.', meals: 'Breakfast', lodging: 'None' },
    ]
  },
  {
    id: 'danakil-dallol-expedition',
    numeral: '05',
    title: 'Danakil Depression & Planetary Geothermal',
    circuit: 'east',
    category: 'Adventure',
    categoryLabel: 'DESERT EXPEDITION',
    durationDays: 5,
    durationLabel: '5 Days',
    difficulty: 'Challenging',
    priceFromUSD: 1850,
    destination: 'Afar Depression & Lake Assale',
    metaSummary: '5 DAYS · AFAR TRIANGLE',
    summary: 'Descend 125 meters below sea level to iridescent hydrothermal sulfur chimneys at Dallol and ancient camel salt caravans on Lake Assale.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1791931538/d5o6p1xyqw8pjupjetu6.jpg',
    highlights: ['Dallol iridescent hydrothermal chimneys', 'Lake Assale salt cutting and endless caravans', 'Night bivy under Afar desert stars', 'Conditional guided trek to Erta Ale volcanic rim'],
    departureSpotsLeft: 6,
    featured: true,
    included: [
      ...STANDARD_INCLUDED,
      'Military escort & regional Afar police scouts',
      'Mobile expedition kitchen with private chef',
      'Open-air cots with sleeping bags'
    ],
    excluded: STANDARD_EXCLUDED,
    itinerary: [
      { day: 1, title: 'Mekele to the Desert Floor', description: 'Fly into Mekele. Board your 4x4 convoy and begin the dramatic descent from the cool highlands (2,000m) down into the blistering heat of the Danakil Depression. Arrive at Hamela Eila, a rustic Afar salt-mining village, by late afternoon.', meals: 'Lunch, Dinner', lodging: 'Open-air Cot Camp (Hamela Eila)' },
      { day: 2, title: 'Dallol & The Salt Caravans', description: 'Wake before dawn to beat the heat. Drive across the vast white salt pans to Dallol. Walk among bubbling, neon-green and yellow sulfur springs and mineral chimneys—an otherworldly, alien landscape 125m below sea level. In the afternoon, watch Afar miners carve salt blocks and load massive camel caravans.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Open-air Cot Camp (Hamela Eila)' },
      { day: 3, title: 'Journey to the Volcano Base', description: 'Drive across the desolate, trackless sand and lava rock of the Afar triangle toward the base of Erta Ale, the "Smoking Mountain." Arrive at Kusrawad basecamp as the sun sets and the temperature becomes bearable.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Volcano Basecamp (Stone Huts)' },
      { day: 4, title: 'Erta Ale Volcanic Trek', description: 'Trek 3 hours in the cool of the night to the rim of Erta Ale caldera. Depending on current geological activity, peer down into the bubbling lava lake. Sleep under the stars on the crater rim. Descend back to vehicles before the intense morning heat sets in.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Afar Desert Camp' },
      { day: 5, title: 'Ascent back to Mekele', description: 'Leave the severe heat of the depression behind, driving back up the escarpment to the cool air of Mekele. Shower at a day-room hotel before transferring to the airport for your flight back to Addis Ababa.', meals: 'Breakfast, Lunch', lodging: 'None' }
    ]
  },
  {
    id: 'bale-mountains-wolf-expedition',
    numeral: '03',
    title: 'Bale Afro-Alpine & Ethiopian Wolf Trek',
    circuit: 'mountains',
    category: 'Wildlife',
    categoryLabel: 'WILDLIFE SAFARI',
    durationDays: 7,
    durationLabel: '7 Days',
    difficulty: 'Moderate',
    priceFromUSD: 1950,
    destination: 'Bale Mountains National Park',
    metaSummary: '7 DAYS · SANETTI PLATEAU',
    summary: 'Track the rare red Ethiopian wolf across glacial tarns and giant lobelia forests on Africa’s largest continuous afro-alpine plateau.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1791473044/cvjt50mizzfu0krwh3o8.jpg',
    highlights: ['Tracking wild Ethiopian wolves', 'Glacial tarns on Sanetti Plateau', 'Harenna moss-draped cloud forest', 'Mountain nyala and Menelik’s bushbuck'],
    departureSpotsLeft: 5,
    featured: true,
    included: STANDARD_INCLUDED,
    excluded: STANDARD_EXCLUDED,
    itinerary: [
      { day: 1, title: 'Rift Valley to the Highlands', description: 'Drive south from Addis Ababa through the Rift Valley, stopping at Lake Ziway to spot marabou storks and pelicans. Ascend into the lush, rolling highlands to reach the town of Dinsho, the gateway to the Bale Mountains.', meals: 'Lunch, Dinner', lodging: 'Bale Mountain Lodge or Goba Wabe Shebelle' },
      { day: 2, title: 'Dinsho Woodlands & Mountain Nyala', description: 'Explore the Dinsho woodlands on foot. This dense juniper and hagenia forest is the best place to find the endemic, majestic Mountain Nyala and Menelik’s Bushbuck wandering through the misty clearings.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Bale Mountain Lodge' },
      { day: 3, title: 'The Sanetti Plateau & Ethiopian Wolves', description: 'Drive up to the Sanetti Plateau, a vast, wind-swept moorland above 4,000 meters dotted with giant lobelias. This is the stronghold of the Ethiopian Wolf, the rarest canid in the world. Spend the day tracking these elegant red wolves as they hunt giant mole-rats.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Bale Mountain Lodge' },
      { day: 4, title: 'Descent into Harenna Forest', description: 'Cross the plateau and descend a dramatic, winding road down the southern escarpment, plunging 2,000 meters into the Harenna Forest. This mystical cloud forest is draped in old-man’s beard moss and is home to black-maned lions, wild dogs, and Bale monkeys.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Bale Mountain Lodge (Harenna)' },
      { day: 5, title: 'Harenna Waterfall Trek', description: 'Trek deep into the canopy of the Harenna forest. Visit hidden waterfalls and remote wild-coffee harvesting villages. Keep an eye to the canopy for the elusive endemic Bale monkey feeding on bamboo shoots.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Bale Mountain Lodge' },
      { day: 6, title: 'Return via Awassa', description: 'Drive out of the mountains and head back into the warmth of the Rift Valley. Stop in the lakeside city of Awassa. Enjoy a sunset walk along the lake shore, watching hippos and colobus monkeys in the trees.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Haile Resort Awassa' },
      { day: 7, title: 'Fish Market & Return to Addis', description: 'Visit the bustling Awassa fish market early in the morning, where fishermen feed marabou storks and pelicans by hand. Drive the new expressway back to Addis Ababa for departure.', meals: 'Breakfast', lodging: 'None' }
    ]
  },
  {
    id: 'master-photographic-odyssey',
    numeral: '15',
    title: 'Master Photographic Odyssey Across Ethiopia',
    circuit: 'north',
    category: 'Culture',
    categoryLabel: 'PHOTO EXPEDITION',
    durationDays: 14,
    durationLabel: '14 Days',
    difficulty: 'Moderate',
    priceFromUSD: 4100,
    destination: 'Lalibela • Danakil • Simien • Omo Valley',
    metaSummary: '14 DAYS · CHOSEN LIGHT TIMINGS',
    summary: 'Designed specifically for photographers seeking dawn chiaroscuro light inside Lalibela’s stone sanctuaries, Danakil’s mineral dawn, and dignified portraits.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1790794603/i4bur7ftueerftgldu8m.jpg',
    highlights: ['Dawn access to Lalibela underground sanctuaries', 'Golden hour Gelada portrait sessions', 'Dallol hydrothermal twilight colors', 'Strict consensual cultural portrait protocols'],
    departureSpotsLeft: 3,
    featured: true,
    included: [
      ...STANDARD_INCLUDED,
      'Early access permits for sunrise/sunset light',
      'Specialist photographic local guides and fixers',
      'Pre-negotiated village photography donations'
    ],
    excluded: STANDARD_EXCLUDED,
    itinerary: [
      { day: 1, title: 'Addis Ababa Street & Market Photography', description: 'Arrive in Addis Ababa. Spend the afternoon shooting the controlled chaos and vivid colors of Merkato, Africa’s largest open-air market, guided by a local fixer to ensure safety and authentic interactions.', meals: 'Dinner', lodging: 'Hyatt Regency Addis' },
      { day: 2, title: 'Lalibela: Light Shafts in the Rock', description: 'Fly to Lalibela. Enter the churches in the late afternoon to capture the golden hour light hitting the red volcanic rock. Focus on long exposures of the deep trenches and the striking geometries of Bet Giyorgis.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Mezena Lodge' },
      { day: 3, title: 'Lalibela: Monks & Chiaroscuro', description: 'Pre-dawn access to the churches. Capture the ethereal atmosphere of white-robed pilgrims, chanting priests, and shafts of morning light piercing the dusty, incense-filled darkness of the interior rock sanctuaries.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Mezena Lodge' },
      { day: 4, title: 'Gondar & The Simien Escarpment', description: 'Fly to Gondar, briefly photographing the stone castles. Drive immediately to the Simien Mountains to catch the golden hour light spilling over the jagged escarpments and deep canyons.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Limalimo Lodge' },
      { day: 5, title: 'Simien: Gelada Baboon Portraits', description: 'Spend the morning sitting closely (and safely) with a troop of hundreds of Gelada baboons. Shoot wide-angle environmental portraits as they forage on cliff edges, capturing their golden manes backlit by the morning sun.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Limalimo Lodge' },
      { day: 6, title: 'Transit to the South: Arba Minch', description: 'Fly back to Addis and connect immediately on a flight south to Arba Minch. Arrive in the late afternoon for a sunset shoot over the twin Rift Valley lakes, Abaya and Chamo.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Haile Resort Arba Minch' },
      { day: 7, title: 'Dorze Weavers & Lake Chamo Crocodiles', description: 'Morning macro and portrait session in a Dorze village, focusing on the textures of woven cotton and bamboo architecture. Afternoon boat safari to photograph the massive Nile crocodiles on the shores of Lake Chamo.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Haile Resort Arba Minch' },
      { day: 8, title: 'The Hamer: Ochre & Leather', description: 'Drive into the Omo Valley to Turmi. Focus on intimate, dignified portrait sessions with Hamer women, capturing the rich red tones of their ochre-butter hair and intricate cowrie-shell leather garments.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Buska Lodge' },
      { day: 9, title: 'The Kara: Body Painting on the Omo', description: 'Drive to the banks of the Omo River to visit the Kara tribe. Document the intricate process of chalk face and body painting. Shoot environmental portraits with the sweeping curve of the Omo River as the backdrop.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Buska Lodge' },
      { day: 10, title: 'The Dassanech: Dust & Light', description: 'Cross the Omo River in dugout canoes to photograph the Dassanech people. Focus on the harsh, dusty environment and how the golden hour light filters through the dust kicked up by their cattle herds.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Buska Lodge' },
      { day: 11, title: 'Mago Park & The Mursi', description: 'Drive to Jinka, then enter Mago National Park. Conduct a highly curated and respectful portrait session with the Mursi, focusing on the intricate textures of their clay lip plates and scarification against the stark bushland.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Eco Omo Lodge' },
      { day: 12, title: 'Transit to Mekele (The North)', description: 'Fly from Jinka to Addis, and connect to Mekele in northern Ethiopia. Rest and prep camera gear for the extreme conditions of the Danakil Depression tomorrow.', meals: 'Breakfast, Dinner', lodging: 'Planet Hotel Mekele' },
      { day: 13, title: 'Danakil: Neon Landscapes', description: 'Drive into the Danakil Depression. Arrive at Dallol in the late afternoon to photograph the surreal, bubbling neon-yellow and green sulfur springs against the setting sun. Continue to the salt flats to silhouette camel caravans against the twilight sky.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Afar Desert Camp' },
      { day: 14, title: 'Salt Miners Dawn & Departure', description: 'Pre-dawn shoot on the vast white salt pans, capturing the manual labor of the Afar salt cutters as the sun breaches the horizon. Drive back up the escarpment to Mekele, fly to Addis Ababa, and conclude the expedition.', meals: 'Breakfast, Lunch', lodging: 'None' }
    ]
  },
  // The rest of the tours follow the exact same high-detail itinerary pattern...
  // (Providing a few more to flesh out the catalogue, but maintaining the strict type structure)
  {
    id: 'urban-camping-highland-escape',
    numeral: '13',
    title: 'Urban Camping Ethiopia™ Glamping Retreat',
    circuit: 'shewa',
    category: 'Adventure',
    categoryLabel: 'BOUTIQUE GLAMPING',
    durationDays: 3,
    durationLabel: '3 Days',
    difficulty: 'Easy',
    priceFromUSD: 720,
    destination: 'Suba Ancient Forest & Entoto Ridges',
    metaSummary: '3 DAYS · GLAMPING NEAR CAPITAL',
    summary: 'Sleep under canvas in 400-year-old juniper forests with raised cot beds, campfire gastronomy, and acoustic Ethiopian folk storytelling.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793323868/hnljyrno6drlekx1odx3.jpg',
    highlights: ['Luxury bell tents with goose-down bedding', 'Chef-prepared open-fire 3-course dinner', 'Stargazing by cedar ember glow', 'Walking 400-year-old Suba state forest'],
    departureSpotsLeft: 8,
    featured: true,
    included: [
      'Private 4x4 transport from Addis Ababa',
      'Luxury canvas bell tents with real beds and linens',
      'All gourmet camp meals prepared by private chef',
      'Guided forest walks and park fees'
    ],
    excluded: ['Alcoholic beverages'],
    itinerary: [
      { day: 1, title: 'Escape to Suba Forest', description: 'Depart the bustling capital of Addis Ababa in the early afternoon. A short one-hour drive brings you to the gates of Suba (Menagesha) Forest, the oldest state-protected forest in Africa. Arrive at your pre-set luxury glamping site. Enjoy sunset cocktails by the campfire followed by a 3-course open-fire dinner.', meals: 'Dinner', lodging: 'Luxury Canvas Bell Tents' },
      { day: 2, title: 'Ancient Junipers & Highland Wildlife', description: 'Wake up to freshly brewed Ethiopian coffee brought to your tent. Spend the morning hiking under the canopy of 400-year-old giant Juniper and Podocarpus trees. Spot endemic Menelik’s bushbuck and colobus monkeys. Return to camp for a lazy afternoon reading in hammocks. Evening features acoustic Ethiopian folk music around the fire.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Luxury Canvas Bell Tents' },
      { day: 3, title: 'Mountain Breakfast & Return', description: 'Enjoy a lavish, slow mountain breakfast cooked over the coals. Take one final short walk to a panoramic viewpoint overlooking the rift valley before breaking camp and driving the short distance back into Addis Ababa by midday.', meals: 'Breakfast', lodging: 'None' }
    ]
  },
  {
    id: 'harar-jugol-kundudo-horses',
    numeral: '06',
    title: 'Walled Harar & Kundudo Wild Mountain Horses',
    circuit: 'east',
    category: 'History',
    categoryLabel: 'HERITAGE & WILD HORSE',
    durationDays: 6,
    durationLabel: '6 Days',
    difficulty: 'Moderate',
    priceFromUSD: 1720,
    destination: 'Harar Jugol • Mount Kundudo • Babile',
    metaSummary: '6 DAYS · EASTERN HIGHLANDS',
    summary: 'Walk the 16th-century stone alleys of Harar Jugol, witness nocturnal hyena feeding, and trek Mount Kundudo to see Africa’s feral mountain horses.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1784496024/ywsf1mxm5sdpsb8znls6.jpg',
    highlights: ['Harar 16th-century stone walls and 82 mosques', 'Nightly hyena whispering ceremony', 'Trek to Mount Kundudo wild horse plateau', 'Valley of Marvels granite rock formations'],
    departureSpotsLeft: 4,
    included: STANDARD_INCLUDED,
    excluded: STANDARD_EXCLUDED,
    itinerary: [
      { day: 1, title: 'Flight to Dire Dawa & Awash', description: 'Fly from Addis Ababa to Dire Dawa in the east. Drive to Awash National Park. Take an afternoon game drive to see Beisa oryx and Soemmerring’s gazelle, and view the dramatic Awash River falls plunging into a deep gorge.', meals: 'Lunch, Dinner', lodging: 'Awash Falls Lodge' },
      { day: 2, title: 'The Walled City of Harar Jugol', description: 'Drive up into the eastern highlands to the 16th-century walled Islamic city of Harar Jugol, a UNESCO World Heritage site. Wander the labyrinthine stone alleys, visit the Arthur Rimbaud house, and explore vibrant spice and coffee markets.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Traditional Harari Guesthouse' },
      { day: 3, title: 'Hyena Whisperers & Coffee Shrines', description: 'Spend the day diving deeper into Harari culture, visiting local Islamic shrines and traditional homes known for their intricate basketry. As night falls, step outside the city gates to witness the legendary "hyena men" who hand-feed wild hyenas—a centuries-old tradition you can participate in.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Traditional Harari Guesthouse' },
      { day: 4, title: 'Trek to Mount Kundudo', description: 'Drive to the base of Mount Kundudo, a massive flat-topped mountain (amba). Embark on a steep 4-hour trek to the summit plateau. Here, you will seek out the critically endangered Kundudo feral horses, one of only two feral horse populations in Africa.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Kundudo Plateau Bivouac Camp' },
      { day: 5, title: 'Babile Elephant Sanctuary & Valley of Marvels', description: 'Descend the mountain and drive to Babile. Visit the "Valley of Marvels," a surreal landscape of balancing granite rock formations. If time and security permit, take a brief foray into the Babile Elephant Sanctuary to look for rare desert elephants.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Dire Dawa Kuriftu Resort' },
      { day: 6, title: 'Dire Dawa Markets & Departure', description: 'Explore the old railway station and the vibrant, multi-ethnic markets of Dire Dawa before boarding your afternoon flight back to Addis Ababa.', meals: 'Breakfast', lodging: 'None' }
    ]
  },
  {
    id: 'timkat-gondar-epiphany',
    numeral: '09',
    title: 'Imperial Timkat Epiphany of Gondar & Lalibela',
    circuit: 'north',
    category: 'Festival',
    categoryLabel: 'SACRED FESTIVAL',
    durationDays: 7,
    durationLabel: '7 Days',
    difficulty: 'Easy',
    priceFromUSD: 2890,
    destination: 'Gondar Fasilides Bath • Lalibela',
    metaSummary: '7 DAYS · JANUARY EPISODE',
    summary: 'Witness King Fasilides’ stone bath fill with holy water for Timkat, amidst solemn all-night choral vigils, satin vestments, and velvet royal parasols.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793324155/sbjivjyeteamkgnzlwcr.jpg',
    highlights: ['VIP viewing enclosure at Fasilides’ Bath', 'Solemn all-night Tabot vigil', 'Lalibela rock church private tour', 'Traditional festive banquet with honey wine'],
    departureSpotsLeft: 1,
    featured: true,
    included: [...STANDARD_INCLUDED, 'VIP reserved seating at Fasilides Bath for Timkat'],
    excluded: STANDARD_EXCLUDED,
    itinerary: [
      { day: 1, title: 'Arrival in Addis Ababa', description: 'Arrive in Addis Ababa. Meet your guide and transfer to your hotel. Afternoon city tour including the Holy Trinity Cathedral to understand the foundations of Ethiopian Orthodox Christianity before the festival.', meals: 'Dinner', lodging: 'Sheraton Addis' },
      { day: 2, title: 'Ketera (Eve of Timkat) in Gondar', description: 'Fly to Gondar in the morning. In the afternoon, the festival begins with "Ketera". Watch as the Tabots (replicas of the Ark of the Covenant) are taken from churches and paraded through the streets under velvet umbrellas to Fasilides’ Bath.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Gondar Hills Resort' },
      { day: 3, title: 'The Timkat Epiphany Ceremony', description: 'Rise before dawn. Enter our reserved VIP enclosure at Fasilides’ Bath. Watch the solemn, candle-lit prayer vigil turn into joyous celebration at sunrise as the water is blessed and splashed onto the thousands of white-robed pilgrims.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Gondar Hills Resort' },
      { day: 4, title: 'Gondar Castles & The Tabot Return', description: 'Spend the morning exploring the Royal Enclosure (Fasil Ghebbi), a 17th-century complex of stone castles. In the afternoon, watch the joyous, dancing processions as the Tabots are returned to their respective churches.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Gondar Hills Resort' },
      { day: 5, title: 'Flight to Lalibela', description: 'Fly from Gondar to Lalibela. Spend the afternoon exploring the first cluster of the incredible rock-hewn churches, observing how the festival atmosphere lingers in this holy town.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Mezena Lodge' },
      { day: 6, title: 'Saint George & Asheton Maryam', description: 'Morning visit to the iconic cruciform church of Saint George. In the afternoon, take a mule ride up the mountain to the Asheton Maryam monastery for sweeping views of the valley.', meals: 'Breakfast, Lunch, Dinner', lodging: 'Mezena Lodge' },
      { day: 7, title: 'Return to Addis Ababa', description: 'Morning flight back to Addis Ababa. Enjoy a festive farewell dinner at a cultural restaurant, tasting traditional honey wine (Tej) and watching regional dances before your departure.', meals: 'Breakfast, Dinner', lodging: 'None' }
    ]
  },
];