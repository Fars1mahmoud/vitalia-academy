import React from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { DEPARTMENTS, INITIAL_USERS } from '../../../services/mockData';
import {
  Building,
  BarChart3,
  Users,
  CheckCircle,
  TrendingUp,
  Award,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export const SupervisorDashboard: React.FC = () => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  return (
    <div className="space-y-8 text-start">
      <div className="border-b border-[#E8E7E4] pb-4">
        <span className="text-xs font-bold text-[#7B1E3A] uppercase tracking-wider">
          {isAr ? 'وكالة الشؤون الأكاديمية والرقابة العامة' : 'Office of Academic Affairs & Supervisory Oversight'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#123B70] mt-1">
          {t('portal_supervisor_overview')}
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          {isAr
            ? 'مؤشرات الأداء الأكاديمي، كفاءة التدريس، ونسب إتمام المقررات عبر الكليات والأقسام'
            : 'Departmental curriculum performance indicators, completion rates, and faculty quality metrics'}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'الأقسام والكليات' : 'Governed Departments'}</span>
          <div className="text-2xl font-extrabold text-[#123B70] font-serif">4 Divisions</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'معدل إتمام المقررات' : 'Curricular Completion'}</span>
          <div className="text-2xl font-extrabold text-emerald-700 font-serif">89.4%</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'متوسط درجات الاختبارات' : 'Mean Exam Score'}</span>
          <div className="text-2xl font-extrabold text-[#7B1E3A] font-serif">84.2%</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'مؤشر رضا الطلاب' : 'Student Satisfaction'}</span>
          <div className="text-2xl font-extrabold text-[#B79A62] font-serif">4.88 / 5.0</div>
        </div>
      </div>

      {/* Department Oversight Table */}
      <div className="bg-white p-6 rounded-xl border border-[#E8E7E4] shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#123B70] uppercase tracking-wider">
          {isAr ? 'مؤشرات الأداء عبر الكليات والأقسام' : 'Departmental Quality Performance'}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 uppercase">
                <th className="py-2.5 font-bold">{isAr ? 'الكلية / القسم' : 'Academic Department'}</th>
                <th className="py-2.5 font-bold">{isAr ? 'الرمز' : 'Code'}</th>
                <th className="py-2.5 font-bold">{isAr ? 'العميد / رئيس القسم' : 'Department Head'}</th>
                <th className="py-2.5 font-bold">{isAr ? 'المقررات' : 'Courses'}</th>
                <th className="py-2.5 font-bold">{isAr ? 'الطلاب' : 'Scholars'}</th>
                <th className="py-2.5 font-bold">{isAr ? 'كفاءة الإتمام' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {DEPARTMENTS.map((dept) => (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="py-3 font-bold text-[#123B70]">
                    {isAr ? dept.nameAr : dept.name}
                  </td>
                  <td className="py-3 font-mono text-gray-600">{dept.code}</td>
                  <td className="py-3 text-gray-800">{dept.headName}</td>
                  <td className="py-3 text-gray-700">{dept.coursesCount}</td>
                  <td className="py-3 font-medium text-gray-800">{dept.studentsCount.toLocaleString()}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      OPTIMAL (A+)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
