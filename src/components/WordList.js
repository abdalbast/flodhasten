import React, { useState, useCallback } from 'react';
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

// List of saved Swedish words and their English meanings, with edit/delete and add functionality
const WordList = React.memo(({ words, skillWords, onDelete, onEdit, onImportWords, onAdd, isDarkMode }) => {
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

  // Parse CSV or TXT file into word objects - memoized for performance
  const parseWordFile = useCallback((text, ext) => {
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
  }, []);

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
    <div className="max-w-md mx-auto my-8 bg-amber-50 dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-gray-900/30">
      <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 flex items-center mb-4">
        <FaBookOpen className="mr-2" />
        <span>Saved Words</span>
      </h2>
      
      {/* Add Word Section */}
      <div className="mb-6 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border-2 border-cyan-200 dark:border-cyan-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-cyan-700 dark:text-cyan-400 flex items-center m-0">
            <MdAddCircle className="mr-2" />
            <span>Add New Word</span>
          </h3>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {showAddForm ? 'Cancel' : 'Add Word'}
          </button>
        </div>
        
        {showAddForm && (
          <form onSubmit={handleAddWord} className="mt-4">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">Swedish</label>
              <input 
                value={newSwedish} 
                onChange={e => setNewSwedish(e.target.value)} 
                className="w-full px-3 py-2 text-sm border border-cyan-200 dark:border-cyan-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Enter Swedish word..."
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">English</label>
              <input 
                value={newEnglish} 
                onChange={e => setNewEnglish(e.target.value)} 
                className="w-full px-3 py-2 text-sm border border-cyan-200 dark:border-cyan-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Enter English translation..."
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:translate-y-0 active:shadow-sm"
            >
              Add Word
            </button>
            {addMessage && <div className="mt-3 text-center font-medium text-green-600 dark:text-green-400">{addMessage}</div>}
          </form>
        )}
      </div>

      {/* Import file input */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400 mb-3">Import Words</h3>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <input 
              type="file" 
              accept=".csv,.txt" 
              onChange={handleImportFile} 
              className="hidden" 
            />
            <span className="text-blue-600 dark:text-blue-400 font-medium">Choose CSV or TXT file</span>
          </label>
          <div className="text-xs text-gray-500 dark:text-gray-400 ml-1">Import .csv (Swedish,English) or .txt (Swedish - English)</div>
        </div>
        
        <button 
          type="button" 
          onClick={handleTranslateAll} 
          disabled={translatingAll}
          className={`mt-4 w-full py-2 px-4 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center
            ${translatingAll 
              ? 'bg-blue-400 dark:bg-blue-700 cursor-not-allowed opacity-70' 
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm'
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
        >
          {translatingAll && <FaSpinner className="animate-spin mr-2" />}
          Translate All Unknown
        </button>
        
        {importMsg && <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">{importMsg}</div>}
      </div>
      {words.length === 0 ? (
        <div className="text-gray-400 dark:text-gray-500 text-center py-6">No words yet. Add some!</div>
      ) : (
        <ul className="list-none p-0 space-y-3">
          {words.map((w, i) => {
            const isSkillWord = i < skillWords.length;
            return (
              <li key={i} className={`flex items-center justify-between rounded-lg p-3 border ${
                isSkillWord 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                  : 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800'
              }`}>
                {editIdx === i ? (
                  <span className="flex-1 flex items-center gap-2">
                    <input 
                      value={editSwedish} 
                      onChange={e=>setEditSwedish(e.target.value)} 
                      className="w-24 px-2 py-1 text-sm border border-cyan-200 dark:border-cyan-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:text-white" 
                    />
                    <span className="text-gray-400 dark:text-gray-500">–</span>
                    <input 
                      value={editEnglish} 
                      onChange={e=>setEditEnglish(e.target.value)} 
                      className="w-24 px-2 py-1 text-sm border border-cyan-200 dark:border-cyan-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:text-white" 
                    />
                  </span>
                ) : (
                  <span className="flex-1">
                    <div className="flex items-center flex-wrap">
                      <span className="font-bold text-cyan-600 dark:text-cyan-400">{w.swedish}</span>
                      <button 
                        type="button" 
                        aria-label={`Play ${w.swedish}`} 
                        onClick={()=>playSwedish(w.swedish)}
                        className="bg-transparent border-none text-cyan-600 dark:text-cyan-400 cursor-pointer mx-1 p-1 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <MdVolumeUp className="text-xl" />
                      </button>
                      <span className="text-gray-400 dark:text-gray-500 mx-1">–</span> 
                      <span className="text-gray-700 dark:text-gray-300">{w.english}</span>
                      {isSkillWord && (
                        <span className="ml-2 bg-green-500 dark:bg-green-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                          Skill
                        </span>
                      )}
                      {w.english === '(unknown)' && (
                        <button 
                          type="button" 
                          onClick={()=>handleTranslate(i, w.swedish)} 
                          disabled={translatingIdx===i}
                          className={`ml-2 px-3 py-1 text-xs rounded-md font-medium text-white transition-all duration-200
                            ${translatingIdx===i 
                              ? 'bg-cyan-400 dark:bg-cyan-700 cursor-not-allowed' 
                              : 'bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600 hover:-translate-y-0.5 hover:shadow-sm'
                            }
                            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1`}
                        >
                          {translatingIdx===i ? <FaSpinner className="animate-spin" /> : 'Translate'}
                        </button>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                      <span className="flex items-center"><span className="text-green-500 mr-0.5">✓</span> {w.stats?.correct || 0}</span>
                      <span className="flex items-center"><span className="text-red-500 mr-0.5">✗</span> {w.stats?.incorrect || 0}</span>
                      <span className="flex items-center"><span className="text-gray-400 mr-0.5">⏱</span> {w.stats?.lastPracticed ? new Date(w.stats.lastPracticed).toLocaleDateString() : 'Never'}</span>
                    </div>
                  </span>
                )}
                {editIdx === i ? (
                  <span className="flex gap-2">
                    <button 
                      onClick={saveEdit}
                      className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-medium py-1 px-3 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:shadow-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                    >
                      Save
                    </button>
                    <button 
                      onClick={cancelEdit}
                      className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white font-medium py-1 px-3 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:shadow-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                    >
                      Cancel
                    </button>
                  </span>
                ) : (
                  <span className="flex gap-2">
                    {!isSkillWord && (
                      <>
                        <button 
                          onClick={() => startEdit(i)}
                          className="bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600 text-white p-2 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:shadow-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1"
                          aria-label="Edit word"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => onDelete(i)}
                          className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white p-2 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:shadow-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                          aria-label="Delete word"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});

export default WordList; 