import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Div } from "../../styles/BaseStyles";

interface propsStyle {
  selected?: any,
  index?: any,
}

const Button = styled.button<propsStyle>`
  all: unset;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  padding: 0.7rem 1.2rem;
  ${({selected, index}) => {
    if(selected === index) {
      return css`  
        background-color: var(--grey-100);
      `
    } else {
      return css`
        background-color: var(--grey-400);
      `
    }
  }}
  color: var(--grey-650);
  border-radius: 2px;
  font-size: var(--h5);
  transition: .4s;
`

function FilterButtons({List, setValue}:any) {

  const [ selected, setSelected ] = useState(0);
  const ClickButton = (e:any, i:number) => {
    console.log(e.target, i);
    setValue && setValue(i);
    setSelected(i);
  }

  return (
  <>
  <Div display="inline-flex" gap="0.5rem" flexWrap="wrap">
    {
      List.map((item:any, i:number) => {
        return <Button key={i} onClick={(e) => ClickButton(e, i)} selected={selected} index={i}>{item}</Button>
      })
    }
  </Div>
  </>
  );
}

FilterButtons.defaultProps = {
  List: ["전체", "봄", "여름", "가을", "겨울"],
}

export default FilterButtons;
