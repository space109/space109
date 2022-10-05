import styled, { css } from "styled-components";
import { useState } from "react";
import { Div } from "../../styles/BaseStyles";

interface propsStyle {
  isCheck?: any;
}

const TransInput = styled.input.attrs(props => ({
  type: "checkbox",
}))`
  position: absolute;
  transfrom: scale(0);
  display: none;
`

const Button = styled.button`
  margin-top: -0.5rem;
  display: inline;
  transition: all .4s ease-in-out;
  &:hover {
    color: $dm-pt-color1;
  }
`

const Check = styled.span<propsStyle>`
  display: block;
  width: inherit;
  height: inherit;
  border: 4px solid var(--grey-100);
  border-radius: 6px;
  transition: all .4s;
  margin-top: 2px;
  ${({isCheck}) => {
    if (isCheck) {
      return css`
        transform: rotate(45deg);
        width: 12px;
        margin-left: 12px;
        margin-top: -5px;
        border-color: var(--ocean-300);
        border-top-color: transparent;
        border-left-color: transparent;
        border-radius: 0;
      `
  }}}
`

const Box = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 1.4rem;
`

const Label = styled.label`
  box-sizing: border-box;
  display: block;
  width: 28px;
  height: 28px;
  cursor: pointer;
`

const TextDiv = styled.div`
  color: var(--grey-100);
  font-size: var(--h5);
  margin-top: 9px;
  cursor: pointer;
  :hover {
    color: var(--ocean-300)
  }
  transition: all .2s;
`

function LabelCheckBox ({setCheck, children}:any) {

  const [ isCheck, setIsCheck ] = useState(false);

  const CheckHandler = () => {
    setIsCheck((pre) => !pre);
    setCheck(isCheck);
  }

  return (
    <Box>
      <Label>
        <TransInput onChange={CheckHandler}></TransInput>
        <Check isCheck={isCheck}></Check>
      </Label>
      <TextDiv onClick={CheckHandler}>
        {children}
      </TextDiv>
    </Box>
  );
}

LabelCheckBox.defaultProps = {
  children: "라벨"
}

export default LabelCheckBox;