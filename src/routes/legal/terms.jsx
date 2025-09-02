import React from 'react';
import { FaArrowLeft, FaGavel, FaEnvelope, FaExclamationTriangle } from 'react-icons/fa';

const Terms = ({ isDarkMode, onBack }) => {
  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const accentColor = isDarkMode ? '#3498db' : '#3498db';

  return (
    <div style={{
      padding: '1rem',
      maxWidth: '800px',
      margin: '0 auto',
      color: textColor
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            color: accentColor,
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginRight: '1rem'
          }}
        >
          <FaArrowLeft />
          Back
        </button>
        
        <h1 style={{
          fontSize: '2rem',
          margin: '0',
          fontFamily: '"Georgia", serif',
          color: accentColor,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FaGavel />
          Terms of Service
        </h1>
      </div>

      {/* Content */}
      <div style={{
        background: cardBackground,
        border: `2px solid ${borderColor}`,
        borderRadius: '20px',
        padding: '2rem',
        lineHeight: '1.6'
      }}>
        <p style={{
          fontSize: '1.1rem',
          marginBottom: '2rem',
          opacity: 0.8
        }}>
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Acceptance of Terms
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            By accessing and using Flodhästen, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Description of Service
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Flodhästen is an educational application designed to help users learn Swedish through:
          </p>
          <ul style={{
            marginLeft: '2rem',
            marginBottom: '1rem'
          }}>
            <li>Interactive lessons and vocabulary exercises</li>
            <li>Voice recognition for pronunciation practice</li>
            <li>Gamified learning experiences</li>
            <li>Cultural content and context</li>
            <li>Progress tracking and analytics</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            User Responsibilities
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            As a user of Flodhästen, you agree to:
          </p>
          <ul style={{
            marginLeft: '2rem',
            marginBottom: '1rem'
          }}>
            <li>Use the service for educational purposes only</li>
            <li>Not attempt to reverse engineer or hack the application</li>
            <li>Not use the service for any illegal or unauthorized purpose</li>
            <li>Respect the intellectual property rights of the content</li>
            <li>Provide accurate information when using voice recognition features</li>
            <li>Not interfere with the proper functioning of the service</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Intellectual Property
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            The content, features, and functionality of Flodhästen are owned by the application developers and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            You retain ownership of your learning data and progress, which you can export or delete at any time.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Disclaimers
          </h2>
          <div style={{
            background: isDarkMode ? '#2d2d2d' : '#fff3cd',
            border: `1px solid ${isDarkMode ? '#555' : '#ffeaa7'}`,
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
              color: isDarkMode ? '#f39c12' : '#856404'
            }}>
              <FaExclamationTriangle />
              <strong>Important Disclaimers</strong>
            </div>
            <ul style={{
              marginLeft: '2rem',
              marginBottom: '0',
              color: isDarkMode ? '#f39c12' : '#856404'
            }}>
              <li>Flodhästen is provided "as is" without warranties of any kind</li>
              <li>We do not guarantee the accuracy of translations or pronunciations</li>
              <li>The service may not be available at all times</li>
              <li>Voice recognition accuracy depends on various factors</li>
              <li>Learning outcomes are not guaranteed</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Limitation of Liability
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            In no event shall Flodhästen or its developers be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul style={{
            marginLeft: '2rem',
            marginBottom: '1rem'
          }}>
            <li>Your use or inability to use the service</li>
            <li>Any unauthorized access to or use of our servers</li>
            <li>Any interruption or cessation of transmission to or from the service</li>
            <li>Any bugs, viruses, or other harmful code</li>
            <li>Any errors or omissions in any content</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Privacy and Data
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            You are responsible for maintaining the confidentiality of your learning progress and for all activities that occur under your use of the service.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Termination
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            We may terminate or suspend your access to Flodhästen immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Upon termination, your right to use the service will cease immediately. You can export your data before termination using the export feature in the Privacy Policy.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Changes to Terms
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            What constitutes a material change will be determined at our sole discretion.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Governing Law
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            These Terms shall be interpreted and governed by the laws of Sweden, without regard to its conflict of law provisions.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Contact Information
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            If you have any questions about these Terms of Service:
          </p>
          <div style={{
            background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <a
              href="mailto:legal@flodhasten.app"
              style={{
                color: accentColor,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem'
              }}
            >
              <FaEnvelope />
              legal@flodhasten.app
            </a>
          </div>
        </section>

        <section>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Severability
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
