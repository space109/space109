import Web3 from 'web3';
import Tx from 'ethereumjs-tx';

// Web3
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

/**
 * 트랜잭션 전송을 위한 공통 로직을 아래에 구현합니다. 
 * 전달받은 개인키로 서명한 트랜잭션을 전송합니다. 
 * @param {*} fromAddr 보내는 주소
 * @param {*} privKey 보내는 주소의 개인키
 * @param {*} toAddr 받는 주소
 * @param {*} data 입력 데이터
 * @returns 트랜잭션의 결과 
 */
export default async function sendTransaction(fromAddr, privKey, toAddr, data) {
  try {
    // TODO
  } catch (e) {
    console.log(e);
  }
}
