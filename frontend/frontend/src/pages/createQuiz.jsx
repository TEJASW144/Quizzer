import '../design/Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateQuiz() {

    const [formData, setFormData] = useState([]);

    const [questions, setQuestions ] = useState({
        question: '',
        option_1: '',
        option_2: '',
        option_3: '',
        option_4: '',
        answer: '',
    })

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuestions({
            ...questions,
            [e.target.name]: value,
        })
    }

    const navigate = useNavigate();

    const handleAddQuestion = async (e) => {
        e.preventDefault();

        setFormData(questions);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/addquiz", formData);
            console.log('Data sent successfully: ', response.data);


            //navigate('/');

        }
        catch (error){
            console.log('Failed to send data: ', error);
        }
    }

    return (

        <div className="page">
            <h2>Create Quiz</h2>
            <div className="form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Enter Question:</label>
                        <input type="text" name='question' value={formData.question} onChange={handleInputChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Enter Option 1:</label>
                        <input type="text" name='option_1' value={formData.option_1} onChange={handleInputChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Enter Option 2:</label>
                        <input type="text" name='option_2' value={formData.option_2} onChange={handleInputChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Enter Option 3:</label>
                        <input type="text" name='option_3' value={formData.option_3} onChange={handleInputChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Enter Option 4:</label>
                        <input type="text" name='option_4' value={formData.option_4} onChange={handleInputChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Answer:</label>
                        <input type="text" name='answer' value={formData.answer} onChange={handleInputChange}></input>
                    </div>
                    <button type="button" className="login-button" onClick={handleAddQuestion}>Add Question</button>
                    <button type="submit" className="login-button">Create Quiz</button>
                </form>
            </div>
        </div>

    )


}
