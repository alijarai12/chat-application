import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatRoomList from '../components/ChatRoomList';

import api from '../api'; // Adjust the path based on your project structure
import '../styles/joined-chat-room-list.css'; // Ensure the path is correct

const ListJoinedChatRoom = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChatRooms = async () => {
      const tokenString = localStorage.getItem('token');
      if (!tokenString) {
        setError('No token found. Please log in again.');
        return;
      }

      const token = JSON.parse(tokenString);
      try {
        const response = await api.get('chat/chatrooms/list-joined-chat-rooms/', {
          headers: {
            'Authorization': `Bearer ${token.access}`,
          },
        });
        setChatRooms(response.data);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
        setError('Error fetching joined chat rooms');
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div className="page-container">
      <Navbar />
      <div className="joined-chat-room-list-container">
        <h2>Joined Chat Rooms</h2>
        {error && <p className="error">{error}</p>}
        {chatRooms.length > 0 ? (
          <ul className="chat-room-list">
            {chatRooms.map((chatRoom) => (
              <li key={chatRoom.id} className="chat-room-item">
                <Link to={`/chatroom/${chatRoom.id}`} className="chat-room-link">
                  {chatRoom.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-chat-rooms">You have not joined any chat rooms.</p>
        )}
      </div>
      <ChatRoomList />

    </div>
  );
};

export default ListJoinedChatRoom;
