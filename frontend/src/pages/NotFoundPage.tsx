import React from "react";
import styled, { css } from "styled-components";

interface Props {
};

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--ocean-300);
  min-height: 100vh;
  z-index: -1;
`

const Frame = styled.div`
  background-color: var(--grey-100);
  width: 50%;
  height: 50%;
`

function NotFoundPage({}: Props) {
  return (<>
  <Background>
    <Frame>
      NotFoundPage
    </Frame>
  </Background>
  </>);
}

export default NotFoundPage;
