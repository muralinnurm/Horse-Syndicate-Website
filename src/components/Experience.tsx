import React, { useState } from 'react';
import { ArrowUpRight, Compass, Eye, Users2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { syndicateImages } from '../data/syndicateData';

interface ExperienceProps {
  onOpenEnquiry: (horseName?: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onOpenEnquiry }) => {
  const [selectedShare, setSelectedShare] = useState<'2.5%' | '5%' | '10%'>('5%');

  const shareDetails = {
    '2.5%': {
      title: '2.5% Syndicate Stake',
      description: 'An accessible entry into premier thoroughbred co-ownership with full direct syndicate rights.',
      entitlements: [
        'Proportional share of net prize money & breeding residuals',
        'Direct trainer audio & video reports via member portal',
        'Owners enclosure & parade ring pass rotation on race days',
        'Official co-owner naming recognition in racebook',
      ],
      idealFor: 'First-time thoroughbred owners seeking authentic racing involvement.',
    },
    '5%': {
      title: '5% Syndicate Stake',
      description: 'Our most popular allocation providing guaranteed owner ticketing and stable visit privileges.',
      entitlements: [
        'Proportional share of net prize money & breeding residuals',
        'Full direct access to private dawn trackwork sessions',
        'Guaranteed owners pavilion ticketing & parade ring badges for major meetings',
        'Voting input on key campaigning and spelling decisions',
      ],
      idealFor: 'Passionate enthusiasts seeking an immersive racecourse experience.',
    },
    '10%': {
      title: '10% Syndicate Stake',
      description: 'A substantial leadership stake with unrestricted race day hospitality and stable access.',
      entitlements: [
        'Proportional share of net prize money & breeding residuals',
        'VIP mounting yard & directors lounge privileges at premier carnivals',
        'Private yearling sales hospitality & bloodstock inspection walks',
        'Direct personal consultation line with syndicate manager & trainers',
      ],
      idealFor: 'Seasoned racing patrons wanting high-touch engagement and access.',
    },
  };

  const experiencePillars = [
    {
      number: '01',
      icon: Users2,
      title: 'Shared Ownership',
      subtitle: 'Accessible Co-Ownership',
      body: 'Participate in genuine thoroughbred ownership without the capital burden or complexity of sole ownership. All legal, administrative, and regulatory aspects are managed under official syndication rules with total transparency.',
    },
    {
      number: '02',
      icon: Compass,
      title: 'The Racing Journey',
      subtitle: 'From Paddock to Post',
      body: 'Experience every phase of the thoroughbred lifecycle. Receive weekly video updates, hear unfiltered trainer insights, inspect your horse during quiet morning track gallops, and feel the anticipation build on race morning.',
    },
    {
      number: '03',
      icon: Eye,
      title: 'Shared Passion',
      subtitle: 'A Dedicated Community',
      body: 'Join fellow syndicate partners who share an enduring appreciation for equine athleticism. Enjoy racecourse camaraderie in the mounting yard, shared celebrations in the winner’s circle, and lasting friendships.',
    },
  ];

  return (
    <section id="experience" className="py-24 md:py-32 bg-[#F2EFE9] text-[#161B18] border-t border-[#E5E1D5] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] uppercase text-[#736E5C] mb-4">
            <span className="w-8 h-[1px] bg-[#736E5C]" />
            <span>The Syndicate Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#161B18] leading-[1.15] [text-wrap:balance]">
            More than an investment. A shared sporting journey.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#525C55] font-normal leading-relaxed">
            We curate an intimate, transparent ownership atmosphere where every
            member has a front-row seat to the preparation, development, and
            competition of exceptional thoroughbreds.
          </p>
        </motion.div>

        {/* 3 Experience Pillars (Staggered Entrance Animation) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {experiencePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-[#FAF9F6] p-8 sm:p-10 rounded-3xl border border-[#E5E1D5] flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-2xl font-bold tracking-tight text-[#8A826B] tabular-nums">
                      {pillar.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#EFECE3] flex items-center justify-center text-[#161B18] group-hover:bg-[#161B18] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[#161B18] mb-1">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-medium uppercase tracking-wider text-[#736E5C] mb-4">
                    {pillar.subtitle}
                  </div>

                  <p className="text-sm text-[#57615A] leading-relaxed">
                    {pillar.body}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#EAE6DB] flex items-center text-xs font-semibold uppercase tracking-wider text-[#161B18]">
                  <span>Member Privilege</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cinematic Wide Trackwork Image Feature with Parallax/Hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden mb-20 shadow-lg group"
        >
          <div className="aspect-[16/9] md:aspect-[21/9] w-full bg-black/20">
            <img
              src={syndicateImages.morningTrackwork}
              alt="Thoroughbred horses galloping in dawn mist on expansive training track"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#161B18]/85 via-[#161B18]/25 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-widest text-[#ECE7D1] font-semibold">
                Private Stable Mornings
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 tracking-tight">
                Watch morning gallops before the world awakens.
              </h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onOpenEnquiry()}
              className="px-6 py-2.5 text-xs font-semibold tracking-wider uppercase bg-[#ECE7D1] text-[#161B18] hover:bg-white rounded-full transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              Request Trackwork Pass
            </motion.button>
          </div>
        </motion.div>

        {/* Interactive Syndicate Share Breakdown / Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FAF9F6] rounded-3xl p-8 md:p-12 border border-[#E5E1D5] shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[#EAE6DB] pb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#736E5C]">
                Ownership Architecture
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#161B18] mt-1">
                Explore Syndicate Share Proportions
              </h3>
            </div>

            {/* Segmented Control Filter */}
            <div className="flex items-center gap-1.5 p-1.5 bg-[#EFECE3] rounded-full self-start md:self-auto">
              {(['2.5%', '5%', '10%'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedShare(size)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                    selectedShare === size
                      ? 'bg-[#161B18] text-white shadow-sm'
                      : 'text-[#57615A] hover:text-[#161B18]'
                  }`}
                >
                  {size} Share
                </button>
              ))}
            </div>
          </div>

          {/* Active Share Detail Display with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedShare}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="text-lg font-bold text-[#161B18]">
                  {shareDetails[selectedShare].title}
                </div>
                <p className="text-sm text-[#57615A] leading-relaxed">
                  {shareDetails[selectedShare].description}
                </p>

                <div className="pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#736E5C] block mb-2">
                    Key Inclusions:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#333D36]">
                    {shareDetails[selectedShare].entitlements.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A826B]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F4F1E9] p-6 rounded-2xl border border-[#E5E1D5] flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-[#736E5C]">
                    Profile Recommendation
                  </span>
                  <p className="text-xs text-[#444D46] mt-1 italic">
                    "{shareDetails[selectedShare].idealFor}"
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E2DDD0] flex items-center justify-between">
                  <span className="text-xs text-[#57615A]">Official Syndicate Registration</span>
                  <motion.button
                    whileHover={{ x: 3 }}
                    onClick={() => onOpenEnquiry(`${selectedShare} Share Allocation`)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#161B18] hover:text-[#736E5C] transition-colors cursor-pointer"
                  >
                    <span>Enquire for {selectedShare}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
