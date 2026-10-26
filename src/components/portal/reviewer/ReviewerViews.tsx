import React, { useState } from 'react';
import { Course } from '../../../types';
import { useI18n } from '../../../i18n/I18nContext';
import {
  Eye,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ClipboardList,
  Check,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ReviewerViewsProps {
  courses: Course[];
  onApproveCourse: (courseId: string) => void;
  onRequestChanges: (courseId: string, notes: string) => void;
  onRejectCourse: (courseId: string, reason: string) => void;
}

export const ReviewerDashboard: React.FC<ReviewerViewsProps> = ({
  courses,
  onApproveCourse,
  onRequestChanges,
  onRejectCourse,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  const pendingCourses = courses.filter((c) => c.status === 'pending_review' || c.status === 'draft');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [checklist, setChecklist] = useState({
    objectives: true,
    completeness: true,
    accessibility: true,
    assessment: true,
    citations: true,
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist({ ...checklist, [key]: !checklist[key] });
  };

  const handleApprove = () => {
    if (selectedCourse) {
      onApproveCourse(selectedCourse.id);
      setSelectedCourse(null);
      alert(isAr ? 'تم اعتماد ونشر المقرر رسمياً في دليل الأكاديمية.' : 'Course officially approved and published.');
    }
  };

  const handleRequestChanges = () => {
    if (selectedCourse) {
      onRequestChanges(selectedCourse.id, reviewNotes || 'Minor revisions requested.');
      setSelectedCourse(null);
      alert(isAr ? 'تم إرسال طلب التعديلات للأستاذ المحاضر.' : 'Revision requests dispatched to faculty.');
    }
  };

  return (
    <div className="space-y-8 text-start">
      <div className="border-b border-[#E8E7E4] pb-4">
        <span className="text-xs font-bold text-[#7B1E3A] uppercase tracking-wider">
          {isAr ? 'مجلس الجودة والاعتماد الأكاديمي' : 'Academic Quality & Accreditation Senate'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#123B70] mt-1">
          {t('portal_reviewer_pending')}
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          {isAr ? 'مراجعة المناهج والتحقق من التوافق مع المعايير الجامعية قبل النشر' : 'Curricular audit and compliance verification prior to public academy deployment'}
        </p>
      </div>

      {/* Review Queue */}
      <div className="space-y-4">
        {pendingCourses.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-gray-200 text-gray-500 text-xs">
            {isAr ? 'لا توجد مقررات بانتظار المراجعة الأكاديمية حالياً' : 'No courses currently pending quality review.'}
          </div>
        ) : (
          pendingCourses.map((c) => (
            <div
              key={c.id}
              className="bg-white p-6 rounded-xl border border-[#E8E7E4] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-900">
                    {c.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-gray-500">• Lead: {c.instructorName}</span>
                </div>
                <h3 className="text-base font-bold text-[#123B70] font-serif">
                  {isAr ? c.titleAr : c.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {isAr ? c.subtitleAr : c.subtitle}
                </p>
                <div className="text-xs text-gray-500 flex gap-4 pt-1">
                  <span>{c.modules.length} Modules</span>
                  <span>•</span>
                  <span>{c.durationHours} Hours</span>
                  <span>•</span>
                  <span>Tuition: {c.priceEGP} {t('currency_egp')}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCourse(c)}
                className="px-5 py-2.5 bg-[#123B70] hover:bg-[#7B1E3A] text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-sm"
              >
                {isAr ? 'بدء تدقيق الجودة' : 'Audit Curriculum'}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Audit Checklist Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 pb-3">
              <span className="text-xs font-bold text-[#7B1E3A] uppercase tracking-wider">
                Auditing Curriculum
              </span>
              <h3 className="text-lg font-bold text-[#123B70] font-serif mt-1">
                {isAr ? selectedCourse.titleAr : selectedCourse.title}
              </h3>
              <p className="text-xs text-gray-500">Instructor: {selectedCourse.instructorName}</p>
            </div>

            {/* Quality Rubric Checklist */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-700 uppercase block">
                Quality Criteria & Academic Rubric:
              </span>

              <div className="space-y-2 text-xs">
                {[
                  { key: 'objectives' as const, label: 'Clear measurable learning outcomes & Bloom taxonomy alignment' },
                  { key: 'completeness' as const, label: 'Syllabus module completeness & all video/reading assets linked' },
                  { key: 'accessibility' as const, label: 'Bilingual translation accuracy & terminology parity' },
                  { key: 'assessment' as const, label: 'Exam and assignment rigor meets university accreditation standards' },
                  { key: 'citations' as const, label: 'Academic integrity and proper attribution of referenced research' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggleCheck(item.key)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 text-start hover:bg-gray-50 transition-colors"
                  >
                    <span
                      className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                        checklist[item.key]
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {checklist[item.key] && '✓'}
                    </span>
                    <span className="text-gray-800">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Auditor Comments & Feedback to Faculty
              </label>
              <textarea
                rows={3}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Specify required additions or congratulations..."
                className="w-full text-xs p-2.5 border border-gray-300 rounded-md"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 justify-end pt-3 border-t border-gray-100">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                {t('btn_cancel')}
              </button>
              <button
                onClick={handleRequestChanges}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold"
              >
                {isAr ? 'طلب تعديلات' : 'Request Changes'}
              </button>
              <button
                onClick={handleApprove}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold"
              >
                {isAr ? 'اعتماد ونشر المقرر' : 'Approve & Publish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
