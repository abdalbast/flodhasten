import React from 'react';
import { designTokens, getThemeColors } from '../../styles/designSystem';

// Achievement System
const ACHIEVEMENTS = {
  // Lesson-based achievements
  firstLesson: {
    id: 'firstLesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🌟',
    xpReward: 50,
    condition: (userData) => userData.completedLessons >= 1
  },
  fiveLessons: {
    id: 'fiveLessons',
    title: 'Getting Started',
    description: 'Complete 5 lessons',
    icon: '⭐',
    xpReward: 100,
    condition: (userData) => userData.completedLessons >= 5
  },
  tenLessons: {
    id: 'tenLessons',
    title: 'Dedicated Learner',
    description: 'Complete 10 lessons',
    icon: '🏆',
    xpReward: 200,
    condition: (userData) => userData.completedLessons >= 10
  },
  allLessons: {
    id: 'allLessons',
    title: 'Swedish Master',
    description: 'Complete all lessons',
    icon: '👑',
    xpReward: 500,
    condition: (userData) => userData.completedLessons >= 12
  },

  // Streak achievements
  threeDayStreak: {
    id: 'threeDayStreak',
    title: 'Consistent',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    xpReward: 75,
    condition: (userData) => userData.streak >= 3
  },
  sevenDayStreak: {
    id: 'sevenDayStreak',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥🔥',
    xpReward: 150,
    condition: (userData) => userData.streak >= 7
  },
  thirtyDayStreak: {
    id: 'thirtyDayStreak',
    title: 'Unstoppable',
    description: 'Maintain a 30-day streak',
    icon: '🔥🔥🔥',
    xpReward: 300,
    condition: (userData) => userData.streak >= 30
  },

  // Level achievements
  levelFive: {
    id: 'levelFive',
    title: 'Rising Star',
    description: 'Reach level 5',
    icon: '⭐',
    xpReward: 100,
    condition: (userData) => userData.level >= 5
  },
  levelTen: {
    id: 'levelTen',
    title: 'Expert',
    description: 'Reach level 10',
    icon: '🏆',
    xpReward: 200,
    condition: (userData) => userData.level >= 10
  },
  levelTwenty: {
    id: 'levelTwenty',
    title: 'Legend',
    description: 'Reach level 20',
    icon: '👑',
    xpReward: 400,
    condition: (userData) => userData.level >= 20
  },

  // Game achievements
  perfectScore: {
    id: 'perfectScore',
    title: 'Perfect Score',
    description: 'Get 100% on any game',
    icon: '💯',
    xpReward: 50,
    condition: (userData) => userData.perfectScores > 0
  },
  gameMaster: {
    id: 'gameMaster',
    title: 'Game Master',
    description: 'Play all game types',
    icon: '🎮',
    xpReward: 100,
    condition: (userData) => userData.gamesPlayed >= 5
  },

  // Special achievements
  earlyBird: {
    id: 'earlyBird',
    title: 'Early Bird',
    description: 'Complete a lesson before 9 AM',
    icon: '🌅',
    xpReward: 25,
    condition: (userData) => userData.earlyBirdCount > 0
  },
  nightOwl: {
    id: 'nightOwl',
    title: 'Night Owl',
    description: 'Complete a lesson after 10 PM',
    icon: '🦉',
    xpReward: 25,
    condition: (userData) => userData.nightOwlCount > 0
  }
};

// Achievements Component
const Achievements = React.memo(({ 
  userData, 
  isDarkMode = false,
  onAchievementUnlock,
  className = '',
  ...props 
}) => {
  const themeColors = getThemeColors(isDarkMode);
  
  const containerStyle = {
    backgroundColor: themeColors.surface,
    borderRadius: designTokens.borderRadius.xl,
    padding: designTokens.spacing[6],
    boxShadow: designTokens.shadows.md,
    border: `1px solid ${isDarkMode ? designTokens.colors.neutral[700] : designTokens.colors.neutral[200]}`
  };

  const titleStyle = {
    fontSize: designTokens.typography.fontSize.lg,
    fontWeight: designTokens.typography.fontWeight.bold,
    color: themeColors.text,
    marginBottom: designTokens.spacing[4]
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: designTokens.spacing[4]
  };

  const achievementStyle = (isUnlocked) => ({
    padding: designTokens.spacing[4],
    borderRadius: designTokens.borderRadius.lg,
    border: `2px solid ${isUnlocked ? designTokens.colors.accent.yellow : designTokens.colors.neutral[400]}`,
    backgroundColor: isUnlocked 
      ? (isDarkMode ? designTokens.colors.neutral[700] : designTokens.colors.neutral[100])
      : (isDarkMode ? designTokens.colors.neutral[800] : designTokens.colors.neutral[200]),
    opacity: isUnlocked ? 1 : 0.6,
    transition: 'all 0.3s ease'
  });

  const iconStyle = {
    fontSize: '2rem',
    marginBottom: designTokens.spacing[2]
  };

  const achievementTitleStyle = {
    fontSize: designTokens.typography.fontSize.base,
    fontWeight: designTokens.typography.fontWeight.bold,
    color: themeColors.text,
    marginBottom: designTokens.spacing[1]
  };

  const achievementDescStyle = {
    fontSize: designTokens.typography.fontSize.sm,
    color: themeColors.textSecondary,
    marginBottom: designTokens.spacing[2]
  };

  const xpStyle = {
    fontSize: designTokens.typography.fontSize.sm,
    color: designTokens.colors.accent.yellow,
    fontWeight: designTokens.typography.fontWeight.bold
  };

  // Check for new achievements
  React.useEffect(() => {
    Object.values(ACHIEVEMENTS).forEach(achievement => {
      if (achievement.condition(userData) && !userData.unlockedAchievements?.includes(achievement.id)) {
        onAchievementUnlock?.(achievement);
      }
    });
  }, [userData, onAchievementUnlock]);

  const unlockedAchievements = userData.unlockedAchievements || [];

  return (
    <div style={containerStyle} className={className} {...props}>
      <h3 style={titleStyle}>Achievements</h3>
      <div style={gridStyle}>
        {Object.values(ACHIEVEMENTS).map((achievement) => {
          const isUnlocked = unlockedAchievements.includes(achievement.id);
          
          return (
            <div key={achievement.id} style={achievementStyle(isUnlocked)}>
              <div style={iconStyle}>{achievement.icon}</div>
              <div style={achievementTitleStyle}>{achievement.title}</div>
              <div style={achievementDescStyle}>{achievement.description}</div>
              <div style={xpStyle}>+{achievement.xpReward} XP</div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

// Badge Component
const Badge = React.memo(({ 
  icon, 
  title, 
  description, 
  isUnlocked = false,
  isDarkMode = false,
  className = '',
  ...props 
}) => {
  const themeColors = getThemeColors(isDarkMode);

  const badgeStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: designTokens.spacing[3],
    padding: designTokens.spacing[3],
    borderRadius: designTokens.borderRadius.lg,
    backgroundColor: isUnlocked 
      ? (isDarkMode ? designTokens.colors.neutral[700] : designTokens.colors.neutral[100])
      : (isDarkMode ? designTokens.colors.neutral[800] : designTokens.colors.neutral[200]),
    border: `2px solid ${isUnlocked ? designTokens.colors.accent.yellow : designTokens.colors.neutral[400]}`,
    opacity: isUnlocked ? 1 : 0.6,
    transition: 'all 0.3s ease'
  };

  const iconStyle = {
    fontSize: '1.5rem'
  };

  const textStyle = {
    flex: 1
  };

  const titleStyle = {
    fontSize: designTokens.typography.fontSize.sm,
    fontWeight: designTokens.typography.fontWeight.bold,
    color: themeColors.text,
    marginBottom: designTokens.spacing[1]
  };

  const descStyle = {
    fontSize: designTokens.typography.fontSize.xs,
    color: themeColors.textSecondary
  };

  return (
    <div style={badgeStyle} className={className} {...props}>
      <div style={iconStyle}>{icon}</div>
      <div style={textStyle}>
        <div style={titleStyle}>{title}</div>
        <div style={descStyle}>{description}</div>
      </div>
    </div>
  );
});

export { Achievements, Badge, ACHIEVEMENTS };
export default Achievements; 