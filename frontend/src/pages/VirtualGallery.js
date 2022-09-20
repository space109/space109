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



const VirtualGallery = () => {
  return (
    <Div w="100vw" h="100vh">
      <Canvas camera={{ position: [0, 10, 10] }}>
        {/* <ambientLight /> */}
        <pointLight position={[0, 100, 0]} />
        {/* <ambientLight/> */}
        <axesHelper />
        {/* <OrbitControls /> */}
        <Physics gravity={[0, -40, 0]}>
          {/* <Sky /> */}
          {/* <Box /> */}
          <Floor position={[0, 10.15, 0]} rotation={[-Math.PI / 2, 0, 0]}/>
          <Suspense fallback={null}>
            <GalleryMap position={[0, 0, 0]} />
          </Suspense>
          <Player position={[0,10.5, 0]}/>
        </Physics>
      </Canvas>
    </Div>
  );
};

export default VirtualGallery;
