import React from 'react';
import { FaArrowLeft, FaGavel, FaEnvelope, FaExclamationTriangle } from 'react-icons/fa';
import { Button, Stack, Surface, Text, TopBar } from '../../design/components';
import '../../design/patterns/legal.css';

const Terms = ({ isDarkMode, onBack }) => {
  const textColor = 'var(--fd-text-primary)';
  const cardBackground = 'var(--fd-bg-surface)';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const accentColor = 'var(--fd-accent-strong)';

  return (
    <div className={`fd-legal-page ${isDarkMode ? 'fd-theme-dark' : ''}`} style={{ color: textColor }}>
      <TopBar
        sticky={false}
        className="mb-4"
        leading={(
          <Button variant="ghost" onClick={onBack} leftIcon={<FaArrowLeft />}>
            Back
          </Button>
        )}
        title={(
          <Stack direction="row" align="center" gap="8px">
            <FaGavel style={{ color: accentColor }} />
            <Text as="h1" variant="title" serif weight="medium">Terms of Service</Text>
          </Stack>
        )}
      />

      <Surface
        className="fd-legal-content"
        bordered
        elevation="low"
        style={{ background: cardBackground, borderColor: borderColor, lineHeight: 1.6 }}
      >
        <Text as="p" variant="bodyLg" color="secondary" className="fd-legal-lastUpdated">
          Last updated: {new Date().toLocaleDateString()}
        </Text>

        <section className="fd-legal-section">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using Flodhästen, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section className="fd-legal-section">
          <h2>Description of Service</h2>
          <p>
            Flodhästen is an educational application designed to help users learn Swedish through:
          </p>
          <ul>
            <li>Interactive lessons and vocabulary exercises</li>
            <li>Voice recognition for pronunciation practice</li>
            <li>Gamified learning experiences</li>
            <li>Cultural content and context</li>
            <li>Progress tracking and analytics</li>
          </ul>
        </section>

        <section className="fd-legal-section">
          <h2>User Responsibilities</h2>
          <p>
            As a user of Flodhästen, you agree to:
          </p>
          <ul>
            <li>Use the service for educational purposes only</li>
            <li>Not attempt to reverse engineer or hack the application</li>
            <li>Not use the service for any illegal or unauthorized purpose</li>
            <li>Respect the intellectual property rights of the content</li>
            <li>Provide accurate information when using voice recognition features</li>
            <li>Not interfere with the proper functioning of the service</li>
          </ul>
        </section>

        <section className="fd-legal-section">
          <h2>Intellectual Property</h2>
          <p>
            The content, features, and functionality of Flodhästen are owned by the application developers and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          <p>
            You retain ownership of your learning data and progress, which you can export or delete at any time.
          </p>
        </section>

        <section className="fd-legal-section">
          <h2>Disclaimers</h2>
          <Surface style={{
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
          </Surface>
        </section>

        <section className="fd-legal-section">
          <h2>Limitation of Liability</h2>
          <p>
            In no event shall Flodhästen or its developers be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul>
            <li>Your use or inability to use the service</li>
            <li>Any unauthorized access to or use of our servers</li>
            <li>Any interruption or cessation of transmission to or from the service</li>
            <li>Any bugs, viruses, or other harmful code</li>
            <li>Any errors or omissions in any content</li>
          </ul>
        </section>

        <section className="fd-legal-section">
          <h2>Privacy and Data</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your learning progress and for all activities that occur under your use of the service.
          </p>
        </section>

        <section className="fd-legal-section">
          <h2>Termination</h2>
          <p>
            We may terminate or suspend your access to Flodhästen immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <p>
            Upon termination, your right to use the service will cease immediately. You can export your data before termination using the export feature in the Privacy Policy.
          </p>
        </section>

        <section className="fd-legal-section">
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
          </p>
          <p>
            What constitutes a material change will be determined at our sole discretion.
          </p>
        </section>

        <section className="fd-legal-section">
          <h2>Governing Law</h2>
          <p>
            These Terms shall be interpreted and governed by the laws of Sweden, without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="fd-legal-section">
          <h2>Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service:
          </p>
          <Surface tone="paper" bordered padding="sm" className="fd-legal-actionBox">
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
          </Surface>
        </section>

        <section className="fd-legal-section" style={{ marginBottom: 0 }}>
          <h2>Severability</h2>
          <p>
            If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
          </p>
        </section>
      </Surface>
    </div>
  );
};

export default Terms;
