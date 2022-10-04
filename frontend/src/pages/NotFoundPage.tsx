import { useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import { NavArea } from "../components";
import { Div } from "../styles/BaseStyles";
import frameImage from "../assets/액자.png";
import Logo from "../assets/LogoTransBlack.png";

interface Props {
  ref?: any;
};

const swing = keyframes`
  from {
    transform: rotate(3deg);
  }
  to {
    transform: rotate(-3deg); 
  }
`

const Background = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--ocean-300);
  min-height: 100vh;
  height: auto;
  z-index: -1;
`

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: var(--grey-400);
  width: 500px;
  height: 600px;
  animation: ${swing} ease-in-out 1.5s infinite alternate;
  transform-origin: center -20px;
  box-shadow: 6px 6px 10px rgba(0,0,0,0.5);
  background-image: url(${frameImage});

  ::before {
    content: '';
    position: absolute;
    width: 8px; height: 8px;
    top: -24px; left: 50.3%;
    z-index: 5;
    border-radius: 50% 50%;
    background: #000;
  }

  ::after {
    content: '';
    position: absolute;  
    width: 30px; height: 30px;  
    border: 1px solid var(--grey-100);
    top: -16px; left: 48%;
    z-index: 0;
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
  }
`

const Focus = styled.div<Props>`
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  transition: top .1s, left .1s;
  z-index: 10;
`

const LogoDiv = styled.div`
  background-image: url(${Logo});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 60%;
  height: 60%;
  
`

function NotFoundPage({}: Props) {

  const FocusRef = useRef<HTMLInputElement>(null);

  // function getScreenAvg() {
  //   return Math.floor((window.clientWidth + window.clientHeight) * 0.5)
  // }

  
  const trackMouse = (event:any) => {
    const focusElX = event.clientX + "px"
    const focusElY = event.clientY + "px"
    if (FocusRef.current) {
      FocusRef.current.style.background = `radial-gradient(
        circle 440px at ${focusElX} ${focusElY},
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.25) 50%,
        rgba(0, 0, 0, 0.5) 80%,
        rgba(0, 0, 0, 0.75) 100%`
    }
  }

  useEffect(() => {
    document.addEventListener("mousemove", trackMouse)
    return () => {
      document.removeEventListener("mousemove", trackMouse)
    } 
  }, []);

  return (<>
  <Background>
    <Focus ref={FocusRef}></Focus>
    <NavArea/>
    <Div h="calc(100vh - 130px)" display="flex" justifyContent="center" alignItems="center">
      <Frame>
        <LogoDiv />
        <Div fontWeight="--bold" fontSize="--h6">찾을 수 없는 페이지 입니다.</Div>
      </Frame>
    </Div>
  </Background>
  </>);
}

export default NotFoundPage;
