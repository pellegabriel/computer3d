import React, { useState, useEffect } from 'react';
import '../../cyberpunk.css';
import './CyberInfoText.css';

const CyberInfoText = ({ title, details, isVisible }) => {
  const [glitching, setGlitching] = useState(false);
  const [, setTextVisible] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

// Glitch effect
useEffect(() => {
  const glitchInterval = setInterval(() => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), 200);
  }, 3000);

  return () => clearInterval(glitchInterval);
}, []);

useEffect(() => {
  if (isVisible) {
    setTextVisible(true);
    let index = 0;
    const textInterval = setInterval(() => {
      if (index <= details.length) {
        setCurrentText(details.slice(0, index));
        index++;
      } else {
        clearInterval(textInterval);
      }
    }, 15);

    return () => clearInterval(textInterval);
  } else {
    setTextVisible(false);
    setCurrentText('');
  }
}, [isVisible, details]);

useEffect(() => {
  if (isVisible) {
    setIsExpanded(true);  // Expandir cuando se hace visible
    const hideTimer = setTimeout(() => {
      if (!isHovered) {
        setIsExpanded(false);
      }
    }, 5000);

    return () => clearTimeout(hideTimer);
  }
}, [isVisible, isHovered]);


return (
  <>
    {/* Botón separado del panel principal */}
    <div
      style={{
        position: 'absolute',
        left: '0',
        right: '0',
        bottom: '0',
        height: '0',
        zIndex: 1003,
        pointerEvents: 'none'
      }}
    >
      <button
        className=" bg-white fg-black"
        style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '40px',
          opacity: isExpanded ? 0 : 1,
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto'
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          setIsExpanded(true);
        }}
      >
        <span 
          className="cyber-glitch-2" 
          style={{ 
            transform: 'rotate(90deg)',
            fontSize: '1.2rem'
          }}
        >
            ↑
        </span>
      </button>
    </div>

    {/* Panel principal */}
    <div
      style={{
        position: 'absolute',
        left: '0',
        right: '0',
        bottom: isExpanded ? '0' : '-100%',
        transition: 'bottom 0.5s ease-in-out',
        width: '100%',
        zIndex: 1002,
        maxHeight: '40vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isVisible) {
          setTimeout(() => {
            if (!isHovered) {
              setIsExpanded(false);
            }
          }, 1000);
        }
      }}
    >
      <div 
        className="cyber-info-container cyber-razor-top cyber-razor-bottom bg-black"
        style={{ 
          padding: '1rem',
          '--bg-opacity': '0.4',
          width: '100%',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.05s ease-out',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5))',
          borderTop: '2px solid #00ff00'
        }}
      >
        <div 
          className={`cyber-tile ${glitching ? 'cyber-glitch-2' : ''}`}
          style={{
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <h2 
            className="cyber-h cyberpunk-font" 
            style={{ 
              marginTop: '0px',
              fontSize: '1.5rem'
            }}
          >
            {title}
          </h2>
        </div>

        <div 
          className="code-block bg-dark fg-white" 
          data-title="DETAILS://" 
          style={{
            position: 'relative',
            maxHeight: '25vh',
            overflowY: 'auto'
          }}
        >
          <div className={`cyber-text ${glitching ? 'cyber-glitch-0' : ''}`}>
            {currentText}
            <span className="cyber-cursor">_</span>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default CyberInfoText;