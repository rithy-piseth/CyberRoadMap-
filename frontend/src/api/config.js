import axios from 'axios';

// Use current hostname so it works for both localhost and LAN access
const getBaseURL = () => {
  const hostname = window.location.hostname
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3000'
  }
  // When accessed via LAN IP, point to same IP but port 3000
  return `http://${hostname}:3000`
}

const API = axios.create({
  baseURL: getBaseURL(),
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;