import React from 'react';
import { FaArrowLeft, FaShieldAlt, FaDownload, FaTrash, FaEnvelope } from 'react-icons/fa';

const Privacy = ({ isDarkMode, onBack }) => {
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
          <FaShieldAlt />
          Privacy Policy
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
            Data Collection
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Flodhästen collects minimal data to provide you with the best learning experience:
          </p>
          <ul style={{
            marginLeft: '2rem',
            marginBottom: '1rem'
          }}>
            <li><strong>Learning Progress:</strong> Words learned, scores, and lesson completion</li>
            <li><strong>User Preferences:</strong> Language settings, difficulty levels, and UI preferences</li>
            <li><strong>Technical Data:</strong> Browser type, device information, and error logs</li>
            <li><strong>Voice Recognition:</strong> Audio data for pronunciation practice (processed locally when possible)</li>
          </ul>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
            We do not collect personal information like names, emails, or addresses unless you choose to provide them.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Data Storage
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Your data is stored locally in your browser using:
          </p>
          <ul style={{
            marginLeft: '2rem',
            marginBottom: '1rem'
          }}>
            <li><strong>localStorage:</strong> Learning progress, settings, and preferences</li>
            <li><strong>Session Storage:</strong> Temporary data during your learning session</li>
            <li><strong>IndexedDB:</strong> Larger datasets like word lists and audio files</li>
          </ul>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
            This means your data stays on your device and is not sent to our servers unless you explicitly choose to sync.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Export Your Data
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            You can export your learning progress at any time:
          </p>
          <div style={{
            background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <button
              onClick={() => {
                const data = {
                  words: JSON.parse(localStorage.getItem('flodhasten_words') || '[]'),
                  progress: JSON.parse(localStorage.getItem('flodhasten_progress') || '{}'),
                  settings: JSON.parse(localStorage.getItem('flodhasten_settings') || '{}'),
                  exportDate: new Date().toISOString()
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `flodhasten-data-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              style={{
                background: accentColor,
                color: '#fff',
                border: 'none',
                borderRadius: '25px',
                padding: '0.8rem 1.5rem',
                cursor: 'pointer',
                fontFamily: '"Georgia", serif',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaDownload />
              Export My Data
            </button>
          </div>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Delete Your Data
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            You can delete all your data at any time:
          </p>
          <div style={{
            background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
                  localStorage.clear();
                  sessionStorage.clear();
                  // Clear IndexedDB
                  if ('indexedDB' in window) {
                    indexedDB.databases().then(databases => {
                      databases.forEach(db => {
                        indexedDB.deleteDatabase(db.name);
                      });
                    });
                  }
                  alert('All data has been deleted. The page will reload.');
                  window.location.reload();
                }
              }}
              style={{
                background: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '25px',
                padding: '0.8rem 1.5rem',
                cursor: 'pointer',
                fontFamily: '"Georgia", serif',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaTrash />
              Delete All Data
            </button>
          </div>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
            This will permanently remove all your learning progress, settings, and preferences.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Third-Party Services
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            We use the following third-party services:
          </p>
          <ul style={{
            marginLeft: '2rem',
            marginBottom: '1rem'
          }}>
            <li><strong>Azure Translator API:</strong> For translation services (Microsoft)</li>
            <li><strong>Text-to-Speech API:</strong> For pronunciation audio (browser-native or external)</li>
            <li><strong>Analytics:</strong> Anonymous usage statistics (optional)</li>
          </ul>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
            These services may collect their own data according to their privacy policies.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            Contact Us
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            If you have any questions about this privacy policy or your data:
          </p>
          <div style={{
            background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <a
              href="mailto:privacy@flodhasten.app"
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
              privacy@flodhasten.app
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
            Changes to This Policy
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            We may update this privacy policy from time to time. We will notify you of any changes by:
          </p>
          <ul style={{
            marginLeft: '2rem',
            marginBottom: '1rem'
          }}>
            <li>Posting the new policy on this page</li>
            <li>Updating the "Last updated" date</li>
            <li>Showing a notification in the app for significant changes</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
