import React, { useState } from 'react';
import { Course, Enrollment, Certificate, Assignment, AssignmentSubmission, Exam } from '../../../types';
import { useI18n } from '../../../i18n/I18nContext';
import { Logo } from '../../common/Logo';
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  FileText,
  Upload,
  Send,
  Printer,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

// ----------------------------------------------------------------------
// 1. STUDENT DASHBOARD
// ----------------------------------------------------------------------
interface StudentDashboardProps {
  studentName: string;
  enrollments: Enrollment[];
  courses: Course[];
  certificates: Certificate[];
  assignments: Assignment[];
  exams: Exam[];
  onResumeCourse: (courseId: string) => void;
  onNavigateView: (view: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  studentName,
  enrollments,
  courses,
  certificates,
  assignments,
  exams,
  onResumeCourse,
  onNavigateView,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const completedCount = enrollments.filter((e) => e.status === 'completed').length;
  const inProgressCount = enrollments.filter((e) => e.status === 'active').length;
  const totalCertificates = certificates.length;

  return (
    <div className="space-y-8 text-start">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#123B70] to-[#0B2548] text-white p-6 sm:p-8 rounded-2xl border-2 border-[#B79A62]/50 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#7B1E3A] text-white text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#DFCA9B]" />
            <span>{isAr ? 'البوابة الأكاديمية للطالب' : 'Student Scholar Portal'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            {isAr ? `مرحباً بك، ${studentName}` : `Welcome back, ${studentName}`}
          </h1>
          <p className="text-xs text-white/80 max-w-xl leading-relaxed">
            {isAr
              ? 'واصل دراسة مساقاتك المعتمدة وقدم التكليفات الأكاديمية لنيل شهادات الإتمام الرسمية.'
              : 'Continue advancing your accredited degree tracks, submit assigned laboratory tasks, and achieve verified graduation credentials.'}
          </p>
        </div>

        <button
          onClick={() => onNavigateView('my_learning')}
          className="px-5 py-2.5 bg-[#DFCA9B] hover:bg-white text-[#0B2548] font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-md shrink-0 flex items-center gap-2"
        >
          <span>{t('btn_continue')}</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'المقررات قيد الدراسة' : 'In-Progress Courses'}</span>
          <div className="text-2xl font-extrabold text-[#123B70] font-serif">{inProgressCount}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'المقررات المكتملة' : 'Completed Courses'}</span>
          <div className="text-2xl font-extrabold text-emerald-700 font-serif">{completedCount}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'الشهادات الصادرة' : 'Issued Credentials'}</span>
          <div className="text-2xl font-extrabold text-[#7B1E3A] font-serif">{totalCertificates}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'المعدل التراكمي (GPA)' : 'Academic GPA'}</span>
          <div className="text-2xl font-extrabold text-[#B79A62] font-serif">3.92 / 4.0</div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Active Courses */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h2 className="text-base font-bold text-[#123B70] font-serif">
              {t('portal_my_learning')}
            </h2>
            <button
              onClick={() => onNavigateView('my_learning')}
              className="text-xs font-semibold text-[#7B1E3A] hover:underline"
            >
              {isAr ? 'عرض الكل' : 'View all'}
            </button>
          </div>

          <div className="space-y-4">
            {enrollments.map((enr) => {
              const course = courses.find((c) => c.id === enr.courseId);
              if (!course) return null;
              return (
                <div
                  key={enr.id}
                  className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-xs flex flex-col sm:flex-row gap-5 items-center justify-between"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-20 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[#7B1E3A]">
                        {isAr ? course.categoryNameAr : course.categoryName}
                      </span>
                      <h3 className="font-bold text-xs sm:text-sm text-gray-900 truncate max-w-sm">
                        {isAr ? course.titleAr : course.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{course.lessonsCount} {t('lbl_lessons')}</span>
                        <span>•</span>
                        <span className="font-semibold text-emerald-700">{enr.progressPercentage}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-48 shrink-0 space-y-2">
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${enr.progressPercentage}%` }}
                      />
                    </div>
                    <button
                      onClick={() => onResumeCourse(course.id)}
                      className="w-full py-1.5 bg-[#123B70] hover:bg-[#7B1E3A] text-white rounded text-xs font-bold transition-colors"
                    >
                      {enr.progressPercentage >= 100 ? t('btn_completed') : t('btn_resume')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deadlines, Exams & Certificates */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Examinations */}
          <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#123B70] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#B79A62]" />
              <span>{isAr ? 'الاختبارات القادمة' : 'Upcoming Examinations'}</span>
            </h3>

            <div className="space-y-3">
              {exams.slice(0, 2).map((ex) => (
                <div key={ex.id} className="p-3 rounded-lg bg-[#F8F6F2] border border-gray-200 space-y-1">
                  <div className="text-xs font-bold text-gray-900 truncate">
                    {isAr ? ex.titleAr : ex.title}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Duration: {ex.durationMinutes} min • Passing: {ex.passingScore}%
                  </div>
                  <button
                    onClick={() => onNavigateView('exams')}
                    className="text-[11px] font-bold text-[#123B70] hover:underline block pt-1"
                  >
                    {t('btn_start_exam')} →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Issued Certificate Widget */}
          {certificates.length > 0 && (
            <div className="bg-[#0B2548] text-white p-5 rounded-xl border border-[#B79A62]/40 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#DFCA9B]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#DFCA9B]">
                  {isAr ? 'أحدث شهادة صادرة' : 'Latest Verified Credential'}
                </h3>
              </div>
              <div className="text-xs font-bold text-white truncate">
                {isAr ? certificates[0].courseTitleAr : certificates[0].courseTitle}
              </div>
              <div className="text-[11px] font-mono text-[#DFCA9B]">
                ID: {certificates[0].certificateNumber}
              </div>
              <button
                onClick={() => onNavigateView('certificates')}
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-bold transition-colors"
              >
                {t('btn_view_certificate')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 2. MY LEARNING VIEW
// ----------------------------------------------------------------------
interface MyLearningViewProps {
  enrollments: Enrollment[];
  courses: Course[];
  onResumeCourse: (courseId: string) => void;
  onExploreCourses: () => void;
}

export const MyLearningView: React.FC<MyLearningViewProps> = ({
  enrollments,
  courses,
  onResumeCourse,
  onExploreCourses,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  return (
    <div className="space-y-6 text-start">
      <div className="border-b border-[#E8E7E4] pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#123B70]">
            {t('portal_my_learning')}
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            {isAr ? 'كافة المقررات التي تم الالتحاق بها مع سجل التقدم الدراسي' : 'All enrolled courses and real-time curricular progress'}
          </p>
        </div>
        <button
          onClick={onExploreCourses}
          className="px-4 py-2 bg-[#123B70] text-white rounded-md text-xs font-bold hover:bg-[#7B1E3A] transition-colors"
        >
          {t('hero_cta_primary')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map((enr) => {
          const course = courses.find((c) => c.id === enr.courseId);
          if (!course) return null;
          return (
            <div
              key={enr.id}
              className="bg-white rounded-xl border border-[#E8E7E4] shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="relative h-40 bg-gray-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#123B70] text-white">
                    {isAr ? course.categoryNameAr : course.categoryName}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-sm text-[#123B70] line-clamp-2 leading-snug">
                    {isAr ? course.titleAr : course.title}
                  </h3>
                  <div className="text-xs text-gray-500 mt-1">
                    {isAr ? course.instructorNameAr : course.instructorName}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-emerald-700">{enr.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${enr.progressPercentage}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => onResumeCourse(course.id)}
                  className="w-full py-2 bg-[#123B70] hover:bg-[#7B1E3A] text-white rounded text-xs font-bold transition-colors"
                >
                  {enr.progressPercentage >= 100 ? t('btn_completed') : t('btn_continue')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 3. CERTIFICATES GALLERY & PREVIEW VIEW
// ----------------------------------------------------------------------
interface CertificatesViewProps {
  certificates: Certificate[];
}

export const CertificatesView: React.FC<CertificatesViewProps> = ({ certificates }) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-start">
      <div className="border-b border-[#E8E7E4] pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#123B70]">
          {t('portal_certificates')}
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          {isAr
            ? 'سجل شهادات الإتمام الرسمية الصادرة من مجلس أكاديمية فيتاليا'
            : 'Official accredited completion certificates authorized by Vitalia Academic Senate'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white p-6 rounded-xl border border-[#E8E7E4] shadow-xs hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {t('status_valid')}
                </span>
                <span className="font-mono text-xs font-bold text-[#123B70]">
                  {cert.certificateNumber}
                </span>
              </div>

              <h3 className="font-bold text-sm text-gray-900 font-serif leading-snug">
                {isAr ? cert.courseTitleAr : cert.courseTitle}
              </h3>

              <div className="text-xs text-gray-500 space-y-1">
                <div>Recipient: <span className="font-bold text-gray-800">{isAr ? cert.studentNameAr : cert.studentName}</span></div>
                <div>Issued: <span>{cert.issueDate}</span></div>
                <div>Honors: <span className="font-bold text-emerald-700">{cert.gradeAchieved}</span></div>
              </div>
            </div>

            <button
              onClick={() => setSelectedCert(cert)}
              className="w-full py-2 bg-[#123B70] hover:bg-[#7B1E3A] text-white rounded text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Award className="w-3.5 h-3.5 text-[#DFCA9B]" />
              <span>{t('btn_view_certificate')}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Official Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#F8F6F2] rounded-2xl max-w-4xl w-full p-8 sm:p-12 space-y-8 shadow-2xl border-4 border-[#B79A62] relative overflow-hidden text-center">
            {/* Academic Watermark Background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
              <Logo size="xl" variant="dark" />
            </div>

            <div className="flex items-center justify-between border-b border-[#B79A62]/30 pb-4">
              <Logo size="md" variant="dark" />
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t('btn_download_pdf')}</span>
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 rounded text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="space-y-4 py-4 relative z-10">
              <div className="text-xs uppercase tracking-widest font-bold text-[#7B1E3A]">
                {t('cert_title')}
              </div>
              <p className="text-xs text-gray-600 italic">
                {t('cert_presented_to')}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B70] font-serif tracking-wide">
                {isAr ? selectedCert.studentNameAr : selectedCert.studentName}
              </h2>
              <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                {t('cert_completion_statement')}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-[#7B1E3A] font-serif">
                "{isAr ? selectedCert.courseTitleAr : selectedCert.courseTitle}"
              </h3>
              <div className="text-xs font-bold text-emerald-800">
                {selectedCert.gradeAchieved}
              </div>
            </div>

            {/* Seal & Verification Matrix */}
            <div className="pt-6 border-t border-[#B79A62]/30 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="text-start space-y-1 text-xs">
                <div><span className="font-bold text-gray-700">{t('cert_id')}:</span> <span className="font-mono font-bold text-[#123B70]">{selectedCert.certificateNumber}</span></div>
                <div><span className="font-bold text-gray-700">{t('cert_issue_date')}:</span> <span>{selectedCert.issueDate}</span></div>
                <div className="text-[11px] text-[#7B1E3A] font-semibold">{t('cert_authorized_by')}</div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={selectedCert.qrCodeUrl}
                  alt="QR Code"
                  className="w-16 h-16 border border-gray-300 rounded p-1 bg-white"
                />
                <div className="w-16 h-16 rounded-full border-2 border-[#B79A62] bg-[#DFCA9B]/20 flex items-center justify-center text-[#B79A62] shadow-inner font-serif text-[10px] font-bold">
                  SEAL
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------
// 4. ASSIGNMENTS VIEW
// ----------------------------------------------------------------------
interface AssignmentsViewProps {
  assignments: Assignment[];
  submissions: AssignmentSubmission[];
  onSubmitAssignment: (assignmentId: string, content: string, fileName?: string) => void;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({
  assignments,
  submissions,
  onSubmitAssignment,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  const [selectedAsg, setSelectedAsg] = useState<Assignment | null>(null);
  const [submissionContent, setSubmissionContent] = useState('');
  const [submissionFile, setSubmissionFile] = useState('project_solution.py');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAsg && submissionContent.trim()) {
      onSubmitAssignment(selectedAsg.id, submissionContent.trim(), submissionFile);
      setSelectedAsg(null);
      setSubmissionContent('');
      alert(isAr ? 'تم تسليم التكليف بنجاح وإرساله للمصححين.' : 'Assignment submitted successfully to grading queue.');
    }
  };

  return (
    <div className="space-y-6 text-start">
      <div className="border-b border-[#E8E7E4] pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#123B70]">
          {t('portal_assignments')}
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          {isAr ? 'التكليفات والمهام المعملية الخاضعة للتصحيح الأكاديمي' : 'Laboratory benchmarks and faculty-reviewed coursework'}
        </p>
      </div>

      <div className="space-y-4">
        {assignments.map((asg) => {
          const sub = submissions.find((s) => s.assignmentId === asg.id);
          return (
            <div
              key={asg.id}
              className="bg-white p-6 rounded-xl border border-[#E8E7E4] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#123B70]/10 text-[#123B70]">
                    {isAr ? asg.courseNameAr : asg.courseName}
                  </span>
                  <span className="text-xs text-gray-500">• Due: {asg.dueDate}</span>
                </div>
                <h3 className="font-bold text-sm text-[#252A34]">
                  {isAr ? asg.titleAr : asg.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {isAr ? asg.instructionsAr : asg.instructions}
                </p>
              </div>

              <div className="shrink-0 space-y-2 text-end">
                {sub ? (
                  <div className="space-y-1">
                    <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold block">
                      {sub.status === 'graded' ? `Graded: ${sub.grade}/${asg.maxPoints}` : 'Submitted'}
                    </span>
                    {sub.feedback && (
                      <div className="text-[11px] text-gray-500 max-w-xs italic text-start">
                        "{sub.feedback}"
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedAsg(asg)}
                    className="px-5 py-2 bg-[#123B70] hover:bg-[#7B1E3A] text-white rounded text-xs font-bold transition-colors shadow-xs"
                  >
                    {isAr ? 'تسليم الحل البرمجي' : 'Submit Solution'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {selectedAsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-200">
            <h3 className="text-base font-bold text-[#123B70]">
              {isAr ? 'تسليم الواجب الأكاديمي' : 'Submit Coursework Solution'}
            </h3>
            <p className="text-xs text-gray-600">
              {isAr ? selectedAsg.titleAr : selectedAsg.title}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  {isAr ? 'الكود أو الشرح النصي' : 'Source Code / Written Response'} *
                </label>
                <textarea
                  rows={5}
                  required
                  value={submissionContent}
                  onChange={(e) => setSubmissionContent(e.target.value)}
                  placeholder="Paste Python code or analysis..."
                  className="w-full text-xs p-3 font-mono border border-gray-300 rounded-md focus:ring-1 focus:ring-[#123B70]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  {isAr ? 'الملف المرفق (محاكاة)' : 'Simulated File Attachment'}
                </label>
                <input
                  type="text"
                  value={submissionFile}
                  onChange={(e) => setSubmissionFile(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAsg(null)}
                  className="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md"
                >
                  {t('btn_cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#123B70] text-white text-xs font-bold rounded-md hover:bg-[#7B1E3A]"
                >
                  {t('btn_submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
