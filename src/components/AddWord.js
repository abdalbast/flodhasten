import React, { useState } from 'react';
import { MdAddCircle } from 'react-icons/md';

// Form to add a new Swedish word and its English meaning
function AddWord({ onAdd }) {
  const [swedish, setSwedish] = useState('');
  const [english, setEnglish] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!swedish.trim() || !english.trim()) {
      setMessage('Please enter both words.');
      return;
    }
    onAdd({ swedish, english });
    setSwedish('');
    setEnglish('');
    setMessage('Word added!');
    setTimeout(() => setMessage(''), 1200);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 350, margin: '2rem auto', background: '#e0f7fa', padding: '1.5rem', borderRadius: 16, boxShadow: '0 2px 8px #b2ebf2' }}>
      <h2 style={{ color: '#2193b0' }}><MdAddCircle style={{verticalAlign:'middle',marginRight:6}}/>Add New Word</h2>
      <label style={{ display: 'block', margin: '1rem 0 0.3rem' }}>Swedish</label>
      <input value={swedish} onChange={e => setSwedish(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #b2ebf2' }} />
      <label style={{ display: 'block', margin: '1rem 0 0.3rem' }}>English</label>
      <input value={english} onChange={e => setEnglish(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #b2ebf2' }} />
      <button type="submit" style={{ 
        marginTop: 18, 
        width: '100%', 
        background: '#2193b0', 
        color: '#fff', 
        border: 'none', 
        borderRadius: 8, 
        padding: 10, 
        fontWeight: 'bold', 
        fontSize: 16, 
        cursor: 'pointer',
        transition:'all 0.2s ease',
        transform:'translateY(0)',
        boxShadow:'0 2px 6px rgba(0,0,0,0.1)'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 4px 12px rgba(33, 147, 176, 0.3)';
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
        e.target.style.boxShadow = '0 4px 12px rgba(33, 147, 176, 0.3)';
      }}
      >Add</button>
      {message && <div style={{ color: '#388e3c', marginTop: 10 }}>{message}</div>}
    </form>
  );
}

export default AddWord; 