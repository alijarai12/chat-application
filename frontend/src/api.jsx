// src/api.jsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Replace with your actual API base URL
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
