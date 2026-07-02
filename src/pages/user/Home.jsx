import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import { 
  ShieldCheck, Dna, FileText, Heart, Microscope, Video, 
  MapPin, Activity, HeartHandshake, GraduationCap, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function Home() {
  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="section hero-section" style={{ padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }}>
            
            {/* Hero Left Content */}
            <div className="hero-content" style={{ textAlign: 'left' }}>
              <span className="badge badge-accent mb-4" style={{ backgroundColor: 'rgba(8, 127, 140, 0.1)', color: 'var(--accent)', fontWeight: 700 }}>
                🧬 Clinical Genetics & Counselling
              </span>
              <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', lineHeight: '1.15', marginBottom: '24px', fontWeight: 800 }}>
                Expert genetic care, <span className="font-decoded">decoded</span> for you.
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.65', marginBottom: '32px' }}>
                Dr. Lahiru Prabodha provides specialist clinical genetics services—from genetic testing interpretation to individualized counseling and preventative condition management across Colombo & Galle.
              </p>
              <div className="hero-actions" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <a href="#book-consultation" className="btn" style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '14px 32px' }}>
                  Book a Consultation
                </a>
                <Link to="/about" className="btn btn-secondary" style={{ padding: '14px 32px' }}>
                  Learn More
                </Link>
              </div>
            </div>

            {/* Hero Right: Doctor Card */}
            <div className="hero-visual" style={{ position: 'relative' }}>
              <div className="card" style={{ padding: '32px 28px', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '20px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem' }}>
                    LP
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 800 }}>Dr. Lahiru Prabodha</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', margin: '2px 0 6px' }}>Clinical Geneticist</span>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '3px 8px', background: 'var(--bg-tertiary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>MBBS</span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '3px 8px', background: 'var(--bg-tertiary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>MPhil (Human Genetics)</span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '3px 8px', background: 'var(--bg-tertiary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>MSc</span>
                    </div>
                  </div>
                </div>

                {/* 4 Credentials Boxes in 2x2 grid */}
                <div className="credentials-grid">
                  <div className="credential-box">
                    <span className="credential-tag">Clinical Practice</span>
                    <span className="credential-text">Clinical Genetics & Counselling</span>
                  </div>
                  <div className="credential-box">
                    <span className="credential-tag">Academics</span>
                    <span className="credential-text">Senior Lecturer, Ruhuna Uni</span>
                  </div>
                  <div className="credential-box">
                    <span className="credential-tag">Lab Leadership</span>
                    <span className="credential-text">Head, Molecular Genetics Lab</span>
                  </div>
                  <div className="credential-box">
                    <span className="credential-tag">Expertise</span>
                    <span className="credential-text">Specialist: Prenatal, Cancer, Wellness</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Items Container below Hero */}
          <div className="trust-items-container">
            <div className="trust-item-new">
              <HeartHandshake size={20} />
              <span>Patient-centric care</span>
            </div>
            <div className="trust-item-new">
              <GraduationCap size={20} />
              <span>Certified & research-led</span>
            </div>
            <div className="trust-item-new">
              <Activity size={20} />
              <span>Expert accuracy</span>
            </div>
            <div className="trust-item-new">
              <ShieldCheck size={20} />
              <span>Privacy guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section section-light" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-2" style={{ backgroundColor: 'rgba(8, 127, 140, 0.1)', color: 'var(--accent)' }}>What We Offer</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Comprehensive genetic services under one roof</h2>
            <p style={{ maxWidth: '640px', margin: '12px auto 0', fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              Every consultation is personally led by Dr. Prabodha, ensuring clinical accuracy and compassionate guidance at every step.
            </p>
          </div>

          <div className="grid grid-3" style={{ marginTop: '48px' }}>
            {/* Card 1 */}
            <div className="card flex-col-card" style={{ borderRadius: '20px', padding: '32px', background: 'var(--bg-secondary)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(8, 127, 140, 0.08)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <FileText size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Genetic Report Interpretation</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                Comprehensive post-test report analysis to help you understand variants, risk factors, and recommended next steps.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card flex-col-card" style={{ borderRadius: '20px', padding: '32px', background: 'var(--bg-secondary)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(8, 127, 140, 0.08)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Heart size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Prenatal Risk Assessment</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                Specialized pre-test and post-test counselling for NIPT, diagnostic testing, and familial inheritance risk planning.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card flex-col-card" style={{ borderRadius: '20px', padding: '32px', background: 'var(--bg-secondary)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(8, 127, 140, 0.08)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Dna size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Organogenetics & Genomics</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                Proactive wellness screening analysis, helping you align lifestyle options with your genetic blueprint.
              </p>
            </div>

            {/* Card 4 */}
            <div className="card flex-col-card" style={{ borderRadius: '20px', padding: '32px', background: 'var(--bg-secondary)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(8, 127, 140, 0.08)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Microscope size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Genetic Testing Guidance</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                Helping select the right genomic panels to avoid unnecessary costs and maximize diagnostic yield.
              </p>
            </div>

            {/* Card 5 */}
            <div className="card flex-col-card" style={{ borderRadius: '20px', padding: '32px', background: 'var(--bg-secondary)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(8, 127, 140, 0.08)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Inherited Conditions Management</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                Long-term monitoring guidelines, prevention pathways, and coordinate care with specialists.
              </p>
            </div>

            {/* Card 6 */}
            <div className="card flex-col-card" style={{ borderRadius: '20px', padding: '32px', background: 'var(--bg-secondary)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(8, 127, 140, 0.08)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Video size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Online Video Resource</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                Remote sessions for international patients and follow-up reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Doctor Section */}
      <section className="section" style={{ padding: '80px 0' }}>
        <div className="container grid grid-2 align-center" style={{ gap: '60px' }}>
          
          {/* Left Graphic */}
          <div className="dna-graphic-container">
            <Dna size={80} className="animate-pulse" style={{ color: 'var(--accent)', opacity: 0.8 }} />
          </div>

          {/* Right Text */}
          <div style={{ textAlign: 'left' }}>
            <span className="badge badge-accent mb-4" style={{ backgroundColor: 'rgba(8, 127, 140, 0.1)', color: 'var(--accent)' }}>About the Doctor</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '20px' }}>Dr. Lahiru Prabodha</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
              Dr. Prabodha is a leading clinical geneticist with over 10 years of experience in genomic medicine, molecular biology research, and genetic counselling across the Western and Southern provinces.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
              He completed his postgraduate training in clinical genetics and genomics and has worked in closely integrated teams at leading hospitals in Colombo and Galle to provide cancer-risk assessments and support families.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent)' }} />
                <span>Member—University of Colombo</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent)' }} />
                <span>MD in Clinical Genetics</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent)' }} />
                <span>Board Certified Specialist</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent)' }} />
                <span>Member, International Society of Neurogenetics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="section section-light" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-2" style={{ backgroundColor: 'rgba(8, 127, 140, 0.1)', color: 'var(--accent)' }}>Where to find us</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Our Centres</h2>
            <p style={{ maxWidth: '640px', margin: '12px auto 0', fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              Three convenient branch locations across Sri Lanka, with online appointments available for patients nationwide and internationally.
            </p>
          </div>

          <div className="grid grid-3" style={{ marginTop: '48px', gap: '32px' }}>
            {/* Colombo Clinic */}
            <div className="card" style={{ padding: '32px', background: 'var(--bg-secondary)', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(8, 127, 140, 0.08)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <MapPin size={22} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '12px' }}>Colombo Clinic</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px', flexGrow: 1 }}>
                Consultations at our partner hospital in Colombo—convenient for patients seeking post-test clinical planning.
              </p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 700, textDecoration: 'underline' }}>
                View Location / Directions
              </a>
            </div>

            {/* Galle Clinic */}
            <div className="card" style={{ padding: '32px', background: 'var(--bg-secondary)', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(8, 127, 140, 0.08)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <MapPin size={22} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '12px' }}>Galle Clinic</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px', flexGrow: 1 }}>
                Dr. Prabodha conducts consultations at our Galle clinic, serving patients in the Southern Province with testing guidance.
              </p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 700, textDecoration: 'underline' }}>
                View Location / Directions
              </a>
            </div>

            {/* Matara Clinic */}
            <div className="card" style={{ padding: '32px', background: 'var(--bg-secondary)', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(8, 127, 140, 0.08)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <MapPin size={22} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '12px' }}>Matara Clinic</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px', flexGrow: 1 }}>
                Specialist clinical genetics consultations and local patient intake/coordination services for Matara and surrounding areas.
              </p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 700, textDecoration: 'underline' }}>
                View Location / Directions
              </a>
            </div>
          </div>

          {/* Map Embed Card */}
          <div className="card mt-8" style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d1016832.2223846666!2d80.2000000!3d6.4000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sColombo%2C%20Galle%2C%20Matara%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1719659000000!5m2!1sen!2slk"
              width="100%"
              height="380"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Colombo, Galle & Matara Clinic Branches Map"
            ></iframe>
          </div>

          {/* Collaborative Network & Channelling Section */}
          <div className="text-center" style={{ marginTop: '64px', marginBottom: '32px' }}>
            <span className="badge badge-accent mb-2" style={{ backgroundColor: 'rgba(8, 127, 140, 0.1)', color: 'var(--accent)' }}>Hospital Consultations</span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Channelling Partner Hospitals</h3>
            <p style={{ maxWidth: '640px', margin: '8px auto 0', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              Directly book/channel a consultation session with Dr. L.B. Lahiru Prabodha at these leading medical centers.
            </p>
          </div>

          <div className="grid grid-4" style={{ gap: '24px' }}>
            {/* Ninewells Hospital */}
            <div className="card" style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>Ninewells Hospital</h4>
                <p className="xsmall-text text-muted" style={{ margin: '0 0 16px', lineHeight: '1.4' }}>
                  Clinical Geneticist & Genetic Counselor
                </p>
              </div>
              <a 
                href="https://www.doc.lk/channel/5915?doctor=L.B.+LAHIRU+PROBODHA&hospital=0&specialization=0&date=" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-sm" 
                style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.8rem', padding: '10px 14px', width: '100%', textDecoration: 'none', fontWeight: 700 }}
              >
                Channel Now
              </a>
            </div>

            {/* Asiri Hospital Galle */}
            <div className="card" style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>Asiri Hospital - Galle</h4>
                <p className="xsmall-text text-muted" style={{ margin: '0 0 16px', lineHeight: '1.4' }}>
                  Clinical Geneticist & Genetic Counselor
                </p>
              </div>
              <a 
                href="https://www.doc.lk/channel/8822?doctor=L.B.+LAHIRU+PROBODHA&hospital=0&specialization=0&date=" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-sm" 
                style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.8rem', padding: '10px 14px', width: '100%', textDecoration: 'none', fontWeight: 700 }}
              >
                Channel Now
              </a>
            </div>

            {/* Asiri Hospital Matara */}
            <div className="card" style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>Asiri Hospital - Matara</h4>
                <p className="xsmall-text text-muted" style={{ margin: '0 0 16px', lineHeight: '1.4' }}>
                  Clinical Geneticist & Genetic Counselor (Galle Road)
                </p>
              </div>
              <a 
                href="https://www.doc.lk/channel/23622?doctor=L.B.+LAHIRU+PROBODHA&hospital=0&specialization=0&date=" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-sm" 
                style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.8rem', padding: '10px 14px', width: '100%', textDecoration: 'none', fontWeight: 700 }}
              >
                Channel Now
              </a>
            </div>

            {/* Durdans Hospital */}
            <div className="card" style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>Durdans Hospital</h4>
                <p className="xsmall-text text-muted" style={{ margin: '0 0 16px', lineHeight: '1.4' }}>
                  Genetic Counselor (Colombo 03)
                </p>
              </div>
              <a 
                href="https://www.doc.lk/channel/30355?doctor=L.B.+LAHIRU+PROBODHA&hospital=0&specialization=0&date=" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-sm" 
                style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.8rem', padding: '10px 14px', width: '100%', textDecoration: 'none', fontWeight: 700 }}
              >
                Channel Now
              </a>
            </div>
          </div>

          {/* Hotline Assist callout */}
          <div style={{ marginTop: '32px', backgroundColor: 'rgba(2, 132, 199, 0.03)', border: '1px dashed var(--secondary)', borderRadius: '12px', padding: '16px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
            📞 Need channeling assistance? Call <a href="tel:0117990990" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>0117990990</a> for agent support.
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="cta-banner-gradient">
            <h2 style={{ color: 'white', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, margin: 0, lineHeight: 1.25, textAlign: 'left' }}>
              Ready to understand<br />your genetic health?
            </h2>
            <Link to="/appointments" className="btn" style={{ backgroundColor: 'white', color: '#092e3c', padding: '14px 32px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none' }}>
              Book Your Consultation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
