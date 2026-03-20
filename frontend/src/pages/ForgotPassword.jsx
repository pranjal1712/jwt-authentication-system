import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, ArrowLeft, Send } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/forgot-password', { email });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong');
      setMessage('');
    }
  };

  return (
    <div className="glass-container">
      <Link to="/login" style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', textDecoration: 'none', fontSize: '0.875rem' }}>
        <ArrowLeft size={16} /> Back to Login
      </Link>
      
      <h1>Forgot Password</h1>
      <p className="subtitle">Enter your email and we'll send you a reset link</p>

      <form onSubmit={handleSubmit}>
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

        {message && <p style={{ color: '#22c55e', fontSize: '0.875rem', textAlign: 'center', marginBottom: '12px' }}>{message}</p>}
        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="btn">
          <Send size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
