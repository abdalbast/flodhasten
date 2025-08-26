import React, { useState, useRef } from 'react';
import { MdVolumeUp } from 'react-icons/md';
import ttsApi from '../utils/ttsApi';

// Shuffle array helper
function shuffle(arr) {
  return arr.map(v => [Math.random(), v]).sort().map(a => a[1]);
}

// Play Swedish word with TTS API
async function playSwedish(word) {
  try {
    // First try the API
    await ttsApi.playSwedish(word);
  } catch (error) {
    console.log('TTS API failed, falling back to browser TTS:', error.message);
    
    // Fallback to browser TTS
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      // Wait for voices to load
      const speakWithSwedishVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
        
        // Only use Alva (sv-SE) voice
        let swedishVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('alva') && voice.lang === 'sv-SE'
        );
        
        const utter = new window.SpeechSynthesisUtterance(word);
        utter.lang = 'sv-SE';
        utter.rate = 0.6; // Slower for better pronunciation
        utter.pitch = 1.0;
        utter.volume = 1.0;
        
        if (swedishVoice) {
          utter.voice = swedishVoice;
          console.log('🎤 Using Alva (sv-SE) voice:', swedishVoice.name, swedishVoice.lang);
        } else {
          console.log('⚠️ Alva (sv-SE) voice not found. Not playing audio.');
          console.log('📋 Available voices:', voices.map(v => `${v.name} (${v.lang})`));
          return; // Don't play audio if Alva is not available
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
}

// Matching game: match Swedish to English
function Matching({ words, onWordStatUpdate, onLessonComplete }) {
  // Prepare shuffled lists
  const [swedishList] = useState(() => shuffle(words.map(w => w.swedish)));
  const [englishList] = useState(() => shuffle(words.map(w => w.english)));
  const [selected, setSelected] = useState({ swedish: null, english: null });
  const [matches, setMatches] = useState([]); // [{swedish, english}]
  const [wrong, setWrong] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRefs = useRef([]); // Track all active timeouts

  // Cleanup function to clear all timeouts
  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutRefs.current = [];
  };

  // Helper to add timeout to tracking
  const addTimeout = (callback, delay) => {
    const timeoutId = setTimeout(() => {
      callback();
      // Remove this timeout from tracking array
      timeoutRefs.current = timeoutRefs.current.filter(id => id !== timeoutId);
    }, delay);
    timeoutRefs.current.push(timeoutId);
    return timeoutId;
  };

  // Handle selection
  function select(type, value) {
    setSelected(sel => {
      const next = { ...sel, [type]: value };
      if (next.swedish && next.english) {
        const correct = words.find(w => w.swedish === next.swedish && w.english === next.english);
        if (correct) {
          setMatches(m => {
            const newMatches = [...m, { swedish: next.swedish, english: next.english }];
            if (onWordStatUpdate) onWordStatUpdate(next.swedish, next.english, 'correct');
            if (newMatches.length === words.length) {
              setShowConfetti(true);
              addTimeout(() => {
                setShowConfetti(false);
                if (typeof onLessonComplete === 'function') onLessonComplete();
              }, 1500);
            }
            return newMatches;
          });
          setSelected({ swedish: null, english: null });
          setWrong(false);
        } else {
          setWrong(true);
          addTimeout(() => {
            setSelected({ swedish: null, english: null });
            setWrong(false);
          }, 700);
        }
      }
      return next;
    });
  }

  // Check if already matched
  function isMatched(type, value) {
    return matches.some(m => m[type] === value);
  }

  return (
    <div style={{maxWidth:500,margin:'2rem auto',background:'#f3e5f5',padding:'1.5rem',borderRadius:16,boxShadow:'0 2px 8px #ce93d8',position:'relative'}}>
      <h2 style={{color:'#8e24aa'}}>Matching</h2>
      <div style={{display:'flex',justifyContent:'space-between',gap:16}}>
        <div style={{flex:1}}>
          <h4 style={{color:'#8e24aa'}}>Swedish</h4>
          {swedishList.map((s,i) => (
            <button key={i} disabled={isMatched('swedish',s)} onClick={()=>select('swedish',s)}
              style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',margin:'0.3rem 0',padding:'0.7rem',borderRadius:8,border:'none',background:isMatched('swedish',s)?'#b2dfdb':(selected.swedish===s?'#8e24aa':'#fff'),color:isMatched('swedish',s)?'#888':(selected.swedish===s?'#fff':'#8e24aa'),fontWeight:'bold',fontSize:16,cursor:'pointer'}}>
              <span>{s}</span>
              <span>
                <button type="button" aria-label={`Play ${s}`} onClick={e => {e.stopPropagation();playSwedish(s);}} style={{background:'none',border:'none',color:'inherit',cursor:'pointer',fontSize:20,marginLeft:6}}><MdVolumeUp /></button>
              </span>
            </button>
          ))}
        </div>
        <div style={{flex:1}}>
          <h4 style={{color:'#8e24aa'}}>English</h4>
          {englishList.map((e,i) => (
            <button key={i} disabled={isMatched('english',e)} onClick={()=>select('english',e)}
              style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',margin:'0.3rem 0',padding:'0.7rem',borderRadius:8,border:'none',background:isMatched('english',e)?'#b2dfdb':(selected.english===e?'#8e24aa':'#fff'),color:isMatched('english',e)?'#888':(selected.english===e?'#fff':'#8e24aa'),fontWeight:'bold',fontSize:16,cursor:'pointer'}}>
              <span>{e}</span>
            </button>
          ))}
        </div>
      </div>
      {wrong && <div style={{color:'#d32f2f',marginTop:10}}>Not a match!</div>}
      {matches.length === words.length && <div style={{color:'#388e3c',marginTop:16,fontWeight:'bold'}}>All matched! 🎉</div>}
      {showConfetti && <div style={{position:'absolute',top:0,left:0,right:0,fontSize:48,animation:'pop 1.5s'}}>
        <span role="img" aria-label="confetti">🎉🎊✨🎉🎊✨</span>
      </div>}
      <style>{`@keyframes pop { 0%{opacity:0;transform:scale(0.7);} 20%{opacity:1;transform:scale(1.1);} 80%{opacity:1;} 100%{opacity:0;transform:scale(1);} }`}</style>
    </div>
  );
}

export default Matching; 