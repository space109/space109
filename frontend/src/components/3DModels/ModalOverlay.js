import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Div } from '../../styles/BaseStyles';
import closeIcon from "../../assets/close-icon.png";
import ImageIcon from "../../assets/ImageIcon.png";

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

const ImageList = styled.img`
  border-radius: 8px;
  transition: 0.2s ease;
  &:hover {
    transform: scale(1.1, 1.1);
  }
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
        </Div>
        <HR />
      </Div>
      <ScrollDiv
        display="grid"
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

export default ModalOverlay;