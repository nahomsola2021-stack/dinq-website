import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Compass, ShoppingBag, ArrowRight, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { PageHero } from '../components/premium/PageHero';
import { RouteFlow } from '../components/premium/RouteFlow';
import { PromiseBand } from '../components/premium/PromiseBand';
import { CTABand } from '../components/premium/CTABand';
import { PROGRAMME_PAGES } from '../data/content/journeys';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';

export const ProgrammePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const programme = slug ? PROGRAMME_PAGES[slug] : null;

  useEffect(() => {
    if (programme) {
      updatePageMeta(
        `${programme.title} — Dinq Tour, Travel & Events`,
        programme.subtitle,
        `/journeys/${slug}`
      );
    } else {
      updatePageMeta(
        'Journey Not Found — Dinq Tour, Travel & Events',
        'The requested journey programme could not be found.',
        `/journeys/${slug}`
      );
    }
  }, [programme, slug]);

  if (!programme) {
    return (
      <div className="w-full min-h-[70vh] bg-[#F5E9DA] text-[#302019] flex flex-col items-center justify-center p-6 text-center">
        <Compass className="h-14 w-14 text-[#D95F49] mb-4 animate-spin-slow" />
        <h1 className="font-serif text-3xl font-semibold">Journey Not Found</h1>
        <p className="mt-2.5 text-xs sm:text-sm text-[#78685E] max-w-md">
          The curated programme you are looking for does not exist or has been moved to another section.
        </p>
        <Link to="/experiences" className="btn-terracotta mt-5 !py-2 !px-5 text-xs">
          <span>Return to All Experiences</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F5E9DA] text-[#302019] min-h-screen">
      {/* Tall Hero */}
      <PageHero
        image={programme.heroImage}
        imageAlt={programme.title}
        eyebrow={programme.eyebrow}
        Icon={Compass}
        title={programme.title.split(' ')[0]}
        titleItalic={programme.title.split(' ').slice(1).join(' ')}
        subtitle={programme.subtitle}
        crumbs={[{ label: 'Experiences', href: '/experiences' }, { label: programme.title }]}
        tall={true}
      >
        {programme.hasShopButton && (
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/shop" className="btn-terracotta">
              <ShoppingBag className="h-4 w-4" />
              <span>Shop Urban Camping Gear</span>
            </Link>
            <a
              href={waLink('Hello Dinq! I would like to book a private Urban Camping Ethiopia glamping night.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-terracotta"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>Inquire on Glamping Nights</span>
            </a>
          </div>
        )}
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Editorial Summary & Ethos */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D95F49]">{programme.kicker}</span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#302019] leading-tight">
            Curated Programme Architecture
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#78685E] font-light leading-relaxed">
            {programme.summary}
          </p>
        </div>

        {/* Route Flow (if present) */}
        {programme.routeFlow && (
          <div className="my-10 rounded-lg bg-[#FFF9F2] border border-[#E7D0B8] p-6 sm:p-8 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D95F49] block mb-2.5">
              Daily Itinerary Sequence
            </span>
            <RouteFlow stops={programme.routeFlow} dark={false} size="md" />
          </div>
        )}

        {/* Numbered CheckList Programme Grid */}
        <div className="my-14">
          <div className="mb-8">
            <span className="eyebrow">Key Inclusions</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#302019] mt-1">
              What This Programme Delivers
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {programme.programmeList.map((item) => (
              <div
                key={item.numeral}
                className="rounded-lg bg-[#FFF9F2] border border-[#E7D0B8] p-5 sm:p-6 shadow-xs flex items-start gap-4 hover:border-[#D95F49]/40 transition-colors"
              >
                <span className="numeral numeral-light text-3xl shrink-0 font-serif">
                  {item.numeral}
                </span>
                <div>
                  <h4 className="font-serif text-xl font-semibold text-[#302019]">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#78685E] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Verbatim Programme Experience Points */}
        {programme.programPoints && (
          <div className="my-14 rounded-lg bg-[#FFF9F2] border border-[#E7D0B8] p-6 sm:p-10 shadow-xs">
            <div className="mb-6">
              <span className="eyebrow">Complete Experience Breakdown</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#302019] mt-1">
                Full Program Experience Points
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#78685E] font-light">
                Every key touchpoint, activity, and cultural encounter included in this signature journey.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {programme.programPoints.map((pt, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded bg-[#F5E9DA]/50 border border-[#E7D0B8]"
                >
                  <span className="font-serif text-xs font-bold text-[#D95F49]">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.
                  </span>
                  <span className="text-xs sm:text-sm text-[#302019] font-medium leading-snug">
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Promise Band */}
        <PromiseBand
          image={programme.heroImage}
          line1={programme.tagline.split('·')[0]?.trim() || 'Discover the Places.'}
          line2ItalicGold={programme.tagline.split('·')[1]?.trim() || 'Meet the People.'}
          line3={programme.tagline.split('·')[2]?.trim() || 'Live the Story.'}
          spacedWords={['ETHICS', 'INTEGRITY', 'MEMORIES', 'HONOR']}
          brandLine={`DINQ ETHIOPIA — ${programme.title.toUpperCase()}`}
        />

        {/* Related Journeys */}
        {programme.relatedJourneys && (
          <div className="my-14">
            <div className="mb-6">
              <span className="eyebrow">Complementary Routes</span>
              <h3 className="font-serif text-2xl font-semibold text-[#302019] mt-1">
                Extend This Experience
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {programme.relatedJourneys.map((related, idx) => (
                <Link
                  key={idx}
                  to={related.route}
                  className="rounded-lg bg-[#FFF9F2] border border-[#E7D0B8] p-5 shadow-xs flex flex-col justify-between hover:border-[#D95F49]/40 transition-colors group"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D95F49]">
                      {related.duration}
                    </span>
                    <h4 className="font-serif text-lg font-semibold text-[#302019] mt-1.5 group-hover:text-[#D95F49] transition-colors">
                      {related.title}
                    </h4>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#D95F49]">
                    <span>View Journey</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTABand */}
        <CTABand />
      </div>
    </div>
  );
};
