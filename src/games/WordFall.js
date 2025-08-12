import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MdVolumeUp, MdPause, MdPlayArrow, MdRefresh } from 'react-icons/md';
import ttsApi from '../utils/ttsApi';

// Play Swedish word with TTS API
async function playSwedish(word) {
  try {
    await ttsApi.playSwedish(word);
  } catch (error) {
    console.log('TTS API failed, falling back to browser TTS:', error.message);
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const speakWithSwedishVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        let swedishVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('alva') && voice.lang === 'sv-SE'
        );
        
        const utter = new window.SpeechSynthesisUtterance(word);
        utter.lang = 'sv-SE';
        utter.rate = 0.6;
        utter.pitch = 1.0;
        utter.volume = 1.0;
        
        if (swedishVoice) {
          utter.voice = swedishVoice;
        }
        
        window.speechSynthesis.speak(utter);
      };
      
      if (window.speechSynthesis.getVoices().length > 0) {
        speakWithSwedishVoice();
      } else {
        window.speechSynthesis.onvoiceschanged = speakWithSwedishVoice;
      }
    }
  }
}

// WordFall: Tetris-style spelling game
function WordFall({ words, onWordStatUpdate, onLessonComplete, isDarkMode }) {
  // Filter for beginner words (difficulty 1) and ensure we have enough words
  const beginnerWords = words.filter(word => word.difficulty === 1);
  const gameWords = beginnerWords.length >= 10 ? beginnerWords : words;
  const [gameState, setGameState] = useState('ready'); // ready, playing, paused, gameOver
  const [fallingWords, setFallingWords] = useState([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  
  const gameLoopRef = useRef(null);
  const lastWordTimeRef = useRef(0);
  const wordSpeedRef = useRef(2000); // Time between new words in ms
  const maxWordsRef = useRef(5); // Maximum number of words on screen at once
  
  const containerBg = isDarkMode ? '#2d2d2d' : '#e1f5fe';
  const containerShadow = isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px #81d4fa';
  const titleColor = isDarkMode ? '#64b5f6' : '#0288d1';
  const borderColor = isDarkMode ? '#555555' : 'transparent';

  // Tetris-style block colors and shapes
  const tetrisColors = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#96CEB4', // Green
    '#FFEAA7', // Yellow
    '#DDA0DD', // Plum
    '#FFB347', // Orange
    '#87CEEB', // Sky Blue
    '#98FB98', // Pale Green
    '#F0E68C'  // Khaki
  ];

  // Tetris-style block shapes (different widths and heights)
  const tetrisShapes = [
    { width: 100, height: 40, type: 'I' },      // Long horizontal
    { width: 80, height: 50, type: 'O' },       // Square
    { width: 120, height: 35, type: 'T' },      // Wide
    { width: 70, height: 45, type: 'L' },       // Tall
    { width: 90, height: 40, type: 'S' },       // Medium
    { width: 110, height: 30, type: 'Z' }       // Extra wide
  ];

  // Generate a new falling word
  const generateWord = useCallback(() => {
    if (gameWords.length === 0) return;
    
    const randomWord = gameWords[Math.floor(Math.random() * gameWords.length)];
    
    // Select random Tetris-style properties
    const randomColor = tetrisColors[Math.floor(Math.random() * tetrisColors.length)];
    const randomShape = tetrisShapes[Math.floor(Math.random() * tetrisShapes.length)];
    
    // Calculate available positions to avoid overlap
    const wordWidth = randomShape.width;
    const gameAreaWidth = 320;
    const maxX = gameAreaWidth - wordWidth;
    
    // Find a position that doesn't overlap with existing words
    let attempts = 0;
    let newX, newY;
    
    // Try to distribute words more evenly across the screen
    const columns = 3; // Divide screen into 3 columns
    const columnWidth = maxX / columns;
    const preferredColumn = Math.floor(Math.random() * columns);
    
    do {
      // Start with preferred column, then try others
      const column = attempts < columns ? (preferredColumn + attempts) % columns : Math.floor(Math.random() * columns);
      newX = (column * columnWidth) + (Math.random() * (columnWidth - wordWidth));
      newY = -50; // Start above the game area
      attempts++;
      
      // Check if this position overlaps with existing words
      const overlaps = fallingWords.some(word => 
        Math.abs(word.x - newX) < wordWidth && 
        Math.abs(word.y - newY) < 40
      );
      
      if (!overlaps || attempts > 15) break;
    } while (attempts < 15);
    
    const newWord = {
      id: Date.now() + Math.random(),
      swedish: randomWord.swedish,
      english: randomWord.english,
      x: Math.max(0, Math.min(newX, maxX)), // Ensure within bounds
      y: newY,
      speed: 1 + (level * 0.2), // Speed increases with level
      answered: false,
      color: randomColor,
      shape: randomShape
    };
    
    setFallingWords(prev => [...prev, newWord]);
  }, [gameWords, level, fallingWords]);

  // Game loop for moving words
  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;
    
    setFallingWords(prev => {
      const updated = prev.map(word => ({
        ...word,
        y: word.y + word.speed,
        // Ensure words stay within horizontal bounds
        x: Math.max(0, Math.min(word.x, 320 - (word.shape?.width || 120)))
      }));
      
      // Remove words that have fallen off screen or been answered
      return updated.filter(word => word.y < 400 && !word.answered);
    });
    
    // Check for game over (words reaching bottom)
    setFallingWords(prev => {
      const wordsAtBottom = prev.filter(word => word.y >= 350 && !word.answered);
      if (wordsAtBottom.length > 0) {
        setLives(prevLives => {
          if (prevLives <= 1) {
            setGameState('gameOver');
            return 0;
          }
          return prevLives - 1;
        });
        return prev.filter(word => !wordsAtBottom.includes(word));
      }
      return prev;
    });
    
    // Generate new words periodically, but limit the number on screen
    const now = Date.now();
    if (now - lastWordTimeRef.current > wordSpeedRef.current && fallingWords.length < maxWordsRef.current) {
      generateWord();
      lastWordTimeRef.current = now;
    }
    
    // Level up every 10 points
    if (score > 0 && score % 10 === 0) {
      setLevel(prev => prev + 1);
      wordSpeedRef.current = Math.max(800, wordSpeedRef.current - 100); // Faster word generation
    }
  }, [gameState, level, score, generateWord]);

  // Start game loop
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(gameLoop, 50); // 20 FPS
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop]);

  // Handle input submission
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const inputLower = input.trim().toLowerCase();
    const wordToAnswer = fallingWords.find(word => !word.answered);
    
    if (wordToAnswer && inputLower === wordToAnswer.english.toLowerCase()) {
      // Correct answer
      setFallingWords(prev => prev.map(word => 
        word.id === wordToAnswer.id ? { ...word, answered: true } : word
      ));
      setScore(prev => prev + 1);
      setFeedback('✅ Correct!');
      if (onWordStatUpdate) onWordStatUpdate(wordToAnswer.swedish, wordToAnswer.english, 'correct');
      
      // Remove feedback after 1 second
      setTimeout(() => setFeedback(''), 1000);
    } else {
      // Wrong answer
      setFeedback('❌ Try again!');
      if (wordToAnswer && onWordStatUpdate) {
        onWordStatUpdate(wordToAnswer.swedish, wordToAnswer.english, 'incorrect');
      }
      setTimeout(() => setFeedback(''), 1000);
    }
    
    setInput('');
  }, [input, fallingWords, onWordStatUpdate]);

  // Start game
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setLevel(1);
    setFallingWords([]);
    setFeedback('');
    lastWordTimeRef.current = Date.now();
    wordSpeedRef.current = 2000;
  };

  // Pause/Resume game
  const togglePause = () => {
    setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
  };

  // Reset game
  const resetGame = () => {
    setGameState('ready');
    setScore(0);
    setLives(3);
    setLevel(1);
    setFallingWords([]);
    setInput('');
    setFeedback('');
  };

  // Handle game completion
  useEffect(() => {
    if (score >= 20) { // Win condition: 20 points
      setGameState('gameOver');
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        if (typeof onLessonComplete === 'function') onLessonComplete();
      }, 2000);
    }
  }, [score, onLessonComplete]);

  if (!gameWords.length) {
    return <div style={{textAlign:'center',marginTop:'2rem'}}>No beginner words available for practice!</div>;
  }

  return (
    <div style={{
      maxWidth: 400,
      margin: '2rem auto',
      background: containerBg,
      padding: '1.5rem',
      borderRadius: 16,
      boxShadow: containerShadow,
      textAlign: 'center',
      border: `1px solid ${borderColor}`
    }}>
      <h2 style={{
        color: titleColor,
        textAlign: 'center',
        marginBottom: '1rem',
        fontSize: '2rem',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        🎮 WORD FALL 🎮
      </h2>
      
      {/* Word Count Info */}
      <div style={{
        textAlign: 'center',
        marginBottom: '1rem',
        fontSize: '0.9rem',
        color: isDarkMode ? '#ccc' : '#666',
        background: isDarkMode ? '#444' : '#f0f0f0',
        padding: '0.5rem',
        borderRadius: 6,
        border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`
      }}>
        Practising with {gameWords.length} beginner Swedish words
      </div>
      
      {/* Game Stats - Tetris Style */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        fontSize: '0.9rem',
        color: isDarkMode ? '#ccc' : '#666',
        background: isDarkMode ? '#333' : '#e8e8e8',
        padding: '0.8rem',
        borderRadius: 8,
        border: `2px solid ${isDarkMode ? '#555' : '#ccc}`,
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <span style={{fontWeight: 'bold', color: '#FF6B6B'}}>Score: {score}</span>
        <span style={{fontWeight: 'bold', color: '#4ECDC4'}}>Level: {level}</span>
        <span style={{fontWeight: 'bold', color: '#FFEAA7'}}>Lives: {'❤️'.repeat(lives)}</span>
      </div>

      {/* Game Controls */}
      {gameState === 'ready' && (
        <button onClick={startGame} style={{
          background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          padding: '1rem 2rem',
          fontWeight: 'bold',
          fontSize: 18,
          cursor: 'pointer',
          marginBottom: '1rem',
          boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          border: '2px solid rgba(255,255,255,0.2)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-3px)';
          e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        }}
        >
          🚀 START GAME 🚀
        </button>
      )}

      {gameState === 'playing' && (
        <button onClick={togglePause} style={{
          background: '#f39c12',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '0.5rem 1rem',
          fontWeight: 'bold',
          fontSize: 16,
          cursor: 'pointer',
          marginBottom: '1rem'
        }}>
          <MdPause style={{verticalAlign:'middle',marginRight:4}}/>
          Pause
        </button>
      )}

      {gameState === 'paused' && (
        <button onClick={togglePause} style={{
          background: '#27ae60',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '0.5rem 1rem',
          fontWeight: 'bold',
          fontSize: 16,
          cursor: 'pointer',
          marginBottom: '1rem'
        }}>
          <MdPlayArrow style={{verticalAlign:'middle',marginRight:4}}/>
          Resume
        </button>
      )}

      {/* Game Area */}
      <div style={{
        width: 320,
        height: 400,
        border: `2px solid ${borderColor}`,
        borderRadius: 8,
        margin: '0 auto 1rem',
        background: isDarkMode ? '#1a1a1a' : '#f8f9fa',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
      }}>
        {/* Tetris-style grid lines */}
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={`grid-${i}`}
            style={{
              position: 'absolute',
              left: `${(i * 40)}px`,
              top: 0,
              width: '1px',
              height: '100%',
              background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              pointerEvents: 'none'
            }}
          />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={`grid-h-${i}`}
            style={{
              position: 'absolute',
              left: 0,
              top: `${(i * 40)}px`,
              width: '100%',
              height: '1px',
              background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              pointerEvents: 'none'
            }}
          />
        ))}
        
        {/* Danger zone indicator */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50px',
          background: 'rgba(231, 76, 60, 0.15)',
          borderTop: `2px solid #e74c3c`,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#e74c3c',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          DANGER ZONE - Don't let words reach here!
        </div>
        {/* Falling Words */}
        {fallingWords.map(word => (
          <div
            key={word.id}
            style={{
              position: 'absolute',
              left: Math.max(0, Math.min(word.x, 320 - (word.shape?.width || 120))), // Ensure within bounds
              top: word.y,
              background: word.answered ? '#27ae60' : (word.color || '#e74c3c'),
              color: '#fff',
              padding: '0.5rem',
              borderRadius: word.shape?.type === 'O' ? '50%' : '8px', // Round for square blocks
              fontSize: '0.9rem',
              fontWeight: 'bold',
              width: word.shape?.width || 120,
              height: word.shape?.height || 40,
              textAlign: 'center',
              transition: 'all 0.1s ease',
              opacity: word.answered ? 0.7 : 1,
              transform: word.answered ? 'scale(0.9)' : 'scale(1)',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)`,
              border: `2px solid ${word.answered ? '#27ae60' : (word.color || '#e74c3c')}`,
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
            }}
          >
            {word.swedish}
            <button
              type="button"
              aria-label={`Play ${word.swedish}`}
              onClick={() => playSwedish(word.swedish)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 16,
                marginLeft: 4
              }}
            >
              <MdVolumeUp />
            </button>
          </div>
        ))}
      </div>

      {/* Input Form */}
      {gameState === 'playing' && (
        <form onSubmit={handleSubmit} style={{marginBottom: '1rem'}}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type English translation..."
            autoFocus
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: `1px solid ${borderColor}`,
              fontSize: 16,
              background: isDarkMode ? '#444' : '#fff',
              color: isDarkMode ? '#fff' : '#000'
            }}
          />
          <button
            type="submit"
            style={{
              marginTop: 8,
              width: '100%',
              background: '#2193b0',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: 12,
              fontWeight: 'bold',
              fontSize: 16,
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        </form>
      )}

      {/* Feedback */}
      {feedback && (
        <div style={{
          marginBottom: '1rem',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          color: feedback.includes('Correct') ? '#27ae60' : '#e74c3c'
        }}>
          {feedback}
        </div>
      )}

      {/* Game Over */}
      {gameState === 'gameOver' && (
        <div style={{marginBottom: '1rem'}}>
          <h3 style={{color: score >= 20 ? '#27ae60' : '#e74c3c'}}>
            {score >= 20 ? '🎉 Congratulations! You won!' : 'Game Over!'}
          </h3>
          <p>Final Score: {score}</p>
          <button onClick={resetGame} style={{
            background: '#2193b0',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.8rem 1.5rem',
            fontWeight: 'bold',
            fontSize: 16,
            cursor: 'pointer',
            marginRight: '0.5rem'
          }}>
            <MdRefresh style={{verticalAlign:'middle',marginRight:4}}/>
            Play Again
          </button>
        </div>
      )}

      {/* Instructions */}
      {gameState === 'ready' && (
        <div style={{
          fontSize: '0.9rem',
          color: isDarkMode ? '#ccc' : '#666',
          textAlign: 'left',
          background: isDarkMode ? '#444' : '#f0f0f0',
          padding: '1rem',
          borderRadius: 8,
          marginTop: '1rem'
        }}>
          <h4 style={{marginTop: 0}}>How to play:</h4>
          <ul style={{margin: '0.5rem 0', paddingLeft: '1.5rem'}}>
            <li>Swedish words fall from the top</li>
            <li>Type the English translation before they reach the bottom</li>
            <li>Click the speaker icon to hear pronunciation</li>
            <li>Score 20 points to win!</li>
            <li>Don't let words reach the bottom - you have 3 lives</li>
          </ul>
        </div>
      )}

      {/* Confetti */}
      {showConfetti && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          fontSize: 48,
          animation: 'pop 2s'
        }}>
          <span role="img" aria-label="confetti">🎉🎊✨🎉🎊✨</span>
        </div>
      )}

      <style>{`
        @keyframes pop { 
          0%{opacity:0;transform:scale(0.7);} 
          20%{opacity:1;transform:scale(1.1);} 
          80%{opacity:1;} 
          100%{opacity:0;transform:scale(1);} 
        }
      `}</style>
    </div>
  );
}

export default WordFall;
