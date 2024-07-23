// src/Navbar.js
import React, { useState, useEffect } from 'react';
import "../styles/navbar.css";
import { Link, useNavigate } from 'react-router-dom';



const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">MyApp</h1>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/chat/list-joined-chat-rooms">Chat</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        
        {!isLoggedIn  ? (
          <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          </>
                
      ) : (
        <li>
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
      </li>
      )}
      </ul>
    </nav>
  );
};

export default Navbar;
