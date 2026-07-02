import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import CallbackModal from './components/CallbackModal';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/user/Home';
import About from './pages/user/About';
import Clinic from './pages/user/Clinic';
import Services from './pages/user/Services';
import TestPackages from './pages/user/TestPackages';
import WellnessBlueprint from './pages/user/WellnessBlueprint';
import Nipt from './pages/user/Nipt';
import Journey from './pages/user/Journey';
import Articles from './pages/user/Articles';
import Appointments from './pages/user/Appointments';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import Research from './pages/user/Research';
// New Pages
import RequestGeneticTest from './pages/user/RequestGeneticTest';
import Education from './pages/user/Education';
import Faq from './pages/user/Faq';
import PatientRegistration from './pages/user/PatientRegistration';
import PartnerLaboratories from './pages/user/PartnerLaboratories';
import Reviews from './pages/user/Reviews';
import Contact from './pages/user/Contact';
import Profile from './pages/user/Profile';

// Simple Legal Subpages to resolve footer links
function PrivacyPolicy() {
  return (
    <div className="container py-12 animate-fade-in" style={{ maxWidth: '800px', margin: '40px auto' }}>
      <h1 className="text-gradient">Privacy Policy</h1>
      <p style={{ marginTop: '20px' }}>
        Last updated: June 16, 2026. At The Gene Clinic, we take the confidentiality of your health data very seriously. All patient files, pedigree structures, and genetic testing outcomes are handled strictly in accordance with national medical privacy guidelines and HIPAA/GDPR health confidentiality requirements.
      </p>
      <p style={{ marginTop: '16px' }}>
        We do not sell or share patient identifiers with third parties. Your records are only released to external partner laboratories for the purpose of genetic testing and to clinical specialists involved in your direct medical care.
      </p>
    </div>
  );
}

function TermsConditions() {
  return (
    <div className="container py-12 animate-fade-in" style={{ maxWidth: '800px', margin: '40px auto' }}>
      <h1 className="text-gradient">Terms & Conditions</h1>
      <p style={{ marginTop: '20px' }}>
        Last updated: June 16, 2026. The information and education contents on this site are designed to explain the general concepts of clinical genetics, DNA testing, and familial disease risk. They do not constitute formal diagnostic medical reports or treatment guidelines.
      </p>
      <p style={{ marginTop: '16px' }}>
        Users must seek a direct consultation with Dr. Lahiru Prabodha or a qualified health practitioner to interpret genetic findings in the context of their specific medical history.
      </p>
    </div>
  );
}

export default function App() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-wrapper">
        <TopBar onOpenCallbackModal={() => setIsCallbackOpen(true)} />
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/clinic" element={<Clinic />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<TestPackages onOpenCallbackModal={() => setIsCallbackOpen(true)} />} />
            <Route path="/blueprint" element={<WellnessBlueprint />} />
            <Route path="/nipt" element={<Nipt />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<Navigate to="/admin-dashboard" replace />} />
            <Route path="/research" element={<Research />} />
            <Route path="/test-packages" element={<TestPackages onOpenCallbackModal={() => setIsCallbackOpen(true)} />} />
            <Route path="/wellness-blueprint" element={<WellnessBlueprint />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request-genetic-test" element={<RequestGeneticTest />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/education" element={<Education />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/patient-registration" element={<PatientRegistration />} />
            <Route path="/partner-laboratories" element={<PartnerLaboratories />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        <Footer />
        
        {/* Floating actions */}
        
        {/* Callback Request Modal */}
        <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
      </div>
    </Router>
  );
}
