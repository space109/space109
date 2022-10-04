import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense, useState, useEffect, useCallback } from "react";
import { Div } from "../styles/BaseStyles";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import axios from "axios";
import { Physics, useBox } from "@react-three/cannon";
import { useParams } from "react-router-dom";
import { PerspectiveCamera } from '@react-three/drei'

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

//조명을 조절하는 함수

const VirtualGallery = () => {
  const [toggle, setToggle] = useState(false); // 모달 on/off
  const [toggleIdx, setToggleIdx] = useState(0);

  const [metalist, setMetaList] = useState([{ hello: "hello" }]); //기존에 업로드 되었던 목록을 가져옴(업로드 되었던 목록에서 변화)
  const [targetMeta, setTargetMeta] = useState(""); // 모달에 띄울 메타데이터
  const [imageMeta, setImageMeta] = useState({ // ImageFrame에 넣어줄 메타데이터
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
    10: '',
    11: '',
    12: '',
    13: '',
    14: '',
    15: '',
    16: '',
    17: '',
    18: '',
    19: '',
    20: '',
    21: '',
    22: '',
    23: '',
    24: '',
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

  //ImageFrame에서 선택한 인덱스를 가져옴
  const getIndexOfFrame = useCallback((index) => {
    setToggleIdx(index);
  }, []);

  const { key } = useParams();

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
        POSITIONXYZ: [111, 25, -216.8]
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
        POSITIONXYZ: [53, 25, -150]
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
        POSITIONXYZ: [13, 25, -150]
      },
    ],
  });

  // 모달 토글 함수
  const toggleModal = () => {
    setToggle((state) => !state);
  };
  // 토글 확인 함수
  const isToggle = () => {
    return toggle;
  };

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
    // 플레이어 위치 정보 콘솔 출력 함수. 필요시 사용
    console.log(playerPosition);
  };

  const handleKeyDown = (e) => {
    console.log(e.target.value);
  };

  const targetRoom = (e) => {
    // 룸 정보 함수. 
    setRoom(e);
  };

  const targetIndex = (e) => {
    // 모달 타겟 인덱스 함수.
    setIndex(e);
  };

  useEffect(() => {
    console.log('업데이트')
    axios
      .get(`http://j7b109.p.ssafy.io:8080/nft/display?galleryId=${key}`)
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
  },[]);

  useEffect(() => {
    let tempMeta = {
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
      10: '',
      11: '',
      12: '',
      13: '',
      14: '',
      15: '',
      16: '',
      17: '',
      18: '',
      19: '',
      20: '',
      21: '',
      22: '',
      23: '',
      24: '',
    };
    let tempPosition = [
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
    ];
    let tempScale = [
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
    ];
    (prevNFT?.data).forEach((value) => {
      tempMeta[value.POSITION] = value.METADATA;
      if (typeof(value.POSITIONXYZ) === typeof("a")) {
        tempPosition[value.POSITION] = JSON.parse(value.POSITIONXYZ);
      } else {
        tempPosition[value.POSITION] = value.POSITIONXYZ;
      }
      if (typeof(value.SCALE) === typeof("a")) {
        tempScale[value.POSITION] = JSON.parse(value.SCALE);
      } else {
        tempScale[value.POSITION] = value.SCALE;
      }
    });
    setImageMeta(tempMeta);
    setFramePosition(tempPosition);
    setFrameScale(tempScale);
  }, [prevNFT]);

  useEffect(() => {
    const artIndexList = [
      // 방, Index 리스트
      [], // 시작 방
      [0, 1, 2, 3, 4, 5], // 1번 방
      [6], // 2번 방
      [7, 8, 9, 10, 11, 12], // 3번 방
      [13], // 4번 방
      [14, 15, 16, 17, 18, 19], // 5번 방
      [20], // 6번 방
      [21, 22, 23, 24], // 7번 방
      [], // 중앙 방
    ];

    let focus = typeof(artIndexList[room][index]) === typeof(0) ? artIndexList[room][index] : -1;

    prevNFT.data.some((value) => {
      if (value.POSITION === focus) {
        setTargetMeta(value.METADATA);
        console.log("targetMeta: ", value.METADATA, room, index, focus);
        return true;
      }
      setTargetMeta("");
      console.log("targetMeta: ''", room, index, focus);
      return false;
    });
  }, [room, index, prevNFT]);

  const [countArray, setCountArray] = useState([]);

  return (
    <Div w="100vw" h="100vh">
      <InfoModal
        toggleModal={toggleModal}
        toggle={toggle}
        meta={targetMeta}
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
          {/* 2번 통로 */}
          <RectAreaLight
            position={[33, 30.3, -216.4]}
            rotation={[-Math.PI / 2, 0, 0]}
            width={4.5}
            intensity={2}
            height={30.45}
          />
          {/* 2번방 1개 */}
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
          {/* 4번 통로 */}
          <RectAreaLight
            position={[212.05, 30.35, -236.5]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            width={4.5}
            intensity={2}
            height={30.45}
          />
          {/* 4번방 1개 */}
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
          {/* 6번 통로 */}
          <RectAreaLight
            position={[232.3, 30.45, -58.81]}
            rotation={[-Math.PI / 2, 0, 0]}
            width={4.5}
            intensity={2}
            height={30.45}
          />
          {/* 6번방 1개 */}
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
          {/* <PerspectiveCamera position={[100, 50, -100]} makeDefault={!toggle} /> */}
        </Physics>
      </Canvas>
    </Div>
  );
};

export default VirtualGallery;
