import React, { useState, useMemo } from 'react';
import { FaGamepad, FaUsers, FaTrophy, FaGem, FaPlay, FaClock, FaStar, FaCrown, FaMedal, FaCheck, FaTimes, FaArrowUp, FaArrowDown, FaPlus, FaMinus } from 'react-icons/fa';
import { 
  GAMIFIED_FEATURES, 
  ADVANCED_GAMES, 
  MULTIPLAYER_SESSIONS, 
  LEARNING_CHALLENGES, 
  ENHANCED_REWARDS,
  getGamifiedFeatures,
  getAdvancedGames,
  getMultiplayerSessions,
  getLearningChallenges,
  getSpecialItems,
  getPowerUps,
  getGameStatistics,
  calculateWinRate,
  formatGameTime,
  getDifficultyColor,
  getRarityColor,
  getGameIcon,
  getGameName
} from '../data/gamifiedLearning';

const GamifiedLearning = React.memo(({ userStats, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('advanced-games');
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [showPowerUps, setShowPowerUps] = useState(false);

  const gamifiedFeatures = useMemo(() => getGamifiedFeatures(), []);
  const advancedGames = useMemo(() => getAdvancedGames(), []);
  const multiplayerSessions = useMemo(() => getMultiplayerSessions(), []);
  const learningChallenges = useMemo(() => getLearningChallenges(true), []);
  const specialItems = useMemo(() => getSpecialItems(), []);
  const powerUps = useMemo(() => getPowerUps(), []);
  const gameStats = useMemo(() => getGameStatistics(), []);

  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const accentColor = isDarkMode ? '#3498db' : '#3498db';
  const successColor = isDarkMode ? '#27ae60' : '#27ae60';
  const warningColor = isDarkMode ? '#f39c12' : '#f39c12';
  const errorColor = isDarkMode ? '#e74c3c' : '#e74c3c';

  const tabs = [
    { id: 'advanced-games', name: 'Advanced Games', icon: <FaGamepad />, feature: gamifiedFeatures[0] },
    { id: 'multiplayer', name: 'Multiplayer', icon: <FaUsers />, feature: gamifiedFeatures[1] },
    { id: 'challenges', name: 'Challenges', icon: <FaTrophy />, feature: gamifiedFeatures[2] },
    { id: 'rewards', name: 'Rewards', icon: <FaGem />, feature: gamifiedFeatures[3] }
  ];

  // Render advanced games tab
  const renderAdvancedGames = () => {
    return (
      <div>
        <h2 style={{
          margin: '0 0 1.5rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          🎮 Advanced Games
        </h2>

        {/* Game Statistics */}
        <div style={{
          background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
          border: `2px solid ${borderColor}`,
          borderRadius: '15px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontFamily: '"Georgia", serif',
            color: accentColor
          }}>
            📊 Your Gaming Stats
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: accentColor,
                fontFamily: '"Georgia", serif'
              }}>
                {gameStats.totalGamesPlayed}
              </div>
              <div style={{
                fontSize: '0.9rem',
                opacity: 0.7,
                fontFamily: '"Georgia", serif'
              }}>
                Games Played
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: successColor,
                fontFamily: '"Georgia", serif'
              }}>
                {gameStats.winRate}%
              </div>
              <div style={{
                fontSize: '0.9rem',
                opacity: 0.7,
                fontFamily: '"Georgia", serif'
              }}>
                Win Rate
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: warningColor,
                fontFamily: '"Georgia", serif'
              }}>
                {gameStats.averageScore}
              </div>
              <div style={{
                fontSize: '0.9rem',
                opacity: 0.7,
                fontFamily: '"Georgia", serif'
              }}>
                Avg Score
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: accentColor,
                fontFamily: '"Georgia", serif'
              }}>
                {formatGameTime(gameStats.totalPlayTime)}
              </div>
              <div style={{
                fontSize: '0.9rem',
                opacity: 0.7,
                fontFamily: '"Georgia", serif'
              }}>
                Total Play Time
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Games Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {advancedGames.map(game => (
            <div
              key={game.id}
              style={{
                background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                border: `2px solid ${borderColor}`,
                borderRadius: '15px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setSelectedGame(game)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '2rem' }}>
                  {game.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    margin: '0',
                    fontFamily: '"Georgia", serif'
                  }}>
                    {game.name}
                  </h3>
                  <p style={{
                    margin: '0',
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    fontFamily: '"Georgia", serif'
                  }}>
                    {game.description}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontSize: '0.9rem',
                  color: getDifficultyColor(game.difficulty),
                  fontFamily: '"Georgia", serif',
                  fontWeight: 'bold'
                }}>
                  {game.difficulty}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  opacity: 0.7,
                  fontFamily: '"Georgia", serif'
                }}>
                  {game.minPlayers}-{game.maxPlayers} players
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontSize: '0.9rem',
                  opacity: 0.7,
                  fontFamily: '"Georgia", serif'
                }}>
                  ⏱️ {game.timeLimit}s
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: accentColor,
                  fontFamily: '"Georgia", serif'
                }}>
                  {game.rewards.xp} XP • {game.rewards.coins} Coins
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                {game.mechanics.features.map((feature, index) => (
                  <span
                    key={index}
                    style={{
                      background: accentColor,
                      color: '#fff',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      fontFamily: '"Georgia", serif'
                    }}
                  >
                    {feature.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render multiplayer tab
  const renderMultiplayer = () => {
    return (
      <div>
        <h2 style={{
          margin: '0 0 1.5rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          👥 Multiplayer Games
        </h2>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            fontSize: '1.1rem',
            fontFamily: '"Georgia", serif'
          }}>
            Active Sessions: {multiplayerSessions.length}
          </div>
          <button
            onClick={() => setShowCreateSession(true)}
            style={{
              background: accentColor,
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.8rem 1.5rem',
              cursor: 'pointer',
              fontFamily: '"Georgia", serif',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FaPlus />
            Create Session
          </button>
        </div>

        {/* Multiplayer Sessions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {multiplayerSessions.map(session => (
            <div
              key={session.id}
              style={{
                background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                border: `2px solid ${borderColor}`,
                borderRadius: '15px',
                padding: '1.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '2rem' }}>
                  {getGameIcon(session.gameType)}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    margin: '0',
                    fontFamily: '"Georgia", serif'
                  }}>
                    {getGameName(session.gameType)}
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    fontFamily: '"Georgia", serif'
                  }}>
                    <span>Host: {session.host}</span>
                    <span>•</span>
                    <span style={{
                      color: session.status === 'active' ? successColor : warningColor
                    }}>
                      {session.status}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontSize: '0.9rem',
                  opacity: 0.7,
                  fontFamily: '"Georgia", serif'
                }}>
                  {session.currentPlayers}/{session.maxPlayers} players
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: accentColor,
                  fontFamily: '"Georgia", serif'
                }}>
                  {session.settings.rounds} rounds
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontSize: '0.9rem',
                  opacity: 0.7,
                  fontFamily: '"Georgia", serif'
                }}>
                  ⏱️ {session.settings.timeLimit}s
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: getDifficultyColor(session.settings.difficulty),
                  fontFamily: '"Georgia", serif',
                  fontWeight: 'bold'
                }}>
                  {session.settings.difficulty}
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '0.5rem'
              }}>
                <button
                  style={{
                    background: session.status === 'waiting' ? successColor : accentColor,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontFamily: '"Georgia", serif',
                    fontSize: '0.8rem',
                    flex: 1
                  }}
                >
                  {session.status === 'waiting' ? 'Join' : 'Watch'}
                </button>
                <button
                  style={{
                    background: 'transparent',
                    color: accentColor,
                    border: `1px solid ${accentColor}`,
                    borderRadius: '10px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontFamily: '"Georgia", serif',
                    fontSize: '0.8rem',
                    flex: 1
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render challenges tab
  const renderChallenges = () => {
    return (
      <div>
        <h2 style={{
          margin: '0 0 1.5rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          🏆 Learning Challenges
        </h2>

        {/* Active Challenges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {learningChallenges.map(challenge => {
            const daysLeft = Math.ceil((new Date(challenge.endDate) - new Date()) / (1000 * 60 * 60 * 24));
            
            return (
              <div
                key={challenge.id}
                style={{
                  background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                  border: `2px solid ${borderColor}`,
                  borderRadius: '15px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setSelectedChallenge(challenge)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    background: getDifficultyColor(challenge.difficulty),
                    color: '#fff',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>
                    <FaTrophy />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      margin: '0',
                      fontFamily: '"Georgia", serif'
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

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    fontFamily: '"Georgia", serif'
                  }}>
                    {challenge.participants} participants
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: daysLeft <= 3 ? errorColor : accentColor,
                    fontFamily: '"Georgia", serif'
                  }}>
                    {daysLeft} days left
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    fontSize: '0.9rem',
                    color: getDifficultyColor(challenge.difficulty),
                    fontFamily: '"Georgia", serif',
                    fontWeight: 'bold'
                  }}>
                    {challenge.difficulty}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: successColor,
                    fontFamily: '"Georgia", serif'
                  }}>
                    {challenge.rewards.xp} XP • {challenge.rewards.coins} Coins
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  <button
                    style={{
                      background: accentColor,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontFamily: '"Georgia", serif',
                      fontSize: '0.8rem',
                      flex: 1
                    }}
                  >
                    Join Challenge
                  </button>
                  <button
                    style={{
                      background: 'transparent',
                      color: accentColor,
                      border: `1px solid ${accentColor}`,
                      borderRadius: '10px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontFamily: '"Georgia", serif',
                      fontSize: '0.8rem',
                      flex: 1
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render rewards tab
  const renderRewards = () => {
    return (
      <div>
        <h2 style={{
          margin: '0 0 1.5rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          💎 Enhanced Rewards
        </h2>

        {/* Special Items */}
        <div style={{
          background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
          border: `2px solid ${borderColor}`,
          borderRadius: '15px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontFamily: '"Georgia", serif',
            color: accentColor
          }}>
            🏆 Special Items
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {specialItems.map(item => (
              <div
                key={item.id}
                style={{
                  background: cardBackground,
                  border: `2px solid ${getRarityColor(item.rarity)}`,
                  borderRadius: '10px',
                  padding: '1rem',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {item.icon}
                </div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  fontFamily: '"Georgia", serif',
                  marginBottom: '0.5rem'
                }}>
                  {item.name}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  opacity: 0.7,
                  fontFamily: '"Georgia", serif',
                  marginBottom: '0.5rem'
                }}>
                  {item.description}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: getRarityColor(item.rarity),
                  fontFamily: '"Georgia", serif',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}>
                  {item.rarity.toUpperCase()}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: successColor,
                  fontFamily: '"Georgia", serif'
                }}>
                  {item.effect}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Power-ups */}
        <div style={{
          background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
          border: `2px solid ${borderColor}`,
          borderRadius: '15px',
          padding: '1.5rem'
        }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontFamily: '"Georgia", serif',
            color: accentColor
          }}>
            ⚡ Power-ups
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {powerUps.map(powerUp => (
              <div
                key={powerUp.id}
                style={{
                  background: cardBackground,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  padding: '1rem',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {powerUp.icon}
                </div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  fontFamily: '"Georgia", serif',
                  marginBottom: '0.5rem'
                }}>
                  {powerUp.name}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  opacity: 0.7,
                  fontFamily: '"Georgia", serif',
                  marginBottom: '0.5rem'
                }}>
                  {powerUp.description}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: accentColor,
                  fontFamily: '"Georgia", serif',
                  marginBottom: '0.5rem'
                }}>
                  {powerUp.effect}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: warningColor,
                  fontFamily: '"Georgia", serif',
                  fontWeight: 'bold'
                }}>
                  {powerUp.cost} Coins
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

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
          🎮 Gamified Learning
        </h1>
        <p style={{
          fontSize: '1.1rem',
          margin: '0',
          opacity: 0.8,
          fontFamily: '"Georgia", serif'
        }}>
          Advanced games, multiplayer features, and enhanced rewards for immersive learning
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? accentColor : cardBackground,
              color: activeTab === tab.id ? '#fff' : textColor,
              border: `2px solid ${activeTab === tab.id ? accentColor : borderColor}`,
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
              if (activeTab !== tab.id) {
                e.target.style.background = isDarkMode ? '#4d4d4d' : '#f0f0f0';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.background = cardBackground;
              }
            }}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{
        background: cardBackground,
        border: `2px solid ${borderColor}`,
        borderRadius: '20px',
        padding: '2rem',
        minHeight: '600px'
      }}>
        {activeTab === 'advanced-games' && renderAdvancedGames()}
        {activeTab === 'multiplayer' && renderMultiplayer()}
        {activeTab === 'challenges' && renderChallenges()}
        {activeTab === 'rewards' && renderRewards()}
      </div>
    </div>
  );
});

export default GamifiedLearning; 