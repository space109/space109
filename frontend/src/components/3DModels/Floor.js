import { usePlane } from '@react-three/cannon';
import React from 'react';

const Floor = (props) => {
  const [ref] = usePlane(() => ({
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[0, 0]} />
      <meshStandardMaterial attach="material" color="grey" />
    </mesh>
  );
};

export default Floor;