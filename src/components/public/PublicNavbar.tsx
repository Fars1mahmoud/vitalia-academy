import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { useI18n } from '../../i18n/I18nContext';
import {
  Globe,
  Menu,
  X,
  GraduationCap,
  LogIn,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface PublicNavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenPortal: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenPortal,
}) => {
  const { language, toggleLanguage, t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const navLinks = [
    { id: 'home', label: t('nav_home') },
    { id: 'courses', label: t('nav_courses') },
    { id: 'categories', label: t('nav_categories') },
    { id: 'instructors', label: t('nav_instructors') },
    { id: 'programs', label: t('nav_programs') },
    { id: 'pricing', label: t('nav_pricing') },
    { id: 'verify', label: t('nav_verify') },
    { id: 'about', label: t('nav_about') },
  ];

  const handleLinkClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#F8F6F2]/95 backdrop-blur-md border-b border-[#EDE8E0] shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="focus:outline-hidden focus:ring-2 focus:ring-[#123D70]/40 rounded-2xl p-1 text-start cursor-pointer"
            aria-label="Vitalia Academy Homepage"
          >
            <Logo size="md" variant="dark" />
          </button>

          {/* Desktop Navigation - Soft pill navigation */}
          <nav className="hidden lg:flex items-center space-x-1.5 rtl:space-x-reverse" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'text-[#123D70] bg-[#123D70]/10 shadow-2xs font-bold'
                      : 'text-[#2C333D] hover:text-[#123D70] hover:bg-black/4'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons - Soft pill styling */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#123D70] bg-white border border-[#EDE8E0] hover:bg-[#F2EFE9] hover:border-[#123D70]/30 transition-all duration-300 shadow-2xs cursor-pointer"
              title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#B79A62]" />
              <span className="font-arabic">{isAr ? 'English (EN)' : 'العربية (AR)'}</span>
            </button>

            {/* Sign In */}
            <button
              onClick={() => handleLinkClick('login')}
              className="px-3.5 py-2 rounded-full text-xs font-semibold text-[#123D70] hover:text-[#7B1E3A] hover:bg-black/3 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t('nav_login')}</span>
            </button>

            {/* Portal Direct Access */}
            <button
              onClick={onOpenPortal}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#123D70] hover:bg-[#7B1E3A] text-white text-xs font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-[#DFCA9B]" />
              <span>{t('nav_portal')}</span>
              <ArrowIcon className="w-3.5 h-3.5 text-[#DFCA9B] transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 text-xs font-bold text-[#123D70] bg-white border border-[#EDE8E0] rounded-full"
              aria-label="Toggle Language"
            >
              {isAr ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-[#123D70] hover:bg-black/5"
              aria-expanded={mobileMenuOpen}
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#EDE8E0] bg-[#F8F6F2] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3 py-2 text-xs font-medium rounded-full text-start ${
                    isActive
                      ? 'bg-[#123D70] text-white font-bold'
                      : 'text-[#2C333D] hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('login')}
              className="w-full py-2.5 rounded-full border border-[#123D70] text-[#123D70] text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t('nav_login')}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full py-2.5 rounded-full bg-[#123D70] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <GraduationCap className="w-4 h-4 text-[#DFCA9B]" />
              <span>{t('nav_portal')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
