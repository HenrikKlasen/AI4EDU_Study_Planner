import React, { useState } from 'react';
import './Quiz.css';

const Quiz = ({ goHome }) => {
  const mockQuestions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      correctAnswer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
    },
    {
      question: 'What is the largest ocean on Earth?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      correctAnswer: 'Pacific Ocean',
    },
  ];

  const [questions, setQuestions] = useState(mockQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    const isCorrect = selectedOption === questions[currentQuestionIndex].correctAnswer;
    setAnswers([...answers, isCorrect]);
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Quiz completed! Answers:', answers);
    }
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz</h1>
      <div className="progress-bar">
        {answers.map((isCorrect, index) => (
          <div
            key={index}
            className={`progress ${isCorrect ? 'correct' : 'wrong'}`}
            style={{ width: `${100 / questions.length}%` }}
          ></div>
        ))}
      </div>
      <div className="question-container">
        <h2 className="question">{questions[currentQuestionIndex].question}</h2>
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
      <button onClick={handleSubmit} className="submit-button">Submit</button>
      <button onClick={goHome} className="home-button">Home</button>
    </div>
  );
};

export default Quiz;