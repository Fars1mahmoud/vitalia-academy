import { Question } from '../types';

export interface ScoreResult {
  earnedPoints: number;
  maxPoints: number;
  percentage: number;
  passed: boolean;
  hasManualGradingPending: boolean;
  questionBreakdown: {
    questionId: string;
    pointsEarned: number;
    maxPoints: number;
    isCorrect: boolean | null; // null if manual grading pending
  }[];
}

/**
 * Calculates objective question score and detects subjective (essay) questions
 * requiring manual grading.
 */
export function calculateExamScore(
  questions: Question[],
  answers: Record<string, string | string[] | undefined>,
  passingPercentage: number
): ScoreResult {
  let earnedPoints = 0;
  let maxPoints = 0;
  let hasManualGradingPending = false;

  const questionBreakdown = questions.map((q) => {
    maxPoints += q.points;
    const ans = answers[q.id];

    if (q.type === 'essay') {
      hasManualGradingPending = true;
      return {
        questionId: q.id,
        pointsEarned: 0,
        maxPoints: q.points,
        isCorrect: null,
      };
    }

    let isCorrect = false;

    if (q.type === 'multiple_choice' || q.type === 'true_false') {
      if (typeof ans === 'string' && q.correctOptionId) {
        isCorrect = ans.trim().toLowerCase() === q.correctOptionId.trim().toLowerCase();
      }
    } else if (q.type === 'multiple_select') {
      if (Array.isArray(ans) && q.correctOptionIds) {
        const sortedAns = [...ans].sort();
        const sortedCorrect = [...q.correctOptionIds].sort();
        isCorrect =
          sortedAns.length === sortedCorrect.length &&
          sortedAns.every((val, index) => val === sortedCorrect[index]);
      }
    } else if (q.type === 'short_answer') {
      if (typeof ans === 'string' && q.correctOptionId) {
        isCorrect = ans.trim().toLowerCase() === q.correctOptionId.trim().toLowerCase();
      }
    } else if (q.type === 'coding') {
      // Basic simulation check
      if (typeof ans === 'string' && ans.length > 10) {
        isCorrect = true;
      }
    }

    const pointsEarned = isCorrect ? q.points : 0;
    earnedPoints += pointsEarned;

    return {
      questionId: q.id,
      pointsEarned,
      maxPoints: q.points,
      isCorrect,
    };
  });

  const percentage = maxPoints > 0 ? Math.round((earnedPoints / maxPoints) * 100) : 0;
  const passed = percentage >= passingPercentage;

  return {
    earnedPoints,
    maxPoints,
    percentage,
    passed,
    hasManualGradingPending,
    questionBreakdown,
  };
}

/**
 * Formats countdown seconds to mm:ss format.
 */
export function formatTimeRemaining(seconds: number): string {
  if (seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Computes course completion percentage safely.
 */
export function calculateCourseProgress(completedCount: number, totalLessonsCount: number): number {
  if (totalLessonsCount <= 0) return 0;
  const raw = (completedCount / totalLessonsCount) * 100;
  return Math.min(100, Math.max(0, Math.round(raw)));
}
