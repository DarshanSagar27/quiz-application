import React from 'react';

const Question = ({
  question,
  selectedOption,
  onSelectOption,
  isReviewMode = false,
  userAnswer
}) => {
  const getOptionClassName = (optionIndex) => {
    const baseClasses = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 hover:shadow-md";

    if (isReviewMode) {
      if (optionIndex === question.correctAnswer) {
        return `${baseClasses} bg-green-100 border-green-500 text-green-800`;
      } else if (optionIndex === userAnswer && userAnswer !== question.correctAnswer) {
        return `${baseClasses} bg-red-100 border-red-500 text-red-800`;
      } else {
        return `${baseClasses} bg-gray-50 border-gray-300 text-gray-700`;
      }
    }

    if (selectedOption === optionIndex) {
      return `${baseClasses} bg-blue-100 border-blue-500 text-blue-800 shadow-md`;
    }

    return `${baseClasses} bg-white border-gray-300 text-gray-700 hover:border-blue-400`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !isReviewMode && onSelectOption(index)}
              className={getOptionClassName(index)}
              disabled={isReviewMode}
            >
              <span className="flex items-center">
                <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </span>
            </button>
          ))}
        </div>
      </div>

      {isReviewMode && question.explanation && (
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-semibold text-blue-800 mb-2">Explanation:</h3>
          <p className="text-blue-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default Question;
