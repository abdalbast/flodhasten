import React, { useState, useCallback, useEffect } from 'react';
import { MdVolumeUp, MdClose, MdCheck, MdError } from 'react-icons/md';
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

  // Safety check for lesson and exercises
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

  const currentExercise = lesson.exercises[currentExerciseIndex];

  // Safety check for current exercise
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
        // Get the lesson to access allOptions
        if (lesson?.allOptions && currentExercise.getOptions) {
          try {
            // Generate new shuffled options using the getOptions function
            const shuffledOptions = currentExercise.getOptions(lesson.allOptions);
            // Store shuffled options in the exercise object
            currentExercise.shuffledOptions = shuffledOptions;
          } catch (error) {
            console.error('Error generating shuffled options:', error);
            // Fallback to default options if available
            if (currentExercise.options) {
              currentExercise.shuffledOptions = [...currentExercise.options].sort(() => Math.random() - 0.5);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in lesson initialization:', error);
    }
  }, [currentExercise, lesson]);

  const handleAnswerSubmit = useCallback(() => {
    try {
      if (!userAnswer.trim() && !selectedOption) return;

      let answer, correct;
      
      if (currentExercise.type === 'image_choice') {
        answer = selectedOption;
        correct = answer === currentExercise.answer;
      } else {
        answer = selectedOption || userAnswer.toLowerCase().trim();
        correct = answer === currentExercise.answer.toLowerCase();
      }

      setIsCorrect(correct);
      setShowFeedback(true);

      if (correct) {
        setScore(prev => prev + 1);
      } else {
        setLives(prev => prev - 1);
      }

      setTimeout(() => {
        setShowFeedback(false);
        setIsCorrect(null);
        setUserAnswer('');
        setSelectedOption(null);
        setShowHint(false);
        
        if (currentExerciseIndex < lesson.exercises.length - 1) {
          setCurrentExerciseIndex(prev => prev + 1);
        } else {
          // Lesson complete
          onComplete(score + (correct ? 1 : 0), lesson.exercises.length, lives);
        }
      }, 1500);
    } catch (error) {
      console.error('Error in handleAnswerSubmit:', error);
      // Fallback: just close the lesson
      onComplete(0, 1, 0);
    }
  }, [userAnswer, selectedOption, currentExercise, currentExerciseIndex, lesson.exercises.length, score, lives, onComplete]);

  // Remove unused handleKeyPress function

  const handleOptionSelect = useCallback((option) => {
    setSelectedOption(option);
  }, []);

  const handleMatchSelect = useCallback((pair) => {
    setMatchedPairs(prev => prev.map(p => 
      p.id === pair.id ? { ...p, matched: !p.matched } : p
    ));
  }, []);

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
            
            {/* Instruction */}
            <h3 className="instruction">{currentExercise.instruction}</h3>
            
            {/* Swedish word with pronunciation */}
            <div className="word-section">
              <button 
                className="pronunciation-button"
                onClick={() => playPronunciation(currentExercise.swedishWord)}
                onMouseEnter={() => setShowHint(true)}
                onMouseLeave={() => setShowHint(false)}
                onTouchStart={() => setShowHint(true)}
                onTouchEnd={() => setShowHint(false)}
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
              {(currentExercise.shuffledOptions || currentExercise.options || []).map((option, index) => (
                <button
                  key={index}
                  className={`image-option ${selectedOption === option.id ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(option.id)}
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
            
            <button 
              className={`continue-button ${selectedOption ? 'enabled' : ''}`}
              onClick={handleAnswerSubmit}
              disabled={!selectedOption}
            >
              CONTINUE
            </button>
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
      </div>

      <div className="lesson-content">
        {renderExercise()}
      </div>

      {showFeedback && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            <>
              <MdCheck className="feedback-icon" />
              <span>Correct!</span>
            </>
          ) : (
            <>
              <MdError className="feedback-icon" />
              <span>
                Incorrect. The answer is: {currentExercise.type === 'image_choice' 
                  ? currentExercise.options.find(opt => opt.id === currentExercise.answer)?.label 
                  : currentExercise.answer}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonView;