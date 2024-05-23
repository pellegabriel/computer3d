import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Can(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/can.glb')

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
      (-2 + Math.sin(t / 4)) / 2,
      0.1
    );
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.005} position={[-8, -2, -2]} rotation={[0, Math.PI / 1.5, 0]}>
        <mesh geometry={nodes.Cylinder001_Material_0.geometry} material={materials.Material} position={[4.48, 544.66, 0.306]} rotation={[-Math.PI / 2, 0, -0.924]} scale={78.803} />
      </group>
    </group>
  )
}

useGLTF.preload('/can.glb')