import React, { useEffect, useState } from "react";
import { login } from "../apis";

/* 
계정 주소와 닉네임을 가져오는 hook
account가 undefined 값이 반환되면 계정 연결이 안되어있고, 
name이 undefined으로 반환되면 회원가입이 되어있지 않은 것.
*/
const useAccount = () => {
  const [ account, setAccount ] = useState(undefined);
  const [ nickname, setNickname ] = useState(undefined);

  const getAccountnName = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);

      const nameData = await login(accounts[0]);
      if (nameData.length) {
        setNickname(nameData[0].nickname);
      }
    } 
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
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
      }
    };
  }, []);

  return [account, nickname];
};

export default useAccount;
