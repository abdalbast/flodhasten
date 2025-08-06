import React, { useState, useMemo } from 'react';
import { FaTrophy, FaStar, FaFire, FaBook, FaGamepad, FaMicrophone, FaCrown } from 'react-icons/fa';
import { ACHIEVEMENTS, getAllAchievements, getAchievementsByCategory, isAchievementUnlocked } from '../data/achievements';

const Achievements = React.memo(({ userStats, unlockedAchievements, isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  // Category icons mapping
  const categoryIcons = {
    all: <FaTrophy />,
    learning: <FaBook />,
    vocabulary: <FaStar />,
    games: <FaGamepad />,
    streaks: <FaFire />,
    pronunciation: <FaMicrophone />,
    special: <FaCrown />
  };

  // Category names
  const categoryNames = {
    all: 'All Achievements',
    learning: 'Learning Progress',
    vocabulary: 'Vocabulary',
    games: 'Games',
    streaks: 'Streaks',
    pronunciation: 'Pronunciation',
    special: 'Special'
  };

  // Get achievements based on selected category and filter
  const filteredAchievements = useMemo(() => {
    let achievements = selectedCategory === 'all' 
      ? getAllAchievements()
      : Object.values(getAchievementsByCategory(selectedCategory));

    if (showUnlockedOnly) {
      achievements = achievements.filter(achievement => 
        unlockedAchievements.includes(achievement.id)
      );
    }

    return achievements;
  }, [selectedCategory, showUnlockedOnly, unlockedAchievements]);

  // Calculate progress for an achievement
  const getAchievementProgress = (achievement) => {
    const { type, count } = achievement.requirement;
    const currentValue = userStats[type] || 0;
    const progress = Math.min((currentValue / count) * 100, 100);
    return { current: currentValue, target: count, progress };
  };

  // Get category stats
  const getCategoryStats = (category) => {
    const categoryAchievements = category === 'all' 
      ? getAllAchievements()
      : Object.values(getAchievementsByCategory(category));
    
    const total = categoryAchievements.length;
    const unlocked = categoryAchievements.filter(achievement => 
      unlockedAchievements.includes(achievement.id)
    ).length;
    
    return { total, unlocked, percentage: Math.round((unlocked / total) * 100) };
  };

  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const backgroundColor = isDarkMode ? '#2d2d2d' : '#f8f9fa';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const accentColor = isDarkMode ? '#3498db' : '#3498db';

  return (
    <div style={{
      padding: '1rem',
      maxWidth: '1200px',
      margin: '0 auto',
      color: textColor
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          margin: '0 0 0.5rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          🏆 Achievements
        </h1>
        <p style={{
          fontSize: '1.1rem',
          margin: '0',
          opacity: 0.8,
          fontFamily: '"Georgia", serif'
        }}>
          Track your progress and unlock rewards
        </p>
      </div>

      {/* Category Filter */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '2rem',
        justifyContent: 'center'
      }}>
        {Object.keys(categoryNames).map(category => {
          const stats = getCategoryStats(category);
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                background: selectedCategory === category ? accentColor : cardBackground,
                color: selectedCategory === category ? '#fff' : textColor,
                border: `2px solid ${selectedCategory === category ? accentColor : borderColor}`,
                borderRadius: '25px',
                padding: '0.8rem 1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: '"Georgia", serif',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.target.style.background = isDarkMode ? '#4d4d4d' : '#f0f0f0';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.target.style.background = cardBackground;
                }
              }}
            >
              {categoryIcons[category]}
              {categoryNames[category]}
              <span style={{
                background: selectedCategory === category ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                borderRadius: '12px',
                padding: '0.2rem 0.6rem',
                fontSize: '0.8rem',
                marginLeft: '0.5rem'
              }}>
                {stats.unlocked}/{stats.total}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter Toggle */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          fontFamily: '"Georgia", serif'
        }}>
          <input
            type="checkbox"
            checked={showUnlockedOnly}
            onChange={(e) => setShowUnlockedOnly(e.target.checked)}
            style={{ transform: 'scale(1.2)' }}
          />
          Show unlocked achievements only
        </label>
      </div>

      {/* Achievements Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {filteredAchievements.map(achievement => {
          const isUnlocked = unlockedAchievements.includes(achievement.id);
          const progress = getAchievementProgress(achievement);
          
          return (
            <div
              key={achievement.id}
              style={{
                background: cardBackground,
                border: `2px solid ${isUnlocked ? '#27ae60' : borderColor}`,
                borderRadius: '15px',
                padding: '1.5rem',
                transition: 'all 0.3s ease',
                transform: isUnlocked ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isUnlocked 
                  ? '0 8px 25px rgba(39, 174, 96, 0.3)' 
                  : '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Unlocked Badge */}
              {isUnlocked && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: '#27ae60',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem'
                }}>
                  ✓
                </div>
              )}

              {/* Achievement Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  opacity: isUnlocked ? 1 : 0.5
                }}>
                  {achievement.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    margin: '0 0 0.3rem 0',
                    fontSize: '1.2rem',
                    fontFamily: '"Georgia", serif',
                    color: isUnlocked ? textColor : '#999'
                  }}>
                    {achievement.name}
                  </h3>
                  <p style={{
                    margin: '0',
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    fontFamily: '"Georgia", serif'
                  }}>
                    {achievement.description}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{
                marginBottom: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontFamily: '"Georgia", serif'
                }}>
                  <span>Progress</span>
                  <span>{progress.current}/{progress.target}</span>
                </div>
                <div style={{
                  background: isDarkMode ? '#555' : '#e8f4f8',
                  borderRadius: '10px',
                  height: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: isUnlocked ? '#27ae60' : accentColor,
                    height: '100%',
                    width: `${progress.progress}%`,
                    transition: 'width 0.5s ease',
                    borderRadius: '10px'
                  }} />
                </div>
              </div>

              {/* Rewards */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                fontSize: '0.9rem',
                fontFamily: '"Georgia", serif'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: '#f39c12'
                }}>
                  <span>⭐</span>
                  <span>{achievement.xpReward} XP</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: '#f1c40f'
                }}>
                  <span>🪙</span>
                  <span>{achievement.coinsReward} Coins</span>
                </div>
              </div>

              {/* Unlock Animation */}
              {isUnlocked && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent, rgba(39, 174, 96, 0.1), transparent)',
                  animation: 'unlockShine 2s ease-in-out',
                  pointerEvents: 'none'
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#999'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontFamily: '"Georgia", serif'
          }}>
            No achievements found
          </h3>
          <p style={{
            margin: '0',
            fontFamily: '"Georgia", serif'
          }}>
            {showUnlockedOnly 
              ? 'Try changing the filter to see all achievements'
              : 'Keep learning to unlock more achievements!'
            }
          </p>
        </div>
      )}

      {/* CSS Animations */}
      <style>
        {`
          @keyframes unlockShine {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
});

export default Achievements; 