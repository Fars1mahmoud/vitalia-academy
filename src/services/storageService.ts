import {
  User,
  UserRole,
  Course,
  Enrollment,
  Exam,
  ExamAttempt,
  Certificate,
  Assignment,
  AssignmentSubmission,
  SupportTicket,
  NotificationItem,
  AuditLog,
} from '../types';
import {
  INITIAL_USERS,
  COURSES,
  INITIAL_ENROLLMENTS,
  INITIAL_EXAMS,
  INITIAL_CERTIFICATES,
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_TICKETS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
} from './mockData';

class VitaliaStore {
  private users: User[];
  private currentUser: User;
  private courses: Course[];
  private enrollments: Enrollment[];
  private exams: Exam[];
  private examAttempts: ExamAttempt[];
  private certificates: Certificate[];
  private assignments: Assignment[];
  private submissions: AssignmentSubmission[];
  private tickets: SupportTicket[];
  private notifications: NotificationItem[];
  private auditLogs: AuditLog[];
  private bookmarks: string[];

  constructor() {
    this.users = [...INITIAL_USERS];
    this.currentUser = INITIAL_USERS[0]; // Student by default
    this.courses = [...COURSES];
    this.enrollments = [...INITIAL_ENROLLMENTS];
    this.exams = [...INITIAL_EXAMS];
    this.examAttempts = [];
    this.certificates = [...INITIAL_CERTIFICATES];
    this.assignments = [...INITIAL_ASSIGNMENTS];
    this.submissions = [...INITIAL_SUBMISSIONS];
    this.tickets = [...INITIAL_TICKETS];
    this.notifications = [...INITIAL_NOTIFICATIONS];
    this.auditLogs = [...INITIAL_AUDIT_LOGS];
    this.bookmarks = ['course-1', 'course-2'];
  }

  // User & Role
  getCurrentUser(): User {
    return this.currentUser;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  switchRole(role: UserRole): User {
    const matching = this.users.find((u) => u.roles.includes(role) || u.primaryRole === role);
    if (matching) {
      this.currentUser = { ...matching, primaryRole: role };
      return this.currentUser;
    }
    // Fallback if role is not in existing users, adapt current user
    this.currentUser = {
      ...this.currentUser,
      primaryRole: role,
      roles: Array.from(new Set([...this.currentUser.roles, role])),
    };
    return this.currentUser;
  }

  getUsers(): User[] {
    return this.users;
  }

  updateUserStatus(userId: string, status: 'active' | 'suspended'): void {
    this.users = this.users.map((u) => (u.id === userId ? { ...u, status } : u));
    if (this.currentUser.id === userId) {
      this.currentUser = { ...this.currentUser, status };
    }
  }

  // Courses
  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: string): Course | undefined {
    return this.courses.find((c) => c.id === id || c.slug === id);
  }

  addCourse(course: Course): void {
    this.courses.unshift(course);
    this.addAuditLog({
      action: `New Course Created: ${course.title} (Draft)`,
      actionAr: `تم إنشاء مساق جديد: ${course.titleAr || course.title} (مسودة)`,
      performedBy: this.currentUser.name,
      userRole: this.currentUser.primaryRole,
      target: course.id,
    });
  }

  updateCourseStatus(courseId: string, status: Course['status']): void {
    this.courses = this.courses.map((c) => (c.id === courseId ? { ...c, status } : c));
    this.addAuditLog({
      action: `Course Status Changed to ${status.toUpperCase()}`,
      actionAr: `تم تحديث حالة المساق إلى ${status}`,
      performedBy: this.currentUser.name,
      userRole: this.currentUser.primaryRole,
      target: courseId,
    });
  }

  // Bookmarks
  getBookmarks(): string[] {
    return this.bookmarks;
  }

  toggleBookmark(courseId: string): boolean {
    if (this.bookmarks.includes(courseId)) {
      this.bookmarks = this.bookmarks.filter((id) => id !== courseId);
      return false;
    } else {
      this.bookmarks.push(courseId);
      return true;
    }
  }

  // Enrollments & Progress
  getEnrollments(userId?: string): Enrollment[] {
    const uid = userId || this.currentUser.id;
    return this.enrollments.filter((e) => e.userId === uid);
  }

  enrollInCourse(courseId: string): Enrollment {
    const existing = this.enrollments.find(
      (e) => e.userId === this.currentUser.id && e.courseId === courseId
    );
    if (existing) return existing;

    const newEnrollment: Enrollment = {
      id: `enr-${Date.now()}`,
      userId: this.currentUser.id,
      courseId,
      enrolledAt: new Date().toISOString().split('T')[0],
      progressPercentage: 0,
      completedLessonIds: [],
      status: 'active',
    };
    this.enrollments.push(newEnrollment);

    // Increment enrolled count on course
    this.courses = this.courses.map((c) =>
      c.id === courseId ? { ...c, enrolledCount: c.enrolledCount + 1 } : c
    );

    return newEnrollment;
  }

  markLessonComplete(courseId: string, lessonId: string): Enrollment | undefined {
    const enrollment = this.enrollments.find(
      (e) => e.userId === this.currentUser.id && e.courseId === courseId
    );
    if (!enrollment) return undefined;

    if (!enrollment.completedLessonIds.includes(lessonId)) {
      enrollment.completedLessonIds.push(lessonId);
    }
    enrollment.lastAccessedLessonId = lessonId;

    const course = this.getCourseById(courseId);
    const totalLessons = course
      ? course.modules.reduce((sum, m) => sum + m.lessons.length, 0) || 1
      : 1;

    enrollment.progressPercentage = Math.min(
      100,
      Math.round((enrollment.completedLessonIds.length / totalLessons) * 100)
    );

    if (enrollment.progressPercentage >= 100 && enrollment.status !== 'completed') {
      enrollment.status = 'completed';
      // Auto issue certificate in demo!
      const cert = this.issueCertificate(courseId);
      enrollment.certificateIssuedId = cert.id;
    }

    return { ...enrollment };
  }

  // Exams
  getExams(): Exam[] {
    return this.exams;
  }

  getExamById(id: string): Exam | undefined {
    return this.exams.find((e) => e.id === id);
  }

  recordExamAttempt(attempt: ExamAttempt): void {
    this.examAttempts.push(attempt);
    if (attempt.passed) {
      // Find matching enrollment and mark progress
      const exam = this.getExamById(attempt.examId);
      if (exam) {
        const enr = this.enrollments.find(
          (e) => e.userId === attempt.userId && e.courseId === exam.courseId
        );
        if (enr) {
          enr.gradePercentage = attempt.percentage;
        }
      }
    }
  }

  // Certificates
  getCertificates(): Certificate[] {
    return this.certificates;
  }

  getCertificateByNumber(certNum: string): Certificate | undefined {
    const cleanNum = certNum.trim().toUpperCase();
    return this.certificates.find((c) => c.certificateNumber.toUpperCase() === cleanNum);
  }

  revokeCertificate(certId: string, reason: string): boolean {
    const cert = this.certificates.find((c) => c.id === certId);
    if (cert) {
      cert.status = 'revoked';
      cert.revocationReason = reason;
      cert.revocationDate = new Date().toISOString().split('T')[0];
      this.addAuditLog({
        action: `Revoked Credential ${cert.certificateNumber}: ${reason}`,
        actionAr: `إلغاء الشهادة ${cert.certificateNumber}: ${reason}`,
        performedBy: this.currentUser.name,
        userRole: this.currentUser.primaryRole,
        target: cert.id,
      });
      return true;
    }
    return false;
  }

  issueCertificate(courseId: string): Certificate {
    const course = this.getCourseById(courseId);
    const certNum = `VIT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      certificateNumber: certNum,
      userId: this.currentUser.id,
      studentName: this.currentUser.name,
      studentNameAr: this.currentUser.nameAr || this.currentUser.name,
      courseId,
      courseTitle: course ? course.title : 'Vitalia Academic Course',
      courseTitleAr: course ? course.titleAr : 'مقرر فيتاليا الأكاديمي',
      instructorName: course ? course.instructorName : 'Vitalia Academic Senate',
      issueDate: new Date().toISOString().split('T')[0],
      gradeAchieved: '95% - High Distinction',
      status: 'valid',
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://vitalia.edu/verify/${certNum}`,
    };
    this.certificates.unshift(newCert);

    this.notifications.unshift({
      id: `notif-${Date.now()}`,
      userId: this.currentUser.id,
      title: 'Certificate Issued!',
      titleAr: 'تم إصدار شهادتك الرسمية بنجاح!',
      message: `Your credential for ${newCert.courseTitle} has been generated (${certNum}).`,
      messageAr: `تم إصدار وتوثيق شهادتك في ${newCert.courseTitleAr} (${certNum}).`,
      timestamp: 'Just now',
      read: false,
      type: 'academic',
      link: 'certificates',
    });

    return newCert;
  }

  // Assignments & Grading
  getAssignments(): Assignment[] {
    return this.assignments;
  }

  getSubmissions(): AssignmentSubmission[] {
    return this.submissions;
  }

  submitAssignment(assignmentId: string, content: string, fileName?: string): AssignmentSubmission {
    const asg = this.assignments.find((a) => a.id === assignmentId);
    const newSub: AssignmentSubmission = {
      id: `sub-${Date.now()}`,
      assignmentId,
      assignmentTitle: asg?.title || 'Assignment',
      courseId: asg?.courseId || 'course-1',
      courseName: asg?.courseName || 'Course',
      studentId: this.currentUser.id,
      studentName: this.currentUser.name,
      studentAvatar: this.currentUser.avatar,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      content,
      fileName: fileName || 'submission_file.pdf',
      fileSize: '1.2 MB',
      status: 'submitted',
    };
    this.submissions.unshift(newSub);
    return newSub;
  }

  gradeSubmission(submissionId: string, grade: number, feedback: string): void {
    const sub = this.submissions.find((s) => s.id === submissionId);
    if (sub) {
      sub.grade = grade;
      sub.feedback = feedback;
      sub.status = 'graded';
      sub.gradedBy = this.currentUser.name;
      sub.gradedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    }
  }

  // Tickets
  getTickets(): SupportTicket[] {
    return this.tickets;
  }

  addTicket(subject: string, category: SupportTicket['category'], priority: SupportTicket['priority'], initialMessage: string): SupportTicket {
    const ticketNum = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: SupportTicket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: ticketNum,
      userId: this.currentUser.id,
      userName: this.currentUser.name,
      userEmail: this.currentUser.email,
      userRole: this.currentUser.primaryRole,
      subject,
      category,
      priority,
      status: 'open',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: this.currentUser.id,
          senderName: this.currentUser.name,
          senderRole: this.currentUser.primaryRole,
          text: initialMessage,
          sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        },
      ],
    };
    this.tickets.unshift(newTicket);
    return newTicket;
  }

  replyToTicket(ticketId: string, text: string): void {
    const tkt = this.tickets.find((t) => t.id === ticketId);
    if (tkt) {
      tkt.messages.push({
        id: `msg-${Date.now()}`,
        senderId: this.currentUser.id,
        senderName: this.currentUser.name,
        senderRole: this.currentUser.primaryRole,
        text,
        sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      });
      tkt.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    }
  }

  updateTicketStatus(ticketId: string, status: SupportTicket['status']): void {
    const tkt = this.tickets.find((t) => t.id === ticketId);
    if (tkt) {
      tkt.status = status;
    }
  }

  // Notifications
  getNotifications(): NotificationItem[] {
    return this.notifications;
  }

  markNotificationRead(id: string): void {
    this.notifications = this.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
  }

  markAllNotificationsRead(): void {
    this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
  }

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  addAuditLog(entry: Omit<AuditLog, 'id' | 'timestamp' | 'ipAddress'>): void {
    this.auditLogs.unshift({
      id: `log-${Date.now()}`,
      ...entry,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      ipAddress: '197.38.12.89',
    });
  }
}

export const vitaliaStore = new VitaliaStore();
