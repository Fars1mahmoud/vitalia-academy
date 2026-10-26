import React, { useState, useEffect } from 'react';
import { Exam, Question, ExamAttempt } from '../../../types';
import { useI18n } from '../../../i18n/I18nContext';
import { calculateExamScore, formatTimeRemaining } from '../../../services/examService';
import {
  FileSpreadsheet,
  Clock,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  X,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface ExamsViewProps {
  exams: Exam[];
  selectedExamId?: string;
  onRecordAttempt?: (attempt: ExamAttempt) => void;
}

export const ExamsView: React.FC<ExamsViewProps> = ({
  exams,
  selectedExamId,
  onRecordAttempt,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [activeExam, setActiveExam] = useState<Exam | null>(() => {
    return exams.find((e) => e.id === selectedExamId) || null;
  });
  const [isTakingExam, setIsTakingExam] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [flaggedQuestionIds, setFlaggedQuestionIds] = useState<string[]>([]);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(0);
  const [examResult, setExamResult] = useState<any | null>(null);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (!isTakingExam || timeRemainingSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTakingExam, timeRemainingSeconds]);

  const handleStartExam = (exam: Exam) => {
    setActiveExam(exam);
    setIsTakingExam(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFlaggedQuestionIds([]);
    setTimeRemainingSeconds(exam.durationMinutes * 60);
    setExamResult(null);
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleToggleMultiSelectOption = (questionId: string, optionId: string) => {
    const current = (answers[questionId] as string[]) || [];
    const next = current.includes(optionId)
      ? current.filter((id) => id !== optionId)
      : [...current, optionId];
    setAnswers((prev) => ({ ...prev, [questionId]: next }));
  };

  const handleTextAnswerChange = (questionId: string, text: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: text }));
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestionIds((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleFinalSubmit = () => {
    if (!activeExam) return;
    const scoreResult = calculateExamScore(
      activeExam.questions,
      answers,
      activeExam.passingScore
    );
    setExamResult(scoreResult);
    setIsTakingExam(false);
    setShowSubmitConfirm(false);

    if (onRecordAttempt) {
      onRecordAttempt({
        id: `att-${Date.now()}`,
        examId: activeExam.id,
        userId: 'current-user',
        userName: 'Current Student',
        startedAt: new Date().toISOString(),
        submittedAt: new Date().toISOString(),
        answers,
        score: scoreResult.earnedPoints,
        maxScore: scoreResult.maxPoints,
        percentage: scoreResult.percentage,
        passed: scoreResult.passed,
        reviewed: !scoreResult.hasManualGradingPending,
        attemptNumber: 1,
      });
    }
  };

  // 1. Exam Result View
  if (examResult && activeExam) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 text-start animate-in fade-in duration-300">
        <div
          className={`p-8 rounded-2xl border-2 shadow-xl ${
            examResult.passed
              ? 'bg-emerald-50/70 border-emerald-500 text-emerald-900'
              : 'bg-rose-50/70 border-rose-400 text-rose-900'
          }`}
        >
          <div className="flex items-center justify-between pb-6 border-b border-black/10">
            <div>
              <div className="text-xs uppercase font-bold tracking-wider opacity-80">
                {isAr ? 'النتيجة الرسمية للاختبار' : 'Official Examination Assessment'}
              </div>
              <h2 className="text-2xl font-bold font-serif mt-1">
                {isAr ? activeExam.titleAr : activeExam.title}
              </h2>
            </div>
            <div className="text-end">
              <div className="text-3xl font-extrabold font-serif">
                {examResult.percentage}%
              </div>
              <div className="text-xs font-semibold">
                {examResult.earnedPoints} / {examResult.maxPoints} pts
              </div>
            </div>
          </div>

          <div className="py-6 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold">
              {examResult.passed ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{t('exam_passed')}</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  <span>{t('exam_failed')}</span>
                </>
              )}
            </div>
            <p className="text-xs opacity-90 leading-relaxed">
              {examResult.passed
                ? (isAr
                    ? 'لقد حققت الحد الأدنى لدرجة الاجتياز الأكاديمية بنجاح. تم تسجيل النتيجة في سجلك الأكاديمي.'
                    : 'You successfully cleared the required passing score. This milestone has been updated on your academic transcript.')
                : (isAr
                    ? `درجة الاجتياز المطلوبة هي ${activeExam.passingScore}%. يمكنك مراجعة الوحدات التعليمية وإعادة الاختبار.`
                    : `The minimum passing threshold is ${activeExam.passingScore}%. You may review the syllabus and retake the assessment.`)}
            </p>

            {examResult.hasManualGradingPending && (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-amber-900 text-xs flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  {isAr
                    ? 'يتضمن الاختبار أسئلة مقالية تخضع حالياً لمراجعة وتصحيح هيئة التدريس.'
                    : 'This exam contains essay questions currently queued for manual grading by faculty.'}
                </span>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-black/10 flex justify-between items-center">
            <button
              onClick={() => handleStartExam(activeExam)}
              className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-800 text-xs font-bold hover:bg-gray-50 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isAr ? 'إعادة الاختبار التجريبي' : 'Retake Exam'}</span>
            </button>

            <button
              onClick={() => {
                setExamResult(null);
                setActiveExam(null);
              }}
              className="px-5 py-2 rounded-md bg-[#123B70] text-white text-xs font-bold hover:bg-[#7B1E3A] transition-colors"
            >
              {isAr ? 'العودة لقائمة الاختبارات' : 'Back to Exams'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Active Exam Taking Interface
  if (isTakingExam && activeExam) {
    const currentQ = activeExam.questions[currentQuestionIndex];
    const totalQ = activeExam.questions.length;
    const isFlagged = flaggedQuestionIds.includes(currentQ.id);
    const answeredCount = Object.keys(answers).filter((k) => {
      const v = answers[k];
      return Array.isArray(v) ? v.length > 0 : Boolean(v);
    }).length;

    return (
      <div className="max-w-4xl mx-auto space-y-6 text-start">
        {/* Top Sticky Status Bar */}
        <div className="bg-[#0B2548] text-white p-4 rounded-xl shadow-lg border border-[#B79A62]/30 flex flex-wrap items-center justify-between gap-4 sticky top-18 z-20">
          <div>
            <div className="text-[10px] text-[#DFCA9B] uppercase font-bold tracking-wider">
              {isAr ? 'جلسة الاختبار الرسمية' : 'Live Examination Session'}
            </div>
            <h3 className="text-sm font-bold text-white truncate max-w-sm">
              {isAr ? activeExam.titleAr : activeExam.title}
            </h3>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-[#B79A62]/40 text-xs font-mono font-bold text-[#DFCA9B]">
            <Clock className="w-4 h-4 text-[#DFCA9B]" />
            <span>{formatTimeRemaining(timeRemainingSeconds)}</span>
          </div>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-4 py-1.5 bg-[#7B1E3A] hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm"
          >
            {t('btn_submit_exam')}
          </button>
        </div>

        {/* Question Navigator Bubble Strip */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-700">
            <span>
              {isAr ? 'مستعرض الأسئلة' : 'Question Navigator'} ({answeredCount}/{totalQ} Answered)
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeExam.questions.map((q, idx) => {
              const ans = answers[q.id];
              const isAns = Array.isArray(ans) ? ans.length > 0 : Boolean(ans);
              const isFlg = flaggedQuestionIds.includes(q.id);
              const isCur = idx === currentQuestionIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-8 h-8 rounded-md text-xs font-bold flex items-center justify-center transition-all ${
                    isCur
                      ? 'ring-2 ring-[#123B70] bg-[#123B70] text-white'
                      : isFlg
                      ? 'bg-amber-100 text-amber-900 border border-amber-400'
                      : isAns
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Question Canvas */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#123B70]">
              {t('exam_question')} {currentQuestionIndex + 1} {t('exam_of')} {totalQ} •{' '}
              <span className="text-gray-500 font-normal">{currentQ.points} points</span>
            </span>
            <button
              onClick={() => toggleFlag(currentQ.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                isFlagged
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-600' : ''}`} />
              <span>{t('exam_mark_review')}</span>
            </button>
          </div>

          {/* Question Prompt */}
          <div className="text-sm sm:text-base font-bold text-gray-900 leading-relaxed">
            {isAr ? currentQ.promptAr : currentQ.prompt}
          </div>

          {/* Answer Input Renderers */}
          {(currentQ.type === 'multiple_choice' || currentQ.type === 'true_false') && currentQ.options && (
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(currentQ.id, opt.id)}
                    className={`w-full p-4 rounded-xl border text-start flex items-center gap-3 transition-all text-xs sm:text-sm ${
                      isSelected
                        ? 'border-[#123B70] bg-[#123B70]/5 font-bold text-[#123B70] shadow-xs ring-1 ring-[#123B70]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-800'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-xs ${
                        isSelected
                          ? 'border-[#123B70] bg-[#123B70] text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {isSelected && '✓'}
                    </span>
                    <span>{isAr ? opt.textAr : opt.text}</span>
                  </button>
                );
              })}
            </div>
          )}

          {currentQ.type === 'multiple_select' && currentQ.options && (
            <div className="space-y-2.5">
              <span className="text-[11px] text-gray-500 block font-semibold">
                {isAr ? '(اختر كافة الإجابات الصحيحة)' : '(Select all that apply)'}
              </span>
              {currentQ.options.map((opt) => {
                const isSelected = ((answers[currentQ.id] as string[]) || []).includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleToggleMultiSelectOption(currentQ.id, opt.id)}
                    className={`w-full p-4 rounded-xl border text-start flex items-center gap-3 transition-all text-xs sm:text-sm ${
                      isSelected
                        ? 'border-[#123B70] bg-[#123B70]/5 font-bold text-[#123B70] ring-1 ring-[#123B70]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-800'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 text-xs ${
                        isSelected
                          ? 'border-[#123B70] bg-[#123B70] text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && '✓'}
                    </span>
                    <span>{isAr ? opt.textAr : opt.text}</span>
                  </button>
                );
              })}
            </div>
          )}

          {currentQ.type === 'short_answer' && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700">
                {isAr ? 'إجابتك المختصرة:' : 'Your Answer:'}
              </label>
              <input
                type="text"
                value={answers[currentQ.id] || ''}
                onChange={(e) => handleTextAnswerChange(currentQ.id, e.target.value)}
                placeholder={isAr ? 'اكتب إجابتك هنا...' : 'Type answer here...'}
                className="w-full text-xs sm:text-sm p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#123B70]"
              />
            </div>
          )}

          {currentQ.type === 'essay' && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700">
                {isAr ? 'الإجابة المقالية الأكاديمية:' : 'Scholarly Essay Response:'}
              </label>
              <textarea
                rows={6}
                value={answers[currentQ.id] || ''}
                onChange={(e) => handleTextAnswerChange(currentQ.id, e.target.value)}
                placeholder={isAr ? 'اكتب تحليلك الأكاديمي المفصل...' : 'Formulate your comprehensive response...'}
                className="w-full text-xs sm:text-sm p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#123B70]"
              />
              <span className="text-[11px] text-gray-500 italic">
                {isAr ? 'ملاحظة: هذا السؤال يخضع للتقييم اليدوي من الأستاذ.' : 'Note: Essay questions are reviewed by university grading assistants.'}
              </span>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((i) => Math.max(0, i - 1))}
              className="px-4 py-2 border border-gray-300 rounded-md text-xs font-semibold disabled:opacity-30 hover:bg-gray-50 flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{t('btn_previous')}</span>
            </button>

            {currentQuestionIndex < totalQ - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex((i) => Math.min(totalQ - 1, i + 1))}
                className="px-5 py-2 bg-[#123B70] text-white rounded-md text-xs font-semibold hover:bg-[#7B1E3A] transition-colors flex items-center gap-1.5"
              >
                <span>{t('btn_next')}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            ) : (
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="px-6 py-2 bg-[#7B1E3A] hover:bg-rose-700 text-white rounded-md text-xs font-bold uppercase tracking-wider"
              >
                {t('btn_submit_exam')}
              </button>
            )}
          </div>
        </div>

        {/* Submit Confirmation Dialog Modal */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-200">
              <h4 className="text-base font-bold text-[#123B70]">
                {isAr ? 'تأكيد تسليم الاختبار النهائي' : 'Confirm Examination Submission'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isAr
                  ? `لقد أجبت على ${answeredCount} من أصل ${totalQ} أسئلة. هل أنت متأكد من رغبتك في تسليم الاختبار الآن؟`
                  : `You have answered ${answeredCount} of ${totalQ} questions. Are you ready to submit your answers for evaluation?`}
              </p>
              <div className="flex gap-2 justify-end pt-3">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  {t('btn_cancel')}
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="px-5 py-2 rounded-md bg-[#7B1E3A] text-white text-xs font-bold hover:bg-rose-700"
                >
                  {isAr ? 'تأكيد التسليم' : 'Submit Answers'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. Exams List
  return (
    <div className="space-y-6 text-start">
      <div className="border-b border-[#E8E7E4] pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#123B70]">
          {t('portal_exams')}
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          {isAr
            ? 'الاختبارات الأكاديمية الرسمية المعتمدة للمقررات الملتحق بها'
            : 'Accredited examinations and assessments required for course certification'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white p-6 rounded-xl border border-[#E8E7E4] hover:border-[#123B70]/40 shadow-xs flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-[#123B70]/10 text-[#123B70] text-[10px] font-bold uppercase tracking-wider">
                  {isAr ? exam.courseNameAr : exam.courseName}
                </span>
                <span className="text-xs font-mono font-bold text-gray-500">
                  {exam.totalPoints} pts
                </span>
              </div>

              <h3 className="font-bold text-base text-[#252A34] font-serif leading-snug">
                {isAr ? exam.titleAr : exam.title}
              </h3>

              <p className="text-xs text-gray-600 line-clamp-2">
                {isAr ? exam.descriptionAr : exam.description}
              </p>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  {exam.durationMinutes} min
                </span>
                <span>•</span>
                <span>{exam.questions.length} Questions</span>
                <span>•</span>
                <span className="font-semibold text-emerald-700">
                  Pass: {exam.passingScore}%
                </span>
              </div>
            </div>

            <button
              onClick={() => handleStartExam(exam)}
              className="w-full py-2.5 bg-[#123B70] hover:bg-[#7B1E3A] text-white rounded-md text-xs font-bold transition-colors shadow-xs"
            >
              {t('btn_start_exam')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
