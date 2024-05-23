import React from 'react';
import './ButtonLink.css';

function ButtonLink({ url, text, style }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="bouncy" style={style}>
      <button className="bouncy-button">
        {text}
      </button>
    </a>
  );
}

export default ButtonLink;
