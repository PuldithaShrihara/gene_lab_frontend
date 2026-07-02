import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { Calendar, FileText, UserPlus, Mail } from 'lucide-react';

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (!user) {
    // If we want a public message:
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <h2>Please Log In</h2>
        <p className="text-muted" style={{ maxWidth: '400px', marginTop: '16px' }}>
          You need to be logged in to view your profile. Please use the Login button in the header.
        </p>
      </div>
    );
  }

  return (
    <div className="profile-page animate-fade-in" style={{ padding: '60px 0', minHeight: '70vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 className="text-gradient" style={{ marginBottom: '40px', textAlign: 'center' }}>Your Profile</h1>
        
        <div className="card" style={{ padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px' }}>
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px', border: '4px solid rgba(2, 132, 199, 0.1)' }}
            />
          ) : (
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '2rem', marginBottom: '20px' }}>
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </div>
          )}
          
          <h2 style={{ margin: '0 0 8px', fontSize: '1.8rem', color: 'var(--text-main)' }}>{user.displayName || 'Patient'}</h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.1rem' }}>{user.email}</p>
        </div>

        <h3 style={{ marginBottom: '24px', color: 'var(--text-main)' }}>Quick Links</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <Link to="/appointments" className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', color: 'var(--text-main)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ background: 'rgba(2, 132, 199, 0.1)', padding: '12px', borderRadius: '50%', color: 'var(--secondary)' }}>
              <Calendar size={24} />
            </div>
            <div style={{ fontWeight: 600 }}>Book Appointment</div>
          </Link>
          
          <Link to="/request-genetic-test" className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', color: 'var(--text-main)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ background: 'rgba(2, 132, 199, 0.1)', padding: '12px', borderRadius: '50%', color: 'var(--secondary)' }}>
              <FileText size={24} />
            </div>
            <div style={{ fontWeight: 600 }}>Request Genetic Test</div>
          </Link>

          <Link to="/patient-registration" className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', color: 'var(--text-main)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ background: 'rgba(2, 132, 199, 0.1)', padding: '12px', borderRadius: '50%', color: 'var(--secondary)' }}>
              <UserPlus size={24} />
            </div>
            <div style={{ fontWeight: 600 }}>Patient Registration</div>
          </Link>

          <Link to="/contact" className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', color: 'var(--text-main)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ background: 'rgba(2, 132, 199, 0.1)', padding: '12px', borderRadius: '50%', color: 'var(--secondary)' }}>
              <Mail size={24} />
            </div>
            <div style={{ fontWeight: 600 }}>Contact Us</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
