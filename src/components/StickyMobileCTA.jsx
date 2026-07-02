import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Calendar, MessageCircle, FileText } from 'lucide-react';

export default function StickyMobileCTA() {
  return (
    <div className="sticky-mobile-cta">
      <a href="tel:+94701917000" className="btn flex-1" style={{ padding: '8px 4px', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', border: 'none', backgroundColor: '#f1f5f9', color: '#475569' }}>
        <Phone size={16} />
        <span>Call</span>
      </a>
      <a href="https://wa.me/94701917000" target="_blank" rel="noopener noreferrer" className="btn flex-1" style={{ padding: '8px 4px', fontSize: '0.8rem', backgroundColor: '#dcfce3', color: '#16a34a', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
        <MessageCircle size={16} />
        <span>WhatsApp</span>
      </a>
      <Link to="/request-genetic-test" className="btn btn-secondary flex-1" style={{ padding: '8px 4px', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', border: 'none', backgroundColor: '#e0f2fe', color: '#0284c7' }}>
        <FileText size={16} />
        <span>Request</span>
      </Link>
      <Link to="/appointments" className="btn btn-primary flex-1" style={{ padding: '8px 4px', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', border: 'none' }}>
        <Calendar size={16} />
        <span>Book</span>
      </Link>
    </div>
  );
}
