import React, { useState } from "react";
import "./Quiz.css";

const Quiz = ({ goHome }) => {
  const mockQuestions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean",
      ],
      correctAnswer: "Pacific Ocean",
    },
  ];

  const [questions, setQuestions] = useState(mockQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [previousAnswers, setPreviousAnswers] = useState([]);
  const [endQuiz, setEndQuiz] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    setAnswers([
      ...answers,
      {
        question: currentQuestion.question,
        selectedAnswer: selectedOption,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: isCorrect,
      },
    ]);
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setEndQuiz(true);
    }
  };

  const handleRestartQuiz = () => {
    setPreviousAnswers(answers);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setEndQuiz(false);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz</h1>
      {endQuiz ? (
        <div className="results-container">
          <h2>Results</h2>
          <ul className="answers-list">
            {answers.map((answer, index) => (
              <li
                key={index}
                className={`answer-item ${
                  answer.isCorrect ? "correct" : "wrong"
                }`}
              >
                <strong>Question:</strong> {answer.question}
                <br />
                <strong>Your Answer:</strong> {answer.selectedAnswer}
                <br />
                <strong>Correct Answer:</strong> {answer.correctAnswer}
              </li>
            ))}
          </ul>
          {previousAnswers.length > 0 && (
            <div className="comparison-container">
              <h3>Comparison with Previous Quiz</h3>
              <ul className="comparison-list">
                {previousAnswers.map((prevAnswer, index) => {
                  const currentAnswer = answers[index];
                  const isCurrentCorrect =
                    currentAnswer && currentAnswer.isCorrect;
                  const isPreviousCorrect = prevAnswer.isCorrect;
                  let comparisonClass = "";
                  if (!isPreviousCorrect && isCurrentCorrect) {
                    comparisonClass = "improved";
                  } else if (!isPreviousCorrect || !isCurrentCorrect) {
                    comparisonClass = "wrong";
                  } else {
                    comparisonClass = "correct";
                  }
                  return (
                    <li
                      key={index}
                      className={`comparison-item ${comparisonClass}`}
                    >
                      <strong>Question:</strong> {prevAnswer.question}
                      <br />
                      <strong>Previous Answer:</strong>{" "}
                      {prevAnswer.selectedAnswer} (
                      {prevAnswer.isCorrect ? "Correct" : "Wrong"})
                      <br />
                      <strong>Current Answer:</strong>{" "}
                      {currentAnswer?.selectedAnswer || "N/A"} (
                      {currentAnswer?.isCorrect ? "Correct" : "Wrong"})
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <button onClick={goHome} className="home-button submit-button">
            Go Home
          </button>
          <button
            onClick={handleRestartQuiz}
            className="restart-button submit-button"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="progress-bar">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`progress ${answer.isCorrect ? "correct" : "wrong"}`}
                style={{ width: `${100 / questions.length}%` }}
              ></div>
            ))}
          </div>
          <div className="question-container">
            <h2 className="question">
              {questions[currentQuestionIndex].question}
            </h2>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="option">
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
