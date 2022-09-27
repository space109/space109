import React from "react";
import styled, { keyframes } from "styled-components";
import closeIcon from "../../assets/close-icon.png";
import uploadImage from "../../assets/uploadImage.png"
import { Div } from "../../styles/BaseStyles";
import { SharpButton } from "../Button";
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
  from { top: 40vh; opacity: 0; }
  to { top: 50vh; opacity: 1; }
`;

// keyframe -> transition

const thumbActive = keyframes`
  from { top: 40vh; opacity: 0; }
  to { top: 50vh; opacity: 1; }
`;

const ModalDiv = styled.div`
  padding: 5vh;
  display: flex;
  position: fixed;
  top: 50vh;
  left: 20%;
  width: 60%;
  z-index: 101;
  overflow: hidden;
  height: 70vh;
  background: white;
  border-radius: 10px;
  box-sizing: border-box;
  transform:translate(0, -50%);
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

const ThumbImg = styled.img`
  width: 35vh;
  position: absolute;
  left: 20vw;
  top: 50vh;
  z-index: 102;
  transform:translate(-30%, -50%);
  box-shadow: 8px 8px 2px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  &.thumb-active {
    animation: ${thumbActive} 0.5s;
  }
`;

const TitleDiv = styled.div`
  font-size: 48px;
  font-weight: 600;
  color: var(--grey-750);
  margin-bottom: 3vh;
`;

const UserDiv = styled.div`
  display: flex;
`;

const AuthorDiv = styled.div`
  padding-right: 32px;
  border-right: 2px solid var(--grey-300);
  margin-right: 32px;
`;

// const H4Div = styled.div`
//   font-size: 30px;
//   font-weight: 600;
//   color: var(--grey-750);
//   margin-bottom: 2vh;
// `;

const H5Div = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: var(--grey-750);
  margin-bottom: 4px;
`;

const H6Div = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: var(--grey-300);
  margin-top: 12px;
`

const H7Div = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: var(--grey-400);
`;

const DescriptionDiv = styled.div`
  margin-top: 3vh;
  padding-bottom: 3vh;
`;

// const HistoryDiv = styled.div`
//   padding: 3vh 0;
// `;

const FooterDiv = styled.div`
  padding-top: 3vh;
  border-top: 2px solid var(--grey-300);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeadDiv = styled.div`
  height: 15vh;
`;

const BodyDiv = styled.div`
  height: 36vh;
  overflow: scroll;
`;

const PriceDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const CurrentPriceDiv = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: var(--grey-750);
`;

const PriceTitleDiv = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--grey-400);
`;

const PurchaseDiv = styled.div``;

// const OwnerDiv = styled.div``;

const Backdrop = (props) => {
  if (!props.toggle) return null;
  return <BackDropDiv onClick={props.toggleModal}></BackDropDiv>;
};

const ModalOverlay = (props) => {
  if (!props.toggle) return null;
  return (
    <Div>
      <ThumbImg src={uploadImage} alt="" className="thumb-active"/>
      <ModalDiv className="modal-active">
        <Img src={closeIcon} alt="" onClick={props.toggleModal} />
        <Div flex="4"></Div>
        <Div flex="8">
          <HeadDiv>
            <TitleDiv>제목</TitleDiv>
            <UserDiv>
              <AuthorDiv>
                <H5Div>작가명</H5Div>
                <H7Div>작가</H7Div>
              </AuthorDiv>
              <Div>
                <H5Div>소유자명</H5Div>
                <H7Div>소유자</H7Div>
              </Div>
            </UserDiv>
          </HeadDiv>
          <BodyDiv>
            <DescriptionDiv>
              <H7Div>작품 설명</H7Div>
              <H6Div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, </H6Div>
            </DescriptionDiv>
          </BodyDiv>
          <FooterDiv>
            <PriceDiv>
              <CurrentPriceDiv>7.3SSF</CurrentPriceDiv>
              <PriceTitleDiv>현재 가격</PriceTitleDiv>
            </PriceDiv>
            <PurchaseDiv>
              <SharpButton>구매하기</SharpButton>
            </PurchaseDiv>
          </FooterDiv>
        </Div>
      </ModalDiv>
    </Div>
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
