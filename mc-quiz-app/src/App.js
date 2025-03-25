import React, { useState } from 'react';
import Home from './Home';
import Quiz from './Quiz';
import './App.css';
import Planner from './study-planner/Planner';

const App = () => {
  const [view, setView] = useState('home');

  const startQuiz = () => {
    setView('quiz');
  };

  const goHome = () => {
    setView('home');
  };

  const goPlanner = () => {
    setView('planner');
  };

  return (
    <div className="app-container">
      {view === 'home' && <Home startQuiz={startQuiz}/>}
      {view === 'quiz' && <Quiz goHome={goHome} />}
      {view === 'home' && <Planner/>}
    </div>
  );
};

export default App;