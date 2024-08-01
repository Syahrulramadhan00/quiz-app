import React from 'react';

const Navigation = ({ handlePrev, handleNext, isFirstQuestion, isLastQuestion, isQuizDone, onFinishQuiz }) => (
  <div className="flex justify-between mt-4">
    <button
      onClick={handlePrev}
      disabled={isFirstQuestion || isQuizDone}
      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
    >
      Previous
    </button>
    <button
      onClick={handleNext}
      disabled={isLastQuestion || isQuizDone}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Next
    </button>
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
