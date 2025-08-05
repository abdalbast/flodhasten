// Achievement System for Flodhästen
export const ACHIEVEMENTS = {
  // Learning Progress Achievements
  learning: {
    first_lesson: {
      id: 'first_lesson',
      name: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      category: 'learning',
      xpReward: 50,
      coinsReward: 10,
      requirement: { type: 'lessons_completed', count: 1 }
    },
    lesson_streak_3: {
      id: 'lesson_streak_3',
      name: 'Getting Started',
      description: 'Complete 3 lessons',
      icon: '📚',
      category: 'learning',
      xpReward: 100,
      coinsReward: 25,
      requirement: { type: 'lessons_completed', count: 3 }
    },
    lesson_streak_10: {
      id: 'lesson_streak_10',
      name: 'Dedicated Learner',
      description: 'Complete 10 lessons',
      icon: '🎓',
      category: 'learning',
      xpReward: 200,
      coinsReward: 50,
      requirement: { type: 'lessons_completed', count: 10 }
    },
    lesson_streak_25: {
      id: 'lesson_streak_25',
      name: 'Swedish Scholar',
      description: 'Complete 25 lessons',
      icon: '🏆',
      category: 'learning',
      xpReward: 500,
      coinsReward: 100,
      requirement: { type: 'lessons_completed', count: 25 }
    },
    lesson_streak_50: {
      id: 'lesson_streak_50',
      name: 'Language Master',
      description: 'Complete 50 lessons',
      icon: '👑',
      category: 'learning',
      xpReward: 1000,
      coinsReward: 200,
      requirement: { type: 'lessons_completed', count: 50 }
    }
  },

  // Word Learning Achievements
  vocabulary: {
    first_word: {
      id: 'first_word',
      name: 'Word Collector',
      description: 'Learn your first word',
      icon: '📝',
      category: 'vocabulary',
      xpReward: 25,
      coinsReward: 5,
      requirement: { type: 'words_learned', count: 1 }
    },
    words_10: {
      id: 'words_10',
      name: 'Vocabulary Builder',
      description: 'Learn 10 words',
      icon: '📖',
      category: 'vocabulary',
      xpReward: 75,
      coinsReward: 15,
      requirement: { type: 'words_learned', count: 10 }
    },
    words_50: {
      id: 'words_50',
      name: 'Word Wizard',
      description: 'Learn 50 words',
      icon: '📚',
      category: 'vocabulary',
      xpReward: 150,
      coinsReward: 30,
      requirement: { type: 'words_learned', count: 50 }
    },
    words_100: {
      id: 'words_100',
      name: 'Lexicon Legend',
      description: 'Learn 100 words',
      icon: '📚',
      category: 'vocabulary',
      xpReward: 300,
      coinsReward: 60,
      requirement: { type: 'words_learned', count: 100 }
    }
  },

  // Game Performance Achievements
  games: {
    first_game: {
      id: 'first_game',
      name: 'Game On!',
      description: 'Play your first game',
      icon: '🎮',
      category: 'games',
      xpReward: 30,
      coinsReward: 5,
      requirement: { type: 'games_played', count: 1 }
    },
    games_10: {
      id: 'games_10',
      name: 'Gamer',
      description: 'Play 10 games',
      icon: '🎯',
      category: 'games',
      xpReward: 80,
      coinsReward: 15,
      requirement: { type: 'games_played', count: 10 }
    },
    games_50: {
      id: 'games_50',
      name: 'Game Master',
      description: 'Play 50 games',
      icon: '🏆',
      category: 'games',
      xpReward: 200,
      coinsReward: 40,
      requirement: { type: 'games_played', count: 50 }
    },
    perfect_score: {
      id: 'perfect_score',
      name: 'Perfect Score',
      description: 'Get 100% on any game',
      icon: '⭐',
      category: 'games',
      xpReward: 100,
      coinsReward: 25,
      requirement: { type: 'perfect_scores', count: 1 }
    }
  },

  // Streak Achievements
  streaks: {
    streak_3: {
      id: 'streak_3',
      name: 'On Fire',
      description: 'Maintain a 3-day learning streak',
      icon: '🔥',
      category: 'streaks',
      xpReward: 100,
      coinsReward: 20,
      requirement: { type: 'streak_days', count: 3 }
    },
    streak_7: {
      id: 'streak_7',
      name: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      category: 'streaks',
      xpReward: 250,
      coinsReward: 50,
      requirement: { type: 'streak_days', count: 7 }
    },
    streak_30: {
      id: 'streak_30',
      name: 'Monthly Master',
      description: 'Maintain a 30-day learning streak',
      icon: '🔥',
      category: 'streaks',
      xpReward: 1000,
      coinsReward: 200,
      requirement: { type: 'streak_days', count: 30 }
    }
  },

  // Pronunciation Achievements
  pronunciation: {
    first_pronunciation: {
      id: 'first_pronunciation',
      name: 'Voice Learner',
      description: 'Use pronunciation feature for the first time',
      icon: '🎤',
      category: 'pronunciation',
      xpReward: 25,
      coinsReward: 5,
      requirement: { type: 'pronunciations_used', count: 1 }
    },
    pronunciation_10: {
      id: 'pronunciation_10',
      name: 'Pronunciation Pro',
      description: 'Use pronunciation feature 10 times',
      icon: '🎤',
      category: 'pronunciation',
      xpReward: 75,
      coinsReward: 15,
      requirement: { type: 'pronunciations_used', count: 10 }
    },
    pronunciation_50: {
      id: 'pronunciation_50',
      name: 'Voice Master',
      description: 'Use pronunciation feature 50 times',
      icon: '🎤',
      category: 'pronunciation',
      xpReward: 200,
      coinsReward: 40,
      requirement: { type: 'pronunciations_used', count: 50 }
    }
  },

  // Special Achievements
  special: {
    first_custom_word: {
      id: 'first_custom_word',
      name: 'Word Creator',
      description: 'Add your first custom word',
      icon: '✏️',
      category: 'special',
      xpReward: 50,
      coinsReward: 10,
      requirement: { type: 'custom_words_added', count: 1 }
    },
    dark_mode_user: {
      id: 'dark_mode_user',
      name: 'Night Owl',
      description: 'Use dark mode for the first time',
      icon: '🌙',
      category: 'special',
      xpReward: 25,
      coinsReward: 5,
      requirement: { type: 'dark_mode_used', count: 1 }
    },
    language_explorer: {
      id: 'language_explorer',
      name: 'Language Explorer',
      description: 'Try learning in a different language',
      icon: '🌍',
      category: 'special',
      xpReward: 75,
      coinsReward: 15,
      requirement: { type: 'languages_tried', count: 2 }
    }
  }
};

// Helper function to get all achievements
export const getAllAchievements = () => {
  const allAchievements = [];
  Object.values(ACHIEVEMENTS).forEach(category => {
    Object.values(category).forEach(achievement => {
      allAchievements.push(achievement);
    });
  });
  return allAchievements;
};

// Helper function to get achievements by category
export const getAchievementsByCategory = (category) => {
  return ACHIEVEMENTS[category] || [];
};

// Helper function to check if achievement is unlocked
export const isAchievementUnlocked = (achievementId, userStats) => {
  const achievement = getAllAchievements().find(a => a.id === achievementId);
  if (!achievement) return false;

  const { type, count } = achievement.requirement;
  const userValue = userStats[type] || 0;
  
  return userValue >= count;
};

// Helper function to get newly unlocked achievements
export const getNewlyUnlockedAchievements = (previousStats, currentStats) => {
  const newlyUnlocked = [];
  
  getAllAchievements().forEach(achievement => {
    const { type, count } = achievement.requirement;
    const previousValue = previousStats[type] || 0;
    const currentValue = currentStats[type] || 0;
    
    // Check if this achievement was just unlocked
    if (previousValue < count && currentValue >= count) {
      newlyUnlocked.push(achievement);
    }
  });
  
  return newlyUnlocked;
}; 