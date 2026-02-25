import React, { useState, useMemo, useEffect, useRef } from 'react';
import './Navigation.css';
import { MdHome, MdList, MdGames, MdLocationOn, MdLightMode, MdDarkMode, MdBook, MdStore, MdEmojiEvents, MdFlag, MdMic, MdScience, MdPublic, MdPeople, MdAnalytics, MdExtension, MdSettings } from 'react-icons/md';

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
      {/* Unified Navigation Header */}
      <nav className="sticky top-0 z-30 w-full bg-blue-600 dark:bg-blue-900 text-white shadow-lg border-b border-blue-500 dark:border-blue-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/App Name */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Flodhästen</h1>
                <p className="text-xs text-blue-200">Learn Swedish</p>
              </div>
            </div>
            
            {/* Current Page Indicator (Desktop) */}
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-blue-200 text-sm">Current:</span>
              <span className="bg-blue-800 dark:bg-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {allNavItems.find(item => item.screen === currentScreen)?.label || 'Unknown'}
              </span>
            </div>
            
            {/* Right side controls */}
            <div className="flex items-center space-x-2">
              {/* Language selector */}
              <button
                className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2"
                onClick={() => {
                  const nextLang = languages.find(l => l.code !== currentLanguage);
                  if (nextLang) handleLanguageChange(nextLang.code);
                }}
                aria-label="Switch language"
                type="button"
              >
                <img
                  src={languages.find(l => l.code === currentLanguage)?.flag}
                  alt={languages.find(l => l.code === currentLanguage)?.name}
                  className="w-5 h-4 object-cover rounded-sm"
                />
              </button>

              {/* Dark mode toggle */}
              <button
                className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2"
                onClick={handleDarkModeToggle}
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                type="button"
              >
                <span className="text-xl">
                  {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
                </span>
              </button>

              {/* Hamburger Menu */}
              <div className="relative" ref={mainMenuRef}>
                <button
                  className={`p-2 rounded-full flex items-center justify-center transition-all duration-300 ${
                    showMainMenu 
                      ? 'bg-blue-800 dark:bg-blue-700 rotate-90' 
                      : 'hover:bg-blue-700 dark:hover:bg-blue-800'
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2`}
                  onClick={() => setShowMainMenu(!showMainMenu)}
                  aria-label="Main menu"
                  aria-expanded={showMainMenu}
                  aria-haspopup="true"
                  type="button"
                >
                  <div className="w-6 h-6 flex flex-col justify-between">
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${showMainMenu ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${showMainMenu ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${showMainMenu ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                  </div>
                </button>

                {/* Main Menu Dropdown */}
                {showMainMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-2 z-50 border border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-y-auto">
                    {Object.entries(groupedNavItems).map(([category, items]) => (
                      <div key={category} className="mb-1">
                        {/* Category Header */}
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                          {categoryLabels[category]}
                        </div>
                        
                        {/* Category Items */}
                        <div className="py-1">
                          {items.map(({ screen, icon, label }) => (
                            <button
                              key={screen}
                              className={`flex items-center w-full px-4 py-3 text-sm transition-colors duration-200 ${
                                currentScreen === screen 
                                  ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500' 
                                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                              } focus-visible:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700`}
                              onClick={() => handleNavigationClick(screen)}
                              aria-label={`Navigate to ${label}`}
                              aria-current={currentScreen === screen ? 'page' : undefined}
                              type="button"
                            >
                              <span className="text-xl mr-3 flex-shrink-0">{icon}</span>
                              <span className="font-medium">{label}</span>
                              {currentScreen === screen && (
                                <span className="ml-auto text-blue-500 dark:text-blue-400">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {/* Version info at bottom */}
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2 px-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Version {APP_VERSION.split('-')[0]}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});

export default Navigation; 