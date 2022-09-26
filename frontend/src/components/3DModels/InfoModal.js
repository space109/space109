import React from "react";
import styled, { keyframes } from "styled-components";
import closeIcon from "../../assets/close-icon.png";
import { Div } from "../../styles/BaseStyles";
import ReactDOM from "react-dom";

const BackDropDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.29);
`;
const modalActive = keyframes`
  from { top: 20vh; opacity: 0; }
  to { top: 30vh; opacity: 1; }
`;

const ModalDiv = styled.div`
  padding: 20px;
  display: flex;
  position: fixed;
  top: 30vh;
  left: 10%;
  width: 80%;
  z-index: 101;
  overflow: hidden;
  height: 30%;
  background: white;
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
`;

const Backdrop = (props) => {
  if (!props.toggle) return null;
  return <BackDropDiv onClick={props.toggleModal}></BackDropDiv>;
};

const ModalOverlay = (props) => {
  if (!props.toggle) return null;
  return (
    <ModalDiv className="modal-active">
      <Img src={closeIcon} alt="" onClick={props.toggleModal} />
      <Div flex="3">props.</Div>
      <Div flex="7"></Div>
    </ModalDiv>
  );
};

const InfoModal = ({ toggleModal, toggle, room, index }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop toggleModal={toggleModal} toggle={toggle} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay toggleModal={toggleModal} toggle={toggle} room={room} index={index}/>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default InfoModal;
