import React from 'react';
import { Linkedin, Github, FileText } from 'lucide-react';
import '../../cyberpunk.css';

function CybrButtons() {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '1rem',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '1rem',
      position: 'fixed', // Cambiado a fixed para que se quede en la pantalla
      bottom: '20px', // Distancia desde abajo
      left: '2%', // Centro horizontal
      zIndex: 1002,
      maxWidth: '600px' // Limita el ancho máximo
      }}>
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
        href="https://github.com/YourGithubUsername"
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
  );
}

export default CybrButtons;