import React from 'react';
import { Trophy, Clock, Target, RotateCcw, Eye } from 'lucide-react';

const QuizResult = ({ result, onRestart, onReview }) => {
  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return 'Excellent! Outstanding performance!';
    if (percentage >= 80) return 'Great job! Well done!';
    if (percentage >= 70) return 'Good work! Keep it up!';
    if (percentage >= 60) return 'Not bad! Room for improvement.';
    return 'Keep practicing! You can do better!';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="mb-4">
            <Trophy className={`w-16 h-16 mx-auto ${getScoreColor(result.percentage)}`} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
          <p className="text-lg text-gray-600">{getScoreMessage(result.percentage)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-800">{result.score}</div>
            <div className="text-sm text-blue-600">out of {result.totalQuestions}</div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <div className={`text-2xl font-bold ${getScoreColor(result.percentage)}`}>
              {result.percentage}%
            </div>
            <div className="text-sm text-purple-600">Accuracy</div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-800">
              {formatTime(result.totalTime)}
            </div>
            <div className="text-sm text-green-600">Total Time</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onReview}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200"
          >
            <Eye className="w-5 h-5" />
            <span>Review Answers</span>
          </button>

          <button
            onClick={onRestart}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Take Quiz Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
