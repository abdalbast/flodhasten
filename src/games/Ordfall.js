import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';

function Ordfall({ words, onWordStatUpdate, onLessonComplete, isDarkMode }) {
  const pool = useMemo(() => {
    const beginner = (words || []).filter(w => w.difficulty === 1);
    const fallback = [
      { swedish: 'hus', english: 'house', difficulty: 1 },
      { swedish: 'stor', english: 'big', difficulty: 1 },
      { swedish: 'liten', english: 'small', difficulty: 1 },
      { swedish: 'glad', english: 'happy', difficulty: 1 },
      { swedish: 'ledsen', english: 'sad', difficulty: 1 },
      { swedish: 'ost', english: 'cheese', difficulty: 1 },
      { swedish: 'bröd', english: 'bread', difficulty: 1 },
      { swedish: 'fågel', english: 'bird', difficulty: 1 },
      { swedish: 'fisk', english: 'fish', difficulty: 1 },
      { swedish: 'mamma', english: 'mom', difficulty: 1 },
      { swedish: 'pappa', english: 'dad', difficulty: 1 }
    ];
    return (beginner.length ? beginner : fallback).slice(0, 20);
  }, [words]);

  const width = 260, height = 420, cell = 26, cols = Math.floor(width / cell), rows = Math.floor((height - 60) / cell);
  const [gameState, setGameState] = useState('ready');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [grid, setGrid] = useState([]); // bottom match targets: array of {col, text}
  const [piece, setPiece] = useState(null); // {col,row,text,isSwedish,match}
  const [tickMs, setTickMs] = useState(700);
  const loopRef = useRef(null);

  const containerBg = isDarkMode ? '#2d2d2d' : '#e1f5fe';
  const titleColor = isDarkMode ? '#64b5f6' : '#0288d1';
  const borderColor = isDarkMode ? '#555555' : 'transparent';

  const buildTargets = useCallback(() => {
    const sample = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(cols, pool.length));
    // alternate Swedish/English at bottom
    return sample.map((w, idx) => ({ col: idx, text: idx % 2 === 0 ? w.english : w.swedish, swedish: w.swedish, english: w.english }));
  }, [pool, cols]);

  const spawnPiece = useCallback(() => {
    const w = pool[Math.floor(Math.random() * pool.length)];
    const isSwedish = Math.random() < 0.5;
    const text = isSwedish ? w.swedish : w.english;
    const match = isSwedish ? w.english : w.swedish;
    setPiece({ col: Math.floor(cols / 2), row: 0, text, isSwedish, match });
  }, [pool, cols]);

  const start = () => {
    setScore(0); setLevel(1); setGrid(buildTargets()); setTickMs(700);
    spawnPiece();
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    loopRef.current = setInterval(() => {
      setPiece(p => {
        if (!p) return p;
        const nr = p.row + 1;
        if (nr >= rows - 1) {
          // landed -> check match
          const target = grid.find(t => t.col === p.col);
          if (target && target.text.toLowerCase() === p.match.toLowerCase()) {
            setScore(s => s + 10);
            // regenerate that target with a new word pair
            setGrid(g => g.map(t => t.col === p.col ? { ...t, text: Math.random() < 0.5 ? target.english : target.swedish } : t));
            spawnPiece();
          } else {
            setGameState('over');
          }
          return { ...p, row: nr };
        }
        return { ...p, row: nr };
      });
    }, tickMs);
    return () => { if (loopRef.current) clearInterval(loopRef.current); };
  }, [gameState, rows, grid, tickMs, spawnPiece]);

  useEffect(() => {
    const onKey = e => {
      if (gameState !== 'playing') return;
      if (e.code === 'ArrowLeft') setPiece(p => p ? { ...p, col: Math.max(0, p.col - 1) } : p);
      if (e.code === 'ArrowRight') setPiece(p => p ? { ...p, col: Math.min(cols - 1, p.col + 1) } : p);
      if (e.code === 'ArrowDown') setPiece(p => p ? { ...p, row: Math.min(rows - 1, p.row + 1) } : p);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameState, cols, rows]);

  useEffect(() => {
    if (score && score % 50 === 0) {
      setLevel(l => l + 1);
      setTickMs(ms => Math.max(300, ms - 60));
    }
  }, [score]);

  return (
    <div style={{ maxWidth: 320, margin: '2rem auto', background: containerBg, padding: '1rem', borderRadius: 16, boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px #81d4fa', border: `1px solid ${borderColor}`, textAlign: 'center' }}>
      <h2 style={{ color: titleColor, margin: 0, marginBottom: 8 }}>Ordfall</h2>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 8, fontSize: '0.9rem', color: isDarkMode ? '#ccc' : '#666' }}>
        <span>Poäng: <strong>{score}</strong></span>
        <span>Nivå: <strong>{level}</strong></span>
      </div>
      {gameState === 'ready' && <button onClick={start} style={{ background:'#e53935', color:'#fff', border:'none', borderRadius:8, padding:'0.6rem 1rem', fontWeight:'bold', cursor:'pointer', marginBottom: 8 }}>Starta</button>}
      <div style={{ width, height, margin:'0 auto', border:`2px solid ${borderColor}`, borderRadius:8, background: isDarkMode ? '#111' : '#f8f9fa', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', left:0, right:0, top:0, height: 60, display:'flex', alignItems:'center', justifyContent:'center', gap:6, color: isDarkMode ? '#ddd' : '#333', fontWeight:'bold' }}>
          Matcha blocket med målet längst ned i kolumnen
        </div>
        {/* bottom targets */}
        {grid.map(t => (
          <div key={t.col} style={{ position:'absolute', left: t.col*cell + 2, top: height - cell - 2, width: cell-4, height: cell-4, background:'#1976d2', color:'#fff', border:'2px solid #0d47a1', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, padding:'0 2px', textAlign:'center' }}>{t.text}</div>
        ))}
        {/* piece */}
        {piece && (
          <div style={{ position:'absolute', left: piece.col*cell + 2, top: 60 + piece.row*cell + 2, width: cell-4, height: cell-4, background:'#8e24aa', color:'#fff', border:'2px solid #4a148c', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, padding:'0 2px', textAlign:'center' }}>{piece.text}</div>
        )}
      </div>
      {gameState === 'over' && (
        <div style={{ marginTop: 10, color:'#e74c3c', fontWeight:'bold' }}>Fel matchning! Försök igen.</div>
      )}
    </div>
  );
}

export default Ordfall;
