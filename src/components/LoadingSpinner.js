import React from 'react';

const LoadingSpinner = ({ 
  message = 'Loading...', 
  isDarkMode = false, 
  type = 'spinner',
  progress = null 
}) => {
  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const spinnerColor = isDarkMode ? '#3498db' : '#3498db';
  const bgColor = isDarkMode ? '#2d2d2d' : '#f8f9fa';

  const renderSpinner = () => {
    switch (type) {
      case 'dots':
        return (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {[0, 1, 2].map(i => (
              <div
                key={i}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: spinnerColor,
                  animation: `bounce 1.4s ease-in-out infinite both`,
                  animationDelay: `${i * 0.16}s`
                }}
              />
            ))}
          </div>
        );
      case 'pulse':
        return (
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: spinnerColor,
            animation: 'pulse 1.5s ease-in-out infinite',
            marginBottom: '1rem'
          }} />
        );
      case 'progress':
        return (
          <div style={{
            width: '200px',
            height: '8px',
            backgroundColor: isDarkMode ? '#555' : '#e8f4f8',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: `${progress || 0}%`,
              height: '100%',
              backgroundColor: spinnerColor,
              borderRadius: '4px',
              transition: 'width 0.3s ease',
              animation: progress === null ? 'shimmer 2s infinite' : 'none'
            }} />
          </div>
        );
      default:
        return (
          <div style={{
            width: '40px',
            height: '40px',
            border: `3px solid ${isDarkMode ? '#555' : '#e8f4f8'}`,
            borderTop: `3px solid ${spinnerColor}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem'
          }} />
        );
    }
  };

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
      borderRadius: '15px',
      boxShadow: isDarkMode 
        ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
        : '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Hippo mascot */}
      <div style={{
        fontSize: '2.5rem',
        marginBottom: '1rem',
        animation: 'float 2s ease-in-out infinite'
      }}>
        🦛
      </div>
      
      {renderSpinner()}
      
      <p style={{
        margin: '0',
        fontSize: '1rem',
        fontFamily: '"Georgia", serif',
        textAlign: 'center',
        maxWidth: '300px'
      }}>
        {message}
      </p>
      
      {progress !== null && (
        <p style={{
          margin: '0.5rem 0 0 0',
          fontSize: '0.9rem',
          color: isDarkMode ? '#bdc3c7' : '#7f8c8d',
          fontFamily: '"Georgia", serif'
        }}>
          {progress}% complete
        </p>
      )}
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes bounce {
            0%, 80%, 100% { 
              transform: scale(0);
              opacity: 0.5;
            }
            40% { 
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes pulse {
            0% { 
              transform: scale(0.8);
              opacity: 0.5;
            }
            50% { 
              transform: scale(1.2);
              opacity: 1;
            }
            100% { 
              transform: scale(0.8);
              opacity: 0.5;
            }
          }
          
          @keyframes shimmer {
            0% { 
              transform: translateX(-100%);
              opacity: 0.3;
            }
            50% { 
              opacity: 1;
            }
            100% { 
              transform: translateX(100%);
              opacity: 0.3;
            }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner; 