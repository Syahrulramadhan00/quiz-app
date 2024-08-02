import React from 'react';

const QuestionSelector = ({ questions, currentQuestionIndex, handleJumpToQuestion, isQuizDone, answeredQuestions }) => {
  const totalQuestions = questions.length;

  return (
    <div className="flex items-center space-x-2 mt-4">
      {Array.from({ length: totalQuestions }).map((_, index) => (
        <button
          key={index}
          onClick={() => handleJumpToQuestion(index)}
          disabled={isQuizDone}
          className={`px-3 py-1 border rounded ${
            currentQuestionIndex === index
              ? 'bg-blue-500 text-white'
              : answeredQuestions[index]
              ? 'bg-green-500 text-white'
              : 'bg-gray-800 text-white'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default QuestionSelector;
