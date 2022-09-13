import React from "react";
import styled from "styled-components";

interface Props {
  fc?: any;
  children?: any;
}

const Square = styled.div`
  background: var(--grey-750);
  color: var(--grey-100);
  width: 130px;
  height: 42px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  /* transition: ease 0.5s; */
  font-size: 2rem;
  margin: 2rem auto;
  padding: 0px, 16px;
  gap: 16px;
  border-radius: 2px;
  /* border: 1px solid var(--grey-750); */

  &:hover {
    background: var(--grey-100);
    color: var(--grey-750);
    /* border: 1px solid var(--grey-750); */
  }
`;

const TextBox = styled.div`
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  /* or 22px */

  display: flex;
  align-items: center;
  text-align: center;
`;

function SharpButton({ fc, children }: Props) {
  return (
    <Square onClick={fc}>
      <TextBox>{children ? children : "제목"}</TextBox>
    </Square>
  );
}

export default SharpButton;
