import React from "react";
import styled, { keyframes } from "styled-components";
import { Div } from "../../styles/BaseStyles";
import closeIcon from "../../assets/close-icon.png";
import ImageIcon from "../../assets/ImageIcon.png";

const LeftDiv = styled(Div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
  
  & img {
    object-fit: contain;
    width: 90%;
    cursor: pointer;
  }
`;

const RightDiv = styled(Div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
  & img {
    object-fit: contain;
    width: 90%;
    cursor: pointer;
  }
`;

const ImageList = styled.img`
  margin-top: 9%;
  box-shadow: 1px 1px 3px grey;
  border-radius: 8px;
  transition: 0.2s ease;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

const Icon = styled.img`
  width: 22px;
  margin-right: 9px;
  /* height: 90%; */
  object-fit: contain;
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

const Img = styled.img`
  width: 7%;
  position: absolute;
  right: 10px;
  top: 10px;
  /* filter: invert(100%);
  -webkit-filter: invert(100%); */
  cursor: pointer;
`;

const HR = styled.hr`
  width: 99%;
  height: 1px;
  background-color: var(--grey-400);
  margin-top: 25px;
  margin-bottom: 25px;
`;

const ModalOverlay = (props) => {
  if (!props.toggle) return null;
  return (
    <ModalDiv className="modal-active">
      <Img src={closeIcon} alt="" onClick={props.toggleModal} />
      <Div
        mt="5%"
        ml="10%"
        mr="10%"
        bgColor="--grey-100"
        w="80%"
        h="8%"
        overflow="hidden"
      >
        <Div display="flex" justifyContent="space-between" alignItems="center">
          <Div fontSize="--h5" fontWeight="--bold" ml="15px">
            <span>
              <Icon src={ImageIcon}></Icon>NFT 목록
            </span>
          </Div>
        </Div>
        <HR />
      </Div>
      <Div display="flex" justifyContent="center" flexWrap="wrap" overflow="scroll" w="100%" h="88%">
        <LeftDiv>
          {props.NFTs.map((data, idx) => {
            if (idx % 2 === 0)
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
        </LeftDiv>
        <RightDiv>
          {props.NFTs.map((data, idx) => {
            if (idx % 2 === 1)
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
        </RightDiv>
      </Div>
    </ModalDiv>
  );
};

export default ModalOverlay;
