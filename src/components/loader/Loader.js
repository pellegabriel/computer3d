// components/loader/Loader.js
import React from 'react';
import { Html } from '@react-three/drei';

// Loader para usar dentro del Canvas
export const Loader3D = () => (
  <Html center>
    <div className="loader"></div>
  </Html>
);

// Loader para usar fuera del Canvas
export const Loader = () => (
  <div className="loader"></div>
);