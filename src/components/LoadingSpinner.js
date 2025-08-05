import React from 'react';

const LoadingSpinner = ({ message = 'Loading...', isDarkMode = false }) => {
  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const spinnerColor = isDarkMode ? '#3498db' : '#3498db';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      minHeight: '200px',
      color: textColor
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: `3px solid ${isDarkMode ? '#555' : '#e8f4f8'}`,
        borderTop: `3px solid ${spinnerColor}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem'
      }} />
      <p style={{
        margin: '0',
        fontSize: '1rem',
        fontFamily: '"Georgia", serif'
      }}>
        {message}
      </p>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner; 