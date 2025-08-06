// Social Features Data
export const SOCIAL_FEATURES = {
  studyGroups: {
    name: 'Study Groups',
    icon: '👥',
    description: 'Join or create study groups to learn together'
  },
  leaderboards: {
    name: 'Leaderboards',
    icon: '🏆',
    description: 'Compete with other learners on global and friend leaderboards'
  },
  friends: {
    name: 'Friends',
    icon: '🤝',
    description: 'Connect with friends and see their progress'
  },
  challenges: {
    name: 'Group Challenges',
    icon: '🎯',
    description: 'Participate in group challenges and competitions'
  }
};

// Mock user data for social features
export const MOCK_USERS = [
  {
    id: 'user1',
    username: 'SwedishLearner',
    avatar: '🦁',
    level: 15,
    xp: 2840,
    streak: 12,
    achievements: 23,
    lessonsCompleted: 45,
    isOnline: true,
    lastActive: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
  },
  {
    id: 'user2',
    username: 'StockholmDreamer',
    avatar: '🐺',
    level: 12,
    xp: 2150,
    streak: 8,
    achievements: 18,
    lessonsCompleted: 38,
    isOnline: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
  },
  {
    id: 'user3',
    username: 'VikingSpirit',
    avatar: '🦅',
    level: 18,
    xp: 3420,
    streak: 21,
    achievements: 31,
    lessonsCompleted: 62,
    isOnline: true,
    lastActive: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 minutes ago
  },
  {
    id: 'user4',
    username: 'FikaLover',
    avatar: '☕',
    level: 9,
    xp: 1450,
    streak: 5,
    achievements: 12,
    lessonsCompleted: 28,
    isOnline: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
  },
  {
    id: 'user5',
    username: 'MidsummerMagic',
    avatar: '🌸',
    level: 22,
    xp: 4150,
    streak: 35,
    achievements: 42,
    lessonsCompleted: 78,
    isOnline: true,
    lastActive: new Date(Date.now() - 1000 * 60 * 2).toISOString() // 2 minutes ago
  },
  {
    id: 'user6',
    username: 'LagomLife',
    avatar: '⚖️',
    level: 7,
    xp: 980,
    streak: 3,
    achievements: 8,
    lessonsCompleted: 19,
    isOnline: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() // 12 hours ago
  }
];

// Study Groups Data
export const STUDY_GROUPS = [
  {
    id: 'group1',
    name: 'Swedish Beginners',
    description: 'A supportive group for beginners learning Swedish together',
    icon: '🌱',
    memberCount: 24,
    maxMembers: 50,
    level: 'beginner',
    isPublic: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1 week ago
    owner: 'user1',
    members: ['user1', 'user2', 'user4', 'user6'],
    recentActivity: [
      {
        type: 'lesson_completed',
        user: 'user2',
        message: 'completed "Basic Greetings" lesson',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
      },
      {
        type: 'achievement_unlocked',
        user: 'user4',
        message: 'unlocked "First Steps" achievement',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
      },
      {
        type: 'streak_milestone',
        user: 'user1',
        message: 'reached 10-day learning streak',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
      }
    ],
    weeklyGoal: 'Complete 5 lessons this week',
    weeklyProgress: 3
  },
  {
    id: 'group2',
    name: 'Advanced Swedish',
    description: 'For intermediate and advanced learners focusing on complex topics',
    icon: '🚀',
    memberCount: 12,
    maxMembers: 30,
    level: 'advanced',
    isPublic: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), // 2 weeks ago
    owner: 'user3',
    members: ['user3', 'user5'],
    recentActivity: [
      {
        type: 'lesson_completed',
        user: 'user3',
        message: 'completed "Complex Grammar" lesson',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
      },
      {
        type: 'achievement_unlocked',
        user: 'user5',
        message: 'unlocked "Grammar Master" achievement',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString()
      }
    ],
    weeklyGoal: 'Master 3 advanced grammar concepts',
    weeklyProgress: 2
  },
  {
    id: 'group3',
    name: 'Swedish Culture Enthusiasts',
    description: 'Learn about Swedish culture, traditions, and history',
    icon: '🏛️',
    memberCount: 18,
    maxMembers: 40,
    level: 'intermediate',
    isPublic: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(), // 3 weeks ago
    owner: 'user5',
    members: ['user5', 'user1', 'user3'],
    recentActivity: [
      {
        type: 'lesson_completed',
        user: 'user5',
        message: 'completed "Midsummer Traditions" lesson',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString()
      },
      {
        type: 'achievement_unlocked',
        user: 'user1',
        message: 'unlocked "Cultural Explorer" achievement',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
      }
    ],
    weeklyGoal: 'Complete 2 cultural lessons',
    weeklyProgress: 1
  }
];

// Leaderboard Data
export const LEADERBOARD_TYPES = {
  global: {
    name: 'Global Leaderboard',
    description: 'Top learners worldwide',
    icon: '🌍'
  },
  friends: {
    name: 'Friends Leaderboard',
    description: 'Compare with your friends',
    icon: '👥'
  },
  weekly: {
    name: 'Weekly Challenge',
    description: 'This week\'s top performers',
    icon: '📅'
  },
  monthly: {
    name: 'Monthly Champions',
    description: 'Best performers this month',
    icon: '📊'
  }
};

// Mock leaderboard data
export const LEADERBOARD_DATA = {
  global: [
    { rank: 1, user: MOCK_USERS[4], score: 4150, change: 0 },
    { rank: 2, user: MOCK_USERS[2], score: 3420, change: 1 },
    { rank: 3, user: MOCK_USERS[0], score: 2840, change: -1 },
    { rank: 4, user: MOCK_USERS[1], score: 2150, change: 0 },
    { rank: 5, user: MOCK_USERS[3], score: 1450, change: 2 },
    { rank: 6, user: MOCK_USERS[5], score: 980, change: -1 }
  ],
  friends: [
    { rank: 1, user: MOCK_USERS[2], score: 3420, change: 0 },
    { rank: 2, user: MOCK_USERS[0], score: 2840, change: 1 },
    { rank: 3, user: MOCK_USERS[1], score: 2150, change: -1 },
    { rank: 4, user: MOCK_USERS[3], score: 1450, change: 0 },
    { rank: 5, user: MOCK_USERS[5], score: 980, change: 0 }
  ],
  weekly: [
    { rank: 1, user: MOCK_USERS[4], score: 850, change: 0 },
    { rank: 2, user: MOCK_USERS[2], score: 720, change: 1 },
    { rank: 3, user: MOCK_USERS[0], score: 680, change: -1 },
    { rank: 4, user: MOCK_USERS[1], score: 450, change: 0 },
    { rank: 5, user: MOCK_USERS[3], score: 320, change: 2 }
  ],
  monthly: [
    { rank: 1, user: MOCK_USERS[4], score: 2150, change: 0 },
    { rank: 2, user: MOCK_USERS[2], score: 1820, change: 1 },
    { rank: 3, user: MOCK_USERS[0], score: 1680, change: -1 },
    { rank: 4, user: MOCK_USERS[1], score: 1250, change: 0 },
    { rank: 5, user: MOCK_USERS[3], score: 980, change: 2 }
  ]
};

// Group Challenges Data
export const GROUP_CHALLENGES = [
  {
    id: 'challenge1',
    title: 'Vocabulary Sprint',
    description: 'Learn 50 new Swedish words in 7 days',
    type: 'vocabulary',
    duration: 7,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // Started 2 days ago
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(), // Ends in 5 days
    participants: ['user1', 'user2', 'user3', 'user4', 'user5'],
    progress: {
      'user1': 35,
      'user2': 28,
      'user3': 42,
      'user4': 15,
      'user5': 38
    },
    rewards: {
      xp: 200,
      coins: 50,
      achievement: 'vocabulary_master'
    },
    isActive: true
  },
  {
    id: 'challenge2',
    title: 'Streak Warriors',
    description: 'Maintain a 14-day learning streak',
    type: 'streak',
    duration: 14,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // Started 5 days ago
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 9).toISOString(), // Ends in 9 days
    participants: ['user1', 'user3', 'user5'],
    progress: {
      'user1': 12,
      'user3': 21,
      'user5': 35
    },
    rewards: {
      xp: 300,
      coins: 75,
      achievement: 'streak_champion'
    },
    isActive: true
  },
  {
    id: 'challenge3',
    title: 'Cultural Explorer',
    description: 'Complete 5 cultural lessons',
    type: 'cultural',
    duration: 10,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // Started 1 day ago
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 9).toISOString(), // Ends in 9 days
    participants: ['user1', 'user4', 'user5'],
    progress: {
      'user1': 2,
      'user4': 1,
      'user5': 3
    },
    rewards: {
      xp: 250,
      coins: 60,
      achievement: 'cultural_expert'
    },
    isActive: true
  }
];

// Helper functions
export const getSocialFeatures = () => {
  return Object.keys(SOCIAL_FEATURES).map(key => ({
    id: key,
    ...SOCIAL_FEATURES[key]
  }));
};

export const getStudyGroups = (filter = null) => {
  let groups = STUDY_GROUPS;
  
  if (filter) {
    if (filter.level) {
      groups = groups.filter(group => group.level === filter.level);
    }
    if (filter.isPublic !== undefined) {
      groups = groups.filter(group => group.isPublic === filter.isPublic);
    }
  }
  
  return groups;
};

export const getLeaderboardData = (type = 'global') => {
  return LEADERBOARD_DATA[type] || [];
};

export const getGroupChallenges = (activeOnly = true) => {
  let challenges = GROUP_CHALLENGES;
  
  if (activeOnly) {
    challenges = challenges.filter(challenge => challenge.isActive);
  }
  
  return challenges;
};

export const getUserById = (userId) => {
  return MOCK_USERS.find(user => user.id === userId);
};

export const getStudyGroupById = (groupId) => {
  return STUDY_GROUPS.find(group => group.id === groupId);
};

export const getChallengeById = (challengeId) => {
  return GROUP_CHALLENGES.find(challenge => challenge.id === challengeId);
};

export const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMinutes = Math.floor((now - time) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks}w ago`;
};

export const getOnlineStatus = (user) => {
  if (user.isOnline) return '🟢 Online';
  
  const lastActive = new Date(user.lastActive);
  const now = new Date();
  const diffInMinutes = Math.floor((now - lastActive) / (1000 * 60));
  
  if (diffInMinutes < 5) return '🟡 Recently';
  if (diffInMinutes < 60) return '🟠 Away';
  return '🔴 Offline';
}; 