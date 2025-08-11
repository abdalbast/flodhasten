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
  
  const containerBg = isDarkMode ? '#2d2d2d' : '#e1f5fe';
  const containerShadow = isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px #81d4fa';
  const titleColor = isDarkMode ? '#64b5f6' : '#0288d1';
  const borderColor = isDarkMode ? '#555555' : 'transparent';

  // Generate a new falling word
  const generateWord = useCallback(() => {
    if (words.length === 0) return;
    
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const newWord = {
      id: Date.now() + Math.random(),
      swedish: randomWord.swedish,
      english: randomWord.english,
      x: Math.random() * 280, // Random horizontal position
      y: -50, // Start above the game area
      speed: 1 + (level * 0.2), // Speed increases with level
      answered: false
    };
    
    setFallingWords(prev => [...prev, newWord]);
  }, [words, level]);

  // Game loop for moving words
  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;
    
    setFallingWords(prev => {
      const updated = prev.map(word => ({
        ...word,
        y: word.y + word.speed
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
    
    // Generate new words periodically
    const now = Date.now();
    if (now - lastWordTimeRef.current > wordSpeedRef.current) {
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

  if (!words.length) {
    return <div style={{textAlign:'center',marginTop:'2rem'}}>No words to practice!</div>;
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
      <h2 style={{color: titleColor}}>Word Fall</h2>
      
      {/* Game Stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        fontSize: '0.9rem',
        color: isDarkMode ? '#ccc' : '#666'
      }}>
        <span>Score: {score}</span>
        <span>Level: {level}</span>
        <span>Lives: {'❤️'.repeat(lives)}</span>
      </div>

      {/* Game Controls */}
      {gameState === 'ready' && (
        <button onClick={startGame} style={{
          background: '#2193b0',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '1rem 2rem',
          fontWeight: 'bold',
          fontSize: 18,
          cursor: 'pointer',
          marginBottom: '1rem'
        }}>
          Start Game
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
        overflow: 'hidden'
      }}>
        {/* Falling Words */}
        {fallingWords.map(word => (
          <div
            key={word.id}
            style={{
              position: 'absolute',
              left: word.x,
              top: word.y,
              background: word.answered ? '#27ae60' : '#e74c3c',
              color: '#fff',
              padding: '0.5rem',
              borderRadius: 6,
              fontSize: '0.9rem',
              fontWeight: 'bold',
              minWidth: '80px',
              textAlign: 'center',
              transition: 'all 0.1s ease',
              opacity: word.answered ? 0.7 : 1,
              transform: word.answered ? 'scale(0.9)' : 'scale(1)'
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
