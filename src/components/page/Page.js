import React, { useState, memo } from "react";

export default function Page() {
  const urls = [
    "https://polvorin01.netlify.app/",
    "https://www.teiki.com.ar/",
    "https://dchess.net/",
    "https://www.akronym.cr/"
  ];

  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

  const NavigationButton = memo(({ direction, onClick, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="fg-black cyber-glitch-2"
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [direction === 'left' ? 'left' : 'right']: '-50px',
        width: '60px',
        height: '200px',
        backgroundColor: 'rgba(255, 255, 0, 0.8)',
        border: '1px solid #00ff00',
        color: '#00ff00',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        fontSize: '2rem',
        transition: 'all 0.3s ease',
        zIndex: 1009
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
        }
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'rgba(255, 255, 0, 0.8)'
      }}
    >
      {direction === 'left' ? '←' : '→'}
    </button>
  ));

  const UrlIndicator = () => (
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        left: '60px', // Cambiado de 50% a 60px para posicionarlo a la izquierda
        transform: 'none', // Eliminado translateX ya que no necesitamos centrar
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '5px 15px',
        borderRadius: '15px',
        border: '1px solid #00ff00',
        color: '#ffffff',
        fontSize: '2rem',
        zIndex: 100
      }}
    >
      {`${currentUrlIndex + 1}/${urls.length}`}
    </div>
  );

  return (
    <div style={{ 
      width: "calc(100% + 100px)",
      height: "100%",
      position: "relative",
      left: "-50px",
      overflow: "visible"
    }}>
      <div style={{ 
        width: "calc(100% - 100px)",
        height: "100%",
        margin: "0 50px",
        position: "relative"
      }}>
        <iframe
          title="UniqueTitleForIframe"
          src={urls[currentUrlIndex]}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            transition: "opacity 0.3s ease",
          }}
        />
      </div>

      <NavigationButton
        direction="left"
        onClick={() => setCurrentUrlIndex((prev) => (prev - 1 + urls.length) % urls.length)}
        disabled={false}
      />
      
      <NavigationButton
        direction="right"
        onClick={() => setCurrentUrlIndex((prev) => (prev + 1) % urls.length)}
        disabled={false}
      />

      <UrlIndicator />
    </div>
  );
}