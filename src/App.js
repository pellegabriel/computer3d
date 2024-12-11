import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { Vector3 } from 'three';

import { Apartments } from "./components/models/Apartment";
import { Revolver } from "./components/models/Revolver";
import { Katana } from "./components/models/Katana";
import { GunBot } from "./components/models/Gun-bot";
import CybrButtons from "./components/page/CybrButtons";
import { Loader, Loader3D } from "./components/loader/Loader";
import { Model } from "./components/page/Model";
import { CameraScroll } from "./components/cameraScroll/CameraScroll";
import CyberInfoText from './components/InfoText/CyberInfoText';

const NavigationButton = ({ onClick, disabled, position }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      position: 'absolute',
      top: '41%',
      [position]: '0px',
      transform: 'translateY(-50%)',
      padding: '5px',
      fontSize: '20px',
      backgroundColor: 'rgba(255, 255, 255, 1)', // Blanco opaco inicial
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      zIndex: 1001,
      width: '35px',
      height: '100px',
      border: '0.5px #ffffff', // Borde verde brillante
      transition: 'all 0.3s ease', // Transiciones suaves para hover y focus
      boxShadow: disabled
        ? 'none'
        : '0 0 10px rgba(0, 255, 0, 0.3)', // Efecto de brillo si está habilitado
    }}
    onMouseEnter={(e) => {
      if (!disabled) {
        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Verde translúcido en hover
      }
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)'; // Vuelve al blanco
    }}
    onBlur={(e) => {
      e.target.style.borderColor = '#ffffff'; // Regresa al borde verde
    }}
  >
    {position === 'left' ? '←' : '→'}
  </button>
);


export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [, setModelsLoaded] = useState(false);

  const cameraPoints = [
    { 
      position: new Vector3(0, 2.8, -13), 
      lookAt: new Vector3(-2, -10, 30), 
      info: {
        title: "Experience",
        description: "Professional Journey",
        details: "Front-end Developer at Akronym - Created sleek and efficient apps using Svelte for equine systems.\nFront-end Developer at Delsud - Built a chess app with Next.js and AWS.\nReact Native Developer at Teiki Company - Worked on web and mobile apps with great design and functionality.\nFront-end Developer at Coderhood - Delivered impactful systems, like a medication delivery app."
      }
    },
    { 
      position: new Vector3(-10, 3, 20), 
      lookAt: new Vector3(0, 50, 300), 
      info: {
        title: "Description",
        description: "What I Bring",
        details: "I love creating apps that people enjoy using. From clean designs to solid functionality, I aim to make tech easy and accessible.\nI'm always curious and looking to improve my skills, especially in design and development."
      }
    },
    { 
      position: new Vector3(30, 10, 2), 
      lookAt: new Vector3(-10, 3, 400), 
      info: {
        title: "Tech & Tools",
        description: "What I Work With",
        details: "React, Next.js, Svelte, React Native.\nUI design with Figma, Tailwind, and Material-UI.\nExperience with TypeScript, Zustand, AWS, and modern architectures."
      }
    },
    { 
      position: new Vector3(45, -5, -3), 
      lookAt: new Vector3(-300, -20, -50),
      info: {
        title: "More About Me",
        description: "Skills & Interests",
        details: "I enjoy designing intuitive interfaces and crafting great user experiences.\nBig fan of FinTech and microservices innovation.\nAlways open to learning and collaborating with diverse teams."
      }
    }
  ];
  

  const handleModelsLoaded = () => {
    setModelsLoaded(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleLeft = () => {
    setIsInfoVisible(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cameraPoints.length);
      setIsInfoVisible(true);
    }, 500);
  };

  const handleRight = () => {
    setIsInfoVisible(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? cameraPoints.length - 1 : prevIndex - 1
      );
      setIsInfoVisible(true);
    }, 500);
  };

  return (
    <div          className="cyber-glitch-1"
    style={{
      borderWidth: '15px', 
      height: '100vh', 
      borderColor: 'black', 
      position: 'relative'
    }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000
        }}>
          <Loader />
        </div>
      )}

      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Suspense fallback={<Loader3D />}>
          <Scene 
            currentIndex={currentIndex} 
            cameraPoints={cameraPoints}
            onLoaded={handleModelsLoaded}
          />
        </Suspense>
      </Canvas>

      {!isLoading && (
        <>
                  <CybrButtons/>

          <NavigationButton 
            onClick={handleLeft} 
            disabled={currentIndex === cameraPoints.length - 1}
            position="left"
          />
          <NavigationButton 
            onClick={handleRight} 
            disabled={currentIndex === 0}
            position="right"
          />
          
          <CyberInfoText 
            title={cameraPoints[currentIndex].info.title}
            description={cameraPoints[currentIndex].info.description}
            details={cameraPoints[currentIndex].info.details}
            isVisible={isInfoVisible}
          />
          
        </>
      )}
    </div>
  );
}

const Scene = ({ currentIndex, cameraPoints, onLoaded }) => {
  useEffect(() => {
    // Simular tiempo de carga de los modelos
    const loadTimer = setTimeout(() => {
      onLoaded();
    }, 3000); // Ajusta este tiempo según lo que necesites

    return () => clearTimeout(loadTimer);
  }, [onLoaded]);

  return (
    <>
      <CameraScroll cameraPoints={cameraPoints} currentIndex={currentIndex}>
        <PerspectiveCamera makeDefault position={[0, 10, -10]} fov={55} />
      </CameraScroll>
      
      <group rotation={[0, Math.PI, 0]} position={[0, 0, 0]} style={{indexz: 1000}}>
        <Model />
        <GunBot/>
        <Apartments />
        <Revolver/>
        <Katana/>
      </group>
      <Environment preset="city" />
      <ContactShadows position={[0, -3.9, 0]} scale={20} blur={1.5} far={5} />
    </>
  );
};