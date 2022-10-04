import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ModalPortal } from "..";
import { useNavigate } from "react-router-dom";

interface Props {
  HelpText: string;
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

const BackGround = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  gap: 1rem;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  animation: ${On} 0.5s ease;
`;

const Content = styled.div`
  overflow: auto;
  animation: ${On} 0.3s ease;
  background-color: var(--grey-200);
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  width: calc(100vw - 60px);
  height: 50%;
  max-width: calc(30 * 32px);
  margin: auto;
`;

const LoadingText = styled.div`
  font-family: "Pretendard Variable";
  font-style: normal;
  text-align: center;
  font-size: var(--h4);
  margin-bottom: 20px;

  &:after {
    animation: ${Dot} 3s linear infinite;
    content: "";
  }
`;

const Cell = styled.div`
  position: relative;
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

function Loading({ HelpText = "도움" }: Props) {
  return (
    <>
      <ModalPortal>
        <BackGround>
          <Content>
            <Cell>
              <Loader>
                <Block>
                  <Box />
                </Block>
              </Loader>
            </Cell>
            <LoadingText className="letterChanger">{HelpText}</LoadingText>
          </Content>
        </BackGround>
      </ModalPortal>
    </>
  );
}

export default Loading;
