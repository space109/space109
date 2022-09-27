import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/title.svg";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAccount } from "../../hooks";

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
  padding-right: 60px;
  padding-left: 60px;
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
  const location = useLocation();
  const [account, nickname] = useAccount();
  const [selected, setSelected] = useState<string>("/");
  const eth = window.ethereum;
  // console.log("메타마스크 있음?:", eth.isMetaMask);
  // console.log("연결됨?:", eth.isConnected());
  // console.log("아이디 있음?:", eth.selectedAddress);

  const [isLogined, setIsLogined] = useState<any>("");

  useEffect(() => {
    setSelected(location.pathname);

    eth && setIsLogined(eth.selectedAddress);
  }, [location]);

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
    setIsLogined(account);
    navigate("/signUp");
    console.log(isLogined);
  };
  const goProfile = () => {
    navigate("/profile");
  };
  const goMyNFT = () => {
    navigate("/myNft");
  };
  const checkActive = (path: string) => {
    return selected === path;
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
              {!isLogined ? (
                <SecondaryMenuItem
                  onClick={goSignUp}
                  active={checkActive("/signUp")}
                >
                  지갑연결
                </SecondaryMenuItem>
              ) : (
                <>
                  <SecondaryMenuItem
                    onClick={goProfile}
                    active={checkActive("/profile")}
                  >
                    프로필
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    onClick={goMyNFT}
                    active={checkActive("/myNft")}
                  >
                    내NFT
                  </SecondaryMenuItem>
                </>
              )}
            </SecondaryMenu>
            <PrimayMenu>
              <PrimayMenuItem
                onClick={goTheme}
                active={checkActive("/monthlyTheme")}
              >
                월간테마
              </PrimayMenuItem>
              <PrimayMenuItem
                onClick={goGallery}
                active={checkActive("/gallery")}
              >
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
