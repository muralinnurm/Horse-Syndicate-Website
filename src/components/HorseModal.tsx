import React from 'react';
import { X, ArrowUpRight, Check, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Horse } from '../types';

interface HorseModalProps {
  horse: Horse | null;
  onClose: () => void;
  onEnquire: (horseName: string) => void;
}

export const HorseModal: React.FC<HorseModalProps> = ({
  horse,
  onClose,
  onEnquire,
}) => {
  return (
    <AnimatePresence>
      {horse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#121614]/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[#FAF9F6] rounded-3xl overflow-hidden shadow-2xl border border-white/20 z-10 my-8 flex flex-col max-h-[90vh]"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto">
              {/* Header Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
                <img
                  src={horse.image}
                  alt={horse.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161B18] via-transparent to-black/30" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#ECE7D1] font-semibold">
                    {horse.stage}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                    {horse.name}
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    {horse.gender} · {horse.age} · {horse.color}
                  </p>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6 sm:p-8 space-y-6 text-[#161B18]">
                {/* Pedigree Card */}
                <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E5DC] shadow-xs">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#736E5C] block mb-3">
                    Bloodstock Pedigree
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-[#736E5C] block">Sire</span>
                      <span className="font-bold text-sm text-[#161B18]">
                        {horse.pedigree.sire}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#736E5C] block">Dam</span>
                      <span className="font-bold text-sm text-[#161B18]">
                        {horse.pedigree.dam}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#736E5C] block">Damsire</span>
                      <span className="font-bold text-sm text-[#161B18]">
                        {horse.pedigree.damsire}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#161B18]">
                    Assessment & Overview
                  </h4>
                  <p className="text-sm text-[#525C55] leading-relaxed">
                    {horse.description}
                  </p>
                </div>

                {/* Highlights */}
                {horse.highlights && horse.highlights.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#736E5C]">
                      Key Conformation & Racing Indicators
                    </h4>
                    <ul className="space-y-2">
                      {horse.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2.5 text-xs text-[#303B33]"
                        >
                          <Check className="w-4 h-4 text-[#8A826B] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Logistics Info Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-[#EAE6DB]">
                  {horse.trainerLocation && (
                    <div className="flex items-center gap-2 text-[#57615A]">
                      <MapPin className="w-4 h-4 text-[#8A826B]" />
                      <span>
                        <strong>Location:</strong> {horse.trainerLocation}
                      </span>
                    </div>
                  )}
                  {horse.estimatedDebut && (
                    <div className="flex items-center gap-2 text-[#57615A]">
                      <Calendar className="w-4 h-4 text-[#8A826B]" />
                      <span>
                        <strong>Target Debut:</strong> {horse.estimatedDebut}
                      </span>
                    </div>
                  )}
                </div>

                {/* Share Availability & Bottom CTA */}
                <div className="bg-[#161B18] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#ECE7D1]">
                      Syndicate Availability
                    </span>
                    <div className="text-sm font-bold mt-0.5">
                      {horse.sharesAvailable}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      onClose();
                      onEnquire(horse.name);
                    }}
                    className="w-full sm:w-auto px-6 py-3 text-xs font-semibold tracking-wider uppercase text-[#161B18] bg-[#ECE7D1] hover:bg-white rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Enquire For This Horse</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
