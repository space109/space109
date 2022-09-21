import React, { useCallback, useEffect, useRef, useState } from "react";
import { Div, Image, PropStyle, screenSizes } from "../styles/BaseStyles";
import styled, { keyframes } from "styled-components";
import bg1 from "../assets/1.jpg";
import bg2 from "../assets/2.jpg";
import bg3 from "../assets/3.jpg";
import bg4 from "../assets/4.jpg";
import bg5 from "../assets/5.jpg";
import bg6 from "../assets/6.jpg";
import bg7 from "../assets/7.jpg";
import bg8 from "../assets/8.jpg";
import bg9 from "../assets/9.jpg";
import bg10 from "../assets/10.jpg";
import bg11 from "../assets/11.png";
import bg12 from "../assets/12.jpg";
import bg13 from "../assets/13.jpg";
import scrollIcon from "../assets/scrollIcon.png";
import moment from "moment";
import { DropDown } from "../components";

type Props = {};

interface CardObjType {
  gallery_id: number;
  oa: string;
  category_id: number;
  description: string;
  title: string;
  thumbnail: string;
}

// interface CategoryObjType {
//   category_id: number,
//   category_title: string
// }

const GradientDiv = styled(Div)<PropStyle>`
  background: linear-gradient(
    360deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(255, 255, 255, 0) 45%,
    rgba(255, 255, 255, 0) 98%,
    rgba(0, 0, 0, 0.7) 100%
  );
`;

const GradientCard = styled(GradientDiv)<PropStyle>`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0) 80%,
    rgba(0, 0, 0, 0.7) 100%
  );
`;

const HoverDiv = styled(Div)<PropStyle>`
  transition: 0.5s ease;
  &:hover {
    opacity: 0;
  }
`;

const ScrollDownDiv = styled(Div)<PropStyle>`
  cursor: pointer;
  transition: 0.5s ease;
  &:hover {
    padding-top: 22px;
    bottom: -15px;
  }
`;

const CardDiv = styled(Div)<PropStyle>`
  background-color: var(${(props) => (props.bgColor ? props.bgColor : "")});
  transition: 0.7s ease all;
  @media screen and (max-width: 2560px) {
    width: 33.333333vw;
    height: 50vh;
  }
  @media screen and (max-width: ${screenSizes.xxl + "px"}) {
    width: 33.333333vw;
    height: 50vh;
  }
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
    width: 33.333333vw;
    height: 44vh;
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    width: 50vw;
    height: 40vh;
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    width: 50vw;
    height: 30vh;
  }
  @media screen and (max-width: ${screenSizes.sm + "px"}) {
    width: 50vw;
    height: 30vh;
  }
  @media screen and (max-width: ${screenSizes.xs + "px"}) {
    width: 100vw;
    height: 37vh;
  }
`;

const FadeIn = keyframes`
  0% { 
    opacity: 0;
    transform: translateX(-10px)
  }
  80% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.9;
    transform: translateX(0px);
  }
`;

const AnimatedTextDiv = styled(Div)<PropStyle>`
  animation: ${FadeIn} 0.85s ease-in alternate;
`;

export default function MonthlyThemePage({}: Props) {
  const ref = useRef<any>(null);
  const [scroll, setScroll] = useState<boolean>(false);
  const [cardColor, setCardColor] = useState<string[]>([
    "--match-100",
    "--matcha-200",
    "--wine-200",
    "--ocean-300",
    "--navy-100",
    "--navy-200",
    "--milk-coffee-100",
    "--milk-coffee-200",
    "--spinach-200",
  ]);
  const backgroundImage = [
    0,
    bg1,
    bg2,
    bg3,
    bg4,
    bg5,
    bg6,
    bg7,
    bg8,
    bg9,
    bg10,
    bg11,
    bg12,
    bg13,
  ];
  const backgroundDetail = [
    {
      bgTitle: "기타",
      bgDescription: ["설명", "설명", "설명"],
    },
    {
      bgTitle: "사물 테마전",
      bgDescription: [
        "일상의 모든 사물이 예술이 된다!누보리얼리즘(신사실주의)의 대표작가인 아르망 페르난데즈(1928~2005 프랑스)는 일상적 사물을 관찰하고 탐험하면서 현대 소비사회가 생산해내는 사물들에서 영감을 받았다. 그는 우리가 늘 가지고 있던 사물에 대한 인식을 바꾸는 작품들을 제작했는데, 그 과정은 다음의 몇 가지 변형 작업을 통해 완성됐다. 반복하고 늘리고 나란히 놓고 정렬하고 자르고 부수고 깨뜨리는 것이 그것이다. 이러한 방법을 통해 아르망은 우리가 잘 알고 있다고 생각하는 사물에 대한 시각을 완전히 바꿔 놓았다.",
        "설명",
        "설명",
      ],
    },
    {
      bgTitle: "팝아트",
      bgDescription: ["설명", "설명", "설명"],
    },
    {
      bgTitle: "봄",
      bgDescription: ["설명", "설명", "설명"],
    },
    {
      bgTitle: "게임",
      bgDescription: ["설명", "설명", "설명"],
    },
    {
      bgTitle: "판타지",
      bgDescription: ["설명", "설명", "설명"],
    },
    {
      bgTitle: "여름",
      bgDescription: ["설명", "설명", "설명"],
    },
    {
      bgTitle: "캘리그라피",
      bgDescription: ["설명", "설명", "설명"],
    },
    {
      bgTitle: "추상",
      bgDescription: ["설명", "설명", "설명"],
    },
    {
      bgTitle: "가을 테마전",
      bgDescription: [
        '"빨강 노랑 주황, 서로 다른 우리가 모여 아름다운 가을"',
        "가을 테마의 갤러리에서 단풍의 바스락거림을 느껴보세요.",
        "갤러리에서 다양한 9월의 NFT작품을 감상하고 구매해보세요!",
      ],
    },
    {
      bgTitle: "일상",
      bgDescription: ["설명", "설명", "설명"],
    },
    {
      bgTitle: "일러스트",
      bgDescription: ["설명", "설명", "설명"],
    },
    {
      bgTitle: "겨울",
      bgDescription: ["설명", "설명", "설명"],
    },
  ];
  // const [category, setCategory] = useState<CategoryObjType[]>([
  //   {
  //     category_id: 1,
  //     category_title: "사물",
  //   },
  //   {
  //     category_id: 2,
  //     category_title: "팝아트",
  //   },
  //   {
  //     category_id: 3,
  //     category_title: "봄",
  //   },
  //   {
  //     category_id: 4,
  //     category_title: "게임",
  //   },
  //   {
  //     category_id: 5,
  //     category_title: "판타지",
  //   },
  //   {
  //     category_id: 6,
  //     category_title: "여름",
  //   },
  //   {
  //     category_id: 7,
  //     category_title: "캘리그라피",
  //   },
  //   {
  //     category_id: 8,
  //     category_title: "추상",
  //   },
  //   {
  //     category_id: 9,
  //     category_title: "가을",
  //   },
  //   {
  //     category_id: 10,
  //     category_title: "일상",
  //   },
  //   {
  //     category_id: 11,
  //     category_title: "일러스트",
  //   },
  //   {
  //     category_id: 12,
  //     category_title: "겨울",
  //   },
  //   {
  //     category_id: 13,
  //     category_title: "기타",
  //   },
  // ]);
  const [dataGallery, setDataGallery] = useState<CardObjType[]>([
    {
      gallery_id: 1,
      oa: "123",
      category_id: 3,
      description:
        "나는 비둘기 나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기 나는 비둘기나는 비둘기나는 비둘기나는 비둘기",
      title: "몽크의 절규",
      thumbnail:
        "https://cdn.imweb.me/upload/S201906191c3595f104fd6/4dacf6c8274de.jpg",
    },
    {
      gallery_id: 3,
      oa: "wff",
      category_id: 3,
      description:
        "나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기",
      title: "모나리자",
      thumbnail:
        "https://cdn.imweb.me/upload/S201906191c3595f104fd6/4dacf6c8274de.jpg",
    },
    {
      gallery_id: 3,
      oa: "wff",
      category_id: 3,
      description:
        "나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기",
      title: "모나리자",
      thumbnail:
        "https://cdn.imweb.me/upload/S201906191c3595f104fd6/4dacf6c8274de.jpg",
    },
    {
      gallery_id: 3,
      oa: "wff",
      category_id: 3,
      description:
        "나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기나는 비둘기",
      title: "모나리자",
      thumbnail:
        "https://cdn.imweb.me/upload/S201906191c3595f104fd6/4dacf6c8274de.jpg",
    },
  ]);
  // const [optionData, setOptionData] = useState<string>('')
  // const dataFunc = (data:string):void => {
  //   setOptionData(data)
  // }

  const clickToScrollDown = () => {
    window.scrollTo({ behavior: "smooth", top: ref.current.offsetTop });
  };

  const handleScroll = useCallback(() => {
    if (!scroll && window.scrollY > 0 && window.scrollY < 400) {
      window.scrollTo({ behavior: "smooth", top: ref.current.offsetTop });
      setScroll(true);
    }
  }, [scroll]);

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 500);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <Div
      bgImage={backgroundImage[parseInt(moment().format("MM"))]}
      bgAttach="fixed"
      bgSize="cover"
    >
      <GradientDiv w="100vw" h="100vh">
        <Div h="55vh">
          {/* <DropDown options={["ON", "OFF"]} dataFunc={dataFunc}/> */}
        </Div>
        <AnimatedTextDiv ml="40px" w="80vw" h="32vh">
          <Div fontSize="--title" color="--grey-200" cursor="default">
            {backgroundDetail[parseInt(moment().format("MM"))].bgTitle}
          </Div>
          <Div
            fontSize="--h3"
            color="--grey-200"
            cursor="default"
            ml="200px"
            mb="50px"
          >
            {backgroundDetail[parseInt(moment().format("MM"))].bgDescription[0]}
          </Div>
          <Div fontSize="--h4" color="--grey-200" mt="30px" cursor="default">
            {backgroundDetail[parseInt(moment().format("MM"))].bgDescription[1]}
          </Div>
          <Div fontSize="--h4" color="--grey-200" mt="2px" cursor="default">
            {backgroundDetail[parseInt(moment().format("MM"))].bgDescription[2]}
          </Div>
          <ScrollDownDiv
            color="--grey-100"
            display="flex"
            position="absolute"
            justifyContent="center"
            left="50vw"
            onClick={clickToScrollDown}
            bottom="0"
          >
            <Image src={scrollIcon} w="35px"></Image>
          </ScrollDownDiv>
        </AnimatedTextDiv>
      </GradientDiv>
      <Div bgColor="--grey-750" pt="200px">
        <Div fontSize="--h1" color="--grey-200" ml="50px" pb="50px">
          특별전 갤러리
        </Div>
      </Div>
      <Div w="100vw" h="100vh" bgColor="--grey-750" ref={ref}>
        <Div display="flex" flexWrap="wrap">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((data, index) => {
            return (
              <CardDiv key={index} color="--grey-100" bgColor={cardColor[data]}>
                {dataGallery.length > index && (
                  <Div cursor="crosshair" w="100%" h="100%">
                    <HoverDiv
                      bgImage={dataGallery[index].thumbnail}
                      bgSize="cover"
                      w="100%"
                      h="100%"
                      zIndex="3"
                      position="absolute"
                    >
                      <GradientCard
                        w="100%"
                        h="100%"
                        zIndex="2"
                        position="absolute"
                      ></GradientCard>
                      <Div
                        ml="5%"
                        pt="5%"
                        fontSize="--h2"
                        zIndex="3"
                        fontWeight="--semi-bold"
                      >
                        {dataGallery[index].title}
                      </Div>
                      <Div ml="5%" pt="2%" fontSize="--h6" w="70%" zIndex="3">
                        {dataGallery[index].description}
                      </Div>
                      <Div
                        ml="5%"
                        bottom="10px"
                        fontSize="--h4"
                        position="absolute"
                        zIndex="3"
                      >
                        {dataGallery[index].oa}
                      </Div>
                    </HoverDiv>
                    <GradientCard w="100%" h="100%" zIndex="2">
                      <Div
                        ml="5%"
                        pt="5%"
                        fontSize="--h2"
                        fontWeight="--semi-bold"
                      >
                        {dataGallery[index].title}
                      </Div>
                      <Div ml="5%" pt="2%" fontSize="--h6" w="70%">
                        {dataGallery[index].description}
                      </Div>
                      <Div
                        ml="5%"
                        bottom="10px"
                        fontSize="--h4"
                        position="absolute"
                      >
                        {dataGallery[index].oa}
                      </Div>
                    </GradientCard>
                  </Div>
                )}
              </CardDiv>
            );
          })}
        </Div>
        <Div h="150px" bgColor="--grey-750"></Div>
      </Div>
    </Div>
  );
}
