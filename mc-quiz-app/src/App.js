import React, { useState } from 'react';
import Home from './Home';
import Quiz from './Quiz';
import './App.css';

const App = () => {
  const [view, setView] = useState('home');

  const startQuiz = () => {
    setView('quiz');
  };

  const goHome = () => {
    setView('home');
  };

  return (
    <div className="app-container">
      {view === 'home' && <Home startQuiz={startQuiz} />}
      {view === 'quiz' && <Quiz goHome={goHome} />}
    </div>
  );
};

export default App;