// Gamified Learning Data
export const GAMIFIED_FEATURES = {
  advancedGames: {
    name: 'Advanced Games',
    icon: '🎮',
    description: 'Enhanced games with advanced mechanics and features'
  },
  multiplayer: {
    name: 'Multiplayer Games',
    icon: '👥',
    description: 'Real-time multiplayer games with friends and other learners'
  },
  challenges: {
    name: 'Learning Challenges',
    icon: '🏆',
    description: 'Competitive challenges and tournaments'
  },
  rewards: {
    name: 'Enhanced Rewards',
    icon: '💎',
    description: 'Advanced reward system with special items and achievements'
  }
};

// Advanced Game Types
export const ADVANCED_GAMES = {
  wordChain: {
    id: 'word-chain',
    name: 'Word Chain',
    description: 'Create Swedish words by connecting letters in a chain',
    icon: '🔗',
    difficulty: 'medium',
    minPlayers: 1,
    maxPlayers: 4,
    timeLimit: 60,
    rewards: {
      xp: 50,
      coins: 10,
      bonus: 'chain_multiplier'
    },
    mechanics: {
      type: 'puzzle',
      features: ['letter_connection', 'word_validation', 'chain_bonus', 'time_pressure']
    }
  },
  sentenceBuilder: {
    id: 'sentence-builder',
    name: 'Sentence Builder',
    description: 'Construct grammatically correct Swedish sentences',
    icon: '📝',
    difficulty: 'hard',
    minPlayers: 1,
    maxPlayers: 2,
    timeLimit: 120,
    rewards: {
      xp: 75,
      coins: 15,
      bonus: 'grammar_master'
    },
    mechanics: {
      type: 'construction',
      features: ['word_order', 'grammar_check', 'context_clues', 'difficulty_scaling']
    }
  },
  pronunciationBattle: {
    id: 'pronunciation-battle',
    name: 'Pronunciation Battle',
    description: 'Compete in real-time pronunciation challenges',
    icon: '🎤',
    difficulty: 'medium',
    minPlayers: 2,
    maxPlayers: 4,
    timeLimit: 90,
    rewards: {
      xp: 60,
      coins: 12,
      bonus: 'pronunciation_expert'
    },
    mechanics: {
      type: 'voice',
      features: ['real_time_scoring', 'voice_recognition', 'peer_comparison', 'instant_feedback']
    }
  },
  vocabularyRush: {
    id: 'vocabulary-rush',
    name: 'Vocabulary Rush',
    description: 'Race against time to learn new words quickly',
    icon: '⚡',
    difficulty: 'easy',
    minPlayers: 1,
    maxPlayers: 6,
    timeLimit: 45,
    rewards: {
      xp: 40,
      coins: 8,
      bonus: 'speed_learner'
    },
    mechanics: {
      type: 'speed',
      features: ['rapid_presentation', 'memory_test', 'speed_bonus', 'word_categories']
    }
  },
  culturalQuiz: {
    id: 'cultural-quiz',
    name: 'Cultural Quiz',
    description: 'Test knowledge of Swedish culture and traditions',
    icon: '🏛️',
    difficulty: 'medium',
    minPlayers: 1,
    maxPlayers: 8,
    timeLimit: 180,
    rewards: {
      xp: 80,
      coins: 20,
      bonus: 'cultural_expert'
    },
    mechanics: {
      type: 'quiz',
      features: ['cultural_questions', 'multimedia_content', 'progressive_difficulty', 'cultural_insights']
    }
  },
  grammarPuzzle: {
    id: 'grammar-puzzle',
    name: 'Grammar Puzzle',
    description: 'Solve puzzles to master Swedish grammar rules',
    icon: '🧩',
    difficulty: 'hard',
    minPlayers: 1,
    maxPlayers: 2,
    timeLimit: 150,
    rewards: {
      xp: 70,
      coins: 15,
      bonus: 'grammar_puzzle_master'
    },
    mechanics: {
      type: 'puzzle',
      features: ['grammar_rules', 'pattern_recognition', 'logical_thinking', 'rule_explanation']
    }
  }
};

// Multiplayer Game Sessions
export const MULTIPLAYER_SESSIONS = [
  {
    id: 'session1',
    gameType: 'pronunciation-battle',
    host: 'SwedishLearner',
    players: ['SwedishLearner', 'StockholmDreamer', 'VikingSpirit'],
    status: 'waiting',
    maxPlayers: 4,
    currentPlayers: 3,
    startTime: new Date(Date.now() + 1000 * 60 * 5).toISOString(), // 5 minutes from now
    settings: {
      difficulty: 'medium',
      timeLimit: 90,
      rounds: 3
    }
  },
  {
    id: 'session2',
    gameType: 'cultural-quiz',
    host: 'MidsummerMagic',
    players: ['MidsummerMagic', 'FikaLover'],
    status: 'active',
    maxPlayers: 8,
    currentPlayers: 2,
    startTime: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // Started 10 minutes ago
    settings: {
      difficulty: 'medium',
      timeLimit: 180,
      rounds: 5
    }
  },
  {
    id: 'session3',
    gameType: 'vocabulary-rush',
    host: 'LagomLife',
    players: ['LagomLife'],
    status: 'waiting',
    maxPlayers: 6,
    currentPlayers: 1,
    startTime: new Date(Date.now() + 1000 * 60 * 15).toISOString(), // 15 minutes from now
    settings: {
      difficulty: 'easy',
      timeLimit: 45,
      rounds: 2
    }
  }
];

// Learning Challenges
export const LEARNING_CHALLENGES = [
  {
    id: 'challenge1',
    title: 'Grammar Master Challenge',
    description: 'Complete 10 grammar puzzles with 80% accuracy',
    type: 'grammar',
    difficulty: 'hard',
    duration: 7,
    participants: 24,
    rewards: {
      xp: 500,
      coins: 100,
      achievement: 'grammar_master_challenge',
      specialItem: 'grammar_trophy'
    },
    requirements: {
      minLevel: 10,
      minGrammarScore: 70,
      timeLimit: 7
    },
    isActive: true,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString() // 3 days
  },
  {
    id: 'challenge2',
    title: 'Pronunciation Pro Challenge',
    description: 'Achieve 90% pronunciation accuracy in 5 voice battles',
    type: 'pronunciation',
    difficulty: 'medium',
    duration: 5,
    participants: 18,
    rewards: {
      xp: 300,
      coins: 75,
      achievement: 'pronunciation_pro',
      specialItem: 'voice_crystal'
    },
    requirements: {
      minLevel: 8,
      minPronunciationScore: 75,
      timeLimit: 5
    },
    isActive: true,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString() // 2 days
  },
  {
    id: 'challenge3',
    title: 'Cultural Explorer Challenge',
    description: 'Complete 15 cultural quiz questions with perfect score',
    type: 'cultural',
    difficulty: 'medium',
    duration: 10,
    participants: 32,
    rewards: {
      xp: 400,
      coins: 80,
      achievement: 'cultural_explorer',
      specialItem: 'cultural_medal'
    },
    requirements: {
      minLevel: 12,
      minCulturalScore: 80,
      timeLimit: 10
    },
    isActive: true,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString() // 5 days
  }
];

// Enhanced Rewards System
export const ENHANCED_REWARDS = {
  specialItems: [
    {
      id: 'grammar_trophy',
      name: 'Grammar Trophy',
      description: 'Awarded for mastering Swedish grammar',
      icon: '🏆',
      rarity: 'rare',
      effect: '+10% grammar accuracy',
      unlockCondition: 'Complete Grammar Master Challenge'
    },
    {
      id: 'voice_crystal',
      name: 'Voice Crystal',
      description: 'Enhances pronunciation abilities',
      icon: '💎',
      rarity: 'epic',
      effect: '+15% pronunciation accuracy',
      unlockCondition: 'Complete Pronunciation Pro Challenge'
    },
    {
      id: 'cultural_medal',
      name: 'Cultural Medal',
      description: 'Symbol of cultural knowledge',
      icon: '🏅',
      rarity: 'rare',
      effect: '+20% cultural quiz bonus',
      unlockCondition: 'Complete Cultural Explorer Challenge'
    },
    {
      id: 'speed_boost',
      name: 'Speed Boost',
      description: 'Temporarily increases learning speed',
      icon: '⚡',
      rarity: 'common',
      effect: '+25% XP for 1 hour',
      unlockCondition: 'Win 3 Vocabulary Rush games'
    }
  ],
  powerUps: [
    {
      id: 'time_freeze',
      name: 'Time Freeze',
      description: 'Freezes the timer for 30 seconds',
      icon: '⏸️',
      cost: 50,
      duration: 30,
      effect: 'Pause game timer'
    },
    {
      id: 'hint_system',
      name: 'Hint System',
      description: 'Provides helpful hints during games',
      icon: '💡',
      cost: 25,
      duration: 60,
      effect: 'Show hints and tips'
    },
    {
      id: 'double_xp',
      name: 'Double XP',
      description: 'Doubles XP earned for 1 hour',
      icon: '2️⃣',
      cost: 100,
      duration: 3600,
      effect: '2x XP multiplier'
    },
    {
      id: 'perfect_score',
      name: 'Perfect Score',
      description: 'Guarantees perfect score on next game',
      icon: '⭐',
      cost: 200,
      duration: 1,
      effect: 'Automatic perfect score'
    }
  ]
};

// Game Statistics
export const GAME_STATISTICS = {
  totalGamesPlayed: 156,
  gamesWon: 124,
  winRate: 79.5,
  averageScore: 87.3,
  bestScore: 100,
  totalPlayTime: 2840, // minutes
  favoriteGame: 'vocabulary-rush',
  achievements: {
    perfectScores: 23,
    streaks: 8,
    challenges: 5,
    multiplayer: 12
  },
  recentGames: [
    {
      game: 'vocabulary-rush',
      score: 95,
      time: '2 minutes ago',
      result: 'won'
    },
    {
      game: 'pronunciation-battle',
      score: 88,
      time: '15 minutes ago',
      result: 'won'
    },
    {
      game: 'cultural-quiz',
      score: 92,
      time: '1 hour ago',
      result: 'won'
    },
    {
      game: 'grammar-puzzle',
      score: 78,
      time: '2 hours ago',
      result: 'lost'
    }
  ]
};

// Helper functions
export const getGamifiedFeatures = () => {
  return Object.keys(GAMIFIED_FEATURES).map(key => ({
    id: key,
    ...GAMIFIED_FEATURES[key]
  }));
};

export const getAdvancedGames = (filter = null) => {
  let games = Object.values(ADVANCED_GAMES);
  
  if (filter) {
    if (filter.difficulty) {
      games = games.filter(game => game.difficulty === filter.difficulty);
    }
    if (filter.type) {
      games = games.filter(game => game.mechanics.type === filter.type);
    }
    if (filter.minPlayers) {
      games = games.filter(game => game.minPlayers >= filter.minPlayers);
    }
  }
  
  return games;
};

export const getMultiplayerSessions = (status = null) => {
  let sessions = MULTIPLAYER_SESSIONS;
  
  if (status) {
    sessions = sessions.filter(session => session.status === status);
  }
  
  return sessions;
};

export const getLearningChallenges = (activeOnly = true) => {
  let challenges = LEARNING_CHALLENGES;
  
  if (activeOnly) {
    challenges = challenges.filter(challenge => challenge.isActive);
  }
  
  return challenges;
};

export const getSpecialItems = (rarity = null) => {
  let items = ENHANCED_REWARDS.specialItems;
  
  if (rarity) {
    items = items.filter(item => item.rarity === rarity);
  }
  
  return items;
};

export const getPowerUps = () => {
  return ENHANCED_REWARDS.powerUps;
};

export const getGameStatistics = () => {
  return GAME_STATISTICS;
};

export const calculateWinRate = (wins, total) => {
  if (total === 0) return 0;
  return Math.round((wins / total) * 100);
};

export const formatGameTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'easy': return '#27ae60';
    case 'medium': return '#f39c12';
    case 'hard': return '#e74c3c';
    default: return '#95a5a6';
  }
};

export const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'common': return '#95a5a6';
    case 'rare': return '#3498db';
    case 'epic': return '#9b59b6';
    case 'legendary': return '#f1c40f';
    default: return '#95a5a6';
  }
};

export const getGameIcon = (gameType) => {
  const game = ADVANCED_GAMES[gameType];
  return game ? game.icon : '🎮';
};

export const getGameName = (gameType) => {
  const game = ADVANCED_GAMES[gameType];
  return game ? game.name : 'Unknown Game';
}; 