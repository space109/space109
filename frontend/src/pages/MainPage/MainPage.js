import React, { useState, useEffect, useRef, Suspense } from "react";
import styled, {keyframes} from "styled-components";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF, useProgress, softShadows } from "@react-three/drei";
import { a, useTransition, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { Div, screenSizes } from "../../styles/BaseStyles";
import state from "./state";
import Section from "./Section";

// softShadows();


const flipout = keyframes`
  100% {
    transform: rotateX(360deg);
  }  
`;

const flipin = keyframes`
  0%,
  100% {
    clip-path: polygon(
      0% 45%,
      16% 44%,
      33% 50%,
      54% 60%,
      70% 61%,
      84% 59%,
      100% 52%,
      100% 100%,
      0% 100%
    );
  }
  
  50% {
    clip-path: polygon(
      0% 60%,
      15% 65%,
      34% 66%,
      51% 62%,
      67% 50%,
      84% 45%,
      100% 46%,
      100% 100%,
      0% 100%
    );
}
`;

const Center = styled.div`
  margin: 0 auto;
  width: 50%;
  max-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: var(--h1);
  color: var(--grey-100);
  font-weight: var(--bold);
  word-break: keep-all;
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
    width: 60%;
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    font-size: var(--h2);
    width: 80%;
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    font-size: var(--h3);
    width: 80%;
  }
  @media screen and (max-width: ${screenSizes.sm + "px"}) {
    font-size: var(--h4);
    width: 80%;
  }
  animation: ${flipin} 3s alternate infinite linear;
`

const BackCenter = styled.div`
  margin: 0 auto;
  width: 50%;
  max-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: var(--h1);
  color: var(--grey-100);
  font-weight: var(--bold);
  word-break: keep-all;
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
    width: 60%;
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    font-size: var(--h2);
    width: 80%;
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    font-size: var(--h3);
    width: 80%;
  }
  @media screen and (max-width: ${screenSizes.sm + "px"}) {
    font-size: var(--h4);
    width: 80%;
  }
  animation: ${flipin} 3s alternate infinite linear;
`

const ScrollArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - 120px);
  overflow: auto;
`

const NavArea = styled.div`
  height: 120px;
  color: transparent;
`

// const Model = () => {
//   const gltf = useGLTF("/isabelle.glb");
//   return <primitive object={gltf.scene} dispose={null}/>;
// }

const GoGallery = styled.div`
  cursor: pointer;
`

const LastContent = () => {

  return (
    <GoGallery>
      마지막이다
    </GoGallery>
  );
}

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} castShadow/>
      <directionalLight position={[0, 10, 0]} intensity={0.5} />
      <directionalLight position={[10, 0, 0]} intensity={1.5} />
      <pointLight position={[-10, 0, -20]} intensity={0.5}/>
      <spotLight intensity={1} position={[1000, 0, 0]}  />
    </>
  );
}

const HTMLContent = ({children, bgColor, positionY, domContent, setColor, color}) => {

  const mesh = useRef()
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const [refItem, inView] = useInView({
    threshold: 0
  })

  useEffect(() => {
    inView && (
      document.body.style.background = `var(${bgColor})`
    )
    // if (inView) {
    //   if (bgColor === '--ocean-300'){
    //     setColor('lightblue')
    //   }
    //   else if (bgColor === '--spinach-300'){
    //     setColor('#648f82')
    //   }
    //   else if (bgColor === '--grape-100'){
    //     setColor('lightyellow')
    //   }
    // }
  }, [inView])

  return (
    <>
    <mesh ref={mesh} position={[0, 6, 10]} scale={50}>

      <boxGeometry attach='geometry'/>
      <meshStandardMaterial attach='material' color={color}/>
    </mesh>
    {/* <group>
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -25, 0]}>
        <planeGeometry attach='geometry' args={[100, 100]}/>
        <shadowMaterial attach='material' color={"red"}/>
      </mesh>
    </group> */}
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <Html portal={domContent} fullscreen>
          {/* <Center>
            {children}
          </Center> */}
          <Center ref={refItem}>
            {children}
          </Center>
        </Html>
      </group>
    </Section>
    </>
  )
}

const MainPage = () => {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => {
    state.top.current = e.target.scrollTop
  }
  const [color, setColor] = useState('white');
  useEffect(() => void onScroll({target: scrollArea.current}), [])

  return (
    <>
    <NavArea/>
    <Div w="100%" h="calc(100vh - 120px)">
      <Canvas camera={{position: [0, 0, 120], fov: 70}}>
        <Lights/>
        <Suspense fallback={null}>
          <HTMLContent domContent={domContent} positionY={260} setColor={setColor} bgColor="--ocean-300">
            공간 109에서 디지털 작품을 NFT로 만들고 나만의 갤러리에 전시해보세요.
          </HTMLContent>
          <HTMLContent domContent={domContent} positionY={10} setColor={setColor} bgColor="--spinach-300">
            SSF를 이용하서 판매가 가능합니다
          </HTMLContent>
          <HTMLContent domContent={domContent} positionY={-240} setColor={setColor} 
            bgColor="--grape-100" color={color}
          >
            다른 유저들의 갤러리도 관람해보세요
          </HTMLContent>
        </Suspense>
      </Canvas>
      <ScrollArea ref={scrollArea} onScroll={onScroll}>
        <div style={{postion: 'sticky', top: 0}} ref={domContent}></div>
        <div style={{height: "calc(100vh + 120px)"}} ref={domContent}></div>
      </ScrollArea>
    </Div>
    </>
  );
};

export default MainPage;
