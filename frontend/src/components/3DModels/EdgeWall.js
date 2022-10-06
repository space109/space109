import { useBox } from '@react-three/cannon';
import React from 'react';

const EdgeWall = (props) => {
  const [ref, api] = useBox(() => ({
    mass: 0,
    position: props.position,
    args: props.args,
    rotation: props.rotation1 ? props.rotation1 : [0, Math.PI/2, 0]
  }));

  return (
    <group>
      <mesh ref={ref} api={api}>
        <boxGeometry args={props.args} />
        <meshPhongMaterial />
      </mesh>
      <mesh
        ref={
          useBox(() => ({
            mass: 0,
            position: props.position,
            args: props.args,
            rotation: props.rotation2 ? props.rotation2 : [0, Math.PI, 0],
          }))[0]
        }
      >
        <boxGeometry args={props.args} />
        <meshPhongMaterial />
      </mesh>
    </group>
  );
};

export default EdgeWall;