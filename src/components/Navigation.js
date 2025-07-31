import React, { useState } from 'react';
import { MdHome, MdAddCircle, MdList, MdGames, MdLocationOn, MdLightMode, MdDarkMode, MdBook, MdPlayArrow, MdMap, MdStore, MdLanguage, MdTrendingUp } from 'react-icons/md';

function Navigation({ currentScreen, setScreen, isDarkMode, onToggleDarkMode, onToggleLanguage, currentLanguage, onPlayIntro }) {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

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
    setShowLanguageDropdown(false);
  };

  const navStyle = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    borderBottom: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
    padding: '0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
  };

  const navContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    flexWrap: 'wrap',
    gap: '10px'
  };

  const navItemsStyle = {
    display: 'flex',
    gap: '5px',
    flexWrap: 'wrap',
    alignItems: 'center'
  };

  const navItemStyle = (isActive) => ({
    padding: '12px 16px',
    backgroundColor: isActive 
      ? (isDarkMode ? '#2193b0' : '#2193b0') 
      : 'transparent',
    color: isActive 
      ? '#ffffff' 
      : (isDarkMode ? '#ffffff' : '#333333'),
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textDecoration: 'none',
    minHeight: '44px',
    '&:hover': {
      backgroundColor: isActive 
        ? (isDarkMode ? '#1a7a8f' : '#1a7a8f') 
        : (isDarkMode ? '#333' : '#f0f0f0')
    }
  });

  const controlsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap'
  };

  const buttonStyle = {
    padding: '8px 12px',
    backgroundColor: 'transparent',
    color: isDarkMode ? '#ffffff' : '#333333',
    border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.3s ease',
    minHeight: '36px',
    '&:hover': {
      backgroundColor: isDarkMode ? '#333' : '#f0f0f0'
    }
  };

  const dropdownStyle = {
    position: 'relative'
  };

  const dropdownMenuStyle = {
    position: 'absolute',
    top: '100%',
    right: '0',
    background: isDarkMode ? '#2a2a2a' : '#ffffff',
    border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
    borderRadius: '8px',
    boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 1001,
    minWidth: '140px',
    overflow: 'hidden',
    marginTop: '5px'
  };

  const dropdownItemStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'none',
    border: 'none',
    color: isDarkMode ? '#ffffff' : '#333333',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    minHeight: '44px',
    '&:hover': {
      backgroundColor: isDarkMode ? '#333' : '#f0f0f0'
    }
  };

  return (
    <nav style={navStyle} role="navigation" aria-label="Main navigation">
      <div style={navContainerStyle}>
        <div style={navItemsStyle}>
          {[
            { id: 'home', icon: MdHome, label: 'Home' },
            { id: 'add', icon: MdAddCircle, label: 'Add Words' },
            { id: 'list', icon: MdList, label: 'Word List' },
            { id: 'games', icon: MdGames, label: 'Games' },
            { id: 'explore', icon: MdLocationOn, label: 'Explore' },
            { id: 'story', icon: MdBook, label: 'Stories' },
            { id: 'experiment-map', icon: MdMap, label: 'Experiment Map' },
            { id: 'avatar-shop', icon: MdStore, label: 'Shop' },
            { id: 'progress', icon: MdTrendingUp, label: 'Progress' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              style={navItemStyle(currentScreen === id)}
              onClick={() => setScreen(id)}
              aria-label={label}
              aria-current={currentScreen === id ? 'page' : undefined}
            >
              <Icon style={{ fontSize: '18px' }} />
              {label}
            </button>
          ))}
        </div>
        
        <div style={controlsStyle}>
          <button
            onClick={onPlayIntro}
            style={buttonStyle}
            aria-label="Play introduction"
          >
            <MdPlayArrow style={{ fontSize: '16px' }} />
            Intro
          </button>

          {/* Language Dropdown */}
          <div style={dropdownStyle}>
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              style={buttonStyle}
              aria-label="Select language"
              aria-expanded={showLanguageDropdown}
              aria-haspopup="true"
            >
              <MdLanguage style={{ fontSize: '16px' }} />
              <span>{getCurrentLanguageInfo().flag}</span>
              <span style={{ fontSize: '12px' }}>{getCurrentLanguageInfo().name}</span>
            </button>

            {showLanguageDropdown && (
              <div 
                style={dropdownMenuStyle}
                role="menu"
                aria-label="Language options"
              >
                {languages.map((language, index) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    style={{
                      ...dropdownItemStyle,
                      borderBottom: index !== languages.length - 1 
                        ? `1px solid ${isDarkMode ? '#555' : '#eee'}` 
                        : 'none'
                    }}
                    role="menuitem"
                    aria-label={`Select ${language.name}`}
                  >
                    <span style={{ fontSize: '16px' }}>{language.flag}</span>
                    <span style={{ 
                      fontSize: '12px',
                      fontFamily: language.code === 'ku' ? 'Arial, sans-serif' : 'inherit'
                    }}>
                      {language.name}
                    </span>
                    {currentLanguage === language.code && (
                      <span style={{ 
                        color: '#2193b0',
                        marginLeft: 'auto',
                        fontSize: '12px'
                      }}>
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onToggleDarkMode}
            style={buttonStyle}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? <MdLightMode style={{ fontSize: '16px' }} /> : <MdDarkMode style={{ fontSize: '16px' }} />}
            <span style={{ fontSize: '12px' }}>
              {isDarkMode ? 'Light' : 'Dark'}
            </span>
          </button>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showLanguageDropdown && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowLanguageDropdown(false)}
        />
      )}
    </nav>
  );
}

export default Navigation; 