import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [authData, setauthData] = useState({
    email: '',
    password: '',
    role: 'user'
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  function changeHandler(e) {
    const { name, value } = e.target;
    setauthData({ ...authData, [name]: value });
    setError('');
  }

  async function submitHandler(e) {
    e.preventDefault();
    setError('');

    try {
      const endpoint = authData.role === 'admin' ? 'login/admin' : 'login/user';
      const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/${endpoint}`, {
        email: authData.email,
        password: authData.password
      });

      console.log(res);

      setauthData({
        email: '',
        password: '',
        role: 'user'
      });

      if (authData.role === 'admin') {
        navigate('/AdminDashboard');
      } else {
        navigate('/Home');
      }
    } catch (err) {
      console.log('Login error: ', err);

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Wrong email or password.');
      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="Close"
          className="close-btn"
        >
          ✕
        </button>

        <div className="illustration-wrapper">
          <svg
            width="100%"
            height="110"
            viewBox="0 0 300 80"
            fill="none"
            stroke="#2c3e50"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="150" cy="20" r="8" />
            <path d="M150 8v4 M150 28v4 M138 20h-4 M166 20h-4 M141.5 11.5l-2.8-2.8 M161.3 31.3l-2.8-2.8 M141.5 28.5l-2.8 2.8 M161.3 8.7l-2.8 2.8" />
            <path d="M10 70h280" />
            <path d="M40 70V45h30v25 M80 70V30h30v40 M125 70V10h10v60 M150 70V40h20v30 M180 70V25h35v45 M225 70V35h30v35" />
            <path d="M175 40l15-10 15 10" />
            <path d="M250 50l10-7 10 7v20h-20z" />
          </svg>
        </div>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              EMAIL ADDRESS
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={authData.email}
              onChange={changeHandler}
              required
              placeholder="Enter Email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={authData.password}
              onChange={changeHandler}
              required
              placeholder="Password"
              className="form-input"
            />
          </div>

          <div className="form-group select-group">
            <label htmlFor="role" className="form-label">
              LOGIN AS
            </label>
            <select
              id="role"
              name="role"
              value={authData.role}
              onChange={changeHandler}
              className="form-input form-select"
            >
              <option value="user">Student</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          {error && <p className="error-message">{error}</p>}

          <p className="signup-text">
            Don't have an account? <Link to="/register">Signup</Link>
          </p>

          <div className="button-wrapper">
            <button type="submit" className="submit-btn">
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;