import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { Vector3 } from 'three';

import { Can } from "./components/models/Can";
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
      top: '35%',
      [position]: '0px',
      transform: 'translateY(-50%)',
      padding: '10px',
      fontSize: '24px',
      backgroundColor: 'rgba(255, 255, 255,)',
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
  const [modelsLoaded, setModelsLoaded] = useState(false);


  const cameraPoints = [
    { 
      position: new Vector3(0, 2.8, -20), 
      lookAt: new Vector3(-2, 1, 30), 
      info: {
        title: "Computer Cv",
        description: "Espacio de trabajo cyberpunk",
        details: "Un ambiente futurista diseñado para la productividad.\nEquipado con tecnología de última generación y detalles neón.\nPerfecto para desarrolladores y creativos digitales."
      }
    },
    { 
      position: new Vector3(-10, 15, 20), 
      lookAt: new Vector3(0, 3, 300), 
      info: {
        title: "Description",
        description: "Perspectiva panorámica cyberpunk",
        details: "Observa la integración de luces LED y arquitectura moderna.\nSistemas de seguridad automatizados y drones de vigilancia.\nTerrazas con jardines verticales y paneles solares."
      }
    },
    { 
      position: new Vector3(50, 10, 0), 
      lookAt: new Vector3(0, 3, 400), 
      info: {
        title: "More about me",
        description: "Diseño arquitectónico futurista",
        details: "Pantallas holográficas integradas en las paredes.\nSistemas de iluminación adaptativos.\nMateriales inteligentes que responden al ambiente."
      }
    },
    { 
      position: new Vector3(45, 0, -9), 
      lookAt: new Vector3(-200, -20, -50), 
      info: {
        title: "Experience",
        description: "Área de descanso high-tech",
        details: "Vegetación sintética con iluminación biónica.\nSistema de clima controlado por IA.\nZona de recarga inalámbrica para dispositivos."
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
        <Can />
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