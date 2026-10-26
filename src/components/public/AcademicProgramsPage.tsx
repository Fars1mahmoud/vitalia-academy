import React from 'react';
import { useI18n } from '../../i18n/I18nContext';
import { GraduationCap, Award, CheckCircle, Clock, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';

interface AcademicProgramsPageProps {
  onNavigateCourses: () => void;
}

export const AcademicProgramsPage: React.FC<AcademicProgramsPageProps> = ({
  onNavigateCourses,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const programs = [
    {
      id: 'prog-1',
      title: 'Executive Diploma in Artificial Intelligence & Foundation Models',
      titleAr: 'الدبلوم التنفيذي في الذكاء الاصطناعي والنماذج التأسيسية',
      department: 'School of Computing & AI',
      departmentAr: 'كلية الحوسبة والذكاء الاصطناعي',
      duration: '6 Months (240 Hours)',
      durationAr: '6 أشهر (240 ساعة معتمدة)',
      description: 'A rigorous graduate-level curriculum covering neural foundations, LLM fine-tuning, agentic workflows, and ethical governance.',
      descriptionAr: 'منهاج دراسات عليا متقدم يغطي أسس الشبكات العصبية، ضبط نماذج اللغة، والأنظمة الذاتية المستقلة وأخلاقيات الحوسبة.',
      modulesCount: 6,
      projectsCount: 4,
      credential: 'Executive Post-Graduate Certificate & Seal',
    },
    {
      id: 'prog-2',
      title: 'Masterclass Fellowship in Corporate Valuation & M&A Strategy',
      titleAr: 'زمالة التقييم المالي المؤسسي وصفقات الاندماج والاستحواذ',
      department: 'College of Business Administration',
      departmentAr: 'كلية إدارة الأعمال والمالية',
      duration: '4 Months (180 Hours)',
      durationAr: '4 أشهر (180 ساعة معتمدة)',
      description: 'Comprehensive financial forecasting, DCF modeling tranches, capital structure optimization, and hostile takeover defense.',
      descriptionAr: 'التنبؤ المالي المتكامل، نمذجة التدفقات النقدية المخصومة، وتحسين هيكل رأس المال وهندسة صفقات الاستحواذ.',
      modulesCount: 5,
      projectsCount: 3,
      credential: 'Vitalia Financial Fellow Credential',
    },
    {
      id: 'prog-3',
      title: 'Post-Baccalaureate Certificate in Clinical Health Informatics',
      titleAr: 'الشهادة التخصصية في المعلوماتية الصحية والبيانات السريرية',
      department: 'Faculty of Health Sciences',
      departmentAr: 'كلية العلوم الصحية',
      duration: '5 Months (200 Hours)',
      durationAr: '5 أشهر (200 ساعة معتمدة)',
      description: 'HL7 FHIR architecture, epidemiological biostatistics, HIPAA/GDPR clinical compliance, and algorithmic diagnostic support.',
      descriptionAr: 'معمارية معايير FHIR الطبية، الإحصاء الوبائي، خصوصية البيانات السريرية، ونظم مساعدة التشخيص الخوارزمية.',
      modulesCount: 6,
      projectsCount: 3,
      credential: 'Health Informatics Certified Specialist',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#7B1E3A] uppercase tracking-wider">
          {isAr ? 'المسارات والدرجات التخصصية' : 'Comprehensive Degree Tracks'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B70] font-serif">
          {t('nav_programs')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {isAr
            ? 'برامج أكاديمية متكاملة مصممة بالتعاون مع كبار الأكاديميين لتزويدك بالخبرة التخصصية المتعمقة والشهادات المعتمدة.'
            : 'Structured multi-month academic programs combining advanced theory, hands-on capstone labs, and verified institutional diplomas.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {programs.map((prog) => (
          <div
            key={prog.id}
            className="bg-white rounded-2xl border border-[#E8E7E4] hover:border-[#123B70] shadow-xs hover:shadow-xl transition-all p-8 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-[#123B70]/10 text-[#123B70] text-[11px] font-bold">
                {isAr ? prog.departmentAr : prog.department}
              </span>

              <h3 className="text-lg font-bold text-[#252A34] font-serif leading-snug">
                {isAr ? prog.titleAr : prog.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-4 h-4 text-[#B79A62]" />
                <span>{isAr ? prog.durationAr : prog.duration}</span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {isAr ? prog.descriptionAr : prog.description}
              </p>

              <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{prog.modulesCount} {isAr ? 'وحدات دراسية معمقة' : 'Core Academic Modules'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{prog.projectsCount} {isAr ? 'مشاريع تطبيقية خاضعة للمراجعة' : 'Faculty-Reviewed Capstone Projects'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#B79A62]" />
                  <span className="font-semibold text-[#123B70]">{prog.credential}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onNavigateCourses}
              className="w-full py-3 bg-[#123B70] hover:bg-[#7B1E3A] text-white font-bold text-xs rounded-md transition-colors flex items-center justify-center gap-2 group"
            >
              <span>{isAr ? 'استكشف المقررات التأسيسية' : 'Explore Program Curricula'}</span>
              <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
