import React from 'react';
import './Home.css';

const Home = ({ startQuiz }) => {
  return (
    <div className="home-container">
      <h1>Welcome to the Quiz App</h1>
      <button onClick={startQuiz} className="start-quiz-button">Start Quiz</button>
    </div>
  );
};

export default Home;