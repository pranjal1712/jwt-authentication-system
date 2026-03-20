import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, LogOut, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  if (loading) return <div style={{ color: 'white' }}>Loading...</div>;

  return (
    <div className="glass-container">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <div style={{ padding: '20px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', border: '1px solid var(--primary)' }}>
          <User size={48} color="#818cf8" />
        </div>
      </div>
      
      <h1>User Profile</h1>
      <p className="subtitle">Logged in securely with JWT</p>

      <div style={{ marginTop: '32px' }}>
        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <Mail size={20} color="#94a3b8" />
          <div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</p>
            <p style={{ fontWeight: '500' }}>{user.email}</p>
          </div>
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <User size={20} color="#94a3b8" />
          <div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</p>
            <p style={{ fontWeight: '500' }}>{user.name || 'Not Provided'}</p>
          </div>
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <Phone size={20} color="#94a3b8" />
          <div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Phone</p>
            <p style={{ fontWeight: '500' }}>{user.phone || 'Not Provided'}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#22c55e', fontSize: '0.875rem', margin: '24px 0' }}>
        <ShieldCheck size={16} /> Session Secure
      </div>

      <button onClick={handleLogout} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
        <LogOut size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
