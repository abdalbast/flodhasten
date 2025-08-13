import React, { useState, useEffect, useCallback } from 'react';
import { FaPlay, FaVolumeUp, FaCheck, FaTimes, FaRedo, FaLightbulb } from 'react-icons/fa';

const SentenceBuilder = React.memo(({ words, onWordStatUpdate, onLessonComplete, isDarkMode }) => {
  const [currentSentence, setCurrentSentence] = useState(null);
  const [userSentence, setUserSentence] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameState, setGameState] = useState('ready');
  const [grammarScore, setGrammarScore] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);

  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const accentColor = isDarkMode ? '#3498db' : '#3498db';
  const successColor = isDarkMode ? '#27ae60' : '#27ae60';
  const errorColor = isDarkMode ? '#e74c3c' : '#e74c3c';
  const warningColor = isDarkMode ? '#f39c12' : '#f39c12';

  // Sample sentences for building
  const sampleSentences = [
    {
      id: 1,
      swedish: 'Jag äter bröd',
      english: 'I eat bread',
      words: ['jag', 'äter', 'bröd'],
      difficulty: 'easy'
    },
    {
      id: 2,
      swedish: 'Hon dricker kaffe',
      english: 'She drinks coffee',
      words: ['hon', 'dricker', 'kaffe'],
      difficulty: 'easy'
    },
    {
      id: 3,
      swedish: 'Vi bor i Stockholm',
      english: 'We live in Stockholm',
      words: ['vi', 'bor', 'i', 'Stockholm'],
      difficulty: 'medium'
    },
    {
      id: 4,
      swedish: 'Du läser en bok',
      english: 'You read a book',
      words: ['du', 'läser', 'en', 'bok'],
      difficulty: 'medium'
    },
    {
      id: 5,
      swedish: 'Han köper en ny bil',
      english: 'He buys a new car',
      words: ['han', 'köper', 'en', 'ny', 'bil'],
      difficulty: 'hard'
    }
  ];

  // Initialize game
  useEffect(() => {
    if (gameState === 'ready') {
      const randomSentence = sampleSentences[Math.floor(Math.random() * sampleSentences.length)];
      setCurrentSentence(randomSentence);
      
      // Create shuffled word list with extra words
      const allWords = [...randomSentence.words];
      const extraWords = words
        .filter(w => !randomSentence.words.includes(w.swedish))
        .slice(0, 3)
        .map(w => w.swedish);
      
      const shuffledWords = [...allWords, ...extraWords].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffledWords);
    }
  }, [gameState, words]);

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
  }, [isPlaying, timeLeft]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setIsPlaying(true);
    setTimeLeft(120);
    setScore(0);
    setUserSentence([]);
    setGrammarScore(0);
    setHintUsed(false);
  }, []);

  const endGame = useCallback(() => {
    setGameState('finished');
    setIsPlaying(false);
    
    // Calculate final score
    const finalScore = score + grammarScore;
    setScore(finalScore);
  }, [score, grammarScore]);

  const addWordToSentence = useCallback((word) => {
    if (!isPlaying) return;

    setUserSentence(prev => [...prev, word]);
    
    // Check if sentence is complete
    if (userSentence.length + 1 === currentSentence.words.length) {
      const newSentence = [...userSentence, word];
      checkSentence(newSentence);
    }
  }, [isPlaying, userSentence, currentSentence]);

  const removeWordFromSentence = useCallback((index) => {
    if (!isPlaying) return;
    
    setUserSentence(prev => prev.filter((_, i) => i !== index));
  }, [isPlaying]);

  const checkSentence = useCallback((sentence) => {
    const userSentenceText = sentence.join(' ');
    const correctSentence = currentSentence.words.join(' ');
    
    // Basic grammar check
    let grammarPoints = 0;
    let isCorrect = true;
    
    // Check word order
    for (let i = 0; i < sentence.length; i++) {
      if (sentence[i] === currentSentence.words[i]) {
        grammarPoints += 10;
      } else {
        isCorrect = false;
      }
    }
    
    // Bonus for perfect sentence
    if (userSentenceText === correctSentence) {
      grammarPoints += 50;
      setScore(prev => prev + 100);
    }
    
    setGrammarScore(grammarPoints);
    
    // Update word statistics using provided words list for English mapping when available
    if (onWordStatUpdate) {
      sentence.forEach(wordToken => {
        const found = words.find(w => w.swedish.toLowerCase() === wordToken.toLowerCase());
        const swedish = wordToken;
        const english = found ? found.english : '';
        onWordStatUpdate(swedish, english, isCorrect ? 'correct' : 'incorrect');
      });
    }
    
    // End game after checking
    setTimeout(() => {
      endGame();
    }, 2000);
  }, [currentSentence, onWordStatUpdate, endGame]);

  const useHint = useCallback(() => {
    if (!isPlaying || hintUsed) return;
    
    setHintUsed(true);
    setScore(prev => prev - 20); // Penalty for using hint
  }, [isPlaying, hintUsed]);

  const playSwedish = useCallback((text) => {
    const utterance = new SpeechSynthesisUtterance(text);
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
          📝 Sentence Builder
        </h2>
        <p style={{
          margin: '0 0 2rem 0',
          fontFamily: '"Georgia", serif',
          opacity: 0.8
        }}>
          Construct grammatically correct Swedish sentences by arranging words in the right order.
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
          🎉 Sentence Complete!
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
            Your Sentence: {userSentence.join(' ')}
          </p>
          <p style={{
            margin: '0 0 0.5rem 0',
            fontFamily: '"Georgia", serif'
          }}>
            Correct: {currentSentence.words.join(' ')}
          </p>
          <p style={{
            margin: '0',
            fontFamily: '"Georgia", serif',
            opacity: 0.8
          }}>
            Grammar Score: {grammarScore}
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
            📝 Sentence Builder
          </h2>
          <p style={{
            margin: '0',
            fontSize: '0.9rem',
            opacity: 0.8,
            fontFamily: '"Georgia", serif'
          }}>
            Score: {score} | Grammar: {grammarScore}
          </p>
        </div>
        <div style={{
          textAlign: 'right'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: timeLeft <= 20 ? errorColor : accentColor,
            fontFamily: '"Georgia", serif'
          }}>
            ⏱️ {timeLeft}s
          </div>
        </div>
      </div>

      {/* Target Sentence */}
      {currentSentence && (
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
            Build this sentence:
          </h3>
          <p style={{
            margin: '0',
            fontSize: '1.2rem',
            fontFamily: '"Georgia", serif',
            color: warningColor
          }}>
            {currentSentence.english}
          </p>
          <button
            onClick={() => playSwedish(currentSentence.swedish)}
            style={{
              background: 'transparent',
              border: `2px solid ${accentColor}`,
              color: accentColor,
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '0.5rem'
            }}
          >
            <FaVolumeUp />
          </button>
        </div>
      )}

      {/* User's Sentence */}
      <div style={{
        background: cardBackground,
        border: `2px solid ${borderColor}`,
        borderRadius: '15px',
        padding: '1.5rem',
        marginBottom: '2rem',
        minHeight: '100px'
      }}>
        <h3 style={{
          margin: '0 0 1rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          Your Sentence:
        </h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          minHeight: '50px',
          alignItems: 'center'
        }}>
          {userSentence.map((word, index) => (
            <span
              key={index}
              style={{
                background: accentColor,
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontFamily: '"Georgia", serif',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
              onClick={() => removeWordFromSentence(index)}
            >
              {word}
              <FaTimes style={{ fontSize: '0.7rem' }} />
            </span>
          ))}
          {userSentence.length === 0 && (
            <span style={{
              opacity: 0.5,
              fontStyle: 'italic',
              fontFamily: '"Georgia", serif'
            }}>
              Click words below to build your sentence
            </span>
          )}
        </div>
      </div>

      {/* Available Words */}
      <div style={{
        background: cardBackground,
        border: `2px solid ${borderColor}`,
        borderRadius: '15px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h3 style={{
            margin: '0',
            fontFamily: '"Georgia", serif',
            color: accentColor
          }}>
            Available Words:
          </h3>
          <button
            onClick={useHint}
            disabled={hintUsed}
            style={{
              background: hintUsed ? '#ccc' : warningColor,
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.5rem 1rem',
              cursor: hintUsed ? 'not-allowed' : 'pointer',
              fontFamily: '"Georgia", serif',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FaLightbulb />
            Hint
          </button>
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          {availableWords.map((word, index) => (
            <button
              key={index}
              onClick={() => addWordToSentence(word)}
              disabled={userSentence.includes(word)}
              style={{
                background: userSentence.includes(word) ? '#ccc' : accentColor,
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                padding: '0.5rem 1rem',
                cursor: userSentence.includes(word) ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontFamily: '"Georgia", serif',
                opacity: userSentence.includes(word) ? 0.5 : 1
              }}
            >
              {word}
            </button>
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
          onClick={() => checkSentence(userSentence)}
          disabled={userSentence.length !== currentSentence?.words.length}
          style={{
            background: userSentence.length === currentSentence?.words.length ? successColor : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '1rem 2rem',
            cursor: userSentence.length === currentSentence?.words.length ? 'pointer' : 'not-allowed',
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FaCheck />
          Check Sentence
        </button>
        <button
          onClick={() => setUserSentence([])}
          style={{
            background: errorColor,
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
          Clear
        </button>
      </div>
    </div>
  );
});

export default SentenceBuilder; 