import React, { useState, useEffect } from 'react';
import '../../cyberpunk.css';
import './CyberInfoText.css';

const CyberInfoText = ({ title, details, isVisible }) => {
  const [glitching, setGlitching] = useState(false);
  const [, setTextVisible] = useState(false);
  const [currentText, setCurrentText] = useState('');

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

  return (
    <div 
      className="cyber-info-container cyber-razor-top cyber-razor-bottom bg-black"
      style={{ 
        padding: '1rem',
        zIndex: 1002,
        '--bg-opacity': '0.4',
        position: 'absolute',
        width: '100%',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.05s ease-out'
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
            marginTop: '0px'
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
        }}
      >
        <div className={`cyber-text ${glitching ? 'cyber-glitch-0' : ''}`}>
          {currentText}
          <span className="cyber-cursor">_</span>
        </div>
      </div>
    </div>
  );
};

export default CyberInfoText;