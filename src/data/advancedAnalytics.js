// Advanced Analytics Data
export const ANALYTICS_CATEGORIES = {
  overview: {
    name: 'Learning Overview',
    icon: '📊',
    description: 'Overall learning progress and statistics'
  },
  performance: {
    name: 'Performance Metrics',
    icon: '📈',
    description: 'Detailed performance analysis and trends'
  },
  patterns: {
    name: 'Learning Patterns',
    icon: '🔄',
    description: 'Study habits and learning behavior analysis'
  },
  insights: {
    name: 'Smart Insights',
    icon: '💡',
    description: 'AI-powered learning recommendations'
  },
  comparisons: {
    name: 'Progress Comparisons',
    icon: '⚖️',
    description: 'Compare progress across different time periods'
  }
};

// Mock analytics data
export const ANALYTICS_DATA = {
  overview: {
    totalStudyTime: 2840, // minutes
    averageSessionLength: 23, // minutes
    totalSessions: 124,
    currentStreak: 12,
    longestStreak: 21,
    lessonsCompleted: 45,
    wordsLearned: 342,
    gamesPlayed: 67,
    perfectScores: 23,
    achievementsUnlocked: 18,
    xpEarned: 2840,
    coinsEarned: 156
  },
  performance: {
    accuracyByGame: {
      'Multiple Choice': 87,
      'Flashcards': 92,
      'Matching': 89,
      'Spelling': 78,
      'Audio Recall': 85,
      'Odd One Out': 91
    },
    accuracyByDifficulty: {
      'Easy': 94,
      'Medium': 86,
      'Hard': 72
    },
    progressByCategory: {
      'Basic Greetings': 100,
      'Numbers': 95,
      'Colors': 88,
      'Family': 82,
      'Food': 75,
      'Weather': 68,
      'Travel': 60,
      'Business': 45
    },
    timeSpentByActivity: {
      'Lessons': 45,
      'Games': 30,
      'Voice Practice': 15,
      'Cultural Learning': 10
    },
    weeklyProgress: [
      { week: 'Week 1', xp: 120, lessons: 3, games: 8 },
      { week: 'Week 2', xp: 180, lessons: 4, games: 12 },
      { week: 'Week 3', xp: 220, lessons: 5, games: 15 },
      { week: 'Week 4', xp: 280, lessons: 6, games: 18 },
      { week: 'Week 5', xp: 320, lessons: 7, games: 20 },
      { week: 'Week 6', xp: 380, lessons: 8, games: 22 },
      { week: 'Week 7', xp: 420, lessons: 9, games: 25 },
      { week: 'Week 8', xp: 480, lessons: 10, games: 28 }
    ]
  },
  patterns: {
    studySchedule: {
      'Monday': 18,
      'Tuesday': 22,
      'Wednesday': 15,
      'Thursday': 25,
      'Friday': 20,
      'Saturday': 12,
      'Sunday': 8
    },
    studyTimeDistribution: {
      'Morning (6-12)': 25,
      'Afternoon (12-18)': 40,
      'Evening (18-24)': 30,
      'Night (0-6)': 5
    },
    sessionLengthDistribution: {
      '5-15 minutes': 35,
      '15-30 minutes': 45,
      '30-60 minutes': 15,
      '60+ minutes': 5
    },
    preferredActivities: {
      'Games': 40,
      'Lessons': 35,
      'Voice Practice': 15,
      'Cultural Learning': 10
    },
    learningSpeed: {
      'Vocabulary': 'Fast',
      'Grammar': 'Medium',
      'Pronunciation': 'Slow',
      'Cultural': 'Medium'
    }
  },
  insights: {
    strengths: [
      'Excellent vocabulary retention (92% accuracy)',
      'Strong performance in matching games',
      'Consistent daily study habit',
      'Good progress in basic categories'
    ],
    weaknesses: [
      'Pronunciation needs improvement (78% accuracy)',
      'Advanced grammar concepts challenging',
      'Limited time spent on cultural learning',
      'Spelling accuracy below average'
    ],
    recommendations: [
      'Focus on pronunciation practice with voice recognition',
      'Spend more time on cultural lessons',
      'Practice spelling exercises regularly',
      'Review advanced grammar concepts',
      'Try longer study sessions for better retention'
    ],
    predictions: [
      'At current pace, will reach level 20 in 3 weeks',
      'Could unlock 5 more achievements this month',
      'Pronunciation accuracy likely to improve with practice',
      'Cultural knowledge will enhance overall learning'
    ]
  },
  comparisons: {
    monthlyProgress: [
      { month: 'January', xp: 480, lessons: 10, accuracy: 82 },
      { month: 'February', xp: 520, lessons: 12, accuracy: 85 },
      { month: 'March', xp: 580, lessons: 14, accuracy: 87 },
      { month: 'April', xp: 640, lessons: 16, accuracy: 89 },
      { month: 'May', xp: 720, lessons: 18, accuracy: 91 },
      { month: 'June', xp: 800, lessons: 20, accuracy: 93 }
    ],
    weeklyComparison: {
      currentWeek: {
        xp: 120,
        lessons: 3,
        games: 8,
        accuracy: 89,
        studyTime: 180
      },
      previousWeek: {
        xp: 110,
        lessons: 2,
        games: 7,
        accuracy: 87,
        studyTime: 165
      },
      improvement: {
        xp: '+9%',
        lessons: '+50%',
        games: '+14%',
        accuracy: '+2%',
        studyTime: '+9%'
      }
    },
    peerComparison: {
      userRank: 3,
      totalUsers: 1250,
      percentile: 85,
      averageAccuracy: 82,
      userAccuracy: 89,
      averageStudyTime: 18,
      userStudyTime: 23
    }
  }
};

// Learning insights and recommendations
export const LEARNING_INSIGHTS = {
  vocabulary: {
    strength: 'High retention rate',
    weakness: 'Advanced vocabulary needs work',
    recommendation: 'Focus on context-based learning',
    target: 'Increase advanced vocabulary by 20%'
  },
  grammar: {
    strength: 'Good basic grammar understanding',
    weakness: 'Complex sentence structures',
    recommendation: 'Practice with sentence building exercises',
    target: 'Master 3 new grammar concepts this month'
  },
  pronunciation: {
    strength: 'Clear basic pronunciation',
    weakness: 'Difficult sounds and intonation',
    recommendation: 'Use voice recognition more frequently',
    target: 'Improve pronunciation accuracy to 85%'
  },
  cultural: {
    strength: 'Interest in cultural topics',
    weakness: 'Limited cultural knowledge',
    recommendation: 'Complete more cultural lessons',
    target: 'Complete 5 cultural lessons this month'
  }
};

// Performance trends
export const PERFORMANCE_TRENDS = {
  daily: [
    { date: '2024-01-01', xp: 45, accuracy: 85 },
    { date: '2024-01-02', xp: 52, accuracy: 87 },
    { date: '2024-01-03', xp: 38, accuracy: 82 },
    { date: '2024-01-04', xp: 61, accuracy: 89 },
    { date: '2024-01-05', xp: 48, accuracy: 86 },
    { date: '2024-01-06', xp: 55, accuracy: 88 },
    { date: '2024-01-07', xp: 42, accuracy: 84 }
  ],
  weekly: [
    { week: 'Week 1', xp: 320, accuracy: 86, lessons: 8 },
    { week: 'Week 2', xp: 380, accuracy: 88, lessons: 10 },
    { week: 'Week 3', xp: 420, accuracy: 89, lessons: 12 },
    { week: 'Week 4', xp: 480, accuracy: 91, lessons: 14 },
    { week: 'Week 5', xp: 520, accuracy: 92, lessons: 16 },
    { week: 'Week 6', xp: 580, accuracy: 93, lessons: 18 },
    { week: 'Week 7', xp: 640, accuracy: 94, lessons: 20 },
    { week: 'Week 8', xp: 720, accuracy: 95, lessons: 22 }
  ],
  monthly: [
    { month: 'January', xp: 1280, accuracy: 86, lessons: 32 },
    { month: 'February', xp: 1520, accuracy: 88, lessons: 38 },
    { month: 'March', xp: 1680, accuracy: 90, lessons: 42 },
    { month: 'April', xp: 1840, accuracy: 91, lessons: 46 },
    { month: 'May', xp: 2080, accuracy: 93, lessons: 52 },
    { month: 'June', xp: 2320, accuracy: 94, lessons: 58 }
  ]
};

// Helper functions
export const getAnalyticsCategories = () => {
  return Object.keys(ANALYTICS_CATEGORIES).map(key => ({
    id: key,
    ...ANALYTICS_CATEGORIES[key]
  }));
};

export const getAnalyticsData = (category = 'overview') => {
  return ANALYTICS_DATA[category] || {};
};

export const getLearningInsights = (category = null) => {
  if (category) {
    return LEARNING_INSIGHTS[category] || {};
  }
  return LEARNING_INSIGHTS;
};

export const getPerformanceTrends = (period = 'weekly') => {
  return PERFORMANCE_TRENDS[period] || [];
};

export const calculateImprovement = (current, previous) => {
  if (previous === 0) return 100;
  return Math.round(((current - previous) / previous) * 100);
};

export const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

export const formatPercentage = (value) => {
  return `${value}%`;
};

export const getAccuracyColor = (accuracy) => {
  if (accuracy >= 90) return '#27ae60'; // Green
  if (accuracy >= 80) return '#f39c12'; // Orange
  if (accuracy >= 70) return '#e74c3c'; // Red
  return '#95a5a6'; // Gray
};

export const getProgressColor = (progress) => {
  if (progress >= 80) return '#27ae60'; // Green
  if (progress >= 60) return '#f39c12'; // Orange
  if (progress >= 40) return '#e74c3c'; // Red
  return '#95a5a6'; // Gray
};

export const getTrendDirection = (current, previous) => {
  if (current > previous) return 'up';
  if (current < previous) return 'down';
  return 'stable';
};

export const getStudyRecommendation = (patterns) => {
  const recommendations = [];
  
  if (patterns.studyTimeDistribution['Evening (18-24)'] > 50) {
    recommendations.push('Consider studying earlier in the day for better retention');
  }
  
  if (patterns.sessionLengthDistribution['5-15 minutes'] > 60) {
    recommendations.push('Try longer study sessions for better learning outcomes');
  }
  
  if (patterns.preferredActivities['Games'] > 50) {
    recommendations.push('Balance games with more lesson-focused learning');
  }
  
  return recommendations;
};

export const getPerformanceInsights = (performance) => {
  const insights = [];
  
  // Find best performing game
  const gameAccuracies = Object.entries(performance.accuracyByGame);
  const bestGame = gameAccuracies.reduce((a, b) => a[1] > b[1] ? a : b);
  insights.push(`You excel at ${bestGame[0]} with ${bestGame[1]}% accuracy`);
  
  // Find area needing improvement
  const worstGame = gameAccuracies.reduce((a, b) => a[1] < b[1] ? a : b);
  insights.push(`Focus on improving ${worstGame[0]} (currently ${worstGame[1]}% accuracy)`);
  
  return insights;
}; 