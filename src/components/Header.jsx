import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import logoImg from '../assets/logo.png';
import gensekLogoImg from '../assets/gensek-logo.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* Logos Container */}
        <div className="header-logos-container" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          
          {/* First Logo: The Gene Clinic */}
          <Link to="/" className="header-logo" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
            <img src={logoImg} alt="The Gene Clinic Logo" className="logo-image" style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
            <div className="logo-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="logo-name" style={{ fontSize: '1.6rem', fontWeight: 'bold', fontFamily: 'serif', color: '#002B49', lineHeight: '1.1' }}>The Gene Clinic</span>
              <span className="logo-sub" style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4A7C94', letterSpacing: '0.05em', whiteSpace: 'nowrap', marginTop: '2px' }}>CENTER FOR PERSONALIZED<br/>MEDICINE AND GENOMICS</span>
            </div>
          </Link>

          {/* Divider */}
          <div className="logo-divider" style={{ width: '1px', height: '50px', backgroundColor: '#CBD5E1', margin: '0 5px' }}></div>

          {/* Second Logo: Gensek Health */}
          <Link to="/" className="header-second-logo" onClick={closeMenu} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '2px', lineHeight: '1' }}>A GenSek Health Company</span>
            <img src={gensekLogoImg} alt="Gensek Health Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            <li>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>


            {/* Services Dropdown */}
            <li className="nav-item-dropdown">
              <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>
                Services <ChevronDown size={14} />
              </Link>
              <div className="dropdown-menu" style={{ minWidth: '240px' }}>
                <Link to="/services" className="dropdown-item">Genetic Counselling</Link>
                <Link to="/services" className="dropdown-item">Wellness Counselling</Link>
                <Link to="/services" className="dropdown-item">Precision Medicine</Link>
                <Link to="/services" className="dropdown-item">Personalized Management</Link>
                <Link to="/blueprint" className="dropdown-item">Wellness & Nutrition</Link>
                <Link to="/services" className="dropdown-item">Cancer & NCD Prevention</Link>
                <Link to="/appointments" className="dropdown-item">Online Video Consultation</Link>
              </div>
            </li>


            <li>
              <Link to="/faq" className={`nav-link ${location.pathname === '/faq' ? 'active' : ''}`}>
                FAQ
              </Link>
            </li>

            <li>
              <Link to="/education" className={`nav-link ${location.pathname === '/education' ? 'active' : ''}`}>
                Education
              </Link>
            </li>
            <li>
              <Link to="/articles" className={`nav-link ${location.pathname === '/articles' ? 'active' : ''}`}>
                Articles
              </Link>
            </li>

            {/* More Dropdown */}
            <li className="nav-item-dropdown">
              <span className={`nav-link ${['/patient-registration', '/partner-laboratories', '/reviews', '/contact'].includes(location.pathname) ? 'active' : ''}`} style={{ cursor: 'default' }}>
                More <ChevronDown size={14} />
              </span>
              <div className="dropdown-menu" style={{ minWidth: '220px' }}>
                <Link to="/patient-registration" className="dropdown-item">Patient Registration</Link>
                <Link to="/partner-laboratories" className="dropdown-item">Partner Laboratories</Link>
                <Link to="/reviews" className="dropdown-item">Customer Reviews</Link>
                <Link to="/contact" className="dropdown-item">Contact / Location</Link>
              </div>
            </li>
          </ul>
        </nav>

        {/* Desktop Header Actions */}
        <div className="header-actions">
          <div className="hide-tablet" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/request-genetic-test" className="btn btn-secondary btn-sm" style={{ padding: '8px 16px', fontWeight: 600 }}>
              Request Test
            </Link>
            <Link to="/appointments" className="btn btn-primary btn-sm">
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (with Grouped Items) */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`} style={{ maxHeight: 'calc(100vh - 70px)', overflowY: 'auto' }}>
        <nav className="mobile-nav" style={{ paddingBottom: '40px' }}>
          <ul>
            <li>
              <Link to="/" onClick={closeMenu} className="mobile-nav-link">
                Home
              </Link>
            </li>


            <li className="mobile-nav-group-title"><Link to="/services" onClick={closeMenu} style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link></li>
            <li><Link to="/services" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Genetic Counselling</Link></li>
            <li><Link to="/services" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Wellness Counselling</Link></li>
            <li><Link to="/services" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Precision Medicine</Link></li>
            <li><Link to="/services" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Personalized Management</Link></li>
            <li><Link to="/blueprint" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Wellness & Nutrition</Link></li>
            <li><Link to="/services" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Cancer & NCD Prevention</Link></li>
            <li><Link to="/appointments" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Online Video Consultation</Link></li>
            <li><Link to="/request-genetic-test" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Request Genetic Test</Link></li>

            <li className="mobile-nav-group-title">Resources & Support</li>
            <li><Link to="/faq" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>FAQ / Q & A</Link></li>
            <li><Link to="/education" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Education</Link></li>
            <li><Link to="/articles" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Articles</Link></li>

            <li className="mobile-nav-group-title">More</li>
            <li><Link to="/patient-registration" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Patient Registration</Link></li>
            <li><Link to="/partner-laboratories" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Partner Laboratories</Link></li>
            <li><Link to="/reviews" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Customer Reviews</Link></li>
            <li><Link to="/contact" onClick={closeMenu} className="mobile-nav-link pl-4" style={{ fontSize: '0.9rem' }}>Contact / Location</Link></li>

            <li className="mobile-nav-group-title">Follow Us</li>
            <li style={{ paddingLeft: '16px', marginTop: '10px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {/* TODO: Replace # with official social media URLs */}
                <a href="https://www.facebook.com/people/The-Gene-Clinic/61567109703049/?rdid=oR2IBlj76KtjvPg9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1KiE6odBpW%2F" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Facebook</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>YouTube</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Instagram</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>TikTok</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>LinkedIn</a>
              </div>
            </li>
            <li className="mobile-drawer-cta" style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link to="/request-genetic-test" onClick={closeMenu} className="btn btn-secondary w-full text-center">
                  Request Genetic Test
                </Link>
                <Link to="/appointments" onClick={closeMenu} className="btn btn-primary w-full text-center">
                  Book Appointment
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
