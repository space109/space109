import React, { useEffect, useRef, useState } from "react";
import { Div, PropStyle } from "../styles/BaseStyles";
import styled from "styled-components";
import bg3 from "../assets/bg3.jpg";
import { Link } from "react-router-dom";
type Props = {};
interface GradientType extends PropStyle {}

const GradientDiv = styled(Div)<GradientType>`
  background: linear-gradient(
    360deg,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(128, 128, 128, 0.35898109243697474) 30%,
    rgba(255, 255, 255, 0) 38%
  );
`;

export default function MonthlyThemePage({}: Props) {
  const ref = useRef<any>(null);
  const scrollRef = useRef<any>(null);
  const [scroll, setScroll] = useState<boolean>(false);
  const handleScroll = () => {
    console.log(scroll);
    if (!scroll && window.scrollY > 0 && window.scrollY < 400) {
      window.scrollTo({ behavior: "smooth", top: ref.current.offsetTop });
      setScroll(true);
      // console.log(scroll)
    }
    setScroll(true);
  };
  useEffect(() => {
    // if (ref.current.offsetTop < scroll && ref.current.offsetTop !== 0){
    //   window.scrollTo({ behavior: "smooth", top: ref.current.offsetTop });
    // }
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 500);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  return (
    <Div bgImage={bg3} bgAttach="fixed" bgSize="cover">
      <GradientDiv w="100vw" h="100vh">
        <Div h="75vh"></Div>
        <Div ml="40px" w="50vw">
          <Div fontSize="60px" ref={scrollRef} color="--grey-200">
            바다 테마 특별전
          </Div>
          <Div fontSize="16px" ref={scrollRef} color="--grey-200" mt="10px">
            이 갤러리에서는 여름을 테마로 가져온 각 국가별 아름다운 해변을
            배경으로한 NFT 수체화들을 모아놓은 갤러리입니다. 구매하고 싶으시면
            좋아요! 구독! 알림설정! 사슴탄 둘기와 함께하는 해변을 달리는
            엑티비티까지 즐겨보세요!
          </Div>
        </Div>
      </GradientDiv>
      <Div w="100vw" h="100vh" bgColor="black" ref={ref}>
        <Div fontSize="50px" ref={scrollRef} color="--grey-200" ml="50px" pt="20px">
          바다 테마 특별전
        </Div>
      </Div>
    </Div>
  );
}
