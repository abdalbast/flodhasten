import React, { useState, useRef } from 'react';
import { MdZoomIn, MdZoomOut } from 'react-icons/md';

// Interactive map of Sweden
function Explore({ isDarkMode }) {
  const [mapScale, setMapScale] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);

  const textColor = isDarkMode ? '#ffffff' : '#333333';
  const backgroundColor = isDarkMode ? '#2d2d2d' : '#f5f5f5';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e0e0e0';
  const titleColor = isDarkMode ? '#64b5f6' : '#2193b0';



  // Map interaction handlers
  const handleZoomIn = () => {
    setMapScale(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setMapScale(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - mapPosition.x, y: e.clientY - mapPosition.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setMapPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setMapScale(prev => Math.max(0.5, Math.min(3, prev * delta)));
  };

  const resetMapView = () => {
    setMapScale(1);
    setMapPosition({ x: 0, y: 0 });
  };

  return (
    <div style={{
      padding: '1rem',
      backgroundColor: backgroundColor,
      minHeight: '100vh',
      color: textColor
    }}>
      <h2 style={{ 
        color: titleColor, 
        textAlign: 'center', 
        marginBottom: '1rem',
        fontSize: '2rem'
      }}>
        Explore Sweden
      </h2>

      {/* Map Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={handleZoomIn}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: cardBackground,
            border: `1px solid ${borderColor}`,
            borderRadius: '8px',
            color: textColor,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          title="Zoom In"
        >
          <MdZoomIn />
          Zoom In
        </button>
        <button
          onClick={handleZoomOut}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: cardBackground,
            border: `1px solid ${borderColor}`,
            borderRadius: '8px',
            color: textColor,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          title="Zoom Out"
        >
          <MdZoomOut />
          Zoom Out
        </button>
        <button
          onClick={resetMapView}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: cardBackground,
            border: `1px solid ${borderColor}`,
            borderRadius: '8px',
            color: textColor,
            cursor: 'pointer'
          }}
          title="Reset View"
        >
          Reset View
        </button>
      </div>

      {/* Interactive Map Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        height: '500px',
        margin: '0 auto 2rem',
        border: `3px solid ${borderColor}`,
        borderRadius: '20px',
        overflow: 'hidden',
        background: backgroundColor,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      ref={mapRef}
      >
        {/* Map Canvas */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: `scale(${mapScale}) translate(${mapPosition.x / mapScale}px, ${mapPosition.y / mapScale}px)`,
          transformOrigin: 'center',
          transition: isDragging ? 'none' : 'transform 0.1s ease'
        }}>
          {/* Sweden Map Background Image */}
          <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            backgroundImage: 'url(/sweden-map.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
          </div>
        </div>
      </div>




    </div>
  );
}

export default Explore; 