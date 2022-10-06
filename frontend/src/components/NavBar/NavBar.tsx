import React, { useState, useEffect } from "react";
import {
  Nav,
  NavBox,
  LogoDiv,
  Menu,
  PrimayMenu,
  SecondaryMenu,
  PrimayMenuItem,
  SecondaryMenuItem,
  HamburgerMenu,
  TokenAddMenuItem,
  TokenAmount,
} from "./styles/NavStyle";
import { ReactComponent as Logo } from "../../assets/title.svg";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { SsafyNFTContract, SsafyTokenContract } from "../../web3Config";
import { login } from "../../apis";
import HamburgerModal from "./HamburgerModal";

interface Props {
  windowSize: any;
}

function NavBar({ windowSize }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState<string>("/");
  const [isOnModal, setIsOnModal] = useState(false);
  const [token, setToken] = useState("없음");
  const [tokenCheck, setTokenCheck] = useState<boolean>(false);

  // console.log("메타마스크 있음?:", eth.isMetaMask);
  // console.log("연결됨?:", eth.isConnected());
  // console.log("아이디 있음?:", eth.selectedAddress);

  // 임시 ------------------------
  const [account, setAccount] = useState();
  const [nickname, setNickname] = useState<string>("");

  const SSAFY_CHAIN_ID = "0x79f5";
  const EXTENSION_DOWNLOAD_URL = "https://metamask.io";

  const getChainId = async () => {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    return chainId;
  };

  const getAccountnName = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    const nameData = await login(account);
    console.log("이름", nameData);
    if (nameData.length) {
      setNickname(nameData[0].nickname);
      navigate("/");
    } else {
      navigate("/signUp");
    }
  };

  const getName = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);

      const nameData = await login(accounts[0]);

      if (nameData.length) {
        setNickname(nameData[0].nickname);
      } else {
        setNickname("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const init = async () => {
    try {
      const chainId = await getChainId();

      if (SSAFY_CHAIN_ID !== chainId) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: SSAFY_CHAIN_ID }],
          });
        } catch (error: any) {
          // alert("SSAFY 네트워크 추가하고 오세요");

          alert("SSAFY 네트워크를 추가해주세요");
          window.open(
            "https://lace-raptorex-71b.notion.site/SSAFY-af21aeede5834fb1a721ffd87ced99bd",
            "_blank"
          );
        }
      }

      getAccountnName();
    } catch (error) {
      console.error(error);
    }
  };

  const checkNetwork = async () => {
    try {
      const chainId = await getChainId();
      if (SSAFY_CHAIN_ID === chainId) {
        getName();
      } else {
        setNickname("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getToken = async () => {
    try {
      const amount = await SsafyTokenContract.methods.balanceOf(account).call();
      console.log(amount);
      setToken(amount);
      setTokenCheck(true);
    } catch (error) {
      setTokenCheck(false);
      console.error(error);
    }
  };

  const addToken = async () => {
    await window.ethereum
      .request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0x0c54E456CE9E4501D2c43C38796ce3F06846C966",
            symbol: "SSF",
            decimals: 0,
            image: "",
          },
        },
      })
      .then((success: any) => {
        if (success) {
          console.log("FOO successfully added to wallet!");
          getToken();
        } else {
          throw new Error("Something went wrong.");
        }
      })
      .catch(console.error);
  };

  // 임시끝 -----------------------------------

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        // window.location.reload();
        navigate("/");
        console.log(selected);

        console.log("체인 바뀜");
        checkNetwork();
        console.log("체인 바꼈을때", nickname);
      });
      window.ethereum.on("accountsChanged", () => {
        // window.location.reload();

        navigate("/");
        console.log(selected);

        console.log("아이디 바뀜");
        checkNetwork();
        console.log(nickname);
      });
      // window.ethereum.on("message", (message: any) => {
      //   console.log("메세지:", message);
      // });
      // checkNetwork();
      // console.log(nickname);
      getName();
    }
  }, []);

  useEffect(() => {
    getName();
    getToken();
    setSelected(location.pathname);
    console.log(location.pathname);
  }, [location]);

  useEffect(() => {
    if (windowSize.width > 768) {
      closeModal();
    }
  }, [windowSize.width]);

  useEffect(() => {
    getToken();
  }, [nickname]);

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
    if (window.ethereum) {
      init();
      // window.ethereum.on("accountsChanged", getAccountnName);
    } else {
      if (
        window.confirm("메타마스크가 설치되어 있지 않습니다. 설치하시겠습니까?")
      ) {
        window.open(EXTENSION_DOWNLOAD_URL, "_blank");
      }
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
  const openModal = () => {
    setIsOnModal(true);
  };
  const closeModal = () => {
    setIsOnModal(false);
  };

  return (
    <>
      {isOnModal && (
        <HamburgerModal
          closeModal={closeModal}
          goSignUp={goSignUp}
          nickname={nickname}
          selected={selected}
        />
      )}
      <Nav>
        <NavBox>
          <LogoDiv>
            <Logo onClick={goHome}></Logo>
          </LogoDiv>
          {windowSize.width > 768 ? (
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
                    {tokenCheck ? (
                      <TokenAmount>
                        {token}
                        <div>SSF</div>
                      </TokenAmount>
                    ) : (
                      <TokenAddMenuItem onClick={addToken}>
                        토큰 연동
                      </TokenAddMenuItem>
                    )}
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
          ) : (
            <HamburgerMenu onClick={openModal}>메뉴</HamburgerMenu>
          )}
        </NavBox>
      </Nav>
      <Outlet></Outlet>
    </>
  );
}

export default NavBar;
