import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import closeIcon from "../../assets/close-icon.png";
import ImageIcon from "../../assets/ImageIcon.png";
import EthereumLogo from "../../assets/Ethereum-Logo.png";
import ReactDOM from "react-dom";
import { Div } from "../../styles/BaseStyles";
import { getMetadata } from "../../apis";

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
  left: 10%;
  width: 25%;
  z-index: 101;
  height: 80%;
  overflow: hidden;
  background: white;
  border-radius: 15px;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.25);
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

const ImageList = styled.img``;

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
  & img {
    margin: 0 auto;
    object-fit: contain;
    width: 95%;
    cursor: pointer;
  }
`;

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
              <Icon src={ImageIcon}></Icon>NFT 전시
            </span>
          </Div>
          <Div
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
          </Div>
        </Div>
        <HR />
      </Div>
      <ScrollDiv
        display="grid"
        ml="10%"
        mr="10%"
        bgColor="--grey-100"
        borderRadius="5px"
        w="80%"
        h="80%"
      >
        {props.NFTs.map((data, idx) => {
          return <ImageList src={data?.image} key={`ImageList${idx}`} onClick={() => {props.pickNFT(props.toggleIdx, props.myNFT[idx], data?.tokenID, props.toggleScale); props.toggleModal()}}/>
        })}
      </ScrollDiv>
    </ModalDiv>
  );
};

const EditModal = ({ toggleModal, toggle, myNFT, toggleIdx, pickNFT, myTokenList, toggleScale }) => {
  //NFT목록의 메타데이터 리스트
  const [NFTs, setNFTs] = useState([]);
  const getData = useCallback(async () => {
    const dataArr = [];
    for (let data in myNFT) {
      const response = await getMetadata(myNFT[data]);
      response.tokenID = myTokenList[data]
      dataArr.push(response);
    }
    setNFTs(dataArr);
  }, [myNFT, myTokenList]);

  useEffect(() => {
    getData()
  }, [getData]);
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop toggleModal={toggleModal} toggle={toggle} />,
        document.getElementById("edit-backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          toggleModal={toggleModal}
          toggle={toggle}
          NFTs={NFTs}
          myNFT={myNFT}
          toggleIdx={toggleIdx}
          pickNFT={pickNFT}
          toggleScale={toggleScale}
        />,
        document.getElementById("edit-overlay-root")
      )}
    </>
  );
};

export default EditModal;
