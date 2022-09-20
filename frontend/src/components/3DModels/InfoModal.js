import React from 'react';
import styled, { keyframes } from 'styled-components';
import closeIcon from '../../assets/close-icon.png'
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
  position: fixed;
  top: 30vh;
  left: 10%;
  width: 80%;
  z-index: 100;
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
  if (!props.open) return null;
  return <BackDropDiv onClick={props.toggleModal}></BackDropDiv>;
};

const ModalOverlay = (props) => {
  if (!props.open) return null;
  return (
    <ModalDiv className="modal-active">
      <Img src={closeIcon} alt="" onClick={props.toggleModal} />
      <h2
        style={{
          textAlign: "center",
          marginBottom: "-2.3em",
          color: "#5a5a5a",
          marginTop: "1em",
        }}
      >
        {props.title}
      </h2>
      <h5
        style={{
          marginBottom: "-2.3em",
          color: "#5a5a5a",
          marginTop: "1em",
          marginLeft: "6em",
        }}
      >
        <b style={{ color: "#8DA1FF" }}>◼</b> 회원님 기록
      </h5>
      <h5
        style={{
          marginBottom: "-5em",
          color: "#5a5a5a",
          marginTop: "3em",
          marginLeft: "6em",
        }}
      >
        <b style={{ color: "#f06875" }}>◼</b> 20대 남성 권장 운동량
      </h5>
    </ModalDiv>
  );
};



const InfoModal = () => {
  return (
    <div>
      
    </div>
  );
};

export default InfoModal;