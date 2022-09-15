import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/title.svg";
import { useNavigate } from "react-router-dom";

// type Props = {}

const Nav = styled.div`
  width: 100%;
  height: 120px;
  left: 3404px;
  top: 214px;
  background-color: var(--grey-650);
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & svg {
    margin-left: 110px;
  }
`;

const Menu = styled.div`
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 140%;
  /* identical to box height, or 42px */

  display: flex;
  align-items: center;
  text-align: center;
  color: var(--grey-100);
`;

const MenuItem = styled.div`
  padding: 0 10px;
  cursor: pointer;
`;

function NavBar() {
  const navigate = useNavigate();
  const goGallery = () => {
    navigate("/monthlyTheme");
  };
  const goTheme = () => {
    navigate("/gallery");
  };

  return (
    <Nav>
      <Logo></Logo>
      <Menu>
        <MenuItem onClick={goTheme}>월간테마</MenuItem>
        <MenuItem onClick={goGallery}>갤러리</MenuItem>
      </Menu>
    </Nav>
  );
}

export default NavBar;
