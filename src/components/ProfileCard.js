import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const ProfileCard = ({
  name,
  title,
  handle,
  status,
  contactText,
  avatarUrl,
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick,
  children,
  style = {},
  className = ''
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (event) => {
    if (!enableTilt || (!enableMobileTilt && window.innerWidth <= 768)) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseXValue = (event.clientX - centerX) / (rect.width / 2);
    const mouseYValue = (event.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(mouseXValue);
    mouseY.set(mouseYValue);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className={`profile-card ${className}`}
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '2rem',
        color: 'white',
        cursor: 'pointer',
        ...style
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      animate={{
        rotateX: enableTilt && (enableMobileTilt || window.innerWidth > 768) ? springRotateX : 0,
        rotateY: enableTilt && (enableMobileTilt || window.innerWidth > 768) ? springRotateY : 0,
      }}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* Glow effect */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          pointerEvents: 'none'
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {children || (
        <>
          {/* Avatar */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '2rem',
                border: '3px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt={name}
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                name?.charAt(0)?.toUpperCase() || 'U'
              )}
            </div>
          </div>

          {/* User Info */}
          {showUserInfo && (
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {name}
              </h3>
              <p style={{ margin: '0 0 0.5rem 0', opacity: 0.8, fontSize: '1rem' }}>
                {title}
              </p>
              <p style={{ margin: '0 0 0.5rem 0', opacity: 0.6, fontSize: '0.9rem' }}>
                @{handle}
              </p>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '0.25rem 0.75rem',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '15px',
                fontSize: '0.8rem'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: status === 'Online' ? '#4CAF50' : '#FF9800'
                }} />
                {status}
              </div>
            </div>
          )}

          {/* Contact Button */}
          {contactText && onContactClick && (
            <motion.button
              onClick={onContactClick}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
              whileHover={{ 
                background: 'rgba(255, 255, 255, 0.3)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {contactText}
            </motion.button>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileCard; 