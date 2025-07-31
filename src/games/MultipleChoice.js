import React, { useState } from 'react';
import { MdVolumeUp } from 'react-icons/md';

// Helper: shuffle array
function shuffle(arr) {
  return arr.map(v => [Math.random(), v]).sort().map(a => a[1]);
}

// Play Swedish word with TTS
function playSwedish(word) {
  if ('speechSynthesis' in window) {
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    // Wait for voices to load
    const speakWithSwedishVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      
      // Find the best Swedish voice
      let swedishVoice = voices.find(voice => 
        voice.lang === 'sv-SE' || 
        voice.lang === 'sv' ||
        voice.name.toLowerCase().includes('swedish') ||
        voice.name.toLowerCase().includes('sverige')
      );
      
      // If no Swedish voice, try any voice with 'sv' in the language code
      if (!swedishVoice) {
        swedishVoice = voices.find(voice => voice.lang.includes('sv'));
      }
      
      const utter = new window.SpeechSynthesisUtterance(word);
      utter.lang = 'sv-SE';
      utter.rate = 0.6; // Slower for clearer pronunciation
      utter.pitch = 1.0;
      utter.volume = 1.0;
      
      if (swedishVoice) {
        utter.voice = swedishVoice;
      }
      
      window.speechSynthesis.speak(utter);
    };
    
    // If voices are already loaded
    if (window.speechSynthesis.getVoices().length > 0) {
      speakWithSwedishVoice();
    } else {
      // Wait for voices to load
      window.speechSynthesis.onvoiceschanged = speakWithSwedishVoice;
    }
  }
}

// Multiple Choice game: pick correct English meaning for Swedish word
function MultipleChoice({ words, onWordStatUpdate, onLessonComplete }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [answerReveal, setAnswerReveal] = useState(false);
  const [options, setOptions] = useState([]);
  const [showContinue, setShowContinue] = useState(false);
  
  // Generate options only when word index changes
  React.useEffect(() => {
    if (words.length > 0) {
      const currentWord = words[idx];
      const newOptions = shuffle([
        currentWord.english,
        ...shuffle(words.filter(w=>w!==currentWord)).slice(0,3).map(w=>w.english)
      ]);
      setOptions(newOptions);
      setSelected(null);
      setFeedback('');
      setAnswerReveal(false);
      setShowContinue(false);
    }
  }, [idx, words]);

  if (!words.length) return <div style={{textAlign:'center',marginTop:'2rem'}}>No words to practice!</div>;
  const word = words[idx];

  // Handle answer
  function pick(opt) {
    setSelected(opt);
    setAnswerReveal(true);
    if (opt === word.english) {
      setFeedback('✅ Correct!');
      if (onWordStatUpdate) onWordStatUpdate(word.swedish, word.english, 'correct');
      setShowContinue(true);
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

  // Handle continue to next word
  function continueToNext() {
    setSelected(null);
    setFeedback('');
    setAnswerReveal(false);
    setShowContinue(false);
    setIdx((idx+1)%words.length);
    if ((idx+1)%words.length === 0) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        if (typeof onLessonComplete === 'function') onLessonComplete();
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
            <button key={`${idx}-${i}`} onClick={()=>pick(opt)} disabled={answerReveal} style={{background:bg,color,border:'none',borderRadius:8,padding:'0.7rem',fontWeight:'bold',fontSize:16,cursor:answerReveal?'not-allowed':'pointer',boxShadow:'0 1px 4px #90caf9'}}>{opt}</button>
          );
        })}
      </div>
      {feedback && <div style={{marginTop:12,fontWeight:'bold',color:feedback.includes('Correct')?'#388e3c':'#d32f2f'}}>{feedback}</div>}
      {showContinue && (
        <button 
          onClick={continueToNext}
          style={{
            background:'#1976d2',
            color:'#fff',
            border:'none',
            borderRadius:8,
            padding:'0.8rem 1.5rem',
            fontWeight:'bold',
            fontSize:16,
            cursor:'pointer',
            marginTop:12,
            boxShadow:'0 2px 6px rgba(0,0,0,0.1)',
            transition:'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
          }}
        >
          Continue →
        </button>
      )}
      <div style={{marginTop:10,color:'#888'}}>Word {idx+1} of {words.length}</div>
      {showConfetti && <div style={{position:'absolute',top:0,left:0,right:0,fontSize:48,animation:'pop 1.5s'}}>
        <span role="img" aria-label="confetti">🎉🎊✨🎉🎊✨</span>
      </div>}
      <style>{`@keyframes pop { 0%{opacity:0;transform:scale(0.7);} 20%{opacity:1;transform:scale(1.1);} 80%{opacity:1;} 100%{opacity:0;transform:scale(1);} }`}</style>
    </div>
  );
}

export default MultipleChoice; 