import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import WelcomePage from './pages/Welcomepage';
import CreateQuiz from './pages/createQuiz';
import Quiz from './pages/attemptQuiz';
import Contactus from './pages/contactUs';
import QuizRoom from './pages/createGroup';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Homepage></Homepage>}></Route>
            <Route path='/signup' element={<Signup></Signup>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/welcompage' element={<WelcomePage></WelcomePage>}></Route>
            <Route path='/create-quiz' element={<CreateQuiz></CreateQuiz>}></Route>
            <Route path='/attemptquiz' element={<Quiz></Quiz>}></Route>
            <Route path='/contactus' element={<Contactus></Contactus>}></Route>
            <Route path='/quizroom' element={<QuizRoom></QuizRoom>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
