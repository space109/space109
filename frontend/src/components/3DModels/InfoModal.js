import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import closeIcon from "../../assets/close-icon-white.png";
import uploadImage from "../../assets/uploadImage.png"
import { useAxios } from "../../hooks";
import { Div } from "../../styles/BaseStyles";
import { SharpButton } from "../Button";
import ReactDOM from "react-dom";
import axios from "axios";
import { SaleContract, SaleFactoryContract, SsafyNFTContract, SsafyTokenContract } from "../../web3Config";
import { login, dropNFT, sellCheck } from "../../apis";
import { Loading } from "../../components";

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
  cursor: pointer;
  z-index: 300;
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
  padding-top: 1vh;
  border-top: 2px solid var(--grey-300);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeadDiv = styled.div`
  height: 17.5vh;
`;

const BodyDiv = styled.div`
  height: 34vh;
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

const ModalOverlay = ({
  toggle,
  toggleModal,
  meta="",
  tokenId="",
}) => {
  const [title, setTitle] = useState("제목");
  const [author, setAuthor] = useState("작가");
  const [description, setDescription] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ");
  const [image, setImage] = useState(uploadImage);

  const [price, setPrice] = useState("가격");
  const [ saleStatus, setSaleStatus ] = useState(false);
  const [ saleData, setSaleData ] = useState("");
  const [loading, setLoading] = useState(false);
  const [helpText, setHelpText] = useState("helpText");

  const [owner, setOwner] = useState("소유자");

  const purchaseNFT = async () => {
    console.log(saleData.owner, window.ethereum.selectedAddress)
    try {
      setLoading(true);
      setHelpText("작품 구매 중... 서명을 진행해주세요(1/2)");
      const response = await SsafyTokenContract.methods.approve(saleData.saleAddress, parseInt(saleData.purchasePrice)).send({from: window.ethereum.selectedAddress});
      if (response.status) {
        setHelpText("작품 구매 중... 서명을 진행해주세요(2/2)");
        const response2 = await SaleContract(saleData.saleAddress).methods.purchase().send({from: window.ethereum.selectedAddress});
        if (response2.status) {
          setLoading(false);
          setSaleStatus(false);
          const response = await dropNFT(parseInt(tokenId));
          if (response) {
            alert("작품을 성공적으로 구매하였습니다.");
          } else {
            console.error("에러! 액자를 갤러리에서 내리지 못했습니다.");
          }
        }
      }
    } catch (e) {
      setLoading(false);
      alert("구매에 실패하였습니다.");
      console.error(e);
    }
  }

  const getSaleInfo = async () => {
    const getSaleData = await SaleFactoryContract.methods.getSaleData(parseInt(tokenId)).call();
    console.log(getSaleData);
    setSaleData(getSaleData);
    return getSaleData.itemId;
  }
  
  const getTokenOwner = async () => {
    try {
      const tokenOwner = await SsafyNFTContract.methods.ownerOf(parseInt(tokenId)).call();
      const nameData = await login(tokenOwner);
      if (nameData.length) {
        setOwner(nameData[0].nickname);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const init = async () => {
    getTokenOwner();
    if(await getSaleInfo() === "0") {
      setSaleStatus(false);
    } else {
      setSaleStatus(true);
    }
  }
  useEffect(() => {
    console.log(meta);
    if (meta !== "") {
      init();
      axios
        .get(meta)
        .then((res) => {
          setTitle(res?.data.name); 
          setAuthor(res?.data.author);
          setDescription(res?.data.description);
          setImage(res?.data.image);
        })
        .catch((err) => console.log(err));
    } else {
      setTitle("제목");
      setAuthor("작가");
      setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ");
      setImage(uploadImage);
    }
  }, [meta, saleStatus]);

  useEffect(() => {
    init();
    return (() => {
      setTitle("");
      setAuthor("");
      setDescription("");
      setImage("");
      setSaleStatus("");
      setSaleData("");
      setOwner("");
    }
    )
  }, [meta])

  if (!toggle) return null;

  return (
    <Div>
      {loading && <Loading HelpText={helpText} />}
      <ThumbImg src={image} alt="" className="thumb-active"/>
      <ModalDiv className="modal-active">
        <Img src={closeIcon} onClick={toggleModal} alt="닫기 아이콘"/>
        <Div flex="4"></Div>
        <Div flex="8">
          <HeadDiv>
            <TitleDiv>{title}</TitleDiv>
            <Div fontSize="--h5" color="--grey-400" mt="-0.6vh" mb="1.1vh">{`#` + tokenId.toString().padStart(4, '0')}</Div>
            <UserDiv>
              <AuthorDiv>
                <H5Div>작가명</H5Div>
                <H7Div>{author}</H7Div>
              </AuthorDiv>
              <Div>
                <H5Div>소유자명</H5Div>
                <H7Div>{owner}</H7Div>
              </Div>
            </UserDiv>
          </HeadDiv>
          <BodyDiv>
            <DescriptionDiv>
              <H7Div>작품 설명</H7Div>
              <H6Div>{description}</H6Div>
            </DescriptionDiv>
          </BodyDiv>
          <FooterDiv>
            { 
              saleStatus && (`${saleData.owner}`.toLowerCase() !== `${window.ethereum.selectedAddress}`.toLowerCase()) &&
              <>
              <PriceDiv>
                <CurrentPriceDiv>{saleData.purchasePrice}</CurrentPriceDiv>
                <PriceTitleDiv>현재 가격</PriceTitleDiv>
              </PriceDiv>
              <PurchaseDiv>
                <SharpButton onClick={purchaseNFT}>구매하기</SharpButton>
              </PurchaseDiv>
              </> 
            }
          </FooterDiv>
        </Div>
      </ModalDiv>
    </Div>
  );
};

const InfoModal = ({ toggleModal, toggle, meta, tokenId }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop toggleModal={toggleModal} toggle={toggle} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay toggleModal={toggleModal} toggle={toggle} meta={meta} tokenId={tokenId}/>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default InfoModal;
