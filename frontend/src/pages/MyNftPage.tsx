import React, { useState, useEffect } from 'react';
import { Div } from '../styles/BaseStyles';
import Button from "../components/Button";
import NftCard from '../components/NftCard';

const MyNftPage = () => {
  const [myNft, setMyNft] = useState([]); // 요청하여 nft 목록 받아올것
  
  // const [firstRow, setFirstRow] = React.useState([]);
  // const [secondRow, setSecondRow] = React.useState([]);
  // const [thirdRow, setThirdRow] = React.useState([]);
  // const [forthRow, setForthRow] = React.useState([]);

  let firstRow: Array<object> = [];
  let secondRow: Array<object> = [];
  let thirdRow: Array<object> = [];
  let forthRow: Array<object> = [];

  useEffect(() => {
    let tempFirst: Array<object> = [];
    let tempSecond: Array<object> = [];
    let tempThird: Array<object> = [];
    let tempForth: Array<object> = [];

    myNft.forEach(function(value, index){
      if (index % 4 === 0) {
        tempFirst.push(value);
      } else if (index % 4 === 1) {
        tempSecond.push(value);
      } else if (index % 4 === 2) {
        tempThird.push(value);
      } else {
        tempForth.push(value);
      }
    })

    firstRow = tempFirst;
    secondRow = tempSecond;
    thirdRow = tempThird;
    forthRow = tempForth;
  }, [myNft])



  return (
    <div>
      <Div m="0 124px">
        <Div m="96px 0" display="flex">
          <Div ml="20px"><Button></Button></Div>
          <Div><Button></Button></Div>
        </Div>
        <Div display="flex" justifyContent="space-between">
          <Div w="400px" display="flex" flexDirection="column">
            {
              firstRow.map((nft) => (
                <NftCard nft={nft}></NftCard>
              ))
            }
          </Div>
          <Div w="400px" display="flex" flexDirection="column">
            {
              secondRow.map((nft) => (
                <NftCard nft={nft}></NftCard>
              ))
            }
          </Div>
          <Div w="400px" display="flex" flexDirection="column">
            {
              thirdRow.map((nft) => (
                <NftCard nft={nft}></NftCard>
              ))
            }
          </Div>
          <Div w="400px" display="flex" flexDirection="column">
            {
              forthRow.map((nft) => (
                <NftCard nft={nft}></NftCard>
              ))
            }
          </Div>
        </Div>
      </Div>
    </div>
  );
};


export default MyNftPage;