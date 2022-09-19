import { Physics, useBox, usePlane } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { Div } from "../styles/BaseStyles";

const Floor = (props) => {
  const [ref] = usePlane(() => ({
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[10, 10]}/>
      <meshStandardMaterial attach="material" color="grey"/>
    </mesh>
  );
};

const Box = (props) =>  {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [0, 5, 0],
    rotation: [0.4, 0.2, 0.5],
    ...props,
  }));
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxGeometry />
      <meshLambertMaterial color="hotpink" />
    </mesh>
  );
}

const VirtualGallery = () => {
  return (
    <Div w="100vw" h="100vh">
      <Canvas>
        <ambientLight/>
        <axesHelper/>
        <OrbitControls/>
        <Physics>
          <Box/>
          <Floor/>
        </Physics>
      </Canvas>
    </Div>
  );
};

export default VirtualGallery;
