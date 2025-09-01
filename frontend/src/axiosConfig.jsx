import axios from 'axios';
const axiosInstance = axios.create({
  //baseURL: 'http://localhost:5001',
  baseURL: 'http://54.253.139.7:5001',
  headers: { 'Content-Type': 'application/json'}
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
