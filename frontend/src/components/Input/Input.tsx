import React from "react";
import styled, { css } from "styled-components";


interface Props {
  width?: any,
  fontSize?: any,
  fontWeight?: any,
  borderWidth?: any,
  borderColor?: any,
  borderRadius?: any,
  isReadOnly?: any,
  placeholder?: any,
  value?: any,
  onChange?: any,
  setValue?: any,
};

const StyledInput = styled.input<Props>`
  box-sizing: border-box;
  border: none;
  background-color: transparent;
  width: 100%;
  font-size: var(${({fontSize}) => fontSize});
  font-weight: var(${({fontWeight}) => fontWeight});
  :focus {
    outline: none;
  }

  ${({isReadOnly}) => {
    if (isReadOnly) {
      return css`color: var(--grey-100);`
    } else {
      return css`color: var(--grey-650);`
    }
  }}
`;

const BorderDiv = styled.div<Props>`
  box-sizing: border-box;
  
  ${({fontSize}) => {
    return css`padding: calc(var(${fontSize}) / 1.5) calc(var(${fontSize}) / 1.5);`
  }}

  width: ${({width}) => width};

  ${({isReadOnly}) => {
    if (isReadOnly) {
      return css`background-color: var(--grey-650);`
    } else {
      return css`background-color: var(--grey-100);`
    }
  }}
  border: ${({borderWidth}) => borderWidth} solid
  var(${({borderColor}) => borderColor});
  border-radius: ${({borderRadius}) => borderRadius};
`

function Input({width, fontSize, fontWeight, borderWidth, borderColor, borderRadius, isReadOnly, placeholder, value, setValue}: Props) {
  const onChangeHandler = (e: any) => {
    setValue &&
    setValue(e.target.value);
  }

  return (
    <>
      <BorderDiv width={width} fontSize={fontSize} borderWidth={borderWidth} borderColor={borderColor} borderRadius={borderRadius} isReadOnly={isReadOnly}>
        <StyledInput 
          fontSize={fontSize} fontWeight={fontWeight}
          isReadOnly={isReadOnly} readOnly={isReadOnly} placeholder={placeholder}
          value={value} onChange={onChangeHandler}
        />
      </BorderDiv>
    </>
  );
};

Input.defaultProps = {
  width: "100%",
  fontSize: "--body",
  fontWeight: "--regular",
  borderWidth: "0px",
  borderColor: "--grey-650",
  borderRadius: "4px",
  isReadOnly: false,
  placeholder: "메세지를 입력해주세요.",
}

export default Input;