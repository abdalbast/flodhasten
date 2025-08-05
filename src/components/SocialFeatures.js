import React, { useState, useMemo, useCallback } from 'react';
import { FaUsers, FaTrophy, FaUserFriends, FaBullseye, FaCrown, FaMedal, FaArrowUp, FaArrowDown, FaMinus, FaPlus, FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { 
  SOCIAL_FEATURES, 
  MOCK_USERS, 
  STUDY_GROUPS, 
  LEADERBOARD_TYPES, 
  LEADERBOARD_DATA, 
  GROUP_CHALLENGES,
  getSocialFeatures,
  getStudyGroups,
  getLeaderboardData,
  getGroupChallenges,
  getUserById,
  getStudyGroupById,
  getChallengeById,
  formatTimeAgo,
  getOnlineStatus
} from '../data/socialFeatures';

const SocialFeatures = React.memo(({ userStats, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('study-groups');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [leaderboardType, setLeaderboardType] = useState('global');
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);

  const socialFeatures = useMemo(() => getSocialFeatures(), []);
  const studyGroups = useMemo(() => getStudyGroups(), []);
  const leaderboardData = useMemo(() => getLeaderboardData(leaderboardType), [leaderboardType]);
  const groupChallenges = useMemo(() => getGroupChallenges(true), []);

  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const accentColor = isDarkMode ? '#3498db' : '#3498db';
  const successColor = isDarkMode ? '#27ae60' : '#27ae60';
  const warningColor = isDarkMode ? '#f39c12' : '#f39c12';
  const goldColor = isDarkMode ? '#f1c40f' : '#f1c40f';
  const silverColor = isDarkMode ? '#bdc3c7' : '#bdc3c7';
  const bronzeColor = isDarkMode ? '#e67e22' : '#e67e22';

  const tabs = [
    { id: 'study-groups', name: 'Study Groups', icon: <FaUsers />, feature: socialFeatures[0] },
    { id: 'leaderboards', name: 'Leaderboards', icon: <FaTrophy />, feature: socialFeatures[1] },
    { id: 'friends', name: 'Friends', icon: <FaUserFriends />, feature: socialFeatures[2] },
    { id: 'challenges', name: 'Group Challenges', icon: <FaBullseye />, feature: socialFeatures[3] }
  ];

  // Get rank icon and color
  const getRankDisplay = (rank) => {
    if (rank === 1) return { icon: <FaCrown />, color: goldColor };
    if (rank === 2) return { icon: <FaMedal />, color: silverColor };
    if (rank === 3) return { icon: <FaMedal />, color: bronzeColor };
    return { icon: `#${rank}`, color: textColor };
  };

  // Get change indicator
  const getChangeIndicator = (change) => {
    if (change > 0) return { icon: <FaArrowUp />, color: successColor, text: `+${change}` };
    if (change < 0) return { icon: <FaArrowDown />, color: warningColor, text: `${change}` };
    return { icon: <FaMinus />, color: textColor, text: '0' };
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
          🤝 Social Features
        </h1>
        <p style={{
          fontSize: '1.1rem',
          margin: '0',
          opacity: 0.8,
          fontFamily: '"Georgia", serif'
        }}>
          Connect, compete, and learn together with other Swedish learners
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
        {activeTab === 'study-groups' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                margin: '0',
                fontFamily: '"Georgia", serif',
                color: accentColor
              }}>
                👥 Study Groups
              </h2>
              <div style={{
                display: 'flex',
                gap: '0.5rem'
              }}>
                <button
                  onClick={() => setShowJoinGroup(true)}
                  style={{
                    background: accentColor,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.8rem 1.5rem',
                    cursor: 'pointer',
                    fontFamily: '"Georgia", serif',
                    fontSize: '0.9rem'
                  }}
                >
                  Join Group
                </button>
                <button
                  onClick={() => setShowCreateGroup(true)}
                  style={{
                    background: successColor,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.8rem 1.5rem',
                    cursor: 'pointer',
                    fontFamily: '"Georgia", serif',
                    fontSize: '0.9rem'
                  }}
                >
                  Create Group
                </button>
              </div>
            </div>

            {/* Study Groups Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {studyGroups.map(group => {
                const owner = getUserById(group.owner);
                return (
                  <div
                    key={group.id}
                    style={{
                      background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                      border: `2px solid ${borderColor}`,
                      borderRadius: '15px',
                      padding: '1.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setSelectedGroup(group)}
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
                        {group.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          margin: '0',
                          fontFamily: '"Georgia", serif'
                        }}>
                          {group.name}
                        </h3>
                        <p style={{
                          margin: '0',
                          fontSize: '0.9rem',
                          opacity: 0.7,
                          fontFamily: '"Georgia", serif'
                        }}>
                          {group.description}
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
                        {group.memberCount}/{group.maxMembers} members
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        color: accentColor,
                        fontFamily: '"Georgia", serif'
                      }}>
                        {group.level}
                      </div>
                    </div>

                    <div style={{
                      background: borderColor,
                      borderRadius: '10px',
                      height: '8px',
                      overflow: 'hidden',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        background: accentColor,
                        height: '100%',
                        width: `${(group.memberCount / group.maxMembers) * 100}%`
                      }} />
                    </div>

                    <div style={{
                      fontSize: '0.9rem',
                      opacity: 0.7,
                      fontFamily: '"Georgia", serif'
                    }}>
                      Weekly Goal: {group.weeklyGoal}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: successColor,
                      fontFamily: '"Georgia", serif'
                    }}>
                      Progress: {group.weeklyProgress} completed
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'leaderboards' && (
          <div>
            <h2 style={{
              margin: '0 0 1.5rem 0',
              fontFamily: '"Georgia", serif',
              color: accentColor
            }}>
              🏆 Leaderboards
            </h2>

            {/* Leaderboard Type Selector */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              {Object.keys(LEADERBOARD_TYPES).map(type => {
                const leaderboardType = LEADERBOARD_TYPES[type];
                return (
                  <button
                    key={type}
                    onClick={() => setLeaderboardType(type)}
                    style={{
                      background: leaderboardType === type ? accentColor : cardBackground,
                      color: leaderboardType === type ? '#fff' : textColor,
                      border: `2px solid ${leaderboardType === type ? accentColor : borderColor}`,
                      borderRadius: '25px',
                      padding: '0.8rem 1.5rem',
                      cursor: 'pointer',
                      fontFamily: '"Georgia", serif',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>{leaderboardType.icon}</span>
                    {leaderboardType.name}
                  </button>
                );
              })}
            </div>

            {/* Leaderboard */}
            <div style={{
              background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
              borderRadius: '15px',
              padding: '1.5rem'
            }}>
              <h3 style={{
                margin: '0 0 1.5rem 0',
                fontFamily: '"Georgia", serif',
                color: accentColor
              }}>
                {LEADERBOARD_TYPES[leaderboardType].name}
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {leaderboardData.map((entry, index) => {
                  const rankDisplay = getRankDisplay(entry.rank);
                  const changeIndicator = getChangeIndicator(entry.change);
                  const onlineStatus = getOnlineStatus(entry.user);
                  
                  return (
                    <div
                      key={entry.user.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        background: index < 3 ? (isDarkMode ? '#3d3d3d' : '#ffffff') : 'transparent',
                        border: index < 3 ? `2px solid ${rankDisplay.color}` : `1px solid ${borderColor}`,
                        borderRadius: '10px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateX(0)';
                      }}
                    >
                      {/* Rank */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: rankDisplay.color,
                        color: '#fff',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}>
                        {rankDisplay.icon}
                      </div>

                      {/* User Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.25rem'
                        }}>
                          <span style={{ fontSize: '1.5rem' }}>
                            {entry.user.avatar}
                          </span>
                          <span style={{
                            fontFamily: '"Georgia", serif',
                            fontWeight: 'bold'
                          }}>
                            {entry.user.username}
                          </span>
                          <span style={{
                            fontSize: '0.8rem',
                            opacity: 0.7
                          }}>
                            {onlineStatus}
                          </span>
                        </div>
                        <div style={{
                          fontSize: '0.9rem',
                          opacity: 0.7,
                          fontFamily: '"Georgia", serif'
                        }}>
                          Level {entry.user.level} • {entry.user.achievements} achievements • {entry.user.streak} day streak
                        </div>
                      </div>

                      {/* Score */}
                      <div style={{
                        textAlign: 'right'
                      }}>
                        <div style={{
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          fontFamily: '"Georgia", serif',
                          color: accentColor
                        }}>
                          {entry.score.toLocaleString()} XP
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.8rem',
                          color: changeIndicator.color
                        }}>
                          {changeIndicator.icon}
                          {changeIndicator.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'friends' && (
          <div>
            <h2 style={{
              margin: '0 0 1.5rem 0',
              fontFamily: '"Georgia", serif',
              color: accentColor
            }}>
              🤝 Friends
            </h2>

            {/* Friends Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {MOCK_USERS.map(user => {
                const onlineStatus = getOnlineStatus(user);
                return (
                  <div
                    key={user.id}
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
                      <div style={{
                        fontSize: '2.5rem',
                        position: 'relative'
                      }}>
                        {user.avatar}
                        <div style={{
                          position: 'absolute',
                          bottom: '0',
                          right: '0',
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: user.isOnline ? successColor : warningColor,
                          border: `2px solid ${cardBackground}`
                        }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          margin: '0',
                          fontFamily: '"Georgia", serif'
                        }}>
                          {user.username}
                        </h3>
                        <div style={{
                          fontSize: '0.9rem',
                          opacity: 0.7,
                          fontFamily: '"Georgia", serif'
                        }}>
                          {onlineStatus}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          color: accentColor,
                          fontFamily: '"Georgia", serif'
                        }}>
                          {user.level}
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          opacity: 0.7,
                          fontFamily: '"Georgia", serif'
                        }}>
                          Level
                        </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          color: successColor,
                          fontFamily: '"Georgia", serif'
                        }}>
                          {user.streak}
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          opacity: 0.7,
                          fontFamily: '"Georgia", serif'
                        }}>
                          Day Streak
                        </div>
                      </div>
                    </div>

                    <div style={{
                      fontSize: '0.9rem',
                      opacity: 0.7,
                      fontFamily: '"Georgia", serif',
                      marginBottom: '1rem'
                    }}>
                      {user.lessonsCompleted} lessons completed • {user.achievements} achievements
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
                        View Profile
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
                        Challenge
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div>
            <h2 style={{
              margin: '0 0 1.5rem 0',
              fontFamily: '"Georgia", serif',
              color: accentColor
            }}>
              🎯 Group Challenges
            </h2>

            {/* Active Challenges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {groupChallenges.map(challenge => {
                const daysLeft = Math.ceil((new Date(challenge.endDate) - new Date()) / (1000 * 60 * 60 * 24));
                const totalParticipants = challenge.participants.length;
                const avgProgress = Object.values(challenge.progress).reduce((a, b) => a + b, 0) / totalParticipants;
                
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
                        background: accentColor,
                        color: '#fff',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}>
                        <FaBullseye />
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
                        {totalParticipants} participants
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        color: daysLeft <= 3 ? warningColor : accentColor,
                        fontFamily: '"Georgia", serif'
                      }}>
                        {daysLeft} days left
                      </div>
                    </div>

                    <div style={{
                      background: borderColor,
                      borderRadius: '10px',
                      height: '8px',
                      overflow: 'hidden',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        background: accentColor,
                        height: '100%',
                        width: `${avgProgress}%`
                      }} />
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        fontSize: '0.9rem',
                        opacity: 0.7,
                        fontFamily: '"Georgia", serif'
                      }}>
                        Avg. Progress: {Math.round(avgProgress)}%
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        color: successColor,
                        fontFamily: '"Georgia", serif'
                      }}>
                        {challenge.rewards.xp} XP • {challenge.rewards.coins} Coins
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default SocialFeatures; 