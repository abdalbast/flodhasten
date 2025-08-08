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
      {/* Lesson Circles Grid - Moomin-inspired */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'stretch',
        gap: 'clamp(1rem, 4vw, 2rem)', // Responsive gap
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(0.5rem, 2vw, 1rem)' // Responsive padding
      }}>
        {skills.map((skill, index) => {
          const { isUnlocked, isCompleted, progressValue, isInProgress } = getLessonStatus(skill.id);
          
          return (
            <div key={skill.id} style={{
              flex: '0 1 clamp(250px, 30vw, 350px)', // Responsive sizing
              minWidth: 'clamp(200px, 25vw, 250px)',
              maxWidth: 'clamp(280px, 35vw, 350px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'stretch'
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