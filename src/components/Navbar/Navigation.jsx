import React from 'react';

const Navigation = ({ isQuizDone, onFinishQuiz }) => (
  <div className="flex justify-between mt-4">
    {isQuizDone && (
      <button
        onClick={onFinishQuiz}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Finish Quiz
      </button>
    )}
  </div>
);

export default Navigation;
