import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import Question from './Question';

const QuizReview = ({ questions, answers, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);

  const goToPrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1));
  };

  const getQuestionStatus = (index) => {
    const question = questions[index];
    const answer = answers.find(a => a.questionId === question.id);
    return answer?.isCorrect;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Results</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Review Your Answers</h2>

          {/* Question Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {questions.map((_, index) => {
              const isCorrect = getQuestionStatus(index);
              const isSelected = index === currentIndex;

              return (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                    isSelected
                      ? 'bg-blue-500 text-white shadow-lg'
                      : isCorrect === true
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : isCorrect === false
                      ? 'bg-red-100 text-red-800 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        <Question
          question={currentQuestion}
          selectedOption={null}
          onSelectOption={() => {}}
          isReviewMode={true}
          userAnswer={currentAnswer?.selectedOption}
        />

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentIndex > 0
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="text-sm text-gray-600">
            Question {currentIndex + 1} of {questions.length}
          </div>

          <button
            onClick={goToNext}
            disabled={currentIndex === questions.length - 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentIndex < questions.length - 1
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizReview;
