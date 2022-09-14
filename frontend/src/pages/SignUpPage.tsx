import React from "react";
import styled, { css } from "styled-components";
import { Div } from "../styles/BaseStyles";

const Nav = styled.div`
  width: 100%;
  height: 20px;
  background-color: red;
`

const Body = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
`

interface Props {
};

function SignUpPage({}: Props) {
  return (
  <div>
    <Nav></Nav>
    <Body></Body>
  </div>
  );
}

export default SignUpPage;
