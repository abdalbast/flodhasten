import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaBookOpen, FaStar, FaVolumeUp } from 'react-icons/fa';
import ttsApi from '../utils/ttsApi';

const Review = ({ isDarkMode, onBack }) => {
  const [learnedWords, setLearnedWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [totalReviewed, setTotalReviewed] = useState(0);

  useEffect(() => {
    // Load learned words from localStorage
    const savedWords = localStorage.getItem('flodhasten_words');
    if (savedWords) {
      try {
        const words = JSON.parse(savedWords);
        setLearnedWords(words);
      } catch (error) {
        console.error('Error loading words:', error);
      }
    }
  }, []);

  const currentWord = learnedWords[currentIndex];

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % learnedWords.length);
    setTotalReviewed((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev - 1 + learnedWords.length) % learnedWords.length);
  };

  const handlePlayPronunciation = async () => {
    if (currentWord) {
      try {
        await ttsApi.playSwedish(currentWord.swedish);
      } catch (error) {
        console.error('Failed to play pronunciation:', error);
      }
    }
  };

  const handleCorrect = () => {
    setScore((prev) => prev + 1);
    handleNext();
  };

  const handleIncorrect = () => {
    handleNext();
  };

  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const accentColor = isDarkMode ? '#3498db' : '#3498db';

  if (learnedWords.length === 0) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: textColor,
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
        <h2 style={{
          margin: '0 0 1rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          No Words to Review
        </h2>
        <p style={{
          margin: '0 0 2rem 0',
          fontFamily: '"Georgia", serif',
          opacity: 0.8
        }}>
          Start learning some Swedish words to review them here!
        </p>
        <button
          onClick={onBack}
          style={{
            background: accentColor,
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            padding: '0.8rem 1.5rem',
            cursor: 'pointer',
            fontFamily: '"Georgia", serif',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0 auto'
          }}
        >
          <FaArrowLeft />
          Back to Learning
        </button>
      </div>
    );
  }

  return (
    <div style={{
      padding: '1rem',
      maxWidth: '800px',
      margin: '0 auto',
      color: textColor
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            color: accentColor,
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FaArrowLeft />
          Back
        </button>
        
        <h1 style={{
          fontSize: '2rem',
          margin: '0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          📚 Word Review
        </h1>
        
        <div style={{
          textAlign: 'right',
          fontSize: '0.9rem'
        }}>
          <div>Score: {score}/{totalReviewed}</div>
          <div>Words: {learnedWords.length}</div>
        </div>
      </div>

      {/* Progress */}
      <div style={{
        background: cardBackground,
        border: `2px solid ${borderColor}`,
        borderRadius: '15px',
        padding: '1rem',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem'
        }}>
          <span>Progress</span>
          <span>{currentIndex + 1} / {learnedWords.length}</span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          background: isDarkMode ? '#555' : '#e9ecef',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${((currentIndex + 1) / learnedWords.length) * 100}%`,
            height: '100%',
            background: accentColor,
            transition: 'width 0.3s ease'
          }}></div>
        </div>
      </div>

      {/* Word Card */}
      {currentWord && (
        <div style={{
          background: cardBackground,
          border: `2px solid ${borderColor}`,
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            margin: '0 0 0.5rem 0',
            fontSize: '2.5rem',
            fontFamily: '"Georgia", serif',
            color: accentColor
          }}>
            {currentWord.swedish}
          </h2>
          
          <p style={{
            margin: '0 0 1rem 0',
            fontSize: '1.1rem',
            opacity: 0.7,
            fontFamily: '"Georgia", serif'
          }}>
            {currentWord.english}
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <button
              onClick={handlePlayPronunciation}
              style={{
                background: accentColor,
                color: '#fff',
                border: 'none',
                borderRadius: '25px',
                padding: '0.8rem 1.5rem',
                cursor: 'pointer',
                fontFamily: '"Georgia", serif',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaVolumeUp />
              Listen
            </button>
            
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              style={{
                background: isDarkMode ? '#555' : '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '25px',
                padding: '0.8rem 1.5rem',
                cursor: 'pointer',
                fontFamily: '"Georgia", serif',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaBookOpen />
              {showAnswer ? 'Hide' : 'Show'} Answer
            </button>
          </div>

          {showAnswer && (
            <div style={{
              background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
              borderRadius: '15px',
              padding: '1rem',
              marginTop: '1rem'
            }}>
              <h3 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '1.2rem',
                color: accentColor
              }}>
                Translation
              </h3>
              <p style={{
                margin: '0',
                fontSize: '1rem',
                opacity: 0.8
              }}>
                {currentWord.english}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={handlePrevious}
          style={{
            background: isDarkMode ? '#555' : '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            padding: '0.8rem 1.5rem',
            cursor: 'pointer',
            fontFamily: '"Georgia", serif',
            fontSize: '0.9rem'
          }}
        >
          ← Previous
        </button>
        
        <button
          onClick={handleNext}
          style={{
            background: accentColor,
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            padding: '0.8rem 1.5rem',
            cursor: 'pointer',
            fontFamily: '"Georgia", serif',
            fontSize: '0.9rem'
          }}
        >
          Next →
        </button>
      </div>

      {/* Quick Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        <button
          onClick={handleCorrect}
          style={{
            background: '#27ae60',
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            padding: '0.8rem 1.5rem',
            cursor: 'pointer',
            fontFamily: '"Georgia", serif',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FaStar />
          Got it Right
        </button>
        
        <button
          onClick={handleIncorrect}
          style={{
            background: '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            padding: '0.8rem 1.5rem',
            cursor: 'pointer',
            fontFamily: '"Georgia", serif',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          Need Practice
        </button>
      </div>
    </div>
  );
};

export default Review;
