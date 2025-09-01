import React, { useState, useMemo, useEffect, useRef } from 'react';
import './Navigation.css';
import { MdHome, MdList, MdGames, MdLocationOn, MdLightMode, MdDarkMode, MdBook, MdStore, MdEmojiEvents, MdFlag, MdMic, MdScience, MdPublic, MdPeople, MdAnalytics, MdExtension } from 'react-icons/md';

// Version constant - should match the one in App.js
const APP_VERSION = '1.0.1-1756729133544';

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
      <nav className={`sticky top-0 z-30 w-full bg-blue-600 dark:bg-blue-900 text-white shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Main navigation buttons */}
          <div className="flex space-x-1 sm:space-x-4">
            {primaryNavItems.map(({ screen, icon, label }) => (
              <button
                key={screen}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200
                  ${currentScreen === screen 
                    ? 'bg-blue-800 dark:bg-blue-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 dark:hover:bg-blue-800 hover:text-white'
                  }
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 dark:focus-visible:ring-offset-blue-900`}
                onClick={() => handleNavigationClick(screen)}
                aria-label={`Navigate to ${label}`}
                aria-current={currentScreen === screen ? 'page' : undefined}
                type="button"
              >
                <span className="text-xl mr-2">{icon}</span> 
                <span className="hidden sm:block">{label}</span>
              </button>
            ))}
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Language selector */}
            <div className="relative" ref={settingsDropdownRef}>
              <button
                className={`p-2 rounded-full flex items-center justify-center transition-colors duration-200
                  ${showSettingsDropdown 
                    ? 'bg-blue-800 dark:bg-blue-700' 
                    : 'hover:bg-blue-700 dark:hover:bg-blue-800'
                  }
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 dark:focus-visible:ring-offset-blue-900`}
                onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                aria-label="Select language"
                aria-expanded={showSettingsDropdown}
                aria-haspopup="true"
                type="button"
              >
                <img
                  src={languages.find(l => l.code === currentLanguage)?.flag}
                  alt={languages.find(l => l.code === currentLanguage)?.name}
                  className="w-5 h-4 object-cover rounded-sm"
                />
              </button>
              {showSettingsDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                  <button 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus-visible:outline-none focus-visible:bg-gray-100 dark:focus-visible:bg-gray-700"
                    onClick={handleDarkModeToggle}
                    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                    type="button"
                  >
                    <span className="text-xl mr-2">{isDarkMode ? <MdLightMode /> : <MdDarkMode />}</span>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  {languages.map(({ code, name, flag }) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code)}
                      className={`flex items-center w-full px-4 py-2 text-sm transition-colors duration-200
                        ${currentLanguage === code 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }
                        focus-visible:outline-none focus-visible:bg-gray-100 dark:focus-visible:bg-gray-700`}
                      aria-label={`Switch to ${name}`}
                      aria-pressed={currentLanguage === code}
                      type="button"
                    >
                      <img src={flag} alt="" className="w-4 h-3 mr-2 object-cover rounded-sm" />
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger menu */}
            <div className="relative" ref={desktopMoreDropdownRef}>
              <button
                className={`p-2 rounded-full flex items-center justify-center transition-colors duration-200
                  ${showMoreDropdown 
                    ? 'bg-blue-800 dark:bg-blue-700' 
                    : 'hover:bg-blue-700 dark:hover:bg-blue-800'
                  }
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 dark:focus-visible:ring-offset-blue-900`}
                onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                aria-label="More options"
                aria-expanded={showMoreDropdown}
                aria-haspopup="true"
                type="button"
              >
                <div className="w-5 h-5 flex flex-col justify-between">
                  <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${showMoreDropdown ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${showMoreDropdown ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${showMoreDropdown ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
              {showMoreDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                  <div className="max-h-96 overflow-y-auto">
                    {dropdownItems.map(({ screen, icon, label }) => (
                      <button
                        key={screen}
                        className={`flex items-center w-full px-4 py-2 text-sm transition-colors duration-200
                          ${currentScreen === screen 
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }
                          focus-visible:outline-none focus-visible:bg-gray-100 dark:focus-visible:bg-gray-700`}
                        onClick={() => handleNavigationClick(screen)}
                        aria-label={`Navigate to ${label}`}
                        type="button"
                      >
                        <span className="text-xl mr-2">{icon}</span>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 z-30 bg-blue-600 dark:bg-blue-900 text-white border-t border-blue-700 dark:border-blue-800 md:hidden`}>
        <div className="flex justify-between items-center h-16">
          {primaryNavItems.map(({ screen, icon, label }) => (
            <button
              key={screen}
              className={`flex-1 flex flex-col items-center justify-center h-full transition-colors duration-200 py-1
                ${currentScreen === screen 
                  ? 'bg-blue-700 dark:bg-blue-800 text-white' 
                  : 'text-blue-100 hover:bg-blue-700/50 dark:hover:bg-blue-800/50 hover:text-white'
                }
                focus-visible:outline-none focus-visible:bg-blue-700/50 dark:focus-visible:bg-blue-800/50`}
              onClick={() => handleNavigationClick(screen)}
              aria-label={`Navigate to ${label}`}
              aria-current={currentScreen === screen ? 'page' : undefined}
              type="button"
            >
              <span className="text-xl mb-1">{icon}</span>
              <span className="text-xs">{label}</span>
            </button>
          ))}
          
          {/* Mobile More button */}
          <div className="flex-1 relative" ref={mobileMoreDropdownRef}>
            <button
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 py-1
                ${showMoreDropdown 
                  ? 'bg-blue-700 dark:bg-blue-800 text-white' 
                  : 'text-blue-100 hover:bg-blue-700/50 dark:hover:bg-blue-800/50 hover:text-white'
                }
                focus-visible:outline-none focus-visible:bg-blue-700/50 dark:focus-visible:bg-blue-800/50`}
              onClick={() => setShowMoreDropdown(!showMoreDropdown)}
              aria-label="More options"
              aria-expanded={showMoreDropdown}
              aria-haspopup="true"
              type="button"
            >
              <div className="w-5 h-5 flex flex-col justify-between mb-1">
                <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${showMoreDropdown ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${showMoreDropdown ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${showMoreDropdown ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
              <span className="text-xs">More</span>
            </button>
            {showMoreDropdown && (
              <div className="absolute bottom-full right-0 left-0 mb-2 bg-white dark:bg-gray-800 rounded-t-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700 max-h-[70vh] overflow-y-auto">
                {dropdownItems.map(({ screen, icon, label }) => (
                  <button
                    key={screen}
                    className={`flex items-center w-full px-4 py-3 text-sm transition-colors duration-200
                      ${currentScreen === screen 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                      focus-visible:outline-none focus-visible:bg-gray-100 dark:focus-visible:bg-gray-700`}
                    onClick={() => handleNavigationClick(screen)}
                    aria-label={`Navigate to ${label}`}
                    type="button"
                  >
                    <span className="text-xl mr-3">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Version Display */}
        <div className="version-display">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            v{APP_VERSION}
          </span>
        </div>
      </nav>
    </>
  );
});

export default Navigation; 