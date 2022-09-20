import React, { useEffect, useState } from "react";
import Web3 from "web3";

// 계정 주소 가져오는 hook (추후 닉네임도 추가)
const useAccount = () => {
  const [ account, setAccount ] = useState();
  const [ nickname, setNickname ] = useState();

  const SSAFY_CHAIN_ID = '0x79f5'

  const getChainId = async () => {
    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    });

    return chainId;
  };

  const getUsedAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
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
        console.log('체인 아이디 : ', chainId);
        if (SSAFY_CHAIN_ID !== chainId) {
          // 추가는 해야할 것 같은데 전환은 여기서 할 게 맞나 싶어서 일단 주석
            // switchSSFNetwork();
            // addSSFNetwork();
        }

        getUsedAccount();
      } catch (error) {
        console.error(error);
      }
    };

    if (window.ethereum) {
      init();
      window.ethereum.on("accountsChanged", getUsedAccount);
    }
  }, []);

  // 언마운트되면 accountsChanged 이벤트 지우기
  useEffect(() => {
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", getUsedAccount);
      }}
  } ,[]);

  return [account];
};

export default useAccount;