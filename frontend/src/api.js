// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: "https://ivms-backend-szyi.onrender.com",
});

export default api;
