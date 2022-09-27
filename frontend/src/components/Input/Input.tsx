import React, { forwardRef } from "react";
import styled, { css } from "styled-components";


interface Props {
  width?: any,
  height?: any,
  fontSize?: any,
  fontWeight?: any,
  bgColor?: any,
  color?: any,
  borderWidth?: any,
  borderStyle?: any,
  borderColor?: any,
  borderRadius?: any,
  isReadOnly?: any,
  placeholder?: any,
  value?: any,
  onChange?: any,
  setValue?: any,
};

const StyledInput = styled.input.attrs<Props>(props=> {
})<Props>`
  box-sizing: border-box;
  border: none;
  background-color: transparent;
  width: 100%;
  font-size: var(${({fontSize}) => fontSize});
  font-weight: var(${({fontWeight}) => fontWeight});
  :focus {
    outline: none;
  }

  ${({isReadOnly, color}) => {
    if (isReadOnly) {
      return css`color: var(--grey-100);`
    } else {
      return css`color: var(${color});`
    }
  }}
`;

const BorderDiv = styled.div<Props>`
  box-sizing: border-box;
  
  ${({fontSize}) => {
    return css`padding: calc(var(${fontSize}) / 1.5) calc(var(${fontSize}) / 1.5);`
  }}

  width: ${({width}) => width};
  height: ${({height}) => height};

  ${({isReadOnly, bgColor}) => {
    if (isReadOnly) {
      return css`background-color: var(--grey-650);`
    } else {
      return css`background-color: var(${bgColor});`
    }
  }}
  border-width: ${({borderWidth}) => borderWidth}; 
  border-style: ${({borderStyle}) => borderStyle};
  border-color: var(${({borderColor}) => borderColor});
  border-radius: ${({borderRadius}) => borderRadius};
`

const Input = forwardRef(({width, height, fontSize, fontWeight, bgColor, color, borderWidth, borderStyle, borderColor, borderRadius, isReadOnly, placeholder, value, setValue}: Props, ref:any) => {
  const onChangeHandler = (e: any) => {
    setValue &&
    setValue(e.target.value);
  }

  return (
    <>
      <BorderDiv width={width} height={height} fontSize={fontSize} bgColor={bgColor} borderWidth={borderWidth} borderStyle={borderStyle} borderColor={borderColor} borderRadius={borderRadius} isReadOnly={isReadOnly}>
        <StyledInput 
          fontSize={fontSize} fontWeight={fontWeight} color={color}
          isReadOnly={isReadOnly} readOnly={isReadOnly} placeholder={placeholder}
          value={value} onChange={onChangeHandler} ref={ref}
        />
      </BorderDiv>
    </>
  );
});

Input.defaultProps = {
  width: "100%",
  height: "auto",
  fontSize: "--body",
  fontWeight: "--regular",
  bgColor: "--grey-100",
  color: "--grey-650",
  borderWidth: "0px",
  borderStyle: "solid",
  borderColor: "--grey-650",
  borderRadius: "4px",
  isReadOnly: false,
  placeholder: "메세지를 입력해주세요.",
}

export default Input;