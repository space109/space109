import { Canvas, useLoader } from "@react-three/fiber";
import React, {
  Suspense,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Div } from "../styles/BaseStyles";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import axios from "axios";
import { Physics, useBox } from "@react-three/cannon";
import * as THREE from "three";
import getMetadata from "./../apis/getMetadata";
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
  LogoBox
} from "../components";


const EditVirtualGallery = () => {
  const [toggle, setToggle] = useState(false); // 모달 on/off
  const [toggleIdx, setToggleIdx] = useState(0);



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
        SCALE: [0.5, 26, 26],
        POSITION: 0,
      },
      {
        NFT_ID: 2,
        GALLERY_ID: 3,
        OA: "0x065bC2317685A146511FaBa338708A53fC6d2534",
        TOKEN_ID: "토큰아이디2",
        METADATA:
          "https://skywalker.infura-ipfs.io/ipfs/QmQizUKRdG8NG1H6GvjEqbyrmvmqxdzFYSTrZR1o6DQCsa",
        SCALE: [0.5, 26, 26],
        POSITION: 4,
      },
      {
        NFT_ID: 3,
        GALLERY_ID: 3,
        OA: "0x065bC2317685A146511FaBa338708A53fC6d2534",
        TOKEN_ID: "토큰아이디3",
        METADATA:
          "https://skywalker.infura-ipfs.io/ipfs/QmQizUKRdG8NG1H6GvjEqbyrmvmqxdzFYSTrZR1o6DQCsa",
        SCALE: [0.5, 26, 26],
        POSITION: 5,
      },
    ],
  });
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
    setFrameScale(data)
  }, [])
  
  //이미지 위치 조절 함수
  const ImagePositionHandler = useCallback((data) => {
    setFramePosition(data)
  },[])

  //ImageFrame에서 선택한 인덱스를 가져옴
  const getIndexOfFrame = useCallback((index) => {
    setToggleIdx(index);
  }, []);

  // 모달 토글 함수
  const toggleModal = () => {
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
  }, []);

  useEffect(() => {
    getNFTList();
  }, [getNFTList]);

  //이미 업로드했던 NFT 리스트를 가져오는 요청
  //요청 보낸 후 카운팅 배열로 매핑
  const [countArray, setCountArray] = useState([]);
  useEffect(() => {
    const newArr = [new Array(25)];
    for (let item of prevNFT?.data) {
      // setCountArray(state => state[item?.POSITION] = item);
      newArr[item?.POSITION] = item;
    }
    setCountArray(newArr);
  }, [prevNFT]);

  //결정된 NFT에 해당되는 이미지를 업로드(OA, galleryID 추가 필요)
  const pickNFT = (index, source, tokenID, scale) => {
    let copyArr = countArray;
    if (copyArr[index]) {
      copyArr[index].METADATA = source;
    } else {
      copyArr[index] = {
        METADATA: source,
        TOEKN_ID: tokenID,
        POSITION: index,
        SCALE: scale,
      };
    }
    setCountArray(copyArr);

    //tokenId는 NFT고를 때, 가져옴
    // axios({
    // url: "/nft/display",
    // method: "POST",
    // data: {
    //   toeknId: copyArr[index]?.TOKEN_ID,
    //   scale: [0.1, 25, 25],
    //   position: copyArr[index]?.POSITION,

    //   갤러리 ID, oa는 처음 입장부터
    //   galleryId: params로 받아온 GALLERY_ID,
    //   oa: 지갑으로부터 받은 OA,
    // },
    // }).then(res => console.log(res?.data?.result))
    // .catch(err => console.log(err));
  };



  return (
    <Div w="100vw" h="100vh">
      <EditModal
        toggleModal={toggleModal}
        toggle={toggle}
        myNFT={myNFT}
        toggleIdx={toggleIdx}
        pickNFT={pickNFT}
        myTokenList={myTokenList}
        ImageScaleHandler={ImageScaleHandler}
        ImagePositionHandler={ImagePositionHandler}
        frameScale={frameScale}
        framePosition={framePosition}
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
      >
        
      </Div>
      <Canvas style={{ background: "grey" }}>
        <Suspense fallback={null}>
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
              position={framePosition[0]}
              args={frameScale[0]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={0}
              meta={countArray[0]?.METADATA}
            />
            <ImageLight
              lightFrom={[25, 63, -150]}
              lightTo={[-2, 10, -150]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[1]}
              args={frameScale[1]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={1}
              meta={countArray[1]?.METADATA}
            />
            <ImageLight
              lightFrom={[25, 63, -185]}
              lightTo={[-2, 10, -185]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[2]}
              args={frameScale[2]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={2}
              meta={countArray[2]?.METADATA}
            />
            <ImageLight
              lightFrom={[39, 63, -115]}
              lightTo={[68, 10, -115]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[3]}
              args={frameScale[3]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={3}
              meta={countArray[3]?.METADATA}
            />
            <ImageLight
              lightFrom={[39, 63, -150]}
              lightTo={[68, 10, -150]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[4]}
              args={frameScale[4]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={4}
              meta={countArray[4]?.METADATA}
            />
            <ImageLight
              lightFrom={[39, 63, -185]}
              lightTo={[68, 10, -185]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[5]}
              args={frameScale[5]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={5}
              meta={countArray[5]?.METADATA}
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
              position={framePosition[6]}
              rotation={[0, Math.PI / 2, 0]}
              args={frameScale[6]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={6}
              meta={countArray[6]?.METADATA}
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
              position={framePosition[7]}
              rotation={[0, Math.PI / 2, 0]}
              args={frameScale[7]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={7}
              meta={countArray[7]?.METADATA}
            />
            <ImageLight
              lightFrom={[146, 63, -238]}
              lightTo={[146, 10, -274]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[8]}
              rotation={[0, Math.PI / 2, 0]}
              args={frameScale[8]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={8}
              meta={countArray[8]?.METADATA}
            />
            <ImageLight
              lightFrom={[181, 63, -238]}
              lightTo={[181, 10, -274]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[9]}
              rotation={[0, Math.PI / 2, 0]}
              args={frameScale[9]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={9}
              meta={countArray[9]?.METADATA}
            />
            <ImageLight
              lightFrom={[111, 63, -235]}
              lightTo={[111, 10, -199]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[10]}
              rotation={[0, Math.PI / 2, 0]}
              args={frameScale[10]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={10}
              meta={countArray[10]?.METADATA}
            />
            <ImageLight
              lightFrom={[146, 63, -235]}
              lightTo={[146, 10, -199]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[11]}
              rotation={[0, Math.PI / 2, 0]}
              args={frameScale[11]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={11}
              meta={countArray[11]?.METADATA}
            />
            <ImageLight
              lightFrom={[181, 63, -235]}
              lightTo={[181, 10, -199]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[12]}
              rotation={[0, Math.PI / 2, 0]}
              args={frameScale[12]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={12}
              meta={countArray[12]?.METADATA}
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
              position={framePosition[13]}
              args={frameScale[13]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={13}
              meta={countArray[13]?.METADATA}
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
              position={framePosition[14]}
              args={frameScale[14]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={14}
              meta={countArray[14]?.METADATA}
            />
            <ImageLight
              lightFrom={[230, 63, -125]}
              lightTo={[195, 10, -125]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[15]}
              args={frameScale[15]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={15}
              meta={countArray[15]?.METADATA}
            />
            <ImageLight
              lightFrom={[230, 63, -90]}
              lightTo={[195, 10, -90]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[16]}
              args={frameScale[16]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={16}
              meta={countArray[16]?.METADATA}
            />
            <ImageLight
              lightFrom={[234, 63, -160]}
              lightTo={[271, 10, -160]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[17]}
              args={frameScale[17]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={17}
              meta={countArray[17]?.METADATA}
            />
            <ImageLight
              lightFrom={[234, 63, -125]}
              lightTo={[271, 10, -125]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[18]}
              args={frameScale[18]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={18}
              meta={countArray[18]?.METADATA}
            />
            <ImageLight
              lightFrom={[234, 63, -90]}
              lightTo={[271, 10, -90]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[19]}
              args={frameScale[19]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={19}
              meta={countArray[19]?.METADATA}
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
              position={framePosition[20]}
              rotation={[0, Math.PI / 2, 0]}
              args={frameScale[20]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={20}
              meta={countArray[20]?.METADATA}
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
              position={framePosition[21]}
              rotation={[0, Math.PI / 2, 0]}
              args={frameScale[21]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={21}
              meta={countArray[21]?.METADATA}
            />
            <ImageLight
              lightFrom={[150, 60, -40]}
              lightTo={[150, 10, -4]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[22]}
              args={frameScale[22]}
              rotation={[0, Math.PI / 2, 0]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={22}
              meta={countArray[22]?.METADATA}
            />
            <ImageLight
              lightFrom={[115, 60, -35]}
              lightTo={[115, 10, -73]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[23]}
              rotation={[0, Math.PI / 2, 0]}
              args={frameScale[23]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={23}
              meta={countArray[23]?.METADATA}
            />
            <ImageLight
              lightFrom={[150, 60, -35]}
              lightTo={[150, 10, -73]}
              angle={0.4}
              intensity={1}
              penumbra={0.1}
            />
            <ImageFrame
              position={framePosition[24]}
              args={frameScale[24]}
              rotation={[0, Math.PI / 2, 0]}
              toggleModal={toggleModal}
              getIndexOfFrame={getIndexOfFrame}
              index={24}
              meta={countArray[24]?.METADATA}
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
        </Suspense>
      </Canvas>
    </Div>
  );
};

export default EditVirtualGallery;
