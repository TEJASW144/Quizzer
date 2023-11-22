import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EnterCode = () => {

    const [code, setCode] = useState({
        quizName: '',
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setCode({
            ...code,
            [e.target.name]: value,
        })
    }

    const navigate = useNavigate();

    const handleClick = async(e) => {
        e.preventDefault();
    
        try {
            //const body = JSON.stringify(quizzes);
            const response = await axios.post("http://localhost:8080/code", code);
            if (response.data === 'invalid quiz id'){
                alert('Invalid Quiz ID!');
                return;
            }

            
            localStorage.setItem('quizid', response.data);
    
    
            navigate('/quiz/${code}');
    
        }
        catch (error){
            console.log('Failed to send data: ', error);
        }
      };

    return (
        <div>
            <label>Enter Code:</label>
            <input type="text" name="quizname" onChange={handleChange}></input>
            <button onClick={handleClick}>Start Quiz</button>
        </div>
    )

}

export default EnterCode;