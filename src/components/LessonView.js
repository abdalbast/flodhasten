import React, { useState, useCallback, useEffect } from 'react';
import { MdVolumeUp, MdClose, MdCheck, MdError } from 'react-icons/md';
import './LessonView.css';
import ttsApi from '../utils/ttsApi';
import { getIconPath, getIconSrc } from '../data/iconRegistry';

const LessonView = ({ lesson, onComplete, onExit, isDarkMode }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]); // State for shuffled options
  const [showGameOver, setShowGameOver] = useState(false); // Game over modal state


  // Get current exercise safely - handle null/undefined cases
  const currentExercise = lesson?.exercises?.[currentExerciseIndex] || null;

  // Demo icon source (coffee)
  const demoCoffeeSrc = (() => {
    const setName = lesson?.iconSet || 'sketch';
    const id = 'coffee';
    try {
      return setName === 'phosphor' ? getIconSrc(setName, id) : getIconPath(setName, id);
    } catch (e) {
      return getIconSrc('duotone', id);
    }
  })();

  // Play pronunciation
  const playPronunciation = async (word) => {
    try {
      if (!word || typeof word !== 'string') {
        console.warn('Invalid word for pronunciation:', word);
        return;
      }
      await ttsApi.playSwedish(word);
    } catch (error) {
      console.error('Failed to play pronunciation:', error);
      // Fallback: try browser TTS
      try {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'sv-SE';
        speechSynthesis.speak(utterance);
      } catch (fallbackError) {
        console.error('Fallback TTS also failed:', fallbackError);
      }
    }
  };

  // Initialize matching game and shuffle options
  useEffect(() => {
    try {
      if (!currentExercise) {
        console.warn('No current exercise available');
        return;
      }

      if (currentExercise.type === 'match' && currentExercise.pairs) {
        const shuffledPairs = [...currentExercise.pairs].sort(() => Math.random() - 0.5);
        setMatchedPairs(shuffledPairs.map((pair, index) => ({
          ...pair,
          id: index,
          matched: false
        })));
      }
      
      // Generate shuffled options for image choice exercises
      if (currentExercise.type === 'image_choice') {
        // Get the lesson to access allOptions
        if (lesson?.allOptions && currentExercise.getOptions) {
          try {
            // Generate new shuffled options using the getOptions function
            const newShuffledOptions = currentExercise.getOptions(lesson.allOptions);
            // Store shuffled options in state to keep them stable during the exercise
            setShuffledOptions(newShuffledOptions);
          } catch (error) {
            console.error('Error generating shuffled options:', error);
            // Fallback to default options if available
            if (currentExercise.options) {
              setShuffledOptions([...currentExercise.options].sort(() => Math.random() - 0.5));
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in lesson initialization:', error);
    }
  }, [currentExercise, lesson]);

  // Keyboard shortcuts moved below action handlers to avoid TDZ issues

  const handleAnswerSubmit = useCallback(() => {
    try {
      if (!userAnswer.trim() && !selectedOption) return;

      let answer, correct;
      
      if (currentExercise?.type === 'image_choice') {
        answer = selectedOption;
        correct = answer === currentExercise.answer;
      } else {
        answer = selectedOption || userAnswer.toLowerCase().trim();
        correct = answer === currentExercise?.answer?.toLowerCase();
      }

      setIsCorrect(correct);
      setShowFeedback(true);

      if (correct) {
        setScore(prev => prev + 1);
        
        // Proceed to next exercise after correct answer
        setTimeout(() => {
          setShowFeedback(false);
          setIsCorrect(null);
          setUserAnswer('');
          setSelectedOption(null);
          setShowHint(false);
          
          if (currentExerciseIndex < (lesson?.exercises?.length || 0) - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
          } else {
            // Lesson complete
            onComplete(score + 1, lesson?.exercises?.length || 1, lives);
          }
        }, 900); // micro-delay for readability
      } else {
        const newLives = lives - 1;
        setLives(newLives);
        
        // Check for game over
        if (newLives <= 0) {
          setTimeout(() => {
            // Show game over modal with animation
            setShowGameOver(true);
          }, 2000); // Show the incorrect animation before game over
          return;
        }
        
        // For incorrect answers, just show feedback and let user click "TRY AGAIN!"
        // Don't automatically reset - user must click the button
      }
    } catch (error) {
      console.error('Error in handleAnswerSubmit:', error);
      // Fallback: just close the lesson
      onComplete(0, 1, 0);
    }
  }, [userAnswer, selectedOption, currentExercise, currentExerciseIndex, lesson, score, lives, onComplete]);

  // Handle "TRY AGAIN!" button click
  const handleTryAgain = useCallback(() => {
    setShowFeedback(false);
    setIsCorrect(null);
    setUserAnswer('');
    setSelectedOption(null);
    setShowHint(false);
  }, []);

  const handleOptionSelect = useCallback((option) => {
    setSelectedOption(option);
  }, []);

  const handleMatchSelect = useCallback((pair) => {
    setMatchedPairs(prev => prev.map(p => 
      p.id === pair.id ? { ...p, matched: !p.matched } : p
    ));
  }, []);

  // Keyboard shortcuts: 1-4 to select options, Enter to submit/continue, Esc to exit
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!currentExercise || showGameOver) return;

      const getOptions = () => {
        if (currentExercise.type === 'image_choice') {
          if (shuffledOptions && shuffledOptions.length) return shuffledOptions;
          if (currentExercise.options) return currentExercise.options;
          if (lesson?.allOptions && currentExercise.getOptions) {
            try { return currentExercise.getOptions(lesson.allOptions); } catch { return []; }
          }
        }
        return [];
      };

      if (currentExercise.type === 'image_choice') {
        const opts = getOptions();
        const idx = ['1','2','3','4'].indexOf(e.key);
        if (idx !== -1 && opts[idx]) {
          e.preventDefault();
          setSelectedOption(opts[idx].id);
          return;
        }
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (showFeedback && !isCorrect) {
          handleTryAgain();
        } else {
          handleAnswerSubmit();
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentExercise, shuffledOptions, showFeedback, isCorrect, lesson, onExit, showGameOver, handleAnswerSubmit, handleTryAgain]);

  // Safety check for lesson and exercises - AFTER all hooks
  if (!lesson || !lesson.exercises || !Array.isArray(lesson.exercises)) {
    return (
      <div className="lesson-view bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="lesson-header flex items-center justify-between p-4 bg-red-600 dark:bg-red-800 shadow-md">
          <button 
            className="exit-button text-white p-2 hover:bg-red-700 dark:hover:bg-red-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-full" 
            onClick={onExit}
            aria-label="Exit lesson"
          >
            <MdClose className="text-xl" />
          </button>
          <div className="lesson-info flex-grow mx-4">
            <h2 className="font-bold text-[1.4rem] text-white flex items-center">
              <MdError className="mr-2 text-yellow-300" /> Error
            </h2>
            <p className="text-[0.85rem] text-white/80">Invalid lesson data</p>
          </div>
        </div>
        <div className="p-8 text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-4">We couldn't load this lesson. Please try again later.</p>
          <button 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onExit}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Safety check for current exercise - AFTER all hooks
  if (!currentExercise) {
    return (
      <div className="lesson-view bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="lesson-header flex items-center justify-between p-4 bg-red-600 dark:bg-red-800 shadow-md">
          <button 
            className="exit-button text-white p-2 hover:bg-red-700 dark:hover:bg-red-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-full" 
            onClick={onExit}
            aria-label="Exit lesson"
          >
            <MdClose className="text-xl" />
          </button>
          <div className="lesson-info flex-grow mx-4">
            <h2 className="font-bold text-[1.4rem] text-white flex items-center">
              <MdError className="mr-2 text-yellow-300" /> Error
            </h2>
            <p className="text-[0.85rem] text-white/80">Exercise not found</p>
          </div>
        </div>
        <div className="p-8 text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-4">We couldn't load this exercise. Please try again later.</p>
          <button 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onExit}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Remove duplicate functions

  const renderExercise = () => {
    if (!currentExercise) {
      return (
        <div className="exercise-container bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">Exercise not found</h3>
          <p className="text-gray-600 dark:text-gray-400">There was a problem loading this exercise.</p>
        </div>
      );
    }

    switch (currentExercise.type) {
      case 'image_choice':
        return (
          <div className="exercise-container bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {/* NEW WORD indicator */}
            <div className="new-word-indicator inline-flex items-center px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-4" role="status" aria-label="New word introduced">
              {/* Tailwind-only inline tone (no layout change) */}
              <span className="dot w-2 h-2 rounded-full bg-purple-500 mr-1.5" aria-hidden="true"></span>
              <span className="label text-xs font-medium text-purple-700 dark:text-purple-300">New word</span>
            </div>
            
            {/* Instruction */}
            <h3 className="instruction text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">{currentExercise.instruction}</h3>
            
            {/* Swedish word with pronunciation */}
            <div className="word-section flex items-center justify-center mb-6">
              <button 
                className="pronunciation-button flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full mr-3 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                onClick={() => playPronunciation(currentExercise.swedishWord)}
                aria-label={`Play pronunciation of ${currentExercise.swedishWord}`}
              >
                {/* speaker icon from registry with fallback */}
                {(() => {
                  // Force reliable inline icon independent of set
                  const src = getIconSrc('duotone', 'speaker');
                  return <img src={src} alt="speaker" className="speaker-icon w-5 h-5" />;
                })()}
              </button>
              <div className="word-container relative">
                <h2 
                  className="swedish-word interactive text-2xl font-semibold text-gray-900 dark:text-white underline decoration-[#C48BFF] underline-offset-4 cursor-help"
                  onMouseEnter={() => setShowHint(true)}
                  onMouseLeave={() => setShowHint(false)}
                  onClick={() => setShowHint((v)=>!v)}
                >
                  {currentExercise.swedishWord}
                </h2>
                {showHint && (
                  <div className="english-hint absolute top-full left-0 mt-1 px-3 py-1.5 bg-gray-800 dark:bg-gray-700 text-white rounded-md text-sm shadow-lg z-10">
                    {currentExercise.englishHint}
                  </div>
                )}
              </div>
            </div>
            
            {/* Image options grid */}
            <div className="image-options-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {(shuffledOptions.length ? shuffledOptions : (currentExercise.options || (lesson?.allOptions && currentExercise.getOptions ? currentExercise.getOptions(lesson.allOptions) : []))).map((option, index) => (
                <button
                  key={index}
                  className={`image-option relative overflow-hidden flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] 
                    ${selectedOption === option.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'} 
                    ${showFeedback && isCorrect && selectedOption === option.id ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''} 
                    ${showFeedback && !isCorrect && selectedOption === option.id ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''} 
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8D94E] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800`}
                  onMouseDown={(e) => e.currentTarget && e.currentTarget.classList.add('pressing')}
                  onMouseUp={(e) => e.currentTarget && e.currentTarget.classList.remove('pressing')}
                  onMouseLeave={(e) => e.currentTarget && e.currentTarget.classList.remove('pressing')}
                  onTouchStart={(e) => e.currentTarget && e.currentTarget.classList.add('pressing')}
                  onTouchEnd={(e) => e.currentTarget && e.currentTarget.classList.remove('pressing')}
                  onClick={(e) => {
                    const el = e.currentTarget; // capture before async
                    if (!el) return;
                    const rect = el.getBoundingClientRect();
                    const x = (e.clientX || 0) - rect.left;
                    const y = (e.clientY || 0) - rect.top;
                    el.style.setProperty('--ripple-x', `${x}px`);
                    el.style.setProperty('--ripple-y', `${y}px`);
                    el.classList.add('rippling');
                    setTimeout(() => {
                      if (el && el.classList) el.classList.remove('rippling');
                    }, 450);
                    handleOptionSelect(option.id);
                  }}
                >
                  <div className="image-container h-16 w-16 flex items-center justify-center mb-2">
                    {/* Use icon registry when option.image is not provided */}
                    {(() => {
                      const hasImage = option.image && typeof option.image === 'string';
                      const iconId = option.id;
                      let src = option.image;
                      if (!hasImage) {
                        const setName = lesson?.iconSet || 'duotone';
                        if (setName === 'phosphor') {
                          src = getIconSrc(setName, iconId);
                        } else {
                          src = getIconPath(setName, iconId);
                        }
                      }
                      return (
                        <img 
                          src={src} 
                          alt={option.label} 
                          className="option-svg max-h-full max-w-full object-contain" 
                          referrerPolicy="no-referrer" 
                          loading="eager" 
                          onError={(e)=>{ e.currentTarget.src = getIconSrc('duotone', iconId); }} 
                        />
                      );
                    })()}
                  </div>
                  <div className="option-label text-sm font-medium text-gray-800 dark:text-gray-200">{option.label || 'Unknown'}</div>
                </button>
              ))}
            </div>
            
            <div className="continue-footer fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-center">
              <button 
                className={`continue-button relative overflow-hidden px-8 py-3 rounded-full font-bold text-white transition-all duration-200 shadow-md
                  ${!selectedOption && !showFeedback ? 'bg-gray-400 cursor-not-allowed opacity-70' : ''}
                  ${selectedOption && !showFeedback ? 'bg-blue-600 hover:bg-blue-700 enabled:hover:shadow-lg' : ''}
                  ${isCorrect ? 'bg-green-600 hover:bg-green-700' : ''} 
                  ${showFeedback && !isCorrect ? 'bg-red-600 hover:bg-red-700' : ''} 
                  ${showFeedback ? 'feedback-active' : ''} 
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800`}
                onClick={showFeedback && !isCorrect ? handleTryAgain : handleAnswerSubmit}
                disabled={!selectedOption && !showFeedback}
              >
                {showFeedback && isCorrect ? (
                  <span className="flex items-center">
                    <MdCheck className="button-icon mr-2 text-xl" />
                    CORRECT!
                  </span>
                ) : showFeedback && !isCorrect ? (
                  <span className="flex items-center">
                    <MdError className="button-icon mr-2 text-xl" />
                    TRY AGAIN!
                  </span>
                ) : (
                  'CONTINUE'
                )}
              </button>
            </div>
          </div>
        );

      case 'translate':
        return (
          <div className="exercise-container bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">{currentExercise.instruction}</h3>
            <div className="question mb-6">
              <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">{currentExercise.question}</h2>
            </div>
            
            {currentExercise.options ? (
              <div className="options-grid grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {currentExercise.options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-button py-3 px-4 rounded-lg border-2 transition-all duration-200 font-medium text-left
                      ${selectedOption === option 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                        : 'border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="answer-input mb-6">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="answer-field w-full py-3 px-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
                />
              </div>
            )}
            
            <div className="flex justify-center">
              <button 
                className={`submit-button py-3 px-8 rounded-full font-bold text-white transition-all duration-200 shadow-md
                  ${!userAnswer.trim() && !selectedOption 
                    ? 'bg-gray-400 cursor-not-allowed opacity-70' 
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
                onClick={handleAnswerSubmit}
                disabled={!userAnswer.trim() && !selectedOption}
              >
                Check
              </button>
            </div>
          </div>
        );

      case 'match':
        return (
          <div className="exercise-container bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">{currentExercise.instruction}</h3>
            <div className="matching-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {matchedPairs.map((pair) => (
                <div key={pair.id} className="match-pair">
                  <button
                    className={`match-button w-full p-4 rounded-lg border-2 transition-all duration-200 flex justify-between items-center
                      ${pair.matched 
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
                    onClick={() => handleMatchSelect(pair)}
                  >
                    <span className="swedish font-medium text-gray-900 dark:text-white">{pair.swedish}</span>
                    <span className="english text-gray-600 dark:text-gray-300">{pair.english}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="exercise-container bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <div className="text-yellow-500 text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Exercise type not supported</h3>
              <p className="text-gray-600 dark:text-gray-400">This exercise type is not available yet.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`lesson-view ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="lesson-header flex items-center justify-between p-4 bg-blue-600 dark:bg-blue-800 shadow-md">
        <button className="exit-button text-white p-2 hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-full" onClick={onExit} aria-label="Exit lesson">
          <MdClose className="text-xl" />
        </button>
        <div className="lesson-info flex-grow mx-4">
          <h2 className="font-bold text-[1.4rem] text-white">{lesson.name}</h2>
          <p className="text-[0.85rem] text-white/70">{lesson.description}</p>
        </div>
        <div className="lesson-progress w-1/3">
          <div className="progress-bar h-2 bg-blue-300/30 rounded-full overflow-hidden">
            <div 
              className="progress-fill h-full bg-yellow-400 transition-all duration-300 ease-out"
              style={{ width: `${((currentExerciseIndex + 1) / lesson.exercises.length) * 100}%` }}
            />
          </div>
          <span className="text-sm text-white/80 mt-1 block text-right">{currentExerciseIndex + 1} / {lesson.exercises.length}</span>
        </div>
      </div>

      <div className="lesson-stats flex justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 shadow-sm">
        <div className="stat flex items-center">
          <span className="stat-label text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Lives:</span>
          <span className="stat-value flex">
            {[...Array(3)].map((_, i) => (
              <span key={i} className={`heart ${i < lives ? 'active' : 'lost'} transition-all duration-300 ${i < lives ? 'scale-100' : 'scale-75 opacity-40'} mx-0.5`}>❤️</span>
            ))}
          </span>
        </div>
        <div className="stat flex items-center">
          <span className="stat-label text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Score:</span>
          <span className="stat-value text-lg font-bold text-blue-600 dark:text-blue-400">{score}</span>
        </div>
      </div>

      <div className="lesson-content flex-1 p-4 overflow-y-auto pb-24">
        {renderExercise()}
      </div>

      {/* Game Over Modal */}
      {showGameOver && (
        <div className="game-over-overlay fixed inset-0 flex items-center justify-center bg-black/70 z-50 backdrop-blur-sm">
          <div className="game-over-modal bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-11/12 mx-auto transform transition-all duration-300 scale-100 animate-fadeIn">
            <div className="game-over-icon text-5xl text-center mb-4 animate-pulse">💔</div>
            <h2 className="game-over-title text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">Out of Hearts!</h2>
            <p className="game-over-message text-center text-gray-600 dark:text-gray-300 mb-6">
              You've run out of hearts for today. Come back later when they refill to continue learning!
            </p>
            <button 
              className="game-over-button w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              onClick={() => {
                setShowGameOver(false);
                onExit();
              }}
            >
              Return Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonView;