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

        const finder = await User.findOne({username});

        if (finder){
            res.status(401).json({message: 'User Already Exists'});
            return;
        }

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
        const {username, password} = req.body;
        console.log('Recieved Data: ', req.body);

        const output = await User.findOne({username});

        if (!output){
            return res.status(401).json({ message: 'Invalid Credentials'});
        }

        const passwordMatch = await bcrypt.compare(password, output.password);

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
        const { quizname, quizzes } = req.body;
        console.log(quizname);
        console.log(quizzes);

        const data = new Ques({
            name: quizname,
            quiz: quizzes,
        });

        const output = await data.save();

        res.status(200).json({ output });

        console.log(output);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }

}

const enterCode = async (req, res) => {

    try {
        const { quizname } = req.body;
        console.log(quizname);

        const output = await Ques.findOne({name: quizname});

        console.log(output);

        if (!output) {
            res.status(401).json({message: 'Not Found'});
        }

        else res.status(200).json(output);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

module.exports = {
    signup,
    login,
    addQues,
    enterCode,
}