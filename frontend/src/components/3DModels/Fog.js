import React from 'react';

const Fog = () => {
  return (
    <>
      <fog
        attach="fog"
        color="white"
        near={10}
        far={245}
        position={[0, 0, 0]}
      />
    </>
  );
};

export default Fog;