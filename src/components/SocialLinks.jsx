import React from 'react';
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn
} from "react-icons/fa";

// TODO: Replace # with official social media URLs.
const socialLinks = [
  {
    name: "Facebook",
    url: "#",
    icon: <FaFacebookF size={16} />
  },
  {
    name: "YouTube",
    url: "#",
    icon: <FaYoutube size={16} />
  },
  {
    name: "Instagram",
    url: "#",
    icon: <FaInstagram size={16} />
  },
  {
    name: "TikTok",
    url: "#",
    icon: <FaTiktok size={16} />
  },
  {
    name: "LinkedIn",
    url: "#",
    icon: <FaLinkedinIn size={16} />
  }
];

export default function SocialLinks({ theme = 'dark', className = '' }) {
  const isDark = theme === 'dark';
  
  return (
    <div className={`social-links-container ${className}`} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          title={social.name}
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
            transition: 'all 0.2s ease',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--primary)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.05)' : 'var(--bg-secondary)';
            e.currentTarget.style.color = isDark ? '#cbd5e1' : 'var(--text-main)';
            e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'var(--border-color)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
