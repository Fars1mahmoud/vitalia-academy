export type UserRole =
  | 'super_admin'
  | 'academy_admin'
  | 'professor'
  | 'instructor'
  | 'teaching_assistant'
  | 'course_reviewer'
  | 'academic_supervisor'
  | 'student'
  | 'content_creator'
  | 'support_agent'
  | 'certificate_verifier';

export type Language = 'en' | 'ar';

export interface User {
  id: string;
  name: string;
  nameAr?: string;
  email: string;
  avatar: string;
  roles: UserRole[];
  primaryRole: UserRole;
  language: Language;
  title?: string;
  titleAr?: string;
  department?: string;
  departmentAr?: string;
  bio?: string;
  bioAr?: string;
  status: 'active' | 'suspended' | 'pending';
  joinedDate: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  courseCount: number;
}

export interface Department {
  id: string;
  name: string;
  nameAr: string;
  code: string;
  headName: string;
  coursesCount: number;
  studentsCount: number;
}

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'all_levels';
export type CourseStatus = 'draft' | 'pending_review' | 'changes_requested' | 'approved' | 'published' | 'archived';

export interface Lesson {
  id: string;
  title: string;
  titleAr: string;
  durationMinutes: number;
  type: 'video' | 'reading' | 'assignment' | 'quiz' | 'code';
  videoUrl?: string;
  content?: string;
  contentAr?: string;
  resources?: { name: string; url: string; size: string }[];
  isFreePreview?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  titleAr: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  description?: string;
  descriptionAr?: string;
  thumbnail: string;
  categoryId: string;
  categoryName: string;
  categoryNameAr: string;
  departmentId: string;
  instructorId: string;
  instructorName: string;
  instructorNameAr: string;
  instructorTitle: string;
  instructorAvatar: string;
  level: CourseLevel;
  language: 'English' | 'Arabic' | 'Bilingual';
  rating: number;
  ratingsCount: number;
  enrolledCount: number;
  durationHours: number;
  lessonsCount: number;
  priceEGP: number; // 0 = free
  originalPriceEGP?: number;
  status: CourseStatus;
  featured?: boolean;
  learningOutcomes: string[];
  learningOutcomesAr: string[];
  requirements: string[];
  requirementsAr: string[];
  targetAudience: string[];
  targetAudienceAr: string[];
  modules: CourseModule[];
  createdAt: string;
  updatedAt: string;
  examId?: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progressPercentage: number;
  completedLessonIds: string[];
  lastAccessedLessonId?: string;
  status: 'active' | 'completed' | 'dropped';
  certificateIssuedId?: string;
  gradePercentage?: number;
}

export interface Assignment {
  id: string;
  courseId: string;
  courseName: string;
  courseNameAr: string;
  title: string;
  titleAr: string;
  instructions: string;
  instructionsAr: string;
  maxPoints: number;
  dueDate: string;
  status: 'active' | 'draft' | 'closed';
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  courseId: string;
  courseName: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  submittedAt: string;
  content: string;
  fileName?: string;
  fileSize?: string;
  grade?: number;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: string;
  status: 'submitted' | 'graded' | 'late' | 'resubmission_requested';
}

export type QuestionType =
  | 'multiple_choice'
  | 'multiple_select'
  | 'true_false'
  | 'short_answer'
  | 'essay'
  | 'coding';

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  promptAr: string;
  points: number;
  options?: { id: string; text: string; textAr: string }[];
  correctOptionId?: string; // for single select & true/false
  correctOptionIds?: string[]; // for multi-select
  explanation?: string;
  explanationAr?: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Exam {
  id: string;
  courseId: string;
  courseName: string;
  courseNameAr: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  durationMinutes: number;
  totalPoints: number;
  passingScore: number; // percentage, e.g. 70
  maxAttempts: number;
  questions: Question[];
  status: 'published' | 'draft';
}

export interface ExamAttempt {
  id: string;
  examId: string;
  userId: string;
  userName: string;
  startedAt: string;
  submittedAt: string;
  answers: Record<string, string | string[]>; // questionId -> selected id(s) or text
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  reviewed: boolean;
  attemptNumber: number;
}

export interface Certificate {
  id: string;
  certificateNumber: string; // e.g. "VIT-2026-90412"
  userId: string;
  studentName: string;
  studentNameAr: string;
  courseId: string;
  courseTitle: string;
  courseTitleAr: string;
  instructorName: string;
  issueDate: string;
  expiryDate?: string;
  gradeAchieved: string; // e.g., "94% - Distinction"
  status: 'valid' | 'revoked';
  revocationReason?: string;
  revocationDate?: string;
  qrCodeUrl: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  nameAr: string;
  priceEGP: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  featuresAr: string[];
  recommended?: boolean;
}

export interface PaymentTransaction {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  amountEGP: number;
  currency: string;
  description: string;
  descriptionAr: string;
  date: string;
  status: 'succeeded' | 'pending' | 'refunded' | 'failed';
  paymentMethod: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: UserRole;
  subject: string;
  category: 'technical' | 'academic' | 'billing' | 'certificate' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    senderId: string;
    senderName: string;
    senderRole: UserRole;
    text: string;
    sentAt: string;
  }[];
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  timestamp: string;
  read: boolean;
  type: 'academic' | 'exam' | 'assignment' | 'payment' | 'system';
  link?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  actionAr: string;
  performedBy: string;
  userRole: string;
  target: string;
  timestamp: string;
  ipAddress: string;
}
