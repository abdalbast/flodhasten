import React, { useEffect, useState } from 'react';
import { FaTrophy, FaTimes } from 'react-icons/fa';
import { Divider, Stack, Surface, Text } from '../design/components';
import '../design/patterns/shared-ui.css';

const AchievementNotification = React.memo(({ achievement, onClose, isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showRewards, setShowRewards] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const rewardsTimer = setTimeout(() => setShowRewards(true), 800);
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

  return (
    <div
      className={`fd-achievement-host ${isDarkMode ? 'fd-theme-dark' : ''}`}
      style={{
        transform: isVisible ? 'translateX(0)' : 'translateX(400px)',
        transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      }}
    >
      <Surface
        elevation="high"
        bordered
        padding="lg"
        className="fd-achievement-card"
        style={{
          borderWidth: '2px',
          borderColor: 'var(--fd-color-success)',
          boxShadow: '0 10px 40px rgba(39, 174, 96, 0.25)'
        }}
      >
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 500);
          }}
          className="fd-achievement-close"
          type="button"
          aria-label="Close achievement notification"
        >
          <FaTimes />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem', animation: 'trophyBounce 0.6s ease-out' }}>
            {achievement.icon}
          </div>
          <FaTrophy style={{ fontSize: '2rem', color: '#27ae60', animation: 'trophyGlow 2s ease-in-out infinite' }} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Text as="h3" variant="section" serif weight="medium" style={{ marginBottom: '0.5rem' }}>
            Achievement Unlocked!
          </Text>
          <Text as="h4" variant="bodyLg" serif weight="medium" color="success" style={{ marginBottom: '0.5rem' }}>
            {achievement.name}
          </Text>
          <Text as="p" variant="caption" color="secondary" serif style={{ margin: 0 }}>
            {achievement.description}
          </Text>
        </div>

        {showRewards && (
          <div className="fd-achievement-rewards" style={{ animation: 'rewardsSlide 0.5s ease-out' }}>
            <Text as="h5" variant="body" serif weight="medium" style={{ color: '#fff', textAlign: 'center', marginBottom: '0.5rem' }}>
              Rewards Earned!
            </Text>
            <Stack direction="row" justify="space-around" align="center" gap="12px">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                <span style={{ fontSize: '1.2rem' }}>⭐</span>
                <Text as="span" variant="caption" serif style={{ color: '#fff' }}>{achievement.xpReward} XP</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                <span style={{ fontSize: '1.2rem' }}>🪙</span>
                <Text as="span" variant="caption" serif style={{ color: '#fff' }}>{achievement.coinsReward} Coins</Text>
              </div>
            </Stack>
          </div>
        )}

        <Surface tone="paper" bordered padding="sm" style={{ marginTop: '1rem', borderRadius: '10px' }}>
          <Stack direction="row" justify="space-between" style={{ marginBottom: '0.3rem' }}>
            <Text as="span" variant="micro" serif>Progress</Text>
            <Text as="span" variant="micro" serif>100%</Text>
          </Stack>
          <div className="fd-achievement-progressTrack">
            <div className="fd-achievement-progressFill" />
          </div>
        </Surface>

        <Divider style={{ marginTop: '12px', opacity: 0.35 }} />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
            animation: 'shine 2s ease-in-out',
            pointerEvents: 'none'
          }}
        />
      </Surface>

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
