import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { syndicateImages } from '../data/syndicateData';

interface AboutProps {
  onOpenEnquiry: (horseName?: string) => void;
}

export const About: React.FC<AboutProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#FAF9F6] text-[#161B18] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header / Kicker */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] uppercase text-[#736E5C] mb-4"
        >
          <span className="w-8 h-[1px] bg-[#736E5C]" />
          <span>About the Syndicate</span>
        </motion.div>

        {/* 2-Column Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Narrative & Values */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#161B18] leading-[1.15] [text-wrap:balance]">
                Democratising access to world-class bloodstock.
              </h2>

              <p className="text-base sm:text-lg text-[#444D46] leading-relaxed font-normal">
                Historically, racehorse ownership was reserved for solitary
                patrons and private dynasties. We formed Elysian to open this
                exhilarating realm to passionate owners through a transparent,
                professionally steered syndicate structure.
              </p>

              <p className="text-sm sm:text-base text-[#57615A] leading-relaxed">
                By uniting like-minded individuals, we acquire exceptionally bred
                colts and fillies, partner with top-tier trainers and breaking
                specialists, and manage every administrative and equine detail.
                You enjoy authentic co-ownership—from intimate morning trackwork
                briefings to the vibrant atmosphere of the mounting yard.
              </p>
            </div>

            {/* Core Commitments List (clean unboxed rows) */}
            <div className="border-t border-[#E5E2D8] pt-8 space-y-4">
              {[
                {
                  title: 'Equine Welfare Foremost',
                  desc: 'Every training schedule, spell period, and career progression prioritises the long-term well-being and health of each horse.',
                },
                {
                  title: 'Clear, Fixed Fee Transparency',
                  desc: 'No hidden charges. Comprehensive quarterly statements with itemised training, veterinary, and nomination accounts.',
                },
                {
                  title: 'Direct Owner Communications',
                  desc: 'Regular audio notes from the trainer, HD gallop footage, and dedicated race day coordination for all syndicate partners.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                  className="flex items-start gap-4 p-2 rounded-xl hover:bg-[#F3F0E6]/60 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#303B33] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold tracking-tight text-[#161B18]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5C665F] mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Link */}
            <div className="pt-2">
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#161B18] border-b-2 border-[#161B18] pb-1 hover:text-[#736E5C] hover:border-[#736E5C] transition-colors cursor-pointer"
              >
                <span>Enquire About Upcoming Shares</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Large Supporting Horse Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="relative h-full min-h-[440px] rounded-3xl overflow-hidden bg-[#ECE8DC] shadow-lg group">
              <img
                src={syndicateImages.aboutPortrait}
                alt="Studio portrait of a magnificent thoroughbred horse in stable courtyard"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161B18]/70 via-transparent to-transparent opacity-80" />

              {/* Photo Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white">
                <span className="font-medium tracking-wide">
                  Morning Stables · Lexington
                </span>
                <span className="text-white/70">Equine Bloodstock Division</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
