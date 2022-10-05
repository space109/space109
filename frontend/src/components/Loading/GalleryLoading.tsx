import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ModalPortal } from "..";
import { useNavigate } from "react-router-dom";

interface Props {
  HelpText: string;
  animationName?: any;
}

interface StyleProps {
  active?: boolean;
}

const On = keyframes`
  from {
    height: 120px;
  }
  to {
  }
`;

const Slide = keyframes`
  33%{
		left: 2px;
	}
	67%,100%{
		left: 40px;
	}
`;

const Reg = keyframes`
	50%{
		transform: translate(-50%, -50%) rotate(45deg);
	}
	100%{
		transform: translate(-50%, -50%) rotate(45deg);
	}
`;

const Dot = keyframes`
  0% {
    content: ".";
  }
  50% {
    content: "..";
  }
  100% {
    content: "...";
  }
`;

const LeftIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;
const LeftOut = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;
const RightIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;
const RightOut = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

const LoadIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const LoadOut = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

const BackGround = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 110;

  &.start {
    backdrop-filter: blur(0px);
  }

  &.end {
    backdrop-filter: blur(5px);
  }
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 155;
  margin: 0 auto;
  opacity: 1;

  &.start {
    animation-name: ${LoadIn};
    animation-timing-function: ease-out;
    animation-duration: 2s;
  }

  &.end {
    animation-name: ${LoadOut};
    animation-timing-function: ease-out;
    animation-duration: 2s;
  }
`;

const LoadingText = styled.div`
  font-family: "Pretendard Variable";
  font-style: normal;
  text-align: center;
  font-size: var(--h4);
  position: absolute;
  width: 100vw;
  top: 60%;

  &:after {
    animation: ${Dot} 3s linear infinite;
    content: "";
  }
`;

const Cell = styled.div`
  width: calc(32px * 5);
  height: calc(32px * 5);
  flex-shrink: 1;
  flex-grow: 1;
`;

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Block = styled.div`
  position: absolute;
  color: var(--grey-650);
  width: 74px;
  height: 74px;
  border: 2px solid;
  border-radius: 2px;
  transform: translate(-50%, -50%) rotate(-45deg);
  animation-name: ${Reg};
  animation-timing-function: ease-in-out;
  animation-duration: 1s;
  animation-iteration-count: infinite;

  &:before,
  &:after {
    bottom: 2px;
    content: "";
    position: absolute;
    width: 32px;
    height: 32px;
    background: var(--grey-650);
    border-radius: 4px;
  }
  &:before {
    left: 2px;
  }
  &:after {
    right: 2px;
  }
`;

const Box = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  background: var(--grey-650);
  border-radius: 4px;
  animation-timing-function: ease-in-out;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  left: 2px;
  top: 2px;
  animation-name: ${Slide};
`;

const Curtain = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Wraper = styled.div`
  width: 100%;
  height: 100%;
`;

const PanalLeft = styled.div`
  background-color: var(--grey-200);
  width: 50%;
  height: 100vh;
  float: left;
  position: relative;
  z-index: 150;

  transform: translateX(0);

  &.start {
    animation-name: ${LeftIn};
    animation-timing-function: ease-out;
    animation-duration: 1s;
  }

  &.end {
    animation-name: ${LeftOut};
    animation-timing-function: ease-out;
    animation-duration: 2s;
  }
`;

const PanalRight = styled.div`
  background-color: var(--grey-200);
  width: 50%;
  height: 100vh;
  float: left;
  position: relative;
  z-index: 150;
  transform: translateX(0);

  &.start {
    animation-name: ${RightIn};
    animation-timing-function: ease-out;
    animation-duration: 1s;
  }

  &.end {
    animation-name: ${RightOut};
    animation-timing-function: ease-out;
    animation-duration: 2s;
  }
`;

function GalleryLoading({ HelpText = "도움", animationName }: Props) {
  return (
    <>
      <ModalPortal>
        <BackGround className={animationName}>
          <Curtain>
            <Wraper>
              <PanalLeft className={animationName}></PanalLeft>
              <Loading className={animationName}>
                <Cell>
                  <Loader>
                    <Block>
                      <Box />
                    </Block>
                  </Loader>
                </Cell>
                <LoadingText>{HelpText}</LoadingText>
              </Loading>
              <PanalRight className={animationName}></PanalRight>
            </Wraper>
          </Curtain>
        </BackGround>
      </ModalPortal>
    </>
  );
}

export default GalleryLoading;
