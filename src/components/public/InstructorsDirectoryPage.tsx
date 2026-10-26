import React, { useState } from 'react';
import { INITIAL_USERS } from '../../services/mockData';
import { useI18n } from '../../i18n/I18nContext';
import { User } from '../../types';
import { Award, Mail, BookOpen, GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';

interface InstructorsDirectoryPageProps {
  onSelectInstructorCourses?: (instructorId: string) => void;
}

export const InstructorsDirectoryPage: React.FC<InstructorsDirectoryPageProps> = ({
  onSelectInstructorCourses,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const instructors = INITIAL_USERS.filter((u) =>
    u.roles.includes('professor') || u.roles.includes('instructor')
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#7B1E3A] uppercase tracking-wider">
          {isAr ? 'هيئة التدريس الدولية' : 'Distinguished Faculty'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B70] font-serif">
          {t('nav_instructors')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {isAr
            ? 'نخبة من الأساتذة الجامعيين والباحثين المتميزين الذين يقودون العملية التعليمية والبحثية في أكاديمية فيتاليا.'
            : 'Renowned academic chairs, authors, and industry researchers directing university-grade curricula at Vitalia Academy.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {instructors.map((inst) => (
          <div
            key={inst.id}
            className="bg-white rounded-xl border border-[#E8E7E4] hover:border-[#123B70]/40 shadow-xs hover:shadow-lg transition-all p-6 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={inst.avatar}
                  alt={inst.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#B79A62] shadow-sm"
                />
                <div>
                  <h3 className="text-base font-bold text-[#123B70]">
                    {isAr ? inst.nameAr : inst.name}
                  </h3>
                  <p className="text-xs text-[#7B1E3A] font-semibold">
                    {isAr ? inst.titleAr : inst.title}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {isAr ? inst.departmentAr : inst.department}
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {isAr ? inst.bioAr : inst.bio}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#B79A62]" />
                {isAr ? 'عضو هيئة تدريس دائم' : 'Tenured Faculty'}
              </span>

              <button
                onClick={() => onSelectInstructorCourses && onSelectInstructorCourses(inst.id)}
                className="text-[#123B70] hover:text-[#7B1E3A] font-bold flex items-center gap-1 group"
              >
                <span>{isAr ? 'عرض المقررات' : 'Courses'}</span>
                <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
