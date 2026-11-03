// src/pages/Experiences.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, ArrowUpRight, MapPin, MessageCircle, 
  Clock, Compass, Calendar, Check, Camera, Coffee, Flame, HeartHandshake,
  Layers, Sliders, Play, ChevronDown, CheckCircle2, Award
} from 'lucide-react';
import { PageHero } from '../components/premium/PageHero';
import { ExploreMore } from '../components/premium/ExploreMore';
import { CTABand } from '../components/premium/CTABand';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';

interface ExperienceCard {
  id: string;
  numeral: string;
  category: string;
  title: string;
  location: string;
  duration: string;
  summary: string;
  signature: string;
  image: string;
  linkHref: string;
  linkText: string;
  badge?: string;
  elevation?: string;
  highlights: string[];
}

const EXPERIENCES_DATA: ExperienceCard[] = [
  {
    id: 'exp-community',
    numeral: '01',
    category: 'Community & Culture',
    title: 'Village Hearth & Ancestral Gastronomy',
    location: 'Gurage, Dorze & Konso Highlands',
    duration: '2–4 Days',
    elevation: 'Highlands (1,800m - 2,900m)',
    summary: 'Travel as an honored guest into indigenous family compounds. Learn the sacred preparation of Enset (false banana), teff injera fermentation, and acoustic storytelling by ember glow.',
    signature: 'Travel as a Guest. Leave as a Friend.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_1600/v1793573804/ksfg4cbstuwiundmif2a.jpg',
    linkHref: '/journeys/community-culture',
    linkText: 'Read Programme Story',
    badge: 'Consensual Community Protocol',
    highlights: ['Harvest Enset with village elders', 'Dine by traditional hearthfire', 'Participatory architectural craft']
  },
  {
    id: 'exp-photo',
    numeral: '02',
    category: 'Photography Expedition',
    title: 'Chiaroscuro Light & Escarpment Vistas',
    location: 'Lalibela, Danakil & Simien Cliffs',
    duration: '7–14 Days',
    elevation: 'Varied (120m below sea to 4,500m)',
    summary: 'Master golden hour light with seasoned expedition photo guides. Capture subterranean candlelit Ge’ez liturgies, dramatic sulfur terraces, and dignified consensual community portraits.',
    signature: 'One Country. Many Worlds. One Lens.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_1600/v1793565373/unmln7ly1kysokhe6pyc.jpg',
    linkHref: '/journeys/photography',
    linkText: 'Explore Photo Expedition',
    badge: 'Naturalist & Curation Host',
    highlights: ['Reserved vantage at sacred liturgies', 'Low-impact visual timing and pacing', 'Full battery charging in overland fleets']
  },
  {
    id: 'exp-urban-camping',
    numeral: '03',
    category: 'Boutique Glamping',
    title: 'Urban Camping Ethiopia™ Highland Retreat',
    location: 'Suba Ancient Forest & Entoto Ridge',
    duration: 'Overnight / 2 Days',
    elevation: 'Forest (2,600m - 3,100m)',
    summary: 'Dinq’s trademark outdoor innovation: luxury canvas bell tents, camp chef 3-course grilled dinners, fine wines, and acoustic Masinko folk music within two hours of the capital.',
    signature: 'Where City Skyline Fades and Campfire Begins',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_1600/v1793323868/hnljyrno6drlekx1odx3.jpg',
    linkHref: '/journeys/urban-camping',
    linkText: 'Discover Urban Camping',
    badge: 'Exclusive Dinq Original',
    highlights: ['Private forest glamping setups', 'Locally sourced 3-course wild grills', 'Starlit acoustic folk performances']
  },
  {
    id: 'exp-road-trip',
    numeral: '04',
    category: 'Expedition Overland',
    title: '4x4 Trans-Plateau Scenic Mountain Passes',
    location: 'Limalimo Pass, Great Rift & Omo Basin',
    duration: '6–12 Days',
    elevation: 'Transit (Deep Gorges to Plateau)',
    summary: 'Meticulously equipped heavy-duty Toyota Land Cruiser convoys piloted by veteran expedition captains, crossing dramatic canyon gorges and remote pastoralist market trails.',
    signature: 'The Journey is the Destination.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_1600/v1793565467/ss5kaznkfukmguimsnbg.jpg',
    linkHref: '/journeys/road-trip',
    linkText: 'View Overland Route',
    badge: 'Dynamic Logistics Fleet',
    highlights: ['Overland grade Toyota 4WD Land Cruisers', 'Indigenous territory permit facilitation', '24/7 Addis Ababa Command dispatch']
  },
  {
    id: 'exp-coffee-origin',
    numeral: '05',
    category: 'Terroir & Coffee',
    title: 'Wild Arabica Forest & Cupping Expedition',
    location: 'Kaffa, Yayu Biosphere, Sidama & Guji',
    duration: '5–8 Days',
    elevation: 'Montane (1,500m - 2,100m)',
    summary: 'Hike into primeval rainforest canopies where Arabica coffee still grows wild as an indigenous understory shrub. Cup rare single-origin heirlooms with pioneering farmer cooperatives.',
    signature: 'Ethiopia — Where Coffee Begins',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_1600/v1791483182/xx38kv7tjgtztu4pj9c1.jpg',
    linkHref: '/signature-routes',
    linkText: 'Follow the Coffee Trail',
    badge: 'Historical Origin Trace',
    highlights: ['Trace primeval coffee forests', 'Traditional clay Jebenot micro ceremonies', 'FairTrade micro-lot cooperative visits']
  },
  {
    id: 'exp-festivals',
    numeral: '06',
    category: 'Living Faith',
    title: 'Imperial Epiphany & Meskel Bonfire Vigils',
    location: 'Gondar Fasilides Bath & Meskel Square',
    duration: '4–7 Days',
    elevation: 'Traditional Civic Circuits',
    summary: 'Experience the world’s most visually majestic spiritual gatherings: thousands of white-robed worshippers, velvet royal umbrellas, and sacred Ge’ez hymns echoing across stone sanctuaries.',
    signature: 'Come for the Festival. Live the Story.',
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_1600/v1793566978/ksa0mjg5qqlnabetp4fh.avif',
    linkHref: '/festivals',
    linkText: 'Explore Festivals of Faith',
    badge: 'Uncompromised Cultural Respect',
    highlights: ['Reserved, respectful high terrace seating', 'Senior historical liturgical translation', 'Integration into rural, localized festivities']
  },
];

export const Experiences: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    updatePageMeta(
      'Signature Experiences — Dinq Tour, Travel & Events',
      'Discover signature Ethiopian travel experiences: community village homestays, master photo expeditions, boutique urban camping, and wild coffee origins.',
      '/experiences'
    );
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const categories = ['all', 'Community & Culture', 'Photography Expedition', 'Boutique Glamping', 'Expedition Overland', 'Terroir & Coffee', 'Living Faith'];

  const filteredExperiences = EXPERIENCES_DATA.filter((exp) => 
    activeTab === 'all' || exp.category.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <div className="w-full bg-[#FAF4EB] text-[#302019] min-h-screen selection:bg-[#DDAA42] selection:text-[#18110D]">
      {/* Cinematic Cover Hero */}
      <PageHero
        image="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,c_limit,w_2400/v1793567456/tpdayeowhkjf0zhmc44f.webp"
        imageAlt="Ethiopian musicians performing at a colorful cultural celebration"
        eyebrow="Signature Concepts"
        Icon={Sparkles}
        title="Experiential"
        titleItalic="Journeys"
        subtitle="Beyond traditional sightseeing: participatory travel designed to immerse you directly in the living pulse of Ethiopian nature, people, and heritage."
        crumbs={[{ label: 'Experiences' }]}
        tall={false}
      />

      {/* Concept Architecture Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16 text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E7D0B8]/60 pb-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#D95F49] font-bold">
              Programme Category Filter
            </span>
            <h2 className="font-serif text-3xl font-medium tracking-tight mt-1">
              Circuit Class Catalogues
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveTab(cat); setExpandedId(null); }}
                className={`whitespace-nowrap text-xs font-semibold px-4.5 py-2.5 rounded-full transition-all duration-300 border cursor-pointer ${
                  activeTab === cat
                    ? 'bg-[#302019] text-white border-[#302019] shadow-md scale-105'
                    : 'bg-[#FAF4EB] text-[#78685E] border-[#E7D0B8]/50 hover:bg-[#F5E9DA] hover:text-[#302019]'
                }`}
              >
                {cat === 'all' ? 'All Expeditions' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Asymmetrical High-End Visual Cards Dossiers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Visual Display (Left / Double card on First View) */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map((exp, index) => {
              const isHeroCard = index % 3 === 0;
              const isOpen = expandedId === exp.id;
              return (
                <article
                  key={exp.id}
                  className={`group relative rounded-[2.5rem] bg-white border border-[#E7D0B8]/60 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col justify-between ${
                    isHeroCard ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                >
                  <div>
                    {/* Immersive Parallax-Ready Image Holder */}
                    <div className="relative aspect-[16/9.5] overflow-hidden bg-[#1A130F]">
                      <ImageWithFallback
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                      />
                      {/* Rich Dark Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />
                      
                      {/* Dossier Indices badges */}
                      <div className="absolute top-4 left-5 numeral font-serif text-[#FAF4EB] text-4xl select-none font-bold">
                        {exp.numeral}
                      </div>

                      {exp.badge && (
                        <div className="absolute top-4 right-4 bg-[#D95F49] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                          {exp.badge}
                        </div>
                      )}

                      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white text-left z-10">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#DDAA42]">
                            {exp.category}
                          </span>
                          <p className="text-xs font-light text-white/90 flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-[#DDAA42]" />
                            <span>{exp.location}</span>
                          </p>
                        </div>

                        <span className="bg-black/55 backdrop-blur-md border border-white/15 px-3.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                          <Clock className="h-3 w-3 text-[#D95F49]" />
                          {exp.duration}
                        </span>
                      </div>
                    </div>

                    {/* Meta Details Narrative Panel */}
                    <div className="p-7 sm:p-8 text-left space-y-4">
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight text-[#302019] group-hover:text-[#D95F49] transition-colors">
                          {exp.title}
                        </h3>
                        <span className="text-[10px] font-mono tracking-wider text-[#A6978A] block mt-1">
                          Altitude Scale: {exp.elevation || 'Varied'}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#78685E] font-light leading-[1.75]">
                        {exp.summary}
                      </p>

                      {/* Custom "Inside the Expedition" expanding Features Tray */}
                      <div className="border-t border-[#E7D0B8]/60 pt-4 mt-2">
                        <button
                          type="button"
                          onClick={() => toggleExpand(exp.id)}
                          className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-[#D95F49] hover:text-[#302019] transition-colors cursor-pointer focus:outline-none"
                        >
                          <span>Expedition Blueprint</span>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#302019]' : ''}`} />
                        </button>

                        <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                          isOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}>
                          <ul className="space-y-3">
                            {exp.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF4EB]/60 border border-[#E7D0B8]/40">
                                <Check className="h-4 w-4 text-[#DDAA42] shrink-0 mt-0.5" />
                                <span className="text-xs sm:text-sm text-[#302019] font-medium">
                                  {highlight}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Utility Bar */}
                  <div className="px-7 sm:px-8 pb-7 pt-2 flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#E7D0B8]/40 gap-4 mt-6">
                    <div className="text-left py-1">
                      <span className="text-[8px] uppercase tracking-widest text-[#A6978A] font-bold block mb-1">
                        Operational Guarantee
                      </span>
                      <p className="font-serif italic text-xs font-semibold text-[#D95F49]">
                        "{exp.signature}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 justify-end">
                      <Link
                        to={exp.linkHref}
                        className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full bg-[#302019] hover:bg-[#D95F49] text-[#FFF9F2] text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-md"
                      >
                        <span>{exp.linkText}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>

                      <a
                        href={waLink(`Hello Dinq! I am interested in inquiring about the "${exp.title}" experience.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-11 w-11 rounded-full border border-[#D95F49]/40 text-[#D95F49] hover:bg-[#D95F49] hover:text-white flex items-center justify-center transition-all cursor-pointer"
                        title={`Ask Zerihun about ${exp.title}`}
                      >
                        <MessageCircle className="h-4.5 w-4.5" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

        </div>

        {/* Dynamic Concept Trust Board */}
        <section className="my-28 rounded-[2.5rem] bg-gradient-to-br from-[#2A1D18] to-[#1C120C] border border-[#DDAA42]/20 p-8 sm:p-14 md:p-16 relative overflow-hidden text-[#FFF9F2] shadow-2xl flex flex-col md:flex-row gap-12 items-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#D95F49]/10 to-transparent rounded-full blur-3xl" />
          
          {/* Layered brand icons */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-start shrink-0 relative">
            <div className="h-56 w-56 rounded-full border border-[#DDAA42]/20 bg-[#120D0A] flex items-center justify-center text-[#DDAA42] relative z-10 shadow-3xl">
              <Compass className="w-24 h-24 stroke-1 animate-spin-slow" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-2xl bg-[#D95F49] border border-white/10 flex items-center justify-center text-white rotate-12 animate-bounce-slow">
              <Award className="h-9 w-9" />
            </div>
          </div>

          <div className="flex-1 text-left space-y-6 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#DDAA42] block">
              The Participatory Principle
            </span>
            <h3 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1] text-white">
              No Spectating. Only Engaging.
            </h3>
            
            <p className="text-sm sm:text-base text-[#D0C2B6] font-light leading-relaxed max-w-2xl">
              Unlike traditional travel programs that observe through a tour bus glass, Dinq experiences involve interactive, dignified human connection. Walk side-by-side, harvest wild terroir, and engage as a respectful guest across Ethiopia's deep historical lands.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
              {[
                { title: 'Dignified Inclusion', spec: 'Honored host relationships' },
                { title: 'Overland Captains', spec: 'Heavy duty Toyota vehicles' },
                { title: 'Ornithologist Guides', spec: 'Field trained specialist' },
                { title: 'Traditional Hearth', spec: 'Direct village integration' },
              ].map((pill, i) => (
                <div key={i} className="space-y-1">
                  <span className="block text-xs font-bold uppercase text-[#DDAA42]">{pill.title}</span>
                  <span className="block text-[10px] text-[#A6978A]">{pill.spec}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore More Index Map Section */}
        <ExploreMore title="Explore Dynamic Multi-Day Circuits" />

        {/* Final Integrated Call to Action */}
        <div className="mt-16">
          <CTABand 
            title="Design a Bespoke Journey concept"
            subtitle="Connect directly with Zerihun Alemayehu and our ground planners in Addis Ababa to map out custom treks, overnight stays, and photography pacing based around your style."
          />
        </div>

      </div>
    </div>
  );
};