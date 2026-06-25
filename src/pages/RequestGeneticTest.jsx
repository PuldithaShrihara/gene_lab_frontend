import React, { useState } from 'react';
import { ClipboardList, CheckCircle2, AlertCircle, Phone, MessageSquare, Shield, HelpCircle, Upload, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function RequestGeneticTest() {
  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    email: "",
    age: "",
    testCategory: "",
    reasonForTesting: "",
    referralDetails: "",
    preferredContactMethod: "",
    reportFile: null,
    consent: false
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const testCategories = [
    'Wellness Genomics',
    'Me360 Wellness Blueprint',
    'NIPT / Prenatal Screening',
    'Clinical Genetic Test',
    'Cancer Genetics',
    'Whole Exome Sequencing',
    'Whole Genome Sequencing',
    'Genetic Report Interpretation',
    'Other'
  ];

  const contactMethods = [
    'Phone Call',
    'WhatsApp',
    'Email',
    'To be confirmed'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files?.[0] || null
    }));
  };

  const validateForm = () => {
    if (!formData.patientName.trim()) return false;
    if (!formData.phone.trim()) return false;
    if (!formData.email.trim()) return false;
    if (!formData.testCategory) return false;
    if (!formData.reasonForTesting.trim()) return false;
    if (!formData.preferredContactMethod) return false;
    if (!formData.consent) return false;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return false;
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setError('Please complete all required fields before submitting.');
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.patientName,
      patientName: formData.patientName,
      phone: formData.phone,
      email: formData.email,
      age: formData.age,
      testCategory: formData.testCategory,
      reasonForTesting: formData.reasonForTesting,
      referralDetails: formData.referralDetails,
      preferredContactMethod: formData.preferredContactMethod,
      reportFileName: formData.reportFile?.name || "",
      consent: formData.consent,
      status: "New",
      source: "Website Request Genetic Test Page"
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/genetic-test-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Failed to submit genetic test request.");
      }

      setSuccess("Your genetic test request has been submitted successfully. Our team will contact you to guide the next steps.");
      setFormData({
        patientName: "",
        phone: "",
        email: "",
        age: "",
        testCategory: "",
        reasonForTesting: "",
        referralDetails: "",
        preferredContactMethod: "",
        reportFile: null,
        consent: false
      });
    } catch (error) {
      console.error("Genetic test request submit error:", error);

      if (error instanceof TypeError) {
        setError("Connection error: could not connect to backend server. Please make sure the backend is running and the API URL is correct.");
      } else {
        setError(error.message || "Something went wrong while submitting your request.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Drag and drop uploader sub-component helper
  const FileUploader = ({ label, helper, file, onFileSelect, themeColor = 'var(--secondary)' }) => {
    const [dragActive, setDragActive] = useState(false);
    const id = label.replace(/\s+/g, '-').toLowerCase();

    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        onFileSelect(e.dataTransfer.files[0]);
      }
    };

    return (
      <div className="form-group flex-col" style={{ gap: '6px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{label}</label>
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById(`file-input-${id}`).click()}
          style={{
            border: '2px dashed ' + (dragActive ? themeColor : 'var(--border-color)'),
            borderRadius: '14px',
            padding: '28px 16px',
            textAlign: 'center',
            background: dragActive ? 'rgba(2, 132, 199, 0.05)' : 'var(--bg-secondary)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            position: 'relative'
          }}
        >
          <Upload size={28} style={{ color: themeColor, margin: '0 auto 12px' }} />
          <p className="xsmall-text text-main" style={{ margin: '0 0 6px', fontWeight: 600, fontSize: '0.95rem' }}>
            {file ? file.name : 'Click to upload or drag file here'}
          </p>
          <span className="xsmall-text text-muted" style={{ fontSize: '0.85rem' }}>{helper}</span>
          <input 
            id={`file-input-${id}`}
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files[0] && onFileSelect(e.target.files[0])}
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="request-test-page animate-fade-in" style={{ position: 'relative' }}>
      <div className="bg-wave-lines"></div>

      {/* CSS style overrides for page alignments */}
      <style>{`
        .premium-input {
          width: 100%;
          height: 52px;
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 14px 16px;
          font-size: 15px;
          color: var(--text-main);
          background: var(--bg-secondary);
          outline: none;
          transition: all var(--transition-fast);
        }

        .premium-input:focus {
          border-color: var(--secondary);
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
        }

        .premium-textarea {
          width: 100%;
          min-height: 120px;
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 16px;
          font-size: 15px;
          color: var(--text-main);
          background: var(--bg-secondary);
          outline: none;
          resize: vertical;
          transition: all var(--transition-fast);
        }

        .premium-textarea:focus {
          border-color: var(--secondary);
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
        }

        .form-section-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
        }

        .hero-section {
          padding: 70px 0;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
        }

        .main-grid {
          display: grid;
          grid-template-columns: 65% 35%;
          gap: 32px;
          align-items: start;
        }

        .form-card {
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
          padding: 32px;
          position: relative;
        }

        .form-card-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, var(--secondary), var(--accent));
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
        }

        .support-card {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          padding: 28px;
        }

        .cta-strip {
          background: var(--primary);
          border-radius: 24px;
          padding: 40px;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-top: 60px;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .main-grid {
            grid-template-columns: 1fr;
          }
          .form-card {
            padding: 20px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 40px 0;
          }
          .grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Hero Header */}
      <section className="section bg-secondary border-bottom hero-section">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-grid">
            <div className="flex-col align-start">
              <span className="badge badge-accent mb-4" style={{ textTransform: 'uppercase', fontWeight: 700 }}>Diagnostics Coordination</span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                Request a Genetic Test
              </h1>
              <p className="lead-text" style={{ color: 'var(--text-muted)', lineHeight: '1.7', margin: 0, fontSize: '1.1rem' }}>
                Submit a request for genetic wellness blueprinting, NIPT screening, clinical panels, or exome sequencing. Our clinical team will coordinate sample logistics, laboratory partnerships, and professional pre-test counselling.
              </p>
            </div>
            
            <div className="support-card" style={{ padding: '32px' }}>
              <div className="flex-row align-center gap-3 mb-4">
                <div style={{ background: 'rgba(2, 132, 199, 0.1)', padding: '12px', borderRadius: '50%' }}>
                  <Shield size={28} className="text-secondary" />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>Responsible Testing</h3>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.7', margin: 0, fontSize: '0.95rem' }}>
                We coordinate test processing with accredited national and international partner laboratories. All clinical test requests require professional interpretation and guidance to support your medical decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form Area */}
      <section className="section section-light" style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="main-grid">
            
            {/* Left Column: Form */}
            <div className="form-card">
              <div className="form-card-accent"></div>
              
              {success ? (
                <div className="text-center py-12 flex-col align-center">
                  <div className="flex-row-center text-accent mb-6" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)' }}>
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>Test Request Received</h2>
                  <p role="alert" className="success-message small-text text-muted" style={{ maxWidth: '480px', margin: '0 auto 32px', lineHeight: '1.7', color: 'var(--accent)', fontSize: '1.05rem' }}>
                    {success}
                  </p>
                  <button onClick={() => setSuccess('')} className="btn btn-primary" style={{ padding: '14px 36px', borderRadius: '16px', fontWeight: 700 }}>
                    Request Another Test
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-col gap-8" style={{ position: 'relative', zIndex: 2 }}>
                  <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 8px', color: 'var(--text-main)' }}>Request Details</h2>
                    <p className="small-text text-muted" style={{ fontSize: '1rem' }}>Provide patient details and specify which genetic test category you wish to request.</p>
                  </div>

                  {error && (
                    <div role="alert" className="error-message form-alert error-alert" style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '16px 20px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', borderRadius: '14px' }}>
                      <AlertCircle size={20} />
                      <span className="small-text" style={{ fontWeight: 500 }}>{error}</span>
                    </div>
                  )}

                  {/* Section 1: Patient Details */}
                  <div className="flex-col gap-5">
                    <div className="form-section-title">
                      1. Patient Information
                    </div>
                    
                    <div className="grid grid-2" style={{ gap: '20px' }}>
                      <div className="form-group flex-col" style={{ gap: '8px' }}>
                        <label htmlFor="patientName" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Patient Full Name *</label>
                        <input
                          type="text"
                          id="patientName"
                          name="patientName"
                          className="premium-input"
                          value={formData.patientName}
                          onChange={handleChange}
                          placeholder="e.g. Dilhan Perera"
                        />
                      </div>

                      <div className="form-group flex-col" style={{ gap: '8px' }}>
                        <label htmlFor="phone" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Phone Number *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="premium-input"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +94 77 123 4567"
                        />
                      </div>
                    </div>

                    <div className="grid grid-2" style={{ gap: '20px' }}>
                      <div className="form-group flex-col" style={{ gap: '8px' }}>
                        <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="premium-input"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. dilhan.perera@example.com"
                        />
                      </div>

                      <div className="form-group flex-col" style={{ gap: '8px' }}>
                        <label htmlFor="age" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Age</label>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          className="premium-input"
                          value={formData.age}
                          onChange={handleChange}
                          placeholder="e.g. 34"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Test Specifics */}
                  <div className="flex-col gap-5">
                    <div className="form-section-title">
                      2. Testing Details
                    </div>

                    <div className="grid grid-2" style={{ gap: '20px' }}>
                      <div className="form-group flex-col" style={{ gap: '8px' }}>
                        <label htmlFor="testCategory" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Test Category *</label>
                        <select
                          id="testCategory"
                          name="testCategory"
                          className="premium-input"
                          value={formData.testCategory}
                          onChange={handleChange}
                        >
                          <option value="">Select test category</option>
                          {testCategories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group flex-col" style={{ gap: '8px' }}>
                        <label htmlFor="preferredContactMethod" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Preferred Contact Method *</label>
                        <select
                          id="preferredContactMethod"
                          name="preferredContactMethod"
                          className="premium-input"
                          value={formData.preferredContactMethod}
                          onChange={handleChange}
                        >
                          <option value="">Select contact method</option>
                          {contactMethods.map((method, idx) => (
                            <option key={idx} value={method}>{method}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group flex-col" style={{ gap: '8px' }}>
                      <label htmlFor="reasonForTesting" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Reason for Testing *</label>
                      <textarea
                        id="reasonForTesting"
                        name="reasonForTesting"
                        className="premium-textarea"
                        value={formData.reasonForTesting}
                        onChange={handleChange}
                        placeholder="Please describe family history, specific symptoms, or screening goals..."
                      ></textarea>
                    </div>

                    <div className="form-group flex-col" style={{ gap: '8px' }}>
                      <label htmlFor="referralDetails" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Referring Doctor / Hospital Details (Optional)</label>
                      <input
                        type="text"
                        id="referralDetails"
                        name="referralDetails"
                        className="premium-input"
                        value={formData.referralDetails}
                        onChange={handleChange}
                        placeholder="e.g. Dr. K. Silva (Colombo General Hospital)"
                      />
                    </div>
                    
                    <FileUploader 
                      label="Upload Report / Prescription (Optional)"
                      helper="PDF, JPG, PNG accepted"
                      file={formData.reportFile}
                      onFileSelect={(file) => setFormData(prev => ({ ...prev, reportFile: file }))}
                      themeColor="var(--secondary)"
                    />
                  </div>

                  {/* Consent & Submit */}
                  <div style={{ paddingTop: '8px' }}>
                    <div className="flex-col align-start" style={{ padding: '20px 24px', background: 'rgba(2, 132, 199, 0.04)', borderRadius: '16px', marginBottom: '24px', gap: '10px' }}>
                      <div className="flex-row align-start gap-3" style={{ display: 'flex' }}>
                        <input
                          type="checkbox"
                          id="consent"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          style={{ marginTop: '5px', width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--secondary)' }}
                        />
                        <label htmlFor="consent" className="small-text" style={{ cursor: 'pointer', lineHeight: '1.6', color: 'var(--text-main)' }}>
                          I understand that genetic testing is a clinical diagnostic screening procedure. I request coordination support from The Gene Clinic and consent to storing this request record under strict clinical privacy guidelines. *
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{ 
                        height: '56px', 
                        width: '100%', 
                        background: 'linear-gradient(135deg, var(--secondary), #0284c7)', 
                        color: 'white', 
                        borderRadius: '16px', 
                        fontSize: '1.1rem', 
                        fontWeight: 700, 
                        border: 'none', 
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
                      }}
                      onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                      onMouseOut={(e) => !loading && (e.currentTarget.style.transform = 'none')}
                    >
                      {loading ? 'Submitting...' : 'Submit Genetic Test Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Support Cards */}
            <div className="flex-col gap-6" style={{ position: 'sticky', top: '100px' }}>
              <div className="support-card">
                <div className="flex-row align-center gap-3 mb-4">
                  <div style={{ background: 'rgba(15, 118, 110, 0.1)', padding: '10px', borderRadius: '50%' }}>
                    <ClipboardList size={24} className="text-accent" />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 800, color: 'var(--text-main)' }}>Testing Guidelines</h3>
                </div>
                <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '0.95rem' }}>
                  A genetic test request is evaluated for appropriateness before samples are collected.
                </p>
                <ul className="flex-col gap-3" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={16} className="text-secondary" style={{ marginTop: '4px', flexShrink: 0 }} />
                    <span className="xsmall-text text-muted" style={{ lineHeight: '1.5', fontSize: '0.9rem' }}>Pre-test genetic counselling is recommended.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={16} className="text-secondary" style={{ marginTop: '4px', flexShrink: 0 }} />
                    <span className="xsmall-text text-muted" style={{ lineHeight: '1.5', fontSize: '0.9rem' }}>We process samples using accredited molecular facilities.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={16} className="text-secondary" style={{ marginTop: '4px', flexShrink: 0 }} />
                    <span className="xsmall-text text-muted" style={{ lineHeight: '1.5', fontSize: '0.9rem' }}>Turnaround times generally average around 3–6 weeks depending on panel style.</span>
                  </li>
                </ul>
              </div>

              <div className="support-card">
                <div className="flex-row align-center gap-3 mb-4">
                  <div style={{ background: 'rgba(2, 132, 199, 0.1)', padding: '10px', borderRadius: '50%' }}>
                    <HelpCircle size={24} className="text-secondary" />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 800, color: 'var(--text-main)' }}>Need Consultation?</h3>
                </div>
                <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', marginBottom: '24px', fontSize: '0.95rem' }}>
                  Unsure which testing panel matches your clinical background or family history?
                </p>
                <a href="/appointments" className="btn btn-secondary w-full text-center" style={{ padding: '12px 16px', fontSize: '1rem', borderRadius: '12px', fontWeight: 600 }}>
                  Book Pre-Test Consultation
                </a>
              </div>
            </div>

          </div>

          {/* Section 5: CTA Strip */}
          <div className="cta-strip">
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', opacity: 0.05, transform: 'scale(1.5)' }}>
              <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 16px', color: '#ffffff' }}>
              Need help understanding a genetic report?
            </h2>
            <p style={{ fontSize: '1.1rem', margin: '0 0 32px', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', lineHeight: '1.6' }}>
              Book a consultation or upload your report for professional genetic interpretation.
            </p>
            
            <div className="flex-row gap-4" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="/appointments" className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '14px 32px', borderRadius: '16px', fontWeight: 700, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Upload size={20} />
                Upload Report
              </a>
              <a href="/appointments" className="btn btn-accent" style={{ padding: '14px 32px', borderRadius: '16px', fontWeight: 700, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Book Appointment
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
}
