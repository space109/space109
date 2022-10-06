import React from 'react';
import { Text3D } from '@react-three/drei';

const ShareText = () => {
  return (
    <>
      <Text3D
        font="/Gothic.json"
        position={[6, 25, -31.7]}
        rotation={[Math.PI/2, Math.PI/2.5, -Math.PI/2]}
        size={3}
        height={1}
        bevelEnabled={true}
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