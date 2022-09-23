import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/title.svg";
import { Outlet, useNavigate } from "react-router-dom";

// type Props = {}

interface StyleProps {
  active?: boolean;
}

const Nav = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 120px;

  background-color: rgba(0, 0, 0, 0);

  display: flex;
  flex-direction: row;
  transition: 0.5s;

  opacity: 1;
  width: 100%;
  top: 0;
  &:hover {
    background-color: var(--grey-650);
  }
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
  justify-content: space-between;

  position: relative;
  width: 100%;
  max-width: 1800px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 0;
`;

const Menu = styled.ul`
  user-select: none;
  width: 320px;
  box-sizing: border-box;

  display: inline-block;
  white-space: nowrap;
  position: relative;
  margin-top: 3px;

  /* identical to box height, or 42px */

  display: flex;

  flex-direction: column;

  @media (max-width: 1000px) {
    display: none;
  }
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

const PrimayMenuItem = styled.li<StyleProps>`
  padding-right: 3.5%;
  list-style: none;
  color: var(--grey-100);
  transition: 5s;
  text-decoration: ${(props) => (props.active ? "underline" : "none")};
  cursor: pointer;

  &:hover {
    color: var(--grey-350);
    /* text-decoration: underline; */
  }
`;

const SecondaryMenuItem = styled.li<StyleProps>`
  display: inline-block;
  margin-left: 3%;
  list-style: none;
  color: var(--grey-100);
  transition: 5s;
  text-decoration: ${(props) => (props.active ? "underline" : "none")};
  cursor: pointer;

  &:hover {
    color: var(--grey-350);
  }
`;

function NavBar() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(0);

  const goHome = () => {
    navigate("/");
    setSelected(0);
  };
  const goTheme = () => {
    navigate("/monthlyTheme");
    setSelected(1);
  };
  const goGallery = () => {
    navigate("/gallery");
    setSelected(2);
  };
  const goSignUp = () => {
    navigate("/signUp");
    setSelected(3);
  };
  const goProfile = () => {
    navigate("/profile");
    setSelected(4);
  };
  const checkActive = (num: number) => {
    return selected === num;
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
              <SecondaryMenuItem onClick={goSignUp} active={checkActive(3)}>
                지갑연결
              </SecondaryMenuItem>
              <SecondaryMenuItem onClick={goProfile} active={checkActive(4)}>
                프로필
              </SecondaryMenuItem>
            </SecondaryMenu>
            <PrimayMenu>
              <PrimayMenuItem onClick={goTheme} active={checkActive(1)}>
                월간테마
              </PrimayMenuItem>
              <PrimayMenuItem onClick={goGallery} active={checkActive(2)}>
                갤러리
              </PrimayMenuItem>
            </PrimayMenu>
          </Menu>
        </NavBox>
      </Nav>
      <Outlet></Outlet>
    </div>
  );
}

export default NavBar;
