/**
 * Dinq Tour, Travel & Events — Wild Ethiopia
 * 9 Safaris, 12 Mountain Experiences, 14 Birding Destinations, 5 Birding Journeys
 * Master Content Aligned Verbatim with Zerihun Alemayehu's Official Specifications
 */

export interface SafariItem {
  id: string;
  numeral: string;
  name: string;
  kicker: string;
  summary: string;
  italicNote?: string;
  tags: string[];
  signature: string;
  tagline?: string;
  location: string;
  duration: string;
  image: string;
  safariType: string;
  highlights: string[];
  conditionalNotice?: string;
}

export const SAFARI_TYPES = [
  { 
    name: 'Classic Wildlife', 
    desc: 'Omo • Gambella • Mago • Chebera-Churchura' 
  },
  { 
    name: 'Frontier Savannahs', // Changed from "Wilderness Safari"
    desc: 'Aladeghi • Kafta-Shiraro • Alatish' 
  },
  { 
    name: 'Cultural Safari', 
    desc: 'Omo Valley • Gambella • Afar' 
  },
  { 
    name: 'Desert Expedition', // Tweaked to sound more like a journey
    desc: 'Danakil • Dallol • Lake Asale' 
  },
  { 
    name: 'Volcanic Safari', 
    desc: 'Erta Ale • Afar Rift' 
  },
  { 
    name: 'Photographic Safari', 
    desc: 'Wildlife • Landscapes • Communities • Birds' 
  },
];

export const SAFARIS: SafariItem[] = [
  {
    id: 'omo-valley-safari',
    numeral: '01',
    name: 'Omo Valley Safari',
    kicker: 'Wildlife • Culture • Community',
    summary: 'Journey through the spectacular landscapes of the Omo Valley, where wildlife, rivers, savannahs and some of Ethiopia’s most distinctive cultural communities create an extraordinary expedition.',
    italicNote: 'Where wildlife savannahs and living cultural heritage meet along the historic river basin.',
    tags: ['Wildlife Viewing', 'Omo River Landscapes', 'Savannah & Woodland', 'Indigenous Communities'],
    signature: 'The Wild & Cultural Omo Expedition',
    location: 'Lower Omo Valley, South Ethiopia',
    duration: '8–10 Days',
    image: 'https://ambaseltourandtravel.com/wp-content/uploads/2024/12/photo_5807594854723730140_y.jpg',
    safariType: 'Cultural Safari',
    highlights: [
      'Wildlife viewing & savannah woodland exploration',
      'Omo River landscapes and wooden boat crossings',
      'Indigenous community encounters & traditional villages',
      'Cultural storytelling & authentic local markets',
      'Traditional food & community-based tourism',
      'Photography & documentary experiences',
    ],
  },
  {
    id: 'gambella-national-park-safari',
    numeral: '02',
    name: 'Gambella National Park Safari',
    kicker: 'Wildlife • Wetlands • Migration',
    summary: 'Explore Ethiopia’s great western wilderness, where vast wetlands, floodplains and savannahs support remarkable wildlife and seasonal movements of large antelope herds. Gambella is particularly known for white-eared kob, Nile lechwe, elephant and buffalo, while its wetlands support an exceptional diversity of birds.',
    italicNote: 'Ethiopia’s great western wilderness and the epic white-eared kob migration.',
    tags: ['White-eared Kob', 'Nile Lechwe', 'Elephant & Buffalo', 'Wetlands & Floodplains'],
    signature: 'The Great Gambella Wildlife Expedition',
    location: 'Gambella National Park, West Ethiopia',
    duration: '7–9 Days',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793324474/iilb6zefbugqf8dp1dpy.jpg',
    safariType: 'Wilderness Safari',
    highlights: [
      'Witness the massive seasonal white-eared kob migration',
      'Rare Nile lechwe observation across vast floodplains',
      'Elephant and buffalo tracking in riverine forests',
      'Exceptional birdwatching across untouched wetlands',
      'River landscapes & wildlife photography',
      'Community encounters & conservation storytelling',
    ],
  },
  {
    id: 'mago-national-park-safari',
    numeral: '03',
    name: 'Mago National Park Safari',
    kicker: 'Savannah • Wildlife • Omo Wilderness',
    summary: 'Explore the remote savannah wilderness bordering the Omo Valley, home to elephants, buffalo, giraffe, lion, hartebeest and diverse birdlife.',
    italicNote: 'Remote savannah wilderness along the life-giving Neri River.',
    tags: ['Elephants', 'Cape Buffalo', 'Giraffe & Lion', 'Savannah Landscapes'],
    signature: 'Mago Wilderness Safari',
    location: 'Mago National Park, South Ethiopia',
    duration: '5–6 Days',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793324545/sg5hi7dmypcldcecq5l3.jpg',
    safariType: 'Wildlife Safari',
    highlights: [
      'Game viewing for elephants, buffalo, and giraffe',
      'Savannah landscapes and dense riverine forests',
      'Birdwatching in pristine river basin habitats',
      'Nature walks guided by park scouts',
      'Wildlife photography in golden savannah light',
      'Respectful cultural encounters with local communities',
    ],
  },
  {
    id: 'chebera-churchura-safari',
    numeral: '04',
    name: 'Chebera-Churchura National Park Safari',
    kicker: 'Elephants • Forests • Rivers • Wilderness',
    summary: 'Discover one of Ethiopia’s lesser-known wilderness destinations, where mountains, forests, rivers, crater lakes and savannah create a remarkable habitat for wildlife. The park is known for elephants, hippos, Cape buffalo, lions, leopards and rich birdlife, with much of the landscape best experienced through guided exploration.',
    italicNote: 'A hidden sanctuary of pristine crater lakes, thermal springs, and elephant herds.',
    tags: ['Elephant Tracking', 'Crater Lakes', 'Hippos & Buffalo', 'Dense Forest'],
    signature: 'The Hidden Wilderness of Ethiopia',
    location: 'Chebera-Churchura National Park, Southwest Ethiopia',
    duration: '6–8 Days',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1791473036/rejjoibmqvcji3fg9kjo.jpg',
    safariType: 'Wildlife Safari',
    highlights: [
      'Guided elephant tracking on foot with national park scouts',
      'Exploration of pristine emerald crater lakes and hot springs',
      'Hippo and buffalo observation along rushing rivers',
      'Rich forest birdwatching and nature walks',
      'Conservation experiences and community encounters',
    ],
  },
  {
    id: 'aladeghi-wildlife-reserve',
    numeral: '05',
    name: 'Aladeghi Wildlife Reserve Safari',
    kicker: 'Savannah • Antelope • Rift Valley Wilderness',
    summary: 'Explore the dryland wilderness of the Afar Rift Valley, where open landscapes, volcanic terrain and wildlife create a distinctly Ethiopian safari experience.',
    italicNote: 'Vast golden plains where Beisa oryx and Grevy’s zebras roam beneath Mount Fentale.',
    tags: ['Beisa Oryx', 'Grevy’s Zebra', 'Afar Rift', 'Dryland Wildlife'],
    signature: 'The Rift Valley Wilderness Safari',
    location: 'Aladeghi Wildlife Reserve, Afar Rift Valley',
    duration: '4–5 Days',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793563605/gjrtkytrzyvhrqbaceyq.webp',
    safariType: 'Wilderness Safari',
    highlights: [
      'Observation of Grevy’s zebras, Beisa oryx, and gerenuk',
      'Expansive open savannah and Rift Valley scenery',
      'Dryland birdwatching and raptor photography',
      'Nature exploration with local Afar scouts',
      'Local community encounters and conservation storytelling',
    ],
  },
  {
    id: 'kafta-shiraro-safari',
    numeral: '06',
    name: 'Kafta-Shiraro National Park Safari',
    kicker: 'Forests • Elephants • Rivers • Wilderness',
    summary: 'Venture into the remote western landscapes of Ethiopia, where forests, rivers and wildlife create a remarkable wilderness experience close to the Ethiopian–Sudanese frontier.',
    italicNote: 'Home to the northernmost viable elephant population in the Horn of Africa.',
    tags: ['Northern Elephants', 'Tekeze River', 'Indigenous Knowledge', 'Frontier Wilderness'],
    signature: 'The Western Wilderness Expedition',
    location: 'Kafta-Shiraro National Park, Northwest Ethiopia',
    duration: '7 Days',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793564889/flkwx4n6tfth7vt4rvyx.png',
    safariType: 'Wilderness Safari',
    highlights: [
      'Elephant and wildlife tracking in rugged dry forests',
      'Scenic Tekeze River landscapes and riverbank walks',
      'Birdwatching across undisturbed frontier ecosystems',
      'Local community encounters and indigenous ecological knowledge',
      'Conservation experiences in remote borderlands',
    ],
  },
  {
    id: 'alatish-national-park-safari',
    numeral: '07',
    name: 'Alatish National Park Safari',
    kicker: 'Savannah • Forest • Wildlife',
    summary: 'Discover the remote landscapes of northwestern Ethiopia, where woodland, savannah and wildlife create an off-the-beaten-path safari experience bordering Sudan’s Dinder National Park.',
    italicNote: 'Untamed woodland and savannah where predators and plains game thrive off the grid.',
    tags: ['Woodland Savannah', 'Wilderness Camping', 'Lions & Leopards', 'Off-Grid Safari'],
    signature: 'The Hidden Northwest Safari',
    location: 'Alatish National Park, Amhara Region',
    duration: '8 Days',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793565000/ortuzabramx56thgoq9n.png',
    safariType: 'Wilderness Safari',
    highlights: [
      'Savannah and deciduous woodland exploration',
      'Wildlife spoor tracking and predator observation',
      'Birdwatching across undisturbed seasonal wetlands',
      'Wilderness camping under brilliant starlit night skies',
      'Encounters with borderland communities and park scouts',
    ],
  },
  {
    id: 'afar-desert-volcano-safari',
    numeral: '08',
    name: 'Afar Desert & Volcano Safari',
    kicker: 'DANAKIL • ERTA ALE • DALLOL • SALT DESERT',
    summary: 'Enter one of Ethiopia’s most extraordinary geological landscapes — a world of salt flats, volcanic terrain, geothermal formations, desert horizons and Afar cultural heritage. The Danakil Depression lies largely below sea level and contains major geological attractions including Erta Ale, Dallol and Lake Asale; access is expedition-style and requires appropriate 4×4 logistics and local expertise.',
    italicNote: 'WHERE THE EARTH MOVES, THE DESERT GLOWS.',
    tagline: 'WHERE THE EARTH MOVES, THE DESERT GLOWS.',
    tags: ['Danakil Depression', 'Erta Ale Volcano', 'Dallol Geothermal', 'Lake Asale & Salt Flats'],
    signature: '🌋 The Desert & Volcano Expedition',
    location: 'Danakil Depression & Afar Triangle',
    duration: '5–6 Days',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1789842587/tdxfdqwvdwbuzh3uuus6.jpg',
    safariType: 'Desert Safari',
    conditionalNotice: 'Important: Erta Ale is an active volcanic environment, and volcanic activity, access, security and safe approach conditions can change. The program should therefore be marketed as a conditional expedition, not as a guaranteed lava-lake viewing experience.',
    highlights: [
      'Danakil Depression and Dallol geothermal landscape',
      'Erta Ale volcano conditional expedition trek',
      'Lake Asale salt flats and traditional salt-mining culture',
      'Afar pastoralist communities and cultural storytelling',
      'Expedition-grade 4×4 desert convoys and desert camping',
      'Night-sky astrophotography over otherworldly salt formations',
    ],
  },
  {
    id: 'ethiopia-grand-safari',
    numeral: '09',
    name: 'Ethiopia Grand Safari',
    kicker: 'THE ULTIMATE WILDLIFE JOURNEY',
    summary: 'For international travelers who want to experience several sides of Ethiopia in one major expedition: connecting the Great Rift Valley, savannahs, wetlands, forests, and remote frontiers.',
    italicNote: 'Omo Valley → Mago → Chebera-Churchura → Gambella → Aladeghi → Kafta-Shiraro → Alatish',
    tags: ['Wildlife', 'Landscapes', 'Communities', 'Photography', 'Conservation', 'Adventure'],
    signature: 'The Grand Ethiopian Safari',
    location: 'Cross-Country National Safari Circuit',
    duration: '16–21 Days',
    image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1200&q=80',
    safariType: 'Wildlife Safari',
    highlights: [
      'Complete traverse: Omo Valley → Mago → Chebera-Churchura → Gambella → Aladeghi → Kafta-Shiraro → Alatish',
      'Rare species: White-eared kob, African elephants, Beisa oryx, Grevy’s zebra, and diverse birdlife',
      'Deep engagement with indigenous communities and conservation rangers',
      'Expedition-grade mobile camps and boutique safari lodges',
      'Dedicated wildlife photographers and expert field naturalists',
    ],
  },
];

export const ETHIOPIA_GRAND_SAFARI_ROUTE = [
  'Omo Valley',
  'Mago National Park',
  'Chebera-Churchura',
  'Gambella National Park',
  'Aladeghi Wildlife Reserve',
  'Kafta-Shiraro National Park',
  'Alatish National Park',
];

export const DINQ_SAFARI_PROMISE = {
  title: 'DINQ SIGNATURE PROMISE',
  body: 'Not just a safari. A journey into the wild heart of Ethiopia.',
  pillars: ['WILDLIFE', 'WILDERNESS', 'CULTURE', 'ADVENTURE'],
  tagline: 'Dinq Tour & Events — Discover Ethiopia Beyond the Ordinary.',
};

// 12 Mountains
export interface MountainItem {
  id: string;
  numeral: string;
  name: string;
  elevation: string;
  kicker: string;
  summary: string;
  italicNote?: string;
  tags: string[];
  signature: string;
  tagline?: string;
  region: string;
  difficulty: 'Moderate' | 'Challenging' | 'Strenuous' | 'Accessible';
  image: string;
  experienceItems?: string[];
  programmeItems?: string[];
}

export const MOUNTAINS: MountainItem[] = [
  {
    id: 'simien-mountains',
    numeral: '01',
    name: 'Simien Mountains',
    elevation: 'Up to 4,550m',
    kicker: 'Cliffs • Peaks • Wildlife',
    summary: 'A UNESCO World Heritage landscape of dramatic escarpments, deep valleys, towering peaks, and unique wildlife.',
    italicNote: 'Cliffs dropping 1,500m into deep valleys, home to Gelada baboons and Walia ibex.',
    tags: ['Trekking', 'Gelada Baboon', 'Mountain Landscapes', 'Villages', 'Photography', 'Camping'],
    signature: 'The Roof of Ethiopia',
    region: 'North Gondar, Amhara',
    difficulty: 'Strenuous',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793175235/crpodr92rcfxr4ahwqyk.jpg',
  },
  {
    id: 'bale-mountains',
    numeral: '02',
    name: 'Bale Mountains',
    elevation: 'Up to 4,377m',
    kicker: 'Wildlife • Highlands • Wilderness',
    summary: 'Explore vast highland landscapes, alpine ecosystems, forests, and some of Ethiopia\'s most distinctive wildlife.',
    italicNote: 'Sanetti Plateau, rare Ethiopian wolves, mountain nyala, and mossy Harenna forest.',
    tags: ['Trekking', 'Sanetti Plateau', 'Ethiopian Wolf', 'Mountain Nyala', 'Forests', 'Wildlife Photography'],
    signature: 'The Wild Highlands of Bale',
    region: 'Bale Zone, Oromia',
    difficulty: 'Challenging',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793174477/mqbmr3a2z3d8masj6qgw.jpg',
  },
  {
    id: 'ras-dashen',
    numeral: '03',
    name: 'Ras Dashen',
    elevation: '4,550m',
    kicker: 'Ethiopia\'s Highest Peak',
    summary: 'Challenge yourself in the spectacular Simien highlands and experience Ethiopia\'s highest mountain landscape.',
    italicNote: 'Stand on the rooftop summit of Ethiopia and the Horn of Africa.',
    tags: ['High-Altitude Trekking', 'Mountain Villages', 'Scenic Valleys', 'Camping', 'Local Culture'],
    signature: 'The Summit of Ethiopia',
    region: 'Simien Massif, Amhara',
    difficulty: 'Strenuous',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793565243/zsz0h7vqmnyq2febjca7.jpg',
  },
  {
    id: 'choke-mountains',
    numeral: '04',
    name: 'Choke Mountains',
    elevation: '4,070m',
    kicker: 'Highlands • Water • Culture',
    summary: 'Discover the dramatic Choke highlands, an important Ethiopian watershed surrounded by rural landscapes and traditional communities.',
    italicNote: 'The vital water tower highlands feeding pristine springs and community agro-ecology.',
    tags: ['Trekking', 'Highland Villages', 'Landscapes', 'Water Sources', 'Farming Communities', 'Photography'],
    signature: 'The Water Tower Highlands',
    region: 'East Gojjam, Amhara',
    difficulty: 'Moderate',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793565309/vv0nzluy977ecqms0ym9.jpg',
  },
  {
    id: 'guji-mountains',
    numeral: '05',
    name: 'Guji Mountains',
    elevation: '3,200m',
    kicker: 'Mountains • Coffee • Oromo Culture',
    summary: 'Experience the highlands of Guji where mountain landscapes meet exceptional coffee, pastoral traditions, forests, and Oromo culture.',
    italicNote: 'Where cloud-forested mountain ridges nurture world-renowned specialty coffee.',
    tags: ['Trekking', 'Coffee', 'Forests', 'Community', 'Culture', 'Photography'],
    signature: 'Mountains & Coffee of Guji',
    region: 'Guji Zone, Oromia',
    difficulty: 'Moderate',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793565373/unmln7ly1kysokhe6pyc.jpg',
  },
  {
    id: 'entoto-mountains',
    numeral: '06',
    name: 'Entoto Mountains',
    elevation: '3,200m',
    kicker: 'Nature • History • Addis Ababa',
    summary: 'Escape into the highlands overlooking Ethiopia\'s capital, combining mountain landscapes, forests, history, and panoramic city views.',
    italicNote: 'The historic highlands overlooking the capital with panoramic forest trails.',
    tags: ['Hiking', 'Forest Walks', 'Heritage', 'Panoramic Views', 'Photography', 'Urban Escape'],
    signature: 'The Mountain Above Addis',
    region: 'Addis Ababa / Shewa',
    difficulty: 'Accessible',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793565421/oq6ooexxhcyt38v7ke2h.jpg',
  },
  {
    id: 'gughe-mountains',
    numeral: '07',
    name: 'Gughe Mountains',
    elevation: '4,200m',
    kicker: 'Highlands • Culture • Adventure',
    summary: 'Explore the spectacular highlands of southern Ethiopia, where rugged mountains meet traditional communities and unique cultural landscapes.',
    italicNote: 'Highland bamboo forests, terraced mountain slopes, and Dorze living culture.',
    tags: ['Trekking', 'Villages', 'Culture', 'Landscapes', 'Community Tourism', 'Photography'],
    signature: 'The Southern Highlands',
    region: 'Gamo Highlands, Southern Ethiopia',
    difficulty: 'Challenging',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793565467/ss5kaznkfukmguimsnbg.jpg',
  },
  {
    id: 'tulu-dimtu',
    numeral: '08',
    name: 'Tulu Dimtu',
    elevation: '4,377m',
    kicker: 'High Peaks • Wilderness • Bale',
    summary: 'Journey into the highlands of Bale and explore one of Ethiopia\'s most remarkable mountain environments.',
    italicNote: 'The crowning alpine peak rising over the glacial Sanetti Plateau.',
    tags: ['Mountain Trekking', 'Alpine Landscapes', 'Wildlife', 'Photography', 'Wilderness'],
    signature: 'Above the Bale Highlands',
    region: 'Bale Massif, Oromia',
    difficulty: 'Moderate',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793565542/a1jtwcaf2gons19hgyob.jpg',
  },
  {
    id: 'amba-alagi',
    numeral: '09',
    name: 'Amba Alagi',
    elevation: '3,949m',
    kicker: 'Mountain • History • Landscape',
    summary: 'Discover a dramatic mountain landscape connected with important chapters of Ethiopian history and surrounded by spectacular northern scenery.',
    italicNote: 'A natural fortress table mountain commanding historic northern routes.',
    tags: ['Mountain Exploration', 'History', 'Scenic Landscapes', 'Local Communities', 'Photography'],
    signature: 'Mountains & History',
    region: 'Tigray / Amhara Border',
    difficulty: 'Challenging',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793565600/hx68vx4qkjvneifbb4qx.webp',
  },
  {
    id: 'mount-ziquwala',
    numeral: '10',
    name: 'Mount Ziquwala',
    elevation: '2,989m',
    kicker: 'Volcanic Mountain • Lake • Nature',
    summary: 'Explore one of Ethiopia\'s distinctive volcanic landscapes, combining mountain scenery, crater-lake environments, nature, and cultural heritage.',
    italicNote: 'Sacred volcanic cone rising above the Shewa plains with an ancient crater lake.',
    tags: ['Hiking', 'Volcanic Landscape', 'Lake', 'Nature', 'Photography', 'Local Culture'],
    signature: 'Volcano, Mountain & Lake',
    region: 'East Shewa, Oromia',
    difficulty: 'Moderate',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793565654/pucum7syftbalsr9km6f.jpg',
  },
  {
    id: 'mount-fentale',
    numeral: '11',
    name: 'Mount Fentale',
    elevation: '2,007m',
    kicker: 'Volcano • Rift Valley • Wildlife',
    summary: 'Experience the dramatic volcanic landscape of the Great Rift Valley, where mountains, drylands, wildlife, and pastoral communities meet.',
    italicNote: 'A dramatic caldera with active steam vents and panoramic Rift Valley vistas.',
    tags: ['Hiking', 'Volcanic Landscapes', 'Rift Valley', 'Wildlife', 'Photography', 'Community'],
    signature: 'The Rift Valley Volcano',
    region: 'Afar / Oromia Border, Awash',
    difficulty: 'Moderate',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793565707/j1jztbvcnfwuilgicnnk.jpg',
  },
  {
    id: 'zebider-mountain',
    numeral: '12',
    name: 'Zebider Mountain & Gurage Villages',
    elevation: '3,200m',
    kicker: 'Mountain • Culture • Community',
    summary: 'Discover the scenic highlands of Gurage, where mountain landscapes meet traditional villages, distinctive architecture, rich cuisine, and welcoming community life.',
    italicNote: 'Climb the Mountain. Enter the Village. Experience Gurage.',
    tagline: 'Climb the Mountain. Enter the Village. Experience Gurage.',
    tags: [
      'Zebider Mountain',
      'Gurage Villages',
      'Enset Architecture',
      'Gurage Cuisine',
      'Community Tourism',
      'Village-to-Mountain',
    ],
    signature: 'Zebider Mountain & Gurage Village Journey',
    region: 'Gurage Zone, Central Ethiopia',
    difficulty: 'Moderate',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    experienceItems: [
      'Zebider Mountain exploration',
      'Mountain hiking and nature walks',
      'Panoramic highland landscapes',
      'Traditional Gurage villages',
      'Gurage traditional houses and architecture',
      'Community and rural-life experiences',
      'Traditional Gurage cuisine',
      'Authentic coffee ceremony',
      'Local farming and rural livelihoods',
      'Traditional music and cultural storytelling',
      'Handcrafts and local products',
      'Community-led tourism',
      'Photography',
      'Village-to-mountain cultural journey',
      'Optional community-based accommodation',
    ],
    programmeItems: [
      'Zebider Mountain exploration',
      'Mountain hiking and nature walks',
      'Panoramic highland landscapes',
      'Traditional Gurage villages',
      'Gurage traditional houses and architecture',
      'Community and rural-life experiences',
      'Traditional Gurage cuisine',
      'Authentic coffee ceremony',
      'Local farming and rural livelihoods',
      'Traditional music and cultural storytelling',
      'Handcrafts and local products',
      'Community-led tourism',
      'Photography',
      'Village-to-mountain cultural journey',
      'Optional community-based accommodation',
    ],
  },
];

export const DINQ_MOUNTAIN_QUOTE = {
  header: 'TREK • EXPLORE • CONNECT • DISCOVER',
  body: 'From the highest peaks to hidden highland villages, Dinq takes you beyond the ordinary and into the mountains of Ethiopia.',
};

// 14 Birding Destinations
export interface BirdingDestination {
  id: string;
  numeral: string;
  name: string;
  kicker: string;
  summary: string;
  italicNote?: string;
  isIBA: boolean;
  ibaNote?: string;
  experiencePoints: string[];
  keySpecies?: string[];
  speciesCount?: string;
  habitat?: string;
  image: string;
}

export const BIRDING_DESTINATIONS: BirdingDestination[] = [
  {
    id: 'bale-mountains-birding',
    numeral: '01',
    name: 'Bale Mountains',
    kicker: 'Highland Birds & Mountain Wilderness',
    summary: 'Explore the highlands of Bale, including the Sanetti Plateau and surrounding forests, for an exceptional mountain birding experience.',
    italicNote: 'Highland birding among giant lobelias and Afro-alpine moorland.',
    isIBA: true,
    ibaNote: 'Recognized Important Bird Area (IBA)',
    experiencePoints: ['Highland Birding', 'Forest Birding', 'Wildlife', 'Photography', 'Nature Walks', 'Conservation'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793565893/r9vdmvpavn1xytdgqwuv.webp',
  },
  {
    id: 'simien-mountains-birding',
    numeral: '02',
    name: 'Simien Mountains',
    kicker: 'Birds Above the Clouds',
    summary: 'Combine spectacular mountain trekking with birdwatching across one of Ethiopia\'s great highland landscapes.',
    italicNote: 'Soaring bearded vultures and endemic siskins along dramatic vertical cliffs.',
    isIBA: true,
    ibaNote: 'UNESCO Natural Heritage & Recognized IBA',
    experiencePoints: ['Mountain Birding', 'Escarpments', 'Highland Wildlife', 'Photography', 'Trekking', 'Nature'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793565956/nljiyy4bi57bajr9hamm.jpg',
  },
  {
    id: 'awash-national-park-birding',
    numeral: '03',
    name: 'Awash National Park',
    kicker: 'Birds of the Rift Valley',
    summary: 'Discover dryland, riverine and savannah habitats around Awash, with birding combined with dramatic Rift Valley scenery and wildlife. Awash is also recognized within the Important Bird Area network.',
    italicNote: 'Over 450 recorded bird species across riverine forest and acacia plains.',
    isIBA: true,
    ibaNote: 'Recognized within the Important Bird Area (IBA) network',
    experiencePoints: ['Birdwatching', 'Wildlife', 'Rift Valley', 'Photography', 'Nature', 'Scenic Landscapes'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793566016/rcydpl1qbukgrsqjj2pj.webp',
  },
  {
    id: 'lake-abijata-shalla-birding',
    numeral: '04',
    name: 'Lake Abijata–Shalla',
    kicker: 'Lakes • Wetlands • Waterbirds',
    summary: 'Explore one of the Rift Valley\'s important lake landscapes, where birding meets dramatic volcanic scenery and open water environments.',
    italicNote: 'Massive colonies of feeding flamingos and migratory waterbirds.',
    isIBA: true,
    ibaNote: 'Key Rift Valley Waterbird Sanctuary & IBA',
    experiencePoints: ['Waterbird Watching', 'Lake Birding', 'Photography', 'Nature', 'Landscape Exploration'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793566086/vyr28yhwufpc6bfmtfjf.jpg',
  },
  {
    id: 'lake-tana-blue-nile-birding',
    numeral: '05',
    name: 'Lake Tana & Blue Nile',
    kicker: 'Waterbirds • Wetlands • Highlands',
    summary: 'Combine birding with the landscapes, waterways and cultural heritage of the Lake Tana and Blue Nile region.',
    italicNote: 'Headwaters of the Blue Nile with abundant pelicans, cranes, and fish eagles.',
    isIBA: true,
    ibaNote: 'UNESCO Biosphere Reserve & Recognized IBA',
    experiencePoints: ['Lake Birding', 'Wetlands', 'Waterbirds', 'Boat Experiences', 'Photography', 'Culture'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793566156/wkmwu1t4bbv80flbx6ri.jpg',
  },
  {
    id: 'guassa-plateau-menz-birding',
    numeral: '06',
    name: 'Guassa Plateau & Menz',
    kicker: 'Highland Endemics & Mountain Landscapes',
    summary: 'Explore the highlands of Menz and Guassa, combining birdwatching with mountain scenery, community landscapes and nature experiences. The Guassa Plateau is among Ethiopia\'s recognized Important Bird Area locations.',
    italicNote: 'Centuries of indigenous community conservation sheltering rare highland avifauna.',
    isIBA: true,
    ibaNote: 'Recognized Important Bird Area (IBA) location',
    experiencePoints: ['Highland Birding', 'Mountain Walks', 'Nature', 'Community', 'Photography', 'Conservation'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793566212/pmhga81c7ncvwnorft6u.jpg',
  },
  {
    id: 'ankober-debre-sina-birding',
    numeral: '07',
    name: 'Ankober–Debre Sina Escarpment',
    kicker: 'Birds Along the Great Escarpment',
    summary: 'Travel through one of Shewa\'s spectacular mountain corridors, where dramatic escarpments create an excellent combination of birding, landscapes and photography. BirdLife records the Ankober–Debre Sina escarpment among Ethiopia\'s Important Bird Areas.',
    italicNote: 'The exclusive home range of the rare endemic Ankober Serin.',
    isIBA: true,
    ibaNote: 'Recorded by BirdLife International as an Important Bird Area (IBA)',
    experiencePoints: ['Escarpment Birding', 'Mountain Landscapes', 'Photography', 'Hiking', 'Nature'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793566268/ovisz5o58cr5ei3lyhge.jpg',
  },
  {
    id: 'entoto-addis-ababa-birding',
    numeral: '08',
    name: 'Entoto & Addis Ababa Highlands',
    kicker: 'Urban Nature & Highland Birding',
    summary: 'Discover birdlife close to Ethiopia\'s capital through the forests, hills, valleys and green spaces of the Addis Ababa highlands. BirdLife\'s data identify Entoto Natural Park and escarpment as an Important Bird Area.',
    italicNote: 'Rich urban highland birding within minutes of the capital.',
    isIBA: true,
    ibaNote: 'Identified by BirdLife International as an Important Bird Area (IBA)',
    experiencePoints: ['Urban Birding', 'Forest Walks', 'Photography', 'Nature', 'Short Hiking'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793566322/ihfz52c5jtj5cgga84xn.avif',
  },
  {
    id: 'menagesha-suba-forest-birding',
    numeral: '09',
    name: 'Menagesha Suba Forest',
    kicker: 'Ancient Forests & Highland Birds',
    summary: 'Enter one of the forest landscapes surrounding Addis Ababa and experience birding among indigenous highland vegetation. Menagesha State Forest is included in BirdLife\'s Important Bird Area data.',
    italicNote: 'Ancient cedar and juniper forest founded by Emperor Zera Yacob in the 15th century.',
    isIBA: true,
    ibaNote: 'Included in BirdLife International Important Bird Area (IBA) data',
    experiencePoints: ['Forest Birding', 'Nature Walks', 'Photography', 'Biodiversity', 'Conservation'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793566415/vcycvjivkbx0bbpzgof2.jpg',
  },
  {
    id: 'bale-borana-birding-route',
    numeral: '10',
    name: 'Bale–Borana Birding Route',
    kicker: 'Mountains to Southern Ethiopia',
    summary: 'Connect the highlands of Bale with the landscapes of southern Ethiopia through a birding journey that combines mountains, forests, drylands and wildlife habitats.',
    italicNote: 'A transition from Afro-alpine heights down into acacia bush country.',
    isIBA: true,
    ibaNote: 'Cross-Ecosystem Birding Corridor',
    experiencePoints: ['Birding', 'Wildlife', 'Endemic Species', 'Landscapes', 'Community', 'Photography'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793566468/scoizrp88octsqvidvqc.jpg',
  },
  {
    id: 'yabello-borana-birding',
    numeral: '11',
    name: 'Yabello & Borana',
    kicker: 'Birds of the Southern Drylands',
    summary: 'Explore the distinctive landscapes of southern Ethiopia, where dryland habitats, woodland and traditional pastoral landscapes create a different birding environment. Yabello Sanctuary is recognized as an Important Bird Area.',
    italicNote: 'Home of Stresemann’s Bush-Crow and the White-tailed Swallow.',
    isIBA: true,
    ibaNote: 'Recognized Important Bird Area (IBA)',
    experiencePoints: ['Dryland Birding', 'Wildlife', 'Pastoral Culture', 'Photography', 'Nature'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793566523/wrpsxib0lfje3sucr3xn.webp',
  },
  {
    id: 'omo-mago-birding',
    numeral: '12',
    name: 'Omo & Mago',
    kicker: 'Birds, Wildlife & Cultural Landscapes',
    summary: 'Combine birdwatching with wildlife and community experiences across the extraordinary landscapes of southwestern Ethiopia. Mago National Park is included in BirdLife\'s Important Bird Area network.',
    italicNote: 'Savannah raptors, riverine gallery birds, and indigenous cultural landscapes.',
    isIBA: true,
    ibaNote: 'Included in BirdLife International Important Bird Area network',
    experiencePoints: ['Birdwatching', 'Wildlife', 'Savannah', 'Rivers', 'Community', 'Photography'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793566578/yr9jijk63dl22hraer1j.jpg',
  },
  {
    id: 'gambella-birding',
    numeral: '13',
    name: 'Gambella',
    kicker: 'Wetlands • Rivers • Wildlife',
    summary: 'Explore riverine and wetland environments while combining birding with wildlife, photography and community experiences in the far western floodplains.',
    italicNote: 'Primeval floodplains, riverine gallery forests, and rare waterbirds.',
    isIBA: true,
    ibaNote: 'Critical Western Wetland Flyway & IBA',
    experiencePoints: ['Wetland Birding', 'River Landscapes', 'Wildlife', 'Photography', 'Community'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793566651/ipgjca4azdlcfc9bawkl.jpg',
  },
  {
    id: 'kaffa-bonga-forests-birding',
    numeral: '14',
    name: 'Kaffa & Bonga Forests',
    kicker: 'Coffee Forests & Forest Birds',
    summary: 'Discover the green landscapes of southwestern Ethiopia where coffee-growing environments, forests, communities and biodiversity meet. Bonga Forest is included among Ethiopia\'s Important Bird Area locations.',
    italicNote: 'Lush rainforest canopy where wild Arabica coffee grows beneath forest birds.',
    isIBA: true,
    ibaNote: 'Included among Ethiopia\'s Important Bird Area (IBA) locations',
    experiencePoints: ['Forest Birding', 'Coffee', 'Nature', 'Community', 'Photography', 'Ecotourism'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1793566712/sjlqqdqytgvpdebt9xdc.jpg',
  },
];

// 5 Signature Birding Journeys
export interface BirdingJourney {
  id: string;
  numeral: string;
  name: string;
  routeTitle: string;
  routeStops: string[];
  route?: string[];
  duration?: string;
  targetCount?: string;
  themes: string[];
  summary: string;
}

export const BIRDING_JOURNEYS: BirdingJourney[] = [
  {
    id: 'highland-birding-journey',
    numeral: '01',
    name: 'The Ethiopian Highland Birding Journey',
    routeTitle: 'Addis Ababa → Entoto → Menagesha → Menz → Ankober → Simien → Bale',
    routeStops: ['Addis Ababa', 'Entoto', 'Menagesha', 'Menz', 'Ankober', 'Simien', 'Bale'],
    themes: ['Mountains', 'Forests', 'Birding', 'Photography'],
    summary: 'An extraordinary high-altitude expedition across the rooftop of Africa, targeting endemic highland avifauna from the central escarpment to Simien and Bale.',
  },
  {
    id: 'rift-valley-birding-journey',
    numeral: '02',
    name: 'The Rift Valley Birding Journey',
    routeTitle: 'Awash → Ziway → Abijata–Shalla → Rift Valley Lakes',
    routeStops: ['Awash', 'Ziway', 'Abijata–Shalla', 'Rift Valley Lakes'],
    themes: ['Lakes', 'Wetlands', 'Waterbirds', 'Wildlife'],
    summary: 'Explore the teeming lake ecosystems and savannahs along the Great Rift Valley, with massive pelican, flamingo, and raptor congregations.',
  },
  {
    id: 'coffee-forest-birding-journey',
    numeral: '03',
    name: 'The Coffee Forest Birding Journey',
    routeTitle: 'Jimma → Kaffa → Bonga → Southwest Ethiopia',
    routeStops: ['Jimma', 'Kaffa', 'Bonga', 'Southwest Ethiopia'],
    themes: ['Coffee', 'Forests', 'Birds', 'Community', 'Ecotourism'],
    summary: 'Journey into the lush ancient rainforests of the southwest where wild coffee grows wild under the canopy of rare forest birds.',
  },
  {
    id: 'wildlife-birding-safari',
    numeral: '04',
    name: 'The Wildlife & Birding Safari',
    routeTitle: 'Omo → Mago → Chebera-Churchura → Gambella',
    routeStops: ['Omo', 'Mago', 'Chebera-Churchura', 'Gambella'],
    themes: ['Birds', 'Wildlife', 'Wilderness', 'Communities'],
    summary: 'A deep wilderness expedition connecting riverine forests, vast floodplains, and savannah habitats rich in both big game and spectacular avifauna.',
  },
  {
    id: 'grand-ethiopia-birding-expedition',
    numeral: '05',
    name: 'The Grand Ethiopia Birding Expedition',
    routeTitle: 'Highlands → Rift Valley → Forests → Southern Ethiopia → Western Ethiopia',
    routeStops: ['Highlands', 'Rift Valley', 'Forests', 'Southern Ethiopia', 'Western Ethiopia'],
    themes: ['Birds', 'Endemic Wildlife', 'Landscapes', 'Culture', 'Conservation'],
    summary: 'The ultimate birding expedition across Ethiopia, connecting every major IBA, biotope, and endemic stronghold across the country.',
  },
];

export const BIRDING_SPECIALTIES = [
  'Bird Photography',
  'Endemic Species',
  'Raptors',
  'Waterbirds',
  'Highland Birds',
  'Forest Birds',
  'Migratory Birds',
  'Wildlife Photography',
  'Landscape Photography',
];

export const BIRDING_CONSERVATION = {
  title: 'Birding & Conservation',
  body: 'Birding tourism can directly connect visitors with Ethiopia\'s biodiversity and conservation landscapes. Dinq\'s birding experiences emphasize responsible observation, local guides, community participation and respect for wildlife and habitats. EWNHS, BirdLife International\'s partner organization in Ethiopia, works on biodiversity conservation and bird conservation in the country.',
  quote: {
    lines: [
      'SEE THE BIRDS.',
      'EXPLORE THE LANDSCAPES.',
      'MEET THE PEOPLE.',
      'PROTECT THE WILD.',
    ],
    tagline: 'Dinq Tour & Events — Birding Ethiopia Beyond the Ordinary.',
  },
};
