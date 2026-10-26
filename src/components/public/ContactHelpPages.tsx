import React, { useState } from 'react';
import { useI18n } from '../../i18n/I18nContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  BookOpen,
  Award,
  ShieldCheck,
  Search,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    department: 'general',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#7B1E3A] uppercase tracking-wider">
          {isAr ? 'قنوات التواصل المؤسسية' : 'Institutional Liaison'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B70] font-serif">
          {t('nav_contact')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          {isAr
            ? 'فريق القبول والتسجيل والشؤون الأكاديمية متاح للرد على استفساراتكم.'
            : 'Our admissions council and academic registrar are available to assist your inquiries.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6 text-start">
          <div className="bg-[#123B70] text-white p-8 rounded-2xl border-2 border-[#B79A62] space-y-6">
            <h3 className="text-lg font-bold font-serif text-[#DFCA9B]">
              {isAr ? 'المقر الأكاديمي الرئيسي' : 'Office of the Registrar'}
            </h3>

            <div className="space-y-4 text-xs text-white/90">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#DFCA9B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Vitalia Academy Academic Center</div>
                  <div className="text-white/70 mt-0.5">
                    {isAr
                      ? 'القطاع الدبلوماسي، الحي المالي، العاصمة الإدارية الجديدة، جمهورية مصر العربية'
                      : 'Diplomatic Enclave, Financial District, New Administrative Capital, Egypt'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#DFCA9B] shrink-0" />
                <div>
                  <div className="font-bold text-white">Admissions & Inquiries</div>
                  <div className="text-white/70">admissions@vitalia.edu</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#DFCA9B] shrink-0" />
                <div>
                  <div className="font-bold text-white">Academic Hotline</div>
                  <div className="text-white/70" dir="ltr">+20 (2) 3855-9000</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15 text-[11px] text-[#DFCA9B]">
              {isAr
                ? 'أوقات العمل: الأحد إلى الخميس، من 9:00 صباحاً حتى 5:00 مساءً (توقيت القاهرة)'
                : 'Office Hours: Sunday to Thursday, 9:00 AM - 5:00 PM (Cairo Time / UTC+2)'}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-[#E8E7E4] shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-[#123B70]">
                {isAr ? 'تم استلام استفسارك بنجاح' : 'Inquiry Successfully Received'}
              </h3>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                {isAr
                  ? 'شكراً لتواصلك مع أكاديمية فيتاليا. سيقوم أحد مسؤولي التسجيل الأكاديمي بالرد خلال 24 ساعة عمل.'
                  : 'Thank you for reaching out to Vitalia Academy. A registrar will respond to your email within 24 business hours.'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 bg-[#123B70] text-white rounded-md text-xs font-bold"
              >
                {isAr ? 'إرسال استفسار آخر' : 'Send Another Message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {isAr ? 'الاسم بالكامل' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#123B70]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {isAr ? 'البريد الإلكتروني' : 'Email Address'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#123B70]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  {isAr ? 'القسم الأكاديمي المختص' : 'Target Department'}
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-[#123B70]"
                >
                  <option value="general">{isAr ? 'استفسار عام / القبول والتسجيل' : 'General Inquiries & Admissions'}</option>
                  <option value="cs">{isAr ? 'كلية الحوسبة والذكاء الاصطناعي' : 'School of Computing & AI'}</option>
                  <option value="business">{isAr ? 'كلية إدارة الأعمال والمالية' : 'College of Business Administration'}</option>
                  <option value="health">{isAr ? 'كلية العلوم الصحية' : 'Faculty of Health Sciences'}</option>
                  <option value="verification">{isAr ? 'تدقيق واعتماد الشهادات' : 'Credential Verification Registry'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  {isAr ? 'موضوع الرسالة' : 'Subject'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#123B70]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  {isAr ? 'نص الرسالة أو الاستفسار' : 'Message / Details'} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#123B70]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#123B70] hover:bg-[#7B1E3A] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isAr ? 'إرسال الرسالة' : 'Submit Inquiry'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const FaqPage: React.FC = () => {
  const { language } = useI18n();
  const isAr = language === 'ar';
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How are Vitalia Academy certificates authenticated by employers?',
      qAr: 'كيف يمكن لجهات العمل والجامعات التحقق من صحة شهادات فيتاليا؟',
      a: 'Every issued credential contains a persistent, unique identification number (e.g., VIT-2026-90412) and a cryptographic QR code pointing to our public registrar lookup portal.',
      aAr: 'تحمل كل شهادة صادرة رقم تحقق فريداً مسجلاً في السجل الرقمي العام مع رمز QR يمكن مسحه ضوئياً لإظهار اسم المستلم وتاريخ الإصدار والدرجة المحققة.',
    },
    {
      q: 'Are final examinations timed and proctored?',
      qAr: 'هل الاختبارات الأكاديمية النهائية محددة بوقت ومراقبة؟',
      a: 'Yes. Examinations feature countdown timers, randomized question ordering, attempt limitations, and strict passing thresholds (usually 70-75%).',
      aAr: 'نعم، تتميز اختباراتنا بمؤقت تنازلي دقيق، وترتيب عشوائي للأسئلة، وحد أقصى لعدد المحاولات مع معيار اجتياز صارم.',
    },
    {
      q: 'What currency is used for tuition payments?',
      qAr: 'ما هي العملة المعتمدة لدفع رسوم المقررات والاشتراكات؟',
      a: 'Tuition fees are displayed and processed in Egyptian Pounds (EGP), with support for domestic payment rails (Fawry, Meeza, Visa, Mastercard).',
      aAr: 'تُعرض الرسوم بالجنيه المصري (EGP) مع دعم طرق الدفع الإلكترونية الشائعة مثل فيزا وماستركارد وميزة وفوري.',
    },
    {
      q: 'Can I request a tuition refund if I drop a course?',
      qAr: 'هل يمكنني استرداد الرسوم الدراسية إذا رغبت في الانسحاب؟',
      a: 'Yes. Under Vitalia Academy policy, students may request a full refund within 14 calendar days of enrollment provided less than 25% of course content has been accessed.',
      aAr: 'نعم، تتيح سياسة الأكاديمية طلب استرداد الرسوم كاملاً خلال 14 يوماً من تاريخ التسجيل شريطة عدم تجاوز 25% من محتوى المقرر.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10 text-start">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-[#123B70] font-serif">
          {isAr ? 'الأسئلة الأكاديمية الشائعة' : 'Frequently Asked Questions'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          {isAr ? 'إجابات وافية على كافة التساؤلات المتعلقة بالدراسة والاختبارات والشهادات' : 'Authoritative answers regarding curricula, exams, tuition, and verification'}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className="bg-white rounded-xl border border-[#E8E7E4] overflow-hidden shadow-2xs">
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-start hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-sm text-[#123B70]">
                  {isAr ? faq.qAr : faq.q}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {isAr ? faq.aAr : faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
