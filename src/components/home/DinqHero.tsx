import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, MapPin, CalendarDays, Compass, Users, Search, Minus, Plus } from 'lucide-react';
import { ImageWithFallback } from '../premium/ImageWithFallback';

export interface HeroSlide {
  image: string;
  title: string;      // first line, e.g. "Discover Ancient"
  titleItalic: string; // second line, e.g. "Ethiopia"
  subtitle: string;
  location: string;
}

const DESTINATIONS = ['Lalibela', 'Simien Mountains', 'Danakil', 'Lower Omo', 'Bale Mountains'];
const EXPERIENCES = ['Culture', 'Trekking', 'Safari', 'Birding', 'Festivals'];
const WINDOWS = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

const LIVE = [
  'Marta from Lyon reserved the Simien ridge trek',
  'A group of four from Seoul is viewing Danakil',
  'Daniel in Toronto booked Timkat in Lalibela',
];

const INITIALS = [
  ['MB', '#B98A4E'],
  ['JK', '#E4684F'],
  ['DS', '#7C8F6B'],
  ['+', '#3A2C24'],
] as const;

type Field = 'dest' | 'when' | 'type' | 'guests';

export const DinqHero: React.FC<{ slides: HeroSlide[]; onBook?: () => void }> = ({ slides, onBook }) => {
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const [live, setLive] = useState(0);
  const [open, setOpen] = useState<Field | null>(null);
  const [q, setQ] = useState({ dest: '', when: '', type: '', guests: 2 });

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    const t = setInterval(() => setLive((p) => (p + 1) % LIVE.length), 4500);
    return () => clearInterval(t);
  }, []);

  const slide = slides[i];
  const next = slides[(i + 1) % slides.length];

  const search = () => {
    const p = new URLSearchParams();
    if (q.dest) p.set('destination', q.dest);
    if (q.when) p.set('month', q.when);
    if (q.type) p.set('type', q.type.toLowerCase());
    p.set('guests', String(q.guests));
    navigate(`/tours?${p.toString()}`);
  };

  const fields: { id: Field; label: string; value: string; icon: React.ElementType }[] = [
    { id: 'dest', label: 'Where', value: q.dest || 'Any destination', icon: MapPin },
    { id: 'when', label: 'When', value: q.when || 'Flexible', icon: CalendarDays },
    { id: 'type', label: 'Experience', value: q.type || 'All experiences', icon: Compass },
    { id: 'guests', label: 'Travelers', value: `${q.guests} ${q.guests === 1 ? 'guest' : 'guests'}`, icon: Users },
  ];

  const options: Record<Exclude<Field, 'guests'>, { list: string[]; key: 'dest' | 'when' | 'type' }> = {
    dest: { list: DESTINATIONS, key: 'dest' },
    when: { list: WINDOWS, key: 'when' },
    type: { list: EXPERIENCES, key: 'type' },
  };

  return (
    <section className="dinq-hero relative isolate overflow-hidden bg-[#14100D] text-[#F6EDE0]">
      {/* Atmosphere: one warm light source, grain, no flat fills */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -right-40 top-0 h-[720px] w-[720px] rounded-full bg-[#B98A4E]/20 blur-[140px]" />
        <div className="absolute -left-32 bottom-0 h-[520px] w-[520px] rounded-full bg-[#E4684F]/10 blur-[130px]" />
      </div>
      <div className="grain absolute inset-0 -z-10 opacity-60" aria-hidden />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-10 pt-32 sm:px-6 lg:min-h-[92vh] lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-36">
        {/* LEFT: editorial copy */}
        <div className="flex flex-col justify-center lg:col-span-7 lg:pr-10">
          <p key={`loc-${i}`} className="dinq-rise flex items-center gap-3 text-sm text-[#E9D3A6]">
            <span className="h-px w-10 bg-[#B98A4E]" />
            {slide.location}
          </p>

          <h1
            key={`h-${i}`}
            className="dinq-rise mt-6 font-serif text-[clamp(2.75rem,7.2vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-balance"
            style={{ animationDelay: '80ms' }}
          >
            <span className="block">{slide.title}</span>
            {/* Second line is indented and set at the same weight: asymmetry does the work, not a colored word */}
            <span className="block sm:pl-[1.1em]">{slide.titleItalic}</span>
          </h1>

          <p
            key={`s-${i}`}
            className="dinq-rise mt-8 max-w-md text-lg leading-relaxed text-[#E7D0B8]/85 sm:ml-[1.1em] lg:ml-[2.2em]"
            style={{ animationDelay: '160ms' }}
          >
            {slide.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 sm:ml-[1.1em] lg:ml-[2.2em]">
            <Link
              to="/tours"
              className="group inline-flex items-center gap-3 rounded-full bg-[#E9D3A6] py-3 pl-6 pr-3 text-sm font-semibold text-[#14100D] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E9D3A6]"
            >
              See the journeys
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#14100D] text-[#E9D3A6] transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
            <button
              onClick={() => onBook?.()}
              className="rounded-full px-5 py-3 text-sm font-medium text-[#F6EDE0] underline decoration-[#B98A4E] decoration-1 underline-offset-8 transition-colors hover:text-[#E9D3A6]"
            >
              Plan a private expedition
            </button>
          </div>

          {/* Social proof sits in the negative space under the copy */}
          <div className="mt-14 flex flex-wrap items-center gap-5 sm:ml-[1.1em] lg:ml-[2.2em]">
            <div className="flex -space-x-2.5" aria-hidden>
              {INITIALS.map(([t, c]) => (
                <span
                  key={t}
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#14100D] text-[11px] font-semibold text-[#14100D]"
                  style={{ background: c, color: t === '+' ? '#E9D3A6' : undefined }}
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="max-w-[16rem] text-sm leading-snug text-[#E7D0B8]/70">
              <span className="relative mr-2 inline-flex h-2 w-2 align-middle">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E4684F] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E4684F]" />
              </span>
              <span key={live} className="dinq-fade">{LIVE[live]}</span>
            </p>
          </div>
        </div>

        {/* RIGHT: arched window, overlapping secondary frame, glass note */}
        <div className="relative mx-auto h-[520px] w-full max-w-md lg:col-span-5 lg:h-auto lg:max-w-none">
          <div className="dinq-reveal absolute inset-0 overflow-hidden rounded-t-[999px] rounded-b-[28px] border border-[#E9D3A6]/20 lg:left-8">
            {slides.map((s, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${idx === i ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden={idx !== i}
              >
                <ImageWithFallback
                  src={s.image}
                  alt={s.location}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  className={`h-full w-full object-cover ${idx === i ? 'dinq-drift' : ''}`}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#14100D] via-transparent to-[#14100D]/30" />
          </div>

          {/* Next-up frame, overlaps the arch */}
          <button
            onClick={() => setI((i + 1) % slides.length)}
            aria-label={`Next: ${next.location}`}
            className="group absolute -bottom-6 -left-2 z-10 h-44 w-36 overflow-hidden rounded-2xl border-4 border-[#14100D] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:-translate-y-1 hover:-rotate-2 sm:-left-8 lg:-left-6"
          >
            <ImageWithFallback src={next.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left text-xs font-medium text-[#F6EDE0]">
              Next: {next.titleItalic}
            </span>
          </button>

          {/* Glass note with progress */}
          <div className="absolute right-0 top-24 z-10 w-52 rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-xl lg:-right-2">
            <p className="font-serif text-lg leading-tight text-[#F6EDE0]">{slide.location.split('•')[0].trim()}</p>
            <div className="mt-3 flex gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Show slide ${idx + 1}`}
                  className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/20"
                >
                  {idx === i && <span key={i} className="dinq-progress absolute inset-y-0 left-0 bg-[#E9D3A6]" />}
                  {idx < i && <span className="absolute inset-0 bg-[#E9D3A6]/60" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DISCOVERY ISLAND */}
      <div className="relative z-20 mx-auto max-w-5xl px-4 pb-14 sm:px-6">
        <div className="rounded-[28px] border border-white/15 bg-[#231A15]/60 p-2 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          {/* Options panel (opens above the field row) */}
          <div className={`grid transition-all duration-500 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="flex flex-wrap items-center gap-2 px-4 pb-4 pt-3" role="listbox">
                {open === 'guests' ? (
                  <div className="flex items-center gap-4 text-sm">
                    <button aria-label="Fewer guests" onClick={() => setQ({ ...q, guests: Math.max(1, q.guests - 1) })} className="grid h-9 w-9 place-items-center rounded-full border border-white/20 hover:bg-white/10"><Minus className="h-4 w-4" /></button>
                    <span className="w-6 text-center font-serif text-xl">{q.guests}</span>
                    <button aria-label="More guests" onClick={() => setQ({ ...q, guests: Math.min(16, q.guests + 1) })} className="grid h-9 w-9 place-items-center rounded-full border border-white/20 hover:bg-white/10"><Plus className="h-4 w-4" /></button>
                    <span className="text-[#E7D0B8]/60">Groups of 7 or more get a private guide.</span>
                  </div>
                ) : (
                  open &&
                  options[open].list.map((o) => {
                    const k = options[open].key;
                    const on = q[k] === o;
                    return (
                      <button
                        key={o}
                        role="option"
                        aria-selected={on}
                        onClick={() => { setQ({ ...q, [k]: on ? '' : o }); setOpen(null); }}
                        className={`rounded-full border px-4 py-1.5 text-sm transition-colors duration-300 ${on ? 'border-[#E9D3A6] bg-[#E9D3A6] text-[#14100D]' : 'border-white/15 text-[#E7D0B8] hover:border-[#B98A4E] hover:text-[#F6EDE0]'}`}
                      >
                        {o}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 md:grid-cols-[repeat(4,1fr)_auto]">
            {fields.map((f) => {
              const Icon = f.icon;
              const active = open === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setOpen(active ? null : f.id)}
                  aria-expanded={active}
                  className={`flex items-center gap-3 rounded-[22px] px-5 py-3.5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-[#E9D3A6] ${active ? 'bg-white/10' : 'hover:bg-white/5'}`}
                >
                  <Icon className="h-4 w-4 shrink-0 text-[#B98A4E]" />
                  <span className="min-w-0">
                    <span className="block text-xs text-[#E7D0B8]/60">{f.label}</span>
                    <span className="block truncate text-sm font-medium text-[#F6EDE0]">{f.value}</span>
                  </span>
                </button>
              );
            })}
            <button
              onClick={search}
              className="col-span-2 flex items-center justify-center gap-2 rounded-[22px] bg-[#E4684F] px-8 py-4 text-sm font-semibold text-[#14100D] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F07B62] hover:shadow-[0_14px_40px_-10px_rgba(228,104,79,0.7)] active:translate-y-0 active:scale-[0.98] md:col-span-1"
            >
              <Search className="h-4 w-4" />
              Find journeys
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
