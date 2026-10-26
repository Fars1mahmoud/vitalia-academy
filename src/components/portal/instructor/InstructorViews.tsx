import React, { useState } from 'react';
import { Course, CourseModule, Lesson, AssignmentSubmission, Question, User } from '../../../types';
import { useI18n } from '../../../i18n/I18nContext';
import { CATEGORIES, INITIAL_USERS } from '../../../services/mockData';
import {
  BarChart3,
  BookOpen,
  PlusCircle,
  Users,
  CheckSquare,
  Database,
  DollarSign,
  TrendingUp,
  Clock,
  Sparkles,
  Award,
  Trash2,
  Edit2,
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Search,
} from 'lucide-react';

// ----------------------------------------------------------------------
// 1. INSTRUCTOR DASHBOARD
// ----------------------------------------------------------------------
interface InstructorDashboardProps {
  instructor: User;
  courses: Course[];
  submissions: AssignmentSubmission[];
  onCreateCourseClick: () => void;
  onNavigateGrading: () => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  instructor,
  courses,
  submissions,
  onCreateCourseClick,
  onNavigateGrading,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  const myCourses = courses.filter((c) => c.instructorId === instructor.id || c.instructorName === instructor.name);
  const totalStudents = myCourses.reduce((sum, c) => sum + c.enrolledCount, 0);
  const pendingGradingCount = submissions.filter((s) => s.status === 'submitted').length;

  return (
    <div className="space-y-8 text-start">
      {/* Top Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E7E4] pb-6">
        <div>
          <span className="text-xs font-bold text-[#7B1E3A] uppercase tracking-wider">
            {isAr ? 'منصة أعضاء هيئة التدريس والأساتذة' : 'Faculty Academic Workspace'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#123B70] mt-1">
            {isAr ? `لوحة التحكم: ${instructor.nameAr || instructor.name}` : `Instructor Dashboard: ${instructor.name}`}
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            {instructor.title || 'Professor of Artificial Intelligence & Machine Learning'}
          </p>
        </div>

        <button
          onClick={onCreateCourseClick}
          className="px-5 py-2.5 bg-[#123B70] hover:bg-[#7B1E3A] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-md flex items-center gap-2 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-[#DFCA9B]" />
          <span>{isAr ? 'إنشاء مساق أكاديمي جديد' : 'New Academic Masterclass'}</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'إجمالي الطلاب المسجلين' : 'Total Active Scholars'}</span>
          <div className="text-2xl font-extrabold text-[#123B70] font-serif">{totalStudents.toLocaleString()}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'المقررات النشطة' : 'Active Curricula'}</span>
          <div className="text-2xl font-extrabold text-emerald-700 font-serif">{myCourses.length}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'واجبات بانتظار التصحيح' : 'Pending Grading Queue'}</span>
          <div className="text-2xl font-extrabold text-[#7B1E3A] font-serif">{pendingGradingCount}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'متوسط تقييم المحاضر' : 'Instructor Rating'}</span>
          <div className="text-2xl font-extrabold text-[#B79A62] font-serif">4.92 / 5.0</div>
        </div>
      </div>

      {/* Course Management & Grading Queue Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: My Courses */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h2 className="text-base font-bold text-[#123B70] font-serif">
              {t('portal_instructor_courses')}
            </h2>
            <span className="text-xs text-gray-500">{myCourses.length} Curricula</span>
          </div>

          <div className="space-y-4">
            {myCourses.map((c) => (
              <div
                key={c.id}
                className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    className="w-20 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                      {c.status}
                    </span>
                    <h3 className="font-bold text-xs sm:text-sm text-gray-900 truncate max-w-sm">
                      {isAr ? c.titleAr : c.title}
                    </h3>
                    <div className="text-xs text-gray-500">
                      {c.enrolledCount} Scholars • {c.durationHours} Hours • {c.priceEGP} {t('currency_egp')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button className="px-3 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                    {isAr ? 'تعديل المحتوى' : 'Edit Syllabus'}
                  </button>
                  <button className="px-3 py-1.5 rounded bg-[#123B70] text-white text-xs font-semibold hover:bg-[#7B1E3A]">
                    {isAr ? 'تحليلات الأداء' : 'Analytics'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Submissions Awaiting Grading */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h2 className="text-base font-bold text-[#123B70] font-serif">
              {t('portal_grading')}
            </h2>
            <button
              onClick={onNavigateGrading}
              className="text-xs font-semibold text-[#7B1E3A] hover:underline"
            >
              {isAr ? 'فتح القائمة' : 'Open Queue'}
            </button>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-xs space-y-3">
            {submissions.map((sub) => (
              <div key={sub.id} className="p-3 bg-[#F8F6F2] rounded-lg border border-gray-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#123B70]">{sub.studentName}</span>
                  <span className="text-[10px] text-gray-500">{sub.submittedAt}</span>
                </div>
                <div className="text-xs text-gray-700 truncate font-medium">
                  {sub.assignmentTitle}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                    {sub.status}
                  </span>
                  <button
                    onClick={onNavigateGrading}
                    className="text-xs font-bold text-[#123B70] hover:underline"
                  >
                    {isAr ? 'تقييم الآن' : 'Grade Submission'} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 2. MULTI-STEP COURSE BUILDER WIZARD
// ----------------------------------------------------------------------
interface CourseBuilderProps {
  instructor: User;
  onSaveCourse: (course: Course) => void;
  onCancel: () => void;
}

export const CourseBuilder: React.FC<CourseBuilderProps> = ({
  instructor,
  onSaveCourse,
  onCancel,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Basics
  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [subtitleAr, setSubtitleAr] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [categoryId, setCategoryId] = useState('cat-cs');
  const [level, setLevel] = useState<Course['level']>('intermediate');
  const [courseLang, setCourseLang] = useState<Course['language']>('Bilingual');

  // Step 2: Media & Prerequisites
  const [thumbnail, setThumbnail] = useState(
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  );
  const [durationHours, setDurationHours] = useState(24);
  const [priceEGP, setPriceEGP] = useState(2100);

  // Step 3: Modules & Curriculum
  const [modules, setModules] = useState<CourseModule[]>([
    {
      id: 'mod-1',
      title: 'Module 1: Theoretical Foundations',
      titleAr: 'الوحدة الأولى: الأسس النظرية',
      order: 1,
      lessons: [
        {
          id: 'les-1',
          title: 'Introduction & Scope',
          titleAr: 'مقدمة ونطاق الدراسة',
          durationMinutes: 45,
          type: 'video',
          isFreePreview: true,
        },
      ],
    },
  ]);

  const [newModuleTitle, setNewModuleTitle] = useState('');

  const handleAddModule = () => {
    if (!newModuleTitle.trim()) return;
    const newMod: CourseModule = {
      id: `mod-${Date.now()}`,
      title: newModuleTitle.trim(),
      titleAr: newModuleTitle.trim(),
      order: modules.length + 1,
      lessons: [],
    };
    setModules([...modules, newMod]);
    setNewModuleTitle('');
  };

  const handleRemoveModule = (modId: string) => {
    setModules(modules.filter((m) => m.id !== modId));
  };

  const handleAddLesson = (modId: string) => {
    const lessonTitle = prompt(isAr ? 'أدخل عنوان المحاضرة الجديدة:' : 'Enter lesson title:');
    if (!lessonTitle) return;

    setModules(
      modules.map((m) => {
        if (m.id !== modId) return m;
        return {
          ...m,
          lessons: [
            ...m.lessons,
            {
              id: `les-${Date.now()}`,
              title: lessonTitle,
              titleAr: lessonTitle,
              durationMinutes: 40,
              type: 'video',
            },
          ],
        };
      })
    );
  };

  const handleSubmitForReview = () => {
    const selectedCat = CATEGORIES.find((c) => c.id === categoryId);
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      slug: (title || 'new-course').toLowerCase().replace(/\s+/g, '-'),
      title: title || 'New Advanced Masterclass',
      titleAr: titleAr || 'مساق أكاديمي جديد',
      subtitle: subtitle || 'Comprehensive university masterclass',
      subtitleAr: subtitleAr || 'مساق جامعي متخصص',
      description: description || 'Rigorous curriculum designed for researchers.',
      descriptionAr: descriptionAr || 'منهاج أكاديمي متكامل للباحثين.',
      thumbnail,
      categoryId,
      categoryName: selectedCat?.name || 'Computer Science',
      categoryNameAr: selectedCat?.nameAr || 'علوم الحاسب',
      departmentId: 'dept-cs',
      instructorId: instructor.id,
      instructorName: instructor.name,
      instructorNameAr: instructor.nameAr || instructor.name,
      instructorTitle: instructor.title || 'Professor',
      instructorAvatar: instructor.avatar,
      level,
      language: courseLang,
      rating: 5.0,
      ratingsCount: 0,
      enrolledCount: 0,
      durationHours,
      lessonsCount: modules.reduce((sum, m) => sum + m.lessons.length, 0),
      priceEGP,
      status: 'pending_review',
      learningOutcomes: ['Master theoretical formulations', 'Deploy production benchmarks'],
      learningOutcomesAr: ['إتقان الصياغة الرياضية', 'تطبيق نماذج العمل الإنتاجية'],
      requirements: ['Basic foundational knowledge'],
      requirementsAr: ['المعرفة التأسيسية الأولية'],
      targetAudience: ['Scholars and practitioners'],
      targetAudienceAr: ['الباحثون والمهنيون'],
      modules,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    onSaveCourse(newCourse);
    alert(isAr ? 'تم حفظ المساق بنجاح وإرساله للمراجعة الأكاديمية (Pending Review).' : 'Course draft submitted for academic review.');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-[#E8E7E4] shadow-lg text-start space-y-8">
      {/* Step Indicator Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-[#7B1E3A] uppercase tracking-wider">
              {isAr ? 'أداة بناء المقررات الأكاديمية' : 'Course Engineering Wizard'}
            </span>
            <h2 className="text-2xl font-bold font-serif text-[#123B70] mt-1">
              {isAr ? 'تصميم واعتماد مقرر جامعي جديد' : 'Architect New Academic Curriculum'}
            </h2>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-[#123B70]/10 text-[#123B70] rounded-full">
            Step {currentStep} of 5
          </span>
        </div>

        {/* Wizard Step Breadcrumb */}
        <div className="grid grid-cols-5 gap-2 text-center text-[11px] font-bold">
          {['1. Basics', '2. Media', '3. Syllabus', '4. Tuition', '5. Submit'].map((label, idx) => (
            <div
              key={idx}
              className={`py-1.5 rounded border transition-colors ${
                currentStep === idx + 1
                  ? 'bg-[#123B70] text-white border-[#123B70]'
                  : currentStep > idx + 1
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-gray-50 text-gray-400 border-gray-200'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Basics */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Course Title (English) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Distributed Consensus in Cloud Systems"
                className="w-full text-xs p-2.5 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                عنوان المقرر (باللغة العربية) *
              </label>
              <input
                type="text"
                required
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="مثال: الإجماع الموزع في النظم السحابية"
                className="w-full text-xs p-2.5 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Subtitle (English)
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Short academic tagline..."
                className="w-full text-xs p-2.5 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                العنوان الفرعي (بالعربية)
              </label>
              <input
                type="text"
                value={subtitleAr}
                onChange={(e) => setSubtitleAr(e.target.value)}
                placeholder="وصف موجز للمساق..."
                className="w-full text-xs p-2.5 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Academic Description & Scope *
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Comprehensive course syllabus and objectives..."
              className="w-full text-xs p-2.5 border border-gray-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Academic Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full text-xs p-2.5 border border-gray-300 rounded-md bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {isAr ? c.nameAr : c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Difficulty Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full text-xs p-2.5 border border-gray-300 rounded-md bg-white capitalize"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Language of Instruction
              </label>
              <select
                value={courseLang}
                onChange={(e) => setCourseLang(e.target.value as any)}
                className="w-full text-xs p-2.5 border border-gray-300 rounded-md bg-white"
              >
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
                <option value="Bilingual">Bilingual</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Media & Hours */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Course Thumbnail URL
            </label>
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full text-xs p-2.5 border border-gray-300 rounded-md font-mono"
            />
            <div className="mt-2 w-48 h-28 rounded-lg overflow-hidden border border-gray-200">
              <img src={thumbnail} alt="Preview" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Total Academic Hours
              </label>
              <input
                type="number"
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                className="w-full text-xs p-2.5 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Lead Professor
              </label>
              <input
                type="text"
                disabled
                value={instructor.name}
                className="w-full text-xs p-2.5 border border-gray-200 bg-gray-50 rounded-md font-medium"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Modules & Curriculum */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              placeholder={isAr ? 'أدخل مسمى وحدة دراسية جديدة...' : 'Enter new module title...'}
              className="flex-1 text-xs p-2.5 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleAddModule}
              className="px-4 py-2.5 bg-[#123B70] text-white rounded-md text-xs font-bold hover:bg-[#7B1E3A] shrink-0"
            >
              + {isAr ? 'إضافة وحدة' : 'Add Module'}
            </button>
          </div>

          <div className="space-y-4">
            {modules.map((m, mIdx) => (
              <div key={m.id} className="p-4 rounded-xl border border-gray-300 bg-gray-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#123B70]">
                    Module {mIdx + 1}: {m.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddLesson(m.id)}
                      className="px-2.5 py-1 bg-white border border-gray-300 rounded text-[11px] font-bold text-gray-700 hover:bg-gray-100"
                    >
                      + {isAr ? 'إضافة محاضرة' : 'Add Lesson'}
                    </button>
                    <button
                      onClick={() => handleRemoveModule(m.id)}
                      className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {m.lessons.map((les, lIdx) => (
                    <div
                      key={les.id}
                      className="p-2.5 bg-white rounded border border-gray-200 flex items-center justify-between text-xs"
                    >
                      <span>
                        {lIdx + 1}. {les.title} ({les.durationMinutes}m)
                      </span>
                      <span className="text-[10px] uppercase font-bold text-gray-500">
                        {les.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Pricing */}
      {currentStep === 4 && (
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Tuition Fee in Egyptian Pounds (EGP)
            </label>
            <input
              type="number"
              value={priceEGP}
              onChange={(e) => setPriceEGP(Number(e.target.value))}
              placeholder="0 for Free"
              className="w-full text-xs p-2.5 border border-gray-300 rounded-md font-mono"
            />
            <span className="text-[11px] text-gray-500 mt-1 block">
              {priceEGP === 0 ? 'This course will be published as an open-access free course.' : `Scholars will pay ${priceEGP} EGP upon enrollment.`}
            </span>
          </div>
        </div>
      )}

      {/* Step 5: Preview & Review */}
      {currentStep === 5 && (
        <div className="p-6 bg-[#F8F6F2] rounded-xl border border-[#B79A62]/50 space-y-4">
          <h3 className="font-bold text-sm text-[#123B70]">
            {isAr ? 'مراجعة بيانات المساق قبل الاعتماد' : 'Curriculum Review & Validation'}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div><span className="font-bold text-gray-600">Title:</span> {title || 'Untitled Masterclass'}</div>
            <div><span className="font-bold text-gray-600">Tuition:</span> {priceEGP} {t('currency_egp')}</div>
            <div><span className="font-bold text-gray-600">Modules:</span> {modules.length}</div>
            <div><span className="font-bold text-gray-600">Total Lessons:</span> {modules.reduce((sum, m) => sum + m.lessons.length, 0)}</div>
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            {isAr
              ? 'ملاحظة: وفقاً للسياسات الأكاديمية لفيتاليا، لا يُنشر المقرر مباشرة للعامة بل يُحال للجنة المراجعة الأكاديمية لفحص جودة المحتوى ومطابقة معايير الاعتماد.'
              : 'Institutional Note: Per Vitalia Academic Senate bylaws, new curricula are set to "Pending Review" for quality audit prior to public catalog publication.'}
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
        <button
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
          className="px-4 py-2 border border-gray-300 rounded-md text-xs font-semibold disabled:opacity-30 hover:bg-gray-50 flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{t('btn_previous')}</span>
        </button>

        {currentStep < 5 ? (
          <button
            onClick={() => setCurrentStep((s) => Math.min(5, s + 1))}
            className="px-5 py-2 bg-[#123B70] text-white rounded-md text-xs font-bold hover:bg-[#7B1E3A] flex items-center gap-1.5"
          >
            <span>{t('btn_next')}</span>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        ) : (
          <button
            onClick={handleSubmitForReview}
            className="px-6 py-2 bg-[#7B1E3A] hover:bg-rose-800 text-white rounded-md text-xs font-bold uppercase tracking-wider"
          >
            {isAr ? 'تقديم للمراجعة الأكاديمية' : 'Submit for Academic Review'}
          </button>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 3. INSTRUCTOR GRADING QUEUE
// ----------------------------------------------------------------------
interface InstructorGradingViewProps {
  submissions: AssignmentSubmission[];
  onGradeSubmission: (id: string, grade: number, feedback: string) => void;
}

export const InstructorGradingView: React.FC<InstructorGradingViewProps> = ({
  submissions,
  onGradeSubmission,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  const [activeSub, setActiveSub] = useState<AssignmentSubmission | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(45);
  const [feedbackInput, setFeedbackInput] = useState('Well structured implementation and accurate calculation.');

  const handleSaveGrade = () => {
    if (activeSub) {
      onGradeSubmission(activeSub.id, gradeInput, feedbackInput);
      setActiveSub(null);
      alert(isAr ? 'تم نشر الدرجة والملاحظات للطالب بنجاح.' : 'Grade and academic feedback published.');
    }
  };

  return (
    <div className="space-y-6 text-start">
      <div className="border-b border-[#E8E7E4] pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#123B70]">
          {t('portal_grading')}
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          {isAr ? 'قائمة تصحيح الواجبات والأوراق المعملية للطلاب المسجلين' : 'Coursework and programming benchmark submissions awaiting faculty evaluation'}
        </p>
      </div>

      <div className="space-y-4">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#123B70]">{sub.studentName}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{sub.submittedAt}</span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-gray-900">
                {sub.assignmentTitle}
              </h3>
              <p className="text-xs font-mono text-gray-600 bg-gray-50 p-2 rounded border border-gray-200 line-clamp-2">
                {sub.content}
              </p>
            </div>

            <div className="shrink-0 space-y-2 text-end">
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                sub.status === 'graded' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {sub.status === 'graded' ? `Score: ${sub.grade} pts` : 'Needs Grading'}
              </span>
              <button
                onClick={() => {
                  setActiveSub(sub);
                  setGradeInput(sub.grade || 45);
                  setFeedbackInput(sub.feedback || 'Well formulated solution.');
                }}
                className="block w-full px-4 py-1.5 bg-[#123B70] text-white rounded text-xs font-bold hover:bg-[#7B1E3A] transition-colors"
              >
                {sub.status === 'graded' ? 'Update Grade' : 'Grade Submission'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Grading Modal */}
      {activeSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-200">
            <h3 className="text-base font-bold text-[#123B70]">
              {isAr ? 'تقييم ورصد درجة الطالب' : 'Evaluate Student Submission'}
            </h3>
            <div className="text-xs text-gray-600">
              {activeSub.studentName} • {activeSub.assignmentTitle}
            </div>

            <div className="p-3 bg-gray-50 rounded font-mono text-xs max-h-40 overflow-y-auto border border-gray-200">
              {activeSub.content}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Grade Points Awarded (out of 50)
                </label>
                <input
                  type="number"
                  value={gradeInput}
                  onChange={(e) => setGradeInput(Number(e.target.value))}
                  className="w-full text-xs p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Faculty Feedback & Rubric Notes
                </label>
                <textarea
                  rows={3}
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setActiveSub(null)}
                className="px-4 py-2 border border-gray-300 rounded text-xs font-semibold"
              >
                {t('btn_cancel')}
              </button>
              <button
                onClick={handleSaveGrade}
                className="px-5 py-2 bg-emerald-700 text-white rounded text-xs font-bold hover:bg-emerald-800"
              >
                {isAr ? 'نشر الدرجة' : 'Publish Grade'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
