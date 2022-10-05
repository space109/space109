import React from 'react';
import { Text3D } from '@react-three/drei';

const ShareText = () => {
  return (
    <>
      <Text3D
        font="/JuaRegular.json"
        position={[52, 26, -65]}
        rotation={[Math.PI / 7, -Math.PI/4, Math.PI / 9]}
        size={3}
        height={1}
        bevelEnabled={true}
        // bevelThickness={0.7}
        bevelSize={0.07}
        bevelOffset={0.02}
      >
        방명록
        <meshStandardMaterial color="orange" />
      </Text3D>
    </>
  );
};

export default ShareText;