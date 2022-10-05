import React from 'react';
import styled from "styled-components";

const BackDropDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.29);
`;

const ControlBackdrop = (props) => {
  if (!props.controlInfo) return null;
  return <BackDropDiv></BackDropDiv>;
};

export default ControlBackdrop;