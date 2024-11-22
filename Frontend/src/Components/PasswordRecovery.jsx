import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PasswordRecovery = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDOB] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDOBChange = (e) => {
    setDOB(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordRecovery = () => {
    const recoveryData = {
      username: username,
      email: email,
      mobile: mobile,
      dob: dob
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/password-recovery/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recoveryData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          // OTP sent successfully message
          setMessage("OTP sent successfully to your email.");
          setError('');
        } else {
          setError("Error in password recovery request.");
          setMessage('');
        }
      })
      .catch(error => {
        console.error("Error:", error);
        setError("An error occurred. Please try again.");
        setMessage('');
      });
  };

  // Clear form function
  const handleClearForm = () => {
    setUsername('');
    setEmail('');
    setDOB('');
    setMobile('');
    setMessage('');
    setError('');
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

          .form-group input[type="email"],
          .form-group input[type="tel"],
          .form-group input[type="date"],
          .form-group input[type="text"] {
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

          .message {
            text-align: center;
            margin-top: 20px;
            color: green;
            font-size: 16px;
          }

          .error {
            text-align: center;
            margin-top: 20px;
            color: red;
            font-size: 16px;
          }

          .clear-button {
            background-color: #ddd;
            border: none;
            padding: 10px 15px;
            font-size: 16px;
            color: #000;
            cursor: pointer;
            border-radius: 4px;
            margin-top: 10px;
            transition: background-color 0.3s;
          }

          .clear-button:hover {
            background-color: #bbb;
          }
        `}
      </style>

      <div className="signup-container">
        <div className="container">
          <h1>Password Recovery</h1>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile No:</label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={handleMobileChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={handleDOBChange}
              required
            />
          </div>

          <div className="form-group">
            <button type="button" onClick={handlePasswordRecovery}>Recover Password</button>
          </div>

          {/* Success or error message */}
          {message && <div className="message">{message}</div>}
          {error && <div className="error">{error}</div>}

          <div className="form-group alternate-text">
            Remember your password? <Link to="/login">Log in</Link>
          </div>

          {/* Clear Form button */}
          <div className="form-group alternate-text">
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault(); 
                handleClearForm(); 
              }}
            >
              Clear Form
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
