import React from 'react';
import { useI18n } from '../../i18n/I18nContext';
import vitaliaLogo from '../../assets/vitalia-logo.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'dark' | 'light' | 'monochrome';
  layout?: 'horizontal' | 'stacked';
  showTagline?: boolean;
  showAcademyRule?: boolean;
  className?: string;
  fullImage?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'dark',
  layout = 'horizontal',
  showTagline = true,
  showAcademyRule = true,
  className = '',
  fullImage = false,
}) => {
  const { language } = useI18n();
  const isArabic = language === 'ar';

  // Sizing definitions
  const sizeMap = {
    sm: {
      imgW: 'w-9 h-9',
      fullImg: 'w-28',
      title: 'text-base',
      sub: 'text-[9px]',
      tag: 'text-[8px]',
    },
    md: {
      imgW: 'w-11 h-11',
      fullImg: 'w-40 sm:w-48',
      title: 'text-lg sm:text-xl',
      sub: 'text-[10px] sm:text-[11px]',
      tag: 'text-[9px] sm:text-[10px]',
    },
    lg: {
      imgW: 'w-14 h-14',
      fullImg: 'w-56 sm:w-64',
      title: 'text-2xl sm:text-3xl',
      sub: 'text-xs sm:text-sm',
      tag: 'text-[11px] sm:text-xs',
    },
    xl: {
      imgW: 'w-20 h-20',
      fullImg: 'w-72 sm:w-80',
      title: 'text-3xl sm:text-4xl',
      sub: 'text-sm sm:text-base',
      tag: 'text-xs sm:text-sm',
    },
    '2xl': {
      imgW: 'w-28 h-28',
      fullImg: 'w-96',
      title: 'text-4xl sm:text-5xl',
      sub: 'text-base sm:text-lg',
      tag: 'text-sm sm:text-base',
    },
  };

  const current = sizeMap[size] || sizeMap.md;

  // Brochure Colors:
  // Navy: #123D70, Burgundy: #7B1E3A
  const navyColor = variant === 'light' ? '#FFFFFF' : '#123D70';
  const burgundyColor = variant === 'light' ? '#DFCA9B' : '#7B1E3A';
  const tagColor = variant === 'light' ? 'text-white/80' : 'text-gray-600';

  // If layout is stacked or fullImage requested: render the full 3D embossed logo sculpture
  if (layout === 'stacked' || fullImage) {
    return (
      <div
        className={`inline-flex flex-col items-center text-center select-none ${className}`}
      >
        <div className="relative group p-1.5 rounded-3xl bg-white/95 shadow-vitalia-soft border border-gray-100/60 overflow-hidden transition-all duration-300 hover:shadow-vitalia-hover">
          <img
            src={vitaliaLogo}
            alt="Vitalia Academy Official Logo"
            className={`${current.fullImg} h-auto object-contain rounded-2xl transition-transform duration-300 group-hover:scale-102`}
            loading="eager"
          />
        </div>
        {isArabic && (
          <span
            className="mt-2 text-xs sm:text-sm font-bold tracking-normal font-sans"
            style={{ color: navyColor }}
          >
            أكاديمية فيتاليا • المعرفة تصنع المستقبل
          </span>
        )}
      </div>
    );
  }

  // Horizontal layout (for navbar, sidebar headers, inline headers)
  return (
    <div
      className={`inline-flex items-center gap-3 text-start select-none group ${className}`}
    >
      {/* Official 3D Crest Emblem cropped from official image */}
      <div
        className={`relative overflow-hidden rounded-2xl shrink-0 transition-all duration-300 group-hover:scale-105 ${
          variant === 'light'
            ? 'bg-white p-1 shadow-xs ring-1 ring-white/30'
            : 'bg-white p-1 shadow-sm border border-[#EDE8E0]'
        }`}
      >
        <img
          src={vitaliaLogo}
          alt="Vitalia Crest"
          className={`${current.imgW} object-cover object-top rounded-xl`}
          loading="eager"
        />
      </div>

      {/* Typography: "VITALIA" + "— ACADEMY —" + "Learn. Grow. Evolve." */}
      <div className="flex flex-col leading-tight justify-center">
        {/* Main Brand Title */}
        <div className="flex items-center">
          <span
            className={`font-serif uppercase font-extrabold tracking-wide transition-colors ${current.title}`}
            style={{
              color: navyColor,
              fontFamily: isArabic ? "'Cairo', sans-serif" : "'Cinzel', Georgia, serif",
              letterSpacing: isArabic ? '0px' : '0.14em',
            }}
          >
            {isArabic ? 'فيتاليا' : 'VITALIA'}
          </span>
        </div>

        {/* Subtitle: "— ACADEMY —" with soft burgundy accent lines */}
        {showAcademyRule && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className="h-[1px] w-3 sm:w-4 transition-all"
              style={{ backgroundColor: burgundyColor, opacity: 0.8 }}
            />
            <span
              className={`font-semibold uppercase tracking-wider ${current.sub}`}
              style={{
                color: burgundyColor,
                fontFamily: isArabic ? "'Cairo', sans-serif" : "'Cinzel', Georgia, serif",
                letterSpacing: isArabic ? '0px' : '0.22em',
              }}
            >
              {isArabic ? 'أكاديمية' : 'ACADEMY'}
            </span>
            <span
              className="h-[1px] w-3 sm:w-4 transition-all"
              style={{ backgroundColor: burgundyColor, opacity: 0.8 }}
            />
          </div>
        )}

        {/* Tagline: "Learn. Grow. Evolve." */}
        {showTagline && (
          <div className="mt-0.5 flex items-center">
            <span
              className={`font-medium ${tagColor} ${current.tag}`}
              style={{
                fontFamily: isArabic ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif",
                letterSpacing: isArabic ? '0px' : '0.04em',
              }}
            >
              {isArabic ? 'تعلّم • انمُ • تطوّر' : 'Learn. Grow. Evolve.'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
