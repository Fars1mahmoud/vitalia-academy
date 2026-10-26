import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS } from '../../services/mockData';
import { SubscriptionPlan } from '../../types';
import { useI18n } from '../../i18n/I18nContext';
import {
  Check,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  CreditCard,
  X,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const PricingPlansPage: React.FC = () => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<SubscriptionPlan | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const plans = SUBSCRIPTION_PLANS.filter((p) => p.billingPeriod === billingPeriod || p.id === 'plan-free');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'VITALIA20' || couponCode.trim().toUpperCase() === 'SCHOLAR') {
      setDiscountApplied(true);
    } else {
      alert(isAr ? 'كوبون تجريبي غير صالح. جرب: VITALIA20' : 'Invalid demo coupon. Try code: VITALIA20');
    }
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutComplete(true);
    }, 1200);
  };

  const calculateFinalPrice = (price: number) => {
    if (price === 0) return 0;
    if (discountApplied) return Math.round(price * 0.8);
    return price;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#7B1E3A] uppercase tracking-wider">
          {isAr ? 'الرسوم والعضويات الأكاديمية' : 'Tuition & Academic Fellowships'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B70] font-serif">
          {t('nav_pricing')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {isAr
            ? 'خطط دراسية واضحة بالجنيه المصري (EGP) تمنحك وصولاً غير محدود للمقررات والشهادات الرسمية وجلسات الإرشاد.'
            : 'Transparent tuition plans in Egyptian Pounds (EGP) with full curriculum access, verified credentials, and faculty mentoring.'}
        </p>

        {/* Billing Period Switch */}
        <div className="pt-4 flex items-center justify-center">
          <div className="bg-[#E8E7E4] p-1 rounded-lg flex items-center gap-1 border border-gray-300">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-[#123B70] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {isAr ? 'الاشتراك الشهري' : 'Monthly Billing'}
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingPeriod === 'yearly'
                  ? 'bg-[#123B70] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{isAr ? 'الاشتراك السنوي' : 'Annual Billing'}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#DFCA9B] text-[#0B2548] font-bold">
                {isAr ? 'وفر 25%' : 'SAVE 25%'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => {
          const isHighlighted = plan.recommended || plan.billingPeriod === 'yearly';
          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all ${
                isHighlighted
                  ? 'bg-[#123B70] text-white border-2 border-[#B79A62] shadow-2xl relative'
                  : 'bg-white text-gray-800 border border-[#E8E7E4] shadow-xs'
              }`}
            >
              {isHighlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#DFCA9B] text-[#0B2548] text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                  RECOMMENDED SCHOLARSHIP
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className={`text-xl font-bold font-serif ${isHighlighted ? 'text-white' : 'text-[#123B70]'}`}>
                    {isAr ? plan.nameAr : plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className={`text-4xl font-extrabold font-serif ${isHighlighted ? 'text-[#DFCA9B]' : 'text-[#252A34]'}`}>
                      {plan.priceEGP}
                    </span>
                    <span className={`text-xs font-semibold ${isHighlighted ? 'text-white/70' : 'text-gray-500'}`}>
                      {t('currency_egp')} {plan.priceEGP > 0 ? (plan.billingPeriod === 'yearly' ? t('per_year') : t('per_month')) : ''}
                    </span>
                  </div>
                </div>

                <div className={`pt-4 border-t ${isHighlighted ? 'border-white/15' : 'border-gray-100'}`}>
                  <ul className="space-y-3 text-xs">
                    {(isAr ? plan.featuresAr : plan.features).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isHighlighted ? 'text-[#DFCA9B]' : 'text-emerald-600'}`} />
                        <span className={isHighlighted ? 'text-white/90' : 'text-gray-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedPlanForCheckout(plan);
                  setCheckoutComplete(false);
                  setDiscountApplied(false);
                }}
                className={`mt-8 w-full py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-all shadow-sm ${
                  isHighlighted
                    ? 'bg-[#DFCA9B] hover:bg-white text-[#0B2548]'
                    : 'bg-[#123B70] hover:bg-[#7B1E3A] text-white'
                }`}
              >
                {plan.priceEGP === 0 ? (isAr ? 'التسجيل المجاني' : 'Enroll Free') : (isAr ? 'اختيار الخطة' : 'Select Plan')}
              </button>
            </div>
          );
        })}
      </div>

      {/* Simulated Checkout Modal */}
      {selectedPlanForCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#B79A62]/40 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#123B70]" />
                <h3 className="font-bold text-base text-[#123B70]">
                  {isAr ? 'إتمام التسجيل الأكاديمي (تجريبي)' : 'Simulated Tuition Checkout'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPlanForCheckout(null)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {checkoutComplete ? (
              <div className="py-6 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-[#123B70]">
                  {isAr ? 'تم تأكيد الاشتراك بنجاح!' : 'Tuition Registration Confirmed!'}
                </h4>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  {isAr
                    ? 'تم تفعيل عضويتك الأكاديمية بنجاح في الوضع التجريبي. يمكنك الآن الوصول لكافة المقررات والشهادات.'
                    : 'Your membership is now simulated as active. You can now access all accredited courses, labs, and credentials.'}
                </p>
                <button
                  onClick={() => setSelectedPlanForCheckout(null)}
                  className="px-6 py-2.5 bg-[#123B70] text-white rounded-md text-xs font-bold"
                >
                  {isAr ? 'العودة للمنصة' : 'Return to Academy'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Plan Summary */}
                <div className="p-4 bg-[#F8F6F2] rounded-lg border border-gray-200 space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-sm text-[#123B70]">
                    <span>{isAr ? selectedPlanForCheckout.nameAr : selectedPlanForCheckout.name}</span>
                    <span>{calculateFinalPrice(selectedPlanForCheckout.priceEGP)} {t('currency_egp')}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-emerald-700 font-semibold text-[11px]">
                      <span>Discount (20% off coupon VITALIA20)</span>
                      <span>-{(selectedPlanForCheckout.priceEGP * 0.2).toFixed(0)} {t('currency_egp')}</span>
                    </div>
                  )}
                  <div className="text-[11px] text-gray-500">
                    {isAr ? 'العملة المعروضة: الجنيه المصري (EGP) • محاكاة تجريبية آمنة' : 'Primary Currency: EGP • Safe Simulated Payment Gateway'}
                  </div>
                </div>

                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder={isAr ? 'كود الخصم الأكاديمي (مثال: VITALIA20)' : 'Coupon Code (e.g. VITALIA20)'}
                    className="flex-1 text-xs px-3 py-2 border border-gray-300 rounded-md uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded-md hover:bg-black"
                  >
                    {t('btn_apply')}
                  </button>
                </form>

                {/* Demo notice */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-[11px] text-amber-800 flex items-start gap-2">
                  <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    {isAr
                      ? 'هذه شاشة محاكاة دفع تجريبية. لن يتم خصم أي مبالغ مالية حقيقية أو طلب بيانات بطاقات حقيقية.'
                      : 'This is a simulation checkout. No real financial cards are processed or stored.'}
                  </span>
                </div>

                <button
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="w-full py-3 bg-[#123B70] hover:bg-[#7B1E3A] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors"
                >
                  {isProcessing
                    ? (isAr ? 'جاري التحقق من المعاملة...' : 'Processing Simulated Payment...')
                    : (isAr ? `تأكيد الدفع (${calculateFinalPrice(selectedPlanForCheckout.priceEGP)} ج.م)` : `Complete Simulated Payment (${calculateFinalPrice(selectedPlanForCheckout.priceEGP)} EGP)`)}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
