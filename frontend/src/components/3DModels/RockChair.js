import React from 'react';
import { useBox } from '@react-three/cannon';
import { useNormalTexture } from '@react-three/drei';

const RockChair = (props) => {
  const [ref] = useBox(() => ({ mass: 0, args: [2, 4, 2], ...props }));
  const [normalMap] = useNormalTexture(69, {
    anisotropy: 8,
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[14, 4, 4]}/>
      <meshStandardMaterial normalMap={normalMap} color="grey"/>
    </mesh>
  );
};

export default RockChair;