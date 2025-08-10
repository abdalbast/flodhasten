import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UserFeedback = ({ 
  type = 'info', 
  message, 
  isVisible, 
  onClose, 
  duration = 5000,
  isDarkMode = false 
}) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsShowing(false);
          setTimeout(() => onClose && onClose(), 300);
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, duration, onClose]);

  const getFeedbackStyles = () => {
    const baseStyles = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      padding: '1rem 1.5rem',
      borderRadius: '12px',
      boxShadow: isDarkMode 
        ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
        : '0 8px 32px rgba(0, 0, 0, 0.15)',
      maxWidth: '400px',
      fontFamily: '"Georgia", serif',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      cursor: 'pointer',
      border: '1px solid',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)'
    };

    switch (type) {
      case 'success':
        return {
          ...baseStyles,
          backgroundColor: isDarkMode ? 'rgba(39, 174, 96, 0.9)' : 'rgba(39, 174, 96, 0.95)',
          color: '#ffffff',
          borderColor: isDarkMode ? '#27ae60' : '#2ecc71'
        };
      case 'error':
        return {
          ...baseStyles,
          backgroundColor: isDarkMode ? 'rgba(231, 76, 60, 0.9)' : 'rgba(231, 76, 60, 0.95)',
          color: '#ffffff',
          borderColor: isDarkMode ? '#e74c3c' : '#e74c3c'
        };
      case 'warning':
        return {
          ...baseStyles,
          backgroundColor: isDarkMode ? 'rgba(243, 156, 18, 0.9)' : 'rgba(243, 156, 18, 0.95)',
          color: '#ffffff',
          borderColor: isDarkMode ? '#f39c12' : '#f39c12'
        };
      case 'info':
      default:
        return {
          ...baseStyles,
          backgroundColor: isDarkMode ? 'rgba(52, 152, 219, 0.9)' : 'rgba(52, 152, 219, 0.95)',
          color: '#ffffff',
          borderColor: isDarkMode ? '#3498db' : '#3498db'
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  const handleClick = () => {
    setIsShowing(false);
    setTimeout(() => onClose && onClose(), 300);
  };

  return (
    <AnimatePresence>
      {isShowing && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 25 
          }}
          style={getFeedbackStyles()}
          onClick={handleClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span style={{ fontSize: '1.2rem' }}>
            {getIcon()}
          </span>
          <div style={{ flex: 1 }}>
            <p style={{ 
              margin: 0, 
              fontSize: '0.95rem', 
              lineHeight: '1.4',
              fontWeight: '500'
            }}>
              {message}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '0',
              opacity: 0.7,
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.7'}
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Toast notification system
export const ToastContainer = ({ children, isDarkMode }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      {children}
    </div>
  );
};

export default UserFeedback;
