import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClinicLocationsMap from "../../components/ClinicLocationsMap";
import { API_BASE_URL } from '../../config';
import { 
  ShieldCheck, Dna, FileText, Heart, Microscope, Video, 
  MapPin, Activity, HeartHandshake, GraduationCap, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function Home() {
  const [openAboutCard, setOpenAboutCard] = useState(null);

  return (
    <div className="home-page animate-fade-in" style={{ backgroundColor: '#fafbfc' }}>
      {/* Hero Section */}
      <section className="section hero-section" style={{ padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center' }}>
            
            {/* Hero Left Content */}
            <div className="hero-content" style={{ textAlign: 'left', paddingRight: '40px' }}>
              <span className="badge mb-4" style={{ backgroundColor: '#e0f4f5', color: 'var(--accent)', fontWeight: 700, padding: '6px 16px', borderRadius: '50px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                🧬 Clinical Genetics & Counselling
              </span>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', lineHeight: '1.1', marginBottom: '24px', fontWeight: 600, color: 'var(--primary)' }}>
                Expert genetic<br/>care, <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>decoded</span><br/>for you.
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.65', marginBottom: '32px', maxWidth: '480px' }}>
                Dr. Lahiru Prabodha provides specialist clinical genetics consultations—from genetic testing interpretation to individualized risk management and preventive health.
              </p>
              <div className="hero-actions" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <a href="#book-consultation" className="btn" style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '14px 32px', borderRadius: '50px', fontWeight: 600, border: 'none', boxShadow: '0 4px 14px rgba(10,142,151,0.3)' }}>
                  Book a Consultation
                </a>
              </div>
            </div>

            {/* Hero Right: Doctor Card */}
            <div className="hero-visual" style={{ position: 'relative' }}>
              <div className="card" style={{ padding: '32px', background: '#ffffff', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(26,44,66,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '24px', marginBottom: '24px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.5rem' }}>
                    LP
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700, color: 'var(--primary)' }}>Dr. Lahiru Prabodha</h3>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block', margin: '2px 0 8px' }}>Clinical Geneticist & Counsellor</span>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', background: '#f1f5f9', color: 'var(--primary)', borderRadius: '50px' }}>MBBS</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', background: '#f1f5f9', color: 'var(--primary)', borderRadius: '50px' }}>MPhil (Human Gen)</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', background: '#e0f4f5', color: 'var(--accent)', borderRadius: '50px' }}>PhD</span>
                    </div>
                  </div>
                </div>

                <div className="credentials-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="credential-box" style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px' }}>
                    <span className="credential-tag" style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Clinical Practice</span>
                    <span className="credential-text" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)', marginTop: '4px' }}>Clinical Genetics & Counselling</span>
                  </div>
                  <div className="credential-box" style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px' }}>
                    <span className="credential-tag" style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Academics</span>
                    <span className="credential-text" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)', marginTop: '4px' }}>Senior Lecturer, Ruhuna Uni</span>
                  </div>
                  <div className="credential-box" style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px' }}>
                    <span className="credential-tag" style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Expertise</span>
                    <span className="credential-text" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)', marginTop: '4px' }}>Specialist: Prenatal & Cancer</span>
                  </div>
                  <div className="credential-box" style={{ background: '#e0f4f5', padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span className="credential-text" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent)' }}>
                      <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></span>
                      Accepting New Patients
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Colombo, Galle, Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', background: '#ffffff', padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ flex: '1', minWidth: '150px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 600, color: 'var(--accent)' }}>2000+</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '8px' }}>Patients Counselled</div>
            </div>
            <div style={{ width: '1px', height: '60px', background: 'var(--border-color)' }} className="hide-mobile"></div>
            <div style={{ flex: '1', minWidth: '150px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 600, color: 'var(--accent)' }}>120+</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '8px' }}>Conditions Covered</div>
            </div>
            <div style={{ width: '1px', height: '60px', background: 'var(--border-color)' }} className="hide-mobile"></div>
            <div style={{ flex: '1', minWidth: '150px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 600, color: 'var(--accent)' }}>98%</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '8px' }}>Diagnostic Accuracy</div>
            </div>
            <div style={{ width: '1px', height: '60px', background: 'var(--border-color)' }} className="hide-mobile"></div>
            <div style={{ flex: '1', minWidth: '150px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 600, color: 'var(--accent)' }}>13 YRS</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '8px' }}>Clinical Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" style={{ padding: '80px 0', background: '#fafbfc' }}>
        <div className="container">
          <div className="mb-12">
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>What We Offer</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 600, color: 'var(--primary)', marginTop: '8px', maxWidth: '500px', lineHeight: '1.2' }}>
              Comprehensive genetic services under one roof
            </h2>
            <p style={{ marginTop: '16px', fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: '1.6' }}>
              Every consultation is personally led by Dr. Prabodha, ensuring clinical accuracy and compassionate guidance at every step.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: '24px' }}>
            {/* Card 1 */}
            <div className="card" style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid var(--border-color)', transition: 'all 0.3s ease', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#e0f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '24px' }}>📄</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>Genetic Report<br/>Interpretation</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                We translate complex clinical reports into plain language and guide your next clinical steps with clarity and care.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card" style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid var(--border-color)', transition: 'all 0.3s ease', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#e0f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '24px' }}>👨‍👩‍👧</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>Family Risk Assessment</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                Understand hereditary patterns of adult onset cancers and conditions. We reconstruct and analyse family pedigrees.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card" style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid var(--border-color)', transition: 'all 0.3s ease', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#e0f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '24px' }}>🧬</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>Reproductive Genetics</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                Pre-conception screening, carrier screening, and prenatal testing guidance to support a healthy pregnancy.
              </p>
            </div>

            {/* Card 4 */}
            <div className="card" style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid var(--border-color)', transition: 'all 0.3s ease', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#e0f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '24px' }}>🔬</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>Genetic Testing Guidance</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                Expert recommendations for selecting the most appropriate testing panel without unnecessary costs.
              </p>
            </div>

            {/* Card 5 */}
            <div className="card" style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid var(--border-color)', transition: 'all 0.3s ease', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#e0f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '24px' }}>🛡️</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>Inherited Condition Management</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                Long-term surveillance plans, prevention strategies, and specialist coordination for ongoing health monitoring.
              </p>
            </div>

            {/* Card 6 */}
            <div className="card" style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid var(--border-color)', transition: 'all 0.3s ease', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#e0f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '24px' }}>💻</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>Online Consultations</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                Secure video sessions for follow up consultations and report interpretation from the comfort of your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About The Gene Clinic Section */}
      <section className="section bg-white" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 600, color: 'var(--primary)' }}>About The Gene Clinic</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '16px auto 0' }}>
              Learn about our clinic, clinical genetics services, and the specialist leading your care.
            </p>
          </div>
          <div className="grid grid-2" style={{ gap: '32px' }}>
            {/* Card 1: Doctor */}
            <div className="card" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(2, 132, 199, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={24} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>Dr. L. B. Lahiru Prabodha</h3>
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.6' }}>
                Clinical Geneticist and Genetic Counsellor with experience in clinical genetics, genomic medicine, NIPT, and genetic report interpretation.
              </p>
              
              {openAboutCard === 'doctor' && (
                <div className="animate-fade-in" style={{ padding: '20px 0 16px', borderTop: '1px solid var(--border-color)', marginTop: '8px' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><CheckCircle2 size={18} className="text-accent mt-1" style={{ flexShrink: 0 }} /> <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Clinical Geneticist and Genetic Counsellor</span></li>
                    <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><CheckCircle2 size={18} className="text-accent mt-1" style={{ flexShrink: 0 }} /> <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Supports genetic counselling, report interpretation, wellness genomics, NIPT, and clinical genetics guidance</span></li>
                    <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><CheckCircle2 size={18} className="text-accent mt-1" style={{ flexShrink: 0 }} /> <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Provides professional guidance for patients and families</span></li>
                  </ul>
                  <Link to="/about" className="btn btn-secondary btn-sm" style={{ padding: '10px 20px' }}>View Doctor Profile</Link>
                </div>
              )}
              
              <button 
                onClick={() => setOpenAboutCard(openAboutCard === 'doctor' ? null : 'doctor')}
                aria-expanded={openAboutCard === 'doctor'}
                style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', padding: 0, marginTop: openAboutCard === 'doctor' ? '16px' : '8px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {openAboutCard === 'doctor' ? 'Show Less' : 'Read More'}
              </button>
            </div>

            {/* Card 2: Clinic */}
            <div className="card" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(2, 132, 199, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Dna size={24} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>The Gene Clinic</h3>
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.6' }}>
                The Gene Clinic by GenSek Health Private Limited provides genetic counselling, wellness counselling, NIPT, precision medicine, and personalized management support.
              </p>
              
              {openAboutCard === 'clinic' && (
                <div className="animate-fade-in" style={{ padding: '20px 0 16px', borderTop: '1px solid var(--border-color)', marginTop: '8px' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><CheckCircle2 size={18} className="text-accent mt-1" style={{ flexShrink: 0 }} /> <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}><strong>Brand:</strong> The Gene Clinic</span></li>
                    <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><CheckCircle2 size={18} className="text-accent mt-1" style={{ flexShrink: 0 }} /> <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}><strong>Company:</strong> GenSek Health Private Limited</span></li>
                    <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><CheckCircle2 size={18} className="text-accent mt-1" style={{ flexShrink: 0 }} /> <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}><strong>Services:</strong> Genetic Counselling, Wellness Counselling, NIPT, Precision Medicine, Personalized Management, Report Interpretation</span></li>
                    <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><CheckCircle2 size={18} className="text-accent mt-1" style={{ flexShrink: 0 }} /> <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}><strong>Focus:</strong> Wellness, Nutrition, Cancer Prevention Awareness, NCD Prevention Awareness, and Online Video Consultation</span></li>
                  </ul>
                  <Link to="/clinic" className="btn btn-secondary btn-sm" style={{ padding: '10px 20px' }}>Explore The Clinic</Link>
                </div>
              )}
              
              <button 
                onClick={() => setOpenAboutCard(openAboutCard === 'clinic' ? null : 'clinic')}
                aria-expanded={openAboutCard === 'clinic'}
                style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', padding: 0, marginTop: openAboutCard === 'clinic' ? '16px' : '8px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {openAboutCard === 'clinic' ? 'Show Less' : 'Read More'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="section" style={{ padding: '80px 0', background: '#fafbfc' }}>
        <div className="container">
          <div className="mb-12">
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Where to find us</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 600, color: 'var(--primary)', marginTop: '8px' }}>Clinics in Colombo & Galle</h2>
            <p style={{ marginTop: '16px', fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: '1.6' }}>
              Consultations are offered across key medical centres to ensure accessible care for patients across Sri Lanka.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {/* Colombo Clinic */}
            <div className="card" style={{ background: '#ffffff', borderRadius: '24px', padding: '40px', border: '1px solid var(--border-color)', display: 'flex', gap: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                <MapPin size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>Colombo Clinic</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                  Weekly appointments at Ninewells Hospital & Durdans Hospital. Convenient for patients seeking post-test clinical planning.
                </p>
                <a href="#" className="btn btn-sm" style={{ background: '#e0f4f5', color: 'var(--accent)', padding: '8px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', textDecoration: 'none' }}>
                  View Locations / Booking
                </a>
              </div>
            </div>

            {/* Galle Clinic */}
            <div className="card" style={{ background: '#ffffff', borderRadius: '24px', padding: '40px', border: '1px solid var(--border-color)', display: 'flex', gap: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                <MapPin size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>Galle Clinic</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                  Consultations at Asiri Hospital Galle & Matara. Dedicated to providing genetics services to the Southern Province.
                </p>
                <a href="#" className="btn btn-sm" style={{ background: '#e0f4f5', color: 'var(--accent)', padding: '8px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', textDecoration: 'none' }}>
                  View Locations / Booking
                </a>
              </div>
            </div>
          </div>
          
          <ClinicLocationsMap />
        </div>
      </section>


    </div>
  );
}
