import React, { useEffect, useState } from 'react';
import { FaTrophy, FaTimes } from 'react-icons/fa';

const AchievementNotification = React.memo(({ achievement, onClose, isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showRewards, setShowRewards] = useState(false);

  useEffect(() => {
    // Show notification with delay
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Show rewards after animation
    const rewardsTimer = setTimeout(() => setShowRewards(true), 800);
    
    // Auto-hide after 5 seconds
    const autoHideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(rewardsTimer);
      clearTimeout(autoHideTimer);
    };
  }, [onClose]);

  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 10000,
      transform: isVisible ? 'translateX(0)' : 'translateX(400px)',
      transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      maxWidth: '400px'
    }}>
      <div style={{
        background: cardBackground,
        border: `3px solid #27ae60`,
        borderRadius: '20px',
        padding: '1.5rem',
        boxShadow: '0 10px 40px rgba(39, 174, 96, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Close Button */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 500);
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            color: '#999',
            cursor: 'pointer',
            fontSize: '1.2rem',
            padding: '5px',
            borderRadius: '50%',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(0,0,0,0.1)';
            e.target.style.color = '#666';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'none';
            e.target.style.color = '#999';
          }}
        >
          <FaTimes />
        </button>

        {/* Achievement Icon */}
        <div style={{
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '0.5rem',
            animation: 'trophyBounce 0.6s ease-out'
          }}>
            {achievement.icon}
          </div>
          <div style={{
            fontSize: '3rem',
            color: '#27ae60',
            animation: 'trophyGlow 2s ease-in-out infinite'
          }}>
            🏆
          </div>
        </div>

        {/* Achievement Info */}
        <div style={{
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          <h3 style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1.3rem',
            fontFamily: '"Georgia", serif',
            color: textColor
          }}>
            Achievement Unlocked!
          </h3>
          <h4 style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1.1rem',
            fontFamily: '"Georgia", serif',
            color: '#27ae60'
          }}>
            {achievement.name}
          </h4>
          <p style={{
            margin: '0',
            fontSize: '0.9rem',
            opacity: 0.8,
            fontFamily: '"Georgia", serif',
            color: textColor
          }}>
            {achievement.description}
          </p>
        </div>

        {/* Rewards */}
        {showRewards && (
          <div style={{
            background: 'linear-gradient(135deg, #f39c12, #f1c40f)',
            borderRadius: '15px',
            padding: '1rem',
            marginTop: '1rem',
            animation: 'rewardsSlide 0.5s ease-out'
          }}>
            <h5 style={{
              margin: '0 0 0.5rem 0',
              fontSize: '1rem',
              fontFamily: '"Georgia", serif',
              color: '#fff',
              textAlign: 'center'
            }}>
              Rewards Earned!
            </h5>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#fff'
              }}>
                <span style={{ fontSize: '1.2rem' }}>⭐</span>
                <span style={{ fontFamily: '"Georgia", serif' }}>{achievement.xpReward} XP</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#fff'
              }}>
                <span style={{ fontSize: '1.2rem' }}>🪙</span>
                <span style={{ fontFamily: '"Georgia", serif' }}>{achievement.coinsReward} Coins</span>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div style={{
          marginTop: '1rem',
          padding: '0.5rem',
          background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
          borderRadius: '10px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.3rem',
            fontSize: '0.8rem',
            fontFamily: '"Georgia", serif',
            color: textColor
          }}>
            <span>Progress</span>
            <span>100%</span>
          </div>
          <div style={{
            background: isDarkMode ? '#555' : '#e8f4f8',
            borderRadius: '5px',
            height: '6px',
            overflow: 'hidden'
          }}>
            <div style={{
              background: '#27ae60',
              height: '100%',
              width: '100%',
              borderRadius: '5px',
              animation: 'progressFill 1s ease-out'
            }} />
          </div>
        </div>

        {/* Shine Effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
          animation: 'shine 2s ease-in-out',
          pointerEvents: 'none'
        }} />
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes trophyBounce {
            0% { transform: scale(0) rotate(-180deg); }
            50% { transform: scale(1.2) rotate(0deg); }
            100% { transform: scale(1) rotate(0deg); }
          }
          
          @keyframes trophyGlow {
            0%, 100% { filter: drop-shadow(0 0 5px rgba(39, 174, 96, 0.5)); }
            50% { filter: drop-shadow(0 0 15px rgba(39, 174, 96, 0.8)); }
          }
          
          @keyframes rewardsSlide {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes progressFill {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          
          @keyframes shine {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
});

export default AchievementNotification; 