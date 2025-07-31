import React, { useState, useEffect } from 'react';
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
      
      // Find the best Swedish voice - prioritize native Swedish voices
      let swedishVoice = voices.find(voice => 
        voice.lang === 'sv-SE' || 
        voice.lang === 'sv' ||
        voice.name.toLowerCase().includes('swedish') ||
        voice.name.toLowerCase().includes('sverige') ||
        voice.name.toLowerCase().includes('anna') || // Common Swedish voice name
        voice.name.toLowerCase().includes('alva')   // Another common Swedish voice
      );
      
      // If no Swedish voice, try any voice with 'sv' in the language code
      if (!swedishVoice) {
        swedishVoice = voices.find(voice => voice.lang.includes('sv'));
      }
      
      // If still no Swedish voice, try to find a Nordic/Scandinavian voice
      if (!swedishVoice) {
        swedishVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('nordic') ||
          voice.name.toLowerCase().includes('scandinavian') ||
          voice.name.toLowerCase().includes('norwegian') ||
          voice.name.toLowerCase().includes('danish')
        );
      }
      
      const utter = new window.SpeechSynthesisUtterance(word);
      utter.lang = 'sv-SE';
      utter.rate = 0.7; // Slightly faster for better flow
      utter.pitch = 1.0;
      utter.volume = 1.0;
      
      if (swedishVoice) {
        utter.voice = swedishVoice;
        console.log('Using Swedish voice:', swedishVoice.name, swedishVoice.lang);
      } else {
        console.log('No Swedish voice found. Available voices:', voices.map(v => `${v.name} (${v.lang})`));
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
  } else {
    console.log('Speech synthesis not supported in this browser');
  }
}

// Odd-One-Out game: pick the word that doesn't match the others
function OddOneOut({ words, onWordStatUpdate, onLessonComplete }) {
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  // Early return if not enough words
  if (words.length < 4) return <div style={{textAlign:'center',marginTop:'2rem'}}>Need at least 4 words!</div>;

  // Group by English meaning
  const groups = words.reduce((acc, w) => {
    acc[w.english] = acc[w.english] || [];
    acc[w.english].push(w);
    return acc;
  }, {});
  // Find a group with 3+
  const group = Object.values(groups).find(g => g.length >= 3) || [words[0],words[1],words[2]];
  // Pick 3 from group, 1 odd
  const main = shuffle(group).slice(0,3);
  const odd = shuffle(words.filter(w => !main.includes(w)))[0] || words[3];
  const options = shuffle([...main, odd]);
  const correctIdx = options.indexOf(odd);

  // Handle pick
  function pick(idx) {
    if (idx === correctIdx) {
      setFeedback('✅ Correct!');
      setShowConfetti(true);
      if (onWordStatUpdate) onWordStatUpdate(options[idx].swedish, options[idx].english, 'correct');
      setTimeout(() => setShowConfetti(false), 1500);
      setShowContinue(true);
    } else {
      setFeedback('❌ Try again!');
      if (onWordStatUpdate) onWordStatUpdate(options[idx].swedish, options[idx].english, 'incorrect');
    }
  }

  // Handle continue to next round
  function continueToNext() {
    setFeedback('');
    setShowContinue(false);
    setRound(r=>r+1);
    setCurrent(c=>c+1);
    if (current + 1 === words.length && typeof onLessonComplete === 'function') {
      onLessonComplete();
    }
  }

  return (
    <div style={{maxWidth:350,margin:'2rem auto',background:'#fce4ec',padding:'1.5rem',borderRadius:16,boxShadow:'0 2px 8px #f8bbd0',position:'relative'}}>
      <h2 style={{color:'#d81b60'}}>Odd One Out</h2>
      <div style={{display:'flex',flexDirection:'column',gap:12,margin:'1rem 0'}}>
        {options.map((w,i) => (
          <button key={i} onClick={()=>pick(i)} style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'#fff',color:'#d81b60',border:'none',borderRadius:8,padding:'0.7rem',fontWeight:'bold',fontSize:16,cursor:'pointer',boxShadow:'0 1px 4px #f8bbd0'}}>
            <span>{w.swedish}</span>
            <span>
              <button type="button" aria-label={`Play ${w.swedish}`} onClick={e => {e.stopPropagation();playSwedish(w.swedish);}} style={{background:'none',border:'none',color:'#d81b60',cursor:'pointer',fontSize:20,marginLeft:6}}><MdVolumeUp /></button>
            </span>
          </button>
        ))}
      </div>
      {feedback && <div style={{marginTop:12,fontWeight:'bold',color:feedback.includes('Correct')?'#388e3c':'#d32f2f'}}>{feedback}</div>}
      {showContinue && (
        <button 
          onClick={continueToNext}
          style={{
            background:'#d81b60',
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
            e.target.style.boxShadow = '0 4px 12px rgba(216, 27, 96, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
          }}
        >
          Continue →
        </button>
      )}
      <div style={{marginTop:10,color:'#888'}}>Round {round+1}</div>
      {showConfetti && <div style={{position:'absolute',top:0,left:0,right:0,fontSize:48,animation:'pop 1.5s'}}>
        <span role="img" aria-label="confetti">🎉🎊✨🎉🎊✨</span>
      </div>}
      <style>{`@keyframes pop { 0%{opacity:0;transform:scale(0.7);} 20%{opacity:1;transform:scale(1.1);} 80%{opacity:1;} 100%{opacity:0;transform:scale(1);} }`}</style>
    </div>
  );
}

export default OddOneOut; 