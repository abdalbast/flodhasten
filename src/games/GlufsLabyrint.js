import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

function GlufsLabyrint({ words, onWordStatUpdate, onLessonComplete, isDarkMode }) {
  const pool = useMemo(() => {
    const beginner = (words || []).filter(w => w.difficulty === 1);
    const fallback = [
      { swedish: 'vatten', english: 'water', difficulty: 1 },
      { swedish: 'sol', english: 'sun', difficulty: 1 },
      { swedish: 'man', english: 'man', difficulty: 1 },
      { swedish: 'kvinna', english: 'woman', difficulty: 1 },
      { swedish: 'äta', english: 'eat', difficulty: 1 },
      { swedish: 'sova', english: 'sleep', difficulty: 1 },
      { swedish: 'springa', english: 'run', difficulty: 1 },
      { swedish: 'se', english: 'see', difficulty: 1 },
      { swedish: 'röd', english: 'red', difficulty: 1 },
      { swedish: 'blå', english: 'blue', difficulty: 1 },
      { swedish: 'gul', english: 'yellow', difficulty: 1 },
      { swedish: 'grön', english: 'green', difficulty: 1 }
    ];
    return beginner.length ? beginner : fallback;
  }, [words]);

  const width = 360, height = 420, cell = 20;
  const cols = Math.floor(width / cell), rows = Math.floor((height - 40) / cell);

  const [gameState, setGameState] = useState('ready'); // ready|playing|over|complete
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [grid, setGrid] = useState([]); // 0 wall, 1 dot, 2 empty, 3 word pellet
  const [wordsOnGrid, setWordsOnGrid] = useState([]); // {id,cx,cy,word}
  const [target, setTarget] = useState('');
  const [player, setPlayer] = useState({ cx: 1, cy: 1, vx: 0, vy: 0 });
  const keysRef = useRef(new Set());
  const loopRef = useRef(null);

  const containerBg = isDarkMode ? '#2d2d2d' : '#e1f5fe';
  const titleColor = isDarkMode ? '#64b5f6' : '#0288d1';
  const borderColor = isDarkMode ? '#555555' : 'transparent';

  const buildMaze = useCallback(() => {
    // Simple rectangular maze with some walls
    const g = Array.from({ length: rows }, () => Array(cols).fill(1));
    for (let x = 0; x < cols; x++) { g[0][x] = 0; g[rows - 1][x] = 0; }
    for (let y = 0; y < rows; y++) { g[y][0] = 0; g[y][cols - 1] = 0; }
    for (let y = 2; y < rows - 2; y += 2) {
      for (let x = 2; x < cols - 2; x += 4) { g[y][x] = 0; }
    }
    // Place some empty corridors
    for (let y = 1; y < rows - 1; y++) {
      for (let x = 1; x < cols - 1; x++) {
        if (Math.random() < 0.08) g[y][x] = 0; // extra wall
        else if (g[y][x] !== 0) g[y][x] = 1; // dot by default
      }
    }
    // Place word pellets
    const sample = [...pool].sort(() => Math.random() - 0.5).slice(8);
    const pellets = [];
    let placed = 0;
    while (placed < 6) {
      const cx = 2 + Math.floor(Math.random() * (cols - 4));
      const cy = 2 + Math.floor(Math.random() * (rows - 4));
      if (g[cy][cx] === 1) { g[cy][cx] = 3; pellets.push({ id: `w-${placed}`, cx, cy, word: sample[placed % sample.length] }); placed++; }
    }
    setWordsOnGrid(pellets);
    const targetWord = pellets[Math.floor(Math.random() * pellets.length)]?.word?.english || '';
    setTarget(targetWord);
    return g;
  }, [pool, cols, rows]);

  useEffect(() => {
    const kd = e => keysRef.current.add(e.code);
    const ku = e => keysRef.current.delete(e.code);
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => { window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, []);

  const start = () => {
    setScore(0); setLives(3); setLevel(1);
    setGrid(buildMaze());
    setPlayer({ cx: 1, cy: 1, vx: 0, vy: 0 });
    setGameState('playing');
  };

  const canMove = (cx, cy) => grid[cy] && grid[cy][cx] !== 0;

  useEffect(() => {
    if (gameState !== 'playing') return;
    loopRef.current = setInterval(() => {
      setPlayer(p => {
        let vx = 0, vy = 0;
        if (keysRef.current.has('ArrowLeft') || keysRef.current.has('KeyA')) vx = -1;
        else if (keysRef.current.has('ArrowRight') || keysRef.current.has('KeyD')) vx = 1;
        else if (keysRef.current.has('ArrowUp') || keysRef.current.has('KeyW')) vy = -1;
        else if (keysRef.current.has('ArrowDown') || keysRef.current.has('KeyS')) vy = 1;
        const nx = clamp(p.cx + vx, 0, cols - 1);
        const ny = clamp(p.cy + vy, 0, rows - 1);
        if (canMove(nx, ny)) return { cx: nx, cy: ny, vx, vy };
        return p;
      });
      // Consume dots/words
      setGrid(g => {
        const gg = g.map(row => row.slice());
        const { cx, cy } = player;
        if (gg[cy] && gg[cy][cx] === 1) { gg[cy][cx] = 2; setScore(s => s + 1); }
        if (gg[cy] && gg[cy][cx] === 3) {
          const pellet = wordsOnGrid.find(w => w.cx === cx && w.cy === cy);
          if (pellet) {
            const correct = (pellet.word?.english || '').toLowerCase() === (target || '').toLowerCase();
            if (correct) {
              setScore(s => s + 10);
              if (onWordStatUpdate) onWordStatUpdate(pellet.word.swedish, pellet.word.english, 'correct');
              const remaining = wordsOnGrid.filter(w => !(w.cx === cx && w.cy === cy));
              setWordsOnGrid(remaining);
              gg[cy][cx] = 2;
              if (remaining.length) setTarget(remaining[Math.floor(Math.random() * remaining.length)].word.english);
            } else {
              setLives(l => Math.max(0, l - 1));
              if (onWordStatUpdate) onWordStatUpdate(pellet.word.swedish, pellet.word.english, 'incorrect');
              gg[cy][cx] = 2;
            }
          }
        }
        return gg;
      });
    }, 140);
    return () => { if (loopRef.current) clearInterval(loopRef.current); };
  }, [gameState, player, cols, rows, wordsOnGrid, target, onWordStatUpdate]);

  useEffect(() => {
    if (lives <= 0 && gameState === 'playing') setGameState('over');
  }, [lives, gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      const remainingDots = grid.flat().some(v => v === 1 || v === 3);
      if (!remainingDots) {
        if (level >= 3) { setGameState('complete'); if (typeof onLessonComplete === 'function') onLessonComplete(); }
        else { setLevel(l => l + 1); setGrid(buildMaze()); setPlayer({ cx: 1, cy: 1, vx: 0, vy: 0 }); }
      }
    }
  }, [grid, level, gameState, buildMaze, onLessonComplete]);

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', background: containerBg, padding: '1rem', borderRadius: 16, boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px #81d4fa', border: `1px solid ${borderColor}`, textAlign: 'center' }}>
      <h2 style={{ color: titleColor, margin: 0, marginBottom: 8 }}>Glufs-Glufs Labyrint</h2>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 8, fontSize: '0.9rem', color: isDarkMode ? '#ccc' : '#666' }}>
        <span>Poäng: <strong>{score}</strong></span>
        <span>Nivå: <strong>{level}</strong></span>
        <span>Liv: {'❤️'.repeat(lives)}</span>
      </div>
      {gameState === 'ready' ? (
        <button onClick={start} style={{ background:'#00796b', color:'#fff', border:'none', borderRadius:8, padding:'0.6rem 1rem', fontWeight:'bold', cursor:'pointer', marginBottom: 8 }}>Starta</button>
      ) : (
        <></>
      )}
      <div style={{ width, height, margin:'0 auto', border:`2px solid ${borderColor}`, borderRadius:8, background: isDarkMode ? '#111' : '#f8f9fa', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', left:0, right:0, top:0, height: 40, display:'flex', alignItems:'center', justifyContent:'center', gap:6, color: isDarkMode ? '#ddd' : '#333', fontWeight:'bold' }}>
          Hitta ordet för: <span style={{ color: titleColor }}>{target || '...'}</span>
        </div>
        {/* draw maze */}
        {grid.map((row, y) => row.map((v, x) => (
          v === 0 ? <div key={`w-${x}-${y}`} style={{ position:'absolute', left:x*cell, top:40+y*cell, width:cell, height:cell, background:'#263238' }} />
          : v === 1 ? <div key={`d-${x}-${y}`} style={{ position:'absolute', left:x*cell + cell/2 - 2, top:40+y*cell + cell/2 - 2, width:4, height:4, background:'#90a4ae', borderRadius:2 }} />
          : v === 3 ? <div key={`p-${x}-${y}`} style={{ position:'absolute', left:x*cell + 2, top:40+y*cell + 2, padding:'2px 4px', background:'#8e24aa', color:'#fff', borderRadius:4, fontSize:10, border:'1px solid #4a148c' }}>{wordsOnGrid.find(w=>w.cx===x&&w.cy===y)?.word?.swedish}</div>
          : null
        )))}
        {/* player */}
        <div style={{ position:'absolute', left: player.cx*cell + 4, top: 40 + player.cy*cell + 4, width: cell-8, height: cell-8, background:'#ffca28', border:'2px solid #f57f17', borderRadius: '50%' }} />
      </div>
      {(gameState === 'over' || gameState === 'complete') && (
        <div style={{ marginTop: 10 }}>
          <h3 style={{ color: gameState === 'complete' ? '#27ae60' : '#e74c3c', margin: 0 }}>{gameState === 'complete' ? '🎉 Klar!' : 'Game Over'}</h3>
        </div>
      )}
    </div>
  );
}

export default GlufsLabyrint;
