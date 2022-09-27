import React from "react";
import styled from "styled-components";
import { Div } from "../../styles/BaseStyles";

const Button = styled.button`
  all: unset;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  padding: 0.7rem 0.9rem;
  background-color: var(--grey-100);
  color: var(--grey-650);
  border-radius: 4px;
`

function FilterButtons({List}:any) {

  const onClickHandler = (e:any) => {
    console.log(e.target.tag);
  }

  return (
  <>
  <Div display="flex" gap="1rem">
    {
      List.map((item:any, i:number) => {
        return<Button key={i} onClick={onClickHandler}>{item}</Button>
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
