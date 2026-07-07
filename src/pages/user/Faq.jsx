import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldAlert, Phone, Mail, MessageCircle, MapPin, Calendar, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Faq() {
  const [activeTopic, setActiveTopic] = useState("All");
  const [openFaqId, setOpenFaqId] = useState(null);

  const topics = [
    "All",
    "Genetic Counselling",
    "Wellness Counselling",
    "Genetic Testing",
    "Appointments",
    "NIPT",
    "Reports & Uploads"
  ];

  const handleTopicChange = (topic) => {
    setActiveTopic(topic);
    setOpenFaqId(null);
  };

  const faqs = [
    {
      id: 1,
      topic: 'Genetic Counselling',
      question: "What is genetic counselling?",
      answer: "Genetic counselling is professional guidance that helps individuals and families understand genetic risks, test options, possible results, and next steps."
    },
    {
      id: 2,
      topic: 'Genetic Counselling',
      question: "Who should consider genetic counselling?",
      answer: "Individuals or families with a history of hereditary conditions, recurrent miscarriages, those considering genetic testing, or individuals seeking precision wellness guidance."
    },
    {
      id: 3,
      topic: 'Genetic Counselling',
      question: "Do I need counselling before a genetic test?",
      answer: "Pre-test genetic counselling is highly recommended to understand the benefits, limitations, and potential outcomes of the testing panel you are choosing."
    },
    {
      id: 4,
      topic: 'Genetic Counselling',
      question: "What happens after I receive a genetic test report?",
      answer: "Post-test counselling helps interpret the results, explain clinical implications, and formulate a personalized follow-up or management plan."
    },
    {
      id: 5,
      topic: 'Wellness Counselling',
      question: "What is wellness counselling?",
      answer: "Wellness counselling supports personalized lifestyle, nutrition, fitness, and prevention-focused planning based on health goals, genetic information, and professional guidance."
    },
    {
      id: 6,
      topic: 'Wellness Counselling',
      question: "How does wellness counselling support nutrition and lifestyle?",
      answer: "It translates DNA sequence traits into actionable nutrition paths, highlighting nutrient needs, food sensitivities, and effective weight management strategies."
    },
    {
      id: 7,
      topic: 'Wellness Counselling',
      question: "Is wellness counselling a medical diagnosis?",
      answer: "No. Wellness counselling focuses on prevention awareness and long-term health planning. It is not a clinical diagnosis."
    },
    {
      id: 8,
      topic: 'Genetic Testing',
      question: "How can I request a genetic test?",
      answer: "You can request a genetic test via our 'Request Genetic Test' page. Our team will contact you to coordinate sample collection and processing."
    },
    {
      id: 9,
      topic: 'Genetic Testing',
      question: "What types of genetic tests are available?",
      answer: "We coordinate NIPT prenatal screening, Wellness Genomics (Me360), clinical diagnostic panels, cancer genetics, whole exome, and whole genome sequencing."
    },
    {
      id: 10,
      topic: 'Genetic Testing',
      question: "How long does a genetic test take?",
      answer: "Turnaround times generally average around 3–6 weeks depending on the complexity of the selected testing panel."
    },
    {
      id: 11,
      topic: 'Genetic Testing',
      question: "Do I need to upload previous reports?",
      answer: "Uploading previous genetic or medical reports is highly beneficial for our clinical team to select the most appropriate testing pathway for you."
    },
    {
      id: 12,
      topic: 'Appointments',
      question: "How can I book an appointment?",
      answer: "You can book an appointment directly through our 'Book Appointment' page by selecting your preferred consultation type and submitting your details."
    },
    {
      id: 13,
      topic: 'Appointments',
      question: "Can I choose online or in-person consultation?",
      answer: "Yes. We offer both online video consultations and in-person sessions. You can specify your preference when booking."
    },
    {
      id: 14,
      topic: 'Appointments',
      question: "What information should I provide before appointment confirmation?",
      answer: "Please provide your contact details, reason for consultation, patient registration details, and any previous medical/genetic reports."
    },
    {
      id: 15,
      topic: 'NIPT',
      question: "What is NIPT?",
      answer: "NIPT (Non-Invasive Prenatal Testing) is a screening test that uses maternal blood to assess the risk of selected chromosomal conditions during pregnancy."
    },
    {
      id: 16,
      topic: 'NIPT',
      question: "Is NIPT diagnostic?",
      answer: "No. NIPT is a screening test, not a diagnostic test. High-risk or unclear results may require further diagnostic confirmation."
    },
    {
      id: 17,
      topic: 'NIPT',
      question: "From when can NIPT be performed?",
      answer: "NIPT may be considered from at least 10 weeks of pregnancy, subject to clinical suitability and professional guidance."
    },
    {
      id: 18,
      topic: 'Reports & Uploads',
      question: "Can I upload a previous genetic report?",
      answer: "Yes. You can upload previous genetic reports, medical records, or prescriptions securely during the appointment booking process."
    },
    {
      id: 19,
      topic: 'Reports & Uploads',
      question: "What file types are accepted?",
      answer: "We currently accept PDF, JPG, and PNG formats for report and prescription uploads."
    },
    {
      id: 20,
      topic: 'Reports & Uploads',
      question: "How are uploaded reports used?",
      answer: "Uploaded reports are reviewed by our clinical geneticist to prepare for your consultation and provide precise, personalized medical guidance."
    },
    {
      id: 21,
      topic: 'Online Consultation',
      question: "Are online video consultations available?",
      answer: "Yes. Online video consultations are available for selected counselling and report interpretation services."
    },
    {
      id: 22,
      topic: 'Online Consultation',
      question: "Can I discuss my genetic report online?",
      answer: "Yes, our online video consultations are ideal for post-test counselling and detailed interpretation of genetic reports."
    },
    {
      id: 23,
      topic: 'Online Consultation',
      question: "How will the clinic contact me?",
      answer: "Our team will reach out via Phone Call, WhatsApp, or Email (based on your preference) with scheduling and meeting link details."
    },
    {
      id: 24,
      topic: 'Privacy & Payment',
      question: "Is my information confidential?",
      answer: "Patient and client information is used for appointment coordination, counselling, testing support, and follow-up communication."
    },
    {
      id: 25,
      topic: 'Privacy & Payment',
      question: "Is online payment available?",
      answer: "Online payment gateway integration is planned for a future phase. At present, our team will contact you with confirmation and payment instructions."
    },
    {
      id: 26,
      topic: 'Privacy & Payment',
      question: "When will payment gateway be added?",
      answer: "Online payment gateway integration is planned for a future phase. At present, our team will contact you with confirmation and payment instructions."
    }
  ];

  const cleanFaqs = faqs.filter((faq) => faq.question && faq.answer);

  const filteredFaqs =
    activeTopic === "All"
      ? cleanFaqs
      : cleanFaqs.filter((faq) => faq.topic === activeTopic);

  return (
    <div className="faq-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Hero Header */}
      <section className="section bg-secondary border-bottom" style={{ padding: '30px 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, margin: '0', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Contact Us
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Us Support Section */}
      <section className="section" style={{ padding: '60px 0', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px', color: '#0f172a' }}>Still have questions?</h2>
            <p className="lead-text text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: '#64748b' }}>
              If you cannot find the answer you need, contact The Gene Clinic team for assistance with appointments, genetic test requests, report interpretation, or patient services.
            </p>
          </div>

          {/* Contact Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
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
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/contact" className="btn" style={{ padding: '14px 28px', fontSize: '1.05rem', backgroundColor: '#e2e8f0', color: '#0f172a', borderRadius: '50px', border: 'none', fontWeight: 600 }}>
              General Inquiry Form
            </Link>
            <Link to="/appointments" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0284c7', border: 'none', borderRadius: '50px', fontWeight: 600 }}>
              <Calendar size={18} /> Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Main FAQ Content Area */}
      <section className="faq-section section section-light" style={{ padding: '40px 0 80px' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          {/* Topics Header */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px' }}>Browse by Topic</h2>
            
            <div className="faq-topic-list" role="tablist" aria-label="FAQ topics">
              {topics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => handleTopicChange(topic)}
                  className={`faq-topic-chip ${activeTopic === topic ? "active" : ""}`}
                  aria-pressed={activeTopic === topic}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div style={{ padding: '16px 20px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.15)', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '40px' }}>
            <ShieldAlert size={20} style={{ color: '#ef4444', flexShrink: 0 }} />
            <p className="xsmall-text" style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.5' }}>
              FAQ answers are for general awareness and service guidance only. They do not replace consultation, diagnosis, or treatment by a qualified healthcare professional.
            </p>
          </div>

          {/* Accordion List */}
          <div className="faq-list">
            {filteredFaqs.length === 0 ? (
              <div className="faq-empty text-center text-muted" style={{ padding: '40px 0' }}>
                No FAQs available for this topic yet.
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;

                return (
                  <div key={faq.id} className={`faq-item ${isOpen ? "open" : ""}`}>
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                    >
                      <span className="faq-icon">?</span>
                      <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>{faq.question}</span>
                      <span className="faq-chevron">{isOpen ? "−" : "+"}</span>
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-answer-${faq.id}`}
                        className="faq-answer"
                        role="region"
                      >
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
