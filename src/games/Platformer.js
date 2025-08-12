import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MdVolumeUp, MdPause, MdPlayArrow, MdRefresh, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdSpaceBar } from 'react-icons/md';
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

// Platformer Language Learning Game
function Platformer({ words, onWordStatUpdate, onLessonComplete, isDarkMode }) {
  // Filter for beginner words and ensure we have enough
  const beginnerWords = words.filter(word => word.difficulty === 1);
  const gameWords = beginnerWords.length >= 10 ? beginnerWords : words;
  
  const [gameState, setGameState] = useState('ready'); // ready, playing, paused, gameOver, levelComplete
  const [player, setPlayer] = useState({ x: 50, y: 300, vx: 0, vy: 0, onGround: false, direction: 1 });
  const [platforms, setPlatforms] = useState([]);
  const [collectibles, setCollectibles] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [doors, setDoors] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showLanguageChallenge, setShowLanguageChallenge] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  
  const gameLoopRef = useRef(null);
  const keysPressed = useRef(new Set());
  const gravity = 0.8;
  const jumpPower = -15;
  const moveSpeed = 5;
  
  const containerBg = isDarkMode ? '#2d2d2d' : '#e1f5fe';
  const containerShadow = isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px #81d4fa';
  const titleColor = isDarkMode ? '#64b5f6' : '#0288d1';
  const borderColor = isDarkMode ? '#555555' : 'transparent';

  // Generate level elements
  const generateLevel = useCallback((level) => {
    const newPlatforms = [
      { x: 0, y: 350, width: 800, height: 50, type: 'ground' },
      { x: 200, y: 250, width: 100, height: 20, type: 'platform' },
      { x: 400, y: 200, width: 100, height: 20, type: 'platform' },
      { x: 600, y: 150, width: 100, height: 20, type: 'platform' },
      { x: 800, y: 100, width: 100, height: 20, type: 'platform' }
    ];
    
    const newCollectibles = [
      { x: 250, y: 200, type: 'coin', word: gameWords[0], collected: false },
      { x: 450, y: 150, type: 'gem', word: gameWords[1], collected: false },
      { x: 650, y: 100, type: 'coin', word: gameWords[2], collected: false },
      { x: 850, y: 50, type: 'gem', word: gameWords[3], collected: false }
    ];
    
    const newDoors = [
      { x: 900, y: 50, width: 60, height: 80, type: 'checkpoint', challenge: 'grammar', unlocked: false }
    ];
    
    setPlatforms(newPlatforms);
    setCollectibles(newCollectibles);
    setDoors(newDoors);
    setEnemies([]);
  }, [gameWords]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current.add(e.code);
    };
    
    const handleKeyUp = (e) => {
      keysPressed.current.delete(e.code);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game physics loop
  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;
    
    setPlayer(prev => {
      let newVx = 0;
      let newVy = prev.vy + gravity;
      let newX = prev.x;
      let newY = prev.y;
      let newOnGround = false;
      let newDirection = prev.direction;
      
      // Handle movement
      if (keysPressed.current.has('ArrowLeft') || keysPressed.current.has('KeyA')) {
        newVx = -moveSpeed;
        newDirection = -1;
      }
      if (keysPressed.current.has('ArrowRight') || keysPressed.current.has('KeyD')) {
        newVx = moveSpeed;
        newDirection = 1;
      }
      if ((keysPressed.current.has('Space') || keysPressed.current.has('ArrowUp') || keysPressed.current.has('KeyW')) && prev.onGround) {
        newVy = jumpPower;
        newOnGround = false;
      }
      
      // Update position
      newX += newVx;
      newY += newVy;
      
      // Check platform collisions
      platforms.forEach(platform => {
        if (newX < platform.x + platform.width && 
            newX + 30 > platform.x && 
            newY < platform.y + platform.height && 
            newY + 30 > platform.y) {
          
          if (newVy > 0 && newY < platform.y) {
            // Landing on platform
            newY = platform.y - 30;
            newVy = 0;
            newOnGround = true;
          } else if (newVy < 0 && newY + 30 > platform.y + platform.height) {
            // Hitting platform from below
            newY = platform.y + platform.height;
            newVy = 0;
          } else if (newVx > 0 && newX < platform.x) {
            // Hitting platform from left
            newX = platform.x - 30;
          } else if (newVx < 0 && newX + 30 > platform.x + platform.width) {
            // Hitting platform from right
            newX = platform.x + platform.width;
          }
        }
      });
      
      // Check boundaries
      if (newX < 0) newX = 0;
      if (newX > 770) newX = 770;
      if (newY > 320) {
        newY = 320;
        newVy = 0;
        newOnGround = true;
      }
      
      return {
        ...prev,
        x: newX,
        y: newY,
        vx: newVx,
        vy: newVy,
        onGround: newOnGround,
        direction: newDirection
      };
    });
    
    // Check collectible collisions
    setCollectibles(prev => prev.map(collectible => {
      if (!collectible.collected && 
          player.x < collectible.x + 20 && 
          player.x + 30 > collectible.x && 
          player.y < collectible.y + 20 && 
          player.y + 30 > collectible.y) {
        
        // Show language challenge
        setCurrentChallenge({
          type: 'collectible',
          word: collectible.word,
          collectible: collectible
        });
        setShowLanguageChallenge(true);
        setGameState('paused');
        return collectible;
      }
      return collectible;
    }));
    
    // Check door collisions
    doors.forEach(door => {
      if (!door.unlocked && 
          player.x < door.x + door.width && 
          player.x + 30 > door.x && 
          player.y < door.y + door.height && 
          player.y + 30 > door.y) {
        
        setCurrentChallenge({
          type: 'door',
          challenge: door.challenge,
          door: door
        });
        setShowLanguageChallenge(true);
        setGameState('paused');
      }
    });
    
    // Check if player fell off
    if (player.y > 400) {
      setLives(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          return 0;
        }
        return prev - 1;
      });
      setPlayer(prev => ({ ...prev, x: 50, y: 300, vx: 0, vy: 0 }));
    }
    
    // Check level completion
    if (player.x > 950) {
      setGameState('levelComplete');
    }
  }, [gameState, player, platforms, collectibles, doors, lives]);

  // Start game loop
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(gameLoop, 16); // 60 FPS
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

  // Handle language challenge submission
  const handleChallengeSubmit = useCallback((e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const inputLower = input.trim().toLowerCase();
    const correctAnswer = currentChallenge.word?.english.toLowerCase();
    
    if (inputLower === correctAnswer) {
      // Correct answer
      setFeedback('✅ Correct!');
      setScore(prev => prev + 10);
      
      if (currentChallenge.type === 'collectible') {
        // Mark collectible as collected
        setCollectibles(prev => prev.map(c => 
          c === currentChallenge.collectible ? { ...c, collected: true } : c
        ));
        if (onWordStatUpdate) onWordStatUpdate(currentChallenge.word.swedish, currentChallenge.word.english, 'correct');
      } else if (currentChallenge.type === 'door') {
        // Unlock door
        setDoors(prev => prev.map(d => 
          d === currentChallenge.door ? { ...d, unlocked: true } : d
        ));
      }
      
      setTimeout(() => {
        setShowLanguageChallenge(false);
        setCurrentChallenge(null);
        setFeedback('');
        setGameState('playing');
      }, 1000);
    } else {
      // Wrong answer
      setFeedback('❌ Try again!');
      if (onWordStatUpdate) {
        onWordStatUpdate(currentChallenge.word?.swedish, currentChallenge.word?.english, 'incorrect');
      }
      setTimeout(() => setFeedback(''), 1000);
    }
    
    setInput('');
  }, [input, currentChallenge, onWordStatUpdate]);

  // Start game
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setCurrentLevel(1);
    setPlayer({ x: 50, y: 300, vx: 0, vy: 0, onGround: false, direction: 1 });
    generateLevel(1);
    setShowLanguageChallenge(false);
    setCurrentChallenge(null);
    setFeedback('');
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
    setCurrentLevel(1);
    setPlayer({ x: 50, y: 300, vx: 0, vy: 0, onGround: false, direction: 1 });
    setPlatforms([]);
    setCollectibles([]);
    setEnemies([]);
    setDoors([]);
    setShowLanguageChallenge(false);
    setCurrentChallenge(null);
    setInput('');
    setFeedback('');
  };

  // Handle level completion
  useEffect(() => {
    if (gameState === 'levelComplete') {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        if (typeof onLessonComplete === 'function') onLessonComplete();
      }, 2000);
    }
  }, [gameState, onLessonComplete]);

  if (!gameWords.length) {
    return <div style={{textAlign:'center',marginTop:'2rem'}}>No beginner words available for practice!</div>;
  }

  return (
    <div style={{
      maxWidth: 1000,
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
        🎮 PLATFORMER ADVENTURE 🎮
      </h2>
      
      {/* Game Stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        fontSize: '0.9rem',
        color: isDarkMode ? '#ccc' : '#666',
        background: isDarkMode ? '#333' : '#e8e8e8',
        padding: '0.8rem',
        borderRadius: 8,
        border: `2px solid ${isDarkMode ? '#555' : '#ccc'}`,
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <span style={{fontWeight: 'bold', color: '#FF6B6B'}}>Score: {score}</span>
        <span style={{fontWeight: 'bold', color: '#4ECDC4'}}>Level: {currentLevel}</span>
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
          🚀 START ADVENTURE 🚀
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

      {gameState === 'paused' && !showLanguageChallenge && (
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
        width: 1000,
        height: 400,
        border: `2px solid ${borderColor}`,
        borderRadius: 8,
        margin: '0 auto 1rem',
        background: 'linear-gradient(to bottom, #87CEEB, #98FB98)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
      }}>
        {/* Platforms */}
        {platforms.map((platform, index) => (
          <div
            key={`platform-${index}`}
            style={{
              position: 'absolute',
              left: platform.x,
              top: platform.y,
              width: platform.width,
              height: platform.height,
              background: platform.type === 'ground' ? '#8B4513' : '#228B22',
              border: '2px solid #654321',
              borderRadius: platform.type === 'ground' ? 0 : 4
            }}
          />
        ))}
        
        {/* Collectibles */}
        {collectibles.map((collectible, index) => (
          !collectible.collected && (
            <div
              key={`collectible-${index}`}
              style={{
                position: 'absolute',
                left: collectible.x,
                top: collectible.y,
                width: 20,
                height: 20,
                background: collectible.type === 'coin' ? '#FFD700' : '#FF69B4',
                borderRadius: '50%',
                border: '2px solid #FF8C00',
                animation: 'bounce 1s infinite'
              }}
            />
          )
        ))}
        
        {/* Doors */}
        {doors.map((door, index) => (
          <div
            key={`door-${index}`}
            style={{
              position: 'absolute',
              left: door.x,
              top: door.y,
              width: door.width,
              height: door.height,
              background: door.unlocked ? '#32CD32' : '#DC143C',
              border: '3px solid #8B0000',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '0.8rem'
            }}
          >
            {door.unlocked ? '✓' : '🔒'}
          </div>
        ))}
        
        {/* Player */}
        <div
          style={{
            position: 'absolute',
            left: player.x,
            top: player.y,
            width: 30,
            height: 30,
            background: '#FF6B6B',
            borderRadius: '50%',
            border: '2px solid #8B0000',
            transform: `scaleX(${player.direction})`,
            transition: 'transform 0.1s ease'
          }}
        />
        
        {/* Level End Flag */}
        <div style={{
          position: 'absolute',
          left: 950,
          top: 50,
          width: 20,
          height: 100,
          background: '#FFD700',
          border: '2px solid #FF8C00'
        }} />
        <div style={{
          position: 'absolute',
          left: 970,
          top: 50,
          width: 30,
          height: 30,
          background: '#FF0000',
          borderRadius: '50%',
          border: '2px solid #8B0000'
        }} />
      </div>

      {/* Language Challenge Modal */}
      {showLanguageChallenge && currentChallenge && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: containerBg,
            padding: '2rem',
            borderRadius: 16,
            maxWidth: 400,
            textAlign: 'center',
            border: `2px solid ${borderColor}`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            <h3 style={{color: titleColor, marginBottom: '1rem'}}>
              {currentChallenge.type === 'collectible' ? '🎯 Language Challenge!' : '🚪 Door Challenge!'}
            </h3>
            
            {currentChallenge.type === 'collectible' && (
              <div style={{marginBottom: '1rem'}}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginBottom: 8
                }}>
                  <span style={{fontSize: '1.5rem', color: titleColor}}>
                    {currentChallenge.word.swedish}
                  </span>
                  <button
                    type="button"
                    aria-label={`Play ${currentChallenge.word.swedish}`}
                    onClick={() => playSwedish(currentChallenge.word.swedish)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: titleColor,
                      cursor: 'pointer',
                      fontSize: 22
                    }}
                  >
                    <MdVolumeUp />
                  </button>
                </div>
                <p>Translate this word to English:</p>
              </div>
            )}
            
            {currentChallenge.type === 'door' && (
              <div style={{marginBottom: '1rem'}}>
                <p>Answer this grammar question to unlock the door:</p>
                <p style={{fontSize: '1.2rem', fontWeight: 'bold', color: titleColor}}>
                  What is the correct article for "äpple" (apple)?
                </p>
                <p style={{fontSize: '0.9rem', color: '#666'}}>
                  Hint: "äpple" is a neuter noun
                </p>
              </div>
            )}
            
            <form onSubmit={handleChallengeSubmit}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={currentChallenge.type === 'collectible' ? "Type English translation..." : "Type your answer..."}
                autoFocus
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 8,
                  border: `1px solid ${borderColor}`,
                  fontSize: 16,
                  background: isDarkMode ? '#444' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                  marginBottom: '1rem'
                }}
              />
              <button
                type="submit"
                style={{
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
                Submit Answer
              </button>
            </form>
            
            {feedback && (
              <div style={{
                marginTop: '1rem',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                color: feedback.includes('Correct') ? '#27ae60' : '#e74c3c'
              }}>
                {feedback}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Controls Instructions */}
      <div style={{
        fontSize: '0.9rem',
        color: isDarkMode ? '#ccc' : '#666',
        textAlign: 'center',
        background: isDarkMode ? '#444' : '#f0f0f0',
        padding: '1rem',
        borderRadius: 8,
        marginTop: '1rem'
      }}>
        <h4 style={{marginTop: 0}}>Controls:</h4>
        <div style={{display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap'}}>
          <span><MdKeyboardArrowLeft /> Move Left</span>
          <span><MdKeyboardArrowRight /> Move Right</span>
          <span><MdSpaceBar /> Jump</span>
        </div>
        <p style={{marginTop: '1rem', marginBottom: 0}}>
          Collect coins and gems by answering language questions, unlock doors with grammar challenges!
        </p>
      </div>

      {/* Game Over */}
      {gameState === 'gameOver' && (
        <div style={{marginBottom: '1rem'}}>
          <h3 style={{color: '#e74c3c'}}>Game Over!</h3>
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

      {/* Level Complete */}
      {gameState === 'levelComplete' && (
        <div style={{marginBottom: '1rem'}}>
          <h3 style={{color: '#27ae60'}}>🎉 Level Complete! 🎉</h3>
          <p>Score: {score}</p>
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
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-10px);}
          60% {transform: translateY(-5px);}
        }
      `}</style>
    </div>
  );
}

export default Platformer;
