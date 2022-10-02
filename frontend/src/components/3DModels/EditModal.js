import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { getMetadata } from "../../apis";
import { useParams } from "react-router-dom";
import { useAccount, useAxios } from "../../hooks";
import ChangableOverlay from './ChangableOverlay';
import ModalOverlay from "./ModalOverlay";

const BackDropDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
`;

const Backdrop = (props) => {
  if (!props.toggle) return null;
  return <BackDropDiv onClick={props.toggleModal}></BackDropDiv>;
};

const EditModal = ({
  toggleModal,
  toggle,
  myNFT,
  toggleIdx,
  myTokenList,
  ImageScaleHandler,
  ImagePositionHandler,
  ImageRotationHandler,
  frameScale,
  framePosition,
  frameRotation,
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
    rotationX: 0,
    rotationY: 0
  });
  const [ownerAddress, nickname] = useAccount();
  const [empty, setEmpty] = useState(false);
  //NFT목록의 메타데이터 리스트
  const [NFTs, setNFTs] = useState([]);
  const { key } = useParams();
  const sendRequest = useAxios();

  //포지션과 값을 변경
  const handleUpdate = useCallback((data) => {
    setChangable(data);
  }, []);

  //NFT리스트의 각 메타데이터 내부 정보를 가져옴
  const getNFTList = useCallback(async () => {
    const dataArr = [];
    for (let data in myNFT) {
      const response = await getMetadata(myNFT[data]);
      response.tokenID = myTokenList[data];
      dataArr.push(response);
    }
    setNFTs(dataArr);
  }, [myNFT, myTokenList]);

  //NFT클릭 후, 이미지 선 적용, NFT 전시 중복검사
  //DB에 저장하는 로직X
  const getBasicInfo = (index, source, tokenId, scale, pos, rot) => {
    let copyArr = [...countArray];
    if (Object.keys(countArray[index]).length) {
      setEmpty(true);
    }
    
    copyArr[index] = {
      NFT_ID: copyArr[index].NFT_ID,
      METADATA: source,
      TOKEN_ID: parseInt(tokenId),
      POSITION: index,
      POSITIONXYZ: pos,
      ROTATION: rot,
      SCALE: scale,
      GALLERY_ID: key,
      OA: ownerAddress,
    };

    //이미 NFT가 존재하는데 중복된다면 alert 띄우기
    //NFT 배정이 안된 경우, 중복검사
    if (Object.keys(countArray[index]).length) {
      if (parseInt(tokenId) === countArray[index].TOKEN_ID) {
        alert("중복되는 NFT를 선택했습니다.");
      }
      //액자에 다른NFT 존재 && 인덱스가
      else {
        let flag = false;
        for (let item of countArray) {
          if (
            item?.TOKEN_ID === parseInt(tokenId) &&
            parseInt(tokenId) !== countArray[index].TOKEN_ID
          ) {
            alert("중복되는 NFT를 선택했습니다.2");
            flag = true;
            break;
          }
        }
        if (!flag) {
          setCountArray(copyArr);
        }
      }
    } else {
      let flag = false;
      for (let item of countArray) {
        if (item?.TOKEN_ID === parseInt(tokenId)) {
          alert("중복되는 NFT를 선택했습니다.3");
          flag = true;
          break;
        }
      }
      if (flag) {
        copyArr[index] = {};
        setCountArray(copyArr);
      } else {
        setCountArray(copyArr);
      }
    }
  };

  //저장한 NFT에 해당되는 정보를 업로드
  const pickNFT = (index, source, tokenId, scale, pos, rot) => {
    let copyArr = [...countArray];

    //인덱스 내의 객체 변경(화면에 즉시 적용시키기 위함)
    copyArr[index] = {
      NFT_ID: copyArr[index].NFT_ID,
      METADATA: source,
      TOKEN_ID: tokenId,
      POSITION: index,
      POSITIONXYZ: pos,
      ROTATION: rot,
      SCALE: scale,
      GALLERY_ID: key,
      OA: ownerAddress,
    };
    setCountArray(copyArr);
    //DB에 게시/변경 요청
    if (empty) {
      sendRequest({
        url: `${process.env.REACT_APP_BACKEND_HOST2}/nft/display/change`,
        method: "PUT",
        data: {
          nftId: copyArr[index].NFT_ID,
          scale: JSON.stringify(scale),
          positionXYZ: JSON.stringify(pos),
          rotation: JSON.stringify(rot),
          position: index,
          metadata: source,
        },
      });
    } else {
      sendRequest({
        url: `${process.env.REACT_APP_BACKEND_HOST2}/nft/display`,
        method: "POST",
        data: {
          metadata: source,
          tokenId: tokenId,
          position: index,
          positionXYZ: JSON.stringify(pos),
          rotation: JSON.stringify(rot),
          scale: JSON.stringify(scale),
          galleryId: parseInt(key),
          oa: ownerAddress,
        },
      });
    }
  };

  //삭제 요청
  const removeNFT = (index) => {
    const copyArr = [...countArray];
    setCountArray(
      countArray.map((item) => {
        if (item.TOKEN_ID === countArray[index].TOKEN_ID) {
          return {};
        } else {
          return item;
        }
      })
    );
    sendRequest({
      url: `${process.env.REACT_APP_BACKEND_HOST2}/nft/display`,
      method: "DELETE",
      data: {
        nftId: copyArr[index].NFT_ID,
      },
    });
  };

  //NFT리스트를 메타데이터 리스트에서 요청
  useEffect(() => {
    getNFTList();
  }, [getNFTList]);

  // 초기 위치, 스케일 조정
  useEffect(() => {
    handleUpdate({
      positionX: framePosition[toggleIdx][0],
      positionY: framePosition[toggleIdx][1],
      positionZ: framePosition[toggleIdx][2],
      scaleX: frameScale[toggleIdx][2],
      scaleY: frameScale[toggleIdx][1],
      rotationX: frameRotation[toggleIdx][2],
      rotationY: frameRotation[toggleIdx][1],
    });
  }, [handleUpdate, toggleIdx]);

  useEffect(() => {
    if (typeof countArray[toggleIdx] === 'object' && Object.keys(countArray[toggleIdx]).length) {
      setEmpty(true);
    }
  }, [countArray, toggleIdx])

  //위치를 변경하면 액자에 포지션 정보 반영
  useEffect(() => {
    let savePosition = JSON.parse(JSON.stringify(framePosition));
    savePosition[toggleIdx] = [
      changable.positionX,
      changable.positionY,
      changable.positionZ,
    ];
    ImagePositionHandler(savePosition);
  }, [toggleIdx, changable, ImagePositionHandler]);

  //크기를 변경하면 액자에 포지션 정보 반영
  useEffect(() => {
    let saveScale = JSON.parse(JSON.stringify(frameScale));
    saveScale[toggleIdx] = [0.2, changable.scaleY, changable.scaleX];
    ImageScaleHandler(saveScale);
  }, [toggleIdx, changable, ImageScaleHandler]);
  
  useEffect(() => {
    let saveRotation = JSON.parse(JSON.stringify(frameRotation));
    saveRotation[toggleIdx] = [0, changable.rotationY, changable.rotationX]
    ImageRotationHandler(saveRotation);
  }, [toggleIdx, changable, ImageRotationHandler])

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
          removeNFT={removeNFT}
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
