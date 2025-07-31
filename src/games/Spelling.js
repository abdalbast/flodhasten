import React, { useState, useEffect } from 'react';
import { MdVolumeUp } from 'react-icons/md';

// Play Swedish word with TTS
function playSwedish(word) {
  if ('speechSynthesis' in window) {
    const utter = new window.SpeechSynthesisUtterance(word);
    utter.lang = 'sv-SE';
    window.speechSynthesis.speak(utter);
  }
}

// Spelling Challenge: type the English meaning for a Swedish word
function Spelling({ words, onWordStatUpdate, onLessonComplete }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  // Always call hooks first
  useEffect(() => {
    if (idx === words.length - 1 && typeof onLessonComplete === 'function') {
      onLessonComplete();
    }
  }, [idx, words.length, onLessonComplete]);

  if (!words.length) return <div style={{textAlign:'center',marginTop:'2rem'}}>No words to practice!</div>;
  const word = words[idx];

  // Check answer
  function check(e) {
    e.preventDefault();
    if (input.trim().toLowerCase() === word.english.toLowerCase()) {
      setFeedback('✅ Correct!');
      if (onWordStatUpdate) onWordStatUpdate(word.swedish, word.english, 'correct');
      setTimeout(() => {
        setInput('');
        setFeedback('');
        setIdx((idx+1)%words.length);
        if ((idx+1)%words.length === 0) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 1500);
        }
      }, 900);
    } else {
      setFeedback('❌ Try again!');
      if (onWordStatUpdate) onWordStatUpdate(word.swedish, word.english, 'incorrect');
    }
  }

  return (
    <div style={{maxWidth:350,margin:'2rem auto',background:'#fff3e0',padding:'1.5rem',borderRadius:16,boxShadow:'0 2px 8px #ffcc80',position:'relative'}}>
      <h2 style={{color:'#fb8c00'}}>Spelling Challenge</h2>
      <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',gap:8,marginBottom:8}}>
        <span style={{fontSize:'1.5rem',color:'#fb8c00'}}>{word.swedish}</span>
        <button type="button" aria-label={`Play ${word.swedish}`} onClick={()=>playSwedish(word.swedish)} style={{background:'none',border:'none',color:'#fb8c00',cursor:'pointer',fontSize:22}}><MdVolumeUp /></button>
      </div>
      <form onSubmit={check}>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type English..." autoFocus style={{width:'100%',padding:10,borderRadius:8,border:'1px solid #ffcc80',fontSize:18}} />
        <button type="submit" style={{marginTop:14,width:'100%',background:'#fb8c00',color:'#fff',border:'none',borderRadius:8,padding:10,fontWeight:'bold',fontSize:16,cursor:'pointer'}}>Check</button>
      </form>
      {feedback && <div style={{marginTop:12,fontWeight:'bold',color:feedback.includes('Correct')?'#388e3c':'#d32f2f'}}>{feedback}</div>}
      <div style={{marginTop:10,color:'#888'}}>Word {idx+1} of {words.length}</div>
      {showConfetti && <div style={{position:'absolute',top:0,left:0,right:0,fontSize:48,animation:'pop 1.5s'}}>
        <span role="img" aria-label="confetti">🎉🎊✨🎉🎊✨</span>
      </div>}
      <style>{`@keyframes pop { 0%{opacity:0;transform:scale(0.7);} 20%{opacity:1;transform:scale(1.1);} 80%{opacity:1;} 100%{opacity:0;transform:scale(1);} }`}</style>
    </div>
  );
}

export default Spelling; 