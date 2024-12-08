import React, { useState, useEffect } from 'react';
import '../../cyberpunk.css';

const CyberInfoText = ({ title, description, details, isVisible }) => {
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
    className="cyber-info-container cyber-razor-top cyber-razor-bottom bg-black"
    style={{ 
      opacity: isVisible ? 1 : 0,
      padding: '1rem',
      zIndex: 1002,
      '--bg-opacity': '0.4',
      
    }}
  >
      <div className="cyber-tile cyber-glitch-2" >
        <h2 className="cyber-h cyberpunk-font" style={{ marginTop: '0px' }}>
          {title}
        </h2>
      </div>
      <div className="code-block bg-dark fg-white" data-title="DETAILS://" >
        <div className="cyber-glitch-0">
          {details}
        </div>
      </div>
    </div>
  );
};

export default CyberInfoText;