import React from 'react';
import {
  FaWhatsapp,
  FaEnvelope,
  FaFacebookF,
  FaYoutube,
  FaTiktok
} from "react-icons/fa";

// TODO: Replace # with official social media URL
const quickLinks = [
  {
    label: "WhatsApp",
    buttonText: "WhatsApp Chat",
    href: "https://wa.me/94701917000",
    icon: FaWhatsapp,
    ariaLabel: "Chat on WhatsApp",
    brandColor: "#25D366",
    isExternal: true
  },
  {
    label: "Email",
    buttonText: "Email Us",
    href: "mailto:thegeneclinic@gmail.com",
    icon: FaEnvelope,
    ariaLabel: "Send Email to The Gene Clinic",
    brandColor: "#ea4335",
    isExternal: false
  },
  {
    label: "Facebook",
    buttonText: "Facebook",
    href: "https://www.facebook.com/people/The-Gene-Clinic/61567109703049/?rdid=oR2IBlj76KtjvPg9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1KiE6odBpW%2F",
    icon: FaFacebookF,
    ariaLabel: "Follow us on Facebook",
    brandColor: "#1877F2",
    isExternal: true
  },
  {
    label: "YouTube",
    buttonText: "YouTube",
    // TODO: Replace # with official social media URL
    href: "#",
    icon: FaYoutube,
    ariaLabel: "Subscribe to our YouTube channel",
    brandColor: "#FF0000",
    isExternal: true
  },
  {
    label: "TikTok",
    buttonText: "TikTok",
    // TODO: Replace # with official social media URL
    href: "#",
    icon: FaTiktok,
    ariaLabel: "Follow us on TikTok",
    brandColor: "#000000",
    isExternal: true
  }
];

export default function QuickAccessLinks({ variant = 'icons', theme = 'dark', className = '' }) {
  const isDark = theme === 'dark';

  if (variant === 'labeled') {
    return (
      <div 
        className={`quick-access-labeled ${className}`} 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px', 
          width: '100%' 
        }}
      >
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target={link.isExternal && link.href !== '#' ? "_blank" : undefined}
              rel={link.isExternal && link.href !== '#' ? "noopener noreferrer" : undefined}
              aria-label={link.ariaLabel}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 18px',
                borderRadius: '12px',
                background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'var(--bg-secondary)',
                color: isDark ? '#f1f5f9' : 'var(--text-main)',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'var(--border-color)'}`,
                fontSize: '0.95rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.08)' : '#ffffff';
                e.currentTarget.style.borderColor = link.brandColor;
                e.currentTarget.style.color = link.brandColor;
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${link.brandColor}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.04)' : 'var(--bg-secondary)';
                e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'var(--border-color)';
                e.currentTarget.style.color = isDark ? '#f1f5f9' : 'var(--text-main)';
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
              }}
            >
              <Icon size={18} style={{ transition: 'transform 0.25s ease' }} />
              <span>{link.buttonText}</span>
            </a>
          );
        })}
      </div>
    );
  }

  // Default: circular icons
  return (
    <div 
      className={`quick-access-icons ${className}`} 
      style={{ 
        display: 'flex', 
        gap: '10px', 
        flexWrap: 'wrap',
        alignItems: 'center'
      }}
    >
      {quickLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.isExternal && link.href !== '#' ? "_blank" : undefined}
            rel={link.isExternal && link.href !== '#' ? "noopener noreferrer" : undefined}
            aria-label={link.ariaLabel}
            title={link.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '999px',
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'var(--bg-secondary)',
              color: isDark ? '#cbd5e1' : 'var(--text-main)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'var(--border-color)'}`,
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = link.brandColor;
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = link.brandColor;
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 4px 10px ${link.brandColor}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.05)' : 'var(--bg-secondary)';
              e.currentTarget.style.color = isDark ? '#cbd5e1' : 'var(--text-main)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Icon size={16} />
          </a>
        );
      })}
    </div>
  );
}
