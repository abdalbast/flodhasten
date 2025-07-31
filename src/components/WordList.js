import React, { useState } from 'react';
import { FaBookOpen, FaTrash, FaEdit } from 'react-icons/fa';
import { MdVolumeUp } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import ttsApi from '../utils/ttsApi';

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

// Parse CSV or TXT file into word objects
function parseWordFile(text, ext) {
  const words = [];
  if (ext === 'csv') {
    // Accept header: Swedish,English or just Swedish
    const lines = text.split(/\r?\n/).filter(Boolean);
    const header = lines[0].toLowerCase();
    const isTwoCol = header.includes('english') && header.includes('swedish');
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',');
      if (isTwoCol) {
        // Swedish,English
        const [swedish, english] = cols;
        if (swedish && english) words.push({ swedish: swedish.trim(), english: english.trim(), stats: { correct: 0, incorrect: 0, lastPracticed: null } });
        else if (swedish) words.push({ swedish: swedish.trim(), english: '(unknown)', stats: { correct: 0, incorrect: 0, lastPracticed: null } });
      } else {
        // Single column: just Swedish
        const swedish = cols[0];
        if (swedish) words.push({ swedish: swedish.trim(), english: '(unknown)', stats: { correct: 0, incorrect: 0, lastPracticed: null } });
      }
    }
  } else {
    // TXT: lines like 'häst - horse' or just 'häst'
    const lines = text.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      if (line.includes(' - ')) {
        const [swedish, english] = line.split(' - ');
        if (swedish && english) words.push({ swedish: swedish.trim(), english: english.trim(), stats: { correct: 0, incorrect: 0, lastPracticed: null } });
        else if (swedish) words.push({ swedish: swedish.trim(), english: '(unknown)', stats: { correct: 0, incorrect: 0, lastPracticed: null } });
      } else {
        // Just Swedish
        const swedish = line.trim();
        if (swedish) words.push({ swedish, english: '(unknown)', stats: { correct: 0, incorrect: 0, lastPracticed: null } });
      }
    }
  }
  return words;
}

// List of saved Swedish words and their English meanings, with edit/delete
function WordList({ words, onDelete, onEdit, onImportWords }) {
  const [editIdx, setEditIdx] = useState(null);
  const [editSwedish, setEditSwedish] = useState('');
  const [editEnglish, setEditEnglish] = useState('');
  const [importMsg, setImportMsg] = useState('');
  const [translatingIdx, setTranslatingIdx] = useState(null);
  const [translatingAll, setTranslatingAll] = useState(false);

  // Translate Swedish to English using local proxy (single word)
  async function handleTranslate(idx, swedish) {
    setTranslatingIdx(idx);
    try {
      const res = await fetch('http://localhost:4000/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ swedishArray: [swedish] })
      });
      const data = await res.json();
      if (data.translations && data.translations[0]) {
        onEdit(idx, { swedish, english: data.translations[0] });
      } else {
        setImportMsg('Translation failed.');
      }
    } catch (e) {
      setImportMsg('Translation error.');
    }
    setTranslatingIdx(null);
  }

  // Batch translate all unknowns using local proxy
  async function handleTranslateAll() {
    setTranslatingAll(true);
    setImportMsg('');
    // Gather all indices and Swedish words needing translation
    const indices = [];
    const swedishWords = [];
    for (let i = 0; i < words.length; i++) {
      if (words[i].english === '(unknown)') {
        indices.push(i);
        swedishWords.push(words[i].swedish);
      }
    }
    if (swedishWords.length === 0) {
      setTranslatingAll(false);
      setImportMsg('No unknowns to translate.');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ swedishArray: swedishWords })
      });
      const data = await res.json();
      if (data.translations && data.translations.length === swedishWords.length) {
        for (let j = 0; j < indices.length; j++) {
          onEdit(indices[j], { swedish: swedishWords[j], english: data.translations[j] });
        }
        setImportMsg('Batch translation complete!');
      } else {
        setImportMsg('Batch translation failed.');
      }
    } catch (e) {
      setImportMsg('Batch translation error.');
    }
    setTranslatingIdx(null);
    setTranslatingAll(false);
  }

  // Handle file import
  function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext !== 'csv' && ext !== 'txt') {
      setImportMsg('Please upload a .csv or .txt file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const newWords = parseWordFile(text, ext);
      if (newWords.length === 0) {
        setImportMsg('No valid words found in file.');
      } else {
        setImportMsg(`Imported ${newWords.length} words!`);
        if (onImportWords) onImportWords(newWords);
      }
    };
    reader.readAsText(file);
  }

  // Start editing a word
  function startEdit(i) {
    setEditIdx(i);
    setEditSwedish(words[i].swedish);
    setEditEnglish(words[i].english);
  }

  // Save the edited word
  function saveEdit() {
    onEdit(editIdx, { swedish: editSwedish, english: editEnglish });
    setEditIdx(null);
  }

  // Cancel editing
  function cancelEdit() {
    setEditIdx(null);
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', background: '#fffde7', padding: '1.5rem', borderRadius: 16, boxShadow: '0 2px 8px #ffe082' }}>
      <h2 style={{ color: '#fbc02d' }}><FaBookOpen style={{verticalAlign:'middle',marginRight:6}}/>Saved Words</h2>
      {/* Import file input */}
      <div style={{marginBottom:12}}>
        <input type="file" accept=".csv,.txt" onChange={handleImportFile} style={{marginBottom:4}} />
        <div style={{fontSize:12,color:'#888'}}>Import .csv (Swedish,English) or .txt (Swedish - English)</div>
        <button type="button" onClick={handleTranslateAll} disabled={translatingAll} style={{
          marginTop:6,
          marginBottom:4,
          background:'#2193b0',
          color:'#fff',
          border:'none',
          borderRadius:8,
          padding:'0.4rem 1.1rem',
          fontWeight:'bold',
          fontSize:14,
          cursor:translatingAll?'not-allowed':'pointer',
          transition:'all 0.2s ease',
          transform:'translateY(0)',
          boxShadow:'0 2px 6px rgba(0,0,0,0.1)'
        }}
        onMouseEnter={(e) => {
          if (!translatingAll) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(33, 147, 176, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
        }}
        onMouseDown={(e) => {
          if (!translatingAll) {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
          }
        }}
        onMouseUp={(e) => {
          if (!translatingAll) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(33, 147, 176, 0.3)';
          }
        }}
        >
          {translatingAll ? <FaSpinner className="spin" style={{fontSize:16,marginRight:6}}/> : null}
          Translate All Unknown
        </button>
        {importMsg && <div style={{fontSize:13,color:'#388e3c',marginTop:2}}>{importMsg}</div>}
      </div>
      {words.length === 0 ? (
        <div style={{ color: '#aaa', textAlign: 'center' }}>No words yet. Add some!</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {words.map((w, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0.7rem 0', background: '#fffde7', borderRadius: 8, padding: '0.5rem 0.7rem' }}>
              {editIdx === i ? (
                <span style={{ flex: 1, display: 'flex', gap: 6 }}>
                  <input value={editSwedish} onChange={e=>setEditSwedish(e.target.value)} style={{width:70,borderRadius:6,border:'1px solid #b2ebf2',padding:3}} />
                  <span style={{ color: '#888' }}>–</span>
                  <input value={editEnglish} onChange={e=>setEditEnglish(e.target.value)} style={{width:70,borderRadius:6,border:'1px solid #b2ebf2',padding:3}} />
                </span>
              ) : (
                <span>
                  <b style={{ color: '#2193b0' }}>{w.swedish}</b>
                  <button type="button" aria-label={`Play ${w.swedish}`} onClick={()=>playSwedish(w.swedish)} style={{background:'none',border:'none',color:'#2193b0',cursor:'pointer',fontSize:20,verticalAlign:'middle',marginLeft:4}}><MdVolumeUp /></button>
                  <span style={{ color: '#888' }}>–</span> <span style={{ color: '#333' }}>{w.english}</span>
                  {w.english === '(unknown)' && (
                    <button type="button" onClick={()=>handleTranslate(i, w.swedish)} disabled={translatingIdx===i} style={{
                      marginLeft:8,
                      background:'#2193b0',
                      color:'#fff',
                      border:'none',
                      borderRadius:8,
                      padding:'0.2rem 0.7rem',
                      fontSize:13,
                      cursor:'pointer',
                      verticalAlign:'middle',
                      transition:'all 0.2s ease',
                      transform:'translateY(0)',
                      boxShadow:'0 2px 6px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      if (translatingIdx !== i) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 12px rgba(33, 147, 176, 0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                    }}
                    onMouseDown={(e) => {
                      if (translatingIdx !== i) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                      }
                    }}
                    onMouseUp={(e) => {
                      if (translatingIdx !== i) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 12px rgba(33, 147, 176, 0.3)';
                      }
                    }}
                    >
                      {translatingIdx===i ? <FaSpinner className="spin" style={{fontSize:16}}/> : 'Translate'}
                    </button>
                  )}
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                    <span>✔️ {w.stats?.correct || 0} </span>
                    <span>❌ {w.stats?.incorrect || 0} </span>
                    <span>🕒 {w.stats?.lastPracticed ? new Date(w.stats.lastPracticed).toLocaleDateString() : 'Never'}</span>
                  </div>
                </span>
              )}
              {editIdx === i ? (
                <span style={{ display: 'flex', gap: 4 }}>
                  <button onClick={saveEdit} style={{ 
                    background: '#388e3c', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 8, 
                    padding: '0.3rem 0.7rem', 
                    cursor: 'pointer', 
                    fontWeight: 'bold',
                    transition:'all 0.2s ease',
                    transform:'translateY(0)',
                    boxShadow:'0 2px 6px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(56, 142, 60, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                  }}
                  onMouseDown={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                  }}
                  onMouseUp={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(56, 142, 60, 0.3)';
                  }}
                  >Save</button>
                  <button onClick={cancelEdit} style={{ 
                    background: '#aaa', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 8, 
                    padding: '0.3rem 0.7rem', 
                    cursor: 'pointer', 
                    fontWeight: 'bold',
                    transition:'all 0.2s ease',
                    transform:'translateY(0)',
                    boxShadow:'0 2px 6px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(170, 170, 170, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                  }}
                  onMouseDown={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                  }}
                  onMouseUp={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(170, 170, 170, 0.3)';
                  }}
                  >Cancel</button>
                </span>
              ) : (
                <span style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => startEdit(i)} style={{ 
                    background: '#1976d2', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 8, 
                    padding: '0.3rem 0.7rem', 
                    cursor: 'pointer', 
                    fontWeight: 'bold',
                    transition:'all 0.2s ease',
                    transform:'translateY(0)',
                    boxShadow:'0 2px 6px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                  }}
                  onMouseDown={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                  }}
                  onMouseUp={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
                  }}
                  ><FaEdit style={{verticalAlign:'middle',marginRight:3}}/>Edit</button>
                  <button onClick={() => onDelete(i)} style={{ 
                    background: '#f44336', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 8, 
                    padding: '0.3rem 0.7rem', 
                    cursor: 'pointer', 
                    fontWeight: 'bold',
                    transition:'all 0.2s ease',
                    transform:'translateY(0)',
                    boxShadow:'0 2px 6px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(244, 67, 54, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                  }}
                  onMouseDown={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                  }}
                  onMouseUp={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(244, 67, 54, 0.3)';
                  }}
                  ><FaTrash style={{verticalAlign:'middle',marginRight:3}}/>Delete</button>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WordList; 