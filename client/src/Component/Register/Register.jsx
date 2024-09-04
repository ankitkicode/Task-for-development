import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosinstance/AxoisInstance';

const Register = () => {
  const [data, setData] = useState({
    name: '',
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
      const response = await axiosInstance.post('/auth/register', data);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error.response ? error.response.data : error.message);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className='register'>
      <div className='card'>
        <div>
          <h1>Register</h1>
          <p>Create Your Free Account Now!</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='Name'
            name='name'
            value={data.name}
            onChange={handleChange}
          />
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
          <button className='sign-in' type='submit'>Register</button>
        </form>
        <p>Already have an account? <Link to={'/login'}>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
