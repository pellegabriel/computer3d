import React from 'react';
import './ButtonLink.css'; // Asegúrate de crear y usar este archivo CSS

function ButtonLink({ url, text, position }) {
  return (
    <div className='button' position={position}>
      <a href={url} target="_blank" rel="noopener noreferrer" className="bouncy">
        <button className="bouncy-button">
          {text}
        </button>
      </a>
    </div>
  );
}

export default ButtonLink;
