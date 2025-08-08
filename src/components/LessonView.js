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
      <div className="lesson-view">
        <div className="lesson-header">
          <button className="exit-button" onClick={onExit}>
            <MdClose />
          </button>
          <div className="lesson-info">
            <h2>Error</h2>
            <p>Invalid lesson data</p>
          </div>
        </div>
      </div>
    );
  }

  // Safety check for current exercise - AFTER all hooks
  if (!currentExercise) {
    return (
      <div className="lesson-view">
        <div className="lesson-header">
          <button className="exit-button" onClick={onExit}>
            <MdClose />
          </button>
          <div className="lesson-info">
            <h2>Error</h2>
            <p>Exercise not found</p>
          </div>
        </div>
      </div>
    );
  }

  // Remove duplicate functions

  const renderExercise = () => {
    if (!currentExercise) {
      return (
        <div className="exercise-container">
          <h3>Exercise not found</h3>
        </div>
      );
    }

    switch (currentExercise.type) {
      case 'image_choice':
        return (
          <div className="exercise-container">
            {/* NEW WORD indicator */}
            <div className="new-word-indicator" role="status" aria-label="New word introduced">
              {/* Tailwind-only inline tone (no layout change) */}
              <span className="dot" aria-hidden="true"></span>
              <span className="label">New word</span>
            </div>
            
            {/* Instruction */}
            <h3 className="instruction font-semibold text-white/90">{currentExercise.instruction}</h3>
            
            {/* Swedish word with pronunciation */}
            <div className="word-section">
              <button 
                className="pronunciation-button"
                onClick={() => playPronunciation(currentExercise.swedishWord)}
                aria-label={`Play pronunciation of ${currentExercise.swedishWord}`}
              >
                {/* speaker icon from registry with fallback */}
                {(() => {
                  // Force reliable inline icon independent of set
                  const src = getIconSrc('duotone', 'speaker');
                  return <img src={src} alt="speaker" className="speaker-icon" />;
                })()}
              </button>
              <div className="word-container">
                <h2 
                  className="swedish-word interactive underline decoration-[#C48BFF] underline-offset-4 font-semibold"
                  onMouseEnter={() => setShowHint(true)}
                  onMouseLeave={() => setShowHint(false)}
                  onClick={() => setShowHint((v)=>!v)}
                >
                  {currentExercise.swedishWord}
                </h2>
                {showHint && (
                  <div className="english-hint text-white/85">
                    {currentExercise.englishHint}
                  </div>
                )}
              </div>
            </div>
            
            {/* Image options grid */}
            <div className="image-options-grid">
              {(shuffledOptions.length ? shuffledOptions : (currentExercise.options || (lesson?.allOptions && currentExercise.getOptions ? currentExercise.getOptions(lesson.allOptions) : []))).map((option, index) => (
                <button
                  key={index}
                  className={`image-option ${selectedOption === option.id ? 'selected' : ''} ${showFeedback && isCorrect && selectedOption === option.id ? 'correct-answer' : ''} ${showFeedback && !isCorrect && selectedOption === option.id ? 'incorrect-answer' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8D94E] rounded-lg`}
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
                  <div className="image-container">
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
                        <img src={src} alt={option.label} className="option-svg" referrerPolicy="no-referrer" loading="eager" onError={(e)=>{ e.currentTarget.src = getIconSrc('duotone', iconId); }} />
                      );
                    })()}
                  </div>
                  <div className="option-label">{option.label || 'Unknown'}</div>
                </button>
              ))}
            </div>
            
            <div className="continue-footer">
              <button 
                className={`continue-button ${selectedOption ? 'enabled' : ''} ${isCorrect ? 'correct' : ''} ${showFeedback && !isCorrect ? 'incorrect' : ''} ${showFeedback ? 'feedback-active' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-pill`}
                onClick={showFeedback && !isCorrect ? handleTryAgain : handleAnswerSubmit}
                disabled={!selectedOption && !showFeedback}
              >
                {showFeedback && isCorrect ? (
                  <>
                    <MdCheck className="button-icon" />
                    CORRECT!
                  </>
                ) : showFeedback && !isCorrect ? (
                  <>
                    <MdError className="button-icon" />
                    TRY AGAIN!
                  </>
                ) : (
                  'CONTINUE'
                )}
              </button>
            </div>
          </div>
        );

      case 'translate':
        return (
          <div className="exercise-container">
            <h3>{currentExercise.instruction}</h3>
            <div className="question">
              <h2>{currentExercise.question}</h2>
            </div>
            
            {currentExercise.options ? (
              <div className="options-grid">
                {currentExercise.options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-button ${selectedOption === option ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="answer-input">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="answer-field"
                />
              </div>
            )}
            
            <button 
              className="submit-button"
              onClick={handleAnswerSubmit}
              disabled={!userAnswer.trim() && !selectedOption}
            >
              Check
            </button>
          </div>
        );

      case 'match':
        return (
          <div className="exercise-container">
            <h3>{currentExercise.instruction}</h3>
            <div className="matching-grid">
              {matchedPairs.map((pair) => (
                <div key={pair.id} className="match-pair">
                  <button
                    className={`match-button ${pair.matched ? 'matched' : ''}`}
                    onClick={() => handleMatchSelect(pair)}
                  >
                    <span className="swedish">{pair.swedish}</span>
                    <span className="english">{pair.english}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Exercise type not supported</div>;
    }
  };

  return (
    <div className={`lesson-view ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="lesson-header">
        <button className="exit-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-full" onClick={onExit}>
          <MdClose />
        </button>
        <div className="lesson-info">
          <h2 className="font-bold text-[1.4rem] text-white">{lesson.name}</h2>
          <p className="text-[0.85rem] text-white/70">{lesson.description}</p>
        </div>
        <div className="lesson-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentExerciseIndex + 1) / lesson.exercises.length) * 100}%` }}
            />
          </div>
          <span>{currentExerciseIndex + 1} / {lesson.exercises.length}</span>
        </div>
      </div>

      <div className="lesson-stats">
        <div className="stat">
          <span className="stat-label">Lives:</span>
          <span className="stat-value">
            {[...Array(3)].map((_, i) => (
              <span key={i} className={`heart ${i < lives ? 'active' : 'lost'}`}>❤️</span>
            ))}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Score:</span>
          <span className="stat-value">{score}</span>
        </div>
      </div>

      <div className="lesson-content">
        {renderExercise()}
      </div>

      {/* Game Over Modal */}
      {showGameOver && (
        <div className="game-over-overlay">
          <div className="game-over-modal">
            <div className="game-over-icon">💔</div>
            <h2 className="game-over-title">Out of Hearts!</h2>
            <p className="game-over-message">
              You've run out of hearts for today. Come back later when they refill to continue learning!
            </p>
            <button 
              className="game-over-button"
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