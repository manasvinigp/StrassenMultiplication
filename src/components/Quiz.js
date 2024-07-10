import React from 'react';
import Question from './Question';

function Quiz({ questions, onAnswerChange, onSubmit }) {
  return (
    <div className="Quiz">
      {questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          onAnswerChange={onAnswerChange}
        />
      ))}
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default Quiz;
