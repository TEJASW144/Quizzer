const bodyParser = require('body-parser');
const User = require('../models/userModel');
const Ques = require('../models/quizModel');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connect = require('../dbConfig/dbConfig');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const signup = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        console.log('Recieved Data');

        const hashedPassword = await bcrypt.hash(password, 10);

        const data = new User({
            username,
            email,
            password: hashedPassword,
        });

        const output = await data.save();

        const token = jwt.sign({ userId: data._id }, 'HelloReact', { expiresIn: '30d'});

        res.status(201).json({ token });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
    
}

const login = async (req, res) => {

    try {
        const recievedData = req.body;
        console.log('Recieved Data: ', recievedData);

        const output = await User.findOne({
            username: recievedData.username,
        });

        if (!output){
            return res.status(401).json({ message: 'Invalid Credentials'});
        }

        const passwordMatch = await bcrypt.compare(recievedData.password, output.password);

        if (!passwordMatch){
            return res.status(401).json({ message: 'Invalid Credentials'});
        }

        const token = jwt.sign({userId: User._id}, 'HelloReact', { expiresIn: "30d"});

        res.status(200).json({ token });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"});
    }


}

const addQues = async (req, res) => {
    
    try {
        const { question, option_1, option_2, option_3, option_4, answer } = req.body;
        console.log('Recieved Data');

        const hashedAnswer = await bcrypt.hash(answer, 10);

        const data = new Ques({
            question,
            option_1,
            option_2,
            option_3,
            option_4,
            answer: hashedAnswer,
        });

        const output = await data.save();

        const token = jwt.sign({ userId: data._id }, 'HelloReact', { expiresIn: '30d'});

        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }

}

module.exports = {
    signup,
    login,
    addQues,
}