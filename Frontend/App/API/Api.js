import axios from 'axios';

const api = axios.create({
  baseURL: 'https://chatapp-d0f9.onrender.com',
});

export default api;
