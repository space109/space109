import React from 'react';
import { useBox } from '@react-three/cannon';

const Wall = (props) => {
  const [ref, api] = useBox(() =>({
    mass: 0,
    ...props,
    color: 'grey'
  }))

  return (
    <>
      <mesh ref={ref} api={api}>
        <boxGeometry args={props.args}/>
        <meshPhongMaterial />
      </mesh>
    </>
  );
};

export default Wall;