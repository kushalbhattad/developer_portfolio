import React from 'react';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  className?: string;
  variant?: 'full' | 'icon-only' | 'horizontal';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  variant = 'full'
}) => {
  const sizeMap = {
    xs: { icon: 'w-6 h-6', text: 'text-xs', sub: 'text-[8px]', gap: 'gap-1.5' },
    sm: { icon: 'w-8 h-8', text: 'text-sm', sub: 'text-[9px]', gap: 'gap-2' },
    md: { icon: 'w-10 h-10', text: 'text-base sm:text-lg', sub: 'text-[10px]', gap: 'gap-2.5' },
    lg: { icon: 'w-14 h-14', text: 'text-xl sm:text-2xl', sub: 'text-xs', gap: 'gap-3' },
    xl: { icon: 'w-20 h-20', text: 'text-2xl sm:text-3xl', sub: 'text-sm', gap: 'gap-4' },
    hero: { icon: 'w-28 h-28 sm:w-36 sm:h-36', text: 'text-3xl sm:text-4xl', sub: 'text-base', gap: 'gap-5' },
  };

  const dim = sizeMap[size];

  if (variant === 'icon-only') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${dim.icon} ${className}`}>
        <img
          src="/logo.svg"
          alt="Nakshatra Digital Solutions Logo"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${dim.gap} select-none ${className}`}>
      {/* Icon Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 ${dim.icon}`}>
        <img
          src="/logo.svg"
          alt="Nakshatra Digital Solutions Logo"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col text-left leading-none">
          <span className={`font-black tracking-tight uppercase font-serif text-[#111111] dark:text-amber-100 ${dim.text}`}>
            NAKSHATRA <span className="text-[#ff5436]">DIGITAL</span>
          </span>
          <span className={`font-serif font-semibold tracking-widest uppercase text-amber-600 dark:text-amber-400 mt-0.5 ${dim.sub}`}>
            SOLUTIONS
          </span>
        </div>
      )}
    </div>
  );
};
