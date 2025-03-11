import React, { useState } from 'react';
import Home from './Home';
import Quiz from './Quiz';
import FileUpload from './FileUpload';
import './App.css';

const App = () => {
  const [view, setView] = useState('home');
  const [showFileUpload, setShowFileUpload] = useState(false);

  const startQuiz = () => {
    setView('quiz');
  };

  const toggleFileUpload = () => {
    setShowFileUpload(!showFileUpload);
  };

  return (
    <div className="app-container">
      {view === 'home' && <Home startQuiz={startQuiz} toggleFileUpload={toggleFileUpload} showFileUpload={showFileUpload} />}
      {view === 'quiz' && <Quiz goHome={() => setView('home')} />}
      {showFileUpload && <FileUpload />}
    </div>
  );
};

export default App;