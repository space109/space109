import React from "react";
import styled, { keyframes } from "styled-components";
import closeIcon from "../.././assets/close-icon.png";
import keyboardA from "../.././assets/keyboard_a.png";
import keyboardW from "../.././assets/keyboard_w.png";
import keyboardS from "../.././assets/keyboard_s.png";
import keyboardD from "../.././assets/keyboard_d.png";
import keyboardE from "../.././assets/keyboard_e.png";
import keyboardSpace from "../.././assets/keyboard_space.png";
import mouse from "../.././assets/mouse.png";
import { Div } from "../../styles/BaseStyles";

const modalActive = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ModalDiv = styled.div`
  position: fixed;
  top: 15%;
  left: 25%;
  width: 50%;
  z-index: 100;
  overflow: hidden;
  height: 70%;
  background-color: var(--grey-250);
  border-radius: 10px;
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
  z-index: 400;
  cursor: pointer;
`;

const PngImg = styled.img`
  position: absolute;

  margin-left: ${(props) => (props.left ? props.left : "")};
  margin-right: ${(props) => (props.right ? props.right : "")};
  margin-top: ${(props) => (props.top ? props.top : "")};
  margin-bottom: ${(props) => (props.bottom ? props.bottom : "")};
  width: 10%;
`;

const MouseImg = styled(PngImg)`
  width: 27%;
`;

const SpaceImg = styled(PngImg)`
  width: 20%;
  height: 15%;
  
`

const ControlOverlay = (props) => {
  if (!props.controlInfo) return null;
  return (
    <ModalDiv className="modal-active">
      <Img src={closeIcon} alt="" onClick={props.toggleControlInfo} />
      <PngImg top="15%" left="25%" src={keyboardW} alt="" />
      <PngImg top="25%" left="15%" src={keyboardA} alt="" />
      <PngImg top="25%" left="25%" src={keyboardS} alt="" />
      <PngImg top="25%" left="35%" src={keyboardD} alt="" />
      <PngImg top="20%" left="70%" src={keyboardE} alt="" />
      <SpaceImg top="53%" left="65%" src={keyboardSpace} alt="" />
      <MouseImg top="46%" left="17%" src={mouse} alt="" />
      <Div w="100%" h="100%">
        <Div
          position="absolute"
          fontSize="--h2"
          fontWeight="--bold"
          mt="7%"
          ml="26%"
        >
          이동
        </Div>
        <Div
          position="absolute"
          fontSize="--h2"
          fontWeight="--bold"
          mt="7%"
          ml="66%"
        >
          시점 고정
        </Div>
        <Div
          position="absolute"
          fontSize="--h2"
          fontWeight="--bold"
          mt="40%"
          ml="22%"
        >
          액자 조작
        </Div>
        <Div
          position="absolute"
          fontSize="--h2"
          fontWeight="--bold"
          mt="40%"
          ml="71%"
        >
          점프
        </Div>
        {/* <Div h="70%" display="flex">
          <Div border="1px solid" w="65%"></Div>
          <Div border="1px solid" w="35%"></Div>
        </Div>
        <Div border="1px solid">
        </Div> */}
      </Div>
    </ModalDiv>
  );
};

export default ControlOverlay;
