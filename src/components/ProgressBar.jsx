import React from 'react';

const ProgressBar = ({ current, total }) => {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
