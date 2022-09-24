import React, { useState, useEffect } from "react";
import { Div, Image } from "../../styles/BaseStyles";
import { Input, SharpButton  } from "../";


function NftMake(props:any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState();

  return (
    <div>
      <Div display="flex" flexDirection="column" bgColor="--grey-100">
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

export default NftMake;