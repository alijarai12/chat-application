// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatRoomList from './components/ChatRoomList';
import JoinChatRoom from './components/JoinChatRoom';
import ListJoinedChatRoom from './pages/ListJoinedChatRoom';
import Chat from './pages/Chat';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatrooms" element={<ChatRoomList />} />
        <Route path="/chat/join/:chatRoomId" element={<JoinChatRoom />} />

        <Route path="/chat/list-joined-chat-rooms" element={<ListJoinedChatRoom />} />
        <Route path="/chatroom/:chatRoomId" element={<Chat />} /> {/* Route for the chat room */}

      </Routes>
    </Router>
  );
};

export default App;
