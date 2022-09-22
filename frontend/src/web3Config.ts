import { AbiItem } from "web3-utils"
import Web3 from "web3";

const TestAbi: AbiItem[] = [
  {
    "inputs": [],
    "name": "current",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "newText",
        "type": "string"
      }
    ],
    "name": "write",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


export const TestCA = "0x267e6473730128966501CcdDb50A16e4bA66b315";

export const web3 = new Web3(window.ethereum); // provider window.ehtereum으로 진행해도 되나?

// 두가지인자 필요 (abi, address)
export const TestContract = new web3.eth.Contract(
	TestAbi,
	TestCA
);