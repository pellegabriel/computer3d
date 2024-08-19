import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
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

const CameraScroll = ({ children, cameraPoints }) => {
  const { camera } = useThree();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const handleScroll = (e) => {
      if (e.deltaY > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cameraPoints.length);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cameraPoints.length) % cameraPoints.length);
      }
    };
    
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cameraPoints.length);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cameraPoints.length) % cameraPoints.length);
      }
    };
    
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cameraPoints.length]);

  useFrame(() => {
    const target = cameraPoints[currentIndex];
    camera.position.lerp(target.position, 0.05);
    camera.lookAt(target.lookAt);
  });

  return <>{children}</>;
};

export default function App() {
  const cameraPoints = [
    { position: new Vector3(10, 1, -13), lookAt: new Vector3(-15, 3, 10) },
    { position: new Vector3(-10, 15, 20), lookAt: new Vector3(0, 3, 300) },
    { position: new Vector3(50, 10, 0), lookAt: new Vector3(0, 3, 400) },
    { position: new Vector3(40, -5, -10), lookAt: new Vector3(-100, -20, 0) },

  ];

  return (
    <div style={{borderWidth: '5px', height: '100%', borderColor: '#DF0B55'}}>
      <Canvas>
        <CameraScroll cameraPoints={cameraPoints}>
          <PerspectiveCamera makeDefault position={[0, 10, -10]} fov={55} />
          <Suspense fallback={<Loader />}>
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
      <CybrButtons/>
    </div>
  );
}
//loader se mueve de posicion