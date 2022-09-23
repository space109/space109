import { Physics, useBox, usePlane } from "@react-three/cannon";
import { OrbitControls, Sky, useHelper } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import React, { Suspense, useMemo, useRef, useState } from "react";
import { GalleryMap } from "../components/3DModels/GalleryMap";
import { Player } from "../components/3DModels/Player";
import { Div } from "../styles/BaseStyles";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import InfoModal from "./../components/3DModels/InfoModal";
import { SpotLightHelper, PointLightHelper } from "three";
import * as THREE from "three";

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

const Box = ({ toggleModal }) => {
  const img = useLoader(TextureLoader, "/Thug_life.png");
  const [ref] = useBox(() => ({
    mass: 0,
    position: [127, 25, 5.2],
    args: [1, 15, 15],
  }));
  return (
    <mesh receiveShadow castShadow ref={ref} onClick={toggleModal}>
      <boxGeometry args={[0.01, 15, 15]} />
      <meshLambertMaterial map={img} />
    </mesh>
  );
};
const ImageFrame = ({ toggleModal, position, args = [0.1, 5, 5], rotation = [0, 0, 0] }) => {
  const img = useLoader(TextureLoader, "/Thug_life.png");
  const [ref] = useBox(() => ({
    mass: 0,
    position: position,
    args: args,
    rotation: rotation,
  }));
  return (
    <>
      {/* <InfoModal toggleModal={toggleModal} toggle={toggle}/> */}
      <mesh receiveShadow castShadow ref={ref} onClick={toggleModal}>
        <boxGeometry args={args} />
        <meshLambertMaterial map={img} />
      </mesh>
    </>
  );
};

//조명을 조절하는 함수
const LightHelper = (props) => {
  const light = useMemo(
    () => new THREE.DirectionalLight(0xffffff, 0.4, 130),
    []
  );
  //조명1: 조명
  //조명2: 조명이 비추는 좌표
  return (
    <>
      <primitive object={light} position={[30, 23, -40]} />
      <primitive object={light.target} position={[30, 13, -60]} />
    </>
  );
};

const VirtualGallery = () => {
  const [toggle, setToggle] = useState(false); // 모달 on/off
  const toggleModal = () => { // 모달 토글 함수
    setToggle((state) => !state);
  };
  const getPlayerPosition = (playerPosition) => {
    console.log(playerPosition);
  };
  const handleKeyDown = (e) => {
    console.log(e.target.value);
  };

  return (
    <Div w="100vw" h="100vh">
      <InfoModal toggleModal={toggleModal} toggle={toggle} />
      <Canvas style={{ background: "grey" }}>
        <LightHelper />

        <ambientLight intensity={0.25} />
        {/* <OrbitControls /> */}
        <Physics gravity={[0, -70, 0]}>
          {/* 1번방 6개 */}
          <ImageFrame
            position={[13, 26, -115]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          <ImageFrame
            position={[13, 26, -150]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          <ImageFrame
            position={[13, 26, -185]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          <ImageFrame
            position={[53, 26, -115]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          <ImageFrame
            position={[53, 26, -150]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          <ImageFrame
            position={[53, 26, -185]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          {/* 2번방 1개 */}
          <ImageFrame
            position={[33, 25, -260]}
            rotation={[0, Math.PI / 2, 0]}
            args={[0.2, 45, 45]}
            toggleModal={toggleModal}
          />
          {/* 3번방 6개 */}
          <ImageFrame
            position={[111, 25, -256]}
            rotation={[0, Math.PI / 2, 0]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          <ImageFrame
            position={[146, 25, -256]}
            rotation={[0, Math.PI / 2, 0]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          <ImageFrame
            position={[181, 25, -256]}
            rotation={[0, Math.PI / 2, 0]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          <ImageFrame
            position={[111, 25, -218]}
            rotation={[0, Math.PI / 2, 0]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          <ImageFrame
            position={[146, 25, -218]}
            rotation={[0, Math.PI / 2, 0]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          <ImageFrame
            position={[181, 25, -218]}
            rotation={[0, Math.PI / 2, 0]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          {/* 4번방 1개 */}
          <ImageFrame
            position={[255, 25, -238]}
            args={[0.2, 45, 45]}
            toggleModal={toggleModal}
          />
          {/* 5번방 6개 */}
          <ImageFrame
            position={[252, 25, -160]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          <ImageFrame
            position={[252, 25, -125]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          <ImageFrame
            position={[252, 25, -90]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          <ImageFrame
            position={[212, 25, -160]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          <ImageFrame
            position={[212, 25, -125]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          <ImageFrame
            position={[212, 25, -90]}
            args={[0.2, 27, 27]}
            toggleModal={toggleModal}
          />
          {/* 6번방 1개 */}
          <ImageFrame
            rotation={[0, Math.PI / 2, 0]}
            position={[231, 25, -20]}
            args={[0.2, 45, 45]}
            toggleModal={toggleModal}
          />
          <Floor position={[0, 10.15, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          <Suspense fallback={null}>
            <GalleryMap position={[0, 0, 0]} />
          </Suspense>
          <Player
            position={[33, 13, -40]}
            getPosition={getPlayerPosition}
            lockControl={toggle}
            onKeyDown={handleKeyDown}
            toggleModal={toggleModal}
            toggle={toggle}
            setToggle={setToggle}
          />
        </Physics>
      </Canvas>
    </Div>
  );
};

export default VirtualGallery;
