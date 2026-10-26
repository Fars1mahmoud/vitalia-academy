import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { useI18n } from '../../i18n/I18nContext';
import { Logo } from '../common/Logo';
import { RoleSwitcherBanner } from '../common/RoleSwitcherBanner';
import { vitaliaStore } from '../../services/storageService';
import {
  GraduationCap,
  BookOpen,
  CheckSquare,
  FileSpreadsheet,
  Award,
  Bookmark,
  Bell,
  CreditCard,
  LifeBuoy,
  User as UserIcon,
  Settings,
  PlusCircle,
  Users,
  Layers,
  Database,
  BarChart3,
  DollarSign,
  ClipboardList,
  CheckCircle,
  Eye,
  Building,
  ShieldAlert,
  Search,
  Globe,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  FileText,
  Activity,
  History,
} from 'lucide-react';

interface PortalLayoutProps {
  currentUser: User;
  activeView: string;
  onNavigateView: (view: string) => void;
  onSwitchRole: (role: UserRole) => void;
  onExitPortal: () => void;
  children: React.ReactNode;
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({
  currentUser,
  activeView,
  onNavigateView,
  onSwitchRole,
  onExitPortal,
  children,
}) => {
  const { language, toggleLanguage, t } = useI18n();
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const notifications = vitaliaStore.getNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Build role-specific navigation menu
  const getNavItems = () => {
    const role = currentUser.primaryRole;

    if (role === 'student') {
      return [
        { id: 'overview', label: t('portal_overview'), icon: GraduationCap },
        { id: 'my_learning', label: t('portal_my_learning'), icon: BookOpen },
        { id: 'assignments', label: t('portal_assignments'), icon: CheckSquare },
        { id: 'exams', label: t('portal_exams'), icon: FileSpreadsheet },
        { id: 'grades', label: t('portal_grades'), icon: Award },
        { id: 'certificates', label: t('portal_certificates'), icon: Award },
        { id: 'bookmarks', label: t('portal_bookmarks'), icon: Bookmark },
        { id: 'billing', label: t('portal_billing'), icon: CreditCard },
        { id: 'support', label: t('portal_support'), icon: LifeBuoy },
        { id: 'profile', label: t('portal_profile'), icon: UserIcon },
        { id: 'settings', label: t('portal_settings'), icon: Settings },
      ];
    }

    if (role === 'professor' || role === 'instructor') {
      return [
        { id: 'instructor_dashboard', label: t('portal_overview'), icon: BarChart3 },
        { id: 'instructor_courses', label: t('portal_instructor_courses'), icon: BookOpen },
        { id: 'create_course', label: t('portal_create_course'), icon: PlusCircle },
        { id: 'instructor_students', label: t('portal_students_roster'), icon: Users },
        { id: 'instructor_grading', label: t('portal_grading'), icon: CheckSquare },
        { id: 'question_bank', label: t('portal_question_bank'), icon: Database },
        { id: 'course_analytics', label: t('portal_course_analytics'), icon: Activity },
        { id: 'instructor_earnings', label: t('portal_earnings'), icon: DollarSign },
        { id: 'support', label: t('portal_support'), icon: LifeBuoy },
        { id: 'profile', label: t('portal_profile'), icon: UserIcon },
      ];
    }

    if (role === 'teaching_assistant') {
      return [
        { id: 'ta_dashboard', label: t('portal_overview'), icon: GraduationCap },
        { id: 'ta_tasks', label: t('portal_ta_tasks'), icon: ClipboardList },
        { id: 'ta_students', label: t('portal_ta_students'), icon: Users },
        { id: 'support', label: t('portal_support'), icon: LifeBuoy },
        { id: 'profile', label: t('portal_profile'), icon: UserIcon },
      ];
    }

    if (role === 'course_reviewer') {
      return [
        { id: 'reviewer_dashboard', label: t('portal_overview'), icon: Eye },
        { id: 'reviewer_pending', label: t('portal_reviewer_pending'), icon: ClipboardList },
        { id: 'reviewer_checklists', label: t('portal_reviewer_checklists'), icon: CheckCircle },
        { id: 'support', label: t('portal_support'), icon: LifeBuoy },
        { id: 'profile', label: t('portal_profile'), icon: UserIcon },
      ];
    }

    if (role === 'academic_supervisor') {
      return [
        { id: 'supervisor_dashboard', label: t('portal_overview'), icon: Building },
        { id: 'supervisor_oversight', label: t('portal_supervisor_overview'), icon: Layers },
        { id: 'supervisor_metrics', label: t('portal_supervisor_metrics'), icon: BarChart3 },
        { id: 'support', label: t('portal_support'), icon: LifeBuoy },
        { id: 'profile', label: t('portal_profile'), icon: UserIcon },
      ];
    }

    // Default: Admin (Super Admin / Academy Admin)
    return [
      { id: 'admin_dashboard', label: t('portal_overview'), icon: BarChart3 },
      { id: 'admin_users', label: t('portal_admin_users'), icon: Users },
      { id: 'admin_roles', label: t('portal_admin_roles'), icon: ShieldAlert },
      { id: 'admin_courses', label: t('portal_admin_courses'), icon: BookOpen },
      { id: 'admin_certificates', label: t('portal_admin_certificates'), icon: Award },
      { id: 'admin_payments', label: t('portal_admin_payments'), icon: DollarSign },
      { id: 'admin_tickets', label: t('portal_admin_tickets'), icon: LifeBuoy },
      { id: 'admin_audit', label: t('portal_admin_audit'), icon: History },
      { id: 'admin_settings', label: t('portal_admin_settings'), icon: Settings },
    ];
  };

  const navItems = getNavItems();

  const handleNotificationClick = (id: string, link?: string) => {
    vitaliaStore.markNotificationRead(id);
    if (link) {
      onNavigateView(link);
      setNotificationsOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex flex-col">
      {/* 1. Global Role Switcher Banner */}
      <RoleSwitcherBanner
        currentRole={currentUser.primaryRole}
        onSwitchRole={onSwitchRole}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Responsive Sidebar */}
        <aside
          className={`fixed inset-y-0 z-50 flex flex-col w-64 bg-[#0B2548] text-white border-e border-[#B79A62]/30 transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : (isAr ? 'translate-x-full' : '-translate-x-full')
          }`}
        >
          {/* Sidebar Top: Logo */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
            <Logo size="sm" variant="light" showTagline={false} />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Mini Card in Sidebar */}
          <div className="p-4 mx-3 my-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border border-[#DFCA9B]"
            />
            <div className="flex-1 min-w-0 text-start">
              <div className="text-xs font-bold text-white truncate">
                {isAr ? currentUser.nameAr || currentUser.name : currentUser.name}
              </div>
              <div className="text-[10px] text-[#DFCA9B] font-semibold truncate capitalize">
                {currentUser.primaryRole.replace('_', ' ')}
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigateView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-start ${
                    isActive
                      ? 'bg-[#123B70] text-[#DFCA9B] font-bold shadow-xs border-s-4 border-[#DFCA9B]'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#DFCA9B]' : 'text-white/60'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Sidebar Bottom: Back to Website / Logout */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <button
              onClick={onExitPortal}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium transition-colors"
            >
              <span>{isAr ? 'العودة لموقع الأكاديمية' : 'Public Website'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>

        {/* Sidebar Overlay on Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 3. Main Body */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Topbar */}
          <header className="h-16 bg-white border-b border-[#E8E7E4] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                aria-label="Open Navigation"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Portal Breadcrumb */}
              <div className="text-xs font-bold text-[#123B70] uppercase tracking-wider flex items-center gap-2">
                <span>Vitalia Portal</span>
                <span>/</span>
                <span className="text-[#7B1E3A] capitalize">
                  {currentUser.primaryRole.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Language Switch */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-[#123B70] bg-[#F8F6F2] hover:bg-gray-200 border border-gray-300 transition-colors"
                title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
              >
                <Globe className="w-3.5 h-3.5 text-[#B79A62]" />
                <span className="hidden sm:inline font-arabic">{isAr ? 'English (EN)' : 'العربية (AR)'}</span>
              </button>

              {/* Notification Center Bell */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-full text-gray-600 hover:text-[#123B70] hover:bg-gray-100 relative transition-colors"
                  aria-label="View Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#7B1E3A] text-white text-[10px] font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Drawer Dropdown */}
                {notificationsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setNotificationsOpen(false)}
                    />
                    <div className={`absolute top-full mt-2 w-80 sm:w-96 bg-white rounded-xl border border-gray-200 shadow-2xl z-30 p-4 space-y-3 ${isAr ? 'left-0' : 'right-0'}`}>
                      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                        <span className="font-bold text-xs uppercase tracking-wider text-[#123B70]">
                          {t('portal_notifications')}
                        </span>
                        <button
                          onClick={() => vitaliaStore.markAllNotificationsRead()}
                          className="text-[11px] text-[#7B1E3A] hover:underline font-semibold"
                        >
                          {isAr ? 'تحديد الكل كمقروء' : 'Mark all read'}
                        </button>
                      </div>

                      <div className="space-y-2 max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="py-6 text-center text-xs text-gray-400">
                            {isAr ? 'لا توجد إشعارات حالياً' : 'No notifications'}
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              onClick={() => handleNotificationClick(n.id, n.link)}
                              className={`p-3 rounded-lg border text-start transition-colors cursor-pointer text-xs ${
                                n.read
                                  ? 'bg-white border-gray-100 text-gray-600'
                                  : 'bg-blue-50/70 border-blue-100 text-gray-900 font-medium'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[11px] mb-1">
                                <span className="font-bold text-[#123B70]">
                                  {isAr ? n.titleAr : n.title}
                                </span>
                                <span className="text-gray-400 text-[10px]">{n.timestamp}</span>
                              </div>
                              <p className="text-[11px] text-gray-600">
                                {isAr ? n.messageAr : n.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* User Avatar Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#123B70]/30 transition-all"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#B79A62]"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className={`absolute top-full mt-2 w-56 bg-white rounded-xl border border-gray-200 shadow-xl z-30 p-2 space-y-1 text-xs ${isAr ? 'left-0' : 'right-0'}`}>
                      <div className="px-3 py-2 border-b border-gray-100">
                        <div className="font-bold text-gray-900 truncate">
                          {isAr ? currentUser.nameAr || currentUser.name : currentUser.name}
                        </div>
                        <div className="text-[11px] text-gray-500 truncate">{currentUser.email}</div>
                      </div>

                      <button
                        onClick={() => {
                          onNavigateView('profile');
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 text-start"
                      >
                        <UserIcon className="w-4 h-4 text-gray-400" />
                        <span>{t('portal_profile')}</span>
                      </button>

                      <button
                        onClick={() => {
                          onNavigateView('settings');
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 text-start"
                      >
                        <Settings className="w-4 h-4 text-gray-400" />
                        <span>{t('portal_settings')}</span>
                      </button>

                      <div className="border-t border-gray-100 pt-1">
                        <button
                          onClick={onExitPortal}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-rose-50 text-rose-700 text-start font-semibold"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{t('nav_logout')}</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Main Dashboard Canvas */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
