// Quiz.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
  const [quizId, setQuizId] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [quizFetched, setQuizFetched] = useState(false);

  const handleQuizIdChange = (e) => {
    setQuizId(e.target.value);
  };

  const handleQuizFetch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/quiz/${quizId}`);
      setQuiz(response.data);
      setScore(null); // Reset the score when fetching a new quiz
      setQuizFetched(true);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setQuizFetched(false);
    }
  };

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.quiz.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers += 1;
      }
    });
    return correctAnswers;
  };

  useEffect(() => {
    setQuiz(null);
    setUserAnswers({});
    setScore(null);
    setQuizFetched(false);
  }, [quizId]);

  useEffect(() => {
    if (quiz && currentQuestionIndex === quiz.quiz.length) {
      // Calculate and set the score when the quiz is completed
      const userScore = calculateScore();
      setScore(userScore);
    }
  }, [currentQuestionIndex, quiz]);

  return (
    <div>
      {!quizFetched && (<div><h2>Quiz</h2>
      <label>
        Enter Quiz Code (ObjectId):
        <input
          type="text"
          value={quizId}
          onChange={handleQuizIdChange}
        />
      </label>
      <button onClick={handleQuizFetch}>Fetch Quiz</button></div>)}

      {quiz && (
        <div>
          <h3>{quiz.name}</h3>
          {currentQuestionIndex < quiz.quiz.length ? (
            <div>
              <p>{quiz.quiz[currentQuestionIndex].question}</p>
              <ul>
                {quiz.quiz[currentQuestionIndex].options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label>
                      <input
                        type="radio"
                        name={`question${currentQuestionIndex}`}
                        value={option}
                        checked={userAnswers[currentQuestionIndex] === option}
                        onChange={() => handleOptionSelect(currentQuestionIndex, option)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
              <button onClick={handleNextQuestion}>Next Question</button>
            </div>
          ) : (
            <div>
              <p>Quiz completed! Here are your answers:</p>
              <ul>
                {quiz.quiz.map((question, index) => (
                  <li key={index}>
                    <p>{question.question}</p>
                    <p>Your Answer: {userAnswers[index]}</p>
                  </li>
                ))}
              </ul>
              <p>Your Score: {score}/{quiz.quiz.length}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
