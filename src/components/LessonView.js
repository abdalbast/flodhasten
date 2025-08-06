import React, { useState, useCallback, useEffect } from 'react';
import { MdVolumeUp, MdClose, MdCheck, MdError } from 'react-icons/md';
import './LessonView.css';
import ttsApi from '../utils/ttsApi';
import { getOptions } from '../data/lessons.js';

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

  const currentExercise = lesson.exercises[currentExerciseIndex];

  // Play pronunciation
  const playPronunciation = async (word) => {
    try {
      await ttsApi.playSwedish(word);
    } catch (error) {
      console.error('Failed to play pronunciation:', error);
    }
  };

  // Initialize matching game and shuffle options
  useEffect(() => {
    if (currentExercise?.type === 'match') {
      const shuffledPairs = [...currentExercise.pairs].sort(() => Math.random() - 0.5);
      setMatchedPairs(shuffledPairs.map((pair, index) => ({
        ...pair,
        id: index,
        matched: false
      })));
    }
    
    // Generate shuffled options for image choice exercises
    if (currentExercise?.type === 'image_choice') {
      // Generate new shuffled options using the getOptions function
      const shuffledOptions = getOptions(currentExercise.correctAnswer);
      setShuffledOptions(shuffledOptions);
    }
  }, [currentExercise, lesson]);

  const handleAnswerSubmit = useCallback(() => {
    if (!userAnswer.trim() && !selectedOption) return;

    let answer, correct;
    
    if (currentExercise.type === 'image_choice') {
      answer = selectedOption;
      correct = answer === currentExercise.correctAnswer;
    } else {
      answer = selectedOption || userAnswer.toLowerCase().trim();
      correct = answer === currentExercise.correctAnswer.toLowerCase();
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
    if (!currentExercise) return null;

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
              {(shuffledOptions || []).map((option, index) => (
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
                      {option.image}
                    </span>
                  </div>
                  <div className="option-label">{option.label}</div>
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
                  ? (shuffledOptions || []).find(opt => opt.id === currentExercise.correctAnswer)?.label 
                  : currentExercise.correctAnswer}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonView;