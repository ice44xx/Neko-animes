import axios from 'axios';

const baseUrl = 'https://neko-animes.onrender.com';

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
