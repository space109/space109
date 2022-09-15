import React from "react";
import styled, { css } from "styled-components";
import { Div } from "../styles/BaseStyles";
import { Input, InputButton } from "../components";
import SharpButton from "../components/Button/SharpButton";

interface PropsStyle {
  fontSize?: any,
  fontWeight?: any,
}

const CheckButton = styled.div<PropsStyle>`
  box-sizing: border-box;
  ${({fontSize, fontWeight}) => {
    return css`
      padding: calc(var(${fontSize}) / 2) calc(var(${fontSize}) / 1.5);
      font-size: var(${fontSize});
      font-weight: var(${fontWeight});
    `
  }}
  border: 3px solid var(--grey-650);
`

interface Props {
};

function SignUpPage({}: Props) {
  return (
    <Div 
      display="flex" flexDirection="column" gap="2rem"
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
        <Div display="flex">
          <Div w="70%">
            <Input fontSize="--h5" fontWeight="--regular"/>
          </Div>
          <Div w="30%">
            <CheckButton fontSize="--h5" fontWeight="--regular">중복</CheckButton>
          </Div>
        </Div>
        <Div fontSize="--h6" fontWeight="--thin" color="--carmine-100">
          경고메세지
        </Div>
      </Div>
      <InputButton fontSize="--h5" fontWeight="--regular"></InputButton>
    </Div>
  );
}

export default SignUpPage;
