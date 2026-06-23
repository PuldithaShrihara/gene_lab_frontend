import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, FileText, Calendar, CreditCard, ShieldAlert } from 'lucide-react';

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      category: 'General & Counselling',
      icon: <HelpCircle size={20} className="text-accent" />,
      questions: [
        {
          q: 'What is Genetic Counselling?',
          a: 'Genetic counselling is a specialized clinical consultation where a genetics professional reviews your medical history, explains inheritance patterns, evaluates disease predisposition risks, and helps you understand the benefits, limitations, and results of genetic screening panels.'
        },
        {
          q: 'Is a genetic test diagnostic or screening?',
          a: 'Most genetic tests offered for wellness, lifestyle, and general predisposition are screening tools. They indicate risks or likelihoods but do not confirm a definitive diagnosis or treatment plan. Diagnostic clinical tests require specific medical indications and must be interpreted by qualified clinical geneticists.'
        },
        {
          q: 'How do I prepare for a genetic counselling appointment?',
          a: 'Prepare a list of diagnosed medical conditions in your family (covering siblings, parents, and grandparents). If you have existing laboratory results, medical summaries, or reports, please upload them during patient registration or bring them to your session.'
        }
      ]
    },
    {
      category: 'Screening & Reports',
      icon: <FileText size={20} className="text-secondary" />,
      questions: [
        {
          q: 'What is the Me360 Wellness Blueprint?',
          a: 'The Me360 Wellness Blueprint is a comprehensive genetic wellness screening covering 13 modules (such as macro/micronutrient metabolization, food sensitivities, weight regulation indicators, fitness responses, lipid profile predispositions, and cellular detoxification efficiency). It uses a Good/Average/Risk (G/A/R) traffic-light format for simple interpretation.'
        },
        {
          q: 'What are the timing requirements for NIPT screening?',
          a: 'NIPT (Non-Invasive Prenatal Testing) can be performed anytime starting from the 10th week of gestational age (confirmed via ultrasound). Performing the test before 10 weeks may result in insufficient fetal cell-free DNA fractions, requiring a re-collection.'
        },
        {
          q: 'How long does it take to receive genetic test results?',
          a: 'Turnaround times vary based on the specific molecular panel. General lifestyle genomic panels average around 3–4 weeks. Complex clinical panels, whole exome sequencing, or specialized international tests can take up to 6 weeks for processing, quality assurance, and report compilation.'
        }
      ]
    },
    {
      category: 'Payments & Privacy',
      icon: <CreditCard size={20} className="text-accent" />,
      questions: [
        {
          q: 'What payment options are available for testing?',
          a: 'We support bank transfers, card payments (via secure online payment placeholders), and structured installment programs through our clinical coordinators. Full payment details are coordinated at sample collection confirmation.'
        },
        {
          q: 'How are doctor fees and commissions structured?',
          a: 'Dr. Lahiru Prabodha and The Gene Clinic maintain strict pricing transparency. All test fee summaries include standard laboratory processing costs and pre/post-test counselling consultations. To protect patient-doctor relationships and adhere to medical compliance standards, internal commission structures or referral distributions are not published.'
        },
        {
          q: 'How secure is my genomic and personal data?',
          a: 'Patient data is guarded under strict medical privacy guidelines. All submitted records, personal demographics, and molecular report files are encrypted. Access is limited strictly to your consulting clinical coordinator and genetics specialist.'
        }
      ]
    }
  ];

  // Flatten questions to map indices easily
  let globalIndex = 0;

  return (
    <div className="faq-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Hero Header */}
      <section className="section bg-secondary border-bottom" style={{ padding: '60px 0 40px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-accent mb-4">Support & FAQ</span>
              <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Frequently Asked Questions
              </h1>
              <p className="lead-text" style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                Find detailed information regarding genetic counselling sessions, testing timelines, laboratory quality parameters, and medical guidelines.
              </p>
            </div>
            
            <div className="card card-glass" style={{ padding: '28px' }}>
              <div className="flex-row align-center gap-3 mb-4" style={{ display: 'flex' }}>
                <ShieldAlert size={24} className="text-secondary" />
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Medical Notice</h4>
              </div>
              <p className="xsmall-text text-muted" style={{ lineHeight: '1.6', margin: 0 }}>
                FAQ answers are for general awareness and screening coordination guidance. They do not replace formal clinical consultations or professional medical diagnosis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion List */}
      <section className="section section-light" style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <div className="flex-col gap-10">
            {faqData.map((cat, catIdx) => (
              <div key={catIdx} className="faq-category-section">
                
                {/* Category Header */}
                <div className="flex-row align-center gap-3 mb-6" style={{ display: 'flex', borderBottom: '2px solid var(--border-color)', paddingBottom: '12px' }}>
                  {cat.icon}
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>{cat.category}</h3>
                </div>

                {/* Accordion Questions */}
                <div className="flex-col gap-3">
                  {cat.questions.map((faq) => {
                    const currentIndex = globalIndex++;
                    const isOpen = activeIndex === currentIndex;

                    return (
                      <div
                        key={currentIndex}
                        className={`faq-accordion-card card ${isOpen ? 'active-accordion' : ''}`}
                        style={{
                          padding: '20px 24px',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          borderRadius: '16px'
                        }}
                        onClick={() => toggleAccordion(currentIndex)}
                      >
                        <div className="flex-row justify-between align-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, lineHeight: '1.4' }}>
                            {faq.q}
                          </h4>
                          <div className="text-muted" style={{ display: 'flex', flexShrink: 0 }}>
                            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </div>
                        </div>

                        {isOpen && (
                          <div style={{ marginTop: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
                            <p className="small-text text-muted" style={{ margin: 0, lineHeight: '1.6' }}>
                              {faq.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

          {/* Still Have Questions CTA */}
          <div className="card text-center" style={{ padding: '40px', marginTop: '60px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>Still Have Questions?</h3>
            <p className="small-text text-muted" style={{ maxWidth: '500px', margin: '0 auto 24px', lineHeight: '1.6' }}>
              If you need specific clinical clarification or wish to verify panel eligibility, our clinical coordinators are available.
            </p>
            <div className="flex-row justify-center gap-4" style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn btn-primary" style={{ padding: '12px 28px' }}>
                Contact Coordinator
              </a>
              <a href="/appointments" className="btn btn-secondary" style={{ padding: '12px 28px' }}>
                Book Appointment
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
