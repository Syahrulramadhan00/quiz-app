import React from 'react';

const Question = ({ question, options, selectedOption, onOptionChange }) => (
  <div>
    <h2 className="text-xl mb-2">{question}</h2>
    <div className="mb-4">
      {options.map((option, index) => (
        <div key={index} className="mb-2 flex items-center">
          <input
            type="radio"
            id={`option-${index}`}
            name="quiz-option"
            value={option}
            onChange={() => onOptionChange(option)}
            checked={selectedOption === option}
            className="mr-2"
          />
          <label htmlFor={`option-${index}`} className="text-lg">{option}</label>
        </div>
      ))}
    </div>
  </div>
);

export default Question;
