import React, { useState } from 'react';
import './Navigation.css';
import { MdHome, MdAddCircle, MdList, MdGames, MdLocationOn, MdLightMode, MdDarkMode, MdBook, MdPlayArrow, MdMap, MdStore, MdLanguage } from 'react-icons/md';
import Logo from './Logo';

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
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginRight: '1rem'
        }}>
          <Logo size={32} isDarkMode={isDarkMode} />
        </div>
        
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          <button className={currentScreen === 'home' ? 'active' : ''} onClick={() => setScreen('home')}><MdHome style={{verticalAlign:'middle',marginRight:4}} /> Home</button>
          <button className={currentScreen === 'add' ? 'active' : ''} onClick={() => setScreen('add')}><MdAddCircle style={{verticalAlign:'middle',marginRight:4}} /> Add Words</button>
          <button className={currentScreen === 'list' ? 'active' : ''} onClick={() => setScreen('list')}><MdList style={{verticalAlign:'middle',marginRight:4}} /> Word List</button>
          <button className={currentScreen === 'games' ? 'active' : ''} onClick={() => setScreen('games')}><MdGames style={{verticalAlign:'middle',marginRight:4}} /> Games</button>
          <button className={currentScreen === 'explore' ? 'active' : ''} onClick={() => setScreen('explore')}><MdLocationOn style={{verticalAlign:'middle',marginRight:4}} /> Explore</button>
          <button className={currentScreen === 'story' ? 'active' : ''} onClick={() => setScreen('story')}><MdBook style={{verticalAlign:'middle',marginRight:4}} /> Stories</button>
          <button className={currentScreen === 'experiment-map' ? 'active' : ''} onClick={() => setScreen('experiment-map')}><MdMap style={{verticalAlign:'middle',marginRight:4}} /> Experiment Map</button>
          <button className={currentScreen === 'avatar-shop' ? 'active' : ''} onClick={() => setScreen('avatar-shop')}><MdStore style={{verticalAlign:'middle',marginRight:4}} /> Shop</button>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <button
            onClick={onPlayIntro}
            style={{
              background: 'none',
              border: 'none',
              color: isDarkMode ? '#ffffff' : '#000000',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.color = isDarkMode ? '#64b5f6' : '#2193b0';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.color = isDarkMode ? '#ffffff' : '#000000';
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translateY(-2px)';
            }}
          >
            <MdPlayArrow />
            Intro
          </button>

          {/* Language Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              style={{
                background: 'none',
                border: 'none',
                color: isDarkMode ? '#ffffff' : '#000000',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease',
                transform: 'translateY(0)',
                minWidth: '80px',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.color = isDarkMode ? '#64b5f6' : '#2193b0';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.color = isDarkMode ? '#ffffff' : '#000000';
              }}
              onMouseDown={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
              onMouseUp={(e) => {
                e.target.style.transform = 'translateY(-2px)';
              }}
            >
              <MdLanguage />
              <span>{getCurrentLanguageInfo().flag}</span>
              <span style={{ fontSize: '0.8rem' }}>{getCurrentLanguageInfo().name}</span>
            </button>

            {showLanguageDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                background: isDarkMode ? '#3d3d3d' : '#ffffff',
                border: `2px solid ${isDarkMode ? '#555555' : '#e8f4f8'}`,
                borderRadius: '8px',
                boxShadow: isDarkMode 
                  ? '0 8px 25px rgba(0,0,0,0.3)' 
                  : '0 8px 25px rgba(52, 152, 219, 0.15)',
                zIndex: 1000,
                minWidth: '120px',
                overflow: 'hidden'
              }}>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'none',
                      border: 'none',
                      color: isDarkMode ? '#f5f5f5' : '#2c3e50',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                      borderBottom: language.code !== languages[languages.length - 1].code 
                        ? `1px solid ${isDarkMode ? '#555555' : '#e8f4f8'}` 
                        : 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = isDarkMode ? '#555555' : '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'none';
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{language.flag}</span>
                    <span style={{ 
                      fontSize: '0.9rem',
                      fontFamily: language.code === 'ku' ? 'Arial, sans-serif' : '"Georgia", serif'
                    }}>
                      {language.name}
                    </span>
                    {currentLanguage === language.code && (
                      <span style={{ 
                        color: '#3498db',
                        marginLeft: 'auto',
                        fontSize: '0.8rem'
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
            style={{
              background: 'none',
              border: 'none',
              color: isDarkMode ? '#ffffff' : '#000000',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.color = isDarkMode ? '#64b5f6' : '#2193b0';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.color = isDarkMode ? '#ffffff' : '#000000';
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translateY(-2px)';
            }}
          >
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
            {isDarkMode ? 'Light' : 'Dark'}
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