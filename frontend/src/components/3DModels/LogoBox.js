
import React from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';



const LogoBox = ({
  position,
  args,
  rotation=[0, 0, 0]
}) => {
  const img = new TextureLoader().load("/LogoPng.png")
  return (
    <mesh receiveShadow castShadow position={position} rotation={rotation}>
      <boxGeometry args={args} />
      <meshPhongMaterial map={img} transparent/>
    </mesh>
  );
};

export default LogoBox;