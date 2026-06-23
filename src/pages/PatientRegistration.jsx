import React, { useState } from 'react';
import { ClipboardCheck, CheckCircle2, AlertCircle, Shield, User } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function PatientRegistration() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [nic, setNic] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  const [reason, setReason] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [currentMedications, setCurrentMedications] = useState('');
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Patient Full Name is required';
    if (!phone.trim()) errors.phone = 'Phone Number is required';
    if (!email.trim()) errors.email = 'Email Address is required';
    if (!consent) errors.consent = 'Consent is required to submit';
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
      const response = await fetch(`${API_BASE_URL}/api/patient-registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          dob,
          age,
          gender,
          phone,
          email,
          address,
          nic,
          emergencyContactName,
          emergencyContactNumber,
          reason,
          medicalCondition,
          currentMedications,
          consent
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setName('');
        setDob('');
        setAge('');
        setGender('Male');
        setPhone('');
        setEmail('');
        setAddress('');
        setNic('');
        setEmergencyContactName('');
        setEmergencyContactNumber('');
        setReason('');
        setMedicalCondition('');
        setCurrentMedications('');
        setConsent(false);
        setValidationErrors({});
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to register patient profile.');
      }
    } catch (err) {
      setError('Connection error: could not connect to backend server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Hero Header */}
      <section className="section bg-secondary border-bottom" style={{ padding: '60px 0 40px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-accent mb-4">Patient Portal</span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Patient Registration
              </h1>
              <p className="lead-text" style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                Register patient/client details prior to your scheduled counselling sessions, NIPT testing, or genomic reports review. All personal details are stored under medical encryption guidelines.
              </p>
            </div>
            
            <div className="card card-glass" style={{ padding: '28px' }}>
              <div className="flex-row align-center gap-3 mb-4">
                <Shield size={24} className="text-secondary" />
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Data Confidentiality</h4>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', margin: 0 }}>
                Patient profiles are accessed solely by clinical staff and genetics specialists. No identifying details are shared with non-clinical entities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="section section-light" style={{ padding: '48px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.65fr', gap: '32px', alignItems: 'start' }}>
            
            <div className="card" style={{ padding: '40px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, var(--secondary), var(--accent))', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}></div>
              
              {success ? (
                <div className="text-center py-12">
                  <div className="flex-row-center text-accent mb-6" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(15, 118, 110, 0.08)', margin: '0 auto' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h2>Registration Successful</h2>
                  <p className="small-text text-muted" style={{ maxWidth: '480px', margin: '16px auto 32px', lineHeight: '1.7' }}>
                    The profile has been successfully registered. The clinical genetics coordinator will cross-reference this details with your pending appointment slots.
                  </p>
                  <button onClick={() => setSuccess(false)} className="btn btn-primary" style={{ padding: '12px 32px' }}>
                    Register Another Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-col gap-8">
                  <div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 6px' }}>Patient Intake Form</h2>
                    <p className="small-text text-muted">Complete the fields below to open your record with The Gene Clinic.</p>
                  </div>

                  {error && (
                    <div className="form-alert error-alert" style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '16px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', borderRadius: '12px' }}>
                      <AlertCircle size={18} />
                      <span className="xsmall-text">{error}</span>
                    </div>
                  )}

                  {/* Section 1: Demographics */}
                  <div className="flex-col gap-4">
                    <div className="form-section-title" style={{ fontSize: '1.1rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '16px' }}>
                      1. Demographics & Contacts
                    </div>
                    
                    <div className="grid grid-2">
                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Full Name *</label>
                        <input
                          type="text"
                          className={`premium-input ${validationErrors.name ? 'invalid' : ''}`}
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="e.g. Nadeesha Silva"
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        />
                        {validationErrors.name && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.name}</span>}
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Date of Birth</label>
                        <input
                          type="date"
                          className="premium-input"
                          value={dob}
                          onChange={e => setDob(e.target.value)}
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-3">
                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Age</label>
                        <input
                          type="number"
                          className="premium-input"
                          value={age}
                          onChange={e => setAge(e.target.value)}
                          placeholder="e.g. 29"
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        />
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Gender</label>
                        <select
                          className="premium-input"
                          value={gender}
                          onChange={e => setGender(e.target.value)}
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>NIC / Passport (Optional)</label>
                        <input
                          type="text"
                          className="premium-input"
                          value={nic}
                          onChange={e => setNic(e.target.value)}
                          placeholder="e.g. 978546123V"
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-2">
                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Phone Number *</label>
                        <input
                          type="tel"
                          className={`premium-input ${validationErrors.phone ? 'invalid' : ''}`}
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="e.g. +94 71 987 6543"
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        />
                        {validationErrors.phone && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.phone}</span>}
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Email Address *</label>
                        <input
                          type="email"
                          className={`premium-input ${validationErrors.email ? 'invalid' : ''}`}
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="e.g. nadeesha@example.com"
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        />
                        {validationErrors.email && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.email}</span>}
                      </div>
                    </div>

                    <div className="form-group flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Resident Address</label>
                      <input
                        type="text"
                        className="premium-input"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Street Address, City"
                        style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Section 2: Clinical Details */}
                  <div className="flex-col gap-4">
                    <div className="form-section-title" style={{ fontSize: '1.1rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '16px' }}>
                      2. Clinical Background & Emergency
                    </div>

                    <div className="grid grid-2">
                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Emergency Contact Name</label>
                        <input
                          type="text"
                          className="premium-input"
                          value={emergencyContactName}
                          onChange={e => setEmergencyContactName(e.target.value)}
                          placeholder="e.g. Amara Silva (Spouse)"
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        />
                      </div>

                      <div className="form-group flex-col" style={{ gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Emergency Contact Phone</label>
                        <input
                          type="tel"
                          className="premium-input"
                          value={emergencyContactNumber}
                          onChange={e => setEmergencyContactNumber(e.target.value)}
                          placeholder="e.g. +94 77 987 6543"
                          style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div className="form-group flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Reason for Registering / Primary Concerns</label>
                      <textarea
                        className="premium-textarea"
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        placeholder="Explain primary concerns or clinical goals (e.g. NIPT screening planning, hereditary cardiac risk consultation)..."
                        style={{ width: '100%', minHeight: '80px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px 16px', background: 'var(--bg-secondary)', outline: 'none', resize: 'none' }}
                      ></textarea>
                    </div>

                    <div className="form-group flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Existing Medical Conditions (Optional)</label>
                      <input
                        type="text"
                        className="premium-input"
                        value={medicalCondition}
                        onChange={e => setMedicalCondition(e.target.value)}
                        placeholder="List any diagnosed medical issues..."
                        style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                      />
                    </div>

                    <div className="form-group flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Current Medications / Supplements (Optional)</label>
                      <input
                        type="text"
                        className="premium-input"
                        value={currentMedications}
                        onChange={e => setCurrentMedications(e.target.value)}
                        placeholder="List current prescription items..."
                        style={{ width: '100%', height: '48px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px 16px', background: 'var(--bg-secondary)', outline: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Consent & Submit */}
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                    <div className="card flex-col align-start" style={{ padding: '24px', background: 'rgba(2, 132, 199, 0.03)', borderColor: 'rgba(2, 132, 199, 0.12)', borderRadius: '18px', marginBottom: '24px', gap: '10px' }}>
                      <div className="flex-row align-start gap-3" style={{ display: 'flex' }}>
                        <input
                          type="checkbox"
                          id="register-consent"
                          checked={consent}
                          onChange={e => setConsent(e.target.checked)}
                          style={{ marginTop: '4px', width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <label htmlFor="register-consent" className="xsmall-text text-muted" style={{ cursor: 'pointer', lineHeight: '1.5' }}>
                          I confirm that the clinical details provided are accurate and complete. I consent to registering this data in The Gene Clinic medical records system under strict data protection protocols. *
                        </label>
                      </div>
                      {validationErrors.consent && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{validationErrors.consent}</span>}
                    </div>

                    <div className="flex-row" style={{ justifyContent: 'flex-end', width: '100%' }}>
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ height: '52px', minWidth: '280px', width: '100%', maxWidth: '340px' }}
                      >
                        {loading ? 'Processing Profile...' : 'Complete Registration'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar information */}
            <div className="flex-col gap-6" style={{ position: 'sticky', top: '100px' }}>
              <div className="card" style={{ padding: '28px', background: 'var(--bg-secondary)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: 700 }}>Registration FAQ</h3>
                <div className="flex-col gap-4">
                  <div>
                    <h5 style={{ margin: '0 0 4px', fontSize: '0.85rem', fontWeight: 700 }}>Why register first?</h5>
                    <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                      Registering helps us prepare your record in advance, reducing wait times and allowing clinicians to review histories thoroughly.
                    </p>
                  </div>
                  <div>
                    <h5 style={{ margin: '0 0 4px', fontSize: '0.85rem', fontWeight: 700 }}>Is it secure?</h5>
                    <p className="xsmall-text text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                      Yes, all data submitted here is protected under HIPAA-compliant data policies. Your clinical records are never shared.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
