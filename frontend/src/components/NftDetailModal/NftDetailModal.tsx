import styled, { keyframes } from "styled-components";
import { ModalPortal } from "../";
import { Div } from "../../styles/BaseStyles";

interface PropsStyle{
  url?: any,
}

const On = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const BackGround = styled.div`
  position: fixed;
  background-color: var(--modal-bg);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  animation: ${On} 0.3s ease;
`

const Content = styled.div`
  box-sizing: border-box;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 500px;
  height: 500px;
  border: 10px solid red;
  z-index: 110;
  animation: ${On} 0.3s ease;
`

const Image = styled.img.attrs<PropsStyle>(props => ({
  src: props.url,
  alt: "NFT 이미지",
  }))<PropsStyle>`
  width: 100%;
`

function NftDetailModal (props:any) {
  
  return (
    <>
    <ModalPortal>
      <BackGround onClick={(e) => {
        props.closeModal();
        e.stopPropagation();
      }}        
      />
      <Content>
        <Image url={props.image} />
        <Div color="--grey-100">{props.name}</Div>
        <Div color="--grey-100">{props.author}</Div>
        <Div color="--grey-100">{props.nickname}</Div>
        <Div color="--grey-100">{props.description}</Div>
      </Content>
    </ModalPortal>
    </>
  );
}

export default NftDetailModal;