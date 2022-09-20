
 const eth = window.ethereum;

 const isMetaMaskInstalled = () => {
   return eth.isMetaMask;
 };
 
 const isWalletConnected = () => {
   return eth.isConnected();
 };
 
 const getAddress = () => {
   return eth.selectedAddress;
 };
 
 export { isMetaMaskInstalled, isWalletConnected, getAddress };
 