import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Mask(props) {
  const { nodes, materials } = useGLTF('/mask.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 1.5, 0.1, 0]} scale={0.4} position={[6.3, -6.4, 1]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.aiStandardSurface3SG} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.aiStandardSurface3SG} />
      </group>
    </group>
  )
}

useGLTF.preload('/mask.glb')
