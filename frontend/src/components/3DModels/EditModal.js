import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import closeIcon from "../../assets/close-icon.png";
import ImageIcon from "../../assets/ImageIcon.png";
import EthereumLogo from "../../assets/Ethereum-Logo.png";
import ReactDOM from "react-dom";
import { Div } from "../../styles/BaseStyles";
import { getMetadata } from "../../apis";
import DatGui, { DatNumber } from "react-dat-gui";
import number from "./_number.scss";
import axios from "axios";
import SharpButton from "./../Button/SharpButton";
const BackDropDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  /* background: rgba(0, 0, 0, 0.29a); */
`;
const modalActive = keyframes`
  from { top: 0vh; opacity: 0; }
  to { top: 10vh; opacity: 1; }
`;

const ModalDiv = styled.div`
  position: fixed;
  top: 10%;
  left: 3%;
  width: 25%;
  z-index: 101;
  height: 80%;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.25);
  &.modal-active {
    animation: ${modalActive} 0.5s;
  }
`;

const ChangableDiv = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 10%;
  right: 3%;
  width: 30%;
  z-index: 101;
  height: 40%;
  overflow: hidden;
  background: transparent;
  border-radius: 8px;
  &.modal-active {
    animation: ${modalActive} 0.5s;
  }
`;

const Img = styled.img`
  width: 7%;
  position: absolute;
  right: 10px;
  top: 10px;
  /* filter: invert(100%);
  -webkit-filter: invert(100%); */
  cursor: pointer;
`;

const Icon = styled.img`
  width: 22px;
  margin-right: 9px;
  /* height: 90%; */
  object-fit: contain;
`;
const IconEth = styled.img`
  width: 30px;
  /* height: 90%; */
  object-fit: contain;
`;

const ImageList = styled.img`
  border-radius: 8px;
  transition: 0.2s ease;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

const HR = styled.hr`
  width: 99%;
  height: 1px;
  background-color: var(--grey-400);
  margin-top: 25px;
  margin-bottom: 25px;
`;

const Backdrop = (props) => {
  if (!props.toggle) return null;
  return <BackDropDiv onClick={props.toggleModal}></BackDropDiv>;
};

const ScrollDiv = styled(Div)`
  overflow: scroll;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  column-gap: 15px;
  row-gap: 15px;
  margin: 0 auto;
  & img {
    margin: 0 auto;
    object-fit: contain;
    width: 90%;
    cursor: pointer;
  }
`;

const ChangableOverlay = (props) => {
  if (!props.toggle) return null;

  return (
    <ChangableDiv className="modal-active">
      <DatGui
        data={props.changable}
        onUpdate={(e) => {
          props.handleUpdate(e);
        }}
      >
        <DatNumber
          style={{ marginBottom: "15px", listStyle: "none" }}
          path="positionX"
          label="X축"
          min={-300}
          max={300}
          step={1}
        />
        <DatNumber
          style={{ marginBottom: "15px", listStyle: "none" }}
          label="Y축"
          path="positionY"
          min={-300}
          max={300}
          step={1}
        />
        <DatNumber
          style={{ marginBottom: "15px", listStyle: "none" }}
          label="Z축"
          path="positionZ"
          min={-300}
          max={300}
          step={1}
        />
        <DatNumber
          style={{ marginBottom: "15px", listStyle: "none" }}
          label="가로 길이"
          path="scaleX"
          min={0}
          max={200}
          step={1}
        />
        <DatNumber
          style={{ listStyle: "none" }}
          label="세로 길이"
          path="scaleY"
          min={0}
          max={200}
          step={1}
        />
      </DatGui>
      <Div mt="20px">
        <SharpButton
          fontSize="--h6"
          width="200px"
          borderRadius="8px"
          bg="--grey-100"
          color="--grey-750"
          height="60px"
          onClick={() =>
            {props.pickNFT(
              props.toggleIdx,
              props.countArray[props.toggleIdx]?.METADATA,
              props.countArray[props.toggleIdx].TOKEN_ID,
              [0.2, props.changable.scaleY, props.changable.scaleX],
              [
                props.changable.positionX,
                props.changable.positionY,
                props.changable.positionZ,
              ]
            ); props.toggleModal()}
            
            
          }
        >
          저장하기
        </SharpButton>
      </Div>
    </ChangableDiv>
  );
};

const ModalOverlay = (props) => {
  if (!props.toggle) return null;
  return (
    <ModalDiv className="modal-active">
      <Img src={closeIcon} alt="" onClick={props.toggleModal} />
      <Div
        mt="10%"
        ml="10%"
        mr="10%"
        bgColor="--grey-100"
        w="80%"
        h="10%"
        overflow="hidden"
      >
        <Div display="flex" justifyContent="space-between" alignItems="center">
          <Div fontSize="--h5" fontWeight="--bold" ml="15px">
            <span>
              <Icon src={ImageIcon}></Icon>NFT 목록
            </span>
          </Div>
          {/* <Div
            fontSize="--body"
            fontWeight="--bold"
            border="0.1rem grey solid"
            w="155px"
            h="33px"
            display="flex"
            alignItems="center"
            mt="2px"
            borderRadius="3px"
          >
            <Div display="flex" justifyContent="center" alignItems="center">
              <IconEth src={EthereumLogo}></IconEth>
            </Div>
            <Div>0x6a02...e5aa3</Div>
          </Div> */}
        </Div>
        <HR />
      </Div>
      <ScrollDiv
        display="grid"
        // ml="10%"
        // mr="10%"
        bgColor="--grey-100"
        borderRadius="5px"
        w="80%"
        h="80%"
      >
        {props.NFTs.map((data, idx) => {
          return (
            <ImageList
              src={data?.image}
              key={`ImageList${idx}`}
              onClick={() => {
                props.getBasicInfo(
                  props.toggleIdx,
                  props.myNFT[idx],
                  data?.tokenID,
                  [0.2, props.changable.scaleY, props.changable.scaleX],
                  [
                    props.changable.positionX,
                    props.changable.positionY,
                    props.changable.positionZ,
                  ]
                );
              }}
            />
          );
        })}
      </ScrollDiv>
    </ModalDiv>
  );
};

const EditModal = ({
  toggleModal,
  toggle,
  myNFT,
  toggleIdx,
  myTokenList,
  ImageScaleHandler,
  ImagePositionHandler,
  frameScale,
  framePosition,
  countArray,
  setCountArray,
}) => {
  //액자 위치, 스케일 변환
  const [changable, setChangable] = useState({
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    scaleX: 27,
    scaleY: 27,
  });
  //포지션과 값을 변경
  const handleUpdate = useCallback((data) => {
    setChangable(data);
  }, []);

  //NFT목록의 메타데이터 리스트
  const [NFTs, setNFTs] = useState([]);
  const getData = useCallback(async () => {
    const dataArr = [];
    for (let data in myNFT) {
      const response = await getMetadata(myNFT[data]);
      response.tokenID = myTokenList[data];
      dataArr.push(response);
    }
    setNFTs(dataArr);
  }, [myNFT, myTokenList]);

  useEffect(() => {
    getData();
  }, [getData]);

  // 초기 위치, 스케일 조정
  useEffect(() => {
    handleUpdate({
      positionX: framePosition[toggleIdx][0],
      positionY: framePosition[toggleIdx][1],
      positionZ: framePosition[toggleIdx][2],
      scaleX: frameScale[toggleIdx][2],
      scaleY: frameScale[toggleIdx][1],
    });
  }, [handleUpdate, toggleIdx]);

  //스케일을 변경하고 위치를 변경하면 액자에 포지션 정보 반영
  useEffect(() => {
    let saveScale = JSON.parse(JSON.stringify(frameScale));
    let savePosition = JSON.parse(JSON.stringify(framePosition));
    saveScale[toggleIdx] = [0.2, changable.scaleY, changable.scaleX];
    savePosition[toggleIdx] = [
      changable.positionX,
      changable.positionY,
      changable.positionZ,
    ];
    ImageScaleHandler(saveScale);
    ImagePositionHandler(savePosition);
  }, [toggleIdx, changable, ImageScaleHandler, ImagePositionHandler]);

  //일부 저장
  const getBasicInfo = (index, source, tokenId, scale, pos) => {
    let copyArr = [...countArray];
    copyArr[index] = {
      METADATA: source,
      TOKEN_ID: tokenId,
      POSITION: index,
      POSITIONXYZ: pos,
      SCALE: scale,
      GALLERY_ID: 2,
      OA: "0xF742788F6a12FCad0946cF576d240a4d88762C87",
    };

    setCountArray(copyArr);
  };

  //결정된 NFT에 해당되는 이미지를 업로드(OA, galleryID 추가 필요)
  const pickNFT = (index, source, tokenId, scale, pos) => {
    let copyArr = [...countArray];
    // copyArr[index] = {
    //   metadata: source,
    //   tokenId: tokenId,
    //   position: index,
    //   positionXYZ: JSON.stringify(pos),
    //   scale: JSON.stringify(scale),
    //   galleryId: 2,
    //   oa: "0xF742788F6a12FCad0946cF576d240a4d88762C87",
    // };
    copyArr[index] = {
      METADATA: source,
      TOKEN_ID: tokenId,
      POSITION: index,
      POSITIONXYZ: pos,
      SCALE: scale,
      GALLERY_ID: 2,
      OA: "0xF742788F6a12FCad0946cF576d240a4d88762C87",
    };

    setCountArray(copyArr);

    //POST 데이터
    const data = {
      metadata: source,
      tokenId: tokenId,
      position: index,
      positionXYZ: JSON.stringify(pos),
      scale: JSON.stringify(scale),
      galleryId: 3,
      oa: "0x065bC2317685A146511FaBa338708A53fC6d2534",
    };
    console.log(data)
    // tokenId는 NFT고를 때, 가져옴
    axios({
      url: "http://j7b109.p.ssafy.io:8080/nft/display",
      method: "POST",
      data: data,
    })
      .then((res) => {
        console.log(res)
        if (res?.data.result !== "success") {
          alert("데이터 요청에 실패했습니다.");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop toggleModal={toggleModal} toggle={toggle} />,
        document.getElementById("edit-backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ChangableOverlay
          toggle={toggle}
          toggleModal={toggleModal}
          changable={changable}
          handleUpdate={handleUpdate}
          toggleIdx={toggleIdx}
          countArray={countArray}
          pickNFT={pickNFT}
        />,
        document.getElementById("edit-changable-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          toggleModal={toggleModal}
          toggle={toggle}
          NFTs={NFTs}
          myNFT={myNFT}
          toggleIdx={toggleIdx}
          getBasicInfo={getBasicInfo}
          changable={changable}
        />,
        document.getElementById("edit-overlay-root")
      )}
    </>
  );
};

export default EditModal;
