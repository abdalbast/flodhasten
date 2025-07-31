import React from 'react';
import { designTokens, getThemeColors } from '../../styles/designSystem';
import { ProgressBar } from './Accessibility';

// Progress Tracker Component
const ProgressTracker = React.memo(({ 
  userData, 
  skillProgress, 
  isDarkMode = false,
  onGoalUpdate,
  className = '',
  ...props 
}) => {
  const themeColors = getThemeColors(isDarkMode);
  
  const { level, xp, coins, streak, dailyGoal, completedLessons } = userData || {};
  const totalLessons = Object.keys(skillProgress || {}).length;
  const completedCount = Object.values(skillProgress || {}).filter(progress => progress.completed).length;
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const containerStyle = {
    backgroundColor: themeColors.surface,
    borderRadius: designTokens.borderRadius.xl,
    padding: designTokens.spacing[6],
    boxShadow: designTokens.shadows.md,
    border: `1px solid ${isDarkMode ? designTokens.colors.neutral[700] : designTokens.colors.neutral[200]}`,
    marginBottom: designTokens.spacing[6]
  };

  const sectionStyle = {
    marginBottom: designTokens.spacing[4]
  };

  const titleStyle = {
    fontSize: designTokens.typography.fontSize.lg,
    fontWeight: designTokens.typography.fontWeight.bold,
    color: themeColors.text,
    marginBottom: designTokens.spacing[3]
  };

  const statStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: designTokens.spacing[2]
  };

  const labelStyle = {
    color: themeColors.textSecondary,
    fontSize: designTokens.typography.fontSize.sm
  };

  const valueStyle = {
    color: themeColors.text,
    fontWeight: designTokens.typography.fontWeight.semibold,
    fontSize: designTokens.typography.fontSize.sm
  };

  const streakStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: designTokens.spacing[2],
    padding: designTokens.spacing[3],
    backgroundColor: isDarkMode ? designTokens.colors.neutral[700] : designTokens.colors.neutral[100],
    borderRadius: designTokens.borderRadius.lg,
    border: `2px solid ${designTokens.colors.accent.yellow}`
  };

  const goalStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: designTokens.spacing[2],
    padding: designTokens.spacing[3],
    backgroundColor: isDarkMode ? designTokens.colors.neutral[700] : designTokens.colors.neutral[100],
    borderRadius: designTokens.borderRadius.lg
  };

  return (
    <div style={containerStyle} className={className} {...props}>
      <h3 style={titleStyle}>Your Progress</h3>
      
      {/* Overall Progress */}
      <div style={sectionStyle}>
        <div style={statStyle}>
          <span style={labelStyle}>Lessons Completed</span>
          <span style={valueStyle}>{completedCount}/{totalLessons}</span>
        </div>
        <ProgressBar 
          value={progressPercentage} 
          max={100}
          aria-label={`${progressPercentage}% of lessons completed`}
        />
      </div>

      {/* Level & XP */}
      <div style={sectionStyle}>
        <div style={statStyle}>
          <span style={labelStyle}>Level</span>
          <span style={valueStyle}>{level}</span>
        </div>
        <div style={statStyle}>
          <span style={labelStyle}>XP</span>
          <span style={valueStyle}>{xp}</span>
        </div>
        <div style={statStyle}>
          <span style={labelStyle}>Coins</span>
          <span style={valueStyle}>💰 {coins}</span>
        </div>
      </div>

      {/* Daily Streak */}
      <div style={sectionStyle}>
        <div style={streakStyle}>
          <span style={{ fontSize: '1.5rem' }}>🔥</span>
          <div>
            <div style={{ color: themeColors.text, fontWeight: designTokens.typography.fontWeight.bold }}>
              {streak} Day Streak
            </div>
            <div style={{ color: themeColors.textSecondary, fontSize: designTokens.typography.fontSize.sm }}>
              Keep it up!
            </div>
          </div>
        </div>
      </div>

      {/* Daily Goal */}
      <div style={sectionStyle}>
        <div style={goalStyle}>
          <span style={{ fontSize: '1.5rem' }}>🎯</span>
          <div>
            <div style={{ color: themeColors.text, fontWeight: designTokens.typography.fontWeight.bold }}>
              Daily Goal: {dailyGoal} lessons
            </div>
            <div style={{ color: themeColors.textSecondary, fontSize: designTokens.typography.fontSize.sm }}>
              {completedLessons || 0} completed today
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProgressTracker; 