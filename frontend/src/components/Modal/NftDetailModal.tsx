import { useState, useEffect} from "react";
import styled, { keyframes } from "styled-components";
import { ModalPortal, Input, SharpButton } from "..";
import { Div, screenSizes } from "../../styles/BaseStyles";
import { SaleFactoryContract } from "../../web3Config";

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
  display: flex;
  justify-content: center;
  align-items: center;
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
  gap: 5%;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  animation: ${On} 0.3s ease;
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
    gap: 2.5%;
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    flex-direction: column;
    gap: 1.5rem;
  }
  overflow: auto;

`

const ImageSection = styled(Div)`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 30%;
  height: 100vh;
  @media screen and (max-width: ${screenSizes.xxl + "px"}) {
    width: 40%;
  }
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
    width: 45%;
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    width: 90%;
    height: 40%;
  }
  @media screen and (max-width: ${screenSizes.sm + "px"}) {

  }
  @media screen and (max-width: ${screenSizes.xs + "px"}) {

  } 
`

const DetailSection = styled(Div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-sizing: border-box;
  width: 30%;
  @media screen and (max-width: ${screenSizes.xxl + "px"}) {
    width: 40%;
  }
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
    width: 45%;
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {

  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    width: 90%;
    height: 40%;
  }
  @media screen and (max-width: ${screenSizes.sm + "px"}) {

  }
  @media screen and (max-width: ${screenSizes.xs + "px"}) {

  }
`

const Image = styled.img.attrs<PropsStyle>(props => ({
  src: props.url,
  alt: "NFT 이미지",
  }))<PropsStyle>`
  width: 100%;
  height: 90%;
  object-fit: contain;

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
  const [ saleStatus, setSaleStatus ] = useState(false);

  const ClickHandler = async () => {
    try {
      const response = await SaleFactoryContract.methods.createSale(
        1, 1, process.env.REACT_APP_SSAFY_TOKEN, process.env.REACT_APP_SSAFY_NFT
      ).send({from : window.ethereum.selectedAddress});

      console.log("응답", response)
      if (response.status) {
        setSaleStatus(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getAllSales = async () => {
    const response = await SaleFactoryContract.methods.allSales().call();
    console.log(response);
  }

  useEffect(() => {
    if (saleStatus) {
      getAllSales();
    }
  }, [saleStatus])

  return (
    <>
    <ModalPortal>
      <BackGround onClick={(e) => {
        props.closeModal();
        e.stopPropagation();
      }}
      >
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
            <ContentText color="--grey-100">{props.description}</ContentText>
          </Div>
          <Div display="flex" gap="0.5rem">
            <Input width="70%" placeholder="SSF" setValue={setPrice} type="number"/>
            <SharpButton 
              onClick={ClickHandler}
              width="30%" bg="--grey-100" color="--grey-750" borderColor="--grey-100" borderWidth="1px">
              판매하기
            </SharpButton>
          </Div>
        </DetailSection>
      </Content>
      </BackGround>
    </ModalPortal>
    </>
  );
}

export default NftDetailModal;