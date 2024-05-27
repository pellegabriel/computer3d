import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Html,
  Environment,
  useGLTF,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import Page from "./components/page/Page";
import { Can } from "./components/models/Can";
import ButtonLink from './components/page/ButtonLink';
import { Apartments } from "./components/models/Apartment";
import { Revolver } from "./components/models/Revolver";
import { Mask } from "./components/models/Mask";
import { Katana } from "./components/models/Katana";
import { SetGranades } from "./components/models/SetGranades";

function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/mac-draco.glb");
  materials.aluminium.metalness = 2.5;
  materials.aluminium.roughness = 0.2;

  return (
    <group ref={group} {...props} dispose={null} scale={[1, 1, 1]}>
      <group rotation-x={-0.25} position={[0, -2, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={nodes["Cube008"].geometry}
          />
          <mesh
            material={materials["matte.001"]}
            geometry={nodes["Cube008_1"].geometry}
          />
          <mesh geometry={nodes["Cube008_2"].geometry}>
            <Html
              className="content"
              rotation-x={-Math.PI / 2}
              position={[0, 0.05, -0.09]}
              transform
              occlude>
              <div
                className="wrapper"
                onPointerDown={(e) => e.stopPropagation()}>
                <Page />
              </div>
            </Html>
          </mesh>
        </group>
      </group>
      <mesh
        material={materials.keys}
        geometry={nodes.keyboard.geometry}
        position={[1.79, -2, 3.45]}
      />
      <group position={[0, -2.1, 3.39]}>
        <mesh
          material={materials.aluminium}
          geometry={nodes["Cube002"].geometry}
        />
        <mesh
          material={materials.trackpad}
          geometry={nodes["Cube002_1"].geometry}
        />
      </group>
      <mesh
        material={materials.touchbar}
        geometry={nodes.touchbar.geometry}
        position={[0, -0.03, 1.2]}
      />
    </group>
  );
}

const Loader = () => (
  <Html center>
    <div className="loading">Loading...</div>
  </Html>
);

export default function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 10, -10], fov: 55 }}>
        <Suspense fallback={<Loader />}>
          <group rotation={[0, Math.PI, 0]} position={[0, 0, 0]}>
            <Model /> 
            <Can />
            <Apartments />
            <Revolver/>
            <SetGranades/>
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
          minDistance={10} // Distancia mínima de acercamiento
          maxDistance={80} // Distancia máxima de alejamiento
        />
      </Canvas>
      <div className="button-container">
        <ButtonLink 
          url="https://polvorin01.netlify.app/" 
          text="Go to Profile"
        />
        <ButtonLink 
          url="/cv.pdf" 
          text="Download CV" 
          style={{ animationDelay: '0.07s' }}
        />
      </div>
    </>
  );
}
