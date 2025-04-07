import React, { useState } from 'react';
import axios from 'axios';

const SignUp = ({setPage}) => {
        
    const [loading, setLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
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

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);  // Show loading state

      try {
        const response = await axios.post('http://localhost:8000/auth/signup', formData);

        if (response.status === 200) {
          setPage("login");
          alert('User register successfully!');

        }
      } catch (error) {
        setLoginSuccess(false);
        setErrorMessage(error.response?.data?.message || 'Login failed');
        alert(error.response?.data?.message);
      } finally {
        setLoading(false);  // Hide loading state after the request completes
      }
    }
  };

  return (
    <div className="container">
      <h2 className='center-heading'>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

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

        <button type="submit">Sign Up</button>
        <br/>
        <a href="#" onClick={() => {setPage("login")}}>Login</a>
      </form>
    </div>
  );
};

export default SignUp;
