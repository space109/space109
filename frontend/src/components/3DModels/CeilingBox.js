import { useBox } from '@react-three/cannon';
import React from 'react';
const CeilingBox = ({
  position = [0, 0, 0],
  args = [5, 5, 5],
  color = "grey",
}) => {
  const [ref] = useBox(() => ({
    mass: 0,
    position,
    args,
  }));
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxGeometry args={args} />
      <meshPhysicalMaterial color={color}/>
    </mesh>
  );
};

export default CeilingBox;