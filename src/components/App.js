import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz';
import './assets/styles.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      // Simulated API call to fetch questions
      const response = await fetch('/api/questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    try {
      // Simulated API call to submit answers
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });
      const data = await response.json();
      setScore(data.score);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Strassen's Matrix Multiplication Quiz</h1>
        {score === null ? (
          <Quiz
            questions={questions}
            onAnswerChange={handleAnswerChange}
            onSubmit={handleSubmit}
          />
        ) : (
          <div className="Result">
            <h2>Quiz Completed!</h2>
            <p>Your Score: {score}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
