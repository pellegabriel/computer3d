import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Can(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/can.glb')
  if (materials.Material) {
    materials.Material.metalness = 0.5;
    materials.Material.roughness = 2.2;
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.005} position={[22, -0.9, -2]} rotation={[0, Math.PI / 0.8, 0]}>
        <mesh geometry={nodes.Cylinder001_Material_0.geometry} material={materials.Material} position={[4.48, 544.66, 0.306]} rotation={[-Math.PI / 2, 0, -0.924]} scale={78.803} />
      </group>
    </group>
  )
}

useGLTF.preload('/can.glb')