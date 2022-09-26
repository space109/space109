import { useState, useEffect} from "react";
import styled, { keyframes } from "styled-components";
import { ModalPortal, Input, SharpButton } from "..";
import { Div, screenSizes } from "../../styles/BaseStyles";

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

const Content = styled(Div)`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: auto;
  z-index: 110;
  animation: ${On} 0.3s ease;
  @media screen and (max-width: ${screenSizes.sm + "px"}) {
    flex-direction: column;
  }
  overflow: auto;
`

const ImageSection = styled(Div)`
display: flex;
justify-content: center;
align-items: center;
  box-sizing: border-box;
  width: 50%;
  height: auto;
  padding: 0 2% 0 12%;
  @media screen and (max-width: ${screenSizes.xxl + "px"}) {
    padding: 0 2% 0 12%;
  }
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
    padding: 0 2% 0 8%;
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    padding: 0 1%;
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    padding: 0 1%;
  }
  @media screen and (max-width: ${screenSizes.sm + "px"}) {
    padding: 0;
    width: 80%
  }
  @media screen and (max-width: ${screenSizes.xs + "px"}) {
    padding: 0;
    width: 80%
  }
`

const DetailSection = styled(Div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-sizing: border-box;
  width: 50%;
  height: auto;
  padding: 0 12% 0 2%;
  @media screen and (max-width: ${screenSizes.xxl + "px"}) {
    padding: 0 12% 0 2%;
  }
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
    padding: 0 8% 0 2%;
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    padding: 0 1%;
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    padding: 0 1%;
  }
  @media screen and (max-width: ${screenSizes.sm + "px"}) {
    width: 80%;
    margin-top: 1rem;
    gap: 1rem;
  }
  @media screen and (max-width: ${screenSizes.xs + "px"}) {
    width: 80%;
    margin-top: 1rem;
    gap: 1rem;
  }
`

const Image = styled.img.attrs<PropsStyle>(props => ({
  src: props.url,
  alt: "NFT 이미지",
  }))<PropsStyle>`
  width: 100%;
`

const Title = styled(Div)`
  color: var(--grey-100);
  font-size: var(--h1);
  font-weight: var(--bold);
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    font-size: var(--h2);
  }
`

const TitleText = styled(Div)`
  color: var(--grey-400);
  font-size: var(--h5);
  font-weight: var(--bold);
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    font-size: var(--h6);
  }  
`

const ContentText = styled(Div)`
  color: var(--grey-100);
  font-size: var(--h5);
  font-weight: var(--bold);
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    font-size: var(--h6);
  }
`

function NftDetailModal (props:any) {

  const [ price, setPrice ] = useState();

  return (
    <>
    <ModalPortal>
      <BackGround onClick={(e) => {
        props.closeModal();
        e.stopPropagation();
      }}        
      />
      <Content onClick={(e) => {
        props.closeModal();
        e.stopPropagation();
      }}
      >
        <ImageSection>
          <Image url={props.image} />
        </ImageSection>
        <DetailSection onClick={(e) => {
          e.stopPropagation();
        }}>
          <Title>{props.name}</Title>
          <Div display="flex" gap="3rem">
            <Div display="flex" flexDirection="column" gap="0.3rem">
              <TitleText color="--grey-400" fontWeight="--bold" fontSize="--h5">제작자</TitleText>
              <ContentText color="--grey-100" fontWeight="--bold" fontSize="--h5">{props.author}</ContentText>
            </Div>
            <Div display="flex" flexDirection="column" gap="0.3rem">
              <TitleText color="--grey-400" fontWeight="--bold" fontSize="--h5">소유자</TitleText>
              <ContentText color="--grey-100" fontWeight="--bold" fontSize="--h5">{props.nickname}</ContentText>
            </Div>
          </Div>
          <Div display="flex" flexDirection="column" gap="0.5rem">
            <TitleText color="--grey-400" fontWeight="--bold" fontSize="--h5">작품 설명</TitleText>
            <ContentText color="--grey-100">{"아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아"}</ContentText>
          </Div>
          <Div display="flex" gap="0.5rem" mb="3rem">
            <Input width="70%" placeholder="SSF" setValue={setPrice}/>
            <SharpButton width="30%" bg="--grey-100" color="--grey-750" borderColor="--grey-100" borderWidth="1px">
              판매하기
            </SharpButton>
          </Div>
        </DetailSection>
      </Content>
    </ModalPortal>
    </>
  );
}

export default NftDetailModal;