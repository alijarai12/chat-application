import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api';
import '../styles/chat.css';

const Chat = () => {
  const { chatRoomId } = useParams();
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [error, setError] = useState('');
  const [socket, setSocket] = useState(null);

  const connectWebSocket = useCallback(() => {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) {
      setError('No token found. Please log in again.');
      return;
    }

    const token = JSON.parse(tokenString).access;
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${chatRoomId}/?token=${token}`);

    console.log('WebSocket connection attempt for chatRoomId:', chatRoomId);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);

      // Update messages only if the message is not already present
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some((msg) => msg.id === data.id);
        if (!messageExists) {
          return [...prevMessages, { id: data.id, sender: data.sender, content: data.content }];
        }
        return prevMessages;
      });
    };

    ws.onopen = () => {
      console.log('WebSocket connection established');
      setError('');
    };

    ws.onclose = (event) => {
      console.log('WebSocket connection closed', event.code, event.reason);
      setError('Connection lost. Trying to reconnect...');
      setTimeout(connectWebSocket, 5000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('WebSocket error occurred');
    };

    setSocket(ws);

    // Cleanup function to close WebSocket connection on component unmount
    return () => {
      if (ws) {
        console.log('Closing WebSocket connection');
        ws.close();
      }
    };
  }, [chatRoomId]);

  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        const response = await api.get(`/chat/chatrooms/${chatRoomId}/`);
        setChatRoom(response.data);
      } catch (error) {
        setError('Error fetching chat room details');
      }
    };

    const fetchMessages = async () => {
      const tokenString = localStorage.getItem('token');
      if (!tokenString) {
        setError('No token found. Please log in again.');
        return;
      }

      const token = JSON.parse(tokenString);
      try {
        const response = await api.get(`/chat/chatrooms/messages/${chatRoomId}/`, {
          headers: {
            'Authorization': `Bearer ${token.access}`,
          },
        });
        console.log('Fetched messages:', response.data);
        if (response.data.length === 0) {
          setError('No messages found');
        } else {
          // Add unique ID to messages if needed
          setMessages(response.data.map((msg, index) => ({ ...msg, id: index })));
          setError('');
        }
      } catch (error) {
        setError('Error fetching messages');
      }
    };

    fetchChatRoom();
    fetchMessages();
    const cleanupWebSocket = connectWebSocket();

    // Cleanup function to close WebSocket connection on component unmount
    return () => {
      if (cleanupWebSocket) {
        cleanupWebSocket();
      }
    };
  }, [chatRoomId, connectWebSocket]);

  const handleSendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log('Sending message:', messageInput);
      const messageId = Date.now(); // Generate unique ID for the message
      const message = {
        id: messageId,
        content: messageInput,
      };

      socket.send(JSON.stringify(message));
      setMessageInput(''); // Clear the input after sending the message
    } else {
      setError('WebSocket connection is not established.');
    }
  };

  return (
    <div className="chat-container">
      <Navbar />
      <div className="chat-content">
        <h2 className="chat-room-title">{chatRoom?.name}</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className="message">
              <div className="message-sender">{message.sender}</div>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
        </div>
        <div className="message-form">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="message-input"
          />
          <button onClick={handleSendMessage} className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
