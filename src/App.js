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
import { CyberInfoText } from './components/InfoText/CyberInfoText';

// Componentes de UI
const NavigationButton = ({ onClick, disabled, position }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      position: 'absolute',
      top: '50%',
      [position]: '20px',
      transform: 'translateY(-50%)',
      padding: '10px',
      fontSize: '24px',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      border: 'none',
      borderRadius: '5px',
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

  const cameraPoints = [
    { 
      position: new Vector3(10, 1, -13), 
      lookAt: new Vector3(-15, 3, 10), 
      info: {
        title: "Vista Principal del Apartamento",
        description: "Espacio de trabajo cyberpunk",
        details: "Un ambiente futurista diseñado para la productividad.\nEquipado con tecnología de última generación y detalles neón.\nPerfecto para desarrolladores y creativos digitales."
      }
    },
    { 
      position: new Vector3(-10, 15, 20), 
      lookAt: new Vector3(0, 3, 300), 
      info: {
        title: "Vista Aérea del Complejo",
        description: "Perspectiva panorámica cyberpunk",
        details: "Observa la integración de luces LED y arquitectura moderna.\nSistemas de seguridad automatizados y drones de vigilancia.\nTerrazas con jardines verticales y paneles solares."
      }
    },
    { 
      position: new Vector3(50, 10, 0), 
      lookAt: new Vector3(0, 3, 400), 
      info: {
        title: "Detalle de la Fachada",
        description: "Diseño arquitectónico futurista",
        details: "Pantallas holográficas integradas en las paredes.\nSistemas de iluminación adaptativos.\nMateriales inteligentes que responden al ambiente."
      }
    },
    { 
      position: new Vector3(40, -5, -10), 
      lookAt: new Vector3(-100, -20, 0), 
      info: {
        title: "Vista del Jardín Trasero",
        description: "Área de descanso high-tech",
        details: "Vegetación sintética con iluminación biónica.\nSistema de clima controlado por IA.\nZona de recarga inalámbrica para dispositivos."
      }
    }
  ];
  
  // Solo usar el temporizador para el loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Aumenté a 5 segundos para dar más tiempo de carga

    return () => clearTimeout(timer);
  }, []);

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
      borderWidth: '5px', 
      height: '100vh', 
      borderColor: '#DF0B55', 
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
          />
        </Suspense>
      </Canvas>

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
    </div>
  );
}

// Simplificado el componente Scene sin el onLoaded
const Scene = ({ currentIndex, cameraPoints }) => {
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