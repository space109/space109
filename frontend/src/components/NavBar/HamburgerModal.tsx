import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ModalPortal } from "..";
import { ReactComponent as Logo } from "../../assets/title.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  closeModal: any;
  goSignUp: any;
  nickname: string;
  selected: string;
}

interface StyleProps {
  active?: boolean;
}

const On = keyframes`
  from {
    height: 120px;
  }
  to {
  }
`;

const BackGround = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  animation: ${On} 0.5s ease;
`;

const Content = styled.div`
  width: 100%;
  height: 70%;
  overflow: auto;
  animation: ${On} 0.3s ease;
  background-color: var(--grey-650);
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
`;

const TopArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LogoDiv = styled.div`
  width: 25%;
  z-index: 120;
  margin-left: 32px;

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

const Close = styled.div`
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  color: var(--grey-100);
  margin-top: 0;
  margin-right: 32px;
  cursor: pointer;
  user-select: none;
`;

const Menu = styled.ul`
  height: 100px;
  user-select: none;
  width: 320px;
  box-sizing: border-box;

  display: inline-block;
  white-space: nowrap;
  position: relative;
  margin-top: 40px;

  /* identical to box height, or 42px */

  display: flex;

  flex-direction: column;
`;

const PrimayMenu = styled.div`
  display: flex;
  flex-direction: column;

  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 140%;
`;

const SecondaryMenu = styled.div`
  display: flex;
  flex-direction: column-reverse;
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
  text-decoration: ${(props) => (props.active ? "underline" : "none")};
  cursor: pointer;

  &:hover {
    color: var(--grey-350);
    /* text-decoration: underline; */
  }
`;

const SecondaryMenuItem = styled.li<StyleProps>`
  display: inline-block;
  /* margin-left: 3%; */
  list-style: none;
  color: var(--grey-100);
  text-decoration: ${(props) => (props.active ? "underline" : "none")};
  cursor: pointer;

  &:hover {
    color: var(--grey-350);
  }
`;

function HamburgerModal({ closeModal, goSignUp, nickname, selected }: Props) {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  const goTheme = () => {
    navigate("/monthlyTheme");
    closeModal();
  };
  const goGallery = () => {
    navigate("/gallery");
    closeModal();
  };

  const goProfile = () => {
    navigate("/profile");
    closeModal();
  };
  const goMyNFT = () => {
    navigate("/myNft");
    closeModal();
  };
  const checkActive = (path: string) => {
    return selected === path;
  };

  return (
    <>
      <ModalPortal>
        <BackGround
          onClick={(e) => {
            closeModal();
            e.stopPropagation();
          }}
        >
          <Content
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <TopArea>
              <LogoDiv>
                <Logo
                  onClick={(e) => {
                    closeModal();
                    goHome();
                    e.stopPropagation();
                  }}
                ></Logo>
              </LogoDiv>
              <Close
                onClick={(e) => {
                  closeModal();
                  e.stopPropagation();
                }}
              >
                닫기
              </Close>
            </TopArea>

            <Menu>
              <SecondaryMenu>
                {!nickname ? (
                  <SecondaryMenuItem
                    onClick={(e) => {
                      closeModal();
                      goSignUp();
                      e.stopPropagation();
                    }}
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
          </Content>
        </BackGround>
      </ModalPortal>
    </>
  );
}

export default HamburgerModal;
