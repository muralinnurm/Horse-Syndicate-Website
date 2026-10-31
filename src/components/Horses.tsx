import React from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Horse } from '../types';

interface HorsesProps {
  horses: Horse[];
  onSelectHorse: (horse: Horse) => void;
  onOpenEnquiry: (horseName?: string) => void;
}

export const Horses: React.FC<HorsesProps> = ({
  horses,
  onSelectHorse,
  onOpenEnquiry,
}) => {
  return (
    <section id="horses" className="py-24 md:py-32 bg-[#FAF9F6] text-[#161B18] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] uppercase text-[#736E5C] mb-4">
              <span className="w-8 h-[1px] bg-[#736E5C]" />
              <span>Bloodstock Roster</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#161B18] leading-[1.15] [text-wrap:balance]">
              Featured & Upcoming Horses
            </h2>
            <p className="mt-4 text-base text-[#57615A] font-normal leading-relaxed">
              Carefully scouted for conformation, physical athleticism, and
              commercial bloodlines. Explore our current intake and register
              interest before allocations close.
            </p>
          </div>

          <div className="shrink-0">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider uppercase bg-[#161B18] text-white hover:bg-[#2B352E] rounded-full transition-all duration-200 cursor-pointer shadow-sm"
            >
              <span>Enquire for All Horses</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Editorial Horses Grid (Staggered Scroll Entrance) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {horses.map((horse, idx) => (
            <motion.div
              key={horse.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-[#FFFFFF] rounded-3xl overflow-hidden border border-[#E8E5DC] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Container with Natural Framing and Subtle Zoom */}
              <div
                className="relative aspect-[4/3] overflow-hidden bg-[#ECE8DC] cursor-pointer"
                onClick={() => onSelectHorse(horse)}
              >
                <img
                  src={horse.image}
                  alt={horse.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Status Pill Badge */}
                <div className="absolute top-4 left-4 bg-[#161B18]/80 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wide text-white">
                  {horse.gender} · {horse.age}
                </div>

                <div className="absolute bottom-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  <span>Inspect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Horse Content */}
              <div className="p-7 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-[#736E5C] mb-1">
                    {horse.stage}
                  </div>
                  <h3
                    onClick={() => onSelectHorse(horse)}
                    className="text-2xl font-bold tracking-tight text-[#161B18] group-hover:text-[#444D46] transition-colors cursor-pointer"
                  >
                    {horse.name}
                  </h3>

                  {/* Clean unboxed pedigree */}
                  <div className="mt-3 text-xs text-[#57615A] space-y-1 bg-[#FAF9F6] p-3 rounded-xl border border-[#EFECE3]">
                    <div>
                      <span className="font-semibold text-[#161B18]">Sire:</span>{' '}
                      {horse.pedigree.sire}
                    </div>
                    <div>
                      <span className="font-semibold text-[#161B18]">Dam:</span>{' '}
                      {horse.pedigree.dam} ({horse.pedigree.damsire})
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-[#57615A] leading-relaxed line-clamp-3">
                    {horse.description}
                  </p>
                </div>

                {/* Card Action Row */}
                <div className="pt-4 border-t border-[#EFECE3] flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectHorse(horse)}
                    className="text-xs font-semibold text-[#161B18] hover:text-[#736E5C] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onOpenEnquiry(horse.name)}
                    className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#161B18] bg-[#ECE7D1] hover:bg-[#E2DDC3] rounded-full transition-colors cursor-pointer shadow-xs"
                  >
                    Enquire
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clear Sub-Section CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#161B18] text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#ECE7D1]">
              Private Bloodstock Inquiries
            </span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              Seeking a bespoke syndicate share or private acquisition?
            </h3>
            <p className="text-sm text-[#D5D3CA] max-w-xl">
              We frequently scout bespoke yearling lots and international racing
              prospects. Connect directly with our bloodstock director.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onOpenEnquiry('Bespoke Syndicate Inquiry')}
            className="px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#161B18] bg-[#ECE7D1] hover:bg-white rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 shadow-lg"
          >
            Enquire to Join
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
