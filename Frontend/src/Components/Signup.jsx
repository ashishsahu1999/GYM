import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        username,
        email,
        password,
        gender,
        dob,
        mobile,
      });

      // Reset the form fields
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setGender('');
      setDob('');
      setMobile('');

      if (response.status === 201) {
        alert('Signup successful!'); // Handle success case
      }
    } catch (error) {
      console.error('Signup error:', error.response.data);
      alert('Signup failed: ' + error.response.data.message);
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
          .form-group input[type="email"],
          .form-group input[type="tel"],
          .form-group input[type="password"],
          .form-group input[type="date"],
          .form-group select {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .password-row {
            display: flex;
            gap: 20px;
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

          .link-separator {
            margin: 0 60px;
          }
        `}
      </style>

      <div className="signup-container">
        <div className="container">
          <h1>Sign Up</h1>
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile No:</label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <div className="password-row">
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
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <button type="button" onClick={handleSignup}>Sign Up</button>
          </div>

          <div className="form-group alternate-text">
            <div>
              Already have an account? <Link to="/login">Log in</Link>
              <span className="link-separator"></span>
              <Link to="/">Back To Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
