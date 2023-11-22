// QuizForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../design/createQuiz.module.css';

const QuizForm = () => {
    const [quizzes, setQuizzes] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
    const [quizname, setQuizName] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleNameChange = (e) => {
      const value = e.target.value;
      setQuizName(value);
    }

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
          const response = await axios.post("http://localhost:8080/addques", {
            quizname,
            quizzes,
          });
          console.log('Data sent successfully: ', response.data);


          //navigate('/welcompage');

      }
      catch (error){
          console.log('Failed to send data: ', error);
      }
    };

    return (
      <body>
    <div className='h-24 flex bg-black text-4xl justify-center items-center heading' >  APOLLO's ORACLE </div>
    <div className="quizname text-4xl px-2">QUIZ NAME:</div>
    <input type='text' value={quizname} onChange={handleNameChange}></input>
    <div className=' w-auto mx-64  my-4 border-4  rounded-xl bg-opacity-5 border-white px-5 '>
      {quizzes.map((quiz, questionIndex) => (
        <div key={questionIndex}>
          <hr className='mt-4 border-2'/>
          <h3 className='text-2xl '>Question {questionIndex + 1}</h3>
          <hr  className='border-2'/>
          <div className='flex justify-center my-1'>
            <input
              type="text" placeholder='Enter your Question here.....'
              value={quiz.question}
              onChange={(e) => {
                const updatedQuizzes = [...quizzes];
                updatedQuizzes[questionIndex].question = e.target.value;
                setQuizzes(updatedQuizzes);
              }}
            />
          
          </div>
          <br />

          <label className='text-2xl'>
            Enter Options:
            <ul>
              {quiz.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <input
                    type="text" placeholder={'Option ' + (optionIndex+1)}
                    value={option}
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </label>
          <br />

          <label>
            Choose the Correct Answer:
            <select 
              value={quiz.correctAnswer} className='border rounded mx-1 cursor-pointer text-black w-min' placeholder='Choose your Option'
              onChange={(e) => {
                const updatedQuizzes = [...quizzes];
                updatedQuizzes[questionIndex].correctAnswer = e.target.value;
                setQuizzes(updatedQuizzes);
              }}
            >
              <option value="" disabled className='font-semibold my-2 text-black '>Select correct answer</option>
              {quiz.options.map((option, optionIndex) => (
                <option key={optionIndex} value={option} className='text-black rounded cursor-pointer'>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <hr />
        </div>
      ))}

      <button className="border-4 border-white bg-black font-semibold text-white py-2 my-4 rounded button px-1 hover:bg-blue-950  hover:text-white" onClick={handleAddQuestion}>+ Add Question</button>
      <button onClick={handleSaveQuiz } className='float-right border bg-blue-700 font-semibold hover:bg-blue-600 py-2 text-white my-4 px-1 rounded button'>Save Quiz</button>
    </div>
    </body>
    );
};

export default QuizForm;
