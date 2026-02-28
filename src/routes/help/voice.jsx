/* eslint-disable no-unused-vars */
import React from 'react';
import { useSpeechSupport } from '../../features/speech/useSpeechSupport';
import { FaMicrophone, FaMicrophoneSlash, FaChrome, FaSafari, FaFirefox, FaEdge } from 'react-icons/fa';
import { MdHelp, MdCheckCircle, MdError } from 'react-icons/md';

const VoiceSupportHelp = () => {
  const speechSupport = useSpeechSupport();

  const browserIcons = {
    Chrome: FaChrome,
    Safari: FaSafari,
    Firefox: FaFirefox,
    Edge: FaEdge
  };

  const BrowserIcon = browserIcons[speechSupport.browser] || FaChrome;

  return (
    <div className="voice-help-container" style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Inter, sans-serif',
      lineHeight: '1.6'
    }}>
      <div className="help-header" style={{
        textAlign: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '1px solid #e9ecef'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>
          {speechSupport.isSupported ? <FaMicrophone style={{ color: '#28a745' }} /> : <FaMicrophoneSlash style={{ color: '#dc3545' }} />}
        </div>
        <h1 style={{ 
          margin: '0 0 10px 0',
          color: '#002f6c',
          fontSize: '28px',
          fontWeight: '600'
        }}>
          Voice Recognition Support
        </h1>
        <p style={{ 
          margin: '0',
          color: '#6c757d',
          fontSize: '16px'
        }}>
          Learn about voice recognition capabilities in your browser
        </p>
      </div>

      {/* Current Status */}
      <div className="status-section" style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: speechSupport.isSupported ? '#d4edda' : '#f8d7da',
        borderRadius: '12px',
        border: `1px solid ${speechSupport.isSupported ? '#c3e6cb' : '#f5c6cb'}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          {speechSupport.isSupported ? 
            <MdCheckCircle style={{ color: '#155724', fontSize: '24px', marginRight: '10px' }} /> :
            <MdError style={{ color: '#721c24', fontSize: '24px', marginRight: '10px' }} />
          }
          <h2 style={{ 
            margin: '0',
            color: speechSupport.isSupported ? '#155724' : '#721c24',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            {speechSupport.isSupported ? 'Voice Recognition Supported' : 'Voice Recognition Not Supported'}
          </h2>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <BrowserIcon style={{ marginRight: '10px', fontSize: '20px' }} />
          <span style={{ fontWeight: '500' }}>Browser: {speechSupport.browser}</span>
        </div>
        
        {speechSupport.isSupported && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaMicrophone style={{ marginRight: '10px', color: '#28a745' }} />
            <span>Microphone access: {speechSupport.isAvailable ? 'Available' : 'Not available'}</span>
          </div>
        )}
      </div>

      {/* Browser Support Table */}
      <div className="browser-support" style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          color: '#002f6c',
          fontSize: '20px',
          marginBottom: '15px',
          fontWeight: '600'
        }}>
          Browser Compatibility
        </h3>
        
        <div style={{
          overflowX: 'auto',
          border: '1px solid #e9ecef',
          borderRadius: '8px'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e9ecef' }}>Browser</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e9ecef' }}>Desktop Support</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e9ecef' }}>Mobile Support</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e9ecef' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaChrome style={{ marginRight: '8px', color: '#4285f4' }} />
                    Chrome
                  </div>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  <span style={{ color: '#28a745', fontWeight: '500' }}>✓ Supported</span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  <span style={{ color: '#28a745', fontWeight: '500' }}>✓ Supported</span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontSize: '13px' }}>
                  Best support, requires HTTPS
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaFirefox style={{ marginRight: '8px', color: '#ff6b35' }} />
                    Firefox
                  </div>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  <span style={{ color: '#28a745', fontWeight: '500' }}>✓ Supported</span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  <span style={{ color: '#dc3545', fontWeight: '500' }}>✗ Not Supported</span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontSize: '13px' }}>
                  Desktop only, requires HTTPS
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaSafari style={{ marginRight: '8px', color: '#007aff' }} />
                    Safari
                  </div>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  <span style={{ color: '#28a745', fontWeight: '500' }}>✓ Supported</span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  <span style={{ color: '#dc3545', fontWeight: '500' }}>✗ Not Supported</span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontSize: '13px' }}>
                  iOS Safari doesn't support Web Speech API
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaEdge style={{ marginRight: '8px', color: '#0078d4' }} />
                    Edge
                  </div>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  <span style={{ color: '#28a745', fontWeight: '500' }}>✓ Supported</span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  <span style={{ color: '#28a745', fontWeight: '500' }}>✓ Supported</span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontSize: '13px' }}>
                  Good support on Windows
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Fallback Options */}
      <div className="fallback-options" style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          color: '#002f6c',
          fontSize: '20px',
          marginBottom: '15px',
          fontWeight: '600'
        }}>
          Alternative Learning Methods
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{
            padding: '20px',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#002f6c', fontSize: '16px' }}>
              Multiple Choice
            </h4>
            <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
              Select the correct answer from multiple options. Available on all devices and browsers.
            </p>
          </div>
          
          <div style={{
            padding: '20px',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#002f6c', fontSize: '16px' }}>
              Text Input
            </h4>
            <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
              Type your answer using the keyboard. Works on all devices and browsers.
            </p>
          </div>
          
          <div style={{
            padding: '20px',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#002f6c', fontSize: '16px' }}>
              Voice Recognition
            </h4>
            <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
              Speak your answer using the microphone. Requires supported browser and HTTPS.
            </p>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="troubleshooting" style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          color: '#002f6c',
          fontSize: '20px',
          marginBottom: '15px',
          fontWeight: '600'
        }}>
          Troubleshooting
        </h3>
        
        <div style={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '8px', padding: '20px' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#856404', fontSize: '16px' }}>
            Common Issues and Solutions
          </h4>
          
          <ul style={{ margin: '0', paddingLeft: '20px', color: '#856404' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Microphone not working:</strong> Check browser permissions and ensure HTTPS is enabled
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>iOS Safari:</strong> Voice recognition is not supported, use multiple choice instead
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Firefox mobile:</strong> Voice recognition is not supported, use text input
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Permission denied:</strong> Allow microphone access when prompted by the browser
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>HTTPS required:</strong> Voice recognition only works on secure connections
            </li>
          </ul>
        </div>
      </div>

      {/* Current Fallback Mode */}
      {speechSupport.fallbackMode !== 'none' && (
        <div className="current-mode" style={{
          padding: '15px',
          backgroundColor: '#e2e3e5',
          border: '1px solid #d6d8db',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ margin: '0', color: '#495057', fontWeight: '500' }}>
            Your browser is using <strong>{speechSupport.fallbackMode.replace('-', ' ')}</strong> mode for voice exercises.
          </p>
        </div>
      )}

      {/* Back Button */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          onClick={() => window.history.back()}
          style={{
            padding: '12px 24px',
            backgroundColor: '#002f6c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          ← Back to App
        </button>
      </div>
    </div>
  );
};

export default VoiceSupportHelp;
