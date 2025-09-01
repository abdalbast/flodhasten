import React from 'react';
import LessonCard from './LessonCard';

const LessonCircles = React.memo(({ skills, progress, onSelectSkill, isDarkMode }) => {
  const getLessonStatus = (skillId) => {
    const skillIndex = skills.findIndex(s => s.id === skillId);
    const isUnlocked = skillIndex === 0 || (progress[skills[skillIndex - 1].id] >= 100);
    const isCompleted = progress[skillId] >= 100;
    const progressValue = progress[skillId] || 0;
    const isInProgress = progressValue > 0 && progressValue < 100;
    
    return { isUnlocked, isCompleted, progressValue, isInProgress };
  };

  const handleLessonClick = (skillId) => {
    const { isUnlocked } = getLessonStatus(skillId);
    if (isUnlocked) {
      onSelectSkill(skillId);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {/* Lesson Cards Grid - Matching Flodhästen hero section dimensions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1.5rem',
        maxWidth: '64rem', // Match max-w-5xl from hero section
        margin: '0 auto',
        padding: '1rem' // Match px-4 from hero section
      }}>
        {skills.map((skill, index) => {
          const { isUnlocked, isCompleted, progressValue, isInProgress } = getLessonStatus(skill.id);
          
          return (
            <div key={skill.id} style={{
              display: 'flex',
              justifyContent: 'stretch',
              alignItems: 'stretch',
              width: '100%'
            }}>
              <LessonCard
                lesson={skill}
                index={index}
                progress={progressValue}
                isUnlocked={isUnlocked}
                isCompleted={isCompleted}
                isInProgress={isInProgress}
                onLessonClick={handleLessonClick}
                isDarkMode={isDarkMode}
                enableTilt={true}
                enableMobileTilt={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default LessonCircles; 