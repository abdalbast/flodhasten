import React, { useState } from 'react';
import { designTokens, getThemeColors } from '../../styles/designSystem';
import Button from './Button';

// Personalization Component
const Personalization = React.memo(({ 
  userData, 
  isDarkMode = false,
  onGoalUpdate,
  onPreferenceUpdate,
  className = '',
  ...props 
}) => {
  const themeColors = getThemeColors(isDarkMode);
  const [selectedGoal, setSelectedGoal] = useState(userData.dailyGoal || 1);
  const [selectedTopics, setSelectedTopics] = useState(userData.preferredTopics || []);
  const [difficulty, setDifficulty] = useState(userData.difficulty || 'normal');

  const containerStyle = {
    backgroundColor: themeColors.surface,
    borderRadius: designTokens.borderRadius.xl,
    padding: designTokens.spacing[6],
    boxShadow: designTokens.shadows.md,
    border: `1px solid ${isDarkMode ? designTokens.colors.neutral[700] : designTokens.colors.neutral[200]}`
  };

  const sectionStyle = {
    marginBottom: designTokens.spacing[6]
  };

  const titleStyle = {
    fontSize: designTokens.typography.fontSize.lg,
    fontWeight: designTokens.typography.fontWeight.bold,
    color: themeColors.text,
    marginBottom: designTokens.spacing[4]
  };

  const subtitleStyle = {
    fontSize: designTokens.typography.fontSize.base,
    color: themeColors.textSecondary,
    marginBottom: designTokens.spacing[3]
  };

  const optionStyle = (isSelected) => ({
    padding: designTokens.spacing[3],
    borderRadius: designTokens.borderRadius.md,
    border: `2px solid ${isSelected ? designTokens.colors.primary[500] : designTokens.colors.neutral[300]}`,
    backgroundColor: isSelected 
      ? designTokens.colors.primary[100] 
      : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: designTokens.spacing[2]
  });

  const goalOptions = [1, 2, 3, 5, 10];
  const topics = [
    { id: 'greetings', name: 'Greetings & Basics', icon: '👋' },
    { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦' },
    { id: 'food', name: 'Food & Drink', icon: '🍽️' },
    { id: 'numbers', name: 'Numbers', icon: '🔢' },
    { id: 'colors', name: 'Colors', icon: '🎨' },
    { id: 'animals', name: 'Animals', icon: '🐾' },
    { id: 'weather', name: 'Weather', icon: '🌤️' },
    { id: 'travel', name: 'Travel', icon: '✈️' }
  ];

  const difficultyLevels = [
    { id: 'easy', name: 'Easy', description: 'More hints and slower pace' },
    { id: 'normal', name: 'Normal', description: 'Standard difficulty' },
    { id: 'hard', name: 'Hard', description: 'Challenging with time limits' }
  ];

  const handleGoalChange = (goal) => {
    setSelectedGoal(goal);
    onGoalUpdate?.(goal);
  };

  const handleTopicToggle = (topicId) => {
    const newTopics = selectedTopics.includes(topicId)
      ? selectedTopics.filter(id => id !== topicId)
      : [...selectedTopics, topicId];
    setSelectedTopics(newTopics);
    onPreferenceUpdate?.({ preferredTopics: newTopics });
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    onPreferenceUpdate?.({ difficulty: level });
  };

  return (
    <div style={containerStyle} className={className} {...props}>
      <h3 style={titleStyle}>Personalize Your Learning</h3>

      {/* Daily Goal Setting */}
      <div style={sectionStyle}>
        <h4 style={subtitleStyle}>Daily Learning Goal</h4>
        <p style={{ color: themeColors.textSecondary, marginBottom: designTokens.spacing[3] }}>
          Set how many lessons you want to complete each day
        </p>
        <div style={{ display: 'flex', gap: designTokens.spacing[2], flexWrap: 'wrap' }}>
          {goalOptions.map((goal) => (
            <Button
              key={goal}
              variant={selectedGoal === goal ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => handleGoalChange(goal)}
              style={{ minWidth: '60px' }}
            >
              {goal} {goal === 1 ? 'lesson' : 'lessons'}
            </Button>
          ))}
        </div>
      </div>

      {/* Topic Preferences */}
      <div style={sectionStyle}>
        <h4 style={subtitleStyle}>Preferred Topics</h4>
        <p style={{ color: themeColors.textSecondary, marginBottom: designTokens.spacing[3] }}>
          Choose topics you're most interested in learning
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: designTokens.spacing[3] }}>
          {topics.map((topic) => (
            <div
              key={topic.id}
              style={optionStyle(selectedTopics.includes(topic.id))}
              onClick={() => handleTopicToggle(topic.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: designTokens.spacing[2] }}>
                <span style={{ fontSize: '1.5rem' }}>{topic.icon}</span>
                <span style={{ color: themeColors.text, fontWeight: designTokens.typography.fontWeight.medium }}>
                  {topic.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Setting */}
      <div style={sectionStyle}>
        <h4 style={subtitleStyle}>Difficulty Level</h4>
        <p style={{ color: themeColors.textSecondary, marginBottom: designTokens.spacing[3] }}>
          Choose your preferred challenge level
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing[2] }}>
          {difficultyLevels.map((level) => (
            <div
              key={level.id}
              style={optionStyle(difficulty === level.id)}
              onClick={() => handleDifficultyChange(level.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: themeColors.text, fontWeight: designTokens.typography.fontWeight.bold }}>
                    {level.name}
                  </div>
                  <div style={{ color: themeColors.textSecondary, fontSize: designTokens.typography.fontSize.sm }}>
                    {level.description}
                  </div>
                </div>
                {difficulty === level.id && (
                  <span style={{ color: designTokens.colors.primary[500], fontSize: '1.2rem' }}>✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// Adaptive Learning Component
const AdaptiveLearning = React.memo(({ 
  userData, 
  wordStats,
  isDarkMode = false,
  onReviewWords,
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

  const wordStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: designTokens.spacing[3],
    borderRadius: designTokens.borderRadius.md,
    backgroundColor: isDarkMode ? designTokens.colors.neutral[700] : designTokens.colors.neutral[100],
    marginBottom: designTokens.spacing[2]
  };

  const wordTextStyle = {
    color: themeColors.text,
    fontWeight: designTokens.typography.fontWeight.medium
  };

  const statsStyle = {
    display: 'flex',
    gap: designTokens.spacing[3],
    fontSize: designTokens.typography.fontSize.sm
  };

  const correctStyle = {
    color: designTokens.colors.semantic.success
  };

  const incorrectStyle = {
    color: designTokens.colors.semantic.error
  };

  // Get words that need review (high incorrect rate or not practiced recently)
  const getWordsNeedingReview = () => {
    if (!wordStats) return [];
    
    return Object.entries(wordStats)
      .filter(([word, stats]) => {
        const totalAttempts = stats.correct + stats.incorrect;
        const accuracy = totalAttempts > 0 ? stats.correct / totalAttempts : 1;
        const daysSinceLastPractice = stats.lastPracticed 
          ? (Date.now() - new Date(stats.lastPracticed).getTime()) / (1000 * 60 * 60 * 24)
          : 999;
        
        return accuracy < 0.7 || daysSinceLastPractice > 3;
      })
      .sort((a, b) => {
        const aStats = a[1];
        const bStats = b[1];
        const aAccuracy = (aStats.correct + aStats.incorrect) > 0 
          ? aStats.correct / (aStats.correct + aStats.incorrect) 
          : 1;
        const bAccuracy = (bStats.correct + bStats.incorrect) > 0 
          ? bStats.correct / (bStats.correct + bStats.incorrect) 
          : 1;
        return aAccuracy - bAccuracy; // Sort by lowest accuracy first
      })
      .slice(0, 10); // Top 10 words needing review
  };

  const wordsNeedingReview = getWordsNeedingReview();

  return (
    <div style={containerStyle} className={className} {...props}>
      <h3 style={titleStyle}>Words Needing Review</h3>
      <p style={{ color: themeColors.textSecondary, marginBottom: designTokens.spacing[4] }}>
        These words need more practice based on your performance
      </p>
      
      {wordsNeedingReview.length > 0 ? (
        <div>
          {wordsNeedingReview.map(([word, stats]) => (
            <div key={word} style={wordStyle}>
              <div style={wordTextStyle}>{word}</div>
              <div style={statsStyle}>
                <span style={correctStyle}>✓ {stats.correct}</span>
                <span style={incorrectStyle}>✗ {stats.incorrect}</span>
              </div>
            </div>
          ))}
          <Button
            variant="primary"
            onClick={() => onReviewWords?.(wordsNeedingReview.map(([word]) => word))}
            style={{ marginTop: designTokens.spacing[4] }}
          >
            Practice These Words
          </Button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: themeColors.textSecondary }}>
          Great job! All words are well practiced.
        </div>
      )}
    </div>
  );
});

export { Personalization, AdaptiveLearning };
export default Personalization; 