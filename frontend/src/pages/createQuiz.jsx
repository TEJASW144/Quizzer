// QuizForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizForm = () => {
  const [quizzes, setQuizzes] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[questionIndex].options[optionIndex] = value;
    setQuizzes(updatedQuizzes);
  };

  const handleAddQuestion = () => {
    setQuizzes([...quizzes, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
    setCurrentQuestionIndex(quizzes.length);
  };

  const navigate = useNavigate();
  
  const handleSaveQuiz = async(e) => {
    e.preventDefault();

    try {
        //const body = JSON.stringify(quizzes);
        const response = await axios.post("http://localhost:8080/addques", quizzes)
        console.log('Data sent successfully: ', response.data);


        //navigate('/welcompage');

    }
    catch (error){
        console.log('Failed to send data: ', error);
    }
  };

  return (
    <div>
      {quizzes.map((quiz, questionIndex) => (
        <div key={questionIndex}>
          <h3>Question {questionIndex + 1}</h3>
          <label>
            Question:
            <input
              type="text"
              value={quiz.question}
              onChange={(e) => {
                const updatedQuizzes = [...quizzes];
                updatedQuizzes[questionIndex].question = e.target.value;
                setQuizzes(updatedQuizzes);
              }}
            />
          </label>
          <br />

          <label>
            Options:
            <ul>
              {quiz.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </label>
          <br />

          <label>
            Correct Answer:
            <select
              value={quiz.correctAnswer}
              onChange={(e) => {
                const updatedQuizzes = [...quizzes];
                updatedQuizzes[questionIndex].correctAnswer = e.target.value;
                setQuizzes(updatedQuizzes);
              }}
            >
              <option value="" disabled>Select correct answer</option>
              {quiz.options.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <hr />
        </div>
      ))}

      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleSaveQuiz}>Save Quiz</button>
    </div>
  );
};

export default QuizForm;
