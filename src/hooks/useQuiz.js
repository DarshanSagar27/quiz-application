import { useState, useEffect, useCallback } from 'react';

export const useQuiz = (questions, timePerQuestion = 30) => {
  const [quizState, setQuizState] = useState({
    questions,
    currentQuestionIndex: 0,
    answers: new Map(),
    startTime: Date.now(),
    questionStartTime: Date.now(),
    isCompleted: false,
    showResults: false,
    showReview: false
  });

  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Timer effect
  useEffect(() => {
    if (isTimerActive && timeLeft > 0 && !quizState.isCompleted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizState.isCompleted) {
      handleTimeUp();
    }
  }, [isTimerActive, timeLeft, quizState.isCompleted]);

  const startQuiz = useCallback(() => {
    setQuizState(prev => ({
      ...prev,
      startTime: Date.now(),
      questionStartTime: Date.now(),
      isCompleted: false,
      showResults: false,
      showReview: false
    }));
    setTimeLeft(timePerQuestion);
    setIsTimerActive(true);
  }, [timePerQuestion]);

  const handleTimeUp = useCallback(() => {
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const timeSpent = Date.now() - quizState.questionStartTime;

    const answer = {
      questionId: currentQuestion.id,
      selectedOption: -1,
      isCorrect: false,
      timeSpent
    };

    setQuizState(prev => {
      const newAnswers = new Map(prev.answers);
      newAnswers.set(currentQuestion.id, answer);

      const isLastQuestion = prev.currentQuestionIndex === prev.questions.length - 1;

      return {
        ...prev,
        answers: newAnswers,
        currentQuestionIndex: isLastQuestion
          ? prev.currentQuestionIndex
          : prev.currentQuestionIndex + 1,
        questionStartTime: Date.now(),
        isCompleted: isLastQuestion,
        showResults: isLastQuestion
      };
    });

    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setTimeLeft(timePerQuestion);
    } else {
      setIsTimerActive(false);
    }
  }, [quizState.currentQuestionIndex, quizState.questions.length, quizState.questionStartTime, timePerQuestion]);

  const selectAnswer = useCallback((optionIndex) => {
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const timeSpent = Date.now() - quizState.questionStartTime;

    const answer = {
      questionId: currentQuestion.id,
      selectedOption: optionIndex,
      isCorrect: optionIndex === currentQuestion.correctAnswer,
      timeSpent
    };

    setQuizState(prev => {
      const newAnswers = new Map(prev.answers);
      newAnswers.set(currentQuestion.id, answer);

      return {
        ...prev,
        answers: newAnswers
      };
    });
  }, [quizState.currentQuestionIndex, quizState.questions, quizState.questionStartTime]);

  const nextQuestion = useCallback(() => {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        questionStartTime: Date.now()
      }));
      setTimeLeft(timePerQuestion);
    }
  }, [quizState.currentQuestionIndex, quizState.questions.length, timePerQuestion]);

  const previousQuestion = useCallback(() => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        questionStartTime: Date.now()
      }));
      setTimeLeft(timePerQuestion);
    }
  }, [quizState.currentQuestionIndex, timePerQuestion]);

  const finishQuiz = useCallback(() => {
    setQuizState(prev => ({
      ...prev,
      isCompleted: true,
      showResults: true
    }));
    setIsTimerActive(false);
  }, []);

  const restartQuiz = useCallback(() => {
    setQuizState({
      questions,
      currentQuestionIndex: 0,
      answers: new Map(),
      startTime: Date.now(),
      questionStartTime: Date.now(),
      isCompleted: false,
      showResults: false,
      showReview: false
    });
    setTimeLeft(timePerQuestion);
    setIsTimerActive(true);
  }, [questions, timePerQuestion]);

  const showReview = useCallback(() => {
    setQuizState(prev => ({
      ...prev,
      showReview: true,
      showResults: false
    }));
  }, []);

  const hideReview = useCallback(() => {
    setQuizState(prev => ({
      ...prev,
      showReview: false,
      showResults: true
    }));
  }, []);

  const getQuizResult = useCallback(() => {
    const answers = Array.from(quizState.answers.values());
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const totalTime = Date.now() - quizState.startTime;

    return {
      score: correctAnswers,
      totalQuestions: quizState.questions.length,
      percentage: Math.round((correctAnswers / quizState.questions.length) * 100),
      totalTime,
      answers
    };
  }, [quizState.answers, quizState.questions.length, quizState.startTime]);

  return {
    quizState,
    timeLeft,
    isTimerActive,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    restartQuiz,
    showReview,
    hideReview,
    getQuizResult
  };
};
