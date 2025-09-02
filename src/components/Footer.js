import React from 'react';
import { FaHeart, FaShieldAlt, FaGavel } from 'react-icons/fa';

const Footer = ({ isDarkMode, setScreen }) => {
  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const accentColor = isDarkMode ? '#3498db' : '#3498db';

  return (
    <footer style={{
      background: isDarkMode ? '#2c3e50' : '#f8f9fa',
      borderTop: `1px solid ${borderColor}`,
      padding: '1rem',
      marginTop: 'auto',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        {/* Main footer content */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          <span style={{ fontSize: '0.9rem', color: textColor }}>
            Made with
          </span>
          <FaHeart style={{ color: '#e74c3c', fontSize: '0.9rem' }} />
          <span style={{ fontSize: '0.9rem', color: textColor }}>
            for Swedish learners
          </span>
        </div>

        {/* Legal links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setScreen('privacy')}
            style={{
              background: 'transparent',
              color: accentColor,
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.3rem 0.6rem',
              borderRadius: '4px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? 'rgba(52, 152, 219, 0.1)' : 'rgba(52, 152, 219, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            <FaShieldAlt />
            Privacy Policy
          </button>

          <span style={{ color: textColor, opacity: 0.5 }}>•</span>

          <button
            onClick={() => setScreen('terms')}
            style={{
              background: 'transparent',
              color: accentColor,
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.3rem 0.6rem',
              borderRadius: '4px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? 'rgba(52, 152, 219, 0.1)' : 'rgba(52, 152, 219, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            <FaGavel />
            Terms of Service
          </button>
        </div>

        {/* Copyright */}
        <div style={{
          fontSize: '0.7rem',
          color: textColor,
          opacity: 0.7,
          marginTop: '0.5rem'
        }}>
          © {new Date().getFullYear()} Flodhästen. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
