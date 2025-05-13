import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = ({ startQuiz, toggleFileUpload, showFileUpload, startFileUpload }) => {
  const [studyPlan, setStudyPlan] = useState([]);

  useEffect(() => {
    // Fetch the last study plan from local storage
    const savedStudyPlan = localStorage.getItem("studyPlan");
    if (savedStudyPlan) {
      setStudyPlan(JSON.parse(savedStudyPlan));
    } else {
      // Set a demo study plan if none is found
      const demoStudyPlan = [

        //{ topic: 'Introduction to React', material: 'Chapter 1', hours: 2, id: 1, start: "2025-03-18 00:00", end: "2025-03-18 02:00" },
        //{ topic: 'JSX and Components', material: 'Chapter 2', hours: 3, id: 2, start: "2025-03-18 03:00", end: "2025-03-18 06:00" },
        //{ topic: 'State and Props', material: 'Chapter 3', hours: 2.5, id: 3, start: "2025-03-18 06:00", end: "2025-03-18 08:30" },
        //{ topic: 'Building a Small Project', material: 'Project Guide', hours: 4, id: 4, start: "2025-03-19 00:00", end: "2025-03-19 04:00" },

        { topic: "Introduction to React", material: "Chapter 1", hours: 2 },
        { topic: "JSX and Components", material: "Chapter 2", hours: 3 },
        { topic: "State and Props", material: "Chapter 3", hours: 2.5 },
        {
          topic: "Building a Small Project",
          material: "Project Guide",
          hours: 4,
        },
      ];
      localStorage.setItem("studyPlan", JSON.stringify(demoStudyPlan));
      setStudyPlan(demoStudyPlan);
    }
  }, []);

  return (
    <div className="home-container">
      <h1 className="title-container">Welcome to the Quiz App</h1>
      <div className="layout-container">
        <div className="buttons-container">
          <button onClick={toggleFileUpload && startFileUpload} className="upload-button">
            Upload Study Material
          </button>
          <button onClick={toggleFileUpload && startFileUpload} className="upload-button">
            Summarize Study Material
          </button>
          {!showFileUpload && (
            <button onClick={startQuiz} className="start-quiz-button">
              Start Quiz
            </button>
          )}
          {showFileUpload && (
            <button
              onClick={toggleFileUpload}
              className="go-back-button start-quiz-button"
            >
              Go Back Home
            </button>
          )}
        </div>
        {studyPlan.length > 0 ? (
          <div className="study-plan-container">
            <div className="study-plan">
              <h2>Last Study Plan</h2>
              <table>
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Material</th>
                    <th>Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {studyPlan.map((item, index) => (
                    <tr key={index}>
                      <td>{item.topic}</td>
                      <td>{item.material}</td>
                      <td className="hours">{item.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>No study plan found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
