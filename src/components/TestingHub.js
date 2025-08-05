import React, { useState, useMemo } from 'react';
import { FaMicrophone, FaTrophy, FaFlag, FaStar, FaChartLine, FaCog, FaPlay, FaVolumeUp } from 'react-icons/fa';
import { MdTarget, MdEmojiEvents } from 'react-icons/md';
import Achievements from './Achievements';
import DailyChallenges from './DailyChallenges';
import VoiceRecognition from './VoiceRecognition';
import { getPronunciationStats } from '../data/voiceRecognition';

const TestingHub = React.memo(({ userStats, unlockedAchievements, dailyChallenges, onChallengeComplete, onPronunciationAttempt, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [testMode, setTestMode] = useState(false);

  // Mock data for testing
  const mockUserStats = useMemo(() => ({
    lessons_completed: 15,
    words_learned: 45,
    games_played: 23,
    perfect_scores: 8,
    streak_days: 7,
    pronunciations_used: 12,
    custom_words_added: 5,
    dark_mode_used: 1,
    languages_tried: 2,
    pronunciation_attempts: 18,
    excellent_pronunciations: 8,
    good_pronunciations: 6,
    fair_pronunciations: 3,
    needs_improvement_pronunciations: 1
  }), []);

  const mockUnlockedAchievements = useMemo(() => [
    'first_lesson', 'lesson_streak_3', 'first_word', 'words_10', 'first_game', 'games_10', 'streak_3', 'first_pronunciation', 'first_custom_word', 'dark_mode_user'
  ], []);

  const mockDailyChallenges = useMemo(() => [
    {
      id: 'test_challenge_1',
      title: 'Word Collector',
      description: 'Learn 5 new Swedish words today',
      type: 'vocabulary',
      difficulty: 'easy',
      requirement: { type: 'words_learned', count: 5 },
      xpReward: 50,
      coinsReward: 10,
      icon: '📝',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      isDaily: true
    },
    {
      id: 'test_challenge_2',
      title: 'Pronunciation Pro',
      description: 'Use the pronunciation feature 15 times',
      type: 'pronunciation',
      difficulty: 'medium',
      requirement: { type: 'pronunciations_used', count: 15 },
      xpReward: 80,
      coinsReward: 16,
      icon: '🎤',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      isDaily: true
    },
    {
      id: 'test_challenge_3',
      title: 'Game Master',
      description: 'Get 100% on any game',
      type: 'games',
      difficulty: 'hard',
      requirement: { type: 'perfect_scores', count: 1 },
      xpReward: 200,
      coinsReward: 40,
      icon: '🏆',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      isDaily: true
    }
  ], []);

  const pronunciationStats = getPronunciationStats(testMode ? mockUserStats : userStats);

  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const accentColor = isDarkMode ? '#3498db' : '#3498db';

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <FaCog /> },
    { id: 'achievements', name: 'Achievements', icon: <MdEmojiEvents /> },
    { id: 'challenges', name: 'Daily Challenges', icon: <MdTarget /> },
    { id: 'voice', name: 'Voice Recognition', icon: <FaMicrophone /> },
    { id: 'stats', name: 'Statistics', icon: <FaChartLine /> }
  ];

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
          🧪 Testing Hub
        </h1>
        <p style={{
          fontSize: '1.1rem',
          margin: '0',
          opacity: 0.8,
          fontFamily: '"Georgia", serif'
        }}>
          Test all new features in one place
        </p>
      </div>

      {/* Test Mode Toggle */}
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
            checked={testMode}
            onChange={(e) => setTestMode(e.target.checked)}
            style={{ transform: 'scale(1.2)' }}
          />
          Use Mock Data for Testing
        </label>
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
        minHeight: '500px'
      }}>
        {activeTab === 'overview' && (
          <div>
            <h2 style={{
              margin: '0 0 1.5rem 0',
              fontFamily: '"Georgia", serif',
              color: accentColor
            }}>
              🧪 Feature Testing Overview
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {/* Achievements Card */}
              <div style={{
                background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                borderRadius: '15px',
                padding: '1.5rem',
                border: `2px solid ${borderColor}`
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <MdEmojiEvents style={{ fontSize: '2rem', color: '#f39c12' }} />
                  <h3 style={{
                    margin: '0',
                    fontFamily: '"Georgia", serif'
                  }}>
                    Achievement System
                  </h3>
                </div>
                <p style={{
                  margin: '0 0 1rem 0',
                  opacity: 0.8,
                  fontFamily: '"Georgia", serif'
                }}>
                  Test the comprehensive achievement system with categories, progress tracking, and rewards.
                </p>
                <button
                  onClick={() => setActiveTab('achievements')}
                  style={{
                    background: accentColor,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '0.8rem 1.5rem',
                    cursor: 'pointer',
                    fontFamily: '"Georgia", serif',
                    fontSize: '0.9rem'
                  }}
                >
                  Test Achievements
                </button>
              </div>

              {/* Daily Challenges Card */}
              <div style={{
                background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                borderRadius: '15px',
                padding: '1.5rem',
                border: `2px solid ${borderColor}`
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <MdTarget style={{ fontSize: '2rem', color: '#27ae60' }} />
                  <h3 style={{
                    margin: '0',
                    fontFamily: '"Georgia", serif'
                  }}>
                    Daily Challenges
                  </h3>
                </div>
                <p style={{
                  margin: '0 0 1rem 0',
                  opacity: 0.8,
                  fontFamily: '"Georgia", serif'
                }}>
                  Test the daily challenge system with difficulty scaling, progress tracking, and bonus rewards.
                </p>
                <button
                  onClick={() => setActiveTab('challenges')}
                  style={{
                    background: accentColor,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '0.8rem 1.5rem',
                    cursor: 'pointer',
                    fontFamily: '"Georgia", serif',
                    fontSize: '0.9rem'
                  }}
                >
                  Test Challenges
                </button>
              </div>

              {/* Voice Recognition Card */}
              <div style={{
                background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                borderRadius: '15px',
                padding: '1.5rem',
                border: `2px solid ${borderColor}`
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <FaMicrophone style={{ fontSize: '2rem', color: '#e74c3c' }} />
                  <h3 style={{
                    margin: '0',
                    fontFamily: '"Georgia", serif'
                  }}>
                    Voice Recognition
                  </h3>
                </div>
                <p style={{
                  margin: '0 0 1rem 0',
                  opacity: 0.8,
                  fontFamily: '"Georgia", serif'
                }}>
                  Test the voice recognition system with Swedish pronunciation scoring and real-time feedback.
                </p>
                <button
                  onClick={() => setActiveTab('voice')}
                  style={{
                    background: accentColor,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '0.8rem 1.5rem',
                    cursor: 'pointer',
                    fontFamily: '"Georgia", serif',
                    fontSize: '0.9rem'
                  }}
                >
                  Test Voice Recognition
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{
              background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
              borderRadius: '15px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h3 style={{
                margin: '0 0 1rem 0',
                fontFamily: '"Georgia", serif',
                color: accentColor
              }}>
                Quick Statistics
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', color: '#f39c12' }}>🏆</div>
                  <div style={{ fontFamily: '"Georgia", serif', fontSize: '1.2rem' }}>
                    {testMode ? mockUnlockedAchievements.length : unlockedAchievements.length}
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Achievements Unlocked</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', color: '#27ae60' }}>🎯</div>
                  <div style={{ fontFamily: '"Georgia", serif', fontSize: '1.2rem' }}>
                    {testMode ? mockDailyChallenges.length : dailyChallenges.length}
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Daily Challenges</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', color: '#e74c3c' }}>🎤</div>
                  <div style={{ fontFamily: '"Georgia", serif', fontSize: '1.2rem' }}>
                    {pronunciationStats.totalAttempts}
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Voice Attempts</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', color: '#3498db' }}>📊</div>
                  <div style={{ fontFamily: '"Georgia", serif', fontSize: '1.2rem' }}>
                    {pronunciationStats.averageScore}%
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Avg. Pronunciation</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div>
            <h2 style={{
              margin: '0 0 1.5rem 0',
              fontFamily: '"Georgia", serif',
              color: accentColor
            }}>
              🏆 Achievement System Testing
            </h2>
            <Achievements 
              userStats={testMode ? mockUserStats : userStats}
              unlockedAchievements={testMode ? mockUnlockedAchievements : unlockedAchievements}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {activeTab === 'challenges' && (
          <div>
            <h2 style={{
              margin: '0 0 1.5rem 0',
              fontFamily: '"Georgia", serif',
              color: accentColor
            }}>
              🎯 Daily Challenges Testing
            </h2>
            <DailyChallenges 
              challenges={testMode ? mockDailyChallenges : dailyChallenges}
              userStats={testMode ? mockUserStats : userStats}
              onChallengeComplete={onChallengeComplete}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {activeTab === 'voice' && (
          <div>
            <h2 style={{
              margin: '0 0 1.5rem 0',
              fontFamily: '"Georgia", serif',
              color: accentColor
            }}>
              🎤 Voice Recognition Testing
            </h2>
            <VoiceRecognition 
              userStats={testMode ? mockUserStats : userStats}
              onPronunciationAttempt={onPronunciationAttempt}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {activeTab === 'stats' && (
          <div>
            <h2 style={{
              margin: '0 0 1.5rem 0',
              fontFamily: '"Georgia", serif',
              color: accentColor
            }}>
              📊 Detailed Statistics
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {/* User Progress Stats */}
              <div style={{
                background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                borderRadius: '15px',
                padding: '1.5rem'
              }}>
                <h3 style={{
                  margin: '0 0 1rem 0',
                  fontFamily: '"Georgia", serif',
                  color: accentColor
                }}>
                  Learning Progress
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontFamily: '"Georgia", serif'
                }}>
                  <div>📚 Lessons Completed: {testMode ? mockUserStats.lessons_completed : userStats.lessons_completed}</div>
                  <div>📝 Words Learned: {testMode ? mockUserStats.words_learned : userStats.words_learned}</div>
                  <div>🎮 Games Played: {testMode ? mockUserStats.games_played : userStats.games_played}</div>
                  <div>⭐ Perfect Scores: {testMode ? mockUserStats.perfect_scores : userStats.perfect_scores}</div>
                  <div>🔥 Streak Days: {testMode ? mockUserStats.streak_days : userStats.streak_days}</div>
                </div>
              </div>

              {/* Pronunciation Stats */}
              <div style={{
                background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                borderRadius: '15px',
                padding: '1.5rem'
              }}>
                <h3 style={{
                  margin: '0 0 1rem 0',
                  fontFamily: '"Georgia", serif',
                  color: accentColor
                }}>
                  Pronunciation Stats
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontFamily: '"Georgia", serif'
                }}>
                  <div>🎯 Total Attempts: {pronunciationStats.totalAttempts}</div>
                  <div>🌟 Excellent: {pronunciationStats.excellentCount}</div>
                  <div>👍 Good: {pronunciationStats.goodCount}</div>
                  <div>😐 Fair: {pronunciationStats.fairCount}</div>
                  <div>😕 Needs Improvement: {pronunciationStats.needsImprovementCount}</div>
                  <div>📊 Average Score: {pronunciationStats.averageScore}%</div>
                  <div>📈 Success Rate: {pronunciationStats.progress}%</div>
                </div>
              </div>

              {/* Feature Usage Stats */}
              <div style={{
                background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                borderRadius: '15px',
                padding: '1.5rem'
              }}>
                <h3 style={{
                  margin: '0 0 1rem 0',
                  fontFamily: '"Georgia", serif',
                  color: accentColor
                }}>
                  Feature Usage
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontFamily: '"Georgia", serif'
                }}>
                  <div>🎤 Pronunciations Used: {testMode ? mockUserStats.pronunciations_used : userStats.pronunciations_used}</div>
                  <div>✏️ Custom Words Added: {testMode ? mockUserStats.custom_words_added : userStats.custom_words_added}</div>
                  <div>🌙 Dark Mode Used: {testMode ? mockUserStats.dark_mode_used : userStats.dark_mode_used}</div>
                  <div>🌍 Languages Tried: {testMode ? mockUserStats.languages_tried : userStats.languages_tried}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default TestingHub; 