import React from "react";
import styled, { css } from "styled-components";
import { Div } from "../../styles/BaseStyles";

interface Props {
  width?: any,
  fontSize?: any,
  fontWeight?: any,
  isBorder?: any,
  borderColor?: any,
  isReadOnly?: any,
  placeholder?: any,
  value?: any,
};

const StyledInput = styled.input<Props>`
  box-sizing: border-box;
  border: none;
  background-color: transparent;
  font-size: var(${({fontSize}) => fontSize});
  font-weight: var(${({fontWeight}) => fontWeight});
  :focus {
    outline: none;
  }
`;

const BorderDiv = styled.div<Props>`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  ${({fontSize}) => {
    return css`padding: calc(var(${fontSize}) / 1.5) calc(var(${fontSize}) / 1.5);`
  }}

  ${({isBorder, borderColor}) => {
    if (isBorder) {
      return css`border: 3px solid var(${borderColor});`
    } else {
      return css`border: 3px solid transparent);`
    }
  }}
  flex-grow: 1;
`

const ButtonDiv = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  ${({fontSize}) => {
    return css`padding: calc(var(${fontSize}) / 1.5) calc(var(${fontSize}) / 1.5);`
  }}
  font-size: var(${({fontSize}) => fontSize});
  font-weight: var(${({fontWeight}) => fontWeight});
  background-color: var(${({borderColor}) => borderColor});
  color: var(--grey-100);
`

function InputButton({fontSize, fontWeight, borderColor, placeholder, value}: Props) {
  return (
    <Div display="flex">
      <BorderDiv fontSize={fontSize} isBorder={true} borderColor={borderColor}>
        <StyledInput 
          fontSize={fontSize} fontWeight={fontWeight}
          placeholder={placeholder}
          value={value}
        />
      </BorderDiv>
      <ButtonDiv fontSize={fontSize} fontWeight={fontWeight} borderColor={borderColor}>
          중복확인
      </ButtonDiv>
    </Div>
  );
};

InputButton.defaultProps = {
  fontSize: "--body",
  fontWeight: "--regular",
  isBorder: true,
  borderColor: "--grey-650",
  placeholder: "메세지를 입력해주세요.",
}

export default InputButton;