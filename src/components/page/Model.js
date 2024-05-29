import Page from "./Page";
import React, { useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";

export function Model(props) {
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
