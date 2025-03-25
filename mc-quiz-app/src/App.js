import React, { useState } from 'react';
import Home from './Home';
import Quiz from './Quiz';
import FileUpload from './FileUpload';
import './App.css';
import Planner from './study-planner/Planner';

const App = () => {
  const [view, setView] = useState('home');
  const [showFileUpload, setShowFileUpload] = useState(false);

  const startQuiz = () => {
    setView('quiz');
  };

  const toggleFileUpload = () => {
    setShowFileUpload(!showFileUpload);
  };

  const goHome = () => {
    setView('home');
  };

  return (
    <div className="app-container">
      {view === 'home' && <Home startQuiz={startQuiz} toggleFileUpload={toggleFileUpload} showFileUpload={showFileUpload}/>}
      {view === 'quiz' && <Quiz goHome={goHome} />}
      {showFileUpload && <FileUpload />}
      {view === 'home' && <Planner />}
    </div>
  );
};

export default App;