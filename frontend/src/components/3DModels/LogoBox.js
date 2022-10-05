
import React from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';



const LogoBox = () => {
  // const img = new TextureLoader().load("/LogoBlack.png")
  return (
    <mesh receiveShadow castShadow position={[33, 50, -70]}>
      <boxGeometry args={[10, 10, 10]} />
      <meshPhongMaterial />
    </mesh>
  );
};

export default LogoBox;