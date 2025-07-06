import React from 'react';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';

const QuizNavigation = ({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  onFinish,
  canGoPrevious,
  canGoNext,
  hasAnswer
}) => {
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          canGoPrevious
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            : 'bg-gray-50 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
      </div>

      {isLastQuestion ? (
        <button
          onClick={onFinish}
          disabled={!hasAnswer}
          className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
            hasAnswer
              ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Flag className="w-4 h-4" />
          <span>Finish Quiz</span>
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canGoNext || !hasAnswer}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            canGoNext && hasAnswer
              ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default QuizNavigation;
