/**
 * Dinq Tour, Travel & Events — Company, Team, Services, Values & Partnerships
 * Aligned Verbatim with Zerihun Alemayehu's Official Specifications
 */

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  monogram: string;
}

export const EXECUTIVE_TEAM: TeamMember[] = [
  {
    name: 'Zerihun Alemayehu',
    role: 'Founder & COO',
    bio: 'The founder of Dinq Tour & Events, Zerihun Alemayehu brings experience in tourism, tour guiding, media, journalism and communication. He leads the company\'s strategic direction, partnerships, destination development and overall operations.',
    image: 'https://ambaseltourandtravel.com/wp-content/uploads/2023/12/neww.jpg',
    monogram: 'ZA',
  },
  {
    name: 'Eldana Fikru',
    role: 'Marketing Manager',
    bio: 'Eldana Fikru leads marketing and brand development, focusing on digital communication, international promotion, customer engagement and building Dinq\'s presence in the global tourism market.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    monogram: 'EF',
  },
  {
    name: 'Semegn Tariku',
    role: 'General Manager',
    bio: 'Semegn Tariku oversees day-to-day management and operational coordination, ensuring that Dinq\'s tours, events and guest experiences are professionally organized and delivered.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    monogram: 'ST',
  },
];

export const TEAM_PROMISE = {
  header: 'OUR TEAM PROMISE',
  lines: [
    'Professional People.',
    'Local Knowledge.',
    'Global Standards.',
    'Authentic Ethiopian Experiences.',
  ],
  tagline: 'DINQ TOUR & EVENTS — Discover Ethiopia Beyond the Ordinary.',
};

export const FIELD_ROLES = [
  {
    role: 'Professional Drivers',
    icon: 'Car',
    desc: 'Experienced and responsible drivers who provide safe, comfortable and reliable transportation throughout Ethiopia.',
  },
  {
    role: 'Tour Guides & Tour Leaders',
    icon: 'Compass',
    desc: 'Professional guides and experienced local experts who bring Ethiopia\'s history, culture, nature and destinations to life.',
  },
  {
    role: 'Community Coordinators',
    icon: 'Users',
    desc: 'Local coordinators who connect travelers with communities and help create meaningful, respectful and community-based tourism experiences.',
  },
  {
    role: 'Tourism & Business Advisors',
    icon: 'Briefcase',
    desc: 'Experienced advisors supporting destination development, tourism strategy, partnerships, product development and business growth.',
  },
  {
    role: 'Event Organizers',
    icon: 'Sparkles',
    desc: 'Creative and professional event specialists responsible for planning, coordinating and delivering memorable tourism, cultural, corporate and outdoor events.',
  },
  {
    role: 'Local Destination Experts',
    icon: 'Globe',
    desc: 'Trusted local partners and destination specialists providing authentic knowledge of Ethiopia\'s regions, communities, cultures and natural attractions.',
  },
  {
    role: 'Media & Content Team',
    icon: 'Camera',
    desc: 'Photographers, videographers and content creators documenting Ethiopia\'s destinations, experiences, people and stories.',
  },
  {
    role: 'Outdoor & Camping Crew',
    icon: 'Tent',
    desc: 'Specialized field teams supporting hiking, trekking, camping, outdoor activities and adventure experiences.',
  },
];

export const TEAM_STANDARD_QUOTE = {
  header: 'ONE TEAM. ONE STANDARD.',
  lines: [
    'From the office to the road.',
    'From the mountains to the villages.',
    'From planning to experience.',
    'Every member of the Dinq team plays a role in creating journeys that are professional, authentic, safe and memorable.',
  ],
  tagline: 'DINQ TOUR & EVENTS — Local Expertise. Global Standards. Extraordinary Ethiopia.',
};

export const WHAT_WE_DO = [
  {
    title: 'Tour & Travel',
    kicker: 'Curated Journeys',
    desc: 'We design and operate journeys throughout Ethiopia, from iconic heritage destinations to remote landscapes and lesser-known communities: Heritage • Culture • Nature • Wildlife • Adventure • Hiking • Coffee • Culinary • Community • Photography • Wellness • Festivals • Road Trips.',
  },
  {
    title: 'Adventure & Outdoor Experiences',
    kicker: 'Blue Nile Hiking & Signature Concepts',
    desc: 'Through our outdoor experiences and Blue Nile Hiking, we create opportunities to explore Ethiopia through hiking, trekking, camping, nature walks, mountain adventures, and outdoor recreation. Our signature concept, Urban Camping Ethiopia, connects travelers and communities through premium outdoor experiences in and around Ethiopia\'s major cities and destinations.',
  },
  {
    title: 'Events & Experiences',
    kicker: 'Destination & Corporate Events',
    desc: 'Corporate events, conferences and meetings, tourism events, cultural events, festivals, outdoor events, team-building experiences, product launches, private celebrations, destination events, and media and promotional events.',
  },
];

// Verbatim Services Data: Tourism, Travel, Events
export const SERVICES_DATA = {
  tourism: [
    'Private Tours',
    'Group Tours',
    'Cultural Tours',
    'Heritage Tours',
    'Adventure Tours',
    'Hiking & Trekking',
    'Wildlife Safaris',
    'Birding Tours',
    'Coffee Tours',
    'Culinary Experiences',
    'Community Tourism',
    'Ecotourism',
    'Photography Tours',
    'Festival Journeys',
    'Road Trips',
    'Wellness Escapes',
  ],
  travel: [
    'Airport Transfers',
    'Transportation',
    'Accommodation Coordination',
    'Tour Guides',
    'Tour Leaders',
    'Travel Logistics',
    'Customized Itineraries',
    'Corporate Travel',
    'Group Travel',
    'Destination Management',
  ],
  events: [
    'Corporate Events',
    'Tourism Events',
    'Conferences',
    'Cultural Events',
    'Festivals',
    'Outdoor Events',
    'Team Building',
    'Private Events',
    'Destination Events',
    'Media & Promotional Events',
  ],
};

// 11 International Partnership Categories
export const PARTNERSHIP_TYPES = [
  'International tour operators',
  'Travel agencies',
  'Destination management companies',
  'Hotels and lodges',
  'Airlines and transport partners',
  'Tourism organizations',
  'NGOs and development organizations',
  'Embassies and international institutions',
  'Corporate organizations',
  'Media organizations',
  'Community tourism initiatives',
];

export const COMPANY_VALUES = [
  { title: 'AUTHENTICITY', desc: 'We connect travelers with genuine Ethiopian experiences.' },
  { title: 'PROFESSIONALISM', desc: 'We maintain high standards in planning, communication, service, and execution.' },
  { title: 'RESPONSIBILITY', desc: 'We respect communities, cultures, heritage, wildlife, and the environment.' },
  { title: 'CREATIVITY', desc: 'We continuously develop new ways to experience Ethiopia.' },
  { title: 'COMMUNITY', desc: 'We believe tourism should create opportunities for local people.' },
  { title: 'HOSPITALITY', desc: 'We welcome every traveler with the warmth for which Ethiopia is known.' },
  { title: 'EXCELLENCE', desc: 'We aim to make every journey memorable from the first conversation to the final farewell.' },
];

export const WHY_DINQ_PILLARS = [
  { numeral: '01', title: '10+ YEARS OF EXPERIENCE', desc: 'A decade of experience across tourism, guiding, media, communication, events, and destination experiences.' },
  { numeral: '02', title: 'LOCAL EXPERTISE', desc: 'We know Ethiopia beyond the usual tourist routes.' },
  { numeral: '03', title: 'ONE-STOP EXPERIENCE', desc: 'Tourism, travel, events, transportation, guiding, outdoor experiences, and destination services under one platform.' },
  { numeral: '04', title: 'AUTHENTIC EXPERIENCES', desc: 'We focus on meaningful encounters with Ethiopia\'s people, culture, nature, heritage, and communities.' },
  { numeral: '05', title: 'CUSTOM JOURNEYS', desc: 'Every traveler is different. We build journeys around your interests, style, time, and expectations.' },
  { numeral: '06', title: 'PROFESSIONAL TEAM', desc: 'Experienced guides, drivers, coordinators, event professionals, destination experts, and support teams.' },
];

export const DESTINATION_PILLARS = [
  'Heritage & History',
  'Culture & Community',
  'Nature & Wildlife',
  'Coffee & Culinary Experiences',
  'Adventure & Hiking',
  'Photography & Storytelling',
];

export const FLEET_DETAILS = {
  vehicles: 'Toyota Land Cruiser HZJ76, 105 & 200 Series',
  features: [
    'Heavy-duty off-road suspension for remote mountain and desert terrain',
    'Dual long-range fuel tanks for autonomous cross-country expeditions',
    'BF Goodrich All-Terrain reinforced puncture-resistant tires',
    'Pure sine-wave 220V inverters for camera and drone battery charging',
    'Real-time GPS tracking and satellite communication beacons',
    'Comprehensive onboard trauma medical kits and emergency recovery equipment',
  ],
};

export const ABOUT_CLOSING_PROMISE = 'We don’t simply take you to Ethiopia. We help you experience it. Discover the Places · Meet the People · Live the Story.';
