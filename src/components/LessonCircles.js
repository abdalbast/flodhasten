import React from 'react';

function LessonCircles({ skills, progress, onSelectSkill, isDarkMode }) {
  // Moomin-inspired colour palette
  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const backgroundColor = isDarkMode ? '#2d2d2d' : '#f8f9fa';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const titleColor = isDarkMode ? '#64b5f6' : '#3498db';
  const lessonColor = isDarkMode ? '#ff6b35' : '#e67e22';
  const completedColor = isDarkMode ? '#4caf50' : '#27ae60';
  const lockedColor = isDarkMode ? '#cccccc' : '#bdc3c7';
  
  // Moomin-inspired accent colours
  const moominBlue = '#3498db';
  const moominGreen = '#27ae60';
  const moominYellow = '#f1c40f';
  const moominOrange = '#e67e22';
  const moominPink = '#e91e63';

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
            <div
              key={skill.id}
              onClick={() => handleLessonClick(skill.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem',
                background: cardBackground,
                borderRadius: '25px',
                border: `3px solid ${isCompleted ? completedColor : isUnlocked ? lessonColor : borderColor}`,
                cursor: isUnlocked ? 'pointer' : 'not-allowed',
                transition: 'all 0.4s ease',
                transform: 'translateY(0)',
                boxShadow: isDarkMode ? '0 8px 25px rgba(0,0,0,0.3)' : '0 8px 25px rgba(52, 152, 219, 0.15)',
                opacity: isUnlocked ? 1 : 0.6,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (isUnlocked) {
                  e.target.style.transform = 'translateY(-10px) scale(1.02)';
                  e.target.style.boxShadow = isDarkMode 
                    ? '0 15px 35px rgba(0,0,0,0.4)' 
                    : '0 15px 35px rgba(52, 152, 219, 0.25)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = isDarkMode 
                  ? '0 8px 25px rgba(0,0,0,0.3)' 
                  : '0 8px 25px rgba(52, 152, 219, 0.15)';
              }}
            >
              {/* Moomin-inspired decorative elements */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                width: '25px',
                height: '25px',
                background: isCompleted ? moominGreen : moominBlue,
                borderRadius: '50%',
                animation: 'gentleGlow 2.5s ease-in-out infinite',
                opacity: isUnlocked ? 1 : 0.3
              }} />
              
              {/* Lesson Circle */}
              <div style={{
                position: 'relative',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: isCompleted ? completedColor : isUnlocked ? lessonColor : lockedColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                border: `4px solid ${isDarkMode ? '#fff' : '#000'}`,
                boxShadow: isCompleted 
                  ? '0 0 25px rgba(39, 174, 96, 0.6)' 
                  : isUnlocked 
                    ? '0 0 25px rgba(230, 126, 34, 0.4)' 
                    : 'none',
                transition: 'all 0.3s ease'
              }}>
                {/* Lesson Number */}
                <span style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: isDarkMode ? '#fff' : '#000',
                  fontFamily: '"Georgia", serif'
                }}>
                  {index + 1}
                </span>
                
                {/* Progress Ring for in-progress lessons */}
                {isInProgress && (
                  <svg
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      left: '-4px',
                      width: '98px',
                      height: '98px',
                      transform: 'rotate(-90deg)'
                    }}
                  >
                    <circle
                      cx="49"
                      cy="49"
                      r="40"
                      fill="none"
                      stroke={moominYellow}
                      strokeWidth="4"
                      strokeDasharray={`${2 * Math.PI * 40 * progressValue / 100} ${2 * Math.PI * 40}`}
                    />
                  </svg>
                )}
                
                {/* Completion Checkmark */}
                {isCompleted && (
                  <span style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    fontSize: '1.2rem',
                    color: '#fff',
                    background: completedColor,
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}>
                    ✓
                  </span>
                )}
              </div>
              
              {/* Lesson Name */}
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: textColor,
                margin: '0 0 0.8rem 0',
                textAlign: 'center',
                lineHeight: '1.3',
                fontFamily: '"Georgia", serif'
              }}>
                {skill.name}
              </h3>
              
              {/* Progress Text */}
              <p style={{
                fontSize: '0.9rem',
                color: isDarkMode ? '#bdc3c7' : '#7f8c8d',
                margin: '0',
                textAlign: 'center',
                fontFamily: '"Georgia", serif',
                fontStyle: 'italic'
              }}>
                {isCompleted ? 'Completed' : isInProgress ? `${progressValue}%` : isUnlocked ? 'Ready' : 'Locked'}
              </p>
            </div>
          );
        })}
      </div>
      
      {/* CSS animations */}
      <style>
        {`
          @keyframes gentleGlow {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
          }
        `}
      </style>
    </div>
  );
}

export default LessonCircles; 