const express = require('express');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const app = express();
const connect = require('./dbConfig/dbConfig');
const controller = require('./controllers/controllers');
const { v4: uuidv4 } = require('uuid');
//const authToken = require('./middleware/authenticateToken');

app.use(cors());
connect();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: '*',
    }
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/signup', controller.signup);
app.post('/login', controller.login);
app.post('/addques', controller.addQues);
app.post('/code', controller.enterCode);
app.get('/quiz/:quizId', controller.takeQuiz);

const rooms = {};

io.on('connection', (socket) => {
    console.log("Socket in use");

    socket.on('createRoom', () => {
        // Generate a random room ID using uuidv4()
        const roomId = uuidv4();
    
        // Create a new room
        rooms[roomId] = { users: [] };
        socket.join(roomId);
    
        console.log(`Room created: ${roomId}`);
      });
    
      socket.on('joinRoom', (roomId) => {
        // Add the user to the room
        socket.join(roomId);
        rooms[roomId].users.push(socket.id);
    
        console.log(`User joined room: ${roomId}`);
        console.log(`Users in room: ${rooms[roomId].users}`);
      });
    
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
})

server.listen(8080, () => {
    console.log('Server running at 8080');
})