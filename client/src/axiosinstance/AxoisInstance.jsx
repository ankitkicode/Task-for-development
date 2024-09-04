import axios from 'axios';
const token = localStorage.getItem('token');
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
});



export default axiosInstance;
