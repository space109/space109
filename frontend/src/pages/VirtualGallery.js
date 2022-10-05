import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense, useState, useEffect, useCallback } from "react";
import { Div } from "../styles/BaseStyles";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import axios from "axios";
import { Physics, useBox } from "@react-three/cannon";
import { useParams } from "react-router-dom";
import { PerspectiveCamera } from "@react-three/drei";
import { useAccount, useAxios } from "../hooks";

import {
  GalleryMap,
  Player,
  CeilingBoxGroup,
  ImageLightGroup,
  Fog,
  RectAreaLightGroup,
  Decorations,
  ImageFrame,
  Floor,
  InfoModal,
  CommunityModal,
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
  const [countArray, setCountArray] = useState([]);
  const { key } = useParams();
  const sendRequest = useAxios();
  const [ownerAddress, nickname] = useAccount();

  const [frameRotation, setFrameRotation] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, Math.PI / 2, 0],
    [0, Math.PI / 2, 0],
    [0, Math.PI / 2, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
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
  ]);
  const [framePosition, setFramePosition] = useState([
    [13, 25, -115],
    [13, 25, -150],
    [13, 25, -185],
    [53, 25, -115],
    [53, 25, -150],
    [53, 25, -185],
    [33, 25, -264],
    [111, 25, -216.8], //2번방 1
    [146, 25, -257], //2
    [164, 25, -231], //3
    [127.5, 25, -241], //4
    [162.2, 25, -231], //5
    [181, 25, -216.8], //6
    [259, 25, -238],
    [232.7, 20, -143], //3번방 1
    [252, 25, -125], //2
    [232.7, 20, -103], //3
    [231.5, 20, -143], //4
    [212, 25, -125], //5
    [231.5, 20, -103], //6
    [231, 25, -12],
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
    [0.2, 15, 15], //2번방
    [0.2, 15, 15],
    [0.2, 15, 15],
    [0.2, 15, 15],
    [0.2, 15, 15],
    [0.2, 15, 15],
    [0.2, 45, 45],
    [0.2, 13, 13], //3번방 1
    [0.2, 27, 27], //2
    [0.2, 13, 13], //3
    [0.2, 13, 13], //4
    [0.2, 27, 27], //5
    [0.2, 13, 13], //6
    [0.2, 45, 45],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
    [0.2, 27, 27],
  ]);

  const [open, setOpen] = useState(false);
  const [post, setPost] = useState([]);

  //방명록 초기화
  const resetCommentHandler = useCallback(() => {
    if (window.confirm("정말로 방명록을 초기화 하시겠습니까?")) {
      setPost([]);
      sendRequest({
        url: `${process.env.REACT_APP_BACKEND_HOST}/gallery/guestbook?galleryId=${key}`,
        method: "DELETE",
        data: {
          galleryId: key,
        },
      });
    }
  }, [key, sendRequest]);

  //최초 방명록 업데이트
  const getCommentHandler = useCallback((data) => {
    setPost(data.data);
  }, []);

  //방명록에 댓글을 추가하는 함수
  const addCommentHandler = useCallback(
    (comment) => {
      setPost((state) => [
        { GALLERY_ID: key, NICKNAME: nickname, DESCRIPTION: comment },
        ...state,
      ]);
      sendRequest({
        url: `${process.env.REACT_APP_BACKEND_HOST2}/gallery/guestbook`,
        method: "POST",
        data: { galleryId: key, nickname: nickname, description: comment },
      });
    },
    [key, nickname, sendRequest]
  );

  //방명록 오픈
  const toggleOpen = useCallback(() => {
    setOpen((state) => !state);
  }, []);

  const [metalist, setMetaList] = useState([{ hello: "hello" }]); //기존에 업로드 되었던 목록을 가져옴(업로드 되었던 목록에서 변화)
  const [targetMeta, setTargetMeta] = useState(""); // 모달에 띄울 메타데이터
  const [imageMeta, setImageMeta] = useState({
    // ImageFrame에 넣어줄 메타데이터
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    18: "",
    19: "",
    20: "",
    21: "",
    22: "",
    23: "",
    24: "",
  });

  //ImageFrame에서 선택한 인덱스를 가져옴
  const getIndexOfFrame = useCallback((index) => {
    setToggleIdx(index);
  }, []);

  //이미 업로드했던 NFT 리스트(더미데이터)

  // 모달 토글 함수
  const toggleModal = () => {
    setToggle((state) => !state);
  };
  // 토글 확인 함수
  const isToggle = () => {
    return toggle;
  };

  //NFT id를 받아와 해당 인덱스의 NFT_ID에 할당
  const nftIdHandler = useCallback(
    (data) => {
      let copyArr = [...countArray];
      copyArr[toggleIdx] = {
        NFT_ID: data.nftId,
        METADATA: copyArr[toggleIdx].METADATA,
        TOKEN_ID: copyArr[toggleIdx].TOKEN_ID,
        POSITION: copyArr[toggleIdx].POSITION,
        POSITIONXYZ: copyArr[toggleIdx].POSITIONXYZ,
        ROTATION: copyArr[toggleIdx].ROTATION,
        SCALE: copyArr[toggleIdx].SCALE,
        GALLERY_ID: copyArr[toggleIdx].GALLERY_ID,
        OA: copyArr[toggleIdx].OA,
      };
      setCountArray(copyArr);
      console.log("copyArr: ", copyArr);
    },
    [toggleIdx, countArray]
  );

  //포지션에 맞게 계차 매핑, 나머지는 빈 객체로 초기화
  const indexMappingHandler = useCallback((data) => {
    const newArr = new Array(25);
    const posArr = [...framePosition];
    const scaleArr = [...frameScale];
    const rotationArr = [...frameRotation];
    //위치 스케일을 초기에 업데이트함
    for (let item of data?.data) {
      newArr[item?.POSITION] = item;
    }
    // for (let i = 0; i < newArr.length; i++) {
    //   if (!newArr[i]) {
    //     newArr[i] = {};
    //   }
    // }
    for (let idx in newArr) {
      if (Object.keys(newArr[idx]).length) {
        posArr[idx] = JSON.parse(newArr[idx]?.POSITIONXYZ);
        scaleArr[idx] = JSON.parse(newArr[idx]?.SCALE);
        rotationArr[idx] = JSON.parse(newArr[idx]?.ROTATION);
      }
    }
    setFrameRotation(rotationArr);
    setFramePosition(posArr);
    setFrameScale(scaleArr);
    setCountArray(newArr);
  }, []);

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

  useEffect(() => {
    sendRequest(
      {
        url: `${process.env.REACT_APP_BACKEND_HOST}nft/display?galleryId=${key}`,
      },
      indexMappingHandler
    );
  }, [sendRequest, key, indexMappingHandler]);

  return (
    <Div w="100vw" h="100vh">
      <InfoModal
        toggleModal={toggleModal}
        toggle={toggle}
        meta={countArray ? countArray[toggleIdx]?.METADATA : ""}
      />
      <CommunityModal
        open={open}
        toggleOpen={toggleOpen}
        post={post}
        addCommentHandler={addCommentHandler}
        resetCommentHandler={resetCommentHandler}
      />
      <Canvas style={{ background: "grey" }}>
        <Fog />
        <ambientLight intensity={0.1} />
        {/* <OrbitControls /> */}
        <Physics gravity={[0, -50, 0]}>
          {/* 사각 조명 */}
          <RectAreaLightGroup />
          {/* 천장 박스 디자인 */}
          <CeilingBoxGroup />
          {/* 스포트라이트 */}
          <ImageLightGroup />
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
          <Floor position={[0, 10.15, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          <Decorations toggleOpen={toggleOpen} />
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
          />
          {/* <PerspectiveCamera position={[100, 50, -100]} makeDefault={!toggle} /> */}
        </Physics>
      </Canvas>
    </Div>
  );
};

export default VirtualGallery;
