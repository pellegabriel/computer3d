import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3, Quaternion, MathUtils } from 'three';

export const CameraScroll = ({ children, cameraPoints, currentIndex }) => {
  const { camera } = useThree();
  const transitionRef = useRef({ inProgress: false, startTime: 0, duration: 1000 });
  const startPosition = useRef(new Vector3());
  const startQuaternion = useRef(new Quaternion());
  const endPosition = useRef(new Vector3());
  const endQuaternion = useRef(new Quaternion());

  useEffect(() => {
    const start = cameraPoints[currentIndex];
    const end = cameraPoints[currentIndex]; // Changed this line

    startPosition.current.copy(camera.position);
    startQuaternion.current.copy(camera.quaternion);

    endPosition.current.copy(end.position);
    camera.position.copy(start.position);
    camera.lookAt(start.lookAt);
    endQuaternion.current.copy(camera.quaternion);

    camera.position.copy(startPosition.current);
    camera.quaternion.copy(startQuaternion.current);

    transitionRef.current = { inProgress: true, startTime: Date.now(), duration: 1000 };
  }, [currentIndex, cameraPoints]);

  useFrame(() => {
    if (transitionRef.current.inProgress) {
      const { startTime, duration } = transitionRef.current;
      const elapsed = Date.now() - startTime;
      const progress = MathUtils.clamp(elapsed / duration, 0, 1);

      if (progress < 1) {
        const easedProgress = easeInOutCubic(progress);

        camera.position.lerpVectors(startPosition.current, endPosition.current, easedProgress);
        camera.quaternion.slerpQuaternions(startQuaternion.current, endQuaternion.current, easedProgress);
      } else {
        camera.position.copy(endPosition.current);
        camera.quaternion.copy(endQuaternion.current);
        transitionRef.current.inProgress = false;
      }
    }
  });

  return <>{children}</>;
};

// Easing function for smoother animation
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}