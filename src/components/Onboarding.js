import React, { useState, useEffect } from 'react';

function Onboarding({ onComplete, isDarkMode }) {
  const [currentStep, setCurrentStep] = useState('video');
  const [videoEnded, setVideoEnded] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  // Moomin-inspired colour palette
  const moominBlue = '#3498db';
  const moominGreen = '#27ae60';
  const moominYellow = '#f1c40f';
  const moominOrange = '#e67e22';
  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const backgroundColor = isDarkMode ? '#2d2d2d' : '#f8f9fa';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';

  useEffect(() => {
    // After video ends, show greeting after a short delay
    if (videoEnded) {
      const timer = setTimeout(() => {
        setCurrentStep('greeting');
        setShowGreeting(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [videoEnded]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleContinue = () => {
    onComplete();
  };

  if (currentStep === 'video') {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isDarkMode ? '#1a1a1a' : '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{
          maxWidth: '90vw',
          maxHeight: '70vh',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: isDarkMode 
            ? '0 20px 60px rgba(0,0,0,0.5)' 
            : '0 20px 60px rgba(0,0,0,0.2)'
        }}>
          <video
            src={process.env.PUBLIC_URL + '/intro-video.mp4'}
            onEnded={handleVideoEnd}
            autoPlay
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        
        <div style={{
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <p style={{
            color: textColor,
            fontSize: '1.1rem',
            fontFamily: '"Georgia", serif',
            margin: '0'
          }}>
            Welcome to Flodhästen!
          </p>
        </div>
      </div>
    );
  }

  if (currentStep === 'greeting') {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isDarkMode ? '#1a1a1a' : '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '2rem'
      }}>
        {/* Speech Bubble */}
        <div style={{
          background: cardBackground,
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          maxWidth: '400px',
          textAlign: 'center',
          boxShadow: isDarkMode 
            ? '0 12px 40px rgba(0,0,0,0.4)' 
            : '0 12px 40px rgba(52, 152, 219, 0.2)',
          border: `2px solid ${borderColor}`,
          position: 'relative',
          animation: showGreeting ? 'fadeInUp 0.6s ease-out' : 'none'
        }}>
          <p style={{
            color: textColor,
            fontSize: '1.3rem',
            fontFamily: '"Georgia", serif',
            margin: '0',
            fontWeight: 'bold'
          }}>
            Hey, I am Flodhästen!
          </p>
          
          {/* Speech bubble tail */}
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: `10px solid ${cardBackground}`
          }} />
        </div>

        {/* Animated Hippo */}
        <div style={{
          width: '200px',
          height: '200px',
          marginBottom: '3rem',
          animation: showGreeting ? 'bounceIn 0.8s ease-out 0.3s both' : 'none'
        }}>
          <img
            src={process.env.PUBLIC_URL + '/animated_hippo.gif'}
            alt="Flodhästen the Hippo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: isDarkMode ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' : 'drop-shadow(0 8px 16px rgba(52, 152, 219, 0.3))'
            }}
          />
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          style={{
            background: moominGreen,
            color: '#fff',
            border: 'none',
            borderRadius: '15px',
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: '"Georgia", serif',
            boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)',
            animation: showGreeting ? 'fadeInUp 0.6s ease-out 0.6s both' : 'none'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#229954';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = moominGreen;
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(39, 174, 96, 0.3)';
          }}
        >
          Continue
        </button>

        {/* CSS Animations */}
        <style>
          {`
            @keyframes fadeInUp {
              0% {
                opacity: 0;
                transform: translateY(30px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes bounceIn {
              0% {
                opacity: 0;
                transform: scale(0.3);
              }
              50% {
                opacity: 1;
                transform: scale(1.05);
              }
              70% {
                transform: scale(0.9);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}
        </style>
      </div>
    );
  }

  return null;
}

export default Onboarding; 