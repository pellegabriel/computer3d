import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Katana(props) {
  const { nodes, materials } = useGLTF('/katana.glb')
  return (
    <group {...props} dispose={null} scale={0.17} position={[8, 2.5, -50]} rotation={[0, Math.PI / 0.1, 0]}>

      <mesh geometry={nodes.Cyber_Katana_Texture001_0.geometry} material={materials['Texture.001']} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
      <mesh geometry={nodes.Estande_Textura_Estande001_0.geometry} material={materials['Textura_Estande.001']} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
    </group>
  )
}

useGLTF.preload('/katana.glb')
