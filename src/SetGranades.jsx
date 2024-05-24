
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function SetGranades(props) {
  const { nodes, materials } = useGLTF('/set-granades.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={0.05} position={[-9.5, -2, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.initialShadingGroup} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.lambert10SG} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.lambert11SG} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.lambert2SG} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.lambert3SG} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.lambert4SG} />
        <mesh geometry={nodes.Object_8.geometry} material={materials.lambert5SG} />
        <mesh geometry={nodes.Object_9.geometry} material={materials.lambert7SG} />
        <mesh geometry={nodes.Object_10.geometry} material={materials.lambert8SG} />
      </group>
    </group>
  )
}

useGLTF.preload('/set-granades.glb')
