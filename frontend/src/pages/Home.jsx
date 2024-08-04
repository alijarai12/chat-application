import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/home.css'; // Import the CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to ChatApp</h1>
          <p className="hero-subtitle">A sleek, modern chat experience.</p>
          <div className="action-buttons">
            <button className="btn-primary">Start Chatting</button>
            <button className="btn-secondary">Explore Features</button>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 ChatApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
