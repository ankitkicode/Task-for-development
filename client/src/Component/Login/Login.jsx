import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Ensure you have react-toastify installed
import axiosInstance from '../../axiosinstance/AxoisInstance';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the API
      const response = await axiosInstance.post('/auth/login', data);
      // console.log(response.data);
      if (response.data.success) {
        const { token, message } = response.data; 
        localStorage.setItem('token', token); 
        toast.success(message); 
        navigate('/'); 
      } else {
        toast.error(response.data.message); 
      }
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
      toast.error('Login failed. Please try again.'); // Show error notification
    }
  };

  return (
    <div className='login'>
      <div className='card'>
        <div>
          <h1>Login</h1>
          <p>Welcome, Login to continue</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder='Email'
            name='email'
            value={data.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder='Password'
            name='password'
            value={data.password}
            onChange={handleChange}
          />
          <button className='sign-in' type='submit'>Sign-in</button>
        </form>
        <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
