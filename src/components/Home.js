import React from 'react';
import { FaHatCowboy, FaUserTie, FaUndo, FaTrash } from 'react-icons/fa';
import { GiDress } from 'react-icons/gi';
import { BsPersonHeart, BsPersonFill, BsPersonBoundingBox } from 'react-icons/bs';
import { WiMoonWaningCrescent6 } from 'react-icons/wi';
import ttsApi from '../utils/ttsApi';
import LessonCircles from './LessonCircles';

import './Home.css';

// Home screen with welcome, app description, and progress tracker
const Home = React.memo(({ skills, skillProgress, onSelectSkill, selectedSkill, numWords = 0, progress = { gamesPlayed: 0, streak: 1 }, wordOfTheDay, onStartLesson, isDarkMode, onResetProgress, userData, currentLanguage, onStartDuolingoLesson }) => {
  // Add CSS animation for floating effect
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(1deg); }
      }
      @keyframes gentleGlow {
        0%, 100% { opacity: 0.8; }
        50% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Ref for lesson content area
  const lessonContentRef = React.useRef(null);
  
  // Track if user has actively clicked a lesson
  const [hasUserClickedLesson, setHasUserClickedLesson] = React.useState(false);

  // Custom lesson selection handler that triggers scroll
  const handleLessonSelection = (lessonId) => {
    setHasUserClickedLesson(true);
    onSelectSkill(lessonId);
  };

  // Scroll to lesson content only when user has actively clicked a lesson
  React.useEffect(() => {
    if (selectedSkill && lessonContentRef.current && hasUserClickedLesson) {
      lessonContentRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      // Reset the flag after scrolling
      setHasUserClickedLesson(false);
    }
  }, [selectedSkill, hasUserClickedLesson]);

  // Moomin-inspired colour palette
  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const backgroundColor = isDarkMode ? '#2d2d2d' : '#f8f9fa';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const wordOfDayBg = isDarkMode ? '#2d2d2d' : '#fff8e1';
  const wordOfDayBorder = isDarkMode ? '#555555' : '#ffd54f';
  
  // Moomin-inspired accent colours
  const moominBlue = '#3498db';
  const moominGreen = '#27ae60';
  const moominYellow = '#f1c40f';
  const moominOrange = '#e67e22';

  const playSwedish = async (word) => {
    try {
      await ttsApi.playSwedish(word);
    } catch (error) {
      console.error('Failed to play Swedish:', error);
    }
  };

  return (
    <div className="home-container max-w-5xl mx-auto px-4">
      {/* Title and subtitle at the very top - Moomin-inspired */}
      <div className={`title-container relative overflow-hidden rounded-2xl py-12 px-4 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
        {/* Decorative background elements - Moomin-inspired */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-[float_8s_ease-in-out_infinite]" 
          style={{
            background: isDarkMode 
              ? 'radial-gradient(circle, rgba(52, 152, 219, 0.1) 0%, transparent 70%)' 
              : 'radial-gradient(circle, rgba(52, 152, 219, 0.05) 0%, transparent 70%)'
          }} 
        />
        
        {/* User Avatar and Level Display */}
        <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-5xl text-white border-4 border-white dark:border-gray-700 shadow-lg">
            {userData?.currentAvatar === 'snufkin' ? <FaHatCowboy /> : 
             userData?.currentAvatar === 'snorkmaiden' ? <GiDress /> : 
             userData?.currentAvatar === 'little-my' ? <BsPersonHeart /> : 
             userData?.currentAvatar === 'hemulen' ? <FaUserTie /> : 
             userData?.currentAvatar === 'groke' ? <WiMoonWaningCrescent6 /> : 
             userData?.currentAvatar === 'moominmamma' ? <BsPersonFill /> : 
             userData?.currentAvatar === 'moominpappa' ? <FaUserTie /> : 
             userData?.currentAvatar === 'ninny' ? <WiMoonWaningCrescent6 /> : 
             userData?.currentAvatar === 'sniff' ? <BsPersonBoundingBox /> : <BsPersonFill />}
          </div>
          <div className="text-left">
            <h3 className="m-0 text-yellow-500 dark:text-yellow-400 text-xl font-serif">
              Level {userData?.level || 1}
            </h3>
            <p className="m-0 text-gray-600 dark:text-gray-400 text-sm italic">
              {userData?.xp || 0} XP
            </p>
          </div>
        </div>
        
        <h1 className="main-title text-4xl md:text-5xl font-bold text-center text-blue-600 dark:text-blue-400 font-serif mb-2">
          Flodhästen
        </h1>
        
        <p className="subtitle text-xl text-center text-gray-600 dark:text-gray-300 font-serif">
          Learn Swedish with the River Horse
        </p>
        
        {/* Moomin-inspired decorative elements */}
        <div className="absolute top-5 right-8 w-10 h-10 bg-yellow-400 dark:bg-yellow-500 rounded-full animate-[gentleGlow_3s_ease-in-out_infinite]" />
        <div className="absolute bottom-8 left-10 w-6 h-6 bg-green-500 dark:bg-green-600 rounded-full animate-[gentleGlow_4s_ease-in-out_infinite_1s]" />
      </div>
      
      <LessonCircles skills={skills} progress={skillProgress} onSelectSkill={handleLessonSelection} isDarkMode={isDarkMode} />
      
      {/* Lesson Content Area - This is where we scroll to */}
      <div ref={lessonContentRef} className="mt-8">
        {selectedSkill && (
          <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border-2 ${isDarkMode ? 'border-gray-700' : 'border-blue-100'} mb-8`}>
            <h2 className="text-blue-600 dark:text-blue-400 text-2xl md:text-3xl font-serif text-center mb-6">
              {currentLanguage === 'ku' ? selectedSkill.name : selectedSkill.name}
            </h2>
            
            {/* Words Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {selectedSkill.words.map((word, index) => (
                <div key={index} className={`bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} text-center transition-all duration-300 hover:shadow-md`}>
                  <div className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 font-serif">
                    {word.swedish}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 italic">
                    {currentLanguage === 'ku' ? word.kurdish : 
                     currentLanguage === 'ku-lat' ? word.kurdish : 
                     word.english}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Start Lesson Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={onStartLesson}
                className="start-lesson-button bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Start Lesson
              </button>
              
              {/* Add Duolingo-style lesson button for the first lesson */}
              {selectedSkill.id === 'lesson1' && (
                <button
                  onClick={() => onStartDuolingoLesson('lesson1')}
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  🎯 Duolingo Style
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Word of the Day */}
      {wordOfTheDay && (
        <div className={`mx-auto my-8 p-6 ${isDarkMode ? 'bg-amber-900/20' : 'bg-amber-50'} rounded-xl shadow-lg max-w-md border-2 ${isDarkMode ? 'border-amber-700/50' : 'border-amber-200'} relative overflow-hidden`}>
          <div className="absolute top-[-10px] right-[-10px] w-8 h-8 bg-yellow-400 dark:bg-yellow-500 rounded-full animate-[gentleGlow_2s_ease-in-out_infinite]" />
          
          <h3 className="text-xl font-serif font-medium text-gray-800 dark:text-gray-100 mb-4">
            Word of the Day
          </h3>
          
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2 font-serif">
            {wordOfTheDay.swedish}
          </div>
          
          <div className="text-gray-600 dark:text-gray-400 italic">
            {currentLanguage === 'ku' ? wordOfTheDay.kurdish : 
             currentLanguage === 'ku-lat' ? wordOfTheDay.kurdish : 
             wordOfTheDay.english}
          </div>
          
          <button 
            onClick={() => playSwedish(wordOfTheDay.swedish)}
            className="mt-4 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            aria-label={`Play pronunciation of ${wordOfTheDay.swedish}`}
          >
            <MdVolumeUp className="text-xl mr-1" />
            <span className="text-sm">Listen</span>
          </button>
        </div>
      )}

      {/* Progress Summary */}
      <div className={`mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 ${isDarkMode ? 'border-gray-700' : 'border-blue-100'} max-w-2xl`}>
        <h3 className="text-xl font-serif text-blue-600 dark:text-blue-400 mb-4">
          Your Progress
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {numWords}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Words Learned
            </div>
          </div>
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
              {progress.gamesPlayed}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Games Played
            </div>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {progress.streak}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Day Streak
            </div>
          </div>
        </div>
      </div>

      {/* Reset Progress and Erase Buttons */}
      <div className="text-center my-8">
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={onResetProgress}
            className="flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <FaUndo className="mr-2" />
            Reset Progress
          </button>
          
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to erase everything? This will completely reset the app as if you\'re using it for the first time.')) {
                // Clear all localStorage
                localStorage.clear();
                // Reload the page to start fresh
                window.location.reload();
              }
            }}
            className="flex items-center px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <FaTrash className="mr-2" />
            Erase All
          </button>
        </div>
      </div>

    </div>
  );
});

export default Home; 