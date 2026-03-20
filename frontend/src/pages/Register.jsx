import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, Lock, UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setError("Passwords don't match");
      return;
    }
    try {
      await axios.post('/api/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <div className="glass-container">
      <h1>Create Account</h1>
      <p className="subtitle">Join our premium community</p>

      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Full Name</label>
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              name="name"
              type="text" 
              placeholder="John Doe" 
              style={{ paddingLeft: '40px' }}
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              name="email"
              type="email" 
              placeholder="name@example.com" 
              style={{ paddingLeft: '40px' }}
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <div style={{ position: 'relative' }}>
            <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              name="phone"
              type="tel" 
              placeholder="+1 (555) 000-0000" 
              style={{ paddingLeft: '40px' }}
              value={formData.phone}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              name="password"
              type="password" 
              placeholder="••••••••" 
              style={{ paddingLeft: '40px' }}
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              name="confirm_password"
              type="password" 
              placeholder="••••••••" 
              style={{ paddingLeft: '40px' }}
              value={formData.confirm_password}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="btn">
          <UserPlus size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Register Now
        </button>

        <div className="links">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
