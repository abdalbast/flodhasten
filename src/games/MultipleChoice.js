import React, { useState } from 'react';
import { MdVolumeUp } from 'react-icons/md';

// Helper: shuffle array
function shuffle(arr) {
  return arr.map(v => [Math.random(), v]).sort().map(a => a[1]);
}

// Play Swedish word with TTS
function playSwedish(word) {
  if ('speechSynthesis' in window) {
    const utter = new window.SpeechSynthesisUtterance(word);
    utter.lang = 'sv-SE';
    window.speechSynthesis.speak(utter);
  }
}

// Multiple Choice game: pick correct English meaning for Swedish word
function MultipleChoice({ words, onWordStatUpdate, onLessonComplete }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  // Track which options are correct/incorrect for feedback
  const [answerReveal, setAnswerReveal] = useState(false);
  if (!words.length) return <div style={{textAlign:'center',marginTop:'2rem'}}>No words to practice!</div>;
  const word = words[idx];

  // Generate 4 options: 1 correct, 3 random
  const options = shuffle([
    word.english,
    ...shuffle(words.filter(w=>w!==word)).slice(0,3).map(w=>w.english)
  ]);

  // Handle answer
  function pick(opt) {
    setSelected(opt);
    setAnswerReveal(true);
    if (opt === word.english) {
      setFeedback('✅ Correct!');
      if (onWordStatUpdate) onWordStatUpdate(word.swedish, word.english, 'correct');
      setTimeout(() => {
        setSelected(null);
        setFeedback('');
        setAnswerReveal(false);
        setIdx((idx+1)%words.length);
        if ((idx+1)%words.length === 0) {
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
            if (typeof onLessonComplete === 'function') onLessonComplete();
          }, 1500);
        }
      }, 900);
    } else {
      setFeedback('❌ Not quite right - try again!');
      if (onWordStatUpdate) onWordStatUpdate(word.swedish, word.english, 'incorrect');
      // Reset after a short delay to allow user to try again
      setTimeout(() => {
        setSelected(null);
        setAnswerReveal(false);
        setFeedback('');
      }, 1500);
    }
  }

  return (
    <div style={{maxWidth:350,margin:'2rem auto',background:'#e3f2fd',padding:'1.5rem',borderRadius:16,boxShadow:'0 2px 8px #90caf9',position:'relative'}}>
      <h2 style={{color:'#1976d2'}}>Multiple Choice</h2>
      <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',gap:8,marginBottom:8}}>
        <span style={{fontSize:'1.5rem',color:'#1976d2'}}>{word.swedish}</span>
        <button type="button" aria-label={`Play ${word.swedish}`} onClick={()=>playSwedish(word.swedish)} style={{background:'none',border:'none',color:'#1976d2',cursor:'pointer',fontSize:22}}><MdVolumeUp /></button>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {options.map((opt,i) => {
          let bg = '#fff', color = '#1976d2';
          if (answerReveal) {
            if (opt === word.english) {
              bg = '#388e3c'; color = '#fff';
            } else if (selected === opt) {
              bg = '#d32f2f'; color = '#fff';
            }
          } else if (selected === opt) {
            bg = (opt === word.english ? '#388e3c' : '#d32f2f');
            color = '#fff';
          }
          return (
            <button key={i} onClick={()=>pick(opt)} disabled={answerReveal} style={{background:bg,color,border:'none',borderRadius:8,padding:'0.7rem',fontWeight:'bold',fontSize:16,cursor:answerReveal?'not-allowed':'pointer',boxShadow:'0 1px 4px #90caf9'}}>{opt}</button>
          );
        })}
      </div>
      {feedback && <div style={{marginTop:12,fontWeight:'bold',color:feedback.includes('Correct')?'#388e3c':'#d32f2f'}}>{feedback}</div>}
      <div style={{marginTop:10,color:'#888'}}>Word {idx+1} of {words.length}</div>
      {showConfetti && <div style={{position:'absolute',top:0,left:0,right:0,fontSize:48,animation:'pop 1.5s'}}>
        <span role="img" aria-label="confetti">🎉🎊✨🎉🎊✨</span>
      </div>}
      <style>{`@keyframes pop { 0%{opacity:0;transform:scale(0.7);} 20%{opacity:1;transform:scale(1.1);} 80%{opacity:1;} 100%{opacity:0;transform:scale(1);} }`}</style>
    </div>
  );
}

export default MultipleChoice; 