import React, { useState, useMemo } from 'react';
import './Navigation.css';
import { MdHome, MdList, MdGames, MdLocationOn, MdLightMode, MdDarkMode, MdBook, MdPlayArrow, MdStore, MdLanguage, MdMenu, MdClose, MdEmojiEvents } from 'react-icons/md';

const Navigation = React.memo(({ currentScreen, setScreen, isDarkMode, onToggleDarkMode, onToggleLanguage, currentLanguage, onPlayIntro }) => {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const languages = useMemo(() => [
    { code: 'en', name: 'English', flag: process.env.PUBLIC_URL + '/united_kingdom_flag.png' },
    { code: 'ku', name: 'کوردی', flag: process.env.PUBLIC_URL + '/kurdish_flag.png' },
    { code: 'ku-lat', name: 'Sorani', flag: process.env.PUBLIC_URL + '/kurdish_flag.png' }
  ], []);

  const getCurrentLanguageInfo = useMemo(() => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  }, [languages, currentLanguage]);

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

  const handleNavigationClick = (screen) => {
    setScreen(screen);
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

  const navigationItems = [
    { screen: 'list', icon: <MdList />, label: 'Word List' },
    { screen: 'games', icon: <MdGames />, label: 'Games' },
    { screen: 'explore', icon: <MdLocationOn />, label: 'Explore' },
    { screen: 'story', icon: <MdBook />, label: 'Stories' },
    { screen: 'avatar-shop', icon: <MdStore />, label: 'Shop' },
    { screen: 'achievements', icon: <MdEmojiEvents />, label: 'Achievements' }
  ];

  const mobileNavItems = [
    { screen: 'home', icon: <MdHome /> },
    { screen: 'list', icon: <MdList /> },
    { screen: 'games', icon: <MdGames /> },
    { screen: 'explore', icon: <MdLocationOn /> },
    { screen: 'story', icon: <MdBook /> },
    { screen: 'achievements', icon: <MdEmojiEvents /> }
  ];

  return (
    <>
      {/* Desktop Navigation Bar */}
      <nav className={`nav-bar ${isDarkMode ? 'dark' : ''}`}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 1rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          {/* Left side - All navigation buttons visible by default */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            {/* Home button - always visible */}
            <button 
              className={currentScreen === 'home' ? 'active' : ''} 
              onClick={() => setScreen('home')}
            >
              <MdHome style={{verticalAlign:'middle',marginRight:4}} /> Home
            </button>
            
            {/* Other navigation buttons - visible by default, hidden on small screens via CSS */}
            <div className="nav-buttons-desktop">
              {navigationItems.map(({ screen, icon, label }) => (
                <button 
                  key={screen}
                  className={currentScreen === screen ? 'active' : ''} 
                  onClick={() => setScreen(screen)}
                >
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Right side - Settings dropdown */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
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
                  borderRadius: '16px',
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
                  minWidth: '48px',
                  width: '48px',
                  height: '48px'
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
                <div style={{
                  position: 'relative',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  <MdMenu style={{ 
                    fontSize: '28px', 
                    fontWeight: 'bold',
                    position: 'absolute',
                    opacity: showSettingsDropdown ? 0 : 1,
                    transform: showSettingsDropdown ? 'rotate(-90deg) scale(0.8)' : 'rotate(0deg) scale(1)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }} />
                  <MdClose style={{ 
                    fontSize: '28px', 
                    fontWeight: 'bold',
                    position: 'absolute',
                    opacity: showSettingsDropdown ? 1 : 0,
                    transform: showSettingsDropdown ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0.8)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }} />
                </div>
              </button>

              {showSettingsDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  marginTop: '8px',
                  background: cardBackground,
                  border: `2px solid ${borderColor}`,
                  borderRadius: '20px',
                  boxShadow: isDarkMode 
                    ? '0 12px 40px rgba(0,0,0,0.4)' 
                    : '0 12px 40px rgba(52, 152, 219, 0.2)',
                  zIndex: 1000,
                  minWidth: '200px',
                  overflow: 'hidden',
                  animation: 'dropdownSlide 0.3s ease-out'
                }}>
                  {/* Navigation items for small screens */}
                  <div className="nav-items-mobile">
                    {navigationItems.map(({ screen, icon, label }) => (
                      <button
                        key={screen}
                        onClick={() => handleNavigationClick(screen)}
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
                        {icon}
                        <span>{label}</span>
                        {currentScreen === screen && (
                          <span style={{ 
                            color: moominGreen,
                            fontSize: '16px',
                            fontWeight: 'bold',
                            marginLeft: 'auto'
                          }}>
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Divider */}
                  <div style={{
                    height: '1px',
                    background: borderColor,
                    margin: '8px 0'
                  }} />

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

                  {/* Language Selection */}
                  <div style={{
                    padding: '12px 20px',
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
                          e.target.style.background = isDarkMode ? '#555555' : '#f8f9fa';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'none';
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
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav className={`mobile-bottom-nav ${!isDarkMode ? 'light' : ''}`}>
        <div className="nav-container">
          {mobileNavItems.map(({ screen, icon }) => (
            <button
              key={screen}
              onClick={() => setScreen(screen)}
              className={currentScreen === screen ? 'active' : ''}
            >
              <div className="nav-icon">{icon}</div>
            </button>
          ))}
          
          {/* Mobile Settings Button */}
          <button
            onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
            className={showSettingsDropdown ? 'active' : ''}
          >
            <div className="nav-icon">
              <MdMenu />
            </div>
          </button>
        </div>

        {/* Mobile Settings Dropdown */}
        {showSettingsDropdown && (
          <div className={`mobile-settings-dropdown ${isDarkMode ? 'dark' : ''}`}>
            {/* Intro Button */}
            <button
              onClick={handleIntroClick}
              style={{
                width: '100%',
                padding: '12px 16px',
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
                padding: '12px 16px',
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

            {/* Language Selection */}
            <div style={{
              padding: '8px 16px',
              background: isDarkMode ? '#444444' : '#f0f8ff'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px',
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
                    padding: '6px 8px',
                    background: 'none',
                    border: 'none',
                    color: textColor,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    borderRadius: '6px',
                    marginBottom: '2px',
                    fontSize: '12px',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = isDarkMode ? '#555555' : '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <img 
                      src={language.flag} 
                      alt={language.name} 
                      style={{ 
                        width: '20px', 
                        height: '14px',
                        objectFit: 'cover',
                        borderRadius: '2px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }} 
                    />
                    <span style={{ 
                      fontFamily: language.code === 'ku' ? 'Arial, sans-serif' : '"Georgia", serif'
                    }}>
                      {language.name}
                    </span>
                  </div>
                  {currentLanguage === language.code && (
                    <span style={{ 
                      color: moominGreen,
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

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
    </>
  );
});

export default Navigation; 