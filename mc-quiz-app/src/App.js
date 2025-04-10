import React, { useState } from "react";
import Home from "./Home";
import Quiz from "./Quiz";
import FileUpload from "./FileUpload";
import "./App.css";
import Planner from "./study-planner/Planner";

const App = () => {
  const [view, setView] = useState("home");
  const [showFileUpload, setShowFileUpload] = useState(false);
  //const [expandPlanner, setExpandPlanner] = useState(false);

  const startQuiz = () => {
    setView("quiz");
  };

  const toggleFileUpload = () => {
    setShowFileUpload(!showFileUpload);
  };

  const startFileUpload = () => {
    setView("fileUpload");
  }

  // const togglePlanner = () => {
  //   setExpandPlanner(!expandPlanner);
  // };

  const goHome = () => {
    setView("home");
  };

  return (
    <div className="app-container">
      {view === "home" && (
        <div className="content-container">
          <div className="home-container">
            <Home
              startQuiz={startQuiz}
              toggleFileUpload={toggleFileUpload}
              showFileUpload={showFileUpload}
              startFileUpload={startFileUpload}
            />
          </div>
          <div className="planner-container">
            {/* <button onClick={togglePlanner} className="toggle-planner-button">
              {expandPlanner ? "Collapse Planner" : "Expand Planner"}
            </button> */}
            <Planner />
          </div>
        </div>
      )}
      {view === "quiz" && <Quiz goHome={goHome} />}
      {showFileUpload && <FileUpload />}
      {view === "fileUpload" && <FileUpload goHome={goHome} />}
    </div>
  );
};

export default App;
