import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MdVolumeUp, MdPause, MdPlayArrow, MdRefresh, MdTimer, MdStar, MdFavorite, MdSportsKabaddi } from 'react-icons/md';
import ttsApi from '../utils/ttsApi';

// Utilities
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
const randBetween = (min, max) => Math.random() * (max - min) + min;
const choice = arr => arr[Math.floor(Math.random() * arr.length)];

// TTS helper
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

// Prompt types
const PROMPT_TYPES = {
  TRANSLATE: 'translate',
  MULTIPLE_CHOICE: 'multiple_choice',
  FILL_BLANK: 'fill_blank',
};

// Build a prompt from a word and pool
function buildPrompt(word, pool, type = PROMPT_TYPES.TRANSLATE) {
  if (type === PROMPT_TYPES.TRANSLATE) {
    return { type, question: `Translate "${word.swedish}" to English`, answer: word.english, options: null };
  }
  if (type === PROMPT_TYPES.MULTIPLE_CHOICE) {
    const wrongs = pool.filter(w => w.english !== word.english).sort(() => Math.random() - 0.5).slice(3);
    const options = [word.english, ...wrongs.slice(0, 3).map(w => w.english)].sort(() => Math.random() - 0.5);
    return { type, question: `Pick the English for "${word.swedish}"`, answer: word.english, options };
  }
  if (type === PROMPT_TYPES.FILL_BLANK) {
    const blanks = word.english.length > 2 ? word.english[0] + '_'.repeat(Math.max(1, word.english.length - 2)) + word.english.slice(-1) : '_ _';
    return { type, question: `Fill the blank for: ${blanks}`, answer: word.english, options: null };
  }
  return { type: PROMPT_TYPES.TRANSLATE, question: `Translate "${word.swedish}" to English`, answer: word.english, options: null };
}

// Main component
function MarioLanguage({ words, onWordStatUpdate, onLessonComplete, isDarkMode }) {
  // Themed level config (Food theme example)
  const beginnerWords = words.filter(w => w.difficulty === 1);
  const wordPool = (beginnerWords.length ? beginnerWords : words).slice(0, 40);

  const [gameState, setGameState] = useState('ready'); // ready | playing | paused | boss | levelComplete | gameOver
  const [timeElapsedMs, setTimeElapsedMs] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [player, setPlayer] = useState({ x: 40, y: 320, vx: 0, vy: 0, onGround: true, dir: 1 });
  const [platforms, setPlatforms] = useState([]);
  const [collectables, setCollectables] = useState([]);
  const [doors, setDoors] = useState([]);
  const [boss, setBoss] = useState(null); // { x, y, hp, projectiles: [] }
  const [challenge, setChallenge] = useState(null); // { prompt, onResolve }
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [wordsLearned, setWordsLearned] = useState([]);

  // Refs
  const loopRef = useRef(null);
  const startTimeRef = useRef(null);
  const keysRef = useRef(new Set());

  // Physics constants
  const GRAVITY = 0.6;
  const JUMP_POWER = -17.5;
  const MOVE_ACCEL = 0.55;
  const MAX_SPEED = 5.8;
  const MAX_FALL = 12;
  const GROUND_FRICTION = 0.85;
  const AIR_DRAG = 0.96;

  // UI colours
  const containerBg = isDarkMode ? '#1b1b1b' : '#e9f3ff';
  const ink = isDarkMode ? '#e6f2ff' : '#083b66';
  const panelBg = isDarkMode ? '#2a2a2a' : '#f4f7fb';
  const border = isDarkMode ? '#4b4b4b' : '#cfe3ff';

  // Generate level content
  const generateLevel = useCallback(() => {
    // Basic terrain
    const base = [
      { x: 0, y: 360, w: 1200, h: 40, kind: 'ground' },
      { x: 180, y: 290, w: 120, h: 12, kind: 'platform' },
      { x: 360, y: 240, w: 120, h: 12, kind: 'platform' },
      { x: 540, y: 200, w: 120, h: 12, kind: 'platform' },
      { x: 780, y: 260, w: 120, h: 12, kind: 'platform' },
      { x: 980, y: 220, w: 120, h: 12, kind: 'platform' },
    ];

    // Random collectables from wordPool
    const promptTypes = [PROMPT_TYPES.TRANSLATE, PROMPT_TYPES.MULTIPLE_CHOICE, PROMPT_TYPES.FILL_BLANK];
    const collectibles = Array.from({ length: 10 }, (_, i) => {
      const w = choice(wordPool);
      const type = choice(promptTypes);
      return {
        id: `c-${Date.now()}-${i}`,
        x: 160 + i * 90 + randBetween(-20, 20),
        y: 160 + (i % 2 === 0 ? 0 : -30),
        kind: i % 2 === 0 ? 'coin' : 'gem',
        word: w,
        prompt: buildPrompt(w, wordPool, type),
        collected: false,
      };
    });

    // Door requiring multi-step task (3 prompts)
    const doorWords = wordPool.sort(() => Math.random() - 0.5).slice(0, 3);
    const doorPrompts = doorWords.map((w, idx) => buildPrompt(w, wordPool, promptTypes[idx % promptTypes.length]));
    const checkpoints = [
      { id: 'door-1', x: 1120, y: 160, w: 40, h: 100, prompts: doorPrompts, progress: 0, unlocked: false }
    ];

    setPlatforms(base);
    setCollectables(collectibles);
    setDoors(checkpoints);
    setBoss(null);
    setPlayer({ x: 40, y: 320, vx: 0, vy: 0, onGround: true, dir: 1 });
  }, [wordPool]);

  // Input handlers
  useEffect(() => {
    const kd = e => keysRef.current.add(e.code);
    const ku = e => keysRef.current.delete(e.code);
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => { window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, []);

  // Start/stop loop
  useEffect(() => {
    if (gameState === 'playing' || gameState === 'boss') {
      if (!startTimeRef.current) startTimeRef.current = Date.now();
      loopRef.current = setInterval(() => tick(), 16);
    } else {
      if (loopRef.current) { clearInterval(loopRef.current); loopRef.current = null; }
    }
    return () => { if (loopRef.current) clearInterval(loopRef.current); };
  }, [gameState]);

  // Tick
  const tick = useCallback(() => {
    setTimeElapsedMs(Date.now() - (startTimeRef.current || Date.now()));

    // Movement
    setPlayer(prev => {
      let vx = prev.vx; let vy = prev.vy + GRAVITY; let x = prev.x; let y = prev.y; let onGround = false; let dir = prev.dir;

      const left = keysRef.current.has('ArrowLeft') || keysRef.current.has('KeyA');
      const right = keysRef.current.has('ArrowRight') || keysRef.current.has('KeyD');
      const jumpPressed = keysRef.current.has('Space') || keysRef.current.has('ArrowUp') || keysRef.current.has('KeyW');

      if (left && !right) { vx = clamp(vx - MOVE_ACCEL, -MAX_SPEED, MAX_SPEED); dir = -1; }
      else if (right && !left) { vx = clamp(vx + MOVE_ACCEL, -MAX_SPEED, MAX_SPEED); dir = 1; }
      else { vx *= prev.onGround ? GROUND_FRICTION : AIR_DRAG; if (Math.abs(vx) < 0.05) vx = 0; }

      if (jumpPressed && prev.onGround) { vy = JUMP_POWER; onGround = false; }
      if (jumpPressed && vy < 0) vy += 0.7; // variable jump height

      vy = Math.min(vy, MAX_FALL); x += vx; y += vy;

      // Collisions
      platforms.forEach(p => {
        if (x < p.x + p.w && x + 28 > p.x && y < p.y + p.h && y + 28 > p.y) {
          // Resolve by axis
          const fromTop = prev.y + 28 <= p.y;
          const fromBottom = prev.y >= p.y + p.h;
          const fromLeft = prev.x + 28 <= p.x;
          const fromRight = prev.x >= p.x + p.w;

          if (fromTop && vy > 0) { y = p.y - 28; vy = 0; onGround = true; vx *= 0.9; }
          else if (fromBottom && vy < 0) { y = p.y + p.h; vy = 0; }
          else if (fromLeft && vx > 0) { x = p.x - 28; vx = 0; }
          else if (fromRight && vx < 0) { x = p.x + p.w; vx = 0; }
        }
      });

      // Bounds
      x = clamp(x, 0, 1172); if (y > 332) { y = 332; vy = 0; onGround = true; }

      return { x, y, vx, vy, onGround, dir };
    });

    // Collectables
    setCollectables(prev => prev.map(c => {
      if (c.collected) return c;
      const px = player.x, py = player.y;
      if (px < c.x + 18 && px + 28 > c.x && py < c.y + 18 && py + 28 > c.y) {
        // Pause and ask prompt
        setChallenge({ prompt: c.prompt, onResolve: (correct) => {
          if (correct) {
            setScore(s => s + (c.kind === 'coin' ? 5 : 10));
            if (onWordStatUpdate) onWordStatUpdate(c.word.swedish, c.word.english, 'correct');
            setWordsLearned(list => [...list, c.word.swedish]);
          } else {
            setLives(l => Math.max(0, l - 1));
            if (onWordStatUpdate) onWordStatUpdate(c.word.swedish, c.word.english, 'incorrect');
          }
          setCollectables(curr => curr.map(x => x.id === c.id ? { ...x, collected: correct } : x));
        }});
        setGameState('paused');
      }
      return c;
    }));

    // Doors
    setDoors(prev => prev.map(d => {
      const px = player.x, py = player.y;
      const touching = (px < d.x + d.w && px + 28 > d.x && py < d.y + d.h && py + 28 > d.y);
      if (!d.unlocked && touching) {
        // Ask the next prompt until unlocked
        const current = d.prompts[d.progress];
        setChallenge({ prompt: current, onResolve: (correct) => {
          setDoors(curr => curr.map(x => {
            if (x.id !== d.id) return x;
            const prog = correct ? x.progress + 1 : x.progress;
            return { ...x, progress: prog, unlocked: prog >= x.prompts.length };
          }));
          if (!correct) setLives(l => Math.max(0, l - 1));
        }});
        setGameState('paused');
      }
      return d;
    }));

    // Boss trigger when end reached and door unlocked
    if (!boss && player.x > 1100 && doors.every(d => d.unlocked)) {
      setGameState('boss');
      setBoss({ x: 1080, y: 80, hp: 3, projectiles: [] });
    }

    // Boss behaviour
    if (gameState === 'boss' && boss) {
      // Fire projectiles intermittently with prompts
      if (Math.random() < 0.04 && boss.projectiles.length < 3) {
        const w = choice(wordPool);
        const type = choice([PROMPT_TYPES.TRANSLATE, PROMPT_TYPES.MULTIPLE_CHOICE]);
        const prompt = buildPrompt(w, wordPool, type);
        const proj = { id: `p-${Date.now()}`, x: boss.x, y: boss.y + randBetween(-10, 40), vx: -3.2, vy: randBetween(-0.4, 0.4), prompt, word: w };
        setBoss(b => ({ ...b, projectiles: [...b.projectiles, proj] }));
      }
      // Move projectiles
      setBoss(prev => {
        if (!prev) return prev;
        const updated = prev.projectiles.map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy }));
        return { ...prev, projectiles: updated.filter(p => p.x > -40) };
      });
      // Check collision with player
      if (boss.projectiles.some(p => player.x < p.x + 16 && player.x + 28 > p.x && player.y < p.y + 16 && player.y + 28 > p.y)) {
        // Hit → lose life and remove one projectile
        setLives(l => Math.max(0, l - 1));
        setBoss(prev => prev ? { ...prev, projectiles: prev.projectiles.slice(1) } : prev);
      }
    }
  }, [platforms, player, doors, boss, gameState, wordPool, onWordStatUpdate]);

  // Challenge submit
  const submitChallenge = useCallback((e) => {
    e.preventDefault();
    if (!challenge || !challenge.prompt) return;
    const correct = input.trim().toLowerCase() === challenge.prompt.answer.toLowerCase();
    setFeedback(correct ? '✅ Correct' : '❌ Incorrect');

    // If in boss state, correct answers damage boss instead of pausing
    if (gameState === 'boss') {
      if (correct) {
        setBoss(prev => prev ? { ...prev, hp: prev.hp - 1, projectiles: prev.projectiles.slice(1) } : prev);
        setScore(s => s + 15);
      } else {
        setLives(l => Math.max(0, l - 1));
      }
    } else if (challenge.onResolve) {
      challenge.onResolve(correct);
    }

    setTimeout(() => {
      setFeedback('');
      setInput('');
      if (gameState !== 'boss') setGameState('playing');
    }, 700);
  }, [challenge, input, gameState]);

  // Boss end conditions
  useEffect(() => {
    if (gameState === 'boss' && boss && boss.hp <= 0) {
      setGameState('levelComplete');
      setTimeout(() => { if (typeof onLessonComplete === 'function') onLessonComplete(); }, 1200);
    }
  }, [gameState, boss, onLessonComplete]);

  // Loss conditions
  useEffect(() => {
    if (lives <= 0 && (gameState === 'playing' || gameState === 'boss' || gameState === 'paused')) {
      setGameState('gameOver');
    }
  }, [lives, gameState]);

  // Start game
  const startGame = () => {
    setScore(0); setLives(3); setWordsLearned([]); setTimeElapsedMs(0); startTimeRef.current = Date.now();
    generateLevel();
    setGameState('playing');
  };

  const togglePause = () => setGameState(s => s === 'paused' ? 'playing' : 'paused');
  const resetGame = () => { setGameState('ready'); setBoss(null); setDoors([]); setCollectables([]); setPlatforms([]); setPlayer({ x: 40, y: 320, vx: 0, vy: 0, onGround: true, dir: 1 }); setInput(''); setFeedback(''); };

  if (!wordPool.length) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>No beginner words available!</div>;

  return (
    <div style={{
      maxWidth: 1200,
      margin: '2rem auto',
      background: containerBg,
      padding: '1.5rem',
      borderRadius: 16,
      border: `1px solid ${border}`,
      color: ink,
      boxShadow: isDarkMode ? '0 6px 18px rgba(0,0,0,0.4)' : '0 6px 18px rgba(8,59,102,0.08)'
    }}>
      <h2 style={{ margin: 0, textAlign: 'center' }}>Mario Language Learning Game (Game #9)</h2>

      {/* HUD */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0', background: panelBg, padding: '0.6rem 0.8rem', borderRadius: 10, border: `1px solid ${border}` }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><MdStar /> Score: <strong>{score}</strong></span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><MdFavorite /> Lives: <strong>{'❤'.repeat(lives)}</strong></span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><MdTimer /> Time: <strong>{(timeElapsedMs/1000).toFixed(1)}s</strong></span>
          {gameState === 'ready' && <button onClick={startGame} style={{ background: '#1e88e5', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 0.9rem', fontWeight: 'bold', cursor: 'pointer' }}>Start</button>}
          {gameState === 'playing' && <button onClick={togglePause} style={{ background: '#f39c12', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 0.9rem', fontWeight: 'bold', cursor: 'pointer' }}><MdPause /> Pause</button>}
          {gameState === 'paused' && <button onClick={togglePause} style={{ background: '#2ecc71', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 0.9rem', fontWeight: 'bold', cursor: 'pointer' }}><MdPlayArrow /> Resume</button>}
        </div>
      </div>

      {/* Game World */}
      <div style={{ position: 'relative', width: 1200, height: 400, margin: '0 auto', borderRadius: 12, overflow: 'hidden', background: isDarkMode ? 'linear-gradient(#243447, #0f2027)' : 'linear-gradient(#b3e5fc, #e8f5e9)', border: `1px solid ${border}` }}>
        {/* Pixel clouds / retro grid */}
        {Array.from({ length: 10 }, (_, i) => (
          <div key={`c-${i}`} style={{ position: 'absolute', top: 20 + (i%3)*30, left: 40 + i*110, width: 36, height: 12, background: 'rgba(255,255,255,0.6)', boxShadow: '12px 4px 0 rgba(255,255,255,0.5), 24px 6px 0 rgba(255,255,255,0.4)' }} />
        ))}

        {/* Platforms */}
        {platforms.map((p, idx) => (
          <div key={`p-${idx}`} style={{ position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h, background: p.kind === 'ground' ? '#6d4c41' : '#2e7d32', border: '2px solid #3e2723', borderRadius: p.kind === 'ground' ? 0 : 4 }} />
        ))}

        {/* Collectables */}
        {collectables.filter(c => !c.collected).map(c => (
          <div key={c.id} title={`${c.word.swedish} → ?`} style={{ position: 'absolute', left: c.x, top: c.y, width: 18, height: 18, background: c.kind === 'coin' ? '#ffd600' : '#ff80ab', border: '2px solid #ffb300', borderRadius: 4, boxShadow: '0 2px 0 rgba(0,0,0,0.2)' }} />
        ))}

        {/* Doors / checkpoints */}
        {doors.map(d => (
          <div key={d.id} style={{ position: 'absolute', left: d.x, top: d.y, width: d.w, height: d.h, background: d.unlocked ? '#4caf50' : '#c62828', border: '3px solid #4e342e', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>{d.unlocked ? '✓' : `${d.progress}/${d.prompts.length}`}</div>
        ))}

        {/* Boss */}
        {gameState === 'boss' && boss && (
          <>
            <div style={{ position: 'absolute', left: boss.x, top: boss.y, width: 40, height: 40, background: '#8e24aa', border: '3px solid #4a148c', borderRadius: 6, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{boss.hp}</div>
            {boss.projectiles.map(p => (
              <div key={p.id} style={{ position: 'absolute', left: p.x, top: p.y, width: 16, height: 16, background: '#ff7043', border: '2px solid #bf360c', borderRadius: 3 }} />
            ))}
            <div style={{ position: 'absolute', left: 960, top: 20, color: '#fff', background: '#6a1b9a', padding: '6px 10px', borderRadius: 8, border: '2px solid #4a148c', display: 'inline-flex', alignItems: 'center', gap: 6 }}><MdSportsKabaddi /> Boss Battle</div>
          </>
        )}

        {/* Player */}
        <div style={{ position: 'absolute', left: player.x, top: player.y, width: 28, height: 28, background: '#ef5350', border: '2px solid #b71c1c', borderRadius: 4, transform: `scaleX(${player.dir})` }} />
      </div>

      {/* Challenge Modal / Boss Answer Bar */}
      {(gameState === 'paused' || gameState === 'boss') && (
        <div style={{ marginTop: '1rem', background: panelBg, padding: '1rem', borderRadius: 12, border: `1px solid ${border}` }}>
          <h4 style={{ margin: 0 }}>{challenge?.prompt?.question || (gameState === 'boss' ? 'Answer quickly to damage the boss!' : '')}</h4>

          {challenge?.prompt?.type === PROMPT_TYPES.MULTIPLE_CHOICE && challenge.prompt.options && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
              {challenge.prompt.options.map(opt => (
                <button key={opt} onClick={(e) => { e.preventDefault(); setInput(opt); }} style={{ background: '#1e88e5', color: '#fff', border: 'none', borderRadius: 8, padding: '0.4rem 0.8rem', cursor: 'pointer' }}>{opt}</button>
              ))}
            </div>
          )}

          <form onSubmit={submitChallenge} style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your answer..." autoFocus style={{ flex: 1, padding: 10, borderRadius: 8, border: `1px solid ${border}` }} />
            <button type="submit" style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 8, padding: '0 16px', fontWeight: 'bold', cursor: 'pointer' }}>Submit</button>
            {challenge?.prompt && (
              <button type="button" onClick={() => playSwedish(challenge.prompt.type === PROMPT_TYPES.FILL_BLANK ? (challenge.prompt.answer) : (challenge.prompt.question.match(/"(.+)"/)?.[1] || ''))} style={{ background: '#8e24aa', color: '#fff', border: 'none', borderRadius: 8, padding: '0 12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}><MdVolumeUp /> Hear</button>
            )}
          </form>
          {feedback && <div style={{ marginTop: 8, fontWeight: 'bold', color: feedback.includes('Correct') ? '#2e7d32' : '#c62828' }}>{feedback}</div>}
        </div>
      )}

      {/* Post-level panels */}
      {gameState === 'levelComplete' && (
        <div style={{ marginTop: '1rem', background: panelBg, padding: '1rem', borderRadius: 12, border: `1px solid ${border}` }}>
          <h3 style={{ marginTop: 0 }}>🎉 Level Complete!</h3>
          <div>Score: <strong>{score}</strong></div>
          <div>Time: <strong>{(timeElapsedMs/1000).toFixed(1)}s</strong></div>
          <div>Words learned: <strong>{[...new Set(wordsLearned)].length}</strong></div>
          <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[...new Set(wordsLearned)].slice(0, 20).map(w => (<span key={w} style={{ background: '#e0f2f1', color: '#00695c', padding: '2px 8px', borderRadius: 12, border: '1px solid #80cbc4' }}>{w}</span>))}
          </div>
          <div style={{ marginTop: 12 }}>
            <button onClick={resetGame} style={{ background: '#1e88e5', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', fontWeight: 'bold', cursor: 'pointer' }}><MdRefresh /> Play Again</button>
          </div>
        </div>
      )}

      {gameState === 'gameOver' && (
        <div style={{ marginTop: '1rem', background: panelBg, padding: '1rem', borderRadius: 12, border: `1px solid ${border}` }}>
          <h3 style={{ marginTop: 0, color: '#c62828' }}>Game Over</h3>
          <div>Score: <strong>{score}</strong></div>
          <div>Time: <strong>{(timeElapsedMs/1000).toFixed(1)}s</strong></div>
          <div style={{ marginTop: 12 }}>
            <button onClick={resetGame} style={{ background: '#1e88e5', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', fontWeight: 'bold', cursor: 'pointer' }}><MdRefresh /> Try Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarioLanguage;
