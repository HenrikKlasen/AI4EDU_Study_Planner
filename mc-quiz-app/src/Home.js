import React, { useEffect, useState } from 'react';
import './Home.css';
import Planner from "./study-planner/Planner";

const Home = ({ startQuiz, goPlanner }) => {
  const [studyPlan, setStudyPlan] = useState([]);

  useEffect(() => {
    // Fetch the last study plan from local storage
    const savedStudyPlan = localStorage.getItem('studyPlan');
    if (savedStudyPlan) {
      setStudyPlan(JSON.parse(savedStudyPlan));
    } else {
      // Set a demo study plan if none is found
      const demoStudyPlan = [
        { topic: 'Introduction to React', material: 'Chapter 1', hours: 2 },
        { topic: 'JSX and Components', material: 'Chapter 2', hours: 3 },
        { topic: 'State and Props', material: 'Chapter 3', hours: 2.5 },
        { topic: 'Building a Small Project', material: 'Project Guide', hours: 4 },
      ];
      localStorage.setItem('studyPlan', JSON.stringify(demoStudyPlan));
      setStudyPlan(demoStudyPlan);
    }
  }, []);

  return (
      <div className="home-container">
        <h1>Welcome to the Quiz App</h1>
        {studyPlan.length > 0 ? (
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
        ) : (
            <p>No study plan found.</p>
        )}



        <button onClick={startQuiz} className="start-quiz-button">Start Quiz</button>
      </div>
  );
};

export default Home;