import { useState } from "react"
import axios from "axios";
const EnterCode = () => {

    const [code, setCode] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setCode(value);
        console.log(code);
    }

    const handleClick = async(e) => {
        e.preventDefault();
    
        try {
            //const body = JSON.stringify(quizzes);
            const response = await axios.post("http://localhost:8080/code", code)
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
            <input type="text" value={code} onChange={handleChange}></input>
            <button type="button" onClick={handleClick}>Start Quiz</button>
        </div>
    )

}

export default EnterCode;