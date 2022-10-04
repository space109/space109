import React from 'react';
import { Sky } from '@react-three/drei';
import { Cloud } from '@react-three/drei';

const SkyEnvironment = () => {
  return (
    <>
      <Sky
        azimuth={0.1}
        turbidity={10}
        rayleigh={0.5}
        inclination={0.6}
        distance={1000}
      />
      <Cloud
        position={[0, 250, 0]}
        speed={0}
        opacity={0.6}
        width={200}
        segments={700}
      />
      <Cloud
        position={[250, 250, 0]}
        speed={0}
        opacity={0.6}
        width={200}
        segments={600}
      />
    </>
  );
};

export default SkyEnvironment;