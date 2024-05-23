import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Lamp(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/lamp.glb');

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -Math.cos(t / 2) / 20 + 0.1,  // Invertir el movimiento en el eje X
      0.1
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(t / 4) / 10,
      0.1
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      Math.sin(t / 8) / 20,
      0.1
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      (-2 + Math.sin(t / 2)) / 2,
      0.1
    );
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.4} position={[-3, -2, -8]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_3.geometry} material={materials.Material__25} position={[-8.989, -8.918, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/lamp.glb');
