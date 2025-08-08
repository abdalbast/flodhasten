import React from 'react';

const LoadingSpinner = ({ 
  message = 'Loading...', 
  isDarkMode = false, 
  size = 'medium',
  showProgress = false,
  progress = 0 
}) => {
  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const spinnerColor = isDarkMode ? '#3498db' : '#3498db';
  const bgColor = isDarkMode ? '#2d2d2d' : '#f8f9fa';

  const sizeMap = {
    small: { width: 24, height: 24, borderWidth: 2 },
    medium: { width: 40, height: 40, borderWidth: 3 },
    large: { width: 60, height: 60, borderWidth: 4 }
  };

  const spinnerSize = sizeMap[size];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      minHeight: '200px',
      color: textColor,
      backgroundColor: bgColor,
      borderRadius: '12px',
      boxShadow: isDarkMode 
        ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
        : '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Moomin-inspired loading animation */}
      <div style={{
        position: 'relative',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          width: spinnerSize.width,
          height: spinnerSize.height,
          border: `${spinnerSize.borderWidth}px solid ${isDarkMode ? '#555' : '#e8f4f8'}`,
          borderTop: `${spinnerSize.borderWidth}px solid ${spinnerColor}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          position: 'relative'
        }} />
        
        {/* Floating hippo animation */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: `${spinnerSize.width * 0.4}px`,
          animation: 'float 2s ease-in-out infinite'
        }}>
          🦛
        </div>
      </div>

      <p style={{
        margin: '0 0 1rem 0',
        fontSize: '1rem',
        fontFamily: '"Georgia", serif',
        fontWeight: '500'
      }}>
        {message}
      </p>

      {/* Progress bar for loading states */}
      {showProgress && (
        <div style={{
          width: '200px',
          height: '6px',
          backgroundColor: isDarkMode ? '#555' : '#e8f4f8',
          borderRadius: '3px',
          overflow: 'hidden',
          marginTop: '0.5rem'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: spinnerColor,
            borderRadius: '3px',
            transition: 'width 0.3s ease',
            animation: 'progressPulse 1.5s ease-in-out infinite'
          }} />
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes float {
            0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
            50% { transform: translate(-50%, -50%) translateY(-8px); }
          }
          
          @keyframes progressPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner; 