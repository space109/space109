import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { Div, screenSizes } from "../styles/BaseStyles";
import NavBar from "../components/NavBar/NavBar";
import bg1 from "../assets/1.jpg";
import bg2 from "../assets/2.jpg";
import bg3 from "../assets/3.jpg";
import { useAccount } from "../hooks";

const Container = styled.div`

`

const Header = styled.div`
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 70px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`

const Main1 = styled.div`
  box-sizing: border-box;
  height: 100vh;
  overflow: hidden;
  background-color: var(--matcha-100);
  background-size: cover; 
  background-repeat: no-repeat;
`

const Main2 = styled.div`
  box-sizing: border-box;
  height: 100vh;
  overflow: hidden;
  background-color: var(--milk-coffee-100);
  background-size: cover; 
  background-repeat: no-repeat;
`

const Main3 = styled.div`
  box-sizing: border-box;
  height: 100vh;
  overflow: hidden;
  background-color: var(--navy-100);
  background-size: cover; 
  background-repeat: no-repeat;
`

const Content = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 45%;
  overflow: hidden;
  background-image: url(${(props) => props.bg});
  background-size: cover; 
  background-repeat: no-repeat;
  transition: all 500ms cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 0 0 50px 5px rgba(0, 0, 0, 0.3);
  opacity: ${(props) => props.sectionIsMoving ? 0 : 1};
`

const MainPage = () => {
  const firstRef = useRef(null);
  const secRef = useRef(null);

  const [ isActive, setIsActive ] = useState(0);
  const [ sectionIsMoving, setSectionIsMoving ] = useState(false);
  
  // const [ account, nickname ] = useAccount();
  // console.log(account, nickname);

  const moveSection = (section) => {
    let sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
    let sectionBottom = sectionTop + section.offsetHeight;

    if (isActive) {
      setIsActive((pre) => (0));
      scrollMove(sectionTop);
    } else {
      setIsActive((pre) => (1));
      scrollMove(sectionBottom)
    }
  }

  const scrollMove = (moveY) => {
    let winScrollTop = window.pageYOffset;
    let dy = winScrollTop;

    let loop = setInterval(function() {
      let dir = moveY > winScrollTop ? 1 : -1;	
      
      dy += 15 * dir;
      if (dir > 0 && dy >= moveY) {
        dy = moveY
      } else if (dir < 0 && dy <= moveY) {
        dy = moveY
      }
			window.scrollTo(0, dy);

			if(dy >= moveY && dir > 0) { // 다운 클리어
				setSectionIsMoving(false);
        console.log('다운클리어');
				clearInterval(loop)
			} else if(dy <= moveY && dir < 0) { // 업클리어
				setSectionIsMoving(false);
        console.log('업클리어');
				clearInterval(loop)
			}
		}, 5);
	};

  useEffect(() => {
    console.log('섹션', sectionIsMoving)
  }, [sectionIsMoving])

  const onScroll = () => {
    let winScrollTop = window.pageYOffset;
    let section1Top = firstRef.current.getBoundingClientRect().top + window.pageYOffset;
    let section1Bottom = section1Top + firstRef.current.offsetHeight;
    let section2Top = secRef.current.getBoundingClientRect().top + window.pageYOffset;
    let section2Bottom = section2Top + secRef.current.offsetHeight;

    if (winScrollTop > section1Top && winScrollTop < section1Bottom) {
      if (!sectionIsMoving) {
        setSectionIsMoving(true);
        moveSection(firstRef.current);
      }
    } else if (winScrollTop > section2Top && winScrollTop < section2Bottom) {
      if (!sectionIsMoving) {
        setSectionIsMoving(true);
        moveSection(secRef.current);
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionIsMoving]);

  const [account, nickname] = useAccount();
  console.log(account, nickname);

  return <Container>
    <Header>
    </Header>
    <Main1 ref={firstRef}>
      <Content sectionIsMoving={sectionIsMoving} bg={bg1}></Content>
    </Main1>
    <Main2 ref={secRef}>
      <Content sectionIsMoving={sectionIsMoving} bg={bg2}></Content>
    </Main2>
    <Main3>
      <Content sectionIsMoving={sectionIsMoving} bg={bg3}></Content>
    </Main3>
  </Container>;
};

export default MainPage;
