import React, { useState } from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import {
  GraduationCap,
  ClipboardList,
  Users,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  Flag,
} from 'lucide-react';

export const TADashboard: React.FC = () => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  const [studentFlags, setStudentFlags] = useState([
    { id: '1', name: 'Karim Mansour', course: 'Applied Deep Learning', reason: 'High lab engagement, recommended for research assistantship' },
    { id: '2', name: 'Omar Khaled', course: 'Robotics & ROS2', reason: 'Missed Lab 1 deadline, sent reminder' },
  ]);

  const [newFlagName, setNewFlagName] = useState('');
  const [newFlagReason, setNewFlagReason] = useState('');

  const handleAddFlag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFlagName.trim() && newFlagReason.trim()) {
      setStudentFlags([
        ...studentFlags,
        {
          id: String(Date.now()),
          name: newFlagName.trim(),
          course: 'School of Computing Labs',
          reason: newFlagReason.trim(),
        },
      ]);
      setNewFlagName('');
      setNewFlagReason('');
    }
  };

  return (
    <div className="space-y-8 text-start">
      <div className="border-b border-[#E8E7E4] pb-4">
        <span className="text-xs font-bold text-[#7B1E3A] uppercase tracking-wider">
          {isAr ? 'منصة المعيدين ومساعدي التدريس' : 'Teaching Assistant & Lab Portal'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#123B70] mt-1">
          {t('portal_overview')}
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          {isAr
            ? 'متابعة المجموعات الطلابية، تصحيح التكليفات المسندة، وتقديم الدعم الميداني والمعملي'
            : 'Mentoring student lab cohorts, grading assigned benchmarks, and addressing student Q&A'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'المقررات المسندة' : 'Assigned Lab Cohorts'}</span>
          <div className="text-2xl font-extrabold text-[#123B70] font-serif">3 Cohorts</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'الطلاب الخاضعون للإشراف' : 'Supervised Scholars'}</span>
          <div className="text-2xl font-extrabold text-emerald-700 font-serif">142 Students</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'أسئلة معملية بانتظار الإجابة' : 'Unresolved Q&A'}</span>
          <div className="text-2xl font-extrabold text-[#7B1E3A] font-serif">2 Queries</div>
        </div>
      </div>

      {/* Student Academic Flagging System */}
      <div className="bg-white p-6 rounded-xl border border-[#E8E7E4] shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#123B70] uppercase tracking-wider flex items-center gap-2">
          <Flag className="w-4 h-4 text-[#7B1E3A]" />
          <span>{isAr ? 'ملاحظات الطلاب وتنبيهات الأستاذ' : 'Scholars Requiring Academic Attention / Flags'}</span>
        </h3>

        <div className="space-y-3">
          {studentFlags.map((fl) => (
            <div key={fl.id} className="p-3 bg-[#F8F6F2] rounded-lg border border-gray-200 flex items-start justify-between text-xs">
              <div className="space-y-0.5">
                <div className="font-bold text-[#123B70]">{fl.name} • <span className="text-gray-500 font-normal">{fl.course}</span></div>
                <div className="text-gray-700">{fl.reason}</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 shrink-0">
                Logged
              </span>
            </div>
          ))}
        </div>

        {/* Add Flag Form */}
        <form onSubmit={handleAddFlag} className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            required
            value={newFlagName}
            onChange={(e) => setNewFlagName(e.target.value)}
            placeholder={isAr ? 'اسم الطالب...' : 'Scholar Name...'}
            className="text-xs p-2 border border-gray-300 rounded sm:w-48"
          />
          <input
            type="text"
            required
            value={newFlagReason}
            onChange={(e) => setNewFlagReason(e.target.value)}
            placeholder={isAr ? 'الملاحظة المعملية أو الأكاديمية...' : 'Observation or recommendation...'}
            className="text-xs p-2 border border-gray-300 rounded flex-1"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#123B70] text-white rounded text-xs font-bold hover:bg-[#7B1E3A] shrink-0"
          >
            + {isAr ? 'تسجيل ملاحظة' : 'Log Flag'}
          </button>
        </form>
      </div>
    </div>
  );
};
