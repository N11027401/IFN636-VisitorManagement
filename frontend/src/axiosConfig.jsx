import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
  //baseURL: 'http://3.107.57.56:5001'
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
