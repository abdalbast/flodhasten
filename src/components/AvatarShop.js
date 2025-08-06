import React, { useState, useEffect } from 'react';
import { FaCoins, FaStar, FaGift, FaTrophy, FaShoppingCart, FaUser, FaCrown, FaHatCowboy, FaUserTie } from 'react-icons/fa';
import { GiCoffeeCup, GiHouse, GiDress, GiHandBag, GiBookCover, GiMusicalNotes, GiPresent, GiBookmarklet } from 'react-icons/gi';
import { BsPersonFill, BsPersonHeart, BsPersonBoundingBox } from 'react-icons/bs';
import { WiMoonWaningCrescent6 } from 'react-icons/wi';

function AvatarShop({ userXP, userLevel, userCoins, onPurchase, onAvatarChange, currentAvatar, isDarkMode }) {
  const [selectedCategory, setSelectedCategory] = useState('avatars');
  const [dailyObjectives, setDailyObjectives] = useState([]);

  // Moomin-inspired colour palette
  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const backgroundColor = isDarkMode ? '#2d2d2d' : '#f8f9fa';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const moominBlue = '#3498db';
  const moominGreen = '#27ae60';
  const moominYellow = '#f1c40f';
  const moominOrange = '#e67e22';
  const moominPink = '#e91e63';

  // Avatars - Moomin characters with React Icons
  const avatars = [
    { id: 'moomin', name: 'Moomintroll', price: 0, icon: <BsPersonFill />, description: 'The main character' },
    { id: 'snufkin', name: 'Snufkin', price: 50, icon: <FaHatCowboy />, description: 'The wanderer' },
    { id: 'snorkmaiden', name: 'Snorkmaiden', price: 75, icon: <GiDress />, description: 'The fashionable one' },
    { id: 'little-my', name: 'Little My', price: 100, icon: <BsPersonHeart />, description: 'The brave little one' },
    { id: 'hemulen', name: 'Hemulen', price: 125, icon: <FaUserTie />, description: 'The collector' },
    { id: 'groke', name: 'Groke', price: 150, icon: <WiMoonWaningCrescent6 />, description: 'The mysterious one' },
    { id: 'moominmamma', name: 'Moominmamma', price: 175, icon: <BsPersonFill />, description: 'The caring mother' },
    { id: 'moominpappa', name: 'Moominpappa', price: 200, icon: <FaUserTie />, description: 'The adventurous father' },
    { id: 'ninny', name: 'Ninny', price: 225, icon: <WiMoonWaningCrescent6 />, description: 'The shy one' },
    { id: 'sniff', name: 'Sniff', price: 250, icon: <BsPersonBoundingBox />, description: 'The treasure hunter' }
  ];

  // Merchandise - Moomin items with React Icons
  const merchandise = [
    { id: 'coffee-cup', name: 'Coffee Cup', price: 25, icon: <GiCoffeeCup />, description: 'Perfect for fika' },
    { id: 'house', name: 'Moomin House', price: 50, icon: <GiHouse />, description: 'Your cozy home' },
    { id: 'dress', name: 'Snorkmaiden Dress', price: 75, icon: <GiDress />, description: 'Elegant fashion' },
    { id: 'handbag', name: 'Handbag', price: 100, icon: <GiHandBag />, description: 'Stylish accessory' },
    { id: 'book', name: 'Moomin Book', price: 125, icon: <GiBookCover />, description: 'Adventure stories' },
    { id: 'harmonica', name: 'Snufkin\'s Harmonica', price: 150, icon: <GiMusicalNotes />, description: 'Musical magic' },
    { id: 'teddy-bear', name: 'Teddy Bear', price: 175, icon: <GiPresent />, description: 'Cuddly companion' },
    { id: 'mug', name: 'Moomin Mug', price: 200, icon: <GiCoffeeCup />, description: 'Warm drinks' },
    { id: 'hat', name: 'Snufkin\'s Hat', price: 225, icon: <FaHatCowboy />, description: 'Wanderer\'s style' },
    { id: 'bookmark', name: 'Bookmark', price: 250, icon: <GiBookmarklet />, description: 'Keep your place' },
    { id: 'music-notes', name: 'Music Notes', price: 275, icon: <GiMusicalNotes />, description: 'Melodic memories' },
    { id: 'present', name: 'Gift Box', price: 300, icon: <GiPresent />, description: 'Special surprise' }
  ];

  // Daily objectives - Moomin-themed challenges with React Icons
  const objectives = [
    { id: 'complete-lesson', name: 'Complete a Lesson', description: 'Finish any lesson today', xp: 25, icon: <GiBookCover /> },
    { id: 'play-games', name: 'Play 3 Games', description: 'Practice with games', xp: 30, icon: <FaTrophy /> },
    { id: 'learn-words', name: 'Learn 10 Words', description: 'Master new vocabulary', xp: 35, icon: <GiBookmarklet /> },
    { id: 'maintain-streak', name: 'Maintain Streak', description: 'Keep your learning streak', xp: 40, icon: <FaStar /> },
    { id: 'explore-map', name: 'Explore the Map', description: 'Visit the experiment map', xp: 45, icon: <FaUser /> },
    { id: 'shop-visit', name: 'Visit the Shop', description: 'Check out new items', xp: 50, icon: <FaShoppingCart /> }
  ];

  useEffect(() => {
    // Generate random daily objectives
    const shuffled = objectives.sort(() => 0.5 - Math.random());
    setDailyObjectives(shuffled.slice(0, 3));
  }, []);

  const handlePurchase = (item) => {
    if (userCoins >= item.price) {
      onPurchase(item);
    }
  };

  const handleAvatarChange = (avatarId) => {
    onAvatarChange(avatarId);
  };

  return (
    <div style={{
      padding: '2rem',
      background: backgroundColor,
      minHeight: '100vh',
      color: textColor,
      fontFamily: '"Georgia", serif'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        padding: '2rem',
        background: cardBackground,
        borderRadius: '20px',
        boxShadow: isDarkMode 
          ? '0 8px 25px rgba(0,0,0,0.3)' 
          : '0 8px 25px rgba(52, 152, 219, 0.15)',
        border: `2px solid ${borderColor}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: isDarkMode 
            ? 'radial-gradient(circle, rgba(52, 152, 219, 0.1) 0%, transparent 70%)' 
            : 'radial-gradient(circle, rgba(52, 152, 219, 0.05) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite'
        }} />
        
        <h1 style={{
          color: moominBlue,
          fontSize: '3rem',
          margin: '0 0 1rem 0',
          position: 'relative',
          zIndex: 1,
          fontFamily: '"Georgia", serif'
        }}>
          Moomin Shop
        </h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginBottom: '1rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: moominYellow, fontWeight: 'bold' }}>
              Level {userLevel}
            </div>
            <div style={{ fontSize: '0.9rem', color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }}>
              Level
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: moominGreen, fontWeight: 'bold' }}>
              {userXP}
            </div>
            <div style={{ fontSize: '0.9rem', color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }}>
              XP
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: moominOrange, fontWeight: 'bold' }}>
              {userCoins}
            </div>
            <div style={{ fontSize: '0.9rem', color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }}>
              Coins
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <button
          onClick={() => setSelectedCategory('avatars')}
          style={{
            background: selectedCategory === 'avatars' ? moominBlue : cardBackground,
            color: selectedCategory === 'avatars' ? '#fff' : textColor,
            border: `2px solid ${selectedCategory === 'avatars' ? moominBlue : borderColor}`,
            borderRadius: '15px',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: '"Georgia", serif'
          }}
        >
          Characters
        </button>
        <button
          onClick={() => setSelectedCategory('merchandise')}
          style={{
            background: selectedCategory === 'merchandise' ? moominBlue : cardBackground,
            color: selectedCategory === 'merchandise' ? '#fff' : textColor,
            border: `2px solid ${selectedCategory === 'merchandise' ? moominBlue : borderColor}`,
            borderRadius: '15px',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: '"Georgia", serif'
          }}
        >
          Merchandise
        </button>
        <button
          onClick={() => setSelectedCategory('objectives')}
          style={{
            background: selectedCategory === 'objectives' ? moominBlue : cardBackground,
            color: selectedCategory === 'objectives' ? '#fff' : textColor,
            border: `2px solid ${selectedCategory === 'objectives' ? moominBlue : borderColor}`,
            borderRadius: '15px',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: '"Georgia", serif'
          }}
        >
          Daily Objectives
        </button>
      </div>

      {/* Content Area */}
      <div style={{
        background: cardBackground,
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: isDarkMode 
          ? '0 8px 25px rgba(0,0,0,0.3)' 
          : '0 8px 25px rgba(52, 152, 219, 0.15)',
        border: `2px solid ${borderColor}`
      }}>
        {selectedCategory === 'avatars' && (
          <div>
            <h2 style={{ color: moominBlue, marginBottom: '1.5rem', textAlign: 'center' }}>
              Choose Your Character
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {avatars.map((avatar) => (
                <div key={avatar.id} style={{
                  background: backgroundColor,
                  borderRadius: '15px',
                  padding: '1.5rem',
                  border: `2px solid ${currentAvatar === avatar.id ? moominBlue : borderColor}`,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => handleAvatarChange(avatar.id)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  <div style={{ fontSize: '4rem', marginBottom: '1rem', color: moominBlue }}>
                    {avatar.icon}
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: textColor }}>
                    {avatar.name}
                  </h3>
                  <p style={{ 
                    margin: '0 0 1rem 0', 
                    color: isDarkMode ? '#bdc3c7' : '#7f8c8d',
                    fontSize: '0.9rem'
                  }}>
                    {avatar.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: moominOrange, fontWeight: 'bold' }}>
                      {avatar.price} coins
                    </span>
                    {currentAvatar === avatar.id && (
                      <span style={{ color: moominGreen, fontWeight: 'bold' }}>
                        ✓ Selected
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCategory === 'merchandise' && (
          <div>
            <h2 style={{ color: moominBlue, marginBottom: '1.5rem', textAlign: 'center' }}>
              Moomin Merchandise
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {merchandise.map((item) => (
                <div key={item.id} style={{
                  background: backgroundColor,
                  borderRadius: '15px',
                  padding: '1.5rem',
                  border: `2px solid ${borderColor}`,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onClick={() => handlePurchase(item)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  <div style={{ fontSize: '4rem', marginBottom: '1rem', color: moominBlue }}>
                    {item.icon}
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: textColor }}>
                    {item.name}
                  </h3>
                  <p style={{ 
                    margin: '0 0 1rem 0', 
                    color: isDarkMode ? '#bdc3c7' : '#7f8c8d',
                    fontSize: '0.9rem'
                  }}>
                    {item.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: moominOrange, fontWeight: 'bold' }}>
                      {item.price} coins
                    </span>
                    <span style={{ 
                      color: userCoins >= item.price ? moominGreen : '#e74c3c',
                      fontWeight: 'bold'
                    }}>
                      {userCoins >= item.price ? 'Buy' : 'Not enough coins'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCategory === 'objectives' && (
          <div>
            <h2 style={{ color: moominBlue, marginBottom: '1.5rem', textAlign: 'center' }}>
              Daily Objectives
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {dailyObjectives.map((objective) => (
                <div key={objective.id} style={{
                  background: backgroundColor,
                  borderRadius: '15px',
                  padding: '1.5rem',
                  border: `2px solid ${borderColor}`,
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem', color: moominBlue }}>
                    {objective.icon}
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: textColor }}>
                    {objective.name}
                  </h3>
                  <p style={{ 
                    margin: '0 0 1rem 0', 
                    color: isDarkMode ? '#bdc3c7' : '#7f8c8d',
                    fontSize: '0.9rem'
                  }}>
                    {objective.description}
                  </p>
                  <div style={{
                    background: moominGreen,
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '10px',
                    fontWeight: 'bold'
                  }}>
                    +{objective.xp} XP
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CSS animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
          }
        `}
      </style>
    </div>
  );
}

export default AvatarShop; 