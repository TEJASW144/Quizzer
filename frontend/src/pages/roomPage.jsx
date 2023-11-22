// // src/components/RoomPage.js

// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:8080');

// const RoomPage = ({ roomCode, isAdmin }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     socket.on('message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off('message');
//     };
//   }, []);

//   const handleSendMessage = () => {
//     if (newMessage.trim() !== '') {
//       socket.emit('message', { roomCode, isAdmin, message: newMessage });
//       setNewMessage('');
//     }
//   };

//   return (
//     <div>
//       <h1>Room: {roomCode}</h1>
//       <div>
//         {messages.map((message, index) => (
//           <p key={index}>{message}</p>
//         ))}
//       </div>
//       <div>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default RoomPage;
