import React from 'react';
import { MdFlip, MdCompareArrows, MdSpellcheck, MdQuiz, MdVolumeUp, MdHighlightOff } from 'react-icons/md';

// Menu to pick a game
function GamesMenu({ setGame, isDarkMode }) {
  const containerBg = isDarkMode ? '#2d2d2d' : '#e1f5fe';
  const containerShadow = isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px #81d4fa';
  const titleColor = isDarkMode ? '#64b5f6' : '#0288d1';
  const borderColor = isDarkMode ? '#555555' : 'transparent';

  return (
    <div style={{
      maxWidth:350,
      margin:'2rem auto',
      background: containerBg,
      padding:'1.5rem',
      borderRadius:16,
      boxShadow: containerShadow,
      textAlign:'center',
      border: `1px solid ${borderColor}`
    }}>
      <h2 style={{color: titleColor}}>Pick a Game</h2>
      <div style={{display:'flex',flexDirection:'column',gap:16,marginTop:20}}>
        <button onClick={()=>setGame('flashcards')} style={{
          background:'#2193b0',
          color:'#fff',
          border:'none',
          borderRadius:8,
          padding:'0.8rem',
          fontWeight:'bold',
          fontSize:16,
          cursor:'pointer',
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
        ><MdFlip style={{verticalAlign:'middle',marginRight:6}}/>Flashcards</button>
        
        <button onClick={()=>setGame('matching')} style={{
          background:'#8e24aa',
          color:'#fff',
          border:'none',
          borderRadius:8,
          padding:'0.8rem',
          fontWeight:'bold',
          fontSize:16,
          cursor:'pointer',
          transition:'all 0.2s ease',
          transform:'translateY(0)',
          boxShadow:'0 2px 6px rgba(0,0,0,0.1)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(142, 36, 170, 0.3)';
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
          e.target.style.boxShadow = '0 4px 12px rgba(142, 36, 170, 0.3)';
        }}
        ><MdCompareArrows style={{verticalAlign:'middle',marginRight:6}}/>Matching</button>
        
        <button onClick={()=>setGame('spelling')} style={{
          background:'#fb8c00',
          color:'#fff',
          border:'none',
          borderRadius:8,
          padding:'0.8rem',
          fontWeight:'bold',
          fontSize:16,
          cursor:'pointer',
          transition:'all 0.2s ease',
          transform:'translateY(0)',
          boxShadow:'0 2px 6px rgba(0,0,0,0.1)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(251, 140, 0, 0.3)';
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
          e.target.style.boxShadow = '0 4px 12px rgba(251, 140, 0, 0.3)';
        }}
        ><MdSpellcheck style={{verticalAlign:'middle',marginRight:6}}/>Spelling Challenge</button>
        
        <button onClick={()=>setGame('multiple')} style={{
          background:'#1976d2',
          color:'#fff',
          border:'none',
          borderRadius:8,
          padding:'0.8rem',
          fontWeight:'bold',
          fontSize:16,
          cursor:'pointer',
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
        ><MdQuiz style={{verticalAlign:'middle',marginRight:6}}/>Multiple Choice</button>
        
        <button onClick={()=>setGame('audio')} style={{
          background:'#388e3c',
          color:'#fff',
          border:'none',
          borderRadius:8,
          padding:'0.8rem',
          fontWeight:'bold',
          fontSize:16,
          cursor:'pointer',
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
        ><MdVolumeUp style={{verticalAlign:'middle',marginRight:6}}/>Audio Recall</button>
        
        <button onClick={()=>setGame('odd')} style={{
          background:'#d81b60',
          color:'#fff',
          border:'none',
          borderRadius:8,
          padding:'0.8rem',
          fontWeight:'bold',
          fontSize:16,
          cursor:'pointer',
          transition:'all 0.2s ease',
          transform:'translateY(0)',
          boxShadow:'0 2px 6px rgba(0,0,0,0.1)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(216, 27, 96, 0.3)';
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
          e.target.style.boxShadow = '0 4px 12px rgba(216, 27, 96, 0.3)';
        }}
        ><MdHighlightOff style={{verticalAlign:'middle',marginRight:6}}/>Odd One Out</button>
      </div>
    </div>
  );
}

export default GamesMenu; 