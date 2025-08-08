import React from 'react';
import { FaHatCowboy, FaUserTie, FaUndo, FaTrash } from 'react-icons/fa';
import { GiDress } from 'react-icons/gi';
import { BsPersonHeart, BsPersonFill, BsPersonBoundingBox } from 'react-icons/bs';
import { WiMoonWaningCrescent6 } from 'react-icons/wi';
import ttsApi from '../utils/ttsApi';
import LessonCircles from './LessonCircles';

import './Home.css';

// Home screen with welcome, app description, and progress tracker
const Home = React.memo(({ skills, skillProgress, onSelectSkill, selectedSkill, numWords = 0, progress = { gamesPlayed: 0, streak: 1 }, wordOfTheDay, onStartLesson, isDarkMode, onResetProgress, userData, currentLanguage, onStartDuolingoLesson }) => {
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
  const wordOfDayBg = isDarkMode ? '#2d2d2d' : '#fff8e1';
  const wordOfDayBorder = isDarkMode ? '#555555' : '#ffd54f';
  
  // Moomin-inspired accent colours
  const moominBlue = '#3498db';
  const moominGreen = '#27ae60';
  const moominYellow = '#f1c40f';
  const moominOrange = '#e67e22';

  const playSwedish = async (word) => {
    try {
      await ttsApi.playSwedish(word);
    } catch (error) {
      console.error('Failed to play Swedish:', error);
    }
  };

  return (
    <div className="home-container">
      {/* Title and subtitle at the very top - Moomin-inspired */}
      <div className={`title-container ${isDarkMode ? 'dark' : 'light'}`}>
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
        
        <h1 className="main-title">
          Flodhästen
        </h1>
        
        <p className="subtitle">
          Learn Swedish with the River Horse
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
            
            {/* Start Lesson Buttons */}
            <div style={{ textAlign: 'center', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={onStartLesson}
                className="start-lesson-button"
              >
                Start Lesson
              </button>
              
              {/* Add Duolingo-style lesson button for the first lesson */}
              {selectedSkill.id === 'lesson1' && (
                <button
                  onClick={() => onStartDuolingoLesson('lesson1')}
                  style={{
                    background: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
                  }}
                >
                  🎯 Duolingo Style
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Word of the Day */}
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

      {/* Reset Progress and Erase Buttons */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onResetProgress}
            className="reset-progress-button"
          >
            <FaUndo style={{ marginRight: '0.5rem' }} />
            Reset Progress
          </button>
          
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to erase everything? This will completely reset the app as if you\'re using it for the first time.')) {
                // Clear all localStorage
                localStorage.clear();
                // Reload the page to start fresh
                window.location.reload();
              }
            }}
            className="erase-all-button"
          >
            🗑️ Erase All
          </button>
        </div>
      </div>


    </div>
  );
});

export default Home; 