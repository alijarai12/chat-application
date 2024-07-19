// src/Navbar.js
import React, { useState } from 'react';
import "../styles/navbar.css";
import { Link } from 'react-router-dom';



const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions (e.g., clear session, update state)
    setIsLoggedIn(false);
  };
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">MyApp</h1>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {isLoggedIn ? (
        <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
      ) : (
        <>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        </>
      )}
      </ul>
    </nav>
  );
};

export default Navbar;
