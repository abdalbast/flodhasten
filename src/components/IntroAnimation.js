import React, { useState, useRef } from 'react';

function IntroAnimation({ onComplete, isDarkMode }) {
  const [showSkip, setShowSkip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setIsLoading(false);
    setShowSkip(true);
  };

  const handleEnded = () => {
    onComplete();
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onComplete();
  };

  const handleError = () => {
    console.log('Video failed to load, completing intro');
    onComplete();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      flexDirection: 'column'
    }}>
      {/* Video Container */}
      <div style={{
        position: 'relative',
        maxWidth: '90vw',
        maxHeight: '80vh',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
      }}>
        <video
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
          onPlay={handlePlay}
          onEnded={handleEnded}
          onError={handleError}
          controls={false}
          autoPlay
          muted
          playsInline
        >
          <source src="/flodhasten/intro-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Skip Button */}
        {showSkip && (
          <button
            onClick={handleSkip}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(0,0,0,0.7)',
              color: '#fff',
              border: 'none',
              borderRadius: '25px',
              padding: '10px 20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(52, 152, 219, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(0,0,0,0.7)';
            }}
          >
            Skip Intro
          </button>
        )}
      </div>

      {/* Loading Text */}
      {isLoading && (
        <div style={{
          marginTop: '20px',
          color: '#ffffff',
          fontSize: '18px',
          fontFamily: '"Georgia", serif',
          textAlign: 'center'
        }}>
          Loading Flodhästen Intro...
        </div>
      )}

      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '50px',
        left: '50px',
        width: '60px',
        height: '60px',
        background: '#3498db',
        borderRadius: '50%',
        opacity: 0.3,
        animation: 'float 3s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '50px',
        right: '50px',
        width: '40px',
        height: '40px',
        background: '#27ae60',
        borderRadius: '50%',
        opacity: 0.3,
        animation: 'float 4s ease-in-out infinite 1s'
      }} />

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}
      </style>
    </div>
  );
}

export default IntroAnimation;
