import React, { useState, useEffect, useMemo } from 'react';

function IntroAnimation({ onComplete, isDarkMode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = useMemo(() => [
    {
      text: "Welcome to",
      delay: 500,
      duration: 1000
    },
    {
      text: "Flodhästen",
      delay: 300,
      duration: 1500
    },
    {
      text: "Learn Swedish with the River Horse",
      delay: 200,
      duration: 1200
    },
    {
      text: "Ready to begin?",
      delay: 300,
      duration: 1000
    }
  ], []);

  useEffect(() => {
    let timeout;
    
    if (currentStep < steps.length) {
      timeout = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, steps[currentStep].delay + steps[currentStep].duration);
    } else {
      // Animation complete, fade out smoothly
      timeout = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 800); // Longer fade out for smoother transition
      }, 1500); // Longer pause before starting fade out
    }

    return () => clearTimeout(timeout);
  }, [currentStep, steps, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: isDarkMode 
        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)' 
        : 'linear-gradient(135deg, #e3f2fd 0%, #f5f5f5 50%, #e3f2fd 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.8s ease-in-out',
      overflow: 'hidden'
    }}>
      {/* River background */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        background: isDarkMode 
          ? 'linear-gradient(180deg, rgba(33, 147, 176, 0.3) 0%, rgba(33, 147, 176, 0.1) 100%)' 
          : 'linear-gradient(180deg, rgba(33, 147, 176, 0.2) 0%, rgba(33, 147, 176, 0.05) 100%)',
        animation: 'flow 4s ease-in-out infinite',
        opacity: currentStep === steps.length ? 0 : 1,
        transition: 'opacity 0.8s ease-in-out'
      }} />

      {/* Floating river elements */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '10%',
        width: '20px',
        height: '20px',
        background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(33, 147, 176, 0.2)',
        borderRadius: '50%',
        animation: 'float 3s ease-in-out infinite',
        opacity: currentStep === steps.length ? 0 : 1,
        transition: 'opacity 0.8s ease-in-out'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '20%',
        width: '15px',
        height: '15px',
        background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(33, 147, 176, 0.15)',
        borderRadius: '50%',
        animation: 'float 4s ease-in-out infinite 1s',
        opacity: currentStep === steps.length ? 0 : 1,
        transition: 'opacity 0.8s ease-in-out'
      }} />

      {/* Horse silhouette */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120px',
        height: '80px',
        opacity: currentStep === steps.length ? 0 : 0.6,
        animation: 'horseFloat 6s ease-in-out infinite',
        transition: 'opacity 0.8s ease-in-out'
      }}>
        {/* Horse body */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '40px',
          background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(33, 147, 176, 0.2)',
          borderRadius: '40px 40px 20px 20px',
          border: `2px solid ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(33, 147, 176, 0.3)'}`
        }} />
        {/* Horse head */}
        <div style={{
          position: 'absolute',
          bottom: '25px',
          right: '5px',
          width: '35px',
          height: '25px',
          background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(33, 147, 176, 0.2)',
          borderRadius: '25px 25px 10px 10px',
          border: `2px solid ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(33, 147, 176, 0.3)'}`
        }} />
        {/* Horse neck */}
        <div style={{
          position: 'absolute',
          bottom: '15px',
          right: '25px',
          width: '25px',
          height: '20px',
          background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(33, 147, 176, 0.2)',
          borderRadius: '20px 20px 5px 5px',
          border: `2px solid ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(33, 147, 176, 0.3)'}`
        }} />
        {/* Horse legs */}
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          left: '15px',
          width: '8px',
          height: '25px',
          background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(33, 147, 176, 0.2)',
          borderRadius: '4px',
          border: `2px solid ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(33, 147, 176, 0.3)'}`
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          left: '35px',
          width: '8px',
          height: '25px',
          background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(33, 147, 176, 0.2)',
          borderRadius: '4px',
          border: `2px solid ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(33, 147, 176, 0.3)'}`
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          right: '35px',
          width: '8px',
          height: '25px',
          background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(33, 147, 176, 0.2)',
          borderRadius: '4px',
          border: `2px solid ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(33, 147, 176, 0.3)'}`
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          right: '15px',
          width: '8px',
          height: '25px',
          background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(33, 147, 176, 0.2)',
          borderRadius: '4px',
          border: `2px solid ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(33, 147, 176, 0.3)'}`
        }} />
      </div>

      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isDarkMode 
          ? 'radial-gradient(circle at 20% 80%, rgba(33, 147, 176, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(33, 147, 176, 0.05) 0%, transparent 50%)' 
          : 'radial-gradient(circle at 20% 80%, rgba(33, 147, 176, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(33, 147, 176, 0.03) 0%, transparent 50%)',
        animation: 'float 8s ease-in-out infinite'
      }} />

      {/* Main content */}
      <div style={{
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Animated text container */}
        <div style={{
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          opacity: currentStep === steps.length ? 0 : 1,
          transform: currentStep === steps.length ? 'translateY(-20px)' : 'translateY(0)',
          transition: 'all 0.8s ease-in-out'
        }}>
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                opacity: currentStep >= index ? 1 : 0,
                transform: currentStep >= index ? 'translateY(0)' : 'translateY(20px)',
                transition: `all ${step.duration}ms ease-out`,
                fontSize: index === 1 ? '4rem' : index === 0 ? '1.5rem' : '1.2rem',
                fontWeight: index === 1 ? 'bold' : 'normal',
                color: isDarkMode ? '#ffffff' : '#333333',
                textShadow: index === 1 
                  ? (isDarkMode 
                      ? '0 4px 8px rgba(0,0,0,0.5), 0 0 20px rgba(33, 147, 176, 0.3)' 
                      : '0 4px 8px rgba(0,0,0,0.1), 0 0 20px rgba(33, 147, 176, 0.2)')
                  : 'none',
                letterSpacing: index === 1 ? '3px' : '1px',
                fontStyle: index === 2 ? 'italic' : 'normal'
              }}
            >
              {step.text}
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '3rem',
          justifyContent: 'center',
          opacity: currentStep === steps.length ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}>
          {steps.map((_, index) => (
            <div
              key={index}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: currentStep >= index 
                  ? (isDarkMode ? '#2193b0' : '#1976d2')
                  : (isDarkMode ? '#555' : '#ccc'),
                transition: 'background 0.3s ease',
                animation: currentStep === index ? 'pulse 1s ease-in-out infinite' : 'none'
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes flow {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(10px); }
        }
        @keyframes horseFloat {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-5px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

export default IntroAnimation; 