import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { LogIn, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      navigate('/profile');
      window.location.reload(); // Refresh to update auth state in App.jsx
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  const onSuccess = async (res) => {
    try {
      // Decode the Google JWT credential to get real user info
      const base64Url = res.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const googleData = JSON.parse(jsonPayload);
      
      const response = await axios.post('/api/google-login', { 
        email: googleData.email,
        name: googleData.name 
      });
      localStorage.setItem('token', response.data.access_token);
      navigate('/profile');
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError('Google login failed');
    }
  };

  return (
    <div className="glass-container">
      <h1>Welcome Back</h1>
      <p className="subtitle">Sign in to your account</p>
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email Address</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="email" 
              placeholder="name@example.com" 
              style={{ paddingLeft: '40px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="password" 
              placeholder="••••••••" 
              style={{ paddingLeft: '40px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="btn">
          <LogIn size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Sign In
        </button>

        <div className="links">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <div className="divider">or continue with</div>

        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => setError('Google login failed')}
          useOneTap
          theme="outline"
          shape="circle"
        />

        <div className="links" style={{ marginTop: '24px' }}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
