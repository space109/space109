import { useBox } from '@react-three/cannon';
import { useLoader } from '@react-three/fiber';
import React from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const LogoBox = ({
  position = [0, 0, 0],
  args = [5, 5, 5],
  color = "white",
}) => {
  const img = useLoader(TextureLoader, "/LogoBlack.png");
  const [ref] = useBox(() => ({
    mass: 0,
    position,
    args,
  }));
  return (
    <mesh receiveShadow castShadow ref={ref} transparent>
      <boxGeometry args={args} />
      <meshPhongMaterial map={img} color={color} />
    </mesh>
  );
};

export default LogoBox;