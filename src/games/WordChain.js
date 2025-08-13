import React, { useState, useEffect, useCallback } from 'react';
import { FaPlay, FaRedo, FaVolumeUp, FaCheck } from 'react-icons/fa';

const WordChain = React.memo(({ words, onWordStatUpdate, onLessonComplete, isDarkMode }) => {
  const [currentWord, setCurrentWord] = useState(null);
  const [userChain, setUserChain] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameState, setGameState] = useState('ready'); // ready, playing, finished
  const [chainMultiplier, setChainMultiplier] = useState(1);
  const [lastLetter, setLastLetter] = useState('');

  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const accentColor = isDarkMode ? '#3498db' : '#3498db';
  const successColor = isDarkMode ? '#27ae60' : '#27ae60';
  const errorColor = isDarkMode ? '#e74c3c' : '#e74c3c';

  // Initialize game
  useEffect(() => {
    if (words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setCurrentWord(randomWord);
      setLastLetter(randomWord.swedish.charAt(randomWord.swedish.length - 1));
    }
  }, [words]);

  // Timer
  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft, endGame]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setIsPlaying(true);
    setTimeLeft(60);
    setScore(0);
    setUserChain([]);
    setChainMultiplier(1);
  }, []);

  const endGame = useCallback(() => {
    setGameState('finished');
    setIsPlaying(false);
    
    // Update word statistics
    if (onWordStatUpdate) {
      userChain.forEach(word => {
        onWordStatUpdate(word.swedish, word.english, 'correct');
      });
    }
  }, [userChain, onWordStatUpdate]);

  const addWordToChain = useCallback((word) => {
    if (!isPlaying) return;

    // Check if word starts with the last letter of the previous word
    if (userChain.length > 0) {
      const lastWord = userChain[userChain.length - 1];
      const lastChar = lastWord.swedish.charAt(lastWord.swedish.length - 1);
      if (word.swedish.charAt(0).toLowerCase() !== lastChar.toLowerCase()) {
        return false; // Invalid chain
      }
    }

    setUserChain(prev => [...prev, word]);
    setScore(prev => prev + (10 * chainMultiplier));
    setChainMultiplier(prev => Math.min(prev + 0.5, 3));
    const nextLast = word.swedish.charAt(word.swedish.length - 1);
    setLastLetter(nextLast);

    // Find next word that starts with the last letter
    const nextWords = words.filter(w => 
      w.swedish.charAt(0).toLowerCase() === nextLast.toLowerCase()
    );
    
    if (nextWords.length > 0) {
      setCurrentWord(nextWords[Math.floor(Math.random() * nextWords.length)]);
    }

    return true;
  }, [isPlaying, userChain, words, chainMultiplier]);

  const playSwedish = useCallback((word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'sv-SE';
    speechSynthesis.speak(utterance);
  }, []);

  if (gameState === 'ready') {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: textColor
      }}>
        <h2 style={{
          margin: '0 0 1rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          🔗 Word Chain
        </h2>
        <p style={{
          margin: '0 0 2rem 0',
          fontFamily: '"Georgia", serif',
          opacity: 0.8
        }}>
          Connect Swedish words by matching the last letter of one word with the first letter of the next word.
        </p>
        <button
          onClick={startGame}
          style={{
            background: accentColor,
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '1rem 2rem',
            cursor: 'pointer',
            fontFamily: '"Georgia", serif',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0 auto'
          }}
        >
          <FaPlay />
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: textColor
      }}>
        <h2 style={{
          margin: '0 0 1rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          🎉 Game Complete!
        </h2>
        <div style={{
          background: cardBackground,
          border: `2px solid ${borderColor}`,
          borderRadius: '15px',
          padding: '1.5rem',
          margin: '1rem 0'
        }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontFamily: '"Georgia", serif',
            color: successColor
          }}>
            Final Score: {score}
          </h3>
          <p style={{
            margin: '0 0 0.5rem 0',
            fontFamily: '"Georgia", serif'
          }}>
            Words in Chain: {userChain.length}
          </p>
          <p style={{
            margin: '0',
            fontFamily: '"Georgia", serif',
            opacity: 0.8
          }}>
            Max Chain Multiplier: {Math.max(...userChain.map((_, i) => 1 + (i * 0.5)))}
          </p>
        </div>
        <button
          onClick={onLessonComplete}
          style={{
            background: accentColor,
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '0.8rem 1.5rem',
            cursor: 'pointer',
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0 auto'
          }}
        >
          <FaCheck />
          Continue
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
      {/* Game Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        background: cardBackground,
        border: `2px solid ${borderColor}`,
        borderRadius: '15px',
        padding: '1rem'
      }}>
        <div>
          <h2 style={{
            margin: '0',
            fontFamily: '"Georgia", serif',
            color: accentColor
          }}>
            🔗 Word Chain
          </h2>
          <p style={{
            margin: '0',
            fontSize: '0.9rem',
            opacity: 0.8,
            fontFamily: '"Georgia", serif'
          }}>
            Score: {score} | Chain Multiplier: {chainMultiplier.toFixed(1)}x
          </p>
        </div>
        <div style={{
          textAlign: 'right'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: timeLeft <= 10 ? errorColor : accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            ⏱️ {timeLeft}s
          </div>
        </div>
      </div>

      {/* Current Word */}
      {currentWord && (
        <div style={{
          background: cardBackground,
          border: `2px solid ${borderColor}`,
          borderRadius: '15px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontSize: '2rem',
            fontFamily: '"Georgia", serif',
            color: accentColor
          }}>
            {currentWord.swedish}
          </h3>
          <p style={{
            margin: '0 0 1rem 0',
            fontFamily: '"Georgia", serif',
            opacity: 0.8
          }}>
            {currentWord.english}
          </p>
          <button
            onClick={() => playSwedish(currentWord.swedish)}
            style={{
              background: 'transparent',
              border: `2px solid ${accentColor}`,
              color: accentColor,
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}
          >
            <FaVolumeUp />
          </button>
        </div>
      )}

      {/* Word Chain */}
      <div style={{
        background: cardBackground,
        border: `2px solid ${borderColor}`,
        borderRadius: '15px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          margin: '0 0 1rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          Your Chain ({userChain.length} words)
        </h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          {userChain.map((word, index) => (
            <span
              key={index}
              style={{
                background: accentColor,
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontFamily: '"Georgia", serif'
              }}
            >
              {word.swedish}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => addWordToChain(currentWord)}
          style={{
            background: successColor,
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '1rem 2rem',
            cursor: 'pointer',
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FaCheck />
          Add to Chain
        </button>
        <button
          onClick={() => {
            const randomWord = words[Math.floor(Math.random() * words.length)];
            setCurrentWord(randomWord);
          }}
          style={{
            background: accentColor,
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '1rem 2rem',
            cursor: 'pointer',
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FaRedo />
          New Word
        </button>
      </div>
    </div>
  );
});

export default WordChain; 