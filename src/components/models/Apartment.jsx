import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Apartments(props) {
  const { nodes, materials } = useGLTF('/apartment.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={10} position={[-10, -10.2, -14]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_4.geometry} material={materials.UV_TEST} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.glass} />
      </group>
    </group>
  )
}

useGLTF.preload('/apartment.glb')
