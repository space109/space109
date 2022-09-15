import React, { useState, useEffect } from "react";
import { Div } from "../styles/BaseStyles";
import SharpButton from "../components/Button/SharpButton";
import NftCard from "../components/NftCard";

const MyNftPage = () => {
  const [myNft, setMyNft] = useState([]); // 요청하여 nft 목록 받아올것

  // const [firstRow, setFirstRow] = React.useState([]);
  // const [secondRow, setSecondRow] = React.useState([]);
  // const [thirdRow, setThirdRow] = React.useState([]);
  // const [forthRow, setForthRow] = React.useState([]);

  let firstRow: Array<object> = [
    {
      image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
      title: '파이썬',
      description: '이게 어떻게 파이썬;',
    },
    {
      image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
      title: '파이썬',
      description: '이게 어떻게 파이썬;',
    },
  ];
  let secondRow: Array<object> = [
    {
      image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
      title: '파이썬',
      description: '이게 어떻게 파이썬;',
    },
    {
      image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
      title: '파이썬',
      description: '이게 어떻게 파이썬;',
    },
  ];
  let thirdRow: Array<object> = [
    {
      image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
      title: '파이썬',
      description: '이게 어떻게 파이썬;',
    },
    {
      image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
      title: '파이썬',
      description: '이게 어떻게 파이썬;',
    },
  ];
  let forthRow: Array<object> = [
    {
      image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
      title: '파이썬',
      description: '이게 어떻게 파이썬;',
    },
    {
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

  return (
    <div>
      <Div pl="124px" pr="124px" bgColor="#1d1d1d">
        <Div mt="64px" mb="64px" display="flex">
          <Div mr="20px">
            <SharpButton>나의 NFT 목록</SharpButton>
          </Div>
          <Div>
            <SharpButton>NFT 생성하기</SharpButton>
          </Div>
        </Div>
        <Div display="flex" justifyContent="space-between">
          <Div w="400px" display="flex" flexDirection="column">
            {firstRow.map((nft) => (
              <NftCard nft={nft}></NftCard>
            ))}
          </Div>
          <Div w="400px" display="flex" flexDirection="column">
            {secondRow.map((nft) => (
              <NftCard nft={nft}></NftCard>
            ))}
          </Div>
          <Div w="400px" display="flex" flexDirection="column">
            {thirdRow.map((nft) => (
              <NftCard nft={nft}></NftCard>
            ))}
          </Div>
          <Div w="400px" display="flex" flexDirection="column">
            {forthRow.map((nft) => (
              <NftCard nft={nft}></NftCard>
            ))}
          </Div>
        </Div>
      </Div>
    </div>
  );
};

export default MyNftPage;
