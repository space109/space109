import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Div, Image } from "../styles/BaseStyles";
import SharpButton from "../components/Button/SharpButton";
import { Input } from "../components";
import NftCard from "../components/NftCard/NftCard";
import ReactDOM from "react-dom";

const ModalBackgroundDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.25);
`;

const modalActive = keyframes`
  from { top: 10%; opacity: 0; }
  to { top: 20%; opacity: 1; }
`;

const ModalDiv = styled.div`
  position: fixed;
  top: 20%;
  height: 80%; 
  left: 10%;
  width: 80%;
  z-index: 2;
  &.modal-active {
    animation: ${modalActive} 0.5s;
  }
`
const ModalBackground = (props:any) => {
  if (!props.modal) return null;
  return <ModalBackgroundDiv onClick={props.offModal}></ModalBackgroundDiv>;
};

const ModalContent = (props:any) => {
  if (!props.modal) return null;
  return (
    <ModalDiv onClick={props.offModal}>
      <Div display="flex" justifyContent="space-between">
        <Div w="35%">
          <Image
            w="100%"
            src={`${props.nft.image}`}
            alt={`${props.nft.title}`}
          ></Image>
        </Div>
        <Div w="50%" display="flex" flexDirection="column">
          <Div color="--grey-100" fontSize="60px" mb="24px">
            {props.nft.title}
          </Div>
          <Div ml="20px" mb="56px" display="flex">
            <Div mr="64px">
              <Div color="--grey-400" fontSize="18px" mb="8px">제작자</Div>
              <Div color="--grey-100" fontSize="24px">{props.nft.author}</Div>
            </Div>
            <Div>
              <Div color="--grey-400" fontSize="18px" mb="8px">소유자</Div>
              <Div color="--grey-100" fontSize="24px">{props.nft.owner}</Div>
            </Div>
          </Div>
          <Div ml="20px" mb="56px">
            <Div color="--grey-400" fontSize="30px" mb="12px">작품 설명</Div>
            <Div ml="48px" color="--grey-100" fontSize="20px" >{props.nft.description}</Div>
          </Div>
          <Div ml="20px" mb="48px">
            <Div color="--grey-400" fontSize="30px" mb="12px">거래 내역</Div>
            {props.nft.history.map((deal:any) => (
              <Div>
                <Div color="--grey-100" mb="8px">{deal.date.getFullYear()}년 {deal.date.getMonth() + 1}월 {deal.getDate()}일</Div>
                <Div ml="4px" display="flex" alignItems="center">
                  <Div mr="12px" color="--grey-400" fontSize="16px">from</Div>
                  <Div mr="84px" color="--grey-100" fontSize="16px">{deal.from}</Div>
                  <Div mr="12px" color="--grey-400" fontSize="16px">to</Div>
                  <Div mr="84px" color="--grey-100" fontSize="16px">{deal.to}</Div>
                </Div>
              </Div>
            ))}
          </Div>
          <Div display="flex" alignItems="center">
            <Div display="flex" alignItems="center">
              <Div color="--grey-100" fontSize="60px">{props.nft.price}</Div>
              <Div color="--grey-400" fontSize="60px">SSF</Div>
            </Div>
            <Div>
              <SharpButton fontSize="60px" width="400px" height="76px">판매하기</SharpButton>
            </Div>
          </Div>
        </Div>
      </Div>
    </ModalDiv>
  );
}

// 나의 NFT 목록

function NftList(props:any) {

  const [nft, setNft] = useState({}); // 디테일 볼 컨텐트
  const [myNft, setMyNft] = useState([]); // 요청하여 nft 목록 받아올것
  // const [firstRow, setFirstRow] = useState([]); // 첫번째 줄
  // const [secondRow, setSecondRow] = useState([]); // 두번째 줄
  // const [thirdRow, setThirdRow] = useState([]); // 세번째 줄
  // const [forthRow, setForthRow] = useState([]); // 네번째 줄
  const [modal, setModal] = useState(false); // 모달 활성화
  const onModal = () => { // 모달 활성화
    setModal(true);
  };
  const offModal = () => {
    setModal(false);
  };

  // 이하 firstRow~ forthRow는 임시 확인용 변수

  let firstRow: Array<object> = [
    {
      id: 1,
      image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
      title: '파이썬',
      description: '이게 어떻게 파이썬;',
      author: '작가이름',
      owner: '소유주이름',
    },
    {
      id: 2,
      image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
      title: '파이썬',
      description: '이게 어떻게 파이썬;',
    },
  ];
  let secondRow: Array<object> = [
    {
      id: 3,
      image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
      title: '파이썬',
      description: '이게 어떻게 파이썬;',
    },
    {
      id: 4,
      image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
      title: '파이썬',
      description: '이게 어떻게 파이썬;',
    },
  ];
  let thirdRow: Array<object> = [
    {
      id: 5,
      image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
      title: '파이썬',
      description: '이게 어떻게 파이썬;',
    },
    {
      id: 6,
      image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
      title: '파이썬',
      description: '이게 어떻게 파이썬;',
    },
  ];
  let forthRow: Array<object> = [
    {
      id: 7,
      image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
      title: '파이썬',
      description: '이게 어떻게 파이썬;',
    },
    {
      id: 8,
      image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
      title: '파이썬',
      description: '이게 어떻게 파이썬;',
    },
  ];

  useEffect(() => {
    let tempFirst: Array<object> = [];
    let tempSecond: Array<object> = [];
    let tempThird: Array<object> = [];
    let tempForth: Array<object> = [];

    myNft.forEach(function (value, index) {
      if (index % 4 === 0) {
        tempFirst.push(value);
      } else if (index % 4 === 1) {
        tempSecond.push(value);
      } else if (index % 4 === 2) {
        tempThird.push(value);
      } else {
        tempForth.push(value);
      }
    });

    firstRow = tempFirst;
    secondRow = tempSecond;
    thirdRow = tempThird;
    forthRow = tempForth;
  }, [myNft]);

  let modalBackground = document.getElementById("modal-background") as HTMLElement;
  let modalContent = document.getElementById("modal-content") as HTMLElement;

  return (
    <div>
      <>
        {ReactDOM.createPortal(
          <ModalBackground modal={modal} offModal={offModal} />,
          modalBackground
        )}
        {ReactDOM.createPortal(
          <ModalContent modal={modal} nft={nft} offModal={offModal} />,
          modalContent
        )}
      </>
      <Div display="flex" justifyContent="space-between">
        <Div w="400px" display="flex" flexDirection="column">
          {firstRow.map((nft, index) => (
            <NftCard nft={nft} onClick={()=>{console.log('click'); setNft(nft); onModal()}} key={index}></NftCard>
          ))}
        </Div>
        <Div w="400px" display="flex" flexDirection="column">
          {secondRow.map((nft, index) => (
            <NftCard nft={nft} onClick={()=>{setNft(nft); onModal()}} key={index}></NftCard>
          ))}
        </Div>
        <Div w="400px" display="flex" flexDirection="column">
          {thirdRow.map((nft, index) => (
            <NftCard nft={nft} onClick={()=>{setNft(nft); onModal()}} key={index}></NftCard>
          ))}
        </Div>
        <Div w="400px" display="flex" flexDirection="column">
          {forthRow.map((nft, index) => (
            <NftCard nft={nft} onClick={()=>{setNft(nft); onModal()}} key={index}></NftCard>
          ))}
        </Div>
      </Div>
    </div>
  );
}

// NFT 생성하기

function NftMake(props:any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState();

  return (
    <div>
      <Div display="flex" flexDirection="column">
        <form>
          <Div display="flex">
            <Div flex="7" display="flex" flexDirection="column">
              <Div borderBottom="3px solid #1d1d1d">
                <Div fontWeight="--bold" fontSize="--h4" mb="16px" ml="12px" mt="12px">이름</Div>
                <Div fontSize="--h4" ml="12px" mb="30px">
                  <Input fontSize="--h4" value={title} setValue={setTitle}></Input>
                </Div>
              </Div>
              <Div>
                <Div fontWeight="--bold" fontSize="--h4" ml="12px" mt="24px" mb="24px">작가명</Div>
              </Div>
              <Div bgColor="--grey-650" color="--grey-100" pl="24px" pt="24px" pb="24px" pr="24px" mb="30px">
                <Div fontSize="--h4">(로그인한 유저 명)</Div>
              </Div>
              <Div>
                <Div fontWeight="--bold" fontSize="--h4" mb="16px" ml="12px">설명</Div>
                <Div ml="12px">
                  <Input fontSize="--h4" value={description} setValue={setDescription}></Input>
                </Div>
              </Div>
            </Div>
            <Div flex="3" borderLeft="3px solid #1d1d1d" p="20px">
              <Div fontWeight="--bold" fontSize="--h4" mb="16px" ml="12px">파일</Div>
              <Div fontSize="--h4" mb="160px" ml="20px">미디어 파일만 올려주세요.</Div>
              <Div ml="auto" mr="auto" mb="36px" h="400px" w="400px" border="3px dashed #1d1d1d" display="flex" alignItems="center" justifyContent="center" onClick={() => console.log("click")}>
                <div>
                  <Image alt="plus_vector" src="https://user-images.githubusercontent.com/97648026/191902640-fb114b10-38bf-4ab9-834f-526067ac997d.png"></Image>
                </div>
              </Div>
            </Div>
          </Div>
          <Div display="flex" justifyContent="center" alignItems="center" h="140px" borderTop="3px solid #1d1d1d">
            <Div mr="15%">
              <SharpButton width="250px" height="80px" fontSize="--h5">취소하기</SharpButton>
            </Div>
            <Div>
              <SharpButton width="250px" height="80px" fontSize="--h5" type="submit">저장하기</SharpButton>
            </Div>
          </Div>
        </form>
      </Div>
    </div>
  );
}

const MyNftPage = () => {

  const [viewPage, setViewPage] = useState(0);

  const setNftListPage = () => setViewPage(0); // NFT 목록 페이지로 세팅
  const setNftMakePage = () => setViewPage(1); // NFT 생성 페이지로 세팅

  let viewContent;

  if (viewPage === 0) {
    viewContent = <NftList></NftList>;
  } else {
    viewContent = <NftMake></NftMake>;
  }

  return (
    <div>
      <Div pl="124px" pr="124px" bgColor="#1d1d1d">
        <Div mt="64px" mb="64px" display="flex">
          <Div mr="20px">
            <SharpButton onClick={setNftListPage}>나의 NFT 목록</SharpButton>
          </Div>
          <Div>
            <SharpButton onClick={setNftMakePage}>NFT 생성하기</SharpButton>
          </Div>
        </Div>
        {viewContent}
      </Div>
    </div>
  );
};

export default MyNftPage;
