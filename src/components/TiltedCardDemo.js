import React from 'react';
import TiltedCard from './TiltedCard';
import './TiltedCardDemo.css';

const TiltedCardDemo = () => {
  return (
    <div className="tilted-card-demo">
      <h2>TiltedCard Demo</h2>
      <p>Hover over the card to see the 3D tilt effect</p>
      
      <TiltedCard
        imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
        altText="Kendrick Lamar - GNX Album Cover"
        captionText="Kendrick Lamar - GNX"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
          <p className="tilted-card-demo-text">
            Kendrick Lamar - GNX
          </p>
        }
      />
      
      <div className="demo-info">
        <h3>Features:</h3>
        <ul>
          <li>✅ 3D tilt effect on mouse movement</li>
          <li>✅ Smooth spring animations</li>
          <li>✅ Scale on hover</li>
          <li>✅ Overlay content display</li>
          <li>✅ Responsive design</li>
          <li>✅ Dark mode support</li>
          <li>✅ Accessibility features</li>
        </ul>
      </div>
    </div>
  );
};

export default TiltedCardDemo;
