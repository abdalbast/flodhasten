import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './LessonCard.css';

// City background images - using direct paths
const gothenburgImage = '/gothenburg.jpg';
const stockholmImage = '/stockholm.jpg';

const springValues = {
  damping: 25,
  stiffness: 150,
  mass: 1,
};

const LessonCard = React.memo(({
  lesson,
  index,
  progress,
  isUnlocked,
  isCompleted,
  isInProgress,
  onLessonClick,
  isDarkMode,
  enableTilt = true,
  enableMobileTilt = false
}) => {
  // Check if this lesson should use the TiltedCard effect
  const shouldUseTiltedEffect = lesson.id.startsWith('lesson') && parseInt(lesson.id.replace('lesson', '')) <= 12;

  // Get background image for specific lessons
  const getBackgroundImage = () => {
    if (lesson.id === 'lesson1') {
      return gothenburgImage;
    } else if (lesson.id === 'lesson2') {
      return stockholmImage;
    }
    return null;
  };

  const backgroundImage = getBackgroundImage();
  


  // All hooks must be called at the top level
  const ref = useRef(null);
  const x = useMotionValue();
  const y = useMotionValue();
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  // Original implementation hooks (for non-tilted cards)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const originalRotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const originalRotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const springConfig = { damping: 20, stiffness: 200 };
  const springRotateX = useSpring(originalRotateX, springConfig);
  const springRotateY = useSpring(originalRotateY, springConfig);

  const [lastY, setLastY] = useState(0);

  // Moomin-inspired colour palette - Enhanced for accessibility
  const textColor = isDarkMode ? '#ffffff' : '#1a202c'; // Improved contrast
  const cardBackground = isDarkMode ? '#2d3748' : '#ffffff'; // Better dark mode contrast
  const borderColor = isDarkMode ? '#4a5568' : '#e2e8f0'; // Enhanced border contrast
  const lessonColor = isDarkMode ? '#ff6b35' : '#e67e22';
  const completedColor = isDarkMode ? '#48bb78' : '#38a169'; // Better green contrast
  const lockedColor = isDarkMode ? '#a0aec0' : '#cbd5e0'; // Improved locked state contrast
  
  // Moomin-inspired accent colours
  const moominBlue = '#3498db';
  const moominGreen = '#27ae60';
  const moominYellow = '#f1c40f';

  function handleMouse(e) {
    if (!shouldUseTiltedEffect || !isUnlocked || (!enableMobileTilt && window.innerWidth <= 768)) return;

    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -12;
    const rotationY = (offsetX / (rect.width / 2)) * 12;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    if (!shouldUseTiltedEffect || !isUnlocked) return;
    scale.set(1.1);
    opacity.set(1);
  }

  function handleMouseLeave() {
    if (!shouldUseTiltedEffect) return;
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  const handleClick = () => {
    if (isUnlocked) {
      onLessonClick(lesson.id);
    }
  };

  // Enhanced touch handling for mobile
  const handleTouchStart = (e) => {
    if (!isUnlocked) return;
    
    // Add touch feedback
    e.currentTarget.style.transform = 'scale(0.98)';
  };

  const handleTouchEnd = (e) => {
    if (!isUnlocked) return;
    
    // Remove touch feedback
    e.currentTarget.style.transform = '';
  };

  const handleMouseMove = (event) => {
    if (!enableTilt || (!enableMobileTilt && window.innerWidth <= 768) || !isUnlocked) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseXValue = (event.clientX - centerX) / (rect.width / 2);
    const mouseYValue = (event.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(mouseXValue);
    mouseY.set(mouseYValue);
  };

  const handleOriginalMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // If using TiltedCard effect, render with figure element
  if (shouldUseTiltedEffect) {
    return (
              <figure
          ref={ref}
          className="lesson-card-figure focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-2xl"
          style={{
            width: '100%',
            height: 'auto',
            minHeight: '200px',
            perspective: '800px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'stretch',
            cursor: isUnlocked ? 'pointer' : 'not-allowed',
            opacity: isUnlocked ? 1 : 0.6,
          }}
          onMouseMove={handleMouse}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
          tabIndex={isUnlocked ? 0 : -1}
          role="button"
          aria-label={`${lesson.name} lesson - ${isCompleted ? 'Completed' : isInProgress ? `${progress}% complete` : isUnlocked ? 'Ready to start' : 'Locked'}`}
          aria-pressed={false}
        >
        <motion.div
          className="lesson-card-inner"
          style={{
            width: '100%',
            height: '100%',
            minHeight: '200px',
            rotateX,
            rotateY,
            scale,
            position: 'relative',
            transformStyle: 'preserve-3d',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '1.5rem',
            background: backgroundImage 
              ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`
              : cardBackground,
            backgroundSize: backgroundImage ? 'cover' : 'auto',
            backgroundPosition: backgroundImage ? 'center' : 'auto',
            borderRadius: '25px',
            border: `3px solid ${isCompleted ? completedColor : isUnlocked ? lessonColor : borderColor}`,
            overflow: 'hidden',
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
              borderRadius: '25px',
              background: isCompleted 
                ? 'linear-gradient(135deg, rgba(39, 174, 96, 0.1) 0%, rgba(39, 174, 96, 0.05) 100%)'
                : isUnlocked 
                  ? 'linear-gradient(135deg, rgba(230, 126, 34, 0.1) 0%, rgba(230, 126, 34, 0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(189, 195, 199, 0.1) 0%, rgba(189, 195, 199, 0.05) 100%)',
              pointerEvents: 'none'
            }}
            initial={{ opacity: 0 }}
            whileHover={isUnlocked ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
          />

          {/* Moomin-inspired decorative elements */}
          <motion.div 
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              width: '25px',
              height: '25px',
              background: isCompleted ? moominGreen : moominBlue,
              borderRadius: '50%',
              opacity: isUnlocked ? 1 : 0.3
            }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          {/* Lesson Circle - Enhanced Visual Prominence */}
          <motion.div 
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-full"
            style={{
              position: 'relative',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: isCompleted ? completedColor : isUnlocked ? lessonColor : lockedColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '1.5rem',
              border: `4px solid ${isDarkMode ? '#fff' : '#000'}`,
              boxShadow: isCompleted 
                ? '0 0 30px rgba(39, 174, 96, 0.7)' 
                : isUnlocked 
                  ? '0 0 30px rgba(230, 126, 34, 0.5)' 
                  : '0 0 15px rgba(156, 163, 175, 0.3)',
              filter: isUnlocked ? 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' : 'none',
              flexShrink: 0
            }}
            whileHover={isUnlocked ? { scale: 1.05 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Lesson Number - Enhanced Typography */}
            <span style={{
              fontSize: '1.8rem',
              fontWeight: '800',
              color: isDarkMode ? '#fff' : '#000',
              fontFamily: '"Georgia", serif',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}>
              {index + 1}
            </span>
            
            {/* Progress Ring for in-progress lessons */}
            {isInProgress && (
              <svg
                style={{
                  position: 'absolute',
                  top: '-4px',
                  left: '-4px',
                  width: '78px',
                  height: '78px',
                  transform: 'rotate(-90deg)'
                }}
              >
                <circle
                  cx="39"
                  cy="39"
                  r="32"
                  fill="none"
                  stroke={moominYellow}
                  strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 32 * progress / 100} ${2 * Math.PI * 32}`}
                />
              </svg>
            )}
            
            {/* Completion Checkmark */}
            {isCompleted && (
              <span style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                fontSize: '1.2rem',
                color: '#fff',
                background: completedColor,
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                ✓
              </span>
            )}
          </motion.div>
          
          {/* Text Content Container */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1
          }}>
            {/* Lesson Name - Enhanced Visual Hierarchy */}
            <h3 className="font-bold text-[1.4rem]" style={{
              fontWeight: '700',
              color: backgroundImage ? '#ffffff' : textColor,
              margin: '0 0 0.5rem 0',
              textAlign: 'left',
              lineHeight: '1.2',
              fontFamily: '"Georgia", serif',
              textShadow: backgroundImage ? '0 2px 4px rgba(0, 0, 0, 0.9)' : 'none',
              letterSpacing: '0.02em'
            }}>
              {lesson.name}
            </h3>
            
            {/* Progress Indicator - Enhanced Visual Prominence */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {/* Progress Status Icon */}
              <span style={{
                fontSize: '1rem',
                color: backgroundImage ? '#ffffff' : (isCompleted ? completedColor : isUnlocked ? lessonColor : '#9ca3af'),
                textShadow: backgroundImage ? '0 1px 2px rgba(0, 0, 0, 0.8)' : 'none'
              }}>
                {isCompleted ? '✓' : isInProgress ? '⏳' : isUnlocked ? '▶' : '🔒'}
              </span>
              
              {/* Progress Text - Reduced Size for Better Hierarchy */}
              <p className="text-[0.8rem] text-white/80" style={{
                color: backgroundImage ? '#ffffff' : (isDarkMode ? '#a0aec0' : '#4a5568'),
                margin: '0',
                textAlign: 'left',
                fontFamily: '"Georgia", serif',
                fontStyle: 'italic',
                fontWeight: '500',
                textShadow: backgroundImage ? '0 1px 2px rgba(0, 0, 0, 0.8)' : 'none',
                opacity: 0.95
              }}>
                {isCompleted ? 'Completed' : isInProgress ? `${progress}% Complete` : isUnlocked ? 'Ready to Start' : 'Locked'}
              </p>
            </div>
          </div>
        </motion.div>
      </figure>
    );
  }

  // Original implementation for other lessons
  return (
    <motion.div
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-2xl"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        background: cardBackground,
        borderRadius: '25px',
        border: `3px solid ${isCompleted ? completedColor : isUnlocked ? lessonColor : borderColor}`,
        cursor: isUnlocked ? 'pointer' : 'not-allowed',
        opacity: isUnlocked ? 1 : 0.6,
        position: 'relative',
        overflow: 'hidden',
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleOriginalMouseLeave}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      whileHover={isUnlocked ? { 
        scale: 1.05,
        boxShadow: isDarkMode 
          ? '0 20px 40px rgba(0,0,0,0.4)' 
          : '0 20px 40px rgba(52, 152, 219, 0.25)'
      } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      animate={{
        rotateX: enableTilt && (enableMobileTilt || window.innerWidth > 768) && isUnlocked ? springRotateX : 0,
        rotateY: enableTilt && (enableMobileTilt || window.innerWidth > 768) && isUnlocked ? springRotateY : 0,
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
          borderRadius: '25px',
          background: isCompleted 
            ? 'linear-gradient(135deg, rgba(39, 174, 96, 0.1) 0%, rgba(39, 174, 96, 0.05) 100%)'
            : isUnlocked 
              ? 'linear-gradient(135deg, rgba(230, 126, 34, 0.1) 0%, rgba(230, 126, 34, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(189, 195, 199, 0.1) 0%, rgba(189, 195, 199, 0.05) 100%)',
          pointerEvents: 'none'
        }}
        initial={{ opacity: 0 }}
        whileHover={isUnlocked ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      />

      {/* Moomin-inspired decorative elements */}
      <motion.div 
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          width: '25px',
          height: '25px',
          background: isCompleted ? moominGreen : moominBlue,
          borderRadius: '50%',
          opacity: isUnlocked ? 1 : 0.3
        }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      {/* Lesson Circle - Enhanced Visual Prominence */}
      <motion.div 
        style={{
          position: 'relative',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: isCompleted ? completedColor : isUnlocked ? lessonColor : lockedColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          border: `4px solid ${isDarkMode ? '#fff' : '#000'}`,
          boxShadow: isCompleted 
            ? '0 0 30px rgba(39, 174, 96, 0.7)' 
            : isUnlocked 
              ? '0 0 30px rgba(230, 126, 34, 0.5)' 
              : '0 0 15px rgba(156, 163, 175, 0.3)',
          filter: isUnlocked ? 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' : 'none'
        }}
        whileHover={isUnlocked ? { scale: 1.05 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Lesson Number - Enhanced Typography */}
        <span style={{
          fontSize: '2.2rem',
          fontWeight: '800',
          color: isDarkMode ? '#fff' : '#000',
          fontFamily: '"Georgia", serif',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
        }}>
          {index + 1}
        </span>
        
        {/* Progress Ring for in-progress lessons */}
        {isInProgress && (
          <svg
            style={{
              position: 'absolute',
              top: '-4px',
              left: '-4px',
              width: '98px',
              height: '98px',
              transform: 'rotate(-90deg)'
            }}
          >
            <circle
              cx="49"
              cy="49"
              r="40"
              fill="none"
              stroke={moominYellow}
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 40 * progress / 100} ${2 * Math.PI * 40}`}
            />
          </svg>
        )}
        
        {/* Completion Checkmark */}
        {isCompleted && (
          <span style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            fontSize: '1.2rem',
            color: '#fff',
            background: completedColor,
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            ✓
          </span>
        )}
      </motion.div>
      
      {/* Lesson Name - Enhanced Visual Hierarchy */}
      <h3 style={{
        fontSize: '1.4rem',
        fontWeight: '700',
        color: textColor,
        margin: '0 0 0.5rem 0',
        textAlign: 'center',
        lineHeight: '1.2',
        fontFamily: '"Georgia", serif',
        letterSpacing: '0.02em'
      }}>
        {lesson.name}
      </h3>
      
      {/* Progress Indicator - Enhanced Visual Prominence */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '0.5rem'
      }}>
        {/* Progress Status Icon */}
        <span style={{
          fontSize: '1rem',
          color: isCompleted ? completedColor : isUnlocked ? lessonColor : '#9ca3af'
        }}>
          {isCompleted ? '✓' : isInProgress ? '⏳' : isUnlocked ? '▶' : '🔒'}
        </span>
        
        {/* Progress Text - Reduced Size for Better Hierarchy */}
        <p style={{
          fontSize: '0.8rem',
          color: isDarkMode ? '#a0aec0' : '#4a5568',
          margin: '0',
          textAlign: 'center',
          fontFamily: '"Georgia", serif',
          fontStyle: 'italic',
          fontWeight: '500',
          opacity: 0.95
        }}>
          {isCompleted ? 'Completed' : isInProgress ? `${progress}% Complete` : isUnlocked ? 'Ready to Start' : 'Locked'}
        </p>
      </div>

    </motion.div>
  );
});

export default LessonCard; 