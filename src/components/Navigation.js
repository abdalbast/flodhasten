import React, { useState } from 'react';
import './Navigation.css';
import { MdHome, MdList, MdGames, MdLocationOn, MdLightMode, MdDarkMode, MdBook, MdPlayArrow, MdStore, MdLanguage, MdMenu, MdClose } from 'react-icons/md';

function Navigation({ currentScreen, setScreen, isDarkMode, onToggleDarkMode, onToggleLanguage, currentLanguage, onPlayIntro }) {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: process.env.PUBLIC_URL + '/united_kingdom_flag.png' },
    { code: 'ku', name: 'کوردی', flag: process.env.PUBLIC_URL + '/kurdish_flag.png' },
    { code: 'ku-lat', name: 'Sorani', flag: process.env.PUBLIC_URL + '/kurdish_flag.png' }
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
    <nav className={`nav-bar ${isDarkMode ? 'dark' : ''}`} style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      background: isDarkMode 
        ? 'rgba(0, 0, 0, 0.3)' 
        : 'rgba(255, 255, 255, 0.8)',
      borderBottom: isDarkMode 
        ? '1px solid rgba(255, 255, 255, 0.1)' 
        : '1px solid rgba(0, 0, 0, 0.1)',
      padding: '1rem 0',
      marginBottom: '1rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1.5rem',
        flexWrap: 'wrap',
        gap: '0.5rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          {[
            { screen: 'home', icon: <MdHome />, label: 'Home' },
            { screen: 'list', icon: <MdList />, label: 'Word List' },
            { screen: 'games', icon: <MdGames />, label: 'Games' },
            { screen: 'explore', icon: <MdLocationOn />, label: 'Explore' },
            { screen: 'story', icon: <MdBook />, label: 'Stories' },
            { screen: 'avatar-shop', icon: <MdStore />, label: 'Shop' }
          ].map(({ screen, icon, label }) => (
            <button 
              key={screen}
              className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''} ${currentScreen === screen ? 'active' : ''}`}
              onClick={() => setScreen(screen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: 'none',
                color: currentScreen === screen 
                  ? (isDarkMode ? '#fff' : '#2193b0')
                  : (isDarkMode ? '#ccc' : '#666'),
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: currentScreen === screen 
                  ? (isDarkMode ? 'rgba(52, 152, 219, 0.3)' : 'rgba(52, 152, 219, 0.15)')
                  : 'transparent',
                border: currentScreen === screen 
                  ? `1px solid ${isDarkMode ? 'rgba(52, 152, 219, 0.5)' : 'rgba(52, 152, 219, 0.3)'}`
                  : '1px solid transparent'
              }}
            >
              {icon}
              {label}
            </button>
          ))}
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
              className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
              style={{
                color: textColor,
                cursor: 'pointer',
                padding: '0.75rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '16px',
                minWidth: '48px',
                width: '48px',
                height: '48px',
                border: 'none'
              }}
            >
              <div style={{
                position: 'relative',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <MdMenu style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold',
                  position: 'absolute',
                  opacity: showSettingsDropdown ? 0 : 1,
                  transform: showSettingsDropdown ? 'rotate(-90deg) scale(0.8)' : 'rotate(0deg) scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
                <MdClose style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold',
                  position: 'absolute',
                  opacity: showSettingsDropdown ? 1 : 0,
                  transform: showSettingsDropdown ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0.8)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
              </div>
            </button>

            {showSettingsDropdown && (
              <div className={`liquid-glass ${isDarkMode ? 'liquid-glass-dark' : ''}`} style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                marginTop: '8px',
                borderRadius: '20px',
                zIndex: 1000,
                minWidth: '220px',
                overflow: 'hidden',
                animation: 'dropdownSlide 0.3s ease-out'
              }}>
                {/* Intro Button */}
                <button
                  onClick={handleIntroClick}
                  className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: 'none',
                    color: textColor,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    borderRadius: '0',
                    background: 'transparent'
                  }}
                >
                  <MdPlayArrow style={{ fontSize: '18px', color: moominGreen }} />
                  <span>Play Intro</span>
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={handleDarkModeToggle}
                  className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: 'none',
                    color: textColor,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    borderRadius: '0',
                    background: 'transparent',
                    borderTop: `1px solid ${borderColor}`,
                    borderBottom: `1px solid ${borderColor}`
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
                  background: isDarkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
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
                      className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: 'none',
                        color: textColor,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        borderRadius: '8px',
                        marginBottom: '4px',
                        fontSize: '13px',
                        justifyContent: 'space-between',
                        background: 'transparent'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img 
                          src={language.flag} 
                          alt={language.name} 
                          style={{ 
                            width: '24px', 
                            height: '16px',
                            objectFit: 'cover',
                            borderRadius: '2px',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                          }} 
                        />
                        <span style={{ 
                          fontFamily: language.code === 'ku' ? 'Arial, sans-serif' : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
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
        `}
      </style>
    </nav>
  );
}

export default Navigation; 