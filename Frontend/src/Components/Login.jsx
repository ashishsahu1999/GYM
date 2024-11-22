import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // If a token exists, redirect to the sidebar or any protected route
      navigate('/sidebar');
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/login/', 
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        // Store the token in localStorage after successful login
        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
        navigate('/sidebar'); // Redirect to sidebar or any protected route after login
      }
    } catch (error) {
      setError(error.response?.data?.msg || error.message || 'Login failed');
    }
  };

  return (
    <div>
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            background-color: #000;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 500px;
            margin: 50px auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .signup-container {
            margin-top: 150px;
          }
          .signup-container h1 {
            text-align: center;
          }
          .form-group {
            margin-bottom: 20px;
          }
          .form-group input[type="text"],
          .form-group input[type="password"] {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .form-group button {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            color: #fff;
            background: linear-gradient(90deg, #FF1414 20%, #f70000);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s ease;
          }
          .form-group button:hover {
            background: linear-gradient(90deg, #f70000 20%, #FF1414);
          }
          .form-group .alternate-text {
            text-align: center;
            margin-top: 10px;
            font-size: 14px;
            color: #777;
          }
        `}
      </style>

      <div className="signup-container">
        <div className="container">
          <h1>Log In</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
          </form>
          <div className="form-group alternate-text">
            Forgotten Password? <Link to="/password-recovery">Recover Your Password</Link><br /><br />
            Don't have an account? <Link to="/signup">Sign up</Link><br /><br />
            <Link to="/">Back To Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
