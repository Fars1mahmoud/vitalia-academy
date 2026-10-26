import React, { useState } from 'react';
import { Course, Lesson, Enrollment } from '../../../types';
import { useI18n } from '../../../i18n/I18nContext';
import {
  X,
  PlayCircle,
  FileText,
  HelpCircle,
  CheckCircle,
  Download,
  Award,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  BookOpen,
  Send,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CoursePlayerModalProps {
  course: Course;
  enrollment?: Enrollment;
  onClose: () => void;
  onMarkLessonComplete: (courseId: string, lessonId: string) => void;
  onOpenExam?: (examId: string) => void;
  onViewCertificates?: () => void;
}

export const CoursePlayerModal: React.FC<CoursePlayerModalProps> = ({
  course,
  enrollment,
  onClose,
  onMarkLessonComplete,
  onOpenExam,
  onViewCertificates,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const allLessons: Lesson[] = course.modules.flatMap((m) => m.lessons);
  const initialLesson =
    allLessons.find((l) => l.id === enrollment?.lastAccessedLessonId) ||
    allLessons[0] || {
      id: 'default',
      title: 'Course Introduction',
      titleAr: 'مقدمة المساق الأكاديمي',
      durationMinutes: 15,
      type: 'video',
      content: 'Welcome to this academic masterclass. Follow along through the structured syllabus.',
    };

  const [activeLesson, setActiveLesson] = useState<Lesson>(initialLesson);
  const [activeTab, setActiveTab] = useState<'content' | 'notes' | 'qa' | 'resources'>('content');
  const [personalNote, setPersonalNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<string[]>([
    'Review attention scaling factor derivation in Section 1.2 before midterm.',
  ]);
  const [questions, setQuestions] = useState([
    {
      id: 'q-1',
      author: 'Karim Mansour',
      text: 'Does scaling by sqrt(d_k) completely solve vanishing gradients at extreme sequence lengths?',
      answer: 'Dr. Tariq: It normalizes the variance of the dot product to 1, preventing softmax saturation.',
    },
  ]);
  const [newQuestionText, setNewQuestionText] = useState('');

  const completedLessonIds = enrollment?.completedLessonIds || [];
  const isLessonCompleted = completedLessonIds.includes(activeLesson.id);

  const handleCompleteCurrent = () => {
    onMarkLessonComplete(course.id, activeLesson.id);
    // If completing this achieves 100%, trigger celebration!
    if (completedLessonIds.length + 1 >= allLessons.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleSaveNote = () => {
    if (personalNote.trim()) {
      setSavedNotes([...savedNotes, personalNote.trim()]);
      setPersonalNote('');
    }
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestionText.trim()) {
      setQuestions([
        ...questions,
        {
          id: `q-${Date.now()}`,
          author: 'Karim Mansour',
          text: newQuestionText.trim(),
          answer: 'Question submitted to faculty queue for academic review.',
        },
      ]);
      setNewQuestionText('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#F8F6F2] rounded-2xl w-full max-w-7xl h-[94vh] flex flex-col overflow-hidden shadow-2xl border border-[#B79A62]/40">
        {/* Top Player Header */}
        <div className="h-14 bg-[#0B2548] text-white px-4 sm:px-6 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3 truncate">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#7B1E3A] uppercase">
              {isAr ? 'قاعة المحاضرات الرقمية' : 'Academic Lecture Hall'}
            </span>
            <h2 className="text-xs sm:text-sm font-bold text-white truncate font-serif">
              {isAr ? course.titleAr : course.title}
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {enrollment && enrollment.progressPercentage >= 100 && (
              <button
                onClick={onViewCertificates}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#DFCA9B] text-[#0B2548] font-bold text-xs shadow-xs animate-pulse"
              >
                <Award className="w-3.5 h-3.5" />
                <span>{isAr ? 'عرض الشهادة المعتمدة' : 'Claim Credential'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10"
              aria-label="Close Course Player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Player Body Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Main Video & Content Canvas (8 cols) */}
          <div className="lg:col-span-8 flex flex-col bg-white overflow-y-auto">
            {/* Video Player Area */}
            <div className="bg-black relative aspect-video w-full flex items-center justify-center shrink-0">
              {activeLesson.videoUrl ? (
                <iframe
                  src={activeLesson.videoUrl}
                  title={activeLesson.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="text-center p-8 space-y-3">
                  <PlayCircle className="w-16 h-16 text-[#DFCA9B] mx-auto opacity-80" />
                  <div className="text-white text-sm font-bold">
                    {isAr ? activeLesson.titleAr : activeLesson.title}
                  </div>
                  <div className="text-xs text-white/60">
                    {isAr ? 'محاضرة مرئية أكاديمية مسجلة بدقة عالية' : 'High-definition university lecture session'}
                  </div>
                </div>
              )}
            </div>

            {/* Lesson Control & Completion Bar */}
            <div className="p-4 bg-[#F8F6F2] border-b border-[#E8E7E4] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-start">
                <span className="text-[10px] uppercase font-bold text-[#7B1E3A]">Current Topic</span>
                <h3 className="font-bold text-sm text-[#123B70]">
                  {isAr ? activeLesson.titleAr : activeLesson.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCompleteCurrent}
                  className={`px-4 py-2 rounded-md font-bold text-xs flex items-center gap-1.5 transition-colors ${
                    isLessonCompleted
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-[#123B70] hover:bg-[#7B1E3A] text-white shadow-xs'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isLessonCompleted ? t('btn_completed') : t('btn_mark_complete')}</span>
                </button>
              </div>
            </div>

            {/* Bottom Tabs: Content, Notes, Q&A */}
            <div className="flex-1 p-6 space-y-4 text-start">
              <div className="flex items-center gap-4 border-b border-gray-200 pb-2 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('content')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'content'
                      ? 'border-[#123B70] text-[#123B70]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {isAr ? 'الشرح والملخص الأكاديمي' : 'Lesson Overview'}
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'notes'
                      ? 'border-[#123B70] text-[#123B70]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {isAr ? 'ملاحظاتي الدراسية' : 'My Study Notes'}
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'qa'
                      ? 'border-[#123B70] text-[#123B70]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {isAr ? 'أسئلة ونقاشات المحاضرة' : 'Q&A Forum'}
                </button>
              </div>

              {activeTab === 'content' && (
                <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
                  <p>
                    {isAr
                      ? (activeLesson.contentAr || 'يقدم هذا الدرس تحليلاً معمقاً للمفاهيم الأساسية، مع أمثلة عملية وشروح برمجية وافية.')
                      : (activeLesson.content || 'This lecture delves deeply into foundational theory with applied benchmarks and architectural analysis.')}
                  </p>
                  <div className="p-4 bg-[#F8F6F2] rounded-lg border border-gray-200 space-y-2">
                    <span className="font-bold text-[#123B70] text-xs">
                      {isAr ? 'المراجع والمرفقات الإضافية' : 'Downloadable Lesson Resources'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-[11px] font-semibold text-gray-700 hover:bg-gray-100 flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5 text-[#123B70]" />
                        <span>lecture_slides.pdf (3.4 MB)</span>
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-[11px] font-semibold text-gray-700 hover:bg-gray-100 flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5 text-[#123B70]" />
                        <span>source_code_lab.py (18 KB)</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      value={personalNote}
                      onChange={(e) => setPersonalNote(e.target.value)}
                      placeholder={isAr ? 'اكتب ملاحظتك الأكاديمية الخاصة بهذا الدرس...' : 'Type personal notes for this lesson...'}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#123B70]"
                    />
                    <button
                      onClick={handleSaveNote}
                      className="px-4 py-1.5 bg-[#123B70] text-white rounded text-xs font-bold"
                    >
                      {t('btn_save')}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold text-gray-700 text-xs">Saved Notes:</span>
                    {savedNotes.map((n, i) => (
                      <div key={i} className="p-3 bg-amber-50/70 border border-amber-200 rounded-md text-gray-800">
                        {n}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'qa' && (
                <div className="space-y-4 text-xs">
                  <form onSubmit={handlePostQuestion} className="space-y-2">
                    <input
                      type="text"
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      placeholder={isAr ? 'اطرح سؤالاً على الأستاذ والمشرفين...' : 'Ask the instructor or teaching assistant...'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#123B70] text-white rounded text-xs font-bold flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t('btn_submit')}</span>
                    </button>
                  </form>

                  <div className="space-y-3">
                    {questions.map((q) => (
                      <div key={q.id} className="p-3 bg-[#F8F6F2] rounded-lg border border-gray-200 space-y-1.5">
                        <div className="font-bold text-[#123B70]">{q.author}</div>
                        <div className="text-gray-800 font-medium">{q.text}</div>
                        <div className="p-2 bg-white rounded border border-gray-200 text-gray-600 text-[11px] mt-1">
                          {q.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Curriculum Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-[#F8F6F2] border-s border-[#E8E7E4] flex flex-col overflow-hidden text-start">
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between text-xs font-bold text-[#123B70]">
                <span>{t('lbl_curriculum')}</span>
                <span className="text-emerald-700">
                  {enrollment ? `${enrollment.progressPercentage}% Completed` : '0%'}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full transition-all duration-500"
                  style={{ width: `${enrollment?.progressPercentage || 0}%` }}
                />
              </div>
            </div>

            {/* Module Accordions */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
              {course.modules.map((mod) => (
                <div key={mod.id} className="bg-white">
                  <div className="p-3 bg-gray-50 border-b border-gray-100 font-bold text-xs text-[#123B70]">
                    {isAr ? mod.titleAr : mod.title}
                  </div>
                  <div className="divide-y divide-gray-100">
                    {mod.lessons.map((les) => {
                      const isActive = activeLesson.id === les.id;
                      const isDone = completedLessonIds.includes(les.id);
                      return (
                        <button
                          key={les.id}
                          onClick={() => setActiveLesson(les)}
                          className={`w-full p-3 text-start flex items-center justify-between transition-colors text-xs ${
                            isActive
                              ? 'bg-[#123B70]/10 font-bold text-[#123B70] border-s-4 border-[#123B70]'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {isDone ? (
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : les.type === 'video' ? (
                              <PlayCircle className="w-4 h-4 text-gray-400 shrink-0" />
                            ) : (
                              <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                            )}
                            <span className="truncate">{isAr ? les.titleAr : les.title}</span>
                          </div>
                          <span className="text-[10px] text-gray-400 shrink-0 ms-2">
                            {les.durationMinutes}m
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Course Exam Link */}
            {course.examId && (
              <div className="p-4 bg-white border-t border-gray-200">
                <button
                  onClick={() => onOpenExam && onOpenExam(course.examId!)}
                  className="w-full py-2.5 bg-[#7B1E3A] hover:bg-[#60142B] text-white rounded-md text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Award className="w-4 h-4 text-[#DFCA9B]" />
                  <span>{t('btn_start_exam')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
