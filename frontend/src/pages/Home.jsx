// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ChatRoomList from '../components/ChatRoomList';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Home Section</h2>
      <h3></h3>

      {isLoggedIn && <ChatRoomList />}
    </div>
  );
};

export default Home;
