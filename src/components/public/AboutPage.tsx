import React from 'react';
import { useI18n } from '../../i18n/I18nContext';
import { Logo } from '../common/Logo';
import brandBrochure from '../../assets/brand-brochure.png';
import {
  BookOpen,
  Sprout,
  Users,
  Star,
  Check,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Heart,
  Globe,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  const brochureValues = [
    {
      id: 'knowledge',
      title: t('val_knowledge_title'),
      desc: t('val_knowledge_desc'),
      icon: BookOpen,
      borderColor: 'border-[#123D70]/25',
      bgColor: 'bg-[#123D70]/8',
      color: 'text-[#123D70]',
    },
    {
      id: 'growth',
      title: t('val_growth_title'),
      desc: t('val_growth_desc'),
      icon: Sprout,
      borderColor: 'border-[#7B1E3A]/25',
      bgColor: 'bg-[#7B1E3A]/8',
      color: 'text-[#7B1E3A]',
    },
    {
      id: 'community',
      title: t('val_community_title'),
      desc: t('val_community_desc'),
      icon: Users,
      borderColor: 'border-[#123D70]/25',
      bgColor: 'bg-[#123D70]/8',
      color: 'text-[#123D70]',
    },
    {
      id: 'excellence',
      title: t('val_excellence_title'),
      desc: t('val_excellence_desc'),
      icon: Star,
      borderColor: 'border-[#7B1E3A]/25',
      bgColor: 'bg-[#7B1E3A]/8',
      color: 'text-[#7B1E3A]',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Hero / Header with Brochure Logo */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <Logo size="xl" variant="dark" layout="stacked" className="justify-center mb-6" />

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#123D70]/8 text-[#123D70] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#7B1E3A]" />
          <span>{t('brand_philosophy')}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#123D70] font-serif">
          {isAr ? 'عن أكاديمية فيتاليا' : 'About Vitalia Academy'}
        </h1>

        <p
          className={`text-lg sm:text-xl text-[#7B1E3A] ${
            isAr ? 'font-serif font-bold' : 'font-script'
          }`}
          style={isAr ? { fontFamily: "'Cairo', serif" } : { fontStyle: 'italic' }}
        >
          "{t('quote_journey')}"
        </p>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
          {t('meaning_p2')}
        </p>
      </div>

      {/* The Meaning Behind VITALIA Card */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#EDE8E0] shadow-vitalia-soft space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4 text-start">
            <span className="text-xs font-bold text-[#7B1E3A] tracking-[0.2em] uppercase">
              {isAr ? 'دلالة الاسم والأصل اللاتيني' : 'Etymology & Origin'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#123D70] font-serif">
              {t('meaning_title')}
            </h2>
            <p className="text-base font-medium text-[#7B1E3A]">
              {t('meaning_p1')}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('meaning_p2')}
            </p>


          </div>

          <div className="md:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-md border border-[#EDE8E0]">
              <img
                src={brandBrochure}
                alt="Vitalia Academy Brand Identity"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section: 4 Circular Outline Badges */}
      <div className="space-y-8 text-center">
        <div>
          <span className="text-xs font-bold text-[#7B1E3A] tracking-[0.2em] uppercase">
            {t('values_title')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#123D70] font-serif mt-1">
            {isAr ? 'القيم التي نعتز بها' : 'Principles That Define Our Work'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brochureValues.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.id}
                className="p-8 rounded-3xl bg-white border border-[#EDE8E0] shadow-vitalia-soft text-center flex flex-col items-center justify-between"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-18 h-18 rounded-full border-2 ${val.borderColor} ${val.bgColor} ${val.color} flex items-center justify-center mb-4 shadow-xs`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-[#123D70] font-serif">
                    {val.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2">
                    {val.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Vitalia Banner */}
      <div className="bg-gradient-to-r from-[#123D70] to-[#7B1E3A] text-white p-8 sm:p-12 rounded-3xl shadow-vitalia-soft space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            {t('why_vitalia_title')}
          </h2>
          <p
            className={`text-base sm:text-lg text-[#DFCA9B] ${
              isAr ? 'font-serif font-bold' : 'font-script'
            }`}
            style={isAr ? { fontFamily: "'Cairo', serif" } : { fontStyle: 'italic' }}
          >
            "{t('why_vitalia_motto')}"
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3 text-xs">
            <Check className="w-4 h-4 text-[#DFCA9B] shrink-0" />
            <span>{t('why_feat_1')}</span>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3 text-xs">
            <Check className="w-4 h-4 text-[#DFCA9B] shrink-0" />
            <span>{t('why_feat_2')}</span>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3 text-xs">
            <Check className="w-4 h-4 text-[#DFCA9B] shrink-0" />
            <span>{t('why_feat_3')}</span>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3 text-xs">
            <Check className="w-4 h-4 text-[#DFCA9B] shrink-0" />
            <span>{t('why_feat_4')}</span>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3 text-xs">
            <Check className="w-4 h-4 text-[#DFCA9B] shrink-0" />
            <span>{t('why_feat_5')}</span>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3 text-xs">
            <Check className="w-4 h-4 text-[#DFCA9B] shrink-0" />
            <span>{t('programs_motto')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
