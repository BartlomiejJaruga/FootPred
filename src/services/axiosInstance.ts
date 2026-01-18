import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

export default axiosInstance;
