import React, { useState } from 'react';
import { Certificate } from '../../types';
import { useI18n } from '../../i18n/I18nContext';
import { Logo } from '../common/Logo';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  Calendar,
  User,
  BookOpen,
  Award,
  ExternalLink,
  Printer,
  Sparkles,
} from 'lucide-react';

interface CertificateVerificationPageProps {
  initialCertNumber?: string;
  onLookup: (certNumber: string) => Certificate | undefined;
}

export const CertificateVerificationPage: React.FC<CertificateVerificationPageProps> = ({
  initialCertNumber = '',
  onLookup,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  const [inputNumber, setInputNumber] = useState(initialCertNumber);
  const [searchedNumber, setSearchedNumber] = useState(initialCertNumber);
  const [result, setResult] = useState<Certificate | undefined>(() => {
    return initialCertNumber ? onLookup(initialCertNumber) : undefined;
  });
  const [hasSearched, setHasSearched] = useState(Boolean(initialCertNumber));

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputNumber.trim()) return;

    setSearchedNumber(inputNumber.trim());
    const found = onLookup(inputNumber.trim());
    setResult(found);
    setHasSearched(true);
  };

  const handleTrySample = (id: string) => {
    setInputNumber(id);
    setSearchedNumber(id);
    const found = onLookup(id);
    setResult(found);
    setHasSearched(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123B70]/10 text-[#123B70] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-[#B79A62]" />
          <span>{isAr ? 'التحقق الأكاديمي الرقمي الموثق' : 'Official Public Registry'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B70] font-serif">
          {t('verify_page_title')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {t('verify_page_subtitle')}
        </p>
      </div>

      {/* Lookup Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#123B70]/30 shadow-lg max-w-2xl mx-auto space-y-4">
        <form onSubmit={handleSearch} className="space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
            {isAr ? 'أدخل رقم التحقق المعتمد' : 'Enter Official Credential ID'}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute top-1/2 -translate-y-1/2 left-3 rtl:right-3 rtl:left-auto" />
              <input
                type="text"
                required
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value.toUpperCase())}
                placeholder="VIT-2026-90412"
                className="w-full text-sm font-mono uppercase pl-10 pr-3 rtl:pr-10 rtl:pl-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#123B70] focus:outline-hidden"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#123B70] hover:bg-[#7B1E3A] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-[#DFCA9B]" />
              <span>{t('verify_btn')}</span>
            </button>
          </div>
        </form>

        {/* Quick Sample IDs */}
        <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span className="font-semibold text-gray-700">{t('verify_sample_prompt')}</span>
          <button
            onClick={() => handleTrySample('VIT-2026-90412')}
            className="px-2.5 py-1 rounded bg-[#F8F6F2] hover:bg-[#123B70] hover:text-white font-mono text-[11px] font-bold text-[#123B70] transition-colors border border-gray-200"
          >
            VIT-2026-90412 ({isAr ? 'سارية' : 'Valid'})
          </button>
          <button
            onClick={() => handleTrySample('VIT-2026-88104')}
            className="px-2.5 py-1 rounded bg-[#F8F6F2] hover:bg-[#123B70] hover:text-white font-mono text-[11px] font-bold text-[#123B70] transition-colors border border-gray-200"
          >
            VIT-2026-88104 ({isAr ? 'سارية' : 'Valid'})
          </button>
          <button
            onClick={() => handleTrySample('VIT-2025-00192')}
            className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-600 hover:text-white font-mono text-[11px] font-bold text-rose-700 transition-colors border border-rose-200"
          >
            VIT-2025-00192 ({isAr ? 'ملغاة' : 'Revoked'})
          </button>
        </div>
      </div>

      {/* Verification Result Section */}
      {hasSearched && (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-300">
          {result ? (
            result.status === 'valid' ? (
              // Valid Verified Certificate
              <div className="bg-white rounded-2xl border-2 border-emerald-500 shadow-xl overflow-hidden">
                {/* Header Banner */}
                <div className="bg-emerald-700 text-white p-4 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-6 h-6 text-emerald-200" />
                    <div>
                      <h3 className="font-bold text-sm tracking-wide">
                        {isAr ? 'شهادة أكاديمية رسمية معتمدة ومحققة' : 'AUTHENTIC VERIFIED CREDENTIAL'}
                      </h3>
                      <p className="text-[11px] text-emerald-100">
                        {isAr ? 'سجل موثق رسمياً في قاعدة بيانات أكاديمية فيتاليا' : 'Verified record on Vitalia Academy digital ledger'}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white text-emerald-800 font-extrabold font-mono text-xs shadow-xs">
                    {result.certificateNumber}
                  </span>
                </div>

                {/* Academic Certificate View */}
                <div className="p-8 sm:p-12 space-y-8 bg-[#F8F6F2]/50">
                  <div className="flex justify-between items-start border-b border-[#B79A62]/30 pb-6">
                    <Logo size="md" variant="dark" />
                    <img
                      src={result.qrCodeUrl}
                      alt="Verification QR"
                      className="w-20 h-20 border border-gray-300 rounded p-1 bg-white shadow-xs"
                    />
                  </div>

                  <div className="text-center space-y-4">
                    <div className="text-xs uppercase tracking-widest font-bold text-[#7B1E3A]">
                      {t('cert_presented_to')}
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold font-serif text-[#123B70]">
                      {isAr ? result.studentNameAr : result.studentName}
                    </div>
                    <p className="text-xs text-gray-600 max-w-lg mx-auto leading-relaxed">
                      {t('cert_completion_statement')}
                    </p>
                    <div className="text-lg sm:text-xl font-bold text-[#7B1E3A] font-serif">
                      "{isAr ? result.courseTitleAr : result.courseTitle}"
                    </div>
                  </div>

                  {/* Metadata Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#B79A62]/30 text-start">
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold">{t('cert_id')}</div>
                      <div className="text-xs font-mono font-bold text-gray-800 mt-0.5">{result.certificateNumber}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold">{t('cert_issue_date')}</div>
                      <div className="text-xs font-medium text-gray-800 mt-0.5">{result.issueDate}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold">{isAr ? 'الدرجة الأكاديمية' : 'Grade Achieved'}</div>
                      <div className="text-xs font-bold text-emerald-700 mt-0.5">{result.gradeAchieved}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold">{isAr ? 'المعتمد' : 'Authorized Authority'}</div>
                      <div className="text-xs font-medium text-gray-800 mt-0.5">{result.instructorName}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Revoked Certificate Notice
              <div className="bg-white rounded-2xl border-2 border-rose-500 shadow-xl overflow-hidden">
                <div className="bg-rose-700 text-white p-4 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert className="w-6 h-6 text-rose-200" />
                    <div>
                      <h3 className="font-bold text-sm tracking-wide">
                        {isAr ? 'تحذير: هذه الشهادة ملغاة رسمياً' : 'WARNING: CREDENTIAL REVOKED'}
                      </h3>
                      <p className="text-[11px] text-rose-100">
                        {isAr ? 'تم سحب هذه الشهادة من السجل الأكاديمي الرسمي' : 'This credential was officially revoked by Academic Senate'}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white text-rose-800 font-extrabold font-mono text-xs">
                    {result.certificateNumber}
                  </span>
                </div>

                <div className="p-8 space-y-6 text-start">
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-rose-900">
                      {isAr ? 'سبب إلغاء الشهادة:' : 'Revocation Reason:'}
                    </h4>
                    <p className="p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-900 leading-relaxed font-medium">
                      {result.revocationReason || 'Violated institutional code of academic conduct.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 pt-4 border-t border-gray-100">
                    <div>
                      <span className="font-bold text-gray-800">{isAr ? 'تاريخ السحب:' : 'Revocation Date:'} </span>
                      <span>{result.revocationDate || '2025-07-22'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-800">{isAr ? 'اسم الطالب الأصلي:' : 'Original Recipient:'} </span>
                      <span>{isAr ? result.studentNameAr : result.studentName}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            // Not Found
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center space-y-4 shadow-md">
              <XCircle className="w-12 h-12 text-rose-500 mx-auto" />
              <h3 className="text-lg font-bold text-[#123B70]">
                {isAr ? 'لم يتم العثور على شهادة بهذا الرقم' : 'No Credential Found'}
              </h3>
              <p className="text-xs text-gray-600 max-w-md mx-auto">
                {isAr
                  ? `الرقم المدخل "${searchedNumber}" غير مسجل في السجل الأكاديمي لأكاديمية فيتاليا. يرجى التأكد من كتابة الرمز بدقة.`
                  : `Credential ID "${searchedNumber}" is not registered on Vitalia Academy's verified issuance ledger. Please check for typographical errors.`}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleTrySample('VIT-2026-90412')}
                  className="px-4 py-2 bg-[#123B70] text-white rounded-md text-xs font-bold"
                >
                  {isAr ? 'جرّب رقم شهادة سارية' : 'Try Valid Sample ID'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
