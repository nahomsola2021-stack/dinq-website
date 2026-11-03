export interface CollectionLink {
  id: string;
  route: string;
  title: string;
  kicker: string;
  blurb: string;
  image: string;
  icon: string;
  countBadge?: string;
}

export const COLLECTIONS: CollectionLink[] = [
  {
    id: 'safari',
    route: '/safari',
    title: 'Safari Collection',
    kicker: 'Wildlife • Wilderness • Rare Habitats',
    blurb: 'From the remote elephant trails of Chebera-Churchura to the wild predators of Gambella and Kafta-Shiraro.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_1200/v1793563605/gjrtkytrzyvhrqbaceyq.webp',
    icon: 'Compass',
    countBadge: '9 Expeditions',
  },
  {
    id: 'mountains',
    route: '/mountains',
    title: 'Mountains & Trekking',
    kicker: 'Afro-Alpine Peaks • Deep Canyons',
    blurb: 'Jagged Simien escarpments, Bale afro-alpine moorlands, Choke water towers and holy volcanic peaks.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_1200/v1793565243/zsz0h7vqmnyq2febjca7.jpg',
    icon: 'Mountain',
    countBadge: '12 Experiences',
  },
  {
    id: 'birding',
    route: '/birding',
    title: 'Ethiopia Birding',
    kicker: 'Endemics • Great Rift Flyway',
    blurb: 'Over 850 bird species and 30+ endemics across volcanic rift lakes, highland forests, and southern bushveld.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_1200/v1793565956/nljiyy4bi57bajr9hamm.jpg',
    icon: 'Feather',
    countBadge: '14 Sites · 5 Journeys',
  },
  {
    id: 'festivals',
    route: '/festivals',
    title: 'Festivals of Faith',
    kicker: 'Living Antiquity • Chants & Colors',
    blurb: 'Witness Timkat epiphanies in royal baths, Meskel bonfires in Addis, and ancient Christmas in Lalibela.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_1200/v1793566978/ksa0mjg5qqlnabetp4fh.avif',
    icon: 'Flame',
    countBadge: '12 Festivals · 4 Journeys',
  },
  {
    id: 'shewa-land-escape',
    route: '/shewa-land-escape',
    title: 'Shewa Land Escape',
    kicker: 'Royal Heritage • Crater Lakes • Forests',
    blurb: 'Escape Addis Ababa into royal highland history, Menagesha ancient cedar canopies, and sacred Wonchi waters.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_1200/v1793567994/fwaftngzo8psjplplxix.jpg',
    icon: 'Trees',
    countBadge: '10 Sites · 5 Journeys',
  },
  {
    id: 'kundudo-babile',
    route: '/kundudo-babile',
    title: 'Kundudo–Babile',
    kicker: 'Wild Horses • Relict Elephants',
    blurb: 'From the feral horses of Mount Kundudo’s high plateau to the relict desert elephant sanctuary of Babile.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
    icon: 'Wind',
    countBadge: 'Signature Expedition',
  },
  {
    id: 'signature-routes',
    route: '/signature-routes',
    title: 'Signature Routes',
    kicker: 'Five Ways · Seven National Circuits',
    blurb: 'The classic Northern Historic loop, Great Rift Valley traverse, Coffee Origins trail, and deep Omo crossings.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_1200/v1788191639/ja0p18egwk32gflxlq5k.jpg',
    icon: 'MapPin',
    countBadge: '5 Ways · 7 Routes',
  },
];
