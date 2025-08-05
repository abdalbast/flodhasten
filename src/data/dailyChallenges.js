// Daily Challenges System for Flodhästen
export const CHALLENGE_TYPES = {
  VOCABULARY: 'vocabulary',
  GRAMMAR: 'grammar',
  PRONUNCIATION: 'pronunciation',
  GAMES: 'games',
  STREAK: 'streak',
  EXPLORATION: 'exploration'
};

export const CHALLENGE_DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

// Challenge templates
export const CHALLENGE_TEMPLATES = {
  [CHALLENGE_TYPES.VOCABULARY]: {
    easy: [
      {
        id: 'learn_5_words',
        title: 'Word Collector',
        description: 'Learn 5 new Swedish words today',
        type: CHALLENGE_TYPES.VOCABULARY,
        difficulty: CHALLENGE_DIFFICULTY.EASY,
        requirement: { type: 'words_learned', count: 5 },
        xpReward: 50,
        coinsReward: 10,
        icon: '📝'
      },
      {
        id: 'practice_10_words',
        title: 'Word Practice',
        description: 'Practice 10 words in any game',
        type: CHALLENGE_TYPES.VOCABULARY,
        difficulty: CHALLENGE_DIFFICULTY.EASY,
        requirement: { type: 'words_practiced', count: 10 },
        xpReward: 40,
        coinsReward: 8,
        icon: '📚'
      }
    ],
    medium: [
      {
        id: 'learn_15_words',
        title: 'Vocabulary Builder',
        description: 'Learn 15 new Swedish words today',
        type: CHALLENGE_TYPES.VOCABULARY,
        difficulty: CHALLENGE_DIFFICULTY.MEDIUM,
        requirement: { type: 'words_learned', count: 15 },
        xpReward: 100,
        coinsReward: 20,
        icon: '📖'
      },
      {
        id: 'perfect_vocabulary_game',
        title: 'Perfect Memory',
        description: 'Get 100% on a vocabulary game',
        type: CHALLENGE_TYPES.VOCABULARY,
        difficulty: CHALLENGE_DIFFICULTY.MEDIUM,
        requirement: { type: 'perfect_vocabulary_scores', count: 1 },
        xpReward: 150,
        coinsReward: 30,
        icon: '⭐'
      }
    ],
    hard: [
      {
        id: 'learn_30_words',
        title: 'Word Master',
        description: 'Learn 30 new Swedish words today',
        type: CHALLENGE_TYPES.VOCABULARY,
        difficulty: CHALLENGE_DIFFICULTY.HARD,
        requirement: { type: 'words_learned', count: 30 },
        xpReward: 200,
        coinsReward: 40,
        icon: '👑'
      }
    ]
  },
  
  [CHALLENGE_TYPES.GRAMMAR]: {
    easy: [
      {
        id: 'complete_grammar_lesson',
        title: 'Grammar Basics',
        description: 'Complete a grammar-focused lesson',
        type: CHALLENGE_TYPES.GRAMMAR,
        difficulty: CHALLENGE_DIFFICULTY.EASY,
        requirement: { type: 'grammar_lessons_completed', count: 1 },
        xpReward: 60,
        coinsReward: 12,
        icon: '📝'
      }
    ],
    medium: [
      {
        id: 'complete_3_grammar_lessons',
        title: 'Grammar Enthusiast',
        description: 'Complete 3 grammar-focused lessons',
        type: CHALLENGE_TYPES.GRAMMAR,
        difficulty: CHALLENGE_DIFFICULTY.MEDIUM,
        requirement: { type: 'grammar_lessons_completed', count: 3 },
        xpReward: 120,
        coinsReward: 25,
        icon: '📚'
      }
    ],
    hard: [
      {
        id: 'perfect_grammar_game',
        title: 'Grammar Master',
        description: 'Get 100% on a grammar game',
        type: CHALLENGE_TYPES.GRAMMAR,
        difficulty: CHALLENGE_DIFFICULTY.HARD,
        requirement: { type: 'perfect_grammar_scores', count: 1 },
        xpReward: 250,
        coinsReward: 50,
        icon: '👑'
      }
    ]
  },
  
  [CHALLENGE_TYPES.PRONUNCIATION]: {
    easy: [
      {
        id: 'use_pronunciation_5_times',
        title: 'Voice Learner',
        description: 'Use the pronunciation feature 5 times',
        type: CHALLENGE_TYPES.PRONUNCIATION,
        difficulty: CHALLENGE_DIFFICULTY.EASY,
        requirement: { type: 'pronunciations_used', count: 5 },
        xpReward: 30,
        coinsReward: 6,
        icon: '🎤'
      }
    ],
    medium: [
      {
        id: 'use_pronunciation_15_times',
        title: 'Pronunciation Pro',
        description: 'Use the pronunciation feature 15 times',
        type: CHALLENGE_TYPES.PRONUNCIATION,
        difficulty: CHALLENGE_DIFFICULTY.MEDIUM,
        requirement: { type: 'pronunciations_used', count: 15 },
        xpReward: 80,
        coinsReward: 16,
        icon: '🎤'
      }
    ],
    hard: [
      {
        id: 'practice_pronunciation_30_times',
        title: 'Voice Master',
        description: 'Use the pronunciation feature 30 times',
        type: CHALLENGE_TYPES.PRONUNCIATION,
        difficulty: CHALLENGE_DIFFICULTY.HARD,
        requirement: { type: 'pronunciations_used', count: 30 },
        xpReward: 150,
        coinsReward: 30,
        icon: '🎤'
      }
    ]
  },
  
  [CHALLENGE_TYPES.GAMES]: {
    easy: [
      {
        id: 'play_3_games',
        title: 'Game Player',
        description: 'Play 3 different games today',
        type: CHALLENGE_TYPES.GAMES,
        difficulty: CHALLENGE_DIFFICULTY.EASY,
        requirement: { type: 'games_played', count: 3 },
        xpReward: 40,
        coinsReward: 8,
        icon: '🎮'
      }
    ],
    medium: [
      {
        id: 'play_5_games',
        title: 'Game Enthusiast',
        description: 'Play 5 different games today',
        type: CHALLENGE_TYPES.GAMES,
        difficulty: CHALLENGE_DIFFICULTY.MEDIUM,
        requirement: { type: 'games_played', count: 5 },
        xpReward: 100,
        coinsReward: 20,
        icon: '🎯'
      }
    ],
    hard: [
      {
        id: 'perfect_game_score',
        title: 'Game Master',
        description: 'Get 100% on any game',
        type: CHALLENGE_TYPES.GAMES,
        difficulty: CHALLENGE_DIFFICULTY.HARD,
        requirement: { type: 'perfect_scores', count: 1 },
        xpReward: 200,
        coinsReward: 40,
        icon: '🏆'
      }
    ]
  },
  
  [CHALLENGE_TYPES.STREAK]: {
    easy: [
      {
        id: 'maintain_streak',
        title: 'Daily Learner',
        description: 'Maintain your learning streak',
        type: CHALLENGE_TYPES.STREAK,
        difficulty: CHALLENGE_DIFFICULTY.EASY,
        requirement: { type: 'streak_maintained', count: 1 },
        xpReward: 50,
        coinsReward: 10,
        icon: '🔥'
      }
    ],
    medium: [
      {
        id: 'extend_streak',
        title: 'Streak Builder',
        description: 'Extend your streak by 2 days',
        type: CHALLENGE_TYPES.STREAK,
        difficulty: CHALLENGE_DIFFICULTY.MEDIUM,
        requirement: { type: 'streak_extended', count: 2 },
        xpReward: 120,
        coinsReward: 25,
        icon: '🔥'
      }
    ],
    hard: [
      {
        id: 'week_streak',
        title: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        type: CHALLENGE_TYPES.STREAK,
        difficulty: CHALLENGE_DIFFICULTY.HARD,
        requirement: { type: 'week_streak', count: 7 },
        xpReward: 300,
        coinsReward: 60,
        icon: '🔥'
      }
    ]
  },
  
  [CHALLENGE_TYPES.EXPLORATION]: {
    easy: [
      {
        id: 'try_new_feature',
        title: 'Explorer',
        description: 'Try a new feature you haven\'t used before',
        type: CHALLENGE_TYPES.EXPLORATION,
        difficulty: CHALLENGE_DIFFICULTY.EASY,
        requirement: { type: 'new_features_tried', count: 1 },
        xpReward: 30,
        coinsReward: 6,
        icon: '🔍'
      }
    ],
    medium: [
      {
        id: 'complete_explore_section',
        title: 'Adventurer',
        description: 'Complete a lesson from the Explore section',
        type: CHALLENGE_TYPES.EXPLORATION,
        difficulty: CHALLENGE_DIFFICULTY.MEDIUM,
        requirement: { type: 'explore_lessons_completed', count: 1 },
        xpReward: 80,
        coinsReward: 16,
        icon: '🗺️'
      }
    ],
    hard: [
      {
        id: 'master_exploration',
        title: 'Exploration Master',
        description: 'Complete 3 lessons from different categories',
        type: CHALLENGE_TYPES.EXPLORATION,
        difficulty: CHALLENGE_DIFFICULTY.HARD,
        requirement: { type: 'different_categories_completed', count: 3 },
        xpReward: 180,
        coinsReward: 36,
        icon: '🌟'
      }
    ]
  }
};

// Helper functions
export const getRandomChallenge = (type, difficulty) => {
  const challenges = CHALLENGE_TEMPLATES[type]?.[difficulty] || [];
  if (challenges.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * challenges.length);
  return challenges[randomIndex];
};

export const getDailyChallenges = (userLevel = 1) => {
  const challenges = [];
  
  // Determine difficulty based on user level
  let difficulty = CHALLENGE_DIFFICULTY.EASY;
  if (userLevel >= 10) difficulty = CHALLENGE_DIFFICULTY.HARD;
  else if (userLevel >= 5) difficulty = CHALLENGE_DIFFICULTY.MEDIUM;
  
  // Generate 3 daily challenges
  const types = Object.values(CHALLENGE_TYPES);
  const usedTypes = new Set();
  
  for (let i = 0; i < 3; i++) {
    let type;
    do {
      type = types[Math.floor(Math.random() * types.length)];
    } while (usedTypes.has(type));
    
    usedTypes.add(type);
    
    const challenge = getRandomChallenge(type, difficulty);
    if (challenge) {
      challenges.push({
        ...challenge,
        id: `daily_${Date.now()}_${i}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        isDaily: true
      });
    }
  }
  
  return challenges;
};

export const checkChallengeCompletion = (challenge, userStats) => {
  const { type, count } = challenge.requirement;
  const userValue = userStats[type] || 0;
  return userValue >= count;
};

export const getChallengeProgress = (challenge, userStats) => {
  const { type, count } = challenge.requirement;
  const currentValue = userStats[type] || 0;
  const progress = Math.min((currentValue / count) * 100, 100);
  return { current: currentValue, target: count, progress };
}; 