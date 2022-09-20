import { Physics, useBox, usePlane } from "@react-three/cannon";
import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { GalleryMap } from "../components/3DModels/GalleryMap";
import MapBoundary from "../components/3DModels/MapBoundary";
import { Player } from "../components/3DModels/Player";
import { Div } from "../styles/BaseStyles";

const Floor = (props) => {
  const [ref] = usePlane(() => ({
    mass: 0,
    // rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" color="grey" />
    </mesh>
  );
};

const Box = (props) => {
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
};

const VirtualGallery = () => {
  return (
    <Div w="100vw" h="100vh">
      <Canvas camera={{ position: [0, 10, 10] }}>
        {/* <ambientLight /> */}
        <pointLight position={[0, 100, 0]} />
        <axesHelper />
        {/* <OrbitControls /> */}
        <Physics gravity={[0, -40, 0]}>
          {/* <Sky /> */}
          {/* <Box /> */}
          <Floor position={[0, 10.15, 0]} rotation={[-Math.PI / 2, 0, 0]}/>
          <Floor position={[100, 30, 14]} rotation={[Math.PI, 0, 0]} />
          <Suspense fallback={null}>
            <GalleryMap position={[0, 0, 0]} />
            {/* <MapBoundary
              visible
              position={[0, 0, 0]}
              dims={[140, 20.3, 140]}
              offset={[-71.5, -10, 55]}
            >
            </MapBoundary> */}
          </Suspense>
          <Player position={[50,50, 0]}/>
        </Physics>
      </Canvas>
    </Div>
  );
};

export default VirtualGallery;
