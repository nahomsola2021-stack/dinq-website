// src/pages/About.tsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass,
  Award,
  Layers,
  Sparkles,
  Sliders,
  ShieldCheck,
  MapPin,
  Check,
  Quote,
  Plane,
  Camera,
  Truck,
  HeartHandshake,
  Users,
  ArrowRight,
  ArrowUpRight,
  Star,
  Coffee,
  Utensils,
  Globe,
  Briefcase,
  Mountain,
  Heart,
  CheckCircle2,
  TreePine,
  Building2,
  CalendarCheck
} from 'lucide-react';
import { PageHero } from '../components/premium/PageHero';
import { CTABand } from '../components/premium/CTABand';
import { RouteFlow } from '../components/premium/RouteFlow';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';
import { useBooking } from '../context/BookingContext';

// --- INTERFACES ---
interface StopoverPackage {
  id: string;
  duration: string;
  code: string;
  badge: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  accentImage: string;
  idealWindow: string;
  vehicle: string;
  summary: string;
  stops: string[];
  highlights: string[];
}

// --- DATA STRUCTURES ---
const TEAM_MEMBERS = [
  {
    name: 'Zerihun Alemayehu',
    role: 'Founder & COO',
    bio: 'Tourism Professional • Tour Guide • Journalist • Media & Communication Expert. Over a decade leading complex expeditions across the Simien, Danakil, and Omo basins.',
    image: 'https://ambaseltourandtravel.com/wp-content/uploads/2023/12/neww.jpg',
    isFounder: true,
  },
  {
    name: 'Eldana Fikru',
    role: 'Marketing Manager',
    bio: '',
    image: '',
    isFounder: false,
  },
  {
    name: 'Semegn Tariku',
    role: 'General Manager',
    bio: '',
    image: '',
    isFounder: false,
  }
];

const WHY_DINQ_PILLARS = [
  { numeral: '01', title: '10+ YEARS OF EXPERIENCE', desc: 'A decade of experience across tourism, guiding, media, communication, events, and destination experiences.', icon: Award },
  { numeral: '02', title: 'LOCAL EXPERTISE', desc: 'We know Ethiopia beyond the usual tourist routes.', icon: MapPin },
  { numeral: '03', title: 'ONE-STOP EXPERIENCE', desc: 'Tourism, travel, events, transportation, guiding, outdoor experiences, and destination services under one platform.', icon: Layers },
  { numeral: '04', title: 'AUTHENTIC EXPERIENCES', desc: 'We focus on meaningful encounters with Ethiopia’s people, culture, nature, heritage, and communities.', icon: Sparkles },
  { numeral: '05', title: 'CUSTOM JOURNEYS', desc: 'Every traveler is different. We build journeys around your interests, style, time, and expectations.', icon: Sliders },
  { numeral: '06', title: 'PROFESSIONAL TEAM', desc: 'Experienced guides, drivers, coordinators, event professionals, destination experts, and support teams.', icon: Users },
];

const DISCOVER_THEMES = [
  { title: 'Heritage & History', desc: 'Ancient civilizations, historic cities, archaeological sites, monasteries, castles, and rock-hewn churches.', icon: Building2 },
  { title: 'Culture & Community', desc: 'Living traditions, local communities, food, music, dance, crafts, festivals, and everyday life.', icon: Heart },
  { title: 'Nature & Wildlife', desc: 'Mountains, forests, lakes, wetlands, national parks, wildlife, birds, and extraordinary landscapes.', icon: TreePine },
  { title: 'Coffee & Culinary', desc: 'From the forests of Kaffa to Ethiopia’s traditional coffee ceremony and diverse culinary heritage.', icon: Coffee },
  { title: 'Adventure & Hiking', desc: 'Mountains, escarpments, trekking routes, hiking trails, camping, and outdoor exploration.', icon: Mountain },
  { title: 'Photography & Storytelling', desc: 'Landscapes, wildlife, culture, people, architecture, festivals, and authentic moments.', icon: Camera },
];

const SERVICES = {
  tourism: ['Private Tours', 'Group Tours', 'Cultural Tours', 'Heritage Tours', 'Adventure Tours', 'Hiking & Trekking', 'Wildlife Safaris', 'Birding Tours', 'Coffee Tours', 'Culinary Experiences', 'Community Tourism', 'Ecotourism', 'Photography Tours', 'Festival Journeys', 'Road Trips', 'Wellness Escapes'],
  travel: ['Airport Transfers', 'Transportation', 'Accommodation Coordination', 'Tour Guides', 'Tour Leaders', 'Travel Logistics', 'Customized Itineraries', 'Corporate Travel', 'Group Travel', 'Destination Management'],
  events: ['Corporate Events', 'Tourism Events', 'Conferences', 'Cultural Events', 'Festivals', 'Outdoor Events', 'Team Building', 'Private Events', 'Destination Events', 'Media & Promotional Events']
};

const VALUES = [
  { title: 'Authenticity', desc: 'We connect travelers with genuine Ethiopian experiences.' },
  { title: 'Professionalism', desc: 'We maintain high standards in planning, communication, service, and execution.' },
  { title: 'Responsibility', desc: 'We respect communities, cultures, heritage, wildlife, and the environment.' },
  { title: 'Creativity', desc: 'We continuously develop new ways to experience Ethiopia.' },
  { title: 'Community', desc: 'We believe tourism should create opportunities for local people.' },
  { title: 'Hospitality', desc: 'We welcome every traveler with the warmth for which Ethiopia is known.' },
  { title: 'Excellence', desc: 'We aim to make every journey memorable from the first conversation to the final farewell.' }
];

const PARTNERSHIPS = [
  'International tour operators', 'Travel agencies', 'Destination management companies', 'Hotels and lodges',
  'Airlines and transport partners', 'Tourism organizations', 'NGOs and development organizations',
  'Embassies and international institutions', 'Corporate organizations', 'Media organizations', 'Community tourism initiatives'
];

const STOPOVER_PACKAGES: StopoverPackage[] = [
  {
    id: '6h',
    duration: '6 Hours',
    code: 'ADD-06',
    badge: 'Express Layover',
    title: 'The Capital Pulse & Tomoca Coffee Ritual',
    subtitle: 'Entoto Panoramic Ridge · Historic Piazza · Roastery Tasting',
    price: 95,
    image: 'https://www.silver-travellers.com/wp-content/uploads/2022/11/silver-travellers-ethiopia-highlight-coffee-ceremony-pooring-portrait.jpg',
    accentImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    idealWindow: 'Min. 7–8 hrs between flights',
    vehicle: 'Private 4x4 SUV + VIP Chauffeur',
    summary: 'Engineered for tight transit windows between international connections. Step out of Bole Terminal 2 into a waiting private 4x4, ascend into the eucalyptus forests of Mount Entoto for sweeping views over Addis Ababa, walk the Italian-era arcades of Piazza, and experience a traditional clay-pot (Jebena) highland coffee ceremony before gliding back to your departure gate.',
    stops: ['Bole VIP Pickup', 'Entoto Forest View', 'Piazza Roastery', 'Gate Drop-off'],
    highlights: ['Fast-track meet & greet directly outside Bole Terminal 2 customs', 'Private artisanal coffee ceremony & freshly roasted bean gift pack', 'Guaranteed return to airport security 2.5 hours prior to departure'],
  },
  {
    id: '12h',
    duration: '12 Hours',
    code: 'ADD-12',
    badge: 'Most Popular Transit',
    title: 'Imperial Addis, Lucy & Cultural Feast',
    subtitle: 'National Museum · Holy Trinity Cathedral · Mesob & Tej Dining',
    price: 165,
    image: 'https://cdn.getyourguide.com/image/format=auto%2Cfit=crop%2Cgravity=auto%2Cquality=60%2Cwidth=400%2Cheight=265%2Cdpr=2/tour_img/3c50ff0610bcc5fd1039fe6cdea474a80c1e736dde75070bbe96bb9592474bd6.png',
    accentImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    idealWindow: 'Full Morning or Day Layover',
    vehicle: 'Private Land Cruiser + Historian Host',
    summary: 'A curated full-day immersion into Ethiopia’s imperial and paleontological soul. Stand face-to-face with the 3.2-million-year-old fossil of Lucy at the National Museum, admire the stained glass and royal tombs of Holy Trinity Cathedral, browse handwoven Tibeb textiles at Shiro Meda, and conclude with a private chef’s tasting of regional dishes and honey wine (Tej).',
    stops: ['Bole Arrival', 'National Museum', 'Trinity Cathedral', 'Cultural Dinner'],
    highlights: ['Skip-the-line museum curation with a senior Ethiopian historian', 'Private guided walk through Shiro Meda’s master weavers market', 'Signature Mesob feast with live traditional Azmari music'],
  },
];


export const About: React.FC = () => {
  const { openBooking } = useBooking();
  const location = useLocation();
  const [activeStopover, setActiveStopover] = useState<string>('12h');

  useEffect(() => {
    updatePageMeta(
      'About Dinq Tour, Travel & Events — Discover the Places. Meet the People. Live the Story.',
      'Ethiopia is not simply a destination for us; it is our home. Discover Heritage, Culture, Wildlife, and Adventure through Dinq Tour, Travel & Events.',
      '/about'
    );
  }, []);

  // Universal smooth scroll for all dropdown anchor links
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const currentStopoverPkg = STOPOVER_PACKAGES.find((p) => p.id === activeStopover) || STOPOVER_PACKAGES[1];

  // Extracts initials for custom member photo placeholders
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="w-full bg-[#FAF4EB] text-[#302019] min-h-screen overflow-x-hidden selection:bg-[#DDAA42] selection:text-[#18110D]">
      
      {/* 1. CINEMATIC PAGE HERO */}
      <PageHero
        image="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_2400/v1788196891/x3pjsvkwckin0nkubke3.jpg"
        imageAlt="Lalibela's rock-hewn churches in Ethiopia"
        eyebrow="Dinq Tour, Travel & Events"
        Icon={Compass}
        title="Ethiopia, Our"
        titleItalic="Destination"
        subtitle="Discover the Places. Meet the People. Live the Story. Ethiopia is waiting. Let us help you experience it differently."
        crumbs={[{ label: 'About Us' }]}
        tall={false}
      />

      {/* 2. OVERVIEW & STORY (id="overview") */}
      <section id="overview" className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7D0B8] shadow-xs text-[10px] font-bold tracking-[0.2em] uppercase text-[#D95F49]">
              <Star className="h-3 w-3 fill-[#D95F49] text-[#D95F49]" />
              <span>Our Story & Inspiration</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#302019] leading-[1.12]">
              Ethiopia is not simply a destination. It is our <span className="italic text-[#D95F49]">home.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#78685E] font-light leading-[1.85] pt-2">
              <span className="float-left font-serif text-6xl sm:text-7xl text-[#D95F49] leading-[0.8] pr-4 pt-1 font-medium">I</span>
              t is our story, and our greatest source of inspiration. From the ancient civilizations of the north to the cultural diversity of the south; from the coffee forests of the west to the historic cities of the east.
            </p>

            <p className="text-sm sm:text-base text-[#78685E] font-light leading-relaxed">
              From the Great Rift Valley to the highlands, forests, lakes, deserts, and wildlife landscapes — we create journeys that reveal the many faces of Ethiopia. 
            </p>
            
            <div className="p-6 sm:p-8 rounded-2xl bg-[#302019] text-[#FFF9F2] shadow-xl relative overflow-hidden mt-8">
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#DDAA42]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#DDAA42] block mb-3">Our Signature Approach</span>
              <h4 className="font-serif text-2xl font-semibold mb-2">Travel Deeper. Experience More.</h4>
              <p className="text-sm text-[#D0C2B6] font-light leading-relaxed">
                At Dinq, we design journeys around experience, not simply transportation between destinations. Every journey brings together: <strong>Discover → Explore → Connect → Experience → Learn → Remember.</strong> We work with local communities, guides, accommodation providers, and artists to connect you with the real Ethiopia.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="relative aspect-[4/5] w-4/5 ml-auto rounded-[28px] overflow-hidden shadow-2xl border border-[#E7D0B8] bg-[#1A130F]">
                <ImageWithFallback src="https://res.cloudinary.com/dw1ohipim/image/upload/v1789820884/zd5ze8a4zujmqqpqpgvx.jpg" alt="Ethiopian safari at sunset" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#DDAA42] block">Our Promise</span>
                  <span className="font-serif italic text-base text-white/90">We don't simply take you to Ethiopia. We help you experience it.</span>
                </div>
              </div>
              <div className="relative -mt-36 sm:-mt-44 w-3/5 rounded-[24px] overflow-hidden shadow-2xl border-4 border-[#FAF4EB] bg-[#1A130F]">
                <div className="aspect-[4/3] relative">
                  <ImageWithFallback src="https://res.cloudinary.com/dw1ohipim/image/upload/v1789689878/juflmufrwax6lbsh02ei.jpg" alt="Ethiopian landscape at sunset" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISION, MISSION & PROMISE */}
      <section className="py-24 bg-[#16100D] text-[#FFF9F2] border-y border-[#DDAA42]/30 relative overflow-hidden grain animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#DDAA42] block mb-4">Our Vision</span>
              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-white leading-tight mb-6">
                To help position Ethiopia as a world-class destination for meaningful travel.
              </h3>
              <p className="text-sm text-[#D0C2B6] font-light leading-relaxed">
                We envision an Ethiopia where tourism connects destinations, communities, businesses, cultures, conservation, and international travelers — creating experiences that are valuable for everyone involved.
              </p>
            </div>
            
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#DDAA42] block mb-4">Our Mission</span>
              <h3 className="font-serif text-2xl font-medium text-white leading-relaxed mb-6">
                To deliver professional, authentic, safe, creative, and responsible travel and event experiences while promoting Ethiopia's heritage, culture, nature, communities, and extraordinary destinations to the world.
              </h3>
              
              <div className="pt-8 border-t border-[#DDAA42]/20">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#DDAA42] block mb-4">Our Promise</span>
                <ul className="space-y-3 text-sm text-[#D0C2B6] font-light">
                  <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-[#D95F49] shrink-0"/> We don't simply take you to Ethiopia. We help you experience it.</li>
                  <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-[#D95F49] shrink-0"/> We don't simply show you destinations. We introduce you to the stories behind them.</li>
                  <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-[#D95F49] shrink-0"/> We don't simply organize trips. We create journeys worth remembering.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DISCOVER ETHIOPIA THROUGH (id="why-ethiopia") */}
      <section id="why-ethiopia" className="py-24 bg-white border-b border-[#E7D0B8]/60 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <span className="eyebrow !tracking-[0.3em] text-[#D95F49]">The Ethiopian Tapestry</span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-medium text-[#302019] tracking-tight">
              Discover <span className="italic text-[#DDAA42]">Ethiopia Through</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISCOVER_THEMES.map((theme, idx) => {
              const IconComp = theme.icon;
              return (
                <div key={idx} className="p-8 rounded-3xl bg-[#FAF4EB] border border-[#E7D0B8]/60 hover:shadow-xl transition-shadow text-left group">
                  <div className="h-14 w-14 rounded-2xl bg-[#302019] flex items-center justify-center text-[#DDAA42] mb-6 shadow-md group-hover:scale-110 transition-transform">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#302019] mb-3">{theme.title}</h3>
                  <p className="text-sm text-[#78685E] font-light leading-relaxed">{theme.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. OUR SERVICES (id="services") */}
      <section id="services" className="py-24 md:py-32 bg-[#F5E9DA] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 text-left">
            <span className="eyebrow !tracking-[0.3em]">End-to-End Excellence</span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-medium text-[#302019] tracking-tight">
              Our <span className="italic text-[#D95F49]">Services</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#78685E] font-light leading-relaxed">
              We provide a one-stop platform for seamless tourism, travel coordination, and event management across Ethiopia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tourism */}
            <div className="bg-white rounded-[28px] border border-[#E7D0B8]/80 p-8 shadow-sm text-left">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#E7D0B8]">
                <Compass className="h-8 w-8 text-[#DDAA42]" />
                <h3 className="font-serif text-3xl font-semibold text-[#302019]">Tourism</h3>
              </div>
              <ul className="space-y-4">
                {SERVICES.tourism.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#78685E] font-medium">
                    <Check className="h-4 w-4 text-[#D95F49]" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel */}
            <div className="bg-white rounded-[28px] border border-[#E7D0B8]/80 p-8 shadow-sm text-left">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#E7D0B8]">
                <Plane className="h-8 w-8 text-[#DDAA42]" />
                <h3 className="font-serif text-3xl font-semibold text-[#302019]">Travel</h3>
              </div>
              <ul className="space-y-4">
                {SERVICES.travel.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#78685E] font-medium">
                    <Check className="h-4 w-4 text-[#D95F49]" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Events */}
            <div className="bg-white rounded-[28px] border border-[#E7D0B8]/80 p-8 shadow-sm text-left">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#E7D0B8]">
                <CalendarCheck className="h-8 w-8 text-[#DDAA42]" />
                <h3 className="font-serif text-3xl font-semibold text-[#302019]">Events</h3>
              </div>
              <ul className="space-y-4">
                {SERVICES.events.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#78685E] font-medium">
                    <Check className="h-4 w-4 text-[#D95F49]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY DINQ? (6 Benchmarks) */}
      <section className="py-24 md:py-36 bg-[#FAF4EB] relative overflow-hidden">
        <div aria-hidden className="absolute -right-36 top-1/4 h-[550px] w-[550px] rounded-full bg-[#DDAA42]/10 blur-[130px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
            <div className="max-w-2xl">
              <span className="eyebrow !tracking-[0.3em]">The Six Benchmarks</span>
              <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-medium text-[#302019] tracking-tight">
                Why <span className="italic text-[#DDAA42]">Dinq?</span>
              </h2>
            </div>
            <Link to="/tours" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#302019] text-[#FFF9F2] text-xs font-bold uppercase tracking-widest hover:bg-[#D95F49] transition-colors">
              <span>Explore 15 Expeditions</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_DINQ_PILLARS.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div key={pillar.numeral} className="group relative rounded-2xl bg-gradient-to-b from-[#2A1D18] to-[#1C120C] p-8 border border-[#DDAA42]/25 hover:border-[#DDAA42]/70 transition-all duration-500 hover:shadow-[0_12px_35px_rgba(221,170,66,0.18)] hover:-translate-y-1 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs font-bold tracking-widest text-[#DDAA42] bg-[#DDAA42]/10 border border-[#DDAA42]/25 px-3 py-1 rounded-md">{pillar.numeral}</span>
                      <div className="h-11 w-11 rounded-full bg-[#302019] border border-[#DDAA42]/30 flex items-center justify-center text-[#DDAA42] group-hover:scale-110 group-hover:bg-[#DDAA42] group-hover:text-[#1C120C] transition-all duration-500"><IconComponent className="h-5 w-5" /></div>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#FFF9F2] group-hover:text-[#DDAA42] transition-colors">{pillar.title}</h3>
                    <p className="mt-3 text-xs sm:text-sm text-[#D0C2B6] font-light leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. OUR VALUES */}
      <section className="py-24 bg-white border-t border-[#E7D0B8]/60 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="eyebrow !tracking-[0.3em] text-[#D95F49]">Our Core Principles</span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-medium text-[#302019] tracking-tight">
              Our <span className="italic text-[#DDAA42]">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#FAF4EB] border border-[#E7D0B8]/60 text-left">
                <h4 className="font-serif text-xl font-bold text-[#D95F49] mb-2">{val.title}</h4>
                <p className="text-sm text-[#78685E] font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TEAM & LEADERSHIP (id="team") */}
      <section id="team" className="py-24 md:py-32 bg-[#16100D] text-[#FFF9F2] relative overflow-hidden grain scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#DDAA42] block">
              Team & Leadership
            </span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-medium text-[#FAF4EB] tracking-tight">
              Behind every Dinq journey is a <span className="italic text-[#DDAA42]">passionate team.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#D0C2B6] font-light leading-relaxed">
              Together, our team combines local knowledge, professional experience, creativity, communication, hospitality, and destination expertise.
            </p>
          </div>

          {/* Leadership Tier with items-start to prevent vertical stretching */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 items-start">
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className={`group rounded-[28px] bg-gradient-to-br from-[#271C17] via-[#1D1511] to-[#120D0A] p-6 flex flex-col items-center text-center shadow-2xl hover:-translate-y-2 transition-all duration-300 border ${member.isFounder ? 'border-[#DDAA42] shadow-[0_8px_30px_rgba(221,170,66,0.15)] bg-gradient-to-br from-[#30221A] to-[#120D0A]' : 'border-transparent bg-black/20'}`}>
                
                {/* Square Image Container with Golden Founder Border */}
                <div className={`aspect-square w-full rounded-2xl overflow-hidden shadow-lg bg-[#16100D] mb-6 flex items-center justify-center shrink-0 relative ${member.isFounder ? 'border-2 border-[#DDAA42] shadow-md shadow-[#DDAA42]/10' : 'border border-white/5'}`}>
                  {member.image ? (
                    <ImageWithFallback src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="font-serif text-5xl font-medium text-[#DDAA42]/30 select-none tracking-widest">
                      {getInitials(member.name)}
                    </span>
                  )}
                </div>
                
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white mb-1.5">{member.name}</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#DDAA42] mb-3">{member.role}</p>
                {member.bio && <p className="text-xs text-[#D0C2B6] font-light leading-relaxed px-2 pb-2">{member.bio}</p>}
              </div>
            ))}
          </div>

          {/* Professional & Field Team List */}
          <div className="rounded-[28px] bg-[#211712] border border-[#DDAA42]/30 p-8 sm:p-12 mb-16 text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mb-8">Our Professional & Field Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
              {['Professional Drivers', 'Tour Guides & Tour Leaders', 'Local Destination Experts', 'Community Coordinators', 'Tourism & Business Advisors', 'Event Organizers', 'Media & Content Team', 'Outdoor & Camping Crew'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-black/30 border border-white/10 hover:border-[#DDAA42]/45 transition-colors">
                  <Check className="h-4 w-4 text-[#DDAA42] shrink-0" />
                  <span className="text-sm text-[#FFF9F2] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. COMMUNITY & RESPONSIBLE TOURISM */}
      <section className="py-24 bg-[#F5E9DA] border-t border-[#E7D0B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow !tracking-[0.3em] text-[#D95F49]">Community & Responsible Tourism</span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-medium text-[#302019] tracking-tight">
              Creating Value for <span className="italic text-[#DDAA42]">Everyone</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#78685E] font-light leading-relaxed">
              We believe tourism should create value for both travelers and destinations. Our goal is to help travelers experience Ethiopia respectfully while contributing to the people and places they visit. Where appropriate, our experiences support:
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['Local communities', 'Local guides', 'Small businesses', 'Farmers & producers', 'Artisans', 'Local accommodation', 'Cultural practitioners', 'Conservation initiatives', 'Local tourism economies'].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-[#E7D0B8]/60 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow">
                <HeartHandshake className="h-4 w-4 text-[#D95F49] shrink-0" />
                <span className="text-xs font-semibold text-[#302019]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. VIP STOPOVER SECTION (id="stopovers") */}
      <section id="stopovers" className="py-24 md:py-36 bg-gradient-to-b from-[#FAF4EB] via-[#F5E9DA] to-[#FAF4EB] scroll-mt-24 relative overflow-hidden">
        <div aria-hidden className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#DDAA42]/10 blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 text-left">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A130F] text-[#DDAA42] border border-[#DDAA42]/30 text-[10px] font-bold uppercase tracking-[0.22em] mb-4 shadow-sm animate-fade-in">
                <Plane className="h-3.5 w-3.5 text-[#DDAA42]" />
                <span>Transit Stopovers</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-[#302019] tracking-tight leading-[1.08]">
                Addis Ababa <span className="italic text-[#D95F49]">VIP Stopover</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#78685E] font-light leading-relaxed">
                Connecting through Addis Ababa on Ethiopian Airlines? Trade the airport lounge for a private 4x4, a personal historian host, and a freshly brewed highland coffee ceremony. Select your layover window below:
              </p>
            </div>

            <div className="rounded-2xl bg-white/90 backdrop-blur-md border border-[#E7D0B8] p-4 flex items-center gap-3.5 shadow-sm self-start lg:self-auto hover:shadow-lg transition-all duration-300">
              <div className="h-11 w-11 rounded-full bg-[#2A1D18] text-[#DDAA42] flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D95F49] block">Real-Time Flight Tracking</span>
                <span className="text-xs font-semibold text-[#302019] block">Guaranteed Return 2.5h Before Boarding</span>
              </div>
            </div>
          </div>

          {/* Stopover Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {STOPOVER_PACKAGES.map((pkg) => {
              const isSelected = pkg.id === activeStopover;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setActiveStopover(pkg.id)}
                  className={`group relative rounded-[26px] overflow-hidden text-left transition-all duration-500 cursor-pointer flex flex-col justify-end min-h-[320px] p-6 border-2 ${isSelected ? 'border-[#D95F49] shadow-[0_20px_50px_rgba(217,95,73,0.25)] -translate-y-2' : 'border-transparent shadow-md hover:shadow-xl hover:-translate-y-1 opacity-90 hover:opacity-100'}`}
                >
                  <ImageWithFallback src={pkg.image} alt={pkg.title} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isSelected ? 'scale-[1.08]' : 'group-hover:scale-105'}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A] via-[#120D0A]/55 to-black/20" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 animate-fade-in">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md transition-colors ${isSelected ? 'bg-[#D95F49] text-white shadow-md' : 'bg-black/55 text-[#DDAA42] border border-[#DDAA42]/35'}`}>
                      {pkg.duration}
                    </span>
                    <span className="font-mono text-[10px] font-bold tracking-widest text-white/75 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                      {pkg.code}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DDAA42] block mb-1">{pkg.badge}</span>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white leading-snug line-clamp-2">{pkg.title}</h3>
                    <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#A6978A] block">Private</span>
                        <span className="font-serif text-xl font-bold text-[#FFF9F2]">
                          ${pkg.price} <span className="text-[10px] font-sans font-normal text-white/60">/ pp</span>
                        </span>
                      </div>
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-[#D95F49] text-white' : 'bg-white/10 text-white group-hover:bg-[#DDAA42] group-hover:text-[#1A130F]'}`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Package Details */}
          <div className="rounded-[32px] bg-[#1A130F] text-[#FFF9F2] border border-[#DDAA42]/35 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative min-h-[420px] lg:min-h-full overflow-hidden bg-[#120D0A] flex flex-col justify-between p-6 sm:p-8">
              <ImageWithFallback src={currentStopoverPkg.image} alt={currentStopoverPkg.title} className="absolute inset-0 w-full h-full object-cover opacity-85 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A] via-[#120D0A]/40 to-black/50" />
              <div className="relative z-10 flex items-center justify-between bg-black/55 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3">
                <div className="text-left">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#DDAA42] block">VIP TRANSIT PASS · {currentStopoverPkg.code}</span>
                  <span className="text-xs font-semibold text-white">ADD Terminal 2 → Addis Circuit → ADD</span>
                </div>
                <Plane className="h-5 w-5 text-[#DDAA42]" />
              </div>
              <div className="relative z-10 mt-auto pt-12">
                <div className="flex items-end gap-4">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#DDAA42] shadow-2xl shrink-0 hidden sm:block bg-[#1A130F]">
                    <ImageWithFallback src={currentStopoverPkg.accentImage} alt={currentStopoverPkg.subtitle} className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-black/65 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex-1 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#DDAA42] block">Connection Window</span>
                    <p className="text-sm font-semibold text-white mt-0.5">{currentStopoverPkg.idealWindow}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-br from-[#241914] via-[#1A120E] to-[#120D0A]">
              <div className="text-left">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#DDAA42]/20">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3.5 py-1 rounded-full bg-[#D95F49] text-white text-[10px] font-bold uppercase tracking-widest">{currentStopoverPkg.duration} Stopover</span>
                    <span className="text-xs font-medium text-[#DDAA42]">· {currentStopoverPkg.badge}</span>
                  </div>
                </div>
                <h3 className="mt-6 font-serif text-3xl sm:text-4xl font-semibold text-[#FFF9F2] leading-tight">{currentStopoverPkg.title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm font-medium text-[#DDAA42]">{currentStopoverPkg.subtitle}</p>
                <p className="mt-4 text-xs sm:text-sm text-[#D0C2B6] font-light leading-relaxed">{currentStopoverPkg.summary}</p>
                <div className="mt-7 p-5 rounded-2xl bg-black/35 border border-[#DDAA42]/25">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DDAA42]">Door-to-Door Sequence</span>
                  </div>
                  <RouteFlow stops={currentStopoverPkg.stops} dark={true} size="sm" />
                </div>
              </div>
              <div className="mt-10 pt-6 border-t border-[#DDAA42]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-left">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#A6978A] block">All-Inclusive Rate</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-serif text-4xl font-bold text-[#DDAA42]">${currentStopoverPkg.price}</span>
                    <span className="text-xs text-[#D0C2B6]">USD / person</span>
                  </div>
                </div>
                <button type="button" onClick={() => openBooking(`Addis VIP Stopover (${currentStopoverPkg.duration}): ${currentStopoverPkg.title}`)} className="px-7 py-4 rounded-full bg-[#D95F49] hover:bg-[#C04C37] text-white text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 duration-300 pointer-events-auto cursor-pointer">
                  Reserve Stopover
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. EXPEDITION FLEET (id="fleet") */}
      <section id="fleet" className="py-20 bg-white border-y border-[#E7D0B8]/60 scroll-mt-24 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
             <span className="eyebrow !tracking-[0.3em] text-[#D95F49]">Autonomous Infrastructure</span>
             <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-medium text-[#302019] tracking-tight">
                Our Expedition <span className="italic text-[#DDAA42]">Fleet</span>
             </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="flex flex-col items-center text-center p-6 border border-[#E7D0B8]/60 rounded-3xl bg-[#FAF4EB] hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-white border border-[#E7D0B8] flex items-center justify-center text-[#D95F49] shadow-xs mb-4"><Truck className="h-6 w-6" /></div>
              <h4 className="font-serif text-xl font-semibold text-[#302019] mb-2">Heavy-Duty 4x4s</h4>
              <p className="text-xs text-[#78685E] font-light leading-relaxed">Privately maintained Toyota Land Cruisers equipped with dual fuel tanks and desert recovery gear designed for Afar and Omo tracks.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-[#E7D0B8]/60 rounded-3xl bg-[#FAF4EB] hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-white border border-[#E7D0B8] flex items-center justify-center text-[#D95F49] shadow-xs mb-4"><HeartHandshake className="h-6 w-6" /></div>
              <h4 className="font-serif text-xl font-semibold text-[#302019] mb-2">Direct Dividends</h4>
              <p className="text-xs text-[#78685E] font-light leading-relaxed">We employ local scouts, muleteers, and village hosts directly at fair wages, ensuring tourism revenue stays in rural communities.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-[#E7D0B8]/60 rounded-3xl bg-[#FAF4EB] hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-white border border-[#E7D0B8] flex items-center justify-center text-[#D95F49] shadow-xs mb-4"><MapPin className="h-6 w-6" /></div>
              <h4 className="font-serif text-xl font-semibold text-[#302019] mb-2">Addis Flagship Base</h4>
              <p className="text-xs text-[#78685E] font-light leading-relaxed">Visit our Addis Ababa office and gear outfitter for pre-trek boot fittings, map briefings, and freshly roasted highland coffee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. B2B PARTNERSHIPS (id="b2b") */}
      <section id="b2b" className="py-24 bg-[#1A130F] text-[#FFF9F2] relative overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="max-w-3xl mb-12">
            <Briefcase className="h-10 w-10 text-[#DDAA42] mb-6 opacity-80" />
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight mb-4">
              International Partnerships
            </h2>
            <p className="text-sm sm:text-base text-[#D0C2B6] font-light leading-relaxed mb-6">
              Dinq Tour, Travel & Events is committed to building strong relationships worldwide. We operate as a highly trusted Destination Management Company (DMC) and ground handler, welcoming international partners who want to discover, promote, sell, and experience Ethiopia through trusted local expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {PARTNERSHIPS.map((partner, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 shadow-sm hover:border-white/20 transition-colors">
                <Check className="h-4 w-4 text-[#DDAA42] shrink-0" />
                <span className="text-xs text-[#FFF9F2]">{partner}</span>
              </div>
            ))}
          </div>

          <a href={waLink('Hello Dinq! We are an international travel agency/operator interested in a B2B DMC partnership.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#DDAA42] text-[#1A130F] text-xs font-bold uppercase tracking-wider hover:bg-[#E7C175] transition-all shadow-[0_0_20px_rgba(221,170,66,0.3)] hover:scale-105 duration-300">
            <span>Partner With Dinq</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* 13. CLOSING CTA BAND */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CTABand
          title="Ethiopia is Waiting."
          subtitle="Speak directly with our senior expedition planners in Addis Ababa to design a custom route tailored to your pace."
        />
      </div>
    </div>
  );
};

export default About;