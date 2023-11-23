// QuizRoom.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const QuizRoom = () => {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [joinedRoom, setJoinedRoom] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleCreateRoom = () => {
    // Emit createRoom event to the server
    socket.emit('createRoom');
    setJoinedRoom(true);
  };

  const handleJoinRoom = () => {
    // Emit joinRoom event to the server with the entered room ID
    socket.emit('joinRoom', roomId);
    setJoinedRoom(true);
  };

  return (
    <div>
      {joinedRoom ? (
        <div>
          {/* UI for users in the room */}
          <p>Joined room: {roomId}</p>
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
