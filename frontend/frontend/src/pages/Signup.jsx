import { Outlet, Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import '../design/Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });


    const handleInputChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/signup", formData);
            console.log('Data sent successfully: ', response.data);

            const token = response.data.token;

            localStorage.setItem('token',token);

        }

        catch (error){
            console.log('Failed to send data: ', error);
        }
    }

    return(
        <body className="signupbody">
            <div className="signup-page">
                <h2>Sign Up</h2>
                <div className="signup-form-container">
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="signup-form-group">
                            <label>Username:</label>
                            <input type="text" name="username" value={formData.username} onChange={handleInputChange}></input>
                        </div>
                        <div className="signup-form-group">
                            <label>Email:</label>
                            <input type="text" name="email" value={formData.email} onChange={handleInputChange}></input>
                        </div>
                        <div className="signup-form-group">
                            <label>Password:</label>
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange}></input>
                        </div>
                        <button type="submit" className="signup-button">Submit</button>
                    </form>
                </div>
            </div>
        </body>
    )

};
export default Signup;