import React, { useState } from 'react';
import api from '../api'; // Adjust the import according to your API setup
import '../styles/createChatRoom.css'; // Ensure the path to the CSS file is correct

const CreateChatRoom = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('chat/add-chatrooms/', {
        name: name,
      });
      setSuccess('Chat room created successfully!');
      setName('');
      setError('');
    } catch (error) {
      setError('Failed to create chat room.');
      setSuccess('');
      console.error(error);
    }
  };

  return (
    <div className="create-chatroom-container">
      <h2>Create Chat Room</h2>
      <form onSubmit={handleSubmit} className="create-chatroom-form">
        <div className="form-group">
          <label htmlFor="chatroom-name">Chat Room Name:</label>
          <input
            type="text"
            id="chatroom-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-create">Create Chat Room</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default CreateChatRoom;
