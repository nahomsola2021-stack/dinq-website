/**
 * Dinq Tour, Travel & Events — Navigation Configuration
 */

export interface NavItem {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Tours', href: '/tours' },
  {
    label: 'Collections',
    href: '/safari',
    children: [
      { label: 'Safari Collection', href: '/safari', description: '9 expeditions across rare wildlife sanctuaries' },
      { label: 'Mountains & Trekking', href: '/mountains', description: '12 mountain peaks, passes & Afro-alpine trails' },
      { label: 'Ethiopia Birding', href: '/birding', description: '14 prime sites, 5 journeys & 30+ endemics' },
      { label: 'Festivals of Faith', href: '/festivals', description: '12 festivals, living liturgies & 4 journeys' },
      { label: 'Shewa Land Escape', href: '/shewa-land-escape', description: '10 royal escapes, crater lakes & cloud forests' },
      { label: 'Kundudo–Babile', href: '/kundudo-babile', description: 'Wild horse plateau to wild elephant sanctuary' },
      { label: 'Signature Routes', href: '/signature-routes', description: 'Five Ways & 7 national circuit routes' },
    ],
  },
  {
    label: 'Experiences',
    href: '/experiences',
    children: [
      { label: 'All Experiences', href: '/experiences', description: 'Curated signature experiential journeys' },
      { label: 'Community & Culture', href: '/journeys/community-culture', description: 'Ethical village encounters & living traditions' },
      { label: 'Photography', href: '/journeys/photography', description: 'Chiaroscuro, golden hour & master photo expeditions' },
      { label: 'Road Trip', href: '/journeys/road-trip', description: 'Autonomous 4x4 overland convoys across scenic passes' },
      { label: 'Urban Camping', href: '/journeys/urban-camping', description: 'Boutique highland glamping near Addis Ababa' },
    ],
  },
  { label: 'Shop', href: '/shop' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Overview & Story', href: '/about#story', description: '10+ years of ground mastery & founding ethos' },
      { label: 'Why Ethiopia?', href: '/about#why-ethiopia', description: '12 extraordinary truths & the 5 actions' },
      { label: 'Transit Stopovers', href: '/about#stopover', description: 'Addis Ababa Bole International layover tours' },
      { label: 'Our Services', href: '/about#services', description: 'Tourism, fleet logistics & event operations' },
      { label: 'Team & Leadership', href: '/about#team', description: 'Executive directors & 8 specialist field roles' },
      { label: 'Expedition Fleet', href: '/about#fleet', description: 'Autonomous heavy-duty 4x4 Land Cruisers' },
      { label: 'B2B Partnerships', href: '/about#partners', description: 'International tour operator & DMC cooperation' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_SECTIONS = [
  {
    title: 'Collections',
    links: [
      { label: 'Safari Collection', href: '/safari' },
      { label: 'Mountains & Trekking', href: '/mountains' },
      { label: 'Ethiopia Birding', href: '/birding' },
      { label: 'Festivals of Faith', href: '/festivals' },
      { label: 'Shewa Land Escape', href: '/shewa-land-escape' },
      { label: 'Kundudo–Babile Expedition', href: '/kundudo-babile' },
      { label: 'Signature Routes', href: '/signature-routes' },
    ],
  },
  {
    title: 'Signature Experiences',
    links: [
      { label: 'All Experiences', href: '/experiences' },
      { label: 'Community & Culture', href: '/journeys/community-culture' },
      { label: 'Photography Expeditions', href: '/journeys/photography' },
      { label: 'Expedition Road Trips', href: '/journeys/road-trip' },
      { label: 'Urban Camping Ethiopia', href: '/journeys/urban-camping' },
      { label: 'Addis Ababa Stopovers', href: '/about#stopover' },
      { label: 'Curated Tours Catalogue', href: '/tours' },
    ],
  },
  {
    title: 'About Dinq',
    links: [
      { label: 'Our Story & Heritage', href: '/about#story' },
      { label: 'Why Ethiopia (12 Truths)', href: '/about#why-ethiopia' },
      { label: 'Tourism & Travel Services', href: '/about#services' },
      { label: 'Leadership & Field Team', href: '/about#team' },
      { label: '4x4 Expedition Fleet', href: '/about#fleet' },
      { label: 'B2B DMC Partnerships', href: '/about#partners' },
      { label: 'Travel & Gear Shop', href: '/shop' },
      { label: 'Contact Headquarters', href: '/contact' },
    ],
  },
];
