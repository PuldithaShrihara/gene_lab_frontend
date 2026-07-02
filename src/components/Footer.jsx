import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Info, Calendar, FileText } from 'lucide-react';
import logoImg from '../assets/logo.png';
import QuickAccessLinks from './QuickAccessLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer" style={{ padding: '40px 0 20px', backgroundColor: '#020b1c', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="footer-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Compact 4-Column Footer Grid */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '32px' }}>
          
          {/* Column 1: Brand */}
          <div className="footer-col brand-col">
            <div className="footer-logo" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
              <img src={logoImg} alt="The Gene Clinic Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, fontSize: '15px', color: '#fff', lineHeight: 1.1 }}>The Gene Clinic</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-light)', marginTop: '2px' }}>GenSek Health Private Limited</span>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '12px', marginTop: '4px' }}>Dr. L. B. Lahiru Prabodha</span>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Clinical Geneticist and Genetic Counsellor</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', lineHeight: 1.5, color: '#94a3b8', marginBottom: '20px' }}>
              The Gene Clinic by GenSek Health Private Limited provides genetic counselling, wellness genomics, NIPT, and genetic report interpretation.
            </p>
            <div style={{ marginBottom: '8px' }}>
              <h4 style={{ color: '#fff', fontSize: '13px', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Access</h4>
              <QuickAccessLinks variant="icons" theme="dark" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 600, margin: '0 0 16px' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><Link to="/" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>Home</Link></li>
              <li><Link to="/about" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>About</Link></li>
              <li><Link to="/services" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>Services</Link></li>
              <li><Link to="/packages" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>Test Packages</Link></li>
              <li><Link to="/blueprint" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>Wellness Blueprint</Link></li>
              <li><Link to="/nipt" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>NIPT</Link></li>
              <li><Link to="/patient-registration" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>Patient Registration</Link></li>
              <li><Link to="/faq" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>FAQ / Q & A</Link></li>
              <li><Link to="/contact" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-col">
            <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 600, margin: '0 0 16px' }}>Services</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><Link to="/services" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>Genetic Counselling</Link></li>
              <li><Link to="/services" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>Wellness Counselling</Link></li>
              <li><Link to="/services" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>Precision Medicine</Link></li>
              <li><Link to="/services" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>Personalized Management</Link></li>
              <li><Link to="/nipt" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>NIPT</Link></li>
              <li><Link to="/appointments" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>Online Consultation</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-col contact-col">
            <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 600, margin: '0 0 16px' }}>Contact</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#94a3b8' }}>
                <Phone size={14} style={{ color: 'var(--accent-light)', marginTop: '2px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <a href="tel:+94701917000" style={{ color: '#fff', textDecoration: 'none' }}>+94 70 191 7000</a>
                  <a href="tel:+94777365212" style={{ color: '#94a3b8', textDecoration: 'none' }}>+94 77 736 5212</a>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#94a3b8' }}>
                <Mail size={14} style={{ color: 'var(--accent-light)', marginTop: '2px' }} />
                <a href="mailto:thegeneclinic@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>thegeneclinic@gmail.com</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8' }}>
                <MapPin size={14} style={{ color: 'var(--accent-light)' }} />
                <span>Galle, Sri Lanka</span>
              </li>
            </ul>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
              <a href="https://wa.me/94701917000" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', padding: '8px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: 700, textDecoration: 'none', width: 'fit-content' }}>
                <MessageCircle size={14} /> WhatsApp
              </a>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to="/request-genetic-test" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--primary)', color: '#fff', padding: '8px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: 700, textDecoration: 'none', width: 'fit-content' }}>
                  <FileText size={14} /> Request Test
                </Link>
                <Link to="/appointments" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--secondary)', color: '#fff', padding: '8px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: 700, textDecoration: 'none', width: 'fit-content' }}>
                  <Calendar size={14} /> Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Medical Disclaimer */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px 16px', marginBottom: '24px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <Info size={14} style={{ color: 'var(--accent-light)', marginTop: '2px', flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', lineHeight: 1.4 }}>
            <strong style={{ color: '#fff' }}>Medical Disclaimer:</strong> Website content is for educational and service guidance only and does not replace consultation with a qualified healthcare professional.
          </p>
        </div>

        {/* Divider */}
        <hr style={{ border: 0, height: '1px', backgroundColor: 'rgba(255,255,255,0.08)', margin: '0 0 16px' }} />

        {/* Footer Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
            &copy; {currentYear} The Gene Clinic. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link to="/privacy-policy" style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</Link>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
            <Link to="/terms-conditions" style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'none' }}>Terms & Conditions</Link>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
            <Link to="/admin-login" style={{ fontSize: '12px', color: 'var(--accent-light)', textDecoration: 'none', fontWeight: 600 }}>Admin Login</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
