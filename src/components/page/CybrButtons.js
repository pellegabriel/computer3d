import React from 'react';
import './CybrButtons.css';

function CybrButtons() {
  return (
      <div className="button-container">
      <a href="https://polvorin01.netlify.app/" target="_blank" rel="noopener noreferrer">
        <button className="cybr-btn">
          Go to Profile<span aria-hidden>_</span>
          <span aria-hidden className="cybr-btn__glitch">Go to Profile_</span>
        </button>
      </a>
      <a href="/cv.pdf" download>
        <button className="cybr-btn">
          Download CV<span aria-hidden>_</span>
          <span aria-hidden className="cybr-btn__glitch">Download CV_</span>
        </button>
      </a>
    </div>
  );
}

export default CybrButtons;
