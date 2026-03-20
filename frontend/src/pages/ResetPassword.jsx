import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post('/api/reset-password', {
                token,
                new_password: newPassword,
                confirm_password: confirmPassword
            });
            setMessage(response.data.message);
            setError('');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.detail || 'Reset failed');
            setMessage('');
        }
    };

    return (
        <div className="glass-container">
            <h1>Reset Password</h1>
            <p className="subtitle">Choose a new strong password</p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>New Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            style={{ paddingLeft: '40px' }}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required 
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Confirm New Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            style={{ paddingLeft: '40px' }}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required 
                        />
                    </div>
                </div>

                {message && <p style={{ color: '#22c55e', textAlign: 'center', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><CheckCircle size={16} /> {message}</p>}
                {error && <p className="error-msg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><AlertCircle size={16} /> {error}</p>}

                <button type="submit" className="btn">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
