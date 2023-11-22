// // src/components/Room.js
// "@babel/plugin-proposal-private-property-in-object"

// import React, { useState } from 'react';
// import io from 'socket.io-client';
// import { useNavigate } from 'react-router-dom';
// import RoomPage from './roomPage';

// const socket = io('http://localhost:8080');

// const Room = () => {
//   const [roomCode, setRoomCode] = useState('');
//   const [isAdmin, setIsAdmin] = useState(true);

//   const navigate = useNavigate();

//   const handleCreateRoom = () => {
//     socket.emit('createRoom', roomCode, isAdmin);
//     navigate('/room/${roomCode}');
//   };

// //   const handleJoinRoom = () => {
// //     socket.emit('joinRoom', roomCode);
// //   };

//   socket.on('joinRequest', (requesterSocketId) => {
//     if (window.confirm(`User ${requesterSocketId} wants to join the room. Approve?`)) {
//       socket.emit('approveJoin', requesterSocketId);
//     }
//   });

//   return (
//     <div>
//       <h1>Room</h1>
//       <label>
//         Room Code:
//         <input type="text" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
//       </label>
//       <br />
//       {/* <label>
//         Are you the admin?
//         <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
//       </label> */}
//       <br />
//       <button onClick={handleCreateRoom}>Create Room</button>
//       {/* <button onClick={handleJoinRoom}>Join Room</button> */}
//       {roomCode && <RoomPage roomCode={roomCode} isAdmin={isAdmin} />}
//     </div>
//   );
// };

// export default Room;
