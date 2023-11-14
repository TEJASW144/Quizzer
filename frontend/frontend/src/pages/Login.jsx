import { Outlet, Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../design/Login.css';
import { useNavigate } from "react-router-dom";



const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });


    const handleInputChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        })
    }

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/login", formData);
            console.log('Data sent successfully: ', response.data);

            const token = response.data.token;

            localStorage.setItem('token',token);


            navigate('/welcompage');

        }
        catch (error){
            console.log('Failed to send data: ', error);
        }
    }

    return(
        <body className="loginbody">
        <div className="page">
            <h2>Login</h2>
            <div className="form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleInputChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange}></input>
                    </div>
                    <button type="submit" className="login-button">Submit</button>
                </form>
            </div>
        </div>
        </body>
    )

};
export default Login;