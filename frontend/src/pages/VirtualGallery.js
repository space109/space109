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
  InfoModal,
} from "../components";

const artPositionList = [];

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

const VirtualGallery = () => {
  const [toggle, setToggle] = useState(false); // 모달 on/off
  const [metalist, setMetaList] = useState([{ hello: "hello" }]); //기존에 업로드 되었던 목록을 가져옴(업로드 되었던 목록에서 변화)
  const toggleModal = () => {
    // 모달 토글 함수
    setToggle((state) => !state);
  };
  const isToggle = () => {
    return toggle;
  }

  const [room, setRoom] = useState(0);
  const [index, setIndex] = useState(0);

  //메타데이터를 모달에서 끌어옴. 데이터가 없을시 기본 값을 정해줄 것
  //인덱스가 metalist의 배열 길이보다 짧은지 체크(나중에 아예 Curry로직을 사용할건지 고려)
  const getMetaData = (index, data) => {
    //인덱스에러 방지
    if (metalist.length > index) {
      setMetaList((state) => (state[index] = data));
    }
  };

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

  //메타데이터 이미지 임시를 불러옴
  const [image, setImage] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://skywalker.infura-ipfs.io/ipfs/QmQizUKRdG8NG1H6GvjEqbyrmvmqxdzFYSTrZR1o6DQCsa"
      )
      .then((res) => setImage(res.data?.image));
  }, []);
  //[{0 액자}, {1 액자}, {2 액자}]
  //   {
  //   "fileName": "QmZGq2vsQKkDCBhkUGjFz78ejFhRxTbaUiySx6gv9ATb1v.json",
  //   "name": "NFT name",
  //   "author": "imukyee",
  //   "description": "설명",
  //   "image": "https://skywalker.infura-ipfs.io/ipfs/QmZGq2vsQKkDCBhkUGjFz78ejFhRxTbaUiySx6gv9ATb1v"
  //   }
  // 0번째 액자: QmZGq2vsQKkDCBhkUGjFz78ejFhRxTbaUiySx6gv9ATb1v
  // 1번째 액자: QmZGq2vsQKkDCBhkUGjFz78ejFhRxTbaUiySx6gv9ATb1v
  // 2번째 액자: QmZGq2vsQKkDCBhkUGjFz78ejFhRxTbaUiySx6gv9ATb1v
  return (
    <Div w="100vw" h="100vh">
      <InfoModal
        toggleModal={toggleModal}
        toggle={toggle}
        room={room}
        index={index}
      />
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
            getMetaData={getMetaData}
            index={0}
            src={image}
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
            src={image}
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
            src={image}
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
            src={image}
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
            src={image}
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
            src={image}
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
            isToggle={isToggle}
            targetRoom={targetRoom}
            targetIndex={targetIndex}
          />
        </Physics>
      </Canvas>
    </Div>
  );
};

export default VirtualGallery;
