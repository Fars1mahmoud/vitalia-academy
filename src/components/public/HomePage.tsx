import React, { useState } from 'react';
import { useI18n } from '../../i18n/I18nContext';
import { Course } from '../../types';
import { Logo } from '../common/Logo';
import vitaliaLogo from '../../assets/vitalia-logo.png';
import brandBrochure from '../../assets/brand-brochure.png';
import {
  BookOpen,
  Sprout,
  Users,
  Star,
  Search,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  Sparkles,
  HeartHandshake,
  Activity,
  Briefcase,
  UserCheck,
  Cpu,
  GraduationCap,
  Award,
  Compass,
} from 'lucide-react';

interface HomePageProps {
  courses?: Course[];
  bookmarks?: string[];
  onToggleBookmark?: (courseId: string) => void;
  onNavigate: (route: string) => void;
  onSelectCourse?: (course: Course) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectCategory,
}) => {
  const { language, t } = useI18n();
  const [quickSearch, setQuickSearch] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      onNavigate(`courses?q=${encodeURIComponent(quickSearch.trim())}`);
    } else {
      onNavigate('courses');
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  // Brochure Values List (4 Circular Pillars)
  const brochureValues = [
    {
      id: 'knowledge',
      title: t('val_knowledge_title'),
      desc: t('val_knowledge_desc'),
      icon: BookOpen,
      color: 'text-[#123D70]',
      bgColor: 'bg-[#123D70]/8',
      borderColor: 'border-[#123D70]/25',
    },
    {
      id: 'growth',
      title: t('val_growth_title'),
      desc: t('val_growth_desc'),
      icon: Sprout,
      color: 'text-[#7B1E3A]',
      bgColor: 'bg-[#7B1E3A]/8',
      borderColor: 'border-[#7B1E3A]/25',
    },
    {
      id: 'community',
      title: t('val_community_title'),
      desc: t('val_community_desc'),
      icon: Users,
      color: 'text-[#123D70]',
      bgColor: 'bg-[#123D70]/8',
      borderColor: 'border-[#123D70]/25',
    },
    {
      id: 'excellence',
      title: t('val_excellence_title'),
      desc: t('val_excellence_desc'),
      icon: Star,
      color: 'text-[#7B1E3A]',
      bgColor: 'bg-[#7B1E3A]/8',
      borderColor: 'border-[#7B1E3A]/25',
    },
  ];

  // Brochure Programs List (Categories/Disciplines - No course cards displayed here)
  const brochurePrograms = [
    {
      id: 'nutrition',
      name: t('programs_p_nutrition'),
      desc: isAr
        ? 'علوم التغذية الإكلينيكية، الصحة العامة، ونمط الحياة المتوازن'
        : 'Clinical nutrition, public health science, and holistic vitality',
      icon: Activity,
      catId: 'cat-health',
    },
    {
      id: 'business',
      name: t('programs_p_business'),
      desc: isAr
        ? 'إدارة الأعمال الحديثة، القيادة التنفيذية، واستراتيجيات النمو'
        : 'Modern management, corporate strategy, and venture leadership',
      icon: Briefcase,
      catId: 'cat-business',
    },
    {
      id: 'personal',
      name: t('programs_p_personal'),
      desc: isAr
        ? 'التواصل الفعال، الذكاء العاطفي، وتنمية المهارات القيادية'
        : 'Communication, emotional intelligence, and self-mastery',
      icon: UserCheck,
      catId: 'cat-humanities',
    },
    {
      id: 'medical',
      name: t('programs_p_medical'),
      desc: isAr
        ? 'المعلوماتية الطبية، الرعاية الصحية المتقدمة، وإدارة العيادات'
        : 'Biomedical informatics, healthcare operations, and clinical governance',
      icon: HeartHandshake,
      catId: 'cat-health',
    },
    {
      id: 'technology',
      name: t('programs_p_tech'),
      desc: isAr
        ? 'الذكاء الاصطناعي، الحوسبة السحابية، وتحليل البيانات الضخمة'
        : 'Generative AI, cloud infrastructure, and software engineering',
      icon: Cpu,
      catId: 'cat-cs',
    },
    {
      id: 'more',
      name: t('programs_p_more'),
      desc: isAr
        ? 'مسارات متعددة التخصصات تصنع فارقاً حقيقياً في مسيرتك'
        : 'Interdisciplinary diploma tracks built for immediate industry impact',
      icon: GraduationCap,
      catId: 'all',
    },
  ];

  // Why Vitalia Points from Official Brochure
  const whyVitaliaPoints = [
    { text: t('why_feat_1'), id: 1 },
    { text: t('why_feat_2'), id: 2 },
    { text: t('why_feat_3'), id: 3 },
    { text: t('why_feat_4'), id: 4 },
    { text: t('why_feat_5'), id: 5 },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION: Soft, eye-pleasing, comfortable with official 3D logo asset */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-br from-[#123D70] via-[#103460] to-[#0A2242] text-white p-8 sm:p-14 lg:p-16 shadow-vitalia-soft relative overflow-hidden border border-white/10">
          {/* Subtle soft organic background curves */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#7B1E3A]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#DFCA9B]/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-start">
              {/* Soft Brand Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs text-[#DFCA9B] font-medium backdrop-blur-md shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#DFCA9B]" />
                <span>{t('brand_philosophy')}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-snug sm:leading-tight text-white font-serif">
                {t('hero_title')}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed font-light max-w-xl">
                {t('hero_subtitle')}
              </p>

              {/* Soft Pill Search Bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 bg-white/95 backdrop-blur-md p-2 rounded-full shadow-lg max-w-xl border border-white/40 focus-within:ring-2 focus-within:ring-[#DFCA9B] transition-all"
              >
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-gray-400 absolute top-1/2 -translate-y-1/2 left-4 rtl:right-4 rtl:left-auto" />
                  <input
                    type="text"
                    value={quickSearch}
                    onChange={(e) => setQuickSearch(e.target.value)}
                    placeholder={
                      isAr
                        ? 'ابحث عن مسار، تخصص، أو موضوع (تغذية، إدارة أعمال، ذكاء اصطناعي)...'
                        : 'Search by discipline, topic, or track (e.g. Nutrition, Management, AI)...'
                    }
                    className="w-full text-xs sm:text-sm text-[#2C333D] pl-11 pr-4 rtl:pr-11 rtl:pl-4 py-2 bg-transparent focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#123D70] hover:bg-[#7B1E3A] text-white rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{t('btn_search')}</span>
                </button>
              </form>

              {/* CTAs with Soft Rounded Corners */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('courses')}
                  className="px-7 py-3 rounded-full bg-[#DFCA9B] hover:bg-white text-[#0A2242] font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer"
                >
                  <span>{t('hero_cta_primary')}</span>
                  <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 backdrop-blur-xs cursor-pointer"
                >
                  {isAr ? 'قصة فيتاليا ورسالتنا' : 'Our Story & Philosophy'}
                </button>

                <button
                  onClick={() => onNavigate('instructors')}
                  className="px-5 py-3 rounded-full text-white/80 hover:text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  {t('hero_cta_secondary')}
                </button>
              </div>
            </div>

            {/* Right Column: Official 3D Embossed Logo Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md bg-white/12 backdrop-blur-md border border-white/25 rounded-3xl p-7 sm:p-8 shadow-2xl text-white space-y-6">
                {/* Official 3D Logo from user attachment */}
                <div className="flex flex-col items-center text-center pb-4 border-b border-white/15">
                  <div className="p-2 rounded-2xl bg-white shadow-md border border-white/30 overflow-hidden">
                    <img
                      src={vitaliaLogo}
                      alt="Vitalia Academy Official Crest & Logo"
                      className="w-44 sm:w-52 h-auto object-contain rounded-xl transition-transform duration-300 hover:scale-102"
                    />
                  </div>
                </div>

                {/* Script Quote from Official Brochure */}
                <div className="text-center py-2.5 px-4 rounded-2xl bg-white/5 border border-white/10">
                  <p
                    className={`text-base sm:text-lg text-[#DFCA9B] ${
                      isAr ? 'font-serif font-bold' : 'font-script tracking-wide'
                    }`}
                    style={isAr ? { fontFamily: "'Cairo', serif" } : { fontStyle: 'italic' }}
                  >
                    "{t('quote_journey')}"
                  </p>
                </div>

                {/* 3 Core Principles from the Brochure */}
                <div className="space-y-3 text-xs sm:text-sm text-white/90">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#DFCA9B]/20 text-[#DFCA9B] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{isAr ? 'التعليم رحلة لإطلاق الإمكانات والمهارات' : 'Developing potential & real-world practical skills'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#DFCA9B]/20 text-[#DFCA9B] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{isAr ? 'شهادات إتمام موثقة ومعتمدة أكاديمياً' : 'Verifiable academic completion credentials'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#DFCA9B]/20 text-[#DFCA9B] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{isAr ? 'مجتمع تفاعلي داعم يربطك بأفضل الخبراء' : 'Supportive community fostering lasting impact'}</span>
                  </div>
                </div>

                {/* Gateway to Explore All Programs */}
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('courses')}
                    className="w-full py-2.5 px-4 rounded-full bg-[#DFCA9B] hover:bg-white text-[#0A2242] text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Compass className="w-4 h-4 text-[#0A2242]" />
                    <span>{isAr ? 'استكشف كافة المقررات والمسارات' : 'Explore All Academic Tracks'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Soft Stats Ribbon */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#DFCA9B] font-serif">120+</div>
              <div className="text-xs text-white/85 mt-1 font-medium">{t('hero_stat_courses')}</div>
            </div>
            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#DFCA9B] font-serif">18,500+</div>
              <div className="text-xs text-white/85 mt-1 font-medium">{t('hero_stat_students')}</div>
            </div>
            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#DFCA9B] font-serif">85+</div>
              <div className="text-xs text-white/85 mt-1 font-medium">{t('hero_stat_instructors')}</div>
            </div>
            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#DFCA9B] font-serif">98.4%</div>
              <div className="text-xs text-white/85 mt-1 font-medium">{t('hero_stat_rate')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE MEANING BEHIND VITALIA & OFFICIAL BROCHURE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#EDE8E0] p-8 sm:p-12 lg:p-16 shadow-vitalia-soft relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Story & Philosophy */}
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#123D70]/8 text-[#123D70] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#7B1E3A]" />
                <span>{isAr ? 'فلسفة وهوية الأكاديمية' : 'The Vitalia Identity'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#123D70] font-serif leading-tight">
                {t('meaning_title')}
              </h2>

              <p className="text-base sm:text-lg text-[#7B1E3A] font-medium leading-relaxed">
                {t('meaning_p1')}
              </p>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {t('meaning_p2')}
              </p>

              {/* Hand-written script quote from brochure */}
              <div className="pt-2">
                <span
                  className={`text-xl sm:text-2xl text-[#7B1E3A] inline-block border-b-2 border-[#7B1E3A]/20 pb-1 ${
                    isAr ? 'font-serif font-bold' : 'font-script'
                  }`}
                  style={isAr ? { fontFamily: "'Cairo', serif" } : { fontStyle: 'italic' }}
                >
                  "{t('quote_journey')}"
                </span>
              </div>


            </div>

            {/* Visual Image Card: Brochure Display */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-vitalia-hover border border-[#EDE8E0] bg-[#FAF8F5] group">
                <img
                  src={brandBrochure}
                  alt="Vitalia Academy Brand Identity Brochure"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white text-xs font-semibold">
                    {isAr ? 'كتيب الهوية الرسمية لأكاديمية فيتاليا' : 'Vitalia Academy Official Brand Identity'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR VALUES: 4 Circular Outline Badges directly from the brochure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-[#7B1E3A] tracking-[0.2em] uppercase">
            {t('values_title')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#123D70] font-serif">
            {isAr ? 'المبادئ الأربعة التي ترتكز عليها فيتاليا' : 'The Four Pillars That Guide Us'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {t('values_subtitle')}
          </p>
        </div>

        {/* The 4 Circular Values from the brochure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brochureValues.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.id}
                className="group p-8 rounded-3xl bg-white border border-[#EDE8E0] hover:border-[#123D70]/40 shadow-vitalia-soft hover:shadow-vitalia-hover transition-all duration-300 text-center flex flex-col items-center justify-between"
              >
                <div className="flex flex-col items-center">
                  {/* Soft circular outline icon badge as in brochure */}
                  <div
                    className={`w-18 h-18 rounded-full border-2 ${val.borderColor} ${val.bgColor} ${val.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mb-5 shadow-xs`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-lg font-bold text-[#123D70] font-serif group-hover:text-[#7B1E3A] transition-colors">
                    {val.title}
                  </h3>

                  <p className="text-xs text-gray-600 mt-2 font-medium">
                    {val.desc}
                  </p>
                </div>

                <div className="mt-5 w-8 h-1 rounded-full bg-gray-200 group-hover:bg-[#7B1E3A] transition-colors duration-300" />
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. OUR PROGRAMS: Academic Tracks from Brochure (Navigation to Courses catalog, no individual course cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EDE8E0] gap-4">
          <div>
            <span className="text-xs font-bold text-[#7B1E3A] tracking-[0.2em] uppercase">
              {t('programs_title')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#123D70] font-serif mt-1">
              {isAr ? 'مسارات أكاديمية متكاملة' : 'Academic Programs & Disciplines'}
            </h2>
            <p className="text-xs text-[#7B1E3A] font-semibold mt-1">
              {t('programs_motto')}
            </p>
          </div>

          <button
            onClick={() => onNavigate('courses')}
            className="text-xs font-semibold text-[#123D70] hover:text-[#7B1E3A] flex items-center gap-2 transition-colors duration-300 group cursor-pointer"
          >
            <span>{isAr ? 'استعراض كافة المقررات بالمكتبة الأكاديمية' : 'Explore All Courses in Catalog'}</span>
            <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brochurePrograms.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.id}
                onClick={() => {
                  if (prog.catId === 'all') onNavigate('courses');
                  else onSelectCategory(prog.catId);
                }}
                className="group p-6 rounded-3xl bg-white border border-[#EDE8E0] hover:border-[#123D70] shadow-vitalia-soft hover:shadow-vitalia-hover transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Soft circular icon */}
                  <div className="w-12 h-12 rounded-full bg-[#123D70]/8 text-[#123D70] group-hover:bg-[#123D70] group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#2C333D] group-hover:text-[#123D70] transition-colors">
                    {prog.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {prog.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#7B1E3A]">
                    {isAr ? 'معتمد أكاديمياً' : 'Accredited Track'}
                  </span>
                  <span className="font-semibold text-[#123D70] flex items-center gap-1 group-hover:underline">
                    <span>{isAr ? 'استكشف المقررات' : 'Explore Courses'}</span>
                    <ArrowIcon className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. WHY VITALIA: From the brochure ("Because your growth matters.") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#123D70] to-[#7B1E3A] text-white p-8 sm:p-12 lg:p-14 shadow-vitalia-soft relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-4 text-start">
              <span className="px-3 py-1 rounded-full bg-white/20 text-[#DFCA9B] text-xs font-semibold backdrop-blur-xs">
                {t('why_vitalia_title')}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white">
                {isAr ? 'لماذا يختار الطلاب والمهنيون فيتاليا؟' : 'Why Vitalia Academy?'}
              </h2>
              <p
                className={`text-base sm:text-lg text-[#DFCA9B] ${
                  isAr ? 'font-serif font-bold' : 'font-script'
                }`}
                style={isAr ? { fontFamily: "'Cairo', serif" } : { fontStyle: 'italic' }}
              >
                "{t('why_vitalia_motto')}"
              </p>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-lg">
                {isAr
                  ? 'صُممت أكاديمية فيتاليا لتكون شريكك الدائم في رحلة التطور المهني والأكاديمي، من خلال برامج مرنة ومهارات عملية تثري مسارك.'
                  : 'Vitalia Academy was created to empower you at every step of your professional journey with flexible schedules, expert mentors, and demonstrable credentials.'}
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 space-y-4">
                {whyVitaliaPoints.map((point) => (
                  <div key={point.id} className="flex items-center gap-3 text-xs sm:text-sm text-white">
                    <div className="w-6 h-6 rounded-full bg-[#DFCA9B] text-[#0A2242] flex items-center justify-center shrink-0 font-bold shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">{point.text}</span>
                  </div>
                ))}

                <div className="pt-4 border-t border-white/15 flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigate('courses')}
                    className="flex-1 py-2.5 px-5 rounded-full bg-[#DFCA9B] hover:bg-white text-[#0A2242] font-bold text-xs transition-all shadow-md text-center cursor-pointer"
                  >
                    {isAr ? 'تصفح مسارات التعلم' : 'Start Your Journey'}
                  </button>
                  <button
                    onClick={() => onNavigate('about')}
                    className="py-2.5 px-5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all text-center cursor-pointer"
                  >
                    {isAr ? 'تعرف علينا أكثر' : 'Learn More'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS: 4-step progressive learning model */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#EDE8E0] p-8 sm:p-12 shadow-vitalia-soft">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#7B1E3A] tracking-[0.2em] uppercase">
              {isAr ? 'المنظومة التعليمية' : 'The Vitalia Journey'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#123D70] font-serif">
              {t('nav_how_it_works')}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              {isAr
                ? 'رحلة متدرجة تجمع بين الفهم النظري العميق، والتطبيق العملي، والتقييم المقنن لنيل الاعتماد الرسمي.'
                : 'A guided pathway from foundational concept to hands-on practical application and recognized graduation.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8F6F2] border border-[#EDE8E0] relative text-start">
              <span className="w-9 h-9 rounded-full bg-[#123D70]/10 text-[#123D70] font-bold font-serif flex items-center justify-center text-sm mb-3">
                01
              </span>
              <h3 className="text-sm font-bold text-[#123D70]">
                {isAr ? '1. الالتحاق بالمسار' : '1. Curricular Enrollment'}
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                {isAr
                  ? 'اختر البرنامج المناسب لأهدافك واحصل فوراً على المقررات والمراجع التعليمية المعتمدة.'
                  : 'Enroll in your chosen specialization with instant access to comprehensive materials.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F6F2] border border-[#EDE8E0] relative text-start">
              <span className="w-9 h-9 rounded-full bg-[#7B1E3A]/10 text-[#7B1E3A] font-bold font-serif flex items-center justify-center text-sm mb-3">
                02
              </span>
              <h3 className="text-sm font-bold text-[#123D70]">
                {isAr ? '2. التطبيق العملي' : '2. Applied Practice'}
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                {isAr
                  ? 'تطبيق النظريات عبر مهام واقعية وأوراق عمل ومشاريع عملية تخضع للتقييم الأكاديمي.'
                  : 'Complete hands-on assignments and case studies reviewed directly by faculty mentors.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F6F2] border border-[#EDE8E0] relative text-start">
              <span className="w-9 h-9 rounded-full bg-[#123D70]/10 text-[#123D70] font-bold font-serif flex items-center justify-center text-sm mb-3">
                03
              </span>
              <h3 className="text-sm font-bold text-[#123D70]">
                {isAr ? '3. الاختبار الأكاديمي' : '3. Standardized Exam'}
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                {isAr
                  ? 'اجتياز اختبار شامل محدد بوقت يقيس مستوى الاستيعاب والتمكن من المفاهيم الأساسية.'
                  : 'Pass a monitored evaluation to validate comprehensive competency in the curriculum.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F6F2] border border-[#EDE8E0] relative text-start">
              <span className="w-9 h-9 rounded-full bg-[#7B1E3A]/10 text-[#7B1E3A] font-bold font-serif flex items-center justify-center text-sm mb-3">
                04
              </span>
              <h3 className="text-sm font-bold text-[#123D70]">
                {isAr ? '4. الشهادة والاعتماد' : '4. Official Credential'}
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                {isAr
                  ? 'نيل شهادة إتمام رسمية موثقة مسجلة وموثوقة تثري سجلك المهني والأكاديمي.'
                  : 'Receive your verified completion credential backed by official academic standards.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ACADEMIC FACULTY & LEADERSHIP INVITATION (No ID display) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#123D70] via-[#1A457D] to-[#7B1E3A] text-white p-8 sm:p-12 shadow-vitalia-soft flex flex-col md:flex-row items-center justify-between gap-8 border border-white/20">
          <div className="space-y-3 max-w-xl text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-[#DFCA9B] text-xs font-semibold backdrop-blur-xs">
              <Award className="w-4 h-4" />
              <span>{isAr ? 'الهيئة الأكاديمية ونخبة الخبراء' : 'Distinguished Faculty & Scholars'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              {isAr ? 'انضم إلى نخبة المحاضرين والأساتذة في فيتاليا' : 'Teach at Vitalia Academy'}
            </h2>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              {isAr
                ? 'شارك خبراتك الأكاديمية والمهنية مع آلاف الطلاب الطامحين في بيئة رقمية متطورة تمنحك أدوات تدريس متكاملة.'
                : 'Empower thousands of ambitious learners worldwide with institutional course authoring tools and dedicated teaching assistant support.'}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('instructors')}
              className="px-7 py-3 rounded-full bg-[#DFCA9B] hover:bg-white text-[#0A2242] font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4 text-[#0A2242]" />
              <span>{isAr ? 'دليل الأساتذة والمحاضرين' : 'View Faculty Directory'}</span>
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            >
              {isAr ? 'تقديم طلب انضمام' : 'Apply as Instructor'}
            </button>
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER SUBSCRIPTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#EDE8E0] shadow-vitalia-soft text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#123D70]/8 text-[#123D70] flex items-center justify-center mx-auto">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#123D70] font-serif">
            {isAr ? 'النشرة الدورية لأكاديمية فيتاليا' : 'Vitalia Academic Gazette'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            {isAr
              ? 'كن أول من يعلم عن إطلاق البرامج الجديدة والمقالات والمنح الدراسية والفعاليات الأكاديمية.'
              : 'Receive updates on new masterclasses, research papers, scholarship openings, and university lectures.'}
          </p>

          {newsletterSubscribed ? (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-full text-emerald-800 text-xs font-bold inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isAr ? 'تم الاشتراك بنجاح في نشرة فيتاليا!' : 'Successfully subscribed to the Gazette!'}</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={isAr ? 'أدخل بريدك الإلكتروني...' : 'Enter your email address...'}
                className="flex-1 px-5 py-3 rounded-full border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#123D70] focus:outline-hidden bg-[#FAF8F5]"
              />
              <button
                type="submit"
                className="px-7 py-3 bg-[#123D70] hover:bg-[#7B1E3A] text-white font-semibold text-xs sm:text-sm rounded-full transition-colors duration-300 shrink-0 cursor-pointer shadow-xs"
              >
                {isAr ? 'اشترك الآن' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
