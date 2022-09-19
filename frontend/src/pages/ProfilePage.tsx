import React, { useState } from "react";
import styled from "styled-components";
import { DropDown } from "../components";
import SharpButton from "../components/Button/SharpButton";
import { Div } from "../styles/BaseStyles";

interface Props {}

const BorderBox = styled(Div)`
  border-left: 0.3rem black solid;
`;

export default function ProfilePage({}: Props) {
  const [optionData, setOptionData] = useState<string>("");
  const dataFunc = (data: string): void => {
    setOptionData(data);
  };
  return (
    <Div w="100vw" h="88.88888888vh" display="flex">
      <Div
        bgColor="--grey-100"
        w="20%"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Div fontSize="--h1" mt="200px" fontWeight="--bold">
          에몽가의 갤러리
        </Div>
        <Div mt="30px">
          <SharpButton
            width="195px"
            height="63px"
            fontSize="--h4"
            fontWeight="--semi-bold"
            borderWidth="3px"
          >
            입장하기
          </SharpButton>
        </Div>
      </Div>
      <Div w="80%" bgColor="--grey-100">
        <Div w="100%" h="100%">
          <BorderBox
            h="8%"
            w="100%"
            bgColor="--grey-100"
            boxSizing="border-box"
          ></BorderBox>
          <Div h="84%" display="flex">
            <Div w="65%" h="100%">
              <Div
                h="9%"
                bgColor="--grey-100"
                boxSizing="border-box"
                borderTop="0.3rem black solid"
                borderRight="0.3rem black solid"
                borderLeft="0.3rem black solid"
                display="flex"
              >
                <Div
                  w="50%"
                  h="100%"
                  borderRight="0.3rem black solid"
                  fontSize="--h4"
                  fontWeight="--semi-bold"
                  display="flex"
                  alignItems="center"
                >
                  <Div ml="10px">공개여부</Div>
                </Div>
                <Div
                  w="50%"
                  h="100%"
                  fontSize="--h4"
                  fontWeight="--semi-bold"
                  display="flex"
                  alignItems="center"
                >
                  <Div ml="10px">갤러리 테마</Div>
                </Div>
              </Div>
              <Div
                h="9%"
                bgColor="--grey-100"
                boxSizing="border-box"
                border="0.3rem black solid"
                borderLeft="0.3rem black solid"
                borderRight="0.3rem black solid"
                display="flex"
              >
                <Div w="50%" h="100%" borderRight="0.3rem black solid">
                  {" "}
                  <Div w="100%" h="100%" ml="0.5px">
                    <DropDown
                      w="99.8%"
                      h="79%"
                      dataFunc={dataFunc}
                      options={["ON", "OFF"]}
                      fontSize="--h4"
                    >
                      공개여부를 선택하세요
                    </DropDown>
                  </Div>
                </Div>
                <Div w="50%" h="100%">
                  <Div w="100%" h="100%" ml="0.5px">
                    <DropDown
                      w="100%"
                      h="79%"
                      dataFunc={dataFunc}
                      options={["바다", "가을"]}
                      color="--grey-750"
                      hoverBg="--grey-750"
                      bg="--grey-100"
                      fontSize="--h4"
                      hoverColor="--grey-100"
                    >
                      테마를 선택하세요
                    </DropDown>
                  </Div>
                </Div>
              </Div>
              <Div
                h="15%"
                bgColor="--grey-100"
                boxSizing="border-box"
                borderLeft="0.3rem black solid"
                borderRight="0.3rem black solid"
              >
                <Div
                  fontSize="--h4"
                  fontWeight="--semi-bold"
                  ml="10px"
                  pt="10px"
                >
                  제목
                </Div>
              </Div>
              <Div
                h="54%"
                bgColor="--grey-100"
                boxSizing="border-box"
                border="0.3rem black solid"
              >
                {" "}
                <Div
                  fontSize="--h4"
                  fontWeight="--semi-bold"
                  ml="10px"
                  pt="10px"
                >
                  설명
                </Div>
              </Div>
              <Div
                h="13%"
                bgColor="--grey-100"
                boxSizing="border-box"
                borderLeft="0.3rem black solid"
                borderRight="0.3rem black solid"
                borderBottom="0.3rem black solid"
              >
                <Div
                  display="flex"
                  justifyContent="space-around"
                  alignItems="center"
                  h="100%"
                  ml="300px"
                  mr="300px"
                >
                  <SharpButton
                    width="195px"
                    height="63px"
                    fontSize="--h4"
                    fontWeight="--semi-bold"
                    borderColor="--grey-750"
                    borderWidth="0.2rem"
                  >
                    갤러리 편집
                  </SharpButton>
                  <SharpButton
                    width="195px"
                    height="63px"
                    fontSize="--h4"
                    bg="--grey-100"
                    color="--grey-750"
                    fontWeight="--semi-bold"
                    borderColor="--grey-750"
                    borderWidth="0.2rem"
                  >
                    저장
                  </SharpButton>
                </Div>
              </Div>
            </Div>
            <Div
              w="35%"
              borderRight="0.3rem black solid"
              borderTop="0.3rem black solid"
              borderBottom="0.3rem black solid"
            ></Div>
          </Div>
          <BorderBox h="8%" w="100%" bgColor="--grey-100"></BorderBox>
        </Div>
      </Div>
      <Div bgColor="--grey-100" w="7%"></Div>
    </Div>
  );
}
