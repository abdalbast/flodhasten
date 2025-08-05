import React, { useState, useMemo } from 'react';
import { FaChartLine, FaChartBar, FaChartPie, FaTrendingUp, FaTrendingDown, FaMinus, FaLightbulb, FaTarget, FaClock, FaTrophy, FaStar, FaCheck, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { 
  ANALYTICS_CATEGORIES, 
  ANALYTICS_DATA, 
  LEARNING_INSIGHTS, 
  PERFORMANCE_TRENDS,
  getAnalyticsCategories,
  getAnalyticsData,
  getLearningInsights,
  getPerformanceTrends,
  calculateImprovement,
  formatTime,
  formatPercentage,
  getAccuracyColor,
  getProgressColor,
  getTrendDirection,
  getStudyRecommendation,
  getPerformanceInsights
} from '../data/advancedAnalytics';

const AdvancedAnalytics = React.memo(({ userStats, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  const analyticsCategories = useMemo(() => getAnalyticsCategories(), []);
  const analyticsData = useMemo(() => getAnalyticsData(activeTab), [activeTab]);
  const learningInsights = useMemo(() => getLearningInsights(), []);
  const performanceTrends = useMemo(() => getPerformanceTrends(selectedPeriod), [selectedPeriod]);

  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const accentColor = isDarkMode ? '#3498db' : '#3498db';
  const successColor = isDarkMode ? '#27ae60' : '#27ae60';
  const warningColor = isDarkMode ? '#f39c12' : '#f39c12';
  const errorColor = isDarkMode ? '#e74c3c' : '#e74c3c';

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <FaChartBar />, feature: analyticsCategories[0] },
    { id: 'performance', name: 'Performance', icon: <FaChartLine />, feature: analyticsCategories[1] },
    { id: 'patterns', name: 'Patterns', icon: <FaChartPie />, feature: analyticsCategories[2] },
    { id: 'insights', name: 'Insights', icon: <FaLightbulb />, feature: analyticsCategories[3] },
    { id: 'comparisons', name: 'Comparisons', icon: <FaTarget />, feature: analyticsCategories[4] }
  ];

  const periods = [
    { id: 'daily', name: 'Daily', icon: '📅' },
    { id: 'weekly', name: 'Weekly', icon: '📊' },
    { id: 'monthly', name: 'Monthly', icon: '📈' }
  ];

  // Render overview tab
  const renderOverview = () => {
    const data = analyticsData;
    return (
      <div>
        <h2 style={{
          margin: '0 0 1.5rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          📊 Learning Overview
        </h2>

        {/* Key Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
            border: `2px solid ${borderColor}`,
            borderRadius: '15px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏱️</div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: accentColor,
              fontFamily: '"Georgia", serif'
            }}>
              {formatTime(data.totalStudyTime)}
            </div>
            <div style={{
              fontSize: '0.9rem',
              opacity: 0.7,
              fontFamily: '"Georgia", serif'
            }}>
              Total Study Time
            </div>
          </div>

          <div style={{
            background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
            border: `2px solid ${borderColor}`,
            borderRadius: '15px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔥</div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: successColor,
              fontFamily: '"Georgia", serif'
            }}>
              {data.currentStreak}
            </div>
            <div style={{
              fontSize: '0.9rem',
              opacity: 0.7,
              fontFamily: '"Georgia", serif'
            }}>
              Day Streak
            </div>
          </div>

          <div style={{
            background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
            border: `2px solid ${borderColor}`,
            borderRadius: '15px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: accentColor,
              fontFamily: '"Georgia", serif'
            }}>
              {data.lessonsCompleted}
            </div>
            <div style={{
              fontSize: '0.9rem',
              opacity: 0.7,
              fontFamily: '"Georgia", serif'
            }}>
              Lessons Completed
            </div>
          </div>

          <div style={{
            background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
            border: `2px solid ${borderColor}`,
            borderRadius: '15px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: warningColor,
              fontFamily: '"Georgia", serif'
            }}>
              {data.wordsLearned}
            </div>
            <div style={{
              fontSize: '0.9rem',
              opacity: 0.7,
              fontFamily: '"Georgia", serif'
            }}>
              Words Learned
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
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
              🎮 Gaming Stats
            </h3>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontFamily: '"Georgia", serif' }}>Games Played:</span>
              <span style={{ fontWeight: 'bold' }}>{data.gamesPlayed}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontFamily: '"Georgia", serif' }}>Perfect Scores:</span>
              <span style={{ fontWeight: 'bold', color: successColor }}>{data.perfectScores}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontFamily: '"Georgia", serif' }}>Achievements:</span>
              <span style={{ fontWeight: 'bold', color: warningColor }}>{data.achievementsUnlocked}</span>
            </div>
          </div>

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
              💰 Rewards Earned
            </h3>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontFamily: '"Georgia", serif' }}>Total XP:</span>
              <span style={{ fontWeight: 'bold', color: accentColor }}>{data.xpEarned.toLocaleString()}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontFamily: '"Georgia", serif' }}>Coins Earned:</span>
              <span style={{ fontWeight: 'bold', color: warningColor }}>{data.coinsEarned}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontFamily: '"Georgia", serif' }}>Avg Session:</span>
              <span style={{ fontWeight: 'bold' }}>{data.averageSessionLength}m</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render performance tab
  const renderPerformance = () => {
    const data = analyticsData;
    return (
      <div>
        <h2 style={{
          margin: '0 0 1.5rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          📈 Performance Metrics
        </h2>

        {/* Period Selector */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {periods.map(period => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              style={{
                background: selectedPeriod === period.id ? accentColor : cardBackground,
                color: selectedPeriod === period.id ? '#fff' : textColor,
                border: `2px solid ${selectedPeriod === period.id ? accentColor : borderColor}`,
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
              <span>{period.icon}</span>
              {period.name}
            </button>
          ))}
        </div>

        {/* Game Accuracy */}
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
            🎮 Game Performance
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {Object.entries(data.accuracyByGame).map(([game, accuracy]) => (
              <div
                key={game}
                style={{
                  background: cardBackground,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  padding: '1rem',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  fontFamily: '"Georgia", serif',
                  marginBottom: '0.5rem'
                }}>
                  {game}
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: getAccuracyColor(accuracy),
                  fontFamily: '"Georgia", serif'
                }}>
                  {accuracy}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Progress */}
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
            📚 Category Progress
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {Object.entries(data.progressByCategory).map(([category, progress]) => (
              <div key={category}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontFamily: '"Georgia", serif',
                    fontSize: '0.9rem'
                  }}>
                    {category}
                  </span>
                  <span style={{
                    fontWeight: 'bold',
                    color: getProgressColor(progress),
                    fontFamily: '"Georgia", serif'
                  }}>
                    {progress}%
                  </span>
                </div>
                <div style={{
                  background: borderColor,
                  borderRadius: '10px',
                  height: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: getProgressColor(progress),
                    height: '100%',
                    width: `${progress}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Distribution */}
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
            ⏰ Time Distribution
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {Object.entries(data.timeSpentByActivity).map(([activity, percentage]) => (
              <div
                key={activity}
                style={{
                  background: cardBackground,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  padding: '1rem',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  fontFamily: '"Georgia", serif',
                  marginBottom: '0.5rem'
                }}>
                  {activity}
                </div>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: accentColor,
                  fontFamily: '"Georgia", serif'
                }}>
                  {percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render patterns tab
  const renderPatterns = () => {
    const data = analyticsData;
    return (
      <div>
        <h2 style={{
          margin: '0 0 1.5rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          🔄 Learning Patterns
        </h2>

        {/* Study Schedule */}
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
            📅 Weekly Study Schedule
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '0.5rem'
          }}>
            {Object.entries(data.studySchedule).map(([day, minutes]) => (
              <div
                key={day}
                style={{
                  background: cardBackground,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  padding: '1rem',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  fontFamily: '"Georgia", serif',
                  marginBottom: '0.5rem'
                }}>
                  {day.slice(0, 3)}
                </div>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: accentColor,
                  fontFamily: '"Georgia", serif'
                }}>
                  {minutes}m
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Time Distribution */}
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
            🌅 Study Time Distribution
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {Object.entries(data.studyTimeDistribution).map(([time, percentage]) => (
              <div key={time}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontFamily: '"Georgia", serif',
                    fontSize: '0.9rem'
                  }}>
                    {time}
                  </span>
                  <span style={{
                    fontWeight: 'bold',
                    color: accentColor,
                    fontFamily: '"Georgia", serif'
                  }}>
                    {percentage}%
                  </span>
                </div>
                <div style={{
                  background: borderColor,
                  borderRadius: '10px',
                  height: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: accentColor,
                    height: '100%',
                    width: `${percentage}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Speed */}
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
            ⚡ Learning Speed by Category
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {Object.entries(data.learningSpeed).map(([category, speed]) => (
              <div
                key={category}
                style={{
                  background: cardBackground,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  padding: '1rem',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  fontFamily: '"Georgia", serif',
                  marginBottom: '0.5rem'
                }}>
                  {category}
                </div>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: speed === 'Fast' ? successColor : speed === 'Medium' ? warningColor : errorColor,
                  fontFamily: '"Georgia", serif'
                }}>
                  {speed}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render insights tab
  const renderInsights = () => {
    const data = analyticsData;
    const recommendations = getStudyRecommendation(data);
    const performanceInsights = getPerformanceInsights(data);
    
    return (
      <div>
        <h2 style={{
          margin: '0 0 1.5rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          💡 Smart Insights
        </h2>

        {/* Strengths */}
        <div style={{
          background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
          border: `2px solid ${successColor}`,
          borderRadius: '15px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontFamily: '"Georgia", serif',
            color: successColor
          }}>
            ✅ Your Strengths
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {data.strengths.map((strength, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: '"Georgia", serif'
                }}
              >
                <FaCheck style={{ color: successColor }} />
                {strength}
              </div>
            ))}
          </div>
        </div>

        {/* Areas for Improvement */}
        <div style={{
          background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
          border: `2px solid ${warningColor}`,
          borderRadius: '15px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontFamily: '"Georgia", serif',
            color: warningColor
          }}>
            🔧 Areas for Improvement
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {data.weaknesses.map((weakness, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: '"Georgia", serif'
                }}
              >
                <FaTimes style={{ color: warningColor }} />
                {weakness}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div style={{
          background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
          border: `2px solid ${accentColor}`,
          borderRadius: '15px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontFamily: '"Georgia", serif',
            color: accentColor
          }}>
            🎯 Personalized Recommendations
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {data.recommendations.map((recommendation, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: '"Georgia", serif'
                }}
              >
                <FaTarget style={{ color: accentColor }} />
                {recommendation}
              </div>
            ))}
          </div>
        </div>

        {/* Predictions */}
        <div style={{
          background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
          border: `2px solid ${warningColor}`,
          borderRadius: '15px',
          padding: '1.5rem'
        }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontFamily: '"Georgia", serif',
            color: warningColor
          }}>
            🔮 Learning Predictions
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {data.predictions.map((prediction, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: '"Georgia", serif'
                }}
              >
                <FaStar style={{ color: warningColor }} />
                {prediction}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render comparisons tab
  const renderComparisons = () => {
    const data = analyticsData;
    return (
      <div>
        <h2 style={{
          margin: '0 0 1.5rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          ⚖️ Progress Comparisons
        </h2>

        {/* Weekly Comparison */}
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
            📊 This Week vs Last Week
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {Object.entries(data.weeklyComparison.improvement).map(([metric, change]) => (
              <div
                key={metric}
                style={{
                  background: cardBackground,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  padding: '1rem',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  fontFamily: '"Georgia", serif',
                  marginBottom: '0.5rem',
                  textTransform: 'capitalize'
                }}>
                  {metric.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: change.startsWith('+') ? successColor : change.startsWith('-') ? errorColor : textColor,
                  fontFamily: '"Georgia", serif'
                }}>
                  {change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peer Comparison */}
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
            👥 Peer Comparison
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              background: cardBackground,
              border: `1px solid ${borderColor}`,
              borderRadius: '10px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: '"Georgia", serif',
                marginBottom: '0.5rem'
              }}>
                Global Rank
              </div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: accentColor,
                fontFamily: '"Georgia", serif'
              }}>
                #{data.peerComparison.userRank}
              </div>
              <div style={{
                fontSize: '0.8rem',
                opacity: 0.7,
                fontFamily: '"Georgia", serif'
              }}>
                of {data.peerComparison.totalUsers} users
              </div>
            </div>

            <div style={{
              background: cardBackground,
              border: `1px solid ${borderColor}`,
              borderRadius: '10px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: '"Georgia", serif',
                marginBottom: '0.5rem'
              }}>
                Percentile
              </div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: successColor,
                fontFamily: '"Georgia", serif'
              }}>
                {data.peerComparison.percentile}%
              </div>
              <div style={{
                fontSize: '0.8rem',
                opacity: 0.7,
                fontFamily: '"Georgia", serif'
              }}>
                Top {100 - data.peerComparison.percentile}%
              </div>
            </div>

            <div style={{
              background: cardBackground,
              border: `1px solid ${borderColor}`,
              borderRadius: '10px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: '"Georgia", serif',
                marginBottom: '0.5rem'
              }}>
                Accuracy vs Average
              </div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: data.peerComparison.userAccuracy > data.peerComparison.averageAccuracy ? successColor : errorColor,
                fontFamily: '"Georgia", serif'
              }}>
                {data.peerComparison.userAccuracy}% vs {data.peerComparison.averageAccuracy}%
              </div>
            </div>
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
          📊 Advanced Analytics
        </h1>
        <p style={{
          fontSize: '1.1rem',
          margin: '0',
          opacity: 0.8,
          fontFamily: '"Georgia", serif'
        }}>
          Deep insights into your learning journey and performance patterns
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'performance' && renderPerformance()}
        {activeTab === 'patterns' && renderPatterns()}
        {activeTab === 'insights' && renderInsights()}
        {activeTab === 'comparisons' && renderComparisons()}
      </div>
    </div>
  );
});

export default AdvancedAnalytics; 