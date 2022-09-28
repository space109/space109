import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import SearchIcon from "../../assets/Icon/icons8.svg";
import { Div } from "../../styles/BaseStyles";

interface PropsStyle {
  url?: any,
  ref?: any,
  isBorder?: any,
  width?: any,
  height?: any,
  fontSize?: any,
}

const Image = styled.img.attrs<PropsStyle>(props => ({
  src: props.url,
  alt: "돋보기 아이콘",
  }))<PropsStyle>`
  fill: blue;
  height: inherit;
  user-select: none;
  ::placeholder {
    color: var(--grey-100);
    filter: opacity(0.5);
  }
  ${({isBorder}) => {
    if (isBorder) {
      return css`
        filter: opacity(1);
      `
    } else {
      return css `
        filter: opacity(0.5);
      `
    }
  }} 
  &:hover {
    filter: opacity(1); 
  }
  transition: .3s;
`

const Box = styled.div<PropsStyle>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

const Line = styled.div<PropsStyle>`
  ${({isBorder}) => {
    if (isBorder) {
      return css`
        border-bottom: 1px solid var(--grey-100);
        filter: opacity(0.5);
      `
    } else {
      return css`
      border-bottom: 1px solid transparent;
      `
    }
  }}
  width: ${({width}) => width};
  transition: width .5s ease-out;
  border-radius: 3rem;
`

const Input = styled.input<PropsStyle>`
  all: unset;
  color: var(--grey-100);
  font-size: var(${({fontSize}) => fontSize});
  width: ${({width}) => width};
  transition: width .6s ease-out;
`

function SearchBar({height, fontSize, setValue}:any) {
  const input = useRef<HTMLInputElement>(null);
  const [ width, setWidth ] = useState<any>("0");
  const [ isBorder, setIsBorder ] = useState(false);
  const [ isSelect, setIsSelect ] = useState(true);
  const [ keyWord, setKeyWord ] = useState();

  const onClickHandler = () => {
    if (!isBorder && isSelect) {
      input.current?.focus();
    }
  };

  const onfocusHandler = () => {
    setWidth("100%");
    setIsBorder(true);
  }

  const blurHandler = () => {
    setWidth("0");
    setIsBorder(false);
  }

  const endHandler = () => {
    setIsSelect(true);
  }

  const onChangeHandler = (e: any) => {
    setKeyWord(e.target.value);
  }

  const onKeyUpHandler = (e: any) => {
    if (e.key === 'Enter') {
      setValue(keyWord);
    }
  }

  useEffect(() => {
    input.current?.addEventListener('focus', onfocusHandler);
    input.current?.addEventListener('blur', blurHandler);
    return () => {
      input.current?.removeEventListener('focus', onfocusHandler);
      input.current?.removeEventListener('blur', blurHandler);
    }
  }, [input])
  
  return (
  <>
  <Box>
    <Div display="flex" alignItems="center" h={height} pl="3px">
      <Input placeholder="검색어를 입력해주세요" width={width} fontSize={fontSize} 
        onChange={onChangeHandler} onKeyUp={onKeyUpHandler} 
        ref={input}
      />
      <Image isBorder={isBorder} url={SearchIcon} onClick={onClickHandler}></Image>
    </Div>
    <Line isBorder={isBorder} width={width}/>
  </Box>
  </>
  );
}

SearchBar.defaultProps = {
  height: "3rem",
  fontSize: "--h5"
};

export default SearchBar;
