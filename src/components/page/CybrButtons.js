import React, { useState, useEffect, memo } from 'react';
import { Linkedin, Github, FileText } from 'lucide-react';
import '../../cyberpunk.css';

const CybrButtons = memo(() => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      if (!isHovered) {
        setIsExpanded(false);
      }
    }, 1);

    return () => clearTimeout(hideTimer);
  }, [isHovered]);

  return (
    <>
      <div
style={{
  position: 'fixed',
  top: '0px',
  right: isExpanded ? '0px' : '-100%',
  transition: 'top 0.5s ease-in-out',
  zIndex: 1002,
  maxWidth: '600px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setTimeout(() => {
            if (!isHovered) {
              setIsExpanded(false);
            }
          }, 1000);
        }}
      >
        <div className="flex flex-col gap-4 p-4">
          <a
            href="https://www.linkedin.com/in/gabrielpelle/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-[1002]"
          >
            <button className="cyber-button bg-blue fg-white w-full flex items-center justify-center gap-2">
              <Linkedin size={20} />
              Go to LinkedIn
              <span className="glitchtext">ACCESSING</span>
              <span className="tag">P01</span>
            </button>
          </a>

          <a
            href="https://github.com/pellegabriel"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-[1002]"
          >
            <button className="cyber-button bg-purple fg-white w-full flex items-center justify-center gap-2">
              <Github size={20} />
              Go to GitHub
              <span className="glitchtext">ACCESSING</span>
              <span className="tag">P02</span>
            </button>
          </a>

          <a
            href="/cv.pdf"
            download
            className="relative z-[1002]"
          >
            <button className="cyber-button bg-white fg-black w-full flex items-center justify-center gap-2">
              <FileText size={20} />
              Download CV
              <span className="glitchtext">DOWNLOADING</span>
              <span className="tag">CV2</span>
            </button>
          </a>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          top: '0px',
          right: '5px',
          zIndex: 1003,
          pointerEvents: 'none',
        }}
      >
        <button
          className="cyber-button bg-white fg-black"
          style={{
            width: '200px',
            height: '40px',
            opacity: isExpanded ? 0 : 1,
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={() => {
            setIsHovered(true);
            setIsExpanded(true);
          }}
        >
          <span  
            style={{ 
              fontSize: '0.8rem'
            }}
          >
            Menu
          </span>
        </button>
      </div>
    </>
  );
});

export default CybrButtons;