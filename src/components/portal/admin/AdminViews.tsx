import React, { useState } from 'react';
import {
  User,
  UserRole,
  Course,
  Certificate,
  PaymentTransaction,
  SupportTicket,
  AuditLog,
} from '../../../types';
import { useI18n } from '../../../i18n/I18nContext';
import { INITIAL_USERS } from '../../../services/mockData';
import {
  Users,
  ShieldAlert,
  BookOpen,
  Award,
  DollarSign,
  LifeBuoy,
  History,
  Settings,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Lock,
} from 'lucide-react';

// ----------------------------------------------------------------------
// 1. ADMIN DASHBOARD OVERVIEW
// ----------------------------------------------------------------------
interface AdminDashboardOverviewProps {
  users: User[];
  courses: Course[];
  certificates: Certificate[];
  transactions: PaymentTransaction[];
  tickets: SupportTicket[];
  auditLogs: AuditLog[];
  onNavigateSection: (section: string) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  users,
  courses,
  certificates,
  transactions,
  tickets,
  auditLogs,
  onNavigateSection,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  const totalRevenueEGP = transactions
    .filter((t) => t.status === 'succeeded')
    .reduce((sum, t) => sum + t.amountEGP, 0);

  const pendingReviews = courses.filter((c) => c.status === 'pending_review' || c.status === 'draft').length;
  const openTickets = tickets.filter((t) => t.status === 'open' || t.status === 'in_progress').length;

  return (
    <div className="space-y-8 text-start">
      {/* Top Banner */}
      <div className="border-b border-[#E8E7E4] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#7B1E3A] uppercase tracking-wider">
            {isAr ? 'الإدارة المركزية للأكاديمية' : 'Executive Academy Administration'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#123B70] mt-1">
            {isAr ? 'لوحة تحكم المدير العام' : 'Platform Operations & Oversight'}
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            {isAr
              ? 'متابعة شؤون الطلاب، اعتماد المقررات، إدارة الشهادات والمالية، وسجلات العمليات'
              : 'Managing faculty rosters, course accreditations, credential verifications, and finance'}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'إجمالي المستخدمين' : 'Total System Users'}</span>
          <div className="text-2xl font-extrabold text-[#123B70] font-serif">{users.length} registered</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'مقررات بانتظار الاعتماد' : 'Pending Course Reviews'}</span>
          <div className="text-2xl font-extrabold text-[#7B1E3A] font-serif">{pendingReviews} courses</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'الشهادات الصادرة' : 'Issued Credentials'}</span>
          <div className="text-2xl font-extrabold text-emerald-700 font-serif">{certificates.length} valid</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">{isAr ? 'الإيرادات المحصلة (تجريبي)' : 'Simulated Revenue'}</span>
          <div className="text-2xl font-extrabold text-[#B79A62] font-serif">
            {totalRevenueEGP.toLocaleString()} {t('currency_egp')}
          </div>
        </div>
      </div>

      {/* Quick Navigation Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => onNavigateSection('admin_users')}
          className="bg-white p-6 rounded-xl border border-[#E8E7E4] hover:border-[#123B70] shadow-xs cursor-pointer transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <Users className="w-6 h-6 text-[#123B70]" />
            <span className="text-xs font-bold text-[#123B70] group-hover:underline">Manage →</span>
          </div>
          <h3 className="font-bold text-sm text-gray-900">{t('portal_admin_users')}</h3>
          <p className="text-xs text-gray-500">Inspect user accounts, assign roles, activate or suspend access.</p>
        </div>

        <div
          onClick={() => onNavigateSection('admin_certificates')}
          className="bg-white p-6 rounded-xl border border-[#E8E7E4] hover:border-[#123B70] shadow-xs cursor-pointer transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <Award className="w-6 h-6 text-[#7B1E3A]" />
            <span className="text-xs font-bold text-[#7B1E3A] group-hover:underline">Registry →</span>
          </div>
          <h3 className="font-bold text-sm text-gray-900">{t('portal_admin_certificates')}</h3>
          <p className="text-xs text-gray-500">Search credentials, audit records, revoke certificates with required justification.</p>
        </div>

        <div
          onClick={() => onNavigateSection('admin_tickets')}
          className="bg-white p-6 rounded-xl border border-[#E8E7E4] hover:border-[#123B70] shadow-xs cursor-pointer transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <LifeBuoy className="w-6 h-6 text-[#B79A62]" />
            <span className="text-xs font-bold text-[#B79A62] group-hover:underline">Helpdesk →</span>
          </div>
          <h3 className="font-bold text-sm text-gray-900">{t('portal_admin_tickets')}</h3>
          <p className="text-xs text-gray-500">{openTickets} open support cases requiring administrative assistance.</p>
        </div>
      </div>

      {/* Recent Administrative Audit Trail */}
      <div className="bg-white p-6 rounded-xl border border-[#E8E7E4] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <h3 className="font-bold text-sm text-[#123B70] uppercase tracking-wider flex items-center gap-2">
            <History className="w-4 h-4" />
            <span>{t('portal_admin_audit')}</span>
          </h3>
          <button
            onClick={() => onNavigateSection('admin_audit')}
            className="text-xs font-semibold text-[#7B1E3A] hover:underline"
          >
            {isAr ? 'عرض كافة السجلات' : 'Full Log'}
          </button>
        </div>

        <div className="divide-y divide-gray-100 text-xs">
          {auditLogs.slice(0, 4).map((log) => (
            <div key={log.id} className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-800">{isAr ? log.actionAr : log.action}</span>
                <span className="text-gray-400 ms-2">by {log.performedBy} ({log.userRole})</span>
              </div>
              <span className="text-gray-400 font-mono text-[11px]">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 2. USER MANAGEMENT VIEW
// ----------------------------------------------------------------------
interface UserManagementViewProps {
  users: User[];
  onUpdateStatus: (userId: string, status: 'active' | 'suspended') => void;
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({
  users,
  onUpdateStatus,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users.filter((u) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false;
    }
    if (roleFilter !== 'all' && !u.roles.includes(roleFilter as any)) return false;
    return true;
  });

  const handleToggleStatus = (u: User) => {
    // Prevent suspending the last super admin
    if (u.primaryRole === 'super_admin' && u.status === 'active') {
      alert(isAr ? 'لا يمكن تعليق حساب المدير العام الرئيسي للنظام لحماية الحوكمة.' : 'Cannot suspend the primary Super Administrator.');
      return;
    }
    const nextStatus = u.status === 'active' ? 'suspended' : 'active';
    const confirm = window.confirm(
      isAr
        ? `هل أنت متأكد من تغيير حالة حساب ${u.name} إلى ${nextStatus}؟`
        : `Confirm changing account status for ${u.name} to ${nextStatus}?`
    );
    if (confirm) {
      onUpdateStatus(u.id, nextStatus);
    }
  };

  return (
    <div className="space-y-6 text-start">
      <div className="border-b border-[#E8E7E4] pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#123B70]">
          {t('portal_admin_users')}
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          {isAr ? 'إدارة حسابات الطلاب، أعضاء هيئة التدريس، والمشرفين الأكاديميين' : 'Directory of students, faculty members, and administrative staff'}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2 left-3 rtl:right-3 rtl:left-auto" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isAr ? 'ابحث بالاسم أو البريد...' : 'Search by name or email...'}
            className="w-full text-xs pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 border border-gray-300 rounded-md bg-white"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="text-xs border border-gray-300 rounded-md px-3 py-2 bg-white"
        >
          <option value="all">{isAr ? 'كافة الأدوار' : 'All Roles'}</option>
          <option value="student">{isAr ? 'طالب' : 'Student'}</option>
          <option value="professor">{isAr ? 'أستاذ' : 'Professor'}</option>
          <option value="teaching_assistant">{isAr ? 'معيد' : 'Teaching Assistant'}</option>
          <option value="course_reviewer">{isAr ? 'مراجع' : 'Course Reviewer'}</option>
          <option value="super_admin">{isAr ? 'مدير عام' : 'Super Admin'}</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-[#E8E7E4] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold">
                <th className="p-3.5">User</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5">Primary Role</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Joined</th>
                <th className="p-3.5 text-end">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="p-3.5 flex items-center gap-2.5 font-bold text-gray-900">
                    <img src={u.avatar} alt="" className="w-7 h-7 rounded-full object-cover border" />
                    <span>{isAr ? u.nameAr || u.name : u.name}</span>
                  </td>
                  <td className="p-3.5 font-mono text-gray-600">{u.email}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#123B70]/10 text-[#123B70]">
                      {u.primaryRole.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      u.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-gray-500">{u.joinedDate}</td>
                  <td className="p-3.5 text-end">
                    <button
                      onClick={() => handleToggleStatus(u)}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                        u.status === 'active'
                          ? 'text-rose-700 hover:bg-rose-50 border border-rose-200'
                          : 'text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
                      }`}
                    >
                      {u.status === 'active' ? (isAr ? 'تعليق الحساب' : 'Suspend') : (isAr ? 'تنشيط' : 'Activate')}
                    </button>
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

// ----------------------------------------------------------------------
// 3. CERTIFICATE MANAGEMENT & REVOCATION VIEW
// ----------------------------------------------------------------------
interface CertificateManagementViewProps {
  certificates: Certificate[];
  onRevoke: (certId: string, reason: string) => void;
}

export const CertificateManagementView: React.FC<CertificateManagementViewProps> = ({
  certificates,
  onRevoke,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  const [selectedForRevoke, setSelectedForRevoke] = useState<Certificate | null>(null);
  const [revokeReason, setRevokeReason] = useState('');

  const handleConfirmRevoke = () => {
    if (selectedForRevoke && revokeReason.trim()) {
      onRevoke(selectedForRevoke.id, revokeReason.trim());
      setSelectedForRevoke(null);
      setRevokeReason('');
      alert(isAr ? 'تم سحب الشهادة رسمياً وتحديث حالة السجل العام.' : 'Certificate officially revoked and audit log updated.');
    }
  };

  return (
    <div className="space-y-6 text-start">
      <div className="border-b border-[#E8E7E4] pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#123B70]">
          {t('portal_admin_certificates')}
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          {isAr ? 'السجل المركزي لشهادات الإتمام والتحقق وحالات الإلغاء الأكاديمي' : 'Central registry of issued credentials, verifications, and revocation audit'}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#E8E7E4] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold">
                <th className="p-3.5">Certificate ID</th>
                <th className="p-3.5">Recipient</th>
                <th className="p-3.5">Curriculum</th>
                <th className="p-3.5">Issue Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-end">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {certificates.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50">
                  <td className="p-3.5 font-mono font-bold text-[#123B70]">
                    {cert.certificateNumber}
                  </td>
                  <td className="p-3.5 font-bold text-gray-900">
                    {isAr ? cert.studentNameAr : cert.studentName}
                  </td>
                  <td className="p-3.5 text-gray-700 truncate max-w-xs">
                    {isAr ? cert.courseTitleAr : cert.courseTitle}
                  </td>
                  <td className="p-3.5 text-gray-500">{cert.issueDate}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      cert.status === 'valid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-end">
                    {cert.status === 'valid' ? (
                      <button
                        onClick={() => setSelectedForRevoke(cert)}
                        className="px-2.5 py-1 text-rose-700 hover:bg-rose-50 border border-rose-200 rounded text-[11px] font-bold"
                      >
                        {isAr ? 'سحب الشهادة' : 'Revoke Credential'}
                      </button>
                    ) : (
                      <span className="text-[11px] text-gray-400 italic">Revoked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revocation Modal */}
      {selectedForRevoke && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-200">
            <h3 className="text-base font-bold text-rose-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>{isAr ? 'تأكيد سحب الشهادة الأكاديمية' : 'Confirm Credential Revocation'}</span>
            </h3>
            <p className="text-xs text-gray-600">
              Certificate <span className="font-mono font-bold text-black">{selectedForRevoke.certificateNumber}</span> issued to <span className="font-bold text-black">{selectedForRevoke.studentName}</span> will be marked as REVOKED across the public registry.
            </p>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Required Justification / Academic Senate Resolution *
              </label>
              <textarea
                rows={3}
                required
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                placeholder="Specify audit findings (e.g., academic integrity breach)..."
                className="w-full text-xs p-2.5 border border-gray-300 rounded"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setSelectedForRevoke(null)}
                className="px-4 py-2 border border-gray-300 rounded text-xs font-semibold"
              >
                {t('btn_cancel')}
              </button>
              <button
                disabled={!revokeReason.trim()}
                onClick={handleConfirmRevoke}
                className="px-5 py-2 bg-rose-700 disabled:opacity-50 text-white rounded text-xs font-bold hover:bg-rose-800"
              >
                {isAr ? 'تأكيد السحب' : 'Confirm Revocation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------
// 4. SUPPORT TICKETS HELPDESK VIEW
// ----------------------------------------------------------------------
interface SupportTicketsViewProps {
  tickets: SupportTicket[];
  onReply: (ticketId: string, text: string) => void;
  onUpdateStatus: (ticketId: string, status: SupportTicket['status']) => void;
}

export const SupportTicketsView: React.FC<SupportTicketsViewProps> = ({
  tickets,
  onReply,
  onUpdateStatus,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  const [activeTicket, setActiveTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTicket && replyText.trim()) {
      onReply(activeTicket.id, replyText.trim());
      setReplyText('');
      // update activeTicket messages in view
      setActiveTicket({
        ...activeTicket,
        messages: [
          ...activeTicket.messages,
          {
            id: `msg-${Date.now()}`,
            senderId: 'admin',
            senderName: 'Vitalia Academic Support',
            senderRole: 'super_admin',
            text: replyText.trim(),
            sentAt: 'Just now',
          },
        ],
      });
    }
  };

  return (
    <div className="space-y-6 text-start">
      <div className="border-b border-[#E8E7E4] pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#123B70]">
          {t('portal_admin_tickets')}
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          {isAr ? 'مكتب الدعم والمساعدة وحل استفسارات الطلاب وأعضاء هيئة التدريس' : 'Administrative helpdesk handling student and faculty inquiries'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Ticket List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {tickets.map((tkt) => {
            const isSelected = activeTicket?.id === tkt.id;
            return (
              <div
                key={tkt.id}
                onClick={() => setActiveTicket(tkt)}
                className={`p-4 rounded-xl border text-start cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#123B70] bg-[#123B70]/5 shadow-sm ring-1 ring-[#123B70]'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-mono font-bold text-[#7B1E3A]">{tkt.ticketNumber}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    tkt.status === 'open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {tkt.status}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-gray-900 truncate">{tkt.subject}</h4>
                <div className="text-[11px] text-gray-500 mt-1">
                  {tkt.userName} • {tkt.category}
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Thread Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          {activeTicket ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <span className="font-mono font-bold text-xs text-[#7B1E3A]">{activeTicket.ticketNumber}</span>
                  <h3 className="font-bold text-sm text-[#123B70]">{activeTicket.subject}</h3>
                  <div className="text-[11px] text-gray-500">From: {activeTicket.userName} ({activeTicket.userEmail})</div>
                </div>

                <select
                  value={activeTicket.status}
                  onChange={(e) => onUpdateStatus(activeTicket.id, e.target.value as any)}
                  className="text-xs border border-gray-300 rounded px-2.5 py-1 bg-white"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Chat Thread */}
              <div className="space-y-3 max-h-80 overflow-y-auto p-2">
                {activeTicket.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-xl border text-xs max-w-lg space-y-1 ${
                      m.senderRole === 'super_admin'
                        ? 'bg-[#123B70]/10 border-[#123B70]/30 ms-auto text-end'
                        : 'bg-[#F8F6F2] border-gray-200 me-auto text-start'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold">
                      <span>{m.senderName}</span>
                      <span>{m.sentAt}</span>
                    </div>
                    <p className="text-gray-800 leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <form onSubmit={handleSendReply} className="flex gap-2 pt-2 border-t border-gray-100">
                <input
                  type="text"
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={isAr ? 'اكتب رد مسؤولي الدعم الأكاديمي...' : 'Type administrative resolution message...'}
                  className="flex-1 text-xs px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#123B70] text-white rounded-md text-xs font-bold hover:bg-[#7B1E3A] shrink-0"
                >
                  {isAr ? 'إرسال الرد' : 'Reply'}
                </button>
              </form>
            </div>
          ) : (
            <div className="py-20 text-center text-xs text-gray-400">
              {isAr ? 'اختر تذكرة دعم لمعاينة تفاصيلها والرد عليها' : 'Select a support ticket from the list to view thread'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
