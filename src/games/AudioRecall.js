import React, { useState, useEffect } from 'react';
import { MdVolumeUp } from 'react-icons/md';

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

// Audio Recall: hear Swedish, type English meaning
function AudioRecall({ words, onWordStatUpdate, onLessonComplete }) {
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
    <div style={{maxWidth:350,margin:'2rem auto',background:'#e8f5e9',padding:'1.5rem',borderRadius:16,boxShadow:'0 2px 8px #a5d6a7',position:'relative'}}>
      <h2 style={{color:'#388e3c'}}>Audio Recall</h2>
      <button type="button" onClick={()=>playSwedish(word.swedish)} style={{background:'#388e3c',color:'#fff',border:'none',borderRadius:8,padding:'0.7rem 1.2rem',fontWeight:'bold',fontSize:18,cursor:'pointer',margin:'1rem 0',display:'flex',alignItems:'center',gap:6}}><MdVolumeUp /> Play Swedish</button>
      <form onSubmit={check}>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type English..." autoFocus style={{width:'100%',padding:10,borderRadius:8,border:'1px solid #a5d6a7',fontSize:18}} />
        <button type="submit" style={{marginTop:14,width:'100%',background:'#388e3c',color:'#fff',border:'none',borderRadius:8,padding:10,fontWeight:'bold',fontSize:16,cursor:'pointer'}}>Check</button>
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

export default AudioRecall; 