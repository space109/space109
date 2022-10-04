import { useBox } from '@react-three/cannon';
import React from 'react';
import { useNormalTexture } from '@react-three/drei';
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
    const [normalMap, url] = useNormalTexture(2, {
      offset: [1, 1],
      anisotropy: 8,
    });
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxGeometry args={args} />
      <meshPhysicalMaterial color={color} normalMap={normalMap}/>
    </mesh>
  );
};

export default CeilingBox;