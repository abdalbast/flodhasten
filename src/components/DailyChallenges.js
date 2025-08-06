import React, { useState, useMemo } from 'react';
import { FaTrophy, FaClock, FaStar, FaCoins, FaFire, FaCheckCircle } from 'react-icons/fa';
import { getChallengeProgress, checkChallengeCompletion } from '../data/dailyChallenges';

const DailyChallenges = React.memo(({ challenges, userStats, onChallengeComplete, isDarkMode }) => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  // Calculate completion stats
  const completionStats = useMemo(() => {
    const completed = challenges.filter(challenge => 
      checkChallengeCompletion(challenge, userStats)
    ).length;
    const total = challenges.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, percentage };
  }, [challenges, userStats]);

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#27ae60';
      case 'medium': return '#f39c12';
      case 'hard': return '#e74c3c';
      default: return '#3498db';
    }
  };

  // Get difficulty label
  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'Easy';
      case 'medium': return 'Medium';
      case 'hard': return 'Hard';
      default: return 'Unknown';
    }
  };

  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
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
          🎯 Daily Challenges
        </h1>
        <p style={{
          fontSize: '1.1rem',
          margin: '0',
          opacity: 0.8,
          fontFamily: '"Georgia", serif'
        }}>
          Complete challenges to earn extra rewards
        </p>
      </div>

      {/* Progress Overview */}
      <div style={{
        background: cardBackground,
        border: `2px solid ${borderColor}`,
        borderRadius: '20px',
        padding: '1.5rem',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1.2rem',
            fontFamily: '"Georgia", serif'
          }}>
            <FaTrophy style={{ color: '#f39c12' }} />
            <span>{completionStats.completed}/{completionStats.total} Completed</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1.2rem',
            fontFamily: '"Georgia", serif'
          }}>
            <FaStar style={{ color: '#f1c40f' }} />
            <span>{completionStats.percentage}% Progress</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div style={{
          background: isDarkMode ? '#555' : '#e8f4f8',
          borderRadius: '10px',
          height: '12px',
          overflow: 'hidden',
          marginBottom: '1rem'
        }}>
          <div style={{
            background: `linear-gradient(90deg, #27ae60, #f39c12)`,
            height: '100%',
            width: `${completionStats.percentage}%`,
            transition: 'width 0.5s ease',
            borderRadius: '10px'
          }} />
        </div>

        {/* Bonus Reward */}
        {completionStats.completed === completionStats.total && completionStats.total > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #f39c12, #f1c40f)',
            borderRadius: '15px',
            padding: '1rem',
            marginTop: '1rem',
            animation: 'bonusPulse 2s ease-in-out infinite'
          }}>
            <h3 style={{
              margin: '0 0 0.5rem 0',
              fontSize: '1.2rem',
              fontFamily: '"Georgia", serif',
              color: '#fff',
              textAlign: 'center'
            }}>
              🎉 All Challenges Complete!
            </h3>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              color: '#fff',
              fontFamily: '"Georgia", serif'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaStar />
                <span>+100 Bonus XP</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaCoins />
                <span>+25 Bonus Coins</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Challenges Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {challenges.map(challenge => {
          const isCompleted = checkChallengeCompletion(challenge, userStats);
          const progress = getChallengeProgress(challenge, userStats);
          const difficultyColor = getDifficultyColor(challenge.difficulty);
          
          return (
            <div
              key={challenge.id}
              style={{
                background: cardBackground,
                border: `3px solid ${isCompleted ? '#27ae60' : borderColor}`,
                borderRadius: '20px',
                padding: '1.5rem',
                transition: 'all 0.3s ease',
                transform: isCompleted ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isCompleted 
                  ? '0 8px 25px rgba(39, 174, 96, 0.3)' 
                  : '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedChallenge(challenge)}
              onMouseEnter={(e) => {
                if (!isCompleted) {
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isCompleted) {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }
              }}
            >
              {/* Completion Badge */}
              {isCompleted && (
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: '#27ae60',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  animation: 'checkBounce 0.6s ease-out'
                }}>
                  <FaCheckCircle />
                </div>
              )}

              {/* Challenge Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  opacity: isCompleted ? 1 : 0.7
                }}>
                  {challenge.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    margin: '0 0 0.3rem 0',
                    fontSize: '1.2rem',
                    fontFamily: '"Georgia", serif',
                    color: isCompleted ? textColor : '#999'
                  }}>
                    {challenge.title}
                  </h3>
                  <p style={{
                    margin: '0',
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    fontFamily: '"Georgia", serif'
                  }}>
                    {challenge.description}
                  </p>
                </div>
              </div>

              {/* Difficulty Badge */}
              <div style={{
                display: 'inline-block',
                background: difficultyColor,
                color: '#fff',
                padding: '0.3rem 0.8rem',
                borderRadius: '15px',
                fontSize: '0.8rem',
                fontFamily: '"Georgia", serif',
                marginBottom: '1rem'
              }}>
                {getDifficultyLabel(challenge.difficulty)}
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
                    background: isCompleted ? '#27ae60' : difficultyColor,
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
                  <FaStar />
                  <span>{challenge.xpReward} XP</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: '#f1c40f'
                }}>
                  <FaCoins />
                  <span>{challenge.coinsReward} Coins</span>
                </div>
              </div>

              {/* Expiry Time */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.8rem',
                opacity: 0.6,
                marginTop: '0.5rem',
                fontFamily: '"Georgia", serif'
              }}>
                <FaClock />
                <span>Expires in {Math.ceil((new Date(challenge.expiresAt) - new Date()) / (1000 * 60 * 60))} hours</span>
              </div>

              {/* Completion Animation */}
              {isCompleted && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent, rgba(39, 174, 96, 0.1), transparent)',
                  animation: 'challengeComplete 2s ease-in-out',
                  pointerEvents: 'none'
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {challenges.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#999'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontFamily: '"Georgia", serif'
          }}>
            No challenges available
          </h3>
          <p style={{
            margin: '0',
            fontFamily: '"Georgia", serif'
          }}>
            New challenges will appear tomorrow!
          </p>
        </div>
      )}

      {/* CSS Animations */}
      <style>
        {`
          @keyframes checkBounce {
            0% { transform: scale(0) rotate(-180deg); }
            50% { transform: scale(1.2) rotate(0deg); }
            100% { transform: scale(1) rotate(0deg); }
          }
          
          @keyframes challengeComplete {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes bonusPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}
      </style>
    </div>
  );
});

export default DailyChallenges; 