import React, { useState } from 'react';
import { Course, CourseModule } from '../../types';
import { useI18n } from '../../i18n/I18nContext';
import {
  Star,
  Clock,
  BookOpen,
  Award,
  CheckCircle,
  PlayCircle,
  FileText,
  HelpCircle,
  ShieldCheck,
  Users,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Share2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  GraduationCap,
} from 'lucide-react';

interface CourseDetailsPageProps {
  course: Course;
  isEnrolled: boolean;
  isBookmarked: boolean;
  relatedCourses: Course[];
  onEnroll: (courseId: string) => void;
  onContinueLearning: (courseId: string) => void;
  onToggleBookmark: (courseId: string) => void;
  onSelectRelatedCourse: (course: Course) => void;
  onBackToCatalog: () => void;
}

export const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({
  course,
  isEnrolled,
  isBookmarked,
  relatedCourses,
  onEnroll,
  onContinueLearning,
  onToggleBookmark,
  onSelectRelatedCourse,
  onBackToCatalog,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-1-1': true,
  });

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  return (
    <div className="pb-20">
      {/* Top Breadcrumb & Hero */}
      <div className="bg-[#123B70] text-white py-12 border-b-4 border-[#B79A62]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBackToCatalog}
            className="flex items-center gap-1.5 text-xs text-[#DFCA9B] hover:underline font-semibold mb-6"
          >
            <ArrowIcon className="w-3.5 h-3.5 rotate-180" />
            <span>{isAr ? 'العودة لدليل المقررات' : 'Back to Course Catalog'}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4 text-start">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#7B1E3A] text-white">
                  {isAr ? course.categoryNameAr : course.categoryName}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-white/10 text-[#DFCA9B] border border-white/20">
                  {course.language}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-white/10 text-white border border-white/20 capitalize">
                  {course.level} Level
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif leading-tight">
                {isAr ? course.titleAr : course.title}
              </h1>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                {isAr ? course.subtitleAr : course.subtitle}
              </p>

              {/* Rating & Enrollment Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
                <div className="flex items-center gap-1 text-[#DFCA9B] font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{course.rating.toFixed(2)}</span>
                  <span className="text-white/60 font-normal">({course.ratingsCount} reviews)</span>
                </div>
                <span className="text-white/40">•</span>
                <div className="flex items-center gap-1.5 text-white/80">
                  <Users className="w-3.5 h-3.5 text-[#DFCA9B]" />
                  <span>{course.enrolledCount} {t('lbl_enrolled')}</span>
                </div>
                <span className="text-white/40">•</span>
                <div className="flex items-center gap-1.5 text-white/80">
                  <Clock className="w-3.5 h-3.5 text-[#DFCA9B]" />
                  <span>{course.durationHours} {t('lbl_hours')}</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-3">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructorName}
                  className="w-10 h-10 rounded-full border-2 border-[#DFCA9B] object-cover"
                />
                <div>
                  <div className="text-xs text-[#DFCA9B] font-semibold">{t('lbl_instructor')}</div>
                  <div className="text-sm font-bold text-white">
                    {isAr ? course.instructorNameAr : course.instructorName}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Syllabus, Outcomes, Details */}
          <div className="lg:col-span-8 space-y-10 text-start">
            {/* Learning Outcomes Box */}
            <div className="bg-white p-6 rounded-xl border border-[#E8E7E4] shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-[#123B70] font-serif flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#B79A62]" />
                <span>{t('lbl_outcomes')}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(isAr ? course.learningOutcomesAr : course.learningOutcomes).map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Overview & Description */}
            <div className="bg-white p-6 rounded-xl border border-[#E8E7E4] shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-[#123B70] font-serif">
                {isAr ? 'عن هذا المساق الأكاديمي' : 'Course Overview & Academic Scope'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {isAr ? course.descriptionAr : course.description}
              </p>
            </div>

            {/* Curriculum Breakdown */}
            <div className="bg-white p-6 rounded-xl border border-[#E8E7E4] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h2 className="text-lg font-bold text-[#123B70] font-serif">
                  {t('lbl_curriculum')}
                </h2>
                <span className="text-xs text-gray-500">
                  {course.modules.length} {isAr ? 'وحدات' : 'Modules'} • {course.lessonsCount} {t('lbl_lessons')}
                </span>
              </div>

              {course.modules.length === 0 ? (
                <div className="py-6 text-center text-xs text-gray-500">
                  {isAr ? 'سيتم الإعلان عن المنهج التفصيلي الكامل قريباً' : 'Comprehensive syllabus schedule will be released shortly.'}
                </div>
              ) : (
                <div className="space-y-3">
                  {course.modules.map((mod) => {
                    const isExpanded = !!expandedModules[mod.id];
                    return (
                      <div
                        key={mod.id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleModule(mod.id)}
                          className="w-full flex items-center justify-between p-4 bg-[#F8F6F2] hover:bg-gray-100 transition-colors text-start"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#123B70]">
                              {isAr ? mod.titleAr : mod.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] text-gray-500">
                              {mod.lessons.length} {t('lbl_lessons')}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-500" />
                            )}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="divide-y divide-gray-100 bg-white">
                            {mod.lessons.map((les) => (
                              <div
                                key={les.id}
                                className="p-3.5 px-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-xs"
                              >
                                <div className="flex items-center gap-3">
                                  {les.type === 'video' ? (
                                    <PlayCircle className="w-4 h-4 text-[#123B70]" />
                                  ) : les.type === 'reading' ? (
                                    <FileText className="w-4 h-4 text-[#7B1E3A]" />
                                  ) : (
                                    <HelpCircle className="w-4 h-4 text-[#B79A62]" />
                                  )}
                                  <span className="font-medium text-gray-800">
                                    {isAr ? les.titleAr : les.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                                  {les.isFreePreview && (
                                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                                      {isAr ? 'معاينة مجانية' : 'Preview'}
                                    </span>
                                  )}
                                  <span>{les.durationMinutes} min</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Prerequisites & Target Audience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-[#E8E7E4] space-y-3">
                <h3 className="font-bold text-sm text-[#123B70] uppercase tracking-wider">
                  {t('lbl_requirements')}
                </h3>
                <ul className="space-y-2 text-xs text-gray-700">
                  {(isAr ? course.requirementsAr : course.requirements).map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#B79A62] font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#E8E7E4] space-y-3">
                <h3 className="font-bold text-sm text-[#123B70] uppercase tracking-wider">
                  {isAr ? 'الفئات والجمهور المستهدف' : 'Target Audience'}
                </h3>
                <ul className="space-y-2 text-xs text-gray-700">
                  {(isAr ? course.targetAudienceAr : course.targetAudience).map((aud, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#7B1E3A] font-bold">•</span>
                      <span>{aud}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Certificate Eligibility Notice */}
            <div className="bg-[#0B2548] text-white p-6 rounded-xl border border-[#B79A62]/40 flex items-start gap-4">
              <Award className="w-8 h-8 text-[#DFCA9B] shrink-0 mt-1" />
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-[#DFCA9B]">
                  {t('lbl_certificate_eligible')}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  {isAr
                    ? 'عند إكمال كافة وحدات المقرر بنسبة 100% واجتياز الاختبار النهائي بنتيجة 70% فأعلى، تُصدر لك الأكاديمية شهادة إتمام رسمية موثقة برقم تحقق فريد ورمز QR.'
                    : 'Upon completing 100% of course lessons and achieving >= 70% on the final assessment, you receive an official Vitalia Academy Completion Credential.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Enrollment Box */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white rounded-xl border-2 border-[#123B70]/30 shadow-xl overflow-hidden p-6 space-y-6">
              {/* Thumbnail Preview */}
              <div className="relative rounded-lg overflow-hidden h-44 bg-gray-100 shadow-inner">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-[#123B70] flex items-center justify-center shadow-lg">
                    <PlayCircle className="w-8 h-8 fill-current" />
                  </div>
                </div>
              </div>

              {/* Price Display */}
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  {t('lbl_price')}
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  {course.priceEGP === 0 ? (
                    <span className="text-2xl font-extrabold text-emerald-700">
                      {t('lbl_free')}
                    </span>
                  ) : (
                    <>
                      <span className="text-3xl font-extrabold text-[#123B70] font-serif">
                        {course.priceEGP}
                      </span>
                      <span className="text-sm font-bold text-gray-600">
                        {t('currency_egp')}
                      </span>
                      {course.originalPriceEGP && (
                        <span className="text-xs text-gray-400 line-through ms-2">
                          {course.originalPriceEGP} {t('currency_egp')}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Main Action Button */}
              {isEnrolled ? (
                <button
                  onClick={() => onContinueLearning(course.id)}
                  className="w-full py-3.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t('btn_continue')}</span>
                </button>
              ) : (
                <button
                  onClick={() => onEnroll(course.id)}
                  className="w-full py-3.5 rounded-md bg-[#123B70] hover:bg-[#7B1E3A] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-[#DFCA9B]" />
                  <span>{course.priceEGP === 0 ? t('btn_enroll') : `${t('btn_enroll')} (${course.priceEGP} EGP)`}</span>
                </button>
              )}

              {/* Secondary Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => onToggleBookmark(course.id)}
                  className={`py-2 rounded-md border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    isBookmarked
                      ? 'bg-[#7B1E3A] text-white border-[#7B1E3A]'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span>{isBookmarked ? (isAr ? 'محفوظ' : 'Saved') : (isAr ? 'حفظ' : 'Save')}</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert(isAr ? 'تم نسخ رابط المقرر للحافظة' : 'Course URL copied to clipboard');
                  }}
                  className="py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'مشاركة' : 'Share'}</span>
                </button>
              </div>

              {/* Institutional Assurance */}
              <div className="space-y-2 pt-2 border-t border-gray-100 text-[11px] text-gray-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#123B70]" />
                  <span>{isAr ? 'ضمان استرداد الرسوم خلال 14 يوماً' : '14-Day Full Tuition Guarantee'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#B79A62]" />
                  <span>{isAr ? 'شهادة إتمام معتمدة قابلة للتحقق' : 'Verifiable Academic Credential'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
