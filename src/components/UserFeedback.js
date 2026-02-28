import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Surface, Text } from '../design/components';
import '../design/patterns/shared-ui.css';

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
    return undefined;
  }, [isVisible, duration, onClose]);

  const toneMap = {
    success: { bg: 'rgba(39, 174, 96, 0.94)', border: '#27ae60' },
    error: { bg: 'rgba(231, 76, 60, 0.94)', border: '#e74c3c' },
    warning: { bg: 'rgba(243, 156, 18, 0.94)', border: '#f39c12' },
    info: { bg: 'rgba(52, 152, 219, 0.94)', border: '#3498db' }
  };
  const tone = toneMap[type] || toneMap.info;

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
          className={`fd-feedback-host ${isDarkMode ? 'fd-theme-dark' : ''}`}
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Surface
              elevation="high"
              bordered
              padding="md"
              className="fd-feedback-card"
              onClick={handleClick}
              role="status"
              aria-live="polite"
              style={{
                color: '#fff',
                background: tone.bg,
                borderColor: tone.border,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
            >
              <span style={{ fontSize: '1.2rem' }} aria-hidden="true">
                {getIcon()}
              </span>
              <div style={{ flex: 1 }}>
                <Text as="p" variant="caption" weight="medium" style={{ margin: 0, color: 'inherit' }}>
                  {message}
                </Text>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                className="fd-feedback-close"
                type="button"
                aria-label="Close notification"
              >
                ×
              </button>
            </Surface>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ToastContainer = ({ children, isDarkMode }) => (
  <div
    className={`fd-feedback-host ${isDarkMode ? 'fd-theme-dark' : ''}`}
    style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
  >
    {children}
  </div>
);

export default UserFeedback;
