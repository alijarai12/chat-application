import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import '../styles/chatRoomList.css';
import CreateChatRoom from './CreateChatRoom';

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await api.get('/chat/chatrooms/');
        setChatRooms(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching chat rooms');
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  const handleJoinChatRoom = (chatRoomId) => {
    navigate(`/chat/join/${chatRoomId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="chatroom-page-container">
      <div className="chatroom-list-container">
        <h2>Chat Rooms</h2>
        <ul className="chatroom-list">
          {chatRooms.map((chatRoom) => (
            <li key={chatRoom.id} className="chatroom-item">
              <span onClick={() => handleJoinChatRoom(chatRoom.id)} className="chatroom-name">
                {chatRoom.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="create-chatroom-container">
        <CreateChatRoom />
      </div>
    </div>
  );
};

export default ChatRoomList;
