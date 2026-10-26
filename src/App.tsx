import React, { useState } from 'react';
import { I18nProvider, useI18n } from './i18n/I18nContext';
import { UserRole, Course, User, Enrollment } from './types';
import { vitaliaStore } from './services/storageService';
import { INITIAL_USERS, INITIAL_TRANSACTIONS } from './services/mockData';

// Public Components
import { PublicNavbar } from './components/public/PublicNavbar';
import { PublicFooter } from './components/public/PublicFooter';
import { HomePage } from './components/public/HomePage';
import { CourseCatalogPage } from './components/public/CourseCatalogPage';
import { CourseDetailsPage } from './components/public/CourseDetailsPage';
import { CertificateVerificationPage } from './components/public/CertificateVerificationPage';
import { InstructorsDirectoryPage } from './components/public/InstructorsDirectoryPage';
import { AcademicProgramsPage } from './components/public/AcademicProgramsPage';
import { PricingPlansPage } from './components/public/PricingPlansPage';
import { AboutPage } from './components/public/AboutPage';
import { ContactPage, FaqPage } from './components/public/ContactHelpPages';
import { LegalPage } from './components/public/LegalPages';
import { AuthPages } from './components/public/AuthPages';

// Portal Components
import { PortalLayout } from './components/portal/PortalLayout';
import {
  StudentDashboard,
  MyLearningView,
  CertificatesView,
  AssignmentsView,
} from './components/portal/student/StudentViews';
import { CoursePlayerModal } from './components/portal/student/CoursePlayerModal';
import { ExamsView } from './components/portal/student/ExamsView';
import {
  InstructorDashboard,
  CourseBuilder,
  InstructorGradingView,
} from './components/portal/instructor/InstructorViews';
import { TADashboard } from './components/portal/ta/TAViews';
import { ReviewerDashboard } from './components/portal/reviewer/ReviewerViews';
import { SupervisorDashboard } from './components/portal/supervisor/SupervisorViews';
import {
  AdminDashboardOverview,
  UserManagementView,
  CertificateManagementView,
  SupportTicketsView,
} from './components/portal/admin/AdminViews';
import { ProfileSettingsView } from './components/portal/shared/ProfileSettingsView';

const VitaliaApp: React.FC = () => {
  const { language } = useI18n();

  // App Navigation State
  const [currentSection, setCurrentSection] = useState<'public' | 'portal'>('public');
  const [publicRoute, setPublicRoute] = useState<string>('home');
  const [portalView, setPortalView] = useState<string>('overview');

  // Interactive Models State
  const [currentUser, setCurrentUser] = useState<User>(() => vitaliaStore.getCurrentUser());
  const [courses, setCourses] = useState<Course[]>(() => vitaliaStore.getCourses());
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => vitaliaStore.getEnrollments());
  const [bookmarks, setBookmarks] = useState<string[]>(() => vitaliaStore.getBookmarks());
  const [certificates, setCertificates] = useState(() => vitaliaStore.getCertificates());
  const [assignments, setAssignments] = useState(() => vitaliaStore.getAssignments());
  const [submissions, setSubmissions] = useState(() => vitaliaStore.getSubmissions());
  const [tickets, setTickets] = useState(() => vitaliaStore.getTickets());
  const [auditLogs, setAuditLogs] = useState(() => vitaliaStore.getAuditLogs());

  // Deep Link & Modal States
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(courses[0]);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<string | undefined>(undefined);
  const [verifyCertId, setVerifyCertId] = useState<string>('VIT-2026-90412');
  const [catalogCategory, setCatalogCategory] = useState<string>('all');
  const [catalogQuery, setCatalogQuery] = useState<string>('');

  // ----------------------------------------------------
  // Handlers
  // ----------------------------------------------------
  const handleRoleSwitch = (role: UserRole) => {
    const updated = vitaliaStore.switchRole(role);
    setCurrentUser(updated);

    // Map default view per role
    if (role === 'student') setPortalView('overview');
    else if (role === 'professor' || role === 'instructor') setPortalView('instructor_dashboard');
    else if (role === 'teaching_assistant') setPortalView('ta_dashboard');
    else if (role === 'course_reviewer') setPortalView('reviewer_dashboard');
    else if (role === 'academic_supervisor') setPortalView('supervisor_dashboard');
    else setPortalView('admin_dashboard');
  };

  const handlePublicNavigate = (route: string) => {
    if (route.startsWith('courses?q=')) {
      const q = decodeURIComponent(route.replace('courses?q=', ''));
      setCatalogQuery(q);
      setCatalogCategory('all');
      setPublicRoute('courses');
    } else if (route.startsWith('verify?id=')) {
      const id = route.replace('verify?id=', '');
      setVerifyCertId(id);
      setPublicRoute('verify');
    } else {
      setPublicRoute(route);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setPublicRoute('course_details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (catId: string) => {
    setCatalogCategory(catId);
    setCatalogQuery('');
    setPublicRoute('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (courseId: string) => {
    vitaliaStore.toggleBookmark(courseId);
    setBookmarks([...vitaliaStore.getBookmarks()]);
  };

  const handleEnroll = (courseId: string) => {
    vitaliaStore.enrollInCourse(courseId);
    setEnrollments([...vitaliaStore.getEnrollments()]);
    setCourses([...vitaliaStore.getCourses()]);
    const course = vitaliaStore.getCourseById(courseId);
    if (course) {
      setSelectedCourse(course);
      setIsPlayerOpen(true);
    }
  };

  const handleResumeCourse = (courseId: string) => {
    const course = vitaliaStore.getCourseById(courseId);
    if (course) {
      setSelectedCourse(course);
      setIsPlayerOpen(true);
    }
  };

  const handleMarkLessonComplete = (courseId: string, lessonId: string) => {
    vitaliaStore.markLessonComplete(courseId, lessonId);
    setEnrollments([...vitaliaStore.getEnrollments()]);
    setCertificates([...vitaliaStore.getCertificates()]);
  };

  const handleSaveNewCourse = (course: Course) => {
    vitaliaStore.addCourse(course);
    setCourses([...vitaliaStore.getCourses()]);
    setAuditLogs([...vitaliaStore.getAuditLogs()]);
    setPortalView('instructor_courses');
  };

  const handleGradeSubmission = (submissionId: string, grade: number, feedback: string) => {
    vitaliaStore.gradeSubmission(submissionId, grade, feedback);
    setSubmissions([...vitaliaStore.getSubmissions()]);
  };

  const handleRevokeCert = (certId: string, reason: string) => {
    vitaliaStore.revokeCertificate(certId, reason);
    setCertificates([...vitaliaStore.getCertificates()]);
    setAuditLogs([...vitaliaStore.getAuditLogs()]);
  };

  const handleUpdateUserStatus = (userId: string, status: 'active' | 'suspended') => {
    vitaliaStore.updateUserStatus(userId, status);
  };

  const enrolledCourseIds = enrollments.map((e) => e.courseId);

  // ----------------------------------------------------
  // Render Public or Portal
  // ----------------------------------------------------
  if (currentSection === 'portal') {
    const matchingEnrollment = selectedCourse
      ? enrollments.find((e) => e.courseId === selectedCourse.id)
      : undefined;

    return (
      <>
        <PortalLayout
          currentUser={currentUser}
          activeView={portalView}
          onNavigateView={(view) => setPortalView(view)}
          onSwitchRole={handleRoleSwitch}
          onExitPortal={() => setCurrentSection('public')}
        >
          {/* Student Portal Views */}
          {portalView === 'overview' && (
            <StudentDashboard
              studentName={currentUser.name}
              enrollments={enrollments}
              courses={courses}
              certificates={certificates}
              assignments={assignments}
              exams={vitaliaStore.getExams()}
              onResumeCourse={handleResumeCourse}
              onNavigateView={setPortalView}
            />
          )}

          {portalView === 'my_learning' && (
            <MyLearningView
              enrollments={enrollments}
              courses={courses}
              onResumeCourse={handleResumeCourse}
              onExploreCourses={() => {
                setCurrentSection('public');
                setPublicRoute('courses');
              }}
            />
          )}

          {portalView === 'assignments' && (
            <AssignmentsView
              assignments={assignments}
              submissions={submissions}
              onSubmitAssignment={(id, text, file) => {
                vitaliaStore.submitAssignment(id, text, file);
                setSubmissions([...vitaliaStore.getSubmissions()]);
              }}
            />
          )}

          {portalView === 'exams' && (
            <ExamsView
              exams={vitaliaStore.getExams()}
              selectedExamId={selectedExamId}
              onRecordAttempt={(att) => {
                vitaliaStore.recordExamAttempt(att);
                setEnrollments([...vitaliaStore.getEnrollments()]);
              }}
            />
          )}

          {portalView === 'certificates' && (
            <CertificatesView certificates={certificates} />
          )}

          {portalView === 'bookmarks' && (
            <MyLearningView
              enrollments={enrollments.filter((e) => bookmarks.includes(e.courseId))}
              courses={courses.filter((c) => bookmarks.includes(c.id))}
              onResumeCourse={handleResumeCourse}
              onExploreCourses={() => {
                setCurrentSection('public');
                setPublicRoute('courses');
              }}
            />
          )}

          {/* Instructor Portal Views */}
          {portalView === 'instructor_dashboard' && (
            <InstructorDashboard
              instructor={currentUser}
              courses={courses}
              submissions={submissions}
              onCreateCourseClick={() => setPortalView('create_course')}
              onNavigateGrading={() => setPortalView('instructor_grading')}
            />
          )}

          {portalView === 'instructor_courses' && (
            <InstructorDashboard
              instructor={currentUser}
              courses={courses}
              submissions={submissions}
              onCreateCourseClick={() => setPortalView('create_course')}
              onNavigateGrading={() => setPortalView('instructor_grading')}
            />
          )}

          {portalView === 'create_course' && (
            <CourseBuilder
              instructor={currentUser}
              onSaveCourse={handleSaveNewCourse}
              onCancel={() => setPortalView('instructor_dashboard')}
            />
          )}

          {portalView === 'instructor_grading' && (
            <InstructorGradingView
              submissions={submissions}
              onGradeSubmission={handleGradeSubmission}
            />
          )}

          {portalView === 'instructor_students' && (
            <UserManagementView
              users={INITIAL_USERS.filter((u) => u.primaryRole === 'student')}
              onUpdateStatus={handleUpdateUserStatus}
            />
          )}

          {portalView === 'question_bank' && (
            <ExamsView
              exams={vitaliaStore.getExams()}
              selectedExamId={selectedExamId}
            />
          )}

          {portalView === 'course_analytics' && (
            <SupervisorDashboard />
          )}

          {portalView === 'instructor_earnings' && (
            <PricingPlansPage />
          )}

          {/* Teaching Assistant Portal */}
          {portalView === 'ta_dashboard' && <TADashboard />}
          {portalView === 'ta_tasks' && (
            <InstructorGradingView
              submissions={submissions}
              onGradeSubmission={handleGradeSubmission}
            />
          )}
          {portalView === 'ta_students' && <TADashboard />}

          {/* Course Reviewer Portal */}
          {portalView === 'reviewer_dashboard' && (
            <ReviewerDashboard
              courses={courses}
              onApproveCourse={(cid) => {
                vitaliaStore.updateCourseStatus(cid, 'published');
                setCourses([...vitaliaStore.getCourses()]);
                setAuditLogs([...vitaliaStore.getAuditLogs()]);
              }}
              onRequestChanges={(cid) => {
                vitaliaStore.updateCourseStatus(cid, 'changes_requested');
                setCourses([...vitaliaStore.getCourses()]);
                setAuditLogs([...vitaliaStore.getAuditLogs()]);
              }}
              onRejectCourse={(cid) => {
                vitaliaStore.updateCourseStatus(cid, 'draft');
                setCourses([...vitaliaStore.getCourses()]);
                setAuditLogs([...vitaliaStore.getAuditLogs()]);
              }}
            />
          )}
          {portalView === 'reviewer_pending' && (
            <ReviewerDashboard
              courses={courses}
              onApproveCourse={(cid) => vitaliaStore.updateCourseStatus(cid, 'published')}
              onRequestChanges={(cid) => vitaliaStore.updateCourseStatus(cid, 'changes_requested')}
              onRejectCourse={(cid) => vitaliaStore.updateCourseStatus(cid, 'draft')}
            />
          )}

          {/* Academic Supervisor Portal */}
          {portalView === 'supervisor_dashboard' && <SupervisorDashboard />}
          {portalView === 'supervisor_oversight' && <SupervisorDashboard />}
          {portalView === 'supervisor_metrics' && <SupervisorDashboard />}

          {/* Administration Portal Views */}
          {portalView === 'admin_dashboard' && (
            <AdminDashboardOverview
              users={INITIAL_USERS}
              courses={courses}
              certificates={certificates}
              transactions={INITIAL_TRANSACTIONS}
              tickets={tickets}
              auditLogs={auditLogs}
              onNavigateSection={setPortalView}
            />
          )}

          {portalView === 'admin_users' && (
            <UserManagementView
              users={INITIAL_USERS}
              onUpdateStatus={handleUpdateUserStatus}
            />
          )}

          {portalView === 'admin_roles' && (
            <UserManagementView
              users={INITIAL_USERS}
              onUpdateStatus={handleUpdateUserStatus}
            />
          )}

          {portalView === 'admin_courses' && (
            <ReviewerDashboard
              courses={courses}
              onApproveCourse={(cid) => {
                vitaliaStore.updateCourseStatus(cid, 'published');
                setCourses([...vitaliaStore.getCourses()]);
              }}
              onRequestChanges={(cid) => vitaliaStore.updateCourseStatus(cid, 'changes_requested')}
              onRejectCourse={(cid) => vitaliaStore.updateCourseStatus(cid, 'draft')}
            />
          )}

          {portalView === 'admin_certificates' && (
            <CertificateManagementView
              certificates={certificates}
              onRevoke={handleRevokeCert}
            />
          )}

          {portalView === 'admin_payments' && (
            <PricingPlansPage />
          )}

          {portalView === 'admin_tickets' && (
            <SupportTicketsView
              tickets={tickets}
              onReply={(id, text) => {
                vitaliaStore.replyToTicket(id, text);
                setTickets([...vitaliaStore.getTickets()]);
              }}
              onUpdateStatus={(id, st) => {
                vitaliaStore.updateTicketStatus(id, st);
                setTickets([...vitaliaStore.getTickets()]);
              }}
            />
          )}

          {portalView === 'admin_audit' && (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4 text-start">
              <h2 className="text-base font-bold text-[#123B70] uppercase tracking-wider">
                Platform Security & Administrative Audit Trail
              </h2>
              <div className="divide-y divide-gray-100 text-xs">
                {auditLogs.map((log) => (
                  <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <div className="font-bold text-gray-900">{log.action}</div>
                      <div className="text-gray-500 text-[11px]">
                        Officer: {log.performedBy} ({log.userRole}) • IP: {log.ipAddress}
                      </div>
                    </div>
                    <span className="font-mono text-gray-400 text-[11px]">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shared Profile & Settings View */}
          {(portalView === 'profile' || portalView === 'settings') && (
            <ProfileSettingsView
              currentUser={currentUser}
              onUpdateUser={(updated) => {
                const newUser = { ...currentUser, ...updated };
                setCurrentUser(newUser);
                vitaliaStore.setCurrentUser(newUser);
              }}
            />
          )}

          {portalView === 'support' && (
            <SupportTicketsView
              tickets={tickets}
              onReply={(id, text) => {
                vitaliaStore.replyToTicket(id, text);
                setTickets([...vitaliaStore.getTickets()]);
              }}
              onUpdateStatus={(id, st) => {
                vitaliaStore.updateTicketStatus(id, st);
                setTickets([...vitaliaStore.getTickets()]);
              }}
            />
          )}

          {portalView === 'billing' && (
            <PricingPlansPage />
          )}
        </PortalLayout>

        {/* Course Video Player Modal */}
        {isPlayerOpen && selectedCourse && (
          <CoursePlayerModal
            course={selectedCourse}
            enrollment={matchingEnrollment}
            onClose={() => setIsPlayerOpen(false)}
            onMarkLessonComplete={handleMarkLessonComplete}
            onOpenExam={(examId) => {
              setIsPlayerOpen(false);
              setSelectedExamId(examId);
              setPortalView('exams');
            }}
            onViewCertificates={() => {
              setIsPlayerOpen(false);
              setPortalView('certificates');
            }}
          />
        )}
      </>
    );
  }

  // ----------------------------------------------------
  // Render Public Website
  // ----------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F2]">
      {/* Public Navbar */}
      <PublicNavbar
        currentRoute={publicRoute}
        onNavigate={handlePublicNavigate}
        onOpenPortal={() => setCurrentSection('portal')}
      />

      {/* Public Route Canvas */}
      <main className="flex-1">
        {publicRoute === 'home' && (
          <HomePage
            courses={courses}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onNavigate={handlePublicNavigate}
            onSelectCourse={handleSelectCourse}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {publicRoute === 'courses' && (
          <CourseCatalogPage
            courses={courses}
            bookmarks={bookmarks}
            enrolledCourseIds={enrolledCourseIds}
            initialCategory={catalogCategory}
            initialQuery={catalogQuery}
            onToggleBookmark={handleToggleBookmark}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {publicRoute === 'categories' && (
          <CourseCatalogPage
            courses={courses}
            bookmarks={bookmarks}
            enrolledCourseIds={enrolledCourseIds}
            initialCategory={catalogCategory}
            initialQuery={catalogQuery}
            onToggleBookmark={handleToggleBookmark}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {publicRoute === 'course_details' && selectedCourse && (
          <CourseDetailsPage
            course={selectedCourse}
            isEnrolled={enrolledCourseIds.includes(selectedCourse.id)}
            isBookmarked={bookmarks.includes(selectedCourse.id)}
            relatedCourses={courses.filter((c) => c.id !== selectedCourse.id).slice(0, 3)}
            onEnroll={handleEnroll}
            onContinueLearning={handleResumeCourse}
            onToggleBookmark={handleToggleBookmark}
            onSelectRelatedCourse={handleSelectCourse}
            onBackToCatalog={() => handlePublicNavigate('courses')}
          />
        )}

        {publicRoute === 'instructors' && (
          <InstructorsDirectoryPage
            onSelectInstructorCourses={(instId) => {
              setCatalogCategory('all');
              setCatalogQuery('');
              setPublicRoute('courses');
            }}
          />
        )}

        {publicRoute === 'programs' && (
          <AcademicProgramsPage
            onNavigateCourses={() => handlePublicNavigate('courses')}
          />
        )}

        {publicRoute === 'pricing' && <PricingPlansPage />}

        {publicRoute === 'verify' && (
          <CertificateVerificationPage
            initialCertNumber={verifyCertId}
            onLookup={(num) => vitaliaStore.getCertificateByNumber(num)}
          />
        )}

        {publicRoute === 'about' && <AboutPage />}
        {publicRoute === 'how_it_works' && <AboutPage />}
        {publicRoute === 'contact' && <ContactPage />}
        {publicRoute === 'help' && <FaqPage />}
        {publicRoute === 'faq' && <FaqPage />}

        {publicRoute === 'privacy' && <LegalPage type="privacy" />}
        {publicRoute === 'terms' && <LegalPage type="terms" />}
        {publicRoute === 'refund' && <LegalPage type="refund" />}

        {(publicRoute === 'login' || publicRoute === 'register' || publicRoute === 'forgot') && (
          <AuthPages
            mode={publicRoute as any}
            onNavigate={handlePublicNavigate}
            onLoginSuccess={(role) => {
              if (role) handleRoleSwitch(role);
              setCurrentSection('portal');
            }}
          />
        )}
      </main>

      {/* Public Footer */}
      <PublicFooter onNavigate={handlePublicNavigate} />

      {/* Course Video Player Modal (Can be triggered from public details if enrolled) */}
      {isPlayerOpen && selectedCourse && (
        <CoursePlayerModal
          course={selectedCourse}
          enrollment={enrollments.find((e) => e.courseId === selectedCourse.id)}
          onClose={() => setIsPlayerOpen(false)}
          onMarkLessonComplete={handleMarkLessonComplete}
          onOpenExam={(examId) => {
            setIsPlayerOpen(false);
            setSelectedExamId(examId);
            setCurrentSection('portal');
            setPortalView('exams');
          }}
          onViewCertificates={() => {
            setIsPlayerOpen(false);
            setCurrentSection('portal');
            setPortalView('certificates');
          }}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <I18nProvider>
      <VitaliaApp />
    </I18nProvider>
  );
}
