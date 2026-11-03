/**
 * Dinq Tour, Travel & Events — Journeys & National Routes
 * Five Ways, 7 National Routes, and 3 Signature Experiential Programs + Urban Camping
 * Aligned Verbatim with Zerihun Alemayehu's Official Company Specifications
 */

export interface FiveWayItem {
  id: string;
  name: string;
  verb: string;
  subtitle: string;
  image: string;
  tags: string[];
  routeSlug: string;
  summary: string;
}

export const FIVE_WAYS: FiveWayItem[] = [
  {
    id: 'north',
    name: 'North Ethiopia',
    verb: 'Discover History',
    subtitle: 'Ancient civilizations, heritage and sacred landscapes.',
    image: 'https://ambaseltourandtravel.com/wp-content/uploads/2023/12/photo_6022772982541300334_w.jpg',
    tags: ['Lalibela', 'Gondar', 'Axum', 'Tigray Highlands', 'Historic Churches', 'Monasteries'],
    routeSlug: '/tours?circuit=north',
    summary: 'Explore the roots of Ethiopian history through ancient kingdoms, sacred churches, historic cities, dramatic highlands, and centuries-old cultural traditions. Discover: Lalibela • Gondar • Axum • Tigray Highlands • Historic Churches • Monasteries • Ancient Heritage.',
  },
  {
    id: 'south',
    name: 'South Ethiopia',
    verb: 'Experience Culture',
    subtitle: 'Living traditions, communities and extraordinary diversity.',
    image: 'https://ambaseltourandtravel.com/wp-content/uploads/2024/12/photo_5807594854723730140_y.jpg',
    tags: ['Omo Valley', 'Indigenous Communities', 'Traditional Villages', 'Wildlife', 'Markets', 'Cultural Landscapes'],
    routeSlug: '/tours?circuit=south',
    summary: 'Travel into one of Ethiopia’s most culturally diverse regions, where traditional communities, extraordinary landscapes, wildlife, and living traditions create deeply authentic experiences. Discover: Omo Valley • Indigenous Communities • Traditional Villages • Wildlife • Markets • Cultural Landscapes • Community Tourism.',
  },
  {
    id: 'east',
    name: 'Eastern Ethiopia',
    verb: 'Enter the Walled City',
    subtitle: 'Harar, cultural crossroads and eastern landscapes.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1791478992/b9czuchjykzkdok5685y.jpg',
    tags: ['Harar', 'The Walled City', 'Harari Culture', 'Dire Dawa', 'Afar', 'Desert Landscapes'],
    routeSlug: '/tours?circuit=east',
    summary: 'Discover the cultural crossroads of eastern Ethiopia, from the historic Walled City of Harar to vibrant communities, ancient traditions, dramatic landscapes, and desert adventures. Discover: Harar • The Walled City • Harari Culture • Dire Dawa • Afar • Markets • Traditional Houses • Desert Landscapes.',
  },
  {
    id: 'west',
    name: 'Western Ethiopia',
    verb: 'Follow the Coffee',
    subtitle: 'Forests, coffee origins, nature and community.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1791483182/xx38kv7tjgtztu4pj9c1.jpg',
    tags: ['Kaffa', 'Jimma', 'Coffee Forests', 'Coffee Farms', 'Wildlife', 'Rivers', 'Community Life'],
    routeSlug: '/tours?circuit=west',
    summary: 'Journey into Ethiopia’s green west, where ancient forests, coffee landscapes, rivers, biodiversity, and welcoming communities reveal a lesser-known side of the country. Discover: Kaffa • Jimma • Coffee Forests • Coffee Farms • Wildlife • Rivers • Community Life • Ecotourism.',
  },
  {
    id: 'coffee-route',
    name: 'The Ethiopian Coffee Route',
    verb: 'Taste the Origin',
    subtitle: 'Follow Ethiopia\'s coffee story from forest to cup.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1790795391/dfmtrd1ywq5gbakuqmzo.jpg',
    tags: ['Coffee Origins', 'Coffee Farms', 'Forest Coffee', 'Farmers', 'Coffee Ceremony', 'Roasting & Tasting'],
    routeSlug: '/tours?circuit=coffee',
    summary: 'Follow the story of Ethiopian coffee from forest and farm to cup, connecting the legendary coffee landscapes of Kaffa, Jimma, Oromia, Sidama, Yirgacheffe, Guji, and Southwest Ethiopia. Discover: Coffee Origins • Coffee Farms • Forest Coffee • Farmers • Traditional Coffee Ceremony • Roasting • Tasting • Farm-to-Cup Experiences. ETHIOPIA — WHERE COFFEE BEGINS.',
  },
];

// 7 Dinq Signature National Routes
export interface NationalRoute {
  id: string;
  numeral: string;
  name: string;
  tagline: string;
  duration: string;
  routeStops: string[];
  routeString: string;
  themes: string[];
  summary: string;
}

export const NATIONAL_ROUTES: NationalRoute[] = [
  {
    id: 'great-rift-valley',
    numeral: '01',
    name: 'Great Rift Valley',
    tagline: 'From Volcanoes to Southern Communities',
    duration: '12–14 Days',
    routeString: 'Afar → Rift Valley → Lakes → Coffee Landscapes → Southern Ethiopia → Omo Valley',
    routeStops: ['Afar', 'Rift Valley', 'Lakes', 'Coffee Landscapes', 'Southern Ethiopia', 'Omo Valley'],
    themes: ['Volcanoes & Salt Flats', 'Rift Valley Lakes', 'Coffee Terroirs', 'Indigenous Communities'],
    summary: 'Traverse the entire geological spine of Ethiopia: from the tectonic rifts and desert volcanoes of Afar down through shimmering lakes, lush coffee hills, and the ancestral living cultures of the Omo Valley.',
  },
  {
    id: 'coffee-origins-journey',
    numeral: '02',
    name: 'Coffee Origins Journey',
    tagline: 'From Forest to Cup',
    duration: '9–11 Days',
    routeString: 'Kaffa → Jimma → Oromia → Sidama → Yirgacheffe',
    routeStops: ['Kaffa', 'Jimma', 'Oromia', 'Sidama', 'Yirgacheffe'],
    themes: ['Wild Arabica Biosphere', 'Washing Stations', 'Farmer Cooperatives', 'Ancestral Coffee Ceremony'],
    summary: 'Trace the world’s most celebrated beverage back to its original wild home in the ancient cloud forests of Kaffa, continuing through the artisan washing stations and historic kingdoms of Jimma, Sidama, and Yirgacheffe.',
  },
  {
    id: 'ethiopia-heritage-journey',
    numeral: '03',
    name: 'Ethiopia Heritage Journey',
    tagline: 'Ancient Faith • History • Architecture',
    duration: '10–14 Days',
    routeString: 'Addis Ababa → Amhara → Tigray → Historic Northern Ethiopia',
    routeStops: ['Addis Ababa', 'Amhara', 'Tigray', 'Historic Northern Ethiopia'],
    themes: ['Rock-Hewn Lalibela', 'Gondar Castles', 'Axumite Antiquity', 'Living Orthodox Liturgy'],
    summary: 'An imperial journey through thousands of years of unbroken civilization: monolithic rock churches carved from mountain stone, 17th-century castles, ancient stelae, and sacred highland monasteries.',
  },
  {
    id: 'wildlife-conservation-journey',
    numeral: '04',
    name: 'Wildlife & Conservation Journey',
    tagline: 'Wild Ethiopia',
    duration: '12–16 Days',
    routeString: 'National Parks → Forests → Wetlands → Wildlife → Community Conservation',
    routeStops: ['National Parks', 'Forests', 'Wetlands', 'Wildlife', 'Community Conservation'],
    themes: ['Endemic Wolves & Ibex', 'Tropical Wetlands', 'Elephant Tracking', 'Community Stewardship'],
    summary: 'Venture into Ethiopia’s protected ecosystems: tracking rare Ethiopian wolves in Bale, encountering Geladas in the Simiens, exploring western floodplains in Gambella, and supporting community-based conservation initiatives.',
  },
  {
    id: 'community-culture-journey',
    numeral: '05',
    name: 'Community & Culture Journey',
    tagline: 'Meet Ethiopia Through Its People',
    duration: '10–14 Days',
    routeString: 'Gurage → Oromia → Amhara → Sidama → Southern Ethiopia → Harari',
    routeStops: ['Gurage', 'Oromia', 'Amhara', 'Sidama', 'Southern Ethiopia', 'Harari'],
    themes: ['Village Homestays', 'Cultural Storytelling', 'Living Crafts', 'Traditional Cuisine'],
    summary: 'Connect with Ethiopia beyond the tourist trail. Share meals with farming families, learn ancient handicrafts from artisan guilds, participate in local ceremonies, and experience everyday hospitality.',
  },
  {
    id: 'urban-camping-ethiopia-route',
    numeral: '06',
    name: 'Urban Camping Ethiopia',
    tagline: 'Camp. Explore. Connect.',
    duration: '4–7 Days',
    routeString: 'Addis Ababa → Bishoftu → Adama → Hawassa → Jimma → Harar → Other Destinations',
    routeStops: ['Addis Ababa', 'Bishoftu', 'Adama', 'Hawassa', 'Jimma', 'Harar', 'Other Destinations'],
    themes: ['Boutique Glamping', 'Campfire Gastronomy', 'Starlight Over Ridges', 'Urban-to-Wild Escapes'],
    summary: 'Dinq’s signature hospitality innovation uniting luxury canvas tents, gourmet campfire dinners, acoustic music, and pristine mountain night skies across Ethiopia’s major cities and nearby highland landscapes.',
  },
  {
    id: 'ethiopia-photography-journey-route',
    numeral: '07',
    name: 'Ethiopia Photography Journey',
    tagline: 'One Country. Thousands of Stories.',
    duration: '14–18 Days',
    routeString: 'Mountains → Villages → Markets → Wildlife → Heritage → Culture → Landscapes',
    routeStops: ['Mountains', 'Villages', 'Markets', 'Wildlife', 'Heritage', 'Culture', 'Landscapes'],
    themes: ['Golden Hour Light', 'Dignified Portraits', 'Dramatic Escarpments', 'Chiaroscuro Liturgies'],
    summary: 'Curated specifically for serious visual storytellers and photographers, timed around golden hour light, dawn ascents, respectful cultural portraits, and access to breathtaking landscapes.',
  },
];

// Programme Pages Data (Verbatim experiential programs)
export interface ProgrammePageData {
  slug: string;
  title: string;
  eyebrow: string;
  kicker: string;
  subtitle: string;
  heroImage: string;
  summary: string;
  routeFlow?: string[];
  programPoints: string[];
  programmeList: {
    numeral: string;
    title: string;
    description: string;
  }[];
  tagline: string;
  promise: string;
  relatedJourneys: {
    title: string;
    route: string;
    duration: string;
  }[];
  hasShopButton?: boolean;
}

export const PROGRAMME_PAGES: Record<string, ProgrammePageData> = {
  'community-culture': {
    slug: 'community-culture',
    title: 'Ethiopian Culture & Community Experience',
    eyebrow: 'Meet Ethiopia Beyond the Tourist Trail',
    kicker: 'People • Living Culture • Community Respect',
    subtitle: 'Meet Ethiopia Beyond the Tourist Trail. Travel as a guest, discover living traditions, and connect deeply with local communities.',
    heroImage: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_2400/v1793567137/hbx4j7ejmfxkzgyylmcq.jpg',
    summary: 'Dinq’s Culture & Community Experience is built on authentic encounters: community welcomes, village visits, traditional dining, and genuine dialogue. We connect travelers with local lifestyles, storytelling, and artisans with dignity and mutual respect.',
    routeFlow: [
      'Community Welcome',
      'Traditional House Visit',
      'Local Lifestyle Experience',
      'Craft Demonstration',
      'Music & Dance',
      'Coffee Ceremony',
    ],
    programPoints: [
      'Community welcome',
      'Traditional house visit',
      'Local lifestyle experience',
      'Traditional craft demonstration',
      'Traditional music and dance',
      'Ethiopian food experience',
      'Local storytelling',
      'Coffee ceremony',
      'Traditional clothing experience',
      'Community interaction',
      'Local market experience',
      'Cultural photography',
    ],
    programmeList: [
      {
        numeral: '01',
        title: 'Community Welcome & Traditional House Visit',
        description: 'Receive a genuine, heartfelt greeting in an authentic village compound, exploring traditional domestic architecture, hearth arrangements, and family life.',
      },
      {
        numeral: '02',
        title: 'Local Lifestyle & Craft Demonstrations',
        description: 'Engage hands-on with pottery, traditional weaving, Enset preparation, or basketry alongside master village artisans.',
      },
      {
        numeral: '03',
        title: 'Ethiopian Food Experience & Coffee Ceremony',
        description: 'Share a communal table of authentic regional cuisine followed by the unhurried, fragrant three-round coffee ritual roasted over fresh coals.',
      },
      {
        numeral: '04',
        title: 'Music, Dance, Storytelling & Traditional Clothing',
        description: 'Experience local oral histories, acoustic folk instruments, cultural dress, and vibrant community interaction.',
      },
    ],
    tagline: 'Discover the Places · Meet the People · Live the Story',
    promise: 'Travel Deeper. Experience More. Travel with Purpose.',
    relatedJourneys: [
      { title: 'Zebider Mountain & Gurage Villages', route: '/mountains', duration: '3 Days' },
      { title: 'Royal Shewa Heritage Route', route: '/shewa-land-escape', duration: '3 Days' },
      { title: 'Living Cultures of South Omo', route: '/signature-routes', duration: '10 Days' },
    ],
  },
  'photography': {
    slug: 'photography',
    title: 'Ethiopia Photography Journey',
    eyebrow: '09. Photography Expedition',
    kicker: 'See Ethiopia. Capture Ethiopia.',
    subtitle: 'See Ethiopia. Capture Ethiopia. One country, thousands of stories.',
    heroImage: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_2400/v1793565373/unmln7ly1kysokhe6pyc.jpg',
    summary: 'A specialist journey crafted for photographers seeking dramatic geological contrasts, high-contrast chiaroscuro liturgical interiors, golden-hour mountain light, and dignified, respectful portrait photography.',
    routeFlow: [
      'Landscape Photography',
      'Sunrise & Golden Hour',
      'Portrait & Culture',
      'Wildlife in Hides',
      'Architecture & Markets',
      'Photo Review & Sharing',
    ],
    programPoints: [
      'Landscape photography',
      'Sunrise photography',
      'Cultural photography',
      'Portrait photography',
      'Wildlife photography',
      'Architecture photography',
      'Local market photography',
      'Traditional lifestyle photography',
      'Food photography',
      'Coffee ceremony photography',
      'Golden-hour photography',
      'Community storytelling',
      'Photo review and sharing',
    ],
    programmeList: [
      {
        numeral: '01',
        title: 'Landscape, Sunrise & Golden-Hour Photography',
        description: 'Positioned at dramatic viewpoints across Simien, Bale, Danakil, and Shewa escarpments during optimal golden and blue hour lighting.',
      },
      {
        numeral: '02',
        title: 'Dignified Cultural & Portrait Photography',
        description: 'Strict consensual protocols and genuine personal connection ensure portraits convey profound humanity and dignity.',
      },
      {
        numeral: '03',
        title: 'Wildlife & Architectural Documentation',
        description: 'Photograph endemic wildlife, ancient monolithic rock churches, castles, and vibrant market atmospheres with expert local timing.',
      },
      {
        numeral: '04',
        title: 'Food, Coffee & Evening Photo Reviews',
        description: 'Capture intimate details of traditional coffee ceremonies and local cuisine, concluding each day with relaxed fireside photo sharing.',
      },
    ],
    tagline: 'See Ethiopia. Capture Ethiopia. One Country. Thousands of Stories.',
    promise: 'Travel Deeper. Frame the Light. Live the Story.',
    relatedJourneys: [
      { title: 'Afar Desert & Volcano Safari', route: '/safari', duration: '6 Days' },
      { title: 'Simien Precipice Trek', route: '/mountains', duration: '7 Days' },
      { title: 'Shewa Photography Journey', route: '/shewa-land-escape', duration: '4 Days' },
    ],
  },
  'road-trip': {
    slug: 'road-trip',
    title: 'Ethiopian Road Trip',
    eyebrow: 'Overland Expedition',
    kicker: 'One Country. Many Worlds.',
    subtitle: 'One Country. Many Worlds. Feel the heartbeat of Ethiopia through the windshield.',
    heroImage: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_1600/v1793568053/db324frrtz1hwhbcniqd.jpg',
    summary: 'Ethiopia is one of the world’s most exhilarating overland territories. Our road trips combine scenic mountain passes, multiple destination explorations, roadside coffee ceremonies, weekly markets, and camping under the stars.',
    routeFlow: [
      'Scenic Road Journey',
      'Multiple Destination Exploration',
      'Local Food & Coffee Stops',
      'Hiking & Wildlife Walks',
      'Lodge & Camping Nights',
    ],
    programPoints: [
      'Scenic road journey',
      'Multiple destination exploration',
      'Local food experiences',
      'Cultural encounters',
      'Historical sites',
      'Nature and landscape exploration',
      'Hiking and outdoor activities',
      'Wildlife experiences',
      'Coffee experiences',
      'Community visits',
      'Photography',
      'Camping and lodge experiences',
      'Local markets',
      'Traditional music and entertainment',
    ],
    programmeList: [
      {
        numeral: '01',
        title: 'Scenic Road Journey & Multiple Destinations',
        description: 'Traverse epic highland escarpments, river gorges, and Rift Valley plains in meticulously prepared expedition 4x4 vehicles.',
      },
      {
        numeral: '02',
        title: 'Cultural Encounters, Historical Sites & Markets',
        description: 'Stop at vibrant weekly rural markets, ancient historical landmarks, and welcoming roadside villages throughout the journey.',
      },
      {
        numeral: '03',
        title: 'Outdoor Hiking, Wildlife & Coffee Experiences',
        description: 'Combine driving with refreshing hikes, wildlife observation in national parks, and spontaneous roadside coffee ceremonies.',
      },
      {
        numeral: '04',
        title: 'Camping, Lodge Stays & Traditional Music',
        description: 'Sleep in scenic lodges or boutique wilderness campsites, enjoying local culinary feasts and acoustic traditional music under the stars.',
      },
    ],
    tagline: 'One Country. Many Worlds. The Journey is the Experience.',
    promise: 'Don’t just visit Ethiopia. Experience it.',
    relatedJourneys: [
      { title: 'Great Rift Valley Traverse', route: '/signature-routes', duration: '12 Days' },
      { title: 'Shewa to Rift Valley Overland', route: '/shewa-land-escape', duration: '5 Days' },
      { title: 'Kundudo–Babile Signature Route', route: '/kundudo-babile', duration: '6 Days' },
    ],
  },
  'urban-camping': {
    slug: 'urban-camping',
    title: 'Urban Camping Ethiopia',
    eyebrow: 'Signature Concept',
    kicker: 'Camp. Explore. Connect.',
    subtitle: 'Camp. Explore. Connect. Boutique outdoor experiences in and around Ethiopia\'s major cities and destinations.',
    heroImage: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_2400/v1793565421/oq6ooexxhcyt38v7ke2h.jpg',
    summary: 'Our signature concept, Urban Camping Ethiopia, connects travelers and communities through premium outdoor experiences in and around Addis Ababa, Bishoftu, Adama, Hawassa, Jimma, Harar, and other destinations.',
    routeFlow: [
      'Addis Ababa Heights',
      'Bishoftu Crater Lakes',
      'Adama Escarpments',
      'Hawassa Shorelines',
      'Jimma Cloud Forests',
      'Harar Heights',
    ],
    programPoints: [
      'Luxury all-weather bell tents',
      'Comfortable sleep systems & warm blankets',
      'Campfire gastronomy & fresh local produce',
      'Traditional coffee ceremonies by firelight',
      'Acoustic folk music & storytelling',
      'Stargazing away from city light pollution',
      'Guided sunrise nature walks & birdwatching',
      'Community partnerships & local employment',
    ],
    programmeList: [
      {
        numeral: '01',
        title: 'Luxury All-Weather Canvas Suites',
        description: 'Spacious canvas bell tents appointed with hand-loomed Ethiopian cotton rugs, raised cot mattresses, down duvets, and warm lantern lighting.',
      },
      {
        numeral: '02',
        title: 'Gourmet Campfire Gastronomy',
        description: 'Full mobile culinary service featuring charcoal-grilled highland meats, organic fire-roasted vegetables, fresh bread, and fine wines.',
      },
      {
        numeral: '03',
        title: 'Acoustic Music & Storytelling',
        description: 'Traditional Masinko (single-string lute) musicians and local oral historians sharing legends of the highland empires by ember-glow.',
      },
      {
        numeral: '04',
        title: 'Seamless Micro-Adventure Logistics',
        description: 'Ideal for busy travelers, expats, conference delegations, and weekend explorers wanting an authentic outdoor escape without exhausting travel.',
      },
    ],
    tagline: 'Camp. Explore. Connect.',
    promise: 'Travel Deeper. Sleep Closer to Nature. Experience More.',
    hasShopButton: true,
    relatedJourneys: [
      { title: 'Suba Ancient Forest Hideaway', route: '/shewa-land-escape', duration: '2 Days' },
      { title: 'Wonchi Crater Lake Bivouac', route: '/shewa-land-escape', duration: '2 Days' },
      { title: 'Entoto Sunset & Starlight Retreat', route: '/mountains', duration: 'Overnight' },
    ],
  },
};
