import React from 'react';
import { Surface, Text } from '../design/components';
import '../design/patterns/shared-ui.css';

const LoadingSpinner = ({
  message = 'Loading...',
  isDarkMode = false,
  type = 'spinner',
  progress = null
}) => {
  const renderSpinner = () => {
    switch (type) {
      case 'dots':
        return (
          <div className="fd-loading-dots" aria-hidden="true">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="fd-loading-dot"
                style={{ animationDelay: `${i * 0.16}s` }}
              />
            ))}
          </div>
        );
      case 'pulse':
        return (
          <div
            aria-hidden="true"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--fd-accent-strong)',
              animation: 'fd-loading-pulse 1.5s ease-in-out infinite',
              marginBottom: '1rem'
            }}
          />
        );
      case 'progress':
        return (
          <div className="fd-loading-progressTrack" aria-hidden="true">
            <div
              className="fd-loading-progressFill"
              style={{
                width: `${progress || 0}%`,
                animation: progress === null ? 'fd-loading-shimmer 2s infinite' : 'none'
              }}
            />
          </div>
        );
      default:
        return <div className="fd-loading-spinner" aria-hidden="true" />;
    }
  };

  return (
    <Surface
      elevation="medium"
      bordered
      padding="lg"
      className={`fd-loading-card ${isDarkMode ? 'fd-theme-dark' : ''}`}
      role="status"
      aria-live="polite"
    >
      <div
        style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          animation: 'fd-loading-float 2s ease-in-out infinite'
        }}
        aria-hidden="true"
      >
        🦛
      </div>

      {renderSpinner()}

      <Text as="p" variant="body" serif style={{ margin: 0, textAlign: 'center', maxWidth: '300px' }}>
        {message}
      </Text>

      {progress !== null && (
        <Text as="p" variant="caption" color="secondary" serif style={{ margin: '0.5rem 0 0 0' }}>
          {progress}% complete
        </Text>
      )}

      <style>
        {`
          @keyframes fd-loading-pulse {
            0% { transform: scale(0.8); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(0.8); opacity: 0.5; }
          }

          @keyframes fd-loading-shimmer {
            0% { transform: translateX(-100%); opacity: 0.3; }
            50% { opacity: 1; }
            100% { transform: translateX(100%); opacity: 0.3; }
          }

          @keyframes fd-loading-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </Surface>
  );
};

export default LoadingSpinner;
