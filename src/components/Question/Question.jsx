import React from 'react';

const decodeHtmlEntities = (str) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
};

const Question = ({ question, options, selectedOption, onOptionChange }) => (
  <div className="mb-4">
    <h2 className="text-xl font-semibold mb-2" dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(question) }}></h2>
    <div>
      {options.map((option, index) => (
        <div key={index} className="mb-2">
          <label>
            <input
              type="radio"
              name="option"
              value={option}
              checked={selectedOption === option}
              onChange={() => onOptionChange(option)}
            />
            <span dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(option) }}></span>
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default Question;
