import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateExamScore, formatTimeRemaining, calculateCourseProgress } from './examService';
import { Question } from '../types';

test('calculateExamScore calculates correct score for multiple choice questions', () => {
  const questions: Question[] = [
    {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What is 2 + 2?',
      promptAr: 'كم يساوي 2 + 2؟',
      points: 10,
      correctOptionId: 'opt-4',
    },
    {
      id: 'q2',
      type: 'true_false',
      prompt: 'Is TypeScript typed?',
      promptAr: 'هل تايب سكريبت محددة النوع؟',
      points: 10,
      correctOptionId: 'true',
    },
  ];

  const answers = {
    q1: 'opt-4',
    q2: 'true',
  };

  const result = calculateExamScore(questions, answers, 70);
  assert.equal(result.earnedPoints, 20);
  assert.equal(result.maxPoints, 20);
  assert.equal(result.percentage, 100);
  assert.equal(result.passed, true);
  assert.equal(result.hasManualGradingPending, false);
});

test('calculateExamScore handles partial failures and passing thresholds correctly', () => {
  const questions: Question[] = [
    {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Capital of Egypt?',
      promptAr: 'عاصمة مصر؟',
      points: 10,
      correctOptionId: 'cairo',
    },
    {
      id: 'q2',
      type: 'multiple_choice',
      prompt: 'Capital of France?',
      promptAr: 'عاصمة فرنسا؟',
      points: 10,
      correctOptionId: 'paris',
    },
  ];

  // 1 correct out of 2 = 50%
  const answers = {
    q1: 'cairo',
    q2: 'london', // incorrect
  };

  const passAt40 = calculateExamScore(questions, answers, 40);
  assert.equal(passAt40.earnedPoints, 10);
  assert.equal(passAt40.percentage, 50);
  assert.equal(passAt40.passed, true);

  const failAt70 = calculateExamScore(questions, answers, 70);
  assert.equal(failAt70.percentage, 50);
  assert.equal(failAt70.passed, false);
});

test('calculateExamScore flags essay questions as requiring manual grading', () => {
  const questions: Question[] = [
    {
      id: 'q1',
      type: 'essay',
      prompt: 'Explain the benefits of microservices architecture.',
      promptAr: 'اشرح فوائد بنية الخدمات المصغرة.',
      points: 25,
    },
  ];

  const answers = {
    q1: 'Microservices provide high decoupling and scalability...',
  };

  const result = calculateExamScore(questions, answers, 60);
  assert.equal(result.hasManualGradingPending, true);
  assert.equal(result.questionBreakdown[0].isCorrect, null);
});

test('formatTimeRemaining formats seconds properly', () => {
  assert.equal(formatTimeRemaining(3661), '61:01');
  assert.equal(formatTimeRemaining(125), '02:05');
  assert.equal(formatTimeRemaining(0), '00:00');
  assert.equal(formatTimeRemaining(-5), '00:00');
});

test('calculateCourseProgress bounds percentages safely', () => {
  assert.equal(calculateCourseProgress(0, 10), 0);
  assert.equal(calculateCourseProgress(5, 10), 50);
  assert.equal(calculateCourseProgress(10, 10), 100);
  assert.equal(calculateCourseProgress(12, 10), 100);
  assert.equal(calculateCourseProgress(3, 0), 0);
});
