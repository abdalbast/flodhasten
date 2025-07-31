import React from 'react';
import { designTokens, accessibility } from '../../styles/designSystem';

// Skip Link Component
export const SkipLink = React.memo(({ targetId, children = 'Skip to main content' }) => {
  const skipLinkStyle = {
    ...accessibility.srOnly,
    ...accessibility.focusRing,
    position: 'absolute',
    top: designTokens.spacing[4],
    left: designTokens.spacing[4],
    zIndex: designTokens.zIndex.skipLink,
    padding: `${designTokens.spacing[2]} ${designTokens.spacing[4]}`,
    backgroundColor: designTokens.colors.primary[500],
    color: 'white',
    textDecoration: 'none',
    borderRadius: designTokens.borderRadius.md,
    '&:focus': {
      position: 'static',
      clip: 'auto',
      width: 'auto',
      height: 'auto'
    }
  };

  return (
    <a href={`#${targetId}`} style={skipLinkStyle}>
      {children}
    </a>
  );
});

// Screen Reader Only Text
export const SrOnly = React.memo(({ children }) => (
  <span style={accessibility.srOnly}>
    {children}
  </span>
));

// Focus Trap Component
export const FocusTrap = React.memo(({ children, isActive = false }) => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (firstElement) {
      firstElement.focus();
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
});

// Live Region for Announcements
export const LiveRegion = React.memo(({ 
  children, 
  'aria-live': ariaLive = 'polite',
  'aria-atomic': ariaAtomic = true 
}) => {
  const liveRegionStyle = {
    ...accessibility.srOnly,
    position: 'absolute',
    left: '-10000px',
    width: '1px',
    height: '1px',
    overflow: 'hidden'
  };

  return (
    <div 
      style={liveRegionStyle}
      aria-live={ariaLive}
      aria-atomic={ariaAtomic}
      role="status"
    >
      {children}
    </div>
  );
});

// High Contrast Text Component
export const HighContrastText = React.memo(({ 
  children, 
  isDarkMode = false,
  className = '',
  ...props 
}) => {
  const textColor = accessibility.getTextColor('background', isDarkMode);
  
  const textStyle = {
    color: textColor,
    fontWeight: designTokens.typography.fontWeight.medium
  };

  return (
    <span style={textStyle} className={className} {...props}>
      {children}
    </span>
  );
});

// Loading Spinner with Accessibility
export const LoadingSpinner = React.memo(({ 
  size = 'md',
  'aria-label': ariaLabel = 'Loading',
  className = '',
  ...props 
}) => {
  const sizeMap = {
    sm: '16px',
    md: '24px',
    lg: '32px'
  };

  const spinnerStyle = {
    width: sizeMap[size],
    height: sizeMap[size],
    border: `2px solid ${designTokens.colors.neutral[300]}`,
    borderTop: `2px solid ${designTokens.colors.primary[500]}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    display: 'inline-block'
  };

  return (
    <div 
      style={spinnerStyle} 
      className={className}
      role="status"
      aria-label={ariaLabel}
      {...props}
    >
      <SrOnly>{ariaLabel}</SrOnly>
    </div>
  );
});

// Progress Bar with Accessibility
export const ProgressBar = React.memo(({ 
  value, 
  max = 100,
  'aria-label': ariaLabel,
  className = '',
  ...props 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const containerStyle = {
    width: '100%',
    height: '8px',
    backgroundColor: designTokens.colors.neutral[200],
    borderRadius: designTokens.borderRadius.full,
    overflow: 'hidden'
  };

  const progressStyle = {
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: designTokens.colors.primary[500],
    borderRadius: designTokens.borderRadius.full,
    transition: 'width 0.3s ease'
  };

  return (
    <div 
      style={containerStyle} 
      className={className}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
      {...props}
    >
      <div style={progressStyle} />
    </div>
  );
});

// CSS for spinner animation
const spinnerCSS = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = spinnerCSS;
  document.head.appendChild(style);
} 