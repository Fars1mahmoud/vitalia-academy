import React from 'react';
import { useI18n } from '../../i18n/I18nContext';
import { ShieldCheck, FileText, RefreshCw } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'refund';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { language } = useI18n();
  const isAr = language === 'ar';

  const titles = {
    privacy: {
      en: 'Privacy & Data Protection Policy',
      ar: 'سياسة الخصوصية وحماية البيانات الأكاديمية',
      icon: ShieldCheck,
    },
    terms: {
      en: 'Academic Terms of Service & Student Honor Code',
      ar: 'شروط الخدمة وميثاق الشرف الأكاديمي للطلاب',
      icon: FileText,
    },
    refund: {
      en: 'Tuition Refund & Cancellation Policy',
      ar: 'سياسة استرداد الرسوم الدراسية وإلغاء التسجيل',
      icon: RefreshCw,
    },
  };

  const { en, ar, icon: Icon } = titles[type];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 text-start">
      <div className="border-b border-[#E8E7E4] pb-6 space-y-3">
        <div className="flex items-center gap-2.5 text-[#123B70]">
          <Icon className="w-6 h-6 text-[#B79A62]" />
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif">
            {isAr ? ar : en}
          </h1>
        </div>
        <p className="text-xs text-gray-500">
          {isAr
            ? 'آخر تحديث معتمد من مجلس إدارة أكاديمية فيتاليا: أكتوبر 2026'
            : 'Last ratified by the Vitalia Academy Governance Senate: October 2026'}
        </p>
      </div>

      <div className="prose prose-sm max-w-none text-xs text-gray-700 leading-relaxed space-y-6 bg-white p-8 rounded-2xl border border-[#E8E7E4] shadow-xs">
        {type === 'privacy' && (
          <>
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-[#123B70]">1. Academic Data Collection & Processing</h3>
              <p>
                {isAr
                  ? 'تلتزم أكاديمية فيتاليا بحماية الخصوصية الكاملة لبيانات الطلاب والأكاديميين. نحن نقوم فقط بمعالجة البيانات الضرورية لإدارة السجل الأكاديمي، وتوثيق الشهادات، وتقييم أداء الطلاب في الامتحانات.'
                  : 'Vitalia Academy respects the sanctity of scholarly data. We collect strictly necessary information to maintain student academic records, process credential verifications, and evaluate coursework.'}
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-[#123B70]">2. Public Verification Registry</h3>
              <p>
                {isAr
                  ? 'للحفاظ على مصداقية الشهادات الأكاديمية الصادرة، يتم نشر الحد الأدنى من المعلومات المعتمدة (اسم الطالب، مسمى المقرر، تاريخ الإصدار، والدرجة المحققة) في سجل التحقق العام عند إدخال رقم الشهادة.'
                  : 'To safeguard the institutional value of earned diplomas, our public credential registry confirms solely minimal necessary issuance facts (recipient name, course title, issue date, honors).'}
              </p>
            </section>
          </>
        )}

        {type === 'terms' && (
          <>
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-[#123B70]">1. Student Academic Honor Code</h3>
              <p>
                {isAr
                  ? 'يتعهد كل طالب ملتحق بالأكاديمية بأداء الواجبات والامتحانات بنفسه دون الاستعانة بوسائل غير مصرح بها أو انتحال للشخصية. يؤدي أي إخلال بالنزاهة العلمية إلى سحب الشهادة فوراً وشطب السجل.'
                  : 'All scholars matriculating at Vitalia Academy commit to individual intellectual integrity. Plagiarism, proxy test taking, or uncredited AI generation on graded essays results in immediate credential revocation.'}
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-[#123B70]">2. Intellectual Property Rights</h3>
              <p>
                {isAr
                  ? 'كافة المحاضرات والمواد العلمية والشروح البرمجية هي ملكية فكرية حصرية لأكاديمية فيتاليا وهيئة التدريس ولا يجوز نسخها أو إعادة نشرها تجارياً دون إذن خطي مسبق.'
                  : 'Curricular syllabi, proprietary code repositories, and recorded video lectures are protected intellectual property of Vitalia Academy faculty and researchers.'}
              </p>
            </section>
          </>
        )}

        {type === 'refund' && (
          <>
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-[#123B70]">1. 14-Day Full Tuition Guarantee</h3>
              <p>
                {isAr
                  ? 'يحق للطالب استرداد كامل الرسوم الدراسية المدفوعة للمقررات المنفردة خلال 14 يوماً تقويمياً من تاريخ التسجيل، شريطة ألا يتجاوز إنجازه الأكاديمي 25% من محتوى المقرر وألا يكون قد تقدم للاختبار النهائي.'
                  : 'Students are eligible for a 100% tuition refund within 14 calendar days of individual course enrollment, provided total accessed syllabus content is under 25% and no final examination has been attempted.'}
            </p>
            </section>
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-[#123B70]">2. Subscription Cancellation Policy</h3>
              <p>
                {isAr
                  ? 'يمكن إلغاء الاشتراكات الشهرية أو السنوية في أي وقت من لوحة التحكم لتفادي التجديد التلقائي للدورات التالية.'
                  : 'Monthly and annual scholarship memberships can be paused or cancelled at any time through the student billing dashboard to prevent future recurring cycles.'}
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};
