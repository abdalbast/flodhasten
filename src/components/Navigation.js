import React, { useState, useMemo, useEffect, useRef } from 'react';
import './Navigation.css';
import { MdHome, MdList, MdGames, MdLocationOn, MdLightMode, MdDarkMode, MdBook, MdStore, MdEmojiEvents, MdFlag, MdMic, MdScience, MdPublic, MdPeople, MdAnalytics, MdExtension, MdSettings } from 'react-icons/md';
import { Divider, Stack, Surface, Text, TopBar } from '../design/components';

// Version constant - should match the one in App.js
const APP_VERSION = '1.0.1-1756732567308';

const Navigation = React.memo(({ currentScreen, setScreen, isDarkMode, onToggleDarkMode, onToggleLanguage, currentLanguage }) => {
  const [showMainMenu, setShowMainMenu] = useState(false);
  
  // Ref for main menu dropdown
  const mainMenuRef = useRef(null);

  const languages = useMemo(() => [
    { code: 'sv', name: 'Svenska', flag: process.env.PUBLIC_URL + '/swedish_flag.png' },
    { code: 'ku', name: 'کوردی', flag: process.env.PUBLIC_URL + '/kurdish_flag.png' },
    { code: 'ku-lat', name: 'Sorani', flag: process.env.PUBLIC_URL + '/kurdish_flag.png' }
  ], []);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMainMenu && mainMenuRef.current && !mainMenuRef.current.contains(event.target)) {
        setShowMainMenu(false);
      }
    };

    // Add event listener if dropdown is open
    if (showMainMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showMainMenu]);

  const handleLanguageChange = (languageCode) => {
    onToggleLanguage(languageCode);
    setShowMainMenu(false);
  };

  const handleDarkModeToggle = () => {
    onToggleDarkMode();
    setShowMainMenu(false);
  };

  const handleNavigationClick = (screen) => {
    setScreen(screen);
    setShowMainMenu(false);
  };

  // All navigation items - now in one unified menu
  const allNavItems = [
    { screen: 'home', icon: <MdHome />, label: 'Home', category: 'main' },
    { screen: 'list', icon: <MdList />, label: 'Word List', category: 'main' },
    { screen: 'games', icon: <MdGames />, label: 'Games', category: 'main' },
    { screen: 'explore', icon: <MdLocationOn />, label: 'Explore', category: 'main' },
    { screen: 'story', icon: <MdBook />, label: 'Stories', category: 'content' },
    { screen: 'avatar-shop', icon: <MdStore />, label: 'Shop', category: 'content' },
    { screen: 'achievements', icon: <MdEmojiEvents />, label: 'Achievements', category: 'progress' },
    { screen: 'challenges', icon: <MdFlag />, label: 'Daily Challenges', category: 'progress' },
    { screen: 'voice-recognition', icon: <MdMic />, label: 'Voice Recognition', category: 'tools' },
    { screen: 'testing-hub', icon: <MdScience />, label: 'Testing Hub', category: 'tools' },
    { screen: 'cultural-integration', icon: <MdPublic />, label: 'Cultural Integration', category: 'tools' },
    { screen: 'social-features', icon: <MdPeople />, label: 'Social Features', category: 'social' },
    { screen: 'advanced-analytics', icon: <MdAnalytics />, label: 'Advanced Analytics', category: 'social' },
    { screen: 'gamified-learning', icon: <MdExtension />, label: 'Gamified Learning', category: 'social' },
    { screen: 'settings', icon: <MdSettings />, label: 'Settings', category: 'system' }
  ];

  // Group navigation items by category for better organization
  const groupedNavItems = allNavItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const categoryLabels = {
    main: 'Main',
    content: 'Content',
    progress: 'Progress',
    tools: 'Tools',
    social: 'Social',
    system: 'System'
  };

  return (
    <>
      <TopBar
        className="fd-navBar"
        leading={(
          <Stack direction="row" gap="12px" align="center" className="fd-navBrand">
            <Surface
              className="fd-navBrandBadge"
              elevation="low"
              bordered
              as="div"
            >
              <Text as="span" variant="section" weight="semibold" className="fd-navBrandLetter">
                F
              </Text>
            </Surface>
            <div className="fd-navBrandText">
              <Text as="h1" variant="section" serif weight="medium" className="fd-navBrandTitle">
                Flodhästen
              </Text>
              <Text as="p" variant="caption" color="secondary" className="fd-navBrandSubtitle">
                Learn Swedish
              </Text>
            </div>
          </Stack>
        )}
        actions={(
          <Stack direction="row" gap="8px" align="center" className="fd-navControls">
            <div className="fd-navCurrentPill" aria-hidden="true">
              <Text as="span" variant="micro" color="secondary" className="fd-navCurrentLabel">
                Current
              </Text>
              <Text as="span" variant="caption" weight="medium" truncate>
                {allNavItems.find(item => item.screen === currentScreen)?.label || 'Unknown'}
              </Text>
            </div>

            <button
              className="fd-navIconButton"
              onClick={() => {
                const nextLang = languages.find(l => l.code !== currentLanguage);
                if (nextLang) handleLanguageChange(nextLang.code);
              }}
              aria-label="Switch language"
              type="button"
            >
              <img
                src={languages.find(l => l.code === currentLanguage)?.flag}
                alt=""
                className="fd-navFlag"
              />
            </button>

            <button
              className="fd-navIconButton"
              onClick={handleDarkModeToggle}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              type="button"
            >
              <span className="fd-navIconGlyph">
                {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
              </span>
            </button>

            <div className="fd-navMenuWrap" ref={mainMenuRef}>
              <button
                className={`fd-navIconButton fd-navMenuButton ${showMainMenu ? 'is-open' : ''}`}
                onClick={() => setShowMainMenu(!showMainMenu)}
                aria-label="Main menu"
                aria-expanded={showMainMenu}
                aria-haspopup="true"
                type="button"
              >
                <span className="fd-navMenuBars" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </button>

              {showMainMenu && (
                <Surface
                  className="fd-navDropdown"
                  elevation="high"
                  bordered
                  padding="sm"
                  role="menu"
                  aria-label="Main menu"
                >
                  {Object.entries(groupedNavItems).map(([category, items], categoryIndex) => (
                    <div key={category} className="fd-navDropdownSection">
                      {categoryIndex > 0 ? <Divider className="fd-navDropdownDivider" /> : null}
                      <Text as="p" variant="micro" weight="semibold" color="muted" className="fd-navSectionTitle">
                        {categoryLabels[category]}
                      </Text>
                      <Stack direction="column" gap="4px">
                        {items.map(({ screen, icon, label }) => {
                          const active = currentScreen === screen;
                          return (
                            <button
                              key={screen}
                              className={`fd-navMenuItem ${active ? 'is-active' : ''}`}
                              onClick={() => handleNavigationClick(screen)}
                              aria-label={`Navigate to ${label}`}
                              aria-current={active ? 'page' : undefined}
                              type="button"
                              role="menuitem"
                            >
                              <span className="fd-navMenuItemIcon" aria-hidden="true">{icon}</span>
                              <Text as="span" variant="body" weight={active ? 'medium' : 'regular'}>
                                {label}
                              </Text>
                              {active ? <span className="fd-navMenuCheck" aria-hidden="true">✓</span> : null}
                            </button>
                          );
                        })}
                      </Stack>
                    </div>
                  ))}
                  <Divider className="fd-navDropdownDivider" />
                  <Text as="p" variant="micro" color="muted" className="fd-navVersion">
                    Version {APP_VERSION.split('-')[0]}
                  </Text>
                </Surface>
              )}
            </div>
          </Stack>
        )}
      />
    </>
  );
});

export default Navigation; 
