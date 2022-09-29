import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState, useEffect, useCallback } from "react";
import { Div } from "../styles/BaseStyles";
import axios from "axios";
import { Physics } from "@react-three/cannon";
import { MintTestContract } from "../web3Config";
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
  LogoBox,
} from "../components";
import { useParams } from "react-router-dom";

const CEILING_POSITION = [
  [8, 40, -48.7],
  [14, 40, -48.7],
  [20, 40, -48.7],
  [44, 40, -48.7],
  [50, 40, -48.7],
  [56, 40, -48.7],
];

const RECT_AREA_LIGHT_POSITION = [
  {
    position: [33, 40, -48.7],
    rotation: [-Math.PI / 2, 0, 0],
    width: 61.5,
    intensity: 2,
    height: 39,
  },
  {
    position: [33, 25.3, -84.3],
    rotation: [-Math.PI / 2, 0, 0],
    width: 4.5,
    intensity: 2,
    height: 30.5,
  },
  {
    position: [33, 30.3, -216.4],
    rotation: [-Math.PI / 2, 0, 0],
    width: 4.5,
    intensity: 2,
    height: 30.45,
  },
  {
    position: [33, 0.5, -257],
    rotation: [Math.PI / 2, 0, 0],
    width: 70,
    intensity: 2,
    height: 35,
  },
  {
    position: [79.97, 30.35, -236.5],
    rotation: [-Math.PI / 2, 0, Math.PI / 2],
    width: 4.5,
    intensity: 2,
    height: 30.45,
  },
  {
    position: [212.05, 30.35, -236.5],
    rotation: [-Math.PI / 2, 0, Math.PI / 2],
    width: 4.5,
    intensity: 2,
    height: 30.45,
  },
  {
    position: [251, 0.5, -240],
    rotation: [Math.PI / 2, 0, Math.PI / 2],
    width: 70,
    intensity: 2,
    height: 35,
  },
  {
    position: [232.3, 30.45, -189.73],
    rotation: [Math.PI / 2, 0, 0],
    width: 4.5,
    intensity: 2,
    height: 30.45,
  },
  {
    position: [232.3, 30.45, -58.81],
    rotation: [-Math.PI / 2, 0, 0],
    width: 4.5,
    intensity: 2,
    height: 30.45,
  },
  {
    position: [231, 0.5, -20],
    rotation: [Math.PI / 2, 0, 0],
    width: 70,
    intensity: 2,
    height: 35,
  },
  {
    position: [185.37, 30.45, -38.5],
    rotation: [-Math.PI / 2, 0, Math.PI / 2],
    width: 4.5,
    intensity: 2,
    height: 30.45,
  },
  {
    position: [79.96, 30.45, -38.5],
    rotation: [-Math.PI / 2, 0, Math.PI / 2],
    width: 4.5,
    intensity: 2,
    height: 30.45,
  },
];

const IMAGE_FRAME_ROTATION = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, Math.PI / 2, 0],
  [0, Math.PI / 2, 0],
  [0, Math.PI / 2, 0],
  [0, Math.PI / 2, 0],
  [0, Math.PI / 2, 0],
  [0, Math.PI / 2, 0],
  [0, Math.PI / 2, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, Math.PI / 2, 0],
  [0, Math.PI / 2, 0],
  [0, Math.PI / 2, 0],
  [0, Math.PI / 2, 0],
  [0, Math.PI / 2, 0],
];

const EditVirtualGallery = () => {
  const [toggle, setToggle] = useState(false); // 모달 on/off
  const [toggleIdx, setToggleIdx] = useState(0);
  const [countArray, setCountArray] = useState([]);
  const [room, setRoom] = useState(0);
  const [index, setIndex] = useState(0);
  const { key } = useParams();
  
  //나의 지갑에 있는 NFT 리스트(더미데이터)
  const [myNFT, setMyNFT] = useState([
    "https://skywalker.infura-ipfs.io/ipfs/QmVzB61racfCivynuXoDffb6x3EcJVqv29UqSFuXdf2izY",
    "https://skywalker.infura-ipfs.io/ipfs/QmcCMzT5n7QsaDwQgYHqiUtce4CyrD2YX3qnyi7Tca5qMN",
    "https://skywalker.infura-ipfs.io/ipfs/QmcCMzT5n7QsaDwQgYHqiUtce4CyrD2YX3qnyi7Tca5qMN",
    "https://skywalker.infura-ipfs.io/ipfs/QmcCMzT5n7QsaDwQgYHqiUtce4CyrD2YX3qnyi7Tca5qMN",
    "https://skywalker.infura-ipfs.io/ipfs/QmT2taDtwMWjLmBECY2sbvb2RjeAnAf95aYx1z8wW4CRsR",
  ]);
  //토큰 리스트
  const [myTokenList, setMyTokenList] = useState([1, 2, 3, 4, 5]);
  //이미 업로드했던 NFT 리스트(더미데이터)
  
  //전체 위치를 업데이트할 정보
  const [framePosition, setFramePosition] = useState([
    [13, 25, -115],
    [13, 25, -150],
    [13, 25, -185],
    [53, 25, -115],
    [53, 25, -150],
    [53, 25, -185],
    [33, 25, -260],
    [111, 25, -257],
    [146, 25, -257],
    [181, 25, -257],
    [111, 25, -216.8],
    [146, 25, -216.8],
    [181, 25, -216.8],
    [255, 25, -238],
    [252, 25, -160],
    [252, 25, -125],
    [252, 25, -90],
    [212, 25, -160],
    [212, 25, -125],
    [212, 25, -90],
    [231, 25, -20],
    [115, 25, -18.5],
    [150, 25, -18.5],
    [115, 25, -58.8],
    [150, 25, -58.8],
  ]);
  //액자 크기
  const [frameScale, setFrameScale] = useState([
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 45, 45],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 45, 45],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 45, 45],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
  ]);
  
  //이미지 크기 조절 함수
  const ImageScaleHandler = useCallback((data) => {
    setFrameScale(data);
  }, []);

  //이미지 위치 조절 함수
  const ImagePositionHandler = useCallback((data) => {
    setFramePosition(data);
  }, []);

  //ImageFrame에서 선택한 인덱스를 가져옴
  const getIndexOfFrame = useCallback((index) => {
    setToggleIdx(index);
  }, []);
  
  // 모달 토글 함수
  const toggleModal = () => {
    setToggle((state) => !state);
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

  //지갑의 NFT 전체 리스트, 토큰ID 리스트를 가져오는 요청
  const getNFTList = useCallback(async () => {
    const tokenIds = await MintTestContract.methods
      .tokenIDsofWallet(window.ethereum.selectedAddress)
      .call();
    const tokenURIs = await MintTestContract.methods
      .tokenURIsofWallet(window.ethereum.selectedAddress)
      .call();
    setMyNFT(tokenURIs);
    setMyTokenList(tokenIds);
    console.log("토큰 아이디 URL들",tokenIds, tokenURIs)
  }, []);

  useEffect(() => {
    getNFTList();
  }, [getNFTList]);

  //이미 업로드했던 NFT 리스트를 가져오는 요청
  //요청 보낸 후 카운팅 배열로 매핑

  useEffect(() => {
    axios({
      url: `http://j7b109.p.ssafy.io:8080/nft/display?galleryId=${key}`,
    })
      .then((res) => {
        const newArr = new Array(25);
        const posArr = [...framePosition];
        const scaleArr = [...frameScale];
        //위치 스케일을 초기에 업데이트함
        for (let item of res?.data.data) {
          newArr[item?.POSITION] = item;
        }

        for (let i = 0; i < newArr.length; i++) {
          if (!newArr[i]) {
            newArr[i] = {};
          }
        }
        for (let idx in newArr) {
          if (Object.keys(newArr[idx]).length) {
            posArr[idx] = JSON.parse(newArr[idx]?.POSITIONXYZ);
            scaleArr[idx] = JSON.parse(newArr[idx]?.SCALE);
          }
        }

        setFramePosition(posArr);
        setFrameScale(scaleArr);
        setCountArray(newArr);
        console.log(newArr)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Div w="100vw" h="100vh">
      <EditModal
        toggleModal={toggleModal}
        toggle={toggle}
        myNFT={myNFT}
        toggleIdx={toggleIdx}
        myTokenList={myTokenList}
        ImageScaleHandler={ImageScaleHandler}
        ImagePositionHandler={ImagePositionHandler}
        frameScale={frameScale}
        framePosition={framePosition}
        countArray={countArray}
        setCountArray={setCountArray}
      />
      <Div
        position="absolute"
        top="300px"
        zIndex="305"
        color="--grey-100"
        right="300px"
        fontSize="--h7"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      ></Div>
      <Canvas style={{ background: "grey" }}>
        <Suspense fallback={null}>
          <OverallLight />
          <fog
            attach="fog"
            color="white"
            near={10}
            far={245}
            position={[0, 0, 0]}
          />
          <ambientLight intensity={0.1} />
          {/* <OrbitControls /> */}
          <Physics gravity={[0, -50, 0]}>
            {/* 사각 조명 */}
            {RECT_AREA_LIGHT_POSITION.map((item, idx) => {
              return (
                <RectAreaLight
                key={`RECTAREA_KEY${idx}`}
                  position={item.position}
                  rotation={item.rotation}
                  width={item.width}
                  height={item.height}
                  intensity={item.intensity}
                />
              );
            })}
            {/* 천장 박스 디자인 */}
            {CEILING_POSITION.map((item, idx) => {
              return (
                <CeilingBox
                  key={`CEILINGBOX_KEY${idx}`}
                  position={item}
                  args={[4, 1, 39]}
                  color="darkgrey"
                />
              );
            })}
            {/* 액자 리스트 */}
            {countArray.map((item, idx) => {
              return (
                <ImageFrame
                  key={`ImageFrameKey${idx}`}
                  position={framePosition[idx]}
                  rotation={IMAGE_FRAME_ROTATION[idx]}
                  args={frameScale[idx]}
                  toggleModal={toggleModal}
                  getIndexOfFrame={getIndexOfFrame}
                  index={idx}
                  meta={countArray ? countArray[idx]?.METADATA : {}}
                />
              );
            })}
            {/* 로고 이미지 */}
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

            {/* 1번방 6개 */}
            <ImageLight
              lightFrom={[25, 63, -115]}
              lightTo={[-2, 10, -115]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[25, 63, -150]}
              lightTo={[-2, 10, -150]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[25, 63, -185]}
              lightTo={[-2, 10, -185]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[39, 63, -115]}
              lightTo={[68, 10, -115]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[39, 63, -150]}
              lightTo={[68, 10, -150]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[39, 63, -185]}
              lightTo={[68, 10, -185]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            {/* 2번방 1개 */}
            <ImageLight
              lightFrom={[33, 93, -230]}
              lightTo={[33, 15, -260]}
              angle={0.4}
              intensity={2}
              penumbra={0.4}
            />
            {/* 3번방 6개 */}
            <ImageLight
              lightFrom={[111, 63, -238]}
              lightTo={[111, 10, -274]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[146, 63, -238]}
              lightTo={[146, 10, -274]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[181, 63, -238]}
              lightTo={[181, 10, -274]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[111, 63, -235]}
              lightTo={[111, 10, -199]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[146, 63, -235]}
              lightTo={[146, 10, -199]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[181, 63, -235]}
              lightTo={[181, 10, -199]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            {/* 4번방 1개 */}
            <ImageLight
              lightFrom={[215, 93, -240]}
              lightTo={[260, 15, -240]}
              angle={0.5}
              intensity={2}
              penumbra={0.4}
            />
            {/* 5번방 6개 */}
            <ImageLight
              lightFrom={[230, 63, -160]}
              lightTo={[195, 10, -160]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[230, 63, -125]}
              lightTo={[195, 10, -125]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[230, 63, -90]}
              lightTo={[195, 10, -90]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[234, 63, -160]}
              lightTo={[271, 10, -160]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[234, 63, -125]}
              lightTo={[271, 10, -125]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[234, 63, -90]}
              lightTo={[271, 10, -90]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            {/* 6번방 1개 */}
            <ImageLight
              lightFrom={[231, 85, -58]}
              lightTo={[231, 15, -20]}
              angle={0.5}
              intensity={2}
              penumbra={0.4}
            />
            {/* 7번방 4개 */}
            <ImageLight
              lightFrom={[115, 60, -40]}
              lightTo={[115, 10, -4]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[150, 60, -40]}
              lightTo={[150, 10, -4]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[115, 60, -35]}
              lightTo={[115, 10, -73]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageLight
              lightFrom={[150, 60, -35]}
              lightTo={[150, 10, -73]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
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
        </Suspense>
      </Canvas>
    </Div>
  );
};

export default EditVirtualGallery;
