import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginButton() {
  const { user, loginWithGoogle, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      await loginWithGoogle();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
  };

  const goToProfile = () => {
    navigate('/profile');
    setDropdownOpen(false);
  };

  if (user) {
    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '999px',
            padding: '4px 12px 4px 4px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U')}
            </div>
          )}
          <span className="small-text" style={{ fontWeight: 600, color: 'var(--text-main)', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user.displayName || user.email}
          </span>
        </button>

        {dropdownOpen && (
          <div style={{
            position: 'absolute',
            top: '110%',
            right: 0,
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            border: '1px solid var(--border-color)',
            minWidth: '200px',
            padding: '8px',
            zIndex: 100,
          }}>
            <button 
              onClick={goToProfile}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '10px 12px',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                borderRadius: '8px',
                color: 'var(--text-main)',
                fontSize: '0.95rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <User size={16} /> Profile
            </button>
            <button 
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '10px 12px',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                borderRadius: '8px',
                color: 'var(--accent)',
                fontSize: '0.95rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button 
        onClick={handleLoginClick}
        style={{
          background: 'white',
          border: '1px solid var(--border-color)',
          borderRadius: '999px',
          padding: '8px 20px',
          color: 'var(--text-main)',
          fontWeight: 600,
          fontSize: '0.95rem',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--secondary)';
          e.currentTarget.style.color = 'var(--secondary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color)';
          e.currentTarget.style.color = 'var(--text-main)';
        }}
      >
        Login
      </button>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '440px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            textAlign: 'center'
          }}>
            <button 
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <X size={24} />
            </button>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
              Sign in to The Gene Clinic
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '32px' }}>
              Use your Google account to continue with appointments, test requests, and patient services.
            </p>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            <button 
              onClick={handleGoogleSignIn}
              style={{
                width: '100%',
                padding: '14px',
                background: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: '24px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.8 15.71 17.58V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.58C14.73 18.24 13.48 18.63 12 18.63C9.13 18.63 6.7 16.7 5.82 14.12H2.14V16.97C3.96 20.59 7.68 23 12 23Z" fill="#34A853"/>
                <path d="M5.82 14.12C5.59 13.47 5.46 12.76 5.46 12C5.46 11.24 5.59 10.53 5.82 9.88V7.03H2.14C1.39 8.52 0.96 10.2 0.96 12C0.96 13.8 1.39 15.48 2.14 16.97L5.82 14.12Z" fill="#FBBC05"/>
                <path d="M12 5.38C13.62 5.38 15.06 5.94 16.2 7.02L19.35 3.87C17.45 2.09 14.97 1 12 1C7.68 1 3.96 3.41 2.14 7.03L5.82 9.88C6.7 7.3 9.13 5.38 12 5.38Z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', margin: 0, lineHeight: '1.5' }}>
              Your information will be used only for appointment coordination and service communication.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
