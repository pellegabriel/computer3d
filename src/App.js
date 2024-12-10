import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { Vector3 } from 'three';

import { Apartments } from "./components/models/Apartment";
import { Revolver } from "./components/models/Revolver";
import { Mask } from "./components/models/Mask";
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
      backgroundColor: 'rgba(255, 255, 255,1)',
      border: 'none',
      borderRadius: position === 'left' 
        ? '0 30px 30px 0' 
        : '30px 0 0 30px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      zIndex: 1001
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
      position: new Vector3(0, 2.8, -20), 
      lookAt: new Vector3(-2, 1, 30), 
      info: {
        title: "Computer CV",
        description: "Next.js, React Native & SvelteKit Developer",
        details: "Specialist in web and mobile development with Next.js and React Native.\nProficient in TypeScript and modern architectures.\nExperience creating intuitive interfaces with Tailwind and Material-UI.\nPassionate about technological innovation and user-centered design."
      }
    },
    { 
      position: new Vector3(-10, 15, 20), 
      lookAt: new Vector3(0, 3, 300), 
      info: {
        title: "Description",
        description: "Software Engineer from UNLP",
        details: "Full Stack Developer with 4 years of experience.\nSpecialized in modern frontend technologies and UI/UX design.\nExperience in high-impact projects and enterprise systems.\nStrong knowledge of AWS and cloud architectures."
      }
    },
    { 
      position: new Vector3(50, 10, 0), 
      lookAt: new Vector3(0, 3, 400), 
      info: {
        title: "More About Me",
        description: "Skills & Interests",
        details: "Versatile developer with React, Next.js, and React Native.\nExperience in interface design with Figma.\nInterested in FinTech and microservices innovations.\nB2-C1 English level for international collaboration."
      }
    },
    { 
      position: new Vector3(45, 0, -9), 
      lookAt: new Vector3(-200, -20, -50), 
      info: {
        title: "Experience",
        description: "Professional Journey",
        details: "Full Stack Developer at Delsud - Chess application development with AWS and Next.js\nReact Native Developer at Teiki Company - Web and mobile applications development\nFront-end Developer at Coderhood - Medication delivery system and environmental PaaS\nFront-end Developer at Akronym - Svelte applications for equine registry and medical system"
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
    <div style={{
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
          
          <CybrButtons/>
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
      
      <group rotation={[0, Math.PI, 0]} position={[0, 0, 0]}>
        <Model />
        <GunBot/>
        <Apartments />
        <Revolver/>
        <Mask/>
        <Katana/>
      </group>
      <Environment preset="city" />
      <ContactShadows position={[0, -3.9, 0]} scale={20} blur={1.5} far={5} />
    </>
  );
};