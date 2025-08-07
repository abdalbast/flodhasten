import React, { useState, useMemo, useEffect, useRef } from 'react';
import './Navigation.css';
import { MdHome, MdList, MdGames, MdLocationOn, MdLightMode, MdDarkMode, MdBook, MdStore, MdEmojiEvents, MdFlag, MdMic, MdScience, MdPublic, MdPeople, MdAnalytics, MdExtension } from 'react-icons/md';

const Navigation = React.memo(({ currentScreen, setScreen, isDarkMode, onToggleDarkMode, onToggleLanguage, currentLanguage }) => {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  
  // Refs for dropdown containers
  const settingsDropdownRef = useRef(null);
  const desktopMoreDropdownRef = useRef(null);
  const mobileMoreDropdownRef = useRef(null);

  const languages = useMemo(() => [
    { code: 'sv', name: 'Svenska', flag: process.env.PUBLIC_URL + '/swedish_flag.png' },
    { code: 'ku', name: 'کوردی', flag: process.env.PUBLIC_URL + '/kurdish_flag.png' },
    { code: 'ku-lat', name: 'Sorani', flag: process.env.PUBLIC_URL + '/kurdish_flag.png' }
  ], []);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close settings dropdown if clicked outside
      if (showSettingsDropdown && settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target)) {
        setShowSettingsDropdown(false);
      }
      
      // Close more dropdown if clicked outside (check both desktop and mobile)
      if (showMoreDropdown) {
        const isOutsideDesktop = !desktopMoreDropdownRef.current?.contains(event.target);
        const isOutsideMobile = !mobileMoreDropdownRef.current?.contains(event.target);
        
        if (isOutsideDesktop && isOutsideMobile) {
          setShowMoreDropdown(false);
        }
      }
    };

    // Add event listener if any dropdown is open
    if (showSettingsDropdown || showMoreDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showSettingsDropdown, showMoreDropdown]);

  const handleLanguageChange = (languageCode) => {
    onToggleLanguage(languageCode);
    setShowSettingsDropdown(false);
  };

  const handleDarkModeToggle = () => {
    onToggleDarkMode();
    setShowSettingsDropdown(false);
  };

  const handleNavigationClick = (screen) => {
    setScreen(screen);
    setShowSettingsDropdown(false);
    setShowMoreDropdown(false);
  };

  // Main navigation items (only 4 tabs)
  const primaryNavItems = [
    { screen: 'home', icon: <MdHome />, label: 'Home' },
    { screen: 'list', icon: <MdList />, label: 'Word List' },
    { screen: 'games', icon: <MdGames />, label: 'Games' },
    { screen: 'explore', icon: <MdLocationOn />, label: 'Explore' }
  ];

  // Dropdown menu items
  const dropdownItems = [
    { screen: 'story', icon: <MdBook />, label: 'Stories' },
    { screen: 'avatar-shop', icon: <MdStore />, label: 'Shop' },
    { screen: 'achievements', icon: <MdEmojiEvents />, label: 'Achievements' },
    { screen: 'challenges', icon: <MdFlag />, label: 'Daily Challenges' },
    { screen: 'voice-recognition', icon: <MdMic />, label: 'Voice Recognition' },
    { screen: 'testing-hub', icon: <MdScience />, label: 'Testing Hub' },
    { screen: 'cultural-integration', icon: <MdPublic />, label: 'Cultural Integration' },
    { screen: 'social-features', icon: <MdPeople />, label: 'Social Features' },
    { screen: 'advanced-analytics', icon: <MdAnalytics />, label: 'Advanced Analytics' },
    { screen: 'gamified-learning', icon: <MdExtension />, label: 'Gamified Learning' }
  ];

  return (
    <>
      {/* Desktop Navigation Bar */}
      <nav className={`nav-bar ${isDarkMode ? 'dark' : ''}`}>
        <div className="nav-container">
          {/* Main navigation buttons */}
          <div className="nav-buttons">
            {primaryNavItems.map(({ screen, icon, label }) => (
              <button
                key={screen}
                className={currentScreen === screen ? 'active' : ''}
                onClick={() => handleNavigationClick(screen)}
                aria-label={`Navigate to ${label}`}
                aria-current={currentScreen === screen ? 'page' : undefined}
                type="button"
              >
                {icon} {label}
              </button>
            ))}
          </div>
          
          {/* Right side controls */}
          <div className="nav-right-controls">
            {/* Language selector */}
            <div className="settings-container" ref={settingsDropdownRef}>
              <button
                className={`lang-btn${showSettingsDropdown ? ' active' : ''}`}
                onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                aria-label="Select language"
                type="button"
              >
                <img
                  src={languages.find(l => l.code === currentLanguage)?.flag}
                  alt={languages.find(l => l.code === currentLanguage)?.name}
                  style={{ width: '20px', height: '15px' }}
                />
              </button>
              {showSettingsDropdown && (
                <div className="settings-dropdown">
                  <button 
                    onClick={handleDarkModeToggle}
                    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                    type="button"
                  >
                    {isDarkMode ? <MdLightMode /> : <MdDarkMode />} 
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                  {languages.map(({ code, name, flag }) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code)}
                      className={currentLanguage === code ? 'active' : ''}
                      aria-label={`Switch to ${name}`}
                      aria-pressed={currentLanguage === code}
                      type="button"
                    >
                      <img src={flag} alt="" style={{ width: '16px', height: '12px', marginRight: '8px' }} />
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger menu */}
            <div className="more-dropdown-container" ref={desktopMoreDropdownRef}>
              <button
                className={`hamburger-btn${showMoreDropdown ? ' open' : ''}`}
                onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                aria-label="More options"
                aria-expanded={showMoreDropdown}
                aria-haspopup="true"
                type="button"
              >
                <div className="hamburger">
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </div>
              </button>
              {showMoreDropdown && (
                <div className="more-dropdown">
                  {dropdownItems.map(({ screen, icon, label }) => (
                    <button
                      key={screen}
                      className={currentScreen === screen ? 'active' : ''}
                      onClick={() => handleNavigationClick(screen)}
                      aria-label={`Navigate to ${label}`}
                      type="button"
                    >
                      {icon} {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className={`mobile-nav ${isDarkMode ? 'dark' : ''}`}>
        <div className="mobile-nav-container">
          {primaryNavItems.map(({ screen, icon, label }) => (
            <button
              key={screen}
              className={currentScreen === screen ? 'active' : ''}
              onClick={() => handleNavigationClick(screen)}
              aria-label={`Navigate to ${label}`}
              aria-current={currentScreen === screen ? 'page' : undefined}
              type="button"
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
          
          {/* Mobile More button */}
          <div className="mobile-more-container" ref={mobileMoreDropdownRef}>
            <button
              className={`mobile-more-btn${showMoreDropdown ? ' active' : ''}`}
              onClick={() => setShowMoreDropdown(!showMoreDropdown)}
              aria-label="More options"
              aria-expanded={showMoreDropdown}
              aria-haspopup="true"
              type="button"
            >
              <div className="hamburger">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </button>
            {showMoreDropdown && (
              <div className="mobile-more-dropdown">
                {dropdownItems.map(({ screen, icon, label }) => (
                  <button
                    key={screen}
                    className={currentScreen === screen ? 'active' : ''}
                    onClick={() => handleNavigationClick(screen)}
                    aria-label={`Navigate to ${label}`}
                    type="button"
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
});

export default Navigation; 