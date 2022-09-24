import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { login } from "../apis";
import { useNavigate } from "react-router-dom";

/* 
계정 주소와 닉네임을 가져오는 hook
account가 undefined 값이 반환되면 계정 연결이 안되어있고, 
name이 undefined으로 반환되면 회원가입이 되어있지 않은 것.
*/
const useAccount = () => {
  const [ account, setAccount ] = useState();
  const [ nickname, setNickname ] = useState();

  const navigate = useNavigate();

  const SSAFY_CHAIN_ID = '0x79f5'

  const getChainId = async () => {
    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
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
        if(window.confirm("회원가입 해주십시오.")) {
          navigate("/signUp");
        }
      }
    } 
    catch (error) {
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
  }

  const addSSFNetwork = async () => {
    const network = {
      chainId: SSAFY_CHAIN_ID,
      chainName: 'SSAFY',
      rpcUrls: ["http://20.196.209.2:8545"], // 이거 urls을 나중에 환경변수로 숨겨야되나?
      nativeCurrency: {
          name: 'SSAFYNetwork',
          symbol: 'SSF',
          decimals: 18, 
      },
    };

    await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [network],
    });
  }

  useEffect(() => {
    const init = async () => {
      try {
        const chainId = await getChainId();
        // console.log('체인 아이디 : ', chainId);
        if (SSAFY_CHAIN_ID !== chainId) {
          // 추가는 해야할 것 같은데 전환은 여기서 할 게 맞나 싶어서 일단 주석
            // switchSSFNetwork();
            // addSSFNetwork();
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
  }, []);

  // 언마운트되면 accountsChanged 이벤트 지우기
  useEffect(() => {
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", getAccountnName);
      }}
  } ,[]);

  return [account, nickname];
};

export default useAccount;