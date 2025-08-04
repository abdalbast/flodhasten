import React from 'react';
import { FaBookOpen, FaGamepad, FaFire, FaRedo, FaHatCowboy, FaUserTie } from 'react-icons/fa';
import { GiDress } from 'react-icons/gi';
import { BsPersonFill, BsPersonHeart, BsPersonBoundingBox } from 'react-icons/bs';
import { WiMoonWaningCrescent6 } from 'react-icons/wi';
import LessonCircles from './LessonCircles';
import { MdVolumeUp } from 'react-icons/md';

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

  const playSwedish = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'sv-SE';
    speechSynthesis.speak(utterance);
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: '80vh'
    }}>
      {/* Header Section with Liquid Glass */}
      <div className={`liquid-glass ${isDarkMode ? 'liquid-glass-dark' : ''}`} style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        marginBottom: '3rem',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorative elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '60px',
          height: '60px',
          background: isDarkMode ? 'rgba(52, 152, 219, 0.1)' : 'rgba(52, 152, 219, 0.05)',
          borderRadius: '50%',
          filter: 'blur(20px)',
          animation: 'gentleGlow 4s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '40px',
          height: '40px',
          background: isDarkMode ? 'rgba(233, 30, 99, 0.1)' : 'rgba(233, 30, 99, 0.05)',
          borderRadius: '50%',
          filter: 'blur(15px)',
          animation: 'gentleGlow 6s ease-in-out infinite 2s'
        }} />

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
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
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
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontWeight: 'bold',
          textShadow: isDarkMode
            ? '0 2px 4px rgba(0,0,0,0.3)'
            : '0 2px 4px rgba(233, 30, 99, 0.2)'
        }}>
          I love you Clara
        </p>
        <p style={{
          color: isDarkMode ? '#ccc' : '#666',
          fontSize: '1.2rem',
          margin: '1rem 0 0 0',
          position: 'relative',
          zIndex: 1,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          Learn Swedish with the River Horse
        </p>
      </div>

      {/* User Avatar Section */}
      <div className={`liquid-glass ${isDarkMode ? 'liquid-glass-dark' : ''}`} style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 2rem',
        marginBottom: '2rem',
        borderRadius: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: isDarkMode ? 'rgba(52, 152, 219, 0.3)' : 'rgba(52, 152, 219, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            {userData.currentAvatar}
          </div>
          <div>
            <h3 style={{ 
              color: isDarkMode ? '#fff' : '#333', 
              margin: '0 0 0.25rem 0',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Level {userData.level}
            </h3>
            <p style={{ 
              color: isDarkMode ? '#ccc' : '#666', 
              margin: 0,
              fontSize: '0.9rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              {userData.xp} XP • {userData.coins} Coins
            </p>
          </div>
        </div>
        <button 
          onClick={onResetProgress}
          className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            border: 'none',
            color: isDarkMode ? '#ccc' : '#666',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          Reset Progress
        </button>
      </div>

      {/* Word of the Day */}
      {wordOfTheDay && (
        <div className={`liquid-glass ${isDarkMode ? 'liquid-glass-dark' : ''}`} style={{
          padding: '2rem',
          marginBottom: '2rem',
          borderRadius: '20px',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            color: isDarkMode ? '#fff' : '#333', 
            marginBottom: '1rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            Word of the Day
          </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <span style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold',
              color: moominBlue,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              {wordOfTheDay.swedish}
            </span>
            <button
              onClick={() => playSwedish(wordOfTheDay.swedish)}
              className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
              style={{
                background: 'none',
                border: 'none',
                color: moominBlue,
                cursor: 'pointer',
                fontSize: '1.5rem',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <MdVolumeUp />
            </button>
          </div>
          <p style={{ 
            color: isDarkMode ? '#ccc' : '#666',
            fontSize: '1.1rem',
            margin: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            {wordOfTheDay.english}
          </p>
          {wordOfTheDay.kurdish && (
            <p style={{ 
              color: isDarkMode ? '#aaa' : '#888',
              fontSize: '1rem',
              margin: '0.5rem 0 0 0',
              fontFamily: 'Arial, sans-serif'
            }}>
              {wordOfTheDay.kurdish}
            </p>
          )}
        </div>
      )}

      {/* Skills Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {skills.map((skill) => (
          <div
            key={skill.id}
            className={`liquid-glass ${isDarkMode ? 'liquid-glass-dark' : ''}`}
            style={{
              padding: '2rem',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={() => handleLessonSelection(skill.id)}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {/* Skill completion indicator */}
            {skillProgress[skill.id]?.completed && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#4CAF50',
                color: '#fff',
                padding: '0.3rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                ✓ Complete
              </div>
            )}

            <h3 style={{
              color: isDarkMode ? '#fff' : '#333',
              marginBottom: '1rem',
              fontSize: '1.5rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              {skill.name}
            </h3>
            
            <p style={{
              color: isDarkMode ? '#ccc' : '#666',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              {skill.words.length} words to learn
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartLesson();
              }}
              className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              Start Lesson
            </button>
          </div>
        ))}
      </div>

      {/* Lesson Content */}
      {selectedSkill && (
        <div ref={lessonContentRef} className={`liquid-glass ${isDarkMode ? 'liquid-glass-dark' : ''}`} style={{
          padding: '2rem',
          borderRadius: '20px',
          marginTop: '2rem'
        }}>
          <h2 style={{
            color: isDarkMode ? '#fff' : '#333',
            marginBottom: '1.5rem',
            fontSize: '2rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            {selectedSkill.name}
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {selectedSkill.words.map((word, index) => (
              <div
                key={index}
                className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onClick={() => playSwedish(word.swedish)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: moominBlue,
                  marginBottom: '0.5rem',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  {word.swedish}
                </div>
                <div style={{
                  color: isDarkMode ? '#ccc' : '#666',
                  fontSize: '0.9rem',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  {word.english}
                </div>
                {word.kurdish && (
                  <div style={{
                    color: isDarkMode ? '#aaa' : '#888',
                    fontSize: '0.8rem',
                    marginTop: '0.25rem',
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    {word.kurdish}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home; 