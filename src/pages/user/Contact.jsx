import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';
import ClinicLocationsMap from "../../components/ClinicLocationsMap";

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const subjects = [
    'General Inquiry',
    'Appointment Booking Assistance',
    'Genetic Test Panel Eligibility',
    'Report Interpretation Consultation',
    'Laboratory & Partner Support',
    'Feedback & Other Issues'
  ];

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Full Name is required';
    if (!email.trim()) errors.email = 'Email Address is required';
    if (!phone.trim()) errors.phone = 'Phone Number is required';
    if (!message.trim()) errors.message = 'Message content is required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      setError('Please correct the highlighted fields before submitting.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
          userId: user?.uid || '',
          userName: user?.displayName || '',
          userEmail: user?.email || '',
          userPhoto: user?.photoURL || '',
          authProvider: 'google',
          submittedBySignedInUser: !!user
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setSubject('General Inquiry');
        setMessage('');
        setValidationErrors({});
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to submit contact message.');
      }
    } catch (err) {
      setError('Connection error: could not connect to backend server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page animate-fade-in" style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '60px 0' }}>
      
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '40px' }}>
          <span style={{ display: 'inline-block', backgroundColor: '#e0f2fe', color: '#0284c7', padding: '6px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            <span style={{ color: '#0284c7', marginRight: '6px' }}>●</span> CONTACT US
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 400, margin: '0 0 16px', letterSpacing: '-0.02em', color: '#0f172a' }}>
            Get in <span style={{ fontStyle: 'italic', color: '#0284c7' }}>touch</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0, maxWidth: '500px', lineHeight: '1.6' }}>
            Have a question before booking? Send us a message and we'll respond within one business day.
          </p>
        </div>

        {/* Split Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'start' }}>
          
          {/* Left: Form */}
          <div className="card" style={{ padding: '40px', position: 'relative', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', backgroundColor: '#0d9488', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}></div>
            
            {success ? (
              <div className="text-center py-12">
                <div className="flex-row-center text-accent mb-6" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(13, 148, 136, 0.08)', margin: '0 auto', display: 'flex' }}>
                  <CheckCircle2 size={36} color="#0d9488" />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 12px' }}>Message Sent Successfully</h2>
                <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto 24px', lineHeight: '1.6' }}>
                  Your inquiry has been received. Our clinical coordinator will contact you shortly.
                </p>
                <button onClick={() => setSuccess(false)} className="btn btn-primary" style={{ padding: '12px 28px', backgroundColor: '#0284c7', border: 'none', borderRadius: '50px' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-col" style={{ gap: '24px', display: 'flex', flexDirection: 'column' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, margin: '0 0 6px', color: '#1e293b' }}>Send a Message</h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>We respond to all enquiries within one business day.</p>
                </div>

                {error && (
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '16px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', borderRadius: '12px' }}>
                    <AlertCircle size={18} />
                    <span style={{ fontSize: '0.85rem' }}>{error}</span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your full name"
                      style={{ width: '100%', height: '48px', border: `1px solid ${validationErrors.name ? '#dc2626' : '#e2e8f0'}`, borderRadius: '12px', padding: '8px 16px', background: '#f8fafc', outline: 'none', transition: 'border-color 0.2s' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{ width: '100%', height: '48px', border: `1px solid ${validationErrors.email ? '#dc2626' : '#e2e8f0'}`, borderRadius: '12px', padding: '8px 16px', background: '#f8fafc', outline: 'none', transition: 'border-color 0.2s' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Phone Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+94 77 000 0000"
                      style={{ width: '100%', height: '48px', border: `1px solid ${validationErrors.phone ? '#dc2626' : '#e2e8f0'}`, borderRadius: '12px', padding: '8px 16px', background: '#f8fafc', outline: 'none', transition: 'border-color 0.2s' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Subject</label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      style={{ width: '100%', height: '48px', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '8px 16px', background: '#f8fafc', outline: 'none', appearance: 'none' }}
                    >
                      {subjects.map((sub, idx) => (
                        <option key={idx} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Message *</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us how we can help you..."
                    style={{ width: '100%', minHeight: '140px', border: `1px solid ${validationErrors.message ? '#dc2626' : '#e2e8f0'}`, borderRadius: '12px', padding: '16px', background: '#f8fafc', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                  ></textarea>
                </div>

                <div style={{ marginTop: '8px' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ height: '48px', padding: '0 24px', backgroundColor: '#0284c7', border: 'none', borderRadius: '50px', fontWeight: 600 }}
                  >
                    {loading ? 'Sending...' : 'Send Message →'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Contact Cards & Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <a href="https://wa.me/94770000000" target="_blank" rel="noopener noreferrer" className="card hover-scale" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', textDecoration: 'none', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 4px 20px -10px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', flexShrink: 0 }}>
                <MessageCircle size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 700, marginBottom: '2px' }}>WhatsApp</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Chat with us directly</div>
              </div>
            </a>

            <a href="tel:+94770000000" className="card hover-scale" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', textDecoration: 'none', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 4px 20px -10px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777', flexShrink: 0 }}>
                <Phone size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 700, marginBottom: '2px' }}>+94 77 000 0000</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Mon–Fri, 8am–6pm</div>
              </div>
            </a>

            <a href="mailto:info@thegeneclinic.lk" className="card hover-scale" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', textDecoration: 'none', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 4px 20px -10px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', flexShrink: 0 }}>
                <Mail size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 700, marginBottom: '2px' }}>info@thegeneclinic.lk</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>We reply within 24 hours</div>
              </div>
            </a>

            <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '24px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 4px 20px -10px rgba(0,0,0,0.03)', marginTop: '8px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777', flexShrink: 0 }}>
                <MapPin size={18} />
              </div>
              <div>
                <div style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 700, marginBottom: '6px' }}>Colombo Clinic</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>Partner hospital, Colombo 5</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Mon, Wed, Fri — Morning sessions</div>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '24px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 4px 20px -10px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777', flexShrink: 0 }}>
                <MapPin size={18} />
              </div>
              <div>
                <div style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 700, marginBottom: '6px' }}>Galle Clinic</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>Southern Province clinic, Galle</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Tue, Thu — Afternoon sessions</div>
              </div>
            </div>

            <ClinicLocationsMap />

          </div>
        </div>

      </div>
    </div>
  );
}
