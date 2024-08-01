import React from 'react';

const QuestionSelector = ({ questions, currentQuestionIndex, handleJumpToQuestion, isQuizDone }) => (
  <div className="mt-4">
    <h3 className="text-lg font-semibold">Jump to Question:</h3>
    <select
      value={currentQuestionIndex}
      onChange={(e) => handleJumpToQuestion(parseInt(e.target.value))}
      disabled={isQuizDone}
      className="mt-2 p-2 border rounded"
    >
      {questions.map((_, index) => (
        <option key={index} value={index}>
          Question {index + 1}
        </option>
      ))}
    </select>
  </div>
);

export default QuestionSelector;
