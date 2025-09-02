import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaDownload, FaUpload, FaTrash, FaCog, FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { fetchWithRetry } from './ErrorBoundary';

const Settings = ({ isDarkMode, onBack }) => {
  const [exportData, setExportData] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dataPreview, setDataPreview] = useState(null);

  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const bgColor = isDarkMode ? '#2d2d2d' : '#f8f9fa';
  const borderColor = isDarkMode ? '#555' : '#e8f4f8';
  const accentColor = '#3498db';
  const cardBg = isDarkMode ? '#3a3a3a' : '#ffffff';

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
    <div style={{
      minHeight: '100vh',
      backgroundColor: bgColor,
      color: textColor,
      padding: '1rem',
      fontFamily: '"Georgia", serif'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: `1px solid ${borderColor}`
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            color: textColor,
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '5px',
            outline: 'none'
          }}
          onFocus={(e) => {
            e.target.style.outline = `2px solid ${accentColor}`;
            e.target.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none';
          }}
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <h1 style={{
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FaCog />
          Settings
        </h1>
      </div>

      {/* Status Messages */}
      {exportData && (
        <div style={{
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '10px',
          backgroundColor: exportData.success ? '#d4edda' : '#f8d7da',
          color: exportData.success ? '#155724' : '#721c24',
          border: `1px solid ${exportData.success ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {exportData.success ? <FaCheck /> : <FaTimes />}
          {exportData.message}
        </div>
      )}

      {importStatus && (
        <div style={{
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '10px',
          backgroundColor: importStatus.error ? '#f8d7da' : 
                         importStatus.success ? '#d4edda' : '#d1ecf1',
          color: importStatus.error ? '#721c24' : 
                 importStatus.success ? '#155724' : '#0c5460',
          border: `1px solid ${importStatus.error ? '#f5c6cb' : 
                              importStatus.success ? '#c3e6cb' : '#bee5eb'}`
        }}>
          {importStatus.loading ? <FaCog style={{ animation: 'spin 1s linear infinite' }} /> :
           importStatus.error ? <FaTimes /> : <FaCheck />}
          {importStatus.message}
        </div>
      )}

      {/* Data Summary */}
      <div style={{
        backgroundColor: cardBg,
        padding: '1.5rem',
        borderRadius: '15px',
        marginBottom: '2rem',
        border: `1px solid ${borderColor}`
      }}>
        <h2 style={{ margin: '0 0 1rem 0', color: accentColor }}>Your Data Summary</h2>
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
      </div>

      {/* Export Section */}
      <div style={{
        backgroundColor: cardBg,
        padding: '1.5rem',
        borderRadius: '15px',
        marginBottom: '2rem',
        border: `1px solid ${borderColor}`
      }}>
        <h2 style={{ margin: '0 0 1rem 0', color: accentColor }}>Export Your Progress</h2>
        <p style={{ margin: '0 0 1rem 0', opacity: 0.8 }}>
          Download a backup of all your learning progress, achievements, and settings.
        </p>
        <button
          onClick={handleExport}
          style={{
            background: accentColor,
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '0.8rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: '"Georgia", serif',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#2980b9';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = accentColor;
            e.target.style.transform = 'scale(1)';
          }}
          onFocus={(e) => {
            e.target.style.outline = `2px solid ${accentColor}`;
            e.target.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none';
          }}
        >
          <FaDownload />
          Export Progress
        </button>
      </div>

      {/* Import Section */}
      <div style={{
        backgroundColor: cardBg,
        padding: '1.5rem',
        borderRadius: '15px',
        marginBottom: '2rem',
        border: `1px solid ${borderColor}`
      }}>
        <h2 style={{ margin: '0 0 1rem 0', color: accentColor }}>Import Progress</h2>
        <p style={{ margin: '0 0 1rem 0', opacity: 0.8 }}>
          Restore your progress from a previously exported backup file.
        </p>
        
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
          style={{
            background: 'transparent',
            color: textColor,
            border: `2px solid ${borderColor}`,
            borderRadius: '10px',
            padding: '0.8rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: '"Georgia", serif',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = isDarkMode ? '#3a3a3a' : '#e8f4f8';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.transform = 'scale(1)';
          }}
          onFocus={(e) => {
            e.target.style.outline = `2px solid ${accentColor}`;
            e.target.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none';
          }}
        >
          <FaUpload />
          Choose Backup File
        </label>

        {dataPreview && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f9fa',
            borderRadius: '10px',
            border: `1px solid ${borderColor}`
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Backup Preview</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>
              Export date: {new Date(dataPreview.exportDate).toLocaleDateString()}
            </p>
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
            <button
              onClick={applyImportedData}
              style={{
                background: '#27ae60',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.6rem 1rem',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: '"Georgia", serif',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#229954';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#27ae60';
                e.target.style.transform = 'scale(1)';
              }}
              onFocus={(e) => {
                e.target.style.outline = `2px solid ${accentColor}`;
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.target.style.outline = 'none';
              }}
            >
              Apply Import
            </button>
          </div>
        )}
      </div>

      {/* Advanced Settings */}
      <div style={{
        backgroundColor: cardBg,
        padding: '1.5rem',
        borderRadius: '15px',
        marginBottom: '2rem',
        border: `1px solid ${borderColor}`
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <h2 style={{ margin: 0, color: accentColor }}>Advanced Settings</h2>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            style={{
              background: 'transparent',
              border: 'none',
              color: textColor,
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '5px',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.outline = `2px solid ${accentColor}`;
              e.target.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.target.style.outline = 'none';
            }}
            aria-label={showAdvanced ? 'Hide advanced settings' : 'Show advanced settings'}
          >
            {showAdvanced ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {showAdvanced && (
          <div>
            <p style={{ margin: '0 0 1rem 0', opacity: 0.8 }}>
              These actions are irreversible. Please be careful.
            </p>
            <button
              onClick={handleClearData}
              style={{
                background: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '0.8rem 1.5rem',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: '"Georgia", serif',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#c0392b';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#e74c3c';
                e.target.style.transform = 'scale(1)';
              }}
              onFocus={(e) => {
                e.target.style.outline = `2px solid ${accentColor}`;
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.target.style.outline = 'none';
              }}
            >
              <FaTrash />
              Clear All Data
            </button>
          </div>
        )}
      </div>

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
