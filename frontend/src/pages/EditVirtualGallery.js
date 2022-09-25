import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense, useState, useEffect } from "react";
import { Div } from "../styles/BaseStyles";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import axios from "axios";
import { Physics, useBox } from "@react-three/cannon";
import * as THREE from "three";
import {
  GalleryMap,
  Player,
  CeilingBox,
  RectAreaLight,
  ImageLight,
  OverallLight,
  ImageFrame,
  Floor,
  EditModal,
} from "../components";
const artPositionList = [];

const LogoBox = ({
  position = [0, 0, 0],
  args = [5, 5, 5],
  color = "white",
}) => {
  const img = useLoader(TextureLoader, "/LogoBlack.png");
  const [ref] = useBox(() => ({
    mass: 0,
    position,
    args,
  }));
  return (
    <mesh receiveShadow castShadow ref={ref} transparent>
      <boxGeometry args={args} />
      <meshPhongMaterial map={img} color={color} />
    </mesh>
  );
};

//조명을 조절하는 함수

const EditVirtualGallery = () => {
  const [toggle, setToggle] = useState(false); // 모달 on/off

  const toggleModal = () => {
    // 모달 토글 함수
    setToggle((state) => !state);
  };

  const [room, setRoom] = useState(0);
  const [index, setIndex] = useState(0);

  const getPlayerPosition = (playerPosition) => {
    console.log(playerPosition);
  };
  const handleKeyDown = (e) => {
    console.log(e.target.value);
  };

  const targetRoom = (e) => {
    setRoom(e);
  };

  const targetIndex = (e) => {
    setIndex(e);
  };


  //나의 지갑에 있는 NFT 리스트(더미데이터)
  const [myNFT, setMyNFT] = useState([]);
  //이미 업로드했던 NFT 리스트(더미데이터)
  const [prevNFT, setPrevNFT] = useState({
    result: "success",
    data: [
      {
        NFT_ID: 1,
        GALLERY_ID: 3,
        OA: "0x065bC2317685A146511FaBa338708A53fC6d2534",
        TOKEN_ID: "토큰아이디1",
        METADATA:
          "https://skywalker.infura-ipfs.io/ipfs/QmcCMzT5n7QsaDwQgYHqiUtce4CyrD2YX3qnyi7Tca5qMN",
        SCALE: 1.5,
        POSITION: 3,
      },
      {
        NFT_ID: 2,
        GALLERY_ID: 3,
        OA: "0x065bC2317685A146511FaBa338708A53fC6d2534",
        TOKEN_ID: "토큰아이디2",
        METADATA:
          "https://skywalker.infura-ipfs.io/ipfs/QmQizUKRdG8NG1H6GvjEqbyrmvmqxdzFYSTrZR1o6DQCsa",
        SCALE: 1.5,
        POSITION: 4,
      },
      {
        NFT_ID: 3,
        GALLERY_ID: 3,
        OA: "0x065bC2317685A146511FaBa338708A53fC6d2534",
        TOKEN_ID: "토큰아이디3",
        METADATA:
          "https://skywalker.infura-ipfs.io/ipfs/QmQizUKRdG8NG1H6GvjEqbyrmvmqxdzFYSTrZR1o6DQCsa",
        SCALE: 1.5,
        POSITION: 5,
      },
    ],
  });

  //배열의 인덱스마다 담아둘 카운팅 배열 선언 (요청받은 후 사용)
  const countArray = new Array(25);
  for (let item of prevNFT?.data) {
    countArray[item?.POSITION] = item;
  }

  //지갑의 NFT 전체 리스트를 가져오는 요청
  useEffect(() => {}, []);

  //이미 업로드했던 NFT 리스트를 가져오는 요청
  useEffect(() => {}, []);

  return (
    <Div w="100vw" h="100vh">
      <EditModal toggleModal={toggleModal} toggle={toggle} myNFT={myNFT} />
      <Suspense fallback={null}>
        <Canvas style={{ background: "grey" }}>
          <OverallLight />
          <fog
            attach="fog"
            color="white"
            near={10}
            far={240}
            position={[0, 0, 0]}
          />
          <ambientLight intensity={0.1} />
          {/* <OrbitControls /> */}
          <Physics gravity={[0, -50, 0]}>
            {/* 시작점 */}
            <RectAreaLight
              position={[33, 40, -48.7]}
              rotation={[-Math.PI / 2, 0, 0]}
              width={61.5}
              intensity={0.7}
              height={39}
            />
            <CeilingBox
              position={[8, 40, -48.7]}
              args={[4, 1, 39]}
              color="darkgrey"
            />
            <CeilingBox
              position={[14, 40, -48.7]}
              args={[4, 1, 39]}
              color="darkgrey"
            />
            <CeilingBox
              position={[20, 40, -48.7]}
              args={[4, 1, 39]}
              color="darkgrey"
            />
            <CeilingBox
              position={[44, 40, -48.7]}
              args={[4, 1, 39]}
              color="darkgrey"
            />
            <CeilingBox
              position={[50, 40, -48.7]}
              args={[4, 1, 39]}
              color="darkgrey"
            />
            <CeilingBox
              position={[56, 40, -48.7]}
              args={[4, 1, 39]}
              color="darkgrey"
            />
            <LogoBox position={[52, 25, -68.7]} args={[16, 16, 0.1]} />
            <LogoBox position={[14, 25, -68.7]} args={[16, 16, 0.1]} />
            <ImageLight
              lightFrom={[52, 45, -67.4]}
              lightTo={[52, 20, -75]}
              angle={0.5}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[14, 45, -67.4]}
              lightTo={[14, 20, -75]}
              angle={0.5}
              intensity={1}
              penumbra={0.1}
            />
            {/* 1번 통로 */}
            <RectAreaLight
              position={[33, 25.3, -84.3]}
              rotation={[-Math.PI / 2, 0, 0]}
              width={4.5}
              intensity={2}
              height={30.5}
            />
            {/* 1번방 6개 */}
            <ImageLight
              lightFrom={[25, 63, -115]}
              lightTo={[-2, 10, -115]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[13, 25, -115]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
              index={0}
              prevNFT={prevNFT.data[0]}
            />
            <ImageLight
              lightFrom={[25, 63, -150]}
              lightTo={[-2, 10, -150]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[13, 25, -150]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
              index={1}
            />
            <ImageLight
              lightFrom={[25, 63, -185]}
              lightTo={[-2, 10, -185]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[13, 25, -185]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[39, 63, -115]}
              lightTo={[68, 10, -115]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[53, 25, -115]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[39, 63, -150]}
              lightTo={[68, 10, -150]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[53, 25, -150]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[39, 63, -185]}
              lightTo={[68, 10, -185]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[53, 25, -185]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            {/* 2번 통로 */}
            <RectAreaLight
              position={[33, 30.3, -216.4]}
              rotation={[-Math.PI / 2, 0, 0]}
              width={4.5}
              intensity={2}
              height={30.45}
            />
            {/* 2번방 1개 */}
            <ImageFrame
              position={[33, 25, -260]}
              rotation={[0, Math.PI / 2, 0]}
              args={[0.2, 45, 45]}
              toggleModal={toggleModal}
            />
            <RectAreaLight
              position={[33, 0.5, -257]}
              width={70}
              intensity={2}
              height={35}
            />
            <ImageLight
              lightFrom={[33, 93, -230]}
              lightTo={[33, 15, -260]}
              angle={0.4}
              intensity={2}
              penumbra={0.4}
            />
            {/* 3번 통로 */}
            <RectAreaLight
              position={[79.97, 30.35, -236.5]}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              width={4.5}
              intensity={2}
              height={30.45}
            />
            {/* 3번방 6개 */}
            <ImageLight
              lightFrom={[111, 63, -238]}
              lightTo={[111, 10, -274]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[111, 25, -257]}
              rotation={[0, Math.PI / 2, 0]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[146, 63, -238]}
              lightTo={[146, 10, -274]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[146, 25, -257]}
              rotation={[0, Math.PI / 2, 0]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[181, 63, -238]}
              lightTo={[181, 10, -274]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[181, 25, -257]}
              rotation={[0, Math.PI / 2, 0]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[111, 63, -235]}
              lightTo={[111, 10, -199]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[111, 25, -216.8]}
              rotation={[0, Math.PI / 2, 0]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[146, 63, -235]}
              lightTo={[146, 10, -199]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[146, 25, -216.8]}
              rotation={[0, Math.PI / 2, 0]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[181, 63, -235]}
              lightTo={[181, 10, -199]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[181, 25, -216.8]}
              rotation={[0, Math.PI / 2, 0]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            {/* 4번 통로 */}
            <RectAreaLight
              position={[212.05, 30.35, -236.5]}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              width={4.5}
              intensity={2}
              height={30.45}
            />
            {/* 4번방 1개 */}
            <ImageFrame
              position={[255, 25, -238]}
              args={[0.2, 45, 45]}
              toggleModal={toggleModal}
            />
            <RectAreaLight
              position={[251, 0.5, -240]}
              rotation={[Math.PI / 2, 0, Math.PI / 2]}
              width={70}
              intensity={2}
              height={35}
            />
            <ImageLight
              lightFrom={[215, 93, -240]}
              lightTo={[260, 15, -240]}
              angle={0.5}
              intensity={2}
              penumbra={0.4}
            />
            {/* 5번 통로 */}
            <RectAreaLight
              position={[232.3, 30.45, -189.73]}
              rotation={[-Math.PI / 2, 0, 0]}
              width={4.5}
              intensity={2}
              height={30.45}
            />
            {/* 5번방 6개 */}
            <ImageLight
              lightFrom={[230, 63, -160]}
              lightTo={[195, 10, -160]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[252, 25, -160]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[230, 63, -125]}
              lightTo={[195, 10, -125]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[252, 25, -125]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[230, 63, -90]}
              lightTo={[195, 10, -90]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[252, 25, -90]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[234, 63, -160]}
              lightTo={[271, 10, -160]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[212, 25, -160]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[234, 63, -125]}
              lightTo={[271, 10, -125]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[212, 25, -125]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[234, 63, -90]}
              lightTo={[271, 10, -90]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[212, 25, -90]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            {/* 6번 통로 */}
            <RectAreaLight
              position={[232.3, 30.45, -58.81]}
              rotation={[-Math.PI / 2, 0, 0]}
              width={4.5}
              intensity={2}
              height={30.45}
            />
            {/* 6번방 1개 */}
            <ImageFrame
              rotation={[0, Math.PI / 2, 0]}
              position={[231, 25, -20]}
              args={[0.2, 45, 45]}
              toggleModal={toggleModal}
            />
            <RectAreaLight
              position={[231, 0.5, -20]}
              rotation={[Math.PI / 2, 0, 0]}
              width={70}
              intensity={2}
              height={35}
            />
            <ImageLight
              lightFrom={[231, 85, -58]}
              lightTo={[231, 15, -20]}
              angle={0.5}
              intensity={2}
              penumbra={0.4}
            />
            {/* 7번 통로 */}
            <RectAreaLight
              position={[185.37, 30.45, -38.5]}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              width={4.5}
              intensity={2}
              height={30.45}
            />
            {/* 7번방 4개 */}
            <ImageLight
              lightFrom={[115, 60, -40]}
              lightTo={[115, 10, -4]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[115, 25, -18.5]}
              rotation={[0, Math.PI / 2, 0]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[150, 60, -40]}
              lightTo={[150, 10, -4]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[150, 25, -18.5]}
              args={[0.2, 27, 27]}
              rotation={[0, Math.PI / 2, 0]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[115, 60, -35]}
              lightTo={[115, 10, -73]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[115, 25, -58.8]}
              rotation={[0, Math.PI / 2, 0]}
              args={[0.2, 27, 27]}
              toggleModal={toggleModal}
            />
            <ImageLight
              lightFrom={[150, 60, -35]}
              lightTo={[150, 10, -73]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={[150, 25, -58.8]}
              args={[0.2, 27, 27]}
              rotation={[0, Math.PI / 2, 0]}
              toggleModal={toggleModal}
            />

            {/* 마지막 통로 */}
            <RectAreaLight
              position={[79.96, 30.45, -38.5]}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              width={4.5}
              intensity={2}
              height={30.45}
            />
            <Floor position={[0, 10.15, 0]} rotation={[-Math.PI / 2, 0, 0]} />
            <GalleryMap position={[0, 0, 0]} />

            <Player
              position={[33, 13, -40]}
              getPosition={getPlayerPosition}
              lockControl={toggle}
              onKeyDown={handleKeyDown}
              toggleModal={toggleModal}
              toggle={toggle}
              setToggle={setToggle}
              targetRoom={targetRoom}
              targetIndex={targetIndex}
            />
          </Physics>
        </Canvas>
      </Suspense>
    </Div>
  );
};

export default EditVirtualGallery;
