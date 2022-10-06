import React, { useCallback, useEffect, useRef, useState } from "react";
import { Div, Image, PropStyle, screenSizes } from "../styles/BaseStyles";
import styled, { keyframes } from "styled-components";
import { getGalleryThemeList } from "../apis";
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
import { useNavigate } from "react-router-dom";

type Props = {
  load: any;
  onClick?: any;
};

interface CardObjType {
  gallery_id: number;
  oa: string;
  category_id: number;
  description: string;
  title: string;
  thumbnail: string;
  nickname: string;
}

// interface CategoryObjType {
//   category_id: number,
//   category_title: string
// }

const GalleryCard = styled.div`
  cursor: crosshair;
  width: 100%;
  height: 100%;
`;

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

const Card = styled.div`
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const HoverDiv = styled(Div)<PropStyle>`
  transition: 0.5s ease;
  &:hover {
    opacity: 0;
    background: rgba(0, 0, 0, 0);
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

export default function MonthlyThemePage({ load, onClick }: Props) {
  const ref = useRef<any>(null);
  const navigate = useNavigate();
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

  const shuffleArray = (array: any) => {
    array.sort(() => Math.random() - 0.5);
  };

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
      bgDescription: [
        `"별거 없던 하루"`,
        "시간이 지나면",
        "문득 그리워질 추억",
      ],
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

  const [dataGallery, setDataGallery] = useState<CardObjType[]>([]);

  const getTheme = async () => {
    const datas = await getGalleryThemeList(parseInt(moment().format("MM")));
    shuffleArray(datas);
    setDataGallery(datas);
  };

  const clickToScrollDown = () => {
    window.scrollTo({ behavior: "smooth", top: ref.current.offsetTop });
  };

  const handleScroll = useCallback(() => {
    if (!scroll && window.scrollY > 0 && window.scrollY < 400) {
      window.scrollTo({ behavior: "smooth", top: ref.current.offsetTop });
      setScroll(true);
    }
  }, [scroll]);

  const GoGallery = (gallery_id: any): any => {
    load();
    setTimeout(() => {
      navigate(`/virtual-gallery/${gallery_id}`);
    }, 2000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 500);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    getTheme();
  }, []);

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
      <Div w="100vw" h="100vh" bgColor="--grey-650" ref={ref}>
        <Div display="flex" flexWrap="wrap">
          {dataGallery.map((data, index) => {
            return (
              <CardDiv
                key={index}
                color="--grey-100"
                bgColor={cardColor[(index + 1) % 9]}
              >
                {dataGallery.length > index && (
                  <GalleryCard
                    onClick={() => {
                      GoGallery(dataGallery[index].gallery_id);
                    }}
                  >
                    <HoverDiv
                      bgImage={
                        process.env.REACT_APP_BACKEND_HOST +
                        dataGallery[index].thumbnail
                      }
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
                    </HoverDiv>
                    <Card>
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
                        {dataGallery[index].nickname}
                      </Div>
                    </Card>
                  </GalleryCard>
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
