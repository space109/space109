import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/title.svg";
import { Outlet, useNavigate } from "react-router-dom";

// type Props = {}

const Nav = styled.div`
  width: 100%;
  height: 11.11111vh;
  left: 3404px;
  top: 214px;
  background-color: var(--grey-650);
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  opacity: 1;
  width: 100%;
  top: 0;
`;

const LogoDiv = styled.div`
  width: 25%;

  & svg {
    cursor: pointer;
    float: left;
    display: block;
    position: relative;
    top: 0px;
    height: 87px px;
    overflow: hidden;
  }
`;

const NavBox = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */

  position: relative;
  width: 100%;
  max-width: 1800px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 0;
`;

const Menu = styled.ul`
  width: 20%;
  margin-left: 55%;
  box-sizing: border-box;

  display: inline-block;
  white-space: nowrap;
  position: relative;
  margin-top: 3px;

  /* identical to box height, or 42px */

  display: flex;

  flex-direction: column;
`;

const PrimayMenu = styled.div`
  display: flex;
  flex-direction: row;

  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 140%;
`;

const SecondaryMenu = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 10px;

  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 140%;
`;

const PrimayMenuItem = styled.li`
  padding-right: 3.5%;
  list-style: none;
  color: var(--grey-350);
  cursor: pointer;

  &:hover {
    color: var(--grey-100);
  }
`;

const SecondaryMenuItem = styled.li`
  display: inline-block;
  margin-left: 1.25%;
  list-style: none;
  color: var(--grey-350);
  cursor: pointer;

  &:hover {
    color: var(--grey-100);
  }
`;

function NavBar() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  const goTheme = () => {
    navigate("/monthlyTheme");
  };
  const goGallery = () => {
    navigate("/gallery");
  };
  const goSignUp = () => {
    navigate("/signUp");
  };

  return (
    <div>
      <Nav>
        <NavBox>
          <LogoDiv>
            <Logo onClick={goHome}></Logo>
          </LogoDiv>
          <Menu>
            <SecondaryMenu>
              <SecondaryMenuItem onClick={goSignUp}>회원가입</SecondaryMenuItem>
              <SecondaryMenuItem onClick={goSignUp}>내 NFT</SecondaryMenuItem>
            </SecondaryMenu>
            <PrimayMenu>
              <PrimayMenuItem onClick={goTheme}>월간테마</PrimayMenuItem>
              <PrimayMenuItem onClick={goGallery}>갤러리</PrimayMenuItem>
            </PrimayMenu>
          </Menu>
        </NavBox>
      </Nav>
      <Outlet></Outlet>
    </div>
  );
}

export default NavBar;
