import React, { useState, useEffect } from 'react';
import { Compass, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import confetti from 'canvas-confetti';
import { PageHero } from '../components/premium/PageHero';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';

export const PlanYourTrip: React.FC = () => {
  useEffect(() => {
    updatePageMeta(
      'Custom Trip Planner — Dinq Tour, Travel & Events',
      'Design your tailor-made expedition to Ethiopia with our bespoke trip planner. Select regions, interests, duration, and group style.',
      '/plan-your-trip'
    );
  }, []);

  const [step, setStep] = useState(1);

  // Form selections
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['Northern Historic Circuit (Lalibela, Gondar, Axum)']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Monolithic Antiquity & Living Faith']);
  const [travelDuration, setTravelDuration] = useState('Classic Circuit (8–11 Days)');
  const [travelStyle, setTravelStyle] = useState('Private Bespoke 4x4 Expedition');
  const [travelMonth, setTravelMonth] = useState('October – March (Dry High Season)');
  const [travelers, setTravelers] = useState('2 Travelers');

  // Contact info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [completed, setCompleted] = useState(false);

  const regionOptions = [
    'Northern Historic Circuit (Lalibela, Gondar, Axum)',
    'Simien Mountains National Park (High Alpine Trek)',
    'Bale Mountains & Sanetti Plateau (Ethiopian Wolf)',
    'Danakil Depression & Dallol (Planetary Geothermal)',
    'Lower Omo Valley (Ancestral Living Cultures)',
    'Harar Jugol & Kundudo (Wild Horses & Walled City)',
    'Shewa Land Escapes (Wonchi Crater, Ankober, Suba)',
  ];

  const interestOptions = [
    'Monolithic Antiquity & Living Faith',
    'Wildlife & Big Mammal Tracking',
    'High-Altitude Alpine Trekking & Summits',
    'Endemic Birding & Photography Hides',
    'Religious & Cultural Festivals (Timkat / Meskel / Genna)',
    'Wild Arabica Coffee Origins & Terroirs',
    'Urban Camping Ethiopia™ Boutique Glamping',
  ];

  const toggleRegion = (r: string) => {
    setSelectedRegions((prev) =>
      prev.includes(r) ? prev.filter((item) => item !== r) : [...prev, r]
    );
  };

  const toggleInterest = (i: string) => {
    setSelectedInterests((prev) =>
      prev.includes(i) ? prev.filter((item) => item !== i) : [...prev, i]
    );
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setCompleted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D95F49', '#DDAA42', '#078930', '#FCDD09'],
      });
    } catch (err) {}
  };

  const whatsappSummary = waLink(
    `Hello Dinq! I completed the Trip Planner for ${fullName || 'a trip'}. Regions: ${selectedRegions.join(', ')}. Passions: ${selectedInterests.join(', ')}. Duration: ${travelDuration}. Style: ${travelStyle}. Target: ${travelMonth}. Travelers: ${travelers}.`
  );

  return (
    <div className="w-full bg-[#F5E9DA] text-[#302019] min-h-screen">
      {/* Hero */}
      <PageHero
        image="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_2400/v1793175061/j3r2rmi9flsvjmoz0jdz.jpg"
        imageAlt="The Simien Mountains in Ethiopia"
        eyebrow="Bespoke Curation"
        Icon={Compass}
        title="Custom Trip"
        titleItalic="Planner"
        subtitle="Let us tailor an unforgettable itinerary around your passions, dates, physical pace, and preferred level of comfort."
        crumbs={[{ label: 'Plan Your Trip' }]}
        tall={false}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Step Progress Tracker */}
        <div className="mb-10 flex items-center justify-between border-b border-[#E7D0B8] pb-5">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center font-serif text-xs font-bold transition-colors ${
                  step === num
                    ? 'bg-[#D95F49] text-white'
                    : step > num
                    ? 'bg-[#302019] text-[#F5E9DA]'
                    : 'bg-[#FFF9F2] border border-[#E7D0B8] text-[#78685E]'
                }`}
              >
                {step > num ? <Check className="h-3.5 w-3.5" /> : num}
              </div>
              <span
                className={`hidden sm:inline text-xs font-semibold ${
                  step === num ? 'text-[#302019]' : 'text-[#78685E]'
                }`}
              >
                {num === 1 && 'Regions'}
                {num === 2 && 'Passions'}
                {num === 3 && 'Style & Timing'}
                {num === 4 && 'Your Details'}
              </span>
            </div>
          ))}
        </div>

        {/* Wizard Card */}
        <div className="rounded-lg bg-[#FFF9F2] border border-[#E7D0B8] p-6 sm:p-10 shadow-xs">
          {completed ? (
            <div className="text-center py-6">
              <div className="h-14 w-14 rounded-full bg-[#078930]/15 flex items-center justify-center text-[#078930] mx-auto mb-3.5">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#302019]">
                Your Custom Journey Proposal is Being Prepared
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#78685E] max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Our senior expedition planners have received your tailored preferences. We are assembling a detailed day-by-day itinerary proposal and quote for your review.
              </p>

              {/* Summary Card */}
              <div className="mt-6 rounded-md bg-[#F5E9DA]/50 border border-[#E7D0B8] p-5 text-left text-xs text-[#78685E] space-y-1.5">
                <p>
                  <strong className="text-[#302019]">Target Regions:</strong> {selectedRegions.join(', ')}
                </p>
                <p>
                  <strong className="text-[#302019]">Primary Interests:</strong> {selectedInterests.join(', ')}
                </p>
                <p>
                  <strong className="text-[#302019]">Duration & Style:</strong> {travelDuration} · {travelStyle}
                </p>
                <p>
                  <strong className="text-[#302019]">Timing & Party:</strong> {travelMonth} · {travelers}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={whatsappSummary}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-terracotta !py-2 !px-5 text-xs font-semibold"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  <span>Send Summary on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setCompleted(false);
                    setStep(1);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-[#78685E] hover:text-[#302019]"
                >
                  Start Over
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Step 1: Regions */}
              {step === 1 && (
                <div>
                  <span className="eyebrow">Step 01 of 04</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#302019] mt-1 mb-1.5">
                    Which Regions Call to You?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78685E] font-light leading-relaxed mb-5">
                    Select all geographical territories you would love to explore. We will connect them seamlessly.
                  </p>

                  <div className="space-y-2.5">
                    {regionOptions.map((region) => {
                      const isSelected = selectedRegions.includes(region);
                      return (
                        <button
                          key={region}
                          type="button"
                          onClick={() => toggleRegion(region)}
                          className={`w-full text-left p-3.5 rounded-md border transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-[#302019] text-[#F5E9DA] border-[#302019] shadow-xs'
                              : 'bg-[#F5E9DA]/40 text-[#302019] border-[#E7D0B8] hover:border-[#D95F49]'
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-medium">{region}</span>
                          <div
                            className={`h-4.5 w-4.5 rounded border flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#D95F49] border-[#D95F49] text-white'
                                : 'border-[#78685E]/40'
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      disabled={selectedRegions.length === 0}
                      onClick={() => setStep(2)}
                      className="btn-terracotta !py-2 !px-5 text-xs font-semibold"
                    >
                      <span>Continue to Passions</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Passions */}
              {step === 2 && (
                <div>
                  <span className="eyebrow">Step 02 of 04</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#302019] mt-1 mb-1.5">
                    What Kind of Experience Inspires You?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78685E] font-light leading-relaxed mb-5">
                    Select the themes, activities, and photographic priorities that matter most to your party.
                  </p>

                  <div className="space-y-2.5">
                    {interestOptions.map((interest) => {
                      const isSelected = selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`w-full text-left p-3.5 rounded-md border transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-[#302019] text-[#F5E9DA] border-[#302019] shadow-xs'
                              : 'bg-[#F5E9DA]/40 text-[#302019] border-[#E7D0B8] hover:border-[#D95F49]'
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-medium">{interest}</span>
                          <div
                            className={`h-4.5 w-4.5 rounded border flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#D95F49] border-[#D95F49] text-white'
                                : 'border-[#78685E]/40'
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#78685E] hover:text-[#302019]"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back to Regions</span>
                    </button>
                    <button
                      type="button"
                      disabled={selectedInterests.length === 0}
                      onClick={() => setStep(3)}
                      className="btn-terracotta !py-2 !px-5 text-xs font-semibold"
                    >
                      <span>Continue to Style</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Style & Timing */}
              {step === 3 && (
                <div>
                  <span className="eyebrow">Step 03 of 04</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#302019] mt-1 mb-1.5">
                    Expedition Style & Preferred Duration
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78685E] font-light leading-relaxed mb-5">
                    Specify the rhythm and scale that fits your vision.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#302019] mb-1.5">
                        Preferred Expedition Duration
                      </label>
                      <select
                        value={travelDuration}
                        onChange={(e) => setTravelDuration(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 text-xs sm:text-sm text-[#302019] focus:border-[#D95F49] focus:outline-none"
                      >
                        <option>Short Highland Escape (3–5 Days)</option>
                        <option>Classic Circuit (8–11 Days)</option>
                        <option>Comprehensive Expedition (12–15 Days)</option>
                        <option>Grand National Odyssey (16–21 Days)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#302019] mb-1.5">
                        Travel Style & Group Setup
                      </label>
                      <select
                        value={travelStyle}
                        onChange={(e) => setTravelStyle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 text-xs sm:text-sm text-[#302019] focus:border-[#D95F49] focus:outline-none"
                      >
                        <option>Private Bespoke 4x4 Expedition (Just Your Party)</option>
                        <option>Curated Small Group (Capped at 8 Travelers)</option>
                        <option>Wilderness Bivouac & Trekking Focused</option>
                        <option>Luxury Lodge & Eco-Resort Focused</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#302019] mb-1.5">
                          Target Travel Window
                        </label>
                        <select
                          value={travelMonth}
                          onChange={(e) => setTravelMonth(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 text-xs sm:text-sm text-[#302019] focus:border-[#D95F49] focus:outline-none"
                        >
                          <option>October – March (Dry High Season)</option>
                          <option>January (Timkat Epiphany & Genna)</option>
                          <option>April – May (Easter / Spring)</option>
                          <option>September (Meskel & Irreecha Flower Season)</option>
                          <option>Flexible / Undecided</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#302019] mb-1.5">
                          Number of Travelers
                        </label>
                        <select
                          value={travelers}
                          onChange={(e) => setTravelers(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 text-xs sm:text-sm text-[#302019] focus:border-[#D95F49] focus:outline-none"
                        >
                          <option>Solo Traveler</option>
                          <option>2 Travelers (Couple / Friends)</option>
                          <option>3–4 Travelers (Small Family / Friends)</option>
                          <option>5–8 Travelers (Private Group)</option>
                          <option>9+ Travelers (Institutional / Club)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#78685E] hover:text-[#302019]"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back to Passions</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="btn-terracotta !py-2 !px-5 text-xs font-semibold"
                    >
                      <span>Final Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Contact & Finish */}
              {step === 4 && (
                <form onSubmit={handleFinish}>
                  <span className="eyebrow">Step 04 of 04</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#302019] mt-1 mb-1.5">
                    Where Should We Send Your Proposal?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78685E] font-light leading-relaxed mb-5">
                    Our team provides a detailed custom itinerary and transparent quote directly to your inbox.
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#302019] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Maya Chen"
                          className="w-full px-3.5 py-2.5 rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 text-xs sm:text-sm text-[#302019] focus:border-[#D95F49] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#302019] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. maya@example.com"
                          className="w-full px-3.5 py-2.5 rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 text-xs sm:text-sm text-[#302019] focus:border-[#D95F49] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#302019] mb-1">
                        WhatsApp / Mobile Phone (Optional for instant draft)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 234-5678"
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 text-xs sm:text-sm text-[#302019] focus:border-[#D95F49] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#302019] mb-1">
                        Any Specific Requirements or Inquiries?
                      </label>
                      <textarea
                        rows={3}
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        placeholder="e.g. Dietary preferences, interest in visiting specific remote villages, photography gear assistance..."
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 text-xs sm:text-sm text-[#302019] focus:border-[#D95F49] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#78685E] hover:text-[#302019]"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back to Style</span>
                    </button>
                    <button
                      type="submit"
                      className="btn-terracotta !py-2.5 !px-6 text-xs font-semibold"
                    >
                      <span>Submit My Custom Expedition Plan</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
