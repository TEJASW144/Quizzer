const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();
const connect = require('./dbConfig/dbConfig');
const controller = require('./controllers/controllers');
//const authToken = require('./middleware/authenticateToken');

app.use(cors());
connect();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/signup', controller.signup);
app.post('/login', controller.login);
app.post('/addques', controller.addQues);
app.post('/code', controller.enterCode);
app.get('/quiz/:quizId', controller.takeQuiz);

app.listen(8080, () => {
    console.log('Server running at 8080');
})