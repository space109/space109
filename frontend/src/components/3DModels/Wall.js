import React from 'react';
import { useBox } from '@react-three/cannon';

const Wall = (props) => {
  const [ref, api] = useBox(() =>({
    mass: 0,
    ...props,
  }))

  return (
    <>
      <mesh ref={ref} api={api}>
        <boxGeometry args={props.args}/>
        <meshPhongMaterial color="0x1d1d1d"/>
      </mesh>
    </>
  );
};

export default Wall;