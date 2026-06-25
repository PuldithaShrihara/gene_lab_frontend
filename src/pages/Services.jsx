import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Users, FileText, CheckCircle2, Sparkles, 
  HeartHandshake, ShieldAlert, ClipboardList, Dna, 
  HelpCircle, Microscope, Layers, Video
} from 'lucide-react';

export default function Services() {
  const servicesList = [
    {
      title: 'Genetic Counselling',
      icon: HeartHandshake,
      desc: 'Genetic counselling helps individuals and families understand genetic risks, inherited conditions, family history, test options, possible results, and next steps with professional guidance.',
      who: 'Couples planning family, individuals with positive test results, or families managing hereditary disorders.',
      expect: 'Structured sessions discussing risk probabilities, ethical choices, testing expectations, and family communication support.',
      cta1: { text: 'Book Appointment', link: '/appointments' },
      cta2: { text: 'Request Genetic Test', link: '/request-genetic-test' }
    },
    {
      title: 'Wellness Counselling',
      icon: Sparkles,
      desc: 'Wellness counselling supports personalized lifestyle, nutrition, fitness, healthy aging, prevention awareness, and long-term wellbeing planning.',
      who: 'Individuals seeking personalized guidance based on family health history and genetic screening indicators.',
      expect: 'Review of lifestyle predispositions, detailed analysis of risk factors, and development of personalized wellness goals.',
      cta1: { text: 'Book Appointment', link: '/appointments' }
    },
    {
      title: 'Precision Medicine',
      icon: Activity,
      desc: 'Precision medicine uses genetic insights, clinical background, family history, lifestyle, and health information to support more personalized healthcare decisions.',
      who: 'Patients looking to tailor their healthcare path in collaboration with their primary physicians and genetics advisors.',
      expect: 'Comprehensive variant review, clinical data alignment, and suggestions for individualized precision care pathways.',
      cta1: { text: 'Book Appointment', link: '/appointments' }
    },
    {
      title: 'Personalized Management',
      icon: CheckCircle2,
      desc: 'Personalized management provides individualized support for follow-up planning, lifestyle guidance, risk awareness, monitoring, referral pathways, and long-term health planning.',
      who: 'Individuals diagnosed with hereditary conditions or genetic predispositions requiring ongoing clinical supervision.',
      expect: 'Development of clinical tracking checklists, coordination with medical specialists, and regular follow-up consultations.',
      cta1: { text: 'Book Appointment', link: '/appointments' }
    },
    {
      title: 'Wellness & Nutrition',
      icon: Layers,
      desc: 'Nutrition and wellness guidance helps clients understand nutrient needs, food sensitivity, weight management, fitness response, detox profile, and prevention-focused lifestyle planning.',
      who: 'Wellness clients wanting to optimize nutrition based on genetic variations in nutrient absorption and food sensitivities.',
      expect: 'Analysis of dietary gene variants, custom nutrient guidelines, and structured lifestyle recommendations.',
      cta1: { text: 'Book Appointment', link: '/appointments' },
      cta2: { text: 'Request Genetic Test', link: '/request-genetic-test' }
    },
    {
      title: 'Cancer Prevention Awareness',
      icon: ShieldAlert,
      desc: 'Cancer prevention awareness focuses on family history, genetic risk understanding, lifestyle risk factors, screening awareness, and appropriate referral guidance.',
      who: 'Individuals with a strong family history of early-onset oncological conditions or known hereditary cancer gene variants.',
      expect: 'Detailed pedigree mapping, hereditary risk evaluations, coordinate testing suggestions, and structured surveillance schedules.',
      cta1: { text: 'Book Appointment', link: '/appointments' },
      cta2: { text: 'Request Genetic Test', link: '/request-genetic-test' }
    },
    {
      title: 'Non-Communicable Disease Prevention Awareness',
      icon: Activity,
      desc: 'NCD prevention awareness provides education and counselling support for diabetes, cardiovascular disease, obesity-related risks, hypertension, metabolic health, and healthy aging.',
      who: 'Individuals wanting to proactively manage chronic disease risks based on hereditary risk profiles and clinical family histories.',
      expect: 'Inherited cardiac/metabolic risk reviews, lifestyle risk factor identification, and structured prevention guidelines.',
      cta1: { text: 'Book Appointment', link: '/appointments' }
    },
    {
      title: 'Online Video Consultation',
      icon: Video,
      desc: 'Online consultations are available for genetic counselling, wellness counselling, NIPT counselling, genetic report interpretation, precision medicine consultation, and personalized health guidance.',
      who: 'Patients requiring pre-test or post-test consultations who are unable to travel to our Galle clinic center.',
      expect: 'Secure, confidential video consultation covering family history, test coordination, or variant report explanations.',
      cta1: { text: 'Book Appointment', link: '/appointments' }
    }
  ];

  return (
    <div className="services-page animate-fade-in">
      {/* Page Header */}
      <section className="section bg-secondary border-bottom">
        <div className="container text-center">
          <span className="badge badge-accent mb-4">The Gene Clinic</span>
          <h1 className="text-gradient">Clinical Genetics & Wellness Genomics Services</h1>
          <p className="lead-text mt-4" style={{ maxWidth: '800px', margin: '16px auto 0', fontWeight: '500' }}>
            The Gene Clinic by GenSek Health Private Limited provides genetic counselling, wellness counselling, precision medicine guidance, and personalized management support under the guidance of Dr. L. B. Lahiru Prabodha.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section section-light">
        <div className="container">
          <div className="grid grid-2">
            {servicesList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="card card-accent hover-scale flex-col-card">
                  <div className="service-header flex-row-center gap-4 mb-4">
                    <div className="card-icon-container">
                      <Icon size={24} className="text-accent" />
                    </div>
                    <h3 style={{ fontSize: '1.35rem' }}>{service.title}</h3>
                  </div>

                  <p className="mb-4">{service.desc}</p>

                  <div className="service-details border-top pt-4 mt-auto">
                    <div className="detail-row mb-3">
                      <strong>Who It Is For:</strong>
                      <p className="small-text text-muted">{service.who}</p>
                    </div>
                    <div className="detail-row mb-4">
                      <strong>What to Expect:</strong>
                      <p className="small-text text-muted">{service.expect}</p>
                    </div>
                  </div>

                  <div className="flex-col gap-2 mt-4">
                    {service.cta1 && (
                      <Link 
                        to={service.cta1.link} 
                        className="btn btn-primary w-full text-center"
                      >
                        {service.cta1.text}
                      </Link>
                    )}
                    {service.cta2 && (
                      <Link 
                        to={service.cta2.link} 
                        className="btn btn-secondary w-full text-center"
                      >
                        {service.cta2.text}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
