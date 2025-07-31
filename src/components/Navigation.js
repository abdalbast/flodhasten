import React, { useState } from 'react';
import { componentStyles, designTokens, getThemeColors } from '../styles/designSystem';
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

  const themeColors = getThemeColors(isDarkMode);
  
  const navStyle = {
    ...componentStyles.navigation.base,
    backgroundColor: themeColors.surface,
    borderBottomColor: isDarkMode ? designTokens.colors.neutral[700] : designTokens.colors.neutral[200]
  };

  const navItemStyle = (isActive) => ({
    ...componentStyles.navigation.item,
    color: isActive ? themeColors.primary : themeColors.textSecondary,
    backgroundColor: isActive ? designTokens.colors.primary[100] : 'transparent',
    '&:hover': {
      backgroundColor: isDarkMode ? designTokens.colors.neutral[700] : designTokens.colors.neutral[100]
    }
  });

  return (
    <nav style={navStyle} role="navigation" aria-label="Main navigation">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `${designTokens.spacing[4]} ${designTokens.spacing[6]}`,
        flexWrap: 'wrap',
        gap: designTokens.spacing[2],
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          gap: designTokens.spacing[2],
          flexWrap: 'wrap'
        }}>
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
              <Icon style={{ verticalAlign: 'middle', marginRight: designTokens.spacing[1] }} />
              {label}
            </button>
          ))}
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: designTokens.spacing[2]
        }}>
          <button
            onClick={onPlayIntro}
            style={{
              ...componentStyles.button.base,
              ...componentStyles.button.variants.secondary,
              ...componentStyles.button.sizes.sm,
              color: themeColors.textSecondary,
              backgroundColor: 'transparent',
              border: `1px solid ${isDarkMode ? designTokens.colors.neutral[600] : designTokens.colors.neutral[300]}`
            }}
            aria-label="Play introduction"
          >
            <MdPlayArrow style={{ marginRight: designTokens.spacing[1] }} />
            Intro
          </button>

          {/* Language Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              style={{
                ...componentStyles.button.base,
                ...componentStyles.button.variants.secondary,
                ...componentStyles.button.sizes.sm,
                color: themeColors.textSecondary,
                backgroundColor: 'transparent',
                border: `1px solid ${isDarkMode ? designTokens.colors.neutral[600] : designTokens.colors.neutral[300]}`,
                minWidth: '100px',
                justifyContent: 'space-between'
              }}
              aria-label="Select language"
              aria-expanded={showLanguageDropdown}
              aria-haspopup="true"
            >
              <MdLanguage style={{ marginRight: designTokens.spacing[1] }} />
              <span>{getCurrentLanguageInfo().flag}</span>
              <span style={{ fontSize: designTokens.typography.fontSize.sm }}>{getCurrentLanguageInfo().name}</span>
            </button>

            {showLanguageDropdown && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  background: themeColors.surface,
                  border: `1px solid ${isDarkMode ? designTokens.colors.neutral[600] : designTokens.colors.neutral[300]}`,
                  borderRadius: designTokens.borderRadius.lg,
                  boxShadow: designTokens.shadows.lg,
                  zIndex: designTokens.zIndex.dropdown,
                  minWidth: '140px',
                  overflow: 'hidden',
                  marginTop: designTokens.spacing[1]
                }}
                role="menu"
                aria-label="Language options"
              >
                {languages.map((language, index) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    style={{
                      width: '100%',
                      padding: `${designTokens.spacing[3]} ${designTokens.spacing[4]}`,
                      background: 'none',
                      border: 'none',
                      color: themeColors.text,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: designTokens.spacing[2],
                      transition: 'all 0.2s ease',
                      borderBottom: index !== languages.length - 1 
                        ? `1px solid ${isDarkMode ? designTokens.colors.neutral[600] : designTokens.colors.neutral[200]}` 
                        : 'none',
                      minHeight: '44px' // Accessibility: minimum touch target
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = isDarkMode ? designTokens.colors.neutral[700] : designTokens.colors.neutral[100];
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'none';
                    }}
                    role="menuitem"
                    aria-label={`Select ${language.name}`}
                  >
                    <span style={{ fontSize: designTokens.typography.fontSize.lg }}>{language.flag}</span>
                    <span style={{ 
                      fontSize: designTokens.typography.fontSize.sm,
                      fontFamily: language.code === 'ku' ? 'Arial, sans-serif' : designTokens.typography.fontFamily.primary
                    }}>
                      {language.name}
                    </span>
                    {currentLanguage === language.code && (
                      <span style={{ 
                        color: themeColors.primary,
                        marginLeft: 'auto',
                        fontSize: designTokens.typography.fontSize.sm
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
              ...componentStyles.button.base,
              ...componentStyles.button.variants.secondary,
              ...componentStyles.button.sizes.sm,
              color: themeColors.textSecondary,
              backgroundColor: 'transparent',
              border: `1px solid ${isDarkMode ? designTokens.colors.neutral[600] : designTokens.colors.neutral[300]}`
            }}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
            <span style={{ marginLeft: designTokens.spacing[1] }}>
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