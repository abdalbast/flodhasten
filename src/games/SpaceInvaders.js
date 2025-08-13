import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { MdVolumeUp, MdPause, MdPlayArrow, MdRefresh } from 'react-icons/md';
import ttsApi from '../utils/ttsApi';

// Play Swedish word with TTS API (Alva sv-SE only if available)
async function playSwedish(word) {
  try {
    await ttsApi.playSwedish(word);
  } catch (error) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const speakWithSwedishVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const swedishVoice = voices.find(v => v.name.toLowerCase().includes('alva') && v.lang === 'sv-SE');
        const utter = new window.SpeechSynthesisUtterance(word);
        utter.lang = 'sv-SE';
        utter.rate = 0.6; utter.pitch = 1.0; utter.volume = 1.0;
        if (swedishVoice) utter.voice = swedishVoice;
        window.speechSynthesis.speak(utter);
      };
      if (window.speechSynthesis.getVoices().length > 0) speakWithSwedishVoice();
      else window.speechSynthesis.onvoiceschanged = speakWithSwedishVoice;
    }
  }
}

// Helper
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function SpaceInvaders({ words, onWordStatUpdate, onLessonComplete, isDarkMode }) {
  // Filter to absolute beginner words (difficulty 1)
  const pool = useMemo(() => {
    const beginner = (words || []).filter(w => w.difficulty === 1);
    return beginner.length ? beginner : words || [];
  }, [words]);

  const [gameState, setGameState] = useState('ready'); // ready | playing | paused | over | complete
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [playerX, setPlayerX] = useState(150);
  const [bullets, setBullets] = useState([]); // { id, x, y, vy }
  const [invaders, setInvaders] = useState([]); // { id, x, y, word }
  const [dir, setDir] = useState(1); // 1 right, -1 left
  const [targetEnglish, setTargetEnglish] = useState('');
  const [feedback, setFeedback] = useState('');

  const containerRef = useRef(null);
  const loopRef = useRef(null);
  const keysRef = useRef(new Set());
  const lastMoveRef = useRef(Date.now());

  const width = 320;
  const height = 420; // includes header area; playfield ~360
  const playTop = 60; // y start of play area

  const containerBg = isDarkMode ? '#2d2d2d' : '#e1f5fe';
  const titleColor = isDarkMode ? '#64b5f6' : '#0288d1';
  const borderColor = isDarkMode ? '#555555' : 'transparent';

  // Build a wave of invaders from pool
  const buildWave = useCallback((speedFactor = 1) => {
    if (!pool.length) return [];
    const sample = [...pool].sort(() => Math.random() - 0.5).slice(10); // ensure enough variety
    const cols = 6;
    const rows = 3;
    const spacingX = Math.floor((width - 40) / cols);
    const spacingY = 36;
    const inv = [];
    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const w = sample[(idx++) % sample.length];
        inv.push({ id: `inv-${Date.now()}-${r}-${c}`, x: 20 + c * spacingX, y: playTop + 10 + r * spacingY, word: w });
      }
    }
    // Choose the target english from among invaders
    const chosen = inv[Math.floor(Math.random() * inv.length)]?.word;
    setTargetEnglish(chosen ? chosen.english : '');
    // Increase speed by level
    setDir(1);
    return inv;
  }, [pool]);

  // Input listeners
  useEffect(() => {
    const kd = e => keysRef.current.add(e.code);
    const ku = e => keysRef.current.delete(e.code);
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => { window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, []);

  // Start game
  const startGame = () => {
    setScore(0); setLives(3); setLevel(1); setPlayerX(150); setBullets([]);
    setInvaders(buildWave(1));
    setGameState('playing');
  };

  // Fire
  const fire = useCallback(() => {
    setBullets(prev => prev.length > 6 ? prev : [...prev, { id: `b-${Date.now()}`, x: playerX + 12, y: height - 50, vy: -6 }]);
  }, [playerX]);

  // Main loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    loopRef.current = setInterval(() => {
      // Player movement
      setPlayerX(prev => {
        let nx = prev;
        if (keysRef.current.has('ArrowLeft') || keysRef.current.has('KeyA')) nx -= 4;
        if (keysRef.current.has('ArrowRight') || keysRef.current.has('KeyD')) nx += 4;
        return clamp(nx, 6, width - 30);
      });
      if (keysRef.current.has('Space')) {
        // simple rate-limit via time check
        const now = Date.now();
        if (!lastMoveRef.current || now - lastMoveRef.current > 200) {
          fire();
          lastMoveRef.current = now;
        }
      }
      // Bullets update
      setBullets(prev => prev.map(b => ({ ...b, y: b.y + b.vy })).filter(b => b.y > playTop - 20));
      // Invader marching
      setInvaders(prev => {
        if (!prev.length) return prev;
        const hitRight = prev.some(i => i.x >= width - 40);
        const hitLeft = prev.some(i => i.x <= 6);
        let nd = dir;
        if (hitRight && dir === 1) nd = -1; else if (hitLeft && dir === -1) nd = 1;
        if (nd !== dir) setDir(nd);
        // when change direction, move down slightly
        const stepDown = (hitRight && dir === 1) || (hitLeft && dir === -1);
        const marched = prev.map(i => ({ ...i, x: i.x + nd * (1.5 + level * 0.2), y: i.y + (stepDown ? 8 : 0) }));
        return marched;
      });
      // Collisions
      setInvaders(prevInv => {
        let invs = prevInv;
        setBullets(prevBul => {
          let buls = prevBul;
          for (const b of prevBul) {
            const idx = invs.findIndex(i => b.x >= i.x && b.x <= i.x + 28 && b.y >= i.y && b.y <= i.y + 20);
            if (idx >= 0) {
              const hit = invs[idx];
              // Remove bullet
              buls = buls.filter(bb => bb.id !== b.id);
              // Check correctness
              const correct = hit.word.english.toLowerCase() === (targetEnglish || '').toLowerCase();
              if (correct) {
                setScore(s => s + 10);
                setFeedback('✅ Correct target!');
                if (onWordStatUpdate) onWordStatUpdate(hit.word.swedish, hit.word.english, 'correct');
                // Remove hit invader and choose new target from remaining
                const newInv = [...invs.slice(0, idx), ...invs.slice(idx + 1)];
                invs = newInv;
                const available = newInv.length ? newInv : invs;
                const chosen = newInv.length ? newInv[Math.floor(Math.random() * newInv.length)].word : null;
                setTargetEnglish(chosen ? chosen.english : '');
              } else {
                setLives(l => Math.max(0, l - 1));
                setFeedback('❌ Wrong word');
                if (onWordStatUpdate) onWordStatUpdate(hit.word.swedish, hit.word.english, 'incorrect');
              }
              setTimeout(() => setFeedback(''), 800);
              break;
            }
          }
          return buls;
        });
        return invs;
      });
      // Invaders reached bottom → lose life
      setInvaders(prev => {
        if (prev.some(i => i.y >= height - 90)) {
          setLives(l => Math.max(0, l - 1));
          // push them up slightly to avoid instant chain-loss
          return prev.map(i => ({ ...i, y: i.y - 30 }));
        }
        return prev;
      });
    }, 16);
    return () => { if (loopRef.current) clearInterval(loopRef.current); };
  }, [gameState, dir, level, fire, targetEnglish]);

  // Level/win/lose logic
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (!invaders.length && pool.length) {
      // Wave cleared → next level
      setLevel(l => l + 1);
      setInvaders(buildWave(1 + level * 0.2));
      if (level >= 3) {
        setGameState('complete');
        if (typeof onLessonComplete === 'function') onLessonComplete();
      }
    }
  }, [invaders, pool, gameState, level, buildWave, onLessonComplete]);

  useEffect(() => {
    if (lives <= 0 && gameState === 'playing') setGameState('over');
  }, [lives, gameState]);

  const pauseToggle = () => setGameState(s => s === 'playing' ? 'paused' : 'playing');
  const resetGame = () => { setGameState('ready'); setScore(0); setLives(3); setLevel(1); setBullets([]); setInvaders([]); setTargetEnglish(''); };

  if (!pool.length) return <div style={{textAlign:'center',marginTop:'2rem'}}>No beginner words available for practice!</div>;

  return (
    <div style={{
      maxWidth: 360,
      margin: '2rem auto',
      background: containerBg,
      padding: '1.0rem 1.0rem 1.2rem',
      borderRadius: 16,
      boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px #81d4fa',
      textAlign: 'center',
      border: `1px solid ${borderColor}`
    }} ref={containerRef}>
      <h2 style={{color: titleColor, margin: 0, marginBottom: 8}}>Space Invaders: Swedish</h2>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: '0.9rem', color: isDarkMode ? '#ccc' : '#666', marginBottom: 8
      }}>
        <span>Score: <strong>{score}</strong></span>
        <span>Level: <strong>{level}</strong></span>
        <span>Lives: {'❤️'.repeat(lives)}</span>
      </div>

      {gameState === 'ready' && (
        <button onClick={startGame} style={{
          background: '#2193b0', color: '#fff', border: 'none', borderRadius: 8,
          padding: '0.6rem 1.2rem', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', marginBottom: 8
        }}>Start Game</button>
      )}
      {gameState === 'playing' && (
        <button onClick={pauseToggle} style={{
          background: '#f39c12', color: '#fff', border: 'none', borderRadius: 8,
          padding: '0.3rem 0.8rem', fontWeight: 'bold', fontSize: 14, cursor: 'pointer', marginBottom: 8
        }}><MdPause style={{verticalAlign:'middle',marginRight:4}}/>Pause</button>
      )}
      {gameState === 'paused' && (
        <button onClick={pauseToggle} style={{
          background: '#27ae60', color: '#fff', border: 'none', borderRadius: 8,
          padding: '0.3rem 0.8rem', fontWeight: 'bold', fontSize: 14, cursor: 'pointer', marginBottom: 8
        }}><MdPlayArrow style={{verticalAlign:'middle',marginRight:4}}/>Resume</button>
      )}

      <div style={{
        width, height,
        border: `2px solid ${borderColor}`,
        borderRadius: 8,
        background: isDarkMode ? '#111' : '#f8f9fa',
        position: 'relative',
        overflow: 'hidden',
        margin: '0 auto'
      }}>
        {/* Prompt area */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: playTop, display: 'flex', alignItems:'center', justifyContent:'center', gap: 6, color: isDarkMode ? '#ddd' : '#333', fontWeight: 'bold' }}>
          Shoot the Swedish for: <span style={{ color: titleColor }}>{targetEnglish || '...'}</span>
        </div>

        {/* Invaders */}
        {invaders.map(inv => (
          <div key={inv.id} style={{
            position: 'absolute', left: inv.x, top: inv.y, width: 28, height: 20,
            background: '#8e24aa', color: '#fff', border: '2px solid #4a148c', borderRadius: 4,
            display: 'flex', alignItems:'center', justifyContent:'center', fontSize: 10, fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }} title={`${inv.word.swedish}`}>
            <span style={{ pointerEvents: 'none' }}>{inv.word.swedish}</span>
            <button type="button" aria-label={`Play ${inv.word.swedish}`} onClick={() => playSwedish(inv.word.swedish)} style={{ position:'absolute', right:-2, bottom:-2, background:'transparent', border:'none', color:'#fff', cursor:'pointer', fontSize:12 }}>
              <MdVolumeUp />
            </button>
          </div>
        ))}

        {/* Bullets */}
        {bullets.map(b => (
          <div key={b.id} style={{ position: 'absolute', left: b.x, top: b.y, width: 2, height: 10, background: '#ff5252', boxShadow: '0 0 6px rgba(255,82,82,0.8)' }} />
        ))}

        {/* Player */}
        <div style={{ position: 'absolute', left: playerX, top: height - 40, width: 24, height: 14, background: '#2193b0', border: '2px solid #0d47a1', borderRadius: 2 }} />
      </div>

      {feedback && (
        <div style={{ marginTop: 8, fontWeight:'bold', color: feedback.includes('Correct') ? '#27ae60' : '#e74c3c' }}>{feedback}</div>
      )}

      {(gameState === 'over' || gameState === 'complete') && (
        <div style={{ marginTop: 12 }}>
          <h3 style={{ color: gameState === 'complete' ? '#27ae60' : '#e74c3c', margin: 0 }}>{gameState === 'complete' ? '🎉 Wave Complete!' : 'Game Over'}</h3>
          <div style={{ margin: '6px 0' }}>Final Score: <strong>{score}</strong></div>
          <button onClick={resetGame} style={{ background: '#2193b0', color: '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1.0rem', fontWeight: 'bold', cursor: 'pointer' }}>
            <MdRefresh style={{verticalAlign:'middle',marginRight:4}}/>Play Again
          </button>
        </div>
      )}

      {/* Instructions */}
      {gameState === 'ready' && (
        <div style={{ fontSize: '0.85rem', color: isDarkMode ? '#ccc' : '#666', textAlign: 'left', background: isDarkMode ? '#444' : '#f0f0f0', padding: '0.8rem', borderRadius: 8, marginTop: 10 }}>
          <strong>How to play</strong>
          <ul style={{ margin: '0.4rem 0 0 1.1rem' }}>
            <li>Move with Left/Right (or A/D)</li>
            <li>Press Space to shoot</li>
            <li>Target shown at the top: shoot the invader with the matching Swedish word</li>
            <li>Correct hit: +10 points. Wrong hit or invaders reaching the bottom: lose a life</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SpaceInvaders;
