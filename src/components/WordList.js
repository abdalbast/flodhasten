import React, { useState } from 'react';
import { FaBookOpen, FaTrash, FaEdit } from 'react-icons/fa';
import { MdVolumeUp, MdAddCircle } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import ttsApi from '../utils/ttsApi';

// Play Swedish word with TTS API (browser TTS primary, API fallback)
async function playSwedish(word) {
  try {
    // Use the updated TTS API that prioritizes browser TTS
    await ttsApi.playSwedish(word);
  } catch (error) {
    console.error('TTS failed:', error.message);
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

// List of saved Swedish words and their English meanings, with edit/delete and add functionality
function WordList({ words, skillWords, onDelete, onEdit, onImportWords, onAdd, isDarkMode }) {
  const [editIdx, setEditIdx] = useState(null);
  const [editSwedish, setEditSwedish] = useState('');
  const [editEnglish, setEditEnglish] = useState('');
  const [importMsg, setImportMsg] = useState('');
  const [translatingIdx, setTranslatingIdx] = useState(null);
  const [translatingAll, setTranslatingAll] = useState(false);
  
  // Add word form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSwedish, setNewSwedish] = useState('');
  const [newEnglish, setNewEnglish] = useState('');
  const [addMessage, setAddMessage] = useState('');

  // Handle adding a new word
  const handleAddWord = (e) => {
    e.preventDefault();
    if (!newSwedish.trim() || !newEnglish.trim()) {
      setAddMessage('Please enter both words.');
      return;
    }
    onAdd({ swedish: newSwedish.trim(), english: newEnglish.trim() });
    setNewSwedish('');
    setNewEnglish('');
    setAddMessage('Word added!');
    setTimeout(() => setAddMessage(''), 1200);
  };

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
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: '80vh'
    }}>
      {/* Add Word Section */}
      <div className={`liquid-glass ${isDarkMode ? 'liquid-glass-dark' : ''}`} style={{
        padding: '2rem',
        marginBottom: '2rem',
        borderRadius: '20px'
      }}>
        <h2 style={{
          color: isDarkMode ? '#fff' : '#333',
          marginBottom: '1.5rem',
          fontSize: '2rem',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          Add New Word
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: isDarkMode ? '#ccc' : '#666',
              fontSize: '0.9rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Swedish Word
            </label>
            <input
              type="text"
              value={newSwedish}
              onChange={e => setNewSwedish(e.target.value)}
              className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '12px',
                border: 'none',
                fontSize: '1rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                color: isDarkMode ? '#fff' : '#333',
                background: 'transparent'
              }}
              placeholder="Enter Swedish word..."
            />
          </div>
          
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: isDarkMode ? '#ccc' : '#666',
              fontSize: '0.9rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              English Translation
            </label>
            <input 
              type="text" 
              value={newEnglish} 
              onChange={e => setNewEnglish(e.target.value)} 
              className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '12px',
                border: 'none',
                fontSize: '1rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                color: isDarkMode ? '#fff' : '#333',
                background: 'transparent'
              }}
              placeholder="Enter English translation..."
            />
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleAddWord}
            className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          >
            Add Word
          </button>
          
          <button
            onClick={handleImportFile}
            className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              border: 'none',
              color: isDarkMode ? '#ccc' : '#666',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          >
            Import Words
          </button>
        </div>
      </div>

      {/* Words List */}
      <div className={`liquid-glass ${isDarkMode ? 'liquid-glass-dark' : ''}`} style={{
        padding: '2rem',
        borderRadius: '20px'
      }}>
        <h2 style={{
          color: isDarkMode ? '#fff' : '#333',
          marginBottom: '1.5rem',
          fontSize: '2rem',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          Your Words ({words.length})
        </h2>
        
        {words.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: isDarkMode ? '#ccc' : '#666',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>No words added yet.</p>
            <p style={{ fontSize: '0.9rem' }}>Add your first word above!</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {words.map((w, i) => {
              const isSkillWord = i < skillWords.length;
              return (
                <div
                  key={i}
                  className={`liquid-glass ${isDarkMode ? 'liquid-glass-dark' : ''}`}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '16px',
                    position: 'relative',
                    border: isSkillWord 
                      ? '1px solid rgba(76, 175, 80, 0.3)' 
                      : '1px solid rgba(255, 193, 7, 0.3)',
                    background: isSkillWord 
                      ? 'rgba(76, 175, 80, 0.05)' 
                      : 'rgba(255, 193, 7, 0.05)'
                  }}
                >
                  {isSkillWord && (
                    <div style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      background: '#4CAF50',
                      color: '#fff',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}>
                      Skill
                    </div>
                  )}
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '1.3rem',
                        fontWeight: 'bold',
                        color: isDarkMode ? '#fff' : '#333',
                        marginBottom: '0.5rem',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}>
                        {w.swedish}
                      </div>
                      <div style={{
                        fontSize: '1rem',
                        color: isDarkMode ? '#ccc' : '#666',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}>
                        {w.english}
                      </div>
                      {w.kurdish && (
                        <div style={{
                          fontSize: '0.9rem',
                          color: isDarkMode ? '#aaa' : '#888',
                          marginTop: '0.25rem',
                          fontFamily: 'Arial, sans-serif'
                        }}>
                          {w.kurdish}
                        </div>
                      )}
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      alignItems: 'center'
                    }}>
                      <button
                        onClick={() => playSwedish(w.swedish)}
                        className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
                        style={{
                          padding: '0.5rem',
                          borderRadius: '50%',
                          border: 'none',
                          color: '#2193b0',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <MdVolumeUp />
                      </button>
                      
                      {!isSkillWord && (
                        <>
                          <button
                            onClick={() => startEdit(i)}
                            className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '50%',
                              border: 'none',
                              color: '#FF9800',
                              cursor: 'pointer',
                              fontSize: '1rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => onDelete(i)}
                            className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '50%',
                              border: 'none',
                              color: '#F44336',
                              cursor: 'pointer',
                              fontSize: '1rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Word Stats */}
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    fontSize: '0.8rem',
                    color: isDarkMode ? '#aaa' : '#888',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}>
                    <span>Correct: {w.stats?.correct || 0}</span>
                    <span>Incorrect: {w.stats?.incorrect || 0}</span>
                    {w.stats?.lastPracticed && (
                      <span>Last: {new Date(w.stats.lastPracticed).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editIdx !== null && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className={`liquid-glass ${isDarkMode ? 'liquid-glass-dark' : ''}`} style={{
            padding: '2rem',
            borderRadius: '20px',
            maxWidth: '400px',
            width: '100%'
          }}>
            <h3 style={{
              color: isDarkMode ? '#fff' : '#333',
              marginBottom: '1.5rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Edit Word
            </h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: isDarkMode ? '#ccc' : '#666',
                fontSize: '0.9rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Swedish Word
              </label>
              <input
                type="text"
                value={editSwedish}
                onChange={e=>setEditSwedish(e.target.value)}
                className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '1rem',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  color: isDarkMode ? '#fff' : '#333',
                  background: 'transparent'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: isDarkMode ? '#ccc' : '#666',
                fontSize: '0.9rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                English Translation
              </label>
              <input
                type="text"
                value={editEnglish}
                onChange={e=>setEditEnglish(e.target.value)}
                className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '1rem',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  color: isDarkMode ? '#fff' : '#333',
                  background: 'transparent'
                }}
              />
            </div>
            
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <button
                onClick={saveEdit}
                className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className={`glass-button ${isDarkMode ? 'glass-button-dark' : ''}`}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: 'none',
                  color: isDarkMode ? '#ccc' : '#666',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WordList; 