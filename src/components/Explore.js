import React from 'react';
import SwedenMap from './SwedenMap';

function Explore({ skills, progress, onSelectSkill, isDarkMode, currentLanguage }) {
  // Moomin-inspired colour palette
  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const backgroundColor = isDarkMode ? '#2d2d2d' : '#f8f9fa';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const titleColor = isDarkMode ? '#64b5f6' : '#3498db';
  
  // Moomin-inspired accent colours
  const moominBlue = '#3498db';
  const moominGreen = '#27ae60';
  const moominYellow = '#f1c40f';
  const moominOrange = '#e67e22';
  const moominPink = '#e91e63';

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {/* Title - Moomin-inspired */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2.5rem',
        padding: '2rem',
        background: isDarkMode 
          ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)' 
          : 'linear-gradient(135deg, #e8f4f8 0%, #f8f9fa 50%, #e8f4f8 100%)',
        borderRadius: '25px',
        boxShadow: isDarkMode 
          ? '0 12px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
          : '0 12px 40px rgba(52, 152, 219, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
        border: isDarkMode 
          ? '1px solid rgba(255,255,255,0.1)' 
          : '1px solid rgba(52, 152, 219, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <h2 style={{ 
          color: moominBlue, 
          fontSize: '3rem', 
          fontWeight: 'bold',
          margin: '0',
          textShadow: isDarkMode 
            ? '0 4px 8px rgba(0,0,0,0.5), 0 0 20px rgba(52, 152, 219, 0.3)' 
            : '0 4px 8px rgba(0,0,0,0.1), 0 0 20px rgba(52, 152, 219, 0.2)',
          letterSpacing: '2px',
          position: 'relative',
          zIndex: 1,
          fontFamily: '"Georgia", serif'
        }}>
          {currentLanguage === 'ku' ? 'لەگەڵ ئەسپە ڕووبارەکە فێربە' : 
           currentLanguage === 'ku-lat' ? 'Lêgel Espê Rûbarê Fêrbê' : 
           'Learn with the River Horse'}
        </h2>
        
        <p style={{
          color: isDarkMode ? '#bdc3c7' : '#7f8c8d',
          fontSize: '1.2rem',
          margin: '0.8rem 0 0 0',
          fontStyle: 'italic',
          position: 'relative',
          zIndex: 1,
          fontFamily: '"Georgia", serif'
        }}>
          {currentLanguage === 'ku' ? 'پێشکەوتنەکەت لە سوید ببینە' : 
           currentLanguage === 'ku-lat' ? 'Pêşketinêket le Swêd bibîne' : 
           'Explore your progress across Sweden'}
        </p>
        
        {/* Moomin-inspired decorative elements */}
        <div style={{
          position: 'absolute',
          top: '25px',
          right: '35px',
          width: '35px',
          height: '35px',
          background: moominYellow,
          borderRadius: '50%',
          animation: 'gentleGlow 3s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '35px',
          left: '45px',
          width: '20px',
          height: '20px',
          background: moominGreen,
          borderRadius: '50%',
          animation: 'gentleGlow 4s ease-in-out infinite 1s'
        }} />
      </div>

      {/* Map Container - Moomin-inspired */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '70vh',
        background: cardBackground,
        borderRadius: '25px',
        boxShadow: isDarkMode ? '0 12px 40px rgba(0,0,0,0.3)' : '0 12px 40px rgba(52, 152, 219, 0.15)',
        border: `3px solid ${borderColor}`,
        overflow: 'hidden',
        marginBottom: '2rem'
      }}>
        <SwedenMap 
          isDarkMode={isDarkMode} 
          currentLesson={null}
          skills={skills}
          progress={progress}
          onSelectSkill={onSelectSkill}
        />
      </div>

      {/* Lesson Progress Summary - Moomin-inspired */}
      <div style={{
        padding: '2rem',
        background: backgroundColor,
        borderRadius: '25px',
        boxShadow: isDarkMode ? '0 8px 25px rgba(0,0,0,0.3)' : '0 8px 25px rgba(52, 152, 219, 0.15)',
        border: `3px solid ${borderColor}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-15px',
          right: '-15px',
          width: '40px',
          height: '40px',
          background: moominPink,
          borderRadius: '50%',
          animation: 'gentleGlow 2.5s ease-in-out infinite 0.5s'
        }} />
        
        <h3 style={{
          color: moominBlue,
          fontSize: '2rem',
          fontWeight: 'bold',
          margin: '0 0 1.5rem 0',
          textAlign: 'center',
          fontFamily: '"Georgia", serif'
        }}>
          {currentLanguage === 'ku' ? 'کورتەی پێشکەوتنی وانەکان' : 
           currentLanguage === 'ku-lat' ? 'Kurtay Pêşketinê Wane' : 
           'Lesson Progress Summary'}
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          {skills.map((skill, index) => {
            const progressValue = progress[skill.id] || 0;
            const isCompleted = progressValue >= 100;
            const isUnlocked = index === 0 || (progress[skills[index - 1].id] >= 100);
            
            return (
              <div key={skill.id} style={{
                background: cardBackground,
                padding: '1.5rem',
                borderRadius: '20px',
                border: `3px solid ${isCompleted ? moominGreen : isUnlocked ? moominBlue : borderColor}`,
                textAlign: 'left',
                transition: 'all 0.4s ease',
                transform: 'translateY(0)',
                boxShadow: isDarkMode ? '0 6px 20px rgba(0,0,0,0.3)' : '0 6px 20px rgba(52, 152, 219, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = isDarkMode 
                  ? '0 10px 30px rgba(0,0,0,0.4)' 
                  : '0 10px 30px rgba(52, 152, 219, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = isDarkMode 
                  ? '0 6px 20px rgba(0,0,0,0.3)' 
                  : '0 6px 20px rgba(52, 152, 219, 0.1)';
              }}
              >
                {/* Decorative element */}
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '-8px',
                  width: '20px',
                  height: '20px',
                  background: isCompleted ? moominGreen : moominOrange,
                  borderRadius: '50%',
                  animation: 'gentleGlow 3s ease-in-out infinite',
                  opacity: isUnlocked ? 1 : 0.3
                }} />
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: textColor,
                    fontFamily: '"Georgia", serif'
                  }}>
                    {skill.name}
                  </span>
                  <span style={{
                    fontSize: '1.8rem',
                    opacity: isUnlocked ? 1 : 0.5
                  }}>
                    {skill.icon || '📚'}
                  </span>
                </div>
                
                <div style={{
                  width: '100%',
                  height: '12px',
                  background: borderColor,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: `${progressValue}%`,
                    height: '100%',
                    background: isCompleted ? moominGreen : moominBlue,
                    transition: 'width 0.4s ease',
                    borderRadius: '8px'
                  }} />
                </div>
                
                <div style={{
                  fontSize: '1rem',
                  color: isDarkMode ? '#bdc3c7' : '#7f8c8d',
                  textAlign: 'center',
                  fontFamily: '"Georgia", serif',
                  fontStyle: 'italic'
                }}>
                  {isCompleted ? '✅ Completed' : `${progressValue}% Complete`}
                </div>
              </div>
            );
          })}
        </div>
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

export default Explore; 