import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import { Can } from "./components/models/Can";
import { Apartments } from "./components/models/Apartment";
import { Revolver } from "./components/models/Revolver";
import { Mask } from "./components/models/Mask";
import { Katana } from "./components/models/Katana";
import { GunBot } from "./components/models/Gun-bot";
import CybrButtons from "./components/page/CybrButtons";
import { Loader } from "./components/loader/Loader";
import { Model } from "./components/page/Model";

export default function App() {
  return (
    <div style={{borderWidth: '5px', height: '100%', borderColor: '#DF0B55'}}>
      <Canvas camera={{ position: [0, 10, -10], fov: 55 }}>
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
      <OrbitControls
          enablePan={true}
          enableZoom={true}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 2.2}
          minAzimuthAngle={-Math.PI / -1.15} 
          maxAzimuthAngle={Math.PI / -1.15} 
          minDistance={10} 
          maxDistance={80} 
        />
      </Canvas>
    <CybrButtons/>
    </div>
  );
}