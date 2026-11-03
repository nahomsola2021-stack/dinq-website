import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Send,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import confetti from 'canvas-confetti';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import {
  DINQ_PHONE_DISPLAY,
  DINQ_EMAIL,
  DINQ_OFFICE_ADDRESS,
  waLink,
} from '../lib/whatsapp';
import { updatePageMeta } from '../lib/seo';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Tours & Expeditions']);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    updatePageMeta(
      'Contact Dinq Tour, Travel & Events — Addis Ababa Headquarters',
      'Reach our expedition planning desk in Addis Ababa. Telephone: +251 913 817 153, email, 24/7 traveler assistance, and tailor-made inquiry form.',
      '/contact'
    );
    window.scrollTo(0, 0);
  }, []);

  const topicsList = [
    'Tours & Expeditions',
    'Safari Collection',
    'Mountains & Trekking',
    'Ethiopia Birding',
    'Festivals of Faith',
    'Bespoke Itinerary',
    'B2B Partnership',
  ];

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter((t) => t !== topic));
      }
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#D95F49', '#DDAA42', '#302019', '#F5E9DA'],
        });
      } catch (err) {
        // Fallback gracefully
      }
    }, 600);
  };

  const directWhatsAppLink = waLink(
    `Hello Dinq! My name is ${name || 'a traveler'}. I am interested in: ${selectedTopics.join(', ')}.`
  );

  return (
    <div className="w-full bg-[#FAF4EB] text-[#302019] min-h-screen selection:bg-[#DDAA42] selection:text-[#18110D]">
      
      {/* 1. MINIMALIST CINEMATIC HERO */}
      <section className="relative h-[55vh] min-h-[450px] w-full overflow-hidden bg-[#120D0A]">
        <div className="absolute inset-0 w-full h-full">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=85"
            alt="Travel planners reviewing itinerary details together"
            className="w-full h-full object-cover opacity-50 grayscale-[20%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#FAF4EB] opacity-95 pointer-events-none" />
        
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 text-center md:text-left">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#DDAA42] uppercase mb-4 block">
            Direct Concierge
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium tracking-tighter text-[#302019] leading-[0.9] drop-shadow-sm">
            The Expedition <span className="italic text-[#D95F49]">Desk</span>
          </h1>
        </div>
      </section>

      {/* 2. SPLIT LAYOUT: INFO & BESPOKE FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-32 -mt-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* LEFT COLUMN: Clean Contact Info */}
          <div className="lg:col-span-4 space-y-12">
            
            <div>
              <p className="text-[13px] text-[#78685E] font-light leading-relaxed mb-8">
                Based in Addis Ababa with 24/7 field mission control. Whether you have a precise date window or are beginning to dream, our team is ready to assist.
              </p>
            </div>

            {/* Direct Lines */}
            <div className="space-y-8">
              <div>
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#DDAA42] mb-3">
                  <Phone className="w-3.5 h-3.5" /> Direct Line & WhatsApp
                </span>
                <a href="tel:+251913817153" className="font-serif text-2xl font-medium text-[#302019] hover:text-[#D95F49] transition-colors block">
                  {DINQ_PHONE_DISPLAY}
                </a>
                <span className="text-xs text-[#78685E] font-light mt-1 block">Mon–Sat: 8:30 AM – 6:30 PM (EAT)</span>
              </div>

              <div>
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#DDAA42] mb-3">
                  <Mail className="w-3.5 h-3.5" /> Official Inquiries
                </span>
                <a href={`mailto:${DINQ_EMAIL}`} className="font-serif text-2xl font-medium text-[#302019] hover:text-[#D95F49] transition-colors block">
                  {DINQ_EMAIL}
                </a>
              </div>

              <div>
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#DDAA42] mb-3">
                  <MapPin className="w-3.5 h-3.5" /> Headquarters
                </span>
                <address className="not-italic text-sm text-[#302019] font-light leading-relaxed max-w-[200px]">
                  {DINQ_OFFICE_ADDRESS}
                </address>
              </div>
            </div>

            {/* Emergency Field Support Block (Minimalized) */}
            <div className="p-6 rounded-2xl bg-[#1A130F] text-[#FFF9F2] border border-[#DDAA42]/20">
              <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#D95F49] mb-3">
                <ShieldCheck className="w-3.5 h-3.5" /> 24/7 Field Support
              </span>
              <p className="text-[13px] text-white/70 font-light leading-relaxed mb-4">
                Continuous satellite tracking and radio liaison for all active guests on route.
              </p>
              <a href="tel:+251913817153" className="text-xs font-semibold text-[#DDAA42] uppercase tracking-wider hover:text-white transition-colors">
                Emergency Dispatch Line &rarr;
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Minimalist Stationery Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] p-8 md:p-14 border border-[#E7D0B8]/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#302019] mb-2">
                Design Your Journey
              </h2>
              <p className="text-[13px] text-[#78685E] font-light mb-10">
                Submit your preferences below. A dedicated expedition planner will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="py-16 text-center flex flex-col items-center animate-in fade-in duration-700">
                  <div className="h-16 w-16 rounded-full bg-[#DDAA42]/10 flex items-center justify-center text-[#DDAA42] mb-6">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-3xl font-medium text-[#302019] mb-3">
                    Inquiry Received
                  </h3>
                  <p className="text-[13px] text-[#78685E] max-w-md font-light leading-relaxed mb-8">
                    Thank you, {name || 'traveler'}. Your request regarding <strong className="font-medium text-[#302019]">{selectedTopics.join(', ')}</strong> has been routed to our Addis Ababa desk. We will reach out to {email} shortly.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <a
                      href={directWhatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#302019] text-[#FFF9F2] text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#1A130F] transition-all shadow-md"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => { setSubmitted(false); setName(''); setEmail(''); setMessage(''); }}
                      className="px-6 py-3 rounded-full border border-[#E7D0B8] text-[#78685E] text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#F5E9DA] hover:text-[#302019] transition-all"
                    >
                      New Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  
                  {/* Topic Selection */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6978A] mb-4">
                      Primary Interests
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {topicsList.map((topic) => {
                        const isSelected = selectedTopics.includes(topic);
                        return (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => toggleTopic(topic)}
                            className={`rounded-full px-4 py-2 text-[11px] font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? 'bg-[#302019] text-[#DDAA42] shadow-md border border-[#302019]'
                                : 'bg-transparent text-[#78685E] border border-[#E7D0B8] hover:border-[#DDAA42] hover:text-[#302019]'
                            }`}
                          >
                            {topic}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Minimalist Underline Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder=" "
                        className="peer w-full bg-transparent border-b border-[#E7D0B8] py-2 text-sm text-[#302019] font-medium focus:outline-none focus:border-[#DDAA42] transition-colors"
                      />
                      <label className="absolute left-0 top-2 text-xs text-[#A6978A] tracking-wider uppercase pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#DDAA42] peer-focus:font-bold peer-valid:-top-4 peer-valid:text-[9px] peer-valid:font-bold">
                        Full Name *
                      </label>
                    </div>

                    <div className="relative group">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=" "
                        className="peer w-full bg-transparent border-b border-[#E7D0B8] py-2 text-sm text-[#302019] font-medium focus:outline-none focus:border-[#DDAA42] transition-colors"
                      />
                      <label className="absolute left-0 top-2 text-xs text-[#A6978A] tracking-wider uppercase pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#DDAA42] peer-focus:font-bold peer-valid:-top-4 peer-valid:text-[9px] peer-valid:font-bold">
                        Email Address *
                      </label>
                    </div>

                    <div className="relative group">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder=" "
                        className="peer w-full bg-transparent border-b border-[#E7D0B8] py-2 text-sm text-[#302019] font-medium focus:outline-none focus:border-[#DDAA42] transition-colors"
                      />
                      <label className="absolute left-0 top-2 text-xs text-[#A6978A] tracking-wider uppercase pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#DDAA42] peer-focus:font-bold peer-valid:-top-4 peer-valid:text-[9px] peer-valid:font-bold">
                        Phone / WhatsApp
                      </label>
                    </div>

                    <div className="relative group">
                      <input
                        type="text"
                        value={travelDates}
                        onChange={(e) => setTravelDates(e.target.value)}
                        placeholder=" "
                        className="peer w-full bg-transparent border-b border-[#E7D0B8] py-2 text-sm text-[#302019] font-medium focus:outline-none focus:border-[#DDAA42] transition-colors"
                      />
                      <label className="absolute left-0 top-2 text-xs text-[#A6978A] tracking-wider uppercase pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#DDAA42] peer-focus:font-bold peer-valid:-top-4 peer-valid:text-[9px] peer-valid:font-bold">
                        Target Travel Window
                      </label>
                    </div>
                  </div>

                  <div className="relative group pt-4">
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-[#E7D0B8] py-2 text-sm text-[#302019] font-medium focus:outline-none focus:border-[#DDAA42] transition-colors resize-none"
                    />
                    <label className="absolute left-0 top-6 text-xs text-[#A6978A] tracking-wider uppercase pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-[9px] peer-focus:text-[#DDAA42] peer-focus:font-bold peer-valid:top-0 peer-valid:text-[9px] peer-valid:font-bold">
                      Briefly describe your vision, group size, or special requirements...
                    </label>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#E7D0B8]/40">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#D95F49] hover:bg-[#C04C37] text-white font-bold text-[10px] tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(217,95,73,0.25)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <a
                      href={directWhatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#302019] hover:text-[#D95F49] transition-colors group"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Chat via WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};