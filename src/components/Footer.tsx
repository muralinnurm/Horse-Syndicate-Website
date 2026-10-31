import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { SyndicateConfig } from '../types';

interface FooterProps {
  config: SyndicateConfig;
  onOpenEnquiry: (horseName?: string) => void;
  onOpenConfig?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenEnquiry,
  onOpenConfig,
}) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-[#0E1110] text-[#D5D3CA] pt-20 pb-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand Wordmark & Intro */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo name={config.brandName} isLight={true} showSubtitle={true} />
            <p className="text-xs text-[#98A09A] leading-relaxed max-w-sm pt-2">
              A contemporary thoroughbred racing syndicate dedicated to
              transparent co-ownership, rigorous bloodstock selection, and an
              intimate racecourse experience for our members.
            </p>
            <div className="text-xs text-[#ECE7D1]/80 space-y-1 pt-1">
              <div>{config.location}</div>
              <div>{config.contactPhone}</div>
              <div>{config.contactEmail}</div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ECE7D1]">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleScroll(e, '#about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About the Syndicate
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  onClick={(e) => handleScroll(e, '#experience')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Syndicate Experience
                </a>
              </li>
              <li>
                <a
                  href="#horses"
                  onClick={(e) => handleScroll(e, '#horses')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Upcoming Horses & Roster
                </a>
              </li>
              <li>
                <a
                  href="#enquire"
                  onClick={(e) => handleScroll(e, '#enquire')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ownership Enquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Compliance */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ECE7D1]">
              Syndication Notice
            </span>
            <p className="text-[11px] text-[#7A837C] leading-relaxed">
              Thoroughbred racing syndicates are subject to official racing
              authority regulations and product disclosure statements. Co-ownership
              is a sporting passion. No promises, representations, or guarantees
              of racing success or capital returns are made. Members must be 18+.
            </p>

            <div className="pt-2">
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ECE7D1] hover:text-white transition-colors cursor-pointer"
              >
                <span>Enquire to Join Syndicate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Subtle Settings Hook */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A837C]">
          <div>
            &copy; {new Date().getFullYear()} {config.brandName} Thoroughbred
            Syndicate. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#enquire"
              onClick={(e) => handleScroll(e, '#enquire')}
              className="hover:text-[#ECE7D1] transition-colors cursor-pointer"
            >
              Privacy & Disclosures
            </a>
            <a
              href="#about"
              onClick={(e) => handleScroll(e, '#about')}
              className="hover:text-[#ECE7D1] transition-colors cursor-pointer"
            >
              Terms of Syndicate
            </a>
            {onOpenConfig && (
              <button
                onClick={onOpenConfig}
                className="text-[11px] text-[#555E57] hover:text-[#ECE7D1] underline cursor-pointer transition-colors"
              >
                Syndicate Settings
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
