import React, { useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { useQuiz } from '../hooks/useQuiz';
import { sampleQuestions } from '../data/questions';
import Question from './Question';
import QuizNavigation from './QuizNavigation';
import QuizResult from './QuizResult';
import QuizReview from './QuizReview';
import Timer from './Timer';
import ProgressBar from './ProgressBar';

const Quiz = () => {
  const {
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
  } = useQuiz(sampleQuestions, 30);

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const selectedOption = quizState.answers.get(currentQuestion?.id)?.selectedOption ?? null;
  const hasAnswer = selectedOption !== null;

  // When quiz is completed and results are shown, submit result to backend
  useEffect(() => {
    if (quizState.showResults && quizState.isCompleted) {
      const result = getQuizResult();
      fetch('http://localhost:5000/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      }).catch((err) => console.error('Failed to save result:', err));
    }
  }, [quizState.showResults, quizState.isCompleted, getQuizResult]);

  // Show start screen
  if (!quizState.isCompleted && !isTimerActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <div className="mb-6">
              <BookOpen className="w-16 h-16 mx-auto text-blue-500 mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Computer Science Engineering Knowledge Check
              </h1>
              <p className="text-gray-600">Test your knowledge with our interactive quiz</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Quiz Information</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• {sampleQuestions.length} multiple choice questions</li>
                <li>• 30 seconds per question</li>
                <li>• Instant feedback after completion</li>
                <li>• Review your answers at the end</li>
              </ul>
            </div>

            <button
              onClick={startQuiz}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show results screen
  if (quizState.showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
        <QuizResult
          result={getQuizResult()}
          onRestart={restartQuiz}
          onReview={showReview}
        />
      </div>
    );
  }

  // Show review screen
  if (quizState.showReview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
        <QuizReview
          questions={quizState.questions}
          answers={Array.from(quizState.answers.values())}
          onBack={hideReview}
        />
      </div>
    );
  }

  // Show quiz in progress
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow-xl p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Knowledge Quiz</h1>
              <Timer timeLeft={timeLeft} isActive={isTimerActive} totalTime={30} />
            </div>
            <ProgressBar
              current={quizState.currentQuestionIndex}
              total={quizState.questions.length}
            />
          </div>

          {/* Question */}
          <Question
            question={currentQuestion}
            selectedOption={selectedOption}
            onSelectOption={selectAnswer}
          />

          {/* Navigation */}
          <QuizNavigation
            currentQuestion={quizState.currentQuestionIndex}
            totalQuestions={quizState.questions.length}
            onPrevious={previousQuestion}
            onNext={nextQuestion}
            onFinish={finishQuiz}
            canGoPrevious={quizState.currentQuestionIndex > 0}
            canGoNext={quizState.currentQuestionIndex < quizState.questions.length - 1}
            hasAnswer={hasAnswer}
          />
        </div>
      </div>
    </div>
  );
};

export default Quiz;
