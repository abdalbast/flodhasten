import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { MdPause, MdPlayArrow, MdRefresh, MdVolumeUp } from 'react-icons/md';
import ttsApi from '../utils/ttsApi';

async function playSwedish(word) {
  try {
    await ttsApi.playSwedish(word);
  } catch (e) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const speak = () => {
        const voices = window.speechSynthesis.getVoices();
        const sv = voices.find(v => v.name.toLowerCase().includes('alva') && v.lang === 'sv-SE');
        const u = new SpeechSynthesisUtterance(word);
        u.lang = 'sv-SE'; u.rate = 0.6; u.pitch = 1; u.volume = 1;
        if (sv) u.voice = sv; window.speechSynthesis.speak(u);
      };
      if (window.speechSynthesis.getVoices().length > 0) speak(); else window.speechSynthesis.onvoiceschanged = speak;
    }
  }
}

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

function OrdInkraektare({ words, onWordStatUpdate, onLessonComplete, isDarkMode }) {
  const pool = useMemo(() => {
    const beginner = (words || []).filter(w => w.difficulty === 1);
    // Fall back to provided beginner nouns if needed
    const fallback = [
      { swedish: 'hus', english: 'house', difficulty: 1 },
      { swedish: 'bil', english: 'car', difficulty: 1 },
      { swedish: 'äpple', english: 'apple', difficulty: 1 },
      { swedish: 'hund', english: 'dog', difficulty: 1 },
      { swedish: 'katt', english: 'cat', difficulty: 1 },
      { swedish: 'bok', english: 'book', difficulty: 1 },
      { swedish: 'bord', english: 'table', difficulty: 1 },
      { swedish: 'stol', english: 'chair', difficulty: 1 }
    ];
    const base = beginner.length ? beginner : fallback;
    return base.sort(() => Math.random() - 0.5);
  }, [words]);

  const [gameState, setGameState] = useState('ready'); // ready|playing|paused|over|complete
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [cannonX, setCannonX] = useState(140);
  const [bullets, setBullets] = useState([]); // {id,x,y,vy}
  const [invaders, setInvaders] = useState([]); // {id,x,y,word}
  const [target, setTarget] = useState(null); // english string
  const keysRef = useRef(new Set());
  const loopRef = useRef(null);
  const lastFireRef = useRef(0);

  const width = 320, height = 420, promptH = 60;
  const containerBg = isDarkMode ? '#2d2d2d' : '#e1f5fe';
  const titleColor = isDarkMode ? '#64b5f6' : '#0288d1';
  const borderColor = isDarkMode ? '#555555' : 'transparent';

  const buildGrid = useCallback(() => {
    const cols = 6, rows = 3, sx = Math.floor((width - 40) / cols), sy = 34;
    const sample = [...pool].sort(() => Math.random() - 0.5);
    const items = [];
    let k = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const w = sample[k++ % sample.length];
        items.push({ id: `i-${Date.now()}-${r}-${c}`, x: 20 + c * sx, y: promptH + 8 + r * sy, word: w });
      }
    }
    const chosen = items[Math.floor(Math.random() * items.length)]?.word?.english || '';
    setTarget(chosen);
    return items;
  }, [pool]);

  useEffect(() => {
    const kd = e => keysRef.current.add(e.code);
    const ku = e => keysRef.current.delete(e.code);
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => { window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, []);

  const start = () => {
    setScore(0); setLives(3); setLevel(1); setCannonX(140); setBullets([]);
    setInvaders(buildGrid());
    setGameState('playing');
  };

  const fire = useCallback(() => {
    const now = Date.now();
    if (now - lastFireRef.current < 180) return;
    lastFireRef.current = now;
    setBullets(b => [...b, { id: `b-${now}`, x: cannonX + 10, y: height - 52, vy: -6 }]);
  }, [cannonX]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    loopRef.current = setInterval(() => {
      setCannonX(x => {
        if (keysRef.current.has('ArrowLeft') || keysRef.current.has('KeyA')) x -= 4;
        if (keysRef.current.has('ArrowRight') || keysRef.current.has('KeyD')) x += 4;
        return clamp(x, 6, width - 30);
      });
      if (keysRef.current.has('Space')) fire();

      setBullets(bs => bs.map(b => ({ ...b, y: b.y + b.vy })).filter(b => b.y > promptH - 10));
      setInvaders(list => list.map(i => ({ ...i, y: i.y + 0.3 + level * 0.15 })));

      // collisions
      setInvaders(prevInv => {
        let invs = prevInv;
        setBullets(prevBul => {
          let buls = prevBul;
          for (const b of prevBul) {
            const idx = invs.findIndex(i => b.x >= i.x && b.x <= i.x + 28 && b.y >= i.y && b.y <= i.y + 18);
            if (idx >= 0) {
              const hit = invs[idx];
              buls = buls.filter(bb => bb.id !== b.id);
              const correct = (hit.word?.english || '').toLowerCase() === (target || '').toLowerCase();
              if (correct) {
                setScore(s => s + 10);
                if (onWordStatUpdate) onWordStatUpdate(hit.word.swedish, hit.word.english, 'correct');
                const next = [...invs.slice(0, idx), ...invs.slice(idx + 1)];
                invs = next;
                const chosen = next.length ? next[Math.floor(Math.random() * next.length)].word.english : '';
                setTarget(chosen);
              } else {
                setLives(l => Math.max(0, l - 1));
                if (onWordStatUpdate) onWordStatUpdate(hit.word.swedish, hit.word.english, 'incorrect');
              }
              break;
            }
          }
          return buls;
        });
        return invs;
      });

      // reached bottom
      setInvaders(prev => {
        if (prev.some(i => i.y >= height - 86)) {
          setLives(l => Math.max(0, l - 1));
          return prev.map(i => ({ ...i, y: i.y - 20 }));
        }
        return prev;
      });
    }, 16);
    return () => { if (loopRef.current) clearInterval(loopRef.current); };
  }, [gameState, level, fire, target]);

  useEffect(() => {
    if (lives <= 0 && gameState === 'playing') setGameState('over');
  }, [lives, gameState]);

  useEffect(() => {
    if (!invaders.length && gameState === 'playing') {
      if (level >= 3) { setGameState('complete'); if (typeof onLessonComplete === 'function') onLessonComplete(); }
      else { setLevel(l => l + 1); setInvaders(buildGrid()); }
    }
  }, [invaders, level, gameState, buildGrid, onLessonComplete]);

  const pauseToggle = () => setGameState(s => s === 'playing' ? 'paused' : 'playing');
  const reset = () => { setGameState('ready'); setScore(0); setLives(3); setLevel(1); setBullets([]); setInvaders([]); setTarget(''); };

  return (
    <div style={{ maxWidth: 360, margin: '2rem auto', background: containerBg, padding: '1rem', borderRadius: 16, boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px #81d4fa', border: `1px solid ${borderColor}` }}>
      <h2 style={{ color: titleColor, margin: 0, marginBottom: 8 }}>Ord-Inkräktare</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem', color: isDarkMode ? '#ccc' : '#666' }}>
        <span>Poäng: <strong>{score}</strong></span>
        <span>Nivå: <strong>{level}</strong></span>
        <span>Liv: {'❤️'.repeat(lives)}</span>
      </div>
      {gameState === 'ready' && <button onClick={start} style={{ background: '#1565c0', color: '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: 8 }}>Starta</button>}
      {gameState === 'playing' && <button onClick={pauseToggle} style={{ background: '#f39c12', color: '#fff', border: 'none', borderRadius: 8, padding: '0.3rem 0.8rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: 8 }}><MdPause style={{verticalAlign:'middle',marginRight:4}}/>Paus</button>}
      {gameState === 'paused' && <button onClick={pauseToggle} style={{ background: '#27ae60', color: '#fff', border: 'none', borderRadius: 8, padding: '0.3rem 0.8rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: 8 }}><MdPlayArrow style={{verticalAlign:'middle',marginRight:4}}/>Fortsätt</button>}

      <div style={{ width, height, border: `2px solid ${borderColor}`, borderRadius: 8, background: isDarkMode ? '#111' : '#f8f9fa', position: 'relative', overflow: 'hidden', margin: '0 auto' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: promptH, display: 'flex', alignItems:'center', justifyContent:'center', gap: 6, color: isDarkMode ? '#ddd' : '#333', fontWeight: 'bold' }}>
          Skjut ordet för: <span style={{ color: titleColor }}>{target || '...'}</span>
        </div>
        {invaders.map(i => (
          <div key={i.id} title={`${i.word.swedish}`} style={{ position: 'absolute', left: i.x, top: i.y, width: 28, height: 18, background: '#8e24aa', color:'#fff', border: '2px solid #4a148c', borderRadius: 4, display:'flex', alignItems:'center', justifyContent:'center', fontSize: 10, fontWeight:'bold' }}>
            <span style={{ pointerEvents:'none' }}>{i.word.swedish}</span>
            <button type="button" aria-label={`Play ${i.word.swedish}`} onClick={() => playSwedish(i.word.swedish)} style={{ position:'absolute', right:-2, bottom:-2, background:'transparent', border:'none', color:'#fff', cursor:'pointer', fontSize:12 }}>
              <MdVolumeUp />
            </button>
          </div>
        ))}
        {bullets.map(b => (<div key={b.id} style={{ position:'absolute', left:b.x, top:b.y, width:2, height:10, background:'#ff5252', boxShadow:'0 0 6px rgba(255,82,82,0.8)' }} />))}
        <div style={{ position:'absolute', left:cannonX, top: height - 40, width:24, height:14, background:'#1565c0', border:'2px solid #0d47a1', borderRadius: 2 }} />
      </div>

      {(gameState === 'over' || gameState === 'complete') && (
        <div style={{ marginTop: 10 }}>
          <h3 style={{ color: gameState === 'complete' ? '#27ae60' : '#e74c3c', margin: 0 }}>{gameState === 'complete' ? '🎉 Klar!' : 'Game Over'}</h3>
          <button onClick={reset} style={{ background:'#1565c0', color:'#fff', border:'none', borderRadius:8, padding:'0.6rem 1.0rem', fontWeight:'bold', cursor:'pointer', marginTop: 6 }}><MdRefresh style={{verticalAlign:'middle',marginRight:4}}/>Spela igen</button>
        </div>
      )}
    </div>
  );
}

export default OrdInkraektare;
