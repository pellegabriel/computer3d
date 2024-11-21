// CyberInfoText.jsx
import React, { useState, useEffect } from 'react';
import './CyberInfoText.css';

export const CyberInfoText = ({ title, description, details, isVisible }) => {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`cyber-info-container ${glitching ? 'glitching' : ''}`} 
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="cybr-text main">
        {title}
        <span aria-hidden>_</span>
        <div aria-hidden className="cybr-text__glitch">{title}_</div>
      </div>
      <div className="cybr-text sub">
        {description}
        <div aria-hidden className="cybr-text__glitch">{description}</div>
      </div>
      <div className="cybr-text details">
        {details}
        <div aria-hidden className="cybr-text__glitch">{details}</div>
      </div>
    </div>
  );
};