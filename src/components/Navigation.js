import React, { useState } from 'react';
import './Navigation.css';
import { MdHome, MdList, MdGames, MdLocationOn, MdLightMode, MdDarkMode, MdBook, MdPlayArrow, MdStore, MdLanguage, MdMenu } from 'react-icons/md';

function Navigation({ currentScreen, setScreen, isDarkMode, onToggleDarkMode, onToggleLanguage, currentLanguage, onPlayIntro }) {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ku', name: 'کوردی', flag: '🇮🇶' },
    { code: 'ku-lat', name: 'Sorani', flag: '🇹🇷' }
  ];

  const getCurrentLanguageInfo = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  const handleLanguageChange = (languageCode) => {
    onToggleLanguage(languageCode);
    setShowSettingsDropdown(false);
  };

  const handleIntroClick = () => {
    onPlayIntro();
    setShowSettingsDropdown(false);
  };

  const handleDarkModeToggle = () => {
    onToggleDarkMode();
    setShowSettingsDropdown(false);
  };

  // Moomin-inspired colour palette
  const moominBlue = '#3498db';
  const moominGreen = '#27ae60';
  const moominYellow = '#f1c40f';
  const moominOrange = '#e67e22';
  const moominPink = '#e91e63';
  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const backgroundColor = isDarkMode ? '#2d2d2d' : '#f8f9fa';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';

  return (
    <nav className={`nav-bar ${isDarkMode ? 'dark' : ''}`}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1rem',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          <button className={currentScreen === 'home' ? 'active' : ''} onClick={() => setScreen('home')}><MdHome style={{verticalAlign:'middle',marginRight:4}} /> Home</button>
          <button className={currentScreen === 'list' ? 'active' : ''} onClick={() => setScreen('list')}><MdList style={{verticalAlign:'middle',marginRight:4}} /> Word List</button>
          <button className={currentScreen === 'games' ? 'active' : ''} onClick={() => setScreen('games')}><MdGames style={{verticalAlign:'middle',marginRight:4}} /> Games</button>
          <button className={currentScreen === 'explore' ? 'active' : ''} onClick={() => setScreen('explore')}><MdLocationOn style={{verticalAlign:'middle',marginRight:4}} /> Explore</button>
          <button className={currentScreen === 'story' ? 'active' : ''} onClick={() => setScreen('story')}><MdBook style={{verticalAlign:'middle',marginRight:4}} /> Stories</button>
          <button className={currentScreen === 'avatar-shop' ? 'active' : ''} onClick={() => setScreen('avatar-shop')}><MdStore style={{verticalAlign:'middle',marginRight:4}} /> Shop</button>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {/* Settings Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              style={{
                background: isDarkMode 
                  ? 'linear-gradient(135deg, #3d3d3d 0%, #4d4d4d 50%, #3d3d3d 100%)' 
                  : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
                border: `2px solid ${borderColor}`,
                color: textColor,
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                boxShadow: isDarkMode 
                  ? '0 4px 12px rgba(0,0,0,0.3)' 
                  : '0 4px 12px rgba(52, 152, 219, 0.15)',
                fontWeight: 'bold',
                fontSize: '14px',
                minWidth: '40px',
                width: '40px',
                height: '40px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = isDarkMode 
                  ? '0 6px 20px rgba(0,0,0,0.4)' 
                  : '0 6px 20px rgba(52, 152, 219, 0.25)';
                e.target.style.borderColor = moominBlue;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = isDarkMode 
                  ? '0 4px 12px rgba(0,0,0,0.3)' 
                  : '0 4px 12px rgba(52, 152, 219, 0.15)';
                e.target.style.borderColor = borderColor;
              }}
              onMouseDown={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
              onMouseUp={(e) => {
                e.target.style.transform = 'translateY(-2px)';
              }}
            >
              <MdMenu style={{ fontSize: '24px', fontWeight: 'bold' }} />
            </button>

            {showSettingsDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                marginTop: '8px',
                background: cardBackground,
                border: `2px solid ${borderColor}`,
                borderRadius: '16px',
                boxShadow: isDarkMode 
                  ? '0 12px 40px rgba(0,0,0,0.4)' 
                  : '0 12px 40px rgba(52, 152, 219, 0.2)',
                zIndex: 1000,
                minWidth: '200px',
                overflow: 'hidden',
                animation: 'dropdownSlide 0.3s ease-out'
              }}>
                {/* Intro Button */}
                <button
                  onClick={handleIntroClick}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    background: 'none',
                    border: 'none',
                    color: textColor,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s ease',
                    borderBottom: `1px solid ${borderColor}`,
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = isDarkMode ? '#555555' : '#f8f9fa';
                    e.target.style.color = moominBlue;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'none';
                    e.target.style.color = textColor;
                  }}
                >
                  <MdPlayArrow style={{ fontSize: '18px', color: moominGreen }} />
                  <span>Play Intro</span>
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={handleDarkModeToggle}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    background: 'none',
                    border: 'none',
                    color: textColor,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s ease',
                    borderBottom: `1px solid ${borderColor}`,
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = isDarkMode ? '#555555' : '#f8f9fa';
                    e.target.style.color = moominBlue;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'none';
                    e.target.style.color = textColor;
                  }}
                >
                  {isDarkMode ? 
                    <MdLightMode style={{ fontSize: '18px', color: moominYellow }} /> : 
                    <MdDarkMode style={{ fontSize: '18px', color: moominOrange }} />
                  }
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                {/* Language Section */}
                <div style={{
                  padding: '12px 20px',
                  borderBottom: `1px solid ${borderColor}`,
                  background: isDarkMode ? '#444444' : '#f0f8ff'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: moominBlue
                  }}>
                    <MdLanguage style={{ fontSize: '18px' }} />
                    <span>Language</span>
                  </div>
                  
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: 'none',
                        border: 'none',
                        color: textColor,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                        borderRadius: '8px',
                        marginBottom: '4px',
                        fontSize: '13px',
                        justifyContent: 'space-between'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = isDarkMode ? '#666666' : '#e8f4f8';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>{language.flag}</span>
                        <span style={{ 
                          fontFamily: language.code === 'ku' ? 'Arial, sans-serif' : '"Georgia", serif'
                        }}>
                          {language.name}
                        </span>
                      </div>
                      {currentLanguage === language.code && (
                        <span style={{ 
                          color: moominGreen,
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }}>
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Decorative elements */}
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '8px',
                  height: '8px',
                  background: moominYellow,
                  borderRadius: '50%',
                  animation: 'gentleGlow 2s ease-in-out infinite'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  width: '6px',
                  height: '6px',
                  background: moominGreen,
                  borderRadius: '50%',
                  animation: 'gentleGlow 3s ease-in-out infinite 1s'
                }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showSettingsDropdown && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowSettingsDropdown(false)}
        />
      )}

      {/* CSS animations */}
      <style>
        {`
          @keyframes dropdownSlide {
            0% { 
              opacity: 0; 
              transform: translateY(-10px) scale(0.95);
            }
            100% { 
              opacity: 1; 
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes gentleGlow {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
          }
        `}
      </style>
    </nav>
  );
}

export default Navigation; 