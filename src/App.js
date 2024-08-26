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
import { Loader } from "./components/loader/Loader";
import { Model } from "./components/page/Model";
import { CameraScroll } from "./components/cameraScroll/CameraScroll";


//ver como aplicar algo asi pero al loader en si
const CenteredLoader = () => (
  <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000
  }}>
    <Loader />
  </div>
);

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

const PositionInfo = ({ text, isVisible }) => (
  <div
    style={{
      position: 'absolute',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.5s ease-in-out',
      zIndex: 1002
    }}
  >
    {text}
  </div>
);

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInfoVisible, setIsInfoVisible] = useState(true);

  const cameraPoints = [
    { position: new Vector3(10, 1, -13), lookAt: new Vector3(-15, 3, 10), info: "Vista principal del apartamento" },
    { position: new Vector3(-10, 15, 20), lookAt: new Vector3(0, 3, 300), info: "Vista aérea del complejo" },
    { position: new Vector3(50, 10, 0), lookAt: new Vector3(0, 3, 400), info: "Detalle de la fachada" },
    { position: new Vector3(40, -5, -10), lookAt: new Vector3(-100, -20, 0), info: "Vista del jardín trasero" },
  ];

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
    <div style={{borderWidth: '5px', height: '100%', borderColor: '#DF0B55', position: 'relative'}}>
      <Canvas>
        <CameraScroll cameraPoints={cameraPoints} currentIndex={currentIndex}>
          <PerspectiveCamera makeDefault position={[0, 10, -10]} fov={55} />
          <Suspense fallback={<CenteredLoader />}>
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
          </Suspense>
          <ContactShadows position={[0, -3.9, 0]} scale={20} blur={1.5} far={5} />
        </CameraScroll>
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
      <PositionInfo 
        text={cameraPoints[currentIndex].info} 
        isVisible={isInfoVisible}
      />
      <CybrButtons/>
    </div>
  );
}