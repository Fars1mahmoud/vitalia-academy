import React, { useState } from 'react';
import { UserRole } from '../../types';
import { useI18n } from '../../i18n/I18nContext';
import {
  GraduationCap,
  BookOpen,
  UserCheck,
  ShieldAlert,
  ClipboardCheck,
  Eye,
  CheckCircle,
  Headphones,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface RoleSwitcherBannerProps {
  currentRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
}

const ROLES_CONFIG: { role: UserRole; en: string; ar: string; icon: React.ElementType }[] = [
  { role: 'student', en: 'Student', ar: 'طالب', icon: GraduationCap },
  { role: 'professor', en: 'Professor', ar: 'أستاذ جامعي', icon: BookOpen },
  { role: 'instructor', en: 'Instructor', ar: 'محاضر / مدرب', icon: BookOpen },
  { role: 'teaching_assistant', en: 'Teaching Assistant', ar: 'معيد ومساعد تدريس', icon: UserCheck },
  { role: 'course_reviewer', en: 'Academic Reviewer', ar: 'مراجع أكاديمي', icon: Eye },
  { role: 'academic_supervisor', en: 'Supervisor', ar: 'مشرف أكاديمي', icon: ClipboardCheck },
  { role: 'academy_admin', en: 'Academy Admin', ar: 'مدير الأكاديمية', icon: SlidersHorizontal },
  { role: 'super_admin', en: 'Super Admin', ar: 'المدير العام للنظام', icon: ShieldAlert },
  { role: 'certificate_verifier', en: 'Credential Verifier', ar: 'مدقق الشهادات', icon: CheckCircle },
  { role: 'support_agent', en: 'Support Specialist', ar: 'أخصائي الدعم', icon: Headphones },
];

export const RoleSwitcherBanner: React.FC<RoleSwitcherBannerProps> = ({
  currentRole,
  onSwitchRole,
}) => {
  const { language } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const isAr = language === 'ar';

  const currentRoleInfo = ROLES_CONFIG.find((r) => r.role === currentRole) || ROLES_CONFIG[0];
  const IconComponent = currentRoleInfo.icon;

  return (
    <div className="bg-[#123B70] text-white border-b border-[#B79A62]/30 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 shadow-md relative z-40">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7B1E3A] text-white font-semibold text-[11px] tracking-wide uppercase shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#DFCA9B]" />
          {isAr ? 'الوضع التجريبي المؤسسي' : 'ENTERPRISE DEMO MODE'}
        </span>
        <span className="hidden md:inline text-white/80">
          {isAr
            ? 'استعراض واجهات وصلاحيات المنصة التعليمية المتكاملة'
            : 'Previewing fully interactive role portals with simulated academic datasets'}
        </span>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all font-medium text-xs text-white cursor-pointer"
          aria-expanded={isOpen}
          aria-label="Switch User Role"
        >
          <span className="text-[#DFCA9B] font-normal">
            {isAr ? 'الدور النشط:' : 'Active Role:'}
          </span>
          <span className="flex items-center gap-1.5 font-bold">
            <IconComponent className="w-3.5 h-3.5 text-[#DFCA9B]" />
            {isAr ? currentRoleInfo.ar : currentRoleInfo.en}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <div className={`absolute top-full mt-1.5 z-40 bg-[#0B2548] border border-[#B79A62]/40 rounded-lg shadow-2xl py-2 min-w-[260px] max-h-[380px] overflow-y-auto ${isAr ? 'left-0' : 'right-0'}`}>
              <div className="px-3 py-1.5 border-b border-white/10 text-[10px] uppercase tracking-wider text-[#DFCA9B] font-semibold">
                {isAr ? 'اختر الدور لمعاينة بوابته المخصصة' : 'Select Role to Preview Dedicated Portal'}
              </div>
              {ROLES_CONFIG.map(({ role, en, ar, icon: ItemIcon }) => {
                const isSelected = role === currentRole;
                return (
                  <button
                    key={role}
                    onClick={() => {
                      onSwitchRole(role);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-start transition-colors text-xs ${
                      isSelected
                        ? 'bg-[#123B70] text-[#DFCA9B] font-bold'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <ItemIcon className={`w-4 h-4 ${isSelected ? 'text-[#DFCA9B]' : 'text-white/60'}`} />
                    <span className="flex-1">{isAr ? ar : en}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DFCA9B]" />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
