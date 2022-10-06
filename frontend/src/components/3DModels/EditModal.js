import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { getMetadata } from "../../apis";
import { useParams } from "react-router-dom";
import { useAccount, useAxios } from "../../hooks";
import ChangableOverlay from "./ChangableOverlay";
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
  nftIdHandler,
}) => {
  //액자 위치, 스케일 변환
  const [empty, setEmpty] = useState(false);
  const [changable, setChangable] = useState({
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    scaleX: 27,
    scaleY: 27,
    rotationX: 0,
    rotationY: 0,
  });
  const [ownerAddress, nickname] = useAccount();
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
    console.log("맞게 저장되는가??", countArray[index]);
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

    //이미 액자에 게시되었는데 중복이 있다면 alert 띄우기
    //NFT 배정이 안된 경우, 중복검사
    console.log("왜ㅐㅐㅐㅐㅐㅐㅐㅐㅐ", countArray);
    if (Object.keys(countArray[index]).length) {
      //액자에 같은 작품이 존재
      if (parseInt(tokenId) === countArray[index].TOKEN_ID) {
        alert("이미 작품이 전시되어 있습니다.");
      }
      //액자에 다른 NFT 존재 && 다른 액자에 이미 전시된 NFT
      else {
        let flag = false;
        for (const [itemIdx, item] of countArray.entries()) {
          console.log(itemIdx);
          if (
            item?.TOKEN_ID === parseInt(tokenId) &&
            parseInt(tokenId) !== countArray[index].TOKEN_ID
          ) {
            console.log("1번 케이스");
            if (
              window.confirm(
                "다른 액자에 전시된 작품입니다. 기존에 전시된 작품을 지우고 전시하시겠습니까?"
              )
            ) {
              //중복이니 기존 인덱스를 비우고, 새로운 인덱스에 넣어줌
              copyArr[itemIdx] = {};
              removeNFT(itemIdx);
              setCountArray(copyArr);
            }

            flag = true;
            break;
          }
        }
        //중복이 아니므로 그대로 저장
        if (!flag) {
          setCountArray(copyArr);
        }
      }
    }
    //액자에 아무 작품도 없지만 다른 액자에 이미 전시된 NFT 선택.
    else {
      let flag = false;
      for (let [itemIdx, item] of countArray.entries()) {
        if (item?.TOKEN_ID === parseInt(tokenId)) {
          console.log("2번 케이스");
          if (
            window.confirm(
              "다른 액자에 전시된 작품입니다. 기존에 전시된 작품을 지우고 전시하시겠습니까?"
            )
          ) {
            //중복이니 기존 인덱스를 비우고, 새로운 인덱스에 넣어줌
            copyArr[index].NFT_ID = copyArr[itemIdx].NFT_ID;
            copyArr[itemIdx] = {};
            setCountArray(copyArr);
            removeNFT(itemIdx);
          } else {
            flag = true;
          }
          break;
        }
      }
      if (!flag) {
        setCountArray(copyArr);
      }
    }
  };

  //저장한 NFT에 해당되는 정보를 업로드
  const pickNFT = (index, source, tokenId, scale, pos, rot) => {
    let copyArr = [...countArray];
    //인덱스 내의 객체 변경(화면에 즉시 적용시키기 위함)
    copyArr[index] = {
      NFT_ID: countArray[index].NFT_ID,
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
      console.log("3333333333", countArray[index].NFT_ID);
      sendRequest({
        url: `${process.env.REACT_APP_BACKEND_HOST}/nft/display/change`,
        method: "PUT",
        data: {
          nftId: countArray[index].NFT_ID,
          scale: JSON.stringify(scale),
          positionXYZ: JSON.stringify(pos),
          rotation: JSON.stringify(rot),
          position: index,
          metadata: source,
          tokenId: tokenId,
        },
      });
    } else {
      console.log("444444444444");
      sendRequest(
        {
          url: `${process.env.REACT_APP_BACKEND_HOST}/nft/display`,
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
        },
        nftIdHandler
      );
    }
    setEmpty(false);
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
      url: `${process.env.REACT_APP_BACKEND_HOST}/nft/deleteFrame`,
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
  //초기에 있다면 PUT만 보내도록 하고 아니면 POST로 바꿈.
  useEffect(() => {
    console.log("이상하네????/", countArray[toggleIdx]);
    if (countArray[toggleIdx] && Object.keys(countArray[toggleIdx]).length) {
      setEmpty(true);
      console.log('dddddddddddddd', true)
    } else {
      console.log("eeeeeeeeeeeeeeeeee", true);
      setEmpty(false);
    }
  }, [toggleIdx]);
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
    saveRotation[toggleIdx] = [0, changable.rotationY, changable.rotationX];
    ImageRotationHandler(saveRotation);
  }, [toggleIdx, changable, ImageRotationHandler]);

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
