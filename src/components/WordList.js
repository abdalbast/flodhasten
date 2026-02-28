import React, { useState, useCallback } from 'react';
import { FaBookOpen, FaTrash, FaEdit, FaSpinner } from 'react-icons/fa';
import { MdVolumeUp, MdAddCircle, MdUploadFile } from 'react-icons/md';
import ttsApi from '../utils/ttsApi';
import { translateText, translateBatch } from '../lib/translate';
import { Button, Card, Chip, Input, ListRow, Stack, Surface, Text } from '../design/components';

async function playSwedish(word) {
  try {
    await ttsApi.playSwedish(word);
  } catch (error) {
    console.error('TTS failed:', error.message);
  }
}

const defaultStats = { correct: 0, incorrect: 0, lastPracticed: null };

const WordList = React.memo(({ words, skillWords, onDelete, onEdit, onImportWords, onAdd, isDarkMode }) => {
  const [editIdx, setEditIdx] = useState(null);
  const [editSwedish, setEditSwedish] = useState('');
  const [editEnglish, setEditEnglish] = useState('');
  const [importMsg, setImportMsg] = useState('');
  const [translatingIdx, setTranslatingIdx] = useState(null);
  const [translatingAll, setTranslatingAll] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newSwedish, setNewSwedish] = useState('');
  const [newEnglish, setNewEnglish] = useState('');
  const [addMessage, setAddMessage] = useState('');

  const parseWordFile = useCallback((text, ext) => {
    const parsedWords = [];
    if (ext === 'csv') {
      const lines = text.split(/\r?\n/).filter(Boolean);
      const header = (lines[0] || '').toLowerCase();
      const isTwoCol = header.includes('english') && header.includes('swedish');
      for (let i = 1; i < lines.length; i += 1) {
        const cols = lines[i].split(',');
        if (isTwoCol) {
          const [swedish, english] = cols;
          if (swedish && english) parsedWords.push({ swedish: swedish.trim(), english: english.trim(), stats: defaultStats });
          else if (swedish) parsedWords.push({ swedish: swedish.trim(), english: '(unknown)', stats: defaultStats });
        } else {
          const swedish = cols[0];
          if (swedish) parsedWords.push({ swedish: swedish.trim(), english: '(unknown)', stats: defaultStats });
        }
      }
    } else {
      const lines = text.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        if (line.includes(' - ')) {
          const [swedish, english] = line.split(' - ');
          if (swedish && english) parsedWords.push({ swedish: swedish.trim(), english: english.trim(), stats: defaultStats });
          else if (swedish) parsedWords.push({ swedish: swedish.trim(), english: '(unknown)', stats: defaultStats });
        } else {
          const swedish = line.trim();
          if (swedish) parsedWords.push({ swedish, english: '(unknown)', stats: defaultStats });
        }
      }
    }
    return parsedWords;
  }, []);

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

  async function handleTranslate(idx, swedish) {
    setTranslatingIdx(idx);
    try {
      const translated = await translateText(swedish, 'sv', 'en');
      onEdit(idx, { swedish, english: translated });
    } catch (e) {
      console.error('Translation error:', e);
      setImportMsg('Translation failed.');
    }
    setTranslatingIdx(null);
  }

  async function handleTranslateAll() {
    setTranslatingAll(true);
    setImportMsg('');
    const indices = [];
    const swedishWords = [];
    for (let i = 0; i < words.length; i += 1) {
      if (words[i].english === '(unknown)') {
        indices.push(i);
        swedishWords.push(words[i].swedish);
      }
    }
    if (swedishWords.length === 0) {
      setTranslatingAll(false);
      setImportMsg('No unknown words to translate.');
      return;
    }
    try {
      const translations = await translateBatch(swedishWords, 'sv', 'en');
      for (let j = 0; j < indices.length; j += 1) {
        onEdit(indices[j], { swedish: swedishWords[j], english: translations[j] });
      }
      setImportMsg('Batch translation complete!');
    } catch (e) {
      console.error('Batch translation error:', e);
      setImportMsg('Batch translation failed.');
    }
    setTranslatingIdx(null);
    setTranslatingAll(false);
  }

  function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext !== 'csv' && ext !== 'txt') {
      setImportMsg('Please upload a CSV or TXT file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const newWords = parseWordFile(text, ext);
      if (newWords.length === 0) {
        setImportMsg('No valid words found in file.');
      } else {
        setImportMsg(`Imported ${newWords.length} words.`);
        if (onImportWords) onImportWords(newWords);
      }
    };
    reader.readAsText(file);
  }

  function startEdit(i) {
    setEditIdx(i);
    setEditSwedish(words[i].swedish);
    setEditEnglish(words[i].english);
  }

  function saveEdit() {
    onEdit(editIdx, { swedish: editSwedish, english: editEnglish });
    setEditIdx(null);
  }

  function cancelEdit() {
    setEditIdx(null);
  }

  return (
    <div className={isDarkMode ? 'fd-theme-dark' : ''} style={{ maxWidth: '760px', margin: '2rem auto', padding: '0 1rem' }}>
      <Card
        title={(
          <Text as="h2" variant="title" serif weight="medium">
            Saved Words
          </Text>
        )}
        leading={<FaBookOpen style={{ color: 'var(--fd-accent-strong)' }} />}
        className="mb-4"
        style={{ borderRadius: '22px' }}
      >
        <Stack direction="column" gap="16px">
          <Card
            title="Add New Word"
            subtitle="Create your own vocabulary entries"
            leading={<MdAddCircle style={{ color: 'var(--fd-accent-strong)' }} />}
            trailing={(
              <Button variant="secondary" onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? 'Close' : 'Add Word'}
              </Button>
            )}
            tone="tint"
          >
            {showAddForm && (
              <form onSubmit={handleAddWord}>
                <Stack direction="column" gap="12px">
                  <Input
                    label="Swedish"
                    value={newSwedish}
                    onChange={(e) => setNewSwedish(e.target.value)}
                    placeholder="Enter Swedish word"
                  />
                  <Input
                    label="English"
                    value={newEnglish}
                    onChange={(e) => setNewEnglish(e.target.value)}
                    placeholder="Enter English translation"
                  />
                  <Button type="submit" fullWidth>
                    Add Word
                  </Button>
                  {addMessage ? (
                    <Text as="p" variant="caption" color={addMessage.includes('Please') ? 'danger' : 'success'}>
                      {addMessage}
                    </Text>
                  ) : null}
                </Stack>
              </form>
            )}
          </Card>

          <Card
            title="Import Words"
            subtitle="Import CSV or TXT files and auto translate unknown words"
            leading={<MdUploadFile style={{ color: 'var(--fd-accent-strong)' }} />}
            tone="paper"
          >
            <Stack direction="column" gap="12px">
              <label htmlFor="wordlist-import-file">
                <Surface
                  as="span"
                  bordered
                  padding="md"
                  className="fd-listRow fd-listRow-interactive"
                  style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <Text as="span" variant="body" weight="medium" color="accent">
                    Choose CSV or TXT file
                  </Text>
                </Surface>
              </label>
              <input
                id="wordlist-import-file"
                type="file"
                accept=".csv,.txt"
                onChange={handleImportFile}
                style={{ display: 'none' }}
              />
              <Text as="p" variant="micro" color="secondary">
                Import CSV with Swedish and English columns or TXT with Swedish and English pairs
              </Text>
              <Button onClick={handleTranslateAll} disabled={translatingAll}>
                {translatingAll ? <FaSpinner className="animate-spin" aria-hidden="true" /> : null}
                Translate Unknown Words
              </Button>
              {importMsg ? <Text as="p" variant="caption" color="success">{importMsg}</Text> : null}
            </Stack>
          </Card>

          {words.length === 0 ? (
            <Surface bordered padding="md" tone="paper" style={{ textAlign: 'center' }}>
              <Text as="p" variant="body" color="secondary">
                No words yet. Add some words to get started.
              </Text>
            </Surface>
          ) : (
            <Stack as="ul" direction="column" gap="10px" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {words.map((w, i) => {
                const isSkillWord = i < skillWords.length;
                return (
                  <li key={`${w.swedish}-${i}`}>
                    <ListRow
                      interactive
                      className={isSkillWord ? 'fd-surface-success' : 'fd-surface-warning'}
                      leading={(
                        <button
                          type="button"
                          aria-label={`Play ${w.swedish}`}
                          onClick={() => playSwedish(w.swedish)}
                          style={{
                            border: '1px solid var(--fd-border-default)',
                            background: 'var(--fd-bg-surface)',
                            color: 'var(--fd-accent-strong)',
                            borderRadius: '999px',
                            width: '34px',
                            height: '34px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <MdVolumeUp />
                        </button>
                      )}
                      title={editIdx === i ? null : (
                        <Stack direction="row" align="center" gap="8px" wrap>
                          <Text as="span" variant="body" weight="semibold">{w.swedish}</Text>
                          <Text as="span" variant="caption" color="muted">to</Text>
                          <Text as="span" variant="body" color="secondary">{w.english}</Text>
                          {isSkillWord ? <Chip tone="success">Skill</Chip> : null}
                          {w.english === '(unknown)' ? <Chip tone="warning">Unknown</Chip> : null}
                        </Stack>
                      )}
                      subtitle={editIdx === i ? null : (
                        <Stack direction="row" gap="8px" wrap align="center">
                          <Chip tone="success">✓ {w.stats?.correct || 0}</Chip>
                          <Chip tone="danger">✗ {w.stats?.incorrect || 0}</Chip>
                          <Chip>⏱ {w.stats?.lastPracticed ? new Date(w.stats.lastPracticed).toLocaleDateString() : 'Never'}</Chip>
                        </Stack>
                      )}
                      trailing={(
                        <Stack direction="row" gap="8px" align="center">
                          {editIdx === i ? (
                            <>
                              <Button variant="secondary" onClick={saveEdit}>Save</Button>
                              <Button variant="ghost" onClick={cancelEdit}>Cancel</Button>
                            </>
                          ) : (
                            <>
                              {w.english === '(unknown)' ? (
                                <Button
                                  variant="secondary"
                                  onClick={() => handleTranslate(i, w.swedish)}
                                  disabled={translatingIdx === i}
                                >
                                  {translatingIdx === i ? <FaSpinner className="animate-spin" aria-hidden="true" /> : null}
                                  Translate
                                </Button>
                              ) : null}
                              {!isSkillWord ? (
                                <>
                                  <Button variant="secondary" aria-label="Edit word" onClick={() => startEdit(i)} leftIcon={<FaEdit />}>
                                    Edit
                                  </Button>
                                  <Button variant="destructive" aria-label="Delete word" onClick={() => onDelete(i)} leftIcon={<FaTrash />}>
                                    Delete
                                  </Button>
                                </>
                              ) : null}
                            </>
                          )}
                        </Stack>
                      )}
                    >
                      {editIdx === i ? (
                        <Stack direction="row" gap="8px" wrap>
                          <Input
                            label="Swedish"
                            value={editSwedish}
                            onChange={(e) => setEditSwedish(e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            label="English"
                            value={editEnglish}
                            onChange={(e) => setEditEnglish(e.target.value)}
                            className="flex-1"
                          />
                        </Stack>
                      ) : null}
                    </ListRow>
                  </li>
                );
              })}
            </Stack>
          )}
        </Stack>
      </Card>
    </div>
  );
});

export default WordList;
