import React from 'react';
import { FaBookOpen, FaGamepad, FaFire, FaRedo, FaHatCowboy, FaUserTie } from 'react-icons/fa';
import { GiDress } from 'react-icons/gi';
import { BsPersonFill, BsPersonHeart, BsPersonBoundingBox } from 'react-icons/bs';
import { WiMoonWaningCrescent6 } from 'react-icons/wi';
import LessonCircles from './LessonCircles';

// Home screen with welcome, app description, and progress tracker
function Home({ skills, skillProgress, onSelectSkill, selectedSkill, numWords = 0, progress = { gamesPlayed: 0, streak: 1 }, wordOfTheDay, onStartLesson, isDarkMode, onResetProgress, userData, currentLanguage }) {
  // Add CSS animation for floating effect
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(1deg); }
      }
      @keyframes gentleGlow {
        0%, 100% { opacity: 0.8; }
        50% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Ref for lesson content area
  const lessonContentRef = React.useRef(null);
  
  // Track if user has actively clicked a lesson
  const [hasUserClickedLesson, setHasUserClickedLesson] = React.useState(false);

  // Custom lesson selection handler that triggers scroll
  const handleLessonSelection = (lessonId) => {
    setHasUserClickedLesson(true);
    onSelectSkill(lessonId);
  };

  // Scroll to lesson content only when user has actively clicked a lesson
  React.useEffect(() => {
    if (selectedSkill && lessonContentRef.current && hasUserClickedLesson) {
      lessonContentRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      // Reset the flag after scrolling
      setHasUserClickedLesson(false);
    }
  }, [selectedSkill, hasUserClickedLesson]);

  // Moomin-inspired colour palette
  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const backgroundColor = isDarkMode ? '#2d2d2d' : '#f8f9fa';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const titleColor = isDarkMode ? '#64b5f6' : '#3498db';
  const progressBg = isDarkMode ? '#1e3a5f' : '#e8f4f8';
  const wordOfDayBg = isDarkMode ? '#2d2d2d' : '#fff8e1';
  const wordOfDayBorder = isDarkMode ? '#555555' : '#ffd54f';
  const resetButtonBg = isDarkMode ? '#d32f2f' : '#e74c3c';
  const resetButtonHoverBg = isDarkMode ? '#b71c1c' : '#c0392b';
  
  // Moomin-inspired accent colours
  const moominBlue = '#3498db';
  const moominGreen = '#27ae60';
  const moominYellow = '#f1c40f';
  const moominOrange = '#e67e22';
  const moominPink = '#e91e63';

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {/* Title and subtitle at the very top - Moomin-inspired */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        padding: '2.5rem',
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
        {/* Decorative background elements - Moomin-inspired */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: isDarkMode 
            ? 'radial-gradient(circle, rgba(52, 152, 219, 0.1) 0%, transparent 70%)' 
            : 'radial-gradient(circle, rgba(52, 152, 219, 0.05) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite'
        }} />
        
        {/* User Avatar and Level Display */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '1rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: moominBlue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: '#fff',
            border: '4px solid #fff',
            boxShadow: '0 6px 20px rgba(52, 152, 219, 0.4)'
          }}>
            {userData?.currentAvatar === 'snufkin' ? <FaHatCowboy /> : 
             userData?.currentAvatar === 'snorkmaiden' ? <GiDress /> : 
             userData?.currentAvatar === 'little-my' ? <BsPersonHeart /> : 
             userData?.currentAvatar === 'hemulen' ? <FaUserTie /> : 
             userData?.currentAvatar === 'groke' ? <WiMoonWaningCrescent6 /> : 
             userData?.currentAvatar === 'moominmamma' ? <BsPersonFill /> : 
             userData?.currentAvatar === 'moominpappa' ? <FaUserTie /> : 
             userData?.currentAvatar === 'ninny' ? <WiMoonWaningCrescent6 /> : 
             userData?.currentAvatar === 'sniff' ? <BsPersonBoundingBox /> : <BsPersonFill />}
          </div>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ 
              margin: '0', 
              color: moominYellow, 
              fontSize: '1.2rem',
              fontFamily: '"Georgia", serif'
            }}>
              Level {userData?.level || 1}
            </h3>
            <p style={{ 
              margin: '0', 
              color: isDarkMode ? '#bdc3c7' : '#7f8c8d', 
              fontSize: '0.9rem',
              fontStyle: 'italic'
            }}>
              {userData?.xp || 0} XP
            </p>
          </div>
        </div>
        
        <h1 style={{ 
          color: moominBlue, 
          fontSize: '4rem', 
          fontWeight: 'bold',
          margin: '0',
          textShadow: isDarkMode 
            ? '0 4px 8px rgba(0,0,0,0.5), 0 0 20px rgba(52, 152, 219, 0.3)' 
            : '0 4px 8px rgba(0,0,0,0.1), 0 0 20px rgba(52, 152, 219, 0.2)',
          letterSpacing: '3px',
          position: 'relative',
          zIndex: 1,
          fontFamily: '"Georgia", serif'
        }}>
          Flodhästen
        </h1>
        
        <p style={{
          color: moominPink,
          fontSize: '1.1rem',
          margin: '0.5rem 0 0 0',
          fontStyle: 'italic',
          position: 'relative',
          zIndex: 1,
          fontFamily: '"Georgia", serif',
          fontWeight: 'bold',
          textShadow: isDarkMode 
            ? '0 2px 4px rgba(0,0,0,0.3)' 
            : '0 2px 4px rgba(233, 30, 99, 0.2)'
        }}>
          I love you Clara
        </p>
        
        <p style={{
          color: isDarkMode ? '#bdc3c7' : '#7f8c8d',
          fontSize: '1.3rem',
          margin: '0.8rem 0 0 0',
          fontStyle: 'italic',
          position: 'relative',
          zIndex: 1,
          fontFamily: '"Georgia", serif'
        }}>
          Learn Swedish with the River Horse
          I love you Clara
        </p>
        
        {/* Moomin-inspired decorative elements */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '30px',
          width: '40px',
          height: '40px',
          background: moominYellow,
          borderRadius: '50%',
          animation: 'gentleGlow 3s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '40px',
          width: '25px',
          height: '25px',
          background: moominGreen,
          borderRadius: '50%',
          animation: 'gentleGlow 4s ease-in-out infinite 1s'
        }} />
      </div>
      
      <LessonCircles skills={skills} progress={skillProgress} onSelectSkill={handleLessonSelection} isDarkMode={isDarkMode} />
      
      {/* Lesson Content Area - This is where we scroll to */}
      <div ref={lessonContentRef} style={{ marginTop: '2rem' }}>
        {selectedSkill && (
          <div style={{
            background: cardBackground,
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: isDarkMode 
              ? '0 8px 25px rgba(0,0,0,0.3)' 
              : '0 8px 25px rgba(52, 152, 219, 0.15)',
            border: `2px solid ${borderColor}`,
            marginBottom: '2rem'
          }}>
            <h2 style={{
              color: moominBlue,
              margin: '0 0 1.5rem 0',
              fontSize: '2rem',
              fontFamily: '"Georgia", serif',
              textAlign: 'center'
            }}>
              {currentLanguage === 'ku' ? selectedSkill.name : selectedSkill.name}
            </h2>
            
            {/* Words Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {selectedSkill.words.map((word, index) => (
                <div key={index} style={{
                  background: backgroundColor,
                  padding: '1rem',
                  borderRadius: '15px',
                  border: `2px solid ${borderColor}`,
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: textColor,
                    marginBottom: '0.5rem',
                    fontFamily: '"Georgia", serif'
                  }}>
                    {word.swedish}
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    color: isDarkMode ? '#bdc3c7' : '#7f8c8d',
                    fontStyle: 'italic'
                  }}>
                    {currentLanguage === 'ku' ? word.kurdish : 
                     currentLanguage === 'ku-lat' ? word.kurdish : 
                     word.english}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Start Lesson Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={onStartLesson}
                style={{
                  background: moominBlue,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '1rem 2rem',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Georgia", serif',
                  boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
                }}
              >
                Start Lesson
              </button>
            </div>
          </div>
        )}
      </div>
      
      {wordOfTheDay && (
        <div style={{
          margin:'2rem auto',
          padding:'1.5rem',
          background: wordOfDayBg,
          borderRadius: '20px',
          boxShadow: `0 8px 25px ${wordOfDayBorder}`,
          maxWidth: '400px',
          border: `2px solid ${wordOfDayBorder}`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '30px',
            height: '30px',
            background: moominYellow,
            borderRadius: '50%',
            animation: 'gentleGlow 2s ease-in-out infinite'
          }} />
          <h3 style={{ 
            margin: '0 0 1rem 0', 
            color: isDarkMode ? '#f5f5f5' : '#2c3e50',
            fontFamily: '"Georgia", serif'
          }}>
            Word of the Day
          </h3>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: isDarkMode ? '#f5f5f5' : '#2c3e50',
            marginBottom: '0.5rem',
            fontFamily: '"Georgia", serif'
          }}>
            {wordOfTheDay.swedish}
          </div>
          <div style={{
            fontSize: '1rem',
            color: isDarkMode ? '#bdc3c7' : '#7f8c8d',
            fontStyle: 'italic'
          }}>
            {currentLanguage === 'ku' ? wordOfTheDay.kurdish : 
             currentLanguage === 'ku-lat' ? wordOfTheDay.kurdish : 
             wordOfTheDay.english}
          </div>
        </div>
      )}

      {/* Progress Summary */}
      <div style={{
        margin: '2rem auto',
        padding: '1.5rem',
        background: cardBackground,
        borderRadius: '20px',
        boxShadow: isDarkMode 
          ? '0 8px 25px rgba(0,0,0,0.3)' 
          : '0 8px 25px rgba(52, 152, 219, 0.15)',
        border: `2px solid ${borderColor}`,
        maxWidth: '500px'
      }}>
        <h3 style={{ 
          margin: '0 0 1rem 0', 
          color: moominBlue,
          fontFamily: '"Georgia", serif'
        }}>
          Your Progress
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: moominGreen,
              marginBottom: '0.5rem'
            }}>
              {numWords}
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: isDarkMode ? '#bdc3c7' : '#7f8c8d'
            }}>
              Words Learned
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: moominYellow,
              marginBottom: '0.5rem'
            }}>
              {progress.gamesPlayed}
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: isDarkMode ? '#bdc3c7' : '#7f8c8d'
            }}>
              Games Played
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: moominOrange,
              marginBottom: '0.5rem'
            }}>
              {progress.streak}
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: isDarkMode ? '#bdc3c7' : '#7f8c8d'
            }}>
              Day Streak
            </div>
          </div>
        </div>
      </div>

      {/* Reset Progress Button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={onResetProgress}
          style={{
            background: resetButtonBg,
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '0.8rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: '"Georgia", serif'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = resetButtonHoverBg;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = resetButtonBg;
          }}
        >
          <FaRedo style={{ marginRight: '0.5rem' }} />
          Reset Progress
        </button>
      </div>
    </div>
  );
}

export default Home; 