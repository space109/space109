import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { Div, Image, screenSizes } from "../styles/BaseStyles";
import {
  Input,
  SharpButton,
  NftCard,
  NftMake,
  LabelCheckBox,
  NftDetailModal,
  NavArea,
} from "../components";
import { debounce } from "lodash";
import { useAccount } from "../hooks";
import {
  SsafyNFTContract,
  SsafyTokenContract,
  SaleFactoryContract,
  SaleContract,
} from "../web3Config";
import { getMetadata, sellCheck, myGalleryInfo } from "../apis";
import { useDepthBuffer } from "@react-three/drei";

interface propsStyle {
  isSet?: any;
}

const Background = styled.div`
  background-color: var(--grey-600);
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`;

const Content = styled(Div)`
  box-sizing: border-box;
  width: 100%;
  max-width: 1800px;

  margin: 0 auto;

  @media (max-width: 1920px) {
    width: calc(100vw - 120px);
  }
  @media (max-width: 1366px) {
    width: calc(100vw - 64px);
  }
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.5rem;
  margin: 2rem 0;
`;

const ContentSection = styled.div``;

const NftListContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;
`;

const ViewButton = styled.div<propsStyle>`
  ${({ isSet }) => {
    if (isSet) {
      return css`
        background-color: var(--grey-100);
      `;
    } else {
      return css`
        background-color: var(--grey-400);
      `;
    }
  }}
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 3rem;
  color: var(--grey-650);
  border-radius: 4px;
  cursor: pointer;
  font-size: var(--h6);
  font-weight: var(--bold);
  transition: 0.2s;
  :hover {
    background-color: var(--grey-100);
  }
`;

const NftCol = styled(Div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 360px;
  @media screen and (max-width: ${screenSizes.xxl + "px"}) {
    width: 25%;
  }
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    width: 33.3333%;
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    width: 50%;
  }
  @media screen and (max-width: ${screenSizes.saseumSmall + "px"}) {
    width: 100%;
  }
`;

function MyNftPage() {
  const [account, nickname] = useAccount();
  const [metaDatas, setMetadatas] = useState<any>();
  const [NFTIds, setNFTIds] = useState<any>();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isChecked, setIsChecked] = useState(false);
  const [mySellData, setMySellData] = useState<string[]>([]);

  const [viewPage, setViewPage] = useState(0);

  const setNftListPage = () => setViewPage(0); // NFT 목록 페이지로 세팅
  const setNftMakePage = () => setViewPage(1); // NFT 생성 페이지로 세팅

  const [check, setCheck ] = useState(false);

  const [isOnModal, setIsOnModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const [galleryID, setGalleryID] = useState();

  const openModal = () => {
    setIsOnModal(true);
  };
  const closeModal = () => {
    setIsOnModal(false);
  };

  const onModal = (props: any) => {
    setModalInfo(props);
    openModal();
  };

  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 200);

  const getData = async () => {
    const tokenURIs = await SsafyNFTContract.methods
      .tokenURIsofWallet(account)
      .call();
    const tokenIds = await SsafyNFTContract.methods
      .tokenIDsofWallet(account)
      .call();
    setNFTIds(tokenIds);
    const Metas = [];
    for (let i = 0; i < tokenURIs.length; i++) {
      const Meta = await getMetadata(tokenURIs[i]);
      Metas.push(Meta);
    }
    setMetadatas(Metas);
  };

  const getMySellData = async () => {
    const response = await SaleFactoryContract.methods
      .getMySaleNftList()
      .call({ from: window.ethereum.selectedAddress });
    console.log(response);
    setMySellData(response);
  };

  const init = async () => {
    const response = await myGalleryInfo(window.ethereum.selectedAddress);
    console.log(response, response[0].gallery_id)
    setGalleryID(response[0].gallery_id);
  }

  const isSell = async () => {
    if (galleryID) {
      console.log(galleryID)
      const response = await sellCheck(galleryID);
      if (response) {
        alert(`팔린 데이터${response}`);
      }
    }
    // alert(`팔린 데이터${response}`);
  }

  useEffect(() => {
    init();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getData();
    console.log("체크바뀜?",check);
  }, [account, isChecked, check]);

  useEffect(() => {
    if (isChecked) {
      getMySellData();
      let DataList: string[] = [];
      for (let item of mySellData) {
        if (item === "0") return;
        DataList.push(item);
      }
      setMySellData(DataList);
    }
  }, [isChecked]);

  useEffect(() => {
    if (viewPage === 0) {
      isSell();
    }
  }, [viewPage, galleryID]);

  const NftCols = (num: any) => {
    const result = [];
    // 판매중인 애들만
    if (isChecked) {
      for (let i = 0; i < num; i++) {
        let count = -1; // 아래에서 바로 ++ 해줌
        result.push(
          <NftCol key={i}>
            {metaDatas.map((metaData: any, index: any) => {
              if (mySellData.includes(NFTIds[index])) {
                count++; // 왜 이거 아래 if문 밑에서 동작하게 하면 count++하기 전에 아래 if문으로 들어가지?
                if (count % num == i) {
                  console.log("들어왔음", NFTIds[index], count, num, i);
                  return (
                    <NftCard
                      key={index}
                      cardClick={onModal}
                      tokenId={NFTIds[index]}
                      {...metaData}
                      nickname={nickname}
                      setCheck={setCheck}
                    />
                  );
                }
              }
            })}
          </NftCol>
        );
      }
    }
    // 내 NFT 전체 목록
    else {
      for (let i = 0; i < num; i++) {
        result.push(
          <NftCol key={i}>
            {metaDatas.map((metaData: any, index: any) => {
              if (index % num == i) {
                return (
                  <NftCard
                    key={index}
                    cardClick={onModal}
                    tokenId={NFTIds[index]}
                    {...metaData}
                    nickname={nickname}
                    setCheck={setCheck}
                  />
                );
              }
            })}
          </NftCol>
        );
      }
    }
    return result;
  };

  let viewContent;

  if (viewPage === 0) {
    viewContent = (
      <>
        {metaDatas ? (
          <NftListContent>
            {windowSize.width > screenSizes.lg ? <>{NftCols(4)}</> : null}
            {windowSize.width > screenSizes.md &&
            windowSize.width <= screenSizes.lg ? (
              <>{NftCols(3)}</>
            ) : null}
            {windowSize.width > screenSizes.saseumSmall &&
            windowSize.width <= screenSizes.md ? (
              <>{NftCols(2)}</>
            ) : null}
            {windowSize.width <= screenSizes.saseumSmall ? (
              <>{NftCols(1)}</>
            ) : null}
          </NftListContent>
        ) : null}
      </>
    );
  } else {
    viewContent = <NftMake setCheck={setCheck}></NftMake>;
  }

  // const getAllSales = async () => {
  //   const response = await SaleFactoryContract.methods.allSales().call();
  //   console.log(response);
  // }

  // const buyToken = async () => {
  //   const allow = await SsafyTokenContract.methods.approve("0x9dd008b9eB06C150d75738AF2581d1a380a8aC71", 100).send({from: window.ethereum.selectedAddress});
  //   console.log(allow)
  //   const response = await SaleContract("0x9dd008b9eB06C150d75738AF2581d1a380a8aC71").methods.purchase().send({from: window.ethereum.selectedAddress});
  //   console.log(response);
  // }

  // const getSaleInfo = async () => {
  //   const response = await SaleFactoryContract.methods.getSaleData(4).call();
  //   console.log(response);
  // }

  // const SeeMyNft = async () => {
  //   const response = await SsafyNFTContract.methods.tokenIDsofWallet(window.ethereum.selectedAddress).call();
  //   console.log(response)
  // }

  return (
    <Background>
      {isOnModal && <NftDetailModal closeModal={closeModal} {...modalInfo} />}
      <NavArea></NavArea>
      <Content>
        <ButtonSection>
          <Div display="flex" gap="1.5rem">
            <ViewButton onClick={setNftListPage} isSet={viewPage === 0}>
              내 NFT 목록
            </ViewButton>
            <ViewButton onClick={setNftMakePage} isSet={viewPage === 1}>
              NFT 생성하기
            </ViewButton>
          </Div>
          {viewPage === 0 ? (
            <LabelCheckBox setCheck={setIsChecked}>
              판매 중인 NFT 보기
            </LabelCheckBox>
          ) : null}
        </ButtonSection>
        <ContentSection>{viewContent}</ContentSection>
      </Content>
      {/* <SharpButton onClick={getAllSales}>판매중인애들 보기</SharpButton> */}
      {/* <SharpButton onClick={buyToken}>구매하기</SharpButton> */}
      {/* <SharpButton onClick={getSaleInfo}>겟세일인포</SharpButton>
    <SharpButton onClick={SeeMyNft}>fkdfkk</SharpButton>
    <SharpButton onClick={getMySellData}>겟마이세일리스트</SharpButton> */}
    </Background>
  );
}

export default MyNftPage;

const DumpDatas = [
  {
    author: "사슴입니다.",
    description:
      "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image:
      "data:image/jpeg;base64,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",
    name: "하와이안 감자",
  },
  {
    author: "사슴입니다.",
    description:
      "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-NZleEfY--f3Zu74zzxQqNtOaEJLKiTECw&usqp=CAU",
    name: "하와이안 감자",
  },
  {
    author: "사슴입니다.",
    description:
      "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-NZleEfY--f3Zu74zzxQqNtOaEJLKiTECw&usqp=CAU",
    name: "하와이안 감자",
  },
  {
    author: "사슴입니다.",
    description:
      "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-NZleEfY--f3Zu74zzxQqNtOaEJLKiTECw&usqp=CAU",
    name: "하와이안 감자",
  },
  {
    author: "사슴입니다.",
    description:
      "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image:
      "https://skywalker.infura-ipfs.io/ipfs/QmVHPPcKkiJAEYSEG4VFWZZEd21NjhDuNvtWfLpTVMUUm2",
    name: "하와이안 감자",
  },
  {
    author: "사슴입니다.",
    description:
      "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image:
      "https://skywalker.infura-ipfs.io/ipfs/QmVHPPcKkiJAEYSEG4VFWZZEd21NjhDuNvtWfLpTVMUUm2",
    name: "하와이안 감자",
  },
  {
    author: "사슴입니다.",
    description:
      "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image:
      "https://skywalker.infura-ipfs.io/ipfs/QmVHPPcKkiJAEYSEG4VFWZZEd21NjhDuNvtWfLpTVMUUm2",
    name: "하와이안 감자",
  },
  {
    author: "사슴입니다.",
    description:
      "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image:
      "https://skywalker.infura-ipfs.io/ipfs/QmVHPPcKkiJAEYSEG4VFWZZEd21NjhDuNvtWfLpTVMUUm2",
    name: "하와이안 감자",
  },
  {
    author: "사슴입니다.",
    description:
      "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image:
      "https://skywalker.infura-ipfs.io/ipfs/QmVHPPcKkiJAEYSEG4VFWZZEd21NjhDuNvtWfLpTVMUUm2",
    name: "하와이안 감자",
  },
];
