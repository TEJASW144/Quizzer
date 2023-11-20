import { useState } from "react"
import axios from "axios";
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

    const handleClick = async(e) => {
        e.preventDefault();
    
        try {
            //const body = JSON.stringify(quizzes);
            const response = await axios.post("http://localhost:8080/code", code);
            console.log('Data sent successfully: ', response.data);
    
    
            //navigate('/welcompage');
    
        }
        catch (error){
            console.log('Failed to send data: ', error);
        }
      };

    return (
        <div>
            <label>Enter Code:</label>
            <input type="text" onChange={handleChange}></input>
            <button onClick={handleClick}>Start Quiz</button>
        </div>
    )

}

export default EnterCode;