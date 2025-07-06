import React from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ timeLeft, isActive, totalTime }) => {
  const percentage = (timeLeft / totalTime) * 100;
  const isUrgent = timeLeft <= 10;

  return (
    <div className="flex items-center space-x-2">
      <Clock className={`w-5 h-5 ${isUrgent ? 'text-red-500' : 'text-blue-500'}`} />
      <div className="flex items-center space-x-2">
        <div className="w-24 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${
              isUrgent ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={`text-sm font-medium ${isUrgent ? 'text-red-500' : 'text-gray-700'}`}>
          {timeLeft}s
        </span>
      </div>
    </div>
  );
};

export default Timer;
