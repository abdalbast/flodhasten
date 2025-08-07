import React from 'react';
import LessonCard from './LessonCard';

function LessonCircles({ skills, progress, onSelectSkill, isDarkMode }) {
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
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '2rem',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '1rem'
      }}>
        {skills.map((skill, index) => {
          const { isUnlocked, isCompleted, progressValue, isInProgress } = getLessonStatus(skill.id);
          
          return (
            <LessonCard
              key={skill.id}
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
          );
        })}
      </div>
    </div>
  );
}

export default LessonCircles; 