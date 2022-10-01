import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState, useEffect, useCallback } from "react";
import { Div } from "../styles/BaseStyles";
import { Physics } from "@react-three/cannon";
import { MintTestContract } from "../web3Config";
import {
  GalleryMap,
  Player,
  CeilingBox,
  ImageLight,
  OverallLight,
  ImageFrame,
  Floor,
  EditModal,
  LogoBox,
  CeilingBoxGroup,
  ImageLightGroup,
  Fog,
} from "../components";
import { useParams } from "react-router-dom";
import { useAccount, useAxios } from "../hooks";
import RectAreaLightGroup from './../components/3DModels/RectAreaLightGroup';

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
  const sendRequest = useAxios();
  const [ownerAddress, nickname] = useAccount();
  const [myNFT, setMyNFT] = useState([]);
  const [myTokenList, setMyTokenList] = useState([]);
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

  //지갑의 NFT 전체 리스트, 토큰ID 리스트를 가져오는 요청
  const getNFTList = useCallback(async () => {
    if (ownerAddress) {
      const tokenIds = await MintTestContract.methods
        .tokenIDsofWallet(ownerAddress)
        .call();

      const tokenURIs = await MintTestContract.methods
        .tokenURIsofWallet(ownerAddress)
        .call();
      setMyNFT(tokenURIs);
      setMyTokenList(tokenIds);
    }
  }, [ownerAddress]);
  
  //포지션에 맞게 계차 매핑, 나머지는 빈 객체로 초기화
  const indexMappingHandler = useCallback((data) => {
    const newArr = new Array(25);
    const posArr = [...framePosition];
    const scaleArr = [...frameScale];
    //위치 스케일을 초기에 업데이트함
    for (let item of data?.data) {
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
  }, []);

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

  useEffect(() => {
    getNFTList();
  }, [getNFTList]);
  
  useEffect(() => {
    sendRequest(
      {
        url: `${process.env.REACT_APP_BACKEND_HOST2}/nft/display?galleryId=${key}`,
      },
      indexMappingHandler
      );
    }, [sendRequest, key, indexMappingHandler])
    
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
      <Canvas style={{ background: "grey" }}>
        <Suspense fallback={null}>
          {/* 전역 안개, 빛 */}
          <OverallLight />
          <Fog/>
          <ambientLight intensity={0.1} />
          <Physics gravity={[0, -50, 0]}>
            {/* 사각 조명 */}
            <RectAreaLightGroup/>
            {/* 천장 디자인 */}
            <CeilingBoxGroup/>
            {/* 스포트라이트 */}
            <ImageLightGroup/>
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
