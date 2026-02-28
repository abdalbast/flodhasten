import React from 'react';
import { FaHatCowboy, FaUserTie, FaUndo, FaTrash } from 'react-icons/fa';
import { GiDress } from 'react-icons/gi';
import { BsPersonHeart, BsPersonFill, BsPersonBoundingBox } from 'react-icons/bs';
import { WiMoonWaningCrescent6 } from 'react-icons/wi';
import { MdVolumeUp } from 'react-icons/md';
import ttsApi from '../utils/ttsApi';
import LessonCircles from './LessonCircles';
import { Button, Surface, Text } from '../design/components';

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
      <Surface
        elevation="medium"
        bordered
        className="title-container relative overflow-hidden py-12 px-4 mb-8"
        style={{
          background: isDarkMode
            ? 'linear-gradient(180deg, rgba(42,39,34,0.95), rgba(36,33,29,0.95))'
            : 'linear-gradient(180deg, rgba(255,255,255,0.88), rgba(147,191,190,0.08))',
          borderColor: isDarkMode ? 'var(--fd-border-default)' : 'rgba(147,191,190,0.28)'
        }}
      >
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
          <Surface
            elevation="low"
            bordered
            className="w-20 h-20 rounded-full flex items-center justify-center text-5xl border-4"
            style={{
              background: 'linear-gradient(180deg, var(--fd-accent), var(--fd-accent-strong))',
              color: '#fff',
              borderColor: isDarkMode ? 'rgba(255,255,255,0.12)' : '#fff'
            }}
          >
            {userData?.currentAvatar === 'snufkin' ? <FaHatCowboy /> : 
             userData?.currentAvatar === 'snorkmaiden' ? <GiDress /> : 
             userData?.currentAvatar === 'little-my' ? <BsPersonHeart /> : 
             userData?.currentAvatar === 'hemulen' ? <FaUserTie /> : 
             userData?.currentAvatar === 'groke' ? <WiMoonWaningCrescent6 /> : 
             userData?.currentAvatar === 'moominmamma' ? <BsPersonFill /> : 
             userData?.currentAvatar === 'moominpappa' ? <FaUserTie /> : 
             userData?.currentAvatar === 'ninny' ? <WiMoonWaningCrescent6 /> : 
             userData?.currentAvatar === 'sniff' ? <BsPersonBoundingBox /> : <BsPersonFill />}
          </Surface>
          <div className="text-left">
            <Text as="h3" variant="section" serif weight="medium" className="m-0" style={{ color: '#d4a017' }}>
              Level {userData?.level || 1}
            </Text>
            <Text as="p" variant="caption" color="secondary" className="m-0" style={{ fontStyle: 'italic' }}>
              {userData?.xp || 0} XP
            </Text>
          </div>
        </div>
        
        <Text
          as="h1"
          variant="display"
          serif
          weight="medium"
          align="center"
          className="main-title mb-2"
          style={{ color: isDarkMode ? '#a8ccff' : 'var(--fd-accent-strong)' }}
        >
          Flodhästen
        </Text>
        
        <Text
          as="p"
          variant="bodyLg"
          serif
          color="secondary"
          align="center"
          className="subtitle"
          style={{ fontStyle: 'italic' }}
        >
          Learn Swedish with the River Horse
        </Text>
        
        {/* Moomin-inspired decorative elements */}
        <div className="absolute top-5 right-8 w-10 h-10 bg-yellow-400 dark:bg-yellow-500 rounded-full animate-[gentleGlow_3s_ease-in-out_infinite]" />
        <div className="absolute bottom-8 left-10 w-6 h-6 bg-green-500 dark:bg-green-600 rounded-full animate-[gentleGlow_4s_ease-in-out_infinite_1s]" />
      </Surface>
      
      <LessonCircles skills={skills} progress={skillProgress} onSelectSkill={handleLessonSelection} isDarkMode={isDarkMode} />
      
      {/* Lesson Content Area - This is where we scroll to */}
      <div ref={lessonContentRef} className="mt-8">
        {selectedSkill && (
          <Surface
            elevation="medium"
            bordered
            padding="lg"
            className="mb-8"
            style={{
              borderColor: isDarkMode ? 'var(--fd-border-default)' : 'rgba(147,191,190,0.28)'
            }}
          >
            <Text as="h2" variant="title" serif weight="medium" align="center" className="mb-6" style={{ color: 'var(--fd-accent-strong)' }}>
              {currentLanguage === 'ku' ? selectedSkill.name : selectedSkill.name}
            </Text>
            
            {/* Words Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {selectedSkill.words.map((word, index) => (
                <Surface
                  key={index}
                  elevation="low"
                  bordered
                  padding="md"
                  interactive
                  className="text-center"
                  style={{
                    borderRadius: '16px',
                    background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.86)'
                  }}
                >
                  <Text as="div" variant="section" serif weight="medium" className="mb-2">
                    {word.swedish}
                  </Text>
                  <Text as="div" variant="caption" color="secondary" style={{ fontStyle: 'italic' }}>
                    {currentLanguage === 'ku' ? word.kurdish : 
                     currentLanguage === 'ku-lat' ? word.kurdish : 
                     word.english}
                  </Text>
                </Surface>
              ))}
            </div>
            
            {/* Start Lesson Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={onStartLesson}
                variant="primary"
              >
                Start Lesson
              </Button>
              
              {/* Add Duolingo-style lesson button for the first lesson */}
              {selectedSkill.id === 'lesson1' && (
                <Button
                  onClick={() => onStartDuolingoLesson('lesson1')}
                  variant="secondary"
                  style={{
                    background: 'linear-gradient(180deg, #34a853, #2f9a4c)',
                    color: '#fff',
                    borderColor: 'transparent'
                  }}
                >
                  🎯 Duolingo Style
                </Button>
              )}
            </div>
          </Surface>
        )}
      </div>

      {/* Word of the Day */}
      {wordOfTheDay && (
        <Surface
          elevation="medium"
          bordered
          padding="lg"
          className="mx-auto my-8 max-w-md relative overflow-hidden"
          tone="warning"
          style={{ borderColor: isDarkMode ? 'rgba(245, 158, 11, 0.35)' : '#f2d39a' }}
        >
          <div className="absolute top-[-10px] right-[-10px] w-8 h-8 bg-yellow-400 dark:bg-yellow-500 rounded-full animate-[gentleGlow_2s_ease-in-out_infinite]" />
          
          <Text as="h3" variant="section" serif weight="medium" className="mb-4">
            Word of the Day
          </Text>
          
          <Text as="div" variant="title" serif weight="medium" className="mb-2">
            {wordOfTheDay.swedish}
          </Text>
          
          <Text as="div" variant="body" color="secondary" style={{ fontStyle: 'italic' }}>
            {currentLanguage === 'ku' ? wordOfTheDay.kurdish : 
             currentLanguage === 'ku-lat' ? wordOfTheDay.kurdish : 
             wordOfTheDay.english}
          </Text>
          
          <Button 
            onClick={() => playSwedish(wordOfTheDay.swedish)}
            className="mt-4"
            variant="ghost"
            leftIcon={<MdVolumeUp />}
            aria-label={`Play pronunciation of ${wordOfTheDay.swedish}`}
          >
            Listen
          </Button>
        </Surface>
      )}

      {/* Progress Summary */}
      <Surface
        elevation="medium"
        bordered
        padding="lg"
        className="mx-auto my-8 max-w-2xl"
        style={{ borderColor: isDarkMode ? 'var(--fd-border-default)' : 'rgba(147,191,190,0.28)' }}
      >
        <Text as="h3" variant="section" serif weight="medium" className="mb-4" style={{ color: 'var(--fd-accent-strong)' }}>
          Your Progress
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Surface tone="success" bordered padding="md" className="text-center" style={{ borderRadius: '16px' }}>
            <Text as="div" variant="title" weight="medium" className="mb-2" style={{ color: 'var(--fd-color-success)' }}>
              {numWords}
            </Text>
            <Text as="div" variant="caption" color="secondary">
              Words Learned
            </Text>
          </Surface>
          <Surface tone="warning" bordered padding="md" className="text-center" style={{ borderRadius: '16px' }}>
            <Text as="div" variant="title" weight="medium" className="mb-2" style={{ color: 'var(--fd-color-warning)' }}>
              {progress.gamesPlayed}
            </Text>
            <Text as="div" variant="caption" color="secondary">
              Games Played
            </Text>
          </Surface>
          <Surface bordered padding="md" className="text-center" style={{ borderRadius: '16px', background: isDarkMode ? 'rgba(255,255,255,0.03)' : '#fff7ed', borderColor: '#fed7aa' }}>
            <Text as="div" variant="title" weight="medium" className="mb-2" style={{ color: '#c2410c' }}>
              {progress.streak}
            </Text>
            <Text as="div" variant="caption" color="secondary">
              Day Streak
            </Text>
          </Surface>
        </div>
      </Surface>

      {/* Reset Progress and Erase Buttons */}
      <div className="text-center my-8">
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            onClick={onResetProgress}
            variant="secondary"
            leftIcon={<FaUndo />}
          >
            Reset Progress
          </Button>
          
          <Button
            onClick={() => {
              if (window.confirm('Are you sure you want to erase everything? This will completely reset the app as if you\'re using it for the first time.')) {
                // Clear all localStorage
                localStorage.clear();
                // Reload the page to start fresh
                window.location.reload();
              }
            }}
            variant="destructive"
            leftIcon={<FaTrash />}
          >
            Erase All
          </Button>
        </div>
      </div>

    </div>
  );
});

export default Home; 
