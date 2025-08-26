import React, { useState, useRef, useEffect } from 'react';

function IntroAnimation({ onComplete, isDarkMode }) {
  const [showSkip, setShowSkip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOutro, setIsOutro] = useState(false);
  const videoRef = useRef(null);
  const timeoutRef = useRef(null); // Add ref to track timeout

  useEffect(() => {
    // Test video accessibility
    const testVideo = async () => {
      try {
        const response = await fetch('/flodhasten/intro-video.mp4', { method: 'HEAD' });
        if (!response.ok) {
          console.error('Video file not accessible:', response.status, response.statusText);
          setError('Video file not accessible');
          timeoutRef.current = setTimeout(() => startOutro(), 2000);
          return;
        }
        console.log('Video file is accessible');
      } catch (err) {
        console.error('Error testing video:', err);
        setError('Network error');
        timeoutRef.current = setTimeout(() => startOutro(), 2000);
      }
    };
    
    testVideo();
    
    // Cleanup function to clear timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startOutro = () => {
    console.log('Starting outro transition');
    setIsOutro(true);
    // Wait for outro animation to complete before calling onComplete
    timeoutRef.current = setTimeout(() => {
      console.log('Outro complete, calling onComplete');
      onComplete();
    }, 1500); // Match the CSS transition duration
  };

  const handlePlay = () => {
    console.log('Video started playing');
    setIsLoading(false);
    setShowSkip(true);
  };

  const handleEnded = () => {
    console.log('Video ended');
    startOutro();
  };

  const handleSkip = () => {
    console.log('Video skipped');
    if (videoRef.current) {
      videoRef.current.pause();
    }
    startOutro();
  };

  const handleError = (e) => {
    console.error('Video error:', e);
    setError('Video failed to load');
    timeoutRef.current = setTimeout(() => startOutro(), 2000);
  };

  const handleLoadStart = () => {
    console.log('Video load started');
  };

  const handleCanPlay = () => {
    console.log('Video can play');
  };

  const handleLoadedData = () => {
    console.log('Video data loaded');
  };

  if (error) {
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
        flexDirection: 'column',
        opacity: isOutro ? 0 : 1,
        transition: 'opacity 1.5s ease-in-out'
      }}>
        <div style={{
          color: '#ffffff',
          fontSize: '18px',
          fontFamily: '"Georgia", serif',
          textAlign: 'center'
        }}>
          {error}
          <br />
          <small>Continuing to app...</small>
        </div>
      </div>
    );
  }

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
      flexDirection: 'column',
      opacity: isOutro ? 0 : 1,
      transform: isOutro ? 'scale(1.1)' : 'scale(1)',
      transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* Video Container */}
      <div style={{
        position: 'relative',
        maxWidth: '90vw',
        maxHeight: '80vh',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        transform: isOutro ? 'scale(0.9)' : 'scale(1)',
        transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
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
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onLoadedData={handleLoadedData}
          controls={false}
          autoPlay
          muted
          playsInline
          preload="auto"
        >
          <source src="/flodhasten/intro-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Skip Button */}
        {showSkip && !isOutro && (
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
      {isLoading && !isOutro && (
        <div style={{
          marginTop: '20px',
          color: '#ffffff',
          fontSize: '18px',
          fontFamily: '"Georgia", serif',
          textAlign: 'center',
          opacity: isOutro ? 0 : 1,
          transform: isOutro ? 'translateY(20px)' : 'translateY(0)',
          transition: 'all 0.8s ease-out'
        }}>
          Loading Flodhästen Intro...
        </div>
      )}

      {/* Outro Text */}
      {isOutro && (
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#ffffff',
          fontSize: '24px',
          fontFamily: '"Georgia", serif',
          textAlign: 'center',
          opacity: isOutro ? 1 : 0,
          animation: 'fadeInUp 1s ease-out'
        }}>
          Welcome to Flodhästen
        </div>
      )}

      {/* Debug Info */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        color: '#ffffff',
        fontSize: '12px',
        opacity: 0.7,
        opacity: isOutro ? 0 : 0.7,
        transition: 'opacity 0.5s ease'
      }}>
        Video Path: /flodhasten/intro-video.mp4
      </div>

      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '50px',
        left: '50px',
        width: '60px',
        height: '60px',
        background: '#3498db',
        borderRadius: '50%',
        opacity: isOutro ? 0 : 0.3,
        animation: 'float 3s ease-in-out infinite',
        transition: 'opacity 0.8s ease'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '50px',
        right: '50px',
        width: '40px',
        height: '40px',
        background: '#27ae60',
        borderRadius: '50%',
        opacity: isOutro ? 0 : 0.3,
        animation: 'float 4s ease-in-out infinite 1s',
        transition: 'opacity 0.8s ease'
      }} />

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          
          @keyframes fadeInUp {
            0% { 
              opacity: 0; 
              transform: translateX(-50%) translateY(30px); 
            }
            100% { 
              opacity: 1; 
              transform: translateX(-50%) translateY(0); 
            }
          }
        `}
      </style>
    </div>
  );
}

export default IntroAnimation;
