import React, { useState, useCallback, useEffect } from 'react';
import { MdVolumeUp, MdClose, MdCheck, MdError, MdLightbulb, MdTimer, MdStar } from 'react-icons/md';
import './LessonView.css';
import ttsApi from '../utils/ttsApi';

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
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [showGameOver, setShowGameOver] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30); // Timer for timed exercises
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [streak, setStreak] = useState(0); // Track correct answer streak
  const [showStreak, setShowStreak] = useState(false);
  const [exerciseStartTime, setExerciseStartTime] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState([]); // For spelling exercises
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Get current exercise safely
  const currentExercise = lesson?.exercises?.[currentExerciseIndex];

  // Timer effect for timed exercises
  useEffect(() => {
    let timer;
    if (isTimerActive && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isTimerActive) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeRemaining, isTimerActive]);

  // Start timer for timed exercises
  useEffect(() => {
    if (currentExercise?.timed) {
      setTimeRemaining(currentExercise.timeLimit || 30);
      setIsTimerActive(true);
      setExerciseStartTime(Date.now());
    } else {
      setIsTimerActive(false);
      setTimeRemaining(30);
    }
  }, [currentExercise]);

  // Play pronunciation with enhanced feedback
  const playPronunciation = async (word) => {
    try {
      if (!word || typeof word !== 'string') {
        console.warn('Invalid word for pronunciation:', word);
        return;
      }
      
      setAudioPlaying(true);
      await ttsApi.playSwedish(word);
      setAudioPlaying(false);
    } catch (error) {
      console.error('Failed to play pronunciation:', error);
      setAudioPlaying(false);
      // Fallback: try browser TTS
      try {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'sv-SE';
        utterance.onend = () => setAudioPlaying(false);
        utterance.onerror = () => setAudioPlaying(false);
        speechSynthesis.speak(utterance);
      } catch (fallbackError) {
        console.error('Fallback TTS also failed:', fallbackError);
        setAudioPlaying(false);
      }
    }
  };

  // Handle time up for timed exercises
  const handleTimeUp = () => {
    setIsTimerActive(false);
    setLives(prev => prev - 1);
    setIsCorrect(false);
    setShowFeedback(true);
    setStreak(0);
    
    if (lives <= 1) {
      setTimeout(() => setShowGameOver(true), 1500);
    }
  };

  // Initialize exercises with enhanced setup
  useEffect(() => {
    try {
      if (currentExercise?.type === 'match' && currentExercise.pairs) {
        const shuffledPairs = [...currentExercise.pairs].sort(() => Math.random() - 0.5);
        setMatchedPairs(shuffledPairs.map((pair, index) => ({
          ...pair,
          id: index,
          matched: false
        })));
      }
      
      // Generate shuffled options for image choice exercises
      if (currentExercise?.type === 'image_choice') {
        if (lesson?.allOptions && currentExercise.getOptions) {
          try {
            const shuffledOptions = currentExercise.getOptions(lesson.allOptions);
            currentExercise.shuffledOptions = shuffledOptions;
          } catch (error) {
            console.error('Error generating shuffled options:', error);
            if (currentExercise.options) {
              currentExercise.shuffledOptions = [...currentExercise.options].sort(() => Math.random() - 0.5);
            }
          }
        }
      }

      // Initialize spelling exercise
      if (currentExercise?.type === 'spelling') {
        setSelectedLetters([]);
        setUserAnswer('');
      }

      // Reset states for new exercise
      setSelectedOption(null);
      setUserAnswer('');
      setIsCorrect(null);
      setShowFeedback(false);
      setShowHint(false);
      setShowExplanation(false);
    } catch (error) {
      console.error('Error in lesson initialization:', error);
    }
  }, [currentExercise, lesson]);

  const handleAnswerSubmit = useCallback(() => {
    try {
      if (!userAnswer.trim() && !selectedOption) return;

      let answer, correct;
      
      if (currentExercise?.type === 'image_choice') {
        answer = selectedOption;
        correct = answer === currentExercise.answer;
      } else if (currentExercise?.type === 'spelling') {
        answer = userAnswer.toLowerCase().trim();
        correct = answer === currentExercise?.answer?.toLowerCase();
      } else {
        answer = selectedOption || userAnswer.toLowerCase().trim();
        correct = answer === currentExercise?.answer?.toLowerCase();
      }

      setIsCorrect(correct);
      setShowFeedback(true);
      setIsTimerActive(false);

      if (correct) {
        setScore(prev => prev + 1);
        setStreak(prev => prev + 1);
        setShowStreak(true);
        
        // Calculate bonus points for speed and streak
        const timeBonus = currentExercise?.timed && exerciseStartTime ? 
          Math.max(0, Math.floor((30 - (Date.now() - exerciseStartTime) / 1000) / 5)) : 0;
        const streakBonus = Math.floor(streak / 3) * 2;
        
        if (timeBonus > 0 || streakBonus > 0) {
          setScore(prev => prev + timeBonus + streakBonus);
        }
        
        // Proceed to next exercise after correct answer
        setTimeout(() => {
          setShowFeedback(false);
          setShowStreak(false);
          setShowExplanation(false);
          if (currentExerciseIndex < lesson.exercises.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
          } else {
            onComplete(score, streak);
          }
        }, 2000);
      } else {
        setLives(prev => prev - 1);
        setStreak(0);
        setShowExplanation(true);
        
        if (lives <= 1) {
          setTimeout(() => setShowGameOver(true), 1500);
        }
      }
    } catch (error) {
      console.error('Error handling answer submission:', error);
    }
  }, [userAnswer, selectedOption, currentExercise, currentExerciseIndex, lesson.exercises.length, onComplete, score, streak, lives, exerciseStartTime]);

  const handleOptionSelect = useCallback((option) => {
    setSelectedOption(option);
  }, []);

  const handleMatchSelect = useCallback((pair) => {
    setMatchedPairs(prev => prev.map(p => 
      p.id === pair.id ? { ...p, matched: !p.matched } : p
    ));
  }, []);

  const handleLetterSelect = useCallback((letter) => {
    setSelectedLetters(prev => [...prev, letter]);
    setUserAnswer(prev => prev + letter);
  }, []);

  const handleSpellingBackspace = useCallback(() => {
    setSelectedLetters(prev => prev.slice(0, -1));
    setUserAnswer(prev => prev.slice(0, -1));
  }, []);

  const handleTryAgain = useCallback(() => {
    setShowFeedback(false);
    setShowExplanation(false);
    setSelectedOption(null);
    setUserAnswer('');
    setIsCorrect(null);
    if (currentExercise?.timed) {
      setTimeRemaining(currentExercise.timeLimit || 30);
      setIsTimerActive(true);
      setExerciseStartTime(Date.now());
    }
  }, [currentExercise]);

  // Safety checks
  if (!lesson || !lesson.exercises || lesson.exercises.length === 0) {
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
            <div className="new-word-indicator">
              <span>🟣</span>
              <span>NEW WORD</span>
            </div>
            
            {/* Timer for timed exercises */}
            {currentExercise.timed && (
              <div className="timer-container">
                <MdTimer className="timer-icon" />
                <span className="timer-text">{timeRemaining}s</span>
              </div>
            )}
            
            {/* Instruction */}
            <h3 className="instruction">{currentExercise.instruction}</h3>
            
            {/* Swedish word with pronunciation */}
            <div className="word-section">
              <button 
                className={`pronunciation-button ${audioPlaying ? 'playing' : ''}`}
                onClick={() => playPronunciation(currentExercise.swedishWord)}
                onMouseEnter={() => setShowHint(true)}
                onMouseLeave={() => setShowHint(false)}
                onTouchStart={() => setShowHint(true)}
                onTouchEnd={() => setShowHint(false)}
                disabled={audioPlaying}
              >
                <MdVolumeUp />
              </button>
              <div className="word-container">
                <h2 className="swedish-word">{currentExercise.swedishWord}</h2>
                {showHint && (
                  <div className="english-hint">
                    {currentExercise.englishHint}
                  </div>
                )}
              </div>
            </div>
            
            {/* Image options grid */}
            <div className="image-options-grid">
              {(shuffledOptions.length > 0 ? shuffledOptions : (currentExercise.options || currentExercise.allOptions || [])).map((option, index) => (
                <button
                  key={index}
                  className={`image-option ${selectedOption === option.id ? 'selected' : ''} ${showFeedback && isCorrect && selectedOption === option.id ? 'correct-answer' : ''} ${showFeedback && !isCorrect && selectedOption === option.id ? 'incorrect-answer' : ''}`}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={showFeedback}
                >
                  <div className="image-container">
                    <span 
                      className="option-image" 
                      style={{ color: option.iconColor || '#FFFFFF' }}
                    >
                      {option.image || '❓'}
                    </span>
                  </div>
                  <div className="option-label">{option.label || 'Unknown'}</div>
                </button>
              ))}
            </div>
            
            {/* Feedback and explanation */}
            {showFeedback && (
              <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="feedback-icon">
                  {isCorrect ? <MdCheck /> : <MdError />}
                </div>
                <div className="feedback-text">
                  {isCorrect ? 'Excellent!' : 'Not quite right'}
                </div>
                {!isCorrect && showExplanation && currentExercise.explanation && (
                  <div className="explanation">
                    <MdLightbulb className="explanation-icon" />
                    <p>{currentExercise.explanation}</p>
                  </div>
                )}
              </div>
            )}
            
            <button 
              className={`continue-button ${selectedOption ? 'enabled' : ''} ${isCorrect ? 'correct' : ''} ${showFeedback && !isCorrect ? 'incorrect' : ''} ${showFeedback ? 'feedback-active' : ''}`}
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
        );

      case 'translate':
        return (
          <div className="exercise-container">
            {/* Timer for timed exercises */}
            {currentExercise.timed && (
              <div className="timer-container">
                <MdTimer className="timer-icon" />
                <span className="timer-text">{timeRemaining}s</span>
              </div>
            )}
            
            <h3 className="instruction">{currentExercise.instruction}</h3>
            <div className="question">
              <h2>{currentExercise.question}</h2>
            </div>
            
            {currentExercise.options ? (
              <div className="options-grid">
                {currentExercise.options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-button ${selectedOption === option ? 'selected' : ''} ${showFeedback && isCorrect && selectedOption === option ? 'correct-answer' : ''} ${showFeedback && !isCorrect && selectedOption === option ? 'incorrect-answer' : ''}`}
                    onClick={() => handleOptionSelect(option)}
                    disabled={showFeedback}
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
                  disabled={showFeedback}
                />
              </div>
            )}
            
            {/* Feedback and explanation */}
            {showFeedback && (
              <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="feedback-icon">
                  {isCorrect ? <MdCheck /> : <MdError />}
                </div>
                <div className="feedback-text">
                  {isCorrect ? 'Perfect!' : 'Try again'}
                </div>
                {!isCorrect && showExplanation && currentExercise.explanation && (
                  <div className="explanation">
                    <MdLightbulb className="explanation-icon" />
                    <p>{currentExercise.explanation}</p>
                  </div>
                )}
              </div>
            )}
            
            <button 
              className={`submit-button ${isCorrect ? 'correct' : ''} ${showFeedback && !isCorrect ? 'incorrect' : ''}`}
              onClick={showFeedback && !isCorrect ? handleTryAgain : handleAnswerSubmit}
              disabled={(!userAnswer.trim() && !selectedOption) || showFeedback}
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
                'Check'
              )}
            </button>
          </div>
        );

      case 'spelling':
        return (
          <div className="exercise-container">
            {/* Timer for timed exercises */}
            {currentExercise.timed && (
              <div className="timer-container">
                <MdTimer className="timer-icon" />
                <span className="timer-text">{timeRemaining}s</span>
              </div>
            )}
            
            <h3 className="instruction">{currentExercise.instruction}</h3>
            
            {/* Audio pronunciation */}
            <div className="word-section">
              <button 
                className={`pronunciation-button ${audioPlaying ? 'playing' : ''}`}
                onClick={() => playPronunciation(currentExercise.audioWord || currentExercise.swedishWord)}
                disabled={audioPlaying}
              >
                <MdVolumeUp />
              </button>
              <div className="word-container">
                <h2 className="swedish-word">Listen and spell</h2>
                {showHint && (
                  <div className="english-hint">
                    {currentExercise.englishHint}
                  </div>
                )}
              </div>
            </div>
            
            {/* Spelling input */}
            <div className="spelling-input">
              <div className="spelling-display">
                {userAnswer.split('').map((letter, index) => (
                  <span key={index} className="spelling-letter">
                    {letter}
                  </span>
                ))}
                {[...Array(Math.max(0, (currentExercise.answer?.length || 0) - userAnswer.length))].map((_, index) => (
                  <span key={`empty-${index}`} className="spelling-letter empty">
                    _
                  </span>
                ))}
              </div>
            </div>
            
            {/* Letter selection */}
            <div className="letter-grid">
              {currentExercise.letters?.map((letter, index) => (
                <button
                  key={index}
                  className={`letter-button ${selectedLetters.includes(letter) ? 'used' : ''}`}
                  onClick={() => handleLetterSelect(letter)}
                  disabled={selectedLetters.includes(letter) || showFeedback}
                >
                  {letter}
                </button>
              ))}
            </div>
            
            {/* Backspace button */}
            <button 
              className="backspace-button"
              onClick={handleSpellingBackspace}
              disabled={userAnswer.length === 0 || showFeedback}
            >
              ← Backspace
            </button>
            
            {/* Feedback and explanation */}
            {showFeedback && (
              <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="feedback-icon">
                  {isCorrect ? <MdCheck /> : <MdError />}
                </div>
                <div className="feedback-text">
                  {isCorrect ? 'Perfect spelling!' : 'Check your spelling'}
                </div>
                {!isCorrect && showExplanation && currentExercise.explanation && (
                  <div className="explanation">
                    <MdLightbulb className="explanation-icon" />
                    <p>{currentExercise.explanation}</p>
                  </div>
                )}
              </div>
            )}
            
            <button 
              className={`submit-button ${isCorrect ? 'correct' : ''} ${showFeedback && !isCorrect ? 'incorrect' : ''}`}
              onClick={showFeedback && !isCorrect ? handleTryAgain : handleAnswerSubmit}
              disabled={userAnswer.length === 0 || showFeedback}
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
                'Check Spelling'
              )}
            </button>
          </div>
        );

      case 'match':
        return (
          <div className="exercise-container">
            <h3 className="instruction">{currentExercise.instruction}</h3>
            <div className="matching-grid">
              {matchedPairs.map((pair) => (
                <div key={pair.id} className="match-pair">
                  <button
                    className={`match-button ${pair.matched ? 'matched' : ''}`}
                    onClick={() => handleMatchSelect(pair)}
                    disabled={showFeedback}
                  >
                    <span className="swedish">{pair.swedish}</span>
                    <span className="english">{pair.english}</span>
                  </button>
                </div>
              ))}
            </div>
            
            {/* Check matching button */}
            <button 
              className="submit-button"
              onClick={handleAnswerSubmit}
              disabled={matchedPairs.filter(p => p.matched).length === 0}
            >
              Check Matches
            </button>
          </div>
        );

      case 'listening':
        return (
          <div className="exercise-container">
            {/* Timer for timed exercises */}
            {currentExercise.timed && (
              <div className="timer-container">
                <MdTimer className="timer-icon" />
                <span className="timer-text">{timeRemaining}s</span>
              </div>
            )}
            
            <h3 className="instruction">{currentExercise.instruction}</h3>
            
            {/* Audio player */}
            <div className="audio-section">
              <button 
                className={`audio-button ${audioPlaying ? 'playing' : ''}`}
                onClick={() => playPronunciation(currentExercise.audioText)}
                disabled={audioPlaying}
              >
                <MdVolumeUp />
                <span>Listen to the audio</span>
              </button>
            </div>
            
            {/* Question */}
            <div className="question">
              <h2>{currentExercise.question}</h2>
            </div>
            
            {/* Options */}
            <div className="options-grid">
              {currentExercise.options?.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${selectedOption === option ? 'selected' : ''} ${showFeedback && isCorrect && selectedOption === option ? 'correct-answer' : ''} ${showFeedback && !isCorrect && selectedOption === option ? 'incorrect-answer' : ''}`}
                  onClick={() => handleOptionSelect(option)}
                  disabled={showFeedback}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {/* Feedback and explanation */}
            {showFeedback && (
              <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="feedback-icon">
                  {isCorrect ? <MdCheck /> : <MdError />}
                </div>
                <div className="feedback-text">
                  {isCorrect ? 'Great listening!' : 'Listen carefully'}
                </div>
                {!isCorrect && showExplanation && currentExercise.explanation && (
                  <div className="explanation">
                    <MdLightbulb className="explanation-icon" />
                    <p>{currentExercise.explanation}</p>
                  </div>
                )}
              </div>
            )}
            
            <button 
              className={`submit-button ${isCorrect ? 'correct' : ''} ${showFeedback && !isCorrect ? 'incorrect' : ''}`}
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
                'Check Answer'
              )}
            </button>
          </div>
        );

      default:
        return <div className="exercise-container">Exercise type not supported</div>;
    }
  };

  return (
    <div className={`lesson-view ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="lesson-header">
        <button className="exit-button" onClick={onExit}>
          <MdClose />
        </button>
        <div className="lesson-info">
          <h2>{lesson.name}</h2>
          <p>{lesson.description}</p>
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
        {streak > 0 && (
          <div className="stat">
            <span className="stat-label">Streak:</span>
            <span className="stat-value streak">
              <MdStar />
              {streak}
            </span>
          </div>
        )}
      </div>

      <div className="lesson-content">
        {renderExercise()}
      </div>

      {/* Streak notification */}
      {showStreak && streak > 1 && (
        <div className="streak-notification">
          <MdStar className="streak-icon" />
          <span>Amazing! {streak} in a row!</span>
        </div>
      )}

      {/* Game Over Modal */}
      {showGameOver && (
        <div className="game-over-overlay">
          <div className="game-over-modal">
            <div className="game-over-icon">💔</div>
            <h2 className="game-over-title">Out of Hearts!</h2>
            <p className="game-over-message">
              You've run out of hearts for today. Come back later when they refill to continue learning!
            </p>
            <div className="game-over-stats">
              <p>Final Score: {score}</p>
              <p>Best Streak: {streak}</p>
            </div>
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