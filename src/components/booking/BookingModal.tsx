import React, { useState, useEffect } from 'react';
import { X, Check, Send, Calendar, Compass } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import confetti from 'canvas-confetti';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../admin/lib/firebase';
import { useBooking } from '../../context/BookingContext';
import { TOURS_DATA } from '../../data/content/tours';
import { waLink } from '../../lib/whatsapp';

export const BookingModal: React.FC = () => {
  const { isOpen, selectedTour, closeBooking } = useBooking();

  // --- LIVE TOURS FOR DROPDOWN ---
  const [liveTours, setLiveTours] = useState<any[]>(TOURS_DATA);

  const [tourName, setTourName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dates, setDates] = useState('');
  const [guestCount, setGuestCount] = useState('2 Guests');
  const [notes, setNotes] = useState('');
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch live dashboard tours so the dropdown is always up to date
  useEffect(() => {
    if (!isOpen) return;

    const fetchDashboardTours = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tours'));
        const dbData = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
        
        let merged = [...TOURS_DATA];
        dbData.forEach(dbTour => {
          const existingIdx = merged.findIndex(t => t.id === dbTour.slug || t.id === dbTour.id);
          if (existingIdx > -1) {
            merged[existingIdx] = { ...merged[existingIdx], ...dbTour };
          } else {
            merged.push(dbTour as any);
          }
        });
        
        // Only show published tours in the booking drop-down
        setLiveTours(merged.filter(t => t.status !== 'Draft'));
      } catch (err) {
        console.error("Error fetching live tours for booking dropdown:", err);
      }
    };
    
    fetchDashboardTours();
  }, [isOpen]);

  // 2. Pre-fill the selected tour
  useEffect(() => {
    if (selectedTour) {
      setTourName(selectedTour);
    } else if (liveTours.length > 0 && !tourName) {
      setTourName(liveTours[0].title);
    }
  }, [selectedTour, isOpen, liveTours, tourName]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeBooking();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeBooking]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSubmitted(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // 3. Save booking directly to Firebase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create the booking record in Firebase
      await addDoc(collection(db, 'bookings'), {
        tourName,
        fullName,
        email,
        phone,
        dates,
        guestCount,
        notes,
        status: 'New',
        createdAt: new Date().toISOString()
      });

      setIsSubmitting(false);
      setSubmitted(true);
      
      // Fire confetti
      setTimeout(() => {
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#D95F49', '#DDAA42', '#078930', '#FCDD09'],
          });
        } catch (err) {}
      }, 300);

    } catch (error) {
      console.error("Failed to submit booking:", error);
      alert("Failed to submit booking. Please try again or use WhatsApp.");
      setIsSubmitting(false);
    }
  };

  const directWhatsAppLink = waLink(
    `Hello Dinq Tour, Travel & Events! I would like to book "${tourName || 'an expedition'}". Name: ${fullName || 'Traveler'}, Party: ${guestCount}, Preferred timing: ${dates || 'Flexible'}.`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="fixed inset-0 bg-[#1F1713]/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeBooking}
      />

      <div className="relative w-full max-w-xl rounded-lg bg-[#FFF9F2] border border-[#E7D0B8] shadow-2xl z-10 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-[#E7D0B8]/60 px-6 py-4 bg-[#F5E9DA]/40">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-[#D95F49]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D95F49]">
              Expedition Booking Desk
            </span>
          </div>

          <button
            onClick={closeBooking}
            className="rounded p-1 text-[#78685E] hover:text-[#302019] hover:bg-[#E7D0B8]/30 transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6">
              <div className="h-14 w-14 rounded-full bg-[#078930]/15 flex items-center justify-center text-[#078930] mx-auto mb-3.5">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#302019]">
                Booking Request Received
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#78685E] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName || 'Traveler'}</strong>! Our dispatch desk in Addis Ababa will verify dates and availability for <strong>"{tourName}"</strong> and reply to <strong>{email}</strong> within 12 hours.
              </p>

              <div className="mt-5 rounded-md bg-[#F5E9DA]/50 border border-[#E7D0B8] p-4 text-left text-xs text-[#78685E] space-y-1">
                <p><strong className="text-[#302019]">Expedition:</strong> {tourName}</p>
                <p><strong className="text-[#302019]">Party Size:</strong> {guestCount}</p>
                {dates && <p><strong className="text-[#302019]">Target Dates:</strong> {dates}</p>}
                {phone && <p><strong className="text-[#302019]">Phone/WhatsApp:</strong> {phone}</p>}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={directWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-terracotta !py-2 !px-5 text-xs font-semibold"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  <span>Confirm on WhatsApp Now</span>
                </a>
                <button
                  onClick={closeBooking}
                  className="px-4 py-2 text-xs font-semibold text-[#78685E] hover:text-[#302019] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h2 id="booking-modal-title" className="font-serif text-2xl sm:text-3xl font-semibold text-[#302019]">
                  Book Your Ethiopian Journey
                </h2>
                <p className="text-xs text-[#78685E] mt-1 font-light leading-relaxed">
                  Reserve your dates or connect with our expedition directors directly for custom adjustments.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#302019] mb-1">
                  Select Tour / Expedition *
                </label>
                <select
                  value={tourName}
                  onChange={(e) => setTourName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 text-xs sm:text-sm text-[#302019] font-medium focus:border-[#D95F49] focus:outline-none"
                >
                  {/* Pulls from the synced live database */}
                  {liveTours.map((t) => (
                    <option key={t.id} value={t.title}>
                      {t.title} ({t.durationLabel || t.duration || '7 Days'})
                    </option>
                  ))}
                  <option value="Tailor-Made Custom Journey">
                    Tailor-Made / Custom Expedition
                  </option>
                  <option value="Addis Ababa Transit Stopover">
                    Addis Ababa Transit Stopover (4h – 24h)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#302019] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3 py-2 rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 text-xs sm:text-sm text-[#302019] focus:border-[#D95F49] focus:outline-none"
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
                    placeholder="e.g. sarah@example.com"
                    className="w-full px-3 py-2 rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 text-xs sm:text-sm text-[#302019] focus:border-[#D95F49] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#302019] mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className="w-full px-3 py-2 rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 text-xs sm:text-sm text-[#302019] focus:border-[#D95F49] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#302019] mb-1">
                    Party Size
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 text-xs sm:text-sm text-[#302019] focus:border-[#D95F49] focus:outline-none"
                  >
                    <option>1 Solo Explorer</option>
                    <option>2 Guests (Couple / Friends)</option>
                    <option>3–4 Guests (Small Group / Family)</option>
                    <option>5–8 Guests (Private Convoy)</option>
                    <option>9+ Guests (Group Departure)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#302019] mb-1">
                  Target Travel Dates / Season
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#78685E]" />
                  <input
                    type="text"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    placeholder="e.g. Late November 2026 or Timkat Festival (Jan)"
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 text-xs sm:text-sm text-[#302019] focus:border-[#D95F49] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#302019] mb-1">
                  Special Notes or Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Dietary preferences, photography requirements, flight connections..."
                  className="w-full px-3 py-2 rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 text-xs sm:text-sm text-[#302019] focus:border-[#D95F49] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-terracotta w-full sm:w-auto !py-2.5 !px-6 text-xs font-semibold cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Request Booking</span>
                    </>
                  )}
                </button>

                <a
                  href={directWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D95F49] hover:text-[#B54531] transition-colors"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>Book via WhatsApp Instantly</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};