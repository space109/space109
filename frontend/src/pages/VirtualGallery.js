import { Physics, useBox, usePlane } from "@react-three/cannon";
import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense } from "react";
import { GalleryMap } from "../components/3DModels/GalleryMap";
import { Player } from "../components/3DModels/Player";
import { Div } from "../styles/BaseStyles";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
const Floor = (props) => {
  const [ref] = usePlane(() => ({
    mass: 0,
    // rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[0, 0]} />
      <meshStandardMaterial attach="material" color="grey" />
    </mesh>
  );
};

const Box = (props) => {
  const img = useLoader(TextureLoader, '/Thug_life.png')
  const [ref] = useBox(() => ({
    mass: 0,
    position: [1.6, 13, -13],
    args: [1, 15, 15],
    ...props,
  }));
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxGeometry args={[0.1, 15, 15]}/>
      <meshLambertMaterial map={img}/>
    </mesh>
  );
};

const VirtualGallery = () => {
  return (
    <Div w="100vw" h="100vh">
      <Canvas>
        <pointLight position={[0, 100, 0]} intensity={0.4}/>
        <ambientLight intensity={0.2}/>
        {/* <OrbitControls /> */}
        <Physics gravity={[0, -40, 0]}>
          {/* <Sky /> */}
          <Box/>
          <Floor position={[0, 10.15, 0]} rotation={[-Math.PI / 2, 0, 0]}/>
          <Suspense fallback={null}>
            <GalleryMap position={[0, 0, 0]} />
          </Suspense>
          <Player position={[20,14.5, 0]}/>
        </Physics>
      </Canvas>
    </Div>
  );
};

export default VirtualGallery;
