import React from 'react';
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
      width: '100%', // Asegura que tome el ancho completo
      maxWidth: '600px' // Limita el ancho máximo
      }}>
      <a href="https://polvorin01.netlify.app/" 
         target="_blank" 
         rel="noopener noreferrer"
         style={{ position: 'relative', zIndex: 1002 }}>
        <button className="cyber-button bg-cyan fg-black">
          Go to Profile
          <span className="glitchtext">ACCESSING</span>
          <span className="tag">P01</span>
        </button>
      </a>

      <a href="/cv.pdf" 
         download
         style={{ position: 'relative', zIndex: 1002 }}>
        <button className="cyber-button bg-red fg-white">
          Download CV
          <span className="glitchtext">DOWNLOADING</span>
          <span className="tag">CV2</span>
        </button>
      </a>
    </div>
  );
}

export default CybrButtons;