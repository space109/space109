import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/title.svg";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useConnectWallet } from "../../hooks";
import { login } from "../../apis";

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

  @media (max-width: 1366px) {
    padding-right: 32px;
    padding-left: 32px;
  }
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

  @media (max-width: 992px) {
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
  const [selected, setSelected] = useState<string>("/");
  // console.log("메타마스크 있음?:", eth.isMetaMask);
  // console.log("연결됨?:", eth.isConnected());
  // console.log("아이디 있음?:", eth.selectedAddress);

  // 임시 ------------------------
  const [account, setAccount] = useState();
  const [nickname, setNickname] = useState();

  const SSAFY_CHAIN_ID = "0x79f5";

  const getChainId = async () => {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    return chainId;
  };

  const getAccountnName = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);

      const nameData = await login(accounts[0]);
      if (nameData.length) {
        setNickname(nameData[0].nickname);
      } else {
        if (window.confirm("회원가입 해주십시오.")) {
          navigate("/signUp");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const switchSSFNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SSAFY_CHAIN_ID }],
      });
    } catch (error: any) {
      // MetaMask에 해당 네트워크가 없는 경우 발생하는 에러
      if (error.code === 4902) {
        console.error("This network is not found in your network!");
        // 현재 addSSFNetwork 실행시 rpcUrls 어쩌구 하면서 에러남,, 왜인지 모르겠음...
        // addSSFNetwork();
      } else {
        console.error("Failed to switch this network");
      }
    }
  };

  // 임시끝 -----------------------------------

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        // window.location.reload();
        console.log("체인 바뀜");
      });
      window.ethereum.on("accountsChanged", () => {
        // window.location.reload();

        console.log(selected);
        navigate("/");
        console.log("아이디 바뀜");
      });
    }
  }, []);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  const [isLogined, setIsLogined] = useState<any>("");

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
    const init = async () => {
      try {
        const chainId = await getChainId();
        // console.log('체인 아이디 : ', chainId);
        if (SSAFY_CHAIN_ID !== chainId) {
          // 추가는 해야할 것 같은데 전환은 여기서 할 게 맞나 싶어서 일단 주석
          console.log("체인 아이디 : ", chainId);

          // switchSSFNetwork();

          // alert("SSAFY 네트워크 추가하고 오세요");

          alert("SSAFY 네트워크를 추가해주세요");
          window.open(
            "https://www.notion.so/SSAFY-af21aeede5834fb1a721ffd87ced99bd",
            "_blank"
          );
        }

        getAccountnName();
      } catch (error) {
        console.error(error);
      }
    };

    if (window.ethereum) {
      init();
      window.ethereum.on("accountsChanged", getAccountnName);
    }
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
              {!nickname ? (
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
