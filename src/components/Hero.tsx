import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { syndicateImages } from '../data/syndicateData';

interface HeroProps {
  onOpenEnquiry: (horseName?: string) => void;
  onViewHorse?: (horseId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden bg-[#121614] text-white">
      {/* Background Image with Cinematic Scrim */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          src={syndicateImages.hero}
          alt="Elite thoroughbred racehorse galloping on morning training track at dawn"
          className="w-full h-full object-cover object-[65%_center] md:object-center"
          referrerPolicy="no-referrer"
        />
        {/* Multi-stage dark gradient scrim for WCAG AA text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121614]/90 via-[#121614]/65 to-[#121614]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121614] via-transparent to-[#121614]/40" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end min-h-[72vh]">
          {/* Left Column: Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col justify-end space-y-8"
          >
            {/* Subtle Equine Cadence Wave Graphic */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#ECE7D1]/90"
            >
              <svg
                width="64"
                height="14"
                viewBox="0 0 64 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-80"
              >
                <path
                  d="M1 7H8L13 1L18 13L24 4L28 9L33 6L38 12L44 2L49 10L54 7H63"
                  stroke="#ECE7D1"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Thoroughbred Co-Ownership</span>
            </motion.div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-3xl [text-wrap:balance]">
              Elite thoroughbred racing. 
              <span className="text-[#ECE7D1]"> Shared ownership.</span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-lg text-[#E3DFD5] max-w-xl font-normal leading-relaxed">
              Step into the inner circle of horse racing. We acquire, manage,
              and campaign premium racehorses, providing members with transparent
              fractional ownership and unparalleled trackside experiences.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenEnquiry()}
                className="px-8 py-3.5 text-sm font-semibold tracking-wider uppercase text-[#161B18] bg-[#ECE7D1] hover:bg-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center gap-2 cursor-pointer"
              >
                <span>Enquire to Join</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#about"
                onClick={handleScrollToAbout}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white/90 hover:text-white rounded-full border border-white/20 hover:border-white/40 transition-colors duration-200 cursor-pointer"
              >
                <span>Discover the Syndicate</span>
                <ArrowDown className="w-4 h-4" />
              </motion.a>
            </div>

            {/* Quiet Footer Kicker */}
            <div className="pt-2 text-xs uppercase tracking-widest text-white/60">
              Paddock · Training · Race Day
            </div>
          </motion.div>

          {/* Right Column: Share Allocations, Bloodstock Selection & Owners Privileges */}
          <div className="lg:col-span-4 flex justify-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm grid grid-cols-2 gap-x-8 gap-y-5"
            >
              <div className="space-y-1 group">
                <span className="block text-xl font-bold tracking-tight text-white tabular-nums group-hover:text-[#ECE7D1] transition-colors">
                  2.5% – 10%
                </span>
                <span className="text-xs uppercase tracking-wider text-[#D5D3CA] mt-0.5 block">
                  Share Allocations
                </span>
              </div>

              <div className="space-y-1 group">
                <span className="block text-xl font-bold tracking-tight text-white group-hover:text-[#ECE7D1] transition-colors">
                  Curated
                </span>
                <span className="text-xs uppercase tracking-wider text-[#D5D3CA] mt-0.5 block">
                  Bloodstock Selection
                </span>
              </div>

              <div className="space-y-1 group">
                <span className="block text-xl font-bold tracking-tight text-white group-hover:text-[#ECE7D1] transition-colors">
                  Full Access
                </span>
                <span className="text-xs uppercase tracking-wider text-[#D5D3CA] mt-0.5 block">
                  Owners Privileges
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
