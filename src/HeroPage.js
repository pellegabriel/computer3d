import React from 'react';

export default function HeroPage() {
  return (
    <div className="relative bg-gray-50" style={{ width: '100%', height: '100%' }}>
      <iframe
        src="https://polvorin01.netlify.app/"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
      />
    </div>
  );
}
