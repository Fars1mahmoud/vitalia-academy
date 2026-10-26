import React from 'react';
import { Logo } from '../common/Logo';
import { useI18n } from '../../i18n/I18nContext';
import { ShieldCheck, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

interface PublicFooterProps {
  onNavigate: (route: string) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate }) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  return (
    <footer className="bg-[#0B2548] text-white border-t-4 border-[#B79A62]">
      {/* Top Academic Accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Institution Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" variant="light" />
            <p className="text-white/80 text-xs leading-relaxed max-w-sm mt-3">
              {isAr
                ? 'مؤسسة أكاديمية دولية رائدة تهدف إلى بناء أجيال من المتخصصين والباحثين من خلال مناهج جامعية معتمدة، وهيئة تدريس مرموقة، وتقنيات تعليمية مؤسسية متقدمة.'
                : 'An international academic institution dedicated to cultivating researchers and industry leaders through rigorous accredited university curricula, distinguished faculty, and modern educational technology.'}
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#DFCA9B] shrink-0" />
                <span>{isAr ? 'القاهرة • العاصمة الإدارية الجديدة • لندن' : 'Cairo • New Administrative Capital • London'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#DFCA9B] shrink-0" />
                <span>academics@vitalia.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DFCA9B] shrink-0" />
                <span dir="ltr">+20 (2) 3855-9000</span>
              </div>
            </div>
          </div>

          {/* Academic Divisions from Brochure */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#DFCA9B] border-b border-white/10 pb-2">
              {isAr ? 'برامجنا وتخصصاتنا' : 'Academic Programs'}
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white hover:underline transition-colors text-start"
                >
                  {isAr ? 'التغذية والصحة العامة' : 'Nutrition & Health'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white hover:underline transition-colors text-start"
                >
                  {isAr ? 'إدارة الأعمال والقيادة' : 'Business & Management'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white hover:underline transition-colors text-start"
                >
                  {isAr ? 'التطوير الشخصي والمهارات' : 'Personal Development'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white hover:underline transition-colors text-start"
                >
                  {isAr ? 'العلوم الطبية والرعاية الصحية' : 'Medical & Healthcare'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white hover:underline transition-colors text-start"
                >
                  {isAr ? 'التكنولوجيا والمهارات الرقمية' : 'Technology & Digital Skills'}
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Credentials & Verification */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#DFCA9B] border-b border-white/10 pb-2">
              {isAr ? 'الاعتماد والتحقق' : 'Registry & Verification'}
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button
                  onClick={() => onNavigate('verify')}
                  className="flex items-center gap-1.5 text-[#DFCA9B] hover:text-white font-medium hover:underline transition-colors text-start"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#DFCA9B]" />
                  <span>{isAr ? 'بوابة التحقق من الشهادات' : 'Official Certificate Lookup'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs')}
                  className="hover:text-white hover:underline transition-colors text-start"
                >
                  {isAr ? 'البرامج والدبلومات المهنية' : 'Degree & Diploma Tracks'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how_it_works')}
                  className="hover:text-white hover:underline transition-colors text-start"
                >
                  {isAr ? 'معايير إتمام المقررات' : 'Completion Requirements'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-white hover:underline transition-colors text-start"
                >
                  {isAr ? 'الرسوم والمنح الدراسية' : 'Tuition & Financial Aid'}
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Governance & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#DFCA9B] border-b border-white/10 pb-2">
              {isAr ? 'الحوكمة والسياسات' : 'Institutional Policies'}
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white hover:underline transition-colors text-start"
                >
                  {isAr ? 'عن أكاديمية فيتاليا' : 'About Vitalia Academy'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('help')}
                  className="hover:text-white hover:underline transition-colors text-start"
                >
                  {isAr ? 'مركز المساعدة والدعم' : 'Help & Student Services'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-white hover:underline transition-colors text-start"
                >
                  {isAr ? 'سياسة الخصوصية الأكاديمية' : 'Privacy & Data Protection'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-white hover:underline transition-colors text-start"
                >
                  {isAr ? 'الشروط والأحكام' : 'Terms & Academic Code'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('refund')}
                  className="hover:text-white hover:underline transition-colors text-start"
                >
                  {isAr ? 'سياسة الاسترداد المالي' : 'Tuition Refund Policy'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>
            © {new Date().getFullYear()} Vitalia Academy. All rights reserved. •
            Knowledge Builds Better Futures.
          </p>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-[#DFCA9B]">
              {isAr ? 'العملة الرسمية المعروضة: الجنيه المصري (EGP)' : 'Primary Currency: Egyptian Pound (EGP)'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
