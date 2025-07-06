// This file defines structure-like objects for reference purposes.
// JavaScript doesn't support interfaces, but you can use JSDoc for type hints if needed.

export const createQuestion = (id, question, options, correctAnswer, explanation = '') => ({
  id,
  question,
  options,
  correctAnswer,
  explanation
});

export const createQuizAnswer = (questionId, selectedOption, isCorrect, timeSpent) => ({
  questionId,
  selectedOption,
  isCorrect,
  timeSpent
});

export const createQuizResult = (score, totalQuestions, percentage, totalTime, answers) => ({
  score,
  totalQuestions,
  percentage,
  totalTime,
  answers
});

export const createQuizState = (questions) => ({
  questions,
  currentQuestionIndex: 0,
  answers: new Map(),
  startTime: Date.now(),
  questionStartTime: Date.now(),
  isCompleted: false,
  showResults: false,
  showReview: false
});
