// import React, { useState, useEffect } from 'react';
// import Loading from './Loading';
// import './Quiz.css';

// const Quiz = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [score, setScore] = useState(0);
//   const [isExpanded, setIsExpanded] = useState(false);

//   useEffect(() => {
//     // Fetch questions from your API or generate them based on material
//     fetch('https://api.example.com/get-questions')
//       .then(response => response.json())
//       .then(data => setQuestions(data))
//       .catch(error => console.error('Error fetching questions:', error));
//   }, []);

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const handleSubmit = () => {
//     if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
//       setScore(score + 1);
//     }
//     setSelectedOption(null);
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       // Commenting out the API call for now
//       /*
//       fetch('https://api.example.com/submit-score', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ score }),
//       })
//         .then(response => response.json())
//         .then(data => console.log('Score submitted:', data))
//         .catch(error => console.error('Error submitting score:', error));
//       */
//       console.log('Quiz completed! Your score:', score);
//     }
//   };

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   if (questions.length === 0) {
//     return <Loading />;
//   }

//   return (
//     <div className={`quiz-container ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
//       <h1>Quiz</h1>
//       <div>
//         <h2>{questions[currentQuestionIndex].question}</h2>
//         {questions[currentQuestionIndex].options.map((option, index) => (
//           <div key={index}>
//             <label>
//               <input
//                 type="radio"
//                 value={option}
//                 checked={selectedOption === option}
//                 onChange={handleOptionChange}
//               />
//               {option}
//             </label>
//           </div>
//         ))}
//       </div>
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default Quiz;
import React, { useState } from 'react';
import './Quiz.css';

const Quiz = () => {
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
  const [score, setScore] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Quiz completed! Your score:', score);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`quiz-container ${isExpanded ? 'expanded' : 'shrunk'}`}>
      <h1 className="quiz-title">Quiz</h1>
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
      <button onClick={toggleExpand} className="expand-button">
        {isExpanded ? 'Shrink' : 'Expand'}
      </button>
    </div>
  );
};

export default Quiz;