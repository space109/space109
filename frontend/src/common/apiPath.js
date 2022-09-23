
const HOST = "http://j7b109.p.ssafy.io/api/";

const WALLET = 'wallet/';
const GALLERY = 'gallery/';
const NFT = 'nft/';

const apiPath = {
  wallet: {
    login: () => HOST + WALLET,
    join: () => HOST + WALLET + "join/",
    dupCheck: () => HOST + WALLET + "check/",
  },
  gallery: {

  },
  nft: {

  },
};

export default apiPath;