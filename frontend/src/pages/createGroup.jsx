// QuizRoom.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import AttemptQuiz from './attemptQuiz'; // Assuming this component exists

const QuizRoom = () => {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [quizFetched, setQuizFetched] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [startQuiz, setStartQuiz] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);

    newSocket.on('quizData', (quizData) => {
      setQuiz(quizData);
      setQuizFetched(true);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleCreateRoom = () => {
    socket.emit('createRoom');
    setJoinedRoom(true);
  };

  const handleJoinRoom = () => {
    socket.emit('joinRoom', roomId);
    setJoinedRoom(true);
  };

  const handleStartQuiz = () => {
    socket.emit('fetchQuiz', roomId);
    setStartQuiz(true);
  };

  return (
    <div>
      {joinedRoom ? (
        <div>
          <p>Joined room: {roomId}</p>
          {!quizFetched ? (
            <div>
              <button onClick={handleStartQuiz}>Start Quiz</button>
            </div>
          ) : (
            startQuiz && quiz && <AttemptQuiz quiz={quiz} socket={socket} />
          )}
        </div>
      ) : (
        <div>
          <button onClick={handleCreateRoom}>Create Room</button>
          <label>
            Enter Room ID:
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </label>
          <button onClick={handleJoinRoom}>Join Room</button>
        </div>
      )}
    </div>
  );
};

export default QuizRoom;

