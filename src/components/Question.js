import React from 'react';

function Question({ question, onAnswerChange }) {
  return (
    <div className="Question">
      <h3>{question.question}</h3>
      {question.options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name={`question_${question.id}`}
            value={option}
            onChange={() => onAnswerChange(question.id, option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export default Question;
