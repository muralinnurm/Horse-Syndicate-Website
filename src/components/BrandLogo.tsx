import React from 'react';

interface BrandLogoProps {
  name?: string;
  isLight?: boolean;
  className?: string;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  name = 'ELYSIAN',
  isLight = false,
  className = '',
  showSubtitle = false,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Sleek geometric equine crest icon inspired by stride cadence */}
      <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transition-transform duration-300 hover:scale-105"
        >
          {/* Subtle geometric lines evoking thoroughbred stride & apex */}
          <path
            d="M5 24L12 8L16 16L20 8L27 24"
            stroke={isLight ? '#F2EFE9' : '#161B18'}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 18H22"
            stroke={isLight ? '#ECE7D1' : '#8A826B'}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle
            cx="16"
            cy="6"
            r="1.8"
            fill={isLight ? '#ECE7D1' : '#161B18'}
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`text-lg font-bold tracking-[0.22em] uppercase leading-none ${
            isLight ? 'text-[#FAF9F6]' : 'text-[#161B18]'
          }`}
        >
          {name}
        </span>
        {showSubtitle && (
          <span
            className={`text-[9px] font-medium tracking-[0.25em] uppercase mt-1 ${
              isLight ? 'text-[#C9C8C0]' : 'text-[#68706A]'
            }`}
          >
            Thoroughbred Syndicate
          </span>
        )}
      </div>
    </div>
  );
};
