import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Plant(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/plant.glb');

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -Math.cos(t / 2) / 20 - 0.1,  // Invertir el movimiento en el eje X
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
      <group scale={2} position={[7, -0.278, -3]}>
        <mesh geometry={nodes.Object_4.geometry} material={materials.material} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.material_1} />
      </group>
      <mesh scale={1.5} geometry={nodes.Object_7.geometry} material={materials.LEAFE} position={[7, -1, -3]} />
      <mesh scale={1.5} geometry={nodes.Object_9.geometry} material={materials.STAMP} position={[7, -1.5, -3]} />
    </group>
  )
}

useGLTF.preload('/plant.glb');
