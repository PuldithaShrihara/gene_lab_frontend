import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#ffffff', padding: '60px 0 20px', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        
        {/* Dark CTA Card */}
        <div style={{ background: 'var(--primary)', borderRadius: '24px', padding: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px', marginBottom: '64px', boxShadow: '0 20px 40px rgba(26,44,66,0.1)' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: '#ffffff', fontSize: '2.5rem', fontWeight: 600, margin: '0 0 12px 0', lineHeight: '1.2' }}>
              Ready to understand<br/>your <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>genetic health?</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '1.05rem', maxWidth: '400px' }}>
              Book a consultation with Dr. Lahiru Prabodha today. Or contact us for any questions.
            </p>
          </div>
          <div>
            <Link to="/appointments" className="btn" style={{ background: '#ffffff', color: 'var(--primary)', padding: '16px 32px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', display: 'inline-block', border: 'none' }}>
              Book Your Consultation →
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
          <div>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary)' }}>
              The Gene Clinic, Dr. Lahiru Prabodha
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              info@thegeneclinic.com • +94 70 191 7000
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
              {/* Quick links so we don't lose navigation */}
              <Link to="/about" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none' }}>About</Link>
              <Link to="/services" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none' }}>Services</Link>
              <Link to="/contact" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none' }}>Contact</Link>
              <Link to="/faq" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none' }}>FAQ</Link>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              &copy; {currentYear} The Gene Clinic - Sri Lanka
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Link to="/privacy-policy" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
              <span style={{ color: 'var(--border-color)' }}>|</span>
              <Link to="/terms-conditions" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none' }}>Terms & Conditions</Link>
              <span style={{ color: 'var(--border-color)' }}>|</span>
              <Link to="/admin-login" className="footer-link footer-admin-link">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
