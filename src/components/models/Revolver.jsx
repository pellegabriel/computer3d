/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/revolver.glb 
Author: szaw (https://sketchfab.com/szaw)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/future-tech-lowpoly-3d-revolver-free-381240250a8844ccbc5dadb95ea96c04
Title: Future-tech lowpoly 3d Revolver (free)
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Revolver(props) {
  const { nodes, materials } = useGLTF('/revolver.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={0.0016} position={[-5, -1.75, 5]} rotation={[-Math.PI / 2.2, 0, 0.8]}>
        <group position={[-100.103, -2.734, 6.041]} rotation={[-Math.PI / 2, 0, 0]} scale={154.783}>
          <mesh geometry={nodes.gun_main_0.geometry} material={materials.main} />
          <mesh geometry={nodes.gun_cable_0.geometry} material={materials.cable} />
          <mesh geometry={nodes.gun_handle2_0.geometry} material={materials.handle2} />
          <mesh geometry={nodes.gun_handle_0.geometry} material={materials.handle} />
          <mesh geometry={nodes.gun_barrel_0.geometry} material={materials.barrel} />
          <mesh geometry={nodes.gun_tape_0.geometry} material={materials.tape} />
          <mesh geometry={nodes.gun_eye1_0.geometry} material={materials.eye1} />
        </group>
        <group position={[-316.995, 6.067, -2.804]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={316.741}>
          <mesh geometry={nodes.mag_Material002_0.geometry} material={materials['Material.002']} />
          <mesh geometry={nodes.mag_Material001_0.geometry} material={materials['Material.001']} />
          <mesh geometry={nodes.mag_shells_0.geometry} material={materials.shells} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/revolver.glb')
