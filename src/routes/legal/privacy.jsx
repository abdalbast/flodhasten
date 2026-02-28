import React from 'react';
import { FaArrowLeft, FaShieldAlt, FaDownload, FaTrash, FaEnvelope } from 'react-icons/fa';
import { Button, Stack, Surface, Text, TopBar } from '../../design/components';
import '../../design/patterns/legal.css';

const Privacy = ({ isDarkMode, onBack }) => {
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
            <FaShieldAlt style={{ color: accentColor }} />
            <Text as="h1" variant="title" serif weight="medium">Privacy Policy</Text>
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
          <h2>Data Collection</h2>
          <p>
            Flodhästen collects minimal data to provide you with the best learning experience:
          </p>
          <ul>
            <li><strong>Learning Progress:</strong> Words learned, scores, and lesson completion</li>
            <li><strong>User Preferences:</strong> Language settings, difficulty levels, and UI preferences</li>
            <li><strong>Technical Data:</strong> Browser type, device information, and error logs</li>
            <li><strong>Voice Recognition:</strong> Audio data for pronunciation practice (processed locally when possible)</li>
          </ul>
          <Text as="p" variant="caption" color="secondary">
            We do not collect personal information like names, emails, or addresses unless you choose to provide them.
          </Text>
        </section>

        <section className="fd-legal-section">
          <h2>Data Storage</h2>
          <p>
            Your data is stored locally in your browser using:
          </p>
          <ul>
            <li><strong>localStorage:</strong> Learning progress, settings, and preferences</li>
            <li><strong>Session Storage:</strong> Temporary data during your learning session</li>
            <li><strong>IndexedDB:</strong> Larger datasets like word lists and audio files</li>
          </ul>
          <Text as="p" variant="caption" color="secondary">
            This means your data stays on your device and is not sent to our servers unless you explicitly choose to sync.
          </Text>
        </section>

        <section className="fd-legal-section">
          <h2>Export Your Data</h2>
          <p>
            You can export your learning progress at any time:
          </p>
          <Surface tone="paper" bordered padding="sm" className="fd-legal-actionBox">
            <Button
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
              leftIcon={<FaDownload />}
            >
              Export My Data
            </Button>
          </Surface>
        </section>

        <section className="fd-legal-section">
          <h2>Delete Your Data</h2>
          <p>
            You can delete all your data at any time:
          </p>
          <Surface tone="paper" bordered padding="sm" className="fd-legal-actionBox">
            <Button
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
              variant="destructive"
              leftIcon={<FaTrash />}
            >
              Delete All Data
            </Button>
          </Surface>
          <Text as="p" variant="caption" color="secondary">
            This will permanently remove all your learning progress, settings, and preferences.
          </Text>
        </section>

        <section className="fd-legal-section">
          <h2>Third-Party Services</h2>
          <p>
            We use the following third-party services:
          </p>
          <ul>
            <li><strong>Azure Translator API:</strong> For translation services (Microsoft)</li>
            <li><strong>Text-to-Speech API:</strong> For pronunciation audio (browser-native or external)</li>
            <li><strong>Analytics:</strong> Anonymous usage statistics (optional)</li>
          </ul>
          <Text as="p" variant="caption" color="secondary">
            These services may collect their own data according to their privacy policies.
          </Text>
        </section>

        <section className="fd-legal-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or your data:
          </p>
          <Surface tone="paper" bordered padding="sm" className="fd-legal-actionBox">
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
          </Surface>
        </section>

        <section className="fd-legal-section" style={{ marginBottom: 0 }}>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by:
          </p>
          <ul>
            <li>Posting the new policy on this page</li>
            <li>Updating the "Last updated" date</li>
            <li>Showing a notification in the app for significant changes</li>
          </ul>
        </section>
      </Surface>
    </div>
  );
};

export default Privacy;
