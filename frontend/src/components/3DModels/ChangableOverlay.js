import React from 'react';
import styled, { keyframes } from 'styled-components';
import FrameDataHandler from "./FrameDataHandler";
import SharpButton from "./../Button/SharpButton";
import { Div } from '../../styles/BaseStyles';

const modalActive = keyframes`
  from { top: 0vh; opacity: 0; }
  to { top: 10vh; opacity: 1; }
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
  height: 60%;
  overflow: hidden;
  background: transparent;
  border-radius: 8px;
  &.modal-active {
    animation: ${modalActive} 0.5s;
  }
`;

const ChangableOverlay = (props) => {
  if (!props.toggle) return null;

  return (
    <ChangableDiv className="modal-active">
      <FrameDataHandler
        changable={props.changable}
        handleUpdate={props.handleUpdate}
      />
      <Div mt="30px" display="flex">
        <SharpButton
          fontSize="--h6"
          width="200px"
          borderRadius="8px"
          bg="--grey-100"
          color="--grey-750"
          height="60px"
          onClick={(e) => {
            props.pickNFT(
              props.toggleIdx,
              props.countArray[props.toggleIdx]?.METADATA,
              props.countArray[props.toggleIdx].TOKEN_ID,
              [0.2, props.changable.scaleY, props.changable.scaleX],
              [
                props.changable.positionX,
                props.changable.positionY,
                props.changable.positionZ,
              ],
              [0, props.changable.rotationY, props.changable.rotationX]
            );
            props.toggleModal();
          }}
        >
          저장하기
        </SharpButton>
        <Div ml="60px">
          <SharpButton
            fontSize="--h6"
            width="200px"
            borderRadius="8px"
            bg="--grey-100"
            color="--grey-750"
            height="60px"
            onClick={(e) => {
              props.removeNFT(props.toggleIdx);
              props.toggleModal();
            }}
          >
            삭제하기
          </SharpButton>
        </Div>
      </Div>
    </ChangableDiv>
  );
};

export default ChangableOverlay;