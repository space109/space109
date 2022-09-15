import React from "react";
import styled, { css } from "styled-components";
import { Div } from "../styles/BaseStyles";
import { InputButton } from "../components";
import SharpButton from "../components/Button/SharpButton";

interface PropsStyle {
  fontSize?: any,
  fontWeight?: any,
}

const CheckButton = styled.div<PropsStyle>`
  box-sizing: border-box;
  ${({fontSize, fontWeight}) => {
    return css`
      padding: calc(var(${fontSize}) / 1.5) calc(var(${fontSize}) / 1.5);
      font-size: var(${fontSize});
      font-weight: var(${fontWeight});
    `
  }}
  border: 3px solid var(--grey-650);
  background-color: var(--grey-650);
`

interface Props {
  helpMsg?: any,
};

function SignUpPage({helpMsg}: Props) {
  return (
    <Div 
      display="flex"
      alignItems="center" justifyContent="center"
      h="100vh"
    >      
      <Div 
        display="flex" flexDirection="column" gap="2rem" 
        w="40%"
      >
        <Div 
          display="flex" flexDirection="column" 
          alignItems="center" justifyContent="center"
          gap="0.5rem"
        >
          <Div fontSize="--h3" fontWeight="--bold">
            닉네임 등록하기
          </Div>
          <Div fontSize="--h6" fontWeight="--thin" color="--carmine-100">
            닉네임은 추후 변경이 불가능합니다. 신중히 선택해주세요.
          </Div>
        </Div>
        <Div 
          display="flex" flexDirection="column"
          gap="0.5rem"
        >
          <InputButton fontSize="--h5" fontWeight="--regular"></InputButton>
          <Div fontSize="--h6" fontWeight="--thin" color="--carmine-100" pl="calc(calc(var(--h6) / 1.5) + 3px)">
            {helpMsg}
          </Div>
        </Div>
        <CheckButton fontSize="--h5" fontWeight="--regular">ss</CheckButton>
      </Div>
      <SharpButton></SharpButton>
    </Div>
  );
}

SignUpPage.defaultProps = {
  helpMsg: "\u00A0",
}

export default SignUpPage;
