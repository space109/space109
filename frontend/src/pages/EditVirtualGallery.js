import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState, useEffect, useCallback } from "react";
import { Div } from "../styles/BaseStyles";
import { Physics } from "@react-three/cannon";
import { SsafyNFTContract } from "../web3Config";
import {
  Player,
  ImageFrame,
  EditModal,
  LogoBox,
  CeilingBoxGroup,
  ImageLightGroup,
  Fog,
  RectAreaLightGroup,
  GalleryMap,
  Decorations,
  Floor,
  CommunityModal,
  SharpButton,
} from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount, useAxios } from "../hooks";

const EditVirtualGallery = () => {
  const [toggle, setToggle] = useState(false); // 모달 on/off
  const [toggleIdx, setToggleIdx] = useState(20);
  const [countArray, setCountArray] = useState([]);
  const { key } = useParams();
  const sendRequest = useAxios();
  const [ownerAddress, nickname] = useAccount();
  const [myNFT, setMyNFT] = useState([]);
  const [myTokenList, setMyTokenList] = useState([]);
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
  const navigate = useNavigate();
  //컨트롤 설명서

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
        url: `${process.env.REACT_APP_BACKEND_HOST}/gallery/guestbook`,
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
  //이미지 크기 조절 함수
  const ImageScaleHandler = useCallback((data) => {
    setFrameScale(data);
  }, []);

  //이미지 위치 조절 함수
  const ImagePositionHandler = useCallback((data) => {
    setFramePosition(data);
  }, []);

  const ImageRotationHandler = useCallback((data) => {
    setFrameRotation(data);
  }, []);

  //ImageFrame에서 선택한 인덱스를 가져옴
  const getIndexOfFrame = useCallback((index) => {
    setToggleIdx(index);
  }, []);

  // 모달 토글 함수
  const toggleModal = (e) => {
    setToggle((state) => !state);
  };

  const ExitHandler = () => {
    if (window.confirm("정말로 퇴장하시겠습니까?")) {
      navigate(-1);
    }
  };

  //지갑의 NFT 전체 리스트, 토큰ID 리스트를 가져오는 요청
  const getNFTList = useCallback(async () => {
    if (ownerAddress) {
      const tokenIds = await SsafyNFTContract.methods
        .tokenIDsofWallet(ownerAddress)
        .call();

      const tokenURIs = await SsafyNFTContract.methods
        .tokenURIsofWallet(ownerAddress)
        .call();
      setMyNFT(tokenURIs);
      setMyTokenList(tokenIds);
    }
  }, [ownerAddress]);

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
    for (let i = 0; i < newArr.length; i++) {
      if (!newArr[i]) {
        newArr[i] = {};
      }
    }
    for (let idx in newArr) {
      if (Object.keys(newArr[idx]).length) {
        posArr[idx] = JSON.parse(newArr[idx]?.POSITIONXYZ);
        scaleArr[idx] = JSON.parse(newArr[idx]?.SCALE);
        rotationArr[idx] = JSON.parse(newArr[idx]?.ROTATION);
      }
    }
    console.log(newArr)
    setFrameRotation(rotationArr);
    setFramePosition(posArr);
    setFrameScale(scaleArr);
    setCountArray(newArr);
  }, []);

  //방명록 데이터 READ
  useEffect(() => {
    sendRequest(
      {
        url: `${process.env.REACT_APP_BACKEND_HOST}/gallery/guestbook?galleryId=${key}&countPerPage=50`,
      },
      getCommentHandler
    );
  }, [key, sendRequest, getCommentHandler]);

  //메타데이터 리스트 호출
  useEffect(() => {
    getNFTList();
  }, [getNFTList]);

  //최초 데이터 계수로 매핑
  useEffect(() => {
    console.log("키값", key)
    sendRequest(
      {
        url: `${process.env.REACT_APP_BACKEND_HOST}/nft/display?galleryId=${key}`,
      },
      indexMappingHandler
    );
  }, [sendRequest, key, indexMappingHandler]);

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
        ImageRotationHandler={ImageRotationHandler}
        frameRotation={frameRotation}
        frameScale={frameScale}
        framePosition={framePosition}
        countArray={countArray}
        setCountArray={setCountArray}
        nftIdHandler={nftIdHandler}
      />
      <CommunityModal
        open={open}
        toggleOpen={toggleOpen}
        post={post}
        addCommentHandler={addCommentHandler}
        resetCommentHandler={resetCommentHandler}
        disabled={false}
      />
      <Div position="absolute" bottom="10px" right="10px" zIndex={90}>
        <SharpButton
          fontSize="--h6"
          width="150px"
          height="40px"
          bg="--carmine-100"
          borderRadius="8px"
          onClick={ExitHandler}
        >
          퇴장하기
        </SharpButton>
      </Div>
      <Canvas style={{ background: "grey" }}>
        <Suspense fallback={null}>
          {/* 전역 안개, 빛 */}
          <Fog />
          <ambientLight intensity={0.5} />
          <Physics gravity={[0, -60, 0]}>
            {/* 사각 조명 */}
            <RectAreaLightGroup />
            {/* 천장 디자인 */}
            <CeilingBoxGroup />
            {/* 스포트라이트 */}
            <ImageLightGroup />
            {/* 액자 리스트 */}
            {countArray.map((item, idx) => {
              return (
                <ImageFrame
                  key={`ImageFrameKey${idx}`}
                  position={framePosition[idx]}
                  rotation={frameRotation[idx]}
                  args={frameScale[idx]}
                  toggleModal={toggleModal}
                  getIndexOfFrame={getIndexOfFrame}
                  index={idx}
                  meta={countArray ? countArray[idx]?.METADATA : {}}
                />
              );
            })}

            {/* 로고 이미지 */}
        
            <GalleryMap position={[0, 0, 0]} />
            <Floor position={[0, 10, 0]} />
            <Decorations toggleOpen={toggleOpen} />
            <Player
              open={open}
              position={[33, 13, -40]}
              lockControl={toggle}
              toggleModal={toggleModal}
              toggle={toggle}
              setToggle={setToggle}
            />
          </Physics>
        </Suspense>
      </Canvas>
    </Div>
  );
};

export default EditVirtualGallery;
