import React, { useState } from 'react';
import axios from 'axios';

const Login = ({
    setPage,
    setLogedInUser
}) => {
    
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);  // Show loading state

      try {
        const response = await axios.post('http://localhost:8000/auth/login', formData);

        if (response.status === 200) {
            alert('logged in successfully!');
            setLogedInUser(response?.data?.user);
            localStorage.setItem('token', response.data.token)
            setPage("chat");
        }
      } catch (error) {
        setLoginSuccess(false);
        setErrorMessage(error.response?.data?.message || 'Login failed');
      } finally {
        setLoading(false);  // Hide loading state after the request completes
      }
    }
  };

  return (
    <div className="container">
      <h2 className='center-heading'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit">Login</button>
        <br/>
        <a href="#" onClick={() => {setPage("signup")}}>Sign up</a>
      </form>
    </div>
  );
};

export default Login;
