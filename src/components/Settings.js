import React, { useState } from 'react';
import { FaArrowLeft, FaDownload, FaUpload, FaTrash, FaCog, FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, Card, Surface, Stack, Text, TopBar } from '../design/components';
import '../design/patterns/settings.css';

const Settings = ({ isDarkMode, onBack }) => {
  const [exportData, setExportData] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dataPreview, setDataPreview] = useState(null);

  const borderColor = isDarkMode ? '#555' : '#e8f4f8';
  const cardBg = isDarkMode ? 'var(--fd-bg-surface)' : 'var(--fd-bg-surface)';

  // Collect all user data
  const collectUserData = () => {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      words: JSON.parse(localStorage.getItem('flodhasten_words') || '[]'),
      progress: JSON.parse(localStorage.getItem('flodhasten_progress') || '{}'),
      achievements: JSON.parse(localStorage.getItem('flodhasten_achievements') || '[]'),
      stats: JSON.parse(localStorage.getItem('flodhasten_stats') || '{}'),
      settings: JSON.parse(localStorage.getItem('flodhasten_settings') || '{}'),
      challenges: JSON.parse(localStorage.getItem('flodhasten_challenges') || '[]'),
      appVersion: localStorage.getItem('appVersion') || 'unknown'
    };
    return data;
  };

  // Export data
  const handleExport = () => {
    try {
      const data = collectUserData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `flodhasten-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setExportData({ success: true, message: 'Data exported successfully!' });
      setTimeout(() => setExportData(null), 3000);
    } catch (error) {
      console.error('Export failed:', error);
      setExportData({ success: false, message: 'Export failed. Please try again.' });
      setTimeout(() => setExportData(null), 3000);
    }
  };

  // Import data
  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setImportStatus({ loading: true, message: 'Reading file...' });
      
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Validate data structure
      if (!data.version || !data.exportDate) {
        throw new Error('Invalid backup file format');
      }

      setDataPreview(data);
      setImportStatus({ loading: false, message: 'File loaded successfully!' });
    } catch (error) {
      console.error('Import failed:', error);
      setImportStatus({ 
        loading: false, 
        error: true, 
        message: 'Invalid file format. Please select a valid Flodhästen backup file.' 
      });
      setTimeout(() => setImportStatus(null), 5000);
    }
  };

  // Apply imported data
  const applyImportedData = () => {
    try {
      if (!dataPreview) return;

      // Backup current data first
      const currentBackup = collectUserData();
      localStorage.setItem('flodhasten_backup_before_import', JSON.stringify(currentBackup));

      // Apply imported data
      if (dataPreview.words) localStorage.setItem('flodhasten_words', JSON.stringify(dataPreview.words));
      if (dataPreview.progress) localStorage.setItem('flodhasten_progress', JSON.stringify(dataPreview.progress));
      if (dataPreview.achievements) localStorage.setItem('flodhasten_achievements', JSON.stringify(dataPreview.achievements));
      if (dataPreview.stats) localStorage.setItem('flodhasten_stats', JSON.stringify(dataPreview.stats));
      if (dataPreview.settings) localStorage.setItem('flodhasten_settings', JSON.stringify(dataPreview.settings));
      if (dataPreview.challenges) localStorage.setItem('flodhasten_challenges', JSON.stringify(dataPreview.challenges));

      setImportStatus({ success: true, message: 'Data imported successfully! Page will reload in 3 seconds.' });
      setDataPreview(null);
      
      setTimeout(() => window.location.reload(), 3000);
    } catch (error) {
      console.error('Apply import failed:', error);
      setImportStatus({ 
        error: true, 
        message: 'Failed to apply imported data. Please try again.' 
      });
      setTimeout(() => setImportStatus(null), 5000);
    }
  };

  // Clear all data
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all your progress? This action cannot be undone.')) {
      try {
        localStorage.clear();
        setImportStatus({ success: true, message: 'All data cleared successfully! Page will reload in 3 seconds.' });
        setTimeout(() => window.location.reload(), 3000);
      } catch (error) {
        console.error('Clear data failed:', error);
        setImportStatus({ 
          error: true, 
          message: 'Failed to clear data. Please try again.' 
        });
        setTimeout(() => setImportStatus(null), 5000);
      }
    }
  };

  // Get data summary
  const getDataSummary = () => {
    const words = JSON.parse(localStorage.getItem('flodhasten_words') || '[]');
    const progress = JSON.parse(localStorage.getItem('flodhasten_progress') || '{}');
    const achievements = JSON.parse(localStorage.getItem('flodhasten_achievements') || '[]');
    
    return {
      wordsCount: words.length,
      lessonsCompleted: Object.keys(progress).length,
      achievementsUnlocked: achievements.length,
      totalStorage: new Blob([JSON.stringify(collectUserData())]).size
    };
  };

  const summary = getDataSummary();

  return (
    <div className={`fd-settings-page ${isDarkMode ? 'fd-theme-dark' : ''}`}>
      <TopBar
        sticky={false}
        className="mb-4"
        leading={(
          <Button variant="ghost" onClick={onBack} aria-label="Go back" leftIcon={<FaArrowLeft />}>
            Back
          </Button>
        )}
        title={(
          <Stack direction="row" align="center" gap="8px">
            <FaCog style={{ color: 'var(--fd-accent-strong)' }} />
            <Text as="h1" variant="title" serif weight="medium">Settings</Text>
          </Stack>
        )}
      />

      {/* Status Messages */}
      {exportData && (
        <Surface
          bordered
          padding="md"
          tone={exportData.success ? 'success' : 'danger'}
          style={{ marginBottom: '1rem' }}
        >
          <Stack direction="row" align="center" gap="8px">
            {exportData.success ? <FaCheck /> : <FaTimes />}
            <Text as="p" variant="caption" weight="medium">{exportData.message}</Text>
          </Stack>
        </Surface>
      )}

      {importStatus && (
        <Surface
          bordered
          padding="md"
          tone={importStatus.error ? 'danger' : importStatus.success ? 'success' : 'tint'}
          style={{ marginBottom: '1rem' }}
        >
          <Stack direction="row" align="center" gap="8px">
            {importStatus.loading ? <FaCog style={{ animation: 'spin 1s linear infinite' }} /> :
             importStatus.error ? <FaTimes /> : <FaCheck />}
            <Text as="p" variant="caption" weight="medium">{importStatus.message}</Text>
          </Stack>
        </Surface>
      )}

      {/* Data Summary */}
      <Card
        title="Your Data Summary"
        className="mb-6"
        style={{ backgroundColor: cardBg, borderColor: borderColor, marginBottom: '2rem' }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div>
            <strong>Words Learned:</strong> {summary.wordsCount}
          </div>
          <div>
            <strong>Lessons Completed:</strong> {summary.lessonsCompleted}
          </div>
          <div>
            <strong>Achievements:</strong> {summary.achievementsUnlocked}
          </div>
          <div>
            <strong>Storage Used:</strong> {(summary.totalStorage / 1024).toFixed(1)} KB
          </div>
        </div>
      </Card>

      {/* Export Section */}
      <Card
        title="Export Your Progress"
        className="mb-6"
        style={{ backgroundColor: cardBg, borderColor: borderColor, marginBottom: '2rem' }}
      >
        <Text as="p" variant="body" color="secondary" style={{ margin: '0 0 1rem 0' }}>
          Download a backup of all your learning progress, achievements, and settings.
        </Text>
        <Button
          onClick={handleExport}
          leftIcon={<FaDownload />}
        >
          Export Progress
        </Button>
      </Card>

      {/* Import Section */}
      <Card
        title="Import Progress"
        className="mb-6"
        style={{ backgroundColor: cardBg, borderColor: borderColor, marginBottom: '2rem' }}
      >
        <Text as="p" variant="body" color="secondary" style={{ margin: '0 0 1rem 0' }}>
          Restore your progress from a previously exported backup file.
        </Text>
        
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{
            display: 'none'
          }}
          id="import-file"
        />
        
        <label
          htmlFor="import-file"
          className="fd-settings-fileLabel"
        >
          <FaUpload />
          Choose Backup File
        </label>

        {dataPreview && (
          <Surface style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--fd-bg-app)',
            borderRadius: '12px',
            border: `1px solid ${borderColor}`
          }}>
            <Text as="h3" variant="section" serif weight="medium" style={{ marginBottom: '0.5rem' }}>Backup Preview</Text>
            <Text as="p" variant="caption" color="secondary" style={{ margin: '0 0 1rem 0' }}>
              Export date: {new Date(dataPreview.exportDate).toLocaleDateString()}
            </Text>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <div>Words: {dataPreview.words?.length || 0}</div>
              <div>Lessons: {Object.keys(dataPreview.progress || {}).length}</div>
              <div>Achievements: {dataPreview.achievements?.length || 0}</div>
            </div>
            <Button
              onClick={applyImportedData}
              variant="secondary"
              style={{ marginTop: '0.75rem' }}
            >
              Apply Import
            </Button>
          </Surface>
        )}
      </Card>

      {/* Advanced Settings */}
      <Card
        title={(
          <Stack direction="row" align="center" justify="space-between" gap="8px">
            <Text as="h2" variant="section" serif weight="medium">Advanced Settings</Text>
            <Button
              variant="ghost"
              onClick={() => setShowAdvanced(!showAdvanced)}
              aria-label={showAdvanced ? 'Hide advanced settings' : 'Show advanced settings'}
              leftIcon={showAdvanced ? <FaEyeSlash /> : <FaEye />}
            >
              {showAdvanced ? 'Hide' : 'Show'}
            </Button>
          </Stack>
        )}
        className="mb-6"
        style={{ backgroundColor: cardBg, borderColor: borderColor, marginBottom: '2rem' }}
      >
        {showAdvanced && (
          <div>
            <Text as="p" variant="body" color="secondary" style={{ margin: '0 0 1rem 0' }}>
              These actions are irreversible. Please be careful.
            </Text>
            <Button
              onClick={handleClearData}
              variant="destructive"
              leftIcon={<FaTrash />}
            >
              Clear All Data
            </Button>
          </div>
        )}
      </Card>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Settings;
