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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">ChatApp</h1>
      <ul className="navbar-links">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/chat/list-joined-chat-rooms" className="nav-link">Chat</Link></li>
        {!isLoggedIn ? (
          <>
            <li><Link to="/login" className="nav-link">Login</Link></li>
            <li><Link to="/register" className="nav-link">Register</Link></li>
          </>
        ) : (
          <li>
            <button className="btn btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
