import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete?: () => void;
  brandName?: string;
  minDuration?: number; // In milliseconds, default 2000
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  brandName = 'ELYSIAN',
  minDuration = 2200,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const calculated = Math.min(100, Math.round((elapsed / minDuration) * 100));
      setProgress(calculated);

      if (elapsed >= minDuration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121614] text-white select-none overflow-hidden"
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-[#ECE7D1]/5 blur-3xl pointer-events-none" />

          {/* Logo as Progress Indicator (Featuring only the logo) */}
          <div className="relative flex flex-col items-center justify-center space-y-6">
            {/* Geometric Equine Crest SVG that dynamically traces/fills with progress */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Background Ghost Paths (subtle track) */}
                <path
                  d="M5 24L12 8L16 16L20 8L27 24"
                  stroke="#262F29"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 18H22"
                  stroke="#262F29"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle
                  cx="16"
                  cy="6"
                  r="1.8"
                  fill="#262F29"
                />

                {/* Animated Progress Path (Stroke fills proportional to progress) */}
                <motion.path
                  d="M5 24L12 8L16 16L20 8L27 24"
                  stroke="#ECE7D1"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="100"
                  strokeDashoffset={100 - progress}
                  style={{ transition: 'stroke-dashoffset 40ms linear' }}
                />

                {/* Crossbar filling in the second half of progress */}
                <motion.path
                  d="M10 18H22"
                  stroke="#ECE7D1"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeDasharray="20"
                  strokeDashoffset={Math.max(0, 20 - (progress / 100) * 20)}
                  style={{ transition: 'stroke-dashoffset 40ms linear' }}
                />

                {/* Apex Circle glows and scales as progress nears completion */}
                <circle
                  cx="16"
                  cy="6"
                  r={progress > 90 ? '2' : '1.8'}
                  fill={progress > 60 ? '#ECE7D1' : '#262F29'}
                  className="transition-all duration-300"
                />
              </svg>

              {/* Progress Aura Ripple on final step */}
              {progress >= 98 && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border border-[#ECE7D1]/60 pointer-events-none"
                />
              )}
            </div>

            {/* Brand Wordmark with Liquid Progress Fill from Left to Right */}
            <div className="relative overflow-hidden">
              {/* Dim Base Wordmark */}
              <span className="text-xl sm:text-2xl font-bold tracking-[0.3em] uppercase text-[#2F3932] block">
                {brandName}
              </span>

              {/* Lit Wordmark clipped exactly to progress % */}
              <div
                className="absolute inset-0 overflow-hidden transition-all duration-75"
                style={{ width: `${progress}%` }}
              >
                <span className="text-xl sm:text-2xl font-bold tracking-[0.3em] uppercase text-[#ECE7D1] block whitespace-nowrap drop-shadow-[0_0_12px_rgba(236,231,209,0.4)]">
                  {brandName}
                </span>
              </div>
            </div>

            {/* Logo Progress Line Gauge right beneath the logo */}
            <div className="w-24 h-[1.5px] bg-[#262F29] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D5D0B8] to-[#ECE7D1] transition-all duration-75 ease-out rounded-full shadow-[0_0_8px_#ECE7D1]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
