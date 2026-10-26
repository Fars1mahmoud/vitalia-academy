import React, { useState } from 'react';
import { User } from '../../../types';
import { useI18n } from '../../../i18n/I18nContext';
import { User as UserIcon, Lock, Bell, Globe, Shield, CheckCircle2 } from 'lucide-react';

interface ProfileSettingsViewProps {
  currentUser: User;
  onUpdateUser: (updated: Partial<User>) => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  currentUser,
  onUpdateUser,
}) => {
  const { language, toggleLanguage, setLanguage, t } = useI18n();
  const isAr = language === 'ar';

  const [name, setName] = useState(currentUser.name);
  const [nameAr, setNameAr] = useState(currentUser.nameAr || '');
  const [title, setTitle] = useState(currentUser.title || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name,
      nameAr,
      title,
      bio,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-start">
      <div className="border-b border-[#E8E7E4] pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#123B70]">
          {t('portal_profile')} & {t('portal_settings')}
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          {isAr
            ? 'إدارة بياناتك الأكاديمية الرسمية وتفضيلات الإشعارات واللغة'
            : 'Manage academic identity, departmental profile, and notification preferences'}
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{isAr ? 'تم حفظ التعديلات بنجاح في الحالة التجريبية!' : 'Profile details updated successfully!'}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#B79A62]"
          />
          <div>
            <h3 className="font-bold text-sm text-[#123B70]">{currentUser.name}</h3>
            <p className="text-xs text-gray-500 font-mono">{currentUser.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#123B70]/10 text-[#123B70]">
              Role: {currentUser.primaryRole.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Full Legal Name (English)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs p-2.5 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              الاسم الأكاديمي (باللغة العربية)
            </label>
            <input
              type="text"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              className="w-full text-xs p-2.5 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Academic Title / Discipline Specialization
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-xs p-2.5 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Biographical Scholarly Statement
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full text-xs p-2.5 border border-gray-300 rounded-md"
          />
        </div>

        {/* Language Preference */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="font-bold text-xs text-gray-800">Interface Language / لغة الواجهة</div>
            <div className="text-[11px] text-gray-500">Currently: {isAr ? 'العربية (RTL)' : 'English (LTR)'}</div>
          </div>
          <button
            type="button"
            onClick={toggleLanguage}
            className="px-4 py-2 border border-gray-300 rounded text-xs font-bold hover:bg-gray-50"
          >
            {isAr ? 'Switch to English' : 'التحويل إلى العربية'}
          </button>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#123B70] hover:bg-[#7B1E3A] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm"
          >
            {t('btn_save')}
          </button>
        </div>
      </form>
    </div>
  );
};
