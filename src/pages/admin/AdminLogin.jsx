import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import { Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid admin username or password.');
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', data.username);
      
      // Redirect to dashboard
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err.message || 'Invalid admin username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in bg-wave-lines" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '40px', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
        <div className="text-center mb-8">
          <div className="flex-row-center mx-auto mb-4" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.1)', color: 'var(--secondary)' }}>
            <Lock size={32} />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>Admin Login</h1>
          <p className="small-text text-muted">Authorized access for The Gene Clinic administration</p>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '12px', fontSize: '0.9rem', marginBottom: '24px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex-col gap-5">
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Username</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: '44px', paddingRight: '16px', height: '48px', borderRadius: '12px' }}
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                className="form-control"
                style={{ paddingLeft: '44px', paddingRight: '16px', height: '48px', borderRadius: '12px' }}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary mt-2"
            style={{ height: '52px', borderRadius: '14px', fontSize: '1rem', fontWeight: 700, width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
