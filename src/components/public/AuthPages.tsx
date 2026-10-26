import React, { useState } from 'react';
import { useI18n } from '../../i18n/I18nContext';
import { UserRole } from '../../types';
import { Logo } from '../common/Logo';
import {
  LogIn,
  UserPlus,
  KeyRound,
  Mail,
  Lock,
  User,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface AuthPagesProps {
  mode: 'login' | 'register' | 'forgot';
  onNavigate: (route: string) => void;
  onLoginSuccess: (role?: UserRole) => void;
}

export const AuthPages: React.FC<AuthPagesProps> = ({
  mode,
  onNavigate,
  onLoginSuccess,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  // Login State
  const [loginEmail, setLoginEmail] = useState('karim.mansour@vitalia.edu');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Register State
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerAccountType, setRegisterAccountType] = useState<UserRole>('student');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setErrorMsg(isAr ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور' : 'Please provide both email and password');
      return;
    }
    onLoginSuccess('student');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword) {
      setErrorMsg(isAr ? 'يرجى استكمال كافة الحقول المطلوبة' : 'Please fill in all required fields');
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setErrorMsg(isAr ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
      return;
    }
    if (!acceptTerms) {
      setErrorMsg(isAr ? 'يجب الموافقة على الشروط وميثاق الشرف الأكاديمي' : 'You must accept the academic honor code and terms');
      return;
    }
    onLoginSuccess(registerAccountType);
  };

  const handleQuickRoleLogin = (role: UserRole) => {
    onLoginSuccess(role);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-[#E8E7E4] shadow-xl text-start">
        <div className="text-center space-y-2">
          <Logo size="md" variant="dark" className="justify-center mb-2" />
          <h2 className="text-2xl font-bold font-serif text-[#123B70]">
            {mode === 'login'
              ? (isAr ? 'تسجيل الدخول إلى البوابة الأكاديمية' : 'Sign in to Vitalia Academy')
              : mode === 'register'
              ? (isAr ? 'إنشاء حساب أكاديمي جديد' : 'Create Academic Account')
              : (isAr ? 'استعادة كلمة المرور' : 'Reset Password')}
          </h2>
          <p className="text-xs text-gray-500">
            {mode === 'login'
              ? (isAr ? 'أدخل بيانات حسابك المعتمد أو اختر حساباً تجريبياً للمعاينة' : 'Access your university portal or test with demo presets')
              : mode === 'register'
              ? (isAr ? 'انضم إلى مجتمع باحثي وطلاب أكاديمية فيتاليا' : 'Join our international community of scholars and researchers')
              : (isAr ? 'أدخل بريدك الإلكتروني لإرسال رابط الاستعادة' : 'Enter your registered email to receive reset instructions')}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {mode === 'login' && (
          <>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2 left-3 rtl:right-3 rtl:left-auto" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#123B70]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">
                    {isAr ? 'كلمة المرور' : 'Password'}
                  </label>
                  <button
                    type="button"
                    onClick={() => onNavigate('forgot')}
                    className="text-[11px] text-[#7B1E3A] hover:underline font-semibold"
                  >
                    {isAr ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2 left-3 rtl:right-3 rtl:left-auto" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#123B70]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#123B70] hover:bg-[#7B1E3A] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm"
              >
                {t('nav_login')}
              </button>
            </form>

            {/* Demo Quick Presets */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#B79A62] text-center flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'تسجيل دخول تجريبي فوري حسب الدور:' : 'Quick Demo Role Sign-In:'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleQuickRoleLogin('student')}
                  className="py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-[#123B70] font-semibold rounded border border-blue-200 text-center text-[11px]"
                >
                  🎓 {isAr ? 'حساب طالب' : 'Student (Karim)'}
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickRoleLogin('professor')}
                  className="py-1.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold rounded border border-amber-200 text-center text-[11px]"
                >
                  📖 {isAr ? 'أستاذ (د. طارق)' : 'Professor (Dr. Tariq)'}
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickRoleLogin('teaching_assistant')}
                  className="py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold rounded border border-emerald-200 text-center text-[11px]"
                >
                  📝 {isAr ? 'معيد (نور)' : 'Lead TA (Noor)'}
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickRoleLogin('course_reviewer')}
                  className="py-1.5 px-2 bg-purple-50 hover:bg-purple-100 text-purple-900 font-semibold rounded border border-purple-200 text-center text-[11px]"
                >
                  🔍 {isAr ? 'مراجع (د. زياد)' : 'Reviewer (Dr. Ziad)'}
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickRoleLogin('academic_supervisor')}
                  className="py-1.5 px-2 bg-teal-50 hover:bg-teal-100 text-teal-900 font-semibold rounded border border-teal-200 text-center text-[11px]"
                >
                  📋 {isAr ? 'مشرف (د. فريدة)' : 'Supervisor (Dr. Farida)'}
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickRoleLogin('super_admin')}
                  className="py-1.5 px-2 bg-rose-50 hover:bg-rose-100 text-rose-900 font-semibold rounded border border-rose-200 text-center text-[11px]"
                >
                  ⚡ {isAr ? 'المدير العام (العميد)' : 'Super Admin (Dean)'}
                </button>
              </div>
            </div>

            <div className="text-center pt-2 text-xs text-gray-600">
              {isAr ? 'ليس لديك حساب بعد؟' : "Don't have an academic account?"}{' '}
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="font-bold text-[#123B70] hover:underline"
              >
                {t('nav_register')}
              </button>
            </div>
          </>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {isAr ? 'الاسم الثلاثي الأكاديمي' : 'Full Legal/Academic Name'} *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2 left-3 rtl:right-3 rtl:left-auto" />
                <input
                  type="text"
                  required
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="e.g. Sarah Mansour"
                  className="w-full text-xs pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#123B70]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {isAr ? 'البريد الإلكتروني' : 'Email Address'} *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2 left-3 rtl:right-3 rtl:left-auto" />
                <input
                  type="email"
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full text-xs pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#123B70]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {isAr ? 'نوع الحساب المرغوب' : 'Account Type'}
              </label>
              <select
                value={registerAccountType}
                onChange={(e) => setRegisterAccountType(e.target.value as any)}
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-[#123B70]"
              >
                <option value="student">{isAr ? 'طالب / باحث (Student Scholar)' : 'Student / Researcher'}</option>
                <option value="instructor">{isAr ? 'محاضر / مدرب معتمد (Instructor)' : 'Instructor / Trainer'}</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  {isAr ? 'كلمة المرور' : 'Password'} *
                </label>
                <input
                  type="password"
                  required
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#123B70]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  {isAr ? 'تأكيد المرور' : 'Confirm'} *
                </label>
                <input
                  type="password"
                  required
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#123B70]"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#123B70] rounded border-gray-300"
              />
              <label htmlFor="terms" className="text-[11px] text-gray-600 leading-tight">
                {isAr
                  ? 'أوافق على شروط وأحكام أكاديمية فيتاليا وميثاق الشرف الأكاديمي وسياسة الخصوصية.'
                  : 'I agree to Vitalia Academy Terms of Service, Academic Honor Code, and Privacy Policy.'}
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#123B70] hover:bg-[#7B1E3A] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm"
            >
              {isAr ? 'تأكيد التسجيل والالتحاق' : 'Create Account & Continue'}
            </button>

            <div className="text-center pt-2 text-xs text-gray-600">
              {isAr ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="font-bold text-[#123B70] hover:underline"
              >
                {t('nav_login')}
              </button>
            </div>
          </form>
        )}

        {mode === 'forgot' && (
          <div className="space-y-4">
            {forgotSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">
                  {isAr ? 'تم إرسال رابط إعادة التعيين' : 'Password Reset Email Sent'}
                </h4>
                <p className="text-xs text-emerald-800">
                  {isAr
                    ? 'في الوضع التجريبي تم محاكاة إرسال رابط التعيين. يمكنك تسجيل الدخول مباشرة بالحساب التجريبي.'
                    : 'In demo mode, reset dispatch is simulated. You can proceed directly using any demo preset.'}
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="mt-2 px-4 py-2 bg-[#123B70] text-white text-xs font-bold rounded-md"
                >
                  {isAr ? 'العودة لتسجيل الدخول' : 'Back to Sign In'}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setForgotSent(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {isAr ? 'البريد الإلكتروني المسجل' : 'Registered Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    defaultValue="karim.mansour@vitalia.edu"
                    className="w-full text-xs px-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#123B70]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#123B70] hover:bg-[#7B1E3A] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors"
                >
                  {isAr ? 'إرسال رابط استعادة المرور' : 'Send Reset Link'}
                </button>

                <div className="text-center text-xs">
                  <button
                    type="button"
                    onClick={() => onNavigate('login')}
                    className="text-[#123B70] font-semibold hover:underline"
                  >
                    {isAr ? 'العودة لتسجيل الدخول' : 'Return to Login'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
